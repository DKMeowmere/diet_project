import styled from "styled-components"

export const ProductGroupsModalContainer = styled.div`
	position: fixed;
	top: 80px;
	z-index: 5;
	width: 100%;
	height: calc(100vh - 80px);
	background-color: #0008;
	display: flex;
	align-items: center;
	justify-content: center;
`

export const ProductGroupsArticle = styled.div`
	position: relative;
	z-index: 10;
	max-width: 1000px;
	width: 80%;
	height: 500px;
	background-color: #eee;
	border-radius: 10px;
	overflow-y: scroll;
	padding: 30px 0;
	.title {
		font-size: 2rem;
		text-align: center;
		margin: 20px;
	}
	.search-input {
		margin: auto;
		margin-top: 20px;
	}
	.close-btn-container {
		position: absolute;
		top: 20px;
		right: 50px;
		.close-btn {
			position: fixed;
			cursor: pointer;
			fill: ${({ theme }) => theme.colors.errorMain};
			width: 40px;
			height: 40px;
		}
	}
`

export const CategoriesContainer = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	gap: 10px;
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

export const ProductGroupsContainer = styled.section`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin: auto;
	gap: 30px;
`

export const ProductGroupContainer = styled.div`
	width: calc(50% - 30px);
`

export const ProductGroup = styled.div`
	width: 80%;
	height: 150px;
	margin: 40px auto 0;
	background-color: #fff;
	border-radius: 10px;
	padding: 20px;
	box-shadow: 0px 9px 20px -7px rgba(66, 68, 90, 1);
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	.products-list {
		display: none;
		position: fixed;
		right: 40px;
		bottom: 40px;
		width: 200px;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		background-color: #fff;
		gap: 10px;
		font-size: 1.2rem;
		padding: 20px;
		border-radius: 10px;
	}
	&:hover {
		.products-list {
			display: flex;
		}
	}
	.product-group-title {
		font-size: 1.4rem;
	}
	&:last-child {
		padding-bottom: 30px;
	}
	@media screen and (min-width: ${({ theme }) => theme.media.breakpoints.lg}) {
		.product-group-title {
			font-size: 1.7rem;
		}
	}
`
