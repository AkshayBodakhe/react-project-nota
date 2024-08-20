/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { HistoryQuestions } from './HistoryQuestions';
import type { IntakeForm } from './IntakeForm';
import type { PatientSocialHistory } from './PatientSocialHistory';

export type IntakePatientSocialHistory = {
    id?: number;
    intakeForm?: IntakeForm;
    patientSocialHistory?: PatientSocialHistory;
    historyQuestions?: HistoryQuestions;
    answer?: string;
};

