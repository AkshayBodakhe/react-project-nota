import { Box, InputBase } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CustomFormLabel from "../../../common/custom-form-label";
import { commonWidget } from "../../../../styles/common";
export const commonClassCss = makeStyles({
  amount: {
    width: "50% !important",
    marginBottom: "12px !important",
  },
  notes: {
    height: "75px !important",
    marginBottom: "16px !important",
  },
  labelhead: {},
});

const BankPayment = () => {
  const classes = commonWidget();
  const styles = commonClassCss();
  return (
    <>
      <Box>
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: "50%",
            }}
          >
            <CustomFormLabel label="Payment Method" />
            <InputBase
              name="paymentMethod"
              type="text"
              fullWidth
              classes={{
                root: classes.textFieldRoot,
                input: classes.textFieldInput,
              }}
              placeholder="Payment Method"
              style={{
                width: "100%!important",
                marginBottom: "12px !important",
                border: 'none !important'
              }}
              value=""
            />
          </div>
          <div
            style={{
              display: "flex",
              flex: "50%",

              flexDirection: "column",
            }}
          >
            <CustomFormLabel label="Check No/NFT/Trans.Id" />
            <InputBase
              type="text"
              name="checkNo"
              fullWidth
              classes={{
                root: classes.textFieldRoot,
                input: classes.textFieldInput,
              }}
              placeholder="Check No/NFT/Trans.Id"
              style={{
                width: "100% !important",
                marginBottom: "12px !important",
              }}
              value=""
            />
          </div>
        </div>
        <CustomFormLabel label="Amount" />
        <InputBase
          type="text"
          name="amount"
          fullWidth
          classes={{
            root: classes.textFieldRoot,
            input: classes.textFieldInput,
          }}
          placeholder="Amount"
          className={styles.amount}
          style={{
            width: "50%!important",
          }}
          value=""
        />
        <CustomFormLabel label="Notes" />
        <InputBase
          name="notes"
          type="text"
          fullWidth
          classes={{
            root: classes.textFieldRoot,
            input: classes.textFieldInput,
          }}
          placeholder="Notes"
          className={styles.notes}
          value=""
        />
      </Box>
    </>
  );
};
export default BankPayment;
