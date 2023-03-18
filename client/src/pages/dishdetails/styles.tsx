import styled from "styled-components"

export const DishDetailsContainer = styled.article`
	width: 100%;
	display: flex;
	justify-content: center;
	padding-bottom: 30px;
	.dish-title {
		font-size: 1.7rem;
	}
	.dish-text {
		font-size: 1.2rem;
	}
`
export const Form = styled.form`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	gap: 30px;
	margin-top: 30px;
	max-width: 500px;
	flex-direction: column;
	input {
		display: block;
		margin: auto;
	}
`
export const ProductContainer = styled.div`
	width: 90%;
	background-color: ${({ theme }) => theme.colors.whiteText};
	border-radius: 15px;
	padding: 60px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	position: relative;
	.product-title {
		font-size: 1.7rem;
		margin-bottom: 20px;
	}
	.dish-text {
		font-size: 1.2rem;
		margin: 15px 0px;
	}
	.close-icon {
		position: absolute;
		right: 15px;
		top: 15px;
		color: ${({ theme }) => theme.colors.whiteText};
		width: 40px;
		height: 40px;
		background-color: ${({ theme }) => theme.colors.main};
		padding: 5px;
		cursor: pointer;
		border-radius: 50%;
	}
	svg:hover {
		background-color: ${({ theme }) => theme.colors.whiteText};
		color: ${({ theme }) => theme.colors.main};
	}
	.product-title {
		font-size: 1.5rem;
		width: 100%;
		text-align: center;
	}
`
