import styled from 'styled-components'

export const DietCreateContainer = styled.article`
	width: 100%;
	padding-bottom: 30px;
	.meal-name {
		width: 100%;
		background-color: ${({ theme }) => theme.colors.main};
		color: ${({ theme }) => theme.colors.whiteText};
		padding: 20px;
		text-align: center;
		font-size: 1.5rem;
		margin-top: 30px;
		
	}
	.input-diet-box {
		display: flex;
		flex-direction: column;
		height: 200px;
		background-color: #fafafa;
		gap: 20px;
		width: 100%;

		.diet-name {
			width: 100%;
			padding: 20px;
			text-align: center;
			color: ${({ theme }) => theme.colors.blackText};
			font-size: 1.5rem;
		}
		.input-box {
			width: 50%;
			margin-left: auto;
			margin-right: auto;
			div {
				display: block;
				margin: auto;
			}
		}
	}
`
export const Form = styled.form`
	margin-left: 90px;
	margin-top: 30px;
	max-width: 1000px;
	color: ${({ theme }) => theme.colors.blackText};
	.left-form {
		width: 100%;
	}
	.right-form {
		width: 20%;
		position: fixed;
		top: 100px;
		right: 20px;
	}
	.button-container {
		position: fixed;
		bottom: 30px;
		right: 20px;
		width: inherit;
	}

	.diet-title,
	.diet-text-main {
		width: 100%;
		background-color: #fff;
		padding: 20px;
		text-align: center;
		font-size: 1.5rem;
		border-top-right-radius: 5px;
		border-top-left-radius: 5px;
		background-color: ${({ theme }) => theme.colors.main};
		color: ${({ theme }) => theme.colors.whiteText};
	}

	.diet-calories {
		width: 100%;
		background-color: #f27a00;
		padding: 20px;
		text-align: center;
		font-size: 1.5rem;
		color: ${({ theme }) => theme.colors.whiteText};
	}
	.diet-carbo {
		width: 100%;
		background-color: #ff8413;
		padding: 20px;
		text-align: center;
		font-size: 1.5rem;
		color: ${({ theme }) => theme.colors.whiteText};
	}
	.diet-proteins {
		width: 100%;
		background-color: #ff8f22;
		padding: 20px;
		text-align: center;
		font-size: 1.5rem;
		color: ${({ theme }) => theme.colors.whiteText};
	}
	.diet-fats {
		width: 100%;
		background-color: #ff992f;
		padding: 20px;
		text-align: center;
		font-size: 1.5rem;
		color: ${({ theme }) => theme.colors.whiteText};
	}
	.diet-amount {
			width: 100%;
			padding: 20px;
			text-align: center;
			background-color: #d96500;
			font-size: 1.5rem;
			color: ${({ theme }) => theme.colors.whiteText};
		}
	.diet-text {
		width: 100%;
		background-color: ${({ theme }) => theme.colors.main};
		padding: 20px;
		text-align: center;
		font-size: 1.5rem;	
		margin-top: 30px;
		color: ${({ theme }) => theme.colors.whiteText};
	}
	.input-product-box {
		display: flex;
		flex-direction: column;
		height: 150px;
		background-color: #d96500;
		width: 100%;

		.diet-weight {
			width: 100%;
			padding: 20px;
			text-align: center;
			color: ${({ theme }) => theme.colors.whiteText};
			font-size: 1.5rem;
		}
		.input-box {
			width: 50%;
			margin-left: auto;
			margin-right: auto;
			div {
				display: block;
				margin: auto;
			}
		}
	}
	.input-amount-box {
		height: 150px;
		background-color: #e56f00;
		width: 100%;

		.diet-amount-element {
			width: 100%;
			padding: 20px;
			text-align: center;
			font-size: 1.5rem;
			color: ${({ theme }) => theme.colors.whiteText};
		}
		.input-box {
			width: 50%;
			margin-left: auto;
			margin-right: auto;
			div {
				display: block;
				margin: auto;
			}
		}
	}

	.diet-text-main {
		margin-top: 20px;
	}
	.main-btn {
		border-radius: 0;
		margin: 5px 0px;
		width: 100%;
	}
	.meal-btn {
		border-radius: 0;
	
	}
	.diet-values{
		display: flex;
		flex-direction: row;
	}
	.diet-btn {
		border-radius: 0;
		
	}
	.diet-btn:first-child {
		border-radius: 0;
		;
	}
	.diet-btn {
		border-radius: 0;
	}
	.meal-btn {
		border-radius: 0;
		margin-top: 20px;
	}
	input {
		display: block;
		margin: auto;
	}
`

export const DaysContainer = styled.div`
	width: 100%;
`
export const MealsContainer = styled.div`
	width: 100%;
	margin: auto;
`
export const ProductsContainer = styled.div`
	width: 100%;
	margin: auto;
`
