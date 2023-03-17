import { DishListContainer, DishContainer, Dish, DishArticle } from "./styles"
import SearchInput from "../../components/searchInput/Index"
import { Link } from "react-router-dom"
import { Button } from "../../components/button/Button"
import theme from "../../app/theme"
import { Dishes as DishesType } from "../../types/dish"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useState, useEffect, useMemo } from "react"
import { useCookies } from "react-cookie"
import { addAlert, endLoading, startLoading } from "../../app/features/appSlice"
import useCalculations from "../../hooks/useCalculations"
import PropertyBadge from "../../components/propertyBadge/Index"

function DishList() {
	const [dishes, setDishes] = useState<DishesType>([])
	const [query, setQuery] = useState("")
	const serverUrl = useAppSelector(state => state.app.serverUrl)
	const dispatch = useAppDispatch()
	const [cookies] = useCookies()
	const { getDishProductsPropertySum } = useCalculations()

	useEffect(() => {
		dispatch(startLoading())
		async function fetchDishes() {
			const res = await fetch(`${serverUrl}/api/dish`, {
				headers: {
					Authorization: `Bearer ${cookies.token}`,
				},
			})
			dispatch(endLoading())
			const data = await res.json()

			if (!res.ok) {
				setDishes([])
				dispatch(addAlert({ body: data?.error, type: "ERROR" }))
				return
			}

			if (!data) {
				setDishes([])
				return
			}

			setDishes(data as unknown as DishesType)
		}
		fetchDishes()
	}, [])

	const filteredDishes = useMemo(() => {
		return dishes.filter(dish =>
			dish.name.toLowerCase().includes(query.toLowerCase())
		)
	}, [query, dishes])

	const dishesNames = dishes.map(dish => dish.name)

	return (
		<DishArticle>
			<Link to="/dish/create" className="create-dish-link">
				<Button width="100%" height="60px" bgColor={theme.colors.main}>
					Stwórz potrawe
				</Button>
			</Link>
			<SearchInput
				className="search-input"
				width="50%"
				height="60px"
				query={query}
				setQuery={setQuery}
				autocompleteData={dishesNames}
			/>
			<DishListContainer>
				{filteredDishes.map(dish => (
					<DishContainer key={dish._id}>
						<Dish to={`/dish/${dish._id}`}>
							<div className="dish-title">{dish.name}</div>
							<PropertyBadge
								carbohydrates={getDishProductsPropertySum(
									dish,
									"carbohydrates"
								)}
								calories={getDishProductsPropertySum(dish, "calories")}
								fats={+getDishProductsPropertySum(dish, "fats")}
								proteins={getDishProductsPropertySum(dish, "proteins")}
							/>
						</Dish>
					</DishContainer>
				))}
			</DishListContainer>
		</DishArticle>
	)
}
export default DishList
