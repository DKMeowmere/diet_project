import styled from 'styled-components'

export const DietCreateContainer = styled.article`
	width: 100%;
	padding-bottom: 30px;
	.btn-element-container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		margin-bottom: 20px;
	}
	.meal-name-element {
		width: 100%;
		background-color: ${({ theme }) => theme.colors.main};
		color: ${({ theme }) => theme.colors.whiteText};
		text-align: center;
		font-size: 1.5rem;
		display: flex;
		flex-direction: column;
		.diet-name {
			width: 100%;
			padding: 35px;
			text-align: center;
			color: ${({ theme }) => theme.colors.main};
			font-size: 1.5rem;
			background-color: #303030;
		}
		.input-box {
			width: 100%;
		}
		.day-input {
			text-align: center;
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
	input {
		display: block;
		margin: auto;
	}
`

export const DaysContainer = styled.div`
	width: 100%;
	position: relative;
	.btn-element-container,
	.btn-element-container-2 {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		margin-top: 20px;
		margin-bottom: 0px;
	}
	.btn-element-container-2 {
		margin-top: 0px;
	}
	.diet-btn-element {
		margin-bottom: 30px;
		border-radius: 10px;
		padding: 20px;
		border-radius: 10px;
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
	.product-container-element {
		height: 75px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1.5rem;
		margin-top: 50px;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
	}
	.product-container,
	.product-container-element {
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
		.fats-meal,
		.minus {
			width: 15%;
		}
	}
	.diet-btn {
		margin-bottom: 30px;
		border-top-left-radius: 0px;
		border-top-right-radius: 0px;
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
	.meal-summary {
		margin-top: 20px;
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
	.product-group {
		background-color: #ffa500;
		padding: 10px;
		margin: 40px 0px;
		border-radius: 15px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.product-group-title {
		margin: 15px 0;
		padding: 15px;
		background-color: #fff;
		border-radius: 10px;
		text-align: center;
		font-size: 1.5rem;
		position: relative;
		width: 70%;
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
		width: 90%;
	}
`
