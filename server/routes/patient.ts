import express from "express"
import {
	getPatients,
	createPatient,
	getPatient,
	updatePatient,
	deletePatient,
} from "../controllers/patient.js"

const router = express.Router()

router.route("/").get(getPatients).post(createPatient)
router.route("/:id").get(getPatient).patch(updatePatient).delete(deletePatient)

export default router
