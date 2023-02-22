import { Meals } from "./meal.js"

export type Diet = {
	_id: string
	title: string
	description: string
	days: {
		day: string
		meals: Meals
	}[]
}
