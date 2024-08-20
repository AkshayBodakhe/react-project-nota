/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DiagnosticCentre } from './DiagnosticCentre';
import type { Location } from './Location';
import type { PatientInfo } from './PatientInfo';
import type { TestsData } from './TestsData';

export type PatientLabOrder = {
    id?: number;
    uuid?: string;
    patient: PatientInfo;
    location?: Location;
    diagnosticCentre?: DiagnosticCentre;
    billTypes?: PatientLabOrder.billTypes;
    tests?: Array<TestsData>;
    icdCodeName?: string;
    patientInstructions?: string;
    labInstructions?: string;
    collectionDateTime?: string;
    reminderTime?: string;
    chartNote?: PatientLabOrder.chartNote;
    status?: PatientLabOrder.status;
    archive?: boolean;
    created?: string;
};

export namespace PatientLabOrder {

    export enum billTypes {
        PATIENT = 'PATIENT',
        PROVIDER = 'PROVIDER',
        INSURANCE = 'INSURANCE',
    }

    export enum chartNote {
        OFFICE_VISIT = 'OFFICE_VISIT',
        OTHER = 'OTHER',
    }

    export enum status {
        RECEIVE = 'RECEIVE',
        SEND = 'SEND',
        DRAFT = 'DRAFT',
        COMPLETE = 'COMPLETE',
    }


}

