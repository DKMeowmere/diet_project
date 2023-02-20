import { ProductCreateContainer, Form } from './styles'
import Navbar from '../../components/navbar/Index'
import Input from '../../components/input/Index'
import { Button } from '../../components/button/Button'
import theme from '../../app/theme'

function CreateProduct() {
	return (
		<ProductCreateContainer>
			<Form>
				<p className='diet-first-title'>Stwórz Produkt</p>
				<p className='diet-second-title'>Wszystkie wartości są dla 100g</p>
				<p className='diet-title'>Podaj ilość kalori</p>
				<Input width='90%' height='50px' placeholder='Podaj Ilość' value='' onChange={e => {}} />
				<p className='diet-title'>Podaj ilość Tłuszczy</p>
				<Input width='90%' height='50px' placeholder='Podaj Ilość' value='' onChange={e => {}} />
				<p className='diet-title'>Podaj ilość Białka</p>

				<Input width='90%' height='50px' placeholder='Podaj Ilość' value='' onChange={e => {}} />
				<p className='diet-title'>Podaj ilość Węglowodanów</p>
				<Input width='90%' height='50px' placeholder='Podaj Ilość' value='' onChange={e => {}} />
				<Button width='90%' height='40px' type='submit' bgColor={theme.colors.main}>
					Zatwierdź
				</Button>
				
			</Form>
		</ProductCreateContainer>
	)
}
export default CreateProduct
