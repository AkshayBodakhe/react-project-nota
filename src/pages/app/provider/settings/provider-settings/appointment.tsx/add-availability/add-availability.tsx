import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  ButtonBase,
  Dialog,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { formButtonStyle, formTitle } from "../../../../../../../styles/common";
import AppointmentTime from "./appointment-time";
import BlockDays from "./block-days";
import DaySlotCreation from "./day-slot-creation";
import FormInput from "../../../../../../../components/common/atom/FormInput";
import SlotCreationSettings from "./slot-creation-setting";
import { useFormik } from "formik";
import { AvailibilityType } from "../../../../../../../components/common/form-enum";
import {
  useAvailabilityControllerServiceEditAvailability,
  useAvailabilityControllerServiceSave,
  useLocationControllerServiceGetAllLocations,
  useProviderControllerServiceGetAllProviders,
} from "../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { useAppDispatch } from "../../../../../../../store/hooks";
import { alertAction } from "../../../../../../../store/features/common-actions/snackbar/alertSlice";
import { ErrorResponseEntity } from "../../../../../../../components/common/enums-and-interfaces/interfaces";
import { AvailabilityControllerService } from "../../../../../../../sdk/thinkemr-core-0.0.1/requests";
import * as Yup from "yup";
import { generateUniqueId } from "../../../../../../../components/common/helper";

interface AddAvailabilityProps {
  source?: string;
  open: boolean;
  setOpen: any;
  scroll?: string;
  title?: string;
  columns?: any;
  editData?: any;
  setIsRefetchData?: any;
  isRefetchData?: boolean;
}

const DialogCss = {
  ".css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    maxWidth: "940px !important",
  },
};

function AddAvailability(props: AddAvailabilityProps) {
  const { open, setOpen, title } = props;
  const [locations, setLocations] = useState<any[]>([]);
  const [providers, setProviders] = useState<any[]>([]);
  const [editData, setEditData] = useState<any>(null);
  const dispatch = useAppDispatch();
  const [locationUuid, setLocationUuid] = useState("");
  const [providerUserUuid, setProviderUserUuid] = useState("");
  const [availabilityType, setAvailabilityType] = useState<any>("");
  const getDataFromSessionStorage = () => {
    const encodedData = sessionStorage.getItem("loginUser");
    const providerData = encodedData ? JSON.parse(encodedData) : null;
    return providerData;
  };
  const { providerGroup: providerGroupUuid } =
    getDataFromSessionStorage() || {};

  const { data: locationsList, isLoading: isLocationsLoading } =
    useLocationControllerServiceGetAllLocations({
      providerGroupUuid: providerGroupUuid,
      page: 0,
      size: 100,
    });

  const { data: providersList, isLoading: isProvidersLoading } =
    useProviderControllerServiceGetAllProviders({
      providerGroupUuid: providerGroupUuid,
      page: 0,
      size: 100,
    });

  const { mutateAsync, isError, error } = useAvailabilityControllerServiceSave(
    {}
  );

  const { mutateAsync: edit } =
    useAvailabilityControllerServiceEditAvailability();

  // const validationSchema = Yup.object().shape({
  //   availabilityPresenceType: Yup.string().required(
  //     "Availability presence type is required"
  //   ),
  //   locationUuid: Yup.string().required("Location UUID is required"),
  //   providerUserUuid: Yup.string().required("Provider user UUID is required"),
  //   dayWiseAvailabilityEntitySet: Yup.array().of(
  //     Yup.object().shape({
  //       dayOfWeek: Yup.string().required("Day of week is required"),
  //     })
  //   ),
  //   blockDayEntitySet: Yup.array().of(
  //     Yup.object().shape({
  //       blockedDate: Yup.date().required("Blocked date is required"),
  //     })
  //   ),
  //   initialConsultTime: Yup.date().nullable(),
  //   followUpConsultTime: Yup.date().nullable(),
  //   minScheduleNoticeInput: Yup.number().nullable(),
  //   schedulingNoticeInputType: Yup.string().required(
  //     "Scheduling notice input type is required"
  //   ),
  //   eventBuffer: Yup.number().nullable(),
  //   bookingWindow: Yup.string().required("Booking window is required"),
  //   bookingWindowTimeZone: Yup.string().required(
  //     "Booking window time zone is required"
  //   ),
  // });

  const initialValues = {
    availabilityPresenceType: "",
    locationUuid: "",
    providerUserUuid: "",
    dayWiseAvailabilityEntitySet: [],
    blockDayEntitySet: [],
    initialConsultTime: null,
    followUpConsultTime: null,
    minScheduleNoticeInput: null,
    schedulingNoticeInputType: "",
    eventBuffer: null,
    bookingWindow: "",
    bookingWindowTimeZone: "",
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

  const [blocks, setBlocks] = useState<any[]>([
    {
      dayOfWeek: "",
      startTime: "",
      endTime: "",
    },
  ]);

  const [blockDays, setBlockDays] = useState<any[]>([
    {
      fromDate: "",
      toDate: "",
    },
  ]);

  useEffect(() => {
    if (
      editData?.dayWiseAvailabilityEntitySet &&
      title == "Edit Availability"
    ) {
      const newBlocks = editData?.dayWiseAvailabilityEntitySet?.map(
        (item: any) => ({
          ...item,
          id: generateUniqueId(),
        })
      );
      setBlocks(newBlocks);
      const newBlocksdays = editData?.blockDayEntitySet?.map((item: any) => ({
        ...item,
        id: generateUniqueId(),
      }));
      // setBlocks(newBlocks);
      setBlockDays(newBlocksdays);
      formik.setFieldValue("bookingWindow", editData?.bookingWindow);
      formik.setFieldValue("bookingWindowTimeZone",editData?.bookingWindowTimeZone);
      formik.setFieldValue("initialConsultTime", editData?.initialConsultTime);
      formik.setFieldValue("eventBuffer", editData?.eventBuffer);
      formik.setFieldValue("minScheduleNoticeInput",editData?.minScheduleNoticeInput);
      formik.setFieldValue("followUpConsultTime",editData?.followUpConsultTime);
      formik.setFieldValue("schedulingNoticeInputType",editData?.schedulingNoticeInputType);
    }
  }, [editData]);

  useEffect(() => {
    if (locationsList?.data && locationsList.data?.content)
      setLocations(locationsList.data.content);
  }, [isLocationsLoading]);

  useEffect(() => {
    if (providersList?.data && providersList.data?.content)
      setProviders(providersList.data.content);
  }, [isProvidersLoading]);

  useEffect(() => {
    const details = getDataFromSessionStorage();
  }, []);

  const handleSubmit = (values: any) => {
    values.dayWiseAvailabilityEntitySet = blocks;
    values.blockDayEntitySet = blockDays;
    const { locationUuid, providerUserUuid } = values;
    const payload: any = { ...values };
    payload.providerUserUuid = providerUserUuid?.userUuid || "";
    payload.locationUuid = locationUuid?.uuid || "";
    payload.schedulingNoticeInputType = values.schedulingNoticeInputType
      ? values?.schedulingNoticeInputType
      : null;
    payload.blockDayEntitySet = values.blockDayEntitySet[0]?.fromDate
      ? values.blockDayEntitySet
      : [];
    if (!editData?.uuid) {
      try {
        mutateAsync({ requestBody: payload })
          .then((res: any) => {
            setOpen(false);
            props?.setIsRefetchData(!props.isRefetchData);
            dispatch(
              alertAction.setAlert({
                open: true,
                message: res.message,
                severity: "success",
              })
            );
          })
          .catch((error: any) => {
            dispatch(
              alertAction.setAlert({
                open: true,
                message: error.body.message,
                severity: "error",
              })
            );
          });
      } catch (error: any) {
        dispatch(
          alertAction.setAlert({
            open: true,
            message: error.body.message,
            severity: "error",
          })
        );
      }
    } else {
      try {
        edit({ requestBody: payload })
          .then((res: any) => {
            setOpen(false);
            props?.setIsRefetchData(!props.isRefetchData);

            dispatch(
              alertAction.setAlert({
                open: true,
                message: res.message,
                severity: "success",
              })
            );
          })
          .catch((error: any) => {
            dispatch(
              alertAction.setAlert({
                open: true,
                message: error.body.message,
                severity: "error",
              })
            );
          });
      } catch (error: any) {
        dispatch(
          alertAction.setAlert({
            open: true,
            message: error.body.message,
            severity: "error",
          })
        );
      }
    }
  };

  const getDataToUpdateAvailability = async () => {
    if (title == "Edit Availability") {
      if (
        availabilityType &&
        providerUserUuid &&
        (availabilityType !== "IN_PERSON" ||
          (availabilityType === "IN_PERSON" && locationUuid))
      ) {
        const data = await AvailabilityControllerService.getByLocationUuid(
          availabilityType,
          providerUserUuid,
          availabilityType === "IN_PERSON" ? locationUuid : undefined
        );
        if(data?.data){
          setEditData(data?.data);
        }else{
          setEditData(null);
          setBlocks([]);
          setBlockDays([]);
        }
      }
    }
  };

  useEffect(() => {
    getDataToUpdateAvailability();
  }, [locationUuid, providerUserUuid, availabilityType]);

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    // validationSchema:validationSchema
  });

  const handleClose = () => {
    setOpen(false);
    setBlocks([]);
    setBlockDays([])
    formik.resetForm();
  };

  return (
    <Dialog open={open} onClose={handleClose} sx={DialogCss}>
      <DialogTitle id="scroll-dialog-title">
        <Grid container alignItems={"center"} justifyContent={"space-between"}>
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
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ color: "#1B5984" }}>
              Please Note: Updating availability settings may take several
              minutes to update.
            </Typography>
          </Grid>
          <Grid item xs={12} mt={2}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <FormInput
                  control="autocomplete"
                  name="firstName"
                  mapBy="firstName"
                  lastName="lastName"
                  value={formik.values.providerUserUuid || null}
                  isError={
                    !!(
                      formik.touched.providerUserUuid &&
                      formik.errors.providerUserUuid
                    )
                  }
                  label={"Select Provider"}
                  data={providers}
                  height="40px"
                  placeholder="Select Provider"
                  onChange={(event: any) => {
                    formik.setFieldValue(
                      "providerUserUuid",
                      event.target?.value || ""
                    );
                    setProviderUserUuid(event.target?.value.userUuid);
                  }}
                />
              </Grid>

              <Grid item xs={4}>
                <FormInput
                  control="select"
                  name="availabilityPresenceType"
                  label="Availability Type"
                  options={AvailibilityType}
                  value={formik.values.availabilityPresenceType}
                  isError={
                    !!(
                      formik.touched.availabilityPresenceType &&
                      formik.errors.availabilityPresenceType
                    )
                  }
                  placeholder={"Select"}
                  onChange={(event: any) => {
                    formik.setFieldValue(
                      "availabilityPresenceType",
                      event.target?.value || ""
                    );
                    setAvailabilityType(event.target?.value);
                  }}
                />
              </Grid>
              {formik.values.availabilityPresenceType === "IN_PERSON" && (
                <Grid item xs={4}>
                  <FormInput
                    control="autocomplete"
                    name="locationUuid"
                    mapBy="name"
                    label={"Availibility Location"}
                    data={
                      locations?.filter((location: any) => location?.active) ||
                      []
                    }
                    value={formik.values.locationUuid || null}
                    isError={
                      !!(
                        formik.touched.locationUuid &&
                        formik.errors.locationUuid
                      )
                    }
                    height="40px"
                    placeholder="Select Location"
                    onChange={(event: any) => {
                      formik.setFieldValue(
                        "locationUuid",
                        event.target?.value || ""
                      );
                      setLocationUuid(event.target?.value?.uuid);
                    }}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
          <DaySlotCreation
            formik={formik}
            blocks={blocks}
            setBlocks={setBlocks}
          />
          <SlotCreationSettings formik={formik} />
          <BlockDays
            formik={formik}
            blocks={blockDays}
            setBlocks={setBlockDays}
          />
          <AppointmentTime formik={formik} />
          <Grid container mt={2} justifyContent={"end"}>
            <Button
              sx={formButtonStyle.saveButtonStyle}
              onClick={formik.submitForm}
            >
              <Typography
                variant="h5"
                sx={{ textTransform: "capitalize", fontWeight: 600 }}
              >
                {title == "Add Availability" ? "Add" : "Save"}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default AddAvailability;
