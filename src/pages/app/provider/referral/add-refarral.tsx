import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  ButtonBase,
  Checkbox,
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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { commonWidget, formButtonStyle } from "../../../../styles/common";
import AddNewContact from "./add-new-contact";
import Preview from "./preview";
import { style } from "./style/common-style";
interface AddEditReferralProps {
  title: string;
  onClose: () => void;
  open: boolean;
}

function AddReferral(props: AddEditReferralProps) {
  const { onClose, open, title } = props;
  const classes = style();
  const commonStyle = commonWidget();
  const patientList = ["patient peter", "johan doe"];
  const [patient, setPatient] = useState("");

  const handleSelectOption = (e: string) => {
    setPatient(e);
  };

  const close = () => {
    onClose();
  };

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

  const handleClose = () =>{
    setAddNewContact(false);
  }

  const handleOpen = ()=>{
    setAddNewContact(true);
  }

  const [openAddNewContact,setAddNewContact] = useState(false);
  const [openPreview,setOpenPreviw] = useState(false);

  const handleClosePreview = () =>{
    setOpenPreviw(false);
    onClose();
  }

  const handleOpenPreview = () =>{
    setOpenPreviw(true);
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
            <Grid item xs={3}>
              <Typography variant="h5" className={classes.label}>
                Patient Name
              </Typography>
              <Select
                className={classes.selectInputStyle}
                value={patient}
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
                          Select patient
                        </Typography>
                      </span>
                    );
                  }
                  return <Typography variant="h5">{selected}</Typography>;
                }}
                MenuProps={MenuProps}
                displayEmpty
              >
                {patientList.map((data) => {
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
            <Grid item xs={3}>
              <Typography variant="h5" className={classes.label}>
                Referral From
              </Typography>
              <Select
                className={classes.selectInputStyle}
                value={patient}
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
                {patientList.map((data) => {
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
            <Grid item xs={3}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="h5" className={classes.label}>
                    Referral to
                  </Typography>
                </Box>
                <Box>
                  <Typography className={classes.addlabel} variant="h5" style={{ color: "#36588C" }} onClick={handleOpen}>
                   <AddIcon/> ADD
                  </Typography>
                </Box>
              </Box>
              <Select
                className={classes.selectInputStyle}
                value={patient}
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
                {patientList.map((data) => {
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
            <Grid item xs={3}>
              <Typography variant="h5" className={classes.label}>
                Referral Speciality
              </Typography>
              <Select
                className={classes.selectInputStyle}
                value={patient}
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
                {patientList.map((data) => {
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
            <Grid item xs={3}>
              <Typography variant="h5" className={classes.label}>
                Referral Date
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Choose Date"
                  slotProps={{ textField: { size: "small" } }}
                  sx={{
                    width: "100%",
                    "& fieldset": { border: "none" },
                    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                    "& label": {
                      color: "#1A1A1A80 !important",
                      fontSize: "14px !important",
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h5" className={classes.label}>
                Priority
              </Typography>
              <Select
                className={classes.selectInputStyle}
                value={patient}
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
                {patientList.map((data) => {
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
            <Grid item xs={12}>
              <Typography variant="h5" className={classes.label}>
                Referral Reason
              </Typography>
              <InputBase
                id="provider-group-name"
                type="text"
                name="locationName"
                placeholder="Referral Reason"
                classes={{
                  root: classes.textFieldFullWidth,
                  input: commonStyle.textFieldInput,
                  focused: commonStyle.textFieldActive,
                  error: commonStyle.inputBoxError,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" className={classes.label}>
                Referral Note
              </Typography>
              <InputBase
                placeholder="Referral Note"
                multiline={true}
                rows="3"
                classes={{
                  root: commonStyle.providerTextAreaField,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5" className={classes.label}>
                Diagnosis Code
              </Typography>
              <Select
                className={classes.selectInputStyle}
                value={patient}
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
                          Search & Select Diagnosis Code
                        </Typography>
                      </span>
                    );
                  }
                  return <Typography variant="h5">{selected}</Typography>;
                }}
                MenuProps={MenuProps}
                displayEmpty
              >
                {patientList.map((data) => {
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
            <Grid item xs={6}>
              <Typography variant="h5" className={classes.label}>
                Insurance
              </Typography>
              <Select
                className={classes.selectInputStyle}
                value={patient}
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
                          Insurance
                        </Typography>
                      </span>
                    );
                  }
                  return <Typography variant="h5">{selected}</Typography>;
                }}
                MenuProps={MenuProps}
                displayEmpty
              >
                {patientList.map((data) => {
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
            <Grid item xs={12}>
              <Typography variant="h5" className={classes.label}>
                Attachments
              </Typography>
              <Grid container alignItems={"center"} xs={12}>
                <Checkbox
                  sx={{
                    padding: 0,
                    "& .MuiSvgIcon-root": { fontSize: 24 },
                  }}
                />
                &nbsp;
                <Typography variant="h5">Encounters</Typography>
              </Grid>
              <Grid container xs={12} alignItems={"center"} mt={1}>
                <Checkbox
                  sx={{
                    padding: 0,
                    "& .MuiSvgIcon-root": { fontSize: 24 },
                  }}
                />
                &nbsp;
                <Typography variant="h5">
                  Send Medications list,Diagnoses & Allergies
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </DialogContentText>
        <Grid className={classes.footer}>
          <Grid className={classes.footerBtn}>
            <ButtonBase sx={formButtonStyle.saveButtonStyle} onClick={handleOpenPreview}>
              Send & Preview
            </ButtonBase>
          </Grid>
        </Grid>
      </DialogContent>
      {openAddNewContact && (
          <AddNewContact
            open={openAddNewContact}
            onClose={handleClose}
            title="Add New Contact"
          />
        )}
        {openPreview && (
          <Preview
            open={openPreview}
            onClose={handleClosePreview}
            title="Add New Contact"
          />
        )}
    </Dialog>
  );
}

export default AddReferral;
