/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CarePatientChart } from './CarePatientChart';
import type { PatientMedication } from './PatientMedication';

export type EncounterDetailsRequestAndResponseCarePortal = {
    encounterUuid: string;
    encounterStatus?: EncounterDetailsRequestAndResponseCarePortal.encounterStatus;
    chiefComplaint?: string;
    patientMedicationList?: Array<PatientMedication>;
    carePatientChartList?: Array<CarePatientChart>;
    providerName?: string;
    singedDate?: string;
};

export namespace EncounterDetailsRequestAndResponseCarePortal {

    export enum encounterStatus {
        CHECK_IN = 'CHECK_IN',
        DRAFT = 'DRAFT',
        SIGNED = 'SIGNED',
        UNSIGNED = 'UNSIGNED',
    }


}

