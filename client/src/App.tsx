import React from 'react'
import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import NotFoundPage from './pages/404/Index'
import Navbar from './components/navbar/Index'
import { Container } from './components/container/Container'
import Home from './pages/home/Index'
import ProductDetails from './pages/productDetails'

function App() {
	return (
		<BrowserRouter>
			<Container>
				<Navbar/>
				<Routes>
					
					<Route path='/' element={<Home/>} />
					<Route path='/product/:id' element={<ProductDetails/>} />
					<Route path='*' element={<NotFoundPage />} />
				</Routes>
			</Container>
		</BrowserRouter>
	)
}

export default App
