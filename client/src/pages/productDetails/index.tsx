import { ProductDetailsContainer, Form } from "./styles"
import Input from "../../components/input/Index"
import { Button } from "../../components/button/Button"
import theme from "../../app/theme"
import { useEffect, useState } from "react"
import { Product as ProductType } from "../../types/product"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { addAlert, endLoading, startLoading } from "../../app/features/appSlice"
import { useCookies } from "react-cookie"

function ProductDetails() {
	const [product, setProduct] = useState<ProductType | null>(null)
	const { id } = useParams()
	const serverUrl = useAppSelector(state => state.app.serverUrl)
	const dispatch = useAppDispatch()
	const [cookies] = useCookies()
	const navigate = useNavigate()

	useEffect(() => {
		dispatch(startLoading())
		async function fetchProduct() {
			const res = await fetch(`${serverUrl}/api/product/${id}`, {
				headers: {
					Authorization: `Bearer ${cookies.token}`,
				},
			})
			const data = await res.json()
			dispatch(endLoading())

			if (!res.ok) {
				setProduct(null)
				dispatch(addAlert({ body: data?.error, type: "ERROR" }))
				return
			}

			if (!data) {
				setProduct(null)
				return
			}

			setProduct(data as unknown as ProductType)
		}
		fetchProduct()
	}, [])

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		try {
			if (!product) {
				throw new Error("oczekiwany błąd")
			}

			if (isNaN(product.calories)) {
				throw new Error("Kalorie to nie liczba")
			}

			if (isNaN(product.fats)) {
				throw new Error("Tłuszcze to nie liczba")
			}

			if (isNaN(product.proteins)) {
				throw new Error("Białka to nie liczba")
			}

			if (isNaN(product.carbohydrates)) {
				throw new Error("Węglowodany to nie liczba")
			}

			if (!product.name) {
				throw new Error("Podaj nazwe produktu")
			}

			dispatch(startLoading)
			const res = await fetch(`${serverUrl}/api/product/${id}`, {
				method: "PATCH",
				body: JSON.stringify(product),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${cookies.token}`,
				},
			})
			const data = await res.json()
			dispatch(endLoading())

			if (!res.ok) {
				throw new Error(data.error)
			}

			dispatch(
				addAlert({
					body: "Produkt zaaktualizowano pomyślnie",
					type: "SUCCESS",
				})
			)

			setProduct(data)
		} catch (err: unknown) {
			const message =
				err instanceof Error ? err.message : "Nieoczekiwany błąd"

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
			if (!product) {
				throw new Error("oczekiwany błąd")
			}

			dispatch(startLoading)
			const res = await fetch(`${serverUrl}/api/product/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${cookies.token}`,
				},
			})
			const data = await res.json()
			dispatch(endLoading())

			if (!res.ok) {
				throw new Error(data.error)
			}

			dispatch(
				addAlert({
					body: "Produkt usunięto pomyślnie",
					type: "SUCCESS",
				})
			)

			navigate("/")
		} catch (err: unknown) {
			const message =
				err instanceof Error ? err.message : "Nieoczekiwany błąd"

			dispatch(
				addAlert({
					body: message || "Nieoczekiwany błąd",
					type: "ERROR",
				})
			)
		}
	}

	if (!product) {
		return (
			<ProductDetailsContainer>
				<Link to="/">
					Nie znaleziono diety o podanym id. Wróć do strony głównej
				</Link>
			</ProductDetailsContainer>
		)
	}

	return (
		<ProductDetailsContainer>
			<Form onSubmit={handleSubmit}>
				<p className="product-title">
					Modyfikuj Produkt: {product.name}
				</p>
				<p className="product-subtitle">
					Wszystkie wartości są dla 100g
				</p>
				<p className="product-text">Podaj nazwe produktu</p>
				<Input
					width="90%"
					height="50px"
					placeholder="Podaj nazwe produktu..."
					value={product.name}
					onChange={e =>
						setProduct({ ...product, name: e.target.value })
					}
				/>
				<p className="product-text">Edytuj ilość kalorii</p>
				<Input
					width="90%"
					height="50px"
					placeholder="Edytuj ilość"
					value={product.calories.toString()}
					onChange={e => {
						if (isNaN(parseFloat(e.target.value))) {
							setProduct({ ...product, calories: 0 })
							return
						}
						setProduct({
							...product,
							calories: parseFloat(e.target.value),
						})
					}}
				/>
				<p className="product-text">Edytuj ilość tłuszczy</p>
				<Input
					width="90%"
					height="50px"
					placeholder="Edytuj ilość"
					value={product.fats.toString()}
					onChange={e => {
						if (isNaN(parseFloat(e.target.value))) {
							setProduct({ ...product, fats: 0 })
							return
						}
						setProduct({
							...product,
							fats: parseFloat(e.target.value),
						})
					}}
				/>
				<p className="product-text">Edytuj ilość Białka</p>
				<Input
					width="90%"
					height="50px"
					placeholder="Edytuj ilość"
					value={product.proteins.toString()}
					onChange={e => {
						if (isNaN(parseFloat(e.target.value))) {
							setProduct({ ...product, proteins: 0 })
							return
						}
						setProduct({
							...product,
							proteins: parseFloat(e.target.value),
						})
					}}
				/>
				<p className="product-text">Edytuj ilość Węglowodanów</p>
				<Input
					width="90%"
					height="50px"
					placeholder="Edytuj Ilość"
					value={product.carbohydrates.toString()}
					onChange={e => {
						if (isNaN(parseFloat(e.target.value))) {
							setProduct({ ...product, carbohydrates: 0 })
							return
						}
						setProduct({
							...product,
							carbohydrates: parseFloat(e.target.value),
						})
					}}
				/>
				<Button
					width="90%"
					height="40px"
					type="submit"
					bgColor={theme.colors.main}
				>
					Zatwierdź
				</Button>
				<Button
					width="90%"
					height="40px"
					type="button"
					bgColor={theme.colors.errorMain}
					onClick={handleDelete}
				>
					Usuń
				</Button>
			</Form>
		</ProductDetailsContainer>
	)
}
export default ProductDetails
