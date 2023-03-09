import { Link } from "react-router-dom"

export default function NotFoundPage() {
	return (
		<>
			<h1>404 nie znaleziono</h1>
			<Link to="/">Wróć do strony głównej</Link>
		</>
	)
}
