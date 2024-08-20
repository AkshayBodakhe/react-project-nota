/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ImageCentres } from './ImageCentres';
import type { OrderStudies } from './OrderStudies';
import type { PatientInfo } from './PatientInfo';
import type { Provider } from './Provider';
import type { User } from './User';

export type PatientImageOrder = {
    id?: number;
    uuid?: string;
    patient: PatientInfo;
    imageCentres?: ImageCentres;
    billTypes?: PatientImageOrder.billTypes;
    orderStudies?: Array<OrderStudies>;
    orderDiagnosesIcdCode?: string;
    instructions?: string;
    routineChannels?: boolean;
    faxPrelimToOffice?: boolean;
    patientIsPregnant?: boolean;
    ptBackWFilm?: boolean;
    ptHomeNegative?: boolean;
    collectionDatetime?: string;
    primaryProvider?: Provider;
    orderingProvider?: User;
    chartNote?: PatientImageOrder.chartNote;
    status?: PatientImageOrder.status;
    archive?: boolean;
    created?: string;
};

export namespace PatientImageOrder {

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

