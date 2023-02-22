import styled from "styled-components"

export const ProductDetailsContainer = styled.article`
	width: 100%;
	display: flex;
	justify-content: center;
	padding-bottom: 30px;
	.diet-title {
		font-size: 1.2rem;
	}
	.diet-first-title {
		font-size: 1.7rem;
	}
	.diet-second-title {
		font-size: 1.4rem;
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
