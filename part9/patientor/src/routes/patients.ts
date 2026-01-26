import express, { Request, Response, NextFunction }  from 'express';
import patientService from '../services/patients'
import { NewPatientSchema } from '../utils';
import {Patient, NewPatient} from '../types'
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => { 
  try {
    NewPatientSchema.parse(req.body);
    console.log(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const addedPatient = patientService.addPatient(req.body);
  res.json(addedPatient);
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);
  res.send(patient);
});

router.use(errorMiddleware);

export default router;