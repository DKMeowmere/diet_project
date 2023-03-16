import { Dish } from "./dish"
import { Product } from "./product"

export type MealProduct = {
	_id: string
	product: Product
	count: string
	grams: string
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
}

export type Meals = Meal[]
