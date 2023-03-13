import { Request, Response } from "express"
import mongoose from "mongoose"
import Dish from "../models/dish.js"
import Product from "../models/product.js"
import { MealProduct } from "../types/meal.js"

async function validateDish(dish: Dish): Promise<string> {
	try {
		const { name, products } = dish

		if (!name) {
			throw new Error("Musisz podać nazwe potrawy")
		}

		if (!products?.length) {
			throw new Error("Musisz przypisać co najmniej jeden produkt do potrawy")
		}

		let error = ""

		//validate each product
		for (let i = 0; i < products.length; i++) {
			try {
				const product: MealProduct = products[i]

				if (!product.count || !product.grams) {
					throw new Error("Musisz podać ilość i wage do produktu")
				}

				if (!product.product || !mongoose.isValidObjectId(product.product)) {
					throw new Error("Podałeś nie poprawne id produktu")
				}

				const productDetails: Product | null = await Product.findById(
					product.product
				)

				if (!productDetails) {
					throw new Error(
						"Nie znaleziono produktu który próbujesz przypisać do potrawy"
					)
				}
			} catch (err: any) {
				error = err.message
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

export async function getDishes(req: Request, res: Response) {
	try {
		const dishes = await Dish.find({})
			.sort({ createdAt: -1 })
			.populate("products.product")
		res.json(dishes)
	} catch (err: any) {
		res.status(400).json(err.message)
	}
}

export async function createDish(req: Request, res: Response) {
	try {
		const error = await validateDish(req.body)

		if (error) {
			throw new Error(error)
		}

		const dish = await Dish.create(req.body)

		res.status(201).json(dish)
	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}

export async function getDish(req: Request, res: Response) {
	try {
		const { id } = req.params

		if (!mongoose.isValidObjectId(id)) {
			throw new Error("Podałeś nie poprawne id")
		}

		const dish = await Dish.findById(id)

		if (!dish) {
			throw new Error("Nie znaleziono potrawy o podanym id")
		}

		res.json(dish)
	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}

export async function updateDish(req: Request, res: Response) {
	try {
		const error = await validateDish(req.body)
		const { id } = req.params

		if (!mongoose.isValidObjectId(id)) {
			throw new Error("Podałeś nie poprawne id")
		}

		if (error) {
			throw new Error(error)
		}

		const dish = await Dish.findByIdAndUpdate(id, req.body, { new: true })

    if(!dish){
      throw new Error("Nie znaleziono potrawy o podanym id")
    }

		res.status(200).json(dish)
	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}

export async function deleteDish(req: Request, res: Response) {
	try {
		const { id } = req.params

		if (!mongoose.isValidObjectId(id)) {
			throw new Error("Podałeś nie poprawne id")
		}

		const dish = await Dish.findByIdAndDelete(id)

    if(!dish){
      throw new Error("Nie znaleziono potrawy o podanym id")
    }

		res.status(200).json(dish)
	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}
