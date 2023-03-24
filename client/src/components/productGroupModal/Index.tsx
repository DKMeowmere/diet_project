import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
	ProductGroup as ProductGroupType,
	ProductGroups as ProductGroupsType,
} from "../../types/productGroup."
import {
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

export default function ProductGroupModal({
	setIsModalOpen,
	onProductGroupClick,
}: Props) {
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
		<ProductGroupsModalContainer>
			<ProductGroupsArticle>
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
							</ProductGroup>
						</ProductGroupContainer>
					))}
				</ProductGroupsContainer>
			</ProductGroupsArticle>
		</ProductGroupsModalContainer>
	)
}
