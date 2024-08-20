import {
  Box,
  Button,
  ButtonBase,
  Grid,
  InputBase,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
// import { loginStyle } from "../../../admin/settings/change-password";
import { makeStyles } from "@mui/styles";
import CustomFormLabel from "../../../common/custom-form-label";
import { commonWidget, formButtonStyle } from "../../../../styles/common";
import { PaymentCard } from "../../../../sdk/thinkemr-core-0.0.1/requests";
import { useEffect, useState } from "react";
import {
  usePatientControllerServiceGetCards,
  usePaymentControllerServiceMakeCharge,
} from "../../../../sdk/thinkemr-core-0.0.1/queries";
import { addEditUserStyle } from "../../../core/add-edit-staff-user/add-edit-staff-user";
import Loading from "../../spinner/loading";
export const customStyles = makeStyles({
  amount: {
    width: "100% !important",
    marginBottom: "12px !important",
  },
  notes: {
    height: "75px !important",
    marginBottom: "16px !important",
  },
  labelhead: {},
});

interface cardPayProps {
  appointmentDetails?: any;
  setAmount?: any;
  setCardInfo?: any;
}

const CardPayment = (props: cardPayProps) => {
  //const classes = loginStyle();
  const { appointmentDetails, setAmount, setCardInfo } = props;
  const [cardDigit, setCardDigit] = useState<any>("");
  const classes = commonWidget();
  const styles = customStyles();
  const [cardDetails, setCardDetails] = useState<any>();
  const ITEM_HEIGHT = 30;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 3.5 + ITEM_PADDING_TOP,
        width: 50,
      },
    },
  };
  const { data: cardData } = usePatientControllerServiceGetCards({
    patientUuid: appointmentDetails?.patientUuid,
  });

  useEffect(() => {
    setCardDetails(cardData && cardData.data);
  }, [appointmentDetails, cardData]);

  return (
    <>
      <Box>
        <Grid
          container
          flexDirection={"column"}
          flexWrap={"nowrap"}
          height={"100%"}
          sx={{ borderRadius: "8px", border: "2px solid #E9E9E9", p: 3 }}
        >
          <Grid container>
            <Grid item xs={4}>
              <Typography variant="body1">Cards</Typography>
            </Grid>
            <Grid xs={8}>
              <Select
                sx={addEditUserStyle.selectInputStyle}
                value={cardDigit.lastFour}
                // name="active"
                onChange={(e) => {
                  setCardInfo(e.target.value);
                  setCardDigit(e.target.value);
                }}
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
                          Select Card
                        </Typography>
                      </span>
                    );
                  }
                  return (
                    <Typography variant="h5">
                      {"**** **** **** " + selected.lastFour}
                    </Typography>
                  );
                }}
                MenuProps={MenuProps}
                displayEmpty
              >
                {cardDetails && cardDetails.length === 0 && (
                  <Grid container justifyContent={"center"}>
                    <Typography variant="h5">{"No cards available"}</Typography>
                  </Grid>
                )}
                {!cardDetails && <Loading />}
                {cardDetails &&
                  cardDetails?.map((data: any) => {
                    return (
                      <MenuItem
                        key={data}
                        value={data}
                        sx={addEditUserStyle.menuItemColorStyle}
                      >
                        {"**** **** **** " + data?.lastFour}
                      </MenuItem>
                    );
                  })}
              </Select>
            </Grid>
          </Grid>
          <Grid container justifyContent={"space-between"} mt={2}>
            <Grid xs={4}>
              <Typography variant="body1">Amount</Typography>
            </Grid>
            <Grid xs={8}>
              {/* <Typography>$&nbsp;{appointment?.paymentAmount}</Typography> */}
              <InputBase
                name="amount"
                type="number"
                fullWidth
                classes={{
                  root: classes.textFieldRoot,
                  input: classes.textFieldInput,
                }}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                className={styles.amount}
                placeholder="Amount"
              />
            </Grid>
          </Grid>
          {/* <Grid
            container
            justifyContent={"end"}
            alignItems={"center"}
            pt={2}
            px={15}
          >
            <ButtonBase
              sx={formButtonStyle.saveButtonStyle}
            >
              {"Collect Payment"}
            </ButtonBase>
          </Grid> */}
        </Grid>
        {/* </form> */}
      </Box>
    </>
  );
};
export default CardPayment;
