import {
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
import dayjs from "dayjs";
import { useFormik } from "formik";
import { DropzoneArea } from "material-ui-dropzone";
import moment from "moment";
import { useEffect, useState } from "react";
import CustomDatePickerProps from "../../../../../../../../../components/common/custom-date-picker";
import { adminConstants } from "../../../../../../../../../constants/admin";
import {
  useDocumentTypeControllerServiceGetAllDocumentType,
  usePatientDocumentControllerServiceUploadDocument,
} from "../../../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import {
  commonWidget,
  formBottom,
  formButtonStyle,
  formTitle,
} from "../../../../../../../../../styles/common";
import { DialogFormProps } from "../../../enums-interfaces/interfaces";
import { labStyle } from "../../../history/family-history/add-edit-family-history";
import { alertAction } from "../../../../../../../../../store/features/common-actions/snackbar/alertSlice";
import { useDispatch } from "react-redux";
import providerGroupService from "../../../../../../../../../service/provider-group--service";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CalendarConst } from "../../../../../../home/provider-dashboard-const";
import * as Yup from "yup";
import CustomFormLabel from "../../../../../../../../../components/common/custom-form-label";

const DialogWidth = {
  ".css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    maxWidth: "600px !important",
  },
};

const { ADD, CANCEL, EDIT } = adminConstants;

export const getFileType = (type: any) => {
  if (type === "image/jpeg") {
    return "JPEG_IMAGE";
  } else if (type === "text/csv") {
    return "CSV";
  } else if (type === "image/png") {
    return "PNG_IMAGE";
  } else if (type === "image/svg+xml") {
    return "SVG_IMAGE";
  } else if (type === "application/pdf") {
    return "PDF";
  } else if (type === "application/docx") {
    return "MS_WORD";
  } else if (type === "audio/mpeg") {
    return "MPEG_AUDIO";
  } else if (type === "application/zip") {
    return "X_COMPRESSED";
  } else if (type === "application/x-gzip-compressed") {
    return "X_GZIP";
  } else if (type === "image/webp") {
    return "WEBP_IMAGE";
  } else if (type === "text/plain") {
    return "PLAIN";
  } else {
    return "OTHER";
  }
};

function UploadDocumentForm(props: DialogFormProps) {
  const classes = labStyle();
  const dispatch = useDispatch();
  const commonStyle = commonWidget();
  const { open, onClose, patientData, title, editData, refetch } = props;
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
  const initialValues = {
    name: "",
    type: "",
    date: "",
    file: {} as Blob,
  };
  const validationSchema = Yup.object().shape({
    date: Yup.string().required("Please select the date"),
  });

  const [DocumentType, setDocumentType] = useState([]);
  const [documentTypeId, setDocumentTypeId] = useState("");

  const { isSuccess, data } =
    useDocumentTypeControllerServiceGetAllDocumentType({});

  useEffect(() => {
    if (isSuccess && !!data) {
      setDocumentType(data?.data?.content);
    }
  }, [isSuccess, data]);

  const formattedDate = (dateString: any) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const handleSubmit = async (values: any) => {
    const rDate = formattedDate(values.date);
    let type = getFileType(values?.file[0]?.type);
    const formData = new FormData();
    formData.append("patientId", patientData?.uuid);
    formData.append("documentName", values.name);
    formData.append("documentTypes", documentTypeId);
    formData.append("recordedDate", rDate);
    formData.append("documentType", type);
    formData.append("file", values.file[0] || values.file);

    try {
      await providerGroupService
        .uploadDocumentForPatient(formData)
        .then((res) => {
          refetch();
          onClose();
          formik.resetForm();
          if (res?.code === "BAD_REQUEST") {
            dispatch(
              alertAction.setAlert({
                open: true,
                message: res?.message,
                severity: "error",
              })
            );
          } else if (res?.code === "OK") {
            dispatch(
              alertAction.setAlert({
                open: true,
                message: res?.message,
                severity: "success",
              })
            );
          }
        });
    } catch (_error) {
      dispatch(
        alertAction.setAlert({
          open: true,
          message: "Something went to wrong",
          severity: "error",
        })
      );
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Dialog open={open} onClose={onClose} sx={DialogWidth}>
        <DialogTitle id="scroll-dialog-title" sx={{ marginBottom: "15px" }}>
          <Typography sx={formTitle}>{title}</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item lg={6} xs={6}>
              <Typography variant="h5" className={classes.label}>
                Select Document Type
              </Typography>
              <Select
                className={[commonStyle.selectInputStyle].join(" ")}
                style={{ marginTop: "0px" }}
                value={formik.values.type}
                name="type"
                onChange={(e: any) => {
                  setDocumentTypeId(e.target.value?.uuid);
                  formik.setFieldValue("type", e.target.value?.type);
                }}
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
                          Select Type
                        </Typography>
                      </span>
                    );
                  }
                  return <Typography variant="h5">{selected}</Typography>;
                }}
                MenuProps={MenuProps}
                displayEmpty
              >
                {DocumentType?.map((data: any) => {
                  return (
                    <MenuItem
                      key={data.type}
                      value={data}
                      className={commonStyle.menuItemColorStyle}
                    >
                      {data.type}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
            <Grid item lg={6} xs={6}>
              <CustomFormLabel label="Date" isRequired={true} />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  onChange={(e) => formik.setFieldValue("date", e)}
                  value={""}
                  format="MM/DD/YYYY"
                  slotProps={{
                    textField: { size: "small" },
                  }}
                  sx={CalendarConst}
                />
              </LocalizationProvider>
              {formik.touched.date && formik.errors.date && (
                <FormHelperText error>{formik.errors.date}</FormHelperText>
              )}
            </Grid>
            <Grid item lg={12} xs={12}>
              <Typography variant="h5" className={classes.label}>
                Document Name
              </Typography>
              <InputBase
                fullWidth
                name="name"
                placeholder="Enter Name"
                value={formik.values.name}
                classes={{
                  root: commonStyle.textFieldFullWidth,
                  input: commonStyle.textFieldInput,
                  focused: commonStyle.textFieldActive,
                }}
                onChange={(e) => formik.setFieldValue("name", e.target.value)}
              />
            </Grid>
            <Grid item lg={12} xs={12}>
              <DropzoneArea
                dropzoneText="Drag & Drop files Or Browse Files"
                onChange={(files: any) => {
                  formik.setFieldValue("file", files);
                }}
                classes={{
                  root: classes.dropZone,
                  icon: classes.uploadIcon,
                  text: classes.textUploadZone,
                }}
              />
              <Typography
                variant="h5"
                sx={{ color: "#1A1A1A7F", marginTop: "2px" }}
              >
                Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{ paddingRight: "20px !important", gap: "10px", ...formBottom }}
        >
          <ButtonBase onClick={onClose} sx={formButtonStyle.cancelButtonStyle}>
            {CANCEL}
          </ButtonBase>
          <ButtonBase
            sx={formButtonStyle.saveButtonStyle}
            onClick={formik.submitForm}
          >
            {editData ? EDIT : ADD}
          </ButtonBase>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UploadDocumentForm;
