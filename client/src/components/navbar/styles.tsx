import styled from "styled-components"

export const NavbarPlaceholder = styled.div`
	width: 100%;
	height: 80px;
`

export const NavbarContainer = styled.header`
	background-color: ${({ theme }) => theme.colors.whiteText};
	height: 80px;
	width: 100%;
	display: flex;
	color: ${({ theme }) => theme.colors.blackText};
	position: fixed;
	top: 0;
	right: 0;
	z-index: 100;
	svg {
		color: ${({ theme }) => theme.colors.main};
		font-size: 1.5rem;
	}

	nav {
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		box-shadow: 0px 9px 20px -7px rgba(66, 68, 90, 1);
	}

	.options-box {
		display: flex;
		justify-content: space-evenly;
		height: 100%;
		width: 100%;
		.option {
			display: flex;
			width: 150px;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			.option-text {
				color: ${({ theme }) => theme.colors.main};
				margin-top: 5px;
				font-size: 0.8rem;
				text-align: center;
			}
		}
	}

	.option:hover {
		background-color: #ffa500;
		.option-text {
			color: ${({ theme }) => theme.colors.whiteText};
		}
		svg {
			fill: ${({ theme }) => theme.colors.whiteText};
		}
	}

	@media screen and (min-width: ${({ theme }) =>
			theme.media.breakpoints.md}) {
		.option-text {
			font-size: 1.2rem;
		}
		svg {
			font-size: 2.3rem;
		}
	}
`
