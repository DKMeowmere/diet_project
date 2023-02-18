import backgroundImage from '../../../public/img/homeBackground.jpg'
import { HomeContainer } from './styles'
import { Block } from './styles'
import { CiFaceSmile } from 'react-icons/ci'
import { FaCarrot } from 'react-icons/fa'
import { BiDish } from 'react-icons/bi'

function Home() {
	return (
		<HomeContainer imageUrl={backgroundImage}>
			<div className='block-container'>
				<Block>
					<div className='block-icon'>
						<CiFaceSmile></CiFaceSmile>
					</div>
					<span className='block-title'>Klienci</span>
				</Block>
				<Block>
					<div className='block-icon'>
						<FaCarrot></FaCarrot>
					</div>
					<span className='block-title'>Produkty</span>
				</Block>
				<Block>
				<div className='block-icon'>
						<BiDish></BiDish>
					</div>
					<span className='block-title'>Potrawy</span>
				</Block>
			</div>
		</HomeContainer>
	)
}
export default Home
