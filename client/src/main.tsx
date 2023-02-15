import React from "react"
import { CookiesProvider } from "react-cookie"
import ReactDOM from "react-dom/client"
import { ThemeProvider } from "styled-components"
import { Provider as ReduxProvider } from "react-redux"
import App from "./App.js"
import theme from "./app/theme.js"
import "./globals.css"
import { store } from "./app/store.js"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ReduxProvider store={store}>
			<ThemeProvider theme={theme}>
				<CookiesProvider>
					<App />
				</CookiesProvider>
			</ThemeProvider>
		</ReduxProvider>
	</React.StrictMode>
)
