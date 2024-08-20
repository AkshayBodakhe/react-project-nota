/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PatientInfo } from './PatientInfo';

export type ProviderRating = {
    id?: number;
    uuid?: string;
    providerUuid: string;
    patient: PatientInfo;
    rating: number;
    review?: string;
};

