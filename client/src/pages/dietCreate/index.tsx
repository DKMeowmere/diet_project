import { DaysContainer, DietCreateContainer, Form } from "./styles"
import Input from "../../components/input/Index"
import { Button } from "../../components/button/Button"
import theme from "../../app/theme"
import { useState, useEffect } from "react"
import Textarea from "../../components/textarea/Index"
import ProductModal from "../../components/productModal/Index"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
	addDay,
	addDish,
	addProduct,
	changeDescription,
	changeTitle,
	clearDiet,
	importDiet,
} from "../../app/features/dietSlice"
import { addAlert, endLoading, startLoading } from "../../app/features/appSlice"
import { validate } from "./validateDiet"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import Day from "./Day"
import { LeftArrow, RightArrow } from "../../components/arrow/Index"
import { Product as ProductType } from "../../types/product"
import { Dish as DishType } from "../../types/dish"
import DishModal from "../../components/dishModal/Index"

function CreateDiet() {
	const diet = useAppSelector(state => state.diet.currentDiet)
	const title = useAppSelector(state => state.diet.currentDiet.title)
	const description = useAppSelector(
		state => state.diet.currentDiet.description
	)
	const days = useAppSelector(state => state.diet.currentDiet.days)
	const dispatch = useAppDispatch()
	const [isProductModalOpen, setIsProductModalOpen] = useState(false)
	const [isDishModalOpen, setIsDishModalOpen] = useState(false)
	const serverUrl = useAppSelector(state => state.app.serverUrl)
	const [cookies] = useCookies()
	const navigate = useNavigate()
	const [pageNumber, setPageNumber] = useState(0)
	const whereToPass = useAppSelector(state => state.diet.whereToPass)

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		try {
			validate(diet)
			dispatch(startLoading())

			const newDiet: unknown = {
				...diet,
				_id: undefined,
				days: diet.days.map(day => ({
					...day,
					_id: undefined,
					meals: day.meals.map(meal => ({
						...meal,
						_id: undefined,
						products: meal.products.map(product => ({
							...product,
							_id: undefined,
						})),
						dishes: meal.dishes.map(dish => ({
							...dish,
							_id: undefined,
						})),
					})),
				})),
			}

			const res = await fetch(`${serverUrl}/api/diet`, {
				method: "POST",
				body: JSON.stringify(newDiet),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${cookies.token}`,
				},
			})
			dispatch(endLoading())
			const data = await res.json()

			if (!res.ok) {
				throw new Error(data.error)
			}

			dispatch(
				addAlert({
					body: "Diete dodano pomyślnie",
					type: "SUCCESS",
				})
			)

			navigate(`/diet/${data._id}`)
      localStorage.setItem("diet", "null")
		} catch (err: unknown) {
			const message = err instanceof Error ? err.message : "Nieoczekiwany błąd"

			dispatch(
				addAlert({
					body: message || "Nieoczekiwany błąd",
					type: "ERROR",
				})
			)
		}
	}

	useEffect(() => {
		const diet = JSON.parse(localStorage.getItem("diet") || "null")

		if (diet) {
			dispatch(importDiet(diet))
		}

		localStorage.setItem("diet", JSON.stringify(diet))
	}, [])

	useEffect(() => {
		if (diet.days.length > 0) {
			localStorage.setItem("diet", JSON.stringify(diet))
		}
	}, [diet])

	function handleProductAddition(product: ProductType) {
		setIsProductModalOpen(false)
		dispatch(
			addProduct({
				dayId: whereToPass.dayId,
				mealId: whereToPass.mealId,
				product,
			})
		)
	}

	function handleDishAddition(dish: DishType) {
		setIsDishModalOpen(false)
		dispatch(
			addDish({
				dayId: whereToPass.dayId,
				mealId: whereToPass.mealId,
				dish,
			})
		)
	}

	return (
		<DietCreateContainer>
			{isProductModalOpen && (
				<ProductModal
					setIsModalOpen={setIsProductModalOpen}
					onProductClick={handleProductAddition}
				/>
			)}
			{isDishModalOpen && (
				<DishModal
					setIsModalOpen={setIsDishModalOpen}
					onDishClick={handleDishAddition}
				/>
			)}

			<Form onSubmit={handleSubmit}>
				<div className="right-form">
					<p className="diet-title">Podaj tytuł diety</p>
					<Input
						width="100%"
						height="65px"
						placeholder="Podaj tytuł"
						value={title}
						onChange={e => dispatch(changeTitle(e.target.value))}
					/>
					<p className="diet-text-main">Podaj opis diety</p>
					<Textarea
						width="100%"
						height="150px"
						placeholder="podaj opis... (opcjonalnie)"
						value={description}
						onChange={e => dispatch(changeDescription(e.target.value))}
					/>

					<div className="button-container">
						<Button
							width="100%"
							height="40px"
							type="reset"
							bgColor={theme.colors.errorMain}
							onClick={() => {
								localStorage.setItem("diet", "null")
								setPageNumber(0)
								dispatch(clearDiet())
							}}
							className="main-btn"
						>
							Wyczyść diete
						</Button>
						<Button
							width="100%"
							height="40px"
							type="submit"
							bgColor={theme.colors.main}
							className="main-btn"
						>
							Zatwierź
						</Button>
					</div>
				</div>
				<div className="left-form">
					<Button
						width="100%"
						height="40px"
						type="button"
						bgColor={theme.colors.main}
						onClick={() => dispatch(addDay())}
						className="diet-btn"
					>
						Dodaj Dzień
					</Button>
					{days.length > 0 && (
						<DaysContainer>
							<Day
								day={days[pageNumber]}
								setIsProductModalOpen={setIsProductModalOpen}
								setIsDishModalOpen={setIsDishModalOpen}
								pageNumber={pageNumber}
								setPageNumber={setPageNumber}
								daysCount={days.length}
							/>
							{pageNumber > 0 && (
								<LeftArrow
									onClick={() => setPageNumber(prevPage => prevPage - 1)}
									position="absolute"
									top="20px"
								/>
							)}
							{pageNumber < diet.days.length - 1 && (
								<RightArrow
									onClick={() => setPageNumber(prevPage => prevPage + 1)}
									position="absolute"
									top="20px"
								/>
							)}
						</DaysContainer>
					)}
				</div>
			</Form>
		</DietCreateContainer>
	)
}

export default CreateDiet
