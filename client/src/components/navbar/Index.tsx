import { NavbarContainer, NavbarPlaceholder } from "./styles"
import { HiFaceSmile } from "react-icons/hi2"
import { FaCarrot } from "react-icons/fa"
// import { BiDish } from "react-icons/bi"
import { AiFillHome } from "react-icons/ai"
import { MdOutlineRestaurantMenu } from "react-icons/md"
import { IoFastFoodSharp } from "react-icons/io5"
import { NavLink, useLocation } from "react-router-dom"

function Navbar() {
	const location = useLocation()

	if (location.pathname === "/" || location.pathname.includes("pdf")) {
		return <></>
	}

	return (
		<>
			<NavbarPlaceholder />
			<NavbarContainer>
				<nav>
					<div className="options-box">
						<NavLink to="/" className="option">
							<AiFillHome />
							<span className="option-text">Strona Główna</span>
						</NavLink>
						<NavLink to="/patient" className="option">
							<HiFaceSmile />
							<span className="option-text">Pacjenci</span>
						</NavLink>
						<NavLink to="/product" className="option">
							<FaCarrot />
							<span className="option-text">Produkty</span>
						</NavLink>
						<NavLink to="/product-group" className="option">
							<IoFastFoodSharp />
							<span className="option-text">Potrawy</span>
						</NavLink>
						<NavLink to="/diet" className="option">
							<MdOutlineRestaurantMenu />
							<span className="option-text">Diety</span>
						</NavLink>
						
					</div>
				</nav>
			</NavbarContainer>
		</>
	)
}
export default Navbar
