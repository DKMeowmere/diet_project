import { Product } from "./product"

export type MealProduct = {
	product: Product
	count: number
	grams: number
}

export type Meal = MealProduct[]

export type Meals = {
	name: string
	description: string
	products: Meal
}[]
