import {
	Product,
	ProductsContainer,
	ProductsArticle,
	ProductModalContainer,
} from "./styles"
import { AiFillFire } from "react-icons/ai"
import { GiCoalWagon, GiMilkCarton } from "react-icons/gi"
import { RiOilFill } from "react-icons/ri"
import SearchInput from "../../components/searchInput/Index"
import { ProductContainer } from "./styles"
import { useState, useMemo, useEffect } from "react"
import { Products as ProductsType } from "../../types/product"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useCookies } from "react-cookie"
import { addAlert, endLoading, startLoading } from "../../app/features/appSlice"
import { WhereToPassProduct } from "../../types/whereToPassProduct"
import { addProduct } from "../../app/features/dietSlice"

function ProductModal({
	whereToPassProduct,
	setWhereToPassProduct,
	setIsModalOpen,
}: {
	whereToPassProduct: WhereToPassProduct | null
	setWhereToPassProduct: (
		WhereToPassProduct: WhereToPassProduct | null
	) => void
	setIsModalOpen: (isModalOpen: boolean) => void
}) {
	const [products, setProducts] = useState<ProductsType>([])
	const [query, setQuery] = useState("")
	const serverUrl = useAppSelector(state => state.app.serverUrl)
	const dispatch = useAppDispatch()
	const [cookies] = useCookies()

	useEffect(() => {
		document.body.style.overflowY = "hidden"
		return () => {
			document.body.style.overflowY = "auto"
		}
	}, [])

	useEffect(() => {
		async function fetchProducts() {
			dispatch(startLoading())
			const res = await fetch(`${serverUrl}/api/product`, {
				headers: {
					Authorization: `Bearer ${cookies.token}`,
				},
			})
			const data = await res.json()
			dispatch(endLoading())

			if (!res.ok) {
				setProducts([])
				dispatch(addAlert({ body: data?.error, type: "ERROR" }))
				return
			}

			if (!data) {
				setProducts([])
				return
			}

			setProducts(data as unknown as ProductsType)
		}
		fetchProducts()
	}, [])

	const filteredProducts = useMemo(() => {
		return products.filter(product =>
			product.name.toLowerCase().includes(query.toLowerCase())
		)
	}, [query, products])

	const productsTitles = products.map(product => product.name)

	return (
		<ProductModalContainer>
			<ProductsArticle>
				<p className="title">Wybierz produkt</p>
				<SearchInput
					className="search-input"
					width="50%"
					height="60px"
					query={query}
					setQuery={setQuery}
					autocompleteData={productsTitles}
				/>
				<ProductsContainer>
					{filteredProducts.map(product => (
						<ProductContainer key={product._id}>
							<Product
								onClick={() => {
									if (!whereToPassProduct) {
										return
									}

									setIsModalOpen(false)
									dispatch(
										addProduct({
											dayId: whereToPassProduct.dayId,
											mealId: whereToPassProduct.mealId,
											product,
										})
									)
									setWhereToPassProduct(null)
								}}
							>
								<div className="product-title">
									{product.name}
								</div>
								<div className="product-value">
									<div className="unit-container">
										<AiFillFire className="fire" />
										{product.calories}cal
									</div>
									<div className="unit-container">
										<GiCoalWagon className="coal" />
										{product.carbohydrates} W
									</div>
									<div className="unit-container">
										<GiMilkCarton className="milk" />
										{product.proteins} B
									</div>
									<div className="unit-container">
										<RiOilFill className="oil" />
										{product.fats} T
									</div>
								</div>
							</Product>
						</ProductContainer>
					))}
				</ProductsContainer>
			</ProductsArticle>
		</ProductModalContainer>
	)
}
export default ProductModal
