/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type FetchSlotsRequest = {
    providerUUID?: string;
    locationUUID?: string;
    visitType: FetchSlotsRequest.visitType;
    appointmentType: FetchSlotsRequest.appointmentType;
    appointmentDate: string;
};

export namespace FetchSlotsRequest {

    export enum visitType {
        IN_PERSON = 'IN_PERSON',
        VIRTUAL = 'VIRTUAL',
    }

    export enum appointmentType {
        FOLLOW_UP = 'FOLLOW_UP',
        INITIAL = 'INITIAL',
    }


}

