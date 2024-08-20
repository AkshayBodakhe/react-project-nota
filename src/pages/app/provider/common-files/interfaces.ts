import { AccountsType } from "./enums";

export interface Types {
    type: AccountsType;
}

export interface Data {
    title: string;
    push: boolean;
    text: boolean;
    email: boolean;
}