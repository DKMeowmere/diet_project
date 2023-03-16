import mongoose from "mongoose"
import { Dish } from "../types/dish.js"

export const dishSchema = new mongoose.Schema<Dish>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		products: [
			{
				count: {
					type: Number,
					required: true,
				},
				grams: {
					type: Number,
					required: true,
				},
				product: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: "Product",
				},
			},
		],
	},
	{ timestamps: true }
)

const Dish = mongoose.model<Dish>("Dish", dishSchema)
export default Dish
