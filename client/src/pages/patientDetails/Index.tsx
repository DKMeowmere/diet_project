import { PatientDetailsContainer, Form } from './styles'
import Navbar from '../../components/navbar/Index'
import Input from '../../components/input/Index'
import { Button } from '../../components/button/Button'
import theme from '../../app/theme'

function PatientDetails() {
	return (
		<PatientDetailsContainer>
			<Form>
				<p className='diet-first-title'>Modyfikuj Pacjenta</p>
				<p className='diet-title'>Edytuj Imię Pacjenta</p>
				<Input width='90%' height='50px' placeholder='Edytuj Imię' value='' onChange={e => {}} />
				<p className='diet-title'>Edytuj Nazwisko Pacjenta</p>
				<Input width='90%' height='50px' placeholder='Edytuj Nazwisko' value='' onChange={e => {}} />
				<p className='diet-title'>Edytuj email Pacjenta</p>

				<Input width='90%' height='50px' placeholder='Edytuj email' value='' onChange={e => {}} />
				<p className='diet-title'>Edytuj nr. Tel Pacjenta</p>
				<Input width='90%' height='50px' placeholder='Edytuj numer telefonu' value='' onChange={e => {}} />
				<Button width='90%' height='40px' type='submit' bgColor={theme.colors.main}>
					Zatwierdź
				</Button>
				
			</Form>
		</PatientDetailsContainer>
	)
}
export default PatientDetails