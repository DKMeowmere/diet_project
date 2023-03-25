import { addMeal, changeDayName, removeDay } from '../../app/features/dietSlice'
import { useAppDispatch } from '../../app/hooks'
import Input from '../../components/input/Index'
import { Day as DayType } from '../../types/day'
import { MealsContainer } from './styles'
import Meal from './Meal'
import theme from '../../app/theme'
import { Button } from '../../components/button/Button'

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
	pageNumber,
	setPageNumber,
	daysCount,
	setIsProductGroupModalOpen,
}: Props) {
	const dispatch = useAppDispatch()

	return (
		<div className='day' key={day._id}>
			<div className='meal-name-element'>
				<div className='diet-name'>Podaj nazwe dnia</div>
				<div className='input-box'>
					<Input
						width='100%'
						height='60px'
						placeholder='Podaj tytuł'
						inputClassName='day-input'
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
