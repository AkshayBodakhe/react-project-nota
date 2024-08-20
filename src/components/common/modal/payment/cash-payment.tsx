import { Box, InputBase } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { commonWidget } from "../../../../styles/common";
import CustomFormLabel from "../../../common/custom-form-label";

export const customStyles = makeStyles({
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

interface cashPayProps {
  setCashAmount?: any;
}

const CashPayment = (props: cashPayProps) => {
  const classes = commonWidget();
  const styles = customStyles();
  const { setCashAmount } = props;

  return (
    <>
      <Box>
        <CustomFormLabel label="Amount" />
        <InputBase
          name="amount"
          type="number"
          fullWidth
          classes={{
            root: classes.textFieldRoot,
            input: classes.textFieldInput,
          }}
          className={styles.amount}
          placeholder="Amount"
          style={{
            width: "50%!important",
          }}
          onChange={(e) => {
            setCashAmount(e.target.value);
          }}
          // value=""
        />
      </Box>
    </>
  );
};
export default CashPayment;
