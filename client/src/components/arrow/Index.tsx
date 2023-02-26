import React from "react"
import { ArrowContainer } from "./styles"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"

type Props = {
	onClick: () => void
}

export function LeftArrow({ onClick }: Props) {
	return (
		<ArrowContainer type="LEFT" onClick={onClick}>
			<AiOutlineArrowLeft />
		</ArrowContainer>
	)
}

export function RightArrow({ onClick }: Props) {
	return (
		<ArrowContainer
			type="RIGHT"
			onClick={onClick}
		>
			<AiOutlineArrowRight />
		</ArrowContainer>
	)
}
