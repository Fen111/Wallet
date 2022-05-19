import * as Yup from 'yup'
import styled from 'styled-components'
import { vars } from 'stylesheet'
const ValidationError = styled.div`
	position: absolute;
	bottom: -35px;
	right: 15%;
	text-align: right;
	@media (min-width: ${vars.breakpoints.tablet}) {
		right: 30%;
	}
`

const ValidationErrorText = styled.p`
	color: ${vars.color.font.negative};
`

const Required = styled.span`
	position: absolute;
	left: -3%;
	top: 35%;
	color: ${vars.color.font.negative};
	font-weight: bold;
`

export const ValidationSchema = () => {
	return Yup.object({
		name: Yup.string()
			.min(
				1,

				<ValidationError>
					<ValidationErrorText>At least 1 character</ValidationErrorText>
				</ValidationError>
			)
			.max(
				12,
				<ValidationError>
					<ValidationErrorText>No more than 12 characters</ValidationErrorText>
				</ValidationError>
			)
			.required(<Required>!</Required>),

		password: Yup.string()
			.min(
				6,
				<ValidationError>
					<ValidationErrorText>At least 1 character</ValidationErrorText>
				</ValidationError>
			)
			.max(
				16,
				<ValidationError>
					<ValidationErrorText>No more than 16 characters</ValidationErrorText>
				</ValidationError>
			)

			.required(<Required>!</Required>),

		passwordConfirm: Yup.string()

			.default('')
			.oneOf(
				[Yup.ref('password'), null],
				<ValidationError>
					<ValidationErrorText>Passwords do not match</ValidationErrorText>
				</ValidationError>
			)
			.required(<Required>!</Required>),

		email: Yup.string()
			.email(
				<ValidationError>
					<ValidationErrorText>Invalid email address</ValidationErrorText>
				</ValidationError>
			)
			.required(<Required>!</Required>),
	})
}
