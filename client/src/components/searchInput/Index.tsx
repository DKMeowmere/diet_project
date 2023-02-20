import { useMemo, useState } from "react"
import Input from "../input/Index"
import { Autocomplete, SearchInputContainer } from "./styles"
import { GoSearch } from "react-icons/go"

type Props = {
	width: string
	height: string
	initialQuery: string
	autocompleteData: string[]
	className?: string
}

export default function SearchInput({
	width,
	height,
	initialQuery,
	autocompleteData,
	className,
}: Props) {
	const [query, setQuery] = useState(initialQuery)
	const [isAutoCompleteVisible, setIsAutoCompleteVisible] = useState(false)

	const filteredData = useMemo(() => {
		if (!query) {
			return []
		}
		return autocompleteData.filter(item =>
			item.toLowerCase().includes(query.toLowerCase())
		)
	}, [query])

	return (
		<SearchInputContainer
			width={width}
			height={height}
			className={className || ""}
		>
			<Input
				width="100%"
				height={height}
				type="search"
				value={query}
				onChange={e => {
					setIsAutoCompleteVisible(true)
					setQuery(e.target.value)
				}}
			/>
			<GoSearch />
			{isAutoCompleteVisible && (
				<Autocomplete>
					{filteredData.map(title => (
						<p
							onClick={() => {
								setIsAutoCompleteVisible(false)
								setQuery(title)
							}}
							key={crypto.randomUUID()}
						>
							{title}
						</p>
					))}
				</Autocomplete>
			)}
		</SearchInputContainer>
	)
}
