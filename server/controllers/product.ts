import { Request, Response } from "express"
import mongoose from "mongoose"
import Diet from "../models/diet.js"
import Product from "../models/product.js"
import Dish from "../models/dish.js"
import { MealProduct } from "../types/meal.js"

export async function getProducts(req: Request, res: Response) {
	try {
		const products = await Product.find({}).sort({ createdAt: -1 })
		res.json(products)
	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}

export async function createProduct(req: Request, res: Response) {
	try {
		const { name, proteins, fats, calories } = req.body

		if (!name || !proteins || !fats || !calories) {
			throw new Error(
				"Musisz podać wszystkie wartości potrzebne do stworzenia produktu"
			)
		}

		const product = await Product.create(req.body)

		res.status(201).json(product)
	} catch (err: any) {
		res.status(400).json({ error: err.message })
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

		if (!mongoose.isValidObjectId(id)) {
			throw new Error("Nie poprawne id produktu")
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

		const product = await Product.findByIdAndDelete(id)

		if (!product) {
			throw new Error("Nie znaleziono produktu o podanym id")
		}

		res.status(200).json(product)

		const diets = await Diet.find({})

		diets.forEach(diet => {
			diet.days.forEach(day => {
				day.meals.forEach(meal => {
					meal.products = meal.products.filter(
						mealProduct =>
							mealProduct.product.toString() !== product._id.toString()
					)
				})
			})
			diet.save()
		})

		const dishes = await Dish.find({})

		dishes.forEach(dish => {
			dish.products = dish.products.filter(
				(mealProduct: MealProduct) =>
					mealProduct.product.toString() !== product._id.toString()
			)
			dish.save()
		})
	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}
