/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PatientVital } from './PatientVital';
import type { PhysicalExam } from './PhysicalExam';

export type Objective = {
    objectiveNote?: string;
    patientVitals?: Array<PatientVital>;
    physicalExam?: PhysicalExam;
};

