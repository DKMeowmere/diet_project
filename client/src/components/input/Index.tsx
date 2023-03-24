import { InputContainer } from "./styles"
import React from "react"

type Props = {
	width: string
	height: string
	value: string
	onChange: React.ChangeEventHandler<HTMLInputElement>
	placeholder?: string
	type?: string
	inputClassName?:string
}

export default function Input({
	width,
	height,
	value,
	onChange,
	placeholder,
	type,
	inputClassName,
}: Props) {
	return (
		<InputContainer width={width} height={height}>
			<input
				type={type || "text"}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				className={inputClassName || ""}
			/>
		</InputContainer>
	)
}
