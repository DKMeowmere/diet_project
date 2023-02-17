import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Alert } from "../../types/alert"
import { AppState } from "../../types/appState"

const initialState: AppState = {
	token: null,
	serverUrl: import.meta.env.VITE_SERVER_URL || "http://localhost:4000",
	appUrl: import.meta.env.VITE_CLIENT_URL || "http://localhost:5173",
	alerts: [],
	alertLifeTime: 5000,
}

const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		addAlert: (state, action: PayloadAction<Alert>) => {
			state.alerts.push(action.payload)
		},
		deleteAlert: state => {
			state.alerts.shift()
		},
	},
})

export default appSlice.reducer
export const { addAlert, deleteAlert } = appSlice.actions
