import { NavbarContainer } from './styles'

function Navbar() {
	return (
		<NavbarContainer>
			<header>
				<div className='container'>
					<div className='logo'>
						<h1>Logo</h1>
					</div>
					<nav>
						<div className='options-box'>
							<div className='options1'>
								<a href='#'>Home</a>
							</div>
							<div className='options'>
								<a href='#'>About</a>
							</div>
							<div className='options'>
								<a href='#'>Services</a>
							</div>
							<div className='options'>
								<a href='#'>Contact</a>
							</div>
							<div className='options'>
								<a href='#'>Feedback</a>
							</div>
						</div>
					</nav>
				</div>
			</header>
		</NavbarContainer>
	)
}
export default Navbar
