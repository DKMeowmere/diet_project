import {
	Dish,
	DishsContainer,
	DishsArticle,
	DishModalContainer,
} from "./styles"
import { AiFillFire } from "react-icons/ai"
import { GiCoalWagon, GiMilkCarton } from "react-icons/gi"
import { RiOilFill } from "react-icons/ri"
import SearchInput from "../../components/searchInput/Index"
import { DishContainer } from "./styles"
import { useState, useMemo, useEffect } from "react"
import { Dish as DishType, Dishes as DishsType } from "../../types/dish"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useCookies } from "react-cookie"
import { addAlert, endLoading, startLoading } from "../../app/features/appSlice"
import { BsX } from "react-icons/bs"
import useReduce from "../../hooks/useReduce"

type Props = {
	setIsModalOpen: (isModalOpen: boolean) => void
	onDishClick: (dish: DishType) => void
}

function DishModal({ setIsModalOpen, onDishClick }: Props) {
	const [dishs, setDishs] = useState<DishsType>([])
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
		async function fetchDishs() {
			dispatch(startLoading())
			const res = await fetch(`${serverUrl}/api/dish`, {
				headers: {
					Authorization: `Bearer ${cookies.token}`,
				},
			})
			const data = await res.json()
			dispatch(endLoading())

			if (!res.ok) {
				setDishs([])
				dispatch(addAlert({ body: data?.error, type: "ERROR" }))
				return
			}

			if (!data) {
				setDishs([])
				return
			}

			setDishs(data as unknown as DishsType)
		}
		fetchDishs()
	}, [])

	const filteredDishs = useMemo(() => {
		return dishs.filter(dish =>
			dish.name.toLowerCase().includes(query.toLowerCase())
		)
	}, [query, dishs])

	const dishsTitles = dishs.map(dish => dish.name)
	const { calculateSum } = useReduce()

	return (
		<DishModalContainer>
			<DishsArticle>
				<p className="title">Wybierz potrawe</p>
				<SearchInput
					className="search-input"
					width="50%"
					height="60px"
					query={query}
					setQuery={setQuery}
					autocompleteData={dishsTitles}
				/>
				<DishsContainer>
					{filteredDishs.map(dish => (
						<DishContainer key={dish._id}>
							<Dish onClick={() => onDishClick(dish)}>
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
				</DishsContainer>
				<BsX className="close-btn" onClick={() => setIsModalOpen(false)} />
			</DishsArticle>
		</DishModalContainer>
	)
}
export default DishModal
