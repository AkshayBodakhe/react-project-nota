/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Insurance } from './Insurance';
import type { Patient } from './Patient';

export type PatientAuthorization = {
    id?: number;
    uuid?: string;
    patient: Patient;
    authorizationNumber: string;
    effectiveStartDate: string;
    effectiveEndDate: string;
    procedureCode: string;
    insuranceNumber?: string;
    insurance: Insurance;
    note?: string;
    active?: boolean;
    archive?: boolean;
};

