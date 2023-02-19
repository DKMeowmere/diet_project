import { ProductDetailsContainer, Form } from './styles'
import Navbar from '../../components/navbar/Index'
import Input from '../../components/input/Index'

function ProductDetails() {
	return (
		<ProductDetailsContainer>
			<Form>
				<span className='title'>Zaaktualizuj Dietę</span>
				<p className='diet-title'>Nazwa Diety</p>
				<Input width='90%' height='50px' placeholder='Podaj Nazwę' value='' onChange={e => {}} />
				<span className="annotation">Wszystkie wartości są dla 100g</span>
			</Form>
		</ProductDetailsContainer>
	)
}
export default ProductDetails
