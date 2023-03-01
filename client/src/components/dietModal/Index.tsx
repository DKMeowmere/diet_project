import SearchInput from "../../components/searchInput/Index"
import { useState, useMemo, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useCookies } from "react-cookie"
import { addAlert, endLoading, startLoading } from "../../app/features/appSlice"
import { Diets } from "../../types/diet"
import {
	Diet,
	DietContainer,
	DietModalContainer,
	DietsArticle,
	DietsListContainer,
} from "./styles"
import { BsX } from "react-icons/bs"

type Props = {
	setIsModalOpen: (isModalOpen: boolean) => void
	patientDiets: { title: string; _id: string }[]
	setPatientDiets: (patientDiets: { title: string; _id: string }[]) => void
}

function DietsModal({ setIsModalOpen, patientDiets, setPatientDiets }: Props) {
	const [diets, setDiets] = useState<Diets>([])
	const [query, setQuery] = useState("")
	const serverUrl = useAppSelector(state => state.app.serverUrl)
	const dispatch = useAppDispatch()
	const [cookies] = useCookies()

	useEffect(() => {
		const html = document.querySelector("html")
		if (!html) return
		html.style.overflowY = "hidden"
		return () => {
			html.style.overflowY = "auto"
		}
	}, [])

	useEffect(() => {
		dispatch(startLoading())
		async function fetchDiets() {
			const res = await fetch(`${serverUrl}/api/diet`, {
				headers: {
					Authorization: `Bearer ${cookies.token}`,
				},
			})
			dispatch(endLoading())
			const data = await res.json()

			if (!res.ok) {
				setDiets([])
				dispatch(addAlert({ body: data?.error, type: "ERROR" }))
				return
			}

			if (!data) {
				setDiets([])
				return
			}

			setDiets(data as unknown as Diets)
		}
		fetchDiets()
	}, [])

	const filteredDiets = useMemo(() => {
		return diets.filter(diet =>
			diet.title.toLowerCase().includes(query.toLowerCase())
		)
	}, [query, diets])

	const dietsTitles = diets.map(diet => diet.title)

	return (
		<DietModalContainer>
			<DietsArticle>
				<SearchInput
					className="search-input"
					width="50%"
					height="60px"
					query={query}
					setQuery={setQuery}
					autocompleteData={dietsTitles}
				/>
				<DietsListContainer>
					{filteredDiets.map(diet => (
						<DietContainer key={diet._id}>
							<Diet
								onClick={() => {
									setIsModalOpen(false)
									if (!diet._id) {
										return
									}
									if (
										patientDiets.findIndex(
											prevDiet =>
												diet._id === prevDiet._id
										) !== -1
									) {
										dispatch(
											addAlert({
												body: "Nie można dodać tej diety drugi raz do tego samego pacjenta",
												type: "WARNING",
											})
										)
										return
									}

									setPatientDiets([
										{ _id: diet._id, title: diet.title },
										...patientDiets,
									])
								}}
							>
								<div className="diet-title">{diet.title}</div>
							</Diet>
						</DietContainer>
					))}
				</DietsListContainer>
				<BsX
					className="close-btn"
					onClick={() => setIsModalOpen(false)}
				/>
			</DietsArticle>
		</DietModalContainer>
	)
}
export default DietsModal
