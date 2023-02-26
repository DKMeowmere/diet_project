import { PatientCreateContainer, Form } from './styles'
import Input from '../../components/input/Index'
import { Button } from '../../components/button/Button'
import theme from '../../app/theme'

function CreatePatient() {
	return (
		<PatientCreateContainer>
			<Form>
				<p className='diet-first-title'>Dodaj pacjenta</p>
				<p className='diet-title'>Podaj imię pacjenta</p>
				<Input width='90%' height='50px' placeholder='Podaj Imię' value='' onChange={e => {}} />
				<p className='diet-title'>Podaj nazwisko pacjenta</p>
				<Input width='90%' height='50px' placeholder='Podaj Nazwisko' value='' onChange={e => {}} />
				<p className='diet-title'>Podaj email pacjenta</p>

				<Input width='90%' height='50px' placeholder='Podaj email' value='' onChange={e => {}} />
				<p className='diet-title'>Podaj nr. tel pacjenta</p>
				<Input width='90%' height='50px' placeholder='Podaj numer telefonu' value='' onChange={e => {}} />
				<Button width='90%' height='40px' type='submit' bgColor={theme.colors.main}>
					Zatwierdź
				</Button>
				
			</Form>
		</PatientCreateContainer>
	)
}
export default CreatePatient