import { DishDetailsContainer, Form, ProductContainer } from './styles'
import Input from '../../components/input/Index'
import { Button } from '../../components/button/Button'
import theme from '../../app/theme'
import { AiOutlineClose } from 'react-icons/ai'

// import { useState, useEffect } from "react"
// import { useDispatch } from "react-redux"
// import { addAlert, endLoading, startLoading } from "../../app/features/appSlice"
// import { useAppSelector } from "../../app/hooks"
// import { useCookies } from "react-cookie"
// import { useNavigate } from "react-router-dom"

function DishDetails() {
	return (
		<DishDetailsContainer>
			<Form>
				<p className='dish-title'>Modyfikuj potrawę</p>
				<p className='dish-text'>Modyfikuj nazwę potrawy</p>
				<Input
					width='90%'
					height='50px'
					placeholder='Podaj nazwe'
					// value={weight}
					// onChange={e => setWeight(e.target.value)}
				/>
				<Button width='90%' height='40px' type='button' bgColor={theme.colors.main}>
					Modyfikuj produkt
				</Button>
				<ProductContainer>
					<AiOutlineClose />
					<p className='product-title'>Marchewka</p>
					<p className='dish-text'>Modyfikuj wagę potrawy</p>
					<Input
						width='90%'
						height='50px'
						placeholder='Podaj wagę w gramach'
						// value={weight}
						// onChange={e => setWeight(e.target.value)}
					/>
					<p className='dish-text'>Modyfikuj ilość potrawy</p>
					<Input
						width='90%'
						height='50px'
						placeholder='Podaj ilość'
						// value={weight}
						// onChange={e => setWeight(e.target.value)}
					/>
				</ProductContainer>
			</Form>
		</DishDetailsContainer>
	)
}
export default DishDetails