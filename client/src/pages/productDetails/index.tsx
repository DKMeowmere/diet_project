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

function ProductForm() {
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
			dispatch(endLoading())
			const data = await res.json()

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

			if (isNaN(+product.calories)) {
				throw new Error("Kalorie to nie liczba")
			}

			if (isNaN(+product.fats)) {
				throw new Error("Tłuszcze to nie liczba")
			}

			if (isNaN(+product.proteins)) {
				throw new Error("Białka to nie liczba")
			}

			if (isNaN(+product.carbohydrates)) {
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
			dispatch(endLoading())
			const data = await res.json()

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
			dispatch(endLoading())
			const data = await res.json()

			if (!res.ok) {
				throw new Error(data.error)
			}

			dispatch(
				addAlert({
					body: "Produkt usunięto pomyślnie",
					type: "SUCCESS",
				})
			)

			navigate("/product")
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
				<p className="product-title">Modyfikuj Produkt: {product.name}</p>
				<p className="product-subtitle">Wszystkie wartości są dla 100g</p>
				<p className="product-text">Podaj nazwe produktu</p>
				<Input
					width="90%"
					height="50px"
					placeholder="Podaj nazwe produktu..."
					value={product.name}
					data-cy="product-name-input"
					onChange={e => setProduct({ ...product, name: e.target.value })}
				/>
				<p className="product-text">Edytuj ilość kalorii</p>
				<Input
					width="90%"
					height="50px"
					data-cy="product-calories-input"
					placeholder="Edytuj ilość"
					value={product.calories}
					onChange={e =>
						setProduct({
							...product,
							calories: e.target.value,
						})
					}
				/>
				<p className="product-text">Edytuj ilość tłuszczy</p>
				<Input
					width="90%"
					height="50px"
					data-cy="product-fats-input"
					placeholder="Edytuj ilość"
					value={product.fats}
					onChange={e =>
						setProduct({
							...product,
							fats: e.target.value,
						})
					}
				/>
				<p className="product-text">Edytuj ilość Białka</p>
				<Input
					width="90%"
					height="50px"
					data-cy="product-proteins-input"
					placeholder="Edytuj ilość"
					value={product.proteins}
					onChange={e =>
						setProduct({
							...product,
							proteins: e.target.value,
						})
					}
				/>
				<p className="product-text">Edytuj ilość Węglowodanów</p>
				<Input
					width="90%"
					height="50px"
					data-cy="product-carbohydrates-input"
					placeholder="Edytuj Ilość"
					value={product.carbohydrates}
					onChange={e =>
						setProduct({
							...product,
							carbohydrates: e.target.value,
						})
					}
				/>
				<Button
					width="90%"
					height="40px"
					type="submit"
					data-cy="product-submit-btn"
					bgColor={theme.colors.main}
				>
					Zatwierdź
				</Button>
				<Button
					width="90%"
					height="40px"
					type="button"
					data-cy="product-delete-btn"
					bgColor={theme.colors.errorMain}
					onClick={handleDelete}
				>
					Usuń
				</Button>
			</Form>
		</ProductDetailsContainer>
	)
}
export default ProductForm
