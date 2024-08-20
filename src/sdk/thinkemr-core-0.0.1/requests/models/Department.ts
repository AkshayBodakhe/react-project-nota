/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { User } from './User';

export type Department = {
    id?: number;
    uuid?: string;
    deptId: string;
    name: string;
    adminId: User;
    contact?: string;
    active?: boolean;
    archive?: boolean;
    providerGroupUuid: string;
};

