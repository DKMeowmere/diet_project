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
	addProductGroup,
	changeCaloricGoal,
	changeDescription,
	changeMacronutrientsDivision,
	changeTitle,
	clearDiet,
	importDiet,
} from "../../app/features/dietSlice"
import { addAlert, endLoading, startLoading } from "../../app/features/appSlice"
import { validate } from "./validateDiet"
import { useCookies } from "react-cookie"
import { useParams } from "react-router-dom"
import Day from "./Day"
import { LeftArrow, RightArrow } from "../../components/arrow/Index"
import { Diet as DietType } from "../../types/diet"
import { Product as ProductType } from "../../types/product"
import { Dish as DishType } from "../../types/dish"
import DishModal from "../../components/dishModal/Index"
import { ProductGroup as ProductGroupType } from "../../types/productGroup."
import ProductGroupModal from "../../components/productGroupModal/Index"

function UpdateDiet() {
	const diet = useAppSelector(state => state.diet.currentDiet)
	const title = useAppSelector(state => state.diet.currentDiet.title)
	const description = useAppSelector(
		state => state.diet.currentDiet.description
	)
	const caloricGoal = useAppSelector(
		state => state.diet.currentDiet.caloricGoal
	)
	const macronutrientsDivision = useAppSelector(
		state => state.diet.currentDiet.macronutrientsDivision
	)
	const days = useAppSelector(state => state.diet.currentDiet.days)
	const dispatch = useAppDispatch()
	const [isProductModalOpen, setIsProductModalOpen] = useState(false)
	const [isDishModalOpen, setIsDishModalOpen] = useState(false)
	const [isProductGroupModalOpen, setIsProductGroupModalOpen] = useState(false)
	const serverUrl = useAppSelector(state => state.app.serverUrl)
	const [cookies] = useCookies()
	const [pageNumber, setPageNumber] = useState(0)
	const whereToPass = useAppSelector(state => state.diet.whereToPass)
	const { id } = useParams()

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		try {
			validate(diet)
			dispatch(startLoading())
			const { carbohydrates, fats, proteins } = macronutrientsDivision

			const newDiet: unknown = {
				...diet,
				_id: undefined,
				caloricGoal: +diet.caloricGoal,
				macronutrientsDivision: {
					carbohydrates: +carbohydrates,
					fats: +fats,
					proteins: +proteins,
				},
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
						productGroups: meal.productGroups.map(
							productGroup => productGroup._id
						),
					})),
				})),
			}

			const res = await fetch(`${serverUrl}/api/diet/${id}`, {
				method: "PATCH",
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
					body: "Diete zaaktualizowano pomyślnie",
					type: "SUCCESS",
				})
			)
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
		dispatch(startLoading())
		async function fetchDiet() {
			const res = await fetch(`${serverUrl}/api/diet/${id}`, {
				headers: {
					Authorization: `Bearer ${cookies.token}`,
				},
			})
			dispatch(endLoading())
			const data = await res.json()

			if (!res.ok) {
				dispatch(addAlert({ body: data?.error, type: "ERROR" }))
				return
			}

			if (!data) {
				return
			}

			dispatch(importDiet(data as unknown as DietType))
		}
		fetchDiet()
	}, [])

	function handleProductAddition(product: ProductType) {
		dispatch(
			addProduct({
				dayId: whereToPass.dayId,
				mealId: whereToPass.mealId,
				product,
			})
		)

    dispatch(
			addAlert({
				body: `Produkt "${product.name}" dodano pomyślnie`,
				type: "SUCCESS",
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

	function handleProductGroupAddition(productGroup: ProductGroupType) {
		const dayIndex = diet.days.findIndex(day => day._id === whereToPass.dayId)
		const mealIndex = diet.days[dayIndex].meals.findIndex(
			meal => meal._id === whereToPass.mealId
		)

		const currentProductGroup =
			diet.days[dayIndex].meals[mealIndex].productGroups

		if (
			currentProductGroup.findIndex(
				prevProductGroup => prevProductGroup._id === productGroup._id
			) !== -1
		) {
			dispatch(
				addAlert({
					body: "Już przypisałeś tą grupę produktów do tego posiłku",
					type: "WARNING",
				})
			)
			return
		}

		productGroup.products.forEach(product => {
			dispatch(
				addProduct({
					dayId: whereToPass.dayId,
					mealId: whereToPass.mealId,
					product,
					referringTo: productGroup._id,
				})
			)
		})

		dispatch(
			addProductGroup({
				dayId: whereToPass.dayId,
				mealId: whereToPass.mealId,
				productGroup,
			})
		)

    dispatch(
			addAlert({
				body: `Potrawe "${productGroup.name}" dodano pomyślnie`,
				type: "SUCCESS",
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
			{isProductGroupModalOpen && (
				<ProductGroupModal
					setIsModalOpen={setIsProductGroupModalOpen}
					onProductGroupClick={handleProductGroupAddition}
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
					<p className="diet-text-main">Podaj cel kaloryczny</p>
					<Input
						width="100%"
						height="65px"
						placeholder="Podaj cel kaloryczny"
						value={caloricGoal}
						onChange={e => dispatch(changeCaloricGoal(e.target.value))}
					/>
					<p className="diet-text-main">Podaj podział makroelemetów</p>
					<p className="diet-text-sm">Węglowodany (%)</p>
					<Input
						width="100%"
						height="35px"
						placeholder="Podaj węglowodany (%)"
						value={macronutrientsDivision.carbohydrates}
						onChange={e =>
							dispatch(
								changeMacronutrientsDivision({
									...macronutrientsDivision,
									carbohydrates: e.target.value,
								})
							)
						}
					/>
					<p className="diet-text-sm">Tłuszcze (%)</p>
					<Input
						width="100%"
						height="35px"
						placeholder="Podaj tłuszcze (%)"
						value={macronutrientsDivision.fats}
						onChange={e =>
							dispatch(
								changeMacronutrientsDivision({
									...macronutrientsDivision,
									fats: e.target.value,
								})
							)
						}
					/>
					<p className="diet-text-sm">Białka (%)</p>
					<Input
						width="100%"
						height="35px"
						placeholder="Podaj białka (%)"
						value={macronutrientsDivision.proteins}
						onChange={e =>
							dispatch(
								changeMacronutrientsDivision({
									...macronutrientsDivision,
									proteins: e.target.value,
								})
							)
						}
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
						onClick={() => {
							dispatch(addDay())
							setPageNumber(days.length)
						}}
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
								setIsProductGroupModalOpen={setIsProductGroupModalOpen}
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

export default UpdateDiet
