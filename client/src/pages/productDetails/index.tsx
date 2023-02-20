import { ProductDetailsContainer, Form } from './styles'
import Navbar from '../../components/navbar/Index'
import Input from '../../components/input/Index'
import { Button } from '../../components/button/Button'
import theme from '../../app/theme'

function ProductDetails() {
	return (
		<ProductDetailsContainer>
			<Form>
				<p className='diet-first-title'>Modyfikuj Produkt</p>
				<p className='diet-second-title'>Wszystkie wartości są dla 100g</p>
				<p className='diet-title'>Edytuj ilość kalori</p>
				<Input width='90%' height='50px' placeholder='Edytuj Ilość' value='' onChange={e => {}} />
				<p className='diet-title'>Edytuj ilość Tłuszczy</p>
				<Input width='90%' height='50px' placeholder='Edytuj Ilość' value='' onChange={e => {}} />
				<p className='diet-title'>Edytuj ilość Białka</p>

				<Input width='90%' height='50px' placeholder='Edytuj Ilość' value='' onChange={e => {}} />
				<p className='diet-title'>Edytuj ilość Węglowodanów</p>
				<Input width='90%' height='50px' placeholder='Edytuj Ilość' value='' onChange={e => {}} />
				<Button width='90%' height='40px' type='submit' bgColor={theme.colors.main}>
					Zatwierdź
				</Button>
				
			</Form>
		</ProductDetailsContainer>
	)
}
export default ProductDetails
