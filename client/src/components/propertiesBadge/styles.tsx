import styled from 'styled-components'

export const BadgeContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	height: auto;
	font-size: 0.9rem;
	font-weight: light;
	gap: 15px;
	max-width: 600px;
	flex: 1 1 wrap;
	.unit-container {
		height: 100%;
		display: flex;
		min-width: 60px;
		align-items: center;
		.milk {
			color: #1cbbbb;
		}
		.coal {
			color: #000;
		}
		.fire {
			color: #ffa500;
		}
		.oil {
			color: #dc143c;
		}
		.fiber {
			color: #32cd32;
		}
	}
`
