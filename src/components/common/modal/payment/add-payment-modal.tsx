// import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import {
  Box,
  ButtonBase,
  FormControl,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import CardPayment from "./card-payment";
import CashPayment from "./cash-payment";
import { useState } from "react";
import collectPaymentGif from "../../../../assets/other/collect-payment.gif";
import {
  actionBtns,
  formBottom,
  formButtonStyle,
  formTitle,
} from "../../../../styles/common";
import BankPayment from "./bank-payment";
import EventSucessModal from "../../success-modal";
import { Close } from "@mui/icons-material";
import { usePaymentControllerServiceMakeCharge } from "../../../../sdk/thinkemr-core-0.0.1/queries";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export const collectPayment = makeStyles({
  mainContainer: {
    padding: "0 8px 8px 8px",
    width: "580px",
    height: "auto",
  },
  titlehead: {
    height: "28",
  },
  gif: {
    width: "250px",
  },
});

export type props = {
  open: boolean;
  onClose: () => void;
  appointmentDetails?: any;
};
const AddPayment = (props: props) => {
  const { appointmentDetails } = props;
  const classes = collectPayment();
  const [option, setOption] = useState("");
  const [openSuccessModal, setopenSuccessModal] = useState(false);
  const [amount, setAmount] = useState<any>(0);
  const [cashAmount, setCashAmount] = useState<any>(0);
  const [cardInfo, setCardInfo] = useState<any>();

  const handleMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption((event.target as HTMLInputElement).value);
  };

  const handleCloseSucessModal = () => {
    setopenSuccessModal((item) => !item);
  };

  const { mutateAsync: MakePayment } = usePaymentControllerServiceMakeCharge();

  const handleSubmit = async () => {
    if (amount && cardInfo && option === "card") {
      await MakePayment({
        appointmentUuid:
          appointmentDetails && appointmentDetails?.appointmentUuid,
        amount: amount,
        paymentMode: "CARD",
        paymentCardUuid: cardInfo?.uuid,
      }).then(() => {
        props.onClose();
        handleCloseSucessModal();
      });
    } else if (option === "cash" && cashAmount) {
      await MakePayment({
        appointmentUuid:
          appointmentDetails && appointmentDetails?.appointmentUuid,
        amount: cashAmount,
        paymentMode: "CASH",
        paymentCardUuid: "",
      }).then((_res) => {
        props.onClose();
        handleCloseSucessModal();
      });
    }
  };
  // cashAmount

  return (
    <>
      <BootstrapDialog
        onClose={props.onClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <div className={classes.mainContainer}>
          <DialogTitle sx={{ background: "#F5F6F9", paddingLeft: "10px" }}>
            <Grid container justifyContent={"space-between"}>
              <Typography sx={formTitle}>Payment Method</Typography>
              <Close sx={{ cursor: "pointer" }} onClick={props.onClose} />
            </Grid>
          </DialogTitle>
          <DialogContent>
            {/* <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <img
                                src={collectPaymentGif}
                                className={classes.gif}
                            />
                        </Box> */}
            {/* <Typography
              gutterBottom
              style={{
                color: "#1A1A1A",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              Payment method
            </Typography> */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={option}
                  onChange={handleMethodChange}
                >
                  <FormControlLabel
                    value="cash"
                    control={<Radio />}
                    label="Cash Payment"
                  />
                  {option === "cash" && (
                    <CashPayment setCashAmount={setCashAmount} />
                  )}
                  {/* <FormControlLabel
                    value="bank"
                    control={<Radio />}
                    label="Bank/Online Payment"
                  />
                  {option === "bank" && <BankPayment />} */}
                  <FormControlLabel
                    value="card"
                    control={<Radio />}
                    label="Card Payment"
                  />
                  {option === "card" && (
                    <CardPayment
                      appointmentDetails={appointmentDetails}
                      setAmount={setAmount}
                      setCardInfo={setCardInfo}
                    />
                  )}
                </RadioGroup>
              </FormControl>
            </div>
          </DialogContent>
          <DialogActions sx={formBottom}>
            <Grid sx={actionBtns}>
              <ButtonBase
                onClick={props.onClose}
                sx={formButtonStyle.cancelButtonStyle}
              >
                Cancel
              </ButtonBase>
              <ButtonBase
                type="submit"
                sx={formButtonStyle.saveButtonStyle}
                onClick={handleSubmit}
              >
                Collect Payment
              </ButtonBase>
            </Grid>
          </DialogActions>
        </div>
      </BootstrapDialog>
      {openSuccessModal && (
        <EventSucessModal
          onClose={handleCloseSucessModal}
          message="Payment Successfully"
        />
      )}
    </>
  );
};
export default AddPayment;
