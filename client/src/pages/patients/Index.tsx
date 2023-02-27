import {
	Patient,
	PatientsContainer,
	PatientsArticle,
	PatientContainer,
} from "./styles"
import { GrMail } from "react-icons/gr"
import { FcPhoneAndroid } from "react-icons/fc"
import SearchInput from "../../components/searchInput/Index"
import { useState, useEffect, useMemo } from "react"
import { Patients } from "../../types/patients"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useCookies } from "react-cookie"
import { addAlert, endLoading, startLoading } from "../../app/features/appSlice"
import { GiWeight } from "react-icons/gi"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../../components/button/Button"
import theme from "../../app/theme"

function PatientsList() {
	const [patients, setPatients] = useState<Patients>([])
	const [query, setQuery] = useState("")
	const serverUrl = useAppSelector(state => state.app.serverUrl)
	const dispatch = useAppDispatch()
	const [cookies] = useCookies()
	const navigate = useNavigate()

	useEffect(() => {
		async function fetchPatients() {
			dispatch(startLoading())
			const res = await fetch(`${serverUrl}/api/patient`, {
				headers: {
					Authorization: `Bearer ${cookies.token}`,
				},
			})
			dispatch(endLoading())
			const data = await res.json()

			if (!res.ok) {
				setPatients([])
				dispatch(addAlert({ body: data?.error, type: "ERROR" }))
				return
			}

			if (!data) {
				setPatients([])
				return
			}

			setPatients(data as unknown as Patients)
		}
		fetchPatients()
	}, [])

	const filteredPatients = useMemo(() => {
		return patients.filter(patient => {
			const patientName = `${patient.firstName} ${patient.lastName}`
			return patientName.toLowerCase().includes(query.toLowerCase())
		})
	}, [query, patients])

	const patientsNames = patients.map(patient => {
		const patientName = `${patient.firstName} ${patient.lastName}`
		return patientName
	})

	return (
		<PatientsArticle>
			<Link to="/patient/create" className="create-patient-link">
				<Button width="100%" height="60px" bgColor={theme.colors.main}>
					Stwórz pacjenta
				</Button>
			</Link>
			<SearchInput
				className="search-input"
				width="50%"
				height="60px"
				query={query}
				setQuery={setQuery}
				autocompleteData={patientsNames}
			/>
			<PatientsContainer>
				<PatientContainer>
					{filteredPatients.map(patient => (
						<Patient
							key={patient._id}
							onClick={() => navigate(`/patient/${patient._id}`)}
						>
							<div className="patient-title">{`${patient.firstName} ${patient.lastName}`}</div>
							<div className="patient-value">
								<div className="email">
									<GrMail className="letter" />
									email: {patient.email || "brak"}
								</div>
								<div className="phone-number">
									<FcPhoneAndroid />
									nr.tel: {patient.phoneNumber || "brak"}
								</div>
								<div className="patient-weight">
									<GiWeight />
									Waga:{" "}
									{patient.weight
										? `${patient.weight}kg`
										: "brak"}
								</div>
							</div>
							<div className="patient-diets">
								{patient.diets.length > 0 && (
									<p>Diety pacjenta: </p>
								)}
								{patient.diets.map(diet => (
									<div
										onClick={e => {
											e.stopPropagation()
											navigate(`/diet/${diet._id}`)
										}}
										key={diet._id}
										className="diet-title"
									>
										{diet.title}
									</div>
								))}
							</div>
						</Patient>
					))}
				</PatientContainer>
			</PatientsContainer>
		</PatientsArticle>
	)
}
export default PatientsList
