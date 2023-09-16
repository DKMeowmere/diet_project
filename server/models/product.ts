import mongoose from "mongoose"
import { Product } from "../types/product.js"

const productSchema = new mongoose.Schema<Product>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
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
		fiber: {
			type: Number,
			default: 0,
		},
		carbohydrates: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
)

const Product = mongoose.model<Product>("Product", productSchema)
export default Product
