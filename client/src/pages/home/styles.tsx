import { Link } from "react-router-dom"
import styled from "styled-components"

export const HomeContainer = styled.article<{ imageUrl: string }>`
	background: url(${({ imageUrl }) => imageUrl});
	width: 100%;
	height: 100vh;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	display: flex;
	justify-content: center;
	align-items: center;
	.block-container {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		flex-wrap: wrap;
		width: 100%;
		gap: 40px;
	}
`
export const Block = styled(Link)`
	background-color: #fff;
	height: 18vh;
	width: 40%;
	height: auto;
	display: flex;
	color: #ffa500;
	background-color: #fff;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border: 1px #c5c395 solid;
	padding: 20px;
	.block-icon {
		color: ${({ theme }) => theme.colors.main};
	}
	.block-title {
		gap: 10px;
		font-size: 1.5rem;
		font-weight: 200;
	}
	&:hover {
		background-color: #ffa500;
		color: ${({ theme }) => theme.colors.whiteText};
		cursor: pointer;
		svg {
			fill: ${({ theme }) => theme.colors.whiteText};
		}
	}
	svg {
		font-size: 3.5rem;
	}
`
