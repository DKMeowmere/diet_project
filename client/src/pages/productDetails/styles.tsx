import styled from "styled-components"

export const ProductDetailsContainer = styled.article`
	width: 100%;
	display: flex;
	justify-content: center;
	padding-bottom: 30px;
	a {
		text-align: center;
		font-size: 2rem;
		&:hover {
			text-decoration: underline;
		}
	}
	.product-title {
		font-size: 1.7rem;
	}
	.product-subtitle {
		font-size: 1.4rem;
	}
	.product-text {
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
