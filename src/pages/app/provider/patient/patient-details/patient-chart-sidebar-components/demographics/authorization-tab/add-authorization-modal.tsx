/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Modal,
  Grid,
  Typography,
  ButtonBase,
  Select,
  InputBase,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { makeStyles } from "@mui/styles";
import CustomFormLabel from "../../../../../../../../components/common/custom-form-label";

export const selectInputStyle = {
  ".MuiOutlinedInput-notchedOutline": { border: 0 },
  boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
  height: "42px !important",
  width: "100%",
};

export const inputBase = makeStyles(() => ({
  providerTextAreaField: {
    borderRadius: "5px",
    border: "none",
    "& fieldset": { border: "none" },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    size: "small",
    textAlign: "center",
    padding: "10px 0px 10px 10px !important",
    fontSize: "16px",
    minHeight: "81px",
  },
  providerFormShortInputField: {
    marginTop: "5px",
    borderRadius: "5px",
    border: "none",
    "& fieldset": { border: "none" },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    height: "42px !important",
    textAlign: "center",
    padding: "13px 0px 10px 16px",
    fontSize: "16px",
    "@media (max-width: 820px)": {
      width: "100% !important",
    },
  },
  inputBoxText2: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontSize: "14px !important",
    lineHeight: "140%",
    color: "",
    width: "100%",
    resize: "vertical",
    minHeight: "15px",
  },
  inputBoxActive2: {
    background: `#FFFFFF 0% 0% no-repeat padding-box !important`,
    border: `2px solid #004186 !important`,
    borderRadius: "4px !important",
  },
}));
interface AddAuthorizationProps {
  open: boolean;
  onClose: () => void;
  onEventSuccessModalOpen: () => void;
}

const AddAuthorization: React.FC<AddAuthorizationProps> = ({
  open,
  onClose,
  onEventSuccessModalOpen,
}) => {
  const classes = inputBase();
  const [authorizationData, setAuthorizationData] = useState({
    authorizationNumber: "",
    effectiveDate: "",
    numberOfVisit: "",
    procedureCode: "",
    speciality: "",
    note: "",
  });

  const specialityData = [
    {
      key: "Multi-speciality",
      value: "Multi-speciality",
    },
    {
      key: "Physiotherapist",
      value: "Physiotherapist",
    },
    {
      key: "Dentist",
      value: "Dentist",
    },
    {
      key: "Orthopedist",
      value: "Orthopedist",
    },
    {
      key: "Acupuncturist",
      value: "Acupuncturist",
    },
  ];
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
  const inputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setAuthorizationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectOption = (e: SelectChangeEvent<string>) => {
    const { value, name } = e.target;
    setAuthorizationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onEventSuccessModalOpen();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Grid
        container
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "55%",
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 5,
        }}
      >
        <Grid item xs={11}>
          <Typography variant="h1" sx={{ fontWeight: "bold" }}>
            Add Authorization
          </Typography>
        </Grid>
        <Grid item xs={1} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <ButtonBase onClick={onClose}>
            <CloseOutlinedIcon />
          </ButtonBase>
        </Grid>
        <Grid container columnGap={3}>
          <Grid item xs={5.7} pt={3}>
            <CustomFormLabel label="Authorization Number" />
            <InputBase
              name="authorizationNumber"
              value={authorizationData.authorizationNumber}
              fullWidth
              placeholder="Enter Number"
              classes={{
                root: classes.providerFormShortInputField,
                input: classes.inputBoxText2,
                focused: classes.inputBoxActive2,
              }}
              onChange={inputData}
            />
          </Grid>

          <Grid item xs={5.7} pt={3}>
            <CustomFormLabel label="Effective Date" />
            <Grid container sx={{ display: "flex", alignItems: "baseline" }}>
              <Grid item xs={4}>
                <Typography variant="h5" fontWeight="bold">
                  Start To End
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Choose Date"
                      slotProps={{ textField: { size: "small" } }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={5.7} pt={3}>
            <CustomFormLabel label="Number Of Visit" />
            <InputBase
              name="numberOfVisit"
              value={authorizationData.numberOfVisit}
              fullWidth
              placeholder="Enter Number Of Visit"
              classes={{
                root: classes.providerFormShortInputField,
                input: classes.inputBoxText2,
                focused: classes.inputBoxActive2,
              }}
              onChange={inputData}
            />
          </Grid>

          <Grid item xs={5.7} pt={3}>
            <CustomFormLabel label="Procedure Code" />
            <InputBase
              name="procedureCode"
              value={authorizationData.procedureCode}
              fullWidth
              placeholder="Enter Code"
              classes={{
                root: classes.providerFormShortInputField,
                input: classes.inputBoxText2,
                focused: classes.inputBoxActive2,
              }}
              onChange={inputData}
            />
          </Grid>

          <Grid item xs={5.7} pt={3}>
            <CustomFormLabel label="Select Speciality" />
            <Select
              sx={selectInputStyle}
              value={authorizationData.speciality}
              name="speciality"
              onChange={(e: SelectChangeEvent<string>) => handleSelectOption(e)}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return (
                    <Typography
                      variant="h5"
                      sx={{
                        color: "#1A1A1A80",
                      }}
                    >
                      Select
                    </Typography>
                  );
                }
                return (
                  <Typography variant="h4" sx={{ marginTop: "3px !important" }}>
                    {selected}
                  </Typography>
                );
              }}
              MenuProps={MenuProps}
              displayEmpty
            >
              {specialityData.map((speciality) => (
                <MenuItem key={speciality.key} value={speciality.value}>
                  {speciality.value}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} pt={3}>
            <CustomFormLabel label="Note" />
            <InputBase
              fullWidth
              value={authorizationData.note}
              placeholder="Type here"
              name="note"
              sx={{
                alignItems: "baseline !important",
                paddingLeft: "5px !important",
                boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                minHeight: "15vh",
                width: "98% !important",
                margin: "5px !important",
              }}
              onChange={inputData}
            />
          </Grid>
          <Grid
            item
            xs={12}
            pt={3}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <ButtonBase
              sx={{
                background: "#004186",
                height: 40,
                width: "auto",
                padding: "12px",
                borderRadius: "5px",
              }}
              onClick={handleSubmit}
            >
              <Typography
                variant="h4"
                sx={{ color: "#FFFFFF", fontWeight: "bold" }}
              >
                Save Authorization
              </Typography>
            </ButtonBase>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default AddAuthorization;
