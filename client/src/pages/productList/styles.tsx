import { Link } from "react-router-dom"
import styled from "styled-components"

export const ProductsArticle = styled.article`
	padding: 30px 0;
	.create-product-link {
		display: block;
		margin: auto;
		width: 50%;
	}
	.search-input {
		margin: auto;
		margin-top: 20px;
	}
`

export const ProductsContainer = styled.div`
	width: 80%;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin: auto;
	gap: 30px;
	margin-top: 40px;
`
export const ProductContainer = styled(Link)`
	width: calc(40% - 30px);
	margin: 20px 40px;
	
`
export const Product = styled.div`
	width: 100%;
	height: 150px;
	background-color: #fff;
	border-radius: 10px;
	padding: 20px;
	box-shadow: 0px 9px 20px -7px rgba(66, 68, 90, 1);
	&:hover {
		box-shadow: 0px 9px 25px 5px rgba(66, 68, 90, 1);
	}
	.product-title {
		height: 80%;
		font-size: 1.4rem;
	}
	&:last-child {
		padding-bottom: 30px;
	}
	@media screen and (min-width: ${({ theme }) =>theme.media.breakpoints.lg}) {
		.product-value {
			font-size: 1.4rem;
		}
		.product-title {
			font-size: 1.7rem;
		}
	}
`
