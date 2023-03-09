import { Product } from "./product"

export type MealProduct = {
	_id: string
	product: Product
	count: string
	grams: string
}

export type MealProducts = MealProduct[]

export type Meal = {
	_id: string
	name: string
	description: string
	products: MealProducts
}

export type Meals = Meal[]
