/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type EncounterRequest = {
    appointmentId: number;
    status?: EncounterRequest.status;
    serviceDate: string;
    note?: string;
};

export namespace EncounterRequest {

    export enum status {
        CHECK_IN = 'CHECK_IN',
        DRAFT = 'DRAFT',
        SIGNED = 'SIGNED',
        UNSIGNED = 'UNSIGNED',
    }


}

