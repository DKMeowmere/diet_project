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
import useReduce from "../../hooks/useReduce"
import { AiFillFire } from "react-icons/ai"
import { RiOilFill } from "react-icons/ri"
import { GiCoalWagon, GiMilkCarton } from "react-icons/gi"

function DishList() {
	const [dishes, setDishes] = useState<DishesType>([])
	const [query, setQuery] = useState("")
	const serverUrl = useAppSelector(state => state.app.serverUrl)
	const dispatch = useAppDispatch()
	const [cookies] = useCookies()
	const { calculateSum } = useReduce()

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
							<div className="dish-value">
								<div className="unit-container">
									<AiFillFire className="fire" />
									{
										+calculateSum(
											dish.products.map(product => +product.product.calories)
										)
									}
									cal
								</div>
								<div className="unit-container">
									<GiCoalWagon className="coal" />
									{
										+calculateSum(
											dish.products.map(
												product => +product.product.carbohydrates
											)
										)
									}
									W
								</div>
								<div className="unit-container">
									<GiMilkCarton className="milk" />
									{
										+calculateSum(
											dish.products.map(product => +product.product.proteins)
										)
									}
									B
								</div>
								<div className="unit-container">
									<RiOilFill className="oil" />
									{
										+calculateSum(
											dish.products.map(product => +product.product.fats)
										)
									}
									T
								</div>
							</div>
						</Dish>
					</DishContainer>
				))}
			</DishListContainer>
		</DishArticle>
	)
}
export default DishList
