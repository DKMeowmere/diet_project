import useCalculations from "../../hooks/useCalculations"
import { MealProduct } from "../../types/meal"
import { ProductContainer } from "./styles"

type Props = {
	product: MealProduct
}

export default function ProductRow({ product }: Props) {
	const { getMealProductProperty } = useCalculations()

	return (
		<ProductContainer>
			<td className="cell">{product.product.name}</td>
			<td className="cell">
				{getMealProductProperty(product, "calories")}
				cal
			</td>
			<td className="cell">{getMealProductProperty(product, "proteins")}B</td>
			<td className="cell">{getMealProductProperty(product, "fats")}T</td>
			<td className="cell">
				{getMealProductProperty(product, "carbohydrates")}W
			</td>
			<td className="cell">{product.count}</td>
			<td className="cell">{+(+product.grams * +product.count).toFixed(2)}g</td>
		</ProductContainer>
	)
}
