import { Product } from "./product"

export type MealProduct = {
	_id: string
	product: Product
	count: number
	grams: number
}

export type MealProducts = MealProduct[]

export type Meal = {
	_id: string
	name: string
	description: string
	products: MealProducts
}

export type Meals = Meal[]
