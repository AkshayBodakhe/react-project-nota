export const mapFields = (inputValues: any, appointmentDetails?: any) => {
  return {
    providerUUID: inputValues.provider
      ? inputValues.provider.userUuid
      : undefined,
    locationUUID: inputValues.location ? inputValues.location.uuid : undefined,
    visitType: inputValues.visitType || "",
    appointmentType: inputValues.appointmentType || "",
    appointmentDate: inputValues.appointmentDate || "",
    patientUserUuid: appointmentDetails?.patientUuid
      ? appointmentDetails?.patientUuid
      : inputValues?.patient?.uuid || undefined,
    startTime: inputValues.startTime || "",
    endTime: inputValues.endTime || "",
    visitReason: inputValues.visitReason || "",
    isRepeated: inputValues.isRepeated || false,
    repeatInterval: inputValues.repeatInterval || null,
    repeatUnit: inputValues.repeatUnit || null,
    repeatDays: inputValues.repeatDays || null,
    repeatEndDate: inputValues.repeatEndDate || null,
    numberOfAppointment: inputValues.numberOfAppointment || null,
    intakeForms: inputValues.intakeForms || null,
  };
};

export const mappedAppointmentListData = (data: any) => {
  return {
    locationName: data?.locationName,
    appointmentListResponses: data?.appointmentListResponses.map(
      (appointment: any) => ({
        appointmentId: appointment.appointmentId,
        appointmentDate: appointment.appointmentDate,
        startTime: appointment.startTime,
        endTime: appointment.endTime,
        time: `${appointment.startTime} - ${appointment.endTime}`,
        timeZone: appointment.timeZone,
        patientName: appointment.patientName,
        patientImage: appointment.patientImage,
        patientGender: appointment.patientGender,
        dob: appointment.dob,
        contactNumber: appointment.contactNumber,
        providerUuid: appointment.providerUuid,
        providerName: appointment.providerName,
        presentType: appointment.presentType,
        appointmentType: appointment.appointmentType,
        appointmentStatus: appointment.appointmentStatus,
        reasonOfVisit: appointment.reasonOfVisit,
        appointmentStatusColor: appointment.appointmentStatusColor,
        patientUuid: appointment.patientUuid,
        encounterUuid: appointment?.encounterUuid,
        patientEmail: appointment?.patientEmail,
        clinicName: appointment?.clinicName,
        appointmentUuid: appointment?.appointmentUuid,
        avatar: appointment?.avatar,
      })
    ),
  };
};
