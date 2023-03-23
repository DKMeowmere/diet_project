import mongoose from "mongoose";

const mealProductSchema = new mongoose.Schema({
	product: {
		ref: "Product",
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
  referringTo:{
    type: String
  }

})

export default mealProductSchema