import styled from "styled-components"

export const DietContainer = styled.article`
	width: 100%;
	display: flex;
	justify-content: center;
	padding-bottom: 30px;
`

export const Diet = styled.div`
	width: 75%;
	display: flex;
	flex-direction: column;
	gap: 20px;
	background-color: #fff;
	border-radius: 15px;
	margin-top: 20px;
	padding: 20px;
	justify-content: center;
	.title {
		font-size: 2rem;
		position: relative;
		margin-bottom: 20px;
		.icons {
			position: absolute;
			right: 8px;
			top: -8px;
			display: flex;
			gap: 20px;

			svg {
				padding: 10px;
				border-radius: 50%;
				cursor: pointer;
				fill: ${({ theme }) => theme.colors.main};
				color: ${({ theme }) => theme.colors.main};
				width: 60px;
				height: 60px;
				background-color: #fff;
				display: flex;
				&:hover {
					background-color: ${({ theme }) => theme.colors.main};
					fill: ${({ theme }) => theme.colors.whiteText};
					color: ${({ theme }) => theme.colors.whiteText};
				}
			}
		}
	}
	a {
		text-align: center;
		font-size: 2rem;
		&:hover {
			text-decoration: underline;
		}
	}
	.diet-box {
		background-color: #ffa500;
		padding: 20px;
		border-radius: 10px;
		color: ${({ theme }) => theme.colors.whiteText};
	}

	.diet-description {
		font-size: 1.2rem;
	}
	.diet-property-badge {
		width: 90%;
		max-width: 600px;
		margin: 20px 20px 0 0;
		background-color: #fff;
		padding: 20px;
		border-radius: 20px;
		font-weight: bold;
		color: ${({ theme }) => theme.colors.main};
	}
`

export const DaysContainer = styled.div``

export const Day = styled.section`
	padding: 40px;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	background-color: #eee;
	.day-name {
		font-size: 2rem;
		border-bottom: 0.2rem solid black;
		padding: 20px;
		color: ${({ theme }) => theme.colors.blackText};
		display: flex;
		justify-content: center;
		flex-direction: row;
		position: relative;

		.pdf-icon {
			position: absolute;
			right: 20px;
			padding: 10px;
			border-radius: 50%;
			cursor: pointer;
			top: 0;
			fill: ${({ theme }) => theme.colors.main};
			width: 60px;
			height: 60px;
			background-color: #fff;
			display: flex;
			&:hover {
				background-color: ${({ theme }) => theme.colors.main};
				fill: ${({ theme }) => theme.colors.whiteText};
			}
		}
	}
	.property-badge {
		width: 90%;
		max-width: 400px;
		margin: 20px auto 0;
	}
`

export const MealsContainer = styled.div`
	gap: 20px;
	display: flex;
	flex-direction: column;
	.meal-box {
		padding: 20px;
		color: ${({ theme }) => theme.colors.blackText};
	}
	.meal-title {
		font-size: 1.6rem;
		margin-bottom: 20px;
		text-align: center;
	}
	.meals-description {
		font-size: 1.2rem;
		text-align: center;
	}
	.product-group-description {
		text-align: center;
		font-size: 1rem;
		margin: 15px;
	}
`

export const TableContainer = styled.table`
	text-align: center;
	margin: auto;
	border-collapse: collapse;
	width: 80%;
	.cell {
		border: 2px solid black;
		padding: 12px;
		font-size: 0.6rem;
	}
	.strong {
		background-color: ${({ theme }) => theme.colors.main};
		color: ${({ theme }) => theme.colors.whiteText};
	}
	.bold {
		font-weight: bold;
		font-size: 0.9rem;
	}
`

export const ProductContainer = styled.tr`
	td {
		background-color: #fff;
		color: black;
	}
`

export const ProductGroupContainer = styled.tr`
	td {
		padding: 6px !important;
		background-color: #f0f0f0 !important;
		color: black !important;
	}
`

export const ProductGroupRow = styled.tr`
	border: none;
	border-collapse: collapse;

	td {
		background-color: #fff;
		color: black;
	}
`

export const PdfDietContainer = styled(DietContainer)`
	width: 100%;
	min-height: 100%;
	margin: auto;
	display: flex;
	flex-direction: column;
	gap: 20px;
	background-color: #fff;
	padding: 20px;
	justify-content: center;
	.title {
		font-size: 2rem;
		margin-bottom: 20px;
	}
	a {
		text-align: center;
		font-size: 2rem;
		&:hover {
			text-decoration: underline;
		}
	}
	.diet-box {
		background-color: #ffa500;
		padding: 20px;
		border-radius: 10px;
		color: ${({ theme }) => theme.colors.whiteText};
	}
	.diet-description {
		font-size: 1.2rem;
	}
	.diet-property-badge {
		width: 90%;
		max-width: 600px;
		margin: 20px 20px 0 0;
		background-color: #fff;
		padding: 20px;
		border-radius: 20px;
		font-weight: bold;
		color: ${({ theme }) => theme.colors.main};
	}
`

export const PdfDay = styled(Day)`
	border-radius: 0;
	background-color: #fff;
`
