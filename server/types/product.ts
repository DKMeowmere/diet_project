import { MealType } from "./meal.js"

export type Product = {
	name: string
	mealTypes: MealType[]
	calories: number
	proteins: number
	carbohydrates:number
	fats: number
}
