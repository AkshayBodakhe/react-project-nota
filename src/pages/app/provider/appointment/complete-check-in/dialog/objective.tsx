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
import { Close } from "@mui/icons-material";
import React from "react";
import CustomFormLabel from "../../../../../../components/common/custom-form-label";
import { commonWidget, formButtonStyle } from "../../../../../../styles/common";

interface objectiveFormProps {
  onClose: any;
  open: boolean;
  formikData: any;
}

export const position = ["Sitting", "Standing"];
export const bpArea = ["Left-arm", "Right-arm"];
export const bpOs = ["%"];
export const bpHeight = ["Inches", "Feet", "Meter", "Centimeter"];
export const bpTemp = ["Fahrenheit", "Celsius"];

function ObjectiveForm(props: objectiveFormProps) {
  const classes = commonWidget();
  const { open, onClose, formikData } = props;
  const [scroll] = React.useState<DialogProps["scroll"]>("paper");

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
            <Typography variant="h3">{"Physical Exam"}</Typography>
            <Close onClick={onClose} sx={{ cursor: "pointer" }} />
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box pt={1} pb={4}>
              <Box
                display={"grid"}
                gridTemplateColumns={"1fr 1fr 1fr"}
                columnGap={2}
                rowGap={2}
              >
                <Grid>
                  <CustomFormLabel label={"General"} />
                  {/* <InputBase
                    name={"objective.physicalExam.general"}
                    value={formikData?.values?.objective?.physicalExam?.general}
                    onChange={formikData.handleChange}
                    fullWidth
                    placeholder="General"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  /> */}
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={formikData?.values?.objective?.physicalExam?.general}
                  >
                    <FormControlLabel
                      value="YES"
                      control={
                        <Radio
                          onChange={(e) => {
                            formikData.setFieldValue(
                              "objective.physicalExam.general",
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
                              "objective.physicalExam.general",
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
                  {/* <InputBase
                    name={"objective.physicalExam.eyes"}
                    value={formikData?.values?.objective?.physicalExam?.eyes}
                    onChange={formikData.handleChange}
                    fullWidth
                    placeholder="eyes"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  /> */}
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={formikData?.values?.objective?.physicalExam?.eyes}
                  >
                    <FormControlLabel
                      value="YES"
                      control={
                        <Radio
                          onChange={(e) => {
                            formikData.setFieldValue(
                              "objective.physicalExam.eyes",
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
                              "objective.physicalExam.eyes",
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
                  {/* <InputBase
                    name={"objective.physicalExam.hent"}
                    value={formikData?.values?.objective?.physicalExam?.hent}
                    onChange={formikData.handleChange}
                    fullWidth
                    placeholder="hent"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  /> */}
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={formikData?.values?.objective?.physicalExam?.hent}
                  >
                    <FormControlLabel
                      value="YES"
                      control={
                        <Radio
                          onChange={(e) => {
                            formikData.setFieldValue(
                              "objective.physicalExam.hent",
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
                              "objective.physicalExam.hent",
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
                  <CustomFormLabel label={"Neck"} />
                  {/* <InputBase
                    name={"objective.physicalExam.neck"}
                    value={formikData?.values?.objective?.physicalExam?.neck}
                    onChange={formikData.handleChange}
                    fullWidth
                    placeholder="neck"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  /> */}
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={formikData?.values?.objective?.physicalExam?.neck}
                  >
                    <FormControlLabel
                      value="YES"
                      control={
                        <Radio
                          onChange={(e) => {
                            formikData.setFieldValue(
                              "objective.physicalExam.neck",
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
                              "objective.physicalExam.neck",
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
                  {/* <InputBase
                    name={"objective.physicalExam.respiratoryTherapy"}
                    value={
                      formikData?.values?.objective?.physicalExam
                        ?.respiratoryTherapy
                    }
                    onChange={formikData.handleChange}
                    fullWidth
                    placeholder="Respiratory theropy"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  /> */}
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={
                      formikData?.values?.objective?.physicalExam
                        ?.respiratoryTherapy
                    }
                  >
                    <FormControlLabel
                      value="YES"
                      control={
                        <Radio
                          onChange={(e) => {
                            formikData.setFieldValue(
                              "objective.physicalExam.respiratoryTherapy",
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
                              "objective.physicalExam.respiratoryTherapy",
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
                  {/* <InputBase
                    name={"objective.physicalExam.chorionicVillusSampling"}
                    value={
                      formikData?.values?.objective?.physicalExam
                        ?.chorionicVillusSampling
                    }
                    onChange={formikData.handleChange}
                    fullWidth
                    placeholder="Chorionic Villus Sampling"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  /> */}
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={
                      formikData?.values?.objective?.physicalExam
                        ?.chorionicVillusSampling
                    }
                  >
                    <FormControlLabel
                      value="YES"
                      control={
                        <Radio
                          onChange={(e) => {
                            formikData.setFieldValue(
                              "objective.physicalExam.chorionicVillusSampling",
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
                              "objective.physicalExam.chorionicVillusSampling",
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
                  {/* <InputBase
                    name={"objective.physicalExam.breast"}
                    value={formikData?.values?.objective?.physicalExam?.breast}
                    onChange={formikData.handleChange}
                    fullWidth
                    placeholder="breast"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  /> */}
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={formikData?.values?.objective?.physicalExam?.breast}
                  >
                    <FormControlLabel
                      value="YES"
                      control={
                        <Radio
                          onChange={(e) => {
                            formikData.setFieldValue(
                              "objective.physicalExam.breast",
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
                              "objective.physicalExam.breast",
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
                  <CustomFormLabel label={"ABDOM"} />
                  {/* <InputBase
                    name={"objective.physicalExam.abdom"}
                    value={formikData?.values?.objective?.physicalExam?.abdom}
                    onChange={formikData.handleChange}
                    fullWidth
                    placeholder="abdom"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  /> */}
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={formikData?.values?.objective?.physicalExam?.abdom}
                  >
                    <FormControlLabel
                      value="YES"
                      control={
                        <Radio
                          onChange={(e) => {
                            formikData.setFieldValue(
                              "objective.physicalExam.abdom",
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
                              "objective.physicalExam.abdom",
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
                  {/* <InputBase
                    name={"objective.physicalExam.genitourinary"}
                    value={
                      formikData?.values?.objective?.physicalExam?.genitourinary
                    }
                    onChange={formikData.handleChange}
                    fullWidth
                    placeholder="Genitourinary"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  /> */}
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={
                      formikData?.values?.objective?.physicalExam?.genitourinary
                    }
                  >
                    <FormControlLabel
                      value="YES"
                      control={
                        <Radio
                          onChange={(e) => {
                            formikData.setFieldValue(
                              "objective.physicalExam.genitourinary",
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
                              "objective.physicalExam.genitourinary",
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
                  {/* <InputBase
                    name={"objective.physicalExam.marshallSmithSyndrome"}
                    value={
                      formikData?.values?.objective?.physicalExam
                        ?.marshallSmithSyndrome
                    }
                    onChange={formikData.handleChange}
                    fullWidth
                    placeholder="Marshall smith syndrome"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  /> */}
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={
                      formikData?.values?.objective?.physicalExam
                        ?.marshallSmithSyndrome
                    }
                  >
                    <FormControlLabel
                      value="YES"
                      control={
                        <Radio
                          onChange={(e) => {
                            formikData.setFieldValue(
                              "objective.physicalExam.marshallSmithSyndrome",
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
                              "objective.physicalExam.marshallSmithSyndrome",
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
                  {/* <InputBase
                    name={"objective.physicalExam.normalSaline"}
                    value={
                      formikData?.values?.objective?.physicalExam?.normalSaline
                    }
                    onChange={formikData.handleChange}
                    fullWidth
                    placeholder="normalSaline"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  /> */}
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={
                      formikData?.values?.objective?.physicalExam?.normalSaline
                    }
                  >
                    <FormControlLabel
                      value="YES"
                      control={
                        <Radio
                          onChange={(e) => {
                            formikData.setFieldValue(
                              "objective.physicalExam.normalSaline",
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
                              "objective.physicalExam.normalSaline",
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
                  {/* <InputBase
                    name={"objective.physicalExam.skin"}
                    value={formikData?.values?.objective?.physicalExam?.skin}
                    onChange={formikData.handleChange}
                    fullWidth
                    placeholder="Skin issues"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  /> */}
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={formikData?.values?.objective?.physicalExam?.skin}
                  >
                    <FormControlLabel
                      value="YES"
                      control={
                        <Radio
                          onChange={(e) => {
                            formikData.setFieldValue(
                              "objective.physicalExam.skin",
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
                              "objective.physicalExam.skin",
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
                  <CustomFormLabel label={"Lymph"} />
                  {/* <InputBase
                    name={"objective.physicalExam.lymph"}
                    value={formikData?.values?.objective?.physicalExam?.lymph}
                    onChange={formikData.handleChange}
                    fullWidth
                    placeholder="lymph"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  /> */}
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={formikData?.values?.objective?.physicalExam?.lymph}
                  >
                    <FormControlLabel
                      value="YES"
                      control={
                        <Radio
                          onChange={(e) => {
                            formikData.setFieldValue(
                              "objective.physicalExam.lymph",
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
                              "objective.physicalExam.lymph",
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
                  {/* <InputBase
                    name={"objective.physicalExam.psych"}
                    value={formikData?.values?.objective?.physicalExam?.psych}
                    onChange={formikData.handleChange}
                    fullWidth
                    placeholder="Psychology"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  /> */}
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={formikData?.values?.objective?.physicalExam?.psych}
                  >
                    <FormControlLabel
                      value="YES"
                      control={
                        <Radio
                          onChange={(e) => {
                            formikData.setFieldValue(
                              "objective.physicalExam.psych",
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
                              "objective.physicalExam.psych",
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
                  <CustomFormLabel label={"Rectal"} />
                  {/* <InputBase
                    name={"objective.physicalExam.rectal"}
                    value={formikData?.values?.objective?.physicalExam?.rectal}
                    onChange={formikData.handleChange}
                    fullWidth
                    placeholder="rectal"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                  /> */}
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={formikData?.values?.objective?.physicalExam?.rectal}
                  >
                    <FormControlLabel
                      value="YES"
                      control={
                        <Radio
                          onChange={(e) => {
                            formikData.setFieldValue(
                              "objective.physicalExam.rectal",
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
                              "objective.physicalExam.rectal",
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
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonBase sx={formButtonStyle.saveButtonStyle} onClick={onClose}>
            <Typography color={"#fff"}>{"Add PE"}</Typography>
          </ButtonBase>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ObjectiveForm;
