import {
	changeProductCount,
	changeProductGrams,
	removeProduct,
} from "../../app/features/dietSlice"
import { useAppDispatch } from "../../app/hooks"
import theme from "../../app/theme"
import { Button } from "../../components/button/Button"
import Input from "../../components/input/Index"
import useCalculations from "../../hooks/useCalculations"
import { Day } from "../../types/day"
import { MealProduct, Meal } from "../../types/meal"

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
			<div className="diet-text">Produkt: {product.product.name}</div>
			<div className="input-container-box">
				<div className="weight">Podaj wage (w gramach)</div>
				<div className="input-box">
					<Input
						width="100%"
						height="50px"
						placeholder="Podaj ilość gramów"
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
			</div>
			<div className="input-amount-box">
				<div className="amount-element">Podaj ilość</div>
				<div className="input-box">
					<Input
						width="100%"
						height="50px"
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
			</div>
			<div className="values">
				<div className="calories">
					Kalorie:
					{getMealProductProperty(product, "calories")}
				</div>
				<div className="carbo">
					Węglowodany:
					{getMealProductProperty(product, "carbohydrates")}
				</div>
				<div className="proteins">
					Białka:
					{getMealProductProperty(product, "proteins")}
				</div>
				<div className="fats">
					Tłuszcze:
					{getMealProductProperty(product, "fats")}
				</div>
			</div>
			<Button
				width="100%"
				height="40px"
				type="button"
				bgColor={theme.colors.errorMain}
				className="diet-btn"
				onClick={() =>
					dispatch(
						removeProduct({
							day,
							meal,
							product,
						})
					)
				}
			>
				Usuń produkt
			</Button>
		</div>
	)
}
