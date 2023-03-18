import { Link } from "react-router-dom"
import styled from "styled-components"

export const DishArticle = styled.article`
	padding: 30px 0;
	.create-dish-link {
		display: block;
		margin: auto;
		width: 50%;
	}
	.search-input {
		margin: auto;
		margin-top: 20px;
	}
`

export const DishListContainer = styled.article`
	width: 90%;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin: auto;
	gap: 30px;
`

export const DishContainer = styled.div`
	width: calc(50% - 30px);
`

export const Dish = styled(Link)`
	width: 80%;
	height: 150px;
	margin: 40px auto 0;
	background-color: #fff;
	border-radius: 10px;
	padding: 20px;
	box-shadow: 0px 9px 20px -7px rgba(66, 68, 90, 1);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	&:hover {
		opacity: 0.7;
		box-shadow: 0px 9px 25px 5px rgba(66, 68, 90, 1);
	}
	.dish-title {
		font-size: 2rem;
		margin-bottom: 10px;
	}
	@media screen and (min-width: ${({ theme }) => theme.media.breakpoints.lg}) {
		.product-value {
			font-size: 1.4rem;
		}
		.product-title {
			font-size: 1.7rem;
		}
	}
`
