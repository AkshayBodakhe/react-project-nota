import { Close } from "@mui/icons-material";
import {
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Grid,
  InputBase,
  Typography,
} from "@mui/material";
import React from "react";
import { commonWidget, formButtonStyle } from "../../../../../../styles/common";

interface labProps {
  open: boolean;
  onClose: any;
  formikData: any;
}

function LabForm(props: labProps) {
  const { open, onClose, formikData } = props;
  const [scroll] = React.useState<DialogProps["scroll"]>("paper");
  const classes = commonWidget();

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle id="scroll-dialog-title">
          <Grid container justifyContent={"space-between"}>
            <Typography variant="h3">{"Lab Test"}</Typography>
            <Close onClick={onClose} sx={{ cursor: "pointer" }} />
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid my={2}>
              {/* <Typography variant="h3" color={"black"} fontWeight={"600"}>
                {"Lab Test"}
              </Typography>
              <Grid my={2}> */}
              <InputBase
                name={"encounterPlan.labTest"}
                value={formikData.values.encounterPlan?.labTest}
                onChange={formikData.handleChange}
                fullWidth
                multiline={true}
                rows="3"
                classes={{
                  root: classes.providerTextAreaField,
                  input: classes.textFieldInput,
                  focused: classes.textFieldActive,
                }}
                placeholder="Enter text"
              />
              {/* </Grid> */}
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonBase sx={formButtonStyle.saveButtonStyle} onClick={onClose}>
            <Typography color={"#fff"}>{"Add Lab Test"}</Typography>
          </ButtonBase>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default LabForm;
