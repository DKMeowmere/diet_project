import { useCookies } from "react-cookie"
import { useAppDispatch } from "../app/hooks"
import { addAlert } from "../app/features/appSlice"
import jwtDecode, { JwtPayload } from "jwt-decode"

export default function useTokenValidation() {
	const [cookies] = useCookies()
	const dispatch = useAppDispatch()
	const token = cookies.token

	function isTokenValid() {
		if (!token) {
			return false
		}
		const decodedToken = jwtDecode<JwtPayload>(token)
		if (!decodedToken.exp) {
			return false
		}
		if (decodedToken.exp * 1000 < Date.now()) {
			dispatch(
				addAlert({
					body: "Sesja wygasła, zaloguj się ponownie",
					type: "INFO",
				})
			)
			return false
		}
		return true
	}

	return { isTokenValid }
}
