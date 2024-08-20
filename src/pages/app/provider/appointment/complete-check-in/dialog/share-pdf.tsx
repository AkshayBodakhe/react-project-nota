import * as React from "react";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import CustomFormLabel from "../../../../../../components/common/custom-form-label";
import FormHelperText from "@mui/material/FormHelperText";
import {
  actionBtns,
  commonWidget,
  formButtonStyle,
  formTitle,
} from "../../../../../../styles/common";
import { useFormik } from "formik";
import {
  useCarePatientChartControllerServiceSharePatientDetails1,
  useEncounterCarePortalControllerServiceShareEncounterDetails1,
  useEncounterControllerServiceShareEncounterDetails,
  usePatientControllerServiceSharePatientDetails,
} from "../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { useDispatch } from "react-redux";
import { alertAction } from "../../../../../../store/features/common-actions/snackbar/alertSlice";

interface sharePDFProps {
  open: boolean;
  onClose: () => void;
  message: string;
  source: string;
  uuid: string;
}

function SharePDF(props: sharePDFProps) {
  const { open, onClose, message, source, uuid } = props;

  const dispatch = useDispatch();
  const classes = commonWidget();
  const [emailID, setemailId] = React.useState("");
  const [isData, setIsData] = React.useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter the valid email"
      )
      .required("Please enter the email"),
  });

  const {
    mutate: mutateGlobalEncounter,
    data: globalEncounterData,
    isError: globalEncounterIsError,
    isSuccess: globalEncounterIsSuccess,
  } = useEncounterControllerServiceShareEncounterDetails();

  const {
    mutate: mutateCareEncounter,
    data: careEncounterData,
    isError: careEncounterIsError,
    isSuccess: careEncounterIsSuccess,
  } = useEncounterCarePortalControllerServiceShareEncounterDetails1();

  const {
    mutate: mutateCarePatientCharting,
    data: carePatientChartingData,
    isError: carePatientChartingIsError,
    isSuccess: carePatientChartingIsSuccess,
  } = useCarePatientChartControllerServiceSharePatientDetails1();

  const {
    mutate: mutatePatientCharting,
    data: patientChartingData,
    isError: patientChartingIsError,
    isSuccess: patientChartingIsSuccess,
  } = usePatientControllerServiceSharePatientDetails();

  React.useEffect(() => {
    if (
      globalEncounterIsSuccess ||
      careEncounterIsSuccess ||
      carePatientChartingIsSuccess ||
      patientChartingIsSuccess
    ) {
      dispatch(
        alertAction.setAlert({
          open: true,
          message: "Email Sent Successfully",
          severity: "success",
        })
      );
    }
  }, [
    globalEncounterIsSuccess,
    careEncounterIsSuccess,
    carePatientChartingIsSuccess,
    patientChartingIsSuccess,
    dispatch,
  ]);

  const handleSubmit = async (values: any) => {
    try {
      if (source === "CareEncounter") {
        await mutateCareEncounter({
          encounterUuid: uuid,
          emailId: values.email,
        });
      } else if (source === "GlobalEncounter") {
        await mutateGlobalEncounter({
          encounterUuid: uuid,
          emailId: values.email,
        });
      } else if (source === "CarepatientCharting") {
        await mutateCarePatientCharting({
          patientUuid: uuid,
          emailId: values.email,
        });
      } else if (source === "GlobalPatientCharting") {
        await mutatePatientCharting({
          patientUuid: uuid,
          emailId: values.email,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    onClose();
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Dialog maxWidth="sm" fullWidth={true} onClose={onClose} open={open}>
        <DialogTitle id="scroll-dialog-title" sx={formTitle}>
          <Grid container alignItems={"center"}>
            <Grid
              item
              xs={11}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              {"Share Pdf"}
            </Grid>

            <Grid item xs={1} sx={{ display: "flex", justifyContent: "end" }}>
              <ButtonBase
                onClick={() => {
                  formik.resetForm();
                  onClose();
                }}
              >
                <CloseIcon />
              </ButtonBase>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid mx={2} pb={3} pt={1}>
            <Box mb={1.5}>
              <CustomFormLabel
                label={
                  "Enter your email address to receive the PDF of this " +
                  message
                }
                isRequired={true}
              />
            </Box>
            <InputBase
              fullWidth
              placeholder="Enter the Email"
              name="email"
              value={formik.values.email}
              onChange={(e) => formik.setFieldValue("email", e.target.value)}
              error={!!(formik.errors.email && formik.touched.email)}
              onBlur={formik.handleBlur}
              classes={{
                root: classes.textFieldRoot,
                input: classes.textFieldInput,
                focused: classes.textFieldActive,
                error: classes.inputBoxError,
              }}
            />
            {formik.touched.email && formik.errors.email && (
              <FormHelperText error>{formik.errors.email}</FormHelperText>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid sx={actionBtns} p={1}>
            <ButtonBase
              onClick={() => {
                formik.resetForm();
                onClose();
              }}
              sx={{ ...formButtonStyle.cancelButtonStyle, fontSize: "16px" }}
            >
              Cancel
            </ButtonBase>
            <ButtonBase
              sx={{ ...formButtonStyle.saveButtonStyle, fontSize: "16px" }}
              onClick={() => {
                formik.submitForm();
              }}
            >
              {"Share"}
            </ButtonBase>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SharePDF;
