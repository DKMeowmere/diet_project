import mongoose from "mongoose"

export type ProductGroup = {
	name: string
	products: mongoose.Schema.Types.ObjectId[]
}

export type ProductGroups = ProductGroup[]
