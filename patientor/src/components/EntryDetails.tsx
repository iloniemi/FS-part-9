import { Box } from "@mui/material";
import { Diagnosis, Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../types";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';


interface Props {
  diagnoses: Diagnosis[];
  entry: Entry;
}

const  EntryDetails = ({entry, diagnoses}: Props) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthEntry entry={entry} diagnoses={diagnoses} />;
    case 'Hospital':
      return <HEntry entry={entry} diagnoses={diagnoses} />;
    case 'OccupationalHealthcare':
      return <OccupationalEntry entry={entry} diagnoses={diagnoses} />;
    default: 
      assertNever(entry);
  }
};

const OccupationalEntry  = ({entry, diagnoses}: {entry: OccupationalHealthcareEntry, diagnoses: Diagnosis[]}) => {
  return (
    <Box border={2} borderRadius={2} padding={1} margin={1}>
      <div>{entry.date} <WorkIcon/> {entry.employerName}</div>
      <div><i>{entry.description}</i></div>
      <Diagnoses diagnoses={diagnoses} diagnosisCodes={entry.diagnosisCodes} />
      {entry.sickLeave && <div>{entry.sickLeave.startDate} - {entry.sickLeave.endDate}</div>}
      <div>diagnose by {entry.specialist}</div>
    </Box>
  );
};

const HealthEntry  = ({entry, diagnoses}: {entry: HealthCheckEntry, diagnoses: Diagnosis[]}) => {
  let iconColor = 'red';
  switch (entry.healthCheckRating){
    case 2:
      iconColor = 'orange';
      break;
    case 1:
      iconColor = 'yellow';
      break;
    case 0:
      iconColor = 'green';
      break;
  }

  return (
    <Box border={2} borderRadius={2} padding={1} margin={1}>
      <div>{entry.date} <MedicalServicesIcon /></div>
      <div><i>{entry.description}</i></div>
      <div><FavoriteIcon sx={{ color: iconColor }}/></div>
      <Diagnoses diagnoses={diagnoses} diagnosisCodes={entry.diagnosisCodes} />
      <div>diagnose by {entry.specialist}</div>
    </Box>
  );
};


const HEntry = ({entry, diagnoses}: {entry: HospitalEntry, diagnoses: Diagnosis[]}) => {
  return (
    <Box border={2} borderRadius={2} padding={1} margin={1}>
      <div>{entry.date} <LocalHospitalIcon /></div>
      <div><i>{entry.description}</i></div>
      <Diagnoses diagnoses={diagnoses} diagnosisCodes={entry.diagnosisCodes} />
      <div>Discharged {entry.discharge.date}: {entry.discharge.criteria}</div>
      <div>diagnose by {entry.specialist}</div>
    </Box>
  );
};


const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Diagnoses = ({diagnosisCodes, diagnoses}: {diagnoses: Diagnosis[], diagnosisCodes: string[] | undefined}) => {
  if (diagnosisCodes === undefined) return <></>;  
  
  const findDiagnosisName = (code: string): string => {
    const diagnosis = diagnoses.find(d => d.code === code);
    if (diagnosis) return diagnosis.name;
    return 'code not in db';
  };
  
  return (
    <ul>
      {diagnosisCodes.map(code => <li key={code}>{code} {findDiagnosisName(code)}</li>)}
    </ul>
  );
  
};
export default EntryDetails;