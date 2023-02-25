import styled from "styled-components"

export const DietCreateContainer = styled.article`
	width: 100%;
	display: flex;
	justify-content: center;
	padding-bottom: 30px;
`
export const Form = styled.form`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 90%;
	margin-top: 30px;
	max-width: 1000px;
	flex-direction: column;
	color: ${({ theme }) => theme.colors.blackText};
	border: 1px #000 solid;
	.diet-title {
		font-size: 3rem;
		margin: 20px;
	}
	.diet-text {
		width: 100%;
		background-color: #fff;
		padding: 15px;
		text-align: center;
		border: 1px #000 solid;
		font-size: 1.5rem;
	}
	.diet-btn {
		border-radius: 0;
	}
	input {
		display: block;
		margin: auto;
	}
`

export const DaysContainer = styled.div`
	width: 90%;
	margin: auto;
	border: 1px #000 solid;
`
export const MealsContainer = styled.div`
	width: 90%;
	margin: auto;
	border: 1px #000 solid;
`
export const ProductsContainer = styled.div`
	width: 90%;
	margin: auto;
	border: 1px #000 solid;
`
