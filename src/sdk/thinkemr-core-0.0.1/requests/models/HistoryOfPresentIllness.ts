/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PatientAllergy } from './PatientAllergy';
import type { PatientFamilyHistory } from './PatientFamilyHistory';
import type { PatientPastMedicalHistory } from './PatientPastMedicalHistory';
import type { PatientPastSurgicalHistory } from './PatientPastSurgicalHistory';
import type { PatientSocialHistory } from './PatientSocialHistory';

export type HistoryOfPresentIllness = {
    todayVisit?: string;
    patientPastMedicalHistory?: PatientPastMedicalHistory;
    patientPastSurgicalHistory?: PatientPastSurgicalHistory;
    hospitalization?: string;
    patientFamilyHistory?: PatientFamilyHistory;
    patientSocialHistory?: PatientSocialHistory;
    patientAllergy?: PatientAllergy;
};

