/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalTime } from './LocalTime';
import type { LocationEntity } from './LocationEntity';
import type { ProviderEntity } from './ProviderEntity';

export type AvailabilityByDate = {
    locationUuid?: string;
    providerUserUuid?: string;
    availabilityPresenceType: AvailabilityByDate.availabilityPresenceType;
    availabilityOperationType: AvailabilityByDate.availabilityOperationType;
    date: string;
    startTime: LocalTime;
    endTime: LocalTime;
    locationEntity?: LocationEntity;
    providerEntity?: ProviderEntity;
};

export namespace AvailabilityByDate {

    export enum availabilityPresenceType {
        IN_PERSON = 'IN_PERSON',
        VIRTUAL = 'VIRTUAL',
    }

    export enum availabilityOperationType {
        ADD = 'ADD',
        REMOVE = 'REMOVE',
    }


}

