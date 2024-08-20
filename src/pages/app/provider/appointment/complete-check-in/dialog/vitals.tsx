import { Close } from "@mui/icons-material";
import {
  Box,
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
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { commonWidget, formButtonStyle } from "../../../../../../styles/common";
import CustomFormLabel from "../../../../../../components/common/custom-form-label";

interface vitalsProps {
  open: boolean;
  onClose: any;
  formikData: any;
}

export const position = ["Sitting", "Standing"];
export const bpArea = ["Left-arm", "Right-arm","Wrist"];
export const bpOs = ["%"];
export const bpHeight = ["Inches", "Feet", "Meter", "Centimeter"];
export const bpTemp = ["Fahrenheit", "Celsius"];

function VitalsForm(props: vitalsProps) {
  const [scroll] = React.useState<DialogProps["scroll"]>("paper");
  const classes = commonWidget();
  const { open, onClose, formikData } = props;
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
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('Feet');

  const handleHeightChange = (e:any) => {
    setHeight(e.target.value);
  };

  const handleWeightChange = (e:any) => {
    setWeight(e.target.value);
  };

  const handleUnitChange = (e:any) => {
    setUnit(e.target.value);
  };

  useEffect(() => {
    if (height && weight) {
      const heightNumeric = parseFloat(height);
      const weightNumeric = parseFloat(weight);

      let heightInMeters;
      if (unit === 'Inches') {
        heightInMeters = heightNumeric * 0.0254; // Convert inches to meters
      } else if (unit === 'Feet') {
        heightInMeters = heightNumeric * 0.3048; // Convert feet to meters
      } else if (unit === 'Centimeter') {
        heightInMeters = heightNumeric * 0.01; // Convert centimeters to meters
      } else {
        heightInMeters = heightNumeric;
      }

      const bmi = weightNumeric / (heightInMeters * heightInMeters);
      formikData.values.objective.patientVitals[1].value1=Number(bmi.toFixed(2));;
    }else{
      formikData.values.objective.patientVitals[1].value1=""
    }
  }, [height, weight, unit]);
  
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle id="scroll-dialog-title">
          <Grid container justifyContent={"space-between"}>
            <Typography variant="h3">{"Vitals"}</Typography>
            <Close onClick={onClose} sx={{ cursor: "pointer" }} />
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box
              display={"grid"}
              gridTemplateColumns={"1fr 1fr 1fr"}
              columnGap={2}
              my={2}
            >
              <Grid>
                <CustomFormLabel label={"Blood Pressure"} />
                <Box
                  display={"grid"}
                  alignItems={"center"}
                  columnGap={1}
                  gridTemplateColumns={"40% 10% 40%"}
                >
                  <InputBase
                    name={"objective.patientVitals[0].value1"}
                    value={
                      formikData?.values?.objective === null
                        ? ""
                        : formikData?.values?.objective?.patientVitals[0]
                            ?.value1
                    }
                    onChange={formikData.handleChange}
                    fullWidth
                    placeholder="120"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  />
                  <Typography px={1}>{"/"}</Typography>
                  <InputBase
                    name={"objective.patientVitals[0].value2"}
                    value={
                      formikData?.values?.objective?.patientVitals[0]?.value2
                    }
                    onChange={formikData.handleChange}
                    fullWidth
                    placeholder="80"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  />
                </Box>
              </Grid>
              <Grid>
                <CustomFormLabel label={"Position"} />
                <Select
                  className={classes.selectInputStyle}
                  name={"objective.patientVitals[0].position"}
                  value={
                    formikData?.values?.objective?.patientVitals[0]?.position
                  }
                  onChange={formikData.handleChange}
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
                            sitting
                          </Typography>
                        </span>
                      );
                    }
                    return <Typography variant="h5">{selected}</Typography>;
                  }}
                  MenuProps={MenuProps}
                  displayEmpty
                >
                  {position.map((data) => {
                    return (
                      <MenuItem
                        value={data}
                        className={classes.menuItemColorStyle}
                      >
                        {data}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Grid>
              <Grid>
                <CustomFormLabel label={"Area"} />
                <Select
                  className={classes.selectInputStyle}
                  name={"objective.patientVitals[0].area"}
                  value={formikData?.values?.objective?.patientVitals[0]?.area}
                  onChange={formikData.handleChange}
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
                            L-arm
                          </Typography>
                        </span>
                      );
                    }
                    return <Typography variant="h5">{selected}</Typography>;
                  }}
                  MenuProps={MenuProps}
                  displayEmpty
                >
                  {bpArea.map((data) => {
                    return (
                      <MenuItem
                        value={data}
                        className={classes.menuItemColorStyle}
                      >
                        {data}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Grid>
            </Box>
            <Box
              display={"grid"}
              gridTemplateColumns={"1fr 1fr 1fr"}
              columnGap={2}
              my={2}
            >
              <Grid>
                <CustomFormLabel label={"BMI"} />
                <InputBase
                  name={"objective.patientVitals[1].value1"}
                  value={
                    formikData?.values?.objective?.patientVitals[1]?.value1
                  }
                  onChange={formikData.handleChange}
                  fullWidth
                  placeholder="24.9"
                  classes={{
                    root: classes.inputField,
                    input: classes.inputBoxText,
                    focused: classes.inputBoxActive,
                  }}
                />
              </Grid>
              <Grid>
                <CustomFormLabel label={"Heart Rate"} />
                <InputBase
                  name={"objective.patientVitals[2].value1"}
                  value={
                    formikData?.values?.objective?.patientVitals[2]?.value1
                  }
                  onChange={formikData.handleChange}
                  fullWidth
                  placeholder="59"
                  classes={{
                    root: classes.inputField,
                    input: classes.inputBoxText,
                    focused: classes.inputBoxActive,
                  }}
                />
              </Grid>
              <Grid>
                <CustomFormLabel label={"Respiratory Rate"} />
                <InputBase
                  name={"objective.patientVitals[3].value1"}
                  value={
                    formikData?.values?.objective?.patientVitals[3]?.value1
                  }
                  onChange={formikData.handleChange}
                  fullWidth
                  placeholder="13"
                  classes={{
                    root: classes.inputField,
                    input: classes.inputBoxText,
                    focused: classes.inputBoxActive,
                  }}
                />
              </Grid>
            </Box>
            <Box
              display={"grid"}
              gridTemplateColumns={"1fr 1fr 1fr 1fr"}
              columnGap={2}
              rowGap={2}
              my={2}
            >
              <Grid>
                <CustomFormLabel label={"Oxygen Saturation"} />
                <InputBase
                  name={"objective.patientVitals[4].value1"}
                  value={
                    formikData?.values?.objective?.patientVitals[4]?.value1
                  }
                  onChange={formikData.handleChange}
                  fullWidth
                  placeholder="90"
                  classes={{
                    root: classes.inputField,
                    input: classes.inputBoxText,
                    focused: classes.inputBoxActive,
                  }}
                />
              </Grid>
              <Grid container alignItems={"end"}>
                <Select
                  className={classes.selectInputStyle}
                  name={"objective.patientVitals[4].position"}
                  value={
                    formikData?.values?.objective?.patientVitals[4]?.position
                  }
                  onChange={formikData.handleChange}
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
                            %
                          </Typography>
                        </span>
                      );
                    }
                    return <Typography variant="h5">{selected}</Typography>;
                  }}
                  MenuProps={MenuProps}
                  displayEmpty
                >
                  {bpOs.map((data) => {
                    return (
                      <MenuItem
                        value={data}
                        className={classes.menuItemColorStyle}
                      >
                        {data}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Grid>
              <Grid>
                <CustomFormLabel label={"Height"} />
                <InputBase
                  name={"objective.patientVitals[5].value1"}
                  value={
                    formikData?.values?.objective?.patientVitals[5]?.value1
                  }
                  onChange={(e)=>{
                    formikData.handleChange(e)
                    handleHeightChange(e)
                  }}
                  fullWidth
                  placeholder="ft"
                  classes={{
                    root: classes.inputField,
                    input: classes.inputBoxText,
                    focused: classes.inputBoxActive,
                  }}
                />
              </Grid>
              <Grid container alignItems={"end"}>
                <Select
                  className={classes.selectInputStyle}
                  name={"objective.patientVitals[5].unit"}
                  value={formikData?.values?.objective?.patientVitals[5]?.unit}
                  onChange={(e)=>{
                    formikData.handleChange(e)
                    handleUnitChange(e)
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
                            Feet
                          </Typography>
                        </span>
                      );
                    }
                    return <Typography variant="h5">{selected}</Typography>;
                  }}
                  MenuProps={MenuProps}
                  displayEmpty
                >
                  {bpHeight.map((data) => {
                    return (
                      <MenuItem
                        value={data}
                        className={classes.menuItemColorStyle}
                      >
                        {data}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Grid>
              <Grid>
                <CustomFormLabel label={"Temperature"} />
                <InputBase
                  name={"objective.patientVitals[6].value1"}
                  value={
                    formikData?.values?.objective?.patientVitals[6]?.value1
                  }
                  onChange={formikData.handleChange}
                  fullWidth
                  placeholder="oF"
                  classes={{
                    root: classes.inputField,
                    input: classes.inputBoxText,
                    focused: classes.inputBoxActive,
                  }}
                />
              </Grid>
              <Grid container alignItems={"end"}>
                <Select
                  className={classes.selectInputStyle}
                  name={"objective.patientVitals[6].unit"}
                  value={formikData?.values?.objective?.patientVitals[6]?.unit}
                  onChange={formikData.handleChange}
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
                            Unit
                          </Typography>
                        </span>
                      );
                    }
                    return <Typography variant="h5">{selected}</Typography>;
                  }}
                  MenuProps={MenuProps}
                  displayEmpty
                >
                  {bpTemp.map((data) => {
                    return (
                      <MenuItem
                        value={data}
                        className={classes.menuItemColorStyle}
                      >
                        {data}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Grid>
              <Grid>
                <CustomFormLabel label={"Weight"} />
                <InputBase
                  name={"objective.patientVitals[7].value1"}
                  value={
                    formikData?.values?.objective?.patientVitals[7]?.value1
                  }
                  onChange={(e)=>{
                    formikData.handleChange(e)
                    handleWeightChange(e)
                  }}
                  fullWidth
                  placeholder="85"
                  classes={{
                    root: classes.inputField,
                    input: classes.inputBoxText,
                    focused: classes.inputBoxActive,
                  }}
                />
              </Grid>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonBase sx={formButtonStyle.saveButtonStyle} onClick={onClose}>
            <Typography color={"#fff"}>{"Add Vitals"}</Typography>
          </ButtonBase>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default VitalsForm;
