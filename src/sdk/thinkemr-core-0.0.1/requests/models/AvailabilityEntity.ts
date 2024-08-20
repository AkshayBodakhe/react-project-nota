/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BlockDayEntity } from './BlockDayEntity';
import type { DayWiseAvailabilityEntity } from './DayWiseAvailabilityEntity';
import type { LocationEntity } from './LocationEntity';
import type { ProviderEntity } from './ProviderEntity';

export type AvailabilityEntity = {
    createdBy?: string;
    modifiedBy?: string;
    created?: string;
    modified?: string;
    id?: number;
    availabilityPresenceType?: AvailabilityEntity.availabilityPresenceType;
    dayWiseAvailabilityEntitySet?: Array<DayWiseAvailabilityEntity>;
    blockDayEntitySet?: Array<BlockDayEntity>;
    providerEntity?: ProviderEntity;
    locationEntity?: LocationEntity;
    uuid?: string;
    initialConsultTime?: number;
    followUpConsultTime?: number;
    minScheduleNoticeInput?: number;
    schedulingNoticeInputType?: AvailabilityEntity.schedulingNoticeInputType;
    eventBuffer?: number;
    bookingWindow?: AvailabilityEntity.bookingWindow;
    bookingWindowTimeZone?: AvailabilityEntity.bookingWindowTimeZone;
    bookingWindowStart?: string;
    bookingWindowEnd?: string;
};

export namespace AvailabilityEntity {

    export enum availabilityPresenceType {
        IN_PERSON = 'IN_PERSON',
        VIRTUAL = 'VIRTUAL',
    }

    export enum schedulingNoticeInputType {
        HOURS_AWAY = 'HOURS_AWAY',
        MINUTE_AWAY = 'MINUTE_AWAY',
        DAY_AWAY = 'DAY_AWAY',
    }

    export enum bookingWindow {
        ONE_WEEK = 'ONE_WEEK',
        TWO_WEEK = 'TWO_WEEK',
        THREE_WEEK = 'THREE_WEEK',
        FOUR_WEEK = 'FOUR_WEEK',
        FIVE_WEEK = 'FIVE_WEEK',
        SIX_WEEK = 'SIX_WEEK',
        TWELVE_WEEK = 'TWELVE_WEEK',
        TWENTY_SIX_WEEK = 'TWENTY_SIX_WEEK',
        FIFTY_TWO_WEEK = 'FIFTY_TWO_WEEK',
    }

    export enum bookingWindowTimeZone {
        EST = 'EST',
        CT = 'CT',
        MT = 'MT',
        PT = 'PT',
        AKT = 'AKT',
        HST = 'HST',
        HAST = 'HAST',
        MST = 'MST',
        IST = 'IST',
    }


}

