import styled from "styled-components"

type Props = {
	width: string
	height: string
}

export const TextareaContainer = styled.textarea<Props>`
	position: relative;
	width: ${({ width }) => width};
	height: ${({ height }) => height};
	padding: 10px;
	resize: vertical;
	font-family: inherit;
`
