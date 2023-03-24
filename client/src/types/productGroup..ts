import { Product } from "./product"

export type ProductGroup = {
	_id: string
	name: string
	description?: string  
  auxiliaryDescription?: string
	products: Product[]
}

export type ProductGroups = ProductGroup[]
