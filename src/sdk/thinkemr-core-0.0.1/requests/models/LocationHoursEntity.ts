/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type LocationHoursEntity = {
    id?: number;
    dayOfWeek?: LocationHoursEntity.dayOfWeek;
    openingTime?: string;
    closingTime?: string;
};

export namespace LocationHoursEntity {

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

