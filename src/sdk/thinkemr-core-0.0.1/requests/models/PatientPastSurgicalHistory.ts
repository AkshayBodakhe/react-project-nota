/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PatientInfo } from './PatientInfo';

export type PatientPastSurgicalHistory = {
    id?: number;
    uuid?: string;
    name: string;
    surgeryDate?: string;
    patient?: PatientInfo;
    note?: string;
    created?: string;
    archive?: boolean;
    createdByName?: string;
    updatedByName?: string;
};

