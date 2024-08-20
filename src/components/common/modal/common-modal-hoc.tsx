import React, { ComponentType } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  FormHelperText,
  Grid,
  InputBase,
} from "@mui/material";
import {
  actionBtns,
  formBottom,
  formButtonStyle,
  formTitle,
} from "../../../styles/common";

// Define the HOC type
interface WithCommonModalProps {
  handleClose: () => void;
  open: boolean;
  dialogTitle: string;
  buttonName?: string;
  onSubmitFun?: (data: any) => void;
  formik?: any;
}

// Define the HOC function
export const withCommonModal =
  (WrappedComponent: React.ComponentType<any>) =>
  (props: WithCommonModalProps) => {
    const { open, handleClose, dialogTitle, buttonName, onSubmitFun, ...rest } =
      props;

    return (
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle id="scroll-dialog-title" sx={formTitle}>
          <Grid container alignItems={"center"}>
            <Grid
              item
              xs={11}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              {dialogTitle}
            </Grid>
            <Grid item xs={1} sx={{ display: "flex", justifyContent: "end" }}>
              <ButtonBase onClick={handleClose}>
                <CloseIcon />
              </ButtonBase>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          {/* Render the dynamic component passed through props */}
          {<WrappedComponent {...rest} />}
        </DialogContent>
        {buttonName && (
          <DialogActions sx={formBottom}>
            <Grid sx={actionBtns} p={1}>
              <ButtonBase
                onClick={handleClose}
                sx={formButtonStyle.cancelButtonStyle}
              >
                Cancel
              </ButtonBase>
              <ButtonBase
                type="submit"
                sx={formButtonStyle.saveButtonStyle}
                // disabled={formik.isSubmitting || !formik.isValid}
                onClick={onSubmitFun}
              >
                {buttonName}
              </ButtonBase>
            </Grid>
          </DialogActions>
        )}
      </Dialog>
    );
  };
