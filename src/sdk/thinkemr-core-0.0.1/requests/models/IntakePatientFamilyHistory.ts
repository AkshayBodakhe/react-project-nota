/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { IntakeForm } from './IntakeForm';
import type { PatientFamilyHistory } from './PatientFamilyHistory';

export type IntakePatientFamilyHistory = {
    id?: number;
    intakeForm?: IntakeForm;
    patientFamilyHistory?: PatientFamilyHistory;
    name?: string;
    relation?: string;
    onsetAge?: number;
    alive?: boolean;
    note?: string;
};

