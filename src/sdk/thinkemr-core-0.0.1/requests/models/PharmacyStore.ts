/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Address } from './Address';

export type PharmacyStore = {
    id?: number;
    uuid?: string;
    name: string;
    contactNumber: string;
    faxNumber?: string;
    address: Address;
    active?: boolean;
    archive?: boolean;
    providerGroupUuid: string;
};

