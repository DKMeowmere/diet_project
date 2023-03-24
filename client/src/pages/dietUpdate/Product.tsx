import {
	changeProductCount,
	changeProductGrams,
	removeProduct,
} from "../../app/features/dietSlice"
import { useAppDispatch } from "../../app/hooks"
// import theme from "../../app/theme"
// import { Button } from "../../components/button/Button"
import Input from "../../components/input/Index"
import useCalculations from "../../hooks/useCalculations"
import { Day } from "../../types/day"
import { MealProduct, Meal } from "../../types/meal"
import { HiTrash } from "react-icons/hi"

type Props = {
	product: MealProduct
	meal: Meal
	day: Day
}

export default function Product({ product, meal, day }: Props) {
	const dispatch = useAppDispatch()
	const { getMealProductProperty } = useCalculations()

	return (
		<div className="product">
			<div className="product-value-container">
				<div className="value">
					<div className="product-name">{product.product.name}</div>
					<div className="weight-number">
						<Input
							width="40%"
							height="100%"
							inputClassName="weight-input"
							placeholder="waga"
							value={product.grams.toString()}
							onChange={e =>
								dispatch(
									changeProductGrams({
										day,
										meal,
										product,
										value: e.target.value,
									})
								)
							}
						/>
					</div>
					<div className="calories-number">
						{getMealProductProperty(product, "calories")}
					</div>
					<div className="carbo-number">
						{getMealProductProperty(product, "carbohydrates")}
					</div>
					<div className="proteins-number">
						{getMealProductProperty(product, "proteins")}
					</div>
					<div className="fats-number">
						{getMealProductProperty(product, "fats")}
					</div>
					<div className="weight-number">
						<Input
							width="40px"
							height="100%"
							placeholder="Podaj ilość"
							value={product.count.toString()}
							onChange={e =>
								dispatch(
									changeProductCount({
										day,
										meal,
										product,
										value: e.target.value,
									})
								)
							}
						/>
					</div>
					{!product.referringTo && (
						<HiTrash
							className="trash-icon"
							onClick={() =>
								dispatch(
									removeProduct({
										day,
										meal,
										product,
									})
								)
							}
						/>
					)}
				</div>
			</div>
		</div>
	)
}
