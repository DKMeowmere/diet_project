import mongoose from "mongoose"
import { Patient } from "../types/patient.js"

const patientSchema = new mongoose.Schema<Patient>(
	{
		firstName: {
			type: String,
			required: true,
			trim: true,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			trim: true,
		},
		phoneNumber: {
			type: String,
			trim: true,
		},
		diets: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Diet",
		}],
	},
	{ timestamps: true }
)

const Patient = mongoose.model<Patient>("Patient", patientSchema)
export default Patient
