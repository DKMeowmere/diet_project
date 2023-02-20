import express from "express"
import { getDiet, createDiet, deleteDiet, getDiets, updateDiet, generateDietPdf} from "../controllers/diet.js"

const router = express.Router()

router.route("/").get(getDiets).post(createDiet)
router.route("/pdf/:id").get(generateDietPdf)
router.route("/:id").get(getDiet).patch(updateDiet).delete(deleteDiet)

export default router
