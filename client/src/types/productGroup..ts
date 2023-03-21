import { Products } from "./product"

export type ProductGroup = {
	_id: string
	name: string
	products: Products[]
}

export type ProductGroups = ProductGroup[]
