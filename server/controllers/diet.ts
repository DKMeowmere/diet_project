import { Request, Response } from "express"
import mongoose from "mongoose"
import Diet from "../models/diet.js"
import generateDietHTML from "../utils/generateDietHTML.js"
import pdf from "html-pdf"

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
		const { title, description, days } = req.body

		if (!title || !description || !days) {
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

export async function generateDietPdf(req: Request, res: Response) {
	try {
		const { id } = req.params

		if (!mongoose.isValidObjectId(id)) {
			throw new Error("Nie poprawne id diety")
		}

		const diet = await Diet.findById(id).populate(
			"days.meals.products.product"
		)

		if (!diet) {
			throw new Error("Podałeś złe id diety")
		}

		const html = generateDietHTML(diet)

		res.setHeader("Content-Type", "application/pdf")
		res.setHeader(
			"Content-Disposition",
			`attachment; filename=${diet.title}.pdf`
		)

		pdf.create(html, {}).toStream((err, pdfStream) => {
			if (err) {
				res.status(500).json({
					error: "Błąd podczas generowanie pdf",
				})
				return
			}
			res.statusCode = 200
			pdfStream.on("end", () => {
				return res.end()
			})

			pdfStream.pipe(res)
		})

	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}
