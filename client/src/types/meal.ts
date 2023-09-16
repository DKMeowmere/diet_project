import { Product } from "./product"
import { ProductGroups } from "./productGroup."

export type MealProduct = {
	_id: string
	product: Product
	count: string
	grams: string
	referringTo?: string
}

export type MealProducts = MealProduct[]

export type Meal = {
	_id: string
	name: string
	description: string
	products: MealProducts
  productGroups: ProductGroups
}

export type Meals = Meal[]
