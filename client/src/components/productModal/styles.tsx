import styled from "styled-components"

export const ProductModalContainer = styled.div`
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

export const ProductsArticle = styled.div`
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
	.close-btn {
		position: absolute;
		cursor: pointer;
		fill: ${({ theme }) => theme.colors.errorMain};
		width: 40px;
		height: 40px;
		right: 12px;
		top: 12px;
	}
`
export const ProductsContainer = styled.section`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin: auto;
	gap: 30px;
`
export const ProductContainer = styled.div`
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
	cursor: pointer;
	.product-title {
		height: 80%;
		font-size: 1.4rem;
	}
	.product-value {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: auto;
		font-size: 1rem;
		font-weight: light;
		.unit-container {
			height: 100%;
			display: flex;
			align-items: center;
			gap: 4px;
			.milk {
				color: #1cbbbb;
			}
			.coal {
				color: #000;
			}
			.fire {
				color: #ffa500;
			}
			.oil {
				color: crimson;
			}
		}
	}
	&:last-child {
		padding-bottom: 30px;
	}
	@media screen and (min-width: ${({ theme }) =>
			theme.media.breakpoints.lg}) {
		.product-value {
			font-size: 1.4rem;
		}
		.product-title {
			font-size: 1.7rem;
		}
	}
`
