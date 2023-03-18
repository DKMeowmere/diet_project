import {
	changeDishCount,
	changeDishGrams,
	removeDish,
} from "../../app/features/dietSlice"
import { useAppDispatch } from "../../app/hooks"
import theme from "../../app/theme"
import { Button } from "../../components/button/Button"
import Input from "../../components/input/Index"
import useCalculations from "../../hooks/useCalculations"
import { Day } from "../../types/day"
import { MealDish, Meal } from "../../types/meal"

type Props = {
	dish: MealDish
	meal: Meal
	day: Day
}

export default function Dish({ dish, meal, day }: Props) {
	const dispatch = useAppDispatch()
	const { getDishProperty, getDefaultDishWeight } = useCalculations()

	return (
		<div className="product">
			<div className="diet-text">Potrawa: {dish.dishDetails.name}</div>
			<div className="input-container-box">
				<div className="weight">
					Podaj wage (w gramach, domyślna waga produktu:
					{getDefaultDishWeight(dish.dishDetails).toString()}g)
				</div>
				<div className="input-box">
					<Input
						width="100%"
						height="50px"
						placeholder="Podaj ilość gramów"
						value={dish.grams.toString()}
						onChange={e =>
							dispatch(
								changeDishGrams({
									day,
									meal,
									dish,
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
						value={dish.count.toString()}
						onChange={e =>
							dispatch(
								changeDishCount({
									day,
									meal,
									dish,
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
					{getDishProperty(dish, "calories")}
				</div>
				<div className="carbo">
					Węglowodany:
					{getDishProperty(dish, "carbohydrates")}
				</div>
				<div className="proteins">
					Białka:
					{getDishProperty(dish, "proteins")}
				</div>
				<div className="fats">
					Tłuszcze:
					{getDishProperty(dish, "fats")}
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
						removeDish({
							day,
							meal,
							dish,
						})
					)
				}
			>
				Usuń potrawe
			</Button>
		</div>
	)
}
