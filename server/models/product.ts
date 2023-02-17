import mongoose from "mongoose"
import { Product } from "../types/product"

const productSchema = new mongoose.Schema<Product>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
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
	{ timestamps: true }
)

const Product = mongoose.model<Product>("Product", productSchema)
