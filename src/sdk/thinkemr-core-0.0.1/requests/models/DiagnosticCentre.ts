/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Address } from './Address';

export type DiagnosticCentre = {
    id?: number;
    uuid?: string;
    type: DiagnosticCentre.type;
    name: string;
    contactNumber: string;
    faxNumber: string;
    address?: Address;
    active?: boolean;
    archive?: boolean;
    providerGroupUuid: string;
};

export namespace DiagnosticCentre {

    export enum type {
        LAB = 'LAB',
        RADIOLOGY = 'RADIOLOGY',
    }


}

