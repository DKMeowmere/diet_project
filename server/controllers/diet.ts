import { Request, Response } from "express"
import mongoose from "mongoose"
import Diet from "../models/diet.js"

export async function getDiets(req: Request, res: Response) {
	try {
		const diet = await Diet.find({})
			.populate("days.meals.products.product")
			.sort({ createdAt: -1 })

		res.json(diet)
	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}

export async function createDiet(req: Request, res: Response) {
	try {
		const { name, description, days } = req.body

		if (!name || !description || !days) {
			throw new Error(
				"Musisz podać wszystkie wartości potrzebne do stworzenia produktu"
			)
		}

		const diet = await Diet.create(req.body)

		res.status(201).json(diet)
	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}

export async function getDiet(req: Request, res: Response) {
	try {
		const { id } = req.params

		if (!mongoose.isValidObjectId(id)) {
			throw new Error("Nie poprawne id produktu")
		}

		const diet = await Diet.findById(id).populate(
			"days.meals.products.product"
		)

		if (!diet) {
			throw new Error("Nie znaleziono diety o podanym id")
		}

		res.json(diet)
	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}

export async function updateDiet(req: Request, res: Response) {
	try {
		const { id } = req.params

		if (!mongoose.isValidObjectId(id)) {
			throw new Error("Nie poprawne id diety")
		}

		const diet = await Diet.findByIdAndUpdate(id, req.body, {
			new: true,
		})

		if (!diet) {
			throw new Error("Nie znaleziono")
		}

		res.json(diet)
	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}

export async function deleteDiet(req: Request, res: Response) {
	try {
		const { id } = req.params

		if (!mongoose.isValidObjectId(id)) {
			throw new Error("Nie poprawne id diety")
		}

		const diet = await Diet.findByIdAndDelete(id)

		if (!diet) {
			throw new Error("Nie znaleziono diety o podanym id")
		}

		res.status(204).json(diet)
	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}
