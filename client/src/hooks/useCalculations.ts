import { Day as DayType } from "../types/day"
import { Diet as DietType } from "../types/diet"
import { MealProduct, Meal as MealType } from "../types/meal"
import useReduce from "./useReduce"

type Property = "calories" | "fats" | "carbohydrates" | "proteins" | "fiber"
type Macronutrient = "fats" | "carbohydrates" | "proteins"

export default function useCalculations() {
	const { calculateSum } = useReduce()

	function getMealProductProperty(product: MealProduct, key: Property) {
		type ProductKey = keyof typeof product.product

		if (!product.product[key as ProductKey]) {
			return 0
		}

		const property = product.product[key as ProductKey] || 0

		return +((+property * +product.count * +product.grams) / 100).toFixed(2)
	}

	function getMealProperty(meal: MealType, key: Property) {
		return +calculateSum(
			meal.products.map(product => getMealProductProperty(product, key))
		).toFixed(2)
	}

	function getMealProductGroupProperty(
		key: Property,
		meal: MealType,
		productGroupId: string
	) {
		return +calculateSum(
			meal.products.map(product => {
				if (product.referringTo !== productGroupId) return 0
				return getMealProductProperty(product, key)
			})
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

	function getRecommendedMacronutrientCount(
		diet: DietType,
		macronutrient: Macronutrient
	) {
		type MacronutrientProperty = keyof typeof diet.macronutrientsDivision
		const { caloricGoal, macronutrientsDivision } = diet
		const { carbohydrates, fats, proteins } = macronutrientsDivision
		const caloriesDivisionNumber = macronutrient === "fats" ? 9 : 4
		const propertiesSum = +carbohydrates + +fats + +proteins
		if (propertiesSum !== 100) return Infinity

		const caloriesInMacronutientCounst =
			(+caloricGoal *
				+macronutrientsDivision[macronutrient as MacronutrientProperty]) /
			100

		return +(caloriesInMacronutientCounst / caloriesDivisionNumber).toFixed(2)
	}

	return {
		getMealProductProperty,
		getMealProperty,
		getDayProperty,
		getDietProperty,
		getMealProductGroupProperty,
		getRecommendedMacronutrientCount,
	}
}
