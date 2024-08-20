/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PatientInfo } from './PatientInfo';
import type { PatientVital } from './PatientVital';

export type PatientVitalRequest = {
    patient: PatientInfo;
    note?: string;
    recordedDate?: string;
    patientVitals?: Array<PatientVital>;
};

