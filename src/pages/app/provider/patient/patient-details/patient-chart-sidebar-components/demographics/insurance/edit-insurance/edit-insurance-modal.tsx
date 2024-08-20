/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  Grid,
  Typography,
  Select,
  InputBase,
  MenuItem,
  Modal,
  ButtonBase,
  FormHelperText,
} from "@mui/material";
import { DropzoneArea } from "material-ui-dropzone";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { makeStyles } from "@mui/styles";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  useInsuranceControllerServiceAddInsurance,
  useInsuranceControllerServiceGetInsurancePayer,
  useInsuranceControllerServiceUpdatePatientInsurance,
} from "../../../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { Insurance } from "../../../../../../../../../sdk/thinkemr-core-0.0.1/requests/models/Insurance";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loading from "../../../../../../../../../components/common/spinner/loading";
import dayjs from "dayjs";
import CustomFormLabel from "../../../../../../../../../components/common/custom-form-label";
import {
  actionBtns,
  formButtonStyle,
} from "../../../../../../../../../styles/common";
import { useDispatch } from "react-redux";
import { alertAction } from "../../../../../../../../../store/features/common-actions/snackbar/alertSlice";

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

export const selectInputStyle = {
  ".MuiOutlinedInput-notchedOutline": { border: 0 },
  boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
  height: "42px !important",
  width: "100%",
};

const relationshipWithPolicyHolderOptions = ["SPOUSE", "CHILD", "OTHER"];
const genderOptions = ["FEMALE", "MALE"];
const insuranceTypeOptions = ["PRIMARY", "SECONDARY", "OTHER"];
const stateOptions = ["NY - New York", "NJ - New Jersey"];

export const inputBase = makeStyles(() => ({
  inputField: {
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
    marginTop: "10px",
  },
  inputBoxText: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontSize: "14px !important",
    lineHeight: "140%",
    color: "",
    width: "100%",
    resize: "vertical",
    minHeight: "15px",
  },
  inputBoxActive: {
    background: `#FFFFFF 0% 0% no-repeat padding-box !important`,
    boxShadow: `0px 0px 6px #0097F002 !important`,
    border: `2px solid #004186 !important`,
    borderRadius: "4px !important",
  },
  selectInputStyle: {
    ".MuiOutlinedInput-notchedOutline": { border: 0 },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    border: "none",
    "& fieldset": { border: "none" },
    height: "42px !important",
    width: "100%",
    marginTop: "10px",
  },
  menuItemColorStyle: {
    color: "#1A1A1A7F",
  },
  dropZone: {
    minHeight: "250px !important",
    width: "400px !important",
    height: "200px !important",
    borderRadius: "20px",
    backgroundColor: "#F1F1F1",
    border: "2px solid #00000029",
  },
  uploadIcon: {
    fill: "#2879C9",
  },
  textUploadZone: {
    color: "#1A1A1ACC !important",
    fontSize: "18px !important",
  },
}));

interface EditInsuranceProps {
  open: boolean;
  onClose: () => void;
  onEventSuccessModalOpen: () => void;
  title: string;
  insuranceList?: Insurance;
  patientUuid?: string;
  refetch: any;
}
interface InsurancePayerOption {
  id: number;
  payerId: string;
  payerName: string;
}

const EditInsurance: React.FC<EditInsuranceProps> = ({
  open,
  onClose,
  onEventSuccessModalOpen,
  title,
  insuranceList,
  patientUuid,
  refetch,
}) => {
  const classes = inputBase();

  const selectRef = useRef(null);
  const [frontPhoto, setFrontPhoto] = useState("");
  const [backPhoto, setBackPhoto] = useState("");
  const dispatch = useDispatch();
  const [error1, setError] = useState("");

  const [insuranceData, setInsuranceData] = useState({
    id: "",
    insuranceType: "",
    insurancePayer: {
      id: "",
      payerId: "",
      payerName: "",
    },
    copay: "",
    payerContactNumber: "",
    payerFaxNumber: "",
    memberId: "",
    groupId: "",
    groupName: "",
    expiryDate: "" || null,
    relationshipWithPolicyHolder: "",
    insurancePolicyHolder: {
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      address: {
        id: "",
        line1: "",
        city: "",
        state: "",
        country: "",
        zipcode: "",
      },
    },
    planName: "" || null,
    planType: "" || null,
    frontPhoto: "",
    backPhoto: "",
    newFrontPhoto: "",
    newBackPhoto: "",
  });

  const validationSchema = Yup.object().shape({
    insuranceType: Yup.string().required("Please select the insurance type"),
    insurancePayer: Yup.object()
      .shape({
        id: Yup.string().required("ID is required"),
        payerId: Yup.string().required("Payer ID is required"),
        payerName: Yup.string().required(
          "Please select the insurance payer name"
        ),
      })
      .required("Insurance Payer details are required"),
    payerContactNumber: Yup.string()
      .required("Please enter the payer contact number")
      .matches(/^\d+$/, "Please enter the valid payer contact number")
      .min(10, "Payer contact number should be at least 10 digits")
      .max(10, "Payer contact number should not exceed 10 digits"),
    memberId: Yup.string().required("Please enter the member ID"),
    payerFaxNumber: Yup.string().required("Please enter the payer Fax Number"),
    groupName: Yup.string().required("Please enter the Group Name"),
    relationshipWithPolicyHolder: Yup.string().required(
      "Please select relationship with policy holder"
    ),
    insurancePolicyHolder: Yup.object().shape({
      gender: Yup.string().required("Please select the gender"),
    }),
  });

  useEffect(() => {
    if (insuranceList && insuranceList) {
      formik.setFieldValue("id", insuranceList?.id);
      formik.setFieldValue("insuranceType", insuranceList?.insuranceType);
      formik.setFieldValue("insurancePayer", insuranceList?.insurancePayer);
      formik.setFieldValue("copay", insuranceList?.copay);
      formik.setFieldValue(
        "payerContactNumber",
        insuranceList?.payerContactNumber
      );
      formik.setFieldValue("payerFaxNumber", insuranceList?.payerFaxNumber);
      formik.setFieldValue("memberId", insuranceList?.memberId);
      formik.setFieldValue("groupId", insuranceList?.groupId);
      formik.setFieldValue("groupName", insuranceList?.groupName);
      formik.setFieldValue("expiryDate", insuranceList?.expiryDate);
      formik.setFieldValue(
        "relationshipWithPolicyHolder",
        insuranceList?.relationshipWithPolicyHolder
      );
      formik.setFieldValue(
        "insurancePolicyHolder.firstName",
        insuranceList?.insurancePolicyHolder?.firstName
      );
      formik.setFieldValue(
        "insurancePolicyHolder.lastName",
        insuranceList?.insurancePolicyHolder?.lastName
      );
      formik.setFieldValue(
        "insurancePolicyHolder.dob",
        insuranceList?.insurancePolicyHolder?.dob
      );
      formik.setFieldValue(
        "insurancePolicyHolder.gender",
        insuranceList?.insurancePolicyHolder?.gender
      );
      formik.setFieldValue(
        "insurancePolicyHolder.address.id",
        insuranceList?.insurancePolicyHolder?.address?.id
      );
      formik.setFieldValue(
        "insurancePolicyHolder.address.line1",
        insuranceList?.insurancePolicyHolder?.address?.line1
      );
      formik.setFieldValue(
        "insurancePolicyHolder.address.city",
        insuranceList?.insurancePolicyHolder?.address?.city
      );
      formik.setFieldValue(
        "insurancePolicyHolder.address.state",
        insuranceList?.insurancePolicyHolder?.address?.state
      );
      formik.setFieldValue(
        "insurancePolicyHolder.address.country",
        insuranceList?.insurancePolicyHolder?.address?.country
      );
      formik.setFieldValue(
        "insurancePolicyHolder.address.zipcode",
        insuranceList?.insurancePolicyHolder?.address?.zipcode
      );
      formik.setFieldValue("planName", insuranceList?.planName);
      formik.setFieldValue("planType", insuranceList?.planType);
      // setFrontPhoto(insuranceList?.frontPhoto || "")
      // setBackPhoto(insuranceList?.backPhoto || "")
    }
  }, [insuranceList && insuranceList]);

  const handleImageSelect = async (
    files: File[],
    field: "frontPhoto" | "backPhoto"
  ) => {
    const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];
    const file = files[0];

    const options = {
      maxSizeMB: 1, // Adjust the size as needed
      maxWidthOrHeight: 1024, // Adjust the width/height as needed
      useWebWorker: true,
    };

    if (file && allowedFormats.includes(file?.type)) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        let encoded_data = e.target?.result as string;
        const sizeInBytes = file.size;
        const maxSizeinBytes = 512 * 1024;

        if (sizeInBytes > maxSizeinBytes) {
          const errMsg = "The image size exceeds 512 kb.";
          dispatch(
            alertAction.setAlert({
              open: true,
              message: errMsg,
              severity: "error",
            })
          );
        } else {
          if (field === "frontPhoto") {
            setFrontPhoto(encoded_data.split(",")[1]);
          } else {
            setBackPhoto(encoded_data.split(",")[1]);
          }
        }
        setError("");
      };
      reader.readAsDataURL(file);
    } else {
      setFrontPhoto("");
      setBackPhoto("");
      setError("Please select a JPEG, PNG file.");
      console.error("Invalid file format. Please choose a valid image file.");
    }
  };

  const [insurancePayerPagination, setInsurancePayerPagination] = useState({
    page: 0,
    size: 10,
  });

  const [insurancePayerOptions, setInsurancePayerOptions] = useState<
    InsurancePayerOption[]
  >([]);
  const {
    data,
    isLoading,
    isError: error,
    refetch: callinsurancePayerList,
  } = useInsuranceControllerServiceGetInsurancePayer({
    page: insurancePayerPagination.page,
    size: insurancePayerPagination.size,
  });

  useEffect(() => {
    if (data) {
      setInsurancePayerOptions(data?.data?.content);
    }
  }, [data]);

  async function handleMenuScroll(event: any) {
    const selectMenu: any = selectRef.current;
    const isNearBottom =
      event.target.scrollTop + event.target.clientHeight >=
      event.target.scrollHeight - 1;
    if (selectMenu && isNearBottom && !isLoading) {
      setInsurancePayerPagination((prev) => ({
        ...prev,
        size: insurancePayerPagination.size + 10,
      }));
    }
  }

  const {
    mutateAsync,
    data: insData,
    isError,
  } = title === "Add Insurance"
    ? useInsuranceControllerServiceAddInsurance()
    : useInsuranceControllerServiceUpdatePatientInsurance();

  const handleSubmit = async (values: any) => {
    values.frontPhoto = frontPhoto;
    values.backPhoto = backPhoto;
    const insuranceUuid = insuranceList?.uuid || "";
    // const patientUuid=insuranceList?.patient?.uuid || ""
    if (title === "Add Insurance") {
      values.frontPhoto = frontPhoto;
      values.backPhoto = backPhoto;
    } else {
      values.newFrontPhoto = frontPhoto;
      values.newBackPhoto = backPhoto;
    }
    try {
      mutateAsync({
        patientUuid: patientUuid ? patientUuid : "",
        insuranceUuid,
        requestBody: values,
      }).then(() => {
        onEventSuccessModalOpen();
        refetch();
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    onClose();
  };

  const formik = useFormik({
    initialValues: insuranceData,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Grid
        container
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "55%",
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 5,
          height: "80%",
          overflowY: "hidden",
        }}
      >
        <Grid container sx={{ overflowY: "scroll", height: "670px" }}>
          <Grid container alignItems={"center"}>
            <Grid
              item
              xs={11}
              sx={{
                display: "flex",
                justifyContent: "center",
                fontWeight: 600,
              }}
            >
              {title}
            </Grid>
            <Grid item xs={1} sx={{ display: "flex", justifyContent: "end" }}>
              <ButtonBase
                onClick={() => {
                  formik.resetForm();
                  onClose();
                }}
              >
                <CloseOutlinedIcon />
              </ButtonBase>
            </Grid>
          </Grid>
          <Grid item xs={12} mt={3}>
            <Grid container columnGap={2}>
              <Grid item xs={3.7}>
                <CustomFormLabel label={"Insurance Type"} isRequired={true} />
                <Select
                  className={classes.selectInputStyle}
                  name="insuranceType"
                  value={
                    formik?.values?.insuranceType
                      ? formik?.values?.insuranceType
                      : insuranceList?.insuranceType
                  }
                  onChange={formik.handleChange}
                  renderValue={(selected) => {
                    if (!selected) {
                      return (
                        <span>
                          <Typography
                            variant="h5"
                            sx={{
                              color: "#1A1A1A80 !important",
                            }}
                          >
                            Select
                          </Typography>
                        </span>
                      );
                    }
                    return <Typography variant="h5">{selected}</Typography>;
                  }}
                  MenuProps={MenuProps}
                  displayEmpty
                >
                  {insuranceTypeOptions.map((data) => {
                    return (
                      <MenuItem value={data} sx={{ color: "#1A1A1A7F" }}>
                        {data}
                      </MenuItem>
                    );
                  })}
                </Select>
                {formik.touched.insuranceType &&
                  formik.errors.insuranceType && (
                    <FormHelperText error>
                      {formik.errors.insuranceType}
                    </FormHelperText>
                  )}
              </Grid>

              <Grid item xs={7.6}>
                <CustomFormLabel label={"Insurance Payer"} isRequired={true} />
                <Select
                  className={classes.selectInputStyle}
                  ref={selectRef}
                  value={
                    formik.values.insurancePayer ||
                    insuranceList?.insurancePayer
                  }
                  name="insurancePayer"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  onScrollCapture={handleMenuScroll}
                  renderValue={(selected) => {
                    if (!selected?.payerName) {
                      return (
                        <span>
                          <Typography
                            variant="h5"
                            sx={{
                              color: "#1A1A1A80 !important",
                            }}
                          >
                            Select Payer
                          </Typography>
                        </span>
                      );
                    }
                    return (
                      <Typography variant="h5">
                        {selected?.payerName}
                      </Typography>
                    );
                  }}
                  MenuProps={MenuProps}
                  displayEmpty
                >
                  {insurancePayerOptions.map((data: any) => {
                    return (
                      <MenuItem
                        key={data?.id}
                        value={data}
                        className={classes.menuItemColorStyle}
                      >
                        {data?.payerName}
                      </MenuItem>
                    );
                  })}
                  {isLoading && (
                    <MenuItem
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <Loading />
                    </MenuItem>
                  )}
                </Select>
                {formik.touched.insurancePayer?.payerName &&
                  formik.errors.insurancePayer?.payerName && (
                    <FormHelperText error>
                      {formik.errors.insurancePayer?.payerName}
                    </FormHelperText>
                  )}
              </Grid>

              <Grid item xs={12} mt={3}>
                <Grid container columnGap={2}>
                  <Grid item xs={3.7}>
                    <CustomFormLabel label={"Member ID"} isRequired={true} />
                    <InputBase
                      fullWidth
                      name="memberId"
                      placeholder="Enter Member ID"
                      classes={{
                        root: classes.inputField,
                        input: classes.inputBoxText,
                        focused: classes.inputBoxActive,
                      }}
                      value={formik.values.memberId || insuranceList?.memberId}
                      onBlur={formik.handleBlur}
                      error={
                        !!(formik.errors.memberId && formik.touched.memberId)
                      }
                      onChange={formik.handleChange}
                    />
                    {formik.touched.memberId && formik.errors.memberId && (
                      <FormHelperText error>
                        {formik.errors.memberId}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={3.7}>
                    <CustomFormLabel label={"Plan Name"} />
                    <InputBase
                      //value={insuranceData.planId}
                      fullWidth
                      name="planName"
                      placeholder="Enter Plan Name"
                      value={formik.values.planName || insuranceList?.planName}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      error={
                        !!(formik.errors.planName && formik.touched.planName)
                      }
                      classes={{
                        root: classes.inputField,
                        input: classes.inputBoxText,
                        focused: classes.inputBoxActive,
                      }}
                      //onChange={(e: any) => inputData(e)}
                    />
                    {formik.touched.planName && formik.errors.planName && (
                      <FormHelperText error>
                        {formik.errors.planName}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={3.7}>
                    <CustomFormLabel label={"Group ID"} />
                    <InputBase
                      fullWidth
                      name="groupId"
                      placeholder="Enter Group ID"
                      value={formik.values.groupId || insuranceList?.groupId}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      error={
                        !!(formik.errors.groupId && formik.touched.groupId)
                      }
                      classes={{
                        root: classes.inputField,
                        input: classes.inputBoxText,
                        focused: classes.inputBoxActive,
                      }}
                    />
                    {formik.touched.groupId && formik.errors.groupId && (
                      <FormHelperText error>
                        {formik.errors.groupId}
                      </FormHelperText>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} mt={3}>
                <Grid container columnGap={2}>
                  <Grid item xs={3.7}>
                    <CustomFormLabel label={"Group Name"} isRequired={true} />
                    <InputBase
                      fullWidth
                      name="groupName"
                      placeholder="Enter Group Name"
                      classes={{
                        root: classes.inputField,
                        input: classes.inputBoxText,
                        focused: classes.inputBoxActive,
                      }}
                      onBlur={formik.handleBlur}
                      value={
                        formik.values.groupName || insuranceList?.groupName
                      }
                      onChange={formik.handleChange}
                      error={
                        !!(formik.errors.groupName && formik.touched.groupName)
                      }
                    />
                    {formik.touched.groupName && formik.errors.groupName && (
                      <FormHelperText error>
                        {formik.errors.groupName}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={3.7}>
                    <CustomFormLabel label={"Plan Type"} />
                    <InputBase
                      fullWidth
                      name="planType"
                      placeholder="Enter Plan Type"
                      value={formik.values.planType || insuranceList?.planType}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      error={
                        !!(formik.errors.planType && formik.touched.planType)
                      }
                      classes={{
                        root: classes.inputField,
                        input: classes.inputBoxText,
                        focused: classes.inputBoxActive,
                      }}
                    />
                    {formik.touched.planType && formik.errors.planType && (
                      <FormHelperText error>
                        {formik.errors.planType}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={3.7}>
                    <CustomFormLabel label={"Expiry Date"} />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        onChange={(e) => formik.setFieldValue("expiryDate", e)}
                        value={
                          formik.values.expiryDate
                            ? dayjs(formik.values.expiryDate)
                            : insuranceList?.expiryDate
                            ? dayjs(insuranceList?.expiryDate)
                            : ""
                        }
                        disablePast
                        slotProps={{
                          textField: { size: "small" },
                        }}
                        readOnly={
                          title === "Review Task" || title === "Edit Task"
                        }
                        sx={{
                          mt: 1,
                          width: "100%",
                          "& fieldset": { border: "none" },
                          boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                          "& label": {
                            color: "#1A1A1A80 !important",
                            fontSize: "14px !important",
                          },
                          "& .MuiInputBase-root": {
                            height: "42px",
                            fontSize: "14px",
                            // color: "#1A1A1A7F !important",
                            borderRadius: "5px",
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} mt={3}>
              <Grid container columnGap={2}>
                <Grid item xs={3.7}>
                  <CustomFormLabel label={"Copay Amount"} />
                  <InputBase
                    fullWidth
                    name="copay"
                    placeholder="Enter Amount"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.copay || insuranceList?.copay}
                    onChange={formik.handleChange}
                    error={!!(formik.errors.copay && formik.touched.copay)}
                  />
                  {formik.touched.copay && formik.errors.copay && (
                    <FormHelperText error>{formik.errors.copay}</FormHelperText>
                  )}
                </Grid>
                <Grid item xs={3.7}>
                  <CustomFormLabel
                    label={"Payer Phone Number"}
                    isRequired={true}
                  />
                  <InputBase
                    fullWidth
                    name="payerContactNumber"
                    placeholder="Enter Payer Phone Number"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                    onBlur={formik.handleBlur}
                    value={
                      formik.values.payerContactNumber ||
                      insuranceList?.payerContactNumber
                    }
                    onChange={formik.handleChange}
                    error={
                      !!(
                        formik.errors.payerContactNumber &&
                        formik.touched.payerContactNumber
                      )
                    }
                  />
                  {formik.touched.payerContactNumber &&
                    formik.errors.payerContactNumber && (
                      <FormHelperText error>
                        {formik.errors.payerContactNumber}
                      </FormHelperText>
                    )}
                </Grid>
                <Grid item xs={3.7}>
                  <CustomFormLabel
                    label={"Payer Fax Number"}
                    isRequired={true}
                  />
                  <InputBase
                    fullWidth
                    name="payerFaxNumber"
                    placeholder="Enter Payer Fax Number"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                    onBlur={formik.handleBlur}
                    value={
                      formik.values.payerFaxNumber ||
                      insuranceList?.payerFaxNumber
                    }
                    onChange={formik.handleChange}
                    error={
                      !!(
                        formik.errors.payerFaxNumber &&
                        formik.touched.payerFaxNumber
                      )
                    }
                  />
                  {formik.touched.payerFaxNumber &&
                    formik.errors.payerFaxNumber && (
                      <FormHelperText error>
                        {formik.errors.payerFaxNumber}
                      </FormHelperText>
                    )}
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container columnGap={3}>
                <Grid item xs={3.7} sx={{ marginTop: "20px" }}>
                  <CustomFormLabel
                    label={"Relationship With Policy Holder"}
                    isRequired={true}
                  />
                  <Select
                    className={classes.selectInputStyle}
                    value={
                      formik.values.relationshipWithPolicyHolder ||
                      insuranceList?.relationshipWithPolicyHolder
                    }
                    name="relationshipWithPolicyHolder"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    renderValue={(selected) => {
                      if (!selected) {
                        return (
                          <span>
                            <Typography
                              variant="h5"
                              sx={{
                                color: "#1A1A1A80  !important",
                              }}
                            >
                              Select
                            </Typography>
                          </span>
                        );
                      }
                      return <Typography variant="h5">{selected}</Typography>;
                    }}
                    MenuProps={MenuProps}
                    displayEmpty
                  >
                    {relationshipWithPolicyHolderOptions.map((data) => {
                      return (
                        <MenuItem
                          value={data}
                          className={classes.menuItemColorStyle}
                        >
                          {data}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {formik.touched.relationshipWithPolicyHolder &&
                    formik.errors.relationshipWithPolicyHolder && (
                      <FormHelperText error>
                        {formik.errors.relationshipWithPolicyHolder}
                      </FormHelperText>
                    )}
                </Grid>
                <Grid item xs={3.7} sx={{ marginTop: "20px  !important" }}>
                  <CustomFormLabel label={"First Name"} />
                  <InputBase
                    fullWidth
                    placeholder="Enter First Name"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                    onBlur={formik.handleBlur}
                    name="insurancePolicyHolder.firstName"
                    value={
                      formik.values.insurancePolicyHolder.firstName ||
                      insuranceList?.insurancePolicyHolder?.firstName
                    }
                    onChange={formik.handleChange}
                    error={
                      !!(
                        formik.errors.insurancePolicyHolder?.firstName &&
                        formik.touched.insurancePolicyHolder?.firstName
                      )
                    }
                  />
                  {formik.touched.insurancePolicyHolder?.firstName &&
                    formik.errors.insurancePolicyHolder?.firstName && (
                      <FormHelperText error>
                        {formik.errors.insurancePolicyHolder?.firstName}
                      </FormHelperText>
                    )}
                </Grid>
                <Grid item xs={3.7} sx={{ marginTop: "20px  !important" }}>
                  <CustomFormLabel label={"Last Name"} />
                  <InputBase
                    name="insurancePolicyHolder.lastName"
                    fullWidth
                    placeholder="Enter Last Name"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                    onBlur={formik.handleBlur}
                    value={
                      formik.values.insurancePolicyHolder.lastName ||
                      insuranceList?.insurancePolicyHolder?.lastName
                    }
                    onChange={formik.handleChange}
                    error={
                      !!(
                        formik.errors.insurancePolicyHolder?.lastName &&
                        formik.touched.insurancePolicyHolder?.lastName
                      )
                    }
                  />
                  {formik.touched.insurancePolicyHolder?.lastName &&
                    formik.errors.insurancePolicyHolder?.lastName && (
                      <FormHelperText error>
                        {formik.errors.insurancePolicyHolder?.lastName}
                      </FormHelperText>
                    )}
                </Grid>

                <Grid item xs={3.7} sx={{ marginTop: "20px  !important" }}>
                  <CustomFormLabel label={"DOB"} />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      onChange={(e) =>
                        formik.setFieldValue("insurancePolicyHolder.dob", e)
                      }
                      value={
                        formik.values.insurancePolicyHolder.dob
                          ? dayjs(formik.values.insurancePolicyHolder.dob)
                          : insuranceList?.insurancePolicyHolder?.dob
                          ? dayjs(insuranceList?.insurancePolicyHolder?.dob)
                          : ""
                      }
                      slotProps={{
                        textField: { size: "small" },
                      }}
                      sx={{
                        mt: 1,
                        width: "100%",
                        "& fieldset": { border: "none" },
                        boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                        "& label": {
                          color: "#1A1A1A80 !important",
                          fontSize: "14px !important",
                        },
                        "& .MuiInputBase-root": {
                          height: "42px",
                          fontSize: "14px",
                          // color: "#1A1A1A7F !important",
                          borderRadius: "5px",
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={3.7} sx={{ marginTop: "20px" }}>
                  <CustomFormLabel label={"Gender"} isRequired={true} />
                  <Select
                    className={classes.selectInputStyle}
                    value={
                      formik.values.insurancePolicyHolder.gender ||
                      insuranceList?.insurancePolicyHolder?.gender
                    }
                    name="insurancePolicyHolder.gender"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    renderValue={(selected) => {
                      if (!selected) {
                        return (
                          <span>
                            <Typography
                              variant="h5"
                              sx={{
                                color: "#1A1A1A80  !important",
                              }}
                            >
                              Select
                            </Typography>
                          </span>
                        );
                      }
                      return <Typography variant="h5">{selected}</Typography>;
                    }}
                    MenuProps={MenuProps}
                    displayEmpty
                  >
                    {genderOptions.map((data) => {
                      return (
                        <MenuItem
                          value={data}
                          className={classes.menuItemColorStyle}
                        >
                          {data}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {formik.touched.insurancePolicyHolder?.gender &&
                    formik.errors.insurancePolicyHolder?.gender && (
                      <FormHelperText error>
                        {formik.errors.insurancePolicyHolder?.gender}
                      </FormHelperText>
                    )}
                </Grid>
                {/* <Grid item xs={3.7} sx={{ marginTop: "20px  !important" }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold !important",
                      color: "#1A1A1A  !important",
                    }}
                  >
                    SSN
                  </Typography>

                  <InputBase
                    //value={insuranceData.ssn}
                    fullWidth
                    name="ssn"
                    placeholder="Enter SSN Number"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.ssn}
                    onChange={formik.handleChange}
                    error={!!(formik.errors.ssn && formik.touched.ssn)}
                    //onChange={(e: any) => inputData(e)}
                  />
                  {formik.touched.ssn && formik.errors.ssn && (
                    <FormHelperText error>
                      {formik.errors.ssn}
                    </FormHelperText>
                )}
                </Grid> */}
                <Grid item xs={3.7} sx={{ marginTop: "20px  !important" }}>
                  <CustomFormLabel label={"Address"} />
                  <InputBase
                    fullWidth
                    name="insurancePolicyHolder.address.line1"
                    value={
                      formik.values.insurancePolicyHolder.address.line1 ||
                      insuranceList?.insurancePolicyHolder?.address?.line1
                    }
                    placeholder="Enter Address Number"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={
                      !!(
                        formik.errors.insurancePolicyHolder?.address?.line1 &&
                        formik.touched.insurancePolicyHolder?.address?.line1
                      )
                    }
                  />
                  {formik.touched.insurancePolicyHolder?.address?.line1 &&
                    formik.errors.insurancePolicyHolder?.address?.line1 && (
                      <FormHelperText error>
                        {formik.errors.insurancePolicyHolder?.address?.line1}
                      </FormHelperText>
                    )}
                </Grid>
                <Grid item xs={3.7} sx={{ marginTop: "20px  !important" }}>
                  <CustomFormLabel label={"City"} />
                  <InputBase
                    fullWidth
                    name="insurancePolicyHolder.address.city"
                    placeholder="Enter City"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                    onBlur={formik.handleBlur}
                    value={
                      formik.values.insurancePolicyHolder.address.city ||
                      insuranceList?.insurancePolicyHolder?.address?.city
                    }
                    onChange={formik.handleChange}
                    error={
                      !!(
                        formik.errors.insurancePolicyHolder?.address?.city &&
                        formik.touched.insurancePolicyHolder?.address?.city
                      )
                    }
                  />
                  {formik.touched.insurancePolicyHolder?.address?.city &&
                    formik.errors.insurancePolicyHolder?.address?.city && (
                      <FormHelperText error>
                        {formik.errors.insurancePolicyHolder?.address?.city}
                      </FormHelperText>
                    )}
                </Grid>
                <Grid item xs={3.7} sx={{ marginTop: "20px" }}>
                  <CustomFormLabel label={"State"} />
                  <InputBase
                    fullWidth
                    name="insurancePolicyHolder.address.state"
                    placeholder="Enter City"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                    onBlur={formik.handleBlur}
                    value={
                      formik.values.insurancePolicyHolder.address.state ||
                      insuranceList?.insurancePolicyHolder?.address?.state
                    }
                    onChange={formik.handleChange}
                    error={
                      !!(
                        formik.errors.insurancePolicyHolder?.address?.state &&
                        formik.touched.insurancePolicyHolder?.address?.state
                      )
                    }
                  />
                  {formik.touched.insurancePolicyHolder?.address?.state &&
                    formik.errors.insurancePolicyHolder?.address?.state && (
                      <FormHelperText error>
                        {formik.errors.insurancePolicyHolder?.address?.state}
                      </FormHelperText>
                    )}
                  {/* <Select
                    className={classes.selectInputStyle}
                    value={formik.values.insurancePolicyHolder.address.state}  
                    name="insurancePolicyHolder.address.state" 
                    onChange={formik.handleChange} 
                    renderValue={(selected) => {
                      if (!selected) {
                        return (
                          <span>
                            <Typography
                              variant="h5"
                              sx={{
                                color: "#1A1A1A80  !important",
                              }}
                            >
                              Select
                            </Typography>
                          </span>
                        );
                      }
                      return <Typography variant="h5">{selected}</Typography>;
                    }}
                    MenuProps={MenuProps}
                    displayEmpty
                  >
                    {stateOptions.map((data) => {
                      return (
                        <MenuItem
                          value={data}
                          className={classes.menuItemColorStyle}
                        >
                          {data}
                        </MenuItem>
                      );
                    })}
                  </Select> */}
                </Grid>
                <Grid item xs={3.7} sx={{ marginTop: "20px  !important" }}>
                  <CustomFormLabel label={"Country"} />
                  <InputBase
                    fullWidth
                    value={
                      formik.values.insurancePolicyHolder.address.country ||
                      insuranceList?.insurancePolicyHolder?.address?.country
                    }
                    name="insurancePolicyHolder.address.country"
                    placeholder="Enter Country"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={
                      !!(
                        formik.errors.insurancePolicyHolder?.address?.country &&
                        formik.touched.insurancePolicyHolder?.address?.country
                      )
                    }
                  />
                  {formik.touched.insurancePolicyHolder?.address?.country &&
                    formik.errors.insurancePolicyHolder?.address?.country && (
                      <FormHelperText error>
                        {formik.errors.insurancePolicyHolder?.address?.country}
                      </FormHelperText>
                    )}
                </Grid>
                <Grid item xs={3.7} sx={{ marginTop: "20px  !important" }}>
                  <CustomFormLabel label={"Zip"} />
                  <InputBase
                    fullWidth
                    value={
                      formik.values.insurancePolicyHolder.address.zipcode ||
                      insuranceList?.insurancePolicyHolder?.address?.zipcode
                    }
                    name="insurancePolicyHolder.address.zipcode"
                    placeholder="Enter Zip"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={
                      !!(
                        formik.errors.insurancePolicyHolder?.address?.zipcode &&
                        formik.touched.insurancePolicyHolder?.address?.zipcode
                      )
                    }
                  />
                  {formik.touched.insurancePolicyHolder?.address?.zipcode &&
                    formik.errors.insurancePolicyHolder?.address?.zipcode && (
                      <FormHelperText error>
                        {formik.errors.insurancePolicyHolder?.address?.zipcode}
                      </FormHelperText>
                    )}
                </Grid>
              </Grid>
              <Grid container mt={1}>
                <Grid item xs={12} mt={2}>
                  <CustomFormLabel label={"Upload Insurance Card"} />
                </Grid>
                <Grid item xs={5.2} lg={5.2} mr={3} mt={1}>
                  <DropzoneArea
                    acceptedFiles={["image/*"]}
                    dropzoneText="Click here to upload from Front Side Drag & Drop files Or Browse Files"
                    // initialFiles={frontPhoto ? [frontPhoto] : []}
                    maxFileSize={1048576}
                    onChange={(files: File[]) =>
                      handleImageSelect(files, "frontPhoto")
                    }
                    filesLimit={1}
                    showAlerts={false}
                    showPreviewsInDropzone={true}
                    previewGridProps={{
                      container: { spacing: 1, direction: "row" },
                    }}
                    classes={{
                      root: classes.dropZone,
                      icon: classes.uploadIcon,
                      text: classes.textUploadZone,
                    }}
                  />
                </Grid>
                <Grid item xs={5.2} lg={5.2} mr={3} mt={1}>
                  <DropzoneArea
                    acceptedFiles={["image/*"]}
                    dropzoneText="Click here to upload from Back Side Drag & Drop files Or Browse Files"
                    // initialFiles={backPhoto ? [backPhoto] : []}
                    maxFileSize={1048576}
                    onChange={(files: File[]) =>
                      handleImageSelect(files, "backPhoto")
                    }
                    filesLimit={1}
                    showAlerts={false}
                    showPreviewsInDropzone={true}
                    previewGridProps={{
                      container: { spacing: 1, direction: "row" },
                    }}
                    classes={{
                      root: classes.dropZone,
                      icon: classes.uploadIcon,
                      text: classes.textUploadZone,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justifyContent={"flex-end"} columnGap={3}>
          <Grid sx={actionBtns} p={1}>
            <ButtonBase
              onClick={() => {
                formik.resetForm();
                onClose();
              }}
              sx={formButtonStyle.cancelButtonStyle}
            >
              Cancel
            </ButtonBase>
            <ButtonBase
              type="submit"
              sx={formButtonStyle.saveButtonStyle}
              onClick={() => {
                formik.submitForm();
              }}
            >
              {"Save"}
            </ButtonBase>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default EditInsurance;
