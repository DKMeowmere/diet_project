import { DietDetailsContainer, Form } from './styles'
import Navbar from '../../components/navbar/Index'
import Input from '../../components/input/Index'
import { Button } from '../../components/button/Button'
import theme from '../../app/theme'
import Textarea from '../../components/textarea/Index'
import { TextareaContainer } from '../../components/textarea/styles'
import { Days } from './styles'

function DietDetails() {
	return (
		<DietDetailsContainer>
			<Form>
				<p className='diet-title'>Dodaj Dietę</p>
				<p className='diet-name'>dodaj Nazwę Diety</p>
				<Input width='90%' height='50px' placeholder='Podaj Nazwę' value='' onChange={e => {}} />
				<p className='diet-name'>dodaj Opis</p>
				<TextareaContainer width='90%' height='250px' value='' onChange={e => {}} placeholder='Opis' />

				<Days>
                    <div className="day">
                        Poniedziałek
                    </div>
                    <div className="meal-name">
                        śniadanie
                    </div>
                    <TextareaContainer width='90%' height='250px' value='' onChange={e => {}} placeholder='Opis' />
                </Days>
				<Button width='90%' height='40px' type='button' bgColor={theme.colors.main}>
					Dodaj Dźień
				</Button>
			</Form>
		</DietDetailsContainer>
	)
}
export default DietDetails
