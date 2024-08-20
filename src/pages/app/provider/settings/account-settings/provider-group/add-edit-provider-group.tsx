import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Box,
  Button,
  ButtonBase,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  InputBase,
  ListItemText,
  MenuItem,
  // OutlinedInput,
  Select,
  // SelectChangeEvent,
  // SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useRef, useState } from "react";
import CustomFormLabel from "../../../../../../components/common/custom-form-label";
import ImageSelector from "../../../../../../components/common/image-upload";
import { backIcon, backToText } from "../../../../../../styles/auth-form";
import FormInput from "../../../../../../components/common/atom/FormInput";
import * as Yup from "yup";
import {
  actionBtns,
  commonWidget,
  formBottom,
  formButtonStyle,
} from "../../../../../../styles/common";
import { useFormik } from "formik";
import { selectInputStyle } from "../../../../admin/new-master/data-import/view-patient-record";
import {
  useProviderGroupControllerServiceAddSpecialities,
  useProviderGroupControllerServiceCreateProviderGroup,
  useProviderGroupControllerServiceGetAllCurrencies,
  useProviderGroupControllerServiceGetAllSpecialities,
  useProviderGroupControllerServiceGetProviderGroupById,
  useProviderGroupControllerServiceGetStates,
  useProviderGroupControllerServiceUpdateProviderGroup,
} from "../../../../../../sdk/thinkemr-core-0.0.1/queries";
import {
  PracticeHour,
  Speciality,
} from "../../../../../../sdk/thinkemr-core-0.0.1/requests";
import Loading from "../../../../../../components/common/spinner/loading";
import { useDispatch } from "react-redux";
// import { setAlert } from "../../../../../../redux/actions/snackbar/alert.action";
import { ErrorResponseEntity } from "../../../../../../components/common/enums-and-interfaces/interfaces";
import { adminConstants } from "../../../../../../constants/admin";
import { alertAction } from "../../../../../../store/features/common-actions/snackbar/alertSlice";
import { PortalName } from "../../../../../../components/common/form-enum";
import CloseIcon from "@mui/icons-material/Close";
import { addEditProviderStyle } from "../../../../../../components/core/add-edit-provider-user/add-edit-provider-user";

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

function AddEditProviderGroupData({
  onCloseDrawer,
  title,
  providerGroupUuid,
  source,
}: {
  onCloseDrawer: () => void;
  title: string;
  providerGroupUuid?: string;
  source?: string;
}) {
  const classes = commonWidget();
  const styleClass = style();
  const dispatch = useDispatch();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 3.5 + ITEM_PADDING_TOP,
        width: 50,
      },
    },
  };

  const [openDialogForOption, setOpenDialogForOption] = useState(false);

  const [initialValues] = useState({
    active: true,
    archive: false,
    id: "",
    uuid: "",
    avatar: null,
    newAvatar: null,
    subdomain: "",
    email: "",
    name: "",
    npi: null,
    portalName: "",
    specialities: [],
    workingHours: [],
    phone: "",
    fax: "",
    website: "",
    description: "",
    currencies: {
      id: "",
      name: "",
    },
    physicalAddress: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
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

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter the valid email")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter the valid email"
      )
      .required("Please enter the valid email"),
    name: Yup.string()
      .trim()
      .min(2, "Provider Group Name must be at least two characters long")
      .required("Please enter the provider group name")
      .matches(/^[a-zA-Z0-9\s]*$/, "Please enter valid provider group name"),
    // npi: Yup.string()
    //   .required("Please enter the group NPI number")
    //   .matches(/^\d+$/, "Please enter the valid group NPI number")
    //   .min(10, "Group NPI number should be at least 10 digits")
    //   .max(10, "Group NPI number should not exceed 10 digits"),
    specialities: Yup.mixed(),
    // workingHours: Yup.array().required(""),
    phone: Yup.string()
      .required("Please enter the valid contact number")
      .matches(/^\d+$/, "Please enter the valid contact number")
      .matches(/^[1-9]\d+$/, "Contact number will not start with zero")
      .min(10, "Contact number should be at least 10 digits")
      .max(10, "Contact number should not exceed 10 digits"),
    // avatar: Yup.mixed().test('fileFormat', 'Invalid file format', (value:any) => {
    //   console.log("value ::",value);

    //   if (!value) {
    //     return true;
    //   }

    //   // const supportedFormats = ['.jpeg', '.png', '.jpg'];

    //   // return supportedFormats.includes(value.type);
    // }),
    // avatar: Yup.string().notRequired()
    // physicalAddress: Yup.object().shape({
    //   line1: Yup.string().trim().min(3, 'Line1 Required').required("Line1 Required").max(32, 'Limit exceeded'),
    //   line2: Yup.string().trim().min(3, 'Line2 Required').max(32, 'Limit exceeded'),
    //   city: Yup.string().trim().min(2, 'City Required')
    //     .required("City Required")
    //     .matches(/^[A-Za-z]+$/, "City should contain only characters")
    //     .max(32, 'Limit exceeded'),
    //   state: Yup.string().required("State Required"),
    //   country: Yup.string().trim().min(2, 'Country Required')
    //     .required("Country Required")
    //     .matches(/^[A-Za-z]+$/, "Country should contain only characters")
    //     .max(32, 'Limit exceeded'),
    //   zipcode: Yup.string()
    //     .trim().min(5, 'Zipcode Required')
    //     .required("Zip Code Required")
    //     .matches(/^[0-9]+$/, "Zip Code should contain only numeric digits")
    //     .min(5, 'Invalid Zip Code')
    //     .max(10, 'Invalid Zip Code')
    // }),
    portalName: Yup.string().required("Portal Required"),
    // billingAddress: Yup.object().shape({
    //   zipcode: Yup.string().min(5, 'Invalid Zip Code')
    //     .max(5, 'Invalid Zip Code')
    // }),
    fax: Yup.string()
      .max(20, "Fax number should not exceed 20 digits")
      .matches(/^[0-9+-]+$/, "Fax number should contain only digits"),
    physicalAddress: Yup.object().shape({
      line1: Yup.string()
        .required("Please enter the address")
        .matches(/^[a-zA-Z0-9\s,/]*$/, "Please enter the valid address"),
      city: Yup.string()
        .required("Please enter the city name")
        .trim()
        .min(2, "City must be at least two characters long")
        .matches(/^[A-Za-z ]+$/, "Please enter the valid city name"),
      state: Yup.string()
        .required("Please enter the state name")
        .trim()
        .min(2, "State must be at least two characters long")
        .matches(/^[A-Za-z ]+$/, "Please enter the valid state name"),
      country: Yup.string()
        .required("Please enter the country name")
        .trim()
        .min(2, "Please enter the valid country name")
        .matches(
          /^[A-Za-z ]+$/,
          "Country should contain only letters and spaces"
        ),
      // zipcode: Yup.string().required("Please enter the zip code"),
      // .matches(/^[0-9]+$/, "Zip Code should contain only digits")
      // .min(5, "Invalid Zip Code")
      // .max(5, "Invalid Zip Code"),
    }),
  });

  const [specialities, setSpecialities] = useState<any[]>([]);
  // const [otherSpecilityVal, setOtherSpecialityVal] = useState<{}>();
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
  const [hoursSelect, setHoursSelect] = useState({
    MONDAY: true,
    TUESDAY: true,
    WEDNESDAY: true,
    THURSDAY: true,
    FRIDAY: true,
    SATURDAY: true,
    SUNDAY: true,
  });
  const [specialitiesList, setSpecilaityType] = useState<any[]>([]);
  const [states, setState] = useState<any[]>([]);
  const selectRef = useRef(null);
  const [providerGroupSpecialities, setProviderGroupSpecialities] = useState<
    any[]
  >([]);
  const [isSameAsPhysicalAddress, setIsSameAsPhysicalAddress] =
    useState<boolean>(false);
  const [currencies, setCurrencies] = useState<any[]>([]);
  const {
    mutateAsync,
    isSuccess,
    error,
    isError: isPostError,
  } = providerGroupUuid
    ? useProviderGroupControllerServiceUpdateProviderGroup()
    : useProviderGroupControllerServiceCreateProviderGroup();

  const editData: any = providerGroupUuid
    ? useProviderGroupControllerServiceGetProviderGroupById({
        uuid: providerGroupUuid,
      })
    : null;

  const [specialitiesPagination, setSpecialitiesPagination] = useState({
    page: 0,
    size: 10,
  });
  const {
    data: allCurrencies,
    isLoading: isCurrenciesLoading,
    isError: isCurrenciesError,
  } = useProviderGroupControllerServiceGetAllCurrencies({ page: 0, size: 10 });
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

  useEffect(() => {
    if (!isCurrenciesLoading && !isCurrenciesError && allCurrencies?.data) {
      setCurrencies(allCurrencies.data?.content || []);
    }
  }, [allCurrencies?.data, isCurrenciesLoading]);

  useEffect(() => {
    if (isSuccess) {
      onCloseDrawer();
    }
  }, [isSuccess]);

  useEffect(() => {
    if ((error as ErrorResponseEntity)?.body.message)
      dispatch(
        alertAction.setAlert({
          open: true,
          message: (error as ErrorResponseEntity)?.body?.message,
          severity: "error",
        })
      );
  }, [isPostError]);

  useEffect(() => {
    if (editData?.data?.data) {
      handleEdit(editData.data.data);
    }
  }, [editData?.data?.data]);

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

  const handleEdit = (providerGroup: any) => {
    if (providerGroup) {
      setSpecialities(() => [
        ...providerGroup.specialities.map((res: any) => res.name),
      ]);
      setProviderGroupSpecialities(providerGroup.specialities);
      // providerGroup.specialities.map((res: any) => {
      //   if(!specialities.some(res => res.name)) specialities.push(res.name);
      // })
      formik.setFieldValue("email", providerGroup.email);
      if (
        checkIfSameAsPhysicalAddress(
          providerGroup.billingAddress,
          providerGroup.physicalAddress
        )
      )
        setIsSameAsPhysicalAddress(true);
      // setPracticeHours(providerGroup.workingHours || []);
      providerGroup.workingHours.map((res: PracticeHour) => {
        const matchingPracticeHour: any = practiceHours.find(
          (res1) => res.dayOfWeek === res1.dayOfWeek
        );
        if (matchingPracticeHour) {
          matchingPracticeHour.id = res.id;
          matchingPracticeHour.openingTime = res.openingTime;
          matchingPracticeHour.closingTime = res.closingTime;
        }
      });
      Object.keys(providerGroup).map((res: any) => {
        if (res !== "billingAddress")
          formik.setFieldValue(res, providerGroup[res]);
        else {
          if (providerGroup[res]) formik.setFieldValue(res, providerGroup[res]);
        }
      });
    }
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

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    if (values.physicalAddress.zipcode === "") {
      values.physicalAddress.zipcode = null;
    }
    if (values.npi === "") {
      values.npi = null;
    }
    values.subdomain = values.name.trim();
    values.workingHours = practiceHours.filter((res) => res.openingTime);
    values.specialities = [];
    specialities.map((res: any) => {
      values.specialities.push(getObject(res));
    });
    if (isSameAsPhysicalAddress) {
      if (values.billingAddress === null) values.billingAddress = null;
      let id = values.billingAddress?.id || "";
      Object.assign(values.billingAddress, values.physicalAddress);
      values.billingAddress.id = id;
    } else {
      values.billingAddress = null;
    }
    let payload = { ...values };

    if (source === "Edit") {
      payload.newAvatar = payload?.newAvatar?.split(",")[1];
    } else {
      payload.avatar = payload?.avatar?.split(",")[1];
    }
    // if (
    //   !isBillingAddressFilled(values.billingAddress) &&
    //   !isSameAsPhysicalAddress
    // )
    //   values.billingAddress = null;
    // console.log('Form values:', values);
    try {
      mutateAsync({ requestBody: payload })
        .then((res: any) => {
          onCloseDrawer();
          dispatch(
            alertAction.setAlert({
              open: true,
              message: res.message,
              severity: "success",
            })
          );
        })
        .catch(() => {});
    } catch (_error) {}
    setSubmitting(false);
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
      setOpenDialogForOption((item) => !item);
    }

    // setSpecialities(typeof value === "string" ? value.split(",") : value);
  };

  const { mutateAsync: addSpecialitisMutateAsync } =
    useProviderGroupControllerServiceAddSpecialities();

  const handleChangeOther = (name: string) => {
    if (name === "Other") {
      setOpenDialogForOption((item) => !item);
    }
  };

  // const handleChangeSpecialityOption = (event: any) => {
  //   setOtherSpecialityVal(event.target.value as string);
  // };

  // const addSpecilityOption = async () => {
  //   const otherOption: Speciality = {
  //     name: otherSpecilityVal as string,
  //   };
  //   try {
  //     if (otherSpecilityVal) {
  //       await addSpecialitisMutateAsync({
  //         requestBody: otherOption,
  //       })
  //         .then((res: any) => {
  //           // onCloseDrawer();
  //           // if (res?.status >= 200 && res.status <= 299) {
  //           dispatch(
  //             alertAction.setAlert({
  //               open: true,
  //               message: res.message,
  //               severity: "success",
  //             })
  //           );
  // } else if (res?.status >= 299) {
  //   dispatch(
  //     alertAction.setAlert({
  //       open: true,
  //       message: res?.message || "",
  //       severity: "error",
  //     })
  //   );
  // }
  //         })
  //         .catch(() => {});
  //     }
  //   } catch {}
  //   setOpenDialogForOption((item) => !item);
  // };

  const handleProfileImg = (event: any) => {
    formik.setFieldValue(source === "Edit" ? "newAvatar" : "avatar", event);
  };

  function getObject(type: string) {
    return (
      specialitiesList.find((res) => res.name === type) ||
      providerGroupSpecialities.find((res) => res.name === type)
    );
  }

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

  async function handleMenuScroll(event: any) {
    const selectMenu: any = selectRef.current;
    const isNearBottom =
      event.target.scrollTop + event.target.clientHeight >=
      event.target.scrollHeight - 1;
    if (selectMenu && isNearBottom && !isLoading) {
      setSpecialitiesPagination((prev) => ({
        ...prev,
        size: specialitiesPagination.size + 100,
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

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) =>
      handleSubmit(values, { setSubmitting }),
  });

  const handleCloseDialog = () => {
    setOpenDialogForOption((item) => !item);
    formikData.resetForm();
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
    handleCloseDialog();
  };

  const formikData = useFormik({
    initialValues: initilalSpecialities,
    validationSchema: validationSchemaForSpec,
    onSubmit: handleAddNewSpecialities,
  }) as any;

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        p={2}
        style={{
          width: "65vw",
          overflowX: "hidden",
          height: "100vh",
          backgroundColor: "#F5F6F9",
        }}
      >
        <Grid item>
          <Grid container justifyContent={"space-between"} mb={2}>
            <Grid item>
              <Typography sx={sxs.title}>{title}</Typography>
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <ArrowBackIosIcon sx={backIcon} />
              <Typography onClick={onCloseDrawer} sx={backToText}>
                Back
              </Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={2.7}>
                  <CustomFormLabel label="Add Provider Group Logo" />
                  <ImageSelector
                    existingProfileImage={formik.values.avatar}
                    setProfileImage={handleProfileImg}
                  />
                </Grid>
                <Grid item xs={9.3}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <CustomFormLabel
                        label="Provider Group Name"
                        isRequired={true}
                      />
                      <InputBase
                        fullWidth
                        name="name"
                        value={formik.values?.name}
                        sx={{ marginRight: "-10px !important" }}
                        // onChange={(e) =>
                        //   formik.setFieldValue("name", e.target.value)
                        // }
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={!!(formik.errors.name && formik.touched.name)}
                        placeholder="Enter Provider Group Name"
                        classes={{
                          root: classes.textFieldRoot,
                          input: classes.textFieldInput,
                          focused: classes.textFieldActive,
                          error: classes.inputBoxError,
                        }}
                      />
                      {formik.touched.name && formik.errors.name && (
                        <FormHelperText error>
                          {formik.errors.name}
                        </FormHelperText>
                      )}
                    </Grid>

                    <Grid item xs={6}>
                      <CustomFormLabel
                        label="Contact Number"
                        isRequired={true}
                      />
                      <InputBase
                        fullWidth
                        name="phone"
                        placeholder="Enter Contact Number"
                        value={formik.values?.phone}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={!!(formik.errors.phone && formik.touched.phone)}
                        classes={{
                          root: classes.textFieldRoot,
                          input: classes.textFieldInput,
                          focused: classes.textFieldActive,
                          error: classes.inputBoxError,
                        }}
                      />
                      {formik.touched.phone && formik.errors.phone && (
                        <FormHelperText error>
                          {formik.errors.phone}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      <CustomFormLabel
                        label="Speciality Type"
                        isRequired={false}
                      />
                      <Select
                        id="demo-multiple-name"
                        displayEmpty
                        ref={selectRef}
                        onScrollCapture={handleMenuScroll}
                        multiple
                        name="specialities"
                        fullWidth
                        value={specialities}
                        size="small"
                        sx={{
                          ...selectInputStyle,
                          height: "40px !important",
                        }}
                        placeholder="Select Speciality"
                        onChange={handleChange}
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
                          } else {
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
                          }
                        }}
                        MenuProps={MenuProps}
                      >
                        {/* {!isLoading &&
                          specialitiesList.length !== 0 &&
                          specialitiesList.map((item: any) => (
                            <MenuItem
                              key={item.id}
                              value={item.name}
                              onClick={() => handleChangeOther(item.name)}
                            >
                              {item.name}
                            </MenuItem>
                          ))} */}
                        {!isLoading &&
                          specialitiesList.length !== 0 &&
                          specialitiesList?.map((speciality: any) => (
                            <MenuItem
                              key={speciality.id}
                              value={speciality.name}
                            >
                              {speciality.name !== "Add new speciality" && (
                                <Checkbox
                                  checked={
                                    specialities.indexOf(speciality.name) > -1
                                  }
                                  sx={addEditProviderStyle.checkBoxStyle}
                                />
                              )}
                              <ListItemText
                                primary={speciality.name}
                                sx={addEditProviderStyle.selectPlaceHolderStyle}
                              />
                            </MenuItem>
                          ))}
                        {isLoading && (
                          <MenuItem
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            {" "}
                            <Loading />{" "}
                          </MenuItem>
                        )}
                      </Select>
                      {/* onBlur={formik.handleBlur}
                         classes={{
                           error: classes.inputBoxError,
                         }}
                         error={
                           !!(
                             !specialities.length && formik.touched.specialities
                           )
                         } */}
                      {/* {formik.touched.specialities && !specialities.length && (
                        <FormHelperText error>
                          {"Specialities Required"}
                        </FormHelperText>
                      )} */}
                    </Grid>
                    <Grid item xs={6}>
                      <CustomFormLabel
                        label="Group NPI Number"
                        isRequired={false}
                      />
                      <InputBase
                        fullWidth
                        name="npi"
                        value={formik.values?.npi?formik.values?.npi:null}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={!!(formik.errors.npi && formik.touched.npi)}
                        placeholder="Enter Group NPI Number"
                        classes={{
                          root: classes.textFieldRoot,
                          input: classes.textFieldInput,
                          focused: classes.textFieldActive,
                          error: classes.inputBoxError,
                        }}
                      />
                      {formik.touched.npi && formik.errors.npi && (
                        <FormHelperText error>
                          {formik.errors.npi}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      <CustomFormLabel label="Email" isRequired={true} />
                      <InputBase
                        fullWidth
                        name="email"
                        value={formik.values?.email}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={!!(formik.errors.email && formik.touched.email)}
                        disabled={!!providerGroupUuid}
                        placeholder="Enter Email"
                        classes={{
                          root: classes.textFieldRoot,
                          input: classes.textFieldInput,
                          focused: classes.textFieldActive,
                          error: classes.inputBoxError,
                        }}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <FormHelperText error>
                          {formik.errors.email}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      <CustomFormLabel label="Website" />
                      <InputBase
                        fullWidth
                        name="website"
                        placeholder="Enter Website"
                        value={formik.values?.website}
                        onChange={formik.handleChange}
                        classes={{
                          root: classes.textFieldRoot,
                          input: classes.textFieldInput,
                          focused: classes.textFieldActive,
                          error: classes.inputBoxError,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomFormLabel label="Fax Number" isRequired={false} />
                      <InputBase
                        fullWidth
                        name="fax"
                        value={formik.values?.fax}
                        error={!!(formik.touched.fax && formik.errors.fax)}
                        // onChange={(e) =>
                        //   formik.setFieldValue("fax", e.target.value)
                        // }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter Fax Number"
                        classes={{
                          root: classes.textFieldRoot,
                          input: classes.textFieldInput,
                          focused: classes.textFieldActive,
                          error: classes.inputBoxError,
                        }}
                      />
                      {formik.touched.fax && formik.errors.fax && (
                        <FormHelperText error>
                          {formik.errors.fax}
                        </FormHelperText>
                      )}
                      {/* </Grid>
                      </Grid> */}
                    </Grid>
                    <Grid item xs={12}>
                      <CustomFormLabel label="Description" />
                      <InputBase
                        fullWidth
                        name="description"
                        placeholder="Enter Description"
                        value={formik.values?.description}
                        onChange={formik.handleChange}
                        classes={{
                          root: classes.textFieldRoot,
                          input: classes.textFieldInput,
                          focused: classes.textFieldActive,
                          error: classes.inputBoxError,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormInput
                        control="radio"
                        name="portalName"
                        label={"Portal"}
                        isError={
                          !!(
                            formik.touched.portalName &&
                            formik.errors.portalName
                          )
                        }
                        error={"Please select the portal"}
                        isRequired={true}
                        value={formik.values.portalName}
                        options={PortalName}
                        onChange={formik.handleChange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomFormLabel label="Currency" isRequired={true} />
                      <Select
                        name="currencies"
                        fullWidth
                        value={formik.values.currencies}
                        size="small"
                        sx={{
                          ...selectInputStyle,
                          height: "40px !important",
                        }}
                        placeholder="Select Speciality"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        classes={{
                          error: classes.inputBoxError,
                        }}
                        error={
                          !!(
                            formik.touched.currencies?.name &&
                            !formik.values.currencies?.name
                          )
                        }
                        // input={<OutlinedInput />}
                        renderValue={(selected) => {
                          if (!selected.name) {
                            return (
                              <span>
                                <Typography
                                  variant="h5"
                                  sx={{
                                    color: "#1A1A1A80 !important",
                                  }}
                                >
                                  Select Currency
                                </Typography>
                              </span>
                            );
                          } else {
                            return (
                              <Typography variant="h5">
                                {selected?.name}
                              </Typography>
                            );
                          }
                        }}
                        MenuProps={MenuProps}
                        displayEmpty
                      >
                        {!isCurrenciesLoading &&
                          currencies.length !== 0 &&
                          currencies.map((item: any) => (
                            <MenuItem key={item.id} value={item}>
                              {item.name}
                            </MenuItem>
                          ))}
                        {isLoading && (
                          <MenuItem
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            {" "}
                            <Loading />{" "}
                          </MenuItem>
                        )}
                      </Select>
                      {formik.touched.currencies?.name &&
                        !formik.values.currencies?.name && (
                          <FormHelperText error>
                            {"Please select the currency"}
                          </FormHelperText>
                        )}
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
                            error={
                              !!(
                                formik.errors.physicalAddress?.line1 &&
                                formik.touched.physicalAddress?.line1
                              )
                            }
                            value={formik.values?.physicalAddress?.line1}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            name="physicalAddress.line1"
                            classes={{
                              root: classes.textFieldRoot,
                              input: classes.textFieldInput,
                              focused: classes.textFieldActive,
                              error: classes.inputBoxError,
                            }}
                          />
                          {formik.touched.physicalAddress?.line1 &&
                            formik.errors.physicalAddress?.line1 && (
                              <FormHelperText error>
                                {formik.errors.physicalAddress?.line1}
                              </FormHelperText>
                            )}
                        </Grid>
                        <Grid item xs={6}>
                          <CustomFormLabel label="Address Line 2" />
                          <InputBase
                            fullWidth
                            placeholder="Address 2"
                            value={formik.values?.physicalAddress?.line2}
                            name="physicalAddress.line2"
                            error={
                              !!(
                                formik.errors.physicalAddress?.line2 &&
                                formik.touched.physicalAddress?.line2
                              )
                            }
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            classes={{
                              root: classes.textFieldRoot,
                              input: classes.textFieldInput,
                              focused: classes.textFieldActive,
                              error: classes.inputBoxError,
                            }}
                          />
                          {formik.touched.physicalAddress?.line2 &&
                            formik.errors.physicalAddress?.line2 && (
                              <FormHelperText error>
                                {formik.errors.physicalAddress?.line2}
                              </FormHelperText>
                            )}
                        </Grid>
                        <Grid item xs={3}>
                          <CustomFormLabel label="City" isRequired={true} />
                          <InputBase
                            fullWidth
                            placeholder="City"
                            value={formik.values?.physicalAddress?.city}
                            name="physicalAddress.city"
                            error={
                              !!(
                                formik.errors.physicalAddress?.city &&
                                formik.touched.physicalAddress?.city
                              )
                            }
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            classes={{
                              root: classes.textFieldRoot,
                              input: classes.textFieldInput,
                              focused: classes.textFieldActive,
                              error: classes.inputBoxError,
                            }}
                          />
                          {formik.touched.physicalAddress?.city &&
                            formik.errors.physicalAddress?.city && (
                              <FormHelperText error>
                                {formik.errors.physicalAddress?.city}
                              </FormHelperText>
                            )}
                        </Grid>
                        <Grid item xs={3}>
                          <CustomFormLabel label="State" isRequired={true} />
                          <InputBase
                            fullWidth
                            placeholder="State"
                            value={formik.values?.physicalAddress?.state}
                            name="physicalAddress.state"
                            error={
                              !!(
                                formik.errors.physicalAddress?.state &&
                                formik.touched.physicalAddress?.state
                              )
                            }
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            classes={{
                              root: classes.textFieldRoot,
                              input: classes.textFieldInput,
                              focused: classes.textFieldActive,
                              error: classes.inputBoxError,
                            }}
                          />
                          {formik.touched.physicalAddress?.state &&
                            formik.errors.physicalAddress?.state && (
                              <FormHelperText error>
                                {formik.errors.physicalAddress?.state}
                              </FormHelperText>
                            )}
                        </Grid>
                        <Grid item xs={3}>
                          <CustomFormLabel label="Country" isRequired={true} />
                          <InputBase
                            fullWidth
                            error={
                              !!(
                                formik.errors.physicalAddress?.country &&
                                formik.touched.physicalAddress?.country
                              )
                            }
                            value={formik.values?.physicalAddress?.country}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            name="physicalAddress.country"
                            placeholder="Country"
                            classes={{
                              root: classes.textFieldRoot,
                              input: classes.textFieldInput,
                              focused: classes.textFieldActive,
                              error: classes.inputBoxError,
                            }}
                          />
                          {formik.touched.physicalAddress?.country &&
                            formik.errors.physicalAddress?.country && (
                              <FormHelperText error>
                                {formik.errors.physicalAddress?.country}
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
                            value={formik.values?.physicalAddress?.zipcode}
                            name="physicalAddress.zipcode"
                            error={
                              !!(
                                formik.errors.physicalAddress?.zipcode &&
                                formik.touched.physicalAddress?.zipcode
                              )
                            }
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            placeholder="Zip Code"
                            onKeyPress={(e) => {
                              const allowedKeys = /[0-9\b]/;
                              if (!allowedKeys.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                            classes={{
                              root: classes.textFieldRoot,
                              input: classes.textFieldInput,
                              focused: classes.textFieldActive,
                              error: classes.inputBoxError,
                            }}
                          />
                          {formik.touched.physicalAddress?.zipcode &&
                            formik.errors.physicalAddress?.zipcode && (
                              <FormHelperText error>
                                {formik.errors.physicalAddress?.zipcode}
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
                                ? formik?.values?.physicalAddress?.line1
                                : formik.values?.billingAddress?.line1 || ""
                            }
                            disabled={isSameAsPhysicalAddress}
                            error={
                              !!(
                                formik.errors.billingAddress?.line1 &&
                                formik.touched.billingAddress?.line1
                              )
                            }
                            name="billingAddress.line1"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            classes={{
                              root: classes.textFieldRoot,
                              input: classes.textFieldInput,
                              focused: classes.textFieldActive,
                              error: classes.inputBoxError,
                            }}
                          />
                          {formik.touched.billingAddress?.line1 &&
                            formik.errors.billingAddress?.line1 && (
                              <FormHelperText error>
                                {formik.errors.billingAddress.line1}
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
                                ? formik?.values?.physicalAddress?.line2
                                : formik.values?.billingAddress?.line2 || ""
                            }
                            error={
                              !!(
                                formik.errors.billingAddress?.line2 &&
                                formik.touched.billingAddress?.line2
                              )
                            }
                            disabled={isSameAsPhysicalAddress}
                            name="billingAddress.line2"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            classes={{
                              root: classes.textFieldRoot,
                              input: classes.textFieldInput,
                              focused: classes.textFieldActive,
                              error: classes.inputBoxError,
                            }}
                          />
                          {formik.touched.billingAddress?.line2 &&
                            formik.errors.billingAddress?.line2 && (
                              <FormHelperText error>
                                {formik.errors.billingAddress?.line2}
                              </FormHelperText>
                            )}
                        </Grid>
                        <Grid item xs={3}>
                          <CustomFormLabel label="City" />
                          <InputBase
                            fullWidth
                            value={
                              isSameAsPhysicalAddress
                                ? formik?.values?.physicalAddress?.city
                                : formik.values?.billingAddress?.city || ""
                            }
                            error={
                              !!(
                                formik.errors.billingAddress?.city &&
                                formik.touched.billingAddress?.city
                              )
                            }
                            disabled={isSameAsPhysicalAddress}
                            name="billingAddress.city"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            placeholder="City"
                            classes={{
                              root: classes.textFieldRoot,
                              input: classes.textFieldInput,
                              focused: classes.textFieldActive,
                              error: classes.inputBoxError,
                            }}
                          />
                          {formik.touched.billingAddress?.city &&
                            formik.errors.billingAddress?.city && (
                              <FormHelperText error>
                                {formik.errors.billingAddress.city}
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
                                ? formik?.values?.physicalAddress?.state
                                : formik.values?.billingAddress?.state || ""
                            }
                            name="billingAddress.state"
                            error={
                              !!(
                                formik.errors.billingAddress?.state &&
                                formik.touched.billingAddress?.state
                              )
                            }
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            disabled={isSameAsPhysicalAddress}
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
                            value={
                              isSameAsPhysicalAddress
                                ? formik?.values?.physicalAddress?.country
                                : formik.values?.billingAddress?.country || ""
                            }
                            error={
                              !!(
                                formik.errors.billingAddress?.country &&
                                formik.touched.billingAddress?.country
                              )
                            }
                            name="billingAddress.country"
                            disabled={isSameAsPhysicalAddress}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            placeholder="Country"
                            classes={{
                              root: classes.textFieldRoot,
                              input: classes.textFieldInput,
                              focused: classes.textFieldActive,
                              error: classes.inputBoxError,
                            }}
                          />
                          {formik.touched.billingAddress?.country &&
                            formik.errors.billingAddress?.country && (
                              <FormHelperText error>
                                {formik.errors.billingAddress?.country}
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
                                ? formik?.values?.physicalAddress?.zipcode
                                : formik.values?.billingAddress?.zipcode || ""
                            }
                            error={
                              !!(
                                formik.errors.billingAddress?.zipcode &&
                                formik.touched.billingAddress?.zipcode
                              )
                            }
                            onKeyPress={(e) => {
                              const allowedKeys = /[0-9\b]/;
                              if (!allowedKeys.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                            disabled={isSameAsPhysicalAddress}
                            name="billingAddress.zipcode"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            classes={{
                              root: classes.textFieldRoot,
                              input: classes.textFieldInput,
                              focused: classes.textFieldActive,
                              error: classes.inputBoxError,
                            }}
                          />
                          {formik.touched.billingAddress?.zipcode &&
                            formik.errors.billingAddress?.zipcode && (
                              <FormHelperText error>
                                {formik.errors.billingAddress?.zipcode}
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
                    Provider Group Office Hours
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
                    display: "flex",
                    gap: "18rem",
                    width: "100%",
                    justifyItems: "space-around",
                  }}
                  p={3}
                >
                  <Box>
                    <Grid container>
                      <Grid xs={12} sm={4}></Grid>
                      <Grid xs={12} sm={4}>
                        <CustomFormLabel label="Open Time" />
                      </Grid>
                      <Grid xs={12} sm={4}>
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
                          color: hoursSelect.MONDAY ? sxs.dayColor.color : null,
                        }}
                        onClick={() =>
                          handleActiveDayOfWeek(PracticeHour.dayOfWeek.MONDAY)
                        }
                      >
                        M
                      </Box>

                      <Box sx={sxs.textFieldsHoursStyle}>
                        <TextField
                          fullWidth
                          sx={{
                            "& .MuiOutlinedInput-input": {
                              padding: "8px 6px",
                              resize: "none",
                            },
                          }}
                          type={"time"}
                          placeholder="Open time"
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
                                res.dayOfWeek == PracticeHour.dayOfWeek.MONDAY
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
                              padding: "8px 6px",
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
                                res.dayOfWeek == PracticeHour.dayOfWeek.MONDAY
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
                          handleActiveDayOfWeek(PracticeHour.dayOfWeek.TUESDAY)
                        }
                      >
                        T
                      </Box>

                      <Box sx={sxs.textFieldsHoursStyle}>
                        <TextField
                          fullWidth
                          sx={{
                            "& .MuiOutlinedInput-input": {
                              padding: "8px 6px",
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
                                res.dayOfWeek == PracticeHour.dayOfWeek.TUESDAY
                            )?.openingTime
                          }
                          disabled={!hoursSelect.TUESDAY}
                        />
                        <TextField
                          fullWidth
                          sx={{
                            "& .MuiOutlinedInput-input": {
                              padding: "8px 6px",
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
                                res.dayOfWeek == PracticeHour.dayOfWeek.TUESDAY
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
                              padding: "8px 6px",
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
                              padding: "8px 6px",
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
                          handleActiveDayOfWeek(PracticeHour.dayOfWeek.THURSDAY)
                        }
                      >
                        T
                      </Box>

                      <Box sx={sxs.textFieldsHoursStyle}>
                        <TextField
                          fullWidth
                          sx={{
                            "& .MuiOutlinedInput-input": {
                              padding: "8px 6px",
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
                                res.dayOfWeek == PracticeHour.dayOfWeek.THURSDAY
                            )?.openingTime
                          }
                          disabled={!hoursSelect.THURSDAY}
                        />
                        <TextField
                          fullWidth
                          sx={{
                            "& .MuiOutlinedInput-input": {
                              padding: "8px 6px",
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
                                res.dayOfWeek == PracticeHour.dayOfWeek.THURSDAY
                            )?.closingTime
                          }
                          disabled={!hoursSelect.THURSDAY}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box>
                    <Grid container>
                      <Grid xs={12} sm={4}></Grid>
                      <Grid xs={12} sm={4}>
                        <CustomFormLabel label="Open Time" />
                      </Grid>
                      <Grid xs={12} sm={4}>
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
                          color: hoursSelect.FRIDAY ? sxs.dayColor.color : null,
                        }}
                        onClick={() =>
                          handleActiveDayOfWeek(PracticeHour.dayOfWeek.FRIDAY)
                        }
                      >
                        F
                      </Box>

                      <Box sx={sxs.textFieldsHoursStyle}>
                        <TextField
                          fullWidth
                          sx={{
                            "& .MuiOutlinedInput-input": {
                              padding: "8px 6px",
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
                                res.dayOfWeek == PracticeHour.dayOfWeek.FRIDAY
                            )?.openingTime
                          }
                          disabled={!hoursSelect.FRIDAY}
                        />
                        <TextField
                          fullWidth
                          sx={{
                            "& .MuiOutlinedInput-input": {
                              padding: "8px 6px",
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
                                res.dayOfWeek == PracticeHour.dayOfWeek.FRIDAY
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
                          handleActiveDayOfWeek(PracticeHour.dayOfWeek.SATURDAY)
                        }
                      >
                        S
                      </Box>

                      <Box sx={sxs.textFieldsHoursStyle}>
                        <TextField
                          fullWidth
                          sx={{
                            "& .MuiOutlinedInput-input": {
                              padding: "8px 6px",
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
                                res.dayOfWeek == PracticeHour.dayOfWeek.SATURDAY
                            )?.openingTime
                          }
                          disabled={!hoursSelect.SATURDAY}
                        />
                        <TextField
                          fullWidth
                          sx={{
                            "& .MuiOutlinedInput-input": {
                              padding: "8px 6px",
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
                                res.dayOfWeek == PracticeHour.dayOfWeek.SATURDAY
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
                          color: hoursSelect.SUNDAY ? sxs.dayColor.color : null,
                        }}
                        onClick={() =>
                          handleActiveDayOfWeek(PracticeHour.dayOfWeek.SUNDAY)
                        }
                      >
                        S
                      </Box>

                      <Box sx={sxs.textFieldsHoursStyle}>
                        <TextField
                          fullWidth
                          sx={{
                            "& .MuiOutlinedInput-input": {
                              padding: "8px 6px",
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
                                res.dayOfWeek == PracticeHour.dayOfWeek.SUNDAY
                            )?.openingTime
                          }
                          disabled={!hoursSelect.SUNDAY}
                        />
                        <TextField
                          fullWidth
                          sx={{
                            "& .MuiOutlinedInput-input": {
                              padding: "8px 6px",
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
                                res.dayOfWeek == PracticeHour.dayOfWeek.SUNDAY
                            )?.closingTime
                          }
                          disabled={!hoursSelect.SUNDAY}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <DialogActions sx={formBottom}>
            <Grid sx={actionBtns}>
              <ButtonBase
                onClick={onCloseDrawer}
                sx={formButtonStyle.cancelButtonStyle}
              >
                Cancel
              </ButtonBase>
              <ButtonBase
                type="submit"
                sx={formButtonStyle.saveButtonStyle}
                disabled={formik.isSubmitting}
              >
                {providerGroupUuid ? SAVE : ADD}
              </ButtonBase>
            </Grid>
          </DialogActions>
        </Grid>
      </Grid>
      <Grid xs={12}>
        <Dialog
          maxWidth="sm"
          fullWidth={true}
          onClose={() => handleCloseDialog()}
          open={openDialogForOption}
        >
          <DialogTitle>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography>{"Enter speciality"}</Typography>
              <CloseIcon
                sx={{ cursor: "pointer" }}
                onClick={() => handleCloseDialog()}
              />
            </Box>
          </DialogTitle>
          <form>
            <DialogContent>
              <Grid mx={2} py={3}>
                {/* <CustomFormLabel label="Add New Speiciality" /> */}
                <InputBase
                  fullWidth
                  // onChange={(
                  //   event: React.ChangeEvent<
                  //     HTMLTextAreaElement | HTMLInputElement
                  //   >
                  // ) => {
                  //   handleChangeSpecialityOption(event);
                  // }}
                  name="name"
                  value={formikData.values.name}
                  onBlur={formikData.handleBlur}
                  onChange={formikData.handleChange}
                  error={!!(formikData.touched.name && formikData.errors.name)}
                  placeholder="Speciality"
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
}
export default AddEditProviderGroupData;
