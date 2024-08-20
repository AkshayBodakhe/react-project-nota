/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PatientInfo } from './PatientInfo';

export type PatientFamilyHistory = {
    id?: number;
    uuid?: string;
    name: string;
    patient?: PatientInfo;
    relative?: string;
    onSetAge?: string;
    died?: boolean;
    diedDate?: string;
    note?: string;
    active?: boolean;
    archive?: boolean;
    created?: string;
};

