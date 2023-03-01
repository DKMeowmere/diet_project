import styled from "styled-components"

export const DietModalContainer = styled.div`
	position: fixed;
	z-index: 5;
	width: 100%;
	height: calc(100vh - 80px);
	background-color: #0008;
	display: flex;
	align-items: center;
	justify-content: center;
`

export const DietsArticle = styled.article`
	position: relative;
	padding: 30px 0;
	width: 90%;
	height: 500px;
	overflow-y: scroll;
	max-width: 1200px;
	background-color: #eee;
	border-radius: 20px;
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

export const DietsListContainer = styled.article`
	width: 90%;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin: auto;
	gap: 30px;
`

export const DietContainer = styled.div`
	width: calc(50% - 30px);
`

export const Diet = styled.div`
	width: 80%;
	height: 150px;
	margin: 40px auto 0;
	background-color: #fff;
	border-radius: 10px;
	padding: 20px;
	box-shadow: 0px 9px 20px -7px rgba(66, 68, 90, 1);
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	.diet-title {
		font-size: 2rem;
	}
	&:hover {
		opacity: 0.7;
		box-shadow: 0px 9px 25px 5px rgba(66, 68, 90, 1);
	}
`
