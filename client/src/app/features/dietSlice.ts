import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Day } from "../../types/day"
import { Diet } from "../../types/diet"
import { DietState } from "../../types/dietState"
import { Dish as DishType } from "../../types/dish"
import { Meal, MealDish, MealProduct } from "../../types/meal"
import { Product } from "../../types/product"
import { ProductGroup as ProductGroupType } from "../../types/productGroup."
import { WhereToPass } from "../../types/whereToPass"

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
	whereToPass: {
		dayId: "",
		mealId: "",
	},
}

const dietSlice = createSlice({
	name: "diet",
	initialState,
	reducers: {
		clearDiet: state => {
			state.currentDiet = { title: "", description: "", days: [] }
		},

		importDiet: (state, action: PayloadAction<Diet>) => {
			state.currentDiet = action.payload
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
				name: `Posiłek ${state.currentDiet.days[dayIndex].meals.length + 1}`,
				description: "",
				products: [],
				dishes: [],
				productGroups: [],
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
				referringTo?: string
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
				count: "1",
				grams: "0",
				product: action.payload.product,
				referringTo: action.payload.referringTo || undefined,
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
			const value = action.payload.value

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
			const value = action.payload.value

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
			].products.filter(product => product._id !== action.payload.product._id)

			state.currentDiet.days[dayIndex].meals[mealIndex].products = newProducts
		},

		updateWhereToPass: (state, action: PayloadAction<WhereToPass>) => {
			state.whereToPass = action.payload
		},

		addDish: (
			state,
			action: PayloadAction<{
				dish: DishType
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
			state.currentDiet.days[dayIndex].meals[mealIndex].dishes.push({
				_id: crypto.randomUUID(),
				count: "1",
				grams: "0",
				dishDetails: action.payload.dish,
			})
		},

		changeDishGrams: (
			state,
			action: PayloadAction<{
				day: Day
				meal: Meal
				dish: MealDish
				value: string
			}>
		) => {
			const value = action.payload.value

			const dayIndex = state.currentDiet.days.findIndex(
				day => day._id === action.payload.day._id
			)
			const mealIndex = state.currentDiet.days[dayIndex].meals.findIndex(
				meal => meal._id === action.payload.meal._id
			)
			const dishIndex = state.currentDiet.days[dayIndex].meals[
				mealIndex
			].dishes.findIndex(dish => dish._id === action.payload.dish._id)
			state.currentDiet.days[dayIndex].meals[mealIndex].dishes[
				dishIndex
			].grams = value
		},

		changeDishCount: (
			state,
			action: PayloadAction<{
				day: Day
				meal: Meal
				dish: MealDish
				value: string
			}>
		) => {
			const value = action.payload.value

			const dayIndex = state.currentDiet.days.findIndex(
				day => day._id === action.payload.day._id
			)
			const mealIndex = state.currentDiet.days[dayIndex].meals.findIndex(
				meal => meal._id === action.payload.meal._id
			)
			const dishIndex = state.currentDiet.days[dayIndex].meals[
				mealIndex
			].dishes.findIndex(dish => dish._id === action.payload.dish._id)
			state.currentDiet.days[dayIndex].meals[mealIndex].dishes[
				dishIndex
			].count = value
		},

		removeDish: (
			state,
			action: PayloadAction<{
				day: Day
				meal: Meal
				dish: MealDish
			}>
		) => {
			const dayIndex = state.currentDiet.days.findIndex(
				day => day._id === action.payload.day._id
			)

			const mealIndex = state.currentDiet.days[dayIndex].meals.findIndex(
				meal => meal._id === action.payload.meal._id
			)

			const newDishes = state.currentDiet.days[dayIndex].meals[
				mealIndex
			].dishes.filter(dish => dish._id !== action.payload.dish._id)

			state.currentDiet.days[dayIndex].meals[mealIndex].dishes = newDishes
		},

		addProductGroup: (
			state,
			action: PayloadAction<{
				dayId: string
				mealId: string
				productGroup: ProductGroupType
			}>
		) => {
			const dayIndex = state.currentDiet.days.findIndex(
				day => day._id === action.payload.dayId
			)
			const mealIndex = state.currentDiet.days[dayIndex].meals.findIndex(
				meal => meal._id === action.payload.mealId
			)

			state.currentDiet.days[dayIndex].meals[mealIndex].productGroups.push(
				action.payload.productGroup
			)
		},

		removeProductGroup: (
			state,
			action: PayloadAction<{
				dayId: string
				mealId: string
				productGroup: ProductGroupType
			}>
		) => {
			const dayIndex = state.currentDiet.days.findIndex(
				day => day._id === action.payload.dayId
			)
			const mealIndex = state.currentDiet.days[dayIndex].meals.findIndex(
				meal => meal._id === action.payload.mealId
			)

			const productGroups =
				state.currentDiet.days[dayIndex].meals[mealIndex].productGroups
			state.currentDiet.days[dayIndex].meals[mealIndex].productGroups =
				productGroups.filter(
					prevProductGroup =>
						prevProductGroup._id !== action.payload.productGroup._id
				)
		},
	},
})

export default dietSlice.reducer
export const {
	clearDiet,
	importDiet,
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
	updateWhereToPass,
	addDish,
	changeDishGrams,
	changeDishCount,
	removeDish,
	addProductGroup,
	removeProductGroup,
} = dietSlice.actions
