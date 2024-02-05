import styled from 'styled-components'

export const LoginContainer = styled.article<{ imageUrl: string }>`
	background: url(${({ imageUrl }) => imageUrl});
	width: 100%;
	height: 100vh;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	display: flex;
	justify-content: center;
	align-items: top;
	form {
		width: 300px;
		display: flex;
		flex-direction: column;
		border-radius: 25px;
		gap: 25px;
	}
`
export const Block = styled.div`
	padding: 50px;
	display: flex;
	height: 300px;
	margin-top: 50px;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	border-radius: 25px;
	gap: 25px;
	opacity: 0.9;
	backdrop-filter: blur(20px);
	box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
	.btn {
		color: ${({ theme }) => theme.colors.whiteText};
		background-color: #4158d0;
		background-image: linear-gradient(43deg, #4158d0 0%, #c850c0 46%, #ffcc70 100%);
		border-radius: 25px;
	}
	.title {
		color: ${({ theme }) => theme.colors.whiteText};
		font-weight: 700;
		font-size: 2.5rem;
		font-family: 'Poppins' sans-serif;
	}
`
