import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from "@tanstack/react-query";
import { Vaccine } from "../requests/models/Vaccine";
import { UserEntity } from "../requests/models/UserEntity";
import { User } from "../requests/models/User";
import { TestsData } from "../requests/models/TestsData";
import { Superbill } from "../requests/models/Superbill";
import { Subjective } from "../requests/models/Subjective";
import { StickyNotes } from "../requests/models/StickyNotes";
import { Staff } from "../requests/models/Staff";
import { SseEmitter } from "../requests/models/SseEmitter";
import { SpecialityEntity } from "../requests/models/SpecialityEntity";
import { Speciality } from "../requests/models/Speciality";
import { SetPasswordRequest } from "../requests/models/SetPasswordRequest";
import { SetPasswordEmailRequest } from "../requests/models/SetPasswordEmailRequest";
import { SendEmailForgotPasswordRequest } from "../requests/models/SendEmailForgotPasswordRequest";
import { RolesEntity } from "../requests/models/RolesEntity";
import { Roles } from "../requests/models/Roles";
import { ReviewOfSystem } from "../requests/models/ReviewOfSystem";
import { Response } from "../requests/models/Response";
import { ResetPasswordRequest } from "../requests/models/ResetPasswordRequest";
import { RefreshTokenRequest } from "../requests/models/RefreshTokenRequest";
import { ProviderRating } from "../requests/models/ProviderRating";
import { ProviderProfileInfoEntity } from "../requests/models/ProviderProfileInfoEntity";
import { ProviderProfileInfo } from "../requests/models/ProviderProfileInfo";
import { ProviderGroupEntity } from "../requests/models/ProviderGroupEntity";
import { ProviderGroup } from "../requests/models/ProviderGroup";
import { ProviderEntity } from "../requests/models/ProviderEntity";
import { Provider } from "../requests/models/Provider";
import { Problem } from "../requests/models/Problem";
import { PracticeHoursEntity } from "../requests/models/PracticeHoursEntity";
import { PracticeHour } from "../requests/models/PracticeHour";
import { PhysicalExam } from "../requests/models/PhysicalExam";
import { PharmacyStore } from "../requests/models/PharmacyStore";
import { PermissionsEntity } from "../requests/models/PermissionsEntity";
import { Permissions } from "../requests/models/Permissions";
import { PaymentCard } from "../requests/models/PaymentCard";
import { PatientVitalRequest } from "../requests/models/PatientVitalRequest";
import { PatientVital } from "../requests/models/PatientVital";
import { PatientVaccine } from "../requests/models/PatientVaccine";
import { PatientSocialHistory } from "../requests/models/PatientSocialHistory";
import { PatientProblem } from "../requests/models/PatientProblem";
import { PatientPermissionEntity } from "../requests/models/PatientPermissionEntity";
import { PatientPermission } from "../requests/models/PatientPermission";
import { PatientPayment } from "../requests/models/PatientPayment";
import { PatientPastSurgicalHistory } from "../requests/models/PatientPastSurgicalHistory";
import { PatientPastMedicalHistory } from "../requests/models/PatientPastMedicalHistory";
import { PatientMedication } from "../requests/models/PatientMedication";
import { PatientLabResult } from "../requests/models/PatientLabResult";
import { PatientLabOrder } from "../requests/models/PatientLabOrder";
import { PatientInfo } from "../requests/models/PatientInfo";
import { PatientImageResult } from "../requests/models/PatientImageResult";
import { PatientImageOrder } from "../requests/models/PatientImageOrder";
import { PatientFlagsEntity } from "../requests/models/PatientFlagsEntity";
import { PatientFlags } from "../requests/models/PatientFlags";
import { PatientFamilyHistory } from "../requests/models/PatientFamilyHistory";
import { PatientEntity } from "../requests/models/PatientEntity";
import { PatientClinicalRequest } from "../requests/models/PatientClinicalRequest";
import { PatientAuthorization } from "../requests/models/PatientAuthorization";
import { PatientAllergy } from "../requests/models/PatientAllergy";
import { Patient } from "../requests/models/Patient";
import { PasswordChangeRequest } from "../requests/models/PasswordChangeRequest";
import { Pageable } from "../requests/models/Pageable";
import { OutgoingMessagesRequest } from "../requests/models/OutgoingMessagesRequest";
import { OrderedUser } from "../requests/models/OrderedUser";
import { OrderStudies } from "../requests/models/OrderStudies";
import { OrderSet } from "../requests/models/OrderSet";
import { OpenTask } from "../requests/models/OpenTask";
import { Objective } from "../requests/models/Objective";
import { Notification } from "../requests/models/Notification";
import { Macros } from "../requests/models/Macros";
import { LogoutRequest } from "../requests/models/LogoutRequest";
import { LocationHoursEntity } from "../requests/models/LocationHoursEntity";
import { LocationHour } from "../requests/models/LocationHour";
import { LocationEntity } from "../requests/models/LocationEntity";
import { Location } from "../requests/models/Location";
import { LocalTime } from "../requests/models/LocalTime";
import { LanguageEntity } from "../requests/models/LanguageEntity";
import { Language } from "../requests/models/Language";
import { JsonNode } from "../requests/models/JsonNode";
import { IntakeVaccine } from "../requests/models/IntakeVaccine";
import { IntakeProblem } from "../requests/models/IntakeProblem";
import { IntakePatientSocialHistory } from "../requests/models/IntakePatientSocialHistory";
import { IntakePatientMedicalHistory } from "../requests/models/IntakePatientMedicalHistory";
import { IntakePatientFamilyHistory } from "../requests/models/IntakePatientFamilyHistory";
import { IntakeMedication } from "../requests/models/IntakeMedication";
import { IntakeForm } from "../requests/models/IntakeForm";
import { IntakeAllergy } from "../requests/models/IntakeAllergy";
import { InsurancePolicyHolder } from "../requests/models/InsurancePolicyHolder";
import { InsurancePayerEntity } from "../requests/models/InsurancePayerEntity";
import { InsurancePayer } from "../requests/models/InsurancePayer";
import { InsuranceClaim } from "../requests/models/InsuranceClaim";
import { Insurance } from "../requests/models/Insurance";
import { ImageOrderSet } from "../requests/models/ImageOrderSet";
import { ImageCentres } from "../requests/models/ImageCentres";
import { HistoryQuestions } from "../requests/models/HistoryQuestions";
import { HistoryOfPresentIllness } from "../requests/models/HistoryOfPresentIllness";
import { ForgotPasswordEmailRequest } from "../requests/models/ForgotPasswordEmailRequest";
import { FetchSlotsRequest } from "../requests/models/FetchSlotsRequest";
import { FeeSchedule } from "../requests/models/FeeSchedule";
import { FamilyMember } from "../requests/models/FamilyMember";
import { EncounterUpdateRequest } from "../requests/models/EncounterUpdateRequest";
import { EncounterRequest } from "../requests/models/EncounterRequest";
import { EncounterProcedure } from "../requests/models/EncounterProcedure";
import { EncounterPlan } from "../requests/models/EncounterPlan";
import { EncounterDocumentResponse } from "../requests/models/EncounterDocumentResponse";
import { EncounterDetailsRequestAndResponseCarePortal } from "../requests/models/EncounterDetailsRequestAndResponseCarePortal";
import { EncounterDetailsRequest } from "../requests/models/EncounterDetailsRequest";
import { Encounter } from "../requests/models/Encounter";
import { EducationLevelData } from "../requests/models/EducationLevelData";
import { EducationLevel } from "../requests/models/EducationLevel";
import { DuplicateCustomFormRequest } from "../requests/models/DuplicateCustomFormRequest";
import { DrugCatalog } from "../requests/models/DrugCatalog";
import { DocumentTypes } from "../requests/models/DocumentTypes";
import { DiagnosticCentre } from "../requests/models/DiagnosticCentre";
import { DepartmentEntity } from "../requests/models/DepartmentEntity";
import { Department } from "../requests/models/Department";
import { DayWiseAvailabilityEntity } from "../requests/models/DayWiseAvailabilityEntity";
import { DayWiseAvailability } from "../requests/models/DayWiseAvailability";
import { CustomTemplateRequest } from "../requests/models/CustomTemplateRequest";
import { CustomFormResponse } from "../requests/models/CustomFormResponse";
import { CustomFormRequest } from "../requests/models/CustomFormRequest";
import { CurrenciesEntity } from "../requests/models/CurrenciesEntity";
import { Currencies } from "../requests/models/Currencies";
import { CountryEntity } from "../requests/models/CountryEntity";
import { Country } from "../requests/models/Country";
import { ContactDirectoryEntity } from "../requests/models/ContactDirectoryEntity";
import { ContactDirectory } from "../requests/models/ContactDirectory";
import { ConsentForm } from "../requests/models/ConsentForm";
import { CommunicationGroups } from "../requests/models/CommunicationGroups";
import { CloneEncounterRequest } from "../requests/models/CloneEncounterRequest";
import { CarePatientChart } from "../requests/models/CarePatientChart";
import { CancelAppointmentRequest } from "../requests/models/CancelAppointmentRequest";
import { BookPatientAppointmentRequest } from "../requests/models/BookPatientAppointmentRequest";
import { BookAppointmentRequest } from "../requests/models/BookAppointmentRequest";
import { BlockDayEntity } from "../requests/models/BlockDayEntity";
import { BlockDay } from "../requests/models/BlockDay";
import { BillingCodes } from "../requests/models/BillingCodes";
import { AvailabilityRequest } from "../requests/models/AvailabilityRequest";
import { AvailabilityEntity } from "../requests/models/AvailabilityEntity";
import { AvailabilityByDate } from "../requests/models/AvailabilityByDate";
import { Availability } from "../requests/models/Availability";
import { AuthRequest } from "../requests/models/AuthRequest";
import { AttachPatientFlagRequest } from "../requests/models/AttachPatientFlagRequest";
import { Assessment } from "../requests/models/Assessment";
import { AppointmentListRequest } from "../requests/models/AppointmentListRequest";
import { AppointmentListLocationRequest } from "../requests/models/AppointmentListLocationRequest";
import { AppointmentColorConfiguration } from "../requests/models/AppointmentColorConfiguration";
import { AppointmentClinicalRequest } from "../requests/models/AppointmentClinicalRequest";
import { AppointmentCalenderViewRequest } from "../requests/models/AppointmentCalenderViewRequest";
import { Appointment } from "../requests/models/Appointment";
import { AdministeredUser } from "../requests/models/AdministeredUser";
import { AddressEntity } from "../requests/models/AddressEntity";
import { Address } from "../requests/models/Address";
import { ZoomControllerService } from "../requests/services/ZoomControllerService";
import { VitalControllerService } from "../requests/services/VitalControllerService";
import { VaccineControllerService } from "../requests/services/VaccineControllerService";
import { UserControllerService } from "../requests/services/UserControllerService";
import { TasksControllerService } from "../requests/services/TasksControllerService";
import { StickynotesControllerService } from "../requests/services/StickynotesControllerService";
import { StaffControllerService } from "../requests/services/StaffControllerService";
import { SocialHistoryControllerService } from "../requests/services/SocialHistoryControllerService";
import { RoleControllerService } from "../requests/services/RoleControllerService";
import { ProviderNotificationsControllerService } from "../requests/services/ProviderNotificationsControllerService";
import { ProviderGroupControllerService } from "../requests/services/ProviderGroupControllerService";
import { ProviderControllerService } from "../requests/services/ProviderControllerService";
import { ProblemsControllerService } from "../requests/services/ProblemsControllerService";
import { PharmacyControllerService } from "../requests/services/PharmacyControllerService";
import { PermissionControllerService } from "../requests/services/PermissionControllerService";
import { PaymentControllerService } from "../requests/services/PaymentControllerService";
import { PatientSurgicalHistoryControllerService } from "../requests/services/PatientSurgicalHistoryControllerService";
import { PatientSocialHistoryControllerService } from "../requests/services/PatientSocialHistoryControllerService";
import { PatientPortalAccessControllerService } from "../requests/services/PatientPortalAccessControllerService";
import { PatientPaymentControllerService } from "../requests/services/PatientPaymentControllerService";
import { PatientLabResultsControllerService } from "../requests/services/PatientLabResultsControllerService";
import { PatientLabOrderControllerService } from "../requests/services/PatientLabOrderControllerService";
import { PatientImageResultControllerService } from "../requests/services/PatientImageResultControllerService";
import { PatientImageOrderControllerService } from "../requests/services/PatientImageOrderControllerService";
import { PatientFlagsControllerService } from "../requests/services/PatientFlagsControllerService";
import { PatientDocumentControllerService } from "../requests/services/PatientDocumentControllerService";
import { PatientControllerService } from "../requests/services/PatientControllerService";
import { PatientAuthorizationControllerService } from "../requests/services/PatientAuthorizationControllerService";
import { NotificationsControllerService } from "../requests/services/NotificationsControllerService";
import { MigrationControllerService } from "../requests/services/MigrationControllerService";
import { MedicationsControllerService } from "../requests/services/MedicationsControllerService";
import { MedicalHistoryControllerService } from "../requests/services/MedicalHistoryControllerService";
import { MedicalCodeControllerService } from "../requests/services/MedicalCodeControllerService";
import { MacrosControllerService } from "../requests/services/MacrosControllerService";
import { LocationControllerService } from "../requests/services/LocationControllerService";
import { IntakeFormTemplateControllerService } from "../requests/services/IntakeFormTemplateControllerService";
import { IntakeFormControllerService } from "../requests/services/IntakeFormControllerService";
import { InsuranceControllerService } from "../requests/services/InsuranceControllerService";
import { InsuranceClaimControllerService } from "../requests/services/InsuranceClaimControllerService";
import { FeeScheduleControllerService } from "../requests/services/FeeScheduleControllerService";
import { FamilyMemberControllerService } from "../requests/services/FamilyMemberControllerService";
import { FamilyHistoryControllerService } from "../requests/services/FamilyHistoryControllerService";
import { EprescriptionControllerService } from "../requests/services/EprescriptionControllerService";
import { EncounterControllerService } from "../requests/services/EncounterControllerService";
import { EncounterCarePortalControllerService } from "../requests/services/EncounterCarePortalControllerService";
import { EmailControllerService } from "../requests/services/EmailControllerService";
import { DuePaymentControllerService } from "../requests/services/DuePaymentControllerService";
import { DrugCatalogControllerService } from "../requests/services/DrugCatalogControllerService";
import { DocumentTypeControllerService } from "../requests/services/DocumentTypeControllerService";
import { DocumentControllerService } from "../requests/services/DocumentControllerService";
import { DiagnosticCentresControllerService } from "../requests/services/DiagnosticCentresControllerService";
import { DepartmentControllerService } from "../requests/services/DepartmentControllerService";
import { CustomTemplateControllerService } from "../requests/services/CustomTemplateControllerService";
import { CustomFormControllerService } from "../requests/services/CustomFormControllerService";
import { ContactDirectoryControllerService } from "../requests/services/ContactDirectoryControllerService";
import { ConsentFormControllerService } from "../requests/services/ConsentFormControllerService";
import { CommunicationControllerService } from "../requests/services/CommunicationControllerService";
import { CarePatientChartControllerService } from "../requests/services/CarePatientChartControllerService";
import { BillingControllerService } from "../requests/services/BillingControllerService";
import { AvailabilityControllerService } from "../requests/services/AvailabilityControllerService";
import { AuthorizationControllerService } from "../requests/services/AuthorizationControllerService";
import { AuditLogControllerService } from "../requests/services/AuditLogControllerService";
import { AppointmentSlotControllerService } from "../requests/services/AppointmentSlotControllerService";
import { AppointmentControllerService } from "../requests/services/AppointmentControllerService";
import { AnalyticsControllerService } from "../requests/services/AnalyticsControllerService";
import { AllergyControllerService } from "../requests/services/AllergyControllerService";
export const useZoomControllerServiceGetAuthTokenKey = "ZoomControllerServiceGetAuthToken";
export const useZoomControllerServiceGetAuthToken = <TQueryKey extends Array<unknown> = unknown[]>({ appointmentUuid }: {
    appointmentUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ZoomControllerService.getAuthToken>>, unknown, Awaited<ReturnType<typeof ZoomControllerService.getAuthToken>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useZoomControllerServiceGetAuthTokenKey, ...(queryKey ?? [{ appointmentUuid }])], queryFn: () => ZoomControllerService.getAuthToken(appointmentUuid), ...options });
export const useZoomControllerServiceSubscribeKey = "ZoomControllerServiceSubscribe";
export const useZoomControllerServiceSubscribe = <TQueryKey extends Array<unknown> = unknown[]>({ eventKey }: {
    eventKey: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ZoomControllerService.subscribe>>, unknown, Awaited<ReturnType<typeof ZoomControllerService.subscribe>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useZoomControllerServiceSubscribeKey, ...(queryKey ?? [{ eventKey }])], queryFn: () => ZoomControllerService.subscribe(eventKey), ...options });
export const useZoomControllerServiceEmitKey = "ZoomControllerServiceEmit";
export const useZoomControllerServiceEmit = <TQueryKey extends Array<unknown> = unknown[]>({ eventKey }: {
    eventKey: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ZoomControllerService.emit>>, unknown, Awaited<ReturnType<typeof ZoomControllerService.emit>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useZoomControllerServiceEmitKey, ...(queryKey ?? [{ eventKey }])], queryFn: () => ZoomControllerService.emit(eventKey), ...options });
export const useVitalControllerServiceUpdatePatientVitals = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof VitalControllerService.updatePatientVitals>>, unknown, {
    requestBody: Array<PatientVital>;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => VitalControllerService.updatePatientVitals(requestBody), ...options });
export const useVitalControllerServiceAddPatientVitals = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof VitalControllerService.addPatientVitals>>, unknown, {
    requestBody: PatientVitalRequest;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => VitalControllerService.addPatientVitals(requestBody), ...options });
export const useVitalControllerServiceViewPatientIntakeVitalsKey = "VitalControllerServiceViewPatientIntakeVitals";
export const useVitalControllerServiceViewPatientIntakeVitals = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, intakeFormUuid, intakeVitalUuid }: {
    patientUuid: string;
    intakeFormUuid: string;
    intakeVitalUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof VitalControllerService.viewPatientIntakeVitals>>, unknown, Awaited<ReturnType<typeof VitalControllerService.viewPatientIntakeVitals>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useVitalControllerServiceViewPatientIntakeVitalsKey, ...(queryKey ?? [{ patientUuid, intakeFormUuid, intakeVitalUuid }])], queryFn: () => VitalControllerService.viewPatientIntakeVitals(patientUuid, intakeFormUuid, intakeVitalUuid), ...options });
export const useVitalControllerServiceUpdatePatientIntakeVitals = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof VitalControllerService.updatePatientIntakeVitals>>, unknown, {
    patientUuid: string;
    intakeFormUuid: string;
    intakeVitalUuid: string;
    requestBody: PatientVital;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, intakeFormUuid, intakeVitalUuid, requestBody }) => VitalControllerService.updatePatientIntakeVitals(patientUuid, intakeFormUuid, intakeVitalUuid, requestBody), ...options });
export const useVitalControllerServiceArchivePatientIntakeVitals = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof VitalControllerService.archivePatientIntakeVitals>>, unknown, {
    patientUuid: string;
    intakeFormUuid: string;
    intakeVitalUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, intakeFormUuid, intakeVitalUuid }) => VitalControllerService.archivePatientIntakeVitals(patientUuid, intakeFormUuid, intakeVitalUuid), ...options });
export const useVitalControllerServiceViewPatientIntakeVitalsForPatientKey = "VitalControllerServiceViewPatientIntakeVitalsForPatient";
export const useVitalControllerServiceViewPatientIntakeVitalsForPatient = <TQueryKey extends Array<unknown> = unknown[]>({ intakeFormUuid, intakeVitalUuid }: {
    intakeFormUuid: string;
    intakeVitalUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof VitalControllerService.viewPatientIntakeVitalsForPatient>>, unknown, Awaited<ReturnType<typeof VitalControllerService.viewPatientIntakeVitalsForPatient>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useVitalControllerServiceViewPatientIntakeVitalsForPatientKey, ...(queryKey ?? [{ intakeFormUuid, intakeVitalUuid }])], queryFn: () => VitalControllerService.viewPatientIntakeVitalsForPatient(intakeFormUuid, intakeVitalUuid), ...options });
export const useVitalControllerServiceUpdatePatientIntakeVitalsForPatient = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof VitalControllerService.updatePatientIntakeVitalsForPatient>>, unknown, {
    intakeFormUuid: string;
    intakeVitalUuid: string;
    requestBody: PatientVital;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ intakeFormUuid, intakeVitalUuid, requestBody }) => VitalControllerService.updatePatientIntakeVitalsForPatient(intakeFormUuid, intakeVitalUuid, requestBody), ...options });
export const useVitalControllerServiceArchivePatientIntakeVitalsForPatient = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof VitalControllerService.archivePatientIntakeVitalsForPatient>>, unknown, {
    intakeFormUuid: string;
    intakeVitalUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ intakeFormUuid, intakeVitalUuid }) => VitalControllerService.archivePatientIntakeVitalsForPatient(intakeFormUuid, intakeVitalUuid), ...options });
export const useVitalControllerServiceAddPatientIntakeVitals = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof VitalControllerService.addPatientIntakeVitals>>, unknown, {
    patientUuid: string;
    intakeFormUuid: string;
    requestBody: PatientVital;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, intakeFormUuid, requestBody }) => VitalControllerService.addPatientIntakeVitals(patientUuid, intakeFormUuid, requestBody), ...options });
export const useVitalControllerServiceAddPatientIntakeVitalsForPatient = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof VitalControllerService.addPatientIntakeVitalsForPatient>>, unknown, {
    intakeFormUuid: string;
    requestBody: PatientVital;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ intakeFormUuid, requestBody }) => VitalControllerService.addPatientIntakeVitalsForPatient(intakeFormUuid, requestBody), ...options });
export const useVitalControllerServiceViewPatientVitalsKey = "VitalControllerServiceViewPatientVitals";
export const useVitalControllerServiceViewPatientVitals = <TQueryKey extends Array<unknown> = unknown[]>({ patientVitalUuid }: {
    patientVitalUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof VitalControllerService.viewPatientVitals>>, unknown, Awaited<ReturnType<typeof VitalControllerService.viewPatientVitals>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useVitalControllerServiceViewPatientVitalsKey, ...(queryKey ?? [{ patientVitalUuid }])], queryFn: () => VitalControllerService.viewPatientVitals(patientVitalUuid), ...options });
export const useVitalControllerServiceArchivePatientVitals = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof VitalControllerService.archivePatientVitals>>, unknown, {
    patientVitalUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientVitalUuid }) => VitalControllerService.archivePatientVitals(patientVitalUuid), ...options });
export const useVitalControllerServiceGetPatientVitalRecordsByPatientIdKey = "VitalControllerServiceGetPatientVitalRecordsByPatientId";
export const useVitalControllerServiceGetPatientVitalRecordsByPatientId = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, page, size }: {
    patientUuid: string;
    page: number;
    size: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof VitalControllerService.getPatientVitalRecordsByPatientId>>, unknown, Awaited<ReturnType<typeof VitalControllerService.getPatientVitalRecordsByPatientId>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useVitalControllerServiceGetPatientVitalRecordsByPatientIdKey, ...(queryKey ?? [{ patientUuid, page, size }])], queryFn: () => VitalControllerService.getPatientVitalRecordsByPatientId(patientUuid, page, size), ...options });
export const useVitalControllerServiceGetPatientsVitalKey = "VitalControllerServiceGetPatientsVital";
export const useVitalControllerServiceGetPatientsVital = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, page, size, sort, name }: {
    patientUuid: string;
    page?: number;
    size?: number;
    sort?: Array<string>;
    name?: "TEMPERATURE" | "BLOOD_PRESSURE" | "HEART_RATE" | "RESPIRATION_RATE" | "OXYGEN_SATURATION" | "HEIGHT" | "WEIGHT" | "BMI";
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof VitalControllerService.getPatientsVital>>, unknown, Awaited<ReturnType<typeof VitalControllerService.getPatientsVital>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useVitalControllerServiceGetPatientsVitalKey, ...(queryKey ?? [{ patientUuid, page, size, sort, name }])], queryFn: () => VitalControllerService.getPatientsVital(patientUuid, page, size, sort, name), ...options });
export const useVitalControllerServiceGetPatientsIntakeVitalKey = "VitalControllerServiceGetPatientsIntakeVital";
export const useVitalControllerServiceGetPatientsIntakeVital = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, intakeVitalUuid }: {
    patientUuid: string;
    intakeVitalUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof VitalControllerService.getPatientsIntakeVital>>, unknown, Awaited<ReturnType<typeof VitalControllerService.getPatientsIntakeVital>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useVitalControllerServiceGetPatientsIntakeVitalKey, ...(queryKey ?? [{ patientUuid, intakeVitalUuid }])], queryFn: () => VitalControllerService.getPatientsIntakeVital(patientUuid, intakeVitalUuid), ...options });
export const useVitalControllerServiceGetPatientsIntakeVitalForPatientKey = "VitalControllerServiceGetPatientsIntakeVitalForPatient";
export const useVitalControllerServiceGetPatientsIntakeVitalForPatient = <TQueryKey extends Array<unknown> = unknown[]>({ intakeVitalUuid }: {
    intakeVitalUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof VitalControllerService.getPatientsIntakeVitalForPatient>>, unknown, Awaited<ReturnType<typeof VitalControllerService.getPatientsIntakeVitalForPatient>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useVitalControllerServiceGetPatientsIntakeVitalForPatientKey, ...(queryKey ?? [{ intakeVitalUuid }])], queryFn: () => VitalControllerService.getPatientsIntakeVitalForPatient(intakeVitalUuid), ...options });
export const useVaccineControllerServiceUpdatePatientVaccine = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof VaccineControllerService.updatePatientVaccine>>, unknown, {
    requestBody: PatientVaccine;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => VaccineControllerService.updatePatientVaccine(requestBody), ...options });
export const useVaccineControllerServiceAddPatientVaccine = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof VaccineControllerService.addPatientVaccine>>, unknown, {
    requestBody: PatientVaccine;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => VaccineControllerService.addPatientVaccine(requestBody), ...options });
export const useVaccineControllerServiceViewIntakeAllergyOfVaccineKey = "VaccineControllerServiceViewIntakeAllergyOfVaccine";
export const useVaccineControllerServiceViewIntakeAllergyOfVaccine = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, intakeFormUuid, intakeVaccineUuid }: {
    patientUuid: string;
    intakeFormUuid: string;
    intakeVaccineUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof VaccineControllerService.viewIntakeAllergyOfVaccine>>, unknown, Awaited<ReturnType<typeof VaccineControllerService.viewIntakeAllergyOfVaccine>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useVaccineControllerServiceViewIntakeAllergyOfVaccineKey, ...(queryKey ?? [{ patientUuid, intakeFormUuid, intakeVaccineUuid }])], queryFn: () => VaccineControllerService.viewIntakeAllergyOfVaccine(patientUuid, intakeFormUuid, intakeVaccineUuid), ...options });
export const useVaccineControllerServiceUpdatePatientIntakeVaccine = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof VaccineControllerService.updatePatientIntakeVaccine>>, unknown, {
    patientUuid: string;
    intakeFormUuid: string;
    intakeVaccineUuid: string;
    requestBody: IntakeVaccine;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, intakeFormUuid, intakeVaccineUuid, requestBody }) => VaccineControllerService.updatePatientIntakeVaccine(patientUuid, intakeFormUuid, intakeVaccineUuid, requestBody), ...options });
export const useVaccineControllerServiceArchivePatientIntakeVaccineForProvider = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof VaccineControllerService.archivePatientIntakeVaccineForProvider>>, unknown, {
    patientUuid: string;
    intakeFormUuid: string;
    intakeVaccineUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, intakeFormUuid, intakeVaccineUuid }) => VaccineControllerService.archivePatientIntakeVaccineForProvider(patientUuid, intakeFormUuid, intakeVaccineUuid), ...options });
export const useVaccineControllerServiceViewIntakeAllergyOfVaccineForPatientKey = "VaccineControllerServiceViewIntakeAllergyOfVaccineForPatient";
export const useVaccineControllerServiceViewIntakeAllergyOfVaccineForPatient = <TQueryKey extends Array<unknown> = unknown[]>({ intakeFormUuid, intakeVaccineUuid }: {
    intakeFormUuid: string;
    intakeVaccineUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof VaccineControllerService.viewIntakeAllergyOfVaccineForPatient>>, unknown, Awaited<ReturnType<typeof VaccineControllerService.viewIntakeAllergyOfVaccineForPatient>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useVaccineControllerServiceViewIntakeAllergyOfVaccineForPatientKey, ...(queryKey ?? [{ intakeFormUuid, intakeVaccineUuid }])], queryFn: () => VaccineControllerService.viewIntakeAllergyOfVaccineForPatient(intakeFormUuid, intakeVaccineUuid), ...options });
export const useVaccineControllerServiceUpdatePatientIntakeVaccineForPatient = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof VaccineControllerService.updatePatientIntakeVaccineForPatient>>, unknown, {
    intakeFormUuid: string;
    intakeVaccineUuid: string;
    requestBody: IntakeVaccine;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ intakeFormUuid, intakeVaccineUuid, requestBody }) => VaccineControllerService.updatePatientIntakeVaccineForPatient(intakeFormUuid, intakeVaccineUuid, requestBody), ...options });
export const useVaccineControllerServiceArchivePatientIntakeVaccineForPatient = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof VaccineControllerService.archivePatientIntakeVaccineForPatient>>, unknown, {
    intakeFormUuid: string;
    intakeVaccineUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ intakeFormUuid, intakeVaccineUuid }) => VaccineControllerService.archivePatientIntakeVaccineForPatient(intakeFormUuid, intakeVaccineUuid), ...options });
export const useVaccineControllerServiceAddPatientIntakeVaccine = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof VaccineControllerService.addPatientIntakeVaccine>>, unknown, {
    patientUuid: string;
    intakeFormUuid: string;
    requestBody: IntakeVaccine;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, intakeFormUuid, requestBody }) => VaccineControllerService.addPatientIntakeVaccine(patientUuid, intakeFormUuid, requestBody), ...options });
export const useVaccineControllerServiceAddPatientIntakeVaccineForPatient = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof VaccineControllerService.addPatientIntakeVaccineForPatient>>, unknown, {
    intakeFormUuid: string;
    requestBody: IntakeVaccine;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ intakeFormUuid, requestBody }) => VaccineControllerService.addPatientIntakeVaccineForPatient(intakeFormUuid, requestBody), ...options });
export const useVaccineControllerServiceGetAllVaccinesKey = "VaccineControllerServiceGetAllVaccines";
export const useVaccineControllerServiceGetAllVaccines = <TQueryKey extends Array<unknown> = unknown[]>({ page, size }: {
    page?: number;
    size?: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof VaccineControllerService.getAllVaccines>>, unknown, Awaited<ReturnType<typeof VaccineControllerService.getAllVaccines>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useVaccineControllerServiceGetAllVaccinesKey, ...(queryKey ?? [{ page, size }])], queryFn: () => VaccineControllerService.getAllVaccines(page, size), ...options });
export const useVaccineControllerServiceGetPatientVaccineDetailsKey = "VaccineControllerServiceGetPatientVaccineDetails";
export const useVaccineControllerServiceGetPatientVaccineDetails = <TQueryKey extends Array<unknown> = unknown[]>({ uuid, page, size }: {
    uuid: string;
    page: number;
    size: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof VaccineControllerService.getPatientVaccineDetails>>, unknown, Awaited<ReturnType<typeof VaccineControllerService.getPatientVaccineDetails>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useVaccineControllerServiceGetPatientVaccineDetailsKey, ...(queryKey ?? [{ uuid, page, size }])], queryFn: () => VaccineControllerService.getPatientVaccineDetails(uuid, page, size), ...options });
export const useVaccineControllerServiceGetPatientIntakeVaccineDetailsKey = "VaccineControllerServiceGetPatientIntakeVaccineDetails";
export const useVaccineControllerServiceGetPatientIntakeVaccineDetails = <TQueryKey extends Array<unknown> = unknown[]>({ uuid, intakeVaccineUuid }: {
    uuid: string;
    intakeVaccineUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof VaccineControllerService.getPatientIntakeVaccineDetails>>, unknown, Awaited<ReturnType<typeof VaccineControllerService.getPatientIntakeVaccineDetails>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useVaccineControllerServiceGetPatientIntakeVaccineDetailsKey, ...(queryKey ?? [{ uuid, intakeVaccineUuid }])], queryFn: () => VaccineControllerService.getPatientIntakeVaccineDetails(uuid, intakeVaccineUuid), ...options });
export const useVaccineControllerServiceViewPatientVaccineKey = "VaccineControllerServiceViewPatientVaccine";
export const useVaccineControllerServiceViewPatientVaccine = <TQueryKey extends Array<unknown> = unknown[]>({ patientVaccineUuid }: {
    patientVaccineUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof VaccineControllerService.viewPatientVaccine>>, unknown, Awaited<ReturnType<typeof VaccineControllerService.viewPatientVaccine>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useVaccineControllerServiceViewPatientVaccineKey, ...(queryKey ?? [{ patientVaccineUuid }])], queryFn: () => VaccineControllerService.viewPatientVaccine(patientVaccineUuid), ...options });
export const useVaccineControllerServiceArchivePatientVaccine = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof VaccineControllerService.archivePatientVaccine>>, unknown, {
    patientVaccineUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientVaccineUuid }) => VaccineControllerService.archivePatientVaccine(patientVaccineUuid), ...options });
export const useVaccineControllerServiceGetPatientIntakeVaccineDetailsForPatientKey = "VaccineControllerServiceGetPatientIntakeVaccineDetailsForPatient";
export const useVaccineControllerServiceGetPatientIntakeVaccineDetailsForPatient = <TQueryKey extends Array<unknown> = unknown[]>({ uuid }: {
    uuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof VaccineControllerService.getPatientIntakeVaccineDetailsForPatient>>, unknown, Awaited<ReturnType<typeof VaccineControllerService.getPatientIntakeVaccineDetailsForPatient>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useVaccineControllerServiceGetPatientIntakeVaccineDetailsForPatientKey, ...(queryKey ?? [{ uuid }])], queryFn: () => VaccineControllerService.getPatientIntakeVaccineDetailsForPatient(uuid), ...options });
export const useUserControllerServiceUpdateUser = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof UserControllerService.updateUser>>, unknown, {
    requestBody: User;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => UserControllerService.updateUser(requestBody), ...options });
export const useUserControllerServiceAddUser = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof UserControllerService.addUser>>, unknown, {
    requestBody: User;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => UserControllerService.addUser(requestBody), ...options });
export const useUserControllerServiceActivateUser = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof UserControllerService.activateUser>>, unknown, {
    email: string;
    active: boolean;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ email, active }) => UserControllerService.activateUser(email, active), ...options });
export const useUserControllerServiceSetPassword = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof UserControllerService.setPassword>>, unknown, {
    requestBody: SetPasswordRequest;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => UserControllerService.setPassword(requestBody), ...options });
export const useUserControllerServiceResetPassword = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof UserControllerService.resetPassword>>, unknown, {
    requestBody: ResetPasswordRequest;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => UserControllerService.resetPassword(requestBody), ...options });
export const useUserControllerServiceSendEmailForSetPassword = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof UserControllerService.sendEmailForSetPassword>>, unknown, {
    requestBody: SetPasswordEmailRequest;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => UserControllerService.sendEmailForSetPassword(requestBody), ...options });
export const useUserControllerServiceGetRefreshToken = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof UserControllerService.getRefreshToken>>, unknown, {
    requestBody: RefreshTokenRequest;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => UserControllerService.getRefreshToken(requestBody), ...options });
export const useUserControllerServiceUserLogout = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof UserControllerService.userLogout>>, unknown, {
    requestBody: LogoutRequest;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => UserControllerService.userLogout(requestBody), ...options });
export const useUserControllerServiceGetAccessToken = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof UserControllerService.getAccessToken>>, unknown, {
    requestBody: AuthRequest;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => UserControllerService.getAccessToken(requestBody), ...options });
export const useUserControllerServiceAddLocationUser = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof UserControllerService.addLocationUser>>, unknown, {
    locationId: string;
    userId: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ locationId, userId }) => UserControllerService.addLocationUser(locationId, userId), ...options });
export const useUserControllerServiceSendEmailForForgotPassword1 = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof UserControllerService.sendEmailForForgotPassword1>>, unknown, {
    requestBody: SendEmailForgotPasswordRequest;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => UserControllerService.sendEmailForForgotPassword1(requestBody), ...options });
export const useUserControllerServiceSendInvite = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof UserControllerService.sendInvite>>, unknown, {
    requestBody: SetPasswordEmailRequest;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => UserControllerService.sendInvite(requestBody), ...options });
export const useUserControllerServiceVerifyOtpForForgotPassword = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof UserControllerService.verifyOtpForForgotPassword>>, unknown, {
    email: string;
    otp: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ email, otp }) => UserControllerService.verifyOtpForForgotPassword(email, otp), ...options });
export const useUserControllerServiceChangePassword = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof UserControllerService.changePassword>>, unknown, {
    requestBody: PasswordChangeRequest;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => UserControllerService.changePassword(requestBody), ...options });
export const useUserControllerServiceAddUser1 = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof UserControllerService.addUser1>>, unknown, {
    requestBody: User;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => UserControllerService.addUser1(requestBody), ...options });
export const useUserControllerServiceGetUserById1Key = "UserControllerServiceGetUserById1";
export const useUserControllerServiceGetUserById1 = <TQueryKey extends Array<unknown> = unknown[]>({ uuid }: {
    uuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof UserControllerService.getUserById1>>, unknown, Awaited<ReturnType<typeof UserControllerService.getUserById1>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useUserControllerServiceGetUserById1Key, ...(queryKey ?? [{ uuid }])], queryFn: () => UserControllerService.getUserById1(uuid), ...options });
export const useUserControllerServiceChangeAvatar = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof UserControllerService.changeAvatar>>, unknown, {
    uuid: string;
    requestBody?: {
        file: Blob;
    };
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ uuid, requestBody }) => UserControllerService.changeAvatar(uuid, requestBody), ...options });
export const useUserControllerServiceVerifyLinkForPasswordKey = "UserControllerServiceVerifyLinkForPassword";
export const useUserControllerServiceVerifyLinkForPassword = <TQueryKey extends Array<unknown> = unknown[]>({ linkId, userId }: {
    linkId: string;
    userId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof UserControllerService.verifyLinkForPassword>>, unknown, Awaited<ReturnType<typeof UserControllerService.verifyLinkForPassword>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useUserControllerServiceVerifyLinkForPasswordKey, ...(queryKey ?? [{ linkId, userId }])], queryFn: () => UserControllerService.verifyLinkForPassword(linkId, userId), ...options });
export const useUserControllerServiceGetUsersKey = "UserControllerServiceGetUsers";
export const useUserControllerServiceGetUsers = <TQueryKey extends Array<unknown> = unknown[]>({ page, size, sort, providerGroupUuid, searchString }: {
    page?: number;
    size?: number;
    sort?: Array<string>;
    providerGroupUuid?: string;
    searchString?: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof UserControllerService.getUsers>>, unknown, Awaited<ReturnType<typeof UserControllerService.getUsers>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useUserControllerServiceGetUsersKey, ...(queryKey ?? [{ page, size, sort, providerGroupUuid, searchString }])], queryFn: () => UserControllerService.getUsers(page, size, sort, providerGroupUuid, searchString), ...options });
export const useUserControllerServiceGetAllSearchUsersKey = "UserControllerServiceGetAllSearchUsers";
export const useUserControllerServiceGetAllSearchUsers = <TQueryKey extends Array<unknown> = unknown[]>({ page, size, providerGroupUuid, sortBy, sortDirection, searchString, status }: {
    page?: number;
    size?: number;
    providerGroupUuid?: string;
    sortBy?: string;
    sortDirection?: string;
    searchString?: string;
    status?: boolean;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof UserControllerService.getAllSearchUsers>>, unknown, Awaited<ReturnType<typeof UserControllerService.getAllSearchUsers>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useUserControllerServiceGetAllSearchUsersKey, ...(queryKey ?? [{ page, size, providerGroupUuid, sortBy, sortDirection, searchString, status }])], queryFn: () => UserControllerService.getAllSearchUsers(page, size, providerGroupUuid, sortBy, sortDirection, searchString, status), ...options });
export const useUserControllerServiceGetActiveAndCurrentUsersKey = "UserControllerServiceGetActiveAndCurrentUsers";
export const useUserControllerServiceGetActiveAndCurrentUsers = <TQueryKey extends Array<unknown> = unknown[]>({ providerGroupUuid, page, size, sort, searchString }: {
    providerGroupUuid: string;
    page?: number;
    size?: number;
    sort?: Array<string>;
    searchString?: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof UserControllerService.getActiveAndCurrentUsers>>, unknown, Awaited<ReturnType<typeof UserControllerService.getActiveAndCurrentUsers>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useUserControllerServiceGetActiveAndCurrentUsersKey, ...(queryKey ?? [{ providerGroupUuid, page, size, sort, searchString }])], queryFn: () => UserControllerService.getActiveAndCurrentUsers(providerGroupUuid, page, size, sort, searchString), ...options });
export const useUserControllerServiceGetUsersProfileDetailsKey = "UserControllerServiceGetUsersProfileDetails";
export const useUserControllerServiceGetUsersProfileDetails = <TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof UserControllerService.getUsersProfileDetails>>, unknown, Awaited<ReturnType<typeof UserControllerService.getUsersProfileDetails>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useUserControllerServiceGetUsersProfileDetailsKey, ...(queryKey ?? [])], queryFn: () => UserControllerService.getUsersProfileDetails(), ...options });
export const useUserControllerServiceSearchLocationUserKey = "UserControllerServiceSearchLocationUser";
export const useUserControllerServiceSearchLocationUser = <TQueryKey extends Array<unknown> = unknown[]>({ locationId, userName, page, size }: {
    locationId: string;
    userName?: string;
    page?: number;
    size?: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof UserControllerService.searchLocationUser>>, unknown, Awaited<ReturnType<typeof UserControllerService.searchLocationUser>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useUserControllerServiceSearchLocationUserKey, ...(queryKey ?? [{ locationId, userName, page, size }])], queryFn: () => UserControllerService.searchLocationUser(locationId, userName, page, size), ...options });
export const useUserControllerServiceGetProfileKey = "UserControllerServiceGetProfile";
export const useUserControllerServiceGetProfile = <TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof UserControllerService.getProfile>>, unknown, Awaited<ReturnType<typeof UserControllerService.getProfile>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useUserControllerServiceGetProfileKey, ...(queryKey ?? [])], queryFn: () => UserControllerService.getProfile(), ...options });
export const useUserControllerServiceGetLocationUserKey = "UserControllerServiceGetLocationUser";
export const useUserControllerServiceGetLocationUser = <TQueryKey extends Array<unknown> = unknown[]>({ locationId, page, size }: {
    locationId: string;
    page?: number;
    size?: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof UserControllerService.getLocationUser>>, unknown, Awaited<ReturnType<typeof UserControllerService.getLocationUser>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useUserControllerServiceGetLocationUserKey, ...(queryKey ?? [{ locationId, page, size }])], queryFn: () => UserControllerService.getLocationUser(locationId, page, size), ...options });
export const useUserControllerServiceGetUserByIdKey = "UserControllerServiceGetUserById";
export const useUserControllerServiceGetUserById = <TQueryKey extends Array<unknown> = unknown[]>({ uuid }: {
    uuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof UserControllerService.getUserById>>, unknown, Awaited<ReturnType<typeof UserControllerService.getUserById>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useUserControllerServiceGetUserByIdKey, ...(queryKey ?? [{ uuid }])], queryFn: () => UserControllerService.getUserById(uuid), ...options });
export const useTasksControllerServiceUpdateTask = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof TasksControllerService.updateTask>>, unknown, {
    requestBody: OpenTask;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => TasksControllerService.updateTask(requestBody), ...options });
export const useTasksControllerServiceCreateTask = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof TasksControllerService.createTask>>, unknown, {
    requestBody: OpenTask;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => TasksControllerService.createTask(requestBody), ...options });
export const useTasksControllerServiceViewTaskKey = "TasksControllerServiceViewTask";
export const useTasksControllerServiceViewTask = <TQueryKey extends Array<unknown> = unknown[]>({ taskUuid }: {
    taskUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof TasksControllerService.viewTask>>, unknown, Awaited<ReturnType<typeof TasksControllerService.viewTask>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useTasksControllerServiceViewTaskKey, ...(queryKey ?? [{ taskUuid }])], queryFn: () => TasksControllerService.viewTask(taskUuid), ...options });
export const useTasksControllerServiceDeleteTask = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof TasksControllerService.deleteTask>>, unknown, {
    taskUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ taskUuid }) => TasksControllerService.deleteTask(taskUuid), ...options });
export const useTasksControllerServiceGetAllProviderTaskKey = "TasksControllerServiceGetAllProviderTask";
export const useTasksControllerServiceGetAllProviderTask = <TQueryKey extends Array<unknown> = unknown[]>({ providerUuid, patientName, priority, dueDate, status, page, size, sort }: {
    providerUuid: string;
    patientName?: string;
    priority?: "LOW" | "MEDIUM" | "HIGH";
    dueDate?: "CURRENT" | "LAST_7_DAY" | "DUE_TOMORROW" | "NEXT_7_DAYS" | "NEXT_30_DAYS" | "NEXT_60_DAYS" | "NEXT_90_DAYS" | "FUTURE";
    status?: "OPEN" | "IN_PROGRESS" | "COMPLETE" | "INCOMPLETE";
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof TasksControllerService.getAllProviderTask>>, unknown, Awaited<ReturnType<typeof TasksControllerService.getAllProviderTask>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useTasksControllerServiceGetAllProviderTaskKey, ...(queryKey ?? [{ providerUuid, patientName, priority, dueDate, status, page, size, sort }])], queryFn: () => TasksControllerService.getAllProviderTask(providerUuid, patientName, priority, dueDate, status, page, size, sort), ...options });
export const useTasksControllerServiceGetOpenTaskCountKey = "TasksControllerServiceGetOpenTaskCount";
export const useTasksControllerServiceGetOpenTaskCount = <TQueryKey extends Array<unknown> = unknown[]>({ providerUuid }: {
    providerUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof TasksControllerService.getOpenTaskCount>>, unknown, Awaited<ReturnType<typeof TasksControllerService.getOpenTaskCount>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useTasksControllerServiceGetOpenTaskCountKey, ...(queryKey ?? [{ providerUuid }])], queryFn: () => TasksControllerService.getOpenTaskCount(providerUuid), ...options });
export const useTasksControllerServiceGetAllTaskKey = "TasksControllerServiceGetAllTask";
export const useTasksControllerServiceGetAllTask = <TQueryKey extends Array<unknown> = unknown[]>({ providerGroupUuid, patientName, priority, dueDate, status, page, size, sort }: {
    providerGroupUuid: string;
    patientName?: string;
    priority?: "LOW" | "MEDIUM" | "HIGH";
    dueDate?: "CURRENT" | "LAST_7_DAY" | "DUE_TOMORROW" | "NEXT_7_DAYS" | "NEXT_30_DAYS" | "NEXT_60_DAYS" | "NEXT_90_DAYS" | "FUTURE";
    status?: "OPEN" | "IN_PROGRESS" | "COMPLETE" | "INCOMPLETE";
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof TasksControllerService.getAllTask>>, unknown, Awaited<ReturnType<typeof TasksControllerService.getAllTask>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useTasksControllerServiceGetAllTaskKey, ...(queryKey ?? [{ providerGroupUuid, patientName, priority, dueDate, status, page, size, sort }])], queryFn: () => TasksControllerService.getAllTask(providerGroupUuid, patientName, priority, dueDate, status, page, size, sort), ...options });
export const useStickynotesControllerServiceCreateStickyNote = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof StickynotesControllerService.createStickyNote>>, unknown, {
    requestBody: StickyNotes;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => StickynotesControllerService.createStickyNote(requestBody), ...options });
export const useStickynotesControllerServiceGetStickyNoteKey = "StickynotesControllerServiceGetStickyNote";
export const useStickynotesControllerServiceGetStickyNote = <TQueryKey extends Array<unknown> = unknown[]>({ stickyNoteUuid }: {
    stickyNoteUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof StickynotesControllerService.getStickyNote>>, unknown, Awaited<ReturnType<typeof StickynotesControllerService.getStickyNote>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useStickynotesControllerServiceGetStickyNoteKey, ...(queryKey ?? [{ stickyNoteUuid }])], queryFn: () => StickynotesControllerService.getStickyNote(stickyNoteUuid), ...options });
export const useStickynotesControllerServiceDeleteByUuid = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof StickynotesControllerService.deleteByUuid>>, unknown, {
    stickyNoteUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ stickyNoteUuid }) => StickynotesControllerService.deleteByUuid(stickyNoteUuid), ...options });
export const useStickynotesControllerServiceGetAllStickyNoteKey = "StickynotesControllerServiceGetAllStickyNote";
export const useStickynotesControllerServiceGetAllStickyNote = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, page, size, sort }: {
    patientUuid: string;
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof StickynotesControllerService.getAllStickyNote>>, unknown, Awaited<ReturnType<typeof StickynotesControllerService.getAllStickyNote>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useStickynotesControllerServiceGetAllStickyNoteKey, ...(queryKey ?? [{ patientUuid, page, size, sort }])], queryFn: () => StickynotesControllerService.getAllStickyNote(patientUuid, page, size, sort), ...options });
export const useStaffControllerServiceGetAllStaffKey = "StaffControllerServiceGetAllStaff";
export const useStaffControllerServiceGetAllStaff = <TQueryKey extends Array<unknown> = unknown[]>({ page, size, sortBy, sortDirection, searchString, status }: {
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
    searchString?: string;
    status?: boolean;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof StaffControllerService.getAllStaff>>, unknown, Awaited<ReturnType<typeof StaffControllerService.getAllStaff>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useStaffControllerServiceGetAllStaffKey, ...(queryKey ?? [{ page, size, sortBy, sortDirection, searchString, status }])], queryFn: () => StaffControllerService.getAllStaff(page, size, sortBy, sortDirection, searchString, status), ...options });
export const useStaffControllerServiceUpdateStaff = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof StaffControllerService.updateStaff>>, unknown, {
    requestBody: Staff;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => StaffControllerService.updateStaff(requestBody), ...options });
export const useStaffControllerServiceCreateStaff = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof StaffControllerService.createStaff>>, unknown, {
    requestBody: Staff;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => StaffControllerService.createStaff(requestBody), ...options });
export const useStaffControllerServiceUpdateStaffStatus = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof StaffControllerService.updateStaffStatus>>, unknown, {
    uuid: string;
    status: boolean;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ uuid, status }) => StaffControllerService.updateStaffStatus(uuid, status), ...options });
export const useStaffControllerServiceGetStaffByUuidKey = "StaffControllerServiceGetStaffByUuid";
export const useStaffControllerServiceGetStaffByUuid = <TQueryKey extends Array<unknown> = unknown[]>({ uuid }: {
    uuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof StaffControllerService.getStaffByUuid>>, unknown, Awaited<ReturnType<typeof StaffControllerService.getStaffByUuid>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useStaffControllerServiceGetStaffByUuidKey, ...(queryKey ?? [{ uuid }])], queryFn: () => StaffControllerService.getStaffByUuid(uuid), ...options });
export const useStaffControllerServiceArchiveStaff = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof StaffControllerService.archiveStaff>>, unknown, {
    uuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ uuid }) => StaffControllerService.archiveStaff(uuid), ...options });
export const useSocialHistoryControllerServiceGetSocialHistoryKey = "SocialHistoryControllerServiceGetSocialHistory";
export const useSocialHistoryControllerServiceGetSocialHistory = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid }: {
    patientUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof SocialHistoryControllerService.getSocialHistory>>, unknown, Awaited<ReturnType<typeof SocialHistoryControllerService.getSocialHistory>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useSocialHistoryControllerServiceGetSocialHistoryKey, ...(queryKey ?? [{ patientUuid }])], queryFn: () => SocialHistoryControllerService.getSocialHistory(patientUuid), ...options });
export const useSocialHistoryControllerServiceAddSocialHistory = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof SocialHistoryControllerService.addSocialHistory>>, unknown, {
    patientUuid: string;
    requestBody: PatientSocialHistory;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, requestBody }) => SocialHistoryControllerService.addSocialHistory(patientUuid, requestBody), ...options });
export const useSocialHistoryControllerServiceAddEducationalLevel = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof SocialHistoryControllerService.addEducationalLevel>>, unknown, {
    requestBody: EducationLevel;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => SocialHistoryControllerService.addEducationalLevel(requestBody), ...options });
export const useSocialHistoryControllerServiceAddIntakeSocialHistory = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof SocialHistoryControllerService.addIntakeSocialHistory>>, unknown, {
    intakeFormUuid: string;
    requestBody: IntakePatientSocialHistory;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ intakeFormUuid, requestBody }) => SocialHistoryControllerService.addIntakeSocialHistory(intakeFormUuid, requestBody), ...options });
export const useSocialHistoryControllerServiceGetIntakeSocialHistoryKey = "SocialHistoryControllerServiceGetIntakeSocialHistory";
export const useSocialHistoryControllerServiceGetIntakeSocialHistory = <TQueryKey extends Array<unknown> = unknown[]>({ intakeSocialHistoryUuid }: {
    intakeSocialHistoryUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof SocialHistoryControllerService.getIntakeSocialHistory>>, unknown, Awaited<ReturnType<typeof SocialHistoryControllerService.getIntakeSocialHistory>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useSocialHistoryControllerServiceGetIntakeSocialHistoryKey, ...(queryKey ?? [{ intakeSocialHistoryUuid }])], queryFn: () => SocialHistoryControllerService.getIntakeSocialHistory(intakeSocialHistoryUuid), ...options });
export const useRoleControllerServiceUpdateRole = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof RoleControllerService.updateRole>>, unknown, {
    requestBody: Roles;
    providerGroupUuid?: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody, providerGroupUuid }) => RoleControllerService.updateRole(requestBody, providerGroupUuid), ...options });
export const useRoleControllerServiceAddRole = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof RoleControllerService.addRole>>, unknown, {
    requestBody: Roles;
    providerGroupUuid?: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody, providerGroupUuid }) => RoleControllerService.addRole(requestBody, providerGroupUuid), ...options });
export const useRoleControllerServiceGetRoleByUuidKey = "RoleControllerServiceGetRoleByUuid";
export const useRoleControllerServiceGetRoleByUuid = <TQueryKey extends Array<unknown> = unknown[]>({ uuid }: {
    uuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof RoleControllerService.getRoleByUuid>>, unknown, Awaited<ReturnType<typeof RoleControllerService.getRoleByUuid>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useRoleControllerServiceGetRoleByUuidKey, ...(queryKey ?? [{ uuid }])], queryFn: () => RoleControllerService.getRoleByUuid(uuid), ...options });
export const useRoleControllerServiceDeleteRole = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof RoleControllerService.deleteRole>>, unknown, {
    uuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ uuid }) => RoleControllerService.deleteRole(uuid), ...options });
export const useRoleControllerServiceGetAllRolesWithDefaultKey = "RoleControllerServiceGetAllRolesWithDefault";
export const useRoleControllerServiceGetAllRolesWithDefault = <TQueryKey extends Array<unknown> = unknown[]>({ providerGroupUuid, page, size }: {
    providerGroupUuid?: string;
    page?: number;
    size?: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof RoleControllerService.getAllRolesWithDefault>>, unknown, Awaited<ReturnType<typeof RoleControllerService.getAllRolesWithDefault>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useRoleControllerServiceGetAllRolesWithDefaultKey, ...(queryKey ?? [{ providerGroupUuid, page, size }])], queryFn: () => RoleControllerService.getAllRolesWithDefault(providerGroupUuid, page, size), ...options });
export const useRoleControllerServiceGetAllRolesExceptDefaultsKey = "RoleControllerServiceGetAllRolesExceptDefaults";
export const useRoleControllerServiceGetAllRolesExceptDefaults = <TQueryKey extends Array<unknown> = unknown[]>({ providerGroupUuid, searchString, page, size, sortBy, sortDirection }: {
    providerGroupUuid?: string;
    searchString?: string;
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof RoleControllerService.getAllRolesExceptDefaults>>, unknown, Awaited<ReturnType<typeof RoleControllerService.getAllRolesExceptDefaults>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useRoleControllerServiceGetAllRolesExceptDefaultsKey, ...(queryKey ?? [{ providerGroupUuid, searchString, page, size, sortBy, sortDirection }])], queryFn: () => RoleControllerService.getAllRolesExceptDefaults(providerGroupUuid, searchString, page, size, sortBy, sortDirection), ...options });
export const useProviderNotificationsControllerServiceViewProviderNotificationKey = "ProviderNotificationsControllerServiceViewProviderNotification";
export const useProviderNotificationsControllerServiceViewProviderNotification = <TQueryKey extends Array<unknown> = unknown[]>({ providerUuid }: {
    providerUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ProviderNotificationsControllerService.viewProviderNotification>>, unknown, Awaited<ReturnType<typeof ProviderNotificationsControllerService.viewProviderNotification>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useProviderNotificationsControllerServiceViewProviderNotificationKey, ...(queryKey ?? [{ providerUuid }])], queryFn: () => ProviderNotificationsControllerService.viewProviderNotification(providerUuid), ...options });
export const useProviderNotificationsControllerServiceUpdateProviderNotification = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof ProviderNotificationsControllerService.updateProviderNotification>>, unknown, {
    providerUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ providerUuid }) => ProviderNotificationsControllerService.updateProviderNotification(providerUuid), ...options });
export const useProviderGroupControllerServiceUpdateProviderGroup = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof ProviderGroupControllerService.updateProviderGroup>>, unknown, {
    requestBody: ProviderGroup;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => ProviderGroupControllerService.updateProviderGroup(requestBody), ...options });
export const useProviderGroupControllerServiceCreateProviderGroup = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof ProviderGroupControllerService.createProviderGroup>>, unknown, {
    requestBody: ProviderGroup;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => ProviderGroupControllerService.createProviderGroup(requestBody), ...options });
export const useProviderGroupControllerServiceSyncDatabaseSchema = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof ProviderGroupControllerService.syncDatabaseSchema>>, unknown, {
    uuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ uuid }) => ProviderGroupControllerService.syncDatabaseSchema(uuid), ...options });
export const useProviderGroupControllerServiceUpdateStatus = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof ProviderGroupControllerService.updateStatus>>, unknown, {
    uuid: string;
    status: boolean;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ uuid, status }) => ProviderGroupControllerService.updateStatus(uuid, status), ...options });
export const useProviderGroupControllerServiceAddSpecialities = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof ProviderGroupControllerService.addSpecialities>>, unknown, {
    requestBody: Speciality;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => ProviderGroupControllerService.addSpecialities(requestBody), ...options });
export const useProviderGroupControllerServiceGetProviderGroupByIdKey = "ProviderGroupControllerServiceGetProviderGroupById";
export const useProviderGroupControllerServiceGetProviderGroupById = <TQueryKey extends Array<unknown> = unknown[]>({ uuid }: {
    uuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ProviderGroupControllerService.getProviderGroupById>>, unknown, Awaited<ReturnType<typeof ProviderGroupControllerService.getProviderGroupById>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useProviderGroupControllerServiceGetProviderGroupByIdKey, ...(queryKey ?? [{ uuid }])], queryFn: () => ProviderGroupControllerService.getProviderGroupById(uuid), ...options });
export const useProviderGroupControllerServiceGetProviderGroupById1Key = "ProviderGroupControllerServiceGetProviderGroupById1";
export const useProviderGroupControllerServiceGetProviderGroupById1 = <TQueryKey extends Array<unknown> = unknown[]>({ uuid }: {
    uuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ProviderGroupControllerService.getProviderGroupById1>>, unknown, Awaited<ReturnType<typeof ProviderGroupControllerService.getProviderGroupById1>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useProviderGroupControllerServiceGetProviderGroupById1Key, ...(queryKey ?? [{ uuid }])], queryFn: () => ProviderGroupControllerService.getProviderGroupById1(uuid), ...options });
export const useProviderGroupControllerServiceDeleteProviderGroup = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof ProviderGroupControllerService.deleteProviderGroup>>, unknown, {
    uuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ uuid }) => ProviderGroupControllerService.deleteProviderGroup(uuid), ...options });
export const useProviderGroupControllerServiceGetAllProviderGroupStatsKey = "ProviderGroupControllerServiceGetAllProviderGroupStats";
export const useProviderGroupControllerServiceGetAllProviderGroupStats = <TQueryKey extends Array<unknown> = unknown[]>({ year, startDate, endDate }: {
    year?: number;
    startDate?: string;
    endDate?: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ProviderGroupControllerService.getAllProviderGroupStats>>, unknown, Awaited<ReturnType<typeof ProviderGroupControllerService.getAllProviderGroupStats>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useProviderGroupControllerServiceGetAllProviderGroupStatsKey, ...(queryKey ?? [{ year, startDate, endDate }])], queryFn: () => ProviderGroupControllerService.getAllProviderGroupStats(year, startDate, endDate), ...options });
export const useProviderGroupControllerServiceGetAllProviderGroupsKey = "ProviderGroupControllerServiceGetAllProviderGroups";
export const useProviderGroupControllerServiceGetAllProviderGroups = <TQueryKey extends Array<unknown> = unknown[]>({ page, size, sortBy, sortDirection, searchString, status, state, portalName }: {
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
    searchString?: string;
    status?: boolean;
    state?: string;
    portalName?: "NAVALAGLOBAL" | "NAVALACARE" | "PATIENT";
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ProviderGroupControllerService.getAllProviderGroups>>, unknown, Awaited<ReturnType<typeof ProviderGroupControllerService.getAllProviderGroups>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useProviderGroupControllerServiceGetAllProviderGroupsKey, ...(queryKey ?? [{ page, size, sortBy, sortDirection, searchString, status, state, portalName }])], queryFn: () => ProviderGroupControllerService.getAllProviderGroups(page, size, sortBy, sortDirection, searchString, status, state, portalName), ...options });
export const useProviderGroupControllerServiceGetAllSpecialitiesKey = "ProviderGroupControllerServiceGetAllSpecialities";
export const useProviderGroupControllerServiceGetAllSpecialities = <TQueryKey extends Array<unknown> = unknown[]>({ page, size }: {
    page?: number;
    size?: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ProviderGroupControllerService.getAllSpecialities>>, unknown, Awaited<ReturnType<typeof ProviderGroupControllerService.getAllSpecialities>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useProviderGroupControllerServiceGetAllSpecialitiesKey, ...(queryKey ?? [{ page, size }])], queryFn: () => ProviderGroupControllerService.getAllSpecialities(page, size), ...options });
export const useProviderGroupControllerServiceGetAllLanguagesKey = "ProviderGroupControllerServiceGetAllLanguages";
export const useProviderGroupControllerServiceGetAllLanguages = <TQueryKey extends Array<unknown> = unknown[]>({ page, size }: {
    page?: number;
    size?: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ProviderGroupControllerService.getAllLanguages>>, unknown, Awaited<ReturnType<typeof ProviderGroupControllerService.getAllLanguages>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useProviderGroupControllerServiceGetAllLanguagesKey, ...(queryKey ?? [{ page, size }])], queryFn: () => ProviderGroupControllerService.getAllLanguages(page, size), ...options });
export const useProviderGroupControllerServiceGetAllCurrenciesKey = "ProviderGroupControllerServiceGetAllCurrencies";
export const useProviderGroupControllerServiceGetAllCurrencies = <TQueryKey extends Array<unknown> = unknown[]>({ page, size }: {
    page?: number;
    size?: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ProviderGroupControllerService.getAllCurrencies>>, unknown, Awaited<ReturnType<typeof ProviderGroupControllerService.getAllCurrencies>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useProviderGroupControllerServiceGetAllCurrenciesKey, ...(queryKey ?? [{ page, size }])], queryFn: () => ProviderGroupControllerService.getAllCurrencies(page, size), ...options });
export const useProviderGroupControllerServiceGetAllCountriesKey = "ProviderGroupControllerServiceGetAllCountries";
export const useProviderGroupControllerServiceGetAllCountries = <TQueryKey extends Array<unknown> = unknown[]>({ page, size }: {
    page?: number;
    size?: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ProviderGroupControllerService.getAllCountries>>, unknown, Awaited<ReturnType<typeof ProviderGroupControllerService.getAllCountries>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useProviderGroupControllerServiceGetAllCountriesKey, ...(queryKey ?? [{ page, size }])], queryFn: () => ProviderGroupControllerService.getAllCountries(page, size), ...options });
export const useProviderGroupControllerServiceGetProviderGroupBySubdomainKey = "ProviderGroupControllerServiceGetProviderGroupBySubdomain";
export const useProviderGroupControllerServiceGetProviderGroupBySubdomain = <TQueryKey extends Array<unknown> = unknown[]>({ subdomain }: {
    subdomain: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ProviderGroupControllerService.getProviderGroupBySubdomain>>, unknown, Awaited<ReturnType<typeof ProviderGroupControllerService.getProviderGroupBySubdomain>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useProviderGroupControllerServiceGetProviderGroupBySubdomainKey, ...(queryKey ?? [{ subdomain }])], queryFn: () => ProviderGroupControllerService.getProviderGroupBySubdomain(subdomain), ...options });
export const useProviderGroupControllerServiceGetProviderGroupBySubdomain1Key = "ProviderGroupControllerServiceGetProviderGroupBySubdomain1";
export const useProviderGroupControllerServiceGetProviderGroupBySubdomain1 = <TQueryKey extends Array<unknown> = unknown[]>({ subdomain }: {
    subdomain: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ProviderGroupControllerService.getProviderGroupBySubdomain1>>, unknown, Awaited<ReturnType<typeof ProviderGroupControllerService.getProviderGroupBySubdomain1>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useProviderGroupControllerServiceGetProviderGroupBySubdomain1Key, ...(queryKey ?? [{ subdomain }])], queryFn: () => ProviderGroupControllerService.getProviderGroupBySubdomain1(subdomain), ...options });
export const useProviderGroupControllerServiceGetAllAuthProviderGroupsKey = "ProviderGroupControllerServiceGetAllAuthProviderGroups";
export const useProviderGroupControllerServiceGetAllAuthProviderGroups = <TQueryKey extends Array<unknown> = unknown[]>({ page, size }: {
    page: number;
    size: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ProviderGroupControllerService.getAllAuthProviderGroups>>, unknown, Awaited<ReturnType<typeof ProviderGroupControllerService.getAllAuthProviderGroups>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useProviderGroupControllerServiceGetAllAuthProviderGroupsKey, ...(queryKey ?? [{ page, size }])], queryFn: () => ProviderGroupControllerService.getAllAuthProviderGroups(page, size), ...options });
export const useProviderGroupControllerServiceGetStatesKey = "ProviderGroupControllerServiceGetStates";
export const useProviderGroupControllerServiceGetStates = <TQueryKey extends Array<unknown> = unknown[]>({ page, size, sort }: {
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ProviderGroupControllerService.getStates>>, unknown, Awaited<ReturnType<typeof ProviderGroupControllerService.getStates>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useProviderGroupControllerServiceGetStatesKey, ...(queryKey ?? [{ page, size, sort }])], queryFn: () => ProviderGroupControllerService.getStates(page, size, sort), ...options });
export const useProviderControllerServiceUpdateProvider = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof ProviderControllerService.updateProvider>>, unknown, {
    requestBody: Provider;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => ProviderControllerService.updateProvider(requestBody), ...options });
export const useProviderControllerServiceCreateProvider = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof ProviderControllerService.createProvider>>, unknown, {
    requestBody: Provider;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => ProviderControllerService.createProvider(requestBody), ...options });
export const useProviderControllerServiceUpdateProviderStatus = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof ProviderControllerService.updateProviderStatus>>, unknown, {
    uuid: string;
    status: boolean;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ uuid, status }) => ProviderControllerService.updateProviderStatus(uuid, status), ...options });
export const useProviderControllerServiceGetProviderByRatingKey = "ProviderControllerServiceGetProviderByRating";
export const useProviderControllerServiceGetProviderByRating = <TQueryKey extends Array<unknown> = unknown[]>({ page, size, sort }: {
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ProviderControllerService.getProviderByRating>>, unknown, Awaited<ReturnType<typeof ProviderControllerService.getProviderByRating>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useProviderControllerServiceGetProviderByRatingKey, ...(queryKey ?? [{ page, size, sort }])], queryFn: () => ProviderControllerService.getProviderByRating(page, size, sort), ...options });
export const useProviderControllerServiceAddProviderRating = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof ProviderControllerService.addProviderRating>>, unknown, {
    requestBody: ProviderRating;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => ProviderControllerService.addProviderRating(requestBody), ...options });
export const useProviderControllerServiceGetProviderByUuidKey = "ProviderControllerServiceGetProviderByUuid";
export const useProviderControllerServiceGetProviderByUuid = <TQueryKey extends Array<unknown> = unknown[]>({ uuid }: {
    uuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ProviderControllerService.getProviderByUuid>>, unknown, Awaited<ReturnType<typeof ProviderControllerService.getProviderByUuid>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useProviderControllerServiceGetProviderByUuidKey, ...(queryKey ?? [{ uuid }])], queryFn: () => ProviderControllerService.getProviderByUuid(uuid), ...options });
export const useProviderControllerServiceArchiveProvider = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof ProviderControllerService.archiveProvider>>, unknown, {
    uuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ uuid }) => ProviderControllerService.archiveProvider(uuid), ...options });
export const useProviderControllerServiceGetProviderByUserIdKey = "ProviderControllerServiceGetProviderByUserId";
export const useProviderControllerServiceGetProviderByUserId = <TQueryKey extends Array<unknown> = unknown[]>({ uuid }: {
    uuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ProviderControllerService.getProviderByUserId>>, unknown, Awaited<ReturnType<typeof ProviderControllerService.getProviderByUserId>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useProviderControllerServiceGetProviderByUserIdKey, ...(queryKey ?? [{ uuid }])], queryFn: () => ProviderControllerService.getProviderByUserId(uuid), ...options });
export const useProviderControllerServiceGetAllStatusProviderKey = "ProviderControllerServiceGetAllStatusProvider";
export const useProviderControllerServiceGetAllStatusProvider = <TQueryKey extends Array<unknown> = unknown[]>({ providerGroupUuid, page, size, sort }: {
    providerGroupUuid: string;
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ProviderControllerService.getAllStatusProvider>>, unknown, Awaited<ReturnType<typeof ProviderControllerService.getAllStatusProvider>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useProviderControllerServiceGetAllStatusProviderKey, ...(queryKey ?? [{ providerGroupUuid, page, size, sort }])], queryFn: () => ProviderControllerService.getAllStatusProvider(providerGroupUuid, page, size, sort), ...options });
export const useProviderControllerServiceGetProviderGroupProvidersKey = "ProviderControllerServiceGetProviderGroupProviders";
export const useProviderControllerServiceGetProviderGroupProviders = <TQueryKey extends Array<unknown> = unknown[]>({ providerGroupUuid, searchBy, page, size, sort }: {
    providerGroupUuid: string;
    searchBy?: string;
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ProviderControllerService.getProviderGroupProviders>>, unknown, Awaited<ReturnType<typeof ProviderControllerService.getProviderGroupProviders>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useProviderControllerServiceGetProviderGroupProvidersKey, ...(queryKey ?? [{ providerGroupUuid, searchBy, page, size, sort }])], queryFn: () => ProviderControllerService.getProviderGroupProviders(providerGroupUuid, searchBy, page, size, sort), ...options });
export const useProviderControllerServiceGetProviderGroupProvidersCountKey = "ProviderControllerServiceGetProviderGroupProvidersCount";
export const useProviderControllerServiceGetProviderGroupProvidersCount = <TQueryKey extends Array<unknown> = unknown[]>({ providerGroupUuid, startDate, endDate }: {
    providerGroupUuid: string;
    startDate?: string;
    endDate?: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ProviderControllerService.getProviderGroupProvidersCount>>, unknown, Awaited<ReturnType<typeof ProviderControllerService.getProviderGroupProvidersCount>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useProviderControllerServiceGetProviderGroupProvidersCountKey, ...(queryKey ?? [{ providerGroupUuid, startDate, endDate }])], queryFn: () => ProviderControllerService.getProviderGroupProvidersCount(providerGroupUuid, startDate, endDate), ...options });
export const useProviderControllerServiceGetLocationsForProviderKey = "ProviderControllerServiceGetLocationsForProvider";
export const useProviderControllerServiceGetLocationsForProvider = <TQueryKey extends Array<unknown> = unknown[]>({ providerUuid }: {
    providerUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ProviderControllerService.getLocationsForProvider>>, unknown, Awaited<ReturnType<typeof ProviderControllerService.getLocationsForProvider>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useProviderControllerServiceGetLocationsForProviderKey, ...(queryKey ?? [{ providerUuid }])], queryFn: () => ProviderControllerService.getLocationsForProvider(providerUuid), ...options });
export const useProviderControllerServiceGetRecentlyConsultedProviderKey = "ProviderControllerServiceGetRecentlyConsultedProvider";
export const useProviderControllerServiceGetRecentlyConsultedProvider = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, page, size, sort }: {
    patientUuid: string;
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ProviderControllerService.getRecentlyConsultedProvider>>, unknown, Awaited<ReturnType<typeof ProviderControllerService.getRecentlyConsultedProvider>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useProviderControllerServiceGetRecentlyConsultedProviderKey, ...(queryKey ?? [{ patientUuid, page, size, sort }])], queryFn: () => ProviderControllerService.getRecentlyConsultedProvider(patientUuid, page, size, sort), ...options });
export const useProviderControllerServiceGetAllProvidersKey = "ProviderControllerServiceGetAllProviders";
export const useProviderControllerServiceGetAllProviders = <TQueryKey extends Array<unknown> = unknown[]>({ providerGroupUuid, page, size, sort, searchBy, sourceId }: {
    providerGroupUuid: string;
    page?: number;
    size?: number;
    sort?: Array<string>;
    searchBy?: string;
    sourceId?: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ProviderControllerService.getAllProviders>>, unknown, Awaited<ReturnType<typeof ProviderControllerService.getAllProviders>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useProviderControllerServiceGetAllProvidersKey, ...(queryKey ?? [{ providerGroupUuid, page, size, sort, searchBy, sourceId }])], queryFn: () => ProviderControllerService.getAllProviders(providerGroupUuid, page, size, sort, searchBy, sourceId), ...options });
export const useProblemsControllerServiceViewProblemsCatalogKey = "ProblemsControllerServiceViewProblemsCatalog";
export const useProblemsControllerServiceViewProblemsCatalog = <TQueryKey extends Array<unknown> = unknown[]>({ uuid }: {
    uuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ProblemsControllerService.viewProblemsCatalog>>, unknown, Awaited<ReturnType<typeof ProblemsControllerService.viewProblemsCatalog>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useProblemsControllerServiceViewProblemsCatalogKey, ...(queryKey ?? [{ uuid }])], queryFn: () => ProblemsControllerService.viewProblemsCatalog(uuid), ...options });
export const useProblemsControllerServiceEditProblemsCatalog = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof ProblemsControllerService.editProblemsCatalog>>, unknown, {
    uuid: string;
    requestBody: Problem;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ uuid, requestBody }) => ProblemsControllerService.editProblemsCatalog(uuid, requestBody), ...options });
export const useProblemsControllerServiceArchiveProblemsCatalog = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof ProblemsControllerService.archiveProblemsCatalog>>, unknown, {
    uuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ uuid }) => ProblemsControllerService.archiveProblemsCatalog(uuid), ...options });
export const useProblemsControllerServiceUpdatePatientProblem = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof ProblemsControllerService.updatePatientProblem>>, unknown, {
    requestBody: PatientProblem;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => ProblemsControllerService.updatePatientProblem(requestBody), ...options });
export const useProblemsControllerServiceAddPatientProblems = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof ProblemsControllerService.addPatientProblems>>, unknown, {
    requestBody: PatientProblem;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => ProblemsControllerService.addPatientProblems(requestBody), ...options });
export const useProblemsControllerServiceUpdatePatientIntakeProblemsForProvider = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof ProblemsControllerService.updatePatientIntakeProblemsForProvider>>, unknown, {
    patientUuid: string;
    intakeFormUuid: string;
    requestBody: IntakeProblem;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, intakeFormUuid, requestBody }) => ProblemsControllerService.updatePatientIntakeProblemsForProvider(patientUuid, intakeFormUuid, requestBody), ...options });
export const useProblemsControllerServiceViewPatientIntakeProblemsForPatientsKey = "ProblemsControllerServiceViewPatientIntakeProblemsForPatients";
export const useProblemsControllerServiceViewPatientIntakeProblemsForPatients = <TQueryKey extends Array<unknown> = unknown[]>({ intakeFormUuid, intakeProblemUuid }: {
    intakeFormUuid: string;
    intakeProblemUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ProblemsControllerService.viewPatientIntakeProblemsForPatients>>, unknown, Awaited<ReturnType<typeof ProblemsControllerService.viewPatientIntakeProblemsForPatients>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useProblemsControllerServiceViewPatientIntakeProblemsForPatientsKey, ...(queryKey ?? [{ intakeFormUuid, intakeProblemUuid }])], queryFn: () => ProblemsControllerService.viewPatientIntakeProblemsForPatients(intakeFormUuid, intakeProblemUuid), ...options });
export const useProblemsControllerServiceUpdatePatientIntakeProblemsForPatient = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof ProblemsControllerService.updatePatientIntakeProblemsForPatient>>, unknown, {
    intakeFormUuid: string;
    intakeProblemUuid: string;
    requestBody: IntakeProblem;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ intakeFormUuid, intakeProblemUuid, requestBody }) => ProblemsControllerService.updatePatientIntakeProblemsForPatient(intakeFormUuid, intakeProblemUuid, requestBody), ...options });
export const useProblemsControllerServiceArchivePatientIntakeProblemsForPatients = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof ProblemsControllerService.archivePatientIntakeProblemsForPatients>>, unknown, {
    intakeFormUuid: string;
    intakeProblemUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ intakeFormUuid, intakeProblemUuid }) => ProblemsControllerService.archivePatientIntakeProblemsForPatients(intakeFormUuid, intakeProblemUuid), ...options });
export const useProblemsControllerServiceGetAllProblemsCatalogKey = "ProblemsControllerServiceGetAllProblemsCatalog";
export const useProblemsControllerServiceGetAllProblemsCatalog = <TQueryKey extends Array<unknown> = unknown[]>({ page, size, sort }: {
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ProblemsControllerService.getAllProblemsCatalog>>, unknown, Awaited<ReturnType<typeof ProblemsControllerService.getAllProblemsCatalog>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useProblemsControllerServiceGetAllProblemsCatalogKey, ...(queryKey ?? [{ page, size, sort }])], queryFn: () => ProblemsControllerService.getAllProblemsCatalog(page, size, sort), ...options });
export const useProblemsControllerServiceAddProblemsCatalog = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof ProblemsControllerService.addProblemsCatalog>>, unknown, {
    requestBody: Problem;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => ProblemsControllerService.addProblemsCatalog(requestBody), ...options });
export const useProblemsControllerServiceAddPatientIntakeProblems = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof ProblemsControllerService.addPatientIntakeProblems>>, unknown, {
    uuid: string;
    intakeFormUuid: string;
    requestBody: IntakeProblem;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ uuid, intakeFormUuid, requestBody }) => ProblemsControllerService.addPatientIntakeProblems(uuid, intakeFormUuid, requestBody), ...options });
export const useProblemsControllerServiceAddPatientIntakeProblemsForPatient = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof ProblemsControllerService.addPatientIntakeProblemsForPatient>>, unknown, {
    intakeFormUuid: string;
    requestBody: IntakeProblem;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ intakeFormUuid, requestBody }) => ProblemsControllerService.addPatientIntakeProblemsForPatient(intakeFormUuid, requestBody), ...options });
export const useProblemsControllerServiceGetPatientProblemsKey = "ProblemsControllerServiceGetPatientProblems";
export const useProblemsControllerServiceGetPatientProblems = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, page, size, status }: {
    patientUuid: string;
    page: number;
    size: number;
    status?: boolean;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ProblemsControllerService.getPatientProblems>>, unknown, Awaited<ReturnType<typeof ProblemsControllerService.getPatientProblems>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useProblemsControllerServiceGetPatientProblemsKey, ...(queryKey ?? [{ patientUuid, page, size, status }])], queryFn: () => ProblemsControllerService.getPatientProblems(patientUuid, page, size, status), ...options });
export const useProblemsControllerServiceGetPatientIntakeProblemsKey = "ProblemsControllerServiceGetPatientIntakeProblems";
export const useProblemsControllerServiceGetPatientIntakeProblems = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, intakeProblemUuid }: {
    patientUuid: string;
    intakeProblemUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ProblemsControllerService.getPatientIntakeProblems>>, unknown, Awaited<ReturnType<typeof ProblemsControllerService.getPatientIntakeProblems>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useProblemsControllerServiceGetPatientIntakeProblemsKey, ...(queryKey ?? [{ patientUuid, intakeProblemUuid }])], queryFn: () => ProblemsControllerService.getPatientIntakeProblems(patientUuid, intakeProblemUuid), ...options });
export const useProblemsControllerServiceViewPatientIntakeProblemsKey = "ProblemsControllerServiceViewPatientIntakeProblems";
export const useProblemsControllerServiceViewPatientIntakeProblems = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, intakeFormUuid, intakeProblemUuid }: {
    patientUuid: string;
    intakeFormUuid: string;
    intakeProblemUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ProblemsControllerService.viewPatientIntakeProblems>>, unknown, Awaited<ReturnType<typeof ProblemsControllerService.viewPatientIntakeProblems>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useProblemsControllerServiceViewPatientIntakeProblemsKey, ...(queryKey ?? [{ patientUuid, intakeFormUuid, intakeProblemUuid }])], queryFn: () => ProblemsControllerService.viewPatientIntakeProblems(patientUuid, intakeFormUuid, intakeProblemUuid), ...options });
export const useProblemsControllerServiceArchivePatientIntakeProblemsForProvider = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof ProblemsControllerService.archivePatientIntakeProblemsForProvider>>, unknown, {
    patientUuid: string;
    intakeFormUuid: string;
    intakeProblemUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, intakeFormUuid, intakeProblemUuid }) => ProblemsControllerService.archivePatientIntakeProblemsForProvider(patientUuid, intakeFormUuid, intakeProblemUuid), ...options });
export const useProblemsControllerServiceViewPatientProblemsKey = "ProblemsControllerServiceViewPatientProblems";
export const useProblemsControllerServiceViewPatientProblems = <TQueryKey extends Array<unknown> = unknown[]>({ patientProblemUuid }: {
    patientProblemUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ProblemsControllerService.viewPatientProblems>>, unknown, Awaited<ReturnType<typeof ProblemsControllerService.viewPatientProblems>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useProblemsControllerServiceViewPatientProblemsKey, ...(queryKey ?? [{ patientProblemUuid }])], queryFn: () => ProblemsControllerService.viewPatientProblems(patientProblemUuid), ...options });
export const useProblemsControllerServiceArchivePatientProblems = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof ProblemsControllerService.archivePatientProblems>>, unknown, {
    patientProblemUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientProblemUuid }) => ProblemsControllerService.archivePatientProblems(patientProblemUuid), ...options });
export const useProblemsControllerServiceGetPatientIntakeProblemsForPatientsKey = "ProblemsControllerServiceGetPatientIntakeProblemsForPatients";
export const useProblemsControllerServiceGetPatientIntakeProblemsForPatients = <TQueryKey extends Array<unknown> = unknown[]>({ intakeProblemUuid }: {
    intakeProblemUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ProblemsControllerService.getPatientIntakeProblemsForPatients>>, unknown, Awaited<ReturnType<typeof ProblemsControllerService.getPatientIntakeProblemsForPatients>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useProblemsControllerServiceGetPatientIntakeProblemsForPatientsKey, ...(queryKey ?? [{ intakeProblemUuid }])], queryFn: () => ProblemsControllerService.getPatientIntakeProblemsForPatients(intakeProblemUuid), ...options });
export const useProblemsControllerServiceDownloadPatientProblemsClinicalReportKey = "ProblemsControllerServiceDownloadPatientProblemsClinicalReport";
export const useProblemsControllerServiceDownloadPatientProblemsClinicalReport = <TQueryKey extends Array<unknown> = unknown[]>({ providerGroupUuid, exportType, searchString, startInstant, endInstant, page, size, sort }: {
    providerGroupUuid: string;
    exportType: "CSV" | "PDF";
    searchString?: string;
    startInstant?: string;
    endInstant?: string;
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ProblemsControllerService.downloadPatientProblemsClinicalReport>>, unknown, Awaited<ReturnType<typeof ProblemsControllerService.downloadPatientProblemsClinicalReport>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useProblemsControllerServiceDownloadPatientProblemsClinicalReportKey, ...(queryKey ?? [{ providerGroupUuid, exportType, searchString, startInstant, endInstant, page, size, sort }])], queryFn: () => ProblemsControllerService.downloadPatientProblemsClinicalReport(providerGroupUuid, exportType, searchString, startInstant, endInstant, page, size, sort), ...options });
export const useProblemsControllerServiceGetPatientProblemsReportsKey = "ProblemsControllerServiceGetPatientProblemsReports";
export const useProblemsControllerServiceGetPatientProblemsReports = <TQueryKey extends Array<unknown> = unknown[]>({ providerGroupUuid, searchString, startInstant, endInstant, page, size, sort }: {
    providerGroupUuid: string;
    searchString?: string;
    startInstant?: string;
    endInstant?: string;
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ProblemsControllerService.getPatientProblemsReports>>, unknown, Awaited<ReturnType<typeof ProblemsControllerService.getPatientProblemsReports>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useProblemsControllerServiceGetPatientProblemsReportsKey, ...(queryKey ?? [{ providerGroupUuid, searchString, startInstant, endInstant, page, size, sort }])], queryFn: () => ProblemsControllerService.getPatientProblemsReports(providerGroupUuid, searchString, startInstant, endInstant, page, size, sort), ...options });
export const usePharmacyControllerServiceViewPharmacyDetailsKey = "PharmacyControllerServiceViewPharmacyDetails";
export const usePharmacyControllerServiceViewPharmacyDetails = <TQueryKey extends Array<unknown> = unknown[]>({ pharmacyStoreUuid }: {
    pharmacyStoreUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PharmacyControllerService.viewPharmacyDetails>>, unknown, Awaited<ReturnType<typeof PharmacyControllerService.viewPharmacyDetails>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePharmacyControllerServiceViewPharmacyDetailsKey, ...(queryKey ?? [{ pharmacyStoreUuid }])], queryFn: () => PharmacyControllerService.viewPharmacyDetails(pharmacyStoreUuid), ...options });
export const usePharmacyControllerServiceUpdatePharmacy = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PharmacyControllerService.updatePharmacy>>, unknown, {
    pharmacyStoreUuid: string;
    requestBody: PharmacyStore;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ pharmacyStoreUuid, requestBody }) => PharmacyControllerService.updatePharmacy(pharmacyStoreUuid, requestBody), ...options });
export const usePharmacyControllerServiceArchivePharmacy = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PharmacyControllerService.archivePharmacy>>, unknown, {
    pharmacyStoreUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ pharmacyStoreUuid }) => PharmacyControllerService.archivePharmacy(pharmacyStoreUuid), ...options });
export const usePharmacyControllerServiceActivatePharmacy = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PharmacyControllerService.activatePharmacy>>, unknown, {
    pharmacyStoreUuid: string;
    status: boolean;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ pharmacyStoreUuid, status }) => PharmacyControllerService.activatePharmacy(pharmacyStoreUuid, status), ...options });
export const usePharmacyControllerServiceAddPharmacy = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PharmacyControllerService.addPharmacy>>, unknown, {
    requestBody: PharmacyStore;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => PharmacyControllerService.addPharmacy(requestBody), ...options });
export const usePharmacyControllerServiceGetPharmacyForProviderGroupKey = "PharmacyControllerServiceGetPharmacyForProviderGroup";
export const usePharmacyControllerServiceGetPharmacyForProviderGroup = <TQueryKey extends Array<unknown> = unknown[]>({ providerGroupUuid, page, size, sortBy, sortDirection }: {
    providerGroupUuid: string;
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PharmacyControllerService.getPharmacyForProviderGroup>>, unknown, Awaited<ReturnType<typeof PharmacyControllerService.getPharmacyForProviderGroup>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePharmacyControllerServiceGetPharmacyForProviderGroupKey, ...(queryKey ?? [{ providerGroupUuid, page, size, sortBy, sortDirection }])], queryFn: () => PharmacyControllerService.getPharmacyForProviderGroup(providerGroupUuid, page, size, sortBy, sortDirection), ...options });
export const usePermissionControllerServiceGetAllPermissionsKey = "PermissionControllerServiceGetAllPermissions";
export const usePermissionControllerServiceGetAllPermissions = <TQueryKey extends Array<unknown> = unknown[]>({ accessCategory, page, size, sortBy, sortDirection }: {
    accessCategory: "ADMIN" | "CARE_PROVIDER" | "GLOBAL_PROVIDER" | "PROVIDER" | "BOTH";
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PermissionControllerService.getAllPermissions>>, unknown, Awaited<ReturnType<typeof PermissionControllerService.getAllPermissions>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePermissionControllerServiceGetAllPermissionsKey, ...(queryKey ?? [{ accessCategory, page, size, sortBy, sortDirection }])], queryFn: () => PermissionControllerService.getAllPermissions(accessCategory, page, size, sortBy, sortDirection), ...options });
export const usePaymentControllerServiceMakeCharge = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PaymentControllerService.makeCharge>>, unknown, {
    appointmentUuid: string;
    amount: number;
    paymentMode: "WALLET" | "CARD" | "CASH" | "NET_BANKING";
    paymentCardUuid?: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ appointmentUuid, amount, paymentMode, paymentCardUuid }) => PaymentControllerService.makeCharge(appointmentUuid, amount, paymentMode, paymentCardUuid), ...options });
export const usePaymentControllerServiceGetPaymentHistoryKey = "PaymentControllerServiceGetPaymentHistory";
export const usePaymentControllerServiceGetPaymentHistory = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, startDate, endDate, page, size, sort }: {
    patientUuid: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PaymentControllerService.getPaymentHistory>>, unknown, Awaited<ReturnType<typeof PaymentControllerService.getPaymentHistory>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePaymentControllerServiceGetPaymentHistoryKey, ...(queryKey ?? [{ patientUuid, startDate, endDate, page, size, sort }])], queryFn: () => PaymentControllerService.getPaymentHistory(patientUuid, startDate, endDate, page, size, sort), ...options });
export const usePatientSurgicalHistoryControllerServiceUpdateSurgicalHistory = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientSurgicalHistoryControllerService.updateSurgicalHistory>>, unknown, {
    requestBody: PatientPastSurgicalHistory;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => PatientSurgicalHistoryControllerService.updateSurgicalHistory(requestBody), ...options });
export const usePatientSurgicalHistoryControllerServiceAddSurgicalHistory = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientSurgicalHistoryControllerService.addSurgicalHistory>>, unknown, {
    requestBody: PatientPastSurgicalHistory;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => PatientSurgicalHistoryControllerService.addSurgicalHistory(requestBody), ...options });
export const usePatientSurgicalHistoryControllerServiceViewSurgicalHistoryKey = "PatientSurgicalHistoryControllerServiceViewSurgicalHistory";
export const usePatientSurgicalHistoryControllerServiceViewSurgicalHistory = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, page, size, sort }: {
    patientUuid: string;
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientSurgicalHistoryControllerService.viewSurgicalHistory>>, unknown, Awaited<ReturnType<typeof PatientSurgicalHistoryControllerService.viewSurgicalHistory>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientSurgicalHistoryControllerServiceViewSurgicalHistoryKey, ...(queryKey ?? [{ patientUuid, page, size, sort }])], queryFn: () => PatientSurgicalHistoryControllerService.viewSurgicalHistory(patientUuid, page, size, sort), ...options });
export const usePatientSurgicalHistoryControllerServiceDeleteMedicalHistory = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientSurgicalHistoryControllerService.deleteMedicalHistory>>, unknown, {
    historyId: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ historyId }) => PatientSurgicalHistoryControllerService.deleteMedicalHistory(historyId), ...options });
export const usePatientSocialHistoryControllerServiceUpdatePatientSocialHistory = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientSocialHistoryControllerService.updatePatientSocialHistory>>, unknown, {
    requestBody: PatientSocialHistory;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => PatientSocialHistoryControllerService.updatePatientSocialHistory(requestBody), ...options });
export const usePatientSocialHistoryControllerServiceCreatePatientSocialHistory = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientSocialHistoryControllerService.createPatientSocialHistory>>, unknown, {
    requestBody: PatientSocialHistory;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => PatientSocialHistoryControllerService.createPatientSocialHistory(requestBody), ...options });
export const usePatientSocialHistoryControllerServiceGetPatientSocialHistoryKey = "PatientSocialHistoryControllerServiceGetPatientSocialHistory";
export const usePatientSocialHistoryControllerServiceGetPatientSocialHistory = <TQueryKey extends Array<unknown> = unknown[]>({ patientSocialHistoryUuid }: {
    patientSocialHistoryUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientSocialHistoryControllerService.getPatientSocialHistory>>, unknown, Awaited<ReturnType<typeof PatientSocialHistoryControllerService.getPatientSocialHistory>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientSocialHistoryControllerServiceGetPatientSocialHistoryKey, ...(queryKey ?? [{ patientSocialHistoryUuid }])], queryFn: () => PatientSocialHistoryControllerService.getPatientSocialHistory(patientSocialHistoryUuid), ...options });
export const usePatientSocialHistoryControllerServiceDeletePatientSocialHistory = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientSocialHistoryControllerService.deletePatientSocialHistory>>, unknown, {
    patientSocialHistoryUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientSocialHistoryUuid }) => PatientSocialHistoryControllerService.deletePatientSocialHistory(patientSocialHistoryUuid), ...options });
export const usePatientSocialHistoryControllerServiceGetAllPatientSocialHistoryKey = "PatientSocialHistoryControllerServiceGetAllPatientSocialHistory";
export const usePatientSocialHistoryControllerServiceGetAllPatientSocialHistory = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, socialHistoryType, page, size, sort }: {
    patientUuid: string;
    socialHistoryType: "EDUCATION_LEVEL" | "FINANCIAL_STRAIN" | "EXPOSURE_TO_VIOLENCE" | "TOBACCO_USE" | "ALCOHOL_USE" | "PHYSICAL_ACTIVITY" | "STRESS" | "SEXUAL_ORIENTATION" | "NUTRITION_HISTORY" | "SOCIAL_HISTORY";
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientSocialHistoryControllerService.getAllPatientSocialHistory>>, unknown, Awaited<ReturnType<typeof PatientSocialHistoryControllerService.getAllPatientSocialHistory>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientSocialHistoryControllerServiceGetAllPatientSocialHistoryKey, ...(queryKey ?? [{ patientUuid, socialHistoryType, page, size, sort }])], queryFn: () => PatientSocialHistoryControllerService.getAllPatientSocialHistory(patientUuid, socialHistoryType, page, size, sort), ...options });
export const usePatientPortalAccessControllerServiceUpdatePatientPortalAccess = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientPortalAccessControllerService.updatePatientPortalAccess>>, unknown, {
    patientUuid: string;
    status: boolean;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, status }) => PatientPortalAccessControllerService.updatePatientPortalAccess(patientUuid, status), ...options });
export const usePatientPortalAccessControllerServiceAddPatientPortalPermission = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientPortalAccessControllerService.addPatientPortalPermission>>, unknown, {
    requestBody: PatientPermission;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => PatientPortalAccessControllerService.addPatientPortalPermission(requestBody), ...options });
export const usePatientPortalAccessControllerServiceViewPatientPortalPermissionsKey = "PatientPortalAccessControllerServiceViewPatientPortalPermissions";
export const usePatientPortalAccessControllerServiceViewPatientPortalPermissions = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid }: {
    patientUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientPortalAccessControllerService.viewPatientPortalPermissions>>, unknown, Awaited<ReturnType<typeof PatientPortalAccessControllerService.viewPatientPortalPermissions>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientPortalAccessControllerServiceViewPatientPortalPermissionsKey, ...(queryKey ?? [{ patientUuid }])], queryFn: () => PatientPortalAccessControllerService.viewPatientPortalPermissions(patientUuid), ...options });
export const usePatientPaymentControllerServiceEditPayment = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientPaymentControllerService.editPayment>>, unknown, {
    patientUuid: string;
    paymentUuid: string;
    requestBody: PatientPayment;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, paymentUuid, requestBody }) => PatientPaymentControllerService.editPayment(patientUuid, paymentUuid, requestBody), ...options });
export const usePatientPaymentControllerServiceAddPayment = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientPaymentControllerService.addPayment>>, unknown, {
    uuid: string;
    requestBody: PatientPayment;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ uuid, requestBody }) => PatientPaymentControllerService.addPayment(uuid, requestBody), ...options });
export const usePatientPaymentControllerServiceViewAdjustPaymentForPatientKey = "PatientPaymentControllerServiceViewAdjustPaymentForPatient";
export const usePatientPaymentControllerServiceViewAdjustPaymentForPatient = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, patientPaymentUuid }: {
    patientUuid: string;
    patientPaymentUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientPaymentControllerService.viewAdjustPaymentForPatient>>, unknown, Awaited<ReturnType<typeof PatientPaymentControllerService.viewAdjustPaymentForPatient>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientPaymentControllerServiceViewAdjustPaymentForPatientKey, ...(queryKey ?? [{ patientUuid, patientPaymentUuid }])], queryFn: () => PatientPaymentControllerService.viewAdjustPaymentForPatient(patientUuid, patientPaymentUuid), ...options });
export const usePatientPaymentControllerServiceAdjustPaymentForPatient = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientPaymentControllerService.adjustPaymentForPatient>>, unknown, {
    patientUuid: string;
    patientPaymentUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, patientPaymentUuid }) => PatientPaymentControllerService.adjustPaymentForPatient(patientUuid, patientPaymentUuid), ...options });
export const usePatientPaymentControllerServiceGetPaymentsForProviderGroupKey = "PatientPaymentControllerServiceGetPaymentsForProviderGroup";
export const usePatientPaymentControllerServiceGetPaymentsForProviderGroup = <TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientPaymentControllerService.getPaymentsForProviderGroup>>, unknown, Awaited<ReturnType<typeof PatientPaymentControllerService.getPaymentsForProviderGroup>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientPaymentControllerServiceGetPaymentsForProviderGroupKey, ...(queryKey ?? [])], queryFn: () => PatientPaymentControllerService.getPaymentsForProviderGroup(), ...options });
export const usePatientPaymentControllerServiceViewPaymentDetailsKey = "PatientPaymentControllerServiceViewPaymentDetails";
export const usePatientPaymentControllerServiceViewPaymentDetails = <TQueryKey extends Array<unknown> = unknown[]>({ paymentUuid }: {
    paymentUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientPaymentControllerService.viewPaymentDetails>>, unknown, Awaited<ReturnType<typeof PatientPaymentControllerService.viewPaymentDetails>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientPaymentControllerServiceViewPaymentDetailsKey, ...(queryKey ?? [{ paymentUuid }])], queryFn: () => PatientPaymentControllerService.viewPaymentDetails(paymentUuid), ...options });
export const usePatientPaymentControllerServiceDiscardPayment = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientPaymentControllerService.discardPayment>>, unknown, {
    paymentUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ paymentUuid }) => PatientPaymentControllerService.discardPayment(paymentUuid), ...options });
export const usePatientPaymentControllerServicePreviewPaymentReceiptKey = "PatientPaymentControllerServicePreviewPaymentReceipt";
export const usePatientPaymentControllerServicePreviewPaymentReceipt = <TQueryKey extends Array<unknown> = unknown[]>({ paymentUuid }: {
    paymentUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientPaymentControllerService.previewPaymentReceipt>>, unknown, Awaited<ReturnType<typeof PatientPaymentControllerService.previewPaymentReceipt>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientPaymentControllerServicePreviewPaymentReceiptKey, ...(queryKey ?? [{ paymentUuid }])], queryFn: () => PatientPaymentControllerService.previewPaymentReceipt(paymentUuid), ...options });
export const usePatientPaymentControllerServiceDownloadPaymentReceiptKey = "PatientPaymentControllerServiceDownloadPaymentReceipt";
export const usePatientPaymentControllerServiceDownloadPaymentReceipt = <TQueryKey extends Array<unknown> = unknown[]>({ paymentUuid }: {
    paymentUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientPaymentControllerService.downloadPaymentReceipt>>, unknown, Awaited<ReturnType<typeof PatientPaymentControllerService.downloadPaymentReceipt>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientPaymentControllerServiceDownloadPaymentReceiptKey, ...(queryKey ?? [{ paymentUuid }])], queryFn: () => PatientPaymentControllerService.downloadPaymentReceipt(paymentUuid), ...options });
export const usePatientPaymentControllerServiceGetPaymentsForPatientKey = "PatientPaymentControllerServiceGetPaymentsForPatient";
export const usePatientPaymentControllerServiceGetPaymentsForPatient = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid }: {
    patientUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientPaymentControllerService.getPaymentsForPatient>>, unknown, Awaited<ReturnType<typeof PatientPaymentControllerService.getPaymentsForPatient>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientPaymentControllerServiceGetPaymentsForPatientKey, ...(queryKey ?? [{ patientUuid }])], queryFn: () => PatientPaymentControllerService.getPaymentsForPatient(patientUuid), ...options });
export const usePatientLabResultsControllerServiceUpdatePatientIntakeLabResults = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientLabResultsControllerService.updatePatientIntakeLabResults>>, unknown, {
    uuid: string;
    intakeFormUuid: string;
    labResultUuid: string;
    requestBody: PatientLabResult;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ uuid, intakeFormUuid, labResultUuid, requestBody }) => PatientLabResultsControllerService.updatePatientIntakeLabResults(uuid, intakeFormUuid, labResultUuid, requestBody), ...options });
export const usePatientLabResultsControllerServiceUpdatePatientLabResults = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientLabResultsControllerService.updatePatientLabResults>>, unknown, {
    requestBody: PatientLabResult;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => PatientLabResultsControllerService.updatePatientLabResults(requestBody), ...options });
export const usePatientLabResultsControllerServiceAddLabResults = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientLabResultsControllerService.addLabResults>>, unknown, {
    requestBody: PatientLabResult;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => PatientLabResultsControllerService.addLabResults(requestBody), ...options });
export const usePatientLabResultsControllerServiceViewPatientIntakeLabResultsForPatientsKey = "PatientLabResultsControllerServiceViewPatientIntakeLabResultsForPatients";
export const usePatientLabResultsControllerServiceViewPatientIntakeLabResultsForPatients = <TQueryKey extends Array<unknown> = unknown[]>({ intakeFormUuid, labResultUuid }: {
    intakeFormUuid: string;
    labResultUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientLabResultsControllerService.viewPatientIntakeLabResultsForPatients>>, unknown, Awaited<ReturnType<typeof PatientLabResultsControllerService.viewPatientIntakeLabResultsForPatients>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientLabResultsControllerServiceViewPatientIntakeLabResultsForPatientsKey, ...(queryKey ?? [{ intakeFormUuid, labResultUuid }])], queryFn: () => PatientLabResultsControllerService.viewPatientIntakeLabResultsForPatients(intakeFormUuid, labResultUuid), ...options });
export const usePatientLabResultsControllerServiceUpdatePatientIntakeLabResultsForPatient = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientLabResultsControllerService.updatePatientIntakeLabResultsForPatient>>, unknown, {
    intakeFormUuid: string;
    labResultUuid: string;
    requestBody: PatientLabResult;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ intakeFormUuid, labResultUuid, requestBody }) => PatientLabResultsControllerService.updatePatientIntakeLabResultsForPatient(intakeFormUuid, labResultUuid, requestBody), ...options });
export const usePatientLabResultsControllerServiceArchiveIntakeLabResultsForPatient = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientLabResultsControllerService.archiveIntakeLabResultsForPatient>>, unknown, {
    intakeFormUuid: string;
    labResultUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ intakeFormUuid, labResultUuid }) => PatientLabResultsControllerService.archiveIntakeLabResultsForPatient(intakeFormUuid, labResultUuid), ...options });
export const usePatientLabResultsControllerServiceGetPatientIntakeLabResultsKey = "PatientLabResultsControllerServiceGetPatientIntakeLabResults";
export const usePatientLabResultsControllerServiceGetPatientIntakeLabResults = <TQueryKey extends Array<unknown> = unknown[]>({ uuid, intakeFormUuid }: {
    uuid: string;
    intakeFormUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientLabResultsControllerService.getPatientIntakeLabResults>>, unknown, Awaited<ReturnType<typeof PatientLabResultsControllerService.getPatientIntakeLabResults>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientLabResultsControllerServiceGetPatientIntakeLabResultsKey, ...(queryKey ?? [{ uuid, intakeFormUuid }])], queryFn: () => PatientLabResultsControllerService.getPatientIntakeLabResults(uuid, intakeFormUuid), ...options });
export const usePatientLabResultsControllerServiceAddIntakeLabResults = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientLabResultsControllerService.addIntakeLabResults>>, unknown, {
    uuid: string;
    intakeFormUuid: string;
    requestBody: PatientLabResult;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ uuid, intakeFormUuid, requestBody }) => PatientLabResultsControllerService.addIntakeLabResults(uuid, intakeFormUuid, requestBody), ...options });
export const usePatientLabResultsControllerServiceGetPatientIntakeLabResultsForPatientKey = "PatientLabResultsControllerServiceGetPatientIntakeLabResultsForPatient";
export const usePatientLabResultsControllerServiceGetPatientIntakeLabResultsForPatient = <TQueryKey extends Array<unknown> = unknown[]>({ uuid }: {
    uuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientLabResultsControllerService.getPatientIntakeLabResultsForPatient>>, unknown, Awaited<ReturnType<typeof PatientLabResultsControllerService.getPatientIntakeLabResultsForPatient>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientLabResultsControllerServiceGetPatientIntakeLabResultsForPatientKey, ...(queryKey ?? [{ uuid }])], queryFn: () => PatientLabResultsControllerService.getPatientIntakeLabResultsForPatient(uuid), ...options });
export const usePatientLabResultsControllerServiceAddIntakeLabResultsForPatient = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientLabResultsControllerService.addIntakeLabResultsForPatient>>, unknown, {
    uuid: string;
    requestBody: PatientLabResult;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ uuid, requestBody }) => PatientLabResultsControllerService.addIntakeLabResultsForPatient(uuid, requestBody), ...options });
export const usePatientLabResultsControllerServiceGetPatientsLabResultsKey = "PatientLabResultsControllerServiceGetPatientsLabResults";
export const usePatientLabResultsControllerServiceGetPatientsLabResults = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, page, size, sortBy, sortDirection }: {
    patientUuid: string;
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientLabResultsControllerService.getPatientsLabResults>>, unknown, Awaited<ReturnType<typeof PatientLabResultsControllerService.getPatientsLabResults>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientLabResultsControllerServiceGetPatientsLabResultsKey, ...(queryKey ?? [{ patientUuid, page, size, sortBy, sortDirection }])], queryFn: () => PatientLabResultsControllerService.getPatientsLabResults(patientUuid, page, size, sortBy, sortDirection), ...options });
export const usePatientLabResultsControllerServiceViewPatientIntakeLabResultsKey = "PatientLabResultsControllerServiceViewPatientIntakeLabResults";
export const usePatientLabResultsControllerServiceViewPatientIntakeLabResults = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, intakeFormUuid, labResultUuid }: {
    patientUuid: string;
    intakeFormUuid: string;
    labResultUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientLabResultsControllerService.viewPatientIntakeLabResults>>, unknown, Awaited<ReturnType<typeof PatientLabResultsControllerService.viewPatientIntakeLabResults>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientLabResultsControllerServiceViewPatientIntakeLabResultsKey, ...(queryKey ?? [{ patientUuid, intakeFormUuid, labResultUuid }])], queryFn: () => PatientLabResultsControllerService.viewPatientIntakeLabResults(patientUuid, intakeFormUuid, labResultUuid), ...options });
export const usePatientLabResultsControllerServiceArchiveIntakeLabResults = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientLabResultsControllerService.archiveIntakeLabResults>>, unknown, {
    patientUuid: string;
    intakeFormUuid: string;
    labResultUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, intakeFormUuid, labResultUuid }) => PatientLabResultsControllerService.archiveIntakeLabResults(patientUuid, intakeFormUuid, labResultUuid), ...options });
export const usePatientLabResultsControllerServiceViewPatientLabResultsKey = "PatientLabResultsControllerServiceViewPatientLabResults";
export const usePatientLabResultsControllerServiceViewPatientLabResults = <TQueryKey extends Array<unknown> = unknown[]>({ patientLabResultUuid }: {
    patientLabResultUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientLabResultsControllerService.viewPatientLabResults>>, unknown, Awaited<ReturnType<typeof PatientLabResultsControllerService.viewPatientLabResults>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientLabResultsControllerServiceViewPatientLabResultsKey, ...(queryKey ?? [{ patientLabResultUuid }])], queryFn: () => PatientLabResultsControllerService.viewPatientLabResults(patientLabResultUuid), ...options });
export const usePatientLabResultsControllerServiceArchiveLabResults = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientLabResultsControllerService.archiveLabResults>>, unknown, {
    patientLabResultUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientLabResultUuid }) => PatientLabResultsControllerService.archiveLabResults(patientLabResultUuid), ...options });
export const usePatientLabResultsControllerServiceDownloadPatientLabResultsListKey = "PatientLabResultsControllerServiceDownloadPatientLabResultsList";
export const usePatientLabResultsControllerServiceDownloadPatientLabResultsList = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, exportType, page, size, sortBy, sortDirection }: {
    patientUuid: string;
    exportType: "CSV" | "PDF";
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientLabResultsControllerService.downloadPatientLabResultsList>>, unknown, Awaited<ReturnType<typeof PatientLabResultsControllerService.downloadPatientLabResultsList>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientLabResultsControllerServiceDownloadPatientLabResultsListKey, ...(queryKey ?? [{ patientUuid, exportType, page, size, sortBy, sortDirection }])], queryFn: () => PatientLabResultsControllerService.downloadPatientLabResultsList(patientUuid, exportType, page, size, sortBy, sortDirection), ...options });
export const usePatientLabOrderControllerServiceUpdatePatientLabOrder = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientLabOrderControllerService.updatePatientLabOrder>>, unknown, {
    requestBody: PatientLabOrder;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => PatientLabOrderControllerService.updatePatientLabOrder(requestBody), ...options });
export const usePatientLabOrderControllerServiceAddPatientLabOrder = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientLabOrderControllerService.addPatientLabOrder>>, unknown, {
    requestBody: PatientLabOrder;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => PatientLabOrderControllerService.addPatientLabOrder(requestBody), ...options });
export const usePatientLabOrderControllerServiceUpdateMarkAsCompleted = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientLabOrderControllerService.updateMarkAsCompleted>>, unknown, {
    patientLabOrderUuid: string;
    status: "RECEIVE" | "SEND" | "DRAFT" | "COMPLETE";
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientLabOrderUuid, status }) => PatientLabOrderControllerService.updateMarkAsCompleted(patientLabOrderUuid, status), ...options });
export const usePatientLabOrderControllerServiceAddOrderSet = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientLabOrderControllerService.addOrderSet>>, unknown, {
    requestBody: OrderSet;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => PatientLabOrderControllerService.addOrderSet(requestBody), ...options });
export const usePatientLabOrderControllerServiceGetPatientLabOrderKey = "PatientLabOrderControllerServiceGetPatientLabOrder";
export const usePatientLabOrderControllerServiceGetPatientLabOrder = <TQueryKey extends Array<unknown> = unknown[]>({ patientLabOrderUuid }: {
    patientLabOrderUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientLabOrderControllerService.getPatientLabOrder>>, unknown, Awaited<ReturnType<typeof PatientLabOrderControllerService.getPatientLabOrder>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientLabOrderControllerServiceGetPatientLabOrderKey, ...(queryKey ?? [{ patientLabOrderUuid }])], queryFn: () => PatientLabOrderControllerService.getPatientLabOrder(patientLabOrderUuid), ...options });
export const usePatientLabOrderControllerServiceDeletePatientLabOrder = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientLabOrderControllerService.deletePatientLabOrder>>, unknown, {
    patientLabOrderUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientLabOrderUuid }) => PatientLabOrderControllerService.deletePatientLabOrder(patientLabOrderUuid), ...options });
export const usePatientLabOrderControllerServiceGetAllLabOrdersKey = "PatientLabOrderControllerServiceGetAllLabOrders";
export const usePatientLabOrderControllerServiceGetAllLabOrders = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, page, size, sortBy, sortDirection }: {
    patientUuid: string;
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientLabOrderControllerService.getAllLabOrders>>, unknown, Awaited<ReturnType<typeof PatientLabOrderControllerService.getAllLabOrders>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientLabOrderControllerServiceGetAllLabOrdersKey, ...(queryKey ?? [{ patientUuid, page, size, sortBy, sortDirection }])], queryFn: () => PatientLabOrderControllerService.getAllLabOrders(patientUuid, page, size, sortBy, sortDirection), ...options });
export const usePatientLabOrderControllerServiceGetAllTestsKey = "PatientLabOrderControllerServiceGetAllTests";
export const usePatientLabOrderControllerServiceGetAllTests = <TQueryKey extends Array<unknown> = unknown[]>({ page, size, sortBy, sortDirection }: {
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientLabOrderControllerService.getAllTests>>, unknown, Awaited<ReturnType<typeof PatientLabOrderControllerService.getAllTests>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientLabOrderControllerServiceGetAllTestsKey, ...(queryKey ?? [{ page, size, sortBy, sortDirection }])], queryFn: () => PatientLabOrderControllerService.getAllTests(page, size, sortBy, sortDirection), ...options });
export const usePatientImageResultControllerServiceUpdateImageResults = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientImageResultControllerService.updateImageResults>>, unknown, {
    requestBody: PatientImageResult;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => PatientImageResultControllerService.updateImageResults(requestBody), ...options });
export const usePatientImageResultControllerServiceAddImageResults = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientImageResultControllerService.addImageResults>>, unknown, {
    requestBody: PatientImageResult;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => PatientImageResultControllerService.addImageResults(requestBody), ...options });
export const usePatientImageResultControllerServiceViewPatientImageResultsKey = "PatientImageResultControllerServiceViewPatientImageResults";
export const usePatientImageResultControllerServiceViewPatientImageResults = <TQueryKey extends Array<unknown> = unknown[]>({ patientImageResultUuid }: {
    patientImageResultUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientImageResultControllerService.viewPatientImageResults>>, unknown, Awaited<ReturnType<typeof PatientImageResultControllerService.viewPatientImageResults>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientImageResultControllerServiceViewPatientImageResultsKey, ...(queryKey ?? [{ patientImageResultUuid }])], queryFn: () => PatientImageResultControllerService.viewPatientImageResults(patientImageResultUuid), ...options });
export const usePatientImageResultControllerServiceDeletePatientImageResults = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientImageResultControllerService.deletePatientImageResults>>, unknown, {
    patientImageResultUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientImageResultUuid }) => PatientImageResultControllerService.deletePatientImageResults(patientImageResultUuid), ...options });
export const usePatientImageResultControllerServiceGetPatientsImageResultsKey = "PatientImageResultControllerServiceGetPatientsImageResults";
export const usePatientImageResultControllerServiceGetPatientsImageResults = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, page, size, sortBy, sortDirection }: {
    patientUuid: string;
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientImageResultControllerService.getPatientsImageResults>>, unknown, Awaited<ReturnType<typeof PatientImageResultControllerService.getPatientsImageResults>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientImageResultControllerServiceGetPatientsImageResultsKey, ...(queryKey ?? [{ patientUuid, page, size, sortBy, sortDirection }])], queryFn: () => PatientImageResultControllerService.getPatientsImageResults(patientUuid, page, size, sortBy, sortDirection), ...options });
export const usePatientImageResultControllerServiceDownloadPatientImageResultsListKey = "PatientImageResultControllerServiceDownloadPatientImageResultsList";
export const usePatientImageResultControllerServiceDownloadPatientImageResultsList = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, exportType, page, size, sortBy, sortDirection }: {
    patientUuid: string;
    exportType: "CSV" | "PDF";
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientImageResultControllerService.downloadPatientImageResultsList>>, unknown, Awaited<ReturnType<typeof PatientImageResultControllerService.downloadPatientImageResultsList>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientImageResultControllerServiceDownloadPatientImageResultsListKey, ...(queryKey ?? [{ patientUuid, exportType, page, size, sortBy, sortDirection }])], queryFn: () => PatientImageResultControllerService.downloadPatientImageResultsList(patientUuid, exportType, page, size, sortBy, sortDirection), ...options });
export const usePatientImageOrderControllerServiceUpdatePatientImageOrder = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientImageOrderControllerService.updatePatientImageOrder>>, unknown, {
    requestBody: PatientImageOrder;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => PatientImageOrderControllerService.updatePatientImageOrder(requestBody), ...options });
export const usePatientImageOrderControllerServiceAddPatientImageOrder = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientImageOrderControllerService.addPatientImageOrder>>, unknown, {
    requestBody: PatientImageOrder;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => PatientImageOrderControllerService.addPatientImageOrder(requestBody), ...options });
export const usePatientImageOrderControllerServiceUpdateMarkAsCompleted1 = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientImageOrderControllerService.updateMarkAsCompleted1>>, unknown, {
    imageOrderUuid: string;
    status: "RECEIVE" | "SEND" | "DRAFT" | "COMPLETE";
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ imageOrderUuid, status }) => PatientImageOrderControllerService.updateMarkAsCompleted1(imageOrderUuid, status), ...options });
export const usePatientImageOrderControllerServiceAddImageOrderSet = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientImageOrderControllerService.addImageOrderSet>>, unknown, {
    requestBody: ImageOrderSet;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => PatientImageOrderControllerService.addImageOrderSet(requestBody), ...options });
export const usePatientImageOrderControllerServiceViewImageOrderKey = "PatientImageOrderControllerServiceViewImageOrder";
export const usePatientImageOrderControllerServiceViewImageOrder = <TQueryKey extends Array<unknown> = unknown[]>({ imageOrderUuid }: {
    imageOrderUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientImageOrderControllerService.viewImageOrder>>, unknown, Awaited<ReturnType<typeof PatientImageOrderControllerService.viewImageOrder>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientImageOrderControllerServiceViewImageOrderKey, ...(queryKey ?? [{ imageOrderUuid }])], queryFn: () => PatientImageOrderControllerService.viewImageOrder(imageOrderUuid), ...options });
export const usePatientImageOrderControllerServiceDeleteImageOrder = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientImageOrderControllerService.deleteImageOrder>>, unknown, {
    imageOrderUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ imageOrderUuid }) => PatientImageOrderControllerService.deleteImageOrder(imageOrderUuid), ...options });
export const usePatientImageOrderControllerServiceGetAllImageOrdersKey = "PatientImageOrderControllerServiceGetAllImageOrders";
export const usePatientImageOrderControllerServiceGetAllImageOrders = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, page, size, sortBy, sortDirection }: {
    patientUuid: string;
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientImageOrderControllerService.getAllImageOrders>>, unknown, Awaited<ReturnType<typeof PatientImageOrderControllerService.getAllImageOrders>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientImageOrderControllerServiceGetAllImageOrdersKey, ...(queryKey ?? [{ patientUuid, page, size, sortBy, sortDirection }])], queryFn: () => PatientImageOrderControllerService.getAllImageOrders(patientUuid, page, size, sortBy, sortDirection), ...options });
export const usePatientImageOrderControllerServiceGetAllOrderStudiesKey = "PatientImageOrderControllerServiceGetAllOrderStudies";
export const usePatientImageOrderControllerServiceGetAllOrderStudies = <TQueryKey extends Array<unknown> = unknown[]>({ page, size, sortBy, sortDirection }: {
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientImageOrderControllerService.getAllOrderStudies>>, unknown, Awaited<ReturnType<typeof PatientImageOrderControllerService.getAllOrderStudies>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientImageOrderControllerServiceGetAllOrderStudiesKey, ...(queryKey ?? [{ page, size, sortBy, sortDirection }])], queryFn: () => PatientImageOrderControllerService.getAllOrderStudies(page, size, sortBy, sortDirection), ...options });
export const usePatientImageOrderControllerServiceGetAllImageCentersKey = "PatientImageOrderControllerServiceGetAllImageCenters";
export const usePatientImageOrderControllerServiceGetAllImageCenters = <TQueryKey extends Array<unknown> = unknown[]>({ page, size, sortBy, sortDirection }: {
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientImageOrderControllerService.getAllImageCenters>>, unknown, Awaited<ReturnType<typeof PatientImageOrderControllerService.getAllImageCenters>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientImageOrderControllerServiceGetAllImageCentersKey, ...(queryKey ?? [{ page, size, sortBy, sortDirection }])], queryFn: () => PatientImageOrderControllerService.getAllImageCenters(page, size, sortBy, sortDirection), ...options });
export const usePatientFlagsControllerServiceUpdatePatientFlags = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientFlagsControllerService.updatePatientFlags>>, unknown, {
    requestBody: PatientFlags;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => PatientFlagsControllerService.updatePatientFlags(requestBody), ...options });
export const usePatientFlagsControllerServiceCreatePatientFlags = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientFlagsControllerService.createPatientFlags>>, unknown, {
    requestBody: PatientFlags;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => PatientFlagsControllerService.createPatientFlags(requestBody), ...options });
export const usePatientFlagsControllerServiceAttachPatientFlags = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientFlagsControllerService.attachPatientFlags>>, unknown, {
    requestBody: AttachPatientFlagRequest;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => PatientFlagsControllerService.attachPatientFlags(requestBody), ...options });
export const usePatientFlagsControllerServiceGetAllPatientFlagsKey = "PatientFlagsControllerServiceGetAllPatientFlags";
export const usePatientFlagsControllerServiceGetAllPatientFlags = <TQueryKey extends Array<unknown> = unknown[]>({ providerGroupUuid, page, size, sort }: {
    providerGroupUuid: string;
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientFlagsControllerService.getAllPatientFlags>>, unknown, Awaited<ReturnType<typeof PatientFlagsControllerService.getAllPatientFlags>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientFlagsControllerServiceGetAllPatientFlagsKey, ...(queryKey ?? [{ providerGroupUuid, page, size, sort }])], queryFn: () => PatientFlagsControllerService.getAllPatientFlags(providerGroupUuid, page, size, sort), ...options });
export const usePatientFlagsControllerServiceDeletePatientFlags = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientFlagsControllerService.deletePatientFlags>>, unknown, {
    patientFlagsUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientFlagsUuid }) => PatientFlagsControllerService.deletePatientFlags(patientFlagsUuid), ...options });
export const usePatientDocumentControllerServiceUploadDocument = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientDocumentControllerService.uploadDocument>>, unknown, {
    patientId: string;
    documentName: string;
    documentTypes: string;
    recordedDate: string;
    documentType: "PDF" | "MS_WORD" | "ZIP" | "X_GZIP" | "X_COMPRESSED" | "DOCX" | "RTF" | "PLAIN" | "JPEG_IMAGE" | "PNG_IMAGE" | "GIF_IMAGE" | "BMP_IMAGE" | "WEBP_IMAGE" | "SVG_IMAGE" | "MPEG_AUDIO" | "OTHER" | "CSV";
    requestBody?: {
        file: Blob;
    };
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientId, documentName, documentTypes, recordedDate, documentType, requestBody }) => PatientDocumentControllerService.uploadDocument(patientId, documentName, documentTypes, recordedDate, documentType, requestBody), ...options });
export const usePatientDocumentControllerServiceGetDocumentOfPatientKey = "PatientDocumentControllerServiceGetDocumentOfPatient";
export const usePatientDocumentControllerServiceGetDocumentOfPatient = <TQueryKey extends Array<unknown> = unknown[]>({ documentUuid }: {
    documentUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientDocumentControllerService.getDocumentOfPatient>>, unknown, Awaited<ReturnType<typeof PatientDocumentControllerService.getDocumentOfPatient>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientDocumentControllerServiceGetDocumentOfPatientKey, ...(queryKey ?? [{ documentUuid }])], queryFn: () => PatientDocumentControllerService.getDocumentOfPatient(documentUuid), ...options });
export const usePatientDocumentControllerServiceArchiveDocument = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientDocumentControllerService.archiveDocument>>, unknown, {
    documentUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ documentUuid }) => PatientDocumentControllerService.archiveDocument(documentUuid), ...options });
export const usePatientDocumentControllerServiceGetAllDocumentsOfPatientKey = "PatientDocumentControllerServiceGetAllDocumentsOfPatient";
export const usePatientDocumentControllerServiceGetAllDocumentsOfPatient = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, page, size, sort }: {
    patientUuid: string;
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientDocumentControllerService.getAllDocumentsOfPatient>>, unknown, Awaited<ReturnType<typeof PatientDocumentControllerService.getAllDocumentsOfPatient>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientDocumentControllerServiceGetAllDocumentsOfPatientKey, ...(queryKey ?? [{ patientUuid, page, size, sort }])], queryFn: () => PatientDocumentControllerService.getAllDocumentsOfPatient(patientUuid, page, size, sort), ...options });
export const usePatientControllerServiceUpdatePatient = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientControllerService.updatePatient>>, unknown, {
    requestBody: Patient;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => PatientControllerService.updatePatient(requestBody), ...options });
export const usePatientControllerServiceAddPatient = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientControllerService.addPatient>>, unknown, {
    requestBody: Patient;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => PatientControllerService.addPatient(requestBody), ...options });
export const usePatientControllerServiceActivatePatient = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientControllerService.activatePatient>>, unknown, {
    patientUuid: string;
    status: boolean;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, status }) => PatientControllerService.activatePatient(patientUuid, status), ...options });
export const usePatientControllerServiceRemoveCard = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientControllerService.removeCard>>, unknown, {
    customerId: string;
    cardId: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ customerId, cardId }) => PatientControllerService.removeCard(customerId, cardId), ...options });
export const usePatientControllerServiceUpdatePatientAccess = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientControllerService.updatePatientAccess>>, unknown, {
    patientUuid: string;
    active: boolean;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, active }) => PatientControllerService.updatePatientAccess(patientUuid, active), ...options });
export const usePatientControllerServiceAcceptTermsAndConditions = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientControllerService.acceptTermsAndConditions>>, unknown, void, unknown>, "mutationFn">) => useMutation({ mutationFn: () => PatientControllerService.acceptTermsAndConditions(), ...options });
export const usePatientControllerServiceSharePatientDetails = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientControllerService.sharePatientDetails>>, unknown, {
    patientUuid: string;
    emailId: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, emailId }) => PatientControllerService.sharePatientDetails(patientUuid, emailId), ...options });
export const usePatientControllerServiceGetPatientsClinicalReport = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientControllerService.getPatientsClinicalReport>>, unknown, {
    requestBody: PatientClinicalRequest;
    page?: number;
    size?: number;
    sortBy?: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody, page, size, sortBy }) => PatientControllerService.getPatientsClinicalReport(requestBody, page, size, sortBy), ...options });
export const usePatientControllerServiceDownloadPatientClinicalReport = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientControllerService.downloadPatientClinicalReport>>, unknown, {
    exportType: "CSV" | "PDF";
    requestBody: PatientClinicalRequest;
    page?: number;
    size?: number;
    sortBy?: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ exportType, requestBody, page, size, sortBy }) => PatientControllerService.downloadPatientClinicalReport(exportType, requestBody, page, size, sortBy), ...options });
export const usePatientControllerServiceAddCard = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientControllerService.addCard>>, unknown, {
    patientUuid: string;
    requestBody: PaymentCard;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, requestBody }) => PatientControllerService.addCard(patientUuid, requestBody), ...options });
export const usePatientControllerServiceGetPatientKey = "PatientControllerServiceGetPatient";
export const usePatientControllerServiceGetPatient = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid }: {
    patientUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientControllerService.getPatient>>, unknown, Awaited<ReturnType<typeof PatientControllerService.getPatient>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientControllerServiceGetPatientKey, ...(queryKey ?? [{ patientUuid }])], queryFn: () => PatientControllerService.getPatient(patientUuid), ...options });
export const usePatientControllerServiceArchivePatient = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientControllerService.archivePatient>>, unknown, {
    patientUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid }) => PatientControllerService.archivePatient(patientUuid), ...options });
export const usePatientControllerServiceSearchPatientsKey = "PatientControllerServiceSearchPatients";
export const usePatientControllerServiceSearchPatients = <TQueryKey extends Array<unknown> = unknown[]>({ page, size, sortBy, sortDirection, dateOfService, ageFrom, ageTo, gender, preferredLanguage, demographicsRecorded, patientName, status }: {
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
    dateOfService?: string;
    ageFrom?: number;
    ageTo?: number;
    gender?: string;
    preferredLanguage?: string;
    demographicsRecorded?: string;
    patientName?: string;
    status?: boolean;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientControllerService.searchPatients>>, unknown, Awaited<ReturnType<typeof PatientControllerService.searchPatients>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientControllerServiceSearchPatientsKey, ...(queryKey ?? [{ page, size, sortBy, sortDirection, dateOfService, ageFrom, ageTo, gender, preferredLanguage, demographicsRecorded, patientName, status }])], queryFn: () => PatientControllerService.searchPatients(page, size, sortBy, sortDirection, dateOfService, ageFrom, ageTo, gender, preferredLanguage, demographicsRecorded, patientName, status), ...options });
export const usePatientControllerServiceGetPatientsKey = "PatientControllerServiceGetPatients";
export const usePatientControllerServiceGetPatients = <TQueryKey extends Array<unknown> = unknown[]>({ providerGroupUuid, page, size, sortBy, sortDirection, searchString, status, sourceId }: {
    providerGroupUuid: string;
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
    searchString?: string;
    status?: boolean;
    sourceId?: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientControllerService.getPatients>>, unknown, Awaited<ReturnType<typeof PatientControllerService.getPatients>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientControllerServiceGetPatientsKey, ...(queryKey ?? [{ providerGroupUuid, page, size, sortBy, sortDirection, searchString, status, sourceId }])], queryFn: () => PatientControllerService.getPatients(providerGroupUuid, page, size, sortBy, sortDirection, searchString, status, sourceId), ...options });
export const usePatientControllerServicePrintPatientListKey = "PatientControllerServicePrintPatientList";
export const usePatientControllerServicePrintPatientList = <TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientControllerService.printPatientList>>, unknown, Awaited<ReturnType<typeof PatientControllerService.printPatientList>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientControllerServicePrintPatientListKey, ...(queryKey ?? [])], queryFn: () => PatientControllerService.printPatientList(), ...options });
export const usePatientControllerServicePrintPatientDetailsKey = "PatientControllerServicePrintPatientDetails";
export const usePatientControllerServicePrintPatientDetails = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid }: {
    patientUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientControllerService.printPatientDetails>>, unknown, Awaited<ReturnType<typeof PatientControllerService.printPatientDetails>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientControllerServicePrintPatientDetailsKey, ...(queryKey ?? [{ patientUuid }])], queryFn: () => PatientControllerService.printPatientDetails(patientUuid), ...options });
export const usePatientControllerServiceGetCardsKey = "PatientControllerServiceGetCards";
export const usePatientControllerServiceGetCards = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid }: {
    patientUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientControllerService.getCards>>, unknown, Awaited<ReturnType<typeof PatientControllerService.getCards>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientControllerServiceGetCardsKey, ...(queryKey ?? [{ patientUuid }])], queryFn: () => PatientControllerService.getCards(patientUuid), ...options });
export const usePatientControllerServiceGetTimelineForPatientKey = "PatientControllerServiceGetTimelineForPatient";
export const usePatientControllerServiceGetTimelineForPatient = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, providerGroupUuid, page, size, sort }: {
    patientUuid: string;
    providerGroupUuid: string;
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientControllerService.getTimelineForPatient>>, unknown, Awaited<ReturnType<typeof PatientControllerService.getTimelineForPatient>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientControllerServiceGetTimelineForPatientKey, ...(queryKey ?? [{ patientUuid, providerGroupUuid, page, size, sort }])], queryFn: () => PatientControllerService.getTimelineForPatient(patientUuid, providerGroupUuid, page, size, sort), ...options });
export const usePatientControllerServiceViewLocationPatientKey = "PatientControllerServiceViewLocationPatient";
export const usePatientControllerServiceViewLocationPatient = <TQueryKey extends Array<unknown> = unknown[]>({ locationUuid, page, size, sortBy, sortDirection }: {
    locationUuid: string;
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientControllerService.viewLocationPatient>>, unknown, Awaited<ReturnType<typeof PatientControllerService.viewLocationPatient>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientControllerServiceViewLocationPatientKey, ...(queryKey ?? [{ locationUuid, page, size, sortBy, sortDirection }])], queryFn: () => PatientControllerService.viewLocationPatient(locationUuid, page, size, sortBy, sortDirection), ...options });
export const usePatientControllerServiceGetProviderGroupUuidPatientsKey = "PatientControllerServiceGetProviderGroupUuidPatients";
export const usePatientControllerServiceGetProviderGroupUuidPatients = <TQueryKey extends Array<unknown> = unknown[]>({ providerGroupUuid, page, size, sortBy, sortDirection, searchString, status }: {
    providerGroupUuid: string;
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
    searchString?: string;
    status?: boolean;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientControllerService.getProviderGroupUuidPatients>>, unknown, Awaited<ReturnType<typeof PatientControllerService.getProviderGroupUuidPatients>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientControllerServiceGetProviderGroupUuidPatientsKey, ...(queryKey ?? [{ providerGroupUuid, page, size, sortBy, sortDirection, searchString, status }])], queryFn: () => PatientControllerService.getProviderGroupUuidPatients(providerGroupUuid, page, size, sortBy, sortDirection, searchString, status), ...options });
export const usePatientControllerServiceExportPatientReportKey = "PatientControllerServiceExportPatientReport";
export const usePatientControllerServiceExportPatientReport = <TQueryKey extends Array<unknown> = unknown[]>({ exportType, page, size, sortBy, sortDirection, dateOfService, ageFrom, ageTo, gender, preferredLanguage, demographicsRecorded, patientName, status }: {
    exportType: "CSV" | "PDF";
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
    dateOfService?: string;
    ageFrom?: number;
    ageTo?: number;
    gender?: string;
    preferredLanguage?: string;
    demographicsRecorded?: string;
    patientName?: string;
    status?: boolean;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientControllerService.exportPatientReport>>, unknown, Awaited<ReturnType<typeof PatientControllerService.exportPatientReport>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientControllerServiceExportPatientReportKey, ...(queryKey ?? [{ exportType, page, size, sortBy, sortDirection, dateOfService, ageFrom, ageTo, gender, preferredLanguage, demographicsRecorded, patientName, status }])], queryFn: () => PatientControllerService.exportPatientReport(exportType, page, size, sortBy, sortDirection, dateOfService, ageFrom, ageTo, gender, preferredLanguage, demographicsRecorded, patientName, status), ...options });
export const usePatientControllerServiceDownloadPatientListKey = "PatientControllerServiceDownloadPatientList";
export const usePatientControllerServiceDownloadPatientList = <TQueryKey extends Array<unknown> = unknown[]>({ providerGroupUuid, exportType, page, size, sortBy, sortDirection, searchString, status, sourceId }: {
    providerGroupUuid: string;
    exportType: "CSV" | "PDF";
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
    searchString?: string;
    status?: boolean;
    sourceId?: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientControllerService.downloadPatientList>>, unknown, Awaited<ReturnType<typeof PatientControllerService.downloadPatientList>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientControllerServiceDownloadPatientListKey, ...(queryKey ?? [{ providerGroupUuid, exportType, page, size, sortBy, sortDirection, searchString, status, sourceId }])], queryFn: () => PatientControllerService.downloadPatientList(providerGroupUuid, exportType, page, size, sortBy, sortDirection, searchString, status, sourceId), ...options });
export const usePatientControllerServiceGetDefaultConsentFormKey = "PatientControllerServiceGetDefaultConsentForm";
export const usePatientControllerServiceGetDefaultConsentForm = <TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientControllerService.getDefaultConsentForm>>, unknown, Awaited<ReturnType<typeof PatientControllerService.getDefaultConsentForm>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientControllerServiceGetDefaultConsentFormKey, ...(queryKey ?? [])], queryFn: () => PatientControllerService.getDefaultConsentForm(), ...options });
export const usePatientControllerServiceGetProviderPatientCountKey = "PatientControllerServiceGetProviderPatientCount";
export const usePatientControllerServiceGetProviderPatientCount = <TQueryKey extends Array<unknown> = unknown[]>({ providerUuid }: {
    providerUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientControllerService.getProviderPatientCount>>, unknown, Awaited<ReturnType<typeof PatientControllerService.getProviderPatientCount>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientControllerServiceGetProviderPatientCountKey, ...(queryKey ?? [{ providerUuid }])], queryFn: () => PatientControllerService.getProviderPatientCount(providerUuid), ...options });
export const usePatientControllerServiceGetProviderGroupPatientCountKey = "PatientControllerServiceGetProviderGroupPatientCount";
export const usePatientControllerServiceGetProviderGroupPatientCount = <TQueryKey extends Array<unknown> = unknown[]>({ providerGroupUuid, startDate, endDate }: {
    providerGroupUuid: string;
    startDate?: string;
    endDate?: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientControllerService.getProviderGroupPatientCount>>, unknown, Awaited<ReturnType<typeof PatientControllerService.getProviderGroupPatientCount>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientControllerServiceGetProviderGroupPatientCountKey, ...(queryKey ?? [{ providerGroupUuid, startDate, endDate }])], queryFn: () => PatientControllerService.getProviderGroupPatientCount(providerGroupUuid, startDate, endDate), ...options });
export const usePatientAuthorizationControllerServiceUpdatePatientAuthorization = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientAuthorizationControllerService.updatePatientAuthorization>>, unknown, {
    requestBody: PatientAuthorization;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => PatientAuthorizationControllerService.updatePatientAuthorization(requestBody), ...options });
export const usePatientAuthorizationControllerServiceCreatePatientAuthorization = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientAuthorizationControllerService.createPatientAuthorization>>, unknown, {
    requestBody: PatientAuthorization;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => PatientAuthorizationControllerService.createPatientAuthorization(requestBody), ...options });
export const usePatientAuthorizationControllerServiceUpdatePatientAuthorizationStatus = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientAuthorizationControllerService.updatePatientAuthorizationStatus>>, unknown, {
    patientAuthorizationUuid: string;
    status: boolean;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientAuthorizationUuid, status }) => PatientAuthorizationControllerService.updatePatientAuthorizationStatus(patientAuthorizationUuid, status), ...options });
export const usePatientAuthorizationControllerServiceGetPatientAuthorizationKey = "PatientAuthorizationControllerServiceGetPatientAuthorization";
export const usePatientAuthorizationControllerServiceGetPatientAuthorization = <TQueryKey extends Array<unknown> = unknown[]>({ patientAuthorizationUuid }: {
    patientAuthorizationUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientAuthorizationControllerService.getPatientAuthorization>>, unknown, Awaited<ReturnType<typeof PatientAuthorizationControllerService.getPatientAuthorization>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientAuthorizationControllerServiceGetPatientAuthorizationKey, ...(queryKey ?? [{ patientAuthorizationUuid }])], queryFn: () => PatientAuthorizationControllerService.getPatientAuthorization(patientAuthorizationUuid), ...options });
export const usePatientAuthorizationControllerServiceDeletePatientAuthorization = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof PatientAuthorizationControllerService.deletePatientAuthorization>>, unknown, {
    patientAuthorizationUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientAuthorizationUuid }) => PatientAuthorizationControllerService.deletePatientAuthorization(patientAuthorizationUuid), ...options });
export const usePatientAuthorizationControllerServiceGetPatientAuthorizationsKey = "PatientAuthorizationControllerServiceGetPatientAuthorizations";
export const usePatientAuthorizationControllerServiceGetPatientAuthorizations = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, page, size }: {
    patientUuid: string;
    page: number;
    size: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof PatientAuthorizationControllerService.getPatientAuthorizations>>, unknown, Awaited<ReturnType<typeof PatientAuthorizationControllerService.getPatientAuthorizations>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [usePatientAuthorizationControllerServiceGetPatientAuthorizationsKey, ...(queryKey ?? [{ patientUuid, page, size }])], queryFn: () => PatientAuthorizationControllerService.getPatientAuthorizations(patientUuid, page, size), ...options });
export const useNotificationsControllerServiceMarkNotificationAsSeen = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof NotificationsControllerService.markNotificationAsSeen>>, unknown, {
    notificationId: number;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ notificationId }) => NotificationsControllerService.markNotificationAsSeen(notificationId), ...options });
export const useNotificationsControllerServiceAddNotifications = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof NotificationsControllerService.addNotifications>>, unknown, {
    requestBody: Notification;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => NotificationsControllerService.addNotifications(requestBody), ...options });
export const useNotificationsControllerServiceRejectAppointmentRequest = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof NotificationsControllerService.rejectAppointmentRequest>>, unknown, {
    id: number;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ id }) => NotificationsControllerService.rejectAppointmentRequest(id), ...options });
export const useNotificationsControllerServiceAcceptAppointmentRequest = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof NotificationsControllerService.acceptAppointmentRequest>>, unknown, {
    id: number;
    requestBody: BookAppointmentRequest;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ id, requestBody }) => NotificationsControllerService.acceptAppointmentRequest(id, requestBody), ...options });
export const useNotificationsControllerServiceGetUnseenProviderNotificationsCountKey = "NotificationsControllerServiceGetUnseenProviderNotificationsCount";
export const useNotificationsControllerServiceGetUnseenProviderNotificationsCount = <TQueryKey extends Array<unknown> = unknown[]>({ providerGroupUuid }: {
    providerGroupUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof NotificationsControllerService.getUnseenProviderNotificationsCount>>, unknown, Awaited<ReturnType<typeof NotificationsControllerService.getUnseenProviderNotificationsCount>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useNotificationsControllerServiceGetUnseenProviderNotificationsCountKey, ...(queryKey ?? [{ providerGroupUuid }])], queryFn: () => NotificationsControllerService.getUnseenProviderNotificationsCount(providerGroupUuid), ...options });
export const useNotificationsControllerServiceGetUnseenPatientNotificationsCountKey = "NotificationsControllerServiceGetUnseenPatientNotificationsCount";
export const useNotificationsControllerServiceGetUnseenPatientNotificationsCount = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid }: {
    patientUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof NotificationsControllerService.getUnseenPatientNotificationsCount>>, unknown, Awaited<ReturnType<typeof NotificationsControllerService.getUnseenPatientNotificationsCount>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useNotificationsControllerServiceGetUnseenPatientNotificationsCountKey, ...(queryKey ?? [{ patientUuid }])], queryFn: () => NotificationsControllerService.getUnseenPatientNotificationsCount(patientUuid), ...options });
export const useNotificationsControllerServiceGetProviderNotificationsKey = "NotificationsControllerServiceGetProviderNotifications";
export const useNotificationsControllerServiceGetProviderNotifications = <TQueryKey extends Array<unknown> = unknown[]>({ providerGroupUuid }: {
    providerGroupUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof NotificationsControllerService.getProviderNotifications>>, unknown, Awaited<ReturnType<typeof NotificationsControllerService.getProviderNotifications>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useNotificationsControllerServiceGetProviderNotificationsKey, ...(queryKey ?? [{ providerGroupUuid }])], queryFn: () => NotificationsControllerService.getProviderNotifications(providerGroupUuid), ...options });
export const useNotificationsControllerServiceGetPatientNotificationsKey = "NotificationsControllerServiceGetPatientNotifications";
export const useNotificationsControllerServiceGetPatientNotifications = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid }: {
    patientUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof NotificationsControllerService.getPatientNotifications>>, unknown, Awaited<ReturnType<typeof NotificationsControllerService.getPatientNotifications>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useNotificationsControllerServiceGetPatientNotificationsKey, ...(queryKey ?? [{ patientUuid }])], queryFn: () => NotificationsControllerService.getPatientNotifications(patientUuid), ...options });
export const useMigrationControllerServiceUploadFile = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof MigrationControllerService.uploadFile>>, unknown, {
    category: "CPT" | "HCPCS" | "LOINC" | "ICD" | "PATIENT" | "PROVIDER" | "DRUG";
    title: string;
    formData: {
        file: Blob;
    };
    providerGroupUuid?: string;
    locationUuid?: string;
    providerUuid?: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ category, title, formData, providerGroupUuid, locationUuid, providerUuid }) => MigrationControllerService.uploadFile(category, title, formData, providerGroupUuid, locationUuid, providerUuid), ...options });
export const useMigrationControllerServiceGetAuditLogKey = "MigrationControllerServiceGetAuditLog";
export const useMigrationControllerServiceGetAuditLog = <TQueryKey extends Array<unknown> = unknown[]>({ category, page, size, sortBy, sortDirection, providerGroupUuid }: {
    category: "CPT" | "HCPCS" | "LOINC" | "ICD" | "PATIENT" | "PROVIDER" | "DRUG";
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
    providerGroupUuid?: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof MigrationControllerService.getAuditLog>>, unknown, Awaited<ReturnType<typeof MigrationControllerService.getAuditLog>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useMigrationControllerServiceGetAuditLogKey, ...(queryKey ?? [{ category, page, size, sortBy, sortDirection, providerGroupUuid }])], queryFn: () => MigrationControllerService.getAuditLog(category, page, size, sortBy, sortDirection, providerGroupUuid), ...options });
export const useMigrationControllerServiceGetViewRecordsKey = "MigrationControllerServiceGetViewRecords";
export const useMigrationControllerServiceGetViewRecords = <TQueryKey extends Array<unknown> = unknown[]>({ category, sourceId, page, size, sortBy, sortDirection, providerGroupUuid }: {
    category: "CPT" | "HCPCS" | "LOINC" | "ICD" | "PATIENT" | "PROVIDER" | "DRUG";
    sourceId: number;
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
    providerGroupUuid?: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof MigrationControllerService.getViewRecords>>, unknown, Awaited<ReturnType<typeof MigrationControllerService.getViewRecords>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useMigrationControllerServiceGetViewRecordsKey, ...(queryKey ?? [{ category, sourceId, page, size, sortBy, sortDirection, providerGroupUuid }])], queryFn: () => MigrationControllerService.getViewRecords(category, sourceId, page, size, sortBy, sortDirection, providerGroupUuid), ...options });
export const useMigrationControllerServiceDownloadTemplateKey = "MigrationControllerServiceDownloadTemplate";
export const useMigrationControllerServiceDownloadTemplate = <TQueryKey extends Array<unknown> = unknown[]>({ category }: {
    category: "CPT" | "HCPCS" | "LOINC" | "ICD" | "PATIENT" | "PROVIDER" | "DRUG";
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof MigrationControllerService.downloadTemplate>>, unknown, Awaited<ReturnType<typeof MigrationControllerService.downloadTemplate>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useMigrationControllerServiceDownloadTemplateKey, ...(queryKey ?? [{ category }])], queryFn: () => MigrationControllerService.downloadTemplate(category), ...options });
export const useMigrationControllerServiceGetViewProviderRecordsKey = "MigrationControllerServiceGetViewProviderRecords";
export const useMigrationControllerServiceGetViewProviderRecords = <TQueryKey extends Array<unknown> = unknown[]>({ page, size, sortBy, sortDirection, searchString, providerGroupUuid }: {
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
    searchString?: string;
    providerGroupUuid?: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof MigrationControllerService.getViewProviderRecords>>, unknown, Awaited<ReturnType<typeof MigrationControllerService.getViewProviderRecords>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useMigrationControllerServiceGetViewProviderRecordsKey, ...(queryKey ?? [{ page, size, sortBy, sortDirection, searchString, providerGroupUuid }])], queryFn: () => MigrationControllerService.getViewProviderRecords(page, size, sortBy, sortDirection, searchString, providerGroupUuid), ...options });
export const useMigrationControllerServiceGetViewPatientRecordsKey = "MigrationControllerServiceGetViewPatientRecords";
export const useMigrationControllerServiceGetViewPatientRecords = <TQueryKey extends Array<unknown> = unknown[]>({ page, size, sortBy, sortDirection, searchString, providerGroupUuid }: {
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
    searchString?: string;
    providerGroupUuid?: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof MigrationControllerService.getViewPatientRecords>>, unknown, Awaited<ReturnType<typeof MigrationControllerService.getViewPatientRecords>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useMigrationControllerServiceGetViewPatientRecordsKey, ...(queryKey ?? [{ page, size, sortBy, sortDirection, searchString, providerGroupUuid }])], queryFn: () => MigrationControllerService.getViewPatientRecords(page, size, sortBy, sortDirection, searchString, providerGroupUuid), ...options });
export const useMigrationControllerServiceGetDataEntityKey = "MigrationControllerServiceGetDataEntity";
export const useMigrationControllerServiceGetDataEntity = <TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof MigrationControllerService.getDataEntity>>, unknown, Awaited<ReturnType<typeof MigrationControllerService.getDataEntity>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useMigrationControllerServiceGetDataEntityKey, ...(queryKey ?? [])], queryFn: () => MigrationControllerService.getDataEntity(), ...options });
export const useMigrationControllerServiceGetDataImportRecordsKey = "MigrationControllerServiceGetDataImportRecords";
export const useMigrationControllerServiceGetDataImportRecords = <TQueryKey extends Array<unknown> = unknown[]>({ page, size, sortBy, sortDirection, searchString, providerGroupUuid }: {
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
    searchString?: string;
    providerGroupUuid?: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof MigrationControllerService.getDataImportRecords>>, unknown, Awaited<ReturnType<typeof MigrationControllerService.getDataImportRecords>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useMigrationControllerServiceGetDataImportRecordsKey, ...(queryKey ?? [{ page, size, sortBy, sortDirection, searchString, providerGroupUuid }])], queryFn: () => MigrationControllerService.getDataImportRecords(page, size, sortBy, sortDirection, searchString, providerGroupUuid), ...options });
export const useMedicationsControllerServiceViewPatientIntakeMedicationKey = "MedicationsControllerServiceViewPatientIntakeMedication";
export const useMedicationsControllerServiceViewPatientIntakeMedication = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, intakeFormUuid, intakeMedicationUuid }: {
    patientUuid: string;
    intakeFormUuid: string;
    intakeMedicationUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof MedicationsControllerService.viewPatientIntakeMedication>>, unknown, Awaited<ReturnType<typeof MedicationsControllerService.viewPatientIntakeMedication>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useMedicationsControllerServiceViewPatientIntakeMedicationKey, ...(queryKey ?? [{ patientUuid, intakeFormUuid, intakeMedicationUuid }])], queryFn: () => MedicationsControllerService.viewPatientIntakeMedication(patientUuid, intakeFormUuid, intakeMedicationUuid), ...options });
export const useMedicationsControllerServiceUpdatePatientIntakeMedication = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof MedicationsControllerService.updatePatientIntakeMedication>>, unknown, {
    patientUuid: string;
    intakeFormUuid: string;
    intakeMedicationUuid: string;
    requestBody: IntakeMedication;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, intakeFormUuid, intakeMedicationUuid, requestBody }) => MedicationsControllerService.updatePatientIntakeMedication(patientUuid, intakeFormUuid, intakeMedicationUuid, requestBody), ...options });
export const useMedicationsControllerServiceArchivePatientIntakeMedication = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof MedicationsControllerService.archivePatientIntakeMedication>>, unknown, {
    patientUuid: string;
    intakeFormUuid: string;
    intakeMedicationUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, intakeFormUuid, intakeMedicationUuid }) => MedicationsControllerService.archivePatientIntakeMedication(patientUuid, intakeFormUuid, intakeMedicationUuid), ...options });
export const useMedicationsControllerServiceUpdatePatientMedication = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof MedicationsControllerService.updatePatientMedication>>, unknown, {
    requestBody: PatientMedication;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => MedicationsControllerService.updatePatientMedication(requestBody), ...options });
export const useMedicationsControllerServiceAddPatientMedication = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof MedicationsControllerService.addPatientMedication>>, unknown, {
    requestBody: PatientMedication;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => MedicationsControllerService.addPatientMedication(requestBody), ...options });
export const useMedicationsControllerServiceViewPatientIntakeMedicationForPatientKey = "MedicationsControllerServiceViewPatientIntakeMedicationForPatient";
export const useMedicationsControllerServiceViewPatientIntakeMedicationForPatient = <TQueryKey extends Array<unknown> = unknown[]>({ intakeFormUuid, intakeMedicationUuid }: {
    intakeFormUuid: string;
    intakeMedicationUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof MedicationsControllerService.viewPatientIntakeMedicationForPatient>>, unknown, Awaited<ReturnType<typeof MedicationsControllerService.viewPatientIntakeMedicationForPatient>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useMedicationsControllerServiceViewPatientIntakeMedicationForPatientKey, ...(queryKey ?? [{ intakeFormUuid, intakeMedicationUuid }])], queryFn: () => MedicationsControllerService.viewPatientIntakeMedicationForPatient(intakeFormUuid, intakeMedicationUuid), ...options });
export const useMedicationsControllerServiceUpdatePatientIntakeMedicationForPatient = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof MedicationsControllerService.updatePatientIntakeMedicationForPatient>>, unknown, {
    intakeFormUuid: string;
    intakeMedicationUuid: string;
    requestBody: IntakeMedication;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ intakeFormUuid, intakeMedicationUuid, requestBody }) => MedicationsControllerService.updatePatientIntakeMedicationForPatient(intakeFormUuid, intakeMedicationUuid, requestBody), ...options });
export const useMedicationsControllerServiceArchivePatientIntakeMedicationForPatient = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof MedicationsControllerService.archivePatientIntakeMedicationForPatient>>, unknown, {
    intakeFormUuid: string;
    intakeMedicationUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ intakeFormUuid, intakeMedicationUuid }) => MedicationsControllerService.archivePatientIntakeMedicationForPatient(intakeFormUuid, intakeMedicationUuid), ...options });
export const useMedicationsControllerServiceAddPatientIntakeMedication = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof MedicationsControllerService.addPatientIntakeMedication>>, unknown, {
    patientUuid: string;
    intakeFormUuid: string;
    requestBody: IntakeMedication;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, intakeFormUuid, requestBody }) => MedicationsControllerService.addPatientIntakeMedication(patientUuid, intakeFormUuid, requestBody), ...options });
export const useMedicationsControllerServiceAddPatientIntakeMedicationForPatient = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof MedicationsControllerService.addPatientIntakeMedicationForPatient>>, unknown, {
    intakeFormUuid: string;
    requestBody: IntakeMedication;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ intakeFormUuid, requestBody }) => MedicationsControllerService.addPatientIntakeMedicationForPatient(intakeFormUuid, requestBody), ...options });
export const useMedicationsControllerServiceGetMedicationReportKey = "MedicationsControllerServiceGetMedicationReport";
export const useMedicationsControllerServiceGetMedicationReport = <TQueryKey extends Array<unknown> = unknown[]>({ providerUuid, searchString, startInstant, endInstant, page, size }: {
    providerUuid?: string;
    searchString?: string;
    startInstant?: string;
    endInstant?: string;
    page?: number;
    size?: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof MedicationsControllerService.getMedicationReport>>, unknown, Awaited<ReturnType<typeof MedicationsControllerService.getMedicationReport>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useMedicationsControllerServiceGetMedicationReportKey, ...(queryKey ?? [{ providerUuid, searchString, startInstant, endInstant, page, size }])], queryFn: () => MedicationsControllerService.getMedicationReport(providerUuid, searchString, startInstant, endInstant, page, size), ...options });
export const useMedicationsControllerServiceGetPatientMedicationsKey = "MedicationsControllerServiceGetPatientMedications";
export const useMedicationsControllerServiceGetPatientMedications = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, pageable }: {
    patientUuid: string;
    pageable: Pageable;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof MedicationsControllerService.getPatientMedications>>, unknown, Awaited<ReturnType<typeof MedicationsControllerService.getPatientMedications>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useMedicationsControllerServiceGetPatientMedicationsKey, ...(queryKey ?? [{ patientUuid, pageable }])], queryFn: () => MedicationsControllerService.getPatientMedications(patientUuid, pageable), ...options });
export const useMedicationsControllerServiceGetPatientPastMedicationKey = "MedicationsControllerServiceGetPatientPastMedication";
export const useMedicationsControllerServiceGetPatientPastMedication = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid }: {
    patientUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof MedicationsControllerService.getPatientPastMedication>>, unknown, Awaited<ReturnType<typeof MedicationsControllerService.getPatientPastMedication>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useMedicationsControllerServiceGetPatientPastMedicationKey, ...(queryKey ?? [{ patientUuid }])], queryFn: () => MedicationsControllerService.getPatientPastMedication(patientUuid), ...options });
export const useMedicationsControllerServiceGetPatientCurrentMedicationKey = "MedicationsControllerServiceGetPatientCurrentMedication";
export const useMedicationsControllerServiceGetPatientCurrentMedication = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid }: {
    patientUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof MedicationsControllerService.getPatientCurrentMedication>>, unknown, Awaited<ReturnType<typeof MedicationsControllerService.getPatientCurrentMedication>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useMedicationsControllerServiceGetPatientCurrentMedicationKey, ...(queryKey ?? [{ patientUuid }])], queryFn: () => MedicationsControllerService.getPatientCurrentMedication(patientUuid), ...options });
export const useMedicationsControllerServiceGetPatientIntakeMedicationsKey = "MedicationsControllerServiceGetPatientIntakeMedications";
export const useMedicationsControllerServiceGetPatientIntakeMedications = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, intakeMedicationUuid }: {
    patientUuid: string;
    intakeMedicationUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof MedicationsControllerService.getPatientIntakeMedications>>, unknown, Awaited<ReturnType<typeof MedicationsControllerService.getPatientIntakeMedications>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useMedicationsControllerServiceGetPatientIntakeMedicationsKey, ...(queryKey ?? [{ patientUuid, intakeMedicationUuid }])], queryFn: () => MedicationsControllerService.getPatientIntakeMedications(patientUuid, intakeMedicationUuid), ...options });
export const useMedicationsControllerServiceGetPatientPastIntakeMedicationKey = "MedicationsControllerServiceGetPatientPastIntakeMedication";
export const useMedicationsControllerServiceGetPatientPastIntakeMedication = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, intakeMedicationUuid }: {
    patientUuid: string;
    intakeMedicationUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof MedicationsControllerService.getPatientPastIntakeMedication>>, unknown, Awaited<ReturnType<typeof MedicationsControllerService.getPatientPastIntakeMedication>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useMedicationsControllerServiceGetPatientPastIntakeMedicationKey, ...(queryKey ?? [{ patientUuid, intakeMedicationUuid }])], queryFn: () => MedicationsControllerService.getPatientPastIntakeMedication(patientUuid, intakeMedicationUuid), ...options });
export const useMedicationsControllerServiceGetPatientCurrentIntakeMedicationKey = "MedicationsControllerServiceGetPatientCurrentIntakeMedication";
export const useMedicationsControllerServiceGetPatientCurrentIntakeMedication = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, intakeMedicationUuid }: {
    patientUuid: string;
    intakeMedicationUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof MedicationsControllerService.getPatientCurrentIntakeMedication>>, unknown, Awaited<ReturnType<typeof MedicationsControllerService.getPatientCurrentIntakeMedication>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useMedicationsControllerServiceGetPatientCurrentIntakeMedicationKey, ...(queryKey ?? [{ patientUuid, intakeMedicationUuid }])], queryFn: () => MedicationsControllerService.getPatientCurrentIntakeMedication(patientUuid, intakeMedicationUuid), ...options });
export const useMedicationsControllerServiceGetPatientPastMedicationsKey = "MedicationsControllerServiceGetPatientPastMedications";
export const useMedicationsControllerServiceGetPatientPastMedications = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, page, size, sort }: {
    patientUuid: string;
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof MedicationsControllerService.getPatientPastMedications>>, unknown, Awaited<ReturnType<typeof MedicationsControllerService.getPatientPastMedications>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useMedicationsControllerServiceGetPatientPastMedicationsKey, ...(queryKey ?? [{ patientUuid, page, size, sort }])], queryFn: () => MedicationsControllerService.getPatientPastMedications(patientUuid, page, size, sort), ...options });
export const useMedicationsControllerServiceViewPatientMedicationKey = "MedicationsControllerServiceViewPatientMedication";
export const useMedicationsControllerServiceViewPatientMedication = <TQueryKey extends Array<unknown> = unknown[]>({ patientMedicationUuid }: {
    patientMedicationUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof MedicationsControllerService.viewPatientMedication>>, unknown, Awaited<ReturnType<typeof MedicationsControllerService.viewPatientMedication>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useMedicationsControllerServiceViewPatientMedicationKey, ...(queryKey ?? [{ patientMedicationUuid }])], queryFn: () => MedicationsControllerService.viewPatientMedication(patientMedicationUuid), ...options });
export const useMedicationsControllerServiceArchivePatientMedication = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof MedicationsControllerService.archivePatientMedication>>, unknown, {
    patientMedicationUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientMedicationUuid }) => MedicationsControllerService.archivePatientMedication(patientMedicationUuid), ...options });
export const useMedicationsControllerServiceGetPatientCurrentMedicationsKey = "MedicationsControllerServiceGetPatientCurrentMedications";
export const useMedicationsControllerServiceGetPatientCurrentMedications = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, page, size, sort }: {
    patientUuid: string;
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof MedicationsControllerService.getPatientCurrentMedications>>, unknown, Awaited<ReturnType<typeof MedicationsControllerService.getPatientCurrentMedications>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useMedicationsControllerServiceGetPatientCurrentMedicationsKey, ...(queryKey ?? [{ patientUuid, page, size, sort }])], queryFn: () => MedicationsControllerService.getPatientCurrentMedications(patientUuid, page, size, sort), ...options });
export const useMedicationsControllerServiceGetPatientIntakeMedicationsForPatientKey = "MedicationsControllerServiceGetPatientIntakeMedicationsForPatient";
export const useMedicationsControllerServiceGetPatientIntakeMedicationsForPatient = <TQueryKey extends Array<unknown> = unknown[]>({ intakeMedicationUuid }: {
    intakeMedicationUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof MedicationsControllerService.getPatientIntakeMedicationsForPatient>>, unknown, Awaited<ReturnType<typeof MedicationsControllerService.getPatientIntakeMedicationsForPatient>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useMedicationsControllerServiceGetPatientIntakeMedicationsForPatientKey, ...(queryKey ?? [{ intakeMedicationUuid }])], queryFn: () => MedicationsControllerService.getPatientIntakeMedicationsForPatient(intakeMedicationUuid), ...options });
export const useMedicationsControllerServiceGetPatientPastIntakeMedicationForPatientKey = "MedicationsControllerServiceGetPatientPastIntakeMedicationForPatient";
export const useMedicationsControllerServiceGetPatientPastIntakeMedicationForPatient = <TQueryKey extends Array<unknown> = unknown[]>({ intakeMedicationUuid }: {
    intakeMedicationUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof MedicationsControllerService.getPatientPastIntakeMedicationForPatient>>, unknown, Awaited<ReturnType<typeof MedicationsControllerService.getPatientPastIntakeMedicationForPatient>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useMedicationsControllerServiceGetPatientPastIntakeMedicationForPatientKey, ...(queryKey ?? [{ intakeMedicationUuid }])], queryFn: () => MedicationsControllerService.getPatientPastIntakeMedicationForPatient(intakeMedicationUuid), ...options });
export const useMedicationsControllerServiceGetPatientCurrentIntakeMedicationForPatientKey = "MedicationsControllerServiceGetPatientCurrentIntakeMedicationForPatient";
export const useMedicationsControllerServiceGetPatientCurrentIntakeMedicationForPatient = <TQueryKey extends Array<unknown> = unknown[]>({ intakeMedicationUuid }: {
    intakeMedicationUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof MedicationsControllerService.getPatientCurrentIntakeMedicationForPatient>>, unknown, Awaited<ReturnType<typeof MedicationsControllerService.getPatientCurrentIntakeMedicationForPatient>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useMedicationsControllerServiceGetPatientCurrentIntakeMedicationForPatientKey, ...(queryKey ?? [{ intakeMedicationUuid }])], queryFn: () => MedicationsControllerService.getPatientCurrentIntakeMedicationForPatient(intakeMedicationUuid), ...options });
export const useMedicationsControllerServiceDownloadPatientMedicationsClinicalReportKey = "MedicationsControllerServiceDownloadPatientMedicationsClinicalReport";
export const useMedicationsControllerServiceDownloadPatientMedicationsClinicalReport = <TQueryKey extends Array<unknown> = unknown[]>({ providerGroupUuid, exportType, searchString, startInstant, endInstant, page, size, sort }: {
    providerGroupUuid: string;
    exportType: "CSV" | "PDF";
    searchString?: string;
    startInstant?: string;
    endInstant?: string;
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof MedicationsControllerService.downloadPatientMedicationsClinicalReport>>, unknown, Awaited<ReturnType<typeof MedicationsControllerService.downloadPatientMedicationsClinicalReport>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useMedicationsControllerServiceDownloadPatientMedicationsClinicalReportKey, ...(queryKey ?? [{ providerGroupUuid, exportType, searchString, startInstant, endInstant, page, size, sort }])], queryFn: () => MedicationsControllerService.downloadPatientMedicationsClinicalReport(providerGroupUuid, exportType, searchString, startInstant, endInstant, page, size, sort), ...options });
export const useMedicationsControllerServiceGetPatientMedicationsReportKey = "MedicationsControllerServiceGetPatientMedicationsReport";
export const useMedicationsControllerServiceGetPatientMedicationsReport = <TQueryKey extends Array<unknown> = unknown[]>({ providerGroupUuid, searchString, startInstant, endInstant, page, size, sort }: {
    providerGroupUuid: string;
    searchString?: string;
    startInstant?: string;
    endInstant?: string;
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof MedicationsControllerService.getPatientMedicationsReport>>, unknown, Awaited<ReturnType<typeof MedicationsControllerService.getPatientMedicationsReport>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useMedicationsControllerServiceGetPatientMedicationsReportKey, ...(queryKey ?? [{ providerGroupUuid, searchString, startInstant, endInstant, page, size, sort }])], queryFn: () => MedicationsControllerService.getPatientMedicationsReport(providerGroupUuid, searchString, startInstant, endInstant, page, size, sort), ...options });
export const useMedicalHistoryControllerServiceUpdateMedicalHistory = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof MedicalHistoryControllerService.updateMedicalHistory>>, unknown, {
    requestBody: PatientPastMedicalHistory;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => MedicalHistoryControllerService.updateMedicalHistory(requestBody), ...options });
export const useMedicalHistoryControllerServiceAddMedicalHistory = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof MedicalHistoryControllerService.addMedicalHistory>>, unknown, {
    requestBody: PatientPastMedicalHistory;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => MedicalHistoryControllerService.addMedicalHistory(requestBody), ...options });
export const useMedicalHistoryControllerServiceAddIntakeMedicalHistory = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof MedicalHistoryControllerService.addIntakeMedicalHistory>>, unknown, {
    intakeFormUuid: string;
    requestBody: IntakePatientMedicalHistory;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ intakeFormUuid, requestBody }) => MedicalHistoryControllerService.addIntakeMedicalHistory(intakeFormUuid, requestBody), ...options });
export const useMedicalHistoryControllerServiceViewMedicalHistoryKey = "MedicalHistoryControllerServiceViewMedicalHistory";
export const useMedicalHistoryControllerServiceViewMedicalHistory = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, page, size, sort }: {
    patientUuid: string;
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof MedicalHistoryControllerService.viewMedicalHistory>>, unknown, Awaited<ReturnType<typeof MedicalHistoryControllerService.viewMedicalHistory>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useMedicalHistoryControllerServiceViewMedicalHistoryKey, ...(queryKey ?? [{ patientUuid, page, size, sort }])], queryFn: () => MedicalHistoryControllerService.viewMedicalHistory(patientUuid, page, size, sort), ...options });
export const useMedicalHistoryControllerServiceViewIntakeMedicalHistoryKey = "MedicalHistoryControllerServiceViewIntakeMedicalHistory";
export const useMedicalHistoryControllerServiceViewIntakeMedicalHistory = <TQueryKey extends Array<unknown> = unknown[]>({ intakeMedicalHistoryUuid }: {
    intakeMedicalHistoryUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof MedicalHistoryControllerService.viewIntakeMedicalHistory>>, unknown, Awaited<ReturnType<typeof MedicalHistoryControllerService.viewIntakeMedicalHistory>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useMedicalHistoryControllerServiceViewIntakeMedicalHistoryKey, ...(queryKey ?? [{ intakeMedicalHistoryUuid }])], queryFn: () => MedicalHistoryControllerService.viewIntakeMedicalHistory(intakeMedicalHistoryUuid), ...options });
export const useMedicalHistoryControllerServiceDeleteMedicalHistory1 = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof MedicalHistoryControllerService.deleteMedicalHistory1>>, unknown, {
    historyId: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ historyId }) => MedicalHistoryControllerService.deleteMedicalHistory1(historyId), ...options });
export const useMedicalCodeControllerServiceUpdateBillingCodes = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof MedicalCodeControllerService.updateBillingCodes>>, unknown, {
    requestBody: BillingCodes;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => MedicalCodeControllerService.updateBillingCodes(requestBody), ...options });
export const useMedicalCodeControllerServiceAddBillingCodes = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof MedicalCodeControllerService.addBillingCodes>>, unknown, {
    requestBody: BillingCodes;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => MedicalCodeControllerService.addBillingCodes(requestBody), ...options });
export const useMedicalCodeControllerServiceUpdateStatus1 = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof MedicalCodeControllerService.updateStatus1>>, unknown, {
    uuid: string;
    status: boolean;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ uuid, status }) => MedicalCodeControllerService.updateStatus1(uuid, status), ...options });
export const useMedicalCodeControllerServiceGetAllMedicalCodesKey = "MedicalCodeControllerServiceGetAllMedicalCodes";
export const useMedicalCodeControllerServiceGetAllMedicalCodes = <TQueryKey extends Array<unknown> = unknown[]>({ codeType, page, size, sortBy, sortDirection, providerGroupUuid, searchString }: {
    codeType: "CPT" | "HCPCS" | "LOINC" | "ICD" | "PATIENT" | "PROVIDER" | "DRUG";
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
    providerGroupUuid?: string;
    searchString?: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof MedicalCodeControllerService.getAllMedicalCodes>>, unknown, Awaited<ReturnType<typeof MedicalCodeControllerService.getAllMedicalCodes>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useMedicalCodeControllerServiceGetAllMedicalCodesKey, ...(queryKey ?? [{ codeType, page, size, sortBy, sortDirection, providerGroupUuid, searchString }])], queryFn: () => MedicalCodeControllerService.getAllMedicalCodes(codeType, page, size, sortBy, sortDirection, providerGroupUuid, searchString), ...options });
export const useMedicalCodeControllerServiceGetBillingCodesKey = "MedicalCodeControllerServiceGetBillingCodes";
export const useMedicalCodeControllerServiceGetBillingCodes = <TQueryKey extends Array<unknown> = unknown[]>({ uuid }: {
    uuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof MedicalCodeControllerService.getBillingCodes>>, unknown, Awaited<ReturnType<typeof MedicalCodeControllerService.getBillingCodes>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useMedicalCodeControllerServiceGetBillingCodesKey, ...(queryKey ?? [{ uuid }])], queryFn: () => MedicalCodeControllerService.getBillingCodes(uuid), ...options });
export const useMedicalCodeControllerServiceGetAllProcedureCodesKey = "MedicalCodeControllerServiceGetAllProcedureCodes";
export const useMedicalCodeControllerServiceGetAllProcedureCodes = <TQueryKey extends Array<unknown> = unknown[]>({ codeType, page, size, sortBy, sortDirection, searchString }: {
    codeType?: "HCPCS" | "CPT";
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
    searchString?: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof MedicalCodeControllerService.getAllProcedureCodes>>, unknown, Awaited<ReturnType<typeof MedicalCodeControllerService.getAllProcedureCodes>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useMedicalCodeControllerServiceGetAllProcedureCodesKey, ...(queryKey ?? [{ codeType, page, size, sortBy, sortDirection, searchString }])], queryFn: () => MedicalCodeControllerService.getAllProcedureCodes(codeType, page, size, sortBy, sortDirection, searchString), ...options });
export const useMedicalCodeControllerServiceDeleteBillingCodes = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof MedicalCodeControllerService.deleteBillingCodes>>, unknown, {
    uuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ uuid }) => MedicalCodeControllerService.deleteBillingCodes(uuid), ...options });
export const useMacrosControllerServiceUpdateMacros = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof MacrosControllerService.updateMacros>>, unknown, {
    requestBody: Macros;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => MacrosControllerService.updateMacros(requestBody), ...options });
export const useMacrosControllerServiceCreateMacros = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof MacrosControllerService.createMacros>>, unknown, {
    requestBody: Macros;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => MacrosControllerService.createMacros(requestBody), ...options });
export const useMacrosControllerServiceGetMacrosKey = "MacrosControllerServiceGetMacros";
export const useMacrosControllerServiceGetMacros = <TQueryKey extends Array<unknown> = unknown[]>({ macrosUuid }: {
    macrosUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof MacrosControllerService.getMacros>>, unknown, Awaited<ReturnType<typeof MacrosControllerService.getMacros>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useMacrosControllerServiceGetMacrosKey, ...(queryKey ?? [{ macrosUuid }])], queryFn: () => MacrosControllerService.getMacros(macrosUuid), ...options });
export const useMacrosControllerServiceDeleteMacros = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof MacrosControllerService.deleteMacros>>, unknown, {
    macrosUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ macrosUuid }) => MacrosControllerService.deleteMacros(macrosUuid), ...options });
export const useMacrosControllerServiceGetAllMacrosKey = "MacrosControllerServiceGetAllMacros";
export const useMacrosControllerServiceGetAllMacros = <TQueryKey extends Array<unknown> = unknown[]>({ providerGroupUuid, page, size, sort }: {
    providerGroupUuid: string;
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof MacrosControllerService.getAllMacros>>, unknown, Awaited<ReturnType<typeof MacrosControllerService.getAllMacros>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useMacrosControllerServiceGetAllMacrosKey, ...(queryKey ?? [{ providerGroupUuid, page, size, sort }])], queryFn: () => MacrosControllerService.getAllMacros(providerGroupUuid, page, size, sort), ...options });
export const useLocationControllerServiceUpdateLocation = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof LocationControllerService.updateLocation>>, unknown, {
    requestBody: Location;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => LocationControllerService.updateLocation(requestBody), ...options });
export const useLocationControllerServiceAddLocation = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof LocationControllerService.addLocation>>, unknown, {
    requestBody: Location;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => LocationControllerService.addLocation(requestBody), ...options });
export const useLocationControllerServiceUpdateStatus2 = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof LocationControllerService.updateStatus2>>, unknown, {
    uuid: string;
    active: boolean;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ uuid, active }) => LocationControllerService.updateStatus2(uuid, active), ...options });
export const useLocationControllerServiceGetLocationByLocationIdKey = "LocationControllerServiceGetLocationByLocationId";
export const useLocationControllerServiceGetLocationByLocationId = <TQueryKey extends Array<unknown> = unknown[]>({ uuid }: {
    uuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof LocationControllerService.getLocationByLocationId>>, unknown, Awaited<ReturnType<typeof LocationControllerService.getLocationByLocationId>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useLocationControllerServiceGetLocationByLocationIdKey, ...(queryKey ?? [{ uuid }])], queryFn: () => LocationControllerService.getLocationByLocationId(uuid), ...options });
export const useLocationControllerServiceGetAllLocationsKey = "LocationControllerServiceGetAllLocations";
export const useLocationControllerServiceGetAllLocations = <TQueryKey extends Array<unknown> = unknown[]>({ providerGroupUuid, page, size, sortBy, sortDirection, searchString, status }: {
    providerGroupUuid: string;
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
    searchString?: string;
    status?: boolean;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof LocationControllerService.getAllLocations>>, unknown, Awaited<ReturnType<typeof LocationControllerService.getAllLocations>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useLocationControllerServiceGetAllLocationsKey, ...(queryKey ?? [{ providerGroupUuid, page, size, sortBy, sortDirection, searchString, status }])], queryFn: () => LocationControllerService.getAllLocations(providerGroupUuid, page, size, sortBy, sortDirection, searchString, status), ...options });
export const useIntakeFormTemplateControllerServiceViewIntakeFormTemplateKey = "IntakeFormTemplateControllerServiceViewIntakeFormTemplate";
export const useIntakeFormTemplateControllerServiceViewIntakeFormTemplate = <TQueryKey extends Array<unknown> = unknown[]>({ intakeFormTemplateId }: {
    intakeFormTemplateId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof IntakeFormTemplateControllerService.viewIntakeFormTemplate>>, unknown, Awaited<ReturnType<typeof IntakeFormTemplateControllerService.viewIntakeFormTemplate>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useIntakeFormTemplateControllerServiceViewIntakeFormTemplateKey, ...(queryKey ?? [{ intakeFormTemplateId }])], queryFn: () => IntakeFormTemplateControllerService.viewIntakeFormTemplate(intakeFormTemplateId), ...options });
export const useIntakeFormTemplateControllerServiceUpdateIntakeFormTemplate = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof IntakeFormTemplateControllerService.updateIntakeFormTemplate>>, unknown, {
    intakeFormTemplateId: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ intakeFormTemplateId }) => IntakeFormTemplateControllerService.updateIntakeFormTemplate(intakeFormTemplateId), ...options });
export const useIntakeFormTemplateControllerServiceArchiveIntakeFormTemplate = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof IntakeFormTemplateControllerService.archiveIntakeFormTemplate>>, unknown, {
    intakeFormTemplateId: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ intakeFormTemplateId }) => IntakeFormTemplateControllerService.archiveIntakeFormTemplate(intakeFormTemplateId), ...options });
export const useIntakeFormTemplateControllerServiceGetAllIntakeFormTemplatesKey = "IntakeFormTemplateControllerServiceGetAllIntakeFormTemplates";
export const useIntakeFormTemplateControllerServiceGetAllIntakeFormTemplates = <TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof IntakeFormTemplateControllerService.getAllIntakeFormTemplates>>, unknown, Awaited<ReturnType<typeof IntakeFormTemplateControllerService.getAllIntakeFormTemplates>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useIntakeFormTemplateControllerServiceGetAllIntakeFormTemplatesKey, ...(queryKey ?? [])], queryFn: () => IntakeFormTemplateControllerService.getAllIntakeFormTemplates(), ...options });
export const useIntakeFormTemplateControllerServiceAddIntakeFormTemplate = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof IntakeFormTemplateControllerService.addIntakeFormTemplate>>, unknown, void, unknown>, "mutationFn">) => useMutation({ mutationFn: () => IntakeFormTemplateControllerService.addIntakeFormTemplate(), ...options });
export const useIntakeFormControllerServiceViewIntakeFormDetailsProviderKey = "IntakeFormControllerServiceViewIntakeFormDetailsProvider";
export const useIntakeFormControllerServiceViewIntakeFormDetailsProvider = <TQueryKey extends Array<unknown> = unknown[]>({ patientId, intakeFormId }: {
    patientId: string;
    intakeFormId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof IntakeFormControllerService.viewIntakeFormDetailsProvider>>, unknown, Awaited<ReturnType<typeof IntakeFormControllerService.viewIntakeFormDetailsProvider>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useIntakeFormControllerServiceViewIntakeFormDetailsProviderKey, ...(queryKey ?? [{ patientId, intakeFormId }])], queryFn: () => IntakeFormControllerService.viewIntakeFormDetailsProvider(patientId, intakeFormId), ...options });
export const useIntakeFormControllerServiceUpdateIntakeFormForProvider = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof IntakeFormControllerService.updateIntakeFormForProvider>>, unknown, {
    patientId: string;
    intakeFormId: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientId, intakeFormId }) => IntakeFormControllerService.updateIntakeFormForProvider(patientId, intakeFormId), ...options });
export const useIntakeFormControllerServiceArchiveIntakeFormForProvider = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof IntakeFormControllerService.archiveIntakeFormForProvider>>, unknown, {
    patientId: string;
    intakeFormId: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientId, intakeFormId }) => IntakeFormControllerService.archiveIntakeFormForProvider(patientId, intakeFormId), ...options });
export const useIntakeFormControllerServiceViewIntakeFormDetailsPatientKey = "IntakeFormControllerServiceViewIntakeFormDetailsPatient";
export const useIntakeFormControllerServiceViewIntakeFormDetailsPatient = <TQueryKey extends Array<unknown> = unknown[]>({ intakeFormId }: {
    intakeFormId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof IntakeFormControllerService.viewIntakeFormDetailsPatient>>, unknown, Awaited<ReturnType<typeof IntakeFormControllerService.viewIntakeFormDetailsPatient>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useIntakeFormControllerServiceViewIntakeFormDetailsPatientKey, ...(queryKey ?? [{ intakeFormId }])], queryFn: () => IntakeFormControllerService.viewIntakeFormDetailsPatient(intakeFormId), ...options });
export const useIntakeFormControllerServiceUpdateIntakeFormForPatient = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof IntakeFormControllerService.updateIntakeFormForPatient>>, unknown, {
    intakeFormId: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ intakeFormId }) => IntakeFormControllerService.updateIntakeFormForPatient(intakeFormId), ...options });
export const useIntakeFormControllerServiceGetIntakeFormsForProviderKey = "IntakeFormControllerServiceGetIntakeFormsForProvider";
export const useIntakeFormControllerServiceGetIntakeFormsForProvider = <TQueryKey extends Array<unknown> = unknown[]>({ patientId }: {
    patientId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof IntakeFormControllerService.getIntakeFormsForProvider>>, unknown, Awaited<ReturnType<typeof IntakeFormControllerService.getIntakeFormsForProvider>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useIntakeFormControllerServiceGetIntakeFormsForProviderKey, ...(queryKey ?? [{ patientId }])], queryFn: () => IntakeFormControllerService.getIntakeFormsForProvider(patientId), ...options });
export const useIntakeFormControllerServiceFillIntakeFormForProvider = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof IntakeFormControllerService.fillIntakeFormForProvider>>, unknown, {
    patientId: string;
    requestBody: IntakeForm;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientId, requestBody }) => IntakeFormControllerService.fillIntakeFormForProvider(patientId, requestBody), ...options });
export const useIntakeFormControllerServiceFillIntakeFormForPatient = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof IntakeFormControllerService.fillIntakeFormForPatient>>, unknown, {
    requestBody: IntakeForm;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => IntakeFormControllerService.fillIntakeFormForPatient(requestBody), ...options });
export const useIntakeFormControllerServiceLoadPreviousIntakeFormKey = "IntakeFormControllerServiceLoadPreviousIntakeForm";
export const useIntakeFormControllerServiceLoadPreviousIntakeForm = <TQueryKey extends Array<unknown> = unknown[]>({ patientId }: {
    patientId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof IntakeFormControllerService.loadPreviousIntakeForm>>, unknown, Awaited<ReturnType<typeof IntakeFormControllerService.loadPreviousIntakeForm>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useIntakeFormControllerServiceLoadPreviousIntakeFormKey, ...(queryKey ?? [{ patientId }])], queryFn: () => IntakeFormControllerService.loadPreviousIntakeForm(patientId), ...options });
export const useIntakeFormControllerServiceGetAllQuestionnaireKey = "IntakeFormControllerServiceGetAllQuestionnaire";
export const useIntakeFormControllerServiceGetAllQuestionnaire = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, page, size, sort }: {
    patientUuid: string;
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof IntakeFormControllerService.getAllQuestionnaire>>, unknown, Awaited<ReturnType<typeof IntakeFormControllerService.getAllQuestionnaire>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useIntakeFormControllerServiceGetAllQuestionnaireKey, ...(queryKey ?? [{ patientUuid, page, size, sort }])], queryFn: () => IntakeFormControllerService.getAllQuestionnaire(patientUuid, page, size, sort), ...options });
export const useIntakeFormControllerServiceGetAllPatientIntakeFormsKey = "IntakeFormControllerServiceGetAllPatientIntakeForms";
export const useIntakeFormControllerServiceGetAllPatientIntakeForms = <TQueryKey extends Array<unknown> = unknown[]>({ appointmentUuid, page, size, sort }: {
    appointmentUuid: string;
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof IntakeFormControllerService.getAllPatientIntakeForms>>, unknown, Awaited<ReturnType<typeof IntakeFormControllerService.getAllPatientIntakeForms>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useIntakeFormControllerServiceGetAllPatientIntakeFormsKey, ...(queryKey ?? [{ appointmentUuid, page, size, sort }])], queryFn: () => IntakeFormControllerService.getAllPatientIntakeForms(appointmentUuid, page, size, sort), ...options });
export const useIntakeFormControllerServiceGetAllAppointmentIntakeFormsKey = "IntakeFormControllerServiceGetAllAppointmentIntakeForms";
export const useIntakeFormControllerServiceGetAllAppointmentIntakeForms = <TQueryKey extends Array<unknown> = unknown[]>({ appointmentUuid, page, size, sort }: {
    appointmentUuid: string;
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof IntakeFormControllerService.getAllAppointmentIntakeForms>>, unknown, Awaited<ReturnType<typeof IntakeFormControllerService.getAllAppointmentIntakeForms>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useIntakeFormControllerServiceGetAllAppointmentIntakeFormsKey, ...(queryKey ?? [{ appointmentUuid, page, size, sort }])], queryFn: () => IntakeFormControllerService.getAllAppointmentIntakeForms(appointmentUuid, page, size, sort), ...options });
export const useInsuranceControllerServiceUpdateInsuranceForPatient = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof InsuranceControllerService.updateInsuranceForPatient>>, unknown, {
    insuranceUuid: string;
    requestBody: Insurance;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ insuranceUuid, requestBody }) => InsuranceControllerService.updateInsuranceForPatient(insuranceUuid, requestBody), ...options });
export const useInsuranceControllerServiceArchivePatientInsuranceForPatient = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof InsuranceControllerService.archivePatientInsuranceForPatient>>, unknown, {
    insuranceUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ insuranceUuid }) => InsuranceControllerService.archivePatientInsuranceForPatient(insuranceUuid), ...options });
export const useInsuranceControllerServiceSetPrimaryInsuranceForPatient = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof InsuranceControllerService.setPrimaryInsuranceForPatient>>, unknown, {
    patientUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid }) => InsuranceControllerService.setPrimaryInsuranceForPatient(patientUuid), ...options });
export const useInsuranceControllerServiceSetPrimaryInsurancePatient = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof InsuranceControllerService.setPrimaryInsurancePatient>>, unknown, {
    patientUuid: string;
    insuranceUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, insuranceUuid }) => InsuranceControllerService.setPrimaryInsurancePatient(patientUuid, insuranceUuid), ...options });
export const useInsuranceControllerServiceViewPatientInsuranceKey = "InsuranceControllerServiceViewPatientInsurance";
export const useInsuranceControllerServiceViewPatientInsurance = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, insuranceUuid }: {
    patientUuid: string;
    insuranceUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof InsuranceControllerService.viewPatientInsurance>>, unknown, Awaited<ReturnType<typeof InsuranceControllerService.viewPatientInsurance>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useInsuranceControllerServiceViewPatientInsuranceKey, ...(queryKey ?? [{ patientUuid, insuranceUuid }])], queryFn: () => InsuranceControllerService.viewPatientInsurance(patientUuid, insuranceUuid), ...options });
export const useInsuranceControllerServiceUpdatePatientInsurance = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof InsuranceControllerService.updatePatientInsurance>>, unknown, {
    patientUuid: string;
    insuranceUuid: string;
    requestBody: Insurance;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, insuranceUuid, requestBody }) => InsuranceControllerService.updatePatientInsurance(patientUuid, insuranceUuid, requestBody), ...options });
export const useInsuranceControllerServiceArchivePatientInsurance = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof InsuranceControllerService.archivePatientInsurance>>, unknown, {
    patientUuid: string;
    insuranceUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, insuranceUuid }) => InsuranceControllerService.archivePatientInsurance(patientUuid, insuranceUuid), ...options });
export const useInsuranceControllerServiceViewPatientInsuranceForPatientKey = "InsuranceControllerServiceViewPatientInsuranceForPatient";
export const useInsuranceControllerServiceViewPatientInsuranceForPatient = <TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof InsuranceControllerService.viewPatientInsuranceForPatient>>, unknown, Awaited<ReturnType<typeof InsuranceControllerService.viewPatientInsuranceForPatient>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useInsuranceControllerServiceViewPatientInsuranceForPatientKey, ...(queryKey ?? [])], queryFn: () => InsuranceControllerService.viewPatientInsuranceForPatient(), ...options });
export const useInsuranceControllerServiceAddInsuranceForPatient = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof InsuranceControllerService.addInsuranceForPatient>>, unknown, {
    requestBody: Insurance;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => InsuranceControllerService.addInsuranceForPatient(requestBody), ...options });
export const useInsuranceControllerServiceGetPatientInsuranceKey = "InsuranceControllerServiceGetPatientInsurance";
export const useInsuranceControllerServiceGetPatientInsurance = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid }: {
    patientUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof InsuranceControllerService.getPatientInsurance>>, unknown, Awaited<ReturnType<typeof InsuranceControllerService.getPatientInsurance>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useInsuranceControllerServiceGetPatientInsuranceKey, ...(queryKey ?? [{ patientUuid }])], queryFn: () => InsuranceControllerService.getPatientInsurance(patientUuid), ...options });
export const useInsuranceControllerServiceAddInsurance = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof InsuranceControllerService.addInsurance>>, unknown, {
    patientUuid: string;
    requestBody: Insurance;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, requestBody }) => InsuranceControllerService.addInsurance(patientUuid, requestBody), ...options });
export const useInsuranceControllerServiceGetInsurancePayerKey = "InsuranceControllerServiceGetInsurancePayer";
export const useInsuranceControllerServiceGetInsurancePayer = <TQueryKey extends Array<unknown> = unknown[]>({ page, size }: {
    page?: number;
    size?: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof InsuranceControllerService.getInsurancePayer>>, unknown, Awaited<ReturnType<typeof InsuranceControllerService.getInsurancePayer>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useInsuranceControllerServiceGetInsurancePayerKey, ...(queryKey ?? [{ page, size }])], queryFn: () => InsuranceControllerService.getInsurancePayer(page, size), ...options });
export const useInsuranceControllerServiceGetAllLicensedStatesKey = "InsuranceControllerServiceGetAllLicensedStates";
export const useInsuranceControllerServiceGetAllLicensedStates = <TQueryKey extends Array<unknown> = unknown[]>({ page, size }: {
    page?: number;
    size?: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof InsuranceControllerService.getAllLicensedStates>>, unknown, Awaited<ReturnType<typeof InsuranceControllerService.getAllLicensedStates>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useInsuranceControllerServiceGetAllLicensedStatesKey, ...(queryKey ?? [{ page, size }])], queryFn: () => InsuranceControllerService.getAllLicensedStates(page, size), ...options });
export const useInsuranceClaimControllerServiceViewInsuranceClaimKey = "InsuranceClaimControllerServiceViewInsuranceClaim";
export const useInsuranceClaimControllerServiceViewInsuranceClaim = <TQueryKey extends Array<unknown> = unknown[]>({ insuranceClaimUuid }: {
    insuranceClaimUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof InsuranceClaimControllerService.viewInsuranceClaim>>, unknown, Awaited<ReturnType<typeof InsuranceClaimControllerService.viewInsuranceClaim>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useInsuranceClaimControllerServiceViewInsuranceClaimKey, ...(queryKey ?? [{ insuranceClaimUuid }])], queryFn: () => InsuranceClaimControllerService.viewInsuranceClaim(insuranceClaimUuid), ...options });
export const useInsuranceClaimControllerServiceUpdateInsuranceClaim = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof InsuranceClaimControllerService.updateInsuranceClaim>>, unknown, {
    insuranceClaimUuid: string;
    requestBody: InsuranceClaim;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ insuranceClaimUuid, requestBody }) => InsuranceClaimControllerService.updateInsuranceClaim(insuranceClaimUuid, requestBody), ...options });
export const useInsuranceClaimControllerServiceArchiveInsuranceClaim = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof InsuranceClaimControllerService.archiveInsuranceClaim>>, unknown, {
    insuranceClaimUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ insuranceClaimUuid }) => InsuranceClaimControllerService.archiveInsuranceClaim(insuranceClaimUuid), ...options });
export const useInsuranceClaimControllerServiceViewAdjustPaymentForInsuranceKey = "InsuranceClaimControllerServiceViewAdjustPaymentForInsurance";
export const useInsuranceClaimControllerServiceViewAdjustPaymentForInsurance = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, patientPaymentUuid }: {
    patientUuid: string;
    patientPaymentUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof InsuranceClaimControllerService.viewAdjustPaymentForInsurance>>, unknown, Awaited<ReturnType<typeof InsuranceClaimControllerService.viewAdjustPaymentForInsurance>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useInsuranceClaimControllerServiceViewAdjustPaymentForInsuranceKey, ...(queryKey ?? [{ patientUuid, patientPaymentUuid }])], queryFn: () => InsuranceClaimControllerService.viewAdjustPaymentForInsurance(patientUuid, patientPaymentUuid), ...options });
export const useInsuranceClaimControllerServiceAdjustPaymentForInsurance = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof InsuranceClaimControllerService.adjustPaymentForInsurance>>, unknown, {
    patientUuid: string;
    patientPaymentUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, patientPaymentUuid }) => InsuranceClaimControllerService.adjustPaymentForInsurance(patientUuid, patientPaymentUuid), ...options });
export const useInsuranceClaimControllerServiceGetInsuranceClaimOfPatientKey = "InsuranceClaimControllerServiceGetInsuranceClaimOfPatient";
export const useInsuranceClaimControllerServiceGetInsuranceClaimOfPatient = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid }: {
    patientUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof InsuranceClaimControllerService.getInsuranceClaimOfPatient>>, unknown, Awaited<ReturnType<typeof InsuranceClaimControllerService.getInsuranceClaimOfPatient>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useInsuranceClaimControllerServiceGetInsuranceClaimOfPatientKey, ...(queryKey ?? [{ patientUuid }])], queryFn: () => InsuranceClaimControllerService.getInsuranceClaimOfPatient(patientUuid), ...options });
export const useInsuranceClaimControllerServiceAddInsuranceClaim = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof InsuranceClaimControllerService.addInsuranceClaim>>, unknown, {
    patientUuid: string;
    requestBody: InsuranceClaim;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, requestBody }) => InsuranceClaimControllerService.addInsuranceClaim(patientUuid, requestBody), ...options });
export const useInsuranceClaimControllerServicePreviewInsuranceClaimKey = "InsuranceClaimControllerServicePreviewInsuranceClaim";
export const useInsuranceClaimControllerServicePreviewInsuranceClaim = <TQueryKey extends Array<unknown> = unknown[]>({ insuranceClaimUuid }: {
    insuranceClaimUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof InsuranceClaimControllerService.previewInsuranceClaim>>, unknown, Awaited<ReturnType<typeof InsuranceClaimControllerService.previewInsuranceClaim>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useInsuranceClaimControllerServicePreviewInsuranceClaimKey, ...(queryKey ?? [{ insuranceClaimUuid }])], queryFn: () => InsuranceClaimControllerService.previewInsuranceClaim(insuranceClaimUuid), ...options });
export const useInsuranceClaimControllerServiceDownloadInsuranceClaimKey = "InsuranceClaimControllerServiceDownloadInsuranceClaim";
export const useInsuranceClaimControllerServiceDownloadInsuranceClaim = <TQueryKey extends Array<unknown> = unknown[]>({ insuranceClaimUuid }: {
    insuranceClaimUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof InsuranceClaimControllerService.downloadInsuranceClaim>>, unknown, Awaited<ReturnType<typeof InsuranceClaimControllerService.downloadInsuranceClaim>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useInsuranceClaimControllerServiceDownloadInsuranceClaimKey, ...(queryKey ?? [{ insuranceClaimUuid }])], queryFn: () => InsuranceClaimControllerService.downloadInsuranceClaim(insuranceClaimUuid), ...options });
export const useFeeScheduleControllerServiceGetAllFeeScheduleForProviderKey = "FeeScheduleControllerServiceGetAllFeeScheduleForProvider";
export const useFeeScheduleControllerServiceGetAllFeeScheduleForProvider = <TQueryKey extends Array<unknown> = unknown[]>({ page, size, sortBy, sortDirection, status }: {
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
    status?: boolean;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof FeeScheduleControllerService.getAllFeeScheduleForProvider>>, unknown, Awaited<ReturnType<typeof FeeScheduleControllerService.getAllFeeScheduleForProvider>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useFeeScheduleControllerServiceGetAllFeeScheduleForProviderKey, ...(queryKey ?? [{ page, size, sortBy, sortDirection, status }])], queryFn: () => FeeScheduleControllerService.getAllFeeScheduleForProvider(page, size, sortBy, sortDirection, status), ...options });
export const useFeeScheduleControllerServiceEditFeeSchedule = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof FeeScheduleControllerService.editFeeSchedule>>, unknown, {
    requestBody: FeeSchedule;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => FeeScheduleControllerService.editFeeSchedule(requestBody), ...options });
export const useFeeScheduleControllerServiceAddFeeScheduleForProvider = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof FeeScheduleControllerService.addFeeScheduleForProvider>>, unknown, {
    requestBody: FeeSchedule;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => FeeScheduleControllerService.addFeeScheduleForProvider(requestBody), ...options });
export const useFeeScheduleControllerServiceActivateFeeSchedule = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof FeeScheduleControllerService.activateFeeSchedule>>, unknown, {
    feeScheduleUuid: string;
    status: boolean;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ feeScheduleUuid, status }) => FeeScheduleControllerService.activateFeeSchedule(feeScheduleUuid, status), ...options });
export const useFeeScheduleControllerServiceGetFeeScheduleDetailsKey = "FeeScheduleControllerServiceGetFeeScheduleDetails";
export const useFeeScheduleControllerServiceGetFeeScheduleDetails = <TQueryKey extends Array<unknown> = unknown[]>({ feeScheduleUuid }: {
    feeScheduleUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof FeeScheduleControllerService.getFeeScheduleDetails>>, unknown, Awaited<ReturnType<typeof FeeScheduleControllerService.getFeeScheduleDetails>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useFeeScheduleControllerServiceGetFeeScheduleDetailsKey, ...(queryKey ?? [{ feeScheduleUuid }])], queryFn: () => FeeScheduleControllerService.getFeeScheduleDetails(feeScheduleUuid), ...options });
export const useFeeScheduleControllerServiceArchiveFeeSchedule = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof FeeScheduleControllerService.archiveFeeSchedule>>, unknown, {
    feeScheduleUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ feeScheduleUuid }) => FeeScheduleControllerService.archiveFeeSchedule(feeScheduleUuid), ...options });
export const useFamilyMemberControllerServiceUpdateFamilyMember = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof FamilyMemberControllerService.updateFamilyMember>>, unknown, {
    requestBody: FamilyMember;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => FamilyMemberControllerService.updateFamilyMember(requestBody), ...options });
export const useFamilyMemberControllerServiceAddFamilyMemberPatient = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof FamilyMemberControllerService.addFamilyMemberPatient>>, unknown, {
    requestBody: FamilyMember;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => FamilyMemberControllerService.addFamilyMemberPatient(requestBody), ...options });
export const useFamilyMemberControllerServiceGetAllFamilyMembersForPatientKey = "FamilyMemberControllerServiceGetAllFamilyMembersForPatient";
export const useFamilyMemberControllerServiceGetAllFamilyMembersForPatient = <TQueryKey extends Array<unknown> = unknown[]>({ familyMemberId, page, size, sortBy, sortDirection }: {
    familyMemberId: string;
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof FamilyMemberControllerService.getAllFamilyMembersForPatient>>, unknown, Awaited<ReturnType<typeof FamilyMemberControllerService.getAllFamilyMembersForPatient>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useFamilyMemberControllerServiceGetAllFamilyMembersForPatientKey, ...(queryKey ?? [{ familyMemberId, page, size, sortBy, sortDirection }])], queryFn: () => FamilyMemberControllerService.getAllFamilyMembersForPatient(familyMemberId, page, size, sortBy, sortDirection), ...options });
export const useFamilyHistoryControllerServiceUpdatePatientsFamilyHistory = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof FamilyHistoryControllerService.updatePatientsFamilyHistory>>, unknown, {
    requestBody: PatientFamilyHistory;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => FamilyHistoryControllerService.updatePatientsFamilyHistory(requestBody), ...options });
export const useFamilyHistoryControllerServiceAddPatientsFamilyHistory = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof FamilyHistoryControllerService.addPatientsFamilyHistory>>, unknown, {
    requestBody: PatientFamilyHistory;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => FamilyHistoryControllerService.addPatientsFamilyHistory(requestBody), ...options });
export const useFamilyHistoryControllerServiceViewPatientIntakeFamilyHistoryKey = "FamilyHistoryControllerServiceViewPatientIntakeFamilyHistory";
export const useFamilyHistoryControllerServiceViewPatientIntakeFamilyHistory = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, intakeFormUuid, intakeFamilyHistoryUuid }: {
    patientUuid: string;
    intakeFormUuid: string;
    intakeFamilyHistoryUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof FamilyHistoryControllerService.viewPatientIntakeFamilyHistory>>, unknown, Awaited<ReturnType<typeof FamilyHistoryControllerService.viewPatientIntakeFamilyHistory>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useFamilyHistoryControllerServiceViewPatientIntakeFamilyHistoryKey, ...(queryKey ?? [{ patientUuid, intakeFormUuid, intakeFamilyHistoryUuid }])], queryFn: () => FamilyHistoryControllerService.viewPatientIntakeFamilyHistory(patientUuid, intakeFormUuid, intakeFamilyHistoryUuid), ...options });
export const useFamilyHistoryControllerServiceUpdatePatientIntakeFamilyHistory = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof FamilyHistoryControllerService.updatePatientIntakeFamilyHistory>>, unknown, {
    patientUuid: string;
    intakeFormUuid: string;
    intakeFamilyHistoryUuid: string;
    requestBody: IntakePatientFamilyHistory;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, intakeFormUuid, intakeFamilyHistoryUuid, requestBody }) => FamilyHistoryControllerService.updatePatientIntakeFamilyHistory(patientUuid, intakeFormUuid, intakeFamilyHistoryUuid, requestBody), ...options });
export const useFamilyHistoryControllerServiceArchivePatientIntakeFamilyHistory = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof FamilyHistoryControllerService.archivePatientIntakeFamilyHistory>>, unknown, {
    patientUuid: string;
    intakeFormUuid: string;
    intakeFamilyHistoryUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, intakeFormUuid, intakeFamilyHistoryUuid }) => FamilyHistoryControllerService.archivePatientIntakeFamilyHistory(patientUuid, intakeFormUuid, intakeFamilyHistoryUuid), ...options });
export const useFamilyHistoryControllerServiceViewPatientIntakeFamilyHistoryForPatientKey = "FamilyHistoryControllerServiceViewPatientIntakeFamilyHistoryForPatient";
export const useFamilyHistoryControllerServiceViewPatientIntakeFamilyHistoryForPatient = <TQueryKey extends Array<unknown> = unknown[]>({ intakeFormUuid, intakeFamilyHistoryUuid }: {
    intakeFormUuid: string;
    intakeFamilyHistoryUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof FamilyHistoryControllerService.viewPatientIntakeFamilyHistoryForPatient>>, unknown, Awaited<ReturnType<typeof FamilyHistoryControllerService.viewPatientIntakeFamilyHistoryForPatient>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useFamilyHistoryControllerServiceViewPatientIntakeFamilyHistoryForPatientKey, ...(queryKey ?? [{ intakeFormUuid, intakeFamilyHistoryUuid }])], queryFn: () => FamilyHistoryControllerService.viewPatientIntakeFamilyHistoryForPatient(intakeFormUuid, intakeFamilyHistoryUuid), ...options });
export const useFamilyHistoryControllerServiceUpdatePatientIntakeFamilyHistoryForPatient = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof FamilyHistoryControllerService.updatePatientIntakeFamilyHistoryForPatient>>, unknown, {
    intakeFormUuid: string;
    intakeFamilyHistoryUuid: string;
    requestBody: IntakePatientFamilyHistory;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ intakeFormUuid, intakeFamilyHistoryUuid, requestBody }) => FamilyHistoryControllerService.updatePatientIntakeFamilyHistoryForPatient(intakeFormUuid, intakeFamilyHistoryUuid, requestBody), ...options });
export const useFamilyHistoryControllerServiceArchivePatientIntakeFamilyHistoryForPatient = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof FamilyHistoryControllerService.archivePatientIntakeFamilyHistoryForPatient>>, unknown, {
    intakeFormUuid: string;
    intakeFamilyHistoryUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ intakeFormUuid, intakeFamilyHistoryUuid }) => FamilyHistoryControllerService.archivePatientIntakeFamilyHistoryForPatient(intakeFormUuid, intakeFamilyHistoryUuid), ...options });
export const useFamilyHistoryControllerServiceAddPatientsIntakeFamilyHistory = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof FamilyHistoryControllerService.addPatientsIntakeFamilyHistory>>, unknown, {
    patientUuid: string;
    intakeFormUuid: string;
    requestBody: IntakePatientFamilyHistory;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, intakeFormUuid, requestBody }) => FamilyHistoryControllerService.addPatientsIntakeFamilyHistory(patientUuid, intakeFormUuid, requestBody), ...options });
export const useFamilyHistoryControllerServiceAddPatientsIntakeFamilyHistoryForPatient = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof FamilyHistoryControllerService.addPatientsIntakeFamilyHistoryForPatient>>, unknown, {
    intakeFormUuid: string;
    requestBody: IntakePatientFamilyHistory;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ intakeFormUuid, requestBody }) => FamilyHistoryControllerService.addPatientsIntakeFamilyHistoryForPatient(intakeFormUuid, requestBody), ...options });
export const useFamilyHistoryControllerServiceGetPatientIntakeFamilyHistoryKey = "FamilyHistoryControllerServiceGetPatientIntakeFamilyHistory";
export const useFamilyHistoryControllerServiceGetPatientIntakeFamilyHistory = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, intakeFamilyHistoryUuid }: {
    patientUuid: string;
    intakeFamilyHistoryUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof FamilyHistoryControllerService.getPatientIntakeFamilyHistory>>, unknown, Awaited<ReturnType<typeof FamilyHistoryControllerService.getPatientIntakeFamilyHistory>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useFamilyHistoryControllerServiceGetPatientIntakeFamilyHistoryKey, ...(queryKey ?? [{ patientUuid, intakeFamilyHistoryUuid }])], queryFn: () => FamilyHistoryControllerService.getPatientIntakeFamilyHistory(patientUuid, intakeFamilyHistoryUuid), ...options });
export const useFamilyHistoryControllerServiceGetPatientFamilyHistoryKey = "FamilyHistoryControllerServiceGetPatientFamilyHistory";
export const useFamilyHistoryControllerServiceGetPatientFamilyHistory = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, page, size, sortBy, sortDirection }: {
    patientUuid: string;
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof FamilyHistoryControllerService.getPatientFamilyHistory>>, unknown, Awaited<ReturnType<typeof FamilyHistoryControllerService.getPatientFamilyHistory>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useFamilyHistoryControllerServiceGetPatientFamilyHistoryKey, ...(queryKey ?? [{ patientUuid, page, size, sortBy, sortDirection }])], queryFn: () => FamilyHistoryControllerService.getPatientFamilyHistory(patientUuid, page, size, sortBy, sortDirection), ...options });
export const useFamilyHistoryControllerServiceViewPatientFamilyHistoryKey = "FamilyHistoryControllerServiceViewPatientFamilyHistory";
export const useFamilyHistoryControllerServiceViewPatientFamilyHistory = <TQueryKey extends Array<unknown> = unknown[]>({ patientFamilyHistoryUuid }: {
    patientFamilyHistoryUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof FamilyHistoryControllerService.viewPatientFamilyHistory>>, unknown, Awaited<ReturnType<typeof FamilyHistoryControllerService.viewPatientFamilyHistory>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useFamilyHistoryControllerServiceViewPatientFamilyHistoryKey, ...(queryKey ?? [{ patientFamilyHistoryUuid }])], queryFn: () => FamilyHistoryControllerService.viewPatientFamilyHistory(patientFamilyHistoryUuid), ...options });
export const useFamilyHistoryControllerServiceArchivePatientFamilyHistory = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof FamilyHistoryControllerService.archivePatientFamilyHistory>>, unknown, {
    patientFamilyHistoryUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientFamilyHistoryUuid }) => FamilyHistoryControllerService.archivePatientFamilyHistory(patientFamilyHistoryUuid), ...options });
export const useFamilyHistoryControllerServiceGetPatientIntakeFamilyHistoryForPatientKey = "FamilyHistoryControllerServiceGetPatientIntakeFamilyHistoryForPatient";
export const useFamilyHistoryControllerServiceGetPatientIntakeFamilyHistoryForPatient = <TQueryKey extends Array<unknown> = unknown[]>({ intakeFamilyHistoryUuid }: {
    intakeFamilyHistoryUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof FamilyHistoryControllerService.getPatientIntakeFamilyHistoryForPatient>>, unknown, Awaited<ReturnType<typeof FamilyHistoryControllerService.getPatientIntakeFamilyHistoryForPatient>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useFamilyHistoryControllerServiceGetPatientIntakeFamilyHistoryForPatientKey, ...(queryKey ?? [{ intakeFamilyHistoryUuid }])], queryFn: () => FamilyHistoryControllerService.getPatientIntakeFamilyHistoryForPatient(intakeFamilyHistoryUuid), ...options });
export const useEprescriptionControllerServiceSendPrescriptionToPatient = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof EprescriptionControllerService.sendPrescriptionToPatient>>, unknown, {
    patientUuid: string;
    encounterUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, encounterUuid }) => EprescriptionControllerService.sendPrescriptionToPatient(patientUuid, encounterUuid), ...options });
export const useEprescriptionControllerServiceGetEprescriptionPreviewKey = "EprescriptionControllerServiceGetEprescriptionPreview";
export const useEprescriptionControllerServiceGetEprescriptionPreview = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, encounterUuid }: {
    patientUuid: string;
    encounterUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof EprescriptionControllerService.getEprescriptionPreview>>, unknown, Awaited<ReturnType<typeof EprescriptionControllerService.getEprescriptionPreview>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useEprescriptionControllerServiceGetEprescriptionPreviewKey, ...(queryKey ?? [{ patientUuid, encounterUuid }])], queryFn: () => EprescriptionControllerService.getEprescriptionPreview(patientUuid, encounterUuid), ...options });
export const useEprescriptionControllerServiceDownloadEprescriptionKey = "EprescriptionControllerServiceDownloadEprescription";
export const useEprescriptionControllerServiceDownloadEprescription = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, encounterUuid }: {
    patientUuid: string;
    encounterUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof EprescriptionControllerService.downloadEprescription>>, unknown, Awaited<ReturnType<typeof EprescriptionControllerService.downloadEprescription>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useEprescriptionControllerServiceDownloadEprescriptionKey, ...(queryKey ?? [{ patientUuid, encounterUuid }])], queryFn: () => EprescriptionControllerService.downloadEprescription(patientUuid, encounterUuid), ...options });
export const useEncounterControllerServiceGetPatientEncounterKey = "EncounterControllerServiceGetPatientEncounter";
export const useEncounterControllerServiceGetPatientEncounter = <TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof EncounterControllerService.getPatientEncounter>>, unknown, Awaited<ReturnType<typeof EncounterControllerService.getPatientEncounter>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useEncounterControllerServiceGetPatientEncounterKey, ...(queryKey ?? [])], queryFn: () => EncounterControllerService.getPatientEncounter(), ...options });
export const useEncounterControllerServiceEditEncounter = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof EncounterControllerService.editEncounter>>, unknown, {
    requestBody: EncounterUpdateRequest;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => EncounterControllerService.editEncounter(requestBody), ...options });
export const useEncounterControllerServiceCreateEncounter = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof EncounterControllerService.createEncounter>>, unknown, {
    requestBody: EncounterRequest;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => EncounterControllerService.createEncounter(requestBody), ...options });
export const useEncounterControllerServiceViewEncounterDetailsForProviderKey = "EncounterControllerServiceViewEncounterDetailsForProvider";
export const useEncounterControllerServiceViewEncounterDetailsForProvider = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, encounterUuid }: {
    patientUuid: string;
    encounterUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof EncounterControllerService.viewEncounterDetailsForProvider>>, unknown, Awaited<ReturnType<typeof EncounterControllerService.viewEncounterDetailsForProvider>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useEncounterControllerServiceViewEncounterDetailsForProviderKey, ...(queryKey ?? [{ patientUuid, encounterUuid }])], queryFn: () => EncounterControllerService.viewEncounterDetailsForProvider(patientUuid, encounterUuid), ...options });
export const useEncounterControllerServiceUpdateEncounter = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof EncounterControllerService.updateEncounter>>, unknown, {
    patientUuid: string;
    encounterUuid: string;
    requestBody: Encounter;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, encounterUuid, requestBody }) => EncounterControllerService.updateEncounter(patientUuid, encounterUuid, requestBody), ...options });
export const useEncounterControllerServiceArchiveEncounter = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof EncounterControllerService.archiveEncounter>>, unknown, {
    patientUuid: string;
    encounterUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, encounterUuid }) => EncounterControllerService.archiveEncounter(patientUuid, encounterUuid), ...options });
export const useEncounterControllerServiceSignEncounter = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof EncounterControllerService.signEncounter>>, unknown, {
    patientUuid: string;
    encounterUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, encounterUuid }) => EncounterControllerService.signEncounter(patientUuid, encounterUuid), ...options });
export const useEncounterControllerServiceCheckoutEncounter = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof EncounterControllerService.checkoutEncounter>>, unknown, {
    patientUuid: string;
    encounterUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, encounterUuid }) => EncounterControllerService.checkoutEncounter(patientUuid, encounterUuid), ...options });
export const useEncounterControllerServiceClearClonedEncounter = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof EncounterControllerService.clearClonedEncounter>>, unknown, {
    encounterUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ encounterUuid }) => EncounterControllerService.clearClonedEncounter(encounterUuid), ...options });
export const useEncounterControllerServiceShareEncounterDetails = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof EncounterControllerService.shareEncounterDetails>>, unknown, {
    encounterUuid: string;
    emailId: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ encounterUuid, emailId }) => EncounterControllerService.shareEncounterDetails(encounterUuid, emailId), ...options });
export const useEncounterControllerServiceGetPatientEncounterForProviderKey = "EncounterControllerServiceGetPatientEncounterForProvider";
export const useEncounterControllerServiceGetPatientEncounterForProvider = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid }: {
    patientUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof EncounterControllerService.getPatientEncounterForProvider>>, unknown, Awaited<ReturnType<typeof EncounterControllerService.getPatientEncounterForProvider>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useEncounterControllerServiceGetPatientEncounterForProviderKey, ...(queryKey ?? [{ patientUuid }])], queryFn: () => EncounterControllerService.getPatientEncounterForProvider(patientUuid), ...options });
export const useEncounterControllerServiceStartEncounter = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof EncounterControllerService.startEncounter>>, unknown, {
    patientUuid: string;
    requestBody: Encounter;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, requestBody }) => EncounterControllerService.startEncounter(patientUuid, requestBody), ...options });
export const useEncounterControllerServiceUploadDocuments = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof EncounterControllerService.uploadDocuments>>, unknown, {
    encounterUuid: string;
    documentName: Array<string>;
    file: Array<Blob>;
    documentType: Array<"PDF" | "MS_WORD" | "ZIP" | "X_GZIP" | "X_COMPRESSED" | "DOCX" | "RTF" | "PLAIN" | "JPEG_IMAGE" | "PNG_IMAGE" | "GIF_IMAGE" | "BMP_IMAGE" | "WEBP_IMAGE" | "SVG_IMAGE" | "MPEG_AUDIO" | "OTHER" | "CSV">;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ encounterUuid, documentName, file, documentType }) => EncounterControllerService.uploadDocuments(encounterUuid, documentName, file, documentType), ...options });
export const useEncounterControllerServiceAddEncounterDetails = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof EncounterControllerService.addEncounterDetails>>, unknown, {
    requestBody: EncounterDetailsRequest;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => EncounterControllerService.addEncounterDetails(requestBody), ...options });
export const useEncounterControllerServiceCloneEncounter = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof EncounterControllerService.cloneEncounter>>, unknown, {
    requestBody: CloneEncounterRequest;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => EncounterControllerService.cloneEncounter(requestBody), ...options });
export const useEncounterControllerServiceViewEncounterDetailsForPatientKey = "EncounterControllerServiceViewEncounterDetailsForPatient";
export const useEncounterControllerServiceViewEncounterDetailsForPatient = <TQueryKey extends Array<unknown> = unknown[]>({ encounterUuid }: {
    encounterUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof EncounterControllerService.viewEncounterDetailsForPatient>>, unknown, Awaited<ReturnType<typeof EncounterControllerService.viewEncounterDetailsForPatient>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useEncounterControllerServiceViewEncounterDetailsForPatientKey, ...(queryKey ?? [{ encounterUuid }])], queryFn: () => EncounterControllerService.viewEncounterDetailsForPatient(encounterUuid), ...options });
export const useEncounterControllerServiceGetVisitCountByProviderGroupKey = "EncounterControllerServiceGetVisitCountByProviderGroup";
export const useEncounterControllerServiceGetVisitCountByProviderGroup = <TQueryKey extends Array<unknown> = unknown[]>({ providerGroupUuid }: {
    providerGroupUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof EncounterControllerService.getVisitCountByProviderGroup>>, unknown, Awaited<ReturnType<typeof EncounterControllerService.getVisitCountByProviderGroup>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useEncounterControllerServiceGetVisitCountByProviderGroupKey, ...(queryKey ?? [{ providerGroupUuid }])], queryFn: () => EncounterControllerService.getVisitCountByProviderGroup(providerGroupUuid), ...options });
export const useEncounterControllerServiceGetVisitHistoryKey = "EncounterControllerServiceGetVisitHistory";
export const useEncounterControllerServiceGetVisitHistory = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, page, size, sort }: {
    patientUuid: string;
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof EncounterControllerService.getVisitHistory>>, unknown, Awaited<ReturnType<typeof EncounterControllerService.getVisitHistory>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useEncounterControllerServiceGetVisitHistoryKey, ...(queryKey ?? [{ patientUuid, page, size, sort }])], queryFn: () => EncounterControllerService.getVisitHistory(patientUuid, page, size, sort), ...options });
export const useEncounterControllerServiceGetProviderEncounterCountKey = "EncounterControllerServiceGetProviderEncounterCount";
export const useEncounterControllerServiceGetProviderEncounterCount = <TQueryKey extends Array<unknown> = unknown[]>({ providerUuid }: {
    providerUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof EncounterControllerService.getProviderEncounterCount>>, unknown, Awaited<ReturnType<typeof EncounterControllerService.getProviderEncounterCount>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useEncounterControllerServiceGetProviderEncounterCountKey, ...(queryKey ?? [{ providerUuid }])], queryFn: () => EncounterControllerService.getProviderEncounterCount(providerUuid), ...options });
export const useEncounterControllerServiceGetAllEncounterByProviderKey = "EncounterControllerServiceGetAllEncounterByProvider";
export const useEncounterControllerServiceGetAllEncounterByProvider = <TQueryKey extends Array<unknown> = unknown[]>({ providerGroupUuid, search, startDate, endDate, providerUuid, encounterStatus, page, size, sort }: {
    providerGroupUuid: string;
    search?: string;
    startDate?: string;
    endDate?: string;
    providerUuid?: string;
    encounterStatus?: "CHECK_IN" | "DRAFT" | "SIGNED" | "UNSIGNED";
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof EncounterControllerService.getAllEncounterByProvider>>, unknown, Awaited<ReturnType<typeof EncounterControllerService.getAllEncounterByProvider>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useEncounterControllerServiceGetAllEncounterByProviderKey, ...(queryKey ?? [{ providerGroupUuid, search, startDate, endDate, providerUuid, encounterStatus, page, size, sort }])], queryFn: () => EncounterControllerService.getAllEncounterByProvider(providerGroupUuid, search, startDate, endDate, providerUuid, encounterStatus, page, size, sort), ...options });
export const useEncounterControllerServiceGetProviderGroupEncounterCountKey = "EncounterControllerServiceGetProviderGroupEncounterCount";
export const useEncounterControllerServiceGetProviderGroupEncounterCount = <TQueryKey extends Array<unknown> = unknown[]>({ providerGroupUuid, startDate, endDate }: {
    providerGroupUuid: string;
    startDate?: string;
    endDate?: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof EncounterControllerService.getProviderGroupEncounterCount>>, unknown, Awaited<ReturnType<typeof EncounterControllerService.getProviderGroupEncounterCount>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useEncounterControllerServiceGetProviderGroupEncounterCountKey, ...(queryKey ?? [{ providerGroupUuid, startDate, endDate }])], queryFn: () => EncounterControllerService.getProviderGroupEncounterCount(providerGroupUuid, startDate, endDate), ...options });
export const useEncounterControllerServicePrintEncounterDetailsKey = "EncounterControllerServicePrintEncounterDetails";
export const useEncounterControllerServicePrintEncounterDetails = <TQueryKey extends Array<unknown> = unknown[]>({ encounterUuid }: {
    encounterUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof EncounterControllerService.printEncounterDetails>>, unknown, Awaited<ReturnType<typeof EncounterControllerService.printEncounterDetails>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useEncounterControllerServicePrintEncounterDetailsKey, ...(queryKey ?? [{ encounterUuid }])], queryFn: () => EncounterControllerService.printEncounterDetails(encounterUuid), ...options });
export const useEncounterControllerServiceGetPatientsReadyForBillingEncountersKey = "EncounterControllerServiceGetPatientsReadyForBillingEncounters";
export const useEncounterControllerServiceGetPatientsReadyForBillingEncounters = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid }: {
    patientUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof EncounterControllerService.getPatientsReadyForBillingEncounters>>, unknown, Awaited<ReturnType<typeof EncounterControllerService.getPatientsReadyForBillingEncounters>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useEncounterControllerServiceGetPatientsReadyForBillingEncountersKey, ...(queryKey ?? [{ patientUuid }])], queryFn: () => EncounterControllerService.getPatientsReadyForBillingEncounters(patientUuid), ...options });
export const useEncounterControllerServiceGetEncounterSummaryPreviewKey = "EncounterControllerServiceGetEncounterSummaryPreview";
export const useEncounterControllerServiceGetEncounterSummaryPreview = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, encounterUuid }: {
    patientUuid: string;
    encounterUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof EncounterControllerService.getEncounterSummaryPreview>>, unknown, Awaited<ReturnType<typeof EncounterControllerService.getEncounterSummaryPreview>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useEncounterControllerServiceGetEncounterSummaryPreviewKey, ...(queryKey ?? [{ patientUuid, encounterUuid }])], queryFn: () => EncounterControllerService.getEncounterSummaryPreview(patientUuid, encounterUuid), ...options });
export const useEncounterControllerServiceGetAllPatientEncounterKey = "EncounterControllerServiceGetAllPatientEncounter";
export const useEncounterControllerServiceGetAllPatientEncounter = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, encounterStatus, page, size, sort }: {
    patientUuid: string;
    encounterStatus?: "CHECK_IN" | "DRAFT" | "SIGNED" | "UNSIGNED";
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof EncounterControllerService.getAllPatientEncounter>>, unknown, Awaited<ReturnType<typeof EncounterControllerService.getAllPatientEncounter>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useEncounterControllerServiceGetAllPatientEncounterKey, ...(queryKey ?? [{ patientUuid, encounterStatus, page, size, sort }])], queryFn: () => EncounterControllerService.getAllPatientEncounter(patientUuid, encounterStatus, page, size, sort), ...options });
export const useEncounterControllerServiceGetEncounterDetailsKey = "EncounterControllerServiceGetEncounterDetails";
export const useEncounterControllerServiceGetEncounterDetails = <TQueryKey extends Array<unknown> = unknown[]>({ uuid }: {
    uuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof EncounterControllerService.getEncounterDetails>>, unknown, Awaited<ReturnType<typeof EncounterControllerService.getEncounterDetails>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useEncounterControllerServiceGetEncounterDetailsKey, ...(queryKey ?? [{ uuid }])], queryFn: () => EncounterControllerService.getEncounterDetails(uuid), ...options });
export const useEncounterControllerServiceGetAllEncounterCountKey = "EncounterControllerServiceGetAllEncounterCount";
export const useEncounterControllerServiceGetAllEncounterCount = <TQueryKey extends Array<unknown> = unknown[]>({ providerGroupUuid }: {
    providerGroupUuid?: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof EncounterControllerService.getAllEncounterCount>>, unknown, Awaited<ReturnType<typeof EncounterControllerService.getAllEncounterCount>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useEncounterControllerServiceGetAllEncounterCountKey, ...(queryKey ?? [{ providerGroupUuid }])], queryFn: () => EncounterControllerService.getAllEncounterCount(providerGroupUuid), ...options });
export const useEncounterControllerServiceGetEncounterDetailsByAppointmentKey = "EncounterControllerServiceGetEncounterDetailsByAppointment";
export const useEncounterControllerServiceGetEncounterDetailsByAppointment = <TQueryKey extends Array<unknown> = unknown[]>({ appointmentId }: {
    appointmentId: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof EncounterControllerService.getEncounterDetailsByAppointment>>, unknown, Awaited<ReturnType<typeof EncounterControllerService.getEncounterDetailsByAppointment>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useEncounterControllerServiceGetEncounterDetailsByAppointmentKey, ...(queryKey ?? [{ appointmentId }])], queryFn: () => EncounterControllerService.getEncounterDetailsByAppointment(appointmentId), ...options });
export const useEncounterControllerServiceDeleteEncounter = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof EncounterControllerService.deleteEncounter>>, unknown, {
    uuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ uuid }) => EncounterControllerService.deleteEncounter(uuid), ...options });
export const useEncounterCarePortalControllerServiceShareEncounterDetails1 = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof EncounterCarePortalControllerService.shareEncounterDetails1>>, unknown, {
    encounterUuid: string;
    emailId: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ encounterUuid, emailId }) => EncounterCarePortalControllerService.shareEncounterDetails1(encounterUuid, emailId), ...options });
export const useEncounterCarePortalControllerServiceAddEncounterDetails1 = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof EncounterCarePortalControllerService.addEncounterDetails1>>, unknown, {
    requestBody: EncounterDetailsRequestAndResponseCarePortal;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => EncounterCarePortalControllerService.addEncounterDetails1(requestBody), ...options });
export const useEncounterCarePortalControllerServicePrintEncounterDetails1Key = "EncounterCarePortalControllerServicePrintEncounterDetails1";
export const useEncounterCarePortalControllerServicePrintEncounterDetails1 = <TQueryKey extends Array<unknown> = unknown[]>({ encounterUuid }: {
    encounterUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof EncounterCarePortalControllerService.printEncounterDetails1>>, unknown, Awaited<ReturnType<typeof EncounterCarePortalControllerService.printEncounterDetails1>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useEncounterCarePortalControllerServicePrintEncounterDetails1Key, ...(queryKey ?? [{ encounterUuid }])], queryFn: () => EncounterCarePortalControllerService.printEncounterDetails1(encounterUuid), ...options });
export const useEncounterCarePortalControllerServiceGetEncounterDetails1Key = "EncounterCarePortalControllerServiceGetEncounterDetails1";
export const useEncounterCarePortalControllerServiceGetEncounterDetails1 = <TQueryKey extends Array<unknown> = unknown[]>({ uuid }: {
    uuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof EncounterCarePortalControllerService.getEncounterDetails1>>, unknown, Awaited<ReturnType<typeof EncounterCarePortalControllerService.getEncounterDetails1>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useEncounterCarePortalControllerServiceGetEncounterDetails1Key, ...(queryKey ?? [{ uuid }])], queryFn: () => EncounterCarePortalControllerService.getEncounterDetails1(uuid), ...options });
export const useEncounterCarePortalControllerServiceGetEncounterDetailsByAppointment1Key = "EncounterCarePortalControllerServiceGetEncounterDetailsByAppointment1";
export const useEncounterCarePortalControllerServiceGetEncounterDetailsByAppointment1 = <TQueryKey extends Array<unknown> = unknown[]>({ appointmentId }: {
    appointmentId: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof EncounterCarePortalControllerService.getEncounterDetailsByAppointment1>>, unknown, Awaited<ReturnType<typeof EncounterCarePortalControllerService.getEncounterDetailsByAppointment1>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useEncounterCarePortalControllerServiceGetEncounterDetailsByAppointment1Key, ...(queryKey ?? [{ appointmentId }])], queryFn: () => EncounterCarePortalControllerService.getEncounterDetailsByAppointment1(appointmentId), ...options });
export const useEmailControllerServiceSendEmailForSetPassword1 = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof EmailControllerService.sendEmailForSetPassword1>>, unknown, {
    requestBody: SetPasswordEmailRequest;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => EmailControllerService.sendEmailForSetPassword1(requestBody), ...options });
export const useEmailControllerServiceSendOtpForPassword = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof EmailControllerService.sendOtpForPassword>>, unknown, {
    requestBody: User;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => EmailControllerService.sendOtpForPassword(requestBody), ...options });
export const useEmailControllerServiceSendInvitationEmail = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof EmailControllerService.sendInvitationEmail>>, unknown, {
    requestBody: User;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => EmailControllerService.sendInvitationEmail(requestBody), ...options });
export const useEmailControllerServiceSendEmailForForgotPassword = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof EmailControllerService.sendEmailForForgotPassword>>, unknown, {
    requestBody: ForgotPasswordEmailRequest;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => EmailControllerService.sendEmailForForgotPassword(requestBody), ...options });
export const useEmailControllerServiceVerifyEmailKey = "EmailControllerServiceVerifyEmail";
export const useEmailControllerServiceVerifyEmail = <TQueryKey extends Array<unknown> = unknown[]>({ otp, email }: {
    otp: number;
    email: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof EmailControllerService.verifyEmail>>, unknown, Awaited<ReturnType<typeof EmailControllerService.verifyEmail>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useEmailControllerServiceVerifyEmailKey, ...(queryKey ?? [{ otp, email }])], queryFn: () => EmailControllerService.verifyEmail(otp, email), ...options });
export const useEmailControllerServiceVerifyOtpForPasswordKey = "EmailControllerServiceVerifyOtpForPassword";
export const useEmailControllerServiceVerifyOtpForPassword = <TQueryKey extends Array<unknown> = unknown[]>({ otpId, otp }: {
    otpId: string;
    otp: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof EmailControllerService.verifyOtpForPassword>>, unknown, Awaited<ReturnType<typeof EmailControllerService.verifyOtpForPassword>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useEmailControllerServiceVerifyOtpForPasswordKey, ...(queryKey ?? [{ otpId, otp }])], queryFn: () => EmailControllerService.verifyOtpForPassword(otpId, otp), ...options });
export const useEmailControllerServiceVerifyOtpIdKey = "EmailControllerServiceVerifyOtpId";
export const useEmailControllerServiceVerifyOtpId = <TQueryKey extends Array<unknown> = unknown[]>({ otpId }: {
    otpId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof EmailControllerService.verifyOtpId>>, unknown, Awaited<ReturnType<typeof EmailControllerService.verifyOtpId>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useEmailControllerServiceVerifyOtpIdKey, ...(queryKey ?? [{ otpId }])], queryFn: () => EmailControllerService.verifyOtpId(otpId), ...options });
export const useEmailControllerServiceVerifyLinkForPassword1Key = "EmailControllerServiceVerifyLinkForPassword1";
export const useEmailControllerServiceVerifyLinkForPassword1 = <TQueryKey extends Array<unknown> = unknown[]>({ linkId, userId }: {
    linkId: string;
    userId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof EmailControllerService.verifyLinkForPassword1>>, unknown, Awaited<ReturnType<typeof EmailControllerService.verifyLinkForPassword1>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useEmailControllerServiceVerifyLinkForPassword1Key, ...(queryKey ?? [{ linkId, userId }])], queryFn: () => EmailControllerService.verifyLinkForPassword1(linkId, userId), ...options });
export const useEmailControllerServiceRecipientEmailKey = "EmailControllerServiceRecipientEmail";
export const useEmailControllerServiceRecipientEmail = <TQueryKey extends Array<unknown> = unknown[]>({ email }: {
    email: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof EmailControllerService.recipientEmail>>, unknown, Awaited<ReturnType<typeof EmailControllerService.recipientEmail>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useEmailControllerServiceRecipientEmailKey, ...(queryKey ?? [{ email }])], queryFn: () => EmailControllerService.recipientEmail(email), ...options });
export const useEmailControllerServiceInviteeEmailKey = "EmailControllerServiceInviteeEmail";
export const useEmailControllerServiceInviteeEmail = <TQueryKey extends Array<unknown> = unknown[]>({ email }: {
    email: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof EmailControllerService.inviteeEmail>>, unknown, Awaited<ReturnType<typeof EmailControllerService.inviteeEmail>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useEmailControllerServiceInviteeEmailKey, ...(queryKey ?? [{ email }])], queryFn: () => EmailControllerService.inviteeEmail(email), ...options });
export const useEmailControllerServiceExpireLinkForPasswordKey = "EmailControllerServiceExpireLinkForPassword";
export const useEmailControllerServiceExpireLinkForPassword = <TQueryKey extends Array<unknown> = unknown[]>({ linkId }: {
    linkId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof EmailControllerService.expireLinkForPassword>>, unknown, Awaited<ReturnType<typeof EmailControllerService.expireLinkForPassword>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useEmailControllerServiceExpireLinkForPasswordKey, ...(queryKey ?? [{ linkId }])], queryFn: () => EmailControllerService.expireLinkForPassword(linkId), ...options });
export const useDuePaymentControllerServiceGetSummaryOfAccountReceivableKey = "DuePaymentControllerServiceGetSummaryOfAccountReceivable";
export const useDuePaymentControllerServiceGetSummaryOfAccountReceivable = <TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof DuePaymentControllerService.getSummaryOfAccountReceivable>>, unknown, Awaited<ReturnType<typeof DuePaymentControllerService.getSummaryOfAccountReceivable>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useDuePaymentControllerServiceGetSummaryOfAccountReceivableKey, ...(queryKey ?? [])], queryFn: () => DuePaymentControllerService.getSummaryOfAccountReceivable(), ...options });
export const useDuePaymentControllerServiceGetDuePaymentPatientListKey = "DuePaymentControllerServiceGetDuePaymentPatientList";
export const useDuePaymentControllerServiceGetDuePaymentPatientList = <TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof DuePaymentControllerService.getDuePaymentPatientList>>, unknown, Awaited<ReturnType<typeof DuePaymentControllerService.getDuePaymentPatientList>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useDuePaymentControllerServiceGetDuePaymentPatientListKey, ...(queryKey ?? [])], queryFn: () => DuePaymentControllerService.getDuePaymentPatientList(), ...options });
export const useDuePaymentControllerServiceGetInsuranceDuePaymentKey = "DuePaymentControllerServiceGetInsuranceDuePayment";
export const useDuePaymentControllerServiceGetInsuranceDuePayment = <TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof DuePaymentControllerService.getInsuranceDuePayment>>, unknown, Awaited<ReturnType<typeof DuePaymentControllerService.getInsuranceDuePayment>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useDuePaymentControllerServiceGetInsuranceDuePaymentKey, ...(queryKey ?? [])], queryFn: () => DuePaymentControllerService.getInsuranceDuePayment(), ...options });
export const useDrugCatalogControllerServiceGetAllDrugsKey = "DrugCatalogControllerServiceGetAllDrugs";
export const useDrugCatalogControllerServiceGetAllDrugs = <TQueryKey extends Array<unknown> = unknown[]>({ page, size, sortBy, sortDirection, searchString, providerGroupUuid }: {
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
    searchString?: string;
    providerGroupUuid?: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof DrugCatalogControllerService.getAllDrugs>>, unknown, Awaited<ReturnType<typeof DrugCatalogControllerService.getAllDrugs>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useDrugCatalogControllerServiceGetAllDrugsKey, ...(queryKey ?? [{ page, size, sortBy, sortDirection, searchString, providerGroupUuid }])], queryFn: () => DrugCatalogControllerService.getAllDrugs(page, size, sortBy, sortDirection, searchString, providerGroupUuid), ...options });
export const useDrugCatalogControllerServiceUpdateDrugCatalog = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof DrugCatalogControllerService.updateDrugCatalog>>, unknown, {
    requestBody: DrugCatalog;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => DrugCatalogControllerService.updateDrugCatalog(requestBody), ...options });
export const useDrugCatalogControllerServiceAddDrugCatalog = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof DrugCatalogControllerService.addDrugCatalog>>, unknown, {
    requestBody: DrugCatalog;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => DrugCatalogControllerService.addDrugCatalog(requestBody), ...options });
export const useDrugCatalogControllerServiceUpdateStatus3 = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof DrugCatalogControllerService.updateStatus3>>, unknown, {
    uuid: string;
    status: boolean;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ uuid, status }) => DrugCatalogControllerService.updateStatus3(uuid, status), ...options });
export const useDrugCatalogControllerServiceViewDrugCatalogKey = "DrugCatalogControllerServiceViewDrugCatalog";
export const useDrugCatalogControllerServiceViewDrugCatalog = <TQueryKey extends Array<unknown> = unknown[]>({ uuid }: {
    uuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof DrugCatalogControllerService.viewDrugCatalog>>, unknown, Awaited<ReturnType<typeof DrugCatalogControllerService.viewDrugCatalog>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useDrugCatalogControllerServiceViewDrugCatalogKey, ...(queryKey ?? [{ uuid }])], queryFn: () => DrugCatalogControllerService.viewDrugCatalog(uuid), ...options });
export const useDrugCatalogControllerServiceDeleteDrugCatalog = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof DrugCatalogControllerService.deleteDrugCatalog>>, unknown, {
    uuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ uuid }) => DrugCatalogControllerService.deleteDrugCatalog(uuid), ...options });
export const useDocumentTypeControllerServiceUpdateDocumentType = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof DocumentTypeControllerService.updateDocumentType>>, unknown, {
    requestBody: DocumentTypes;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => DocumentTypeControllerService.updateDocumentType(requestBody), ...options });
export const useDocumentTypeControllerServiceAddDocumentType = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof DocumentTypeControllerService.addDocumentType>>, unknown, {
    requestBody: DocumentTypes;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => DocumentTypeControllerService.addDocumentType(requestBody), ...options });
export const useDocumentTypeControllerServiceGetAllDocumentTypeKey = "DocumentTypeControllerServiceGetAllDocumentType";
export const useDocumentTypeControllerServiceGetAllDocumentType = <TQueryKey extends Array<unknown> = unknown[]>({ page, size }: {
    page?: number;
    size?: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof DocumentTypeControllerService.getAllDocumentType>>, unknown, Awaited<ReturnType<typeof DocumentTypeControllerService.getAllDocumentType>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useDocumentTypeControllerServiceGetAllDocumentTypeKey, ...(queryKey ?? [{ page, size }])], queryFn: () => DocumentTypeControllerService.getAllDocumentType(page, size), ...options });
export const useDocumentTypeControllerServiceDeleteDocumentType = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof DocumentTypeControllerService.deleteDocumentType>>, unknown, {
    uuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ uuid }) => DocumentTypeControllerService.deleteDocumentType(uuid), ...options });
export const useDocumentControllerServiceGetDocumentKey = "DocumentControllerServiceGetDocument";
export const useDocumentControllerServiceGetDocument = <TQueryKey extends Array<unknown> = unknown[]>({ patientId, documentFolder, page, size, sort }: {
    patientId: string;
    documentFolder: "CONSENTS_RELEASING_INFORMATION" | "LIMITS_OF_CONFIDENTIALITY_POLICY" | "STATEMENT_FOR_CASE_MANAGEMENT" | "STATEMENT_FOR_CLIENTS_RIGHTS_AND_RESPONSIBILITIES" | "GRIEVANCE_PRODUCERS_POLICY" | "ENROLEMENT_FORM" | "HEALTH_INSURANCE" | "HARDCOPY_PRESCRIPTION" | "SUMMARY_OF_MEDICAL_VISITS";
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof DocumentControllerService.getDocument>>, unknown, Awaited<ReturnType<typeof DocumentControllerService.getDocument>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useDocumentControllerServiceGetDocumentKey, ...(queryKey ?? [{ patientId, documentFolder, page, size, sort }])], queryFn: () => DocumentControllerService.getDocument(patientId, documentFolder, page, size, sort), ...options });
export const useDocumentControllerServiceUploadDocument1 = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof DocumentControllerService.uploadDocument1>>, unknown, {
    patientId: string;
    documentFolder: "CONSENTS_RELEASING_INFORMATION" | "LIMITS_OF_CONFIDENTIALITY_POLICY" | "STATEMENT_FOR_CASE_MANAGEMENT" | "STATEMENT_FOR_CLIENTS_RIGHTS_AND_RESPONSIBILITIES" | "GRIEVANCE_PRODUCERS_POLICY" | "ENROLEMENT_FORM" | "HEALTH_INSURANCE" | "HARDCOPY_PRESCRIPTION" | "SUMMARY_OF_MEDICAL_VISITS";
    title: string;
    documentType: "PDF" | "MS_WORD" | "ZIP" | "X_GZIP" | "X_COMPRESSED" | "DOCX" | "RTF" | "PLAIN" | "JPEG_IMAGE" | "PNG_IMAGE" | "GIF_IMAGE" | "BMP_IMAGE" | "WEBP_IMAGE" | "SVG_IMAGE" | "MPEG_AUDIO" | "OTHER" | "CSV";
    requestBody?: {
        file: Blob;
    };
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientId, documentFolder, title, documentType, requestBody }) => DocumentControllerService.uploadDocument1(patientId, documentFolder, title, documentType, requestBody), ...options });
export const useDocumentControllerServiceDeleteDocument = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof DocumentControllerService.deleteDocument>>, unknown, {
    uuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ uuid }) => DocumentControllerService.deleteDocument(uuid), ...options });
export const useDiagnosticCentresControllerServiceViewDiagnosticCenterKey = "DiagnosticCentresControllerServiceViewDiagnosticCenter";
export const useDiagnosticCentresControllerServiceViewDiagnosticCenter = <TQueryKey extends Array<unknown> = unknown[]>({ diagnosticCentreUuid }: {
    diagnosticCentreUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof DiagnosticCentresControllerService.viewDiagnosticCenter>>, unknown, Awaited<ReturnType<typeof DiagnosticCentresControllerService.viewDiagnosticCenter>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useDiagnosticCentresControllerServiceViewDiagnosticCenterKey, ...(queryKey ?? [{ diagnosticCentreUuid }])], queryFn: () => DiagnosticCentresControllerService.viewDiagnosticCenter(diagnosticCentreUuid), ...options });
export const useDiagnosticCentresControllerServiceUpdateDiagnosticCenter = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof DiagnosticCentresControllerService.updateDiagnosticCenter>>, unknown, {
    diagnosticCentreUuid: string;
    requestBody: DiagnosticCentre;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ diagnosticCentreUuid, requestBody }) => DiagnosticCentresControllerService.updateDiagnosticCenter(diagnosticCentreUuid, requestBody), ...options });
export const useDiagnosticCentresControllerServiceArchiveDiagnosticCenter = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof DiagnosticCentresControllerService.archiveDiagnosticCenter>>, unknown, {
    diagnosticCentreUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ diagnosticCentreUuid }) => DiagnosticCentresControllerService.archiveDiagnosticCenter(diagnosticCentreUuid), ...options });
export const useDiagnosticCentresControllerServiceAddDiagnosticCenter = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof DiagnosticCentresControllerService.addDiagnosticCenter>>, unknown, {
    requestBody: DiagnosticCentre;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => DiagnosticCentresControllerService.addDiagnosticCenter(requestBody), ...options });
export const useDiagnosticCentresControllerServiceListDiagnosticCenterKey = "DiagnosticCentresControllerServiceListDiagnosticCenter";
export const useDiagnosticCentresControllerServiceListDiagnosticCenter = <TQueryKey extends Array<unknown> = unknown[]>({ providerGroupUuid, type, page, size }: {
    providerGroupUuid: string;
    type: "LAB" | "RADIOLOGY";
    page?: number;
    size?: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof DiagnosticCentresControllerService.listDiagnosticCenter>>, unknown, Awaited<ReturnType<typeof DiagnosticCentresControllerService.listDiagnosticCenter>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useDiagnosticCentresControllerServiceListDiagnosticCenterKey, ...(queryKey ?? [{ providerGroupUuid, type, page, size }])], queryFn: () => DiagnosticCentresControllerService.listDiagnosticCenter(providerGroupUuid, type, page, size), ...options });
export const useDepartmentControllerServiceUpdateDepartment = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof DepartmentControllerService.updateDepartment>>, unknown, {
    requestBody: Department;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => DepartmentControllerService.updateDepartment(requestBody), ...options });
export const useDepartmentControllerServiceAddDepartment = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof DepartmentControllerService.addDepartment>>, unknown, {
    requestBody: Department;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => DepartmentControllerService.addDepartment(requestBody), ...options });
export const useDepartmentControllerServiceUpdateStatus4 = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof DepartmentControllerService.updateStatus4>>, unknown, {
    uuid: string;
    active: boolean;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ uuid, active }) => DepartmentControllerService.updateStatus4(uuid, active), ...options });
export const useDepartmentControllerServiceAddLocationDepartment = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof DepartmentControllerService.addLocationDepartment>>, unknown, {
    locationId: string;
    departmentId: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ locationId, departmentId }) => DepartmentControllerService.addLocationDepartment(locationId, departmentId), ...options });
export const useDepartmentControllerServiceViewDepartmentsKey = "DepartmentControllerServiceViewDepartments";
export const useDepartmentControllerServiceViewDepartments = <TQueryKey extends Array<unknown> = unknown[]>({ uuid }: {
    uuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof DepartmentControllerService.viewDepartments>>, unknown, Awaited<ReturnType<typeof DepartmentControllerService.viewDepartments>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useDepartmentControllerServiceViewDepartmentsKey, ...(queryKey ?? [{ uuid }])], queryFn: () => DepartmentControllerService.viewDepartments(uuid), ...options });
export const useDepartmentControllerServiceSearchLocationDepartmentKey = "DepartmentControllerServiceSearchLocationDepartment";
export const useDepartmentControllerServiceSearchLocationDepartment = <TQueryKey extends Array<unknown> = unknown[]>({ locationId, departmentName, page, size }: {
    locationId: string;
    departmentName?: string;
    page?: number;
    size?: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof DepartmentControllerService.searchLocationDepartment>>, unknown, Awaited<ReturnType<typeof DepartmentControllerService.searchLocationDepartment>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useDepartmentControllerServiceSearchLocationDepartmentKey, ...(queryKey ?? [{ locationId, departmentName, page, size }])], queryFn: () => DepartmentControllerService.searchLocationDepartment(locationId, departmentName, page, size), ...options });
export const useDepartmentControllerServiceGetLocationDepartmentKey = "DepartmentControllerServiceGetLocationDepartment";
export const useDepartmentControllerServiceGetLocationDepartment = <TQueryKey extends Array<unknown> = unknown[]>({ locationId, page, size }: {
    locationId: string;
    page?: number;
    size?: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof DepartmentControllerService.getLocationDepartment>>, unknown, Awaited<ReturnType<typeof DepartmentControllerService.getLocationDepartment>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useDepartmentControllerServiceGetLocationDepartmentKey, ...(queryKey ?? [{ locationId, page, size }])], queryFn: () => DepartmentControllerService.getLocationDepartment(locationId, page, size), ...options });
export const useDepartmentControllerServiceGetAllDepartmentAdminsKey = "DepartmentControllerServiceGetAllDepartmentAdmins";
export const useDepartmentControllerServiceGetAllDepartmentAdmins = <TQueryKey extends Array<unknown> = unknown[]>({ providerGroupUuid, page, size }: {
    providerGroupUuid: string;
    page?: number;
    size?: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof DepartmentControllerService.getAllDepartmentAdmins>>, unknown, Awaited<ReturnType<typeof DepartmentControllerService.getAllDepartmentAdmins>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useDepartmentControllerServiceGetAllDepartmentAdminsKey, ...(queryKey ?? [{ providerGroupUuid, page, size }])], queryFn: () => DepartmentControllerService.getAllDepartmentAdmins(providerGroupUuid, page, size), ...options });
export const useDepartmentControllerServiceGetAllSearchDepartmentsKey = "DepartmentControllerServiceGetAllSearchDepartments";
export const useDepartmentControllerServiceGetAllSearchDepartments = <TQueryKey extends Array<unknown> = unknown[]>({ providerGroupUuid, page, size, sortBy, sortDirection, searchString, status }: {
    providerGroupUuid: string;
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
    searchString?: string;
    status?: boolean;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof DepartmentControllerService.getAllSearchDepartments>>, unknown, Awaited<ReturnType<typeof DepartmentControllerService.getAllSearchDepartments>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useDepartmentControllerServiceGetAllSearchDepartmentsKey, ...(queryKey ?? [{ providerGroupUuid, page, size, sortBy, sortDirection, searchString, status }])], queryFn: () => DepartmentControllerService.getAllSearchDepartments(providerGroupUuid, page, size, sortBy, sortDirection, searchString, status), ...options });
export const useCustomTemplateControllerServiceUpdateCustomTemplate = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof CustomTemplateControllerService.updateCustomTemplate>>, unknown, {
    requestBody: CustomTemplateRequest;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => CustomTemplateControllerService.updateCustomTemplate(requestBody), ...options });
export const useCustomTemplateControllerServiceCreateCustomTemplate = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof CustomTemplateControllerService.createCustomTemplate>>, unknown, {
    requestBody: CustomTemplateRequest;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => CustomTemplateControllerService.createCustomTemplate(requestBody), ...options });
export const useCustomTemplateControllerServiceGetCustomTemplateKey = "CustomTemplateControllerServiceGetCustomTemplate";
export const useCustomTemplateControllerServiceGetCustomTemplate = <TQueryKey extends Array<unknown> = unknown[]>({ type, uuid }: {
    type: "VISIT_NOTE" | "CUSTOM_QUESTIONNAIRE" | "REVIEW_OF_SYSTEM" | "PHYSICAL_EXAM";
    uuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof CustomTemplateControllerService.getCustomTemplate>>, unknown, Awaited<ReturnType<typeof CustomTemplateControllerService.getCustomTemplate>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useCustomTemplateControllerServiceGetCustomTemplateKey, ...(queryKey ?? [{ type, uuid }])], queryFn: () => CustomTemplateControllerService.getCustomTemplate(type, uuid), ...options });
export const useCustomTemplateControllerServiceDeleteCustomTemplate = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof CustomTemplateControllerService.deleteCustomTemplate>>, unknown, {
    type: "VISIT_NOTE" | "CUSTOM_QUESTIONNAIRE" | "REVIEW_OF_SYSTEM" | "PHYSICAL_EXAM";
    uuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ type, uuid }) => CustomTemplateControllerService.deleteCustomTemplate(type, uuid), ...options });
export const useCustomTemplateControllerServiceGetAllCustomTemplateKey = "CustomTemplateControllerServiceGetAllCustomTemplate";
export const useCustomTemplateControllerServiceGetAllCustomTemplate = <TQueryKey extends Array<unknown> = unknown[]>({ providerGroupUuid, type, page, size, sort }: {
    providerGroupUuid: string;
    type: "VISIT_NOTE" | "CUSTOM_QUESTIONNAIRE" | "REVIEW_OF_SYSTEM" | "PHYSICAL_EXAM";
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof CustomTemplateControllerService.getAllCustomTemplate>>, unknown, Awaited<ReturnType<typeof CustomTemplateControllerService.getAllCustomTemplate>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useCustomTemplateControllerServiceGetAllCustomTemplateKey, ...(queryKey ?? [{ providerGroupUuid, type, page, size, sort }])], queryFn: () => CustomTemplateControllerService.getAllCustomTemplate(providerGroupUuid, type, page, size, sort), ...options });
export const useCustomFormControllerServiceUpdateCustomForm = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof CustomFormControllerService.updateCustomForm>>, unknown, {
    requestBody: CustomFormRequest;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => CustomFormControllerService.updateCustomForm(requestBody), ...options });
export const useCustomFormControllerServiceCreateCustomForm = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof CustomFormControllerService.createCustomForm>>, unknown, {
    requestBody: CustomFormRequest;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => CustomFormControllerService.createCustomForm(requestBody), ...options });
export const useCustomFormControllerServiceUpdateConsentForm = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof CustomFormControllerService.updateConsentForm>>, unknown, {
    providerGroupUuid: string;
    consentFormUuid: string;
    title: string;
    mandatory?: boolean;
    assignedByDefault?: boolean;
    requestBody?: {
        file: Blob;
    };
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ providerGroupUuid, consentFormUuid, title, mandatory, assignedByDefault, requestBody }) => CustomFormControllerService.updateConsentForm(providerGroupUuid, consentFormUuid, title, mandatory, assignedByDefault, requestBody), ...options });
export const useCustomFormControllerServiceCreateDuplicateIntakeForm = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof CustomFormControllerService.createDuplicateIntakeForm>>, unknown, {
    requestBody: DuplicateCustomFormRequest;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => CustomFormControllerService.createDuplicateIntakeForm(requestBody), ...options });
export const useCustomFormControllerServiceUploadConsentForm = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof CustomFormControllerService.uploadConsentForm>>, unknown, {
    providerGroupUuid: string;
    title: string;
    mandatory?: boolean;
    assignedByDefault?: boolean;
    requestBody?: {
        file: Blob;
    };
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ providerGroupUuid, title, mandatory, assignedByDefault, requestBody }) => CustomFormControllerService.uploadConsentForm(providerGroupUuid, title, mandatory, assignedByDefault, requestBody), ...options });
export const useCustomFormControllerServiceGetCustomFormKey = "CustomFormControllerServiceGetCustomForm";
export const useCustomFormControllerServiceGetCustomForm = <TQueryKey extends Array<unknown> = unknown[]>({ type, uuid }: {
    type: "INTAKE_FORM" | "CONSENT_FORM" | "VISIT_NOTE";
    uuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof CustomFormControllerService.getCustomForm>>, unknown, Awaited<ReturnType<typeof CustomFormControllerService.getCustomForm>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useCustomFormControllerServiceGetCustomFormKey, ...(queryKey ?? [{ type, uuid }])], queryFn: () => CustomFormControllerService.getCustomForm(type, uuid), ...options });
export const useCustomFormControllerServiceDeleteCustomForm = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof CustomFormControllerService.deleteCustomForm>>, unknown, {
    type: "INTAKE_FORM" | "CONSENT_FORM" | "VISIT_NOTE";
    uuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ type, uuid }) => CustomFormControllerService.deleteCustomForm(type, uuid), ...options });
export const useCustomFormControllerServiceGetAllCustomFormsKey = "CustomFormControllerServiceGetAllCustomForms";
export const useCustomFormControllerServiceGetAllCustomForms = <TQueryKey extends Array<unknown> = unknown[]>({ type, providerGroupUuid, title, page, size, sort }: {
    type: "INTAKE_FORM" | "CONSENT_FORM" | "VISIT_NOTE";
    providerGroupUuid: string;
    title?: string;
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof CustomFormControllerService.getAllCustomForms>>, unknown, Awaited<ReturnType<typeof CustomFormControllerService.getAllCustomForms>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useCustomFormControllerServiceGetAllCustomFormsKey, ...(queryKey ?? [{ type, providerGroupUuid, title, page, size, sort }])], queryFn: () => CustomFormControllerService.getAllCustomForms(type, providerGroupUuid, title, page, size, sort), ...options });
export const useContactDirectoryControllerServiceUpdateContactDirectory = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof ContactDirectoryControllerService.updateContactDirectory>>, unknown, {
    requestBody: ContactDirectory;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => ContactDirectoryControllerService.updateContactDirectory(requestBody), ...options });
export const useContactDirectoryControllerServiceCreateContactDirectory = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof ContactDirectoryControllerService.createContactDirectory>>, unknown, {
    requestBody: ContactDirectory;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => ContactDirectoryControllerService.createContactDirectory(requestBody), ...options });
export const useContactDirectoryControllerServiceGetAllContactDirectoryKey = "ContactDirectoryControllerServiceGetAllContactDirectory";
export const useContactDirectoryControllerServiceGetAllContactDirectory = <TQueryKey extends Array<unknown> = unknown[]>({ providerGroupUuid, contactType, searchString, page, size, sort }: {
    providerGroupUuid: string;
    contactType?: "INSURANCE_PAYER" | "LAB" | "CLINIC" | "VENDOR" | "PHARMACY" | "RADIOLOGY" | "PROVIDER" | "PATIENT" | "OTHER";
    searchString?: string;
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ContactDirectoryControllerService.getAllContactDirectory>>, unknown, Awaited<ReturnType<typeof ContactDirectoryControllerService.getAllContactDirectory>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useContactDirectoryControllerServiceGetAllContactDirectoryKey, ...(queryKey ?? [{ providerGroupUuid, contactType, searchString, page, size, sort }])], queryFn: () => ContactDirectoryControllerService.getAllContactDirectory(providerGroupUuid, contactType, searchString, page, size, sort), ...options });
export const useContactDirectoryControllerServiceDeleteContactDirectory = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof ContactDirectoryControllerService.deleteContactDirectory>>, unknown, {
    contactDirectoryUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ contactDirectoryUuid }) => ContactDirectoryControllerService.deleteContactDirectory(contactDirectoryUuid), ...options });
export const useConsentFormControllerServiceGetAllConsentFormsForProviderKey = "ConsentFormControllerServiceGetAllConsentFormsForProvider";
export const useConsentFormControllerServiceGetAllConsentFormsForProvider = <TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ConsentFormControllerService.getAllConsentFormsForProvider>>, unknown, Awaited<ReturnType<typeof ConsentFormControllerService.getAllConsentFormsForProvider>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useConsentFormControllerServiceGetAllConsentFormsForProviderKey, ...(queryKey ?? [])], queryFn: () => ConsentFormControllerService.getAllConsentFormsForProvider(), ...options });
export const useConsentFormControllerServiceEditConsentForm = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof ConsentFormControllerService.editConsentForm>>, unknown, {
    requestBody: ConsentForm;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => ConsentFormControllerService.editConsentForm(requestBody), ...options });
export const useConsentFormControllerServiceAddConsentFormForProvider = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof ConsentFormControllerService.addConsentFormForProvider>>, unknown, {
    requestBody: ConsentForm;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => ConsentFormControllerService.addConsentFormForProvider(requestBody), ...options });
export const useConsentFormControllerServiceUpdateConfiguration = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof ConsentFormControllerService.updateConfiguration>>, unknown, {
    consentFormUuid: string;
    requestBody: ConsentForm;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ consentFormUuid, requestBody }) => ConsentFormControllerService.updateConfiguration(consentFormUuid, requestBody), ...options });
export const useConsentFormControllerServiceGetSignedConsentFormOfPatientKey = "ConsentFormControllerServiceGetSignedConsentFormOfPatient";
export const useConsentFormControllerServiceGetSignedConsentFormOfPatient = <TQueryKey extends Array<unknown> = unknown[]>({ consentFormUuid, patientUuid }: {
    consentFormUuid: string;
    patientUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ConsentFormControllerService.getSignedConsentFormOfPatient>>, unknown, Awaited<ReturnType<typeof ConsentFormControllerService.getSignedConsentFormOfPatient>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useConsentFormControllerServiceGetSignedConsentFormOfPatientKey, ...(queryKey ?? [{ consentFormUuid, patientUuid }])], queryFn: () => ConsentFormControllerService.getSignedConsentFormOfPatient(consentFormUuid, patientUuid), ...options });
export const useConsentFormControllerServiceSendReminderForConsentFormToPatient = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof ConsentFormControllerService.sendReminderForConsentFormToPatient>>, unknown, {
    consentFormUuid: string;
    patientUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ consentFormUuid, patientUuid }) => ConsentFormControllerService.sendReminderForConsentFormToPatient(consentFormUuid, patientUuid), ...options });
export const useConsentFormControllerServiceGetConsentFormKey = "ConsentFormControllerServiceGetConsentForm";
export const useConsentFormControllerServiceGetConsentForm = <TQueryKey extends Array<unknown> = unknown[]>({ consentFormUuid }: {
    consentFormUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ConsentFormControllerService.getConsentForm>>, unknown, Awaited<ReturnType<typeof ConsentFormControllerService.getConsentForm>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useConsentFormControllerServiceGetConsentFormKey, ...(queryKey ?? [{ consentFormUuid }])], queryFn: () => ConsentFormControllerService.getConsentForm(consentFormUuid), ...options });
export const useConsentFormControllerServiceArchiveConsentForm = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof ConsentFormControllerService.archiveConsentForm>>, unknown, {
    consentFormUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ consentFormUuid }) => ConsentFormControllerService.archiveConsentForm(consentFormUuid), ...options });
export const useConsentFormControllerServiceGetAllSignedConsentFormsOfPatientKey = "ConsentFormControllerServiceGetAllSignedConsentFormsOfPatient";
export const useConsentFormControllerServiceGetAllSignedConsentFormsOfPatient = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid }: {
    patientUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof ConsentFormControllerService.getAllSignedConsentFormsOfPatient>>, unknown, Awaited<ReturnType<typeof ConsentFormControllerService.getAllSignedConsentFormsOfPatient>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useConsentFormControllerServiceGetAllSignedConsentFormsOfPatientKey, ...(queryKey ?? [{ patientUuid }])], queryFn: () => ConsentFormControllerService.getAllSignedConsentFormsOfPatient(patientUuid), ...options });
export const useCommunicationControllerServiceUpdateGroup = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof CommunicationControllerService.updateGroup>>, unknown, {
    requestBody: CommunicationGroups;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => CommunicationControllerService.updateGroup(requestBody), ...options });
export const useCommunicationControllerServiceCreateGroup = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof CommunicationControllerService.createGroup>>, unknown, {
    requestBody: CommunicationGroups;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => CommunicationControllerService.createGroup(requestBody), ...options });
export const useCommunicationControllerServiceSendGroupMessage = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof CommunicationControllerService.sendGroupMessage>>, unknown, {
    requestBody: OutgoingMessagesRequest;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => CommunicationControllerService.sendGroupMessage(requestBody), ...options });
export const useCommunicationControllerServiceGetGroupMessageKey = "CommunicationControllerServiceGetGroupMessage";
export const useCommunicationControllerServiceGetGroupMessage = <TQueryKey extends Array<unknown> = unknown[]>({ providerGroupUuid, page, size, sort }: {
    providerGroupUuid: string;
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof CommunicationControllerService.getGroupMessage>>, unknown, Awaited<ReturnType<typeof CommunicationControllerService.getGroupMessage>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useCommunicationControllerServiceGetGroupMessageKey, ...(queryKey ?? [{ providerGroupUuid, page, size, sort }])], queryFn: () => CommunicationControllerService.getGroupMessage(providerGroupUuid, page, size, sort), ...options });
export const useCommunicationControllerServiceGetGroupsKey = "CommunicationControllerServiceGetGroups";
export const useCommunicationControllerServiceGetGroups = <TQueryKey extends Array<unknown> = unknown[]>({ providerGroupUuid, page, size, sort }: {
    providerGroupUuid: string;
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof CommunicationControllerService.getGroups>>, unknown, Awaited<ReturnType<typeof CommunicationControllerService.getGroups>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useCommunicationControllerServiceGetGroupsKey, ...(queryKey ?? [{ providerGroupUuid, page, size, sort }])], queryFn: () => CommunicationControllerService.getGroups(providerGroupUuid, page, size, sort), ...options });
export const useCommunicationControllerServiceGetGroupKey = "CommunicationControllerServiceGetGroup";
export const useCommunicationControllerServiceGetGroup = <TQueryKey extends Array<unknown> = unknown[]>({ groupUuid }: {
    groupUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof CommunicationControllerService.getGroup>>, unknown, Awaited<ReturnType<typeof CommunicationControllerService.getGroup>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useCommunicationControllerServiceGetGroupKey, ...(queryKey ?? [{ groupUuid }])], queryFn: () => CommunicationControllerService.getGroup(groupUuid), ...options });
export const useCommunicationControllerServiceGetGroupPatientsKey = "CommunicationControllerServiceGetGroupPatients";
export const useCommunicationControllerServiceGetGroupPatients = <TQueryKey extends Array<unknown> = unknown[]>({ groupUuid, page, size, sort }: {
    groupUuid: string;
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof CommunicationControllerService.getGroupPatients>>, unknown, Awaited<ReturnType<typeof CommunicationControllerService.getGroupPatients>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useCommunicationControllerServiceGetGroupPatientsKey, ...(queryKey ?? [{ groupUuid, page, size, sort }])], queryFn: () => CommunicationControllerService.getGroupPatients(groupUuid, page, size, sort), ...options });
export const useCommunicationControllerServiceDeleteGroup = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof CommunicationControllerService.deleteGroup>>, unknown, {
    groupUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ groupUuid }) => CommunicationControllerService.deleteGroup(groupUuid), ...options });
export const useCarePatientChartControllerServiceUpdateCarePatientChart = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof CarePatientChartControllerService.updateCarePatientChart>>, unknown, {
    requestBody: CarePatientChart;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => CarePatientChartControllerService.updateCarePatientChart(requestBody), ...options });
export const useCarePatientChartControllerServiceCreateCarePatientChart = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof CarePatientChartControllerService.createCarePatientChart>>, unknown, {
    requestBody: CarePatientChart;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => CarePatientChartControllerService.createCarePatientChart(requestBody), ...options });
export const useCarePatientChartControllerServiceSharePatientDetails1 = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof CarePatientChartControllerService.sharePatientDetails1>>, unknown, {
    patientUuid: string;
    emailId: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, emailId }) => CarePatientChartControllerService.sharePatientDetails1(patientUuid, emailId), ...options });
export const useCarePatientChartControllerServiceGetCarePatientChartKey = "CarePatientChartControllerServiceGetCarePatientChart";
export const useCarePatientChartControllerServiceGetCarePatientChart = <TQueryKey extends Array<unknown> = unknown[]>({ carePatientChartUuid }: {
    carePatientChartUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof CarePatientChartControllerService.getCarePatientChart>>, unknown, Awaited<ReturnType<typeof CarePatientChartControllerService.getCarePatientChart>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useCarePatientChartControllerServiceGetCarePatientChartKey, ...(queryKey ?? [{ carePatientChartUuid }])], queryFn: () => CarePatientChartControllerService.getCarePatientChart(carePatientChartUuid), ...options });
export const useCarePatientChartControllerServiceDeleteCarePatientChart = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof CarePatientChartControllerService.deleteCarePatientChart>>, unknown, {
    carePatientChartUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ carePatientChartUuid }) => CarePatientChartControllerService.deleteCarePatientChart(carePatientChartUuid), ...options });
export const useCarePatientChartControllerServicePrintPatientDetails1Key = "CarePatientChartControllerServicePrintPatientDetails1";
export const useCarePatientChartControllerServicePrintPatientDetails1 = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid }: {
    patientUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof CarePatientChartControllerService.printPatientDetails1>>, unknown, Awaited<ReturnType<typeof CarePatientChartControllerService.printPatientDetails1>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useCarePatientChartControllerServicePrintPatientDetails1Key, ...(queryKey ?? [{ patientUuid }])], queryFn: () => CarePatientChartControllerService.printPatientDetails1(patientUuid), ...options });
export const useCarePatientChartControllerServiceGetAllCarePatientChartKey = "CarePatientChartControllerServiceGetAllCarePatientChart";
export const useCarePatientChartControllerServiceGetAllCarePatientChart = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, carePatientChartingType, page, size, sort, socialAndEnvironmentalSupportType }: {
    patientUuid: string;
    carePatientChartingType: "ADHERENCE_TO_TREATMENT" | "STI_TESTING_AND_HISTORY" | "SUBSTANCE_ABUSE_HISTORY" | "RISK_BEHAVIOR_SCREENING" | "SOCIAL_AND_ENVIRONMENTAL_SUPPORT" | "FAMILY_PLANNING" | "REFERRALS_FOR_SERVICES" | "HIV_AIDS_AND_OTHER_STDS_EDUCATION" | "OTHERS";
    page?: number;
    size?: number;
    sort?: Array<string>;
    socialAndEnvironmentalSupportType?: "HOUSING" | "EMPLOYMENT_SOURCES_OF_INCOME" | "EMOTIONAL_SUPPORT" | "FOOD_ASSISTANCE" | "TRANSPORTATION" | "SUPPORT_GROUPS_FAMILY" | "HISTORY_OF_INCARCERATION";
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof CarePatientChartControllerService.getAllCarePatientChart>>, unknown, Awaited<ReturnType<typeof CarePatientChartControllerService.getAllCarePatientChart>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useCarePatientChartControllerServiceGetAllCarePatientChartKey, ...(queryKey ?? [{ patientUuid, carePatientChartingType, page, size, sort, socialAndEnvironmentalSupportType }])], queryFn: () => CarePatientChartControllerService.getAllCarePatientChart(patientUuid, carePatientChartingType, page, size, sort, socialAndEnvironmentalSupportType), ...options });
export const useBillingControllerServiceEditSuperbill = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof BillingControllerService.editSuperbill>>, unknown, {
    superbillUuid: string;
    requestBody: Superbill;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ superbillUuid, requestBody }) => BillingControllerService.editSuperbill(superbillUuid, requestBody), ...options });
export const useBillingControllerServiceGetAllSuperbillsForPatientKey = "BillingControllerServiceGetAllSuperbillsForPatient";
export const useBillingControllerServiceGetAllSuperbillsForPatient = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid }: {
    patientUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof BillingControllerService.getAllSuperbillsForPatient>>, unknown, Awaited<ReturnType<typeof BillingControllerService.getAllSuperbillsForPatient>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useBillingControllerServiceGetAllSuperbillsForPatientKey, ...(queryKey ?? [{ patientUuid }])], queryFn: () => BillingControllerService.getAllSuperbillsForPatient(patientUuid), ...options });
export const useBillingControllerServiceAddEncounterForSuperBill = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof BillingControllerService.addEncounterForSuperBill>>, unknown, {
    patientUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid }) => BillingControllerService.addEncounterForSuperBill(patientUuid), ...options });
export const useBillingControllerServiceGetAllSuperBillsKey = "BillingControllerServiceGetAllSuperBills";
export const useBillingControllerServiceGetAllSuperBills = <TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof BillingControllerService.getAllSuperBills>>, unknown, Awaited<ReturnType<typeof BillingControllerService.getAllSuperBills>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useBillingControllerServiceGetAllSuperBillsKey, ...(queryKey ?? [])], queryFn: () => BillingControllerService.getAllSuperBills(), ...options });
export const useAvailabilityControllerServiceEditAvailability = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof AvailabilityControllerService.editAvailability>>, unknown, {
    requestBody: Availability;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => AvailabilityControllerService.editAvailability(requestBody), ...options });
export const useAvailabilityControllerServiceSave = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof AvailabilityControllerService.save>>, unknown, {
    requestBody: Availability;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => AvailabilityControllerService.save(requestBody), ...options });
export const useAvailabilityControllerServiceAddAvailabilityByDate = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof AvailabilityControllerService.addAvailabilityByDate>>, unknown, {
    requestBody: AvailabilityByDate;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => AvailabilityControllerService.addAvailabilityByDate(requestBody), ...options });
export const useAvailabilityControllerServiceGetAvailabilities = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof AvailabilityControllerService.getAvailabilities>>, unknown, {
    requestBody: AvailabilityRequest;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => AvailabilityControllerService.getAvailabilities(requestBody), ...options });
export const useAvailabilityControllerServiceGetByLocationUuidKey = "AvailabilityControllerServiceGetByLocationUuid";
export const useAvailabilityControllerServiceGetByLocationUuid = <TQueryKey extends Array<unknown> = unknown[]>({ availabilityType, providerUserUuid, locationUuid }: {
    availabilityType: "IN_PERSON" | "VIRTUAL";
    providerUserUuid?: string;
    locationUuid?: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof AvailabilityControllerService.getByLocationUuid>>, unknown, Awaited<ReturnType<typeof AvailabilityControllerService.getByLocationUuid>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useAvailabilityControllerServiceGetByLocationUuidKey, ...(queryKey ?? [{ availabilityType, providerUserUuid, locationUuid }])], queryFn: () => AvailabilityControllerService.getByLocationUuid(availabilityType, providerUserUuid, locationUuid), ...options });
export const useAuthorizationControllerServiceViewAuthorizationDetailsKey = "AuthorizationControllerServiceViewAuthorizationDetails";
export const useAuthorizationControllerServiceViewAuthorizationDetails = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, authorizationUuid }: {
    patientUuid: string;
    authorizationUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof AuthorizationControllerService.viewAuthorizationDetails>>, unknown, Awaited<ReturnType<typeof AuthorizationControllerService.viewAuthorizationDetails>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useAuthorizationControllerServiceViewAuthorizationDetailsKey, ...(queryKey ?? [{ patientUuid, authorizationUuid }])], queryFn: () => AuthorizationControllerService.viewAuthorizationDetails(patientUuid, authorizationUuid), ...options });
export const useAuthorizationControllerServiceUpdateAuthorizationForPatient = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof AuthorizationControllerService.updateAuthorizationForPatient>>, unknown, {
    patientUuid: string;
    authorizationUuid: string;
    requestBody: PatientAuthorization;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, authorizationUuid, requestBody }) => AuthorizationControllerService.updateAuthorizationForPatient(patientUuid, authorizationUuid, requestBody), ...options });
export const useAuthorizationControllerServiceArchiveAuthorization = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof AuthorizationControllerService.archiveAuthorization>>, unknown, {
    patientUuid: string;
    authorizationUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, authorizationUuid }) => AuthorizationControllerService.archiveAuthorization(patientUuid, authorizationUuid), ...options });
export const useAuthorizationControllerServiceActivateAuthorizationForPatient = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof AuthorizationControllerService.activateAuthorizationForPatient>>, unknown, {
    patientUuid: string;
    authorizationUuid: string;
    status: boolean;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, authorizationUuid, status }) => AuthorizationControllerService.activateAuthorizationForPatient(patientUuid, authorizationUuid, status), ...options });
export const useAuthorizationControllerServiceGetAuthorizationListForPatientKey = "AuthorizationControllerServiceGetAuthorizationListForPatient";
export const useAuthorizationControllerServiceGetAuthorizationListForPatient = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid }: {
    patientUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof AuthorizationControllerService.getAuthorizationListForPatient>>, unknown, Awaited<ReturnType<typeof AuthorizationControllerService.getAuthorizationListForPatient>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useAuthorizationControllerServiceGetAuthorizationListForPatientKey, ...(queryKey ?? [{ patientUuid }])], queryFn: () => AuthorizationControllerService.getAuthorizationListForPatient(patientUuid), ...options });
export const useAuthorizationControllerServiceAddAuthorizationForPatient = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof AuthorizationControllerService.addAuthorizationForPatient>>, unknown, {
    patientUuid: string;
    requestBody: PatientAuthorization;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, requestBody }) => AuthorizationControllerService.addAuthorizationForPatient(patientUuid, requestBody), ...options });
export const useAuditLogControllerServiceGetAuditLogsKey = "AuditLogControllerServiceGetAuditLogs";
export const useAuditLogControllerServiceGetAuditLogs = <TQueryKey extends Array<unknown> = unknown[]>({ providerGroupUuid, userName, entityType, startDate, endDate, page, size, sort }: {
    providerGroupUuid?: string;
    userName?: string;
    entityType?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof AuditLogControllerService.getAuditLogs>>, unknown, Awaited<ReturnType<typeof AuditLogControllerService.getAuditLogs>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useAuditLogControllerServiceGetAuditLogsKey, ...(queryKey ?? [{ providerGroupUuid, userName, entityType, startDate, endDate, page, size, sort }])], queryFn: () => AuditLogControllerService.getAuditLogs(providerGroupUuid, userName, entityType, startDate, endDate, page, size, sort), ...options });
export const useAppointmentSlotControllerServiceFetchProviderAppointmentSlotsKey = "AppointmentSlotControllerServiceFetchProviderAppointmentSlots";
export const useAppointmentSlotControllerServiceFetchProviderAppointmentSlots = <TQueryKey extends Array<unknown> = unknown[]>({ providerUuid }: {
    providerUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof AppointmentSlotControllerService.fetchProviderAppointmentSlots>>, unknown, Awaited<ReturnType<typeof AppointmentSlotControllerService.fetchProviderAppointmentSlots>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useAppointmentSlotControllerServiceFetchProviderAppointmentSlotsKey, ...(queryKey ?? [{ providerUuid }])], queryFn: () => AppointmentSlotControllerService.fetchProviderAppointmentSlots(providerUuid), ...options });
export const useAppointmentControllerServiceUpdateAppointmentStatus = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof AppointmentControllerService.updateAppointmentStatus>>, unknown, {
    appointmentUuid: string;
    appointmentStatus: "COMPLETED" | "CHECKED_IN" | "WAITING_ROOM" | "IN_EXAM_ROOM" | "SCHEDULED" | "NOT_CONFIRMED" | "CONFIRMED" | "CANCELLED" | "NO_SHOW" | "PENDING" | "ENCOUNTERED" | "RE_SCHEDULED" | "SEEN" | "SINGED_OFF" | "REQUESTED" | "DECLINE";
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ appointmentUuid, appointmentStatus }) => AppointmentControllerService.updateAppointmentStatus(appointmentUuid, appointmentStatus), ...options });
export const useAppointmentControllerServiceRescheduleAppointment = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof AppointmentControllerService.rescheduleAppointment>>, unknown, {
    id: number;
    requestBody: BookAppointmentRequest;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ id, requestBody }) => AppointmentControllerService.rescheduleAppointment(id, requestBody), ...options });
export const useAppointmentControllerServiceReschedulePatientAppointment = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof AppointmentControllerService.reschedulePatientAppointment>>, unknown, {
    id: number;
    requestBody: BookPatientAppointmentRequest;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ id, requestBody }) => AppointmentControllerService.reschedulePatientAppointment(id, requestBody), ...options });
export const useAppointmentControllerServiceGetAppointmentColorConfigurationsKey = "AppointmentControllerServiceGetAppointmentColorConfigurations";
export const useAppointmentControllerServiceGetAppointmentColorConfigurations = <TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof AppointmentControllerService.getAppointmentColorConfigurations>>, unknown, Awaited<ReturnType<typeof AppointmentControllerService.getAppointmentColorConfigurations>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useAppointmentControllerServiceGetAppointmentColorConfigurationsKey, ...(queryKey ?? [])], queryFn: () => AppointmentControllerService.getAppointmentColorConfigurations(), ...options });
export const useAppointmentControllerServiceUpdateAppointmentColorConfiguration = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof AppointmentControllerService.updateAppointmentColorConfiguration>>, unknown, {
    requestBody: AppointmentColorConfiguration;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => AppointmentControllerService.updateAppointmentColorConfiguration(requestBody), ...options });
export const useAppointmentControllerServiceBookPatientAppointment = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof AppointmentControllerService.bookPatientAppointment>>, unknown, {
    requestBody: BookPatientAppointmentRequest;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => AppointmentControllerService.bookPatientAppointment(requestBody), ...options });
export const useAppointmentControllerServiceGetAppointmentList = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof AppointmentControllerService.getAppointmentList>>, unknown, {
    requestBody: AppointmentListRequest;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => AppointmentControllerService.getAppointmentList(requestBody), ...options });
export const useAppointmentControllerServiceGetSlotsFromConfiguration = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof AppointmentControllerService.getSlotsFromConfiguration>>, unknown, {
    requestBody: FetchSlotsRequest;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => AppointmentControllerService.getSlotsFromConfiguration(requestBody), ...options });
export const useAppointmentControllerServiceGetAppointmentClinicalReport = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof AppointmentControllerService.getAppointmentClinicalReport>>, unknown, {
    requestBody: AppointmentClinicalRequest;
    page?: number;
    size?: number;
    sortBy?: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody, page, size, sortBy }) => AppointmentControllerService.getAppointmentClinicalReport(requestBody, page, size, sortBy), ...options });
export const useAppointmentControllerServiceDownloadAppointmentClinicalReport = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof AppointmentControllerService.downloadAppointmentClinicalReport>>, unknown, {
    exportType: "CSV" | "PDF";
    requestBody: AppointmentClinicalRequest;
    page?: number;
    size?: number;
    sortBy?: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ exportType, requestBody, page, size, sortBy }) => AppointmentControllerService.downloadAppointmentClinicalReport(exportType, requestBody, page, size, sortBy), ...options });
export const useAppointmentControllerServiceCancelAppointment = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof AppointmentControllerService.cancelAppointment>>, unknown, {
    requestBody: CancelAppointmentRequest;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => AppointmentControllerService.cancelAppointment(requestBody), ...options });
export const useAppointmentControllerServiceGetAppointmentListForCalender = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof AppointmentControllerService.getAppointmentListForCalender>>, unknown, {
    requestBody: AppointmentCalenderViewRequest;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => AppointmentControllerService.getAppointmentListForCalender(requestBody), ...options });
export const useAppointmentControllerServiceBookAppointment = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof AppointmentControllerService.bookAppointment>>, unknown, {
    requestBody: BookAppointmentRequest;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => AppointmentControllerService.bookAppointment(requestBody), ...options });
export const useAppointmentControllerServiceGetProviderGroupAppointmentCountKey = "AppointmentControllerServiceGetProviderGroupAppointmentCount";
export const useAppointmentControllerServiceGetProviderGroupAppointmentCount = <TQueryKey extends Array<unknown> = unknown[]>({ providerGroupUuid, startDate, endDate }: {
    providerGroupUuid: string;
    startDate?: string;
    endDate?: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof AppointmentControllerService.getProviderGroupAppointmentCount>>, unknown, Awaited<ReturnType<typeof AppointmentControllerService.getProviderGroupAppointmentCount>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useAppointmentControllerServiceGetProviderGroupAppointmentCountKey, ...(queryKey ?? [{ providerGroupUuid, startDate, endDate }])], queryFn: () => AppointmentControllerService.getProviderGroupAppointmentCount(providerGroupUuid, startDate, endDate), ...options });
export const useAppointmentControllerServiceGetPatientAppointmentKey = "AppointmentControllerServiceGetPatientAppointment";
export const useAppointmentControllerServiceGetPatientAppointment = <TQueryKey extends Array<unknown> = unknown[]>({ patientId, appointmentState, page, size, sort }: {
    patientId: string;
    appointmentState: "PAST" | "FUTURE";
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof AppointmentControllerService.getPatientAppointment>>, unknown, Awaited<ReturnType<typeof AppointmentControllerService.getPatientAppointment>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useAppointmentControllerServiceGetPatientAppointmentKey, ...(queryKey ?? [{ patientId, appointmentState, page, size, sort }])], queryFn: () => AppointmentControllerService.getPatientAppointment(patientId, appointmentState, page, size, sort), ...options });
export const useAppointmentControllerServiceGetPatientAndFamilyMemberAppointmentKey = "AppointmentControllerServiceGetPatientAndFamilyMemberAppointment";
export const useAppointmentControllerServiceGetPatientAndFamilyMemberAppointment = <TQueryKey extends Array<unknown> = unknown[]>({ patientId, appointmentState, page, size, sort }: {
    patientId: string;
    appointmentState: "PAST" | "FUTURE";
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof AppointmentControllerService.getPatientAndFamilyMemberAppointment>>, unknown, Awaited<ReturnType<typeof AppointmentControllerService.getPatientAndFamilyMemberAppointment>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useAppointmentControllerServiceGetPatientAndFamilyMemberAppointmentKey, ...(queryKey ?? [{ patientId, appointmentState, page, size, sort }])], queryFn: () => AppointmentControllerService.getPatientAndFamilyMemberAppointment(patientId, appointmentState, page, size, sort), ...options });
export const useAppointmentControllerServiceGetAppointmentByProviderKey = "AppointmentControllerServiceGetAppointmentByProvider";
export const useAppointmentControllerServiceGetAppointmentByProvider = <TQueryKey extends Array<unknown> = unknown[]>({ providerUuid, page, size, sort }: {
    providerUuid: string;
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof AppointmentControllerService.getAppointmentByProvider>>, unknown, Awaited<ReturnType<typeof AppointmentControllerService.getAppointmentByProvider>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useAppointmentControllerServiceGetAppointmentByProviderKey, ...(queryKey ?? [{ providerUuid, page, size, sort }])], queryFn: () => AppointmentControllerService.getAppointmentByProvider(providerUuid, page, size, sort), ...options });
export const useAppointmentControllerServiceGetAppointmentCountByProviderKey = "AppointmentControllerServiceGetAppointmentCountByProvider";
export const useAppointmentControllerServiceGetAppointmentCountByProvider = <TQueryKey extends Array<unknown> = unknown[]>({ providerUuid, startDate, endDate }: {
    providerUuid: string;
    startDate: string;
    endDate: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof AppointmentControllerService.getAppointmentCountByProvider>>, unknown, Awaited<ReturnType<typeof AppointmentControllerService.getAppointmentCountByProvider>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useAppointmentControllerServiceGetAppointmentCountByProviderKey, ...(queryKey ?? [{ providerUuid, startDate, endDate }])], queryFn: () => AppointmentControllerService.getAppointmentCountByProvider(providerUuid, startDate, endDate), ...options });
export const useAppointmentControllerServiceGetAppointmentDetailsKey = "AppointmentControllerServiceGetAppointmentDetails";
export const useAppointmentControllerServiceGetAppointmentDetails = <TQueryKey extends Array<unknown> = unknown[]>({ id }: {
    id: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof AppointmentControllerService.getAppointmentDetails>>, unknown, Awaited<ReturnType<typeof AppointmentControllerService.getAppointmentDetails>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useAppointmentControllerServiceGetAppointmentDetailsKey, ...(queryKey ?? [{ id }])], queryFn: () => AppointmentControllerService.getAppointmentDetails(id), ...options });
export const useAppointmentControllerServiceGetProviderAppointmentCountKey = "AppointmentControllerServiceGetProviderAppointmentCount";
export const useAppointmentControllerServiceGetProviderAppointmentCount = <TQueryKey extends Array<unknown> = unknown[]>({ providerUuid }: {
    providerUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof AppointmentControllerService.getProviderAppointmentCount>>, unknown, Awaited<ReturnType<typeof AppointmentControllerService.getProviderAppointmentCount>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useAppointmentControllerServiceGetProviderAppointmentCountKey, ...(queryKey ?? [{ providerUuid }])], queryFn: () => AppointmentControllerService.getProviderAppointmentCount(providerUuid), ...options });
export const useAppointmentControllerServiceNoShowAppointment = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof AppointmentControllerService.noShowAppointment>>, unknown, {
    id: number;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ id }) => AppointmentControllerService.noShowAppointment(id), ...options });
export const useAnalyticsControllerServiceViewStatusForProviderKey = "AnalyticsControllerServiceViewStatusForProvider";
export const useAnalyticsControllerServiceViewStatusForProvider = <TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof AnalyticsControllerService.viewStatusForProvider>>, unknown, Awaited<ReturnType<typeof AnalyticsControllerService.viewStatusForProvider>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useAnalyticsControllerServiceViewStatusForProviderKey, ...(queryKey ?? [])], queryFn: () => AnalyticsControllerService.viewStatusForProvider(), ...options });
export const useAnalyticsControllerServiceGetAllProviderPatientStatsKey = "AnalyticsControllerServiceGetAllProviderPatientStats";
export const useAnalyticsControllerServiceGetAllProviderPatientStats = <TQueryKey extends Array<unknown> = unknown[]>({ providerGroupUuid, year, startDate, endDate }: {
    providerGroupUuid?: string;
    year?: number;
    startDate?: string;
    endDate?: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof AnalyticsControllerService.getAllProviderPatientStats>>, unknown, Awaited<ReturnType<typeof AnalyticsControllerService.getAllProviderPatientStats>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useAnalyticsControllerServiceGetAllProviderPatientStatsKey, ...(queryKey ?? [{ providerGroupUuid, year, startDate, endDate }])], queryFn: () => AnalyticsControllerService.getAllProviderPatientStats(providerGroupUuid, year, startDate, endDate), ...options });
export const useAnalyticsControllerServiceGetCountsKey = "AnalyticsControllerServiceGetCounts";
export const useAnalyticsControllerServiceGetCounts = <TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof AnalyticsControllerService.getCounts>>, unknown, Awaited<ReturnType<typeof AnalyticsControllerService.getCounts>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useAnalyticsControllerServiceGetCountsKey, ...(queryKey ?? [])], queryFn: () => AnalyticsControllerService.getCounts(), ...options });
export const useAnalyticsControllerServiceViewStatusKey = "AnalyticsControllerServiceViewStatus";
export const useAnalyticsControllerServiceViewStatus = <TQueryKey extends Array<unknown> = unknown[]>({ providerGroupAdminUuid }: {
    providerGroupAdminUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof AnalyticsControllerService.viewStatus>>, unknown, Awaited<ReturnType<typeof AnalyticsControllerService.viewStatus>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useAnalyticsControllerServiceViewStatusKey, ...(queryKey ?? [{ providerGroupAdminUuid }])], queryFn: () => AnalyticsControllerService.viewStatus(providerGroupAdminUuid), ...options });
export const useAnalyticsControllerServiceGetTotalAnalyticsCountKey = "AnalyticsControllerServiceGetTotalAnalyticsCount";
export const useAnalyticsControllerServiceGetTotalAnalyticsCount = <TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof AnalyticsControllerService.getTotalAnalyticsCount>>, unknown, Awaited<ReturnType<typeof AnalyticsControllerService.getTotalAnalyticsCount>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useAnalyticsControllerServiceGetTotalAnalyticsCountKey, ...(queryKey ?? [])], queryFn: () => AnalyticsControllerService.getTotalAnalyticsCount(), ...options });
export const useAnalyticsControllerServiceGetAppStatusForGroupKey = "AnalyticsControllerServiceGetAppStatusForGroup";
export const useAnalyticsControllerServiceGetAppStatusForGroup = <TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof AnalyticsControllerService.getAppStatusForGroup>>, unknown, Awaited<ReturnType<typeof AnalyticsControllerService.getAppStatusForGroup>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useAnalyticsControllerServiceGetAppStatusForGroupKey, ...(queryKey ?? [])], queryFn: () => AnalyticsControllerService.getAppStatusForGroup(), ...options });
export const useAllergyControllerServiceGetAllAllergiesKey = "AllergyControllerServiceGetAllAllergies";
export const useAllergyControllerServiceGetAllAllergies = <TQueryKey extends Array<unknown> = unknown[]>({ page, size }: {
    page?: number;
    size?: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof AllergyControllerService.getAllAllergies>>, unknown, Awaited<ReturnType<typeof AllergyControllerService.getAllAllergies>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useAllergyControllerServiceGetAllAllergiesKey, ...(queryKey ?? [{ page, size }])], queryFn: () => AllergyControllerService.getAllAllergies(page, size), ...options });
export const useAllergyControllerServiceUpdatePatientAllergies = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof AllergyControllerService.updatePatientAllergies>>, unknown, {
    requestBody: PatientAllergy;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => AllergyControllerService.updatePatientAllergies(requestBody), ...options });
export const useAllergyControllerServiceAddPatientAllergies = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof AllergyControllerService.addPatientAllergies>>, unknown, {
    requestBody: PatientAllergy;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ requestBody }) => AllergyControllerService.addPatientAllergies(requestBody), ...options });
export const useAllergyControllerServiceUpdatePatientIntakeAllergiesForProvider = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof AllergyControllerService.updatePatientIntakeAllergiesForProvider>>, unknown, {
    patientUuid: string;
    intakeUuid: string;
    patientAllergyUuid: string;
    requestBody: PatientAllergy;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, intakeUuid, patientAllergyUuid, requestBody }) => AllergyControllerService.updatePatientIntakeAllergiesForProvider(patientUuid, intakeUuid, patientAllergyUuid, requestBody), ...options });
export const useAllergyControllerServiceArchivePatientIntakeAllergiesForProvider = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof AllergyControllerService.archivePatientIntakeAllergiesForProvider>>, unknown, {
    patientUuid: string;
    intakeUuid: string;
    patientAllergyUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, intakeUuid, patientAllergyUuid }) => AllergyControllerService.archivePatientIntakeAllergiesForProvider(patientUuid, intakeUuid, patientAllergyUuid), ...options });
export const useAllergyControllerServiceUpdatePatientIntakeAllergiesForPatient = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof AllergyControllerService.updatePatientIntakeAllergiesForPatient>>, unknown, {
    intakeUuid: string;
    patientAllergyUuid: string;
    requestBody: PatientAllergy;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ intakeUuid, patientAllergyUuid, requestBody }) => AllergyControllerService.updatePatientIntakeAllergiesForPatient(intakeUuid, patientAllergyUuid, requestBody), ...options });
export const useAllergyControllerServiceArchivePatientIntakeAllergiesForPatient = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof AllergyControllerService.archivePatientIntakeAllergiesForPatient>>, unknown, {
    intakeUuid: string;
    patientAllergyUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ intakeUuid, patientAllergyUuid }) => AllergyControllerService.archivePatientIntakeAllergiesForPatient(intakeUuid, patientAllergyUuid), ...options });
export const useAllergyControllerServiceAddPatientIntakeAllergies = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof AllergyControllerService.addPatientIntakeAllergies>>, unknown, {
    patientUuid: string;
    intakeFormUuid: string;
    requestBody: IntakeAllergy;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientUuid, intakeFormUuid, requestBody }) => AllergyControllerService.addPatientIntakeAllergies(patientUuid, intakeFormUuid, requestBody), ...options });
export const useAllergyControllerServiceGetIntakeAllergiesForPatientKey = "AllergyControllerServiceGetIntakeAllergiesForPatient";
export const useAllergyControllerServiceGetIntakeAllergiesForPatient = <TQueryKey extends Array<unknown> = unknown[]>({ intakeUuid }: {
    intakeUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof AllergyControllerService.getIntakeAllergiesForPatient>>, unknown, Awaited<ReturnType<typeof AllergyControllerService.getIntakeAllergiesForPatient>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useAllergyControllerServiceGetIntakeAllergiesForPatientKey, ...(queryKey ?? [{ intakeUuid }])], queryFn: () => AllergyControllerService.getIntakeAllergiesForPatient(intakeUuid), ...options });
export const useAllergyControllerServiceAddPatientIntakeAllergies1 = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof AllergyControllerService.addPatientIntakeAllergies1>>, unknown, {
    intakeUuid: string;
    requestBody: IntakeAllergy;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ intakeUuid, requestBody }) => AllergyControllerService.addPatientIntakeAllergies1(intakeUuid, requestBody), ...options });
export const useAllergyControllerServiceViewAllergyKey = "AllergyControllerServiceViewAllergy";
export const useAllergyControllerServiceViewAllergy = <TQueryKey extends Array<unknown> = unknown[]>({ patientAllergyUuid }: {
    patientAllergyUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof AllergyControllerService.viewAllergy>>, unknown, Awaited<ReturnType<typeof AllergyControllerService.viewAllergy>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useAllergyControllerServiceViewAllergyKey, ...(queryKey ?? [{ patientAllergyUuid }])], queryFn: () => AllergyControllerService.viewAllergy(patientAllergyUuid), ...options });
export const useAllergyControllerServiceArchivePatientAllergies = (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof AllergyControllerService.archivePatientAllergies>>, unknown, {
    patientAllergyUuid: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ patientAllergyUuid }) => AllergyControllerService.archivePatientAllergies(patientAllergyUuid), ...options });
export const useAllergyControllerServiceViewIntakeAllergiesForProviderKey = "AllergyControllerServiceViewIntakeAllergiesForProvider";
export const useAllergyControllerServiceViewIntakeAllergiesForProvider = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, intakeUuid, intakeAllergyUuid }: {
    patientUuid: string;
    intakeUuid: string;
    intakeAllergyUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof AllergyControllerService.viewIntakeAllergiesForProvider>>, unknown, Awaited<ReturnType<typeof AllergyControllerService.viewIntakeAllergiesForProvider>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useAllergyControllerServiceViewIntakeAllergiesForProviderKey, ...(queryKey ?? [{ patientUuid, intakeUuid, intakeAllergyUuid }])], queryFn: () => AllergyControllerService.viewIntakeAllergiesForProvider(patientUuid, intakeUuid, intakeAllergyUuid), ...options });
export const useAllergyControllerServiceGetPatientIntakeAllergiesKey = "AllergyControllerServiceGetPatientIntakeAllergies";
export const useAllergyControllerServiceGetPatientIntakeAllergies = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, intakeAllergyUuid }: {
    patientUuid: string;
    intakeAllergyUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof AllergyControllerService.getPatientIntakeAllergies>>, unknown, Awaited<ReturnType<typeof AllergyControllerService.getPatientIntakeAllergies>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useAllergyControllerServiceGetPatientIntakeAllergiesKey, ...(queryKey ?? [{ patientUuid, intakeAllergyUuid }])], queryFn: () => AllergyControllerService.getPatientIntakeAllergies(patientUuid, intakeAllergyUuid), ...options });
export const useAllergyControllerServiceGetPatientAllergiesKey = "AllergyControllerServiceGetPatientAllergies";
export const useAllergyControllerServiceGetPatientAllergies = <TQueryKey extends Array<unknown> = unknown[]>({ patientUuid, page, size, status }: {
    patientUuid: string;
    page: number;
    size: number;
    status?: boolean;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof AllergyControllerService.getPatientAllergies>>, unknown, Awaited<ReturnType<typeof AllergyControllerService.getPatientAllergies>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useAllergyControllerServiceGetPatientAllergiesKey, ...(queryKey ?? [{ patientUuid, page, size, status }])], queryFn: () => AllergyControllerService.getPatientAllergies(patientUuid, page, size, status), ...options });
export const useAllergyControllerServiceViewIntakeAllergiesForPatientKey = "AllergyControllerServiceViewIntakeAllergiesForPatient";
export const useAllergyControllerServiceViewIntakeAllergiesForPatient = <TQueryKey extends Array<unknown> = unknown[]>({ intakeFormUuid, intakeUuid }: {
    intakeFormUuid: string;
    intakeUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof AllergyControllerService.viewIntakeAllergiesForPatient>>, unknown, Awaited<ReturnType<typeof AllergyControllerService.viewIntakeAllergiesForPatient>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useAllergyControllerServiceViewIntakeAllergiesForPatientKey, ...(queryKey ?? [{ intakeFormUuid, intakeUuid }])], queryFn: () => AllergyControllerService.viewIntakeAllergiesForPatient(intakeFormUuid, intakeUuid), ...options });
export const useAllergyControllerServiceDownloadAllergiesClinicalReportKey = "AllergyControllerServiceDownloadAllergiesClinicalReport";
export const useAllergyControllerServiceDownloadAllergiesClinicalReport = <TQueryKey extends Array<unknown> = unknown[]>({ providerGroupUuid, exportType, page, size, sort, searchString, severity }: {
    providerGroupUuid: string;
    exportType: "CSV" | "PDF";
    page?: number;
    size?: number;
    sort?: Array<string>;
    searchString?: string;
    severity?: "MILD" | "HIGH" | "MODERATE";
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof AllergyControllerService.downloadAllergiesClinicalReport>>, unknown, Awaited<ReturnType<typeof AllergyControllerService.downloadAllergiesClinicalReport>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useAllergyControllerServiceDownloadAllergiesClinicalReportKey, ...(queryKey ?? [{ providerGroupUuid, exportType, page, size, sort, searchString, severity }])], queryFn: () => AllergyControllerService.downloadAllergiesClinicalReport(providerGroupUuid, exportType, page, size, sort, searchString, severity), ...options });
export const useAllergyControllerServiceGetAllergiesClinicalReportKey = "AllergyControllerServiceGetAllergiesClinicalReport";
export const useAllergyControllerServiceGetAllergiesClinicalReport = <TQueryKey extends Array<unknown> = unknown[]>({ providerGroupUuid, searchString, severity, page, size, sort }: {
    providerGroupUuid: string;
    searchString?: string;
    severity?: "MILD" | "HIGH" | "MODERATE";
    page?: number;
    size?: number;
    sort?: Array<string>;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof AllergyControllerService.getAllergiesClinicalReport>>, unknown, Awaited<ReturnType<typeof AllergyControllerService.getAllergiesClinicalReport>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useAllergyControllerServiceGetAllergiesClinicalReportKey, ...(queryKey ?? [{ providerGroupUuid, searchString, severity, page, size, sort }])], queryFn: () => AllergyControllerService.getAllergiesClinicalReport(providerGroupUuid, searchString, severity, page, size, sort), ...options });
