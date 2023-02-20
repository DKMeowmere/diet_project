import { LoginContainer } from './styles'

import Input from '../../components/input/Index'
import { Button } from '../../components/button/Button'
import theme from '../../app/theme'
import PasswordInput from '../../components/passwordInput/Index'


function Login() {
	return (
		<LoginContainer>
			<form>
                <PasswordInput
					width='100%'
					height='50px'
					placeholder='Podaj Hasło'
					value=''
					onChange={e => {
						console.log()
					}}
				/>
				<Button width='100%' height='40px' type='submit' bgColor={theme.colors.main}>
					Zatwierdź
				</Button>
			</form>
		</LoginContainer>
	)
}
export default Login
