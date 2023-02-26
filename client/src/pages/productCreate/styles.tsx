import styled from "styled-components"

export const ProductCreateContainer = styled.article`
	width: 100%;
	display: flex;
	justify-content: center;
	padding-bottom: 30px;
	.product-title {
		font-size: 1.2rem;
	}
	.product-subtitle {
		font-size: 1.7rem;
	}
	.product-text {
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
