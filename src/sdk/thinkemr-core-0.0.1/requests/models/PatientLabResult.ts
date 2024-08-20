/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DiagnosticCentre } from './DiagnosticCentre';
import type { PatientInfo } from './PatientInfo';
import type { PatientLabOrder } from './PatientLabOrder';
import type { User } from './User';

export type PatientLabResult = {
    id?: number;
    uuid?: string;
    patient: PatientInfo;
    uploadOption?: string;
    patientLabOrder?: PatientLabOrder;
    reviewer: User;
    recordedDate?: string;
    recordedTime?: string;
    labName: DiagnosticCentre;
    testName?: string;
    resultValue?: string;
    unit?: string;
    interpretation?: PatientLabResult.interpretation;
    file?: string;
    note?: string;
    archive?: boolean;
    created?: string;
};

export namespace PatientLabResult {

    export enum interpretation {
        NORMAL = 'NORMAL',
        ABNORMAL = 'ABNORMAL',
    }


}

