import mongoose from "mongoose"
import { Diet } from "../types/diet"

const meal = [
	{
		product: {
			name: {
				type: String,
				required: true,
			},
			mealTypes: {
				type: [String],
				default: [],
			},
			calories: {
				type: Number,
				required: true,
			},
			proteins: {
				type: Number,
				required: true,
			},
			fats: {
				type: Number,
				required: true,
			},
		},
		count: {
			type: Number,
			required: true,
		},
		grams: {
			type: Number,
			required: true,
		},
	},
]

const dietSchema = new mongoose.Schema<Diet>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		days: [
			{
				day: {
					type: String,
					required: true,
				},
				meals: {
					breakfast: meal,
					lunch: meal,
					dinner: meal,
					supper: meal,
				},
			},
		],
	},
	{ timestamps: true }
)

const Diet = mongoose.model<Diet>("Diet", dietSchema)
