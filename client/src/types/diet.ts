import { Days } from "./day.js"

export type Diet = {
	_id?: string
	title: string
	description: string
	days: Days
}

export type Diets = Diet[]