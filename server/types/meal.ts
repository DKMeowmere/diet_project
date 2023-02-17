import { Product } from "./product"

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
