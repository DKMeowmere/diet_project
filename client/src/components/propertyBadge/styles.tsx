import styled from "styled-components"

export const BadgeContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: auto;
	font-size: 1rem;
	font-weight: light;
	gap: 15px;
	.unit-container {
		height: 100%;
		display: flex;
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
			color: limegreen;
		}
	}
`
