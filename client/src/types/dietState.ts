import { Diet } from "./diet"
import { WhereToPass } from "./whereToPass"

export type DietState = {
	currentDiet: Diet
	dayNames: string[]
	whereToPass: WhereToPass
}
