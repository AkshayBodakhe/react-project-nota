import { Box, Grid, InputBase } from "@mui/material";
import CustomFormLabel from "../../../../../components/common/custom-form-label";
import { commonWidget } from "../../../../../styles/common";
import { useEffect } from "react";

interface PatientBalanceProps {
  formik: any;
  isSubmitting?: boolean;
  isValid?: boolean;
  setIsValid?: any;
  setIsSubmitting?: any;
}

function PatientBalance(props: PatientBalanceProps) {
  const { formik, isSubmitting, setIsSubmitting, isValid, setIsValid } = props;
  const classes = commonWidget();

  useEffect(() => {
    if (isSubmitting) {
      setIsValid(true);
    }
  }, [isSubmitting]);

  return (
    <>
      <Box display={"flex"} gap={2}>
        <Grid width={"25%"}>
          <CustomFormLabel label={"Outstanding Balance"} />
          <InputBase
            name={"outstandingBalance"}
            value={formik.outstandingBalance}
            onChange={formik.handleChange}
            fullWidth
            placeholder="$0"
            classes={{
              root: classes.inputField,
              input: classes.inputBoxText,
              focused: classes.inputBoxActive,
            }}
          />
        </Grid>
        <Grid width={"25%"}>
          <CustomFormLabel label={"Copay"} />
          <InputBase
            name={"copayAmount"}
            value={formik.copayAmount}
            onChange={formik.handleChange}
            fullWidth
            placeholder="$0"
            classes={{
              root: classes.inputField,
              input: classes.inputBoxText,
              focused: classes.inputBoxActive,
            }}
          />
        </Grid>
      </Box>
    </>
  );
}

export default PatientBalance;
