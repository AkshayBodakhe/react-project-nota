import { Data } from "../pages/app/provider/common-files/interfaces";

export const notifications: Data[] = [
  {
    title: "A reminer 10 minutes before scheduled appointment",
    push: true,
    text: false,
    email: true,
  },
  {
    title: "Patient books an appointment",
    push: false,
    text: true,
    email: false,
  },
  {
    title: "Patient cancel appointment",
    push: true,
    text: false,
    email: true,
  },
  {
    title: "Patient check in notification",
    push: false,
    text: true,
    email: false,
  },
  {
    title: "Patient Payemnt notification",
    push: true,
    text: false,
    email: true,
  },
  {
    title: "A schedule payment from patient successfull",
    push: false,
    text: true,
    email: false,
  },
];

export const form: Data[] = [
  {
    title: "Patient attempts to cancel an appointment.",
    push: true,
    text: false,
    email: true,
  },
];

export const note: Data[] = [
  {
    title: "Patient note is assigned to me.",
    push: true,
    text: false,
    email: true,
  },
  {
    title: "Appointment is missing a note.",
    push: true,
    text: false,
    email: true,
  },
];

export const invoice: Data[] = [
  {
    title: "Patient attempts to cancel an appointment.",
    push: true,
    text: false,
    email: true,
  },
];

export const claim: Data[] = [
  {
    title: "Patient note is assigned to me.",
    push: true,
    text: false,
    email: true,
  },
  {
    title: "Patient note is assigned to me.",
    push: true,
    text: false,
    email: true,
  },
  {
    title: "Patient note is assigned to me.",
    push: true,
    text: false,
    email: true,
  },
];
