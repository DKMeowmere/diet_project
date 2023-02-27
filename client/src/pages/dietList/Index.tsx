import { DietsListContainer, DietContainer, Diet, DietsArticle } from "./styles"
import SearchInput from "../../components/searchInput/Index"
import { Link } from "react-router-dom"
import { Button } from "../../components/button/Button"
import theme from "../../app/theme"
import { Diets } from "../../types/diet"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useState, useEffect, useMemo } from "react"
import { useCookies } from "react-cookie"
import { addAlert, endLoading, startLoading } from "../../app/features/appSlice"

function DietList() {
	const [diets, setDiets] = useState<Diets>([])
	const [query, setQuery] = useState("")
	const serverUrl = useAppSelector(state => state.app.serverUrl)
	const dispatch = useAppDispatch()
	const [cookies] = useCookies()

	useEffect(() => {
		dispatch(startLoading())
		async function fetchProducts() {
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
		fetchProducts()
	}, [])

	const filteredDiets = useMemo(() => {
		return diets.filter(diet =>
			diet.title.toLowerCase().includes(query.toLowerCase())
		)
	}, [query, diets])

	const dietsTitles = diets.map(diet => diet.title)

	return (
		<DietsArticle>
			<Link to="/diet/create" className="create-product-link">
				<Button width="100%" height="60px" bgColor={theme.colors.main}>
					Stwórz diete
				</Button>
			</Link>
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
						<Diet to={`/diet/${diet._id}`}>
							<div className="diet-title">{diet.title}</div>
						</Diet>
					</DietContainer>
				))}
			</DietsListContainer>
		</DietsArticle>
	)
}
export default DietList
