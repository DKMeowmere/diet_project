import { Request, Response } from "express"
import mongoose from "mongoose"
import Product from "../models/product.js"
import { isMealType } from "../types/meal.js"

export async function getProducts(req: Request, res: Response) {
	try {
		const products = await Product.find({}).sort({ createdAt: -1 })
		res.json(products)
	} catch (err: any) {
		res.status(400).json(err.message)
	}
}

export async function createProduct(req: Request, res: Response) {
	try {
		const { name, mealTypes, proteins, fats, calories } = req.body

		if (!name || !proteins || !fats || !calories) {
			throw new Error(
				"Musisz podać wszystkie wartości potrzebne do stworzenia produktu"
			)
		}

		const product = await Product.create(req.body)

		res.status(201).json(product)
	} catch (err: any) {
		res.status(400).json(err.message)
	}
}

export async function getProduct(req: Request, res: Response) {
	try {
		const { id } = req.params

		if (!mongoose.isValidObjectId(id)) {
			throw new Error("Nie poprawne id produktu")
		}

		const product = await Product.findById(id)

		if (!product) {
			throw new Error("Nie znaleziono")
		}

		res.json(product)
	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}

export async function updateProduct(req: Request, res: Response) {
	try {
		const { id } = req.params
		const { mealTypes } = req.body

		if (!mongoose.isValidObjectId(id)) {
			throw new Error("Nie poprawne id produktu")
		}

		if (mealTypes) {
			mealTypes.forEach((mealType: string) => {
				if (!isMealType(mealType)) {
					throw new Error(
						`Zły typ posiłku - ${mealType}, możliwe typy to: BREAKFAST, LUNCH, DINNER, SUPPER`
					)
				}
			})
		}

		const product = await Product.findByIdAndUpdate(id, req.body, {
			new: true,
		})

		if (!product) {
			throw new Error("Nie znaleziono")
		}

		res.json(product)
	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}

export async function deleteProduct(req: Request, res: Response) {
	try {
		const { id } = req.params

		if (!mongoose.isValidObjectId(id)) {
			throw new Error("Nie poprawne id produktu")
		}

		const product = await Product.findById(id)

		if (!product) {
			throw new Error("Nie znaleziono produktu o podanym id")
		}

		res.status(204).json(product)
	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}
