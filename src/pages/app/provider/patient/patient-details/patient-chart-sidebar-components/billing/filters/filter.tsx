import { Box, ButtonBase, Grid, InputBase } from "@mui/material";
import FormLabel from "../../../../../../../../../src/components/common/label/form-label";
import { useEffect, useState } from "react";
import { commonWidget } from "../../../../../../../../styles/common";

const sxs = {
  showFilterBtn: {
    background: "#CCECFF80 0% 0% no-repeat padding-box",
    border: "1px solid #1B5984",
    borderRadius: "5px",
    opacity: 1,
    padding: "10px",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },
};

type Props = {
  showDateFilter?: boolean;
  showPayerFilter?: boolean;
  showProviderFilter?: boolean;
  showPaymentMethodFilter?: boolean;
  showTransactionIdFilter?: boolean;
  showPaymentId?: boolean;
};

function Filters(_props: Props) {
  const classes = commonWidget();
  const [open, setOpen] = useState<boolean>(false);

  // useEffect(() => {
  //     console.log("🚀 ~ file: filter.tsx:31 ~ Filters ~ props:", props)
  // }, [])

  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}
      >
        <Grid sx={{ display: "flex", justifyContent: "end" }}>
          <ButtonBase onClick={() => setOpen(!open)} sx={sxs.showFilterBtn}>
            Show filter
          </ButtonBase>
        </Grid>

        {open && (
          <>
            <Grid container xs={12} spacing={2}>
              <Grid item container spacing={2}>
                <Grid item xs={3}>
                  <FormLabel label={"Search By Date"} />
                  <InputBase
                    fullWidth
                    name="date"
                    placeholder="Choose Date"
                    onChange={() => {}}
                    classes={{
                      root: classes.providerTextInput,
                      input: classes.textFieldInput,
                      focused: classes.textFieldActive,
                      error: classes.inputBoxError,
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormLabel label={"Search By Payer"} />
                  <InputBase
                    fullWidth
                    name="payer"
                    placeholder="Search By Payer"
                    onChange={() => {}}
                    classes={{
                      root: classes.providerTextInput,
                      input: classes.textFieldInput,
                      focused: classes.textFieldActive,
                      error: classes.inputBoxError,
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormLabel label={"Select Provider"} />
                  <InputBase
                    fullWidth
                    name="provider"
                    placeholder="Select Provider"
                    onChange={() => {}}
                    classes={{
                      root: classes.providerTextInput,
                      input: classes.textFieldInput,
                      focused: classes.textFieldActive,
                      error: classes.inputBoxError,
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormLabel label={"Payment Method"} />
                  <InputBase
                    fullWidth
                    name="paymentMethod"
                    placeholder="Payment Method"
                    onChange={() => {}}
                    classes={{
                      root: classes.providerTextInput,
                      input: classes.textFieldInput,
                      focused: classes.textFieldActive,
                      error: classes.inputBoxError,
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormLabel label={"Trans ID."} />
                  <InputBase
                    fullWidth
                    name="transId"
                    placeholder="Enter Trans ID."
                    onChange={() => {}}
                    classes={{
                      root: classes.providerTextInput,
                      input: classes.textFieldInput,
                      focused: classes.textFieldActive,
                      error: classes.inputBoxError,
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormLabel label={"Payment Id"} />
                  <InputBase
                    fullWidth
                    name="paymentId"
                    placeholder="Enter Payment Id"
                    onChange={() => {}}
                    classes={{
                      root: classes.providerTextInput,
                      input: classes.textFieldInput,
                      focused: classes.textFieldActive,
                      error: classes.inputBoxError,
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Box sx={sxs.footer}>
                    <ButtonBase
                      sx={sxs.showFilterBtn}
                      onClick={() => setOpen(false)}
                    >
                      Hide Filters
                    </ButtonBase>
                    <ButtonBase sx={sxs.showFilterBtn}>Search</ButtonBase>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </>
  );
}

export default Filters;
