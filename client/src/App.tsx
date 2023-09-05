import { Route, Routes } from "react-router"
import NotFoundPage from "./pages/404/Index"
import Navbar from "./components/navbar/Index"
import { Container } from "./components/container/Container"
import Home from "./pages/home/Index"
import ProductForm from "./pages/productDetails/Index"
import PatientDetails from "./pages/patientDetails/Index"
import CreateProduct from "./pages/productCreate/Index"
import CreatePatient from "./pages/patientCreate/Index"
import CreateDiet from "./pages/dietCreate/Index"
import Login from "./pages/login/Index"
import PatientsList from "./pages/patientList/Index"
import ProductList from "./pages/productList/Index"
import Alerts from "./components/alert/Index"
import LoadingScreen from "./components/loadingScreen/Index"
import { useAppSelector } from "./app/hooks"
import DishList from "./pages/dishList/Index"
import DietDetails from "./pages/dietDetails/Index"
import useTokenValidation from "./hooks/useTokenValidation"
import DietPdf from "./pages/dietDetails/Pdf"
import DietUpdate from "./pages/dietUpdate/Index"
import { useEffect } from "react"
import DietList from "./pages/dietList/Index"
import CreateDish from "./pages/dishCreate/Index"
import DishDetails from "./pages/dishDetails/Index"
import ProductGroupList from "./pages/productGroupList/Index"
import ProductGroupForm from "./pages/productGroupForm/Index"

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
		<Container>
			<Navbar />
			<Alerts />
			{isLoading && <LoadingScreen />}
			<Routes>
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
				<Route path="/dish" element={<DishList />} />
				<Route path="/dish/create" element={<CreateDish />} />
				<Route path="/dish/:id" element={<DishDetails />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</Container>
	)
}

export default App
