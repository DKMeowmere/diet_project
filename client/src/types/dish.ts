import { MealProducts } from "./meal.js"

export type Dish = {
	_id: string
	name: string
	grams: number
	count: number
	products: MealProducts
}

export type Dishes = Dish[]