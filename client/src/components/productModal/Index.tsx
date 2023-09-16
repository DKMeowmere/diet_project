import {
	Product,
	ProductsContainer,
	ProductsArticle,
	ProductModalContainer,
} from "./styles"
import SearchInput from "../../components/searchInput/Index"
import { ProductContainer } from "./styles"
import { useState, useMemo, useEffect } from "react"
import {
	Product as ProductType,
	Products as ProductsType,
} from "../../types/product"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useCookies } from "react-cookie"
import { addAlert, endLoading, startLoading } from "../../app/features/appSlice"
import { BsX } from "react-icons/bs"
import PropertyBadge from "../propertyBadge/Index"

type Props = {
	setIsModalOpen: (isModalOpen: boolean) => void
	onProductClick: (product: ProductType) => void
}

function ProductModal({ setIsModalOpen, onProductClick }: Props) {
	const [products, setProducts] = useState<ProductsType>([])
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
							<Product onClick={() => onProductClick(product)}>
								<div className="product-title">{product.name}</div>
								<PropertyBadge
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
				<BsX className="close-btn" onClick={() => setIsModalOpen(false)} />
			</ProductsArticle>
		</ProductModalContainer>
	)
}
export default ProductModal
