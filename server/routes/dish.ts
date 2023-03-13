import express from "express"
import {
	createDish,
	deleteDish,
	getDish,
	getDishes,
	updateDish,
} from "../controllers/dish.js"

const router = express.Router()

router.route("/").get(getDishes).post(createDish)
router.route("/:id").get(getDish).patch(updateDish).delete(deleteDish)

export default router
