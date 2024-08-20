/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AvailabilityRequest = {
    virtual?: boolean;
    inPerson?: boolean;
    providerUserUUID?: string;
    locationUuidSet?: Array<string>;
    month: AvailabilityRequest.month;
    year: number;
};

export namespace AvailabilityRequest {

    export enum month {
        JANUARY = 'JANUARY',
        FEBRUARY = 'FEBRUARY',
        MARCH = 'MARCH',
        APRIL = 'APRIL',
        MAY = 'MAY',
        JUNE = 'JUNE',
        JULY = 'JULY',
        AUGUST = 'AUGUST',
        SEPTEMBER = 'SEPTEMBER',
        OCTOBER = 'OCTOBER',
        NOVEMBER = 'NOVEMBER',
        DECEMBER = 'DECEMBER',
    }


}

