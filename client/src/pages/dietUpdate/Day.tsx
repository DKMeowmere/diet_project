import { addMeal, changeDayName, removeDay } from '../../app/features/dietSlice'
import { useAppDispatch } from '../../app/hooks'
import Input from '../../components/input/Index'
import { Day as DayType } from '../../types/day'
import { MealsContainer } from './styles'
import Meal from './Meal'
import { WhereToPassProduct } from '../../types/whereToPassProduct'
import theme from '../../app/theme'
import { Button } from '../../components/button/Button'

type Props = {
	day: DayType
	setIsModalOpen: (isModalOpen: boolean) => void
	setWhereToPassProduct: (whereToPassProduct: WhereToPassProduct) => void
}

export default function Day({ day, setIsModalOpen, setWhereToPassProduct }: Props) {
	const dispatch = useAppDispatch()

	return (
		<div className='day' key={day._id}>
			<div className='input-diet-box'>
				<div className='diet-name'>Modyfikuj nazwe dnia</div>
				<div className='input-box'>
					<Input
						width='100%'
						height='50px'
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
			</div>
			{day.meals.length > 0 && (
				<MealsContainer>
					{day.meals.map(meal => (
						<Meal
							key={meal._id}
							day={day}
							meal={meal}
							setIsModalOpen={setIsModalOpen}
							setWhereToPassProduct={setWhereToPassProduct}
						/>
					))}
				</MealsContainer>
			)}
			
				<Button
					width='100%'
					height='40px'
					type='button'
					bgColor={theme.colors.main}
					onClick={() => dispatch(addMeal({ day }))}
					className='meal-btn'>
					Dodaj posiłek do dnia: {day.day}
				</Button>
				<Button
					width='100%'
					height='40px'
					type='button'
					bgColor={theme.colors.errorMain}
					className='meal-btn'
					onClick={() => dispatch(removeDay(day))}>
					Usuń dzień
				</Button>
			
		</div>
	)
}
