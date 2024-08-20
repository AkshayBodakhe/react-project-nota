/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Address } from './Address';
import type { Location } from './Location';

export type Staff = {
    id?: number;
    uuid?: string;
    firstName: string;
    lastName: string;
    gender?: Staff.gender;
    birthDate?: string;
    email: string;
    contactNumber: string;
    workLocations: Array<Location>;
    address?: Address;
    role: string;
    roleName?: string;
    avatar?: string;
    newAvatar?: string;
    active?: boolean;
};

export namespace Staff {

    export enum gender {
        MALE = 'MALE',
        FEMALE = 'FEMALE',
        TRANSGENDER = 'TRANSGENDER',
        OTHER = 'OTHER',
        UNKNOWN = 'UNKNOWN',
    }


}

