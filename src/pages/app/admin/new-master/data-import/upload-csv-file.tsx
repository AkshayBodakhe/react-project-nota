import {
  Autocomplete,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import CustomFormLabel from "../../../../../components/common/custom-form-label";
import {
  formTitle,
  formBottom,
  formButtonStyle,
} from "../../../../../styles/common";
import * as Yup from "yup";
// import CommonSnackbar from "../../../../../components/common/commonSnackBar/snackBar";
import { adminConstants } from "../../../../../constants/admin";
import SelectInput from "../../../../../components/common/select-input";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { timelineItemClasses } from "@mui/lab/TimelineItem";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { uploadStyle } from "./upload-data-import";
import { DropzoneArea } from "material-ui-dropzone";
import TemplateTable from "./template-table";
import {
  BillingCodes,
  MigrationControllerService,
} from "../../../../../sdk/thinkemr-core-0.0.1/requests";
import {
  useLocationControllerServiceGetAllLocations,
  useMigrationControllerServiceUploadFile,
  useProviderControllerServiceGetAllProviders,
  useProviderGroupControllerServiceGetAllProviderGroups,
} from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import { useDispatch } from "react-redux";
import { ErrorResponseEntity } from "../../../../../components/common/enums-and-interfaces/interfaces";
import { alertAction } from "../../../../../store/features/common-actions/snackbar/alertSlice";
import Dropdown from "../../../../../components/common/atom/Dropdown";
// import { setAlert } from "../../../../../redux/actions/snackbar/alert.action";

type Props = {
  source?: string;
  open: boolean;
  setOpen: any;
  scroll?: string;
  title?: string;
  columns?: any;
  HCPCSData?: any;
  isDataImportProcessing?: boolean;
  setDataImportProcessing?: any;
  setImportingData?: any;
  refetch?: any;
  providerGroupUuid?: string;
};

export const iconUploadButton = {
  marginBottom: "-8px",
  fontSize: "18px",
};

export const boxUpload = {
  width: 350,
  backgroundColor: "white",
  p: 2,
  borderRadius: 2,
  outline: "none",
};

const { CANCEL, CHANGE, UPLOAD } = adminConstants;

const sxs = {
  timeLineDots: {
    display: "flex",
    justifyContent: "center",
    height: "35px",
    width: "35px",
  },
  downloadCsvBtn: {
    background: "#CCECFF80 0% 0% no-repeat padding-box",
    border: "1px solid #1B5984",
    borderRadius: "5px",
    opacity: 1,
    padding: "5px",
    margin: "5px",
    color: "#1B5984",
    font: "normal normal medium 16px/19px Roboto",
  },
};

export default function UploadCSVForm(props: Props) {
  const {
    open,
    setOpen,
    scroll,
    title,
    setDataImportProcessing,
    setImportingData,
    refetch,
  } = props;

  const uploadClasses = uploadStyle();
  const [value, setValue] = useState<any>(null);
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [providerGroupName, setProviderGroupName] = useState("");
  const [locationList, setLocationList] = useState<any[]>([]);
  const [providerList, setProviderList] = useState<any[]>([]);
  const dispatch = useDispatch();
  const [allowValidation, setAllowValidation] = useState(false);
  const [initialValues] = useState({
    category: "",
    title: "",
    providerGroupUuid: "",
    formData: {
      file: Blob,
    },
    locationUuid: "",
    providerUuid: "",
  });
  const entityType: any[] = [
    {
      key: BillingCodes.type.PROVIDER,
      value: BillingCodes.type.PROVIDER,
    },
    {
      key: BillingCodes.type.CPT,
      value: BillingCodes.type.CPT,
    },
    {
      key: BillingCodes.type.DRUG,
      value: BillingCodes.type.DRUG,
    },
    {
      key: BillingCodes.type.ICD,
      value: BillingCodes.type.ICD,
    },
    {
      key: BillingCodes.type.HCPCS,
      value: BillingCodes.type.HCPCS,
    },
    sessionStorage.getItem("role") !== "SUPER_ADMIN" &&
      sessionStorage.getItem("role") !== "ADMIN" && {
        key: BillingCodes.type.PATIENT,
        value: BillingCodes.type.PATIENT,
      },
  ];

  const { data } = useProviderGroupControllerServiceGetAllProviderGroups({
    searchString: providerGroupName,
  });
  const { mutateAsync, isPending, error, isError } =
    useMigrationControllerServiceUploadFile();

  useEffect(() => {
    setDataImportProcessing(isPending);
  }, [isPending]);

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
    if (data?.data && data.data?.content) {
      setSearchResult(data.data?.content);
    }
  }, [data?.data]);

  useEffect(() => {
    if (providerGroupName) {
      const timeOut = setTimeout(() => {
        setProviderGroupName(providerGroupName);
      }, 500);

      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [providerGroupName]);

  const {
    data: locationData,
    isLoading: isLocationDataLoading,
    isError: isLocationError,
  } = useLocationControllerServiceGetAllLocations({
    providerGroupUuid: props.providerGroupUuid || "",
    // page: pagination.page,
    // size: pagination.size,
  });

  useEffect(() => {
    if (!isLocationError && locationData?.data) {
      setLocationList(locationData.data.content);
    }
  }, [isLocationDataLoading, locationData, isLocationError]);

  const {
    data: providerData,
    isLoading: isProviderListLoading,
    isError: isProviderError,
  } = useProviderControllerServiceGetAllProviders({
    providerGroupUuid: props.providerGroupUuid || "",
    // ...pagination,
  });
  useEffect(() => {
    if (!isProviderError && providerData?.data) {
      setProviderList(providerData.data.content);
    }
  }, [isProviderListLoading]);

  const validationSchema = Yup.object().shape({
    category: Yup.string().required("Please select entity type"),
    providerGroupUuid: props.providerGroupUuid
      ? Yup.string()
      : allowValidation
      ? Yup.string().required("Provider Group Required")
      : Yup.string(),
    formData: Yup.object().shape({
      file: Yup.mixed()
        .required("Please attach a CSV file")
        .test(
          (value: any) => value && value[0] && value[0].name.endsWith(".csv")
        ),
    }),
  });

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    setImportingData(values);

    try {
      mutateAsync({
        category: values.category,
        formData: values.formData,
        title: values.title,
        providerGroupUuid: props.providerGroupUuid
          ? props.providerGroupUuid
          : values.providerGroupUuid,
        locationUuid: values.locationUuid.uuid,
        providerUuid: values.providerUuid.uuid,
      }).then(() => {
        setOpen(false);
        refetch();
        dispatch(
          alertAction.setAlert({
            open: true,
            message: "File uploaded successfully",
            severity: "success",
          })
        );
      });
    } catch (error) {
      console.error("Error while uploading data");
    }
    setSubmitting(false);
  };

  const defaultProps = {
    options: searchResult,
    getOptionLabel: (option: any) => option.name,
  };

  const defaultLocationProps = {
    options: locationList,
    getOptionLabel: (option: any) => option.name,
  };

  const defaultProviderDataProps = {
    options: providerList ? providerList : [],
    getOptionalLabel: (option: any) => option?.firstName,
  };

  const handleClose = () => {
    setOpen(false);
  };

  const downloadTemplateCsv = () => {
    let type:
      | "CPT"
      | "HCPCS"
      | "LOINC"
      | "ICD"
      | "PATIENT"
      | "PROVIDER"
      | "DRUG" = "CPT";
    let fileName: string;
    switch (formik.values.category) {
      case "CPT":
        type = "CPT";
        fileName = "CPT";
        formik.setFieldValue("title", "");
        break;
      case "HCPCS":
        type = "HCPCS";
        fileName = "HCPCS";
        formik.setFieldValue("title", "");
        break;
      case "LOINC":
        type = "LOINC";
        fileName = "LONIC";
        formik.setFieldValue("title", "");
        break;
      case "ICD":
        type = "ICD";
        fileName = "ICD";
        formik.setFieldValue("title", "");
        break;
      case "PATIENT":
        type = "PATIENT";
        fileName = "Patient";
        formik.setFieldValue("title", "");
        break;
      case "PROVIDER":
        type = "PROVIDER";
        fileName = "Provider";
        formik.setFieldValue("title", "");
        break;
      case "DRUG":
        type = "DRUG";
        fileName = "DRUG";
        formik.setFieldValue("title", "");
        break;
      default:
        type = "PROVIDER";
        fileName = "Provider";
        formik.setFieldValue("title", "");
        break;
    }

    MigrationControllerService.downloadTemplate(type).then((res) => {
      if (res) {
        const blob = new Blob([res], { type: "text/csv" });
        let link = document.createElement("a");
        link.download = fileName;
        link.href = window.URL.createObjectURL(blob);
        link.click();
      }
    });
  };

  const UploadFile = (files: any) => {
    // console.log("🚀 ~ UploadFile ~ files:", files)
    formik.setFieldValue("title", files?.[0]?.path);
    formik.setFieldValue("formData.file", files);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) =>
      handleSubmit(values, { setSubmitting }),
  });

  return (
    <React.Fragment key={"UploadCSVForm"}>
      <Dialog open={open} fullWidth onClose={handleClose} maxWidth="md">
        <DialogTitle
          id="scroll-dialog-title"
          sx={{ background: "#F5F6F9", marginBottom: "15px" }}
        >
          <Typography sx={formTitle}>{title}</Typography>
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <form>
            <Grid container spacing={2}>
              <Grid item container xs={6}>
                <Grid item xs={12}>
                  <CustomFormLabel
                    label={"Entity Type"}
                    source={CHANGE}
                    isRequired={true}
                  />
                </Grid>
                <Grid item xs={12}>
                  <SelectInput
                    placeholder="Select"
                    name="category"
                    options={entityType}
                    onChange={(e: any) => {
                      formik.setFieldValue("category", e.target.value);
                      setAllowValidation(
                        formik.values.category === "PROVIDER" ? true : false
                      );
                    }}
                  />
                  {formik.touched.category && formik.errors.category && (
                    <FormHelperText error>
                      {formik.errors.category}
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>
              {!props.providerGroupUuid &&
                formik.values.category === "PROVIDER" && (
                  <Grid item container xs={6}>
                    <Grid item xs={12}>
                      <CustomFormLabel
                        label={"Provider Group Name"}
                        source={CHANGE}
                        isRequired={props.providerGroupUuid ? true : false}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Paper sx={{ boxShadow: "0px 0px 8px #00000029" }}>
                        <Autocomplete
                          {...defaultProps}
                          id="controlled-demo"
                          value={value}
                          //   disabled={props.providerGroupUuid ? true : false}
                          sx={{
                            "& .MuiInput-root .MuiInput-input": {
                              padding: "8px 8px 4px 14px !important",
                            },
                            height: "42px",
                            // "& .css-19ssnuc-MuiInputBase-root-MuiInput-root:before ": {
                            //   borderBottom: 'none !important'
                            // },
                            // boxShadow: '0px 0px 8px #00000029'
                          }}
                          // disabled={props.providerGroupUuid ? true : false}
                          onChange={(_event: any, newValue: any) => {
                            props.providerGroupUuid
                              ? setValue(props.providerGroupUuid)
                              : setValue(newValue);
                            props.providerGroupUuid
                              ? formik.setFieldValue(
                                  "providerGroupUuid",
                                  props.providerGroupUuid
                                )
                              : formik.setFieldValue(
                                  "providerGroupUuid",
                                  newValue.uuid
                                );
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Search Here"
                              onChange={(e) =>
                                setProviderGroupName(e.target.value)
                              }
                              variant="standard"
                            />
                          )}
                        />
                      </Paper>
                      {formik.touched.providerGroupUuid &&
                        formik.errors.providerGroupUuid && (
                          <FormHelperText error>
                            {formik.errors.providerGroupUuid}
                          </FormHelperText>
                        )}
                    </Grid>
                  </Grid>
                )}
              {formik.values.category === "PATIENT" && (
                <>
                  <Grid item container xs={3}>
                    <Grid item xs={12}>
                      <CustomFormLabel
                        label={"Provider Group Location"}
                        source={CHANGE}
                        isRequired={props.providerGroupUuid ? true : false}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Paper sx={{ boxShadow: "0px 0px 8px #00000029" }}>
                        <Autocomplete
                          {...defaultLocationProps}
                          id="controlled-demo"
                          // value={formik.values.locationUuid}
                          sx={{
                            "& .MuiInput-root .MuiInput-input": {
                              padding: "8px 8px 4px 14px !important",
                            },
                            height: "42px",
                          }}
                          onChange={(_event: any, newValue: any) => {
                            formik.setFieldValue("locationUuid", newValue);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Search Here"
                              // onChange={(e) =>
                              //   setProviderGroupName(e.target.value)
                              // }
                              variant="standard"
                            />
                          )}
                        />
                      </Paper>
                      {formik.touched.providerGroupUuid &&
                        formik.errors.providerGroupUuid && (
                          <FormHelperText error>
                            {formik.errors.providerGroupUuid}
                          </FormHelperText>
                        )}
                    </Grid>
                  </Grid>
                  <Grid item container xs={3}>
                    <Grid item xs={12}>
                      <Dropdown
                        onChange={(e: any) =>
                          formik.setFieldValue("providerUuid", e.target.value)
                        }
                        name={"provider"}
                        options={providerList}
                        value={formik.values.providerUuid}
                        mapName="firstName"
                        mapLastName="lastName"
                        placeholder="Select Primary Provider"
                        label={"Primary Provider"}
                        isRequired={true}
                        mapBy="uuid"
                        error
                      />
                      {formik.touched.providerGroupUuid &&
                        formik.errors.providerGroupUuid && (
                          <FormHelperText error>
                            {formik.errors.providerGroupUuid}
                          </FormHelperText>
                        )}
                    </Grid>
                  </Grid>
                </>
              )}
              <Grid item xs={9}>
                <Timeline
                  sx={{
                    [`& .${timelineItemClasses.root}:before`]: {
                      flex: 0,
                      padding: 0,
                    },
                    padding: 0,
                  }}
                >
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot color="primary" sx={sxs.timeLineDots}>
                        1
                      </TimelineDot>
                      <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
                    </TimelineSeparator>
                    <TimelineContent>
                      Download CVS File
                      <TimelineContent>
                        <ButtonBase
                          disabled={formik.values.category.length === 0}
                          sx={sxs.downloadCsvBtn}
                          onClick={downloadTemplateCsv}
                        >
                          <FileDownloadOutlinedIcon color="primary" />
                          Download Blank CSV Template
                        </ButtonBase>
                      </TimelineContent>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot color="primary" sx={sxs.timeLineDots}>
                        2
                      </TimelineDot>
                      <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
                    </TimelineSeparator>
                    <TimelineContent>
                      Add or edit entity info in CSV templete.
                      <TimelineContent>
                        <TemplateTable />
                      </TimelineContent>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot color="primary" sx={sxs.timeLineDots}>
                        3
                      </TimelineDot>
                    </TimelineSeparator>
                    <TimelineContent>
                      Upload CSV File
                      <TimelineContent sx={{ width: "70%" }}>
                        <DropzoneArea
                          dropzoneText="Attach CSV File"
                          showFileNames
                          // maxFileSize={1048576} // 1 MB in bytes
                          filesLimit={1}
                          acceptedFiles={[".csv", "text/csv"]}
                          showAlerts={
                            formik.touched.formData?.file &&
                            Boolean(formik.errors.formData?.file)
                          }
                          onDropRejected={() => {
                            formik.setFieldError("formData.file", "Required");
                          }}
                          // onDropRejected={(e) => { formik.setFieldError('formData.file', 'Required') }}
                          onChange={(files: any) => UploadFile(files)}
                          classes={{
                            root: uploadClasses.dropZone,
                            icon: uploadClasses.uploadIcon,
                            text: uploadClasses.textUploadZone,
                          }}
                        />
                        {formik.touched.formData?.file &&
                          formik.errors.formData?.file && (
                            <FormHelperText error>
                              {"Please select the csv file"}
                            </FormHelperText>
                          )}
                      </TimelineContent>
                    </TimelineContent>
                  </TimelineItem>
                </Timeline>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions
          sx={{
            paddingRight: "20px !important",
            gap: "10px",
            ...formBottom,
          }}
        >
          <ButtonBase
            onClick={handleClose}
            sx={formButtonStyle.cancelButtonStyle}
          >
            {CANCEL}
          </ButtonBase>
          <ButtonBase
            type="submit"
            sx={formButtonStyle.saveButtonStyle}
            disabled={formik.isSubmitting}
            onClick={formik.submitForm}
          >
            {UPLOAD}
          </ButtonBase>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
