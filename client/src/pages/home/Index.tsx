import backgroundImage from "../../../public/img/homeBackground.jpg"
import { HomeContainer } from "./styles"
import { Block } from "./styles"
import { HiFaceSmile } from "react-icons/hi2"
import { FaCarrot } from "react-icons/fa"
import { BiDish } from "react-icons/bi"

function Home() {
	return (
		<HomeContainer imageUrl={backgroundImage}>
			<div className="block-container">
				<Block to="/patient">
					<div className="block-icon">
						<HiFaceSmile />
					</div>
					<span className="block-title">Klienci</span>
				</Block>
				<Block to="/product">
					<div className="block-icon">
						<FaCarrot />
					</div>
					<span className="block-title">Produkty</span>
				</Block>
				<Block to="/diet">
					<div className="block-icon">
						<BiDish />
					</div>
					<span className="block-title">Diety</span>
				</Block>
			</div>
		</HomeContainer>
	)
}
export default Home
