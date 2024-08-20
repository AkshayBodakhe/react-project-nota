/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { HistoryQuestions } from './HistoryQuestions';
import type { IntakeForm } from './IntakeForm';
import type { PatientPastMedicalHistory } from './PatientPastMedicalHistory';

export type IntakePatientMedicalHistory = {
    id?: number;
    intakeForm?: IntakeForm;
    patientPastMedicalHistory?: PatientPastMedicalHistory;
    historyQuestions?: HistoryQuestions;
    answer?: string;
};

