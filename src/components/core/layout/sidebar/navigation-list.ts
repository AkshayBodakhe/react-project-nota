import * as Icons from "@mui/icons-material";
import { Permission } from "../../../common/enums-and-interfaces/enums";

export const iconMapping: Record<string, React.ElementType> = {
  Accessible: Icons.Accessible,
  AttachMoney: Icons.AttachMoney,
  Event: Icons.Event,
  Home: Icons.Home,
  Settings: Icons.Settings,
  Task: Icons.Task,
  Groups: Icons.Groups,
  Bed: Icons.AllInbox,
  Person2: Icons.Person2,
  ManageAccounts: Icons.ManageAccounts,
  Communications2: Icons.SmsRounded,
  Reports2: Icons.AssessmentRounded,
  Help2: Icons.HelpOutline,
};

interface navigationItem {
  path: string;
  name: string;
  icon: keyof typeof iconMapping;
  permission:string;
  sublist: SubList[];
}

interface SubList {
  path: string;
  name: string;
  icon: keyof typeof iconMapping;
}

export const navigationData: {
  adminNavigationData: navigationItem[];
  providerNavigationData: any[];
  patientNavigationData: any;
} = {
  adminNavigationData: [
    {
      path: "/admin/dashboard",
      name: "Dashboard",
      icon: "Home",
      permission:Permission.DASHBOARD,
      sublist: [],
    },
    {
      path: "/admin/provider-groups",
      name: "Provider Groups",
      icon: "Groups",
      permission:Permission.PROVIDER_GROUP,
      sublist: [],
    },
    {
      path: "/admin/master",
      name: "Master",
      icon: "Bed",
      permission:Permission.MASTERS,
      sublist: [],
    },
    // {
    //   path: "/admin/analytic-reports",
    //   name: "Analytic/Reports",
    //   icon: "Bed",
    //   sublist: [],
    // },
    {
      path: "/admin/settings/",
      name: "Settings",
      icon: "Settings",
      permission:"",
      sublist: [
        {
          path: "profile",
          name: "Profile",
          icon: "Person2",
        },
        {
          path: "admin-user",
          name: "Admin User",
          icon: "ManageAccounts",
        },
        {
          path: "roles-responsibility",
          name: "Roles & Responsibility",
          icon: "ManageAccounts",
        },
        {
          path: "audit-log",
          name: "Audit Log",
          icon: "ManageAccounts",
        },
      ],
    },
  ],
  providerNavigationData: [
    {
      path: "/provider/home",
      name: "Dashboard",
      icon: "Home",
      permission:Permission.DASHBOARD,
      sublist: [],
    },
    {
      path: "/provider/appointment/calendar",
      name: "Scheduling",
      icon: "Task",
      permission:Permission.APPOINTMENT,
      sublist: [
        // {
        //   // supeListName: "Appointments",
        // },
        // {
        //   path: "calendar",
        //   name: "Calendar",
        //   icon: "calendar",
        // },
        // {
        //   path: "appointments",
        //   name: "Appointments",
        //   icon: "appointments",
        // },
        // {
        //   path: "tasks",
        //   name: "Open Tasks",
        //   icon: "open-task",
        // },
        // {
        //   path: "availability",
        //   name: "Availability",
        //   icon: "availability",
        // },
        // {
        //   path: "appointment-status",
        //   name: "Appointment Status",
        //   icon: "appointment-status",
        // },
        // {
        //   path: "referrals",
        //   name: "Referrals",
        //   icon: "referrals",
        // },
      ],
    },

    {
      path: "/provider/patients",
      name: "Patients",
      icon: "Accessible",
      permission:Permission.PATIENT,
      sublist: [],
    },
    {
      path: "/provider/communications/",
      name: "Communications",
      icon: "Communications2",
      permission:"",
      sublist: [
        {
          // supeListName: "Communications",
        },
        {
          path: "tasks",
          name: "Tasks",
          icon: "task",
        },
        // {
        //   path: "fax",
        //   name: "Fax",
        //   icon: "fax",
        // },
        {
          path: "group-messages",
          name: "Group Messages",
          icon: "group-messages",
        },
        {
          path: "contact-dictionary",
          name: "Contact Directory",
          icon: "contact-dictionary",
        },
      ],
    },
    // {
    //   path: "/provider/billing",
    //   name: "Billing",
    //   icon: "billing",
    //   sublist: [
    //     {
    //       // supeListName: "Billing",
    //     },
    //     {
    //       path: "/superbill",
    //       name: "Super Bill",
    //       icon: "Person2",
    //     },
    //     {
    //       path: "/claims",
    //       name: "Claims",
    //       icon: "Person2",
    //     },
    //     {
    //       path: "/account-receivable",
    //       name: "Account Receivable",
    //       icon: "Person2",
    //     },
    //     {
    //       path: "/patient-payment",
    //       name: "Patient Payment",
    //       icon: "Person2",
    //     },
    //     // {
    //     //   path: "/payment/insurance",
    //     //   name: "Insurance Payment",
    //     //   icon: "Person2",
    //     // },
    //     {
    //       path: "/fee-schedule",
    //       name: "Fee Schedule",
    //       icon: "Person2",
    //     },
    //     // {
    //     //   path: "/invoices",
    //     //   name: "Invoice",
    //     //   icon: "Person2",
    //     // },
    //     // {
    //     //   path: "/statements",
    //     //   name: "Statements",
    //     //   icon: "Person2",
    //     // },
    //   ],
    // },
    // {
    //   path: "/provider/referral",
    //   name: "Referral",
    //   icon: "Referral",
    //   sublist: [],
    // },
    // {
    //   path: "/provider/reports",
    //   name: "Reports",
    //   icon: "Reports",
    //   sublist: [
    //     {
    //       // supeListName: "Provider Settings",
    //     },
    //     {
    //       path: "/appointment-report",
    //       name: "Appointment Report",
    //       icon: "Person2",
    //     },
    //     {
    //       path: "/patient-report",
    //       name: "Patient Report",
    //       icon: "Person2",
    //     },
    //     {
    //       path: "/medication-report",
    //       name: "Medication Report",
    //       icon: "Person2",
    //     },
    //     {
    //       path: "/Problem-report",
    //       name: "Problem-report",
    //       icon: "Person2",
    //     },
    //     {
    //       path: "/Allergy-report",
    //       name: "Allergy-report",
    //       icon: "Person2",
    //     },
    //     {
    //       path: "/patient-insurance-authorization",
    //       name: "Patient Insurance Authorization",
    //       icon: "Person2",
    //     },
    //   ],
    // },
    // {
    //   path: "/provider/documents",
    //   name: "Documents",
    //   icon: "Documents",
    //   sublist: [],
    // },
    {
      path: "/provider/unsigned-visit",
      name: "Unsigned Visit",
      icon: "Unsigned Visit",
      permission:Permission.UNSIGNED_VISIT,
      sublist: [],
    },
    {
      path: "/provider/reports",
      name: "Reports",
      icon: "Reports",
      permission:Permission.CLINICAL_REPORT,
      sublist: [],
    },
    {
      path: "/provider/settings",
      name: "Settings",
      icon: "Settings",
      permission:"",
      sublist: [],
    },
    // {
    //   path: "/provider/help/",
    //   name: "Reports",
    //   icon: "Help2",
    // sublist: [
    //   {
    //     supeListName: "Help",
    //   },
    //   {
    //     path: "support-center",
    //     name: "Support Center",
    //     icon: "support-center",
    //   },
    //   {
    //     path: "training-videos",
    //     name: "Training Videos",
    //     icon: "training-videos",
    //   },
    //   {
    //     path: "daily-live-demos",
    //     name: "Daily Live Demos",
    //     icon: "daily-live-demos",
    //   },
    //   {
    //     path: "feature-updates",
    //     name: "Feature Updates",
    //     icon: "feature-updates",
    //   },
    // ],
    // sublist: [],
    //},
    // {
    //   path: "/provider/help/",
    //   name: "Settings",
    //   icon: "Help2",
    // sublist: [
    //   {
    //     supeListName: "Help",
    //   },
    //   {
    //     path: "support-center",
    //     name: "Support Center",
    //     icon: "support-center",
    //   },
    //   {
    //     path: "training-videos",
    //     name: "Training Videos",
    //     icon: "training-videos",
    //   },
    //   {
    //     path: "daily-live-demos",
    //     name: "Daily Live Demos",
    //     icon: "daily-live-demos",
    //   },
    //   {
    //     path: "feature-updates",
    //     name: "Feature Updates",
    //     icon: "feature-updates",
    //   },
    // ],
    // sublist: [],
    //}
  ],
  patientNavigationData: [
    {
      path: "/patient/appointments",
      name: "Appointments",
      icon: "Appointment",
      sublist: [],
    },
    {
      path: "/patient/providers",
      name: "Providers",
      icon: "Appointment",
      sublist: [],
    },
    {
      path: "/patient/documents",
      name: "Documents",
      icon: "Appointment",
      sublist: [],
    },
    {
      path: "/patient/health-record",
      name: "Health Record",
      icon: "Appointment",
      sublist: [],
    },
    {
      path: "/patient/notifications",
      name: "Notification",
      icon: "Appointment",
      sublist: [],
    },
  ],
};
