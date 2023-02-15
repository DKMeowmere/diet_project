import express from "express"
import { config } from "dotenv"

const app = express() 
config()

app.listen(process.env.PORT || 4000)
console.log("XD")