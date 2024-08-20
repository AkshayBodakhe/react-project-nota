/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PermissionsEntity = {
    id?: number;
    module?: string;
    permissionKey?: string;
    permissionName?: string;
    description?: string;
    accessCategory?: PermissionsEntity.accessCategory;
};

export namespace PermissionsEntity {

    export enum accessCategory {
        ADMIN = 'ADMIN',
        CARE_PROVIDER = 'CARE_PROVIDER',
        GLOBAL_PROVIDER = 'GLOBAL_PROVIDER',
        PROVIDER = 'PROVIDER',
        BOTH = 'BOTH',
    }


}

