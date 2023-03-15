import { Diet } from "./diet"
import { WhereToPassProduct } from "./whereToPassProduct"

export type DietState = {
	currentDiet: Diet
	dayNames: string[]
  whereToPassProduct:WhereToPassProduct
}
