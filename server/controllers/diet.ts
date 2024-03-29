import { Request, Response } from "express"
import mongoose from "mongoose"
import Diet from "../models/diet.js"
import puppeteer from "puppeteer"
import CustomRequest from "../types/customRequest.js"
import Patient from "../models/patient.js"

function setPdfDietTitle(title: string) {
	title = title.split(" ").join("-")

	if (title.split("").some(char => char.charCodeAt(0) > 128)) {
		return "Dieta"
	}

	return title
}

export async function getDiets(req: Request, res: Response) {
	try {
		const diet = await Diet.find({})
			.populate("days.meals.products.product")
			.populate({
				path: "days.meals.productGroups",
				populate: { path: "products" },
			})
			.sort({ createdAt: -1 })

		res.json(diet)
	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}

export async function createDiet(req: Request, res: Response) {
	try {
		const { title, days, caloricGoal, macronutrientsDivision } = req.body
		const { carbohydrates, fats, proteins } = macronutrientsDivision

		if (!title || !days || !caloricGoal) {
			throw new Error(
				"Musisz podać wszystkie wartości potrzebne do stworzenia diety"
			)
		}

		if (carbohydrates + fats + proteins !== 100) {
			throw new Error("Proporcje makroskładników nie są równe 100")
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
			throw new Error("Nie poprawne id diety")
		}

		const diet = await Diet.findById(id)
			.populate("days.meals.products.product")
			.populate({
				path: "days.meals.productGroups",
				populate: { path: "products" },
			})

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
		const { title, days, caloricGoal, macronutrientsDivision } = req.body
		const { carbohydrates, fats, proteins } = macronutrientsDivision

		if (!title || !days || !caloricGoal) {
			throw new Error(
				"Musisz podać wszystkie wartości potrzebne do stworzenia diety"
			)
		}

		if (carbohydrates + fats + proteins !== 100) {
			throw new Error("Proporcje makroskładników nie są równe 100")
		}

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

		res.status(200).json(diet)

		const patients = await Patient.find({})
		patients.forEach(patient => {
			patient.diets = patient.diets.filter(
				dietId => dietId.toString() !== diet._id.toString()
			)
			patient.save()
		})
	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}

export async function generateDietPdf(req: CustomRequest, res: Response) {
	try {
		const { id } = req.params
		const { day } = req.query
		const url = `${process.env.CLIENT_APP_URL}/diet/${id}/pdf${
			day ? `?day=${day}` : ""
		}`

		if (!req.token) {
			throw new Error("Brak tokena")
		}

		if (!mongoose.isValidObjectId(id)) {
			throw new Error("Nie poprawne id diety")
		}

		const diet = await Diet.findById(id).populate("days.meals.products.product")

		const browser = await puppeteer.launch()
		const page = await browser.newPage()
		await page.goto(url)

		await page.emulateMediaType("screen")

		await page.setCookie({ name: "token", value: req.token })

		await page.goto(url, { waitUntil: "networkidle0" })
		const pdf = await page.pdf({
			preferCSSPageSize: true,
			printBackground: true,
			format: "A4",
		})

		res.setHeader("Content-Type", "application/pdf")
		res.setHeader(
			"Content-Disposition",
			`attachment; filename=${setPdfDietTitle(diet?.title || "Dieta")}.pdf`
		)
		res.send(pdf)
		await browser.close()
	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}
