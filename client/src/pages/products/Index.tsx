import { Product, ProductsContainer, ProductsArticle } from "./styles"
import { AiFillFire } from "react-icons/ai"
import { GiCoalWagon, GiMilkCarton } from "react-icons/gi"
import { RiOilFill } from "react-icons/ri"
import SearchInput from "../../components/searchInput/Index"
import { ProductContainer } from "./styles"
import { useState, useMemo, useEffect } from "react"
import { Products } from "../../types/product"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useCookies } from "react-cookie"
import { addAlert } from "../../app/features/appSlice"

function ProductsList() {
	const [products, setProducts] = useState<Products>([])
	const [query, setQuery] = useState("")
	const serverUrl = useAppSelector(state => state.app.serverUrl)
	const dispatch = useAppDispatch()
	const [cookies] = useCookies()

	useEffect(() => {
		async function fetchProducts() {
			const res = await fetch(`${serverUrl}/api/product`, {
				headers: {
					Authorization: `Bearer ${cookies.token}`,
				},
			})
			const data = await res.json()

			if (!res.ok) {
				setProducts([])
				dispatch(addAlert({ body: data?.message, type: "ERROR" }))
				return
			}

			if (!data) {
				setProducts([])
				return
			}

			setProducts(data as unknown as Products)
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
		<ProductsArticle>
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
					<ProductContainer
						key={product._id}
						to={`/product/${product._id}`}
					>
						<Product>
							<div className="product-title">{product.name}</div>
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
									<RiOilFill className="oil"/> {product.fats} T
								</div>
							</div>
						</Product>
					</ProductContainer>
				))}
			</ProductsContainer>
		</ProductsArticle>
	)
}
export default ProductsList
