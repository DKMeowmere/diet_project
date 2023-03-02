import {
	DietContainer,
	MealsContainer,
	DaysContainer,
	Day,
	ProductsContainer,
} from "./styles"
import { Diet } from "./styles"
import { LeftArrow, RightArrow } from "../../components/arrow/Index"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { Link, useParams } from "react-router-dom"
import { addAlert, endLoading, startLoading } from "../../app/features/appSlice"
import { useCookies } from "react-cookie"
import { Diet as DietType } from "../../types/diet"
import ProductRow from "./ProductRow"
import FooterRow from "./FooterRow"
import HeaderRow from "./HeaderRow"
import { AiOutlineFilePdf } from "react-icons/ai"

function DietDetails() {
	const [diet, setDiet] = useState<DietType | null>(null)
	const serverUrl = useAppSelector(state => state.app.serverUrl)
	const dispatch = useAppDispatch()
	const { id } = useParams()
	const [cookies] = useCookies()
	const [pageNumber, setPageNumber] = useState(0)

	async function handlePdfGeneration(url: string) {
		dispatch(startLoading())
		console.log(url)
		const res = await fetch(url, {
			headers: {
				Authorization: `Bearer ${cookies.token}`,
			},
		})
		dispatch(endLoading())

		if (!res.ok) {
			dispatch(
				addAlert({
					body: "Błąd podczas generowania pdf",
					type: "ERROR",
				})
			)
		}

		const blob = await res.blob()
		const pdf = URL.createObjectURL(blob)
		const a = document.createElement("a")
		a.href = pdf
		a.download = diet ? `${diet.title}.pdf` : "dieta.pdf"
		document.body.appendChild(a)
		a.click()
		a.remove()
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
		<DietContainer>
			<Diet>
				<div className="diet-box">
					<div className="title">
						{diet.title}
						<AiOutlineFilePdf
							className="pdf-icon"
							onClick={() =>
								handlePdfGeneration(
									`${serverUrl}/api/diet/pdf/${diet._id}`
								)
							}
						/>
					</div>

					{diet.description && (
						<div className="diet-description">
							{diet.description}
						</div>
					)}
				</div>
				<DaysContainer>
					<Day>
						<div className="day-name">
							{diet.days[pageNumber].day}
							<AiOutlineFilePdf
								className="pdf-icon"
								onClick={() =>
									handlePdfGeneration(
										`${serverUrl}/api/diet/pdf/${diet._id}?day=${diet.days[pageNumber]._id}`
									)
								}
							/>
						</div>
						<MealsContainer>
							{diet.days[pageNumber].meals.map(meal => (
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
					</Day>
				</DaysContainer>
			</Diet>
			{pageNumber > 0 && (
				<LeftArrow
					onClick={() => setPageNumber(prevPage => prevPage - 1)}
				/>
			)}
			{pageNumber < diet.days.length - 1 && (
				<RightArrow
					onClick={() => setPageNumber(prevPage => prevPage + 1)}
				/>
			)}
		</DietContainer>
	)
}
export default DietDetails
