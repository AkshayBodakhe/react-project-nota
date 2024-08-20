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
  FormControlLabel,
  Grid,
  InputBase,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React from "react";
import { commonWidget, formButtonStyle } from "../../../../../../styles/common";
import CustomFormLabel from "../../../../../../components/common/custom-form-label";

interface rosForm {
  open: boolean;
  onClose: any;
  formikData: any;
}

function ROSForm(props: rosForm) {
  const { open, onClose, formikData } = props;
  const [scroll] = React.useState<DialogProps["scroll"]>("paper");
  const classes = commonWidget();

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
            <Typography variant="h3">{"Review of System (ROS)"}</Typography>
            <Close onClick={onClose} sx={{ cursor: "pointer" }} />
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box
              display={"grid"}
              gridTemplateColumns={"1fr 1fr 1fr"}
              columnGap={2}
              rowGap={2}
              my={2}
            >
              <Grid>
                <CustomFormLabel label={"General"} />
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={
                    formikData?.values?.subjective?.reviewOfSystem?.general
                  }
                >
                  <FormControlLabel
                    value="YES"
                    control={
                      <Radio
                        onChange={(e) => {
                          formikData.setFieldValue(
                            "subjective.reviewOfSystem.general",
                            e.target.value
                          );
                        }}
                      />
                    }
                    label="Yes"
                    sx={{
                      ".MuiTypography-root": {
                        fontSize: "15px !important",
                        color: "black !important",
                      },
                    }}
                  />
                  <FormControlLabel
                    value="NO"
                    control={
                      <Radio
                        onChange={(e) => {
                          formikData.setFieldValue(
                            "subjective.reviewOfSystem.general",
                            e.target.value
                          );
                        }}
                      />
                    }
                    label="No"
                  />
                </RadioGroup>
              </Grid>
              <Grid>
                <CustomFormLabel label={"Diet"} />
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={formikData?.values?.subjective?.reviewOfSystem?.diet}
                >
                  <FormControlLabel
                    value="YES"
                    control={
                      <Radio
                        onChange={(e) => {
                          formikData.setFieldValue(
                            "subjective.reviewOfSystem.diet",
                            e.target.value
                          );
                        }}
                      />
                    }
                    label="Yes"
                    sx={{
                      ".MuiTypography-root": {
                        fontSize: "15px !important",
                        color: "black !important",
                      },
                    }}
                  />
                  <FormControlLabel
                    value="NO"
                    control={
                      <Radio
                        onChange={(e) => {
                          formikData.setFieldValue(
                            "subjective.reviewOfSystem.diet",
                            e.target.value
                          );
                        }}
                      />
                    }
                    label="No"
                  />
                </RadioGroup>
              </Grid>
              <Grid>
                <CustomFormLabel label={"Eyes"} />
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={formikData?.values?.subjective?.reviewOfSystem?.eyes}
                >
                  <FormControlLabel
                    value="YES"
                    control={
                      <Radio
                        onChange={(e) => {
                          formikData.setFieldValue(
                            "subjective.reviewOfSystem.eyes",
                            e.target.value
                          );
                        }}
                      />
                    }
                    label="Yes"
                    sx={{
                      ".MuiTypography-root": {
                        fontSize: "15px !important",
                        color: "black !important",
                      },
                    }}
                  />
                  <FormControlLabel
                    value="NO"
                    control={
                      <Radio
                        onChange={(e) => {
                          formikData.setFieldValue(
                            "subjective.reviewOfSystem.eyes",
                            e.target.value
                          );
                        }}
                      />
                    }
                    label="No"
                  />
                </RadioGroup>
              </Grid>
              <Grid>
                <CustomFormLabel label={"Hent"} />
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={formikData?.values?.subjective?.reviewOfSystem?.hent}
                >
                  <FormControlLabel
                    value="YES"
                    control={
                      <Radio
                        onChange={(e) => {
                          formikData.setFieldValue(
                            "subjective.reviewOfSystem.hent",
                            e.target.value
                          );
                        }}
                      />
                    }
                    label="Yes"
                    sx={{
                      ".MuiTypography-root": {
                        fontSize: "15px !important",
                        color: "black !important",
                      },
                    }}
                  />
                  <FormControlLabel
                    value="NO"
                    control={
                      <Radio
                        onChange={(e) => {
                          formikData.setFieldValue(
                            "subjective.reviewOfSystem.hent",
                            e.target.value
                          );
                        }}
                      />
                    }
                    label="No"
                  />
                </RadioGroup>
              </Grid>
              <Grid>
                <CustomFormLabel label={"Respiratory Therapy"} />
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={
                    formikData?.values?.subjective?.reviewOfSystem
                      ?.respiratoryTherapy
                  }
                >
                  <FormControlLabel
                    value="YES"
                    control={
                      <Radio
                        onChange={(e) => {
                          formikData.setFieldValue(
                            "subjective.reviewOfSystem.respiratoryTherapy",
                            e.target.value
                          );
                        }}
                      />
                    }
                    label="Yes"
                    sx={{
                      ".MuiTypography-root": {
                        fontSize: "15px !important",
                        color: "black !important",
                      },
                    }}
                  />
                  <FormControlLabel
                    value="NO"
                    control={
                      <Radio
                        onChange={(e) => {
                          formikData.setFieldValue(
                            "subjective.reviewOfSystem.respiratoryTherapy",
                            e.target.value
                          );
                        }}
                      />
                    }
                    label="No"
                  />
                </RadioGroup>
              </Grid>
              <Grid>
                <CustomFormLabel label={"CVS "} />
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={
                    formikData?.values?.subjective?.reviewOfSystem
                      ?.chorionicVillusSampling
                  }
                >
                  <FormControlLabel
                    value="YES"
                    control={
                      <Radio
                        onChange={(e) => {
                          formikData.setFieldValue(
                            "subjective.reviewOfSystem.chorionicVillusSampling",
                            e.target.value
                          );
                        }}
                      />
                    }
                    label="Yes"
                    sx={{
                      ".MuiTypography-root": {
                        fontSize: "15px !important",
                        color: "black !important",
                      },
                    }}
                  />
                  <FormControlLabel
                    value="NO"
                    control={
                      <Radio
                        onChange={(e) => {
                          formikData.setFieldValue(
                            "subjective.reviewOfSystem.chorionicVillusSampling",
                            e.target.value
                          );
                        }}
                      />
                    }
                    label="No"
                  />
                </RadioGroup>
              </Grid>
              <Grid>
                <CustomFormLabel label={"Breast "} />
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={formikData?.values?.subjective?.reviewOfSystem?.breast}
                >
                  <FormControlLabel
                    value="YES"
                    control={
                      <Radio
                        onChange={(e) => {
                          formikData.setFieldValue(
                            "subjective.reviewOfSystem.breast",
                            e.target.value
                          );
                        }}
                      />
                    }
                    label="Yes"
                    sx={{
                      ".MuiTypography-root": {
                        fontSize: "15px !important",
                        color: "black !important",
                      },
                    }}
                  />
                  <FormControlLabel
                    value="NO"
                    control={
                      <Radio
                        onChange={(e) => {
                          formikData.setFieldValue(
                            "subjective.reviewOfSystem.breast",
                            e.target.value
                          );
                        }}
                      />
                    }
                    label="No"
                  />
                </RadioGroup>
              </Grid>
              <Grid>
                <CustomFormLabel label={"GI"} />
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={
                    formikData?.values?.subjective?.reviewOfSystem
                      ?.gastrointestinal
                  }
                >
                  <FormControlLabel
                    value="YES"
                    control={
                      <Radio
                        onChange={(e) => {
                          formikData.setFieldValue(
                            "subjective.reviewOfSystem.gastrointestinal",
                            e.target.value
                          );
                        }}
                      />
                    }
                    label="Yes"
                    sx={{
                      ".MuiTypography-root": {
                        fontSize: "15px !important",
                        color: "black !important",
                      },
                    }}
                  />
                  <FormControlLabel
                    value="NO"
                    control={
                      <Radio
                        onChange={(e) => {
                          formikData.setFieldValue(
                            "subjective.reviewOfSystem.gastrointestinal",
                            e.target.value
                          );
                        }}
                      />
                    }
                    label="No"
                  />
                </RadioGroup>
              </Grid>
              <Grid>
                <CustomFormLabel label={"GU"} />
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={
                    formikData?.values?.subjective?.reviewOfSystem
                      ?.genitourinary
                  }
                >
                  <FormControlLabel
                    value="YES"
                    control={
                      <Radio
                        onChange={(e) => {
                          formikData.setFieldValue(
                            "subjective.reviewOfSystem.genitourinary",
                            e.target.value
                          );
                        }}
                      />
                    }
                    label="Yes"
                    sx={{
                      ".MuiTypography-root": {
                        fontSize: "15px !important",
                        color: "black !important",
                      },
                    }}
                  />
                  <FormControlLabel
                    value="NO"
                    control={
                      <Radio
                        onChange={(e) => {
                          formikData.setFieldValue(
                            "subjective.reviewOfSystem.genitourinary",
                            e.target.value
                          );
                        }}
                      />
                    }
                    label="No"
                  />
                </RadioGroup>
              </Grid>
              <Grid>
                <CustomFormLabel label={"MSS"} />
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={
                    formikData?.values?.subjective?.reviewOfSystem
                      ?.marshallSmithSyndrome
                  }
                >
                  <FormControlLabel
                    value="YES"
                    control={
                      <Radio
                        onChange={(e) => {
                          formikData.setFieldValue(
                            "subjective.reviewOfSystem.marshallSmithSyndrome",
                            e.target.value
                          );
                        }}
                      />
                    }
                    label="Yes"
                    sx={{
                      ".MuiTypography-root": {
                        fontSize: "15px !important",
                        color: "black !important",
                      },
                    }}
                  />
                  <FormControlLabel
                    value="NO"
                    control={
                      <Radio
                        onChange={(e) => {
                          formikData.setFieldValue(
                            "subjective.reviewOfSystem.marshallSmithSyndrome",
                            e.target.value
                          );
                        }}
                      />
                    }
                    label="No"
                  />
                </RadioGroup>
              </Grid>
              <Grid>
                <CustomFormLabel label={"NS"} />
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={
                    formikData?.values?.subjective?.reviewOfSystem?.normalSaline
                  }
                >
                  <FormControlLabel
                    value="YES"
                    control={
                      <Radio
                        onChange={(e) => {
                          formikData.setFieldValue(
                            "subjective.reviewOfSystem.normalSaline",
                            e.target.value
                          );
                        }}
                      />
                    }
                    label="Yes"
                    sx={{
                      ".MuiTypography-root": {
                        fontSize: "15px !important",
                        color: "black !important",
                      },
                    }}
                  />
                  <FormControlLabel
                    value="NO"
                    control={
                      <Radio
                        onChange={(e) => {
                          formikData.setFieldValue(
                            "subjective.reviewOfSystem.normalSaline",
                            e.target.value
                          );
                        }}
                      />
                    }
                    label="No"
                  />
                </RadioGroup>
              </Grid>
              <Grid>
                <CustomFormLabel label={"Skin"} />
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={formikData?.values?.subjective?.reviewOfSystem?.skin}
                >
                  <FormControlLabel
                    value="YES"
                    control={
                      <Radio
                        onChange={(e) => {
                          formikData.setFieldValue(
                            "subjective.reviewOfSystem.skin",
                            e.target.value
                          );
                        }}
                      />
                    }
                    label="Yes"
                    sx={{
                      ".MuiTypography-root": {
                        fontSize: "15px !important",
                        color: "black !important",
                      },
                    }}
                  />
                  <FormControlLabel
                    value="NO"
                    control={
                      <Radio
                        onChange={(e) => {
                          formikData.setFieldValue(
                            "subjective.reviewOfSystem.skin",
                            e.target.value
                          );
                        }}
                      />
                    }
                    label="No"
                  />
                </RadioGroup>
              </Grid>
              <Grid>
                <CustomFormLabel label={"Hemo"} />
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={formikData?.values?.subjective?.reviewOfSystem?.hemo}
                >
                  <FormControlLabel
                    value="YES"
                    control={
                      <Radio
                        onChange={(e) => {
                          formikData.setFieldValue(
                            "subjective.reviewOfSystem.hemo",
                            e.target.value
                          );
                        }}
                      />
                    }
                    label="Yes"
                    sx={{
                      ".MuiTypography-root": {
                        fontSize: "15px !important",
                        color: "black !important",
                      },
                    }}
                  />
                  <FormControlLabel
                    value="NO"
                    control={
                      <Radio
                        onChange={(e) => {
                          formikData.setFieldValue(
                            "subjective.reviewOfSystem.hemo",
                            e.target.value
                          );
                        }}
                      />
                    }
                    label="No"
                  />
                </RadioGroup>
              </Grid>
              <Grid>
                <CustomFormLabel label={"Endoc"} />
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={
                    formikData.values?.subjective?.reviewOfSystem?.endocrinology
                  }
                >
                  <FormControlLabel
                    value="YES"
                    control={
                      <Radio
                        onChange={(e) => {
                          formikData.setFieldValue(
                            "subjective.reviewOfSystem.endocrinology",
                            e.target.value
                          );
                        }}
                      />
                    }
                    label="Yes"
                    sx={{
                      ".MuiTypography-root": {
                        fontSize: "15px !important",
                        color: "black !important",
                      },
                    }}
                  />
                  <FormControlLabel
                    value="NO"
                    control={
                      <Radio
                        onChange={(e) => {
                          formikData.setFieldValue(
                            "subjective.reviewOfSystem.endocrinology",
                            e.target.value
                          );
                        }}
                      />
                    }
                    label="No"
                  />
                </RadioGroup>
              </Grid>
              <Grid>
                <CustomFormLabel label={"Psych"} />
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={
                    formikData?.values?.subjective?.reviewOfSystem?.psychology
                  }
                >
                  <FormControlLabel
                    value="YES"
                    control={
                      <Radio
                        onChange={(e) => {
                          formikData.setFieldValue(
                            "subjective.reviewOfSystem.psychology",
                            e.target.value
                          );
                        }}
                      />
                    }
                    label="Yes"
                    sx={{
                      ".MuiTypography-root": {
                        fontSize: "15px !important",
                        color: "black !important",
                      },
                    }}
                  />
                  <FormControlLabel
                    value="NO"
                    control={
                      <Radio
                        onChange={(e) => {
                          formikData.setFieldValue(
                            "subjective.reviewOfSystem.psychology",
                            e.target.value
                          );
                        }}
                      />
                    }
                    label="No"
                  />
                </RadioGroup>
              </Grid>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonBase
            type="submit"
            sx={formButtonStyle.saveButtonStyle}
            onClick={onClose}
          >
            <Typography color={"#fff"}>{"Add ROS"}</Typography>
          </ButtonBase>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ROSForm;
