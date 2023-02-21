export type FetchProps = {
	path: string
	method: "GET" | "POST" | "PATCH" | " DELETE"
	body?: BodyInit
}