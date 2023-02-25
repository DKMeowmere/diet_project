import styled from 'styled-components'

export const DietContainer = styled.article`
	width: 100%;
	display: flex;
	justify-content: center;
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
        margin-bottom: 20px;
	}
	.diet-box {
		background-color: #ffa500;
		padding: 20px;
		border-radius: 10px;
		color: ${({ theme }) => theme.colors.whiteText};
	}
	
    .day-description{
        font-size: 1.2rem;
    }
`

export const DaysContainer = styled.div``

export const Day = styled.section`
	padding: 20px;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	background-color: #eee;
	.day-name {
		font-size: 2.0rem;
        border-bottom: 0.2rem solid black;
        padding: 20px;
        color: ${({ theme }) => theme.colors.blackText};
        display: flex;
        justify-content: center;
        flex-direction: row;
	}
`

export const MealsContainer = styled.div`
	gap: 20px;
	display: flex;
	flex-direction: column;
    .meal-box{
        
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
        
	}
`
export const ProductsContainer = styled.table`
	text-align: center;
	.cell {
		border: 2px solid black;
		
		
        padding: 20px;
	}
    th{
        background-color: ${({ theme }) => theme.colors.main};
        color: ${({ theme }) => theme.colors.whiteText};

    }
	border-collapse: collapse;
`

export const Product = styled.tr`
	td {
		
		background-color: #fff;
        color: black;
       
	}
`
