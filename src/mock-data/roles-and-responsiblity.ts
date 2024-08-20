export const rolesAndResponsiblityData = {
  date: "2023-07-27T10:31:19.791+00:00",
  code: "OK",
  message: "Provider groups roles fetched successfully",
  data: {
    Specialist: [
      {
        iamRoleId: "3cdbd115-c204-4030-acf9-d3ef9ea7db2b",
        roleName: "BILLER",
        displayName: "Biller",
        description:
          "It will have permission to create,edit,cancel and view appointments.",
        default: true,
        permission: "Create Edit Cancel View Appointment",
      },

      {
        iamRoleId: "ea2c27b0-01f2-47fd-be17-5448ee64747f",
        roleName: "STAFF",
        displayName: "Staff",
        description: "It will have permission to view appointment with notes.",
        default: false,
        permission: "View Appointment With Notes",
      },
      {
        iamRoleId: "ea2c27b0-01f2-47fd-be17-5448ee64747f",
        roleName: "STAFF",
        displayName: "Staff",
        description:
          "It will have permission to charge amount for an appointment.",
        default: false,
        permission: "Charge Appointment",
      },
    ],
    Patient: [
      {
        iamRoleId: "b1c01436-4674-42ff-95af-bc61436489ea",
        roleName: "PROVIDER",
        displayName: "Provider",
        description:
          "It will have permission to create inpatient rounding appointment.",
        default: false,
        status: true,
        permission: "Create Edit Cancel View Appointment",
      },
      {
        iamRoleId: "4e5ebbe2-28cc-49e8-a4a6-ca3e7236fa69",
        roleName: "NURSE",
        displayName: "Nurse",
        description:
          "It will have permission to create, edit,cancel and view appointment.",
        default: false,
        permission: "Create Edit Cancel View Appointment",
      },
    ],
    Appointments: [
      {
        iamRoleId: "b1c01436-4674-42ff-95af-bc61436489ea",
        roleName: "PROVIDER",
        displayName: "Provider",
        description:
          "It will have permission to create inpatient rounding appointment.",
        default: false,
        permission: "Create Edit Cancel View Appointment",
      },
      {
        iamRoleId: "4e5ebbe2-28cc-49e8-a4a6-ca3e7236fa69",
        roleName: "NURSE",
        displayName: "Nurse",
        description:
          "It will have permission to create, edit,cancel and view appointment.",
        default: false,
        permission: "Create Edit Cancel View Appointment",
      },
    ],
    Users: [
      {
        iamRoleId: "b1c01436-4674-42ff-95af-bc61436489ea",
        roleName: "PROVIDER",
        displayName: "Provider",
        description:
          "It will have permission to create inpatient rounding appointment.",
        default: false,
        permission: "Create Edit Cancel View Appointment",
      },
      {
        iamRoleId: "4e5ebbe2-28cc-49e8-a4a6-ca3e7236fa69",
        roleName: "NURSE",
        displayName: "Nurse",
        description:
          "It will have permission to create, edit,cancel and view appointment.",
        default: false,
        permission: "Create Edit Cancel View Appointment",
      },
    ],
    Settings: [
      {
        iamRoleId: "6c222ce9-1331-4cb6-ab12-6afd7f61abc0",
        roleName: "PROVIDER_ADMIN",
        displayName: "Provider admin",
        description:
          "It will have permission to create, edit,cancel and view appointment.",
        default: false,
        permission: "View Appointment With Notes",
      },
    ],
  },
  path: "/api/admin/roles/categories",
  requestId: "4f774244-43cf-4b82-8327-0bb9e290dfaf",
  version: "1.0",
};

export const RoleTypeList = [
  {
    iamRoleId: "6c222ce9-1331-4cb6-ab12-6afd7f61abc0",
    roleName: "SPECIALIST",
    displayName: "Specialist",
  },
  {
    iamRoleId: "3cdbd115-c204-4030-acf9-d3ef9ea7db2b",
    roleName: "ADMIN",
    displayName: "Admin",
  },
  {
    iamRoleId: "4e5ebbe2-28cc-49e8-a4a6-ca3e7236fa69",
    roleName: "FACILITY",
    displayName: "Facility",
  },
  {
    iamRoleId: "b1c01436-4674-42ff-95af-bc61436489ea",
    roleName: "PATIENT",
    displayName: "Patient",
  },
];

export const permissionsData = {
  date: "2023-08-07T14:15:42.252+00:00",
  code: "OK",
  message: "Provider groups roles permission fetched successfully",
  data: [
    {
      id: 1,
      module: "APPOINTMENT",
      permission: "View the appointment",
      description: "It will have permission to view the appointment",
      iamScopeKey: "APPOINTMENT_READ",
    },
    {
      id: 2,
      module: "APPOINTMENT",
      permission: "Create update and cancel the appointment",
      description:
        "It will have permission to create edit and cancel the appointment",
      iamScopeKey: "APPOINTMENT_WRITE",
    },
    {
      id: 3,
      module: "PROVIDER_GROUP",
      permission: "View the provider group",
      description: "It will have permission to view the provider group",
      iamScopeKey: "PROVIDER_GROUP_READ",
    },
    {
      id: 4,
      module: "PROVIDER_GROUP",
      permission: "Create update and delete the provider group",
      description: "It will have permission to create the provider group",
      iamScopeKey: "PROVIDER_GROUP_WRITE",
    },
    {
      id: 5,
      module: "PATIENT",
      permission: "View the patient",
      description: "It will have permission to view the patient",
      iamScopeKey: "PATIENT_READ",
    },
    {
      id: 6,
      module: "PATIENT",
      permission: "Create update and delete the patient",
      description:
        "It will have permission to create edit and delete the particular patient in the provider group",
      iamScopeKey: "PATIENT_WRITE",
    },
    {
      id: 7,
      module: "FINANCIAL",
      permission: "View the billing/financial details",
      description:
        "It will have permission to view the provider group billing/financial details",
      iamScopeKey: "FINANCIAL_READ",
    },
    {
      id: 8,
      module: "FINANCIAL",
      permission: "View create and edit the billing/financial details",
      description:
        "It will have permission to create update and delete the billing/financial details",
      iamScopeKey: "FINANCIAL_WRITE",
    },
    {
      id: 9,
      module: "OPEN_TASK",
      permission: "View open task",
      description: "It will have permission to view the open tasks",
      iamScopeKey: "OPEN_TASK_READ",
    },
    {
      id: 10,
      module: "OPEN_TASK",
      permission: "Create and update the open tasks",
      description:
        "It will have permission to create and update the open tasks",
      iamScopeKey: "OPEN_TASK_WRITE",
    },
  ],
  path: "/api/admin/roles/permissions",
  requestId: "b0d0516c-7e03-467a-a662-c1711f561cd7",
  version: "1.0",
};
