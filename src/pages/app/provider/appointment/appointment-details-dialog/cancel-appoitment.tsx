import { Close } from "@mui/icons-material";
import {
  Box,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputBase,
  Typography,
} from "@mui/material";
import CustomFormLabel from "../../../../../components/common/custom-form-label";
import { commonWidget, formButtonStyle } from "../../../../../styles/common";
import { useAppointmentControllerServiceCancelAppointment } from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import { useFormik } from "formik";
import * as Yup from "yup";
import { alertAction } from "../../../../../store/features/common-actions/snackbar/alertSlice";
import { useDispatch } from "react-redux";
import { ErrorResponseEntity } from "../../../../../components/common/enums-and-interfaces/interfaces";
import { useEffect } from "react";

interface cancelAptProps {
  open: boolean;
  onClose: any;
  appointmentDetails: any;
}

function CancelAppointment(props: cancelAptProps) {
  const { open, onClose, appointmentDetails } = props;
  const classes = commonWidget();
  const dispatch = useDispatch();

  const { mutateAsync, error, isError } =
    useAppointmentControllerServiceCancelAppointment();

  const initilalFormValues = {
    reasonForCancellation: "",
  };

  const formValidationSchema = Yup.object().shape({});

  const handleCompleteCheckIn = async (values: any) => {
    const requestBody = {
      appointmentId: appointmentDetails.appointmentId,
      reasonForCancellation: values.reasonForCancellation,
    };
    await mutateAsync({
      requestBody: requestBody,
    }).then((res: any) => {
      dispatch(
        alertAction.setAlert({
          open: true,
          message: res.message,
          severity: "success",
        })
      );
      onClose();
    });
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

  const formikData = useFormik({
    initialValues: initilalFormValues,
    validationSchema: formValidationSchema,
    onSubmit: handleCompleteCheckIn,
  });

  return (
    <>
      <form>
        <Dialog open={open} fullWidth onClose={onClose} maxWidth="sm">
          <DialogTitle
            id="scroll-dialog-title"
            sx={{
              background: "#F5F6F9",
              marginBottom: "15px",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Close sx={{ cursor: "pointer" }} onClick={onClose} />
          </DialogTitle>
          <DialogContent>
            <Grid>
              <CustomFormLabel
                label={"Enter the reason for cancelling the appointment"}
              />
              <Box pt={2}>
                <InputBase
                  name={"reasonForCancellation"}
                  value={formikData.values.reasonForCancellation}
                  onChange={formikData.handleChange}
                  fullWidth
                  multiline={true}
                  rows="3"
                  classes={{
                    root: classes.providerTextAreaField,
                    input: classes.textFieldInput,
                    focused: classes.textFieldActive,
                  }}
                  placeholder="Type here"
                />
              </Box>
            </Grid>
          </DialogContent>
          <DialogActions>
            <ButtonBase
              type="submit"
              sx={formButtonStyle.saveButtonStyle}
              onClick={formikData.submitForm}
            >
              <Typography color={"#fff"}>{"Confirm"}</Typography>
            </ButtonBase>
          </DialogActions>
        </Dialog>
      </form>
    </>
  );
}
export default CancelAppointment;
