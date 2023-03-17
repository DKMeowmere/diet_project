import { AiFillFire } from "react-icons/ai"
import { GiCoalWagon, GiMilkCarton } from "react-icons/gi"
import { RiOilFill } from "react-icons/ri"
import { BadgeContainer } from "./styles"

type BadgeProps = {
	calories: number
	carbohydrates: number
	proteins: number
	fats: number
}

export default function PropertyBadge({
	calories,
	carbohydrates,
	fats,
	proteins,
}: BadgeProps) {
	return (
		<BadgeContainer>
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
		</BadgeContainer>
	)
}
