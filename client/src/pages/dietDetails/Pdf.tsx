import {
	DietContainer,
	MealsContainer,
	DaysContainer,
	ProductsContainer,
	PdfDietContainer,
	PdfDay,
} from "./styles"
import { Diet } from "./styles"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { Link, useParams } from "react-router-dom"
import { addAlert, endLoading, startLoading } from "../../app/features/appSlice"
import { useCookies } from "react-cookie"
import { Diet as DietType } from "../../types/diet"
import ProductRow from "./ProductRow"
import FooterRow from "./FooterRow"
import HeaderRow from "./HeaderRow"

function DietPdf() {
	const [diet, setDiet] = useState<DietType | null>(null)
	const serverUrl = useAppSelector(state => state.app.serverUrl)
	const dispatch = useAppDispatch()
	const { id } = useParams()
	const [cookies] = useCookies()

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
						Nie znaleziono diety o podanym id. Wróć do strony
						głównej
					</Link>
				</Diet>
			</DietContainer>
		)
	}

	return (
		<PdfDietContainer>
			<Diet>
				<div className="diet-box">
					<div className="title">{diet.title}</div>
					{diet.description && (
						<div className="diet-description">
							{diet.description}
						</div>
					)}
				</div>
				<DaysContainer>
					{diet.days.map(day => (
						<PdfDay key={day._id}>
							<div className="day-name">{day.day}</div>
							<MealsContainer>
								{day.meals.map(meal => (
									<div className="meal" key={meal._id}>
										<div className="meal-box">
											<div className="meal-title">
												{meal.name}
											</div>
											{meal.description && (
												<div className="meals-description">
													{meal.description}
												</div>
											)}
										</div>
										<ProductsContainer>
											<HeaderRow />
											<tbody>
												{meal.products.map(product => (
													<ProductRow
														product={product}
														key={product._id}
													/>
												))}
											</tbody>
											<FooterRow meal={meal} />
										</ProductsContainer>
									</div>
								))}
							</MealsContainer>
						</PdfDay>
					))}
				</DaysContainer>
			</Diet>
		</PdfDietContainer>
	)
}
export default DietPdf