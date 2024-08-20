import React, { useEffect, useState } from "react";
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
import CloseIcon from "@material-ui/icons/Close";
import CustomFormLabel from "../../../../../../../../../components/common/custom-form-label";
import {
  actionBtns,
  commonWidget,
  formButtonStyle,
} from "../../../../../../../../../styles/common";
import { ErrorResponseEntity } from "../../../../../../../../../components/common/enums-and-interfaces/interfaces";
import { alertAction } from "../../../../../../../../../store/features/common-actions/snackbar/alertSlice";
import { useDispatch } from "react-redux";
import { useCustomFormControllerServiceCreateDuplicateIntakeForm } from "../../../../../../../../../sdk/thinkemr-core-0.0.1/queries";

type customDialogProps = {
  open: boolean;
  handleClose: any;
  dialogTitle?: string;
  rowData?: any;
  calledIntakeTable?: any;
};

const CustomFormDialog = (props: customDialogProps) => {
  const { dialogTitle, open, handleClose, rowData, calledIntakeTable } = props;
  const [nameValue, setNameValue] = useState("");
  const classes = commonWidget();
  const dispatch = useDispatch();
  const { mutateAsync, error, isError } =
    useCustomFormControllerServiceCreateDuplicateIntakeForm();

  const handleSubmitForm = () => {
    if (rowData.uuid && nameValue) {
      mutateAsync({
        requestBody: {
          uuid: rowData && rowData?.uuid,
          title: nameValue,
        },
      }).then((res: any) => {
        dispatch(
          alertAction.setAlert({
            open: true,
            message: res.message as string,
            severity: "success",
          })
        );
        handleClose();
        calledIntakeTable();
      });
    }
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

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle id="scroll-dialog-title">
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item sx={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="h3"> {dialogTitle}</Typography>
            </Grid>
            <Grid item sx={{ display: "flex", justifyContent: "end" }}>
              <ButtonBase onClick={handleClose}>
                <CloseIcon />
              </ButtonBase>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Box>
            <CustomFormLabel label="New Name Of Intake Form" />
            <Grid mt={2}>
              <InputBase
                fullWidth
                //   onBlur={handleBlur}
                onChange={(e) => {
                  setNameValue(e.target.value);
                }}
                //   error={!!(errors.templateName && touched.templateName)}
                name=""
                //   value={values.templateName}
                placeholder="Enter name"
                classes={{
                  root: classes.textFieldRoot,
                  input: classes.textFieldInput,
                  focused: classes.textFieldActive,
                  error: classes.inputBoxError,
                }}
              />
            </Grid>
            {/* {touched.templateName && errors.templateName && (
              <FormHelperText error>{errors.templateName}</FormHelperText>
            )} */}
          </Box>
        </DialogContent>
        <DialogActions sx={actionBtns}>
          <ButtonBase
            sx={formButtonStyle.saveButtonStyle}
            // disabled={formik.isSubmitting || !formik.isValid}
            onClick={handleSubmitForm}
          >
            {"Save & Make a Copy"}
          </ButtonBase>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CustomFormDialog;
