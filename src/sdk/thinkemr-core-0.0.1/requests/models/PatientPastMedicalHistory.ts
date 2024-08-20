/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PatientInfo } from './PatientInfo';

export type PatientPastMedicalHistory = {
    id?: number;
    uuid?: string;
    name: string;
    onsetDate?: string;
    patient?: PatientInfo;
    note?: string;
    created?: string;
    archive?: boolean;
    createdByName?: string;
    updatedByName?: string;
};

