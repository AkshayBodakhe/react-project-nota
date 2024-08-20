/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PatientInfo } from './PatientInfo';

export type StickyNotes = {
    id?: number;
    uuid?: string;
    description: string;
    patient: PatientInfo;
    createdInfo?: string;
    createdDate?: string;
};

