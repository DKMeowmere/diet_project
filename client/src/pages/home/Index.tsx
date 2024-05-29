import backgroundImage from "../../assets/homeBackground.jpg"
import { HomeContainer } from "./styles"
import { Block } from "./styles"
import { HiFaceSmile } from "react-icons/hi2"
import { FaCarrot } from "react-icons/fa"
// import { BiDish } from "react-icons/bi"
import { MdOutlineRestaurantMenu } from "react-icons/md"
import { IoFastFoodSharp } from "react-icons/io5"

function Home() {
	return (
		<HomeContainer imageUrl={backgroundImage}>
			<div className="block-container">
				<Block to="/patient">
					<div className="block-icon">
						<HiFaceSmile />
					</div>
					<span className="block-title">Pacjenci</span>
				</Block>
				<Block to="/product">
					<div className="block-icon">
						<FaCarrot />
					</div>
					<span className="block-title">Produkty</span>
				</Block>
				
				<Block to="/product-group">
					<div className="block-icon">
						<IoFastFoodSharp />
					</div>
					<span className="block-title">Potrawy</span>
				</Block>
				<Block to="/diet">
					<div className="block-icon">
						<MdOutlineRestaurantMenu />
					</div>
					<span className="block-title">Diety</span>
				</Block>
			</div>
		</HomeContainer>
	)
}
export default Home
