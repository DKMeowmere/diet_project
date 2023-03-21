import {
	ProductGroup,
	ProductGroupsContainer,
	ProductGroupsArticle,
} from "./styles"
import SearchInput from "../../components/searchInput/Index"
import { ProductGroupContainer } from "./styles"
import { useState, useMemo, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useCookies } from "react-cookie"
import { addAlert, endLoading, startLoading } from "../../app/features/appSlice"
import { Link } from "react-router-dom"
import { Button } from "../../components/button/Button"
import theme from "../../app/theme"
import { ProductGroups as ProductGroupsType } from "../../types/productGroup."

function ProductGroupList() {
	const [productGroups, setProductGroups] = useState<ProductGroupsType>([])
	const [query, setQuery] = useState("")
	const serverUrl = useAppSelector(state => state.app.serverUrl)
	const dispatch = useAppDispatch()
	const [cookies] = useCookies()

	useEffect(() => {
		dispatch(startLoading())
		async function fetchProductGroups() {
			const res = await fetch(`${serverUrl}/api/product-group`, {
				headers: {
					Authorization: `Bearer ${cookies.token}`,
				},
			})
			dispatch(endLoading())
			const data = await res.json()

			if (!res.ok) {
				setProductGroups([])
				dispatch(addAlert({ body: data?.error, type: "ERROR" }))
				return
			}

			if (!data) {
				setProductGroups([])
				return
			}

			setProductGroups(data as unknown as ProductGroupsType)
		}
		fetchProductGroups()
	}, [])

	const filteredProductGroups = useMemo(() => {
		return productGroups.filter(productGroup =>
			productGroup.name.toLowerCase().includes(query.toLowerCase())
		)
	}, [query, productGroups])

	const productGroupsTitles = productGroups.map(
		productGroup => productGroup.name
	)

	return (
		<ProductGroupsArticle>
			<Link to="/product-group/create" className="create-product-group-link">
				<Button width="100%" height="60px" bgColor={theme.colors.main}>
					Stwórz grupe produktów
				</Button>
			</Link>
			<SearchInput
				className="search-input"
				width="50%"
				height="60px"
				query={query}
				setQuery={setQuery}
				autocompleteData={productGroupsTitles}
			/>
			<ProductGroupsContainer>
				{filteredProductGroups.map(productGroup => (
					<ProductGroupContainer
						key={productGroup._id}
						to={`/product-group/${productGroup._id}`}
					>
						<ProductGroup>
							<div className="product-group-title">{productGroup.name}</div>
						</ProductGroup>
					</ProductGroupContainer>
				))}
			</ProductGroupsContainer>
		</ProductGroupsArticle>
	)
}
export default ProductGroupList
