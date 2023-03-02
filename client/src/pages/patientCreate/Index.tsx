import { PatientCreateContainer, Form, PatientDietsContainer } from "./styles"
import Input from "../../components/input/Index"
import { Button } from "../../components/button/Button"
import theme from "../../app/theme"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addAlert, endLoading, startLoading } from "../../app/features/appSlice"
import { useAppSelector } from "../../app/hooks"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import DietsModal from "../../components/dietModal/Index"
import { BsX } from "react-icons/bs"

function CreatePatient() {
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [email, setEmail] = useState("")
	const [phoneNumber, setPhoneNumber] = useState("")
	const [weight, setWeight] = useState(0)
	const dispatch = useDispatch()
	const serverUrl = useAppSelector(state => state.app.serverUrl)
	const [cookies] = useCookies()
	const navigate = useNavigate()
	const [patientDiets, setPatientDiets] = useState<
		{ title: string; _id: string }[]
	>([])
	const [isModalOpen, setIsModalOpen] = useState(false)

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		try {
			if (isNaN(weight)) {
				throw new Error("Waga pacjenta to nie liczba")
			}

			if (!firstName) {
				throw new Error("Podaj imie")
			}

			if (!lastName) {
				throw new Error("Podaj nazwisko")
			}

			const patientDietsIds = patientDiets.map(diet => diet._id)

			dispatch(startLoading())
			const res = await fetch(`${serverUrl}/api/patient`, {
				method: "POST",
				body: JSON.stringify({
					firstName,
					lastName,
					email: email || null,
					phoneNumber: phoneNumber || null,
					weight: weight || null,
					diets: patientDietsIds,
				}),
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
					body: "Pacjenta dodano pomyślnie",
					type: "SUCCESS",
				})
			)

			navigate("/patient")
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

	return (
		<PatientCreateContainer>
			{isModalOpen && (
				<DietsModal
					setIsModalOpen={setIsModalOpen}
					patientDiets={patientDiets}
					setPatientDiets={setPatientDiets}
				/>
			)}
			<Form onSubmit={handleSubmit}>
				<p className="patient-title">Dodaj pacjenta</p>
				<p className="patient-text">Podaj imię pacjenta</p>
				<Input
					width="90%"
					height="50px"
					placeholder="Podaj imię"
					value={firstName}
					onChange={e => setFirstName(e.target.value)}
				/>
				<p className="patient-text">Podaj nazwisko pacjenta</p>
				<Input
					width="90%"
					height="50px"
					placeholder="Podaj nazwisko"
					value={lastName}
					onChange={e => setLastName(e.target.value)}
				/>
				<p className="patient-text">Podaj email pacjenta</p>

				<Input
					width="90%"
					height="50px"
					placeholder="Podaj email (opcjonalnie)"
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				<p className="patient-text">Podaj nr. tel pacjenta</p>
				<Input
					width="90%"
					height="50px"
					placeholder="Podaj numer telefonu (opcjonalnie)"
					value={phoneNumber}
					onChange={e => setPhoneNumber(e.target.value)}
				/>
				<p className="patient-text">
					Podaj wage pacjenta (opcjonalnie, kg)
				</p>
				<Input
					width="90%"
					height="50px"
					placeholder="Podaj wage (opcjonalnie)"
					value={weight.toString()}
					onChange={e => {
						if (isNaN(parseFloat(e.target.value))) {
							setWeight(0)
							return
						}
						setWeight(parseFloat(e.target.value))
					}}
				/>
				{patientDiets.length > 0 && (
					<PatientDietsContainer>
						{patientDiets.map(diet => (
							<p key={diet._id}>
								{diet.title}
								<BsX
									onClick={() =>
										setPatientDiets(
											patientDiets.filter(
												prevDiet =>
													prevDiet._id !== diet._id
											)
										)
									}
								/>
							</p>
						))}
					</PatientDietsContainer>
				)}
				<Button
					width="90%"
					height="40px"
					type="button"
					bgColor={theme.colors.main}
					onClick={() => setIsModalOpen(true)}
				>
					Dodaj diete do pacjenta
				</Button>
				<Button
					width="90%"
					height="40px"
					type="submit"
					bgColor={theme.colors.main}
				>
					Zatwierdź
				</Button>
			</Form>
		</PatientCreateContainer>
	)
}
export default CreatePatient
