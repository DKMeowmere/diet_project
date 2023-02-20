import { DietCreateContainer, Form } from './styles'
import Navbar from '../../components/navbar/Index'
import Input from '../../components/input/Index'
import { Button } from '../../components/button/Button'
import theme from '../../app/theme'

function CreateDiet() {
	return (
		<DietCreateContainer>
			<Form>
				<p className='diet-first-title'>Dodaj Dietę</p>
				<p className='diet-title'>Podaj Nazwę Diety</p>
				<Input width='90%' height='50px' placeholder='Podaj Nazwę' value='' onChange={e => {}} />
				<p className='diet-title'>Podaj Opis</p>
				<Input width='90%' height='50px' placeholder='Podaj Nazwisko' value='' onChange={e => {}} />
				<Button width='90%' height='40px' type='button' bgColor={theme.colors.main}>
					Dodaj Dźień
				</Button>

				<Input width='90%' height='50px' placeholder='Podaj email' value='' onChange={e => {}} />
				<p className='diet-title'>Podaj nr. Tel Pacjenta</p>
				<Input width='90%' height='50px' placeholder='Podaj numer telefonu' value='' onChange={e => {}} />
				<Button width='90%' height='40px' type='submit' bgColor={theme.colors.main}>
					Zatwierdź
				</Button>
				
			</Form>
		</DietCreateContainer>
	)
}
export default CreateDiet