import React from "react"
import { ArrowContainer } from "./styles"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"

type Props = {
	onClick: () => void
	position?: "relative" | "absolute" | "fixed"
}

export function LeftArrow({ onClick, position }: Props) {
	return (
		<ArrowContainer position={position || "fixed"} type="LEFT" onClick={onClick}>
			<AiOutlineArrowLeft />
		</ArrowContainer>
	)
}

export function RightArrow({ onClick }: Props) {
	return (
		<ArrowContainer type="RIGHT" onClick={onClick}>
			<AiOutlineArrowRight />
		</ArrowContainer>
	)
}
