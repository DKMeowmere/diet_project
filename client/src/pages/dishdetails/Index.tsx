import { DishDetailsContainer, Form, ProductContainer } from "./styles"
import Input from "../../components/input/Index"
import { Button } from "../../components/button/Button"
import theme from "../../app/theme"
import { AiOutlineClose } from "react-icons/ai"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { addAlert, endLoading, startLoading } from "../../app/features/appSlice"
import { useAppSelector } from "../../app/hooks"
import { useCookies } from "react-cookie"
import { useNavigate, useParams } from "react-router-dom"
import { MealProducts } from "../../types/meal"
import ProductModal from "../../components/productModal/Index"
import { Product as ProductType } from "../../types/product"
import useCalculations from "../../hooks/useCalculations"
import PropertyBadge from "../../components/propertyBadge/Index"

function DishDetails() {
	const [name, setName] = useState('')
	const [products, setProducts] = useState<MealProducts>([])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [cookies] = useCookies()
	const serverUrl = useAppSelector(state => state.app.serverUrl)
	const { id } = useParams()
	const { getDishProductsPropertySum, getMealProductProperty } =
		useCalculations()

	useEffect(() => {
		dispatch(startLoading())
		async function fetchDish() {
			const res = await fetch(`${serverUrl}/api/dish/${id}`, {
				headers: {
					Authorization: `Bearer ${cookies.token}`,
				},
			})
			dispatch(endLoading())
			const data = await res.json()

			if (!res.ok) {
				setName('')
				setProducts([])
				dispatch(addAlert({ body: data?.error, type: 'ERROR' }))
				return
			}

			if (!data) {
				setName('')
				setProducts([])
				return
			}

			setName(data.name)
			setProducts(data.products)
		}
		fetchDish()
	}, [])

	async function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
		e.preventDefault()

		try {
			if (!name) {
				throw new Error('Musisz podać nazwe potrawy')
			}

			if (!products.length) {
				throw new Error('Musisz przypisać minimum jeden produkt do potrawy')
			}

			for (let i = 0; i < products.length; i++) {
				const product = products[i]

				if (isNaN(+product.count)) {
					throw new Error(`Ilość produktu : ${product.product.name} to nie liczba`)
				}

				if (isNaN(+product.grams)) {
					throw new Error(`Waga produktu : ${product.product.name} to nie liczba`)
				}
			}

			const productsToPatch = products.map(prevProduct => ({
				...prevProduct,
				_id: undefined,
				product: prevProduct.product._id,
			}))

			dispatch(startLoading())
			const res = await fetch(`${serverUrl}/api/dish/${id}`, {
				method: "PATCH",
				body: JSON.stringify({
					name,
					products: productsToPatch,
				}),
				headers: {
					'Content-Type': 'application/json',
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
					body: 'Potrawe zaaktualizowano pomyślnie',
					type: 'SUCCESS',
				})
			)

			navigate('/dish')
		} catch (err: unknown) {
			const message = err instanceof Error ? err.message : 'Nieoczekiwany błąd'

			dispatch(
				addAlert({
					body: message || 'Nieoczekiwany błąd',
					type: 'ERROR',
				})
			)
		}
	}

	function handleProductAddition(product: ProductType) {
		setProducts([
			...products,
			{
				_id: crypto.randomUUID(),
				count: '1',
				grams: '0',
				product,
			},
		])
		setIsModalOpen(false)
	}

	async function handleDelete(e: React.FormEvent<HTMLButtonElement>) {
		e.preventDefault()

		try {
			dispatch(startLoading)
			const res = await fetch(`${serverUrl}/api/dish/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
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
					body: 'Potrawe usunięto pomyślnie',
					type: 'SUCCESS',
				})
			)

			navigate('/dish')
		} catch (err: unknown) {
			const message = err instanceof Error ? err.message : 'Nieoczekiwany błąd'

			dispatch(
				addAlert({
					body: message || 'Nieoczekiwany błąd',
					type: 'ERROR',
				})
			)
		}
	}

	return (
		<DishDetailsContainer>
			{isModalOpen && <ProductModal onProductClick={handleProductAddition} setIsModalOpen={setIsModalOpen} />}
			<Form>
				<p className="dish-title">Edytuj potrawę</p>
				<Button
					width="90%"
					height="40px"
					type="submit"
					onClick={handleSubmit}
					bgColor={theme.colors.main}
				>
					Zatwierdź
				</Button>
				<Button width='90%' height='40px' type='submit' bgColor={theme.colors.errorMain} onClick={handleDelete}>
					Usuń
				</Button>
				<p className='dish-text'>Podaj nazwę potrawy</p>
				<Input
					width='90%'
					height='50px'
					placeholder='Podaj nazwe'
					value={name}
					onChange={e => setName(e.target.value)}
				/>
				<Button
					width='90%'
					height='40px'
					type='button'
					bgColor={theme.colors.main}
					onClick={() => setIsModalOpen(true)}>
					Dodaj produkt
				</Button>
				<PropertyBadge
					carbohydrates={getDishProductsPropertySum(
						{ _id: "", products, name },
						"carbohydrates"
					)}
					calories={getDishProductsPropertySum(
						{ _id: "", products, name },
						"calories"
					)}
					fats={getDishProductsPropertySum({ _id: "", products, name }, "fats")}
					proteins={getDishProductsPropertySum(
						{ _id: "", products, name },
						"proteins"
					)}
				/>
				{products.length > 0 &&
					products.map(product => (
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
							<p className="product-title">{product.product.name}</p>
							<PropertyBadge
								carbohydrates={getMealProductProperty(product, "carbohydrates")}
								calories={getMealProductProperty(product, "calories")}
								fats={getMealProductProperty(product, "fats")}
								proteins={getMealProductProperty(product, "proteins")}
							/>
							<p className="dish-text">Podaj wagę produktu (g)</p>
							<Input
								width='90%'
								height='50px'
								placeholder='Podaj wagę w gramach'
								value={product.grams}
								onChange={e =>
									setProducts(
										products.map(prevProduct =>
											prevProduct._id === product._id ? { ...prevProduct, grams: e.target.value } : prevProduct
										)
									)
								}
							/>
							<p className="dish-text">Podaj ilość produktu</p>
							<Input
								width='90%'
								height='50px'
								placeholder='Podaj ilość'
								value={product.count}
								onChange={e =>
									setProducts(
										products.map(prevProduct =>
											prevProduct._id === product._id ? { ...prevProduct, count: e.target.value } : prevProduct
										)
									)
								}
							/>
						</ProductContainer>
					))}
			</Form>
		</DishDetailsContainer>
	)
}
export default DishDetails
