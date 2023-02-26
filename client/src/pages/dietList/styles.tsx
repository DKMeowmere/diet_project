import styled from 'styled-components'

<<<<<<< HEAD
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
=======
export const DietListContainer = styled.article`
	width: 100%;
	display: flex;
	justify-content: center;
`
export const Form = styled.form`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	gap: 30px;
	margin-top: 30px;
	max-width: 500px;
	flex-direction: column;
	input {
		display: block;
		margin: auto;
	}
	.diet-name {
		font-size: 1.2rem;
	}
	.diet-title {
		font-size: 1.7rem;
	}
`
export const Days = styled.div`
	width: 100%;
	background-color: #fff;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
`
>>>>>>> 48e893e93459c0456c61aa398b2a4181529f9e0a
