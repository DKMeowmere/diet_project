import { DietContainer, MealsContainer, DaysContainer, Day, ProductsContainer, Product } from './styles'
import { Diet } from './styles'
import { LeftArrow, RightArrow } from '../../components/arrow/Index'

function Diets() {
	return (
		<DietContainer>
			<Diet>
				<div className='diet-box'>
					<div className='title'>Dieta 1</div>
					<div className='day-description'>
						twoja dieta Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam, atque quod porro adipisci
						voluptatem, eaque, nesciunt vitae corrupti minima repellendus natus quia aliquam fuga eos unde magni
						excepturi ex sapiente?
					</div>
				</div>
				<DaysContainer>
					<Day>
						<div className='day-name'>Poniedziałek</div>

						<MealsContainer>
							<div className='meal-box'>
								<div className='meal-title'>Śniadanie</div>
								<div className='meals-description'>
									twoja dieta Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam, atque quod porro
									adipisci voluptatem, eaque, nesciunt vitae corrupti minima repellendus natus quia aliquam fuga eos
									unde magni excepturi ex sapiente? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia odit
									dolorum sunt itaque quaerat sit omnis in excepturi provident eveniet. Facilis repellendus rem
									exercitationem! Quam odit excepturi expedita perspiciatis aperiam?
								</div>
							</div>

							<ProductsContainer>
								<thead>
									<th className='cell'>Nazwa</th>
									<th className='cell'>Kalorie</th>
									<th className='cell'>Białka</th>
									<th className='cell'>Tłuszcze</th>
									<th className='cell'>Węglowodany</th>
									<th className='cell'>Ilość</th>
									<th className='cell'>Waga</th>
								</thead>
								<Product>
									<td className='cell'>Pizza</td>
									<td className='cell'>10</td>
									<td className='cell'>20</td>
									<td className='cell'>40</td>
									<td className='cell'>20</td>
									<td className='cell'>2</td>
									<td className='cell'>200</td>
								</Product>

								<Product>
									<td className='cell'>Pizza</td>
									<td className='cell'>10</td>
									<td className='cell'>20</td>
									<td className='cell'>40</td>
									<td className='cell'>20</td>
									<td className='cell'>2</td>
									<td className='cell'>200</td>
								</Product>

								<Product>
									<td className='cell'>Pizza</td>
									<td className='cell'>10</td>
									<td className='cell'>20</td>
									<td className='cell'>40</td>
									<td className='cell'>20</td>
									<td className='cell'>2</td>
									<td className='cell'>200</td>
								</Product>

								<Product>
									<td className='cell'>Pizza</td>
									<td className='cell'>10</td>
									<td className='cell'>20</td>
									<td className='cell'>40</td>
									<td className='cell'>20</td>
									<td className='cell'>2</td>
									<td className='cell'>200</td>
								</Product>

								<Product>
									<td className='cell'>Pizza</td>
									<td className='cell'>10</td>
									<td className='cell'>20</td>
									<td className='cell'>40</td>
									<td className='cell'>20</td>
									<td className='cell'>2</td>
									<td className='cell'>200</td>
								</Product>
							</ProductsContainer>
						</MealsContainer>
					</Day>
				</DaysContainer>
			</Diet>
			<LeftArrow />
			<RightArrow />
		</DietContainer>
	)
}
export default Diets
