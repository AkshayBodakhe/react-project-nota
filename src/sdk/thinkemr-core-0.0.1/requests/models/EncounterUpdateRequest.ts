/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type EncounterUpdateRequest = {
    uuid: string;
    status: EncounterUpdateRequest.status;
};

export namespace EncounterUpdateRequest {

    export enum status {
        CHECK_IN = 'CHECK_IN',
        DRAFT = 'DRAFT',
        SIGNED = 'SIGNED',
        UNSIGNED = 'UNSIGNED',
    }


}

