import CloseIcon from "@mui/icons-material/Close";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import {
  Button,
  ButtonBase,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { formButtonStyle, formTitle } from "../../../../../../../styles/common";
import FormInput from "../../../../../../../components/common/atom/FormInput";
import {
  useAppointmentControllerServiceGetAppointmentListForCalender,
  useAvailabilityControllerServiceAddAvailabilityByDate,
} from "../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { useFormik } from "formik";
import { OperationType } from "../../../../../../../components/common/form-enum";
import { ErrorResponseEntity } from "../../../../../../../components/common/enums-and-interfaces/interfaces";
import { useAppDispatch } from "../../../../../../../store/hooks";
import { alertAction } from "../../../../../../../store/features/common-actions/snackbar/alertSlice";
import { convertUTCDateToLocalDate } from "../../../../../../../components/common/enums-and-interfaces/common-functions";
import moment from "moment";

interface OpenEventProps {
  source?: string;
  open: boolean;
  setOpen: any;
  scroll?: string;
  title?: string;
  columns?: any;
  editData?: any;
  currentDate: any;
  btnTitle: any;
  handleClose: any;
  locations?: any[];
  provider?: any;
  selectedProvider?:any
}

function OpenEvent(props: OpenEventProps) {
  const { open, title, btnTitle, handleClose, currentDate, editData,selectedProvider } = props;

  const formData = {
    locationUuid: null,
    providerUserUuid: props.provider ? props.provider.userUuid : "",
    availabilityPresenceType: "",
    availabilityOperationType: "",
    date: currentDate,
    startTime: "",
    endTime: "",
  };

  const dispatch = useAppDispatch();
  const [locationOptions] = useState(props.locations);
  const AvailibilityType = [
    {
      value: "IN_PERSON",
      key: "In Person",
    },
    {
      value: "VIRTUAL",
      key: "Virtual",
    },
  ];

  const { mutateAsync, isError, error } =
    useAvailabilityControllerServiceAddAvailabilityByDate();

  const {
    mutateAsync: getCalender,
    isSuccess,
    data: appointmentData,
  } = useAppointmentControllerServiceGetAppointmentListForCalender();

 

  const formatDate = (originalDate: any) => {
    const parsedDate = new Date(originalDate);
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const day = String(parsedDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const getYear = (originalDate: string) => {
    const monthNames = [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ];
    const parsedDate = new Date(originalDate);
    const year = parsedDate.getFullYear();
    const month = monthNames[parsedDate.getMonth()];
    return {
      year: year,
      month: month,
    };
  };

  useEffect(() => {
    if ((error as ErrorResponseEntity)?.body.message)
      dispatch(
        alertAction.setAlert({
          open: true,
          message: (error as ErrorResponseEntity).body.message,
          severity: "error",
        })
      );
  }, [isError]);

  useEffect(() => {
    if (props.editData) {
      handleEdit(props.editData);
    }
  }, [props.editData]);

  const getCalenderDetails = (payload: any) => {
    getCalender({ requestBody: payload });
  };

  const handleSubmit = (values: any) => {
    const payload = { ...values };
    payload.locationUuid = payload.locationUuid?.uuid || null;
    payload.startTime = moment(payload.startTime).format("HH:mm");
    payload.endTime = moment(payload.endTime).format("HH:mm");

    mutateAsync({ requestBody: payload }).then((res) => {
      dispatch(
        alertAction.setAlert({
          open: true,
          message: res?.data?.message || "Successfully",
          severity: "success",
        })
      );
      handleClose();
    });
  };

  function handleEdit(editData: any) {
    const start = moment(convertUTCDateToLocalDate(editData.start));
    const end = moment(convertUTCDateToLocalDate(editData.end));
    formik.setFieldValue(
      "availabilityPresenceType",
      editData.inPerson ? "IN_PERSON" : "VIRTUAL"
    );
    formik.setFieldValue("locationUuid", editData.location);
    formik.setFieldValue("startTime", start);
    formik.setFieldValue("endTime", end);
  }

  const formik = useFormik({
    initialValues: formData,
    onSubmit: handleSubmit,
  });

  const values = formik.values as any;

  useEffect(() => {
    const yearResult = getYear(editData?.start);
    let year = yearResult.year;
    let payload = {
      calenderViewType: "DAY",
      startDate: formatDate(editData?.start),
      endDate: formatDate(editData?.end),

      year: year,
      appointmentStatus: [],
      providerUuid:values?.providerUserUuid ?  [values?.providerUserUuid] : [],
      appointmentType: null,
      appointmentListLocationRequest: {
        availabilityPresenceType:values?.availabilityPresenceType ||  null,
        locationUuid: values?.availabilityPresenceType ===  'IN_PERSON' && values?.locationUuid ? [values?.locationUuid?.uuid] : [],
      },
    };
    getCalenderDetails(payload);
  }, [editData, values.availabilityPresenceType,values?.locationUuid,values?.providerUserUuid]);
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="scroll-dialog-title">
          <Grid
            container
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Grid item>
              <Typography sx={formTitle}>{title}</Typography>
            </Grid>
            <Grid item>
              <ButtonBase onClick={handleClose}>
                <CloseIcon />
              </ButtonBase>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ color: "#FFAA00" }}>
                Scheduled Appointment
              </Typography>
            </Grid>
            {appointmentData && !appointmentData?.data?.length && (
              <Grid item xs={12} sx={{ display: "flex", gap: "20px" }}>
                <Typography variant="h5">No scheduled appointments</Typography>
              </Grid>
            )}
            {appointmentData?.data?.map((appointment: any) => (
              <Grid item xs={12} sx={{ display: "flex", gap: "20px" }}>
                <Typography variant="h5" sx={{ color: "#1A1A1ACC" }}>
                  {`${appointment?.startTime} To ${appointment.endTime}`}
                </Typography>
                <Typography variant="h5" sx={{ color: "#1A1A1ACC" }}>
                  {`${appointment?.patientName}`}
                </Typography>
              </Grid>
            ))}

            <Grid item xs={12}>
              <Typography variant="h4" sx={{ color: "#00B917" }}>
                Current Availability
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item container xs={6}>
                  <FormInput
                    control="radio"
                    name="availabilityOperationType"
                    label="Availability"
                    options={OperationType}
                    value={formik.values.availabilityOperationType}
                    onChange={formik.handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Grid item xs={12} sx={{ display: "flex", gap: "20px" }}>
                    <FormInput
                      control="radio"
                      name="availabilityPresenceType"
                      label="Availability Type"
                      options={AvailibilityType}
                      value={formik.values.availabilityPresenceType}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {formik.values.availabilityPresenceType == "IN_PERSON" && (
              <Grid item xs={12}>
                <FormInput
                  control="autocomplete"
                  label="Location"
                  name="location"
                  height="42px"
                  placeholder="Search & Select"
                  mapBy="name"
                  value={formik.values.locationUuid}
                  InputIcon={
                    <LocationOnOutlinedIcon
                      sx={{
                        position: "absolute",
                        right: 8,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#1A1A1A80",
                        fontSize: "20px",
                      }}
                    />
                  }
                  onChange={(event: any) =>
                    formik.setFieldValue("locationUuid", event.target.value)
                  }
                  data={locationOptions}
                />
              </Grid>
            )}
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <Grid item xs={6}>
                <FormInput
                  control="time"
                  name="startTime"
                  label={"Start Time"}
                  // format='HH:mm'
                  value={formik.values.startTime}
                  onChange={(event: any) =>
                    formik.setFieldValue("startTime", event)
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <FormInput
                  control="time"
                  name="endTime"
                  // format='HH:mm'
                  label={"End Time"}
                  value={formik.values.endTime}
                  onChange={(event: any) =>
                    formik.setFieldValue("endTime", event)
                  }
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
              <Button
                sx={formButtonStyle.saveButtonStyle}
                onClick={formik.submitForm}
              >
                <Typography
                  variant="h5"
                  sx={{ textTransform: "capitalize", fontWeight: 600 }}
                >
                  {btnTitle}
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default OpenEvent;
