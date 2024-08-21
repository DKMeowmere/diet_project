import { addMeal, changeDayName, removeDay } from '../../app/features/dietSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import Input from '../../components/input/Index'
import { Day as DayType } from '../../types/day'
import { MealsContainer } from './styles'
import Meal from './Meal'
import theme from '../../app/theme'
import { Button } from '../../components/button/Button'
import PropertiesBadge from '../../components/propertiesBadge/Index'
import useCalculations from '../../hooks/useCalculations'

type Props = {
	day: DayType
	setIsProductModalOpen: (isModalOpen: boolean) => void
	setIsProductGroupModalOpen: (isModalOpen: boolean) => void
	pageNumber: number
	setPageNumber: (pageNumber: number) => void
	daysCount: number
}

export default function Day({
	day,
	setIsProductModalOpen,
	setIsProductGroupModalOpen,
	pageNumber,
	setPageNumber,
	daysCount,
}: Props) {
	const dispatch = useAppDispatch()
	const { getDayProperty, getRecommendedMacronutrientCount } = useCalculations()
	const diet = useAppSelector(state => state.diet.currentDiet)

	return (
		<div className='day' key={day._id}>
			<div className='day-summary'>
				<div className='meal-name-element'>
					<div className='diet-name'>Podaj nazwe dnia</div>

					<Input
						inputClassName='day-input'
						width='100%'
						height='60px'
						placeholder='Podaj tytuł'
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

				<div className='diet-property-badge-container'>
					<p className='meal-name-element'>Aktualnie</p>
					<PropertiesBadge
						className='diet-property-badge'
						calories={getDayProperty(day, 'calories')}
						carbohydrates={getDayProperty(day, 'carbohydrates')}
						proteins={getDayProperty(day, 'proteins')}
						fats={getDayProperty(day, 'fats')}
            fiber={getDayProperty(day, "fiber")}
					/>
					<p className='meal-name-element'>Cel</p>
					<PropertiesBadge
						className='diet-property-badge'
						calories={+diet.caloricGoal}
						carbohydrates={getRecommendedMacronutrientCount(diet, 'carbohydrates')}
						proteins={getRecommendedMacronutrientCount(diet, 'proteins')}
						fats={getRecommendedMacronutrientCount(diet, 'fats')}
					/>
				</div>
			</div>
			{day.meals.length > 0 && (
				<MealsContainer>
					{day.meals.map(meal => (
						<Meal
							key={meal._id}
							day={day}
							meal={meal}
							setIsProductModalOpen={setIsProductModalOpen}
							setIsProductGroupModalOpen={setIsProductGroupModalOpen}
						/>
					))}
				</MealsContainer>
			)}
			<div className='btn-element-container'>
				<Button
					width='40%'
					height='70px'
					type='button'
					className='diet-btn-element'
					bgColor={theme.colors.main}
					onClick={() => dispatch(addMeal({ day }))}>
					Dodaj posiłek do dnia: {day.day}
				</Button>
			</div>
			<div className='btn-element-container'>
				<Button
					width='70%'
					height='70px'
					type='button'
					bgColor={theme.colors.errorMain}
					onClick={() => {
						if (pageNumber >= daysCount - 1) {
							setPageNumber(pageNumber - 1)
						}
						dispatch(removeDay(day))
					}}>
					Usuń dzień
				</Button>
			</div>
		</div>
	)
}
