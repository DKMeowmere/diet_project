import { Meals } from "./meal.js"

export type Diet = {
	title: string
	description: string
	days: {
		day: string
		meals: Meals
	}[]
}
