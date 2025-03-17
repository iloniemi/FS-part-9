import { useParams } from "react-router-dom";
import  patientService from "../services/patients";
import axios from "axios";
import { useEffect, useState } from "react";
import { Gender, Patient } from "../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';


const PatientInfo = () => {
  const params = useParams();
  const id = params.id;
  const [patient, setPatient] = useState<Patient|undefined>(undefined);

  useEffect(() => {
    if (!id) return;
    const getData = async () => {
      try {
        const patient = await patientService.getPatient(id);
        setPatient(patient);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.status === 404) return console.log('Patient not found');
          console.log('error', error);
        }
      }
    };
    getData();
  }, [params]);

  if (!patient) return <div>Loading data</div>;



  return (
    <div>
      <h2>{patient.name}<GenderIcon gender={patient.gender} /></h2>
      <div>
      {patient.ssn && <div>ssn: {patient.ssn}</div>}
      <div>occupation: {patient.occupation}</div>
      {patient.dateOfBirth && <div>born: {patient.dateOfBirth}</div>}
      </div>
    </div>
  );
};
interface GenderProps {
  gender: Gender;
}
const GenderIcon = (props: GenderProps) => {
  switch (props.gender) {
    case 'male':
      return <MaleIcon />;
    case 'female':
      return <FemaleIcon />;
    case 'other':
      return <TransgenderIcon />;
    default:
      return <></>;
  }
};

export default PatientInfo;