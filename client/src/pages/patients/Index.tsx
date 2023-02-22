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
import { addAlert } from "../../app/features/appSlice"
import { GiWeight } from "react-icons/gi"
import { Link } from "react-router-dom"

function PatientsList() {
	const [patients, setPatients] = useState<Patients>([])
	const [query, setQuery] = useState("")
	const serverUrl = useAppSelector(state => state.app.serverUrl)
	const dispatch = useAppDispatch()
	const [cookies] = useCookies()

	useEffect(() => {
		async function fetchPatients() {
			const res = await fetch(`${serverUrl}/api/patient`, {
				headers: {
					Authorization: `Bearer ${cookies.token}`,
				},
			})
			const data = await res.json()

			if (!res.ok) {
				setPatients([])
				dispatch(addAlert({ body: data?.message, type: "ERROR" }))
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
						<Patient key={patient._id}>
							<div className="patient-title">{`${patient.firstName} ${patient.lastName}`}</div>
							<div className="patient-value">
								<div className="email">
									<GrMail className="letter" />
									email:{patient.email || "brak"}
								</div>
								<div className="phone-number">
									<FcPhoneAndroid />
									nr.tel:{patient.phoneNumber || "brak"}
								</div>
								<div className="patient-weight">
									<GiWeight />
									Waga: {patient.weight || "brak"}
								</div>
							</div>
							<div className="patient-diets">
								{patient.diets.length && <p>Diety Użytkownika:</p>}
								{patient.diets.map(diet => (
									<Link to={`/diet/${diet._id}`} key={diet._id} className="diet-title">
										{diet.title}
									</Link>
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
