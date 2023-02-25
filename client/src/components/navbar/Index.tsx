import { NavbarContainer, NavbarPlaceholder } from "./styles"
import { HiFaceSmile } from "react-icons/hi2"
import { FaCarrot } from "react-icons/fa"
import { BiDish } from "react-icons/bi"
import { AiFillHome } from "react-icons/ai"
import { Link, useLocation } from "react-router-dom"

function Navbar() {
	const location = useLocation()

	if (location.pathname === "/") {
		return <></>
	}

	return (
		<>
			<NavbarPlaceholder />
			<NavbarContainer>
				<nav>
					<div className="options-box">
						<Link to="/" className="option">
							<AiFillHome />
							<span className="option-text">Strona Główna</span>
						</Link>
						<Link to="/patients" className="option">
							<HiFaceSmile />
							<span className="option-text">Pacjenci</span>
						</Link>
						<Link to="/product" className="option">
							<FaCarrot />
							<span className="option-text">Produkty</span>
						</Link>
						<Link to="/diet" className="option">
							<BiDish />
							<span className="option-text">Diety</span>
						</Link>
					</div>
				</nav>
			</NavbarContainer>
		</>
	)
}
export default Navbar
