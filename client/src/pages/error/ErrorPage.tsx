import { useCookies } from "react-cookie"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../app/hooks"
import { addAlert } from "../../app/features/appSlice"

export default function ErrorPage() {
	const [, , removeCookie] = useCookies()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	useEffect(() => {
		removeCookie("token")
		localStorage.setItem("diet", "null")
		localStorage.setItem("product", "null")
		localStorage.setItem("product-group", "null")
		dispatch(
			addAlert({
				body: "Krytyczny błąd - nastapiło wylogowanie",
				type: "ERROR",
			})
		)
		navigate("/")
	}, [])

	return null
}
