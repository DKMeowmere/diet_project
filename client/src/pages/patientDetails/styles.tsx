import styled from "styled-components"

export const PatientDetailsContainer = styled.article`
	width: 100%;
	display: flex;
	justify-content: center;
	padding-bottom: 30px;
	a {
		text-align: center;
		font-size: 2rem;
		&:hover {
			text-decoration: underline;
		}
	}
	.patient-title {
		font-size: 1.7rem;
	}
	.patient-text {
		font-size: 1.2rem;
	}
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
`

export const PatientDiets = styled.div`
	width: 90%;
	display: flex;
	align-items: center;
	flex-direction: column;
	background-color: #fff;
	border-radius: 20px;
	padding: 30px;
	gap: 20px;
`
