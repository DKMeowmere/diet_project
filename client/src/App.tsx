import { useEffect } from "react"
import { Route, Routes } from "react-router"
import useTokenValidation from "./hooks/useTokenValidation"
import NotFoundPage from "./pages/404/Index"
import Home from "./pages/home/Index"
import ProductForm from "./pages/productDetails/Index"
import PatientDetails from "./pages/patientDetails/Index"
import CreateProduct from "./pages/productCreate/Index"
import CreatePatient from "./pages/patientCreate/Index"
import CreateDiet from "./pages/dietCreate/Index"
import Login from "./pages/login/Index"
import PatientsList from "./pages/patientList/Index"
import ProductList from "./pages/productList/Index"
import { useAppSelector } from "./app/hooks"
import DietDetails from "./pages/dietDetails/Index"
import DietPdf from "./pages/dietDetails/Pdf"
import DietUpdate from "./pages/dietUpdate/Index"
import DietList from "./pages/dietList/Index"
import ProductGroupList from "./pages/productGroupList/Index"
import ProductGroupForm from "./pages/productGroupForm/Index"
import ErrorBoundary from "./pages/error/Index"
import Navbar from "./components/navbar/Index"
import Alerts from "./components/alert/Index"
import LoadingScreen from "./components/loadingScreen/Index"
import { Container } from "./components/container/Container"
import ErrorPage from "./pages/error/ErrorPage"

function App() {
	const isLoading = useAppSelector(state => state.app.isAppLoading)
	const { isTokenValid } = useTokenValidation()
	const serverUrl = useAppSelector(state => state.app.serverUrl)

	useEffect(() => {
		async function reloadServer() {
			await fetch(`${serverUrl}/reload`)
		}

		const interval = setInterval(reloadServer, 1000 * 60 * 5)
		return () => clearInterval(interval)
	}, [])

	if (!isTokenValid()) {
		return (
			<>
				<Login />
				<Alerts />
				{isLoading && <LoadingScreen />}
			</>
		)
	}

	return (
		<ErrorBoundary >
			<Container>
				<Navbar />
				<Alerts />
				{isLoading && <LoadingScreen />}
				<Routes>
					<Route path="/error" element={<ErrorPage />} />
					<Route path="/" element={<Home />} />
					<Route path="/diet" element={<DietList />} />
					<Route path="/diet/create" element={<CreateDiet />} />
					<Route path="/diet/:id/pdf" element={<DietPdf />} />
					<Route path="/diet/:id" element={<DietDetails />} />
					<Route path="/diet/:id/update" element={<DietUpdate />} />
					<Route path="/product" element={<ProductList />} />
					<Route path="/product/create" element={<CreateProduct />} />
					<Route path="/product/:id" element={<ProductForm />} />
					<Route path="/product-group" element={<ProductGroupList />} />
					<Route
						path="/product-group/create"
						element={<ProductGroupForm type="CREATE" />}
					/>
					<Route
						path="/product-group/:id"
						element={<ProductGroupForm type="UPDATE" />}
					/>
					<Route path="/login" element={<Login />} />
					<Route path="/patient" element={<PatientsList />} />
					<Route path="/patient/create" element={<CreatePatient />} />
					<Route path="/patient/:id" element={<PatientDetails />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Container>
		</ErrorBoundary>
	)
}

export default App
