/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BlockDay } from './BlockDay';
import type { DayWiseAvailability } from './DayWiseAvailability';
import type { LocationEntity } from './LocationEntity';
import type { ProviderEntity } from './ProviderEntity';

export type Availability = {
    availabilityPresenceType: Availability.availabilityPresenceType;
    locationUuid?: string;
    providerUserUuid?: string;
    dayWiseAvailabilityEntitySet?: Array<DayWiseAvailability>;
    blockDayEntitySet?: Array<BlockDay>;
    initialConsultTime?: number;
    followUpConsultTime?: number;
    minScheduleNoticeInput?: number;
    schedulingNoticeInputType?: Availability.schedulingNoticeInputType;
    eventBuffer?: number;
    bookingWindow: Availability.bookingWindow;
    bookingWindowTimeZone: Availability.bookingWindowTimeZone;
    providerEntity?: ProviderEntity;
    locationEntity?: LocationEntity;
};

export namespace Availability {

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

