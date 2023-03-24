import { Dish } from "./dish"
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

export type MealDish = {
	_id: string
	dishDetails: Dish
	count: string
	grams: string
}

export type MealDishes = MealDish[]

export type Meal = {
	_id: string
	name: string
	description: string
	products: MealProducts
	dishes: MealDishes
  productGroups: ProductGroups
}

export type Meals = Meal[]
