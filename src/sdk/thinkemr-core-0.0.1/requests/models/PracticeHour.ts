/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PracticeHour = {
    id?: number;
    dayOfWeek: PracticeHour.dayOfWeek;
    openingTime: string;
    closingTime: string;
};

export namespace PracticeHour {

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

