import styled from 'styled-components'

export const DietDetailsContainer = styled.article`
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
