import styled from 'styled-components'
import { vars } from '../../../stylesheet/vars'
export const StyledPageSvg = styled.svg`
	width: 260px;
	height: 250px;
	margin-right: 40px;
	@media screen and (min-width: 1280px) {
		width: 435px;
		height: 419px;
		margin-right: 0;
	}
`
export const StyledBlockSvg = styled.div`
	display: none;
	@media screen and (min-width: 768px) {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 530px;
		margin-bottom: 50px;
	}

	@media screen and (min-width: 1280px) {
		flex-direction: column;
		margin-bottom: 0;
		margin-right: 145px;
	}
`
export const StyledTitle = styled.h1`
	font-family: 'Poppins';
	font-style: normal;
	font-weight: 400;
	font-size: 30px;
	line-height: 1.15;
	margin-top: 28px;
	color: ${vars.color.font.primary};
`
