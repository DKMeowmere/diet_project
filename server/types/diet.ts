import { Meals } from "./meal"

export type Diet = {
	name: string
	days: [
		{
			day: "Poniedziałek"
			meals: Meals
		},
		{
			day: "Wtorek"
			meals: Meals
		},
		{
			day: "Środa"
			meals: Meals
		},
		{
			day: "Czwartek"
			meals: Meals
		},
		{
			day: "Piątek"
			meals: Meals
		},
		{
			day: "Sobota"
			meals: Meals
		},
		{
			day: "Niedziela"
			meals: Meals
		}
	]
}
