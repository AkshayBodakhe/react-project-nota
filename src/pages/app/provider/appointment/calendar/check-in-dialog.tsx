import {
  Box,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import {
  CHECK_IN_TITLE,
  commonButtonStyle,
  tableUseStyles,
} from "./appointmentWithLocations";
import { formButtonStyle, formTitle } from "../../../../../styles/common";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import CollectPaymentDialog from "./collect-payment-dialog";
import AddPayment from "../../../../../components/common/modal/payment/add-payment-modal";
import { isNavalaCare } from "../../../../../components/common/helper";
interface dialogProps {
  open: boolean;
  onClose: any;
  appointmentDetails?: any;
  handleEditDemographics?: any;
  handleCompleteCheckIn?: any;
  handlePatientCharting?: any;
}

function ChangeStatusCheckIn(props: dialogProps) {
  const {
    open,
    onClose,
    appointmentDetails,
    handleEditDemographics,
    handleCompleteCheckIn,
    handlePatientCharting,
  } = props;
  const classes = tableUseStyles();
  const [openPayment, setOpenPayment] = useState(false);

  const handleOpenPayment = () => {
    setOpenPayment((item) => !item);
  };

  return (
    <>
      <Grid>
        <Dialog open={openPayment ? false : open} fullWidth maxWidth="md">
          <DialogTitle
            id="scroll-dialog-title"
            sx={{
              background: "#F5F6F9",
              marginBottom: "15px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ ...formTitle, fontSize: "22px" }}>
              {CHECK_IN_TITLE}
            </Typography>
            <ButtonBase sx={{ display: "flex", gap: "20px" }}>
              <Box
                onClick={handlePatientCharting}
                display={"flex"}
                gap={1}
                sx={{ color: "#36598c" }}
              >
                <TrendingUpIcon />
                <Typography fontWeight={"600"} color={"#36598c"}>
                  {"Chart"}
                </Typography>{" "}
              </Box>
              <Box>
                <CloseIcon onClick={onClose} />
              </Box>
            </ButtonBase>
          </DialogTitle>
          <DialogContent>
            <Box display={"grid"} gridTemplateColumns={"1fr 1fr"} rowGap={2}>
              <Grid display={"grid"} gridTemplateColumns={"1fr 1fr"}>
                <Typography className={classes.key}>
                  {"Appointment Type"}
                </Typography>
                <Typography className={classes.value}>
                  {appointmentDetails?.appointmentType || "-"}
                </Typography>
              </Grid>
              <Grid display={"grid"} gridTemplateColumns={"1fr 1fr"}>
                <Typography className={classes.key}>
                  {"Appointment Date & Time"}
                </Typography>
                <Typography className={classes.value}>
                  {appointmentDetails?.appointmentDate +
                    " " +
                    appointmentDetails?.startTime || "-"}
                </Typography>
              </Grid>
              <Grid display={"grid"} gridTemplateColumns={"1fr 1fr"}>
                <Typography className={classes.key}>
                  {"Rendering Provider"}
                </Typography>
                <Typography className={classes.value}>
                  {appointmentDetails?.providerName || "-"}
                </Typography>
              </Grid>
              <Grid display={"grid"} gridTemplateColumns={"1fr 1fr"}>
                <Typography className={classes.key}>{"Location"}</Typography>
                <Typography className={classes.value}>
                  {appointmentDetails?.locationName}
                </Typography>
              </Grid>
              <Grid display={"grid"} gridTemplateColumns={"1fr 1fr"}>
                <Typography className={classes.key}>
                  {"Chief Complaint"}
                </Typography>
                <Typography
                  noWrap
                  sx={{ cursor: "pointer" }}
                  title={appointmentDetails?.reasonOfVisit}
                  className={classes.value}
                >
                  {appointmentDetails?.reasonOfVisit || "-"}
                </Typography>
              </Grid>
              <Grid display={"grid"} gridTemplateColumns={"1fr 1fr"}>
                <Typography className={classes.key}>
                  {"Outstanding Balance"}
                </Typography>
                <Typography className={classes.value}>{"-- --"}</Typography>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions sx={{ mt: "20px", mb: "5px" }}>
            <ButtonBase onClick={handleEditDemographics} sx={commonButtonStyle}>
              {"Edit Demographics"}
            </ButtonBase>
            {!isNavalaCare() && (
              <ButtonBase sx={commonButtonStyle} onClick={handleOpenPayment}>
                {"Collect Payment"}
              </ButtonBase>
            )}
            <ButtonBase
              onClick={handleCompleteCheckIn}
              sx={formButtonStyle.saveButtonStyle}
            >
              {"Complete Check In"}
            </ButtonBase>
          </DialogActions>
        </Dialog>
      </Grid>
      <Grid>
        {/* <CollectPaymentDialog
          open={openPayment}
          handleClose={handleOpenPayment}
        /> */}
        <AddPayment
          open={openPayment}
          onClose={handleOpenPayment}
          appointmentDetails={appointmentDetails}
        />
      </Grid>
    </>
  );
}

export default ChangeStatusCheckIn;
