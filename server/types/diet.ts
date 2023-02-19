import { Meals } from "./meal.js"

export type Diet = {
	name: string
	description: string
	days: {
		day: string
		meals: Meals
	}[]
}
