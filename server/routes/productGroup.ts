import express from "express"
import {
	getProductGroups,
	createProductGroup,
	getProductGroup,
	updateProductGroup,
	deleteProductGroup,
} from "../controllers/productGroup.js"

const router = express.Router()

router.route("/").get(getProductGroups).post(createProductGroup)
router.route("/:id").get(getProductGroup).patch(updateProductGroup)
.delete(deleteProductGroup)

export default router
