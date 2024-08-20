/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PatientClinicalRequest = {
    providerGroupUuid?: string;
    gender?: PatientClinicalRequest.gender;
    searchString?: string;
    minCreated?: string;
    maxCreated?: string;
    minBirthDate?: string;
    maxBirthDate?: string;
    active?: boolean;
    languages?: Array<number>;
};

export namespace PatientClinicalRequest {

    export enum gender {
        MALE = 'MALE',
        FEMALE = 'FEMALE',
        TRANSGENDER = 'TRANSGENDER',
        OTHER = 'OTHER',
        UNKNOWN = 'UNKNOWN',
    }


}

