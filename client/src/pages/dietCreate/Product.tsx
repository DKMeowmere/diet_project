import { changeProductCount, changeProductGrams, removeProduct } from '../../app/features/dietSlice'
import { useAppDispatch } from '../../app/hooks'
import theme from '../../app/theme'
import { Button } from '../../components/button/Button'
import Input from '../../components/input/Index'
import useCalculations from '../../hooks/useCalculations'
import { Day } from '../../types/day'
import { MealProduct, Meal } from '../../types/meal'
import { HiTrash } from 'react-icons/hi'

type Props = {
	product: MealProduct
	meal: Meal
	day: Day
}

export default function Product({ product, meal, day }: Props) {
	const dispatch = useAppDispatch()
	const { getMealProductProperty } = useCalculations()

	return (
		<div className='product'>
			<div className='product-value-container'>
				<div className='product-container'>
					<div className='products-meal'>Produkt </div>
					<div className='weight-meal'>Waga (g)</div>
					<div className='calories-meal'>Kalorie</div>
					<div className='carbo-meal'>Węglowodany</div>
					<div className='proteins-meal'>Białka</div>
					<div className='fats-meal'>Tłuszcze</div>
				</div>
				<div className='value'>
					<div className='product-name'>{product.product.name}</div>
					<div className='weight-number'>
						{' '}
						<Input
							width='40%'
							height='100%'
							inputClassName="weight-input"
							placeholder='ilość'
							value={product.grams.toString()}
							onChange={e =>
								dispatch(
									changeProductGrams({
										day,
										meal,
										product,
										value: e.target.value,
									})
								)
							}
						/>{' '}
					</div>
					<div className='calories-number'>{getMealProductProperty(product, 'calories')}</div>
					<div className='carbo-number'>{getMealProductProperty(product, 'carbohydrates')}</div>
					<div className='proteins-number'>{getMealProductProperty(product, 'proteins')}</div>
					<div className='fats-number'>{getMealProductProperty(product, 'fats')}</div>
				</div>

				<HiTrash 
				onClick={() =>
					dispatch(
						removeProduct({
							day,
							meal,
							product,
						})
					)
				}/>
			</div>
			{/* <Input
							width='100%'
							height='50px'
							placeholder='Podaj ilość'
							value={product.count.toString()}
							onChange={e =>
								dispatch(
									changeProductCount({
										day,
										meal,
										product,
										value: e.target.value,
									})
								)
							}
						/> */}

			
		</div>
	)
}
