import { Alerts } from "./alert"

export type AppState = {
	token: string | null
	serverUrl: string
	appUrl: string
	alerts: Alerts
	alertLifeTime: number
}
