import useReduce from "../../hooks/useReduce"
import { Meal } from "../../types/meal"

type Props = {
	meal: Meal
}

export default function FooterRow({ meal }: Props) {
	const { calculateSum } = useReduce()

	return (
		<tfoot>
			<tr>
				<td className="cell strong">Łącznie</td>
				<td className="cell strong">
					{calculateSum(
						meal.products.map(
							product =>
								+product.product.calories * +product.count * +product.grams
						)
					)}
					cal
				</td>
				<td className="cell strong">
					{calculateSum(
						meal.products.map(
							product =>
								+product.product.proteins * +product.count * +product.grams
						)
					)}
					B
				</td>
				<td className="cell strong">
					{calculateSum(
						meal.products.map(
							product => +product.product.fats * +product.count * +product.grams
						)
					)}
					T
				</td>
				<td className="cell strong">
					{calculateSum(
						meal.products.map(
							product =>
								+product.product.carbohydrates * +product.count * +product.grams
						)
					)}
					W
				</td>
				<td className="cell strong">
					{calculateSum(meal.products.map(product => +product.count))}
				</td>
				<td className="cell strong">
					{calculateSum(
						meal.products.map(product => +product.grams * +product.count)
					)}
					g
				</td>
			</tr>
		</tfoot>
	)
}
