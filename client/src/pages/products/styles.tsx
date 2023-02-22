import { Link } from "react-router-dom"
import styled from "styled-components"
export const ProductsArticle = styled.article`
	.search-input {
		margin: auto;
		margin-top: 20px;
	}
`
export const ProductsContainer = styled.div`
	width: 90%;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin: auto;
	gap: 30px;

	.product-title {
		height: 80%;
		font-size: 1.7rem;
	}

	.product-value {
		display: flex;
		justify-content: space-between;
		height: 20%;
		font-size: 1.4rem;
		font-weight: light;
	}

	.milk {
		color: #1cbbbb;
	}
	.coal {
		color: darkviolet;
	}
	.fire {
		color: #ffa500;
	}
	&:last-child {
		padding-bottom: 30px;
	}
`
export const ProductContainer = styled(Link)`
	width: calc(50% - 30px);
`
export const Product = styled.div`
	width: 80%;
	height: 150px;
	margin: 40px auto 0;
	background-color: #fff;
	border-radius: 10px;
	padding: 20px;
	box-shadow: 0px 9px 20px -7px rgba(66, 68, 90, 1);
`
