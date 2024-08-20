import {
  Autocomplete,
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
  TextField,
  Typography,
} from "@mui/material";
import { DialogWidth, allergyStyle } from "../allergies/add-allergies";
import CustomFormLabel from "../../../../../../../components/common/custom-form-label";
import {
  commonWidget,
  formButtonStyle,
  formTitle,
  formBottom,
} from "../../../../../../../styles/common";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
// import SelectInput from "../../../../../../../components/common/select-input";
import { adminConstants } from "../../../../../../../constants/admin";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";
import {
  selectStatus,
  selectType,
} from "../../../../../../../components/common/form-enum";
import {
  useMedicalCodeControllerServiceGetAllMedicalCodes,
  useProblemsControllerServiceAddPatientProblems,
  useProblemsControllerServiceUpdatePatientProblem,
} from "../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import dayjs from "dayjs";
import CloseIcon from "@mui/icons-material/Close";
import { BillingCodes } from "../../../../../../../sdk/thinkemr-core-0.0.1/requests";
import { getLoggedInUser } from "../../../../../../../components/common/enums-and-interfaces/common-functions";
import id from "date-fns/esm/locale/id/index.js";
import * as yup from "yup";
import { alertAction } from "../../../../../../../store/features/common-actions/snackbar/alertSlice";
import { useDispatch } from "react-redux";
import Loading from "../../../../../../../components/common/spinner/loading";

const { ADD, CANCEL,SAVE } = adminConstants;

interface RenderButtonProps {
  name: string;
  label: boolean;
  btnActive?: boolean;
}

interface RenderTypeProps {
  name: string;
  label: string;
  btnActive?: boolean;
}

type Props = {
  title: string;
  open: boolean;
  patientDetails: any;
  editDiagnoses?: any;
  onClose: () => void;
};

function AddEditDiagnosesModal(props: Props) {
  const classes = commonWidget();
  const subStyles = allergyStyle();
  const dispatch = useDispatch();
  const selectRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(dayjs("0"));
  const [diagnosesList, setDiagnosesList] = useState([]);
  const [initialValues, setInitialValues] = useState({
    active: true,
    archive: false,
    id: "",
    uuid: "",
    billingCodes: null,
    patient: {
      uuid: props?.patientDetails?.uuid || "-",
    },
    type: "CHRONIC",
    diagnosedDate: "",
    note: "",
  });
  const [diagnosesNamePagination, setdiagnosesNamePagination] = useState({
    page: 0,
    size: 20,
  });

  const validationSchema = yup.object().shape({
    billingCodes: yup.object().shape({
      description: yup.string().required("Diagnosis name is required"),
    }),
    // diagnosedDate: yup.string().required("Diagnosed date is required"),
    // note: yup.string().required("Diagnosed date is required"),
  });
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

  const { mutateAsync } = props.editDiagnoses
    ? useProblemsControllerServiceUpdatePatientProblem()
    : useProblemsControllerServiceAddPatientProblems();

  const { data,isLoading } = useMedicalCodeControllerServiceGetAllMedicalCodes({
    codeType: BillingCodes.type.ICD,
    page: diagnosesNamePagination.page,
    size: diagnosesNamePagination.size,
    sortBy: "",
    sortDirection: "",
    searchString: "",
    providerGroupUuid: getLoggedInUser().providerGroup || "",
  });

  async function handleMenuScroll(event: any) {
    const selectMenu: any = selectRef.current;
    const isNearBottom =
      event.target.scrollTop + event.target.clientHeight >=
      event.target.scrollHeight - 1;
    if (selectMenu && isNearBottom && !isLoading) {
      setdiagnosesNamePagination((prev) => ({
        ...prev,
        size: diagnosesNamePagination.size + 20,
      }));
    }
  }  

  useEffect(() => {
    if (!!data) {
      setDiagnosesList(data?.data?.content);
    }
  }, [data]);

  useEffect(() => {
    if (props.editDiagnoses) {
      patchData(props.editDiagnoses);
    }
  }, [props]);
 

  function patchData(editData: any) {
    Object.keys(editData).map((key) => {
      formik.setFieldValue(
        key === "name" ? "billingCodes" : key,
        editData[key]
      );
    });

    setSelectedDate(dayjs(editData.diagnosedDate));
  }

  const RenderStatusButton: React.FC<RenderButtonProps> = ({ label, name }) => {
    return (
      <ButtonBase
        className={
          formik.values.active === label
            ? subStyles.buttonActive
            : subStyles.buttonDeactive
        }
        onClick={() => {
          formik.setFieldValue("active", label);
        }}
        focusRipple
      >
        <Typography
          variant="h5"
          className={
            formik.values.active === label
              ? subStyles.buttonTypoActive
              : subStyles.buttonTypoDeactive
          }
        >
          {name}
        </Typography>
      </ButtonBase>
    );
  };

  const RenderTypeButton: React.FC<RenderTypeProps> = ({ label, name }) => {
    return (
      <ButtonBase
        className={
          formik.values.type === label
            ? subStyles.buttonActive
            : subStyles.buttonDeactive
        }
        onClick={() => {
          formik.setFieldValue("type", label);
        }}
        focusRipple
      >
        <Typography
          variant="h5"
          className={
            formik.values.type === label
              ? subStyles.buttonTypoActive
              : subStyles.buttonTypoDeactive
          }
        >
          {name}
        </Typography>
      </ButtonBase>
    );
  };

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    const payload = { ...values };
    payload.billingCodes = {
      uuid: values?.billingCodes?.uuid,
    };

    try {
      mutateAsync({ requestBody: payload })
        .then((res: any) => {
          props.onClose();
          formik.resetForm();
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

    setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) =>
      handleSubmit(values, { setSubmitting }),
  });

  const defaultProps = {
    options: diagnosesList || [],
    getOptionLabel: (option: any) => {
      return `${option.code + " " + option.description}`;
    },
  };

  const close = () => {
    props.onClose();
    formik.resetForm();
  };

  return (
    <>
      <Dialog open={props.open} sx={DialogWidth}>
        <DialogTitle id="scroll-dialog-title">
          <Grid
            container
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Grid item>
              <Typography sx={formTitle}>{props.title}</Typography>
            </Grid>
            <Grid item>
              <ButtonBase onClick={close}>
                <CloseIcon />
              </ButtonBase>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <form action="" onSubmit={formik.handleSubmit}>
            <Box>
              <Box sx={{ width: "100%" }}></Box>
              <Box
                sx={{
                  display: "flex",
                  marginTop: "10px",
                  gap: "20px",
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <CustomFormLabel label="Diagnoses Name" isRequired={true} />
                  {/* <Autocomplete
                    {...defaultProps}
                    sx={{
                      borderRadius: "5px",
                      // background: "#ffffff",
                      // marginTop: "10px",
                      border:
                        formik.touched.billingCodes &&
                        formik.errors.billingCodes
                          ? "1px solid red"
                          : "none",
                      "& fieldset": { border: "none" },
                      ".MuiOutlinedInput-notchedOutline": { border: "none" },
                      boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",

                      ".MuiOutlinedInput-root": {
                        padding: "0px !important",
                        height: "42px !important",
                      },
                      ".MuiInputBase-root": {
                        padding: "4px !important",
                        height: "42px !important",
                        fontSize: "14px !important",
                      },
                      ".MuiChip-root": {
                        height: "28px !important",
                      },
                    }}
                    ref={selectRef}
                    id="controlled-demo"
                    value={formik.values?.billingCodes}
                    defaultValue={initialValues.billingCodes}
                    onScrollCapture={handleMenuScroll}
                    onChange={(_event: any, newValue: any) => {
                      formik.setFieldValue("billingCodes", newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        placeholder="Select"
                      />
                    )}
                  /> */}
                <Select
                  className={classes.selectInputStyle}
                  ref={selectRef}
                  value={formik.values?.billingCodes}
                  name="billingCodes" 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} 
                  onScrollCapture={handleMenuScroll}
                  renderValue={(selected:any) => {
                    if (!selected) {
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
                    return <Typography variant="h5">{selected?.code+" "+selected?.description}</Typography>;
                  }}
                  MenuProps={MenuProps}
                  displayEmpty
                >
                  {diagnosesList.map((data:any) => {
                    return (
                      <MenuItem
                        key={data?.id}
                        value={data}
                        className={classes.menuItemColorStyle}
                      >
                        {data?.code+" "+data?.description}
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
                  {formik.touched.billingCodes &&
                    formik.errors.billingCodes && (
                      <FormHelperText error>
                        {formik.errors.billingCodes}
                      </FormHelperText>
                    )}
                </Box>
              </Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "2fr 2fr",
                  gap: "20px",
                  marginTop: "20px",
                }}
              >
                <Box>
                  <CustomFormLabel label="Status" />
                  <Box className={subStyles.buttonGrid1}>
                    {selectStatus.map((data: any) => {
                      return (
                        <RenderStatusButton
                          label={data.label}
                          name={data.name}
                        />
                      );
                    })}
                  </Box>
                </Box>
                <Box>
                  <CustomFormLabel label="Type" />
                  <Box className={subStyles.buttonGrid1}>
                    {selectType.map((data: any) => {
                      return (
                        <RenderTypeButton label={data.label} name={data.name} />
                      );
                    })}
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "2fr 2fr",
                  gap: "20px",
                  marginTop: "20px",
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <CustomFormLabel label=" Onset Date" isRequired={false} />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      disableFuture={true}
                      value={
                        formik.values.diagnosedDate
                          ? dayjs(formik.values.diagnosedDate)
                          : null
                      }
                      sx={{
                        "& .MuiInputBase-input": {
                          padding: "10px !important",
                        },
                        width: "100%",
                        "& fieldset": { border: "none" },
                        boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                        borderRadius: "4px",
                        "& label": {
                          color: "#1A1A1A80 !important",
                          fontSize: "14px !important",
                        },
                        "& .MuiInputBase-root": {
                          height: "42px",
                          fontSize: "14px",
                          borderRadius: "5px",
                          // border: formik.touched.diagnosedDate && formik.errors.diagnosedDate
                          //   ? "1px solid red"
                          //   : "",
                        },
                      }}
                      onChange={(e: any) => {
                        const date = moment(e.$d).format("yyyy-MM-DD");
                        formik.setFieldValue("diagnosedDate", date);
                      }}
                    />
                  </LocalizationProvider>
                  {/* {formik.touched.diagnosedDate &&
                    formik.errors.diagnosedDate && (
                      <FormHelperText error>
                        {formik.errors.diagnosedDate}
                      </FormHelperText>
                    )} */}
                </Box>
              </Box>
              <Box
                sx={{
                  marginTop: "20px",
                }}
              >
                <CustomFormLabel label="Note" isRequired={false} />
                <InputBase
                  onChange={(e) => formik.setFieldValue("note", e.target.value)}
                  fullWidth
                  multiline={true}
                  rows="3"
                  value={formik.values.note}
                  name="note"
                  onBlur={formik.handleBlur}
                  error={!!formik.touched.note && !!formik.errors.note}
                  placeholder="Type here"
                  classes={{
                    root: classes.providerTextAreaField,
                    input: classes.textFieldInput,
                    focused: classes.textFieldActive,
                    error: classes.inputBoxError,
                  }}
                />
                {/* {formik.touched.note && formik.errors.note && (
                  <FormHelperText error>{formik.errors.note}</FormHelperText>
                )} */}
              </Box>
            </Box>
          </form>
        </DialogContent>
        <DialogActions
          sx={{ paddingRight: "20px !important", gap: "10px", ...formBottom }}
        >
          <ButtonBase onClick={close} sx={formButtonStyle.cancelButtonStyle}>
            {CANCEL}
          </ButtonBase>
          <ButtonBase
            type="submit"
            sx={formButtonStyle.saveButtonStyle}
            onClick={formik.submitForm}
          >
            {props.title==="Edit Diagoses"?SAVE:ADD}
          </ButtonBase>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddEditDiagnosesModal;
