/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PatientInfo } from './PatientInfo';

export type PatientAllergy = {
    id?: number;
    uuid?: string;
    allergyType?: PatientAllergy.allergyType;
    allergy?: string;
    patient?: PatientInfo;
    reaction?: PatientAllergy.reaction;
    severity?: PatientAllergy.severity;
    onSetDate?: string;
    note?: string;
    status?: boolean;
    recordedBy?: string;
    recordedDate?: string;
};

export namespace PatientAllergy {

    export enum allergyType {
        DRUG = 'DRUG',
        FOOD = 'FOOD',
        ENVIRONMENT = 'ENVIRONMENT',
        OTHER = 'OTHER',
    }

    export enum reaction {
        PAIN = 'PAIN',
        RUNNY_NOSE = 'RUNNY_NOSE',
        SWELLING = 'SWELLING',
        BLOATING = 'BLOATING',
        VOMITING = 'VOMITING',
        RASHES = 'RASHES',
        ITCHY_NOSE = 'ITCHY_NOSE',
        THROAT_CLOSING = 'THROAT_CLOSING',
        COUGH = 'COUGH',
        REDNESS = 'REDNESS',
    }

    export enum severity {
        MILD = 'MILD',
        HIGH = 'HIGH',
        MODERATE = 'MODERATE',
    }


}

