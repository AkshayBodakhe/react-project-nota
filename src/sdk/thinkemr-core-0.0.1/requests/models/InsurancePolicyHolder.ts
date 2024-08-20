/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Address } from './Address';

export type InsurancePolicyHolder = {
    id?: number;
    uuid?: string;
    firstName?: string;
    lastName?: string;
    dob?: string;
    gender?: InsurancePolicyHolder.gender;
    address?: Address;
    active?: boolean;
    archive?: boolean;
};

export namespace InsurancePolicyHolder {

    export enum gender {
        MALE = 'MALE',
        FEMALE = 'FEMALE',
        TRANSGENDER = 'TRANSGENDER',
        OTHER = 'OTHER',
        UNKNOWN = 'UNKNOWN',
    }


}

