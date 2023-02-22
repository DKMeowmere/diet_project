import React from "react"
import { TextareaContainer } from "./styles"

type Props = {
	width: string
	height: string
	value: string
	onChange: React.ChangeEventHandler<HTMLTextAreaElement>
	placeholder?: string
}

export default function Textarea({
	width,
	height,
	value,
	onChange,
	placeholder,
}: Props) {
	return (
		
			<TextareaContainer
				width={width}
				height={height}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
		
	)
}
