import { addMeal, changeDayName, removeDay } from "../../app/features/dietSlice"
import { useAppDispatch } from "../../app/hooks"
import Input from "../../components/input/Index"
import { Day as DayType } from "../../types/day"
import { MealsContainer } from "./styles"
import Meal from "./Meal"
import theme from "../../app/theme"
import { Button } from "../../components/button/Button"
import PropertyBadge from "../../components/propertyBadge/Index"
import useCalculations from "../../hooks/useCalculations"

type Props = {
	day: DayType
	setIsProductModalOpen: (isModalOpen: boolean) => void
	setIsDishModalOpen: (isModalOpen: boolean) => void
	setIsProductGroupModalOpen: (isModalOpen: boolean) => void
	pageNumber: number
	setPageNumber: (pageNumber: number) => void
	daysCount: number
}

export default function Day({
	day,
	setIsProductModalOpen,
	setIsDishModalOpen,
	setIsProductGroupModalOpen,
	pageNumber,
	setPageNumber,
	daysCount,
}: Props) {
	const dispatch = useAppDispatch()
	const { getDayProperty } = useCalculations()

	return (
		<div className="day" key={day._id}>
			<div className="input-diet-box">
				<div className="diet-name">Podaj nazwe dnia</div>
				<div className="input-box">
					<Input
						width="100%"
						height="50px"
						placeholder="Podaj tytuł"
						value={day.day}
						onChange={e =>
							dispatch(
								changeDayName({
									day,
									value: e.target.value,
								})
							)
						}
					/>
				</div>
				<PropertyBadge
					className="property-badge"
					calories={getDayProperty(day, "calories")}
					carbohydrates={getDayProperty(day, "carbohydrates")}
					proteins={getDayProperty(day, "proteins")}
					fats={getDayProperty(day, "fats")}
				/>
			</div>
			{day.meals.length > 0 && (
				<MealsContainer>
					{day.meals.map(meal => (
						<Meal
							key={meal._id}
							day={day}
							meal={meal}
							setIsProductModalOpen={setIsProductModalOpen}
							setIsDishModalOpen={setIsDishModalOpen}
							setIsProductGroupModalOpen={setIsProductGroupModalOpen}
						/>
					))}
				</MealsContainer>
			)}

			<Button
				width="100%"
				height="40px"
				type="button"
				className="diet-btn-element"
				bgColor={theme.colors.main}
				onClick={() => dispatch(addMeal({ day }))}
			>
				Dodaj posiłek do dnia: {day.day}
			</Button>
			<Button
				width="100%"
				height="40px"
				type="button"
				bgColor={theme.colors.errorMain}
				onClick={() => {
					if (pageNumber >= daysCount - 1) {
						setPageNumber(pageNumber - 1)
					}
					dispatch(removeDay(day))
				}}
			>
				Usuń dzień
			</Button>
		</div>
	)
}
