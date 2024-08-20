/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalTime } from './LocalTime';

export type DayWiseAvailabilityEntity = {
    createdBy?: string;
    modifiedBy?: string;
    created?: string;
    modified?: string;
    id?: number;
    availabilityEntityId?: number;
    dayOfWeek?: DayWiseAvailabilityEntity.dayOfWeek;
    startTime?: LocalTime;
    endTime?: LocalTime;
};

export namespace DayWiseAvailabilityEntity {

    export enum dayOfWeek {
        MONDAY = 'MONDAY',
        TUESDAY = 'TUESDAY',
        WEDNESDAY = 'WEDNESDAY',
        THURSDAY = 'THURSDAY',
        FRIDAY = 'FRIDAY',
        SATURDAY = 'SATURDAY',
        SUNDAY = 'SUNDAY',
    }


}

