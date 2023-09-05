import { ProductCreateContainer, Form } from "./styles"
import Input from "../../components/input/Index"
import { Button } from "../../components/button/Button"
import theme from "../../app/theme"
import { useState, useEffect } from "react"
import { addAlert, endLoading, startLoading } from "../../app/features/appSlice"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../../app/hooks"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"

function CreateProduct() {
	const [calories, setCalories] = useState("0")
	const [fats, setFats] = useState("0")
	const [proteins, setProteins] = useState("0")
	const [carbohydrates, setCarbohydrates] = useState("0")
	const dispatch = useDispatch()
	const serverUrl = useAppSelector(state => state.app.serverUrl)
	const [name, setName] = useState("")
	const [cookies] = useCookies()
	const navigate = useNavigate()

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		try {
			if (isNaN(+calories)) {
				throw new Error("Kalorie to nie liczba")
			}

			if (isNaN(+fats)) {
				throw new Error("Tłuszcze to nie liczba")
			}

			if (isNaN(+proteins)) {
				throw new Error("Białka to nie liczba")
			}

			if (isNaN(+carbohydrates)) {
				throw new Error("Węglowodany to nie liczba")
			}

			if (!name) {
				throw new Error("Podaj nazwe produktu")
			}

			dispatch(startLoading())
			const res = await fetch(`${serverUrl}/api/product`, {
				method: "POST",
				body: JSON.stringify({
					name,
					calories,
					fats,
					proteins,
					carbohydrates,
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
					body: "Produkt dodano pomyślnie",
					type: "SUCCESS",
				})
			)

			localStorage.setItem("product", "null")
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

	useEffect(() => {
		const product = JSON.parse(localStorage.getItem("product") || "null")

		if (product) {
			setName(product.name)
			setCalories(product.calories)
			setFats(product.fats)
			setCarbohydrates(product.carbohydrates)
			setProteins(product.proteins)
		}
	}, [])

	useEffect(() => {
		if (!calories || !carbohydrates || !fats || !name || !proteins) {
			return
		}

		const product = {
			calories,
			carbohydrates,
			fats,
			name,
			proteins,
		}

		localStorage.setItem("product", JSON.stringify(product))
	}, [calories, carbohydrates, fats, name, proteins])

	return (
		<ProductCreateContainer>
			<Form onSubmit={handleSubmit}>
				<p className="product-title">Stwórz Produkt</p>
				<p className="product-subtitle">Wszystkie wartości są dla 100g</p>
				<p className="product-text">Podaj nazwe produktu</p>
				<Input
					width="90%"
					height="50px"
					placeholder="Podaj nazwe produktu..."
					data-cy="product-name-input"
					value={name}
					onChange={e => setName(e.target.value)}
				/>
				<p className="product-text">Podaj ilość kalorii</p>
				<Input
					width="90%"
					height="50px"
					placeholder="Podaj ilość kalorii..."
					data-cy="product-calories-input"
					value={calories}
					onChange={e => setCalories(e.target.value)}
				/>
				<p className="product-text">Podaj ilość tłuszczy</p>
				<Input
					width="90%"
					height="50px"
					placeholder="Podaj ilość tłuszczy"
					data-cy="product-fats-input"
					value={fats}
					onChange={e => setFats(e.target.value)}
				/>

				<p className="product-text">Podaj ilość białka</p>
				<Input
					width="90%"
					height="50px"
					placeholder="Podaj ilość białka"
					data-cy="product-proteins-input"
					value={proteins}
					onChange={e => setProteins(e.target.value)}
				/>

				<p className="product-text">Podaj ilość węglowodanów</p>
				<Input
					width="90%"
					height="50px"
					placeholder="Podaj ilość węglowodanów..."
					data-cy="product-carbohydrates-input"
					value={carbohydrates}
					onChange={e => setCarbohydrates(e.target.value)}
				/>

				<Button
					width="90%"
					height="40px"
					data-cy="product-submit-btn"
					type="submit"
					bgColor={theme.colors.main}
				>
					Zatwierdź
				</Button>
			</Form>
		</ProductCreateContainer>
	)
}
export default CreateProduct
