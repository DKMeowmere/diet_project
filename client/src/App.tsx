
import { Route, Routes } from "react-router"
import NotFoundPage from "./pages/404/Index"
import Navbar from "./components/navbar/Index"
import { Container } from "./components/container/Container"
import Home from "./pages/home/Index"
import ProductDetails from "./pages/productDetails/Index"
import PatientDetails from "./pages/patientDetails/Index"
import CreateProduct from "./pages/productCreate/Index"
import CreatePatient from "./pages/patientCreate/Index"
import CreateDiet from "./pages/dietCreate/Index"
import Login from "./pages/login/Index"
import PatientsList from "./pages/patients/Index"
import ProductsList from "./pages/products/Index"
import Alerts from "./components/alert/Index"
import LoadingScreen from "./components/loadingScreen/Index"
import { useAppSelector } from "./app/hooks"
import { useCookies } from "react-cookie"
import DietList from "./pages/dietList/Index"
import DietDetails from "./pages/dietDetails/Index"


function App() {
	const isLoading = useAppSelector(state => state.app.isAppLoading)
	const [cookies] = useCookies()

	if (!cookies.token) {
		return (
			<>
				<Login />
				<Alerts />
				{isLoading && <LoadingScreen />}
			</>
		)
	}

	return (
		<Container>
			<Navbar />
			<Alerts />
			{isLoading && <LoadingScreen />}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/diet" element={<DietList />} />
				<Route path="/diet/create" element={<CreateDiet />} />
				<Route path="/diet/:id" element={<DietDetails />} />
				<Route path="/product" element={<ProductsList />} />
				<Route path="/product/create" element={<CreateProduct />} />
				<Route path="/product/:id" element={<ProductDetails />} />
				<Route path="/login" element={<Login />} />
				<Route path="/patient" element={<PatientsList />} />
				<Route path="/patient/create" element={<CreatePatient />} />
				<Route path="/patient/:id" element={<PatientDetails />} />
				<Route path="*" element={<NotFoundPage />} />

			</Routes>
		</Container>
	)
}

export default App
