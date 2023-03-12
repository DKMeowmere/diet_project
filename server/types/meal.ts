import mongoose from "mongoose"

export type MealProduct = {
	product: mongoose.Schema.Types.ObjectId
	count: number
	grams: number
}

export type MealProducts = MealProduct[]

export type MealDish = {
  dishDetails: mongoose.Schema.Types.ObjectId
	count: number
	grams: number
}

export type MealDishes = MealDish[]

export type Meals = {
	name: string
	description: string
	products: MealProducts
  dishes: MealDishes
}[]
