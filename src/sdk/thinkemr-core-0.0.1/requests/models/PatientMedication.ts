/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DrugCatalog } from './DrugCatalog';
import type { PatientInfo } from './PatientInfo';

export type PatientMedication = {
    id?: number;
    uuid?: string;
    drugCatalog?: DrugCatalog;
    patient?: PatientInfo;
    quantity?: string;
    dosageUnit?: PatientMedication.dosageUnit;
    dosageWhen?: PatientMedication.dosageWhen;
    dosageTime?: PatientMedication.dosageTime;
    startDate?: string;
    endDate?: string;
    sig?: string;
    duration?: string;
    providerName?: string;
    note?: string;
    archive?: boolean;
    encounterId?: string;
    medicationStatus?: PatientMedication.medicationStatus;
};

export namespace PatientMedication {

    export enum dosageUnit {
        MG = 'MG',
        TABLET = 'TABLET',
    }

    export enum dosageWhen {
        BEFORE_MEAL = 'BEFORE_MEAL',
        AFTER_MEAL = 'AFTER_MEAL',
        AFTERNOON_MEAL = 'AFTERNOON_MEAL',
        IN_THE_MORNING = 'IN_THE_MORNING',
    }

    export enum dosageTime {
        EVERY_DAY = 'EVERY_DAY',
        TWICE_A_DAY = 'TWICE_A_DAY',
    }

    export enum medicationStatus {
        ACTIVE = 'ACTIVE',
        INACTIVE = 'INACTIVE',
    }


}

