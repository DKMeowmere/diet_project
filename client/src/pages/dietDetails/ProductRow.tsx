import { MealProduct } from "../../types/meal"
import { ProductContainer } from "./styles"

type Props = {
	product: MealProduct
}

export default function ProductRow({ product }: Props) {
	return (
		<ProductContainer>
			<td className="cell">{product.product.name}</td>
			<td className="cell">
				{(product.product.calories * product.grams * product.count) /
					100}
				cal
			</td>
			<td className="cell">
				{(product.product.proteins * product.grams * product.count) /
					100}
				B
			</td>
			<td className="cell">
				{(product.product.fats * product.grams * product.count) / 100}T
			</td>
			<td className="cell">
				{(product.product.carbohydrates *
					product.grams *
					product.count) /
					100}
				W
			</td>
			<td className="cell">{product.count}</td>
			<td className="cell">{product.grams}g</td>
		</ProductContainer>
	)
}
