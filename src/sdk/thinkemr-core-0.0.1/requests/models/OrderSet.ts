/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PatientInfo } from './PatientInfo';
import type { TestsData } from './TestsData';

export type OrderSet = {
    id?: number;
    uuid?: string;
    patient: PatientInfo;
    orderName: string;
    tests?: Array<TestsData>;
    icdCodeName?: string;
};

