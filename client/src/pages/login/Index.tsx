import { Block, LoginContainer } from './styles'
import { Button } from '../../components/button/Button'
import theme from '../../app/theme'
import PasswordInput from '../../components/passwordInput/Index'
import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'
import { useNavigate } from 'react-router-dom'
import backgroundImage from '../../assets/kosmos.jpg'

function Login() {
	const [password, setPassword] = useState('')
	const { login } = useLogin()
	const navigate = useNavigate()

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		await login(password)
		navigate('/')
	}

	return (
		<LoginContainer imageUrl={backgroundImage}>
			<Block>
				<span className='title'>Login</span>
				<form onSubmit={handleSubmit}>
					<PasswordInput
						width='100%'
						height='50px'
						placeholder='Podaj Hasło'
						value={password}
						onChange={e => setPassword(e.target.value)}
						data-cy='password-input'
					/>
					<Button
						width='100%'
						height='40px'
						type='submit'
						bgColor={theme.colors.whiteText}
						data-cy='password-submit'
						className='btn'>
						LOGIN
					</Button>
				</form>
			</Block>
		</LoginContainer>
	)
}
export default Login
