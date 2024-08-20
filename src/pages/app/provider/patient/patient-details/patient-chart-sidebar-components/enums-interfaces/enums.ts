export enum MedicationType {
    ACTIVE = 'Active',
    PENDING = 'Pending',
    PAST = 'Past'
}

export enum VaccineFormType {
    ADMINISTERED = 'ADMINISTERED',
    HISTORICAL = 'HISTORICAL',
    REFUSED_NOT_ADMINISTERED = 'Refused Or Not Administered'
}

export enum VitalTypes {
    BLOOD_PRESSURE = 'bloodPressure',
    BODY_MASS_INDEX = 'bodyMassIndex',
    HEART_RATE = 'heartRate',
    RESPIRATORY_RATE = 'respiratoryRate',
    OXYGEN_SATURATION = 'Oxygen Saturation',
    PULSE_RATE = 'Pulse Rate',
    HEIGHT = 'Height',
    TEMPERATURE = 'Temperature',
    WEIGHT = 'Weight'
}

export enum LabType {
    LAB_ORDER = 'labOrder',
    LAB_RESULT = 'labResult'
}

export enum BillType {
    PATIENT = 'PATIENT',
    PROVIDER = 'PROVIDER',
    INSURANCE = 'INSURANCE'
}

export enum OrderFormType {
    ADD_RESULT = 'addResult',
    EDIT_ORDER = 'editOrder',
    DELETE_ORDER = 'deleteOrder',
    PRINT_ORDER = 'printOrder',
    FAX_ORDER = 'faxOrder',
    MARK_AS_COMPLETED = 'maekAdCompleted'
}

export enum ResultFormType {
    REVIEW = 'review',
    EDIT_LAB_RESULT = 'editLabResult',
    EXPORT_AS_PDF = 'exportAsPDF',
    FAX = 'fax',
    DELETE = 'delete'
}

export enum ResultUploadOptions {
    WITHOUT_LAB_ORDER = 'Upload result without lab order',
    EXISTING_LAB_ORDER = 'Associate result with existing lab order'
}

export enum DocumentFormType {
    UPLOAD_DOCUMENT = 'uploadDocument',
    MANAGE_DOCUMENT_TYPE = 'manageDocumentType',
    INTAKE_FORM = 'intakeForm'
}

export enum PatientBillingType {
    ENCOUNTERS_FOR_BILLING = 'Encounters For Billing',
    SUPER_BILL = 'Superbill',
    CLAIMS = 'Claims',
    RECEIPTS = 'Receipts',
    PATIENT_PAYMENT = 'Patient Payment',
    INSURANCE_PAYMENT = 'Insurance Payment'
}

export enum PatientEncounterAction {
    GENERATE_SUPERBILL = 'Generate SuperBill',
    BILLING_NOT_REQUIRED = 'Billing Not Required',
    VIEW_SUMMARY = 'View Summary'
}

export enum PatientSuperBillAction {
    VIEW_DETAILS = 'View Details',
    EDIT_BILL = 'Edit Bill',
    PRINT_BILL = 'Print Bill',
    GENERATE_CLAIM = 'Generate Claim',
    ADD_PAYMENT = 'Add Payment'
}

export enum PatientClaimsAction {
    VIEW_CLAIM = 'View Claim',
    EDIT_CLAIM = 'Edit Claim',
    CHANGE_STATUS = 'Change Status',
    FAX_CLAIM = 'Fax Claim',
    ADD_PAYMENT = 'Add Payment',
    PRINT_CLAIM = 'Print Claim Data On CMS 1500 Form',
    SHOW_EOB = 'Show EOB (2)',
    SECONDARY_CLAIM = 'Generate Secondary Claim',
    DELETE_CLAIM = 'Delete Claim'
}

export enum ReceiptsAction {
    VIEW_DETAILS = 'View Details',
    ADD_VIEW_NOTES = 'Add/View Notes',
    DELETE = 'Delete'
}