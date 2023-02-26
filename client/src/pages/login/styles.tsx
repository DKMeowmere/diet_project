import styled from "styled-components"

export const LoginContainer = styled.article<{ imageUrl: string }>`
	width: 100%;
	display: flex;
	justify-content: center;
	height: 100vh;
	align-items: center;
	background: url(${({ imageUrl }) => imageUrl});
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	form {
		width: 300px;
		gap: 20px;
		display: flex;
		flex-direction: column;
	}
`
