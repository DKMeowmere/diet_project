import {
	changeMealDescription,
	changeMealName,
	removeMeal,
} from "../../app/features/dietSlice"
import { useAppDispatch } from "../../app/hooks"
import theme from "../../app/theme"
import { Button } from "../../components/button/Button"
import Input from "../../components/input/Index"
import Textarea from "../../components/textarea/Index"
import { Day } from "../../types/day"
import { Meal as MealType, MealProduct } from "../../types/meal"
import { WhereToPassProduct } from "../../types/whereToPassProduct"
import Product from "./product"
import { ProductsContainer } from "./styles"

type Props = {
	meal: MealType
	day: Day
	setIsModalOpen: (isModalOpen: boolean) => void
	setWhereToPassProduct: (whereToPassProduct: WhereToPassProduct) => void
}

export default function Meal({
	meal,
	day,
	setIsModalOpen,
	setWhereToPassProduct,
}: Props) {
	const dispatch = useAppDispatch()

	return (
		<div className="meal" key={meal._id}>
			<div className="diet-text">Podaj nazwe posiłku</div>
			<Input
				width="100%"
				height="50px"
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
			<div className="diet-text">Podaj opis posiłku</div>
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
			<Button
				width="100%"
				height="40px"
				type="button"
				bgColor={theme.colors.main}
				onClick={() => {
					setIsModalOpen(true)
					setWhereToPassProduct({
						dayId: day._id,
						mealId: meal._id,
					})
				}}
				className="diet-btn"
			>
				Dodaj produkt do posiłku:
				{meal.name}
			</Button>

			<div className="diet-text">Razem</div>
			<div className="diet-text">
				Kalorie:
				{meal.products.reduce<number>(
					(accumulator, product) =>
						accumulator +
						product.product.calories *
							product.count *
							product.grams,
					0
				)}
			</div>
			<div className="diet-text">
				Węglowodany:
				{meal.products.reduce<number>(
					(accumulator, product) =>
						accumulator +
						product.product.carbohydrates *
							product.count *
							product.grams,
					0
				)}
			</div>
			<div className="diet-text">
				Białka:
				{meal.products.reduce<number>(
					(accumulator, product) =>
						accumulator +
						product.product.proteins *
							product.count *
							product.grams,
					0
				)}
			</div>
			<div className="diet-text">
				Tłuszcze:
				{meal.products.reduce<number>(
					(accumulator, product) =>
						accumulator +
						product.product.fats * product.count * product.grams,
					0
				)}
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
