import useReduce from "../../hooks/useReduce"
import { Meal } from "../../types/meal"

type Props = {
	meal: Meal
}

export default function FooterRow({ meal }: Props) {
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
		<tfoot>
			<tr>
				<td className="cell strong bold">Łącznie</td>
				<td className="cell strong bold">
					{calculateMealProperty("calories")}
					cal
				</td>
				<td className="cell strong bold">
					{calculateMealProperty("proteins")}B
				</td>
				<td className="cell strong bold">{calculateMealProperty("fats")}T</td>
				<td className="cell strong bold">
					{calculateMealProperty("carbohydrates")}W
				</td>
				<td className="cell strong bold">
					{+calculateSum(meal.products.map(product => +product.count)) +
						+calculateSum(meal.dishes.map(dish => +dish.count))}
				</td>
				<td className="cell strong bold">
					{+calculateSum(
						meal.products.map(product => +product.grams * +product.count)
					) + +calculateSum(meal.dishes.map(dish => +dish.grams * +dish.count))}
					g
				</td>
			</tr>
		</tfoot>
	)
}
