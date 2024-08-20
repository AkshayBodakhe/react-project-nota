/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Permissions } from './Permissions';

export type Roles = {
    id?: number;
    uuid?: string;
    name: string;
    description?: string;
    permissions: Array<Permissions>;
    status?: boolean;
    archive?: boolean;
    predefined?: boolean;
};

