import { useCookies } from "react-cookie"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { addAlert, endLoading, startLoading } from "../app/features/appSlice"

export const useLogin = () => {
	const [, setCookie] = useCookies()
	const dispatch = useAppDispatch()
	const serverUrl = useAppSelector(state => state.app.serverUrl)

	async function login(password: string) {
		dispatch(startLoading())

		const res = await fetch(`${serverUrl}/api/auth/login`, {
			method: "POST",
			body: JSON.stringify({ password }),
			headers: { "Content-Type": "application/json" },
		})
		dispatch(endLoading())
		const data = await res.json()

		if (!res.ok) {
			dispatch(addAlert({ body: data.error, type: "ERROR" }))
			return
		}

		//month (28 days) in seconds
		const month = 60 * 60 * 24 * 28

		setCookie("token", data.token, {
			maxAge: month,
			sameSite: "lax",
			path: "/",
		})
	}

	return { login }
}
