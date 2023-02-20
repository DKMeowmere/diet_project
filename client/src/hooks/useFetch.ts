import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { addAlert, endLoading, startLoading } from "../app/features/appSlice"
import { useAppDispatch, useAppSelector } from "../app/hooks"

type FetchProps = {
	path: string
	method: "GET" | "POST" | "PATCH" | " DELETE"
	body?: BodyInit
}

export default async function useFetch({ path, method, body }: FetchProps) {
	const serverUrl = useAppSelector(state => state.app.serverUrl)
	const dispatch = useAppDispatch()
	const [data, setData] = useState(null)
	const [cookies] = useCookies()

	useEffect(() => {
		if (!cookies.token) {
			dispatch(addAlert({ body: "Nie jesteś zalogowany", type: "ERROR" }))
			return
		}

		async function fetchData() {
			dispatch(startLoading)
			const res = await fetch(`${serverUrl}${path}`, {
				method,
				body,
				headers: {
					"Content-Type": "application/json",
					Authorization: cookies.token,
				},
			})
			const data = await res.json()

			dispatch(endLoading)
			if (!res.ok) {
				dispatch(addAlert({ body: data.error, type: "ERROR" }))
				return
			}
			setData(data)
		}
		fetchData()
	}, [path, method, body])

	return data
}
