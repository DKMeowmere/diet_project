import useCalculations from "../../hooks/useCalculations"
import useReduce from "../../hooks/useReduce"
import { Meal as MealType } from "../../types/meal"
import { ProductGroup as ProductGroupType } from "../../types/productGroup."
import { ProductGroupRow, ProductGroupContainer } from "./styles"

type Props = {
	productGroup: ProductGroupType
	meal: MealType
}

export default function ProductGroupTable({ productGroup, meal }: Props) {
	const { getMealProductProperty, getMealProductGroupProperty } =
		useCalculations()
	const { calculateSum } = useReduce()

	return (
		<>
			<ProductGroupRow>
				<td className="cell strong">{productGroup.name}</td>
				<td className="cell strong">
					{
						+calculateSum(
							meal.products.map(product => {
								if (product.referringTo !== productGroup._id) return 0
								return +(+product.grams * +product.count).toFixed(2)
							})
						)
					}
					g
				</td>
				<td className="cell strong">
					{getMealProductGroupProperty("calories", meal, productGroup._id)} cal
				</td>
				<td className="cell strong">
					{getMealProductGroupProperty("proteins", meal, productGroup._id)} B
				</td>
				<td className="cell strong">
					{getMealProductGroupProperty("fats", meal, productGroup._id)} T
				</td>
				<td className="cell strong">
					{getMealProductGroupProperty("carbohydrates", meal, productGroup._id)}
					W
				</td>
				<td className="cell strong">
					{getMealProductGroupProperty("fiber", meal, productGroup._id)}Bł
				</td>
				<td className="cell strong">-</td>
			</ProductGroupRow>
			{meal.products.map(product => {
				if (product.referringTo !== productGroup._id) return null
				return (
					<ProductGroupContainer key={product._id}>
						<td className="cell">{product.product.name}</td>
						<td className="cell">
							{+(+product.grams * +product.count).toFixed(2)}g
						</td>
						<td className="cell">
							{getMealProductProperty(product, "calories")}
							cal
						</td>
						<td className="cell">
							{getMealProductProperty(product, "proteins")}B
						</td>
						<td className="cell">{getMealProductProperty(product, "fats")}T</td>
						<td className="cell">
							{getMealProductProperty(product, "carbohydrates")}W
						</td>
						<td className="cell">
							{getMealProductProperty(product, "fiber")}Bł
						</td>
						<td className="cell">{product.count}</td>
					</ProductGroupContainer>
				)
			})}
		</>
	)
}
