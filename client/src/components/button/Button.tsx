import styled from "styled-components"

type Props = {
	width: string
	height: string
	bgColor: string
}

export const Button = styled.button<Props>`
	width: ${({ width }) => width};
	height: ${({ height }) => height};
	background-color: ${({ bgColor }) => bgColor};
	color: ${({ theme }) => theme.colors.whiteText};
	padding: 5px 10px;
	cursor: pointer;
	text-transform: uppercase;
	letter-spacing: 1.6px;
	font-weight: bold;
	border: none;
	border-radius: 10px;
	&:hover {
		box-shadow: 0px 0px 25px 0px ${({ bgColor }) => bgColor};
	}
`
