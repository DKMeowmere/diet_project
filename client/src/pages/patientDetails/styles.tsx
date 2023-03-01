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

export const PatientDietsContainer = styled.div`
	width: 90%;
	background-color: #fff;
	border-radius: 30px;
	display: flex;
	padding: 20px 10px;
	flex-direction: column;
	align-items: center;
	gap: 20px;
	.diet-link {
		display: block;
		position: relative;
		border: 1px solid #000;
		width: 80%;
		padding: 10px 20px;
		border-radius: 10px;
		text-align: center;
		font-size: 1.5rem;
		&:hover {
			text-decoration: none;
		}
		svg {
			position: absolute;
			cursor: pointer;
			fill: ${({ theme }) => theme.colors.errorMain};
			width: 40px;
			height: 40px;
			right: 8px;
			top: 50%;
			translate: 0 -50%;
		}
		&:hover {
			background-color: #eee;
		}
	}
`
