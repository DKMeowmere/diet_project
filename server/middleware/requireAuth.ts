import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import CustomRequest from "../types/customRequest.js"

export async function requireAuth(
	req: CustomRequest,
	res: Response,
	next: NextFunction
) {
	try {
		const { authorization } = req.headers

		if (!authorization) {
			return res
				.status(401)
				.json({ error: "Musisz być zalogowany, żeby to zrobić" })
		}

		const token = authorization.split(" ")[1]
		req.token = token

		if (!process.env.TOKEN_SECRET) {
			res.status(500).json({ error: "Błąd serwera - brak klucza jwt" })
			return
		}

		jwt.verify(token, process.env.TOKEN_SECRET)
		next()
	} catch (err: any) {
		res.status(401).json({ error: err.message })
	}
}
