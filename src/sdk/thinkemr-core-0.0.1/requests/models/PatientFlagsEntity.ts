/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ProviderGroupEntity } from './ProviderGroupEntity';

export type PatientFlagsEntity = {
    createdBy?: string;
    modifiedBy?: string;
    created?: string;
    modified?: string;
    id?: number;
    uuid?: string;
    name?: string;
    color?: string;
    flags?: number;
    archive?: boolean;
    providerGroupId?: ProviderGroupEntity;
};

