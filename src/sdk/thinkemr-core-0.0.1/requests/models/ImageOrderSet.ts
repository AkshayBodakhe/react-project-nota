/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrderStudies } from './OrderStudies';
import type { PatientInfo } from './PatientInfo';

export type ImageOrderSet = {
    id?: number;
    uuid?: string;
    patient?: PatientInfo;
    orderName: string;
    orderStudies?: Array<OrderStudies>;
    orderDiagnosesIcdCode?: string;
};

