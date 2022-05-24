import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { vars } from '../../../stylesheet'
import { Select } from './select'
import { selectorsFinance } from 'store'
import { monthOptions } from './monthOptions'
import { selectorsGlobal } from 'store'

const SelectsContainer = styled.div`
	color: ${(props) => props.theme.color.accent.openMenu};
	margin-bottom: 20px;

	@media (max-width: ${vars.breakpoints.mobileUp}) {
		width: 280px;
	}
	@media (min-width: ${vars.breakpoints.tablet}) {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 335px;
	}
	@media (min-width: ${vars.breakpoints.desktop}) {
		width: 395px;
	}

	button {
		color: ${(props) => props.theme.color.font.primary};
	}
`

const Selects = ({ setData }) => {
	const setTheme = useSelector(selectorsGlobal.getTheme)

	const [month, setMonth] = useState('')
	const [year, setYear] = useState('')

	const aviableStatistics = useSelector(selectorsFinance.getAviableStatistics)
	const monthArray = aviableStatistics.months.reduce((acc, val) => {
		acc.push(monthOptions.find((e) => e.number === val))
		return acc
	}, [])

	useEffect(() => {
		if (month !== '' && year !== '') {
			setData({ month, year })
		}
	}, [month, year])

	return (
		<SelectsContainer>
			<Select name={'month'} data={monthArray} setValues={setMonth} setTheme={setTheme}></Select>
			<Select name={'year'} data={aviableStatistics.years} setValues={setYear} setTheme={setTheme}></Select>
		</SelectsContainer>
	)
}

export { Selects }
