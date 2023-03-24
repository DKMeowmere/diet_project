import mongoose from "mongoose"

export type ProductGroup = {
	name: string
  description?: string
  auxiliaryDescription?: string
	products: mongoose.Schema.Types.ObjectId[]
}

export type ProductGroups = ProductGroup[]
