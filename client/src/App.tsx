import React from 'react'
import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import NotFoundPage from './pages/404/Index'
import Navbar from './components/navbar/Index'
import { Container } from './components/container/Container'
import Home from './pages/home/Index'
import ProductDetails from './pages/productDetails'
import PatientDetails from './pages/patientDetails/Index'
import CreateProduct from './pages/productCreate/Index'
import CreatePatient from './pages/patientCreate/Index'
import CreateDiet from './pages/dietCreate'
import Products from './pages/products/Index'
import Login from './pages/login/Index'
import Patients from './pages/patients/Index'


function App() {
	return (
		<BrowserRouter>
			<Container>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/diet/create' element={<CreateDiet />} />
					<Route path='/product/create' element={<CreateProduct />} />
					<Route path='/product' element={<Products />} />
					<Route path='/login' element={<Login />} />
					<Route path='/patient/create' element={<CreatePatient />} />
					<Route path='/patient/:id' element={<PatientDetails />} />
					<Route path='/patients' element={<Patients />}/> 
					<Route path='/product/:id' element={<ProductDetails />} />
					<Route path='*' element={<NotFoundPage />} />
				</Routes>
			</Container>
		</BrowserRouter>
	)
}

export default App
