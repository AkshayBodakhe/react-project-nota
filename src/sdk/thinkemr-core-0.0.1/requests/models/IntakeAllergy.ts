/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { IntakeForm } from './IntakeForm';
import type { PatientAllergy } from './PatientAllergy';

export type IntakeAllergy = {
    id?: number;
    intakeForm?: IntakeForm;
    patientAllergy?: PatientAllergy;
    name?: string;
    criticality?: string;
    reaction?: string;
    severity?: string;
    onSetDate?: string;
    active?: boolean;
    note?: string;
};

