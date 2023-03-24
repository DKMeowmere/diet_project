import { BsX } from "react-icons/bs"
import { useDispatch } from "react-redux"
import { removeProduct, removeProductGroup } from "../../app/features/dietSlice"
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
				<p className="product-group-description">{productGroup.auxiliaryDescription}</p>
			)}
			{meal.products.map(product => {
				if (product.referringTo !== productGroup._id) return
				return (
					<Product key={product._id} day={day} meal={meal} product={product} />
				)
			})}
		</ProductGroupContainer>
	)
}
