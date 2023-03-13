import { DishListContainer, DishContainer, Dish, DishArticle } from './styles'
import SearchInput from '../../components/searchInput/Index'
import { Link } from 'react-router-dom'
import { Button } from '../../components/button/Button'
import theme from '../../app/theme'
// import { Diets } from '../../types/diet'
// import { useAppDispatch, useAppSelector } from '../../app/hooks'
// import { useState, useEffect, useMemo } from 'react'
// import { useCookies } from 'react-cookie'
// import { addAlert, endLoading, startLoading } from '../../app/features/appSlice'

function DishList() {
	// const [diets, setDiets] = useState<Diets>([])
	// const [query, setQuery] = useState('')
	// const serverUrl = useAppSelector(state => state.app.serverUrl)
	// const dispatch = useAppDispatch()
	// const [cookies] = useCookies()

	// useEffect(() => {
	// 	dispatch(startLoading())
	// 	async function fetchDiets() {
	// 		const res = await fetch(`${serverUrl}/api/diet`, {
	// 			headers: {
	// 				Authorization: `Bearer ${cookies.token}`,
	// 			},
	// 		})
	// 		dispatch(endLoading())
	// 		const data = await res.json()

	// 		if (!res.ok) {
	// 			setDiets([])
	// 			dispatch(addAlert({ body: data?.error, type: 'ERROR' }))
	// 			return
	// 		}

	// 		if (!data) {
	// 			setDiets([])
	// 			return
	// 		}

	// 		setDiets(data as unknown as Diets)
	// 	}
	// 	fetchDiets()
	// }, [])

	// const filteredDiets = useMemo(() => {
	// 	return diets.filter(diet => diet.title.toLowerCase().includes(query.toLowerCase()))
	// }, [query, diets])

	// const dietsTitles = diets.map(diet => diet.title)

	return (
		<DishArticle>
			<Link to='/diet/create' className='create-dish-link'>
				<Button width='100%' height='60px' bgColor={theme.colors.main}>
					Stwórz potrawe
				</Button>
			</Link>
			<SearchInput
				className='search-input'
				width='50%'
				height='60px'
				// query={query}
				// setQuery={setQuery}
				// autocompleteData={dietsTitles}
			/>
			<DishListContainer>
				{/* {filteredDiets.map(diet => ( */}
				<DishContainer //key={diet._id}
				>
					{/* ={`/diet/${diet._id}`} */}
					<Dish>
						<div className='dish-title'>{/* //diet.title */}</div>
					</Dish>
				</DishContainer>
			</DishListContainer>
		</DishArticle>
	)
}
export default DishList
