import ProductGroup from "../models/productGroup.js"
import { Request, Response } from "express"
import mongoose from "mongoose"
import Product from "../models/product.js"
import { ProductGroup as ProductGroupType } from "../types/productGroup..js"
import Diet from "../models/diet.js"

async function validateProductGroup(productGroup: ProductGroupType) {
	try {
		const { name, products } = productGroup

		let error = ""

		if (!name) {
			throw new Error("Musisz podać nazwę dla tej grupy produktów")
		}

		if (!products.length) {
			throw new Error(
				"Musisz przypisać co najmniej jeden produkt do tej grupy produktów"
			)
		}

		for (let i = 0; i < products.length; i++) {
			const productId = products[i]
			console.log(productId)

			if (!mongoose.isValidObjectId(productId)) {
				throw new Error("Nie poprawne id dla produktu")
			}

			const isProductExisting = await Product.findById(productId)

			if (!isProductExisting) {
				throw new Error("Produkt nie istnieje")
			}
		}

		if (error) {
			throw new Error(error)
		}

		return ""
	} catch (err: any) {
		return err.message
	}
}

export async function getProductGroups(req: Request, res: Response) {
	try {
		const productGroups = await ProductGroup.find({})
			.populate("products")
			.sort({ createdAt: -1 })
		res.json(productGroups)
	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}

export async function createProductGroup(req: Request, res: Response) {
	try {
		const error = await validateProductGroup(req.body)

		if (error) {
			throw new Error(error)
		}

		const productGroup = await ProductGroup.create(req.body)

		res.status(201).json(productGroup)
	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}

export async function getProductGroup(req: Request, res: Response) {
	try {
		const { id } = req.params

		if (!mongoose.isValidObjectId(id)) {
			throw new Error("Nie poprawne id grupy produktów")
		}

		const productGroup = await ProductGroup.findById(id).populate("products")

		if (!productGroup) {
			throw new Error("Nie znaleziono grupy produktów o podanym id")
		}

		res.json(productGroup)
	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}

export async function updateProductGroup(req: Request, res: Response) {
	try {
		const { id } = req.params

		if (!mongoose.isValidObjectId(id)) {
			throw new Error("Nie poprawne id grupy produktów")
		}

		const error = await validateProductGroup(req.body)

		if (error) {
			throw new Error(error)
		}

		const productGroup = await ProductGroup.findByIdAndUpdate(id, req.body, {
			new: true,
		}).populate("products")

		if (!productGroup) {
			throw new Error("Nie znaleziono grupy produktów o podanym id")
		}

		res.json(productGroup)
	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}

export async function deleteProductGroup(req: Request, res: Response) {
	try {
		const { id } = req.params

		if (!mongoose.isValidObjectId(id)) {
			throw new Error("Nie poprawne id grupy produktów")
		}

		const productGroup = await ProductGroup.findByIdAndDelete(id)

		if (!productGroup) {
			throw new Error("Nie znaleziono grupy produktów o podanym id")
		}

		res.json(productGroup)

		const diets = await Diet.find({})

		diets.forEach(diet => {
			diet.days.forEach(day => {
				day.meals.forEach(meal => {
					meal.productGroups = meal.productGroups.filter(
						productGroupId =>
							productGroupId.toString() !== productGroup._id.toString()
					)
				})
			})
			diet.save()
		})
	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}
