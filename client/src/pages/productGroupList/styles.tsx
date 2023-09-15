import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const ProductGroupsArticle = styled.article`
	padding: 30px 0;
	.create-product-group-link {
		display: block;
		margin: auto;
		width: 50%;
	}
	.search-input {
		margin: auto;
		margin-top: 20px;
	}
`

export const ProductGroupsContainer = styled.div`
	width: 80%;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin: auto;
	gap: 30px;
	margin-top: 40px;
`
export const CategoriesContainer = styled.div`
	width: 100%;
	margin: 20px auto;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	gap: 12px;
	.item {
		background-color: ${({ theme }) => theme.colors.main};
		color: #fff;
		padding: 12px;
		outline: 2px solid ${({ theme }) => theme.colors.whiteText};
		border-radius: 8px;
		cursor: pointer;
		font-weight: 700;
		user-select: none;
		min-width: 70px;
		display: flex;
		justify-content: center;
		align-items: center;
		&:hover {
			background-color: #7b7b7b ;
			color: #eee;
		}
	}
	.active {
		outline: 5px dashed ${({ theme }) => theme.colors.whiteText};
	}
`

export const ProductGroupContainer = styled(Link)`
	width: calc(40% - 30px);
	margin: 20px 40px;
`
export const ProductGroup = styled.div`
	width: 100%;
	height: 150px;
	background-color: #fff;
	border-radius: 10px;
	padding: 20px;
	box-shadow: 0px 9px 20px -7px rgba(66, 68, 90, 1);
	display: flex;
	justify-content: center;
	align-items: center;
	&:hover {
		box-shadow: 0px 9px 25px 5px rgba(66, 68, 90, 1);
	}
	.product-group-title {
		font-size: 1.4rem;
	}
	&:last-child {
		padding-bottom: 30px;
	}
	@media screen and (min-width: ${({ theme }) => theme.media.breakpoints.lg}) {
		.product-group-value {
			font-size: 1.4rem;
		}
		.product-group-title {
			font-size: 1.7rem;
		}
	}
`
