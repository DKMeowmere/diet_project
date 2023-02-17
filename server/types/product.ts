export type MealType = "BREAKFAST" | "LUNCH" | "DINNER" | "SUPPER"

export type Product = {
	name: string
	mealTypes: MealType[]
	calories: number
	proteins: number
	fats: number
}
