import {
	changeProductCount,
	changeProductGrams,
  removeProduct,
} from "../../app/features/dietSlice"
import { useAppDispatch } from "../../app/hooks"
import theme from "../../app/theme"
import { Button } from "../../components/button/Button"
import Input from "../../components/input/Index"
import { Day } from "../../types/day"
import { Meal, MealProduct } from "../../types/meal"

type Props = {
	product: MealProduct
	meal: Meal
	day: Day
}

export default function Product({ product, meal, day }: Props) {
	const dispatch = useAppDispatch()

	return (
		<div className="product">
			<div className="diet-text">{product.product.name}</div>
			<div className="diet-text">Podaj wage (w gramach)</div>
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
			<div className="diet-text">Podaj ilość</div>
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
			<div className="diet-text">
				Kalorie:
				{product.product.calories * product.grams * product.count}
			</div>
			<div className="diet-text">
				Węglowodany:
				{product.product.carbohydrates * product.grams * product.count}
			</div>
			<div className="diet-text">
				Białka:
				{product.product.proteins * product.grams * product.count}
			</div>
			<div className="diet-text">
				Tłuszcze:
				{product.product.fats * product.grams * product.count}
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
