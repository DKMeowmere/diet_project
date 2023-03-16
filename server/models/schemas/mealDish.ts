import mongoose from "mongoose";

const mealDishSchema = new mongoose.Schema({
	dishDetails: {
		ref: "Dish",
		type: mongoose.Schema.Types.ObjectId,
	},
	count: {
		type: Number,
		required: true,
	},
	grams: {
		type: Number,
		required: true,
	},
})

export default mealDishSchema