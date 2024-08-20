/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  InputBase,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import { Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import CustomFormLabel from "../../../../../components/common/custom-form-label";
import { adminConstants } from "../../../../../constants/admin";
// import { setAlert } from "../../../../../redux/actions/snackbar/alert.action";
import {
  useDrugCatalogControllerServiceAddDrugCatalog,
  useDrugCatalogControllerServiceUpdateDrugCatalog,
  useProviderGroupControllerServiceAddSpecialities,
  useProviderGroupControllerServiceGetAllSpecialities,
} from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import { DrugCatalog } from "../../../../../sdk/thinkemr-core-0.0.1/requests";
import {
  commonWidget,
  formBottom,
  formButtonStyle,
  formTitle,
  selectInputStyle,
} from "../../../../../styles/common";
import { alertAction } from "../../../../../store/features/common-actions/snackbar/alertSlice";
import { useFormik } from "formik";
import * as Yup from "yup";

export const inputBase = makeStyles(() => ({
  providerTextAreaField: {
    borderRadius: "5px",
    border: "none",
    "& fieldset": { border: "none" },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    size: "small",
    textAlign: "center",
    padding: "10px 0px 10px 10px !important",
    fontSize: "16px",
    minHeight: "81px",
  },
  providerFormShortInputField: {
    borderRadius: "5px",
    border: "none",
    "& fieldset": { border: "none" },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    height: "42px !important",
    textAlign: "center",
    padding: "13px 0px 10px 16px",
    fontSize: "16px",
    "@media (max-width: 820px)": {
      width: "100% !important",
    },
  },
  inputBoxText2: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontSize: "14px !important",
    lineHeight: "140%",
    color: "",
    width: "100%",
    resize: "vertical",
    minHeight: "15px",
  },
  inputBoxActive2: {
    background: `#FFFFFF 0% 0% no-repeat padding-box !important`,
    boxShadow: `0px 0px 6px #0097F002 !important`,
    border: `1px solid #0097F0 !important`,
    borderRadius: "4px !important",
  },
}));

export const test = {
  ".css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    maxWidth: "840px !important",
  },
};
export const drugStyle = makeStyles(() => ({
  selectInput: {
    width: "-webkit-fill-available",
    height: "42px !important",
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
  },
  tableRow: {
    background: `#1A1A1A1A !important`,
  },
  tableCell: {
    color: `#1A1A1A !important`,
  },

  modalUpload: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  iconStyle: {
    marginTop: "-5px  !important",
  },

  addDrugCatalogGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 2fr 2fr",
    gap: "20px",
    marginBottom: "20px",
  },
  ".css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    maxWidth: "none",
  },
}));

export const menuItemColorStyle = {
  color: "#1A1A1A7F",
  fontSize: "14px !important",
};

interface AddMasterModelProps {
  source?: string;
  open: boolean;
  setOpen: any;
  scroll?: string;
  title?: string;
  columns?: any;
  labData?: any;
  setLabData?: any;
  drugData?: any;
  setIsDataAdded?: any;
  providerGroupUuid?: string;
}

function AddDrugCatalog(props: AddMasterModelProps) {
  const { ADD, CHANGE } = adminConstants;
  const {
    //source,
    open,
    setOpen,
    scroll,
    title,
    // labData,
    // setLabData
    drugData,
    setIsDataAdded,
    providerGroupUuid,
  } = props;
  const classes = inputBase();
  const style = commonWidget();

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 50,
      },
    },
  };

  const validationSchema = Yup.object().shape({
    speciality: Yup.string().required("Please select the speciality type"),
    medicineName: Yup.string()
      .required("Please enter the medicine name")
      .matches(/^[a-zA-Z0-9]*$/, "Please enter the valid medicine name"),
    medicinetype: Yup.string().required("Please enter the medicine type"),
    dose: Yup.string().required("Please select the dose"),
    frequency: Yup.string().required("Please select the frequency"),
    duration: Yup.string()
      .required("Please enter the duration")
      .matches(/^[a-zA-Z0-9\s]*$/, "Please enter the valid duration")
      .test(
        "contains-numeric-and-character",
        "Must contain at least one numeric and one character value",
        (value) => {
          if (!value) return false;
          return /\d/.test(value) && /[a-zA-Z]/.test(value);
        }
      ),
    whenField: Yup.string().required("Please select the when "),
    whereField: Yup.string().required("Please select the where"),
    // quantity: Yup.string().required("quantity is required"),
    description: Yup.string().required("Please enter the description"),
    providerGroupUuid: Yup.string(),
  });

  const initialVal = {
    speciality: "",
    medicineName: "",
    medicinetype: "",
    dose: "",
    frequency: "",
    duration: "",
    whenField: "",
    whereField: "",
    quantity: "",
    description: "",
    providerGroupUuid: "",
  };

  const selectRef = useRef(null);
  const [initialValues, setInitailValues] = useState({ ...initialVal });
  const [displaySepcialities, setDisplaySpecialities] = useState<any>(null);
  const [selectedSpeciality, setSelectedSpeciality] = useState<any>(null);
  const [medicineOptions, setMedicineOptions] = useState<any>(null);
  const [specialitiesPagination, setSpecialitiesPagination] = useState({
    page: 0,
    size: 10,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();

  const { mutateAsync, isSuccess } =
    useDrugCatalogControllerServiceAddDrugCatalog();

  const { mutateAsync: editDrug, isSuccess: editIsSuccess } =
    useDrugCatalogControllerServiceUpdateDrugCatalog();

  const { data: specialities, isLoading } =
    useProviderGroupControllerServiceGetAllSpecialities({
      page: specialitiesPagination.page,
      size: specialitiesPagination.size,
    });

  useEffect(() => {
    const type = Object.values(DrugCatalog.type) as string[];
    setMedicineOptions(type);
  }, []);

  // useEffect(() => {
  //   if (specialities) {
  //     setDisplaySpecialities(specialities?.data?.content);
  //   }
  // }, [specialities]);

  useEffect(() => {
    if (specialities) {
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
      setDisplaySpecialities([
        ...newSpeciality,
        ...specialities?.data?.content,
      ]);
    }
  }, [specialities, isLoading]);

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

  useEffect(() => {
    setSelectedSpeciality(drugData?.speciality);
    setInitailValues((prevValues) => ({
      ...prevValues,
      speciality: drugData?.speciality.name || "",
      medicineName: drugData?.medicine || "",
      medicinetype: drugData?.type || "",
      dose: drugData?.dose || "",
      frequency: drugData?.frequency || "",
      duration: drugData?.duration || "",
      whenField: drugData?.whenField || "",
      whereField: drugData?.whereField || "",
      quantity: drugData?.quantity || "",
      description: drugData?.description || "",
      providerGroupUuid: drugData?.providerGroupUuid || "-",
    }));
  }, [drugData]);

  useEffect(() => {
    if (isSuccess) {
      handleClose();
      setIsDataAdded(true);
    } else {
      setIsDataAdded(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (editIsSuccess) {
      handleClose();
      setIsDataAdded();
    }
  }, [editIsSuccess]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = (values: any) => {
    const requestBody = {
      id: undefined,
      uuid: drugData?.uuid ? drugData?.uuid : undefined,
      speciality: selectedSpeciality,
      type: values.medicinetype,
      medicine: values.medicineName,
      dose: values.dose,
      whenField: values.whenField,
      whereField: values.whereField,
      frequency: values.frequency,
      duration: values.duration,
      quantity: values.quantity || 0,
      description: values.description,
      source: undefined,
      active: true,
      archive: false,
      providerGroupUuid: providerGroupUuid || "",
    };
    if (title === "Add Drug Catalog") {
      try {
        mutateAsync({ requestBody: requestBody })
          .then((res: any) => {
            setIsDataAdded(true);
            dispatch(
              alertAction.setAlert({
                open: true,
                message: res.message,
                severity: "success",
              })
            );
          })
          .catch((error) => {
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
    } else if (title === "Edit Drug Catalog") {
      try {
        editDrug({ requestBody: requestBody })
          .then((res: any) => {
            setIsDataAdded(true);
            dispatch(
              alertAction.setAlert({
                open: true,
                message: res.message,
                severity: "success",
              })
            );
          })
          .catch((error) => {
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

  // const handleChange = (event: any) => {
  //   const {
  //     target: { value },
  //   } = event;

  //   console.log("vals==>", );
  //   const newSpec = value.filter(
  //     (item: string) => item !== "Add new speciality"
  //   );

  //   setSelectedSpeciality(
  //     typeof newSpec === "string" ? newSpec.split(",") : newSpec
  //   );
  //   const val = event.target.value;
  //   if (val.includes("Add new speciality")) {
  //     setOpenDialog((item) => !item);
  //   }
  // };

  // const medicineOptions = ["Liquid", "Capsule", "Tablet"];
  const recommendableDoseOptions = ["1-2-1", "1-1-0", "0-1-0"];
  const frequencyOptions = ["Daily", "Weekly", "Monthly"];
  const whenOptions = ["After Food", "Before Food", "After Lunch"];
  const whereOptions = ["On scalp", "On Hand", "On Hip"];
  return (
    <>
      <Formik
        onSubmit={(values) => {
          handleFormSubmit(values);
        }}
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({
          values,
          errors,
          touched,
          submitForm,
          setFieldValue,
          handleBlur,
        }) => {
          return (
            <Form>
              <Dialog open={open} onClose={handleClose} sx={test}>
                <DialogTitle
                  id="scroll-dialog-title"
                  sx={{ marginBottom: "15px" }}
                >
                  <Grid container alignItems={"center"}>
                    <Grid item xs={11}>
                      <Typography sx={formTitle}>{title}</Typography>
                    </Grid>
                    <Grid
                      item
                      xs={1}
                      sx={{ display: "flex", justifyContent: "end" }}
                    >
                      <ButtonBase onClick={handleClose}>
                        <CloseIcon />
                      </ButtonBase>
                    </Grid>
                  </Grid>
                </DialogTitle>
                <DialogContent dividers={scroll === "paper"}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <CustomFormLabel
                            label="Speciality Type"
                            source={CHANGE}
                            isRequired={true}
                          />
                          <Select
                            sx={selectInputStyle}
                            ref={selectRef}
                            onScrollCapture={handleMenuScroll}
                            value={values.speciality}
                            name="speciality"
                            // onChange={handleChange}
                            onChange={(e) => {
                              const selectedSpeciality =
                                displaySepcialities.find(
                                  (speciality: any) =>
                                    speciality.id === e.target.value
                                );
                              {
                                selectedSpeciality.name !==
                                  "Add new speciality" &&
                                  setFieldValue(
                                    "speciality",
                                    selectedSpeciality.name
                                  );
                              }
                              {
                                selectedSpeciality.name !==
                                  "Add new speciality" &&
                                  setSelectedSpeciality(selectedSpeciality);
                              }
                              {
                                selectedSpeciality.name ===
                                  "Add new speciality" &&
                                  // setSelectedSpeciality(selectedSpeciality);
                                  setOpenDialog((item) => !item);
                              }
                            }}
                            className={
                              errors.speciality ? style.inputBoxError : ""
                            }
                            renderValue={(selected) => {
                              if (selected.length === 0) {
                                return (
                                  <Typography
                                    variant="h5"
                                    sx={{
                                      color: "#1A1A1A80",
                                    }}
                                  >
                                    Select Speciality
                                  </Typography>
                                );
                              }
                              return (
                                <Typography variant="h5">{selected}</Typography>
                              );
                            }}
                            MenuProps={MenuProps}
                            displayEmpty
                          >
                            {displaySepcialities?.map((speciality: any) => (
                              <MenuItem
                                key={speciality.id}
                                value={speciality.id}
                              >
                                {speciality.name}
                              </MenuItem>
                            ))}
                          </Select>
                          {touched.speciality && errors.speciality && (
                            <FormHelperText error>
                              {errors.speciality}
                            </FormHelperText>
                          )}
                        </Grid>
                        <Grid item xs={4}>
                          <CustomFormLabel
                            label="Medicine Name"
                            source={CHANGE}
                            isRequired={true}
                          />
                          <InputBase
                            value={values.medicineName}
                            fullWidth
                            placeholder="Enter Medicine Name"
                            name="medicineName"
                            classes={{
                              root: classes.providerFormShortInputField,
                              input: classes.inputBoxText2,
                              focused: classes.inputBoxActive2,
                              error: style.inputBoxError,
                            }}
                            error={
                              !!touched.medicineName && !!errors.medicineName
                            }
                            onBlur={handleBlur}
                            onChange={(e) =>
                              setFieldValue("medicineName", e.target.value)
                            }
                          />
                          {touched.medicineName && errors.medicineName && (
                            <FormHelperText error>
                              {errors.medicineName}
                            </FormHelperText>
                          )}
                        </Grid>
                        <Grid item xs={4}>
                          <CustomFormLabel
                            label="Medicine Type"
                            source={CHANGE}
                            isRequired={true}
                          />
                          <Select
                            sx={selectInputStyle}
                            value={values.medicinetype}
                            name="medicinetype"
                            onBlur={handleBlur}
                            onChange={(e) =>
                              setFieldValue("medicinetype", e.target.value)
                            }
                            className={
                              touched.medicinetype && errors.medicinetype
                                ? style.inputBoxError
                                : ""
                            }
                            renderValue={(selected) => {
                              if (!selected) {
                                return (
                                  <span>
                                    <Typography
                                      variant="h5"
                                      sx={{
                                        color: "#1A1A1A80",
                                        lineHeight: "unset",
                                      }}
                                    >
                                      Select Medicine Type
                                    </Typography>
                                  </span>
                                );
                              }
                              return (
                                <Typography variant="h5">{selected}</Typography>
                              );
                            }}
                            MenuProps={MenuProps}
                            displayEmpty
                          >
                            {medicineOptions?.map((data: any) => {
                              return (
                                data !== "UNKNOWN" && (
                                  <MenuItem
                                    key={data}
                                    value={data}
                                    sx={menuItemColorStyle}
                                  >
                                    {data}
                                  </MenuItem>
                                )
                              );
                            })}
                          </Select>
                          {touched.medicinetype && errors.medicinetype && (
                            <FormHelperText error>
                              {errors.medicinetype}
                            </FormHelperText>
                          )}
                        </Grid>
                        <Grid item xs={4}>
                          <CustomFormLabel
                            label="Recommendable Dose"
                            source={CHANGE}
                            isRequired={true}
                          />
                          <Select
                            sx={selectInputStyle}
                            value={values.dose}
                            name="dose"
                            onChange={(e) =>
                              setFieldValue("dose", e.target.value)
                            }
                            className={
                              touched.dose && errors.dose
                                ? style.inputBoxError
                                : ""
                            }
                            renderValue={(selected) => {
                              if (!selected) {
                                return (
                                  <span>
                                    <Typography
                                      variant="h5"
                                      sx={{
                                        color: "#1A1A1A80",
                                      }}
                                    >
                                      Select or enter dose
                                    </Typography>
                                  </span>
                                );
                              }
                              return (
                                <Typography variant="h5">{selected}</Typography>
                              );
                            }}
                            MenuProps={MenuProps}
                            displayEmpty
                          >
                            {recommendableDoseOptions.map((data) => {
                              return (
                                <MenuItem value={data} sx={menuItemColorStyle}>
                                  {data}
                                </MenuItem>
                              );
                            })}
                          </Select>
                          {touched.dose && errors.dose && (
                            <FormHelperText error>{errors.dose}</FormHelperText>
                          )}
                        </Grid>
                        <Grid item xs={4}>
                          <CustomFormLabel
                            label="Recommendable Frequency"
                            source={CHANGE}
                            isRequired={true}
                          />
                          <Select
                            sx={selectInputStyle}
                            value={values.frequency}
                            name="frequency"
                            onChange={(e) =>
                              setFieldValue("frequency", e.target.value)
                            }
                            className={
                              touched.frequency && errors.frequency
                                ? style.inputBoxError
                                : ""
                            }
                            renderValue={(selected) => {
                              if (!selected) {
                                return (
                                  <span>
                                    <Typography
                                      variant="h5"
                                      sx={{
                                        color: "#1A1A1A80",
                                      }}
                                    >
                                      Select Frequency
                                    </Typography>
                                  </span>
                                );
                              }
                              return (
                                <Typography variant="h5">{selected}</Typography>
                              );
                            }}
                            MenuProps={MenuProps}
                            displayEmpty
                          >
                            {frequencyOptions.map((data) => {
                              return (
                                <MenuItem value={data} sx={menuItemColorStyle}>
                                  {data}
                                </MenuItem>
                              );
                            })}
                          </Select>
                          {touched.frequency && errors.frequency && (
                            <FormHelperText error>
                              {errors.frequency}
                            </FormHelperText>
                          )}
                        </Grid>
                        <Grid item xs={4}>
                          <CustomFormLabel
                            label="Recommendable Duration"
                            source={CHANGE}
                            isRequired={true}
                          />
                          <InputBase
                            fullWidth
                            name="duration"
                            value={values.duration}
                            placeholder="Enter Duration Number"
                            classes={{
                              root: classes.providerFormShortInputField,
                              input: classes.inputBoxText2,
                              focused: classes.inputBoxActive2,
                              error: style.inputBoxError,
                            }}
                            error={!!touched.duration && !!errors.duration}
                            onBlur={handleBlur}
                            onChange={(e) =>
                              setFieldValue("duration", e.target.value)
                            }
                          />
                          {touched.duration && errors.duration && (
                            <FormHelperText error>
                              {errors.duration}
                            </FormHelperText>
                          )}
                        </Grid>
                        <Grid item xs={4}>
                          <CustomFormLabel
                            label="When"
                            source={CHANGE}
                            isRequired={true}
                          />
                          <Select
                            sx={selectInputStyle}
                            value={values.whenField}
                            name="whenField"
                            onChange={(e) =>
                              setFieldValue("whenField", e.target.value)
                            }
                            className={
                              touched.whenField && errors.whenField
                                ? style.inputBoxError
                                : ""
                            }
                            displayEmpty
                            renderValue={(selected) => {
                              if (!selected) {
                                return (
                                  <span>
                                    <Typography
                                      variant="h5"
                                      sx={{
                                        color: "#1A1A1A80",
                                      }}
                                    >
                                      Select When
                                    </Typography>
                                  </span>
                                );
                              }
                              return (
                                <Typography variant="h5">{selected}</Typography>
                              );
                            }}
                          >
                            {whenOptions.map((data) => {
                              return (
                                <MenuItem value={data} sx={menuItemColorStyle}>
                                  {data}
                                </MenuItem>
                              );
                            })}
                          </Select>
                          {touched.whenField && errors.whenField && (
                            <FormHelperText error>
                              {errors.whenField}
                            </FormHelperText>
                          )}
                        </Grid>
                        <Grid item xs={4}>
                          <CustomFormLabel
                            label="Where"
                            source={CHANGE}
                            isRequired={true}
                          />
                          <Select
                            sx={selectInputStyle}
                            value={values.whereField}
                            name="whereField"
                            onChange={(e) =>
                              setFieldValue("whereField", e.target.value)
                            }
                            className={
                              touched.whereField && errors.whereField
                                ? style.inputBoxError
                                : ""
                            }
                            renderValue={(selected) => {
                              if (!selected) {
                                return (
                                  <span>
                                    <Typography
                                      variant="h5"
                                      sx={{
                                        color: "#1A1A1A80",
                                      }}
                                    >
                                      Select Where
                                    </Typography>
                                  </span>
                                );
                              }
                              return (
                                <Typography variant="h5">{selected}</Typography>
                              );
                            }}
                            MenuProps={MenuProps}
                            displayEmpty
                          >
                            {whereOptions.map((data) => {
                              return (
                                <MenuItem value={data} sx={menuItemColorStyle}>
                                  {data}
                                </MenuItem>
                              );
                            })}
                          </Select>
                          {touched.whereField && errors.whereField && (
                            <FormHelperText error>
                              {errors.whereField}
                            </FormHelperText>
                          )}
                        </Grid>
                        {/* <Grid item xs={4}>
                        <CustomFormLabel
                          label="Total Quantity"
                          source={CHANGE}
                          isRequired={true}
                        />
                        <InputBase
                          value={values.quantity}
                          fullWidth
                          placeholder="Enter Quantity"
                          classes={{
                            root: classes.providerFormShortInputField,
                            input: classes.inputBoxText2,
                            focused: classes.inputBoxActive2,
                            error: errors.quantity && style.inputBoxError,
                          }}
                          error={!!touched.quantity && !!errors.quantity}
                          onChange={(e) =>
                            setFieldValue("quantity", e.target.value)
                          }
                        />
                        {touched.quantity && errors.quantity && (
                          <FormHelperText error>
                            {errors.quantity}
                          </FormHelperText>
                        )}
                      </Grid> */}
                        <Grid item xs={12}>
                          <CustomFormLabel
                            label="Description"
                            source={CHANGE}
                            isRequired={true}
                          />
                          <InputBase
                            fullWidth
                            multiline={true}
                            rows="3"
                            placeholder="Description"
                            type="text"
                            value={values.description}
                            name="description"
                            classes={{
                              root: classes.providerTextAreaField,
                              input: classes.inputBoxText2,
                              focused: classes.inputBoxActive2,
                              error: errors.description && style.inputBoxError,
                            }}
                            error={
                              !!touched.description && !!errors.description
                            }
                            onBlur={handleBlur}
                            onChange={(e) =>
                              setFieldValue("description", e.target.value)
                            }
                          />
                          {touched.description && errors.description && (
                            <FormHelperText error>
                              {errors.description}
                            </FormHelperText>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions
                  sx={{
                    paddingRight: "20px !important",
                    gap: "10px",
                    ...formBottom,
                  }}
                >
                  {/* <ButtonBase
                  onClick={handleClose}
                  sx={formButtonStyle.cancelButtonStyle}
                >
                  {CANCEL}
                </ButtonBase> */}
                  <ButtonBase
                    sx={formButtonStyle.saveButtonStyle}
                    // disabled={isSubmitting || !isValid}
                    onClick={submitForm}
                  >
                    {drugData ? "Save" : ADD}
                  </ButtonBase>
                </DialogActions>
              </Dialog>
            </Form>
          );
        }}
      </Formik>
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
                    root: style.textFieldRoot,
                    input: style.textFieldInput,
                    focused: style.textFieldActive,
                    error: style.inputBoxError,
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
    </>
  );
}

export default React.memo(AddDrugCatalog);

{
}
