import { Day as DayType } from "../types/day"
import { Diet as DietType } from "../types/diet"
import { Dish as DishType } from "../types/dish"
import {
	MealDish,
	MealDishes,
	MealProduct,
	MealProducts,
	Meal as MealType,
} from "../types/meal"
import useReduce from "./useReduce"

type Property = "calories" | "fats" | "carbohydrates" | "proteins"

export default function useCalculations() {
	const { calculateSum } = useReduce()

	function getMealProductProperty(product: MealProduct, key: Property) {
		type ProductKey = keyof typeof product.product
		return +(
			(+product.product[key as ProductKey] * +product.count * +product.grams) /
			100
		).toFixed(2)
	}

	function getMealProductsProperty(products: MealProducts, key: Property) {
		return +calculateSum(
			products.map(product => getMealProductProperty(product, key))
		).toFixed(2)
	}

	function getMealProductPropertyInDish(
		dish: MealDish,
		product: MealProduct,
		key: Property
	) {
		return +(
			(+dish.grams / getDefaultDishWeight(dish.dishDetails)) *
			getMealProductProperty(product, key)
		).toFixed(2)
	}

	function getDishProductsPropertySum(dish: DishType, key: Property) {
		return +calculateSum(
			dish.products.map(product => {
				type ProductProperty = keyof typeof product.product
				return (
					(+product.product[key as ProductProperty] *
						+product.grams *
						+product.count) /
					100
				)
			})
		).toFixed(2)
	}

	function getDefaultDishWeight(dish: DishType) {
		return +calculateSum(
			dish.products.map(product => {
				return +product.grams * +product.count
			})
		).toFixed(2)
	}

	function getDishProperty(dish: MealDish, key: Property) {
		return +(
			(+dish.grams / getDefaultDishWeight(dish.dishDetails)) *
			+dish.count *
			getDishProductsPropertySum(dish.dishDetails, key)
		).toFixed(2)
	}

	function getDishesProperty(dishes: MealDishes, key: Property) {
		return +calculateSum(
			dishes.map(dish => getDishProperty(dish, key))
		).toFixed(2)
	}

	function getMealProperty(meal: MealType, key: Property) {
		return +(
			getMealProductsProperty(meal.products, key) +
			getDishesProperty(meal.dishes, key)
		).toFixed(2)
	}

	function getDayProperty(day: DayType, key: Property) {
		return +calculateSum(
			day.meals.map(meal => getMealProperty(meal, key))
		).toFixed(2)
	}

	function getDietProperty(diet: DietType, key: Property) {
		return +calculateSum(
			diet.days.map(day => getDayProperty(day, key))
		).toFixed(2)
	}

	return {
		getDishProductsPropertySum,
		getMealProductProperty,
		getMealProductsProperty,
		getDefaultDishWeight,
		getDishProperty,
		getMealProperty,
		getDishesProperty,
		getMealProductPropertyInDish,
		getDayProperty,
		getDietProperty,
	}
}
