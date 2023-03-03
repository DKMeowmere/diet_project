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
	changeDescription,
	changeTitle,
	clearDiet,
	importDiet,
} from "../../app/features/dietSlice"
import { WhereToPassProduct } from "../../types/whereToPassProduct"
import { addAlert, endLoading, startLoading } from "../../app/features/appSlice"
import { validate } from "./validateDiet"
import { useCookies } from "react-cookie"
import { useParams } from "react-router-dom"
import Day from "./Day"
import { LeftArrow, RightArrow } from "../../components/arrow/Index"
import { Diet as DietType } from "../../types/diet"

function UpdateDiet() {
	const diet = useAppSelector(state => state.diet.currentDiet)
	const title = useAppSelector(state => state.diet.currentDiet.title)
	const description = useAppSelector(
		state => state.diet.currentDiet.description
	)
	const days = useAppSelector(state => state.diet.currentDiet.days)
	const dispatch = useAppDispatch()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [whereToPassProduct, setWhereToPassProduct] =
		useState<WhereToPassProduct | null>(null)
	const serverUrl = useAppSelector(state => state.app.serverUrl)
	const [cookies] = useCookies()
	const [pageNumber, setPageNumber] = useState(0)
	const { id } = useParams()

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
		} catch (err: unknown) {
			const message =
				err instanceof Error ? err.message : "Nieoczekiwany błąd"

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

	return (
		<DietCreateContainer>
			{isModalOpen && (
				<ProductModal
					whereToPassProduct={whereToPassProduct}
					setWhereToPassProduct={setWhereToPassProduct}
					setIsModalOpen={setIsModalOpen}
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
						onChange={e =>
							dispatch(changeDescription(e.target.value))
						}
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
								setIsModalOpen={setIsModalOpen}
								setWhereToPassProduct={setWhereToPassProduct}
								pageNumber={pageNumber}
								setPageNumber={setPageNumber}
								daysCount={days.length}
							/>
							{pageNumber > 0 && (
								<LeftArrow
									onClick={() =>
										setPageNumber(prevPage => prevPage - 1)
									}
									position="absolute"
									top="20px"
								/>
							)}
							{pageNumber < diet.days.length - 1 && (
								<RightArrow
									onClick={() =>
										setPageNumber(prevPage => prevPage + 1)
									}
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
