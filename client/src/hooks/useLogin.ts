import { useCookies } from "react-cookie"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { useNavigate } from "react-router-dom"
import { addAlert, endLoading, startLoading } from "../app/features/appSlice"

export const useLogin = () => {
	const [, setCookie] = useCookies()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const serverUrl = useAppSelector(state => state.app.serverUrl)

	async function login(password: string) {
		dispatch(startLoading())

		const res = await fetch(`${serverUrl}/api/auth/login`, {
			method: "POST",
			body: JSON.stringify({ password }),
			headers: { "Content-Type": "application/json" },
		})
		const data = await res.json()

		dispatch(endLoading())
    if (!res.ok) {
			dispatch(addAlert({ body: data.error, type: "ERROR" }))
			return
		}

		setCookie("token", data.token)
		navigate("/")
	}

	return { login }
}
