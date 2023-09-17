import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { AiOutlineClose } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { addAlert, endLoading, startLoading } from "../../app/features/appSlice"
import { useAppSelector } from "../../app/hooks"
import theme from "../../app/theme"
import { Button } from "../../components/button/Button"
import Input from "../../components/input/Index"
import ProductModal from "../../components/productModal/Index"
import PropertiesBadge from "../../components/propertiesBadge/Index"
import Textarea from "../../components/textarea/Index"
import {
	Product as ProductType,
	Products as ProductsType,
} from "../../types/product"
import {
	ProductGroupFormContainer,
	Form,
	ProductContainer,
	ProductBox,
} from "./styles"

type Props = {
	type: "CREATE" | "UPDATE"
}

export default function ProductGroupForm({ type }: Props) {
	const [name, setName] = useState("")
	const [category, setCategory] = useState("")
	const [description, setDescription] = useState("")
	const [auxiliaryDescription, setAuxiliaryDescription] = useState("")
	const [products, setProducts] = useState<ProductsType>([])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [cookies] = useCookies()
	const serverUrl = useAppSelector(state => state.app.serverUrl)
	const { id } = useParams()

	{
		type === "CREATE" &&
			useEffect(() => {
				const productGroup = JSON.parse(
					localStorage.getItem("product-group") || "null"
				)

				if (productGroup) {
					setName(productGroup.name)
					setCategory(productGroup.category || "")
					setDescription(productGroup.description)
					setAuxiliaryDescription(productGroup.auxiliaryDescription)
					setProducts(productGroup.products)
				}
			}, [])

		type === "CREATE" &&
			useEffect(() => {
				if (!name) {
					return
				}

				const productGroup = {
					name,
					category,
					description,
					auxiliaryDescription,
					products,
				}

				localStorage.setItem("product-group", JSON.stringify(productGroup))
			}, [name, products, category, description, auxiliaryDescription])
	}

	{
		type === "UPDATE" &&
			useEffect(() => {
				dispatch(startLoading())
				async function fetchProductGroup() {
					const res = await fetch(`${serverUrl}/api/product-group/${id}`, {
						headers: {
							Authorization: `Bearer ${cookies.token}`,
						},
					})
					dispatch(endLoading())
					const data = await res.json()

					if (!res.ok) {
						setName("")
						setCategory("")
						setDescription("")
						setAuxiliaryDescription("")
						setProducts([])
						dispatch(addAlert({ body: data?.error, type: "ERROR" }))
						navigate("/product-group")
						return
					}

					if (!data) {
						setName("")
						setCategory("")
						setDescription("")
						setAuxiliaryDescription("")
						setProducts([])
						return
					}

					setName(data.name)
					setCategory(data.category)
					setDescription(data.description)
					setAuxiliaryDescription(data.auxiliaryDescription)
					setProducts(data.products)
				}
				fetchProductGroup()
			}, [])
	}

	function handleProductAddition(product: ProductType) {
		if (
			products.findIndex(
				(prevProduct: ProductType) => product._id === prevProduct._id
			) !== -1
		) {
			dispatch(
				addAlert({
					body: "Ten produkt już istnieje w tej grupie produktów",
					type: "WARNING",
				})
			)
			return
		}

		setProducts([...products, product])
		setIsModalOpen(false)
	}

	async function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
		e.preventDefault()

		try {
			if (!name) {
				throw new Error("Musisz podać nazwe grupy produktów")
			}

			if (!products.length) {
				throw new Error(
					"Musisz przypisać minimum jeden produkt do grupy produktów"
				)
			}

			const productsId = products.map(prevProduct => prevProduct._id)

			dispatch(startLoading())
			const url =
				type === "CREATE"
					? `${serverUrl}/api/product-group`
					: `${serverUrl}/api/product-group/${id}`
			const res = await fetch(url, {
				method: type === "CREATE" ? "POST" : "PATCH",
				body: JSON.stringify({
					name,
					category,
					description,
					auxiliaryDescription,
					products: productsId,
				}),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${cookies.token}`,
				},
			})
			dispatch(endLoading())
			const data = await res.json()

			if (!res.ok) {
				throw new Error(data.error)
			}

			dispatch(
				addAlert({
					body: `Grupe produktów ${
						type === "CREATE" ? "dodano" : "zaaktualizowano"
					} pomyślnie`,
					type: "SUCCESS",
				})
			)

			type === "CREATE" && localStorage.setItem("product-group", "null")
			type === "CREATE" && navigate("/product-group")
		} catch (err: unknown) {
			const message = err instanceof Error ? err.message : "Nieoczekiwany błąd"

			dispatch(
				addAlert({
					body: message || "Nieoczekiwany błąd",
					type: "ERROR",
				})
			)
		}
	}

	async function handleDelete(e: React.FormEvent<HTMLButtonElement>) {
		e.preventDefault()

		try {
			dispatch(startLoading)
			const res = await fetch(`${serverUrl}/api/product-group/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${cookies.token}`,
				},
			})
			dispatch(endLoading())
			const data = await res.json()

			if (!res.ok) {
				throw new Error(data.error)
			}

			dispatch(
				addAlert({
					body: "Grupe produktów usunięto pomyślnie",
					type: "SUCCESS",
				})
			)

			navigate("/product-group")
		} catch (err: unknown) {
			const message = err instanceof Error ? err.message : "Nieoczekiwany błąd"

			dispatch(
				addAlert({
					body: message || "Nieoczekiwany błąd",
					type: "ERROR",
				})
			)
		}
	}

	return (
		<ProductGroupFormContainer>
			{isModalOpen && (
				<ProductModal
					onProductClick={handleProductAddition}
					setIsModalOpen={setIsModalOpen}
				/>
			)}
			<Form>
				<p className="form-title">
					{type === "CREATE" ? "Dodaj" : "Edytuj"} grupę produktów
				</p>
				<Button
					width="90%"
					height="40px"
					type="submit"
					onClick={handleSubmit}
					bgColor={theme.colors.main}
					className="btn"
				>
					Zatwierdź
				</Button>
				{type === "UPDATE" && (
					<Button
						width="90%"
						height="40px"
						type="submit"
						bgColor={theme.colors.errorMain}
						onClick={handleDelete}
						className="btn"
					>
						Usuń
					</Button>
				)}
				<p className="form-text">Podaj nazwę grupy produktów</p>
				<Input
					width="500px"
					height="50px"
					placeholder="Podaj nazwe"
					value={name}
					onChange={e => setName(e.target.value)}
				/>
				<p className="form-text">
					Podaj kategorie grupy produktów (opcjonalnie)
				</p>
				<Input
					width="500px"
					height="50px"
					placeholder="Podaj kategorie"
					value={category}
					onChange={e => setCategory(e.target.value)}
				/>
				<Textarea
					width="500px"
					height="150px"
					placeholder="Podaj opis"
					value={description}
					onChange={e => setDescription(e.target.value)}
				/>
				<p className="form-text">
					Podaj pomocniczy opis grupy produktów (opcjonalnie)
				</p>
				<Textarea
					width="500px"
					height="150px"
					placeholder="Podaj pomocniczy opis, bedzie widoczny tylko dla ciebie, możesz zapisać domyślną wage dla produktów"
					value={auxiliaryDescription}
					onChange={e => setAuxiliaryDescription(e.target.value)}
				/>
				<Button
					width="90%"
					height="40px"
					type="button"
					bgColor={theme.colors.main}
					onClick={() => setIsModalOpen(true)}
					className="btn"
				>
					Dodaj produkt
				</Button>
				{products.length > 0 && (
					<>
						<p className="form-text">
							Właściwości produktów są podane dla 100g produktu
						</p>
						<ProductBox>
							{products.map(product => (
								<ProductContainer key={product._id}>
									<AiOutlineClose
										className="close-icon"
										onClick={() =>
											setProducts(
												products.filter(
													prevProduct => prevProduct._id !== product._id
												)
											)
										}
									/>
									<p className="product-title">{product.name}</p>
									<PropertiesBadge
										carbohydrates={+(+product.carbohydrates).toFixed(2)}
										calories={+(+product.calories).toFixed(2)}
										fats={+(+product.fats).toFixed(2)}
										proteins={+(+product.proteins).toFixed(2)}
									/>
								</ProductContainer>
							))}
						</ProductBox>
					</>
				)}
			</Form>
		</ProductGroupFormContainer>
	)
}
