import SearchInput from "../../components/searchInput/Index"

export default function NotFoundPage() {
	return (
		<>
			<h1>404 nie znaleziono</h1>
			<SearchInput
				width="50%"
				height="60px"
				initialQuery=""
				autocompleteData={[]}
			/>
		</>
	)
}
