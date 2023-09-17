import mongoose from "mongoose"
import { ProductGroups } from "./productGroup..js"

export type MealProduct = {
	product: mongoose.Schema.Types.ObjectId
	count: number
	grams: number
	referringTo?: mongoose.Schema.Types.ObjectId
}

export type MealProducts = MealProduct[]

export type Meals = {
	name: string
	description: string
	products: MealProducts
	productGroups: ProductGroups
}[]
