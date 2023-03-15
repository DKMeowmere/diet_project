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
					{
						+(
							+calculateSum(
								meal.products.map(
									product =>
										+product.product.calories * +product.count * +product.grams
								)
							) / 100
						).toFixed(2)
					}
					cal
				</td>
				<td className="cell strong">
					{
						+(
							+calculateSum(
								meal.products.map(
									product =>
										+product.product.proteins * +product.count * +product.grams
								)
							) / 100
						).toFixed(2)
					}
					B
				</td>
				<td className="cell strong">
					{
						+(
							+calculateSum(
								meal.products.map(
									product =>
										+product.product.fats * +product.count * +product.grams
								)
							) / 100
						).toFixed(2)
					}
					T
				</td>
				<td className="cell strong">
					{
						+(
							+calculateSum(
								meal.products.map(
									product =>
										+product.product.carbohydrates *
										+product.count *
										+product.grams
								)
							) / 100
						).toFixed(2)
					}
					W
				</td>
				<td className="cell strong">
					{+calculateSum(meal.products.map(product => +product.count))}
				</td>
				<td className="cell strong">
					{
						+calculateSum(
							meal.products.map(product => +product.grams * +product.count)
						)
					}
					g
				</td>
			</tr>
		</tfoot>
	)
}
