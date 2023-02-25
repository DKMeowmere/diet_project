import { configureStore } from "@reduxjs/toolkit"
import appSlice from "./features/appSlice.js"
import dietSlice from "./features/dietSlice.js"

export const store = configureStore({
	reducer: {
		app: appSlice,
		diet: dietSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
