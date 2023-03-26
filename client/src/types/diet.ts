import { Days } from "./day.js"

export type MacronutrientsDivision = {
	proteins: string
	fats: string
	carbohydrates: string
}

export type Diet = {
	_id?: string
	title: string
	description: string
	caloricGoal: string
	macronutrientsDivision: MacronutrientsDivision
	days: Days
}

export type Diets = Diet[]
