/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PaymentCard = {
    uuid?: string;
    cardHolderFirstName: string;
    cardHolderLastName: string;
    customerId: string;
    cardId: string;
    vendor: string;
    cardType: string;
    cardExp: string;
    lastFour: string;
    cardMode: string;
    active?: boolean;
};

