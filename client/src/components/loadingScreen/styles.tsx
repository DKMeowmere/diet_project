import styled from 'styled-components'

export const LoadingScreenContainer = styled.div`
	width: 100%;
	height: 100vh;
	z-index: 1000;
	position: fixed;
	top: 0;
	left: 0;
	background-color: #011e;
	
	display: flex;
	justify-content: center;
	align-items: center;
	.ring {
		position: absolute;
		width: 200px;
		height: 200px;
		border-radius: 50%;
		animation: ring 2s linear infinite;
		
	}
	@keyframes ring {
		0% {
			transform: rotate(0deg);
			box-shadow: 1px 5px 2px #e65c00;
		}
		50% {
			transform: rotate(180deg);
			box-shadow: 1px 5px 2px #18b201;
		}
		100% {
			transform: rotate(360deg);
			box-shadow: 1px 5px 2px #0456c8;
		}
	}
	.ring:before {
		position: absolute;
		content: '';
		left: 0;
		top: 0;
		height: 100%;
		border-radius: 50%;
		width: 100%;
		box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
	}
	span {
		color: #737373;
		font-size: 20px;
		text-transform: uppercase;
		letter-spacing: 1px;
		line-height: 200px;
	}
`
