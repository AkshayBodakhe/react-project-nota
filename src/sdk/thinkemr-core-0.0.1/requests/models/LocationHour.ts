/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type LocationHour = {
    id?: number;
    dayOfWeek: LocationHour.dayOfWeek;
    openingTime: string;
    closingTime: string;
};

export namespace LocationHour {

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

