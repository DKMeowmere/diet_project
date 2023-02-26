import { Meal } from "../../types/meal"

type Props = {
	meal: Meal
}

export default function FooterRow({ meal }: Props) {
	return (
		<tfoot>
			<tr>
				<td className="cell strong">Łącznie</td>
				<td className="cell strong">
					{meal.products.reduce<number>(
						(accumulator, product) =>
							accumulator +
							(product.product.calories *
								product.count *
								product.grams) /
								100,
						0
					)}
					cal
				</td>
				<td className="cell strong">
					{meal.products.reduce<number>(
						(accumulator, product) =>
							accumulator +
							(product.product.proteins *
								product.count *
								product.grams) /
								100,
						0
					)}
					B
				</td>
				<td className="cell strong">
					{meal.products.reduce<number>(
						(accumulator, product) =>
							accumulator +
							(product.product.fats *
								product.count *
								product.grams) /
								100,
						0
					)}
					T
				</td>
				<td className="cell strong">
					{meal.products.reduce<number>(
						(accumulator, product) =>
							accumulator +
							(product.product.carbohydrates *
								product.count *
								product.grams) /
								100,
						0
					)}
					W
				</td>
				<td className="cell strong">
					{meal.products.reduce<number>(
						(accumulator, product) => accumulator + product.count,
						0
					)}
				</td>
				<td className="cell strong">
					{meal.products.reduce<number>(
						(accumulator, product) =>
							accumulator + product.grams * product.count,
						0
					)}
					g
				</td>
			</tr>
		</tfoot>
	)
}
