import { Request, Response } from "express"
import jwt from "jsonwebtoken"

function createToken() {
	if (!process.env.TOKEN_SECRET) {
		console.log("NO SECRET TOKEN KEY")
		return
	}

	const token = jwt.sign({}, process.env.TOKEN_SECRET, {
		expiresIn: "7d",
	})
	return token
}

export async function login(req: Request, res: Response) {
	try {
		const { password } = req.body
		const appPassword = process.env.APP_PASSWORD

		if (!appPassword) {
			res.status(500).json({
				error: "błąd serwera - brak hasła na serwerze",
			})
			return
		}

		if (!password) {
			throw new Error("Nie podałeś hasła")
		}

		if (password !== appPassword) {
			throw new Error("Nie poprawne hasło")
		}

		const token = createToken()
		if (!token) {
			res.status(500).json({ error: "błąd serwera - tworzenie tokena" })
			return
		}

		res.json({ token })
	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}
