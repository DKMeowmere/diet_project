import { MealProducts } from "./meal.js"

export type Dish = {
	_id: string
	name: string
	products: MealProducts
}

export type Dishes = Dish[]