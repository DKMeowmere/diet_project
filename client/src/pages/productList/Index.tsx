import { Product, ProductsContainer, ProductsArticle } from "./styles"
import SearchInput from "../../components/searchInput/Index"
import { ProductContainer } from "./styles"
import { useState, useMemo, useEffect } from "react"
import { Products } from "../../types/product"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useCookies } from "react-cookie"
import { addAlert, endLoading, startLoading } from "../../app/features/appSlice"
import { Link } from "react-router-dom"
import { Button } from "../../components/button/Button"
import theme from "../../app/theme"
import PropertiesBadge from "../../components/propertiesBadge/Index"

function ProductList() {
	const [products, setProducts] = useState<Products>([])
	const [query, setQuery] = useState("")
	const serverUrl = useAppSelector(state => state.app.serverUrl)
	const dispatch = useAppDispatch()
	const [cookies] = useCookies()

	useEffect(() => {
		dispatch(startLoading())
		async function fetchProducts() {
			const res = await fetch(`${serverUrl}/api/product`, {
				headers: {
					Authorization: `Bearer ${cookies.token}`,
				},
			})
			dispatch(endLoading())
			const data = await res.json()

			if (!res.ok) {
				setProducts([])
				dispatch(addAlert({ body: data?.error, type: "ERROR" }))
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
			<Link to="/product/create" className="create-product-link">
				<Button width="100%" height="60px" bgColor={theme.colors.main}>
					Stwórz produkt
				</Button>
			</Link>
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
					<ProductContainer key={product._id} to={`/product/${product._id}`}>
						<Product>
							<div className="product-title">{product.name}</div>
							<PropertiesBadge
								carbohydrates={+product.carbohydrates}
								calories={+product.calories}
								fats={+product.fats}
								proteins={+product.proteins}
								fiber={product.fiber ? +product.fiber : undefined}
							/>
						</Product>
					</ProductContainer>
				))}
			</ProductsContainer>
		</ProductsArticle>
	)
}
export default ProductList
