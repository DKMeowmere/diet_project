import { Request, Response } from "express"
import mongoose from "mongoose"
import Patient from "../models/patient.js"

export async function getPatients(req: Request, res: Response) {
	try {
		const patients = await Patient.find({})
			.populate("diets")
			.sort({ createdAt: -1 })
		res.json(patients)
	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}

export async function createPatient(req: Request, res: Response) {
	try {
		const { firstName, lastName } = req.body

		if (!firstName || !lastName) {
			throw new Error(
				"Musisz podać co najmniej imie i nazwisko by stworzyc pacjenta"
			)
		}

		const patient = await Patient.create(req.body)

		res.status(201).json(patient)
	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}

export async function getPatient(req: Request, res: Response) {
	try {
		const { id } = req.params

		if (!mongoose.isValidObjectId(id)) {
			throw new Error("Nie poprawne id produktu")
		}

		const patient = await Patient.findById(id).populate("diets")

		if (!patient) {
			throw new Error("Nie znaleziono")
		}

		res.json(patient)
	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}

export async function updatePatient(req: Request, res: Response) {
	try {
		const { id } = req.params

		if (!mongoose.isValidObjectId(id)) {
			throw new Error("Nie poprawne id produktu")
		}

		const patient = await Patient.findByIdAndUpdate(id, req.body, {
			new: true,
		})

		if (!patient) {
			throw new Error("Nie znaleziono")
		}

		res.json(patient)
	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}

export async function deletePatient(req: Request, res: Response) {
	try {
		const { id } = req.params

		if (!mongoose.isValidObjectId(id)) {
			throw new Error("Nie poprawne id produktu")
		}

		const patient = await Patient.findByIdAndDelete(id)

		if (!patient) {
			throw new Error("Nie znaleziono produktu o podanym id")
		}

		res.status(200).json(patient)
	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}
