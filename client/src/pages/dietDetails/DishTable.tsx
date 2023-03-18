import useCalculations from "../../hooks/useCalculations"
import { MealDish } from "../../types/meal"
import { DishRow, ProductDishContainer } from "./styles"

type Props = {
	dish: MealDish
}

export default function DishTable({ dish }: Props) {
	const {
		getDishProperty,
		getMealProductPropertyInDish,
		getDefaultDishWeight,
	} = useCalculations()

	return (
		<>
			<DishRow>
				<td className="cell strong">{dish.dishDetails.name}</td>
				<td className="cell strong">
					{getDishProperty(dish, "calories")}
					cal
				</td>
				<td className="cell strong">{getDishProperty(dish, "proteins")}B</td>
				<td className="cell strong">{getDishProperty(dish, "fats")}T</td>
				<td className="cell strong">
					{getDishProperty(dish, "carbohydrates")}W
				</td>
				<td className="cell strong">{dish.count}</td>
				<td className="cell strong">{+dish.grams * +dish.count}g</td>
			</DishRow>
			{dish.dishDetails.products.map(product => (
				<ProductDishContainer key={product._id}>
					<td className="cell">{product.product.name}</td>
					<td className="cell">
						{getMealProductPropertyInDish(dish, product, "calories")}
						cal
					</td>
					<td className="cell">
						{getMealProductPropertyInDish(dish, product, "proteins")}B
					</td>
					<td className="cell">
						{getMealProductPropertyInDish(dish, product, "fats")}T
					</td>
					<td className="cell">
						{getMealProductPropertyInDish(dish, product, "carbohydrates")}W
					</td>
					<td className="cell">{product.count}</td>
					<td className="cell">
						{
							+(
								(+dish.grams / getDefaultDishWeight(dish.dishDetails)) *
								+product.grams * +product.count
							).toFixed(2)
						}
						g
					</td>
				</ProductDishContainer>
			))}
		</>
	)
}
