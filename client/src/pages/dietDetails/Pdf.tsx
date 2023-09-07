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
import PropertyBadge from "../../components/propertyBadge/Index"
import useCalculations from "../../hooks/useCalculations"
import ProductGroupTable from "./ProductGroupTable"

function DietPdf() {
	const [diet, setDiet] = useState<DietType | null>(null)
	const serverUrl = useAppSelector(state => state.app.serverUrl)
	const dispatch = useAppDispatch()
	const { id } = useParams()
	const [cookies] = useCookies()
	const [searchParams] = useSearchParams()
	const dayId = searchParams.get("day")
	const { getDayProperty, getDietProperty } = useCalculations()

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
				<PropertyBadge
					className="diet-property-badge"
					calories={getDietProperty(diet, "calories")}
					carbohydrates={getDietProperty(diet, "carbohydrates")}
					proteins={getDietProperty(diet, "proteins")}
					fats={getDietProperty(diet, "fats")}
					fiber={getDietProperty(diet, "fiber")}
				/>
			</div>
			<DaysContainer>
				{diet.days.map(day => {
					if (dayId && day._id !== dayId) {
						return
					}

					return (
						<PdfDay key={day._id}>
							<div className="day-name">{day.day}</div>
							<PropertyBadge
								className="property-badge"
								calories={getDayProperty(day, "calories")}
								carbohydrates={getDayProperty(day, "carbohydrates")}
								proteins={getDayProperty(day, "proteins")}
								fats={getDayProperty(day, "fats")}
								fiber={getDayProperty(day, "fiber")}
							/>
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
										{meal.productGroups.map(productGroup =>
											productGroup.description ? (
												<p
													className="product-group-description"
													key={productGroup._id}
												>
													opis {productGroup.name}:{productGroup.description}
												</p>
											) : null
										)}
										<TableContainer>
											<HeaderRow />
											<tbody>
												{meal.products.map(product => {
													if (product.referringTo) return
													return (
														<ProductRow product={product} key={product._id} />
													)
												})}
												{meal.productGroups.map(productGroup => (
													<ProductGroupTable
														key={productGroup._id}
														productGroup={productGroup}
														meal={meal}
													/>
												))}
												{meal.dishes.map(dish => (
													<DishTable key={dish._id} dish={dish} />
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
