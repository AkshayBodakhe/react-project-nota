/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PatientImageOrder } from './PatientImageOrder';
import type { PatientInfo } from './PatientInfo';
import type { User } from './User';

export type PatientImageResult = {
    id?: number;
    uuid?: string;
    patient: PatientInfo;
    uploadOption?: string;
    patientImageOrder?: PatientImageOrder;
    reviewer: User;
    recordedDate?: string;
    recordedTime?: string;
    imageType?: PatientImageResult.imageType;
    testName?: string;
    interpretation?: PatientImageResult.interpretation;
    file?: string;
    note?: string;
    archive?: boolean;
    created?: string;
};

export namespace PatientImageResult {

    export enum imageType {
        CTSCAN = 'CTSCAN',
        XRAY = 'XRAY',
    }

    export enum interpretation {
        NORMAL = 'NORMAL',
        ABNORMAL = 'ABNORMAL',
    }


}

