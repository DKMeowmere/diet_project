import React from 'react'
import { ArrowContainer } from './styles'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

export function LeftArrow() {
	return (
		<ArrowContainer type='LEFT'>
			<AiOutlineArrowLeft />
		</ArrowContainer>
	)
}

export function RightArrow() {
	return (
		<ArrowContainer type='RIGHT'>
			<AiOutlineArrowRight />
		</ArrowContainer>
	)
}
