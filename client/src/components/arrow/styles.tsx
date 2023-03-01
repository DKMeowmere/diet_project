import styled from "styled-components"

type Props = {
	type: "LEFT" | "RIGHT",
	position?: "relative" | "absolute" | "fixed"
}

export const ArrowContainer = styled.div<Props>`
	width: 60px;
	height: 60px;
	z-index: 100;
	background-color: ${({ theme }) => theme.colors.main};
	position: fixed;
	top: 50%;
	left: ${({ type }) => (type === "LEFT" ? "4%" : "")};
	right: ${({ type }) => (type === "RIGHT" ? "4%" : "")};
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	cursor: pointer;
	svg {
		color: ${({ theme }) => theme.colors.whiteText};
		font-size: 2rem;
	}
`
