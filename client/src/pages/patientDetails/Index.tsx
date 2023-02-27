import { PatientDetailsContainer, Form, PatientDiets } from "./styles"
import Input from "../../components/input/Index"
import { Button } from "../../components/button/Button"
import theme from "../../app/theme"
import { useState, useEffect } from "react"
import { Patient as PatientType } from "../../types/patients"
import { addAlert, endLoading, startLoading } from "../../app/features/appSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useCookies } from "react-cookie"
import { Link, useNavigate, useParams } from "react-router-dom"

function PatientDetails() {
	const [patient, setPatient] = useState<PatientType | null>(null)
	const dispatch = useAppDispatch()
	const serverUrl = useAppSelector(state => state.app.serverUrl)
	const [cookies] = useCookies()
	const { id } = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		dispatch(startLoading())
		async function fetchProduct() {
			const res = await fetch(`${serverUrl}/api/patient/${id}`, {
				headers: {
					Authorization: `Bearer ${cookies.token}`,
				},
			})
			dispatch(endLoading())
			const data = await res.json()

			if (!res.ok) {
				setPatient(null)
				dispatch(addAlert({ body: data?.error, type: "ERROR" }))
				return
			}

			if (!data) {
				setPatient(null)
				return
			}

			setPatient(data as unknown as PatientType)
		}
		fetchProduct()
	}, [])
	
	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		try {
			if (!patient || !patient.weight) {
				throw new Error("oczekiwany błąd")
			}

			if (isNaN(patient.weight)) {
				throw new Error("Waga pacjenta to nie liczba")
			}

			if (!patient.firstName) {
				throw new Error("Podaj imie")
			}

			if (!patient.firstName) {
				throw new Error("Podaj nazwisko")
			}

			dispatch(startLoading)
			const res = await fetch(`${serverUrl}/api/patient/${id}`, {
				method: "PATCH",
				body: JSON.stringify(patient),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${cookies.token}`,
				},
			})
			dispatch(endLoading())
			const data = await res.json()

			if (!res.ok) {
				throw new Error(data.error)
			}

			dispatch(
				addAlert({
					body: "Pacjenta zaaktualizowano pomyślnie",
					type: "SUCCESS",
				})
			)

			setPatient(data)
		} catch (err: unknown) {
			const message =
				err instanceof Error ? err.message : "Nieoczekiwany błąd"

			dispatch(
				addAlert({
					body: message || "Nieoczekiwany błąd",
					type: "ERROR",
				})
			)
		}
	}

	async function handleDelete(e: React.FormEvent<HTMLButtonElement>) {
		e.preventDefault()

		try {
			if (!patient) {
				throw new Error("oczekiwany błąd")
			}

			dispatch(startLoading)
			const res = await fetch(`${serverUrl}/api/patient/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${cookies.token}`,
				},
			})
			dispatch(endLoading())
			const data = await res.json()

			if (!res.ok) {
				throw new Error(data.error)
			}

			dispatch(
				addAlert({
					body: "Pacjenta usunięto pomyślnie",
					type: "SUCCESS",
				})
			)

			navigate("/")
		} catch (err: unknown) {
			const message =
				err instanceof Error ? err.message : "Nieoczekiwany błąd"

			dispatch(
				addAlert({
					body: message || "Nieoczekiwany błąd",
					type: "ERROR",
				})
			)
		}
	}

	if (!patient) {
		return (
			<PatientDetailsContainer>
				<Link to="/">
					Nie znaleziono pacjenta o podanym id. Wróć do strony głównej
				</Link>
			</PatientDetailsContainer>
		)
	}

	return (
		<PatientDetailsContainer>
			<Form onSubmit={handleSubmit}>
				<p className="patient-title">Modyfikuj Pacjenta</p>
				<p className="patient-text">Edytuj Imię Pacjenta</p>
				<Input
					width="90%"
					height="50px"
					placeholder="Edytuj Imię"
					value={patient.firstName}
					onChange={e =>
						setPatient({ ...patient, firstName: e.target.value })
					}
				/>
				<p className="patient-text">Edytuj nazwisko pacjenta</p>
				<Input
					width="90%"
					height="50px"
					placeholder="Edytuj nazwisko"
					value={patient.lastName}
					onChange={e =>
						setPatient({ ...patient, lastName: e.target.value })
					}
				/>
				<p className="patient-text">Edytuj email pacjenta</p>

				<Input
					width="90%"
					height="50px"
					placeholder="Edytuj email"
					value={patient.email || ""}
					onChange={e =>
						setPatient({ ...patient, email: e.target.value })
					}
				/>
				<p className="patient-text">Edytuj nr. tel pacjenta</p>
				<Input
					width="90%"
					height="50px"
					placeholder="Edytuj numer telefonu"
					value={patient.phoneNumber || ""}
					onChange={e =>
						setPatient({ ...patient, phoneNumber: e.target.value })
					}
				/>
				<p className="patient-text">
					Podaj wage pacjenta (opcjonalnie, kg)
				</p>
				<Input
					width="90%"
					height="50px"
					placeholder="Podaj wage (opcjonalnie)"
					value={patient.weight?.toString() || "0"}
					onChange={e => {
						if (isNaN(parseFloat(e.target.value))) {
							setPatient({ ...patient, weight: 0 })
							return
						}
						setPatient({
							...patient,
							weight: parseFloat(e.target.value),
						})
					}}
				/>
				<PatientDiets>
					<Button
						width="100%"
						height="40px"
						bgColor={theme.colors.main}
					>
						Dieta 1
					</Button>
				</PatientDiets>
				<Button
					width="90%"
					height="40px"
					type="submit"
					bgColor={theme.colors.main}
				>
					Zatwierdź
				</Button>
				<Button
					width="90%"
					height="40px"
					type="submit"
					bgColor={theme.colors.errorMain}
					onClick={handleDelete}
				>
					Usuń
				</Button>
			</Form>
		</PatientDetailsContainer>
	)
}
export default PatientDetails
