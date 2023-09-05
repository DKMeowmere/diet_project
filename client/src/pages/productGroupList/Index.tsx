import {
	ProductGroup,
	ProductGroupsContainer,
	ProductGroupsArticle,
	CategoriesContainer,
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

type Categories = {
	[key: string]: Category
}

type Category = {
	id: string
	name: string
	isActive: boolean
}

function ProductGroupList() {
	const [productGroups, setProductGroups] = useState<ProductGroupsType>([])
	const [query, setQuery] = useState("")
	const serverUrl = useAppSelector(state => state.app.serverUrl)
	const dispatch = useAppDispatch()
	const [cookies] = useCookies()
	const [possibleCategories, setPossibleCategories] = useState<Categories>({})
	const [selectedCategories, setSelectedCategories] = useState(
		new Set<string>()
	)

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

  useEffect(() => {
		const categories: Categories = {}

		productGroups.forEach(productGroup => {
			if (productGroup.category) {
				const categoryName = productGroup.category

				const newCategory = {
					id: crypto.randomUUID(),
					name: productGroup.category,
					isActive: false,
				}

				categories[categoryName] = newCategory
			}
		})
		setPossibleCategories(categories)
	}, [productGroups])

	const filteredProductGroups = useMemo(() => {
		return productGroups.filter(productGroup => {
			if (
				selectedCategories.size > 0 &&
				productGroup.category &&
				!selectedCategories.has(productGroup.category)
			) {
				return false
			}

			return productGroup.name.toLowerCase().includes(query.toLowerCase())
		})
	}, [query, productGroups, selectedCategories, possibleCategories])

	const productGroupsTitles = productGroups.map(
		productGroup => productGroup.name
	)

	function toggleCategory({ id, name, isActive }: Category) {
		const newPossibleCategories: Categories = {
			...possibleCategories,
		}
		newPossibleCategories[name] = {
			id,
			name,
			isActive: !isActive,
		}

		setPossibleCategories(newPossibleCategories)

		const newSelectedCategories = selectedCategories

		if (newSelectedCategories.has(name)) {
			newSelectedCategories.delete(name)
		} else {
			newSelectedCategories.add(name)
		}

		setSelectedCategories(newSelectedCategories)
	}

	return (
		<ProductGroupsArticle>
			<Link to="/product-group/create" className="create-product-group-link">
				<Button width="100%" height="60px" bgColor={theme.colors.main}>
					Stwórz grupe produktów
				</Button>
			</Link>
			<CategoriesContainer>
				{Array.from(Object.values(possibleCategories)).map(possibleCategory => {
					const { id, name, isActive } = possibleCategory

					return (
						<div
							key={id}
							className={`item ${isActive ? "active" : ""}`}
							onClick={() => toggleCategory(possibleCategory)}
						>
							{name}
						</div>
					)
				})}
			</CategoriesContainer>
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
