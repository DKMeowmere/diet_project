import { Patient, PatientsContainer, PatientsArticle, PatientContainer } from './styles'
import Navbar from '../../components/navbar/Index'
import { GrMail } from 'react-icons/gr'
import SearchInput from '../../components/searchInput/Index'
import { FcPhoneAndroid } from 'react-icons/fc'

function Patients() {
	return (
		<PatientsArticle>
			<SearchInput className='search-input' width='50%' height='60px' initialQuery='' autocompleteData={[]} />
			<PatientsContainer>
				<PatientContainer>
					<Patient>
						<div className='patient-title'>Jakub Domański</div>
						<div className='patient-value'>
							<div className='email'>
								<GrMail className='letter' />
								email:dawo444gmail.com
							</div>
							<div className='phone-number'>
								<FcPhoneAndroid />
								nr.tel:534 353 890
							</div>
							<div className='desc'>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex animi est perferendis dolor architecto
								similique sunt aliquam labore facere eaque incidunt magnam magni consectetur odio provident, minima
								harum officia ad.
							</div>
						</div>
						<div className='patient-diets'>
							<p>Diety Użytkownika</p>

							<div className='diet-title'>Keto</div>
							<div className='diet-title'>dsadas</div>
							<div className='diet-title'>dsad</div>
							<div className='diet-title'>Dieta Cud</div>
						</div>
					</Patient>
				</PatientContainer>

				<PatientContainer>
					<Patient>
						<div className='patient-title'>Jakub Domański</div>
						<div className='patient-value'>
							<div className='email'>
								<GrMail className='letter' />
								email:dawo444gmail.com
							</div>
							<div className='phone-number'>
								<FcPhoneAndroid />
								nr.tel:534 353 890
							</div>
							<div className='desc'>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex animi est perferendis dolor architecto
								similique sunt aliquam labore facere eaque incidunt magnam magni consectetur odio provident, minima
								harum officia ad.
							</div>
						</div>
						<div className='patient-diets'>
							<p>Diety Użytkownika</p>

							<div className='diet-title'>Keto</div>
							<div className='diet-title'>dsadas</div>
							<div className='diet-title'>dsad</div>
							<div className='diet-title'>Dieta Cud</div>
						</div>
					</Patient>
				</PatientContainer>
                
				<PatientContainer>
					<Patient>
						<div className='patient-title'>Jakub Domański</div>
						<div className='patient-value'>
							<div className='email'>
								<GrMail className='letter' />
								email:dawo444gmail.com
							</div>
							<div className='phone-number'>
								<FcPhoneAndroid />
								nr.tel:534 353 890
							</div>
							<div className='desc'>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex animi est perferendis dolor architecto
								similique sunt aliquam labore facere eaque incidunt magnam magni consectetur odio provident, minima
								harum officia ad.
							</div>
						</div>
						<div className='patient-diets'>
							<p>Diety Użytkownika</p>

							<div className='diet-title'>Keto</div>
							<div className='diet-title'>dsadas</div>
							<div className='diet-title'>dsad</div>
							<div className='diet-title'>Dieta Cud</div>
						</div>
					</Patient>
				</PatientContainer>
                
				<PatientContainer>
					<Patient>
						<div className='patient-title'>Jakub Domański</div>
						<div className='patient-value'>
							<div className='email'>
								<GrMail className='letter' />
								email:dawo444gmail.com
							</div>
							<div className='phone-number'>
								<FcPhoneAndroid />
								nr.tel:534 353 890
							</div>
							<div className='desc'>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex animi est perferendis dolor architecto
								similique sunt aliquam labore facere eaque incidunt magnam magni consectetur odio provident, minima
								harum officia ad.
							</div>
						</div>
						<div className='patient-diets'>
							<p>Diety Użytkownika</p>

							<div className='diet-title'>Keto</div>
							<div className='diet-title'>dsadas</div>
							<div className='diet-title'>dsad</div>
							<div className='diet-title'>Dieta Cud</div>
						</div>
					</Patient>
				</PatientContainer>

				<div className='margin'></div>
			</PatientsContainer>
		</PatientsArticle>
	)
}
export default Patients
