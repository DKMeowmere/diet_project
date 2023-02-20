import styled from "styled-components"
import { InputContainer } from "../input/styles"

type SearchInputContainerProps = {
	width: string
	height: string
}

export const SearchInputContainer = styled(
	InputContainer
)<SearchInputContainerProps>`
	width: ${({ width }) => width};
	max-height: ${({ height }) => height};
	overflow: visible;
	position: relative;
	input {
		padding-left: 35px;
	}
	svg {
		position: absolute;
		top: calc(${({ height }) => height} / 2);
		translate: 0 -50%;
		width: 25px;
		height: 25px;
		left: 5px;
	}
`
export const Autocomplete = styled.div`
	cursor: pointer;
	max-height: 300px;
	overflow-y: scroll;
	position: relative;
	z-index: 10000;
	background-color: #fff;
	border: 1px solid #000;
	border-top: 0;
	p {
		padding: 10px 20px;
		&:hover {
			color: ${({ theme }) => theme.colors.whiteText};
			background-color: ${({ theme }) => theme.colors.main};
		}
	}
`
