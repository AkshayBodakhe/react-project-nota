/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SetPasswordEmailRequest = {
    email: string;
    name: string;
    subdomain?: string;
    uuid?: string;
    portalName?: SetPasswordEmailRequest.portalName;
};

export namespace SetPasswordEmailRequest {

    export enum portalName {
        NAVALAGLOBAL = 'NAVALAGLOBAL',
        NAVALACARE = 'NAVALACARE',
        PATIENT = 'PATIENT',
    }


}

