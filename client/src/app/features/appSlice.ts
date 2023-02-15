import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppState } from "../../types/appState"

const initialState: AppState = {
	token: null,
	serverUrl: import.meta.env.VITE_SERVER_URL || "http://localhost:4000",
	appUrl: import.meta.env.VITE_CLIENT_URL || "http://localhost:5173",
}

const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
	},
})

export default appSlice.reducer
// export const {  } = appSlice.actions