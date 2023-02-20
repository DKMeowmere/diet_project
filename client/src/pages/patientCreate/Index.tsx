import { PatientCreateContainer, Form } from './styles'
import Navbar from '../../components/navbar/Index'
import Input from '../../components/input/Index'
import { Button } from '../../components/button/Button'
import theme from '../../app/theme'

function CreatePatient() {
	return (
		<PatientCreateContainer>
			<Form>
				<p className='diet-first-title'>Dodaj Pacjenta</p>
				<p className='diet-title'>Podaj Imię Pacjenta</p>
				<Input width='90%' height='50px' placeholder='Podaj Imię' value='' onChange={e => {}} />
				<p className='diet-title'>Podaj Nazwisko Pacjenta</p>
				<Input width='90%' height='50px' placeholder='Podaj Nazwisko' value='' onChange={e => {}} />
				<p className='diet-title'>Podaj email Pacjenta</p>

				<Input width='90%' height='50px' placeholder='Podaj email' value='' onChange={e => {}} />
				<p className='diet-title'>Podaj nr. Tel Pacjenta</p>
				<Input width='90%' height='50px' placeholder='Podaj numer telefonu' value='' onChange={e => {}} />
				<Button width='90%' height='40px' type='submit' bgColor={theme.colors.main}>
					Zatwierdź
				</Button>
				
			</Form>
		</PatientCreateContainer>
	)
}
export default CreatePatient