import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
	ProductGroup as ProductGroupType,
	ProductGroups as ProductGroupsType,
} from "../../types/productGroup."
import {
	CategoriesContainer,
	ProductGroup,
	ProductGroupContainer,
	ProductGroupsArticle,
	ProductGroupsContainer,
	ProductGroupsModalContainer,
} from "./styles"
import { useState, useEffect, useMemo } from "react"
import { addAlert, endLoading, startLoading } from "../../app/features/appSlice"
import { useCookies } from "react-cookie"
import { BsX } from "react-icons/bs"
import SearchInput from "../searchInput/Index"

type Props = {
	setIsModalOpen: (isModalOpen: boolean) => void
	onProductGroupClick: (products: ProductGroupType) => void
}

type Categories = {
	[key: string]: Category
}

type Category = {
	id: string
	name: string
	isActive: boolean
}

export default function ProductGroupModal({
	setIsModalOpen,
	onProductGroupClick,
}: Props) {
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

	return (
		<ProductGroupsModalContainer>
			<ProductGroupsArticle>
				<CategoriesContainer>
					{Array.from(Object.values(possibleCategories)).map(
						possibleCategory => {
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
						}
					)}
				</CategoriesContainer>
				<SearchInput
					className="search-input"
					width="50%"
					height="60px"
					query={query}
					setQuery={setQuery}
					autocompleteData={productGroupsTitles}
				/>
				<BsX className="close-btn" onClick={() => setIsModalOpen(false)} />
				<ProductGroupsContainer>
					{filteredProductGroups.map(productGroup => (
						<ProductGroupContainer key={productGroup._id}>
							<ProductGroup onClick={() => onProductGroupClick(productGroup)}>
								<div className="product-group-title">{productGroup.name}</div>
								<div className="products-list">
									{productGroup.products.map(product => {
										return <p key={product._id}>{product.name}</p>
									})}
								</div>
							</ProductGroup>
						</ProductGroupContainer>
					))}
				</ProductGroupsContainer>
			</ProductGroupsArticle>
		</ProductGroupsModalContainer>
	)
}
