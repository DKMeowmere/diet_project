import styled from 'styled-components'

export const ProductsContainer = styled.article`
	width: 90%;
	
	display: flex;
	margin: auto;
	gap: 30px;
	flex-wrap: wrap;
	display: flex;
	justify-content: center	;
	.product-title{
		font-size: 1.7rem;
		height: 80%;
	}
	.product-value{
		font-size: 1.4rem;
		font-weight: light;
		height: 20%;
		
		display: flex;
		justify-content: space-between;
	}
	svg{
		
	}
	.milk{
		color: #1cbbbb;
		
	}
	.coal{
		color:darkviolet;	
	}
	.fire{
		color: #ffa500;
	}
	.margin{
		margin: 15px;
	}

`
export const ProductContainer = styled.div`
	width: calc(50% - 30px);
`
export const Product = styled.div`
	margin: auto;
	height: 150px;
	margin-top: 40px;
	background-color: #fff;
	width: 80%;
	border-radius: 10px;
	padding: 20px;
	box-shadow: 0px 9px 20px -7px rgba(66, 68, 90, 1);
`
