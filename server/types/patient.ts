import mongoose from "mongoose"

export type Patient = {
	firstName: string
	lastName: string
	email?: string
	phoneNumber?: string
	weight?: number
	diets: mongoose.Schema.Types.ObjectId
}
