import { Meals } from "./meal.js"

export type Diet = {
	title: string
	description: string
	caloricGoal: number
	macronutrientsDivision: {
		proteins: number
		fats: number
		carbohydrates: number
	}
	days: {
		day: string
		meals: Meals
	}[]
}
