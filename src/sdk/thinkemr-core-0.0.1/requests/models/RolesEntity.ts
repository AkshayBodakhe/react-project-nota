/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PermissionsEntity } from './PermissionsEntity';
import type { ProviderGroupEntity } from './ProviderGroupEntity';

export type RolesEntity = {
    createdBy?: string;
    modifiedBy?: string;
    created?: string;
    modified?: string;
    id?: number;
    uuid?: string;
    name?: string;
    description?: string;
    permissions?: Array<PermissionsEntity>;
    status?: boolean;
    archive?: boolean;
    providerGroupId?: ProviderGroupEntity;
    predefined?: boolean;
};

