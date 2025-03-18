import patients from '../../data/patients-full';
import { Patient, NonSensitivePatient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => patients;
const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => (
    { id, name, dateOfBirth, gender, occupation }
  ) );
};
const getPatient = (id: string): Patient|undefined => {
  const patient = patients.find(patient => patient.id === id);
  return patient;
};
const addPatient = ( patient : NewPatient ): Patient => {
  const newPatient: Patient = { 
    id: uuid(),
    ...patient,
    entries: [],
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, getNonSensitivePatients, addPatient, getPatient };