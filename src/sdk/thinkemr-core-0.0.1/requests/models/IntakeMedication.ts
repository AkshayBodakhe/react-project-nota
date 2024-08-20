/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { IntakeForm } from './IntakeForm';
import type { PatientMedication } from './PatientMedication';
import type { Provider } from './Provider';

export type IntakeMedication = {
    id?: number;
    intakeForm?: IntakeForm;
    patientMedication?: PatientMedication;
    name?: string;
    quantity?: string;
    unit?: IntakeMedication.unit;
    when?: string;
    dose?: string;
    startDate?: string;
    endDate?: string;
    provider?: Provider;
    note?: string;
    active?: boolean;
};

export namespace IntakeMedication {

    export enum unit {
        MG = 'MG',
        TABLET = 'TABLET',
    }


}

