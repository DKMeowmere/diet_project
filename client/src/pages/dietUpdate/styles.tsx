import styled from "styled-components"

export const DietCreateContainer = styled.article`
	width: 100%;
	padding-bottom: 30px;
	.input-diet-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 200px;
		background-color: #fafafa;
		width: 100%;
		margin-bottom: 40px;
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
			padding: 20px;
			margin-right: auto;
			margin-bottom: 20px;
		}
	}
`
export const Form = styled.form`
	margin: 30px 0 0 90px;
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

	.diet-text {
		width: 100%;
		background-color: ${({ theme }) => theme.colors.main};
		padding: 20px;
		text-align: center;
		font-size: 1.5rem;
		margin-top: 30px;
		color: ${({ theme }) => theme.colors.whiteText};
	}

	.diet-text-main {
		margin-top: 20px;
	}
	.main-btn {
		border-radius: 0;
		margin: 5px 0px;
		width: 100%;
	}
	button {
		border-radius: 0 !important;
	}
	input {
		display: block;
		margin: auto;
	}
`

export const DaysContainer = styled.div`
	width: 100%;
	position: relative;
	.diet-btn-element {
		margin-bottom: 30px;
	}
`
export const MealsContainer = styled.div`
	width: 100%;
	margin: auto;
	.product {
		.product-value-container {
			position: relative;
			border-radius: 20px;
			position: relative;
		}
		svg {
			width: 32px;
			height: 32px;
			color: ${({ theme }) => theme.colors.errorMain};
			cursor: pointer;
			top: 50%;
			translate: 0 -50%;
			right: 5px;
			position: absolute;
		}
	}
	.product-container {
		display: flex;
		justify-content: space-between;
		text-align: center;
		padding: 20px;
		background-color: ${({ theme }) => theme.colors.main};
		color: ${({ theme }) => theme.colors.whiteText};
		.products-meal {
			width: 25%;
		}
		.weight-meal,
		.calories-meal,
		.carbo-meal,
		.proteins-meal,
		.fats-meal {
			width: 15%;
		}
	}
	.value {
		background-color: ${({ theme }) => theme.colors.whiteText};
		display: flex;
		text-align: center;
		justify-content: space-between;
		padding: 20px;
		border-bottom: 1px solid #d6cfcf;
		background-color: #f0f0f0;
		.product-name {
			width: 25%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.weight-number,
		.calories-number,
		.carbo-number,
		.proteins-number,
		.fats-number {
			width: 15%;
			display: flex;
			justify-content: center;
			align-items: center;
			
		}
		.weight-number {
			.weight-input {
				text-align: center;
			}
		}
	}

	.meal-name {
		width: 100%;
		background-color: ${({ theme }) => theme.colors.main};
		color: ${({ theme }) => theme.colors.whiteText};
		padding: 20px;
		text-align: center;
		font-size: 1.5rem;
		margin-top: 30px;
	}
	.diet-btn {
		margin-bottom: 30px;
	}
	.meal-btn {
		margin: 20px 0;
	}
`
export const ProductsContainer = styled.div`
	width: 100%;
	margin: auto;
`
export const DishesContainer = styled.div`
	width: 100%;
	margin: auto;
`

export const ProductGroupContainer = styled.div`
	width: 100%;
	margin: auto;
	.product-group-title {
		margin: 15px 0;
		padding: 15px;
		background-color: #fff;
		border-radius: 10px;
		text-align: center;
		font-size: 1.5rem;
		position: relative;
		.close-btn {
			position: absolute;
			cursor: pointer;
			fill: ${({ theme }) => theme.colors.errorMain};
			width: 40px;
			height: 40px;
			right: 12px;
			top: 50%;
			translate: 0 -50%;
		}
	}
	.product-group-description {
		margin: 15px 0;
		padding: 10px;
		background-color: #fff;
		border-radius: 10px;
		text-align: center;
		font-size: 1rem;
		position: relative;
	}
`
