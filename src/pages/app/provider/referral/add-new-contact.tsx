import CloseIcon from "@mui/icons-material/Close";
import {
  ButtonBase,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  InputBase,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { commonWidget, formButtonStyle } from "../../../../styles/common";
import {style} from './style/common-style'

interface AddNewContactProps {
  title: string;
  onClose: () => void;
  open: boolean;
}

function AddNewContact(props: AddNewContactProps) {
  const { onClose, open, title } = props;
  const classes = style();
  const commonStyle = commonWidget();
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
  const [state, setState] = useState("");
  const handleSelectOption = (e: string) => {
    setState(e);
  };
  const stateList = ["Maharashtra", "Goa"];
  const close = () =>{
    onClose();
  }

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="md">
      <DialogTitle>
        <Grid className={classes.dialogTitle}>
          <Grid>
            <Typography variant="h4" style={{ fontWeight: "bold" }}>
              {title}
            </Typography>
          </Grid>
          <Grid style={{ cursor: "pointer" }}>
            <CloseIcon onClick={close} />
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="scroll-dialog-description"
          // ref={descriptionElementRef}
          tabIndex={-1}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" className={classes.label}>
                Full Name
              </Typography>
              <InputBase
                type="text"
                placeholder="Enter Full Name"
                classes={{
                  root: classes.textFieldFullWidth,
                  input: commonStyle.textFieldInput,
                  focused: commonStyle.textFieldActive,
                  error: commonStyle.inputBoxError,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5" className={classes.label}>
                Contact Number
              </Typography>
              <InputBase
                id="Contact Number"
                type="text"
                name="Contact Number"
                placeholder="Enter Contact Number"
                classes={{
                  root: classes.textFieldFullWidth,
                  input: commonStyle.textFieldInput,
                  focused: commonStyle.textFieldActive,
                  error: commonStyle.inputBoxError,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5" className={classes.label}>
                Fax Number
              </Typography>
              <InputBase
                id="Fax Number"
                type="text"
                name="Fax"
                placeholder="Enter Fax Number"
                classes={{
                  root: classes.textFieldFullWidth,
                  input: commonStyle.textFieldInput,
                  focused: commonStyle.textFieldActive,
                  error: commonStyle.inputBoxError,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5" className={classes.label}>
                Email Id
              </Typography>
              <InputBase
                id="Email Id"
                type="text"
                name="Email"
                placeholder="Enter Email Id"
                classes={{
                  root: classes.textFieldFullWidth,
                  input: commonStyle.textFieldInput,
                  focused: commonStyle.textFieldActive,
                  error: commonStyle.inputBoxError,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5" className={classes.label}>
                Address Line 1
              </Typography>
              <InputBase
                id="Address Line 1"
                type="text"
                name="Address Line 1"
                placeholder="Enter Address Line 1"
                classes={{
                  root: classes.textFieldFullWidth,
                  input: commonStyle.textFieldInput,
                  focused: commonStyle.textFieldActive,
                  error: commonStyle.inputBoxError,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5" className={classes.label}>
                Address Line 2
              </Typography>
              <InputBase
                id="Address Line 2"
                type="text"
                name="Address Line 2"
                placeholder="Enter Address Line 2"
                classes={{
                  root: classes.textFieldFullWidth,
                  input: commonStyle.textFieldInput,
                  focused: commonStyle.textFieldActive,
                  error: commonStyle.inputBoxError,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5" className={classes.label}>
                City
              </Typography>
              <InputBase
                id="City"
                type="text"
                name="City"
                placeholder="Enter City"
                classes={{
                  root: classes.textFieldFullWidth,
                  input: commonStyle.textFieldInput,
                  focused: commonStyle.textFieldActive,
                  error: commonStyle.inputBoxError,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5" className={classes.label}>
                State
              </Typography>
              <Select
                className={classes.selectInputStyle}
                value={state}
                name="primaryProvider"
                onChange={(e: any) => handleSelectOption(e)}
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
                {stateList.map((data) => {
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
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5" className={classes.label}>
                Country
              </Typography>
              <Select
                className={classes.selectInputStyle}
                value={state}
                name="primaryProvider"
                onChange={(e: any) => handleSelectOption(e)}
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
                {stateList.map((data) => {
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
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5" className={classes.label}>
                Zip Code
              </Typography>
              <InputBase
                id="Zip Code"
                type="text"
                name="Zip Code"
                placeholder="Enter Zip Code"
                classes={{
                  root: classes.textFieldFullWidth,
                  input: commonStyle.textFieldInput,
                  focused: commonStyle.textFieldActive,
                  error: commonStyle.inputBoxError,
                }}
              />
            </Grid>
          </Grid>
        </DialogContentText>
        <Grid className={classes.footer}>
          <Grid className={classes.footerBtn}>
            <ButtonBase sx={formButtonStyle.saveButtonStyle}>Save</ButtonBase>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewContact;
