import {
  Autocomplete,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Grid,
  InputBase,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import CustomFormLabel from "../../../../../../components/common/custom-form-label";
import { commonWidget, formButtonStyle } from "../../../../../../styles/common";
import { useMedicalCodeControllerServiceGetAllMedicalCodes } from "../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { BillingCodes } from "../../../../../../sdk/thinkemr-core-0.0.1/requests";
import { getLoggedInUser } from "../../../../../../components/common/enums-and-interfaces/common-functions";
import { multiSelectDropDown } from "../../calendar/appointments";

interface addIcdProps {
  open: boolean;
  onClose: any;
  formikData: any;
  initilalFormValues: any;
}

export const position = ["Regular", "Irregular"];

function AddIcdCode(props: addIcdProps) {
  const classes = commonWidget();
  const { open, onClose, formikData, initilalFormValues } = props;
  const [scroll] = React.useState<DialogProps["scroll"]>("paper");
  // const [icdCodes, setIcdCode] = useState<any[]>();

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

  // const { data } = useMedicalCodeControllerServiceGetAllMedicalCodes({
  //   codeType: BillingCodes.type.ICD,
  //   page: 0,
  //   size: 20,
  //   sortBy: "",
  //   sortDirection: "",
  //   searchString: "",
  //   providerGroupUuid: getLoggedInUser().providerGroup || "",
  // });

  // useEffect(() => {
  //   let icdDetails: [] = [];
  //   if (data) {
  //     icdDetails = data?.data?.content;
  //     const customIcd = icdDetails?.map((item: any) => {
  //       return {
  //         id: item.id,
  //         type: item.type,
  //         code: item.code,
  //         name: item.description,
  //       };
  //     });
  //     setIcdCode(customIcd);
  //   }
  // }, [data]);

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="scroll-dialog-title">
          <Grid container justifyContent={"space-between"}>
            <Typography variant="h3">{"ICD - 10 Code"}</Typography>
            <Close onClick={onClose} sx={{ cursor: "pointer" }} />
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid>
              <CustomFormLabel label={"Assessment"} />
              <InputBase
                name={"assessment.assessmentNote"}
                value={formikData.values.assessment?.assessmentNote}
                onChange={formikData.handleChange}
                fullWidth
                multiline={true}
                rows="4"
                classes={{
                  root: classes.providerTextAreaField,
                  input: classes.textFieldInput,
                  focused: classes.textFieldActive,
                }}
                placeholder="Enter Text"
              />
            </Grid>
            {/* <Grid my={2}>
              <CustomFormLabel label={"ICD-10 code"} />
              <Autocomplete
                sx={{ ...multiSelectDropDown }}
                multiple
                limitTags={2}
                id="tags-standard"
                options={icdCodes || []}
                value={formikData.values.assessment.billingCodes}
                defaultValue={initilalFormValues.assessment.billingCodes}
                getOptionLabel={(option: any) => option?.name}
                onChange={(_event: any, newValue: any) => {
                  formikData.setFieldValue("assessment.billingCodes", newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    placeholder="Select"
                    sx={{ justifyContent: "space-between" }}
                  />
                )}
              />
            </Grid> */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonBase sx={formButtonStyle.saveButtonStyle} onClick={onClose}>
            <Typography color={"#fff"}>{"Add Assessment"}</Typography>
          </ButtonBase>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddIcdCode;
