import { NavbarContainer } from './styles'
import { HiFaceSmile } from 'react-icons/hi2'
import { FaCarrot } from 'react-icons/fa'
import { BiDish } from 'react-icons/bi'
import { AiFillHome } from 'react-icons/ai'

function Navbar() {
	return (
		<NavbarContainer>
			<nav>
				<div className='options-box'>
					<div className='option'>
						<AiFillHome/>
						<span className="option-text">Strona Główna</span>
					</div>
					<div className='option'>
						<HiFaceSmile/>
						<span className="option-text">Klienci</span>
					</div>
					<div className='option'>
						<FaCarrot/>
						<span className="option-text">Produkty</span>
					</div>
					<div className='option'>
						<BiDish/>
						<span className="option-text">Diety</span>
					</div>
				</div>
			</nav>
		</NavbarContainer>
	)
}
export default Navbar
