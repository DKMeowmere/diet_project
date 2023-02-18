import styled from 'styled-components'

export const HomeContainer = styled.article<{ imageUrl: string }>`
	background: url(${({ imageUrl }) => imageUrl});
	width: 100%;
	height: 100vh;
	background-repeat: no-repeat;

	background-size: cover;
	background-position: center;
	.block-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100vh;
		gap: 40px;
	}
	.block-icon {
		color: ${({theme})=>theme.colors.main};
	}

	.block-title {
		gap: 10px;
		font-size: 1.5rem;
		font-weight: 200;
	}
`
export const Block = styled.div`
	background-color: #fff;
	height: 20vh;
	width: 50%;
	height: auto;
	display: flex;
	color: #ffa500;
	background-color: #fff;
	flex-direction: column;
	justify-content: center;
	
	align-items: center;
	border: 1px #c5c395 solid;
	padding: 20px;
	&:hover{
		background-color: #ffa500;
		color: ${({theme})=>theme.colors.whiteText};
		cursor: pointer;
		svg{fill: ${({theme})=>theme.colors.whiteText};}
	}
	svg{
		font-size: 3.5rem;
	}
}
	&:last-child {
		margin-bottom: 0px;
	
	
`
