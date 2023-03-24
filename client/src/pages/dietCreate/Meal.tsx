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
import useCalculations from "../../hooks/useCalculations"
import { Day } from "../../types/day"
import { Meal as MealType, MealDish, MealProduct } from "../../types/meal"
import Dish from "./Dish"
import Product from "./Product"
import ProductGroup from "./ProductGroup"
import { ProductsContainer } from "./styles"

type Props = {
	meal: MealType
	day: Day
	setIsProductModalOpen: (isModalOpen: boolean) => void
	setIsDishModalOpen: (isModalOpen: boolean) => void
	setIsProductGroupModalOpen: (isModalOpen: boolean) => void
}

export default function Meal({
	meal,
	day,
	setIsProductModalOpen,
	// setIsDishModalOpen,
	setIsProductGroupModalOpen,
}: Props) {
	const dispatch = useAppDispatch()
	const { getMealProperty } = useCalculations()

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
					setIsProductGroupModalOpen(true)
				}}
				className="meal-btn"
			>
				Dodaj potrawe do posiłku:
				{meal.name}
			</Button>
			{/* <Button
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
			</Button> */}
			{meal.products.length > 0 && (
				<ProductsContainer>
					<div className="product-container">
						<div className="products-meal">Produkt </div>
						<div className="weight-meal">Waga (g)</div>
						<div className="calories-meal">Kalorie</div>
						<div className="carbo-meal">Węglowodany</div>
						<div className="proteins-meal">Białka</div>
						<div className="fats-meal">Tłuszcze</div>
            <div className="weight-meal">Ilość</div>
					</div>
					{meal.products.map((product: MealProduct) => {
						if (product.referringTo) return
						return (
							<Product
								key={product._id}
								day={day}
								meal={meal}
								product={product}
							/>
						)
					})}
				</ProductsContainer>
			)}
			{meal.productGroups.length > 0 &&
				meal.productGroups.map(productGroup => (
					<ProductGroup
						key={productGroup._id}
						meal={meal}
						day={day}
						productGroup={productGroup}
					/>
				))}
			{meal.dishes.length > 0 && (
				<ProductsContainer>
					{meal.dishes.map((dish: MealDish) => (
						<Dish key={dish._id} day={day} meal={meal} dish={dish} />
					))}
				</ProductsContainer>
			)}
			<div className="product-container meal-summary">
				<div className="amount-meal">Razem</div>
				<div className="calories-meal">
					Kalorie:
					{getMealProperty(meal, "calories")}
				</div>
				<div className="carbo-meal">
					Węglowodany:
					{getMealProperty(meal, "carbohydrates")}
				</div>
				<div className="proteins-meal">
					Białka:
					{getMealProperty(meal, "proteins")}
				</div>
				<div className="fats-meal">
					Tłuszcze:
					{getMealProperty(meal, "fats")}
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
