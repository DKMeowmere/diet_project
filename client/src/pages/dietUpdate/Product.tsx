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
import { MealProduct, Meal } from "../../types/meal"

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
			<div className="input-product-box">
				<div className="product-weight">Podaj wage (w gramach)</div>
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
				<div className="product-amount-element">Podaj ilość</div>
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
			<div className="product-values">
				<div className="product-calories">
					Kalorie:
					{
						+(
							(+product.product.calories * +product.grams * +product.count) /
							100
						).toFixed(2)
					}
				</div>
				<div className="product-carbo">
					Węglowodany:
					{
						+(
							(+product.product.carbohydrates *
								+product.grams *
								+product.count) /
							100
						).toFixed(2)
					}
				</div>
				<div className="product-proteins">
					Białka:
					{
						+(
							(+product.product.proteins * +product.grams * +product.count) /
							100
						).toFixed(2)
					}
				</div>
				<div className="product-fats">
					Tłuszcze:
					{
						+(
							(+product.product.fats * +product.grams * +product.count) /
							100
						).toFixed(2)
					}
				</div>
			</div>
			<Button
				width="100%"
				height="40px"
				type="button"
				bgColor={theme.colors.errorMain}
				className="diet-btn-element"
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
