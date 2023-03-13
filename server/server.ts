import express from "express"
import { config as configDotEnv } from "dotenv"
import mongoose from "mongoose"
import morgan from "morgan"
import cors, { CorsOptions } from "cors"
import dietRouter from "./routes/diet.js"
import productRouter from "./routes/product.js"
import patientRouter from "./routes/patient.js"
import dishRouter from "./routes/dish.js"
import authRouter from "./routes/auth.js"
import { requireAuth } from "./middleware/requireAuth.js"

configDotEnv()

const app = express()
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI
const CLIENT_APP_URL = process.env.CLIENT_APP_URL
const corsOptions: CorsOptions = {
	origin: [CLIENT_APP_URL || "http://localhost:5173"],
	methods: ["GET", "POST", "PATCH", "DELETE"],
	allowedHeaders: ["Content-Type", "Authorization"],
}

async function start() {
	try {
		if (!MONGO_URI) {
			throw new Error("no mongo uri")
		}

		mongoose.set("strictQuery", false)
		await mongoose.connect(MONGO_URI)
		console.log("connected to db")
		app.listen(PORT || 4000)
		console.log(`Listening on port: ${PORT}`)
	} catch (err: any) {
		console.log(err)
	}
}
start()

app.use(cors(corsOptions))
app.use(morgan("dev"))
app.use(express.json())

app.use("/api/auth", authRouter)
app.use("/reload", (req, res) => res.json({ message: "Przedłużono sesje" }))
app.use(requireAuth)
app.use("/api/diet", dietRouter)
app.use("/api/product", productRouter)
app.use("/api/dish", dishRouter)
app.use("/api/patient", patientRouter)

app.use((req, res) => {
	res.status(404).json({ error: "not found" })
})
