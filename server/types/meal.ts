import mongoose from "mongoose"

export type MealProduct = {
	product: mongoose.Schema.Types.ObjectId
	count: number
	grams: number
}

export type Meal = MealProduct[]

export type Meals = {
	name: string
	description: string
	products: Meal
}[]
