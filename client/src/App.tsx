import React from 'react'
import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import NotFoundPage from './pages/404/Index'
import Navbar from './components/navbar/Index'
import { Container } from './components/container/Container'
import Home from './pages/home/Index'
import ProductDetails from './pages/productDetails/Index'
import PatientDetails from './pages/patientDetails/Index'
import CreateProduct from './pages/productCreate/Index'
import CreatePatient from './pages/patientCreate/Index'
import CreateDiet from './pages/dietCreate'
import Products from './pages/products/Index'
import Alerts from './components/alert/Index'
import LoadingScreen from './components/loadingScreen/Index'
import { useAppSelector } from './app/hooks'

function App() {
	const isLoading = useAppSelector(state => state.app.isAppLoading)

	return (
		<BrowserRouter>
			<Container>
				<Navbar />
				<Alerts />
				{isLoading && <LoadingScreen/>}
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/diet/create' element={<CreateDiet />} />
					<Route path='/product' element={<Products />} />
					<Route path='/product/create' element={<CreateProduct />} />
					<Route path='/product/:id' element={<ProductDetails />} />
					<Route path='/patient/create' element={<CreatePatient />} />
					<Route path='/patient/:id' element={<PatientDetails />} />
					<Route path='*' element={<NotFoundPage />} />
				</Routes>
			</Container>
		</BrowserRouter>
	)
}

export default App
