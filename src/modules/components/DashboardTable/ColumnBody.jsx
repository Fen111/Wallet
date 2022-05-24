import { useState, useEffect, useMemo } from 'react'
import { nanoid } from 'nanoid'
import styled from 'styled-components'
import { InView } from 'react-intersection-observer'
import { vars } from 'stylesheet'
import { varsRef } from 'stylesheet'
import EllipsisText from 'react-ellipsis-text'
import { useSelector } from 'react-redux'
import { selectorsGlobal } from 'store'

const { breakpoints } = vars
const Component = styled.td`
	&.null {
		color: ${(props) => props.theme.color.font.primary};
	}

	&.positive {
		color: ${(props) => props.theme.color.font.positive};
	}

	&.negative {
		color: ${(props) => props.theme.color.font.negative};
	}

	position: relative;
	display: flex;
	justify-content: space-between;
	padding: 0 20px;
	margin-right: ${(prop) => prop.marginRight};
	border-left: 5px solid ${(prop) => prop.colorBorder};

	font-family: 'Circe';
	font-size: 16px;
	line-height: 1.5;
	font-weight: ${(props) => props.theme.weight};

	@media screen and (min-width: ${breakpoints.tablet}) {
		justify-content: ${(prop) => prop.justifyContent};
		border-left: none;
		padding: 0;
	}
	div {
		position: absolute;
		height: 1px;
		width: 1px;
	}
`
const Title = styled.span`
	font-weight: 700;
	font-size: 18px;
	line-height: 1.5;
	color: ${(props) => props.theme.color.font.colorTitle};
`

export const ColumnBody = ({ data, tableColumns, type, viewport, setInView, isLast }) => {
	const theme = useSelector(selectorsGlobal.getTheme)
	const formateData = (elem) => {
		switch (elem.type) {
			case 'UnixTime':
				const currentData = new Date(data[elem.value])
				const dataTransaction = currentData.toLocaleDateString('en-GB')?.split('/')
				return `${dataTransaction[0]}.${dataTransaction[1]}.${dataTransaction[2]?.substr(2, 3)}`
			case 'Action':
				if (data[elem.value] === 'outlay') {
					return '-'
				} else {
					return '+'
				}
			case 'Category':
				return data[elem.value].name
			case 'Comment':
				return <EllipsisText text={`${data[elem.value]}`} length={10} />
			default:
				return data[elem.value]
		}
	}
	return useMemo(() => {
		return (
			<>
				{tableColumns.map((el, idx) => {
					return (
						<Component
							key={idx}
							colorBorder={
								type === 'income' ? `${varsRef(theme).color.font.positive}` : `${varsRef(theme).color.font.negative}`
							}
							className={el.type === 'Sum' ? (type === 'income' ? `positive` : `negative`) : `null`}
							weight={el.type === 'Sum' ? '700' : '400'}
							width={viewport.anotherScreen ? el.style.width : undefined}
							justifyContent={el.style.justifyContent}
							marginRight={viewport.anotherScreen ? el.style.marginRight : 0}
						>
							{isLast && el.type === 'Sum' && <InView onChange={setInView} />}
							{viewport.mobileScreen && <Title>{el.label}</Title>}
							{formateData(el)}
						</Component>
					)
				})}
			</>
		)
	}, [data])
}
ColumnBody.className = Component
