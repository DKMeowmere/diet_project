import mongoose from "mongoose"
import { Diet } from "../types/diet.js"

const mealProductSchema = new mongoose.Schema({
	product: {
		ref: "Product",
		type: mongoose.Schema.Types.ObjectId,
	},
	count: {
		type: Number,
		required: true,
	},
	grams: {
		type: Number,
		required: true,
	},
})

const mealsSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		trim: true,
	},
	products: [mealProductSchema],
})

const daysSchema = new mongoose.Schema({
	day: {
		type: String,
		required: true,
	},
	meals: [mealsSchema],
})

const dietSchema = new mongoose.Schema<Diet>(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			trim: true,
		},
		days: [daysSchema],
	},
	{ timestamps: true }
)

const Diet = mongoose.model<Diet>("Diet", dietSchema)
export default Diet
