import { BsX } from "react-icons/bs"
import { useDispatch } from "react-redux"
import { removeProduct, removeProductGroup } from "../../app/features/dietSlice"
import useCalculations from "../../hooks/useCalculations"
import useReduce from "../../hooks/useReduce"
import { Day as DayType } from "../../types/day"
import { Meal as MealType } from "../../types/meal"
import { ProductGroup as ProductGroupType } from "../../types/productGroup."
import Product from "./Product"
import { ProductGroupContainer } from "./styles"

type Props = {
	meal: MealType
	day: DayType
	productGroup: ProductGroupType
}

export default function ProductGroup({ meal, day, productGroup }: Props) {
	const dispatch = useDispatch()
	const { calculateSum } = useReduce()
	const { getMealProductGroupProperty } = useCalculations()

	function deleteProductGroup() {
		meal.products.forEach(product => {
			if (product.referringTo === productGroup._id) {
				dispatch(removeProduct({ day, meal, product }))
			}
		})

		dispatch(
			removeProductGroup({ dayId: day._id, mealId: meal._id, productGroup })
		)
	}

	return (
		<ProductGroupContainer>
			<p className="product-group-title">
				Grupa produktów: {productGroup.name}
				<BsX className="close-btn" onClick={deleteProductGroup} />
			</p>
			{productGroup.auxiliaryDescription && (
				<p className="product-group-description">
					{productGroup.auxiliaryDescription}
				</p>
			)}
			<div className="product-container">
				<div className="products-meal">Produkt </div>
				<div className="weight-meal">Waga</div>
				<div className="calories-meal">Kalorie</div>
				<div className="carbo-meal">Węglowodany</div>
				<div className="proteins-meal">Białka</div>
				<div className="fats-meal">Tłuszcze</div>
        <div className="fiber-meal">Błonnik</div>
				<div className="weight-meal">Ilość</div>
			</div>
			{meal.products.map(product => {
				if (product.referringTo !== productGroup._id) return
				return (
					<Product key={product._id} day={day} meal={meal} product={product} />
				)
			})}
			<div className="product-container">
				<div className="products-meal">Razem</div>
				<div className="weight-meal">
					{
						+calculateSum(
							meal.products.map(product => {
								if (product.referringTo !== productGroup._id) return 0
								return +(+product.grams * +product.count).toFixed(2)
							})
						)
					}
					g
				</div>
				<div className="calories-meal">
					{getMealProductGroupProperty("calories", meal, productGroup._id)} cal
				</div>
				<div className="carbo-meal">
					{getMealProductGroupProperty("carbohydrates", meal, productGroup._id)}
					W
				</div>
				<div className="proteins-meal">
					{getMealProductGroupProperty("proteins", meal, productGroup._id)} B
				</div>
				<div className="fats-meal">
					{getMealProductGroupProperty("fats", meal, productGroup._id)} T
				</div>
				<div className="fiber-meal">
					{getMealProductGroupProperty("fiber", meal, productGroup._id)} bł
				</div>
				<div className="weight-meal">-</div>
			</div>
		</ProductGroupContainer>
	)
}
