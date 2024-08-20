import { useEffect, useRef, useState } from "react";
import {
  // DialogTitle,
  // DialogContent,
  Typography,
  DialogActions,
  InputBase,
  Box,
  // OutlinedInput,
  Select,
  MenuItem,
  Checkbox,
  Grid,
  TextField,
  FormHelperText,
  ButtonBase,
  SelectChangeEvent,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
// import Dialog, { DialogProps } from "@mui/material/Dialog";
// import FormLabel from "../label/form-label";
import { makeStyles } from "@mui/styles";
import { useFormik } from "formik";
import * as Yup from "yup";

import ImageSelector from "../image-upload";
// import { adminConstants } from "../../../constants/admin";
import {
  actionBtns,
  commonWidget,
  formBottom,
  formButtonStyle,
} from "../../../styles/common";
// import theme from "../../../theme";
// import AddIcon from "@mui/icons-material/Add";
import { PracticeHour } from "../../../sdk/thinkemr-core-0.0.1/requests";
import CustomFormLabel from "../custom-form-label";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { backIcon, backToText } from "../../../styles/auth-form";
import { selectInputStyle } from "../../../pages/app/admin/new-master/data-import/view-patient-record";
import providerGroupService from "../../../service/provider-group--service";
import { Enums } from "../../../pages/app/admin/provider-groups/common-files/enums";
import {
  useProviderGroupControllerServiceAddSpecialities,
  useProviderGroupControllerServiceGetAllSpecialities,
  useProviderGroupControllerServiceGetStates,
} from "../../../sdk/thinkemr-core-0.0.1/queries";
import { adminConstants } from "../../../constants/admin";
// import { setAlert } from "../../../redux/actions/snackbar/alert.action";
import { useDispatch } from "react-redux";
import { alertAction } from "../../../store/features/common-actions/snackbar/alertSlice";
import CloseIcon from "@mui/icons-material/Close";

export const style = makeStyles(() => ({
  menuItemColorStyle: {
    color: "#1A1A1A7F",
  },
}));

const { SAVE, ADD } = adminConstants;

const sxs = {
  mainButtonStyle: {
    backgroundColor: "#DAEAF8",
    textTransform: "initial",
    fontSize: "14px",
    // fontWeight: "bold",
    color: "#36588C",
    boxShadow: "none !important",
    padding: "6px 16px !important",
    borderRadius: "4px",
  },
  addButtonIcon: {
    color: "#36588C !important",
    display: "flex",
    paddingRight: "12px",
    opacity: 0.7,
  },
  titleStyle: {
    textAlign: "center",
    // fontSize: "20px",
    color: "black",
    // fontWeight: "200",
    fontFamily: "Roboto,sans-serif",
  },
  dialogContentStyle: {
    "&::-webkit-scrollbar": {
      width: "0.4em",
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "transparent",
    },
    height: "auto",
    borderTop: "none",
  },
  specialitySelectStyle: {
    ".MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    border: "none ",
    height: "42px !important",

    width: "21.0rem",
    maxWidth: "24.375rem",
    padding: "13px 0px 10px 0px",
  },
  addressTitle: {
    fontSize: "16px",
    marginBottom: "22px",
    // fontWeight: "700",
    marginRight: "17px",
  },
  addressSelectorStyle: {
    ".MuiOutlinedInput-notchedOutline": { border: 0 },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    width: "12.773rem !important",
    height: "42px !important",
  },
  hoursContainer: {
    paddingTop: "15px",
    paddingLeft: "20.5px",
    paddingBottom: "23px",
    paddingRight: "19px",
    border: "1px solid #FFFFFF",
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.3)",
    borderRadius: "5px",
    width: "100%",
  },
  hoursTitle: {
    fontSize: "16px",
    marginBottom: "22px",
    // fontWeight: "700",
  },
  hoursParentContainer: {
    display: "flex",

    "@media (max-width: 820px)": {
      gap: "1.5rem",
    },
  },
  hoursGroupContainer: {
    display: "flex",
    gap: "34px",
    alignItems: "center",
    marginBottom: "25px",

    "@media (max-width: 820px)": {
      gap: "20px",
    },
  },
  dayBoxStyle: {
    fontSize: "20px",
    fontFamily: "Roboto",
    height: "38px",
    width: "38px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid #1A1A1A33 ",
    // fontWeight: "bold",
    borderRadius: "10px",
    cursor: "pointer",
  },
  textFieldsHoursStyle: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
    justifyContent: "center",

    "@media (max-width: 768px)": {
      gap: "7px",
    },
  },
  cancelButtonStyle: {
    fontFamily: "Roboto, sans-serif !important",
    width: "9.625rem",
    color: "#36588C",
    borderColor: "#36588C",
    height: "42px",
    fontSize: "14px",
    border: "1px solid #36588C",
  },
  saveButtonStyle: {
    fontFamily: "Roboto, sans-serif !important",
    width: "9.625rem",
    backgroundColor: "#36588C",
    height: "42px",
    fontSize: "14px",
    color: "#ffffff",
  },

  providerSaveButton: {
    textTransform: "initial",
    backgroundColor: "#36588C !important",
  },

  dayColor: {
    background: "#DAEAF8",
    color: "black",
  },
  title: {
    color: "#1A1A1A !important",
    fontWeight: "bold !important",
  },
};

type Props = {
  buttonTitle: string;
  dialogTitle: string;
  onCloseDrawer: () => void;
  providerGroupUuid: string;
  locationId?: string;
  providerContextData?: any;
};

const LocationModal = (props: Props) => {
  const classes = commonWidget();
  const styleClass = style();
  let locPhysicalAddress = [];
  locPhysicalAddress = props.providerContextData?.physicalAddress;

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const [providerGroupSchema] = useState<any>(
    localStorage.getItem(Enums.PROVIDER_GROUP_KEY) || ""
  );
  const [openDialog, setOpenDialog] = useState(false);

  const [specialities, setSpecialities] = useState<any[]>([]);

  const [hoursSelect, setHoursSelect] = useState({
    MONDAY: true,
    TUESDAY: true,
    WEDNESDAY: true,
    THURSDAY: true,
    FRIDAY: true,
    SATURDAY: true,
    SUNDAY: true,
  });

  const [initialValues] = useState({
    active: true,
    archive: false,
    avatar: null,
    newAvatar: null,
    email: "",
    name: "",
    specialities: [],
    locationHours: [],
    locationId: "",
    contact: "",
    // locationQualifier: [
    //   {
    //     id: 1,
    //     idQualifier: {
    //       id: 1,
    //       name: "(OB) State License Number"
    //     },
    //     number: 10
    //   }
    // ],
    fax: "",
    note: "",
    physicalAddress: {
      line1: (locPhysicalAddress?.line1 as string) || "",
      line2: (locPhysicalAddress?.line2 as string) || "",
      city: (locPhysicalAddress?.city as string) || "",
      state: (locPhysicalAddress?.state as string) || "",
      country: (locPhysicalAddress?.country as string) || "",
      zipcode: (locPhysicalAddress?.zipcode as string) || "",
    },
    billingAddress: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
    },
  });

  const [practiceHours, setPracticeHours] = useState([
    {
      id: "",
      dayOfWeek: PracticeHour.dayOfWeek.MONDAY,
      openingTime: "",
      closingTime: "",
    },
    {
      id: "",
      dayOfWeek: PracticeHour.dayOfWeek.TUESDAY,
      openingTime: "",
      closingTime: "",
    },
    {
      id: "",
      dayOfWeek: PracticeHour.dayOfWeek.WEDNESDAY,
      openingTime: "",
      closingTime: "",
    },
    {
      id: "",
      dayOfWeek: PracticeHour.dayOfWeek.THURSDAY,
      openingTime: "",
      closingTime: "",
    },
    {
      id: "",
      dayOfWeek: PracticeHour.dayOfWeek.FRIDAY,
      openingTime: "",
      closingTime: "",
    },
    {
      id: "",
      dayOfWeek: PracticeHour.dayOfWeek.SATURDAY,
      openingTime: "",
      closingTime: "",
    },
    {
      id: "",
      dayOfWeek: PracticeHour.dayOfWeek.SUNDAY,
      openingTime: "",
      closingTime: "",
    },
  ]);

  const selectRef = useRef(null);
  const [isSameAsPhysicalAddress, setIsSameAsPhysicalAddress] =
    useState<boolean>(false);
  const [specialitiesList, setSpecilaityType] = useState<any[]>([]);
  const [states, setState] = useState<any[]>([]);
  const dispatch = useDispatch();
  // const states: string[] = ['Maharashtra', 'Andhra Pradesh', 'Arunachal Pradesh', 'Bihar', 'Assam', 'Chhattisgarh', 'Goa', 'Gujarat'];
  const [locationSpecialities, setLocationSpecialities] = useState<any[]>([]);

  const [specialitiesPagination, setSpecialitiesPagination] = useState({
    page: 0,
    size: 10,
  });

  // useProviderGroupControllerServiceGetAllSpecialities

  const { data, isLoading, isError, refetch } =
    useProviderGroupControllerServiceGetAllSpecialities({
      page: specialitiesPagination.page,
      size: specialitiesPagination.size,
    });

  const {
    data: allStates,
    isLoading: isStatesLoading,
    isError: isStatesError,
    refetch: refetchStates,
  } = useProviderGroupControllerServiceGetStates({ page: 0, size: 100 });

  useEffect(() => {
    if (isStatesError) {
      refetchStates();
      return;
    }
    if (allStates?.data && allStates.data?.content) {
      setState(allStates.data?.content);
    }
  }, [allStates?.data, isStatesLoading]);
  // const { mutateAsync } = props.locationId ? useLocationControllerServiceUpdateLocation() : useLocationControllerServiceAddLocation();
  // const editData = useLocationControllerServiceGetLocationByLocationId({ uuid: props.locationId || '' });

  useEffect(() => {
    // if (editData.data?.data) {
    //   handleEditData(editData.data.data);
    // }
    if (props.locationId) {
      getLocationById(props.locationId);
    }
  }, [props.dialogTitle]);

  useEffect(() => {
    if (isError) refetch();
    if (data?.data && data.data?.content) {
      type spec = [
        {
          id: string;
          name: string;
        }
      ];
      const newSpeciality: spec = [
        {
          id: "0",
          name: "Add new speciality",
        },
      ];
      setSpecilaityType([...newSpeciality, ...data.data.content]);
    }
  }, [data?.data, isLoading]);

  const addEditLocation = (payload: any) => {
    try {
      providerGroupService
        .addUpdateLocation(
          payload,
          providerGroupSchema,
          props.locationId ? "UPDATE" : "ADD"
        )
        .then((res: any) => {
          if (res?.status >= 200 && res.status <= 299) {
            props.onCloseDrawer();
            dispatch(
              alertAction.setAlert({
                open: true,
                message: res.data.message,
                severity: "success",
              })
            );
          } else
            dispatch(
              alertAction.setAlert({
                open: true,
                message: res.data?.message || "",
                severity: "error",
              })
            );
        });
    } catch (error) {}
  };

  const getLocationById = (locationId: string) => {
    try {
      providerGroupService
        .getLocationByUuid(providerGroupSchema, locationId)
        .then((res) => {
          handleEditData(res.data?.data);
        });
    } catch (error) {}
  };

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    if (values.physicalAddress.zipcode === "") {
      values.physicalAddress.zipcode = null;
    }
    values.providerGroupUuid = props?.providerGroupUuid;
    values.locationHours = practiceHours.filter((res) => res.openingTime);
    values.specialities = [];
    specialities.map((res: any) => {
      values.specialities.push(getObject(res));
    });
    if (isSameAsPhysicalAddress) {
      if (values.billingAddress === null) values.billingAddress = {};
      let id = values.billingAddress?.id || "";
      Object.assign(values.billingAddress, values.physicalAddress);
      values.billingAddress.id = id;
    }
    if (
      !isBillingAddressFilled(values.billingAddress) &&
      !isSameAsPhysicalAddress
    )
      values.billingAddress = null;
    const payload = { ...values };
    if (props?.dialogTitle === "Edit Location") {
      payload.newAvatar = payload?.newAvatar?.split(",")[1];
    } else {
      payload.avatar = payload?.avatar?.split(",")[1];
    }
    addEditLocation(payload);
    setSubmitting(false);
  };

  const handleEditData = (location: any) => {
    setSpecialities(() => [
      ...location.specialities.map((res: any) => res.name),
    ]);
    setLocationSpecialities(location.specialities);
    // location.specialities.map((res: any) => {
    //   specialities.push(res.name);
    // });
    // Formik.setFieldValue('email', location.email);
    if (
      checkIfSameAsPhysicalAddress(
        location.billingAddress,
        location.physicalAddress
      )
    )
      setIsSameAsPhysicalAddress(true);
    location.locationHours.map((res: PracticeHour) => {
      const matchingPracticeHour: any = practiceHours.find(
        (res1) => res.dayOfWeek === res1.dayOfWeek
      );
      if (matchingPracticeHour) {
        matchingPracticeHour.id = res.id;
        matchingPracticeHour.openingTime = res.openingTime;
        matchingPracticeHour.closingTime = res.closingTime;
      }
    });
    Object.keys(location).map((res: any) => {
      Formik.setFieldValue(res, location[res]);
    });
  };

  const handleActiveDayOfWeek = (dayOfWeek: PracticeHour.dayOfWeek) => {
    const obj: any = practiceHours?.filter(
      (res) => res?.dayOfWeek === dayOfWeek
    )[0];
    obj["openingTime"] = "";
    obj["closingTime"] = "";
    setHoursSelect((prev) => ({
      ...prev,
      [dayOfWeek]: !prev[dayOfWeek],
    }));
  };

  const handleSameAsField = (event: any) => {
    setIsSameAsPhysicalAddress(event.target.checked);
  };

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    const newSpec = value.filter(
      (item: string) => item !== "Add new speciality"
    );

    let specialitiesData: { name: string | string[] }[] = [];
    setSpecialities(typeof newSpec === "string" ? newSpec.split(",") : newSpec);
    const val = event.target.value;
    if (val.includes("Add new speciality")) {
      setOpenDialog((item) => !item);
    }
  };

  const handleProfileImg = (event: any) => {
    Formik.setFieldValue(props.locationId ? "newAvatar" : "avatar", event);
  };

  const handleClose = () => {
    Formik.resetForm();
    props.onCloseDrawer();
  };

  function handleTimeChange(
    dayOfWeek: PracticeHour.dayOfWeek,
    value: any,
    name: string
  ) {
    setPracticeHours((prevPracticeHours) =>
      prevPracticeHours.map((practiceHour) => {
        if (practiceHour.dayOfWeek === dayOfWeek) {
          return {
            ...practiceHour,
            [name]: value,
          };
        }
        return practiceHour;
      })
    );
  }

  function isBillingAddressFilled(billingAddress: any): boolean {
    if (billingAddress === null) return false;
    return (
      billingAddress.line1 &&
      billingAddress.line2 &&
      billingAddress.city &&
      billingAddress.state &&
      billingAddress.country &&
      billingAddress.zipcode
    );
  }

  async function handleMenuScroll(event: any) {
    const selectMenu: any = selectRef.current;
    const isNearBottom =
      event.target.scrollTop + event.target.clientHeight >=
      event.target.scrollHeight - 1;
    if (selectMenu && isNearBottom && !isLoading) {
      setSpecialitiesPagination((prev) => ({
        ...prev,
        size: specialitiesPagination.size + 10,
      }));
    }
  }

  function checkIfSameAsPhysicalAddress(obj1: any, obj2: any): boolean {
    if (obj1 === null || obj2 === null) return false;

    return (
      obj1.line1 === obj2.line1 &&
      obj1.line2 === obj2.line2 &&
      obj1.city === obj2.city &&
      obj1.state === obj2.state &&
      obj1.country === obj2.country &&
      obj1.zipcode === obj2.zipcode
    );
  }

  function getObject(type: string) {
    return (
      specialitiesList.find((res) => res.name === type) ||
      locationSpecialities.find((res) => res.name === type)
    );
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(2, "Location Name should be at least two characters long")
      .matches(/^[A-Za-z ]+$/, "Please enter the valid location name")
      .required("Location Name Required"),
    locationId: Yup.string().matches(
      /^[0-9]+$/,
      "Location ID should contain only digits"
    ),
    // .required("Location Id Required")
    // SpecialityType: Yup.array().required("SpecialityType Required"),
    email: Yup.string()
      .email("Please enter the valid email")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter the valid email"
      )
      .required("Please enter the valid email"),
    // npi: Yup.string()
    //   .required("Group NPI Number Required")
    //   .matches(/^\d+$/, "NPI number should contain only digits")
    //   .min(10, 'NPI number should be at least 10 digits')
    //   .max(10, 'NPI number should not exceed 10 digits'),
    specialities: Yup.array(),
    // workingHours: Yup.array().required(""),
    contact: Yup.string()
      .required("Please enter the contact number")
      .matches(/^\d+$/, "Please enter the valid contact number")
      .min(10, "Contact number should be at least 10 digits")
      .max(10, "Contact number should not exceed 10 digits"),
    // fax: Yup.string().matches(
    //   /^[0-9]+$/,
    //   "Fax number should contain only digits"
    // ),
    physicalAddress: Yup.object().shape({
      line1: Yup.string()
        .required("Please enter the address")
        .matches(/^[a-zA-Z0-9\s,/]*$/, "Please enter the valid address"),
      // line2: Yup.string().required("Line2 Required"),
      city: Yup.string()
        .required("Please enter the city name")
        .trim()
        .min(2, "City must be at least two characters long")
        .matches(/^[A-Za-z ]+$/, "Please enter the valid city name"),
      state: Yup.string()
        .required("Please enter the state name")
        .matches(/^[A-Za-z ]+$/, "Please enter the valid state name"),
      country: Yup.string()
        .required("Please enter the country name")
        .trim()
        .min(2, "Country must be at least two characters long")
        .matches(/^[A-Za-z ]+$/, "Please enter the valid country name"),
      // zipcode: Yup.string().required("Please enter the zip code")
      //   .matches(/^[0-9]+$/, "Please enter the valid zip code ")
      // .min(5, 'Invalid Zip Code')
      // .max(10, 'Invalid Zip Code')
    }),
  });

  const Formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const { mutateAsync: addSpecialitisMutateAsync } =
    useProviderGroupControllerServiceAddSpecialities();

  const handleAddNewSpecialities = async (values: any) => {
    try {
      if (values) {
        await addSpecialitisMutateAsync({
          requestBody: values,
        })
          .then((res: any) => {
            // if (res?.status >= 200 && res.status <= 299) {
            dispatch(
              alertAction.setAlert({
                open: true,
                message: res.message,
                severity: "success",
              })
            );
            // } else if (res?.status >= 299) {
            //   dispatch(
            //     alertAction.setAlert({
            //       open: true,
            //       message: res?.message || "",
            //       severity: "error",
            //     })
            //   );
            // }
          })
          .catch(() => {});
      }
    } catch {}
    handleClosedSpecialityDialog();
  };

  const initilalSpecialities = {
    name: "",
  };

  const validationSchemaForSpec = Yup.object().shape({
    name: Yup.string()
      .required("New speciality required")
      .matches(
        /^[A-Za-z0-9]+$/,
        "Specialities contains only characters and numbers"
      ),
  });

  const formikData = useFormik({
    initialValues: initilalSpecialities,
    validationSchema: validationSchemaForSpec,
    onSubmit: handleAddNewSpecialities,
  }) as any;

  const handleClosedSpecialityDialog = () => {
    setOpenDialog((item) => !item);
    formikData.resetForm();
  };

  return (
    <form onSubmit={Formik.handleSubmit}>
      <Grid container p={2}>
        <Grid item>
          <Grid container justifyContent={"space-between"} mb={2}>
            <Grid item>
              <Typography sx={sxs.title}>{props.dialogTitle}</Typography>
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <ArrowBackIosIcon sx={backIcon} />
              <Typography onClick={handleClose} sx={backToText}>
                Back
              </Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={2.7}>
                  <CustomFormLabel label="Add Location Logo" />
                  <ImageSelector
                    existingProfileImage={
                      Formik.values.newAvatar || Formik.values.avatar
                    }
                    setProfileImage={handleProfileImg}
                  />
                </Grid>
                <Grid item xs={9.3}>
                  <Grid container>
                    <Grid item xs={12}>
                      <CustomFormLabel
                        label="Location Name"
                        isRequired={true}
                      />
                      <InputBase
                        fullWidth
                        onBlur={Formik.handleBlur}
                        onChange={Formik.handleChange}
                        error={!!(Formik.errors.name && Formik.touched.name)}
                        // onChange={(e) =>
                        //   Formik.setFieldValue("name", e.target.value)
                        // }
                        name="name"
                        value={Formik.values.name}
                        placeholder="Enter Location Name"
                        classes={{
                          root: classes.textFieldRoot,
                          input: classes.textFieldInput,
                          focused: classes.textFieldActive,
                          error: classes.inputBoxError,
                        }}
                      />
                      {Formik.touched.name && Formik.errors.name && (
                        <FormHelperText error>
                          {Formik.errors.name}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} mt={2}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <CustomFormLabel label="Location ID" />
                          <InputBase
                            fullWidth
                            placeholder="Enter Location ID"
                            // onChange={(e) =>
                            //   Formik.setFieldValue("locationId", e.target.value)
                            // }
                            // onBlur={Formik.handleBlur}
                            onChange={Formik.handleChange}
                            // error={
                            //   !!(
                            //     Formik.errors.locationId &&
                            //     Formik.touched.locationId
                            //   )
                            // }
                            name="locationId"
                            value={Formik.values.locationId}
                            classes={{
                              root: classes.textFieldRoot,
                              input: classes.textFieldInput,
                              focused: classes.textFieldActive,
                              error: classes.inputBoxError,
                            }}
                          />
                          {Formik.touched.locationId &&
                            Formik.errors.locationId && (
                              <FormHelperText error>
                                {Formik.errors.locationId}
                              </FormHelperText>
                            )}
                        </Grid>
                        <Grid item xs={6}>
                          <CustomFormLabel
                            label="Speciality Type"
                            // isRequired={true}
                          />
                          <Select
                            id="demo-multiple-name"
                            multiple
                            ref={selectRef}
                            onScrollCapture={handleMenuScroll}
                            sx={{
                              ...selectInputStyle,
                              height: "40px !important",
                            }}
                            name="specialist"
                            value={specialities}
                            placeholder="Select Speciality"
                            // classes={{
                            //   error: classes.inputBoxError,
                            // }}
                            // onBlur={Formik.handleBlur}
                            // error={
                            //   !!(
                            //     !specialities.length &&
                            //     Formik.touched.specialities
                            //   )
                            // }
                            onChange={handleChange}
                            size="small"
                            // input={<OutlinedInput />}
                            renderValue={(selected) => {
                              if (!selected || selected.length === 0) {
                                return (
                                  <span>
                                    <Typography
                                      variant="h5"
                                      sx={{
                                        color: "#1A1A1A80 !important",
                                      }}
                                    >
                                      Select Speciality
                                    </Typography>
                                  </span>
                                );
                              }
                              return (
                                <Typography variant="h5">
                                  {selected?.length > 1 ? (
                                    <>
                                      <Box
                                        sx={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                          alignItems: "center",
                                          alignContent: "center",
                                        }}
                                      >
                                        <Box>{`${selected[0]}`}</Box>
                                        <Box>{` + ${selected.length - 1}`}</Box>
                                      </Box>
                                    </>
                                  ) : (
                                    selected[0]
                                  )}
                                </Typography>
                              );
                            }}
                            MenuProps={MenuProps}
                            displayEmpty
                          >
                            {specialitiesList.length !== 0 &&
                              specialitiesList.map((item) => (
                                <MenuItem key={item.id} value={item.name}>
                                  {item.name}
                                </MenuItem>
                              ))}
                          </Select>
                          {/* {Formik.touched.specialities &&
                            !specialities.length && (
                              <FormHelperText error>
                                {"Specialities Required"}
                              </FormHelperText>
                            )} */}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} mt={2}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <CustomFormLabel
                            label="Contact Number"
                            isRequired={true}
                          />
                          <InputBase
                            fullWidth
                            name="contact"
                            placeholder="Enter Contact Number"
                            value={Formik.values.contact}
                            error={
                              !!(
                                Formik.errors.contact && Formik.touched.contact
                              )
                            }
                            // onChange={(e) =>
                            //   Formik.setFieldValue("contact", e.target.value)
                            // }
                            onBlur={Formik.handleBlur}
                            onChange={Formik.handleChange}
                            classes={{
                              root: classes.textFieldRoot,
                              input: classes.textFieldInput,
                              focused: classes.textFieldActive,
                              error: classes.inputBoxError,
                            }}
                          />
                          {Formik.touched.contact && Formik.errors.contact && (
                            <FormHelperText error>
                              {Formik.errors.contact}
                            </FormHelperText>
                          )}
                        </Grid>
                        <Grid item xs={6}>
                          <CustomFormLabel label="Email" isRequired={true} />
                          <InputBase
                            fullWidth
                            name="email"
                            // onChange={(e) =>
                            //   Formik.setFieldValue("email", e.target.value)
                            // }
                            onBlur={Formik.handleBlur}
                            onChange={Formik.handleChange}
                            value={Formik.values.email}
                            disabled={!!props.locationId}
                            error={
                              !!(Formik.errors.email && Formik.touched.email)
                            }
                            placeholder="Enter Email"
                            classes={{
                              root: classes.textFieldRoot,
                              input: classes.textFieldInput,
                              focused: classes.textFieldActive,
                              error: classes.inputBoxError,
                            }}
                          />
                          {Formik.touched.email && Formik.errors.email && (
                            <FormHelperText error>
                              {Formik.errors.email}
                            </FormHelperText>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} mt={2}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <CustomFormLabel label="Fax Number" />
                          <InputBase
                            fullWidth
                            name="fax"
                            value={Formik.values.fax}
                            error={!!(Formik.errors.fax && Formik.touched.fax)}
                            // onChange={(e) =>
                            //   Formik.setFieldValue("fax", e.target.value)
                            // }
                            onBlur={Formik.handleBlur}
                            onChange={Formik.handleChange}
                            placeholder="Enter Fax Number"
                            classes={{
                              root: classes.textFieldRoot,
                              input: classes.textFieldInput,
                              focused: classes.textFieldActive,
                              error: classes.inputBoxError,
                            }}
                          />
                          {Formik.touched.fax && Formik.errors.fax && (
                            <FormHelperText error>
                              {Formik.errors.fax}
                            </FormHelperText>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} mt={2}>
                      <CustomFormLabel label="Description" />
                      <InputBase
                        fullWidth
                        name="note"
                        value={Formik.values.note}
                        placeholder="Enter Description"
                        onChange={Formik.handleChange}
                        classes={{
                          root: classes.textFieldRoot,
                          input: classes.textFieldInput,
                          focused: classes.textFieldActive,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} mt={2}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography
                    sx={{ color: "#1B5984", opacity: 1, fontWeight: 600 }}
                  >
                    Address
                  </Typography>
                </Grid>
                <Grid
                  mt={1}
                  item
                  xs={12}
                  sx={{
                    boxShadow: "0px 0px 6px #00000029",
                    borderRadius: "5px",
                    opacity: 1,
                  }}
                >
                  <Grid container p={2}>
                    <Grid item xs={12}>
                      <Typography sx={{ color: "#1A1A1A", opacity: 1 }}>
                        Physical Address
                      </Typography>
                    </Grid>
                    <Grid item xs={12} mt={2}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <CustomFormLabel
                            label="Address Line 1"
                            isRequired={true}
                          />
                          <InputBase
                            fullWidth
                            placeholder="Address 1"
                            // onChange={(e) =>
                            //   Formik.setFieldValue("physicalAddress.line1", e.target.value)
                            // }
                            onBlur={Formik.handleBlur}
                            onChange={Formik.handleChange}
                            value={Formik.values.physicalAddress.line1}
                            error={
                              !!(
                                Formik.errors.physicalAddress?.line1 &&
                                Formik.touched.physicalAddress?.line1
                              )
                            }
                            name="physicalAddress.line1"
                            classes={{
                              root: classes.textFieldRoot,
                              input: classes.textFieldInput,
                              focused: classes.textFieldActive,
                              error: classes.inputBoxError,
                            }}
                          />
                          {Formik.touched.physicalAddress?.line1 &&
                            Formik.errors.physicalAddress?.line1 && (
                              <FormHelperText error>
                                {Formik.errors.physicalAddress?.line1}
                              </FormHelperText>
                            )}
                        </Grid>
                        <Grid item xs={6}>
                          <CustomFormLabel label="Address Line 2" />
                          <InputBase
                            fullWidth
                            placeholder="Address 2"
                            value={Formik.values.physicalAddress.line2}
                            name="physicalAddress.line2"
                            // onChange={(e) =>
                            //   Formik.setFieldValue("physicalAddress.line2", e.target.value)
                            // }
                            onBlur={Formik.handleBlur}
                            onChange={Formik.handleChange}
                            // error={!!(Formik.errors.physicalAddress?.line2 && Formik.touched.physicalAddress?.line2)}
                            classes={{
                              root: classes.textFieldRoot,
                              input: classes.textFieldInput,
                              focused: classes.textFieldActive,
                              error: classes.inputBoxError,
                            }}
                          />
                          {/* {Formik.touched.physicalAddress?.line2 && Formik.errors.physicalAddress?.line2 && (
                            <FormHelperText error>
                              {Formik.errors.physicalAddress?.line2}
                            </FormHelperText>
                          )} */}
                        </Grid>
                        <Grid item xs={3}>
                          <CustomFormLabel label="City" isRequired={true} />
                          <InputBase
                            fullWidth
                            placeholder="City"
                            value={Formik.values.physicalAddress.city}
                            name="physicalAddress.city"
                            // onChange={(e) =>
                            //   Formik.setFieldValue("physicalAddress.city", e.target.value)
                            // }
                            onBlur={Formik.handleBlur}
                            onChange={Formik.handleChange}
                            error={
                              !!(
                                Formik.errors.physicalAddress?.city &&
                                Formik.touched.physicalAddress?.city
                              )
                            }
                            classes={{
                              root: classes.textFieldRoot,
                              input: classes.textFieldInput,
                              focused: classes.textFieldActive,
                              error: classes.inputBoxError,
                            }}
                          />
                          {Formik.touched.physicalAddress?.city &&
                            Formik.errors.physicalAddress?.city && (
                              <FormHelperText error>
                                {Formik.errors.physicalAddress?.city}
                              </FormHelperText>
                            )}
                        </Grid>
                        <Grid item xs={3}>
                          <CustomFormLabel label="State" isRequired={true} />
                          <InputBase
                            fullWidth
                            placeholder="State"
                            value={Formik.values.physicalAddress.state}
                            name="physicalAddress.state"
                            // onChange={(e) =>
                            //   Formik.setFieldValue("physicalAddress.city", e.target.value)
                            // }
                            onBlur={Formik.handleBlur}
                            onChange={Formik.handleChange}
                            error={
                              !!(
                                Formik.errors.physicalAddress?.state &&
                                Formik.touched.physicalAddress?.state
                              )
                            }
                            classes={{
                              root: classes.textFieldRoot,
                              input: classes.textFieldInput,
                              focused: classes.textFieldActive,
                              error: classes.inputBoxError,
                            }}
                          />
                          {Formik.touched.physicalAddress?.state &&
                            Formik.errors.physicalAddress?.state && (
                              <FormHelperText error>
                                {Formik.errors.physicalAddress?.state}
                              </FormHelperText>
                            )}
                        </Grid>
                        <Grid item xs={3}>
                          <CustomFormLabel label="Country" isRequired={true} />
                          <InputBase
                            fullWidth
                            // onChange={(e) =>
                            //   Formik.setFieldValue("physicalAddress.country", e.target.value)
                            // }
                            onBlur={Formik.handleBlur}
                            onChange={Formik.handleChange}
                            error={
                              !!(
                                Formik.errors.physicalAddress?.country &&
                                Formik.touched.physicalAddress?.country
                              )
                            }
                            value={Formik.values.physicalAddress.country}
                            name="physicalAddress.country"
                            placeholder="Country"
                            classes={{
                              root: classes.textFieldRoot,
                              input: classes.textFieldInput,
                              focused: classes.textFieldActive,
                              error: classes.inputBoxError,
                            }}
                          />
                          {Formik.touched.physicalAddress?.country &&
                            Formik.errors.physicalAddress?.country && (
                              <FormHelperText error>
                                {Formik.errors.physicalAddress?.country}
                              </FormHelperText>
                            )}
                        </Grid>
                        <Grid item xs={3}>
                          <CustomFormLabel
                            label="Zip Code"
                            isRequired={false}
                          />
                          <InputBase
                            fullWidth
                            value={Formik.values.physicalAddress.zipcode}
                            name="physicalAddress.zipcode"
                            error={
                              !!(
                                Formik.errors.physicalAddress?.zipcode &&
                                Formik.touched.physicalAddress?.zipcode
                              )
                            }
                            // onChange={(e) =>
                            //   Formik.setFieldValue("physicalAddress.zipcode", e.target.value)
                            // }
                            onBlur={Formik.handleBlur}
                            onChange={Formik.handleChange}
                            placeholder="Zip Code"
                            classes={{
                              root: classes.textFieldRoot,
                              input: classes.textFieldInput,
                              error: classes.inputBoxError,
                              focused: classes.textFieldActive,
                            }}
                          />
                          {Formik.touched.physicalAddress?.zipcode &&
                            Formik.errors.physicalAddress?.zipcode && (
                              <FormHelperText error>
                                {Formik.errors.physicalAddress?.zipcode}
                              </FormHelperText>
                            )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container mt={2}>
                <Grid
                  item
                  xs={12}
                  sx={{
                    boxShadow: "0px 0px 6px #00000029",
                    borderRadius: "5px",
                    opacity: 1,
                  }}
                >
                  <Grid container p={2}>
                    <Grid item xs={12}>
                      <Grid container gap={"15px"}>
                        <Grid item>
                          <Typography sx={{ color: "#1A1A1A", opacity: 1 }}>
                            Billing Address
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <Checkbox
                            onChange={handleSameAsField}
                            checked={isSameAsPhysicalAddress}
                            sx={{
                              padding: 0,
                              color: "#1A1A1A33",
                              "& .MuiSvgIcon-root": {
                                fontSize: 20,
                              },
                            }}
                          />
                          <Typography
                            sx={{ color: "#1A1A1A80", fontSize: "14px" }}
                          >
                            Same as Physical Address
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} mt={2}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <CustomFormLabel label="Address Line 1" />
                          <InputBase
                            fullWidth
                            placeholder="Address 1"
                            value={
                              isSameAsPhysicalAddress
                                ? Formik?.values?.physicalAddress?.line1
                                : Formik.values?.billingAddress?.line1 || ""
                            }
                            name="billingAddress.line1"
                            disabled={isSameAsPhysicalAddress}
                            onChange={(e) => {
                              Formik.setFieldValue(
                                "billingAddress.line1",
                                e.target.value
                              );
                            }}
                            classes={{
                              root: classes.textFieldRoot,
                              input: classes.textFieldInput,
                              focused: classes.textFieldActive,
                              error: classes.inputBoxError,
                            }}
                          />
                          {Formik.errors.billingAddress && (
                            <FormHelperText error>
                              {Formik.errors.billingAddress.line1}
                            </FormHelperText>
                          )}
                        </Grid>
                        <Grid item xs={6}>
                          <CustomFormLabel label="Address Line 2" />
                          <InputBase
                            fullWidth
                            placeholder="Address 2"
                            value={
                              isSameAsPhysicalAddress
                                ? Formik?.values?.physicalAddress?.line2
                                : Formik.values?.billingAddress?.line2 || ""
                            }
                            name="billingAddress.line2"
                            disabled={isSameAsPhysicalAddress}
                            onChange={(e) =>
                              Formik.setFieldValue(
                                "billingAddress.line2",
                                e.target.value
                              )
                            }
                            classes={{
                              root: classes.textFieldRoot,
                              input: classes.textFieldInput,
                              focused: classes.textFieldActive,
                            }}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <CustomFormLabel label="City" />
                          <InputBase
                            fullWidth
                            value={
                              isSameAsPhysicalAddress
                                ? Formik?.values?.physicalAddress?.city
                                : Formik.values?.billingAddress?.city || ""
                            }
                            name="billingAddress.city"
                            disabled={isSameAsPhysicalAddress}
                            onChange={(e) =>
                              Formik.setFieldValue(
                                "billingAddress.city",
                                e.target.value
                              )
                            }
                            placeholder="City"
                            classes={{
                              root: classes.textFieldRoot,
                              input: classes.textFieldInput,
                              focused: classes.textFieldActive,
                              error: classes.inputBoxError,
                            }}
                          />
                          {Formik.errors.billingAddress?.city && (
                            <FormHelperText error>
                              {Formik.errors.billingAddress.city}
                            </FormHelperText>
                          )}
                        </Grid>
                        <Grid item xs={3}>
                          <CustomFormLabel label="State" />
                          <InputBase
                            fullWidth
                            placeholder="State"
                            value={
                              isSameAsPhysicalAddress
                                ? Formik?.values?.physicalAddress?.state
                                : Formik.values?.billingAddress?.state || ""
                            }
                            name="billingAddress.state"
                            // onChange={(e) =>
                            //   Formik.setFieldValue("billingAddress.city", e.target.value)
                            // }
                            disabled={isSameAsPhysicalAddress}
                            onBlur={Formik.handleBlur}
                            onChange={Formik.handleChange}
                            error={
                              !!(
                                Formik.errors.billingAddress?.state &&
                                Formik.touched.billingAddress?.state
                              )
                            }
                            classes={{
                              root: classes.textFieldRoot,
                              input: classes.textFieldInput,
                              focused: classes.textFieldActive,
                              error: classes.inputBoxError,
                            }}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <CustomFormLabel label="Country" />
                          <InputBase
                            fullWidth
                            name="billingAddress.country"
                            onChange={(e) =>
                              Formik.setFieldValue(
                                "billingAddress.country",
                                e.target.value
                              )
                            }
                            value={
                              isSameAsPhysicalAddress
                                ? Formik?.values?.physicalAddress?.country
                                : Formik.values?.billingAddress?.country || ""
                            }
                            placeholder="Country"
                            disabled={isSameAsPhysicalAddress}
                            classes={{
                              root: classes.textFieldRoot,
                              input: classes.textFieldInput,
                              focused: classes.textFieldActive,
                              error: classes.inputBoxError,
                            }}
                          />
                          {Formik.errors.billingAddress?.country && (
                            <FormHelperText error>
                              {Formik.errors.billingAddress?.country}
                            </FormHelperText>
                          )}
                        </Grid>
                        <Grid item xs={3}>
                          <CustomFormLabel label="Zip Code" />
                          <InputBase
                            fullWidth
                            placeholder="Zip Code"
                            value={
                              isSameAsPhysicalAddress
                                ? Formik?.values?.physicalAddress?.zipcode
                                : Formik.values?.billingAddress?.zipcode || ""
                            }
                            name="billingAddress.zipcode"
                            disabled={isSameAsPhysicalAddress}
                            onChange={(e) =>
                              Formik.setFieldValue(
                                "billingAddress.zipcode",
                                e.target.value
                              )
                            }
                            classes={{
                              root: classes.textFieldRoot,
                              input: classes.textFieldInput,
                              focused: classes.textFieldActive,
                              error: classes.inputBoxError,
                            }}
                          />
                          {Formik.errors.billingAddress?.zipcode && (
                            <FormHelperText error>
                              {Formik.errors.billingAddress.zipcode}
                            </FormHelperText>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} mt={2}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography
                    sx={{ color: "#1B5984", opacity: 1, fontWeight: 600 }}
                  >
                    Location Working Hours
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  mt={2}
                  sx={{
                    boxShadow: "0px 0px 6px #00000029",
                    borderRadius: "5px",
                    opacity: 1,
                  }}
                >
                  <Grid container p={3}>
                    {/* <Grid item>
                          <Typography sx={{ color: "#1A1A1A" }}>
                            {" "}
                            Provider Group Office Hours
                          </Typography>
                        </Grid> */}
                    <Grid item xs={12} mt={2}>
                      <Box sx={sxs.hoursParentContainer}>
                        <Box>
                          <Box sx={{ display: "flex", gap: "18rem" }}>
                            <Box>
                              <Grid container>
                                <Grid item xs={12} sm={4}>
                                  {/* <CustomFormLabel label="Open Time" /> */}
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                  <CustomFormLabel label="Open Time" />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                  <CustomFormLabel label="Close Time" />
                                </Grid>
                              </Grid>
                              <Box sx={sxs.hoursGroupContainer}>
                                <Box
                                  sx={{
                                    ...sxs.dayBoxStyle,
                                    backgroundColor: hoursSelect.MONDAY
                                      ? sxs.dayColor.background
                                      : null,
                                    color: hoursSelect.MONDAY
                                      ? sxs.dayColor.color
                                      : null,
                                  }}
                                  onClick={() =>
                                    handleActiveDayOfWeek(
                                      PracticeHour.dayOfWeek.MONDAY
                                    )
                                  }
                                >
                                  M
                                </Box>

                                <Box sx={sxs.textFieldsHoursStyle}>
                                  <TextField
                                    id="time-input"
                                    fullWidth
                                    sx={{
                                      "& .MuiOutlinedInput-input": {
                                        padding: "8px 4px",
                                        resize: "none",
                                      },
                                    }}
                                    type={"time"}
                                    placeholder="Open Time"
                                    InputProps={{
                                      classes: {
                                        root: classes.hoursInputField,
                                        input: classes.hoursInputTextBox,
                                        focused: classes.textFieldActive,
                                      },
                                    }}
                                    value={
                                      practiceHours.find(
                                        (res) =>
                                          res.dayOfWeek ==
                                          PracticeHour.dayOfWeek.MONDAY
                                      )?.openingTime
                                    }
                                    onChange={(e) => {
                                      handleTimeChange(
                                        PracticeHour.dayOfWeek.MONDAY,
                                        e.target.value,
                                        "openingTime"
                                      );
                                    }}
                                    disabled={!hoursSelect.MONDAY}
                                  />
                                  <TextField
                                    fullWidth
                                    sx={{
                                      "& .MuiOutlinedInput-input": {
                                        padding: "8px 4px",
                                        resize: "none",
                                      },
                                    }}
                                    type="time"
                                    InputProps={{
                                      classes: {
                                        root: classes.hoursInputField,
                                        input: classes.hoursInputTextBox,
                                        focused: classes.textFieldActive,
                                      },
                                    }}
                                    onChange={(e) => {
                                      handleTimeChange(
                                        PracticeHour.dayOfWeek.MONDAY,
                                        e.target.value,
                                        "closingTime"
                                      );
                                    }}
                                    value={
                                      practiceHours.find(
                                        (res) =>
                                          res.dayOfWeek ==
                                          PracticeHour.dayOfWeek.MONDAY
                                      )?.closingTime
                                    }
                                    disabled={!hoursSelect.MONDAY}
                                  />
                                </Box>
                              </Box>
                              <Box sx={sxs.hoursGroupContainer}>
                                <Box
                                  sx={{
                                    ...sxs.dayBoxStyle,
                                    backgroundColor: hoursSelect.TUESDAY
                                      ? sxs.dayColor.background
                                      : null,
                                    color: hoursSelect.TUESDAY
                                      ? sxs.dayColor.color
                                      : null,
                                  }}
                                  onClick={() =>
                                    handleActiveDayOfWeek(
                                      PracticeHour.dayOfWeek.TUESDAY
                                    )
                                  }
                                >
                                  T
                                </Box>

                                <Box sx={sxs.textFieldsHoursStyle}>
                                  <TextField
                                    fullWidth
                                    sx={{
                                      "& .MuiOutlinedInput-input": {
                                        padding: "8px 4px",
                                        resize: "none",
                                      },
                                    }}
                                    type="time"
                                    InputProps={{
                                      classes: {
                                        root: classes.hoursInputField,
                                        input: classes.hoursInputTextBox,
                                        focused: classes.textFieldActive,
                                      },
                                    }}
                                    onChange={(e) => {
                                      handleTimeChange(
                                        PracticeHour.dayOfWeek.TUESDAY,
                                        e.target.value,
                                        "openingTime"
                                      );
                                    }}
                                    value={
                                      practiceHours.find(
                                        (res) =>
                                          res.dayOfWeek ==
                                          PracticeHour.dayOfWeek.TUESDAY
                                      )?.openingTime
                                    }
                                    disabled={!hoursSelect.TUESDAY}
                                  />
                                  <TextField
                                    fullWidth
                                    sx={{
                                      "& .MuiOutlinedInput-input": {
                                        padding: "8px 4px",
                                        resize: "none",
                                      },
                                    }}
                                    type="time"
                                    InputProps={{
                                      classes: {
                                        root: classes.hoursInputField,
                                        input: classes.hoursInputTextBox,
                                        focused: classes.textFieldActive,
                                      },
                                    }}
                                    onChange={(e) => {
                                      handleTimeChange(
                                        PracticeHour.dayOfWeek.TUESDAY,
                                        e.target.value,
                                        "closingTime"
                                      );
                                    }}
                                    value={
                                      practiceHours.find(
                                        (res) =>
                                          res.dayOfWeek ==
                                          PracticeHour.dayOfWeek.TUESDAY
                                      )?.closingTime
                                    }
                                    disabled={!hoursSelect.TUESDAY}
                                  />
                                </Box>
                              </Box>

                              <Box sx={sxs.hoursGroupContainer}>
                                <Box
                                  sx={{
                                    ...sxs.dayBoxStyle,
                                    backgroundColor: hoursSelect.WEDNESDAY
                                      ? sxs.dayColor.background
                                      : null,
                                    color: hoursSelect.WEDNESDAY
                                      ? sxs.dayColor.color
                                      : null,
                                  }}
                                  onClick={() =>
                                    handleActiveDayOfWeek(
                                      PracticeHour.dayOfWeek.WEDNESDAY
                                    )
                                  }
                                >
                                  W
                                </Box>

                                <Box sx={sxs.textFieldsHoursStyle}>
                                  <TextField
                                    fullWidth
                                    sx={{
                                      "& .MuiOutlinedInput-input": {
                                        padding: "8px 4px",
                                        resize: "none",
                                      },
                                    }}
                                    type="time"
                                    InputProps={{
                                      classes: {
                                        root: classes.hoursInputField,
                                        input: classes.hoursInputTextBox,
                                        focused: classes.textFieldActive,
                                      },
                                    }}
                                    onChange={(e) => {
                                      handleTimeChange(
                                        PracticeHour.dayOfWeek.WEDNESDAY,
                                        e.target.value,
                                        "openingTime"
                                      );
                                    }}
                                    value={
                                      practiceHours.find(
                                        (res) =>
                                          res.dayOfWeek ==
                                          PracticeHour.dayOfWeek.WEDNESDAY
                                      )?.openingTime
                                    }
                                    disabled={!hoursSelect.WEDNESDAY}
                                  />
                                  <TextField
                                    fullWidth
                                    sx={{
                                      "& .MuiOutlinedInput-input": {
                                        padding: "8px 4px",
                                        resize: "none",
                                      },
                                    }}
                                    type="time"
                                    InputProps={{
                                      classes: {
                                        root: classes.hoursInputField,
                                        input: classes.hoursInputTextBox,
                                        focused: classes.textFieldActive,
                                      },
                                    }}
                                    onChange={(e) => {
                                      handleTimeChange(
                                        PracticeHour.dayOfWeek.WEDNESDAY,
                                        e.target.value,
                                        "closingTime"
                                      );
                                    }}
                                    value={
                                      practiceHours.find(
                                        (res) =>
                                          res.dayOfWeek ==
                                          PracticeHour.dayOfWeek.WEDNESDAY
                                      )?.closingTime
                                    }
                                    disabled={!hoursSelect.WEDNESDAY}
                                  />
                                </Box>
                              </Box>

                              <Box sx={sxs.hoursGroupContainer}>
                                <Box
                                  sx={{
                                    ...sxs.dayBoxStyle,
                                    backgroundColor: hoursSelect.THURSDAY
                                      ? sxs.dayColor.background
                                      : null,
                                    color: hoursSelect.THURSDAY
                                      ? sxs.dayColor.color
                                      : null,
                                  }}
                                  onClick={() =>
                                    handleActiveDayOfWeek(
                                      PracticeHour.dayOfWeek.THURSDAY
                                    )
                                  }
                                >
                                  T
                                </Box>

                                <Box sx={sxs.textFieldsHoursStyle}>
                                  <TextField
                                    fullWidth
                                    sx={{
                                      "& .MuiOutlinedInput-input": {
                                        padding: "8px 4px",
                                        resize: "none",
                                      },
                                    }}
                                    type="time"
                                    InputProps={{
                                      classes: {
                                        root: classes.hoursInputField,
                                        input: classes.hoursInputTextBox,
                                        focused: classes.textFieldActive,
                                      },
                                    }}
                                    onChange={(e) => {
                                      handleTimeChange(
                                        PracticeHour.dayOfWeek.THURSDAY,
                                        e.target.value,
                                        "openingTime"
                                      );
                                    }}
                                    value={
                                      practiceHours.find(
                                        (res) =>
                                          res.dayOfWeek ==
                                          PracticeHour.dayOfWeek.THURSDAY
                                      )?.openingTime
                                    }
                                    disabled={!hoursSelect.THURSDAY}
                                  />
                                  <TextField
                                    fullWidth
                                    sx={{
                                      "& .MuiOutlinedInput-input": {
                                        padding: "8px 4px",
                                        resize: "none",
                                      },
                                    }}
                                    type="time"
                                    InputProps={{
                                      classes: {
                                        root: classes.hoursInputField,
                                        input: classes.hoursInputTextBox,
                                        focused: classes.textFieldActive,
                                      },
                                    }}
                                    onChange={(e) => {
                                      handleTimeChange(
                                        PracticeHour.dayOfWeek.THURSDAY,
                                        e.target.value,
                                        "closingTime"
                                      );
                                    }}
                                    value={
                                      practiceHours.find(
                                        (res) =>
                                          res.dayOfWeek ==
                                          PracticeHour.dayOfWeek.THURSDAY
                                      )?.closingTime
                                    }
                                    disabled={!hoursSelect.THURSDAY}
                                  />
                                </Box>
                              </Box>
                            </Box>
                            <Box>
                              <Grid container>
                                <Grid item xs={12} sm={4}>
                                  {/* <CustomFormLabel label="Open Time" /> */}
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                  <CustomFormLabel label="Open Time" />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                  <CustomFormLabel label="Close Time" />
                                </Grid>
                              </Grid>
                              <Box sx={sxs.hoursGroupContainer}>
                                <Box
                                  sx={{
                                    ...sxs.dayBoxStyle,
                                    backgroundColor: hoursSelect.FRIDAY
                                      ? sxs.dayColor.background
                                      : null,
                                    color: hoursSelect.FRIDAY
                                      ? sxs.dayColor.color
                                      : null,
                                  }}
                                  onClick={() =>
                                    handleActiveDayOfWeek(
                                      PracticeHour.dayOfWeek.FRIDAY
                                    )
                                  }
                                >
                                  F
                                </Box>

                                <Box sx={sxs.textFieldsHoursStyle}>
                                  <TextField
                                    fullWidth
                                    sx={{
                                      "& .MuiOutlinedInput-input": {
                                        padding: "8px 4px",
                                        resize: "none",
                                      },
                                    }}
                                    type="time"
                                    InputProps={{
                                      classes: {
                                        root: classes.hoursInputField,
                                        input: classes.hoursInputTextBox,
                                        focused: classes.textFieldActive,
                                      },
                                    }}
                                    onChange={(e) => {
                                      handleTimeChange(
                                        PracticeHour.dayOfWeek.FRIDAY,
                                        e.target.value,
                                        "openingTime"
                                      );
                                    }}
                                    value={
                                      practiceHours.find(
                                        (res) =>
                                          res.dayOfWeek ==
                                          PracticeHour.dayOfWeek.FRIDAY
                                      )?.openingTime
                                    }
                                    disabled={!hoursSelect.FRIDAY}
                                  />
                                  <TextField
                                    fullWidth
                                    sx={{
                                      "& .MuiOutlinedInput-input": {
                                        padding: "8px 4px",
                                        resize: "none",
                                      },
                                    }}
                                    type="time"
                                    InputProps={{
                                      classes: {
                                        root: classes.hoursInputField,
                                        input: classes.hoursInputTextBox,
                                        focused: classes.textFieldActive,
                                      },
                                    }}
                                    onChange={(e) => {
                                      handleTimeChange(
                                        PracticeHour.dayOfWeek.FRIDAY,
                                        e.target.value,
                                        "closingTime"
                                      );
                                    }}
                                    value={
                                      practiceHours.find(
                                        (res) =>
                                          res.dayOfWeek ==
                                          PracticeHour.dayOfWeek.FRIDAY
                                      )?.closingTime
                                    }
                                    disabled={!hoursSelect.FRIDAY}
                                  />
                                </Box>
                              </Box>

                              <Box sx={sxs.hoursGroupContainer}>
                                <Box
                                  sx={{
                                    ...sxs.dayBoxStyle,
                                    backgroundColor: hoursSelect.SATURDAY
                                      ? sxs.dayColor.background
                                      : null,
                                    color: hoursSelect.SATURDAY
                                      ? sxs.dayColor.color
                                      : null,
                                  }}
                                  onClick={() =>
                                    handleActiveDayOfWeek(
                                      PracticeHour.dayOfWeek.SATURDAY
                                    )
                                  }
                                >
                                  S
                                </Box>

                                <Box sx={sxs.textFieldsHoursStyle}>
                                  <TextField
                                    fullWidth
                                    sx={{
                                      "& .MuiOutlinedInput-input": {
                                        padding: "8px 4px",
                                        resize: "none",
                                      },
                                    }}
                                    type="time"
                                    InputProps={{
                                      classes: {
                                        root: classes.hoursInputField,
                                        input: classes.hoursInputTextBox,
                                        focused: classes.textFieldActive,
                                      },
                                    }}
                                    onChange={(e) => {
                                      handleTimeChange(
                                        PracticeHour.dayOfWeek.SATURDAY,
                                        e.target.value,
                                        "openingTime"
                                      );
                                    }}
                                    value={
                                      practiceHours.find(
                                        (res) =>
                                          res.dayOfWeek ==
                                          PracticeHour.dayOfWeek.SATURDAY
                                      )?.openingTime
                                    }
                                    disabled={!hoursSelect.SATURDAY}
                                  />
                                  <TextField
                                    fullWidth
                                    sx={{
                                      "& .MuiOutlinedInput-input": {
                                        padding: "8px 4px",
                                        resize: "none",
                                      },
                                    }}
                                    type="time"
                                    InputProps={{
                                      classes: {
                                        root: classes.hoursInputField,
                                        input: classes.hoursInputTextBox,
                                        focused: classes.textFieldActive,
                                      },
                                    }}
                                    onChange={(e) => {
                                      handleTimeChange(
                                        PracticeHour.dayOfWeek.SATURDAY,
                                        e.target.value,
                                        "closingTime"
                                      );
                                    }}
                                    value={
                                      practiceHours.find(
                                        (res) =>
                                          res.dayOfWeek ==
                                          PracticeHour.dayOfWeek.SATURDAY
                                      )?.closingTime
                                    }
                                    disabled={!hoursSelect.SATURDAY}
                                  />
                                </Box>
                              </Box>

                              <Box sx={sxs.hoursGroupContainer}>
                                <Box
                                  sx={{
                                    ...sxs.dayBoxStyle,
                                    backgroundColor: hoursSelect.SUNDAY
                                      ? sxs.dayColor.background
                                      : null,
                                    color: hoursSelect.SUNDAY
                                      ? sxs.dayColor.color
                                      : null,
                                  }}
                                  onClick={() =>
                                    handleActiveDayOfWeek(
                                      PracticeHour.dayOfWeek.SUNDAY
                                    )
                                  }
                                >
                                  S
                                </Box>

                                <Box sx={sxs.textFieldsHoursStyle}>
                                  <TextField
                                    fullWidth
                                    sx={{
                                      "& .MuiOutlinedInput-input": {
                                        padding: "8px 4px",
                                        resize: "none",
                                      },
                                    }}
                                    type="time"
                                    InputProps={{
                                      classes: {
                                        root: classes.hoursInputField,
                                        input: classes.hoursInputTextBox,
                                        focused: classes.textFieldActive,
                                      },
                                    }}
                                    onChange={(e) => {
                                      handleTimeChange(
                                        PracticeHour.dayOfWeek.SUNDAY,
                                        e.target.value,
                                        "openingTime"
                                      );
                                    }}
                                    value={
                                      practiceHours.find(
                                        (res) =>
                                          res.dayOfWeek ==
                                          PracticeHour.dayOfWeek.SUNDAY
                                      )?.openingTime
                                    }
                                    disabled={!hoursSelect.SUNDAY}
                                  />
                                  <TextField
                                    fullWidth
                                    sx={{
                                      "& .MuiOutlinedInput-input": {
                                        padding: "8px 4px",
                                        resize: "none",
                                      },
                                    }}
                                    type="time"
                                    InputProps={{
                                      classes: {
                                        root: classes.hoursInputField,
                                        input: classes.hoursInputTextBox,
                                        focused: classes.textFieldActive,
                                      },
                                    }}
                                    onChange={(e) => {
                                      handleTimeChange(
                                        PracticeHour.dayOfWeek.SUNDAY,
                                        e.target.value,
                                        "closingTime"
                                      );
                                    }}
                                    value={
                                      practiceHours.find(
                                        (res) =>
                                          res.dayOfWeek ==
                                          PracticeHour.dayOfWeek.SUNDAY
                                      )?.closingTime
                                    }
                                    disabled={!hoursSelect.SUNDAY}
                                  />
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <DialogActions sx={formBottom}>
            <Grid sx={actionBtns}>
              <ButtonBase
                onClick={handleClose}
                sx={formButtonStyle.cancelButtonStyle}
              >
                Cancel
              </ButtonBase>
              <ButtonBase
                type="submit"
                sx={formButtonStyle.saveButtonStyle}
                disabled={Formik.isSubmitting}
              >
                {props.locationId ? SAVE : ADD}
              </ButtonBase>
            </Grid>
          </DialogActions>
        </Grid>
      </Grid>
      <Grid xs={12}>
        <Dialog
          maxWidth="sm"
          fullWidth={true}
          onClose={handleClosedSpecialityDialog}
          open={openDialog}
        >
          <DialogTitle>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography>{"Enter speciality"}</Typography>
              <CloseIcon
                sx={{ cursor: "pointer" }}
                onClick={handleClosedSpecialityDialog}
              />
            </Box>
          </DialogTitle>
          <form>
            <DialogContent>
              <Grid mx={2} py={3}>
                <InputBase
                  fullWidth
                  // onChange={(
                  //   event: React.ChangeEvent<
                  //     HTMLTextAreaElement | HTMLInputElement
                  //   >
                  // ) => {
                  //   handleChangeSpecialityOption(event);
                  // }}
                  placeholder="Speciality"
                  name="name"
                  value={formikData.values.name}
                  onBlur={formikData.handleBlur}
                  onChange={formikData.handleChange}
                  error={!!(formikData.touched.name && formikData.errors.name)}
                  classes={{
                    root: classes.textFieldRoot,
                    input: classes.textFieldInput,
                    focused: classes.textFieldActive,
                    error: classes.inputBoxError,
                  }}
                />
                {formikData.touched.name && formikData.errors.name && (
                  <FormHelperText error>
                    {formikData.errors.name}
                  </FormHelperText>
                )}
              </Grid>
            </DialogContent>
            <DialogActions>
              <ButtonBase
                // onClick={addSpecilityOption}
                onClick={formikData.submitForm}
                sx={formButtonStyle.saveButtonStyle}
              >
                {"Add"}
              </ButtonBase>
            </DialogActions>
          </form>
        </Dialog>
      </Grid>
    </form>
  );
};

export default LocationModal;
