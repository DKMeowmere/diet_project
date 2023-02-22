import styled from "styled-components"
export const PatientsArticle = styled.article`
	.search-input {
		margin: auto;
		margin-top: 20px;
	}
`
export const PatientsContainer = styled.div`
	width: 90%;
	margin: auto;
	gap: 30px;
	flex-wrap: wrap;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-bottom: 30px;
`

export const PatientContainer = styled.div`
	width: calc(50% - 30px);
`
export const Patient = styled.div`
	margin: auto;
	gap: 20px;
	box-shadow: 0px 0px 20px -10px rgba(66, 68, 90, 1);
	display: flex;
	flex-direction: column;
	margin-top: 40px;
	background-color: #fff;
	width: 80%;
	border-radius: 10px;
	padding: 20px;
	box-shadow: 0px 9px 20px -7px rgba(66, 68, 90, 1);
	.patient-title {
		font-size: 1.7rem;
	}

	.patient-value {
		font-size: 1.4rem;
		font-weight: light;
		display: flex;
		gap: 20px;
		flex-direction: column;
		.email {
			display: flex;
			align-items: center;
		}
		.phone-number {
			display: flex;
			align-items: center;
		}
		.letter {
			color: ${({ theme }) => theme.colors.main};
		}
		svg {
			margin-right: 5px;
		}
		.patient-weight {
			font-size: 1.2rem;
		}
	}

	.patient-diets {
		cursor: pointer;
		gap: 25px;
		display: flex;
		flex-direction: column;
		p {
			font-size: 1.55rem;
		}
		.diet-title {
			background-color: #ffa500;
			padding: 20px;
			font-size: 1.2rem;
			border-radius: 10px;
			color: ${({ theme }) => theme.colors.whiteText};
			&:hover {
				background-color: #353535;
				padding: 20px;
				font-size: 1.2rem;
				border-radius: 10px;
				color: ${({ theme }) => theme.colors.main};
			}
		}
	}
`
