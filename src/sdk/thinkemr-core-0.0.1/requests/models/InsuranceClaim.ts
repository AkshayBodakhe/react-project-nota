/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InsurancePayer } from './InsurancePayer';
import type { Patient } from './Patient';
import type { Provider } from './Provider';
import type { Superbill } from './Superbill';

export type InsuranceClaim = {
    id?: number;
    insurancePayer: InsurancePayer;
    provider: Provider;
    patient: Patient;
    superbill: Superbill;
    claimAmount: number;
    claimDate?: string;
    note?: string;
    claimStatus: InsuranceClaim.claimStatus;
    settledAmount?: number;
    settledDate?: string;
    active?: boolean;
    archive?: boolean;
};

export namespace InsuranceClaim {

    export enum claimStatus {
        SUBMITTED = 'Submitted',
        IN_PROGRESS = 'InProgress',
    }


}

