import { useEffect } from 'react'
import { LoadingScreenContainer } from './styles'

export default function LoadingScreen() {
	useEffect(() => {
		document.body.style.overflow = 'hidden'
		return () => {
			document.body.style.overflow = 'hidden auto'
		}
	}, [])

	return (
		<LoadingScreenContainer>
			<div className='ring'></div>
			<span>loading...</span>
		</LoadingScreenContainer>
	)
}
