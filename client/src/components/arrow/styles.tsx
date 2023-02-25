import styled from 'styled-components'

export const ArrowContainer = styled.div<{ type: 'LEFT' | 'RIGHT' }>`
	width: 60px;
	height: 60px;
	z-index: 100;
	background-color: ${({ theme }) => theme.colors.main};
	position: fixed;
	top: 50%;
	left: ${({ type }) => (type === 'LEFT' ? '140px' : '')};
	right: ${({ type }) => (type === 'RIGHT' ? '140px' : '')};
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	cursor: pointer;
    svg{
        color: ${({ theme }) => theme.colors.whiteText};
		font-size:2rem;
    }
`
