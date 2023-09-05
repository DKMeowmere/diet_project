import mongoose from "mongoose"
import { ProductGroup } from "../types/productGroup..js"

const productGroupSchema = new mongoose.Schema<ProductGroup>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			trim: true,
			default: "",
		},
		auxiliaryDescription: {
			type: String,
			trim: true,
			default: "",
		},
		category: {
			type: String,
			trim: true,
			default: "",
		},
		products: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
			},
		],
	},
	{ timestamps: true }
)

const ProductGroup = mongoose.model<ProductGroup>(
	"ProductGroup",
	productGroupSchema
)
export default ProductGroup
