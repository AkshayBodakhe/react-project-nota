import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import {
  ButtonBase,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SendByEmail from "./send-by-email";
import SendByFax from "./send-by-fax";
import { style } from "./style/common-style";

interface PreviewProps {
  title: string;
  onClose: () => void;
  open: boolean;
}
function Preview(props: PreviewProps) {
  const { onClose, open} = props;
  const classes = style();
  const close = () => {
    onClose();
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openAnchor = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openSendByFax, setOpenSendByFax] = useState(false);
  const [openSendByEmail, setOpenSendByEmail] = useState(false);

  const sendByEmail = () => {
    setOpenSendByEmail(true);
  };

  const handleCloseEmail = () => {
    setOpenSendByEmail(false);
  };

  const sendByFax = () => {
    setOpenSendByFax(true);
  };

  const handleCloseFax = () => {
    setOpenSendByFax(false);
  };

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="md">
      <DialogTitle>
        <Grid container className={classes.dialogTitle}>
          <Grid item xs={6}>
            <Typography
              style={{ fontWeight: "bold", color: "#1A1A1A", fontSize: "20px" }}
            >
              Preview
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Grid container justifyContent="space-between">
              <Grid item>
                <ButtonBase className={classes.optionBtn}>
                  <EditOutlinedIcon className={classes.icon} />
                  &nbsp;Edit
                </ButtonBase>
              </Grid>
              <Grid item>
                <ButtonBase className={classes.optionBtn}>
                  <DeleteOutlineOutlinedIcon className={classes.icon} />
                  &nbsp;Delete
                </ButtonBase>
              </Grid>
              <Grid item>
                <ButtonBase className={classes.optionBtn}>
                  <DownloadOutlinedIcon className={classes.icon} />
                  &nbsp;Download
                </ButtonBase>
              </Grid>
              <Grid item>
                <ButtonBase className={classes.optionBtn}>
                  <PrintOutlinedIcon className={classes.icon} />
                  &nbsp;Print
                </ButtonBase>
              </Grid>
              <Grid item>
                <ButtonBase className={classes.optionBtn} onClick={handleClick}>
                  <SendOutlinedIcon className={classes.icon} />
                  &nbsp;Send
                  <ArrowDropDownIcon className={classes.icon} />
                </ButtonBase>
                <Menu
                  sx={{
                    position: "absolute",
                    right: "10px !important",
                    left: "0px",
                    cursor: "pointer",
                  }}
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openAnchor}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem
                    sx={{
                      color: "#1A1A1A99 !important",
                      fontSize: "14px !important",
                    }}
                    onClick={sendByFax}
                  >
                    By Fax
                  </MenuItem>
                  <MenuItem
                    onClick={sendByEmail}
                    sx={{
                      color: "#1A1A1A99 !important",
                      fontSize: "14px !important",
                    }}
                  >
                    {" "}
                    By Email
                  </MenuItem>
                </Menu>
              </Grid>
              <Grid item style={{ cursor: "pointer" }}>
                <CloseIcon onClick={close} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="scroll-dialog-description"
          // ref={descriptionElementRef}
          tabIndex={-1}
        >
          <Grid>
            <Grid container columnGap={1.2}>
              <Grid item xs={3.9} className={classes.box}>
                <Grid container spacing={2}>
                  <Grid item xs={12} className={classes.item}>
                    <Grid className={classes.title}>Patient</Grid>
                  </Grid>
                  <Grid item xs={12} className={classes.item}>
                    <Grid xs={4} className={classes.dataTitle}>
                      Name
                    </Grid>
                    <Grid xs={8} className={classes.data}>
                      Carl philips
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className={classes.item}>
                    <Grid xs={4} className={classes.dataTitle}>
                      DOB
                    </Grid>
                    <Grid xs={8} className={classes.data}>
                      Carl philips
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className={classes.item}>
                    <Grid xs={4} className={classes.dataTitle}>
                      Gender
                    </Grid>
                    <Grid xs={8} className={classes.data}>
                      14 April 1990
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className={classes.item}>
                    <Grid xs={4} className={classes.dataTitle}>
                      Address
                    </Grid>
                    <Grid xs={8} className={classes.data}>
                      USA tokiyo,Al
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3.9} className={classes.box}>
                <Grid container spacing={2}>
                  <Grid item xs={12} className={classes.item}>
                    <Grid className={classes.title}>Referral From</Grid>
                  </Grid>
                  <Grid item xs={12} className={classes.item}>
                    <Grid xs={4} className={classes.dataTitle}>
                      Name
                    </Grid>
                    <Grid xs={8} className={classes.data}>
                      Carl philips
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className={classes.item}>
                    <Grid xs={4} className={classes.dataTitle}>
                      Speciality
                    </Grid>
                    <Grid xs={8} className={classes.data}>
                      Primary Provider
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className={classes.item}>
                    <Grid xs={4} className={classes.dataTitle}>
                      Address
                    </Grid>
                    <Grid xs={8} className={classes.data}>
                      ABC,
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className={classes.item}>
                    <Grid xs={4} className={classes.dataTitle}>
                      Phone
                    </Grid>
                    <Grid xs={8} className={classes.data}>
                      5679245478
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className={classes.item}>
                    <Grid xs={4} className={classes.dataTitle}>
                      Fax
                    </Grid>
                    <Grid xs={8} className={classes.data}>
                      (446)572338851
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3.9} className={classes.box}>
                <Grid container spacing={2}>
                  <Grid item xs={12} className={classes.item}>
                    <Grid className={classes.title}>Referral To</Grid>
                  </Grid>
                  <Grid item xs={12} className={classes.item}>
                    <Grid xs={4} className={classes.dataTitle}>
                      Name
                    </Grid>
                    <Grid xs={8} className={classes.data}>
                      Carl philips
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className={classes.item}>
                    <Grid xs={4} className={classes.dataTitle}>
                      Speciality
                    </Grid>
                    <Grid xs={8} className={classes.data}>
                      Primary Provider
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className={classes.item}>
                    <Grid xs={4} className={classes.dataTitle}>
                      Address
                    </Grid>
                    <Grid xs={8} className={classes.data}>
                      ABC,
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className={classes.item}>
                    <Grid xs={4} className={classes.dataTitle}>
                      Phone
                    </Grid>
                    <Grid xs={8} className={classes.data}>
                      5679245478
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className={classes.item}>
                    <Grid xs={4} className={classes.dataTitle}>
                      Fax
                    </Grid>
                    <Grid xs={8} className={classes.data}>
                      (446)572338851
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container mt={4} className={classes.box}>
              <Grid item sx={{ display: "flex" }}>
                <Grid container xs={6}>
                  <Grid item xs={12} className={classes.title}>
                    {" "}
                    Referral Reason
                  </Grid>
                  <Grid item xs={12} className={classes.unitItem}>
                    <Grid xs={4} className={classes.dataTitle}>
                      reason
                    </Grid>
                    <Grid xs={8} className={classes.data}>
                      Chronic and Serve Headaches
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container xs={3}>
                  <Grid item xs={12} className={classes.title}>
                    {" "}
                    Referral Date
                  </Grid>
                  <Grid item xs={12} className={classes.unitItem}>
                    <Grid xs={4} className={classes.dataTitle}>
                      Date
                    </Grid>
                    <Grid xs={8} className={classes.data}>
                      1 oct 1990
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container xs={2}>
                  <Grid item xs={12} className={classes.title}>
                    Priority
                  </Grid>
                  <Grid item xs={12}>
                    <Grid className={classes.data}>Urgent</Grid>
                  </Grid>
                </Grid>
                <Grid container xs={2}>
                  <Grid item xs={12} className={classes.title}>
                    {" "}
                    Response Status
                  </Grid>
                  <Grid item xs={12}>
                    <Grid className={classes.data}>Pending</Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container xs={12} pt={2}>
                <Grid item xs={12} className={classes.title}>
                  Encounter
                </Grid>
                <Grid item xs={12} className={classes.unitItem}>
                  <Grid xs={3} className={classes.dataTitle}>
                    Encounter Date and Time
                  </Grid>
                  <Grid xs={9} className={classes.data}>
                    1 oct 1990 , 2:50PM
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container mt={4} className={classes.box}>
              <Grid item xs={12} className={classes.title}>
                Refarral Notes
              </Grid>
              <Grid item>
                <Typography
                  variant="body1"
                  className={classes.data}
                  sx={{ paddingTop: "10px" }}
                >
                  Dear Dr. Johnson,
                </Typography>
                <Typography
                  className={classes.data}
                  sx={{ paddingTop: "10px" }}
                >
                  I would like to refer Mr. Justin Barnes to you as he has been
                  experiencing several visual acuity changes over the past
                  month. During his appointment today he was commenting about
                  experiencing severe pain in his eyes.
                </Typography>
                <Typography
                  className={classes.data}
                  sx={{ paddingTop: "10px" }}
                >
                  He has been a patient of mine since 2018 and has never had
                  such dramatic visual changes. He had no pain in his eyes at
                  his last appointment on 12 Aug 2023 but his vision has become
                  clouded since that appointment. During the slit-lamp
                  evaluation at our office today I noted that he has clouded
                  crystalline lens.
                </Typography>
              </Grid>
            </Grid>
            <Grid container columnGap={1.2} mt={4}>
              <Grid item xs={3.9} className={classes.box}>
                <Grid container spacing={2}>
                  <Grid item xs={12} className={classes.item}>
                    <Grid className={classes.title}>Diagnoses</Grid>
                  </Grid>
                  <Grid item xs={12} className={classes.item}>
                    <Typography className={classes.data}>
                      other specified disorders of thyroid [E07.89]
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3.9} className={classes.box}>
                <Grid container spacing={2}>
                  <Grid item xs={12} className={classes.item}>
                    <Grid className={classes.title}>Insurance</Grid>
                  </Grid>
                  <Grid item xs={12} className={classes.item}>
                    <Grid xs={5} className={classes.dataTitle}>
                      Name
                    </Grid>
                    <Grid xs={7} className={classes.data}>
                      Carl philips
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className={classes.item}>
                    <Grid xs={5} className={classes.dataTitle}>
                      Member Id
                    </Grid>
                    <Grid xs={7} className={classes.data}>
                      983-566-8224
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className={classes.item}>
                    <Grid xs={5} className={classes.dataTitle}>
                      Expiry Date
                    </Grid>
                    <Grid xs={7} className={classes.data}>
                      23 Sept 2020
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className={classes.item}>
                    <Grid xs={5} className={classes.dataTitle}>
                      Phone
                    </Grid>
                    <Grid xs={7} className={classes.data}>
                      5679245478
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className={classes.item}>
                    <Grid xs={5} className={classes.dataTitle}>
                      Fax
                    </Grid>
                    <Grid xs={7} className={classes.data}>
                      (446)572338851
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3.9} className={classes.box}>
                <Grid container spacing={2}>
                  <Grid item xs={12} className={classes.item}>
                    <Grid className={classes.title}>Attachments</Grid>
                  </Grid>
                  <Grid item xs={12} className={classes.item}>
                    <Typography>1.Medication List</Typography>
                  </Grid>
                  <Grid item xs={12} className={classes.item}>
                    <Typography>2.Diagnoses</Typography>
                  </Grid>
                  <Grid item xs={12} className={classes.item}>
                    <Typography>Allergies</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
      {openSendByFax && (
        <SendByFax
          open={openSendByFax}
          onClose={handleCloseFax}
          title="Send By Fax"
        />
      )}
      {openSendByEmail && (
        <SendByEmail
          open={openSendByEmail}
          onClose={handleCloseEmail}
          title="Send By Email"
        />
      )}
    </Dialog>
  );
}

export default Preview;
