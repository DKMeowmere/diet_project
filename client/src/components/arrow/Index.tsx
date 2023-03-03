import React from "react"
import { ArrowContainer } from "./styles"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"

type Props = {
	onClick: () => void
	position?: "relative" | "absolute" | "fixed"
	top?: string
}

export function LeftArrow({ onClick, position, top }: Props) {
	return (
		<ArrowContainer
			position={position || "fixed"}
			type="LEFT"
			onClick={onClick}
			top={top}
		>
			<AiOutlineArrowLeft />
		</ArrowContainer>
	)
}

export function RightArrow({ onClick, position, top }: Props) {
	return (
		<ArrowContainer
			type="RIGHT"
			onClick={onClick}
			position={position}
			top={top}
		>
			<AiOutlineArrowRight />
		</ArrowContainer>
	)
}
