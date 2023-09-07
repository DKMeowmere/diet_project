import { useEffect } from 'react'
import { LoadingScreenContainer } from './styles'

export default function LoadingScreen() {
	useEffect(() => {
		document.body.style.overflowY = 'hidden'
		return () => {
			document.body.style.overflowY = 'scroll'
		}
	}, [])

	return (
		<LoadingScreenContainer>
			<div className='ring'></div>
			<span>loading...</span>
		</LoadingScreenContainer>
	)
}
