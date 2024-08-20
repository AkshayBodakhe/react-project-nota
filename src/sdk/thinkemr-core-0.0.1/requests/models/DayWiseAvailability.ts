/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalTime } from './LocalTime';

export type DayWiseAvailability = {
    dayOfWeek: DayWiseAvailability.dayOfWeek;
    startTime: LocalTime;
    endTime: LocalTime;
};

export namespace DayWiseAvailability {

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

