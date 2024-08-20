/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AuthRequest = {
    username: string;
    password: string;
    portalName: AuthRequest.portalName;
};

export namespace AuthRequest {

    export enum portalName {
        NAVALAGLOBAL = 'NAVALAGLOBAL',
        NAVALACARE = 'NAVALACARE',
        PATIENT = 'PATIENT',
    }


}

