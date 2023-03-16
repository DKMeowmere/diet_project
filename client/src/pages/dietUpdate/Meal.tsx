import {
	changeMealDescription,
	changeMealName,
	removeMeal,
	updateWhereToPass,
} from "../../app/features/dietSlice"
import { useAppDispatch } from "../../app/hooks"
import theme from "../../app/theme"
import { Button } from "../../components/button/Button"
import Input from "../../components/input/Index"
import Textarea from "../../components/textarea/Index"
import useReduce from "../../hooks/useReduce"
import { Day } from "../../types/day"
import { Meal as MealType, MealDish, MealProduct } from "../../types/meal"
import Dish from "./Dish"
import Product from "./Product"
import { ProductsContainer } from "./styles"

type Props = {
	meal: MealType
	day: Day
	setIsProductModalOpen: (isModalOpen: boolean) => void
	setIsDishModalOpen: (isModalOpen: boolean) => void
}

export default function Meal({
	meal,
	day,
	setIsProductModalOpen,
	setIsDishModalOpen,
}: Props) {
	const dispatch = useAppDispatch()
	const { calculateSum } = useReduce()

	function calculateMealProperty(key: string): number {
		//get sum of meal products e.g. calories and dishes e.g. calories
		const productPropertySum =
			calculateSum(
				meal.products.map(product => {
					type ProductKey = keyof typeof product.product
					return (
						+product.product[key as ProductKey] *
						+product.count *
						+product.grams
					)
				})
			) / 100

		const dishPropertySum = calculateSum(
			meal.dishes.map(
				dish =>
					(calculateSum(
						dish.dishDetails.products.map(product => {
							type ProductKey = keyof typeof product.product
							return (
								(+product.product[key as ProductKey] *
									+product.count *
									+product.grams) /
								100
							)
						})
					) /
						100) *
					+dish.count *
					+dish.grams
			)
		)

		return +(productPropertySum + dishPropertySum).toFixed(2)
	}

	return (
		<div className="meal" key={meal._id}>
			<div className="meal-name">Podaj nazwe posiłku</div>
			<Input
				width="100%"
				height="70px"
				placeholder="Podaj tytuł"
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

			<div className="meal-name">Podaj opis posiłku</div>
			<Textarea
				width="100%"
				height="150px"
				placeholder="podaj opis... (opcjonalnie)"
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
				width="100%"
				height="40px"
				type="button"
				bgColor={theme.colors.main}
				onClick={() => {
					dispatch(updateWhereToPass({ dayId: day._id, mealId: meal._id }))
					setIsProductModalOpen(true)
				}}
				className="meal-btn"
			>
				Dodaj produkt do posiłku:
				{meal.name}
			</Button>
			<Button
				width="100%"
				height="40px"
				type="button"
				bgColor={theme.colors.main}
				onClick={() => {
					dispatch(updateWhereToPass({ dayId: day._id, mealId: meal._id }))
					setIsDishModalOpen(true)
				}}
				className="meal-btn"
			>
				Dodaj potrawe do posiłku:
				{meal.name}
			</Button>
			{meal.products.length > 0 && (
				<ProductsContainer>
					{meal.products.map((product: MealProduct) => (
						<Product
							key={product._id}
							day={day}
							meal={meal}
							product={product}
						/>
					))}
				</ProductsContainer>
			)}
			{meal.dishes.length > 0 && (
				<ProductsContainer>
					{meal.dishes.map((dish: MealDish) => (
						<Dish key={dish._id} day={day} meal={meal} dish={dish} />
					))}
				</ProductsContainer>
			)}
			<div className="values">
				<div className="amount">Razem</div>
				<div className="calories">
					Kalorie:
					{calculateMealProperty("calories")}
				</div>
				<div className="carbo">
					Węglowodany:
					{calculateMealProperty("carbohydrates")}
				</div>
				<div className="proteins">
					Białka:
					{calculateMealProperty("proteins")}
				</div>
				<div className="fats">
					Tłuszcze:
					{calculateMealProperty("fats")}
				</div>
			</div>

			<Button
				width="100%"
				height="40px"
				type="button"
				bgColor={theme.colors.errorMain}
				className="diet-btn"
				onClick={() =>
					dispatch(
						removeMeal({
							day,
							meal,
						})
					)
				}
			>
				Usuń posiłek
			</Button>
		</div>
	)
}
