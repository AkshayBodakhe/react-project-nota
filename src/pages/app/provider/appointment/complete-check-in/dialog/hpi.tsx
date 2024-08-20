import {
  Box,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  FormControlLabel,
  Grid,
  InputBase,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Close } from "@mui/icons-material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { commonWidget, formButtonStyle } from "../../../../../../styles/common";
import CustomFormLabel from "../../../../../../components/common/custom-form-label";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import moment from "moment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import CustomDatePicker from "../../../../../../components/common/custom-date-picker";

interface hpiProps {
  onClose: any;
  openHpi: boolean;
  formikData: any;
}

export const header = { fontSize: "18px", color: "black" };
export const RelationType = ["MOTHER", "FATHER", "BROTHER"];

export const allergyName = ["Congestion"];

export const reactionConst = [
  "PAIN",
  "RUNNY_NOSE",
  "SWELLING",
  "BLOATING",
  "VOMITING",
  "RASHES",
  "ITCHY_NOSE",
  "THROAT_CLOSING",
  "COUGH",
  "REDNESS",
];

export const severityConst = ["MILD", "MODERATE", "HIGH"];

function HPIForm(props: hpiProps) {
  const [scroll] = React.useState<DialogProps["scroll"]>("paper");
  const { onClose, openHpi, formikData } = props;
  const classes = commonWidget();

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

  return (
    <>
      <Dialog
        open={openHpi}
        onClose={onClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle id="scroll-dialog-title">
          <Grid container justifyContent={"space-between"}>
            <Typography variant="h3">
              {"History of Present Illness (HPI)"}
            </Typography>
            <Close onClick={onClose} sx={{ cursor: "pointer" }} />
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid pt={1}>
              {/* <Box pt={1} pb={4}>
                <Typography variant="h3" color={"black"} fontWeight={"600"}>
                  {"History of Present Illness (HPI)"}
                </Typography>
              </Box> */}
              <Box
                display={"grid"}
                gridTemplateColumns={"1fr 1fr"}
                columnGap={2}
              >
                <Grid>
                  <CustomFormLabel label={"Today's Visit"} />
                  <InputBase
                    name={"subjective.historyOfPresentIllness.todayVisit"}
                    onChange={formikData.handleChange}
                    value={
                      formikData?.values?.subjective?.historyOfPresentIllness
                        ?.todayVisit
                    }
                    fullWidth
                    placeholder="Today's visit"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  />
                </Grid>
                <Grid>
                  <CustomFormLabel label={"Hospitalization"} />
                  <InputBase
                    name={"subjective.historyOfPresentIllness.hospitalization"}
                    onChange={formikData.handleChange}
                    value={
                      formikData?.values?.subjective?.historyOfPresentIllness
                        ?.hospitalization
                    }
                    fullWidth
                    placeholder="Hospitalization"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  />
                </Grid>
              </Box>
              <Box py={2}>
                <Typography sx={header}>{"Past Medical History"}</Typography>
              </Box>
              <Box
                display={"grid"}
                gridTemplateColumns={"1fr 1fr 1fr"}
                columnGap={2}
              >
                <Grid>
                  <CustomFormLabel label={"Condition Name"} />
                  <InputBase
                    name={
                      "subjective.historyOfPresentIllness.patientPastMedicalHistory.name"
                    }
                    onChange={formikData.handleChange}
                    value={
                      formikData?.values?.subjective?.historyOfPresentIllness
                        ?.patientPastMedicalHistory?.name
                    }
                    fullWidth
                    placeholder="Condition Name"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  />
                </Grid>
                <Grid>
                  <CustomFormLabel label={"Onset Date"} />
                  <Box mt={2}>
                    <CustomDatePicker
                      height={"41px"}
                      value={dayjs(
                        formikData?.values?.subjective?.historyOfPresentIllness
                          ?.patientPastMedicalHistory?.onsetDate
                      )}
                      changeDate={(event: any) => {
                        const date = moment(event.$d).format("yyyy-MM-DD");
                        // dayjs(date);
                        formikData.setFieldValue(
                          "subjective.historyOfPresentIllness.patientPastMedicalHistory.onsetDate",
                          date
                        );
                      }}
                    />
                  </Box>
                </Grid>
                <Grid>
                  <CustomFormLabel label={"Note"} />
                  <InputBase
                    name={
                      "subjective.historyOfPresentIllness.patientPastMedicalHistory.note"
                    }
                    onChange={formikData.handleChange}
                    value={
                      formikData?.values?.subjective?.historyOfPresentIllness
                        ?.patientPastMedicalHistory?.note
                    }
                    fullWidth
                    placeholder="Note"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  />
                </Grid>
              </Box>
              <Box py={2}>
                <Typography sx={header}>{"Past Surgical History"}</Typography>
              </Box>
              <Box
                display={"grid"}
                gridTemplateColumns={"1fr 1fr 1fr"}
                columnGap={2}
              >
                <Grid>
                  <CustomFormLabel label={"Surgery Name"} />
                  <InputBase
                    name={
                      "subjective.historyOfPresentIllness.patientPastSurgicalHistory.name"
                    }
                    onChange={formikData.handleChange}
                    value={
                      formikData?.values?.subjective?.historyOfPresentIllness
                        ?.patientPastSurgicalHistory?.name
                    }
                    fullWidth
                    placeholder="Enter Surgery Name"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  />
                </Grid>
                <Grid>
                  <CustomFormLabel label={"Surgery Date"} />
                  <Box mt={2}>
                    <CustomDatePicker
                      height={"41px"}
                      value={dayjs(
                        formikData?.values?.subjective?.historyOfPresentIllness
                          ?.patientPastSurgicalHistory?.surgeryDate
                      )}
                      changeDate={(event: any) => {
                        const date = moment(event.$d).format("yyyy-MM-DD");
                        // dayjs(date);
                        formikData.setFieldValue(
                          "subjective.historyOfPresentIllness.patientPastSurgicalHistory.surgeryDate",
                          date
                        );
                      }}
                    />
                  </Box>
                </Grid>
                <Grid>
                  <CustomFormLabel label={"Note"} />
                  <InputBase
                    name={
                      "subjective.historyOfPresentIllness.patientPastSurgicalHistory.note"
                    }
                    value={
                      formikData?.values?.subjective?.historyOfPresentIllness
                        ?.patientPastSurgicalHistory?.note
                    }
                    onChange={formikData.handleChange}
                    fullWidth
                    placeholder="Note"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  />
                </Grid>
              </Box>
              <Box py={2}>
                <Typography sx={header}>{"Family History"}</Typography>
              </Box>
              <Box
                display={"grid"}
                gridTemplateColumns={"1fr 1fr 1fr"}
                columnGap={2}
                rowGap={2}
              >
                <Grid>
                  <CustomFormLabel label={"Problem Name"} />
                  <InputBase
                    name={
                      "subjective.historyOfPresentIllness.patientFamilyHistory.name"
                    }
                    value={
                      formikData?.values?.subjective?.historyOfPresentIllness
                        ?.patientFamilyHistory?.name
                    }
                    onChange={formikData.handleChange}
                    fullWidth
                    placeholder="Enter Problem Name"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  />
                </Grid>
                <Grid>
                  <CustomFormLabel label={"Relative"} />
                  <Select
                    className={classes.selectInputStyle}
                    name={
                      "subjective.historyOfPresentIllness.patientFamilyHistory.relative"
                    }
                    value={
                      formikData?.values?.subjective?.historyOfPresentIllness
                        ?.patientFamilyHistory?.relative
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
                              Select Relative
                            </Typography>
                          </span>
                        );
                      }
                      return <Typography variant="h5">{selected}</Typography>;
                    }}
                    MenuProps={MenuProps}
                    displayEmpty
                  >
                    {RelationType.map((data) => {
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
                  <CustomFormLabel label={"Age"} />
                  <InputBase
                    name={
                      "subjective.historyOfPresentIllness.patientFamilyHistory.onSetAge"
                    }
                    value={
                      formikData?.values?.subjective?.historyOfPresentIllness
                        ?.patientFamilyHistory?.onSetAge
                    }
                    onChange={formikData.handleChange}
                    fullWidth
                    placeholder="Enter age"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  />
                </Grid>
                <Grid>
                  <CustomFormLabel label={"Note"} />
                  <InputBase
                    name={
                      "subjective.historyOfPresentIllness.patientFamilyHistory.note"
                    }
                    value={
                      formikData?.values?.subjective?.historyOfPresentIllness
                        ?.patientFamilyHistory?.note
                    }
                    onChange={formikData.handleChange}
                    fullWidth
                    placeholder="Note"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  />
                </Grid>
              </Box>
              <Box py={2}>
                <Typography sx={header}>{"Social History"}</Typography>
              </Box>
              <Box
                display={"grid"}
                gridTemplateColumns={"1fr 1fr 1fr"}
                columnGap={2}
                rowGap={2}
              >
                <Grid>
                  <CustomFormLabel label={"Name"} />
                  <InputBase
                    name={
                      "subjective.historyOfPresentIllness.patientSocialHistory.name"
                    }
                    value={
                      formikData?.values?.subjective?.historyOfPresentIllness
                        ?.patientSocialHistory?.name
                    }
                    onChange={formikData.handleChange}
                    fullWidth
                    placeholder="Enter Name"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  />
                </Grid>
                <Grid>
                  <CustomFormLabel label={"Description"} />
                  <InputBase
                    name={
                      "subjective.historyOfPresentIllness.patientSocialHistory.description"
                    }
                    value={
                      formikData?.values?.subjective?.historyOfPresentIllness
                        ?.patientSocialHistory?.description
                    }
                    onChange={formikData.handleChange}
                    fullWidth
                    placeholder="Description"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  />
                </Grid>
              </Box>
              <Box py={2}>
                <Typography sx={header}>{"Allergy"}</Typography>
              </Box>
              <Box
                display={"grid"}
                gridTemplateColumns={"1fr 1fr 1fr"}
                columnGap={2}
                rowGap={2}
              >
                <Grid>
                  <CustomFormLabel label={"Allergy Type"} />
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={
                      formikData?.values?.subjective?.historyOfPresentIllness
                        ?.patientAllergy?.allergyType
                    }
                  >
                    <FormControlLabel
                      value="DRUG"
                      control={
                        <Radio
                          onChange={(e) => {
                            formikData.setFieldValue(
                              "subjective.historyOfPresentIllness.patientAllergy.allergyType",
                              e.target.value
                            );
                          }}
                        />
                      }
                      label="Drug"
                      sx={{
                        ".MuiTypography-root": {
                          fontSize: "15px !important",
                          color: "black !important",
                        },
                      }}
                    />
                    <FormControlLabel
                      value="FOOD"
                      control={
                        <Radio
                          onChange={(e) => {
                            formikData.setFieldValue(
                              "subjective.historyOfPresentIllness.patientAllergy.allergyType",
                              e.target.value
                            );
                          }}
                        />
                      }
                      label="Food"
                    />
                    <FormControlLabel
                      value="ENVIRONMENT"
                      control={
                        <Radio
                          onChange={(e) => {
                            formikData.setFieldValue(
                              "subjective.historyOfPresentIllness.patientAllergy.allergyType",
                              e.target.value
                            );
                          }}
                        />
                      }
                      label="Environment"
                    />
                  </RadioGroup>
                </Grid>
                <Grid>
                  <CustomFormLabel label={"Allergy Name"} />
                  {/* <Select
                    className={classes.selectInputStyle}
                    name="subjective.historyOfPresentIllness.patientAllergy.allergy.name"
                    value={
                      formikData?.values?.subjective?.historyOfPresentIllness
                        ?.patientAllergy?.allergy?.name
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
                              Select Allergy
                            </Typography>
                          </span>
                        );
                      }
                      return <Typography variant="h5">{selected}</Typography>;
                    }}
                    MenuProps={MenuProps}
                    displayEmpty
                  >
                    {allergyName.map((data) => {
                      return (
                        <MenuItem
                          value={data}
                          className={classes.menuItemColorStyle}
                        >
                          {data}
                        </MenuItem>
                      );
                    })}
                  </Select> */}
                  <InputBase
                    name={
                      "subjective.historyOfPresentIllness.patientAllergy.allergy"
                    }
                    value={
                      formikData?.values?.subjective?.historyOfPresentIllness
                        ?.patientAllergy?.allergy
                    }
                    onChange={formikData.handleChange}
                    fullWidth
                    placeholder="Allergy Name"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  />
                </Grid>
                <Grid>
                  <CustomFormLabel label={"Reaction"} />
                  <Select
                    className={classes.selectInputStyle}
                    name={
                      "subjective.historyOfPresentIllness.patientAllergy.reaction"
                    }
                    value={
                      formikData?.values?.subjective?.historyOfPresentIllness
                        ?.patientAllergy?.reaction
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
                              Select Reaction
                            </Typography>
                          </span>
                        );
                      }
                      return <Typography variant="h5">{selected}</Typography>;
                    }}
                    MenuProps={MenuProps}
                    displayEmpty
                  >
                    {reactionConst.map((data) => {
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
                  <CustomFormLabel label={"Severity"} />
                  <Select
                    className={classes.selectInputStyle}
                    name={
                      "subjective.historyOfPresentIllness.patientAllergy.severity"
                    }
                    value={
                      formikData?.values?.subjective?.historyOfPresentIllness
                        ?.patientAllergy?.severity
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
                              Select Severity
                            </Typography>
                          </span>
                        );
                      }
                      return <Typography variant="h5">{selected}</Typography>;
                    }}
                    MenuProps={MenuProps}
                    displayEmpty
                  >
                    {severityConst.map((data) => {
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
                  <CustomFormLabel label={"Note"} />
                  <InputBase
                    name={
                      "subjective.historyOfPresentIllness.patientAllergy.note"
                    }
                    value={
                      formikData?.values?.subjective?.historyOfPresentIllness
                        ?.patientAllergy?.note
                    }
                    onChange={formikData.handleChange}
                    fullWidth
                    placeholder="Note"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  />
                </Grid>
              </Box>
            </Grid>
            <Grid>
              {/* <Box my={4}>
                <Typography variant="h3" color={"black"} fontWeight={"600"}>
                  {"Review of Services (ROS)"}
                </Typography>
              </Box> */}
              {/* <Box
                display={"grid"}
                gridTemplateColumns={"1fr 1fr 1fr"}
                columnGap={2}
                rowGap={2}
              >
                <Grid>
                  <CustomFormLabel label={"General"} />
                  <InputBase
                    name={"subjective.reviewOfSystem.general"}
                    value={formikData.values.subjective.reviewOfSystem.general}
                    onChange={formikData.handleChange}
                    fullWidth
                    placeholder="General"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  />
                </Grid>
                <Grid>
                  <CustomFormLabel label={"Diet"} />
                  <InputBase
                    name={"subjective.reviewOfSystem.diet"}
                    value={formikData.values.subjective.reviewOfSystem.diet}
                    onChange={formikData.handleChange}
                    fullWidth
                    placeholder="diet"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  />
                </Grid>
                <Grid>
                  <CustomFormLabel label={"Eyes"} />
                  <InputBase
                    name={"subjective.reviewOfSystem.eyes"}
                    value={formikData.values.subjective.reviewOfSystem.eyes}
                    onChange={formikData.handleChange}
                    fullWidth
                    placeholder="eyes"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  />
                </Grid>
                <Grid>
                  <CustomFormLabel label={"Hent"} />
                  <InputBase
                    name={"subjective.reviewOfSystem.hent"}
                    value={formikData.values.subjective.reviewOfSystem.hent}
                    onChange={formikData.handleChange}
                    fullWidth
                    placeholder="hent"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  />
                </Grid>
                <Grid>
                  <CustomFormLabel label={"Respiratory Therapy"} />
                  <InputBase
                    name={"subjective.reviewOfSystem.respiratoryTherapy"}
                    value={
                      formikData.values.subjective.reviewOfSystem
                        .respiratoryTherapy
                    }
                    onChange={formikData.handleChange}
                    fullWidth
                    placeholder="Respiratory theropy"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  />
                </Grid>
                <Grid>
                  <CustomFormLabel label={"CVS "} />
                  <InputBase
                    name={"subjective.reviewOfSystem.chorionicVillusSampling"}
                    value={
                      formikData.values.subjective.reviewOfSystem
                        .chorionicVillusSampling
                    }
                    onChange={formikData.handleChange}
                    fullWidth
                    placeholder="Chorionic Villus Sampling"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  />
                </Grid>
                <Grid>
                  <CustomFormLabel label={"Breast "} />
                  <InputBase
                    name={"subjective.reviewOfSystem.breast"}
                    value={formikData.values.subjective.reviewOfSystem.breast}
                    onChange={formikData.handleChange}
                    fullWidth
                    placeholder="breast"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  />
                </Grid>
                <Grid>
                  <CustomFormLabel label={"GI"} />
                  <InputBase
                    name={"subjective.reviewOfSystem.gastrointestinal"}
                    value={
                      formikData.values.subjective.reviewOfSystem
                        .gastrointestinal
                    }
                    onChange={formikData.handleChange}
                    fullWidth
                    placeholder="Gastrointestinal"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  />
                </Grid>
                <Grid>
                  <CustomFormLabel label={"GU"} />
                  <InputBase
                    name={"subjective.reviewOfSystem.genitourinary"}
                    value={
                      formikData.values.subjective.reviewOfSystem.genitourinary
                    }
                    onChange={formikData.handleChange}
                    fullWidth
                    placeholder="Genitourinary"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  />
                </Grid>
                <Grid>
                  <CustomFormLabel label={"MSS"} />
                  <InputBase
                    name={"subjective.reviewOfSystem.marshallSmithSyndrome"}
                    value={
                      formikData.values.subjective.reviewOfSystem
                        .marshallSmithSyndrome
                    }
                    onChange={formikData.handleChange}
                    fullWidth
                    placeholder="Marshall smith syndrome"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  />
                </Grid>
                <Grid>
                  <CustomFormLabel label={"NS"} />
                  <InputBase
                    name={"subjective.reviewOfSystem.normalSaline"}
                    value={
                      formikData.values.subjective.reviewOfSystem.normalSaline
                    }
                    onChange={formikData.handleChange}
                    fullWidth
                    placeholder="normalSaline"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  />
                </Grid>
                <Grid>
                  <CustomFormLabel label={"Skin"} />
                  <InputBase
                    name={"subjective.reviewOfSystem.skin"}
                    value={formikData.values.subjective.reviewOfSystem.skin}
                    onChange={formikData.handleChange}
                    fullWidth
                    placeholder="Skin issues"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  />
                </Grid>
                <Grid>
                  <CustomFormLabel label={"Hemo"} />
                  <InputBase
                    name={"subjective.reviewOfSystem.hemo"}
                    value={formikData.values.subjective.reviewOfSystem.hemo}
                    onChange={formikData.handleChange}
                    fullWidth
                    placeholder="hemo"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  />
                </Grid>
                <Grid>
                  <CustomFormLabel label={"Endoc"} />
                  <InputBase
                    name={"subjective.reviewOfSystem.endocrinology"}
                    value={
                      formikData.values.subjective.reviewOfSystem.endocrinology
                    }
                    onChange={formikData.handleChange}
                    fullWidth
                    placeholder="Endocrinology"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  />
                </Grid>
                <Grid>
                  <CustomFormLabel label={"Psych"} />
                  <InputBase
                    name={"subjective.reviewOfSystem.psychology"}
                    value={
                      formikData.values.subjective.reviewOfSystem.psychology
                    }
                    onChange={formikData.handleChange}
                    fullWidth
                    placeholder="Psychology"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  />
                </Grid>
              </Box> */}
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonBase
            type="submit"
            sx={formButtonStyle.saveButtonStyle}
            onClick={onClose}
          >
            <Typography color={"#fff"}>{"Add HPI"}</Typography>
          </ButtonBase>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default HPIForm;
