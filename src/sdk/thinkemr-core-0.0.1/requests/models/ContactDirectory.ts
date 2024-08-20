/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Address } from './Address';

export type ContactDirectory = {
    id?: number;
    uuid?: string;
    name?: string;
    contactType: ContactDirectory.contactType;
    email: string;
    contact: string;
    fax?: string;
    address?: Address;
    archive?: boolean;
    providerGroupUuid: string;
};

export namespace ContactDirectory {

    export enum contactType {
        INSURANCE_PAYER = 'INSURANCE_PAYER',
        LAB = 'LAB',
        CLINIC = 'CLINIC',
        VENDOR = 'VENDOR',
        PHARMACY = 'PHARMACY',
        RADIOLOGY = 'RADIOLOGY',
        PROVIDER = 'PROVIDER',
        PATIENT = 'PATIENT',
        OTHER = 'OTHER',
    }


}

