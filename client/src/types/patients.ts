import { Diet } from "./diet"

export type Patient = {
  _id:string
	firstName: string
	lastName: string
	email?: string
	phoneNumber?: string
	weight?: number
	diets: Diet[]
}

export type Patients = Patient[]