import { DaysContainer, DietCreateContainer, Form } from "./styles"
import Input from "../../components/input/Index"
import { Button } from "../../components/button/Button"
import theme from "../../app/theme"
import { useState } from "react"
import Textarea from "../../components/textarea/Index"
import ProductModal from "../../components/productModal/Index"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
	addDay,
	changeDescription,
	changeTitle,
	clearDiet,
} from "../../app/features/dietSlice"
import { Day as DayType } from "../../types/day"
import { WhereToPassProduct } from "../../types/whereToPassProduct"
import { addAlert, endLoading, startLoading } from "../../app/features/appSlice"
import { validate } from "./validateDiet"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import Day from "./Day"

function CreateDiet() {
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
	const navigate = useNavigate()

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		try {
			validate(diet)
			dispatch(startLoading())

			const res = await fetch(`${serverUrl}/api/diet`, {
				method: "POST",
				body: JSON.stringify(diet),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${cookies.token}`,
				},
			})
			const data = await res.json()
			dispatch(endLoading())

			if (!res.ok) {
				throw new Error(data.message)
			}

			dispatch(
				addAlert({
					body: "Diete dodano pomyślnie",
					type: "SUCCESS",
				})
			)

			navigate(`/diet/${data._id}`)
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
				<p className="diet-title">Dodaj dietę</p>
				<p className="diet-text">Podaj tytuł diety</p>
				<Input
					width="100%"
					height="50px"
					placeholder="Podaj tytuł"
					value={title}
					onChange={e => dispatch(changeTitle(e.target.value))}
				/>
				<p className="diet-text">Podaj opis diety</p>
				<Textarea
					width="100%"
					height="150px"
					placeholder="podaj opis... (opcjonalnie)"
					value={description}
					onChange={e => dispatch(changeDescription(e.target.value))}
				/>
				{days.length > 0 && (
					<DaysContainer>
						{days.map((day: DayType) => (
							<Day
								key={day._id}
								day={day}
								setIsModalOpen={setIsModalOpen}
								setWhereToPassProduct={setWhereToPassProduct}
							/>
						))}
					</DaysContainer>
				)}
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
				<Button
					width="100%"
					height="40px"
					type="reset"
					bgColor={theme.colors.errorMain}
					onClick={() => dispatch(clearDiet())}
					className="diet-btn"
				>
					Wyczyść diete
				</Button>
				<Button
					width="100%"
					height="40px"
					type="submit"
					bgColor={theme.colors.main}
					className="diet-btn"
				>
					Zatwierź
				</Button>
			</Form>
		</DietCreateContainer>
	)
}

export default CreateDiet
