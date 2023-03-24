import styled from 'styled-components'

export const ProductGroupFormContainer = styled.article`
	width: 100%;
	display: flex;
	justify-content: center;
	padding-bottom: 70px;
`

export const Form = styled.form`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	gap: 50px;
	margin-top: 30px;
	flex-direction: column;
	.btn {
		max-width: 500px;
	}
	input {
		display: block;
		margin: auto;
	}
	.form-title {
		font-size: 1.7rem;
	}
	.form-text {
		font-size: 1.2rem;
	}
`
export const ProductBox = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	gap: 30px;
	flex-wrap: wrap;
`
export const ProductContainer = styled.div`
	width: 20%;
	background-color: ${({ theme }) => theme.colors.whiteText};
	border-radius: 15px;
	padding: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	position: relative;
	min-height: 175px;
	.product-title {
		font-size: 1.7rem;
		margin-bottom: 20px;
	}
	.form-text {
		font-size: 1.2rem;
		margin: 15px 0px;
	}
	.close-icon {
		position: absolute;
		right: 15px;
		top: 15px;
		color: ${({ theme }) => theme.colors.whiteText};
		width: 40px;
		height: 40px;
		background-color: ${({ theme }) => theme.colors.main};
		padding: 5px;
		cursor: pointer;
		border-radius: 50%;
	}
	svg:hover {
		background-color: ${({ theme }) => theme.colors.whiteText};
		color: ${({ theme }) => theme.colors.main};
	}
	.product-title {
		font-size: 1.5rem;
		width: 100%;
		text-align: center;
	}
`
