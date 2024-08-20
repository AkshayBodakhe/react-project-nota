import {
  Autocomplete,
  Box,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { formButtonStyle } from "../../../../../../../styles/common";
import CloseIcon from "@mui/icons-material/Close";
import CustomFormLabel from "../../../../../../../components/common/custom-form-label";
import { multiSelectDropDown } from "../../../add-new-patient";

function AddpatientFlag() {
  const [openDialog, setOpenDialog] = useState(false);
  const handleDialog = () => {
    setOpenDialog((item) => !item);
  };
  const [flag, setFlag] = useState([]);
  return (
    <div>
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        onClose={handleDialog}
        open={openDialog}
      >
        <DialogTitle>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography pl={1.5} variant="h4">
              Add Patient Flags
            </Typography>
            <CloseIcon sx={{ cursor: "pointer" }} onClick={handleDialog} />
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid mx={2} pb={3} pt={1}>
            <Box mb={1.5}>
              <CustomFormLabel label="Search Patient Flag" />
            </Box>
            <Autocomplete
              sx={{
                ...multiSelectDropDown,
              }}
              multiple
              limitTags={2}
              id="tags-standard"
              options={flag || []}
              //value={formik.values.languages}
              getOptionLabel={(option: any) => option?.name}
              disableCloseOnSelect
              // onChange={(_, values) => {
              //   // console.log("valuess",values)
              //   formik.setFieldValue("languages", values);
              // }}
              renderOption={(props, option: any) => (
                <MenuItem
                  key={option.id}
                  value={option.id}
                  sx={{ justifyContent: "space-between" }}
                  {...props}
                >
                  {option?.name}
                </MenuItem>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder={"Search Patient Flag"}
                />
              )}
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <ButtonBase
            // onClick={addSpecilityOption}
            //   onClick={formikData.submitForm}
            sx={formButtonStyle.saveButtonStyle}
            onClick={() => {
              //formik.submitForm()
            }}
          >
            ADD Flags
          </ButtonBase>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddpatientFlag;
