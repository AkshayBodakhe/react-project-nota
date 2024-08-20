/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AddressEntity } from './AddressEntity';
import type { ProviderGroupEntity } from './ProviderGroupEntity';

export type ContactDirectoryEntity = {
    createdBy?: string;
    modifiedBy?: string;
    created?: string;
    modified?: string;
    id?: number;
    uuid?: string;
    name?: string;
    contactType?: ContactDirectoryEntity.contactType;
    email?: string;
    contact?: string;
    fax?: string;
    address?: AddressEntity;
    archive?: boolean;
    providerGroupId?: ProviderGroupEntity;
};

export namespace ContactDirectoryEntity {

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

