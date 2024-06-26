import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Alert } from '../../types/alert'
import { AppState } from '../../types/appState'

const initialState: AppState = {
	token: null,
	appUrl: import.meta.env.VITE_CLIENT_URL || 'https://dietproject2000.netlify.app',
	serverUrl: import.meta.env.VITE_SERVER_URL || 'https://diet-project2000.onrender.com',
	// appUrl: import.meta.env.VITE_CLIENT_URL || ' http://localhost:5173',
	// serverUrl: import.meta.env.VITE_SERVER_URL || 'http://localhost:4000',
	alerts: [],
	alertLifeTime: 5000,
	isAppLoading: false,
}

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		addAlert: (state, action: PayloadAction<Alert>) => {
			state.alerts.unshift(action.payload)
		},
		deleteAlert: state => {
			state.alerts.pop()
		},
		startLoading: state => {
			state.isAppLoading = true
		},
		endLoading: state => {
			state.isAppLoading = false
		},
	},
})

export default appSlice.reducer
export const { addAlert, deleteAlert, startLoading, endLoading } = appSlice.actions
