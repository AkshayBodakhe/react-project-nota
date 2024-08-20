/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BillingCodes } from './BillingCodes';
import type { PatientMedication } from './PatientMedication';

export type EncounterPlan = {
    billingCodes?: Array<BillingCodes>;
    labTest?: string;
    imaging?: string;
    patientMedications?: Array<PatientMedication>;
    instructionNote?: string;
    additionalNote?: string;
    encounterPlanNote?: string;
};

