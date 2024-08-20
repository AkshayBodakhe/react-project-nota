/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AppointmentListLocationRequest = {
    availabilityPresenceType?: AppointmentListLocationRequest.availabilityPresenceType;
    locationUuid?: Array<string>;
};

export namespace AppointmentListLocationRequest {

    export enum availabilityPresenceType {
        IN_PERSON = 'IN_PERSON',
        VIRTUAL = 'VIRTUAL',
    }


}

