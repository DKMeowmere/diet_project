import useReduce from "../../hooks/useReduce"
import { MealDish } from "../../types/meal"
import { DishRow, ProductDishContainer } from "./styles"

type Props = {
	dish: MealDish
}

export default function DishTable({ dish }: Props) {
	const { calculateSum } = useReduce()

	return (
		<>
			<DishRow>
				<td className="cell strong">{dish.dishDetails.name}</td>
				<td className="cell strong">
					{
						+calculateSum(
							dish.dishDetails.products.map(
								product => +product.product.calories
							)
						)
					}
					cal
				</td>
				<td className="cell strong">
					{
						+calculateSum(
							dish.dishDetails.products.map(
								product => +product.product.proteins
							)
						)
					}
					B
				</td>
				<td className="cell strong">
					{
						+calculateSum(
							dish.dishDetails.products.map(product => +product.product.fats)
						)
					}
					T
				</td>
				<td className="cell strong">
					{
						+calculateSum(
							dish.dishDetails.products.map(
								product => +product.product.carbohydrates
							)
						)
					}
					W
				</td>
				<td className="cell strong">{dish.count}</td>
				<td className="cell strong">{dish.grams}g</td>
			</DishRow>
			{dish.dishDetails.products.map(product => (
				<ProductDishContainer key={product._id}>
					<td className="cell">{product.product.name}</td>
					<td className="cell">
						{
							+(
								(+product.product.calories * +product.grams * +product.count) /
								100
							).toFixed(2)
						}
						cal
					</td>
					<td className="cell">
						{
							+(
								(+product.product.proteins * +product.grams * +product.count) /
								100
							).toFixed(2)
						}
						B
					</td>
					<td className="cell">
						{
							+(
								(+product.product.fats * +product.grams * +product.count) /
								100
							).toFixed(2)
						}
						T
					</td>
					<td className="cell">
						{
							+(
								(+product.product.carbohydrates *
									+product.grams *
									+product.count) /
								100
							).toFixed(2)
						}
						W
					</td>
					<td className="cell">{product.count}</td>
					<td className="cell">{product.grams}g</td>
				</ProductDishContainer>
			))}
		</>
	)
}
