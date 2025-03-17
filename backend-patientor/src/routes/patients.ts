import express from "express";
import patientService from "../services/patientService";
import { newPatientSchema } from "../utils";
import { z } from "zod";


const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  try {
    const id = z.string().parse(req.params.id);
    const patient = patientService.getPatient(id);
    if (patient) {
      res.status(200).json(patient);
    } else {
      res.status(404).json({error: 'patient not found'});
    }
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = newPatientSchema.parse(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
}); 


export default router;