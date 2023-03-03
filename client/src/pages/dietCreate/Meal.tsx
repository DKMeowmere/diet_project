import { changeMealDescription, changeMealName, removeMeal } from '../../app/features/dietSlice'
import { useAppDispatch } from '../../app/hooks'
import theme from '../../app/theme'
import { Button } from '../../components/button/Button'
import Input from '../../components/input/Index'
import Textarea from '../../components/textarea/Index'
import { Day } from '../../types/day'
import { Meal as MealType, MealProduct } from '../../types/meal'
import { WhereToPassProduct } from '../../types/whereToPassProduct'
import Product from './Product'
import { ProductsContainer } from './styles'

type Props = {
	meal: MealType
	day: Day
	setIsModalOpen: (isModalOpen: boolean) => void
	setWhereToPassProduct: (whereToPassProduct: WhereToPassProduct) => void
}

export default function Meal({ meal, day, setIsModalOpen, setWhereToPassProduct }: Props) {
	const dispatch = useAppDispatch()

	return (
		<div className='meal' key={meal._id}>
			<div className='meal-name'>Podaj nazwe posiłku</div>
			<Input
				width='100%'
				height='70px'
				placeholder='Podaj tytuł'
				value={meal.name}
				onChange={e =>
					dispatch(
						changeMealName({
							day,
							meal,
							value: e.target.value,
						})
					)
				}
			/>

			<div className='meal-name'>Podaj opis posiłku</div>
			<Textarea
				width='100%'
				height='150px'
				placeholder='podaj opis... (opcjonalnie)'
				value={meal.description}
				onChange={e =>
					dispatch(
						changeMealDescription({
							day,
							meal,
							value: e.target.value,
						})
					)
				}
			/>
			<Button
				width='100%'
				height='40px'
				type='button'
				bgColor={theme.colors.main}
				onClick={() => {
					setIsModalOpen(true)
					setWhereToPassProduct({
						dayId: day._id,
						mealId: meal._id,
					})
				}}
				className='meal-btn'>
				Dodaj produkt do posiłku:
				{meal.name}
			</Button>
			{meal.products.length > 0 && (
				<ProductsContainer>
					{meal.products.map((product: MealProduct) => (
						<Product key={product._id} day={day} meal={meal} product={product} />
					))}
				</ProductsContainer>
			)}
<<<<<<< HEAD
			<div className='diet-values-amount'>
				<div className='diet-amount'>Razem</div>
				<div className='diet-calories'>
=======
			<div className='product-values'>
				<div className='product-amount'>Razem</div>
				<div className='product-calories'>
>>>>>>> 6d35824dabd80decd748f7469bc970b58ecfb5e1
					Kalorie:
					{meal.products.reduce<number>(
						(accumulator, product) => accumulator + product.product.calories * product.count * product.grams,
						0
					)}
				</div>
				<div className='product-carbo'>
					Węglowodany:
					{meal.products.reduce<number>(
						(accumulator, product) => accumulator + product.product.carbohydrates * product.count * product.grams,
						0
					)}
				</div>
				<div className='product-proteins'>
					Białka:
					{meal.products.reduce<number>(
						(accumulator, product) => accumulator + product.product.proteins * product.count * product.grams,
						0
					)}
				</div>
				<div className='product-fats'>
					Tłuszcze:
					{meal.products.reduce<number>(
						(accumulator, product) => accumulator + product.product.fats * product.count * product.grams,
						0
					)}
				</div>
			</div>

			<Button
				width='100%'
				height='40px'
				type='button'
				bgColor={theme.colors.errorMain}
				className='diet-btn'
				onClick={() =>
					dispatch(
						removeMeal({
							day,
							meal,
						})
					)
				}>
				Usuń posiłek
			</Button>
		</div>
	)
}
