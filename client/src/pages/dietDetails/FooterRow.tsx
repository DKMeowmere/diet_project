import useCalculations from "../../hooks/useCalculations"
import useReduce from "../../hooks/useReduce"
import { Meal } from "../../types/meal"

type Props = {
	meal: Meal
}

export default function FooterRow({ meal }: Props) {
	const { calculateSum } = useReduce()
	const { getMealProperty } = useCalculations()

	return (
		<tfoot>
			<tr>
				<td className="cell strong bold">Łącznie</td>
				<td className="cell strong bold">
					{
						+calculateSum(
							meal.products.map(product => +product.grams * +product.count)
						)
					}
					g
				</td>
				<td className="cell strong bold">
					{getMealProperty(meal, "calories")}
					cal
				</td>
				<td className="cell strong bold">
					{getMealProperty(meal, "proteins")}B
				</td>
				<td className="cell strong bold">{getMealProperty(meal, "fats")}T</td>
				<td className="cell strong bold">
					{getMealProperty(meal, "carbohydrates")}W
				</td>
				<td className="cell strong bold">{getMealProperty(meal, "fiber")}W</td>
				<td className="cell strong bold">
					{+calculateSum(meal.products.map(product => +product.count))}
				</td>
			</tr>
		</tfoot>
	)
}
