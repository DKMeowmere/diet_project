import styled from 'styled-components'

export const DietsListContainer = styled.article`
	width: 90%;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin: auto;
	gap: 30px;
	padding-bottom: 40px;
`
export const DietListContainer = styled.div`
	width: calc(50% - 30px);
`
export const Dietes = styled.div`
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
	.diet-title {
		font-size: 2rem;
	}
`
