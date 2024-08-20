/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BillingCodes } from './BillingCodes';
import type { PatientInfo } from './PatientInfo';

export type PatientProblem = {
    id?: number;
    uuid?: string;
    billingCodes?: BillingCodes;
    patient: PatientInfo;
    active?: boolean;
    type?: PatientProblem.type;
    diagnosedDate?: string;
    note?: string;
    approved?: boolean;
    archive?: boolean;
    recordedDate?: string;
};

export namespace PatientProblem {

    export enum type {
        CHRONIC = 'CHRONIC',
        ACUTE = 'ACUTE',
    }


}

