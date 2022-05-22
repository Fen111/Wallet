import styled, { css } from 'styled-components'
import { BsPlusLg } from 'react-icons/bs'
import { FaMinus } from 'react-icons/fa'

import { vars } from 'stylesheet'
import { useState } from 'react'

const Container = styled.div`
	position: relative;
	max-width: 220px;
	margin: 0 auto;
`

const ToggleContainer = styled.div`
	input {
		display: none;
	}
`

const FormForButton = styled.form`
	display: flex;
	align-items: center;
	justify-content: center;
`

const Input = styled.input.attrs({ type: 'checkbox', name: 'isIncome' })``

const Label = styled.label`
	position: relative;
	display: flex;
	align-items: center;
	cursor: pointer;
`

const LabelText = styled.span`
	display: inline-flex;
	color: ${vars.color.font.third};
	padding: 0;

	font-weight: 700;
	font-size: 16px;
	line-height: 1.5;

	${(props) => {
		switch (props.$mode) {
			case 'expenses':
				return css`
					${Input}:not(:checked) ~ && {
						color: ${vars.color.font.negative};
					}
				`
			default:
				return css`
					${Input}:checked ~ && {
						color: ${vars.color.font.positive};
					}
				`
		}
	}}
`

const ToggleField = styled.div`
	position: relative;
	height: 40px;
	width: 80px;
	margin-left: 20px;
	margin-right: 20px;
	border: 1px solid ${vars.color.font.third};
	border-radius: 30px;
	transition: all ${vars.animation.duration};
`

const ToggleIcon = styled.div`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 44px;
	height: 44px;
	background-color: ${vars.color.font.positive};
	background: ${vars.color.font.negative};
	left: 104px;
	border-radius: 50%;
	transition: all ${vars.animation.duration};
	z-index: 4;
	box-shadow: ${vars.boxShadow.secondCheckbox};

	${Input}:checked ~ & {
		left: 64px;
		background: ${vars.color.font.positive};
		box-shadow: ${vars.boxShadow.firstCheckbox};
	}

	svg {
		width: 20px;
		height: 20px;
		fill: ${vars.color.background.primary};
	}
`

export const Checkbox = ({ isChecked, func }) => {
	const [icon, setIcon] = useState(true)

	const onCheck = (e) => {
		const block = document.querySelector('#checkbox')
		// setPlus(block.checked)
	}

	return (
		<Container className='switchContainer'>
			<ToggleContainer>
				<FormForButton>
					<Label>
						<Input onClick={onCheck} onChange={func} aria-label='transaction' />
						<LabelText>Доход</LabelText>
						<ToggleIcon>{isChecked ? <BsPlusLg /> : <FaMinus />}</ToggleIcon>
						<ToggleField />
						<LabelText $mode='expenses'>Расход</LabelText>
					</Label>
				</FormForButton>
			</ToggleContainer>
		</Container>
	)
}
