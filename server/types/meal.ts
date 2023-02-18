import { Product } from "./product.js"

export function isMealType(keyInput: string): keyInput is MealType {
	const mealTypes: MealType[] = ["BREAKFAST", "LUNCH", "DINNER", "SUPPER"]
	return mealTypes.includes(keyInput as MealType)
}

export type MealType = "BREAKFAST" | "LUNCH" | "DINNER" | "SUPPER"

export type MealProduct = {
	product: Product
	count: number
	grams: number
}

export type Meal = MealProduct[]

export type Meals = {
	breakfast: Meal
	lunch: Meal
	dinner: Meal
	supper: Meal
}
