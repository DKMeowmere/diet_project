import { Diet } from "./diet"

export type Patient = {
  _id:string
	firstName: string
	lastName: string
	email?: string
	phoneNumber?: string
	weight?: string
	diets: Diet[]
}

export type Patients = Patient[]