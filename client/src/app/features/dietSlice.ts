import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Day } from "../../types/day"
import { DietState } from "../../types/dietState"
import { Meal, MealProduct } from "../../types/meal"
import { Product } from "../../types/product"

const initialState: DietState = {
	currentDiet: {
		title: "",
		description: "",
		days: [],
	},
	dayNames: [
		"Poniedziałek",
		"Wtorek",
		"Środa",
		"Czwartek",
		"Piątek",
		"Sobota",
		"Niedziela",
	],
}

const dietSlice = createSlice({
	name: "diet",
	initialState,
	reducers: {
		clearDiet: state => {
			state.currentDiet = { title: "", description: "", days: [] }
		},

		changeTitle: (state, action: PayloadAction<string>) => {
			state.currentDiet.title = action.payload
		},

		changeDescription: (state, action: PayloadAction<string>) => {
			state.currentDiet.description = action.payload
		},

		addDay: state => {
			const days = state.currentDiet.days

			const dayName =
				days.length < state.dayNames.length
					? state.dayNames[days.length]
					: `Dzień ${days.length + 1}`

			const day: Day = {
				_id: crypto.randomUUID(),
				day: dayName,
				meals: [],
			}

			state.currentDiet.days.push(day)
		},

		removeDay: (state, action: PayloadAction<Day>) => {
			const dayId = action.payload._id

			state.currentDiet.days = state.currentDiet.days.filter(
				day => day._id !== dayId
			)
		},

		changeDayName: (
			state,
			action: PayloadAction<{ day: Day; value: string }>
		) => {
			const dayIndex = state.currentDiet.days.findIndex(
				day => day._id === action.payload.day._id
			)
			state.currentDiet.days[dayIndex].day = action.payload.value
		},

		addMeal: (state, action: PayloadAction<{ day: Day }>) => {
			const dayIndex = state.currentDiet.days.findIndex(
				day => day._id === action.payload.day._id
			)
			state.currentDiet.days[dayIndex].meals.push({
				_id: crypto.randomUUID(),
				name: `Posiłek ${
					state.currentDiet.days[dayIndex].meals.length + 1
				}`,
				description: "",
				products: [],
			})
		},

		changeMealName: (
			state,
			action: PayloadAction<{
				day: Day
				meal: Meal
				value: string
			}>
		) => {
			const dayIndex = state.currentDiet.days.findIndex(
				day => day._id === action.payload.day._id
			)
			const mealIndex = state.currentDiet.days[dayIndex].meals.findIndex(
				meal => meal._id === action.payload.meal._id
			)
			state.currentDiet.days[dayIndex].meals[mealIndex].name =
				action.payload.value
		},

		changeMealDescription: (
			state,
			action: PayloadAction<{
				day: Day
				meal: Meal
				value: string
			}>
		) => {
			const dayIndex = state.currentDiet.days.findIndex(
				day => day._id === action.payload.day._id
			)
			const mealIndex = state.currentDiet.days[dayIndex].meals.findIndex(
				meal => meal._id === action.payload.meal._id
			)
			state.currentDiet.days[dayIndex].meals[mealIndex].description =
				action.payload.value
		},

		removeMeal: (
			state,
			action: PayloadAction<{
				day: Day
				meal: Meal
			}>
		) => {
			const dayIndex = state.currentDiet.days.findIndex(
				day => day._id === action.payload.day._id
			)
			const newMeals = state.currentDiet.days[dayIndex].meals.filter(
				meal => meal._id !== action.payload.meal._id
			)
			state.currentDiet.days[dayIndex].meals = newMeals
		},

		addProduct: (
			state,
			action: PayloadAction<{
				product: Product
				dayId: string
				mealId: string
			}>
		) => {
			const dayIndex = state.currentDiet.days.findIndex(
				day => day._id === action.payload.dayId
			)
			const mealIndex = state.currentDiet.days[dayIndex].meals.findIndex(
				meal => meal._id === action.payload.mealId
			)
			state.currentDiet.days[dayIndex].meals[mealIndex].products.push({
				_id: crypto.randomUUID(),
				count: 1,
				grams: 0,
				product: action.payload.product,
			})
		},

		changeProductGrams: (
			state,
			action: PayloadAction<{
				day: Day
				meal: Meal
				product: MealProduct
				value: string
			}>
		) => {
			const value = parseFloat(action.payload.value)

			const dayIndex = state.currentDiet.days.findIndex(
				day => day._id === action.payload.day._id
			)
			const mealIndex = state.currentDiet.days[dayIndex].meals.findIndex(
				meal => meal._id === action.payload.meal._id
			)
			const productIndex = state.currentDiet.days[dayIndex].meals[
				mealIndex
			].products.findIndex(
				product => product._id === action.payload.product._id
			)

			if (isNaN(value)) {
				state.currentDiet.days[dayIndex].meals[mealIndex].products[
					productIndex
				].grams = 0
				return
			}

			state.currentDiet.days[dayIndex].meals[mealIndex].products[
				productIndex
			].grams = value
		},

		changeProductCount: (
			state,
			action: PayloadAction<{
				day: Day
				meal: Meal
				product: MealProduct
				value: string
			}>
		) => {
			const value = parseFloat(action.payload.value)

			const dayIndex = state.currentDiet.days.findIndex(
				day => day._id === action.payload.day._id
			)
			const mealIndex = state.currentDiet.days[dayIndex].meals.findIndex(
				meal => meal._id === action.payload.meal._id
			)
			const productIndex = state.currentDiet.days[dayIndex].meals[
				mealIndex
			].products.findIndex(
				product => product._id === action.payload.product._id
			)

			if (isNaN(value)) {
				state.currentDiet.days[dayIndex].meals[mealIndex].products[
					productIndex
				].count = 0
				return
			}

			state.currentDiet.days[dayIndex].meals[mealIndex].products[
				productIndex
			].count = value
		},

		removeProduct: (
			state,
			action: PayloadAction<{
				day: Day
				meal: Meal
				product: MealProduct
			}>
		) => {
			const dayIndex = state.currentDiet.days.findIndex(
				day => day._id === action.payload.day._id
			)

			const mealIndex = state.currentDiet.days[dayIndex].meals.findIndex(
				meal => meal._id === action.payload.meal._id
			)

			const newProducts = state.currentDiet.days[dayIndex].meals[
				mealIndex
			].products.filter(
				product => product._id !== action.payload.product._id
			)

			state.currentDiet.days[dayIndex].meals[mealIndex].products =
				newProducts
		},
	},
})

export default dietSlice.reducer
export const {
	clearDiet,
	changeTitle,
	changeDescription,
	addDay,
	removeDay,
	changeDayName,
	addMeal,
	changeMealDescription,
	changeMealName,
	removeMeal,
	addProduct,
	changeProductGrams,
	changeProductCount,
	removeProduct,
} = dietSlice.actions
