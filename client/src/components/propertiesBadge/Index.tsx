import { AiFillFire } from "react-icons/ai"
import { FaAppleAlt } from "react-icons/fa"
import { GiCoalWagon, GiMilkCarton } from "react-icons/gi"
import { RiOilFill } from "react-icons/ri"
import { BadgeContainer } from "./styles"

type BadgeProps = {
	calories: number
	carbohydrates: number
	proteins: number
	fats: number
	fiber?: number
	className?: string
}

export default function PropertiesBadge({
	calories,
	carbohydrates,
	fats,
	proteins,
	fiber,
	className,
}: BadgeProps) {
	return (
		<BadgeContainer className={className || ""}>
			<div className="unit-container">
				<AiFillFire className="fire" />
				{calories}
				cal
			</div>
			<div className="unit-container">
				<GiCoalWagon className="coal" />
				{carbohydrates}W
			</div>
			<div className="unit-container">
				<GiMilkCarton className="milk" />
				{proteins}B
			</div>
			<div className="unit-container">
				<RiOilFill className="oil" />
				{fats}T
			</div>
			<div className="unit-container">
				<FaAppleAlt className="fiber" />
				{fiber || 0}Bł
			</div>
		</BadgeContainer>
	)
}
