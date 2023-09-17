import { Component, ErrorInfo, PropsWithChildren } from "react"
import ErrorPage from "./ErrorPage"
import Alerts from "../../components/alert/Index"

type State = {
	hasError: boolean
}

class ErrorBoundary extends Component<PropsWithChildren, State> {
	state: State = { hasError: false }

	public static getDerivedStateFromError(): State {
		return { hasError: true }
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error("Uncaught error:", error, errorInfo)
	}
	public render() {
		if (this.state.hasError) {
			return (
				<>
					<Alerts />
					<ErrorPage />
				</>
			)
		}

		return this.props.children
	}
}

export default ErrorBoundary
