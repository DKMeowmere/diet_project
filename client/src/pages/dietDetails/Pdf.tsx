import {
	DietContainer,
	MealsContainer,
	DaysContainer,
	TableContainer,
	PdfDietContainer,
	PdfDay,
} from "./styles"
import { Diet } from "./styles"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { Link, useParams, useSearchParams } from "react-router-dom"
import { addAlert, endLoading, startLoading } from "../../app/features/appSlice"
import { useCookies } from "react-cookie"
import { Diet as DietType } from "../../types/diet"
import ProductRow from "./ProductRow"
import FooterRow from "./FooterRow"
import HeaderRow from "./HeaderRow"
import DishTable from "./DishTable"

function DietPdf() {
	const [diet, setDiet] = useState<DietType | null>(null)
	const serverUrl = useAppSelector(state => state.app.serverUrl)
	const dispatch = useAppDispatch()
	const { id } = useParams()
	const [cookies] = useCookies()
	const [searchParams] = useSearchParams()
	const dayId = searchParams.get("day")

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
				setDiet(null)
				dispatch(addAlert({ body: data?.error, type: "ERROR" }))
				return
			}

			if (!data) {
				setDiet(null)
				return
			}

			setDiet(data as unknown as DietType)
		}
		fetchDiet()
	}, [])

	if (!diet) {
		return (
			<DietContainer>
				<Diet>
					<Link to="/">
						Nie znaleziono diety o podanym id. Wróć do strony głównej
					</Link>
				</Diet>
			</DietContainer>
		)
	}

	return (
		<PdfDietContainer>
			<div className="diet-box">
				<div className="title">{diet.title}</div>
				{diet.description && (
					<div className="diet-description">{diet.description}</div>
				)}
			</div>
			<DaysContainer>
				{diet.days.map(day => {
					if (dayId && day._id !== dayId) {
						return
					}

					return (
						<PdfDay key={day._id}>
							<div className="day-name">{day.day}</div>
							<MealsContainer>
								{day.meals.map(meal => (
									<div className="meal" key={meal._id}>
										<div className="meal-box">
											<div className="meal-title">{meal.name}</div>
											{meal.description && (
												<div className="meals-description">
													{meal.description}
												</div>
											)}
										</div>
										<TableContainer>
											<HeaderRow />
											<tbody>
												{meal.dishes.map(dish => (
													<DishTable key={dish._id} dish={dish} />
												))}
												{meal.products.map(product => (
													<ProductRow product={product} key={product._id} />
												))}
											</tbody>
											<FooterRow meal={meal} />
										</TableContainer>
									</div>
								))}
							</MealsContainer>
						</PdfDay>
					)
				})}
			</DaysContainer>
		</PdfDietContainer>
	)
}
export default DietPdf
