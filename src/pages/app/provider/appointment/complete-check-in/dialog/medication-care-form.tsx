import { useSelector } from "react-redux";
import { adminConstants } from "../../../../../../constants/admin";
import {
  SaveButtonStylo,
  cancelButtonStylo,
  commonWidget,
  formTitle,
  formBottom,
} from "../../../../../../styles/common";
import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Grid,
  InputBase,
  TextField,
  Typography,
} from "@mui/material";
import { useDrugCatalogControllerServiceGetAllDrugs } from "../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { Close } from "@mui/icons-material";
import CustomFormLabel from "../../../../../../components/common/custom-form-label";
import {
  DosageTimeList,
  DosageUnitList,
  DosageWhenList,
} from "../../../../../../components/common/form-enum";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CustomDatePicker from "../../../../../../components/common/custom-date-picker";
import moment from "moment";
import dayjs from "dayjs";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SelectInput from "../../../../../../components/common/select-input";
import DeleteIcon from "@mui/icons-material/Delete";
interface planProps {
  openDialog: boolean;
  handleDialog: any;
  formik: any;
  medications?: any;
  setMedications?: any;
  cancelMedication?: any;
}

function MedicationsCareForm(props: planProps) {
  const {
    openDialog,
    handleDialog,
    setMedications,
    medications,
    cancelMedication,
    formik,
  } = props;
  const { SELECT_AN_OPTION, ADD_MEDICATION, SAVE } = adminConstants;
  const userDetails = useSelector(
    (state: any) => state.commonReducer.userDetail
  );
  const classes = commonWidget();
  // const [CPTCodes, setCPTCode] = useState<any[]>();
  const [allMedicationName, setAllMedicationName] = useState<any>();
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

  const { data: allDrugs } = useDrugCatalogControllerServiceGetAllDrugs({
    providerGroupUuid: userDetails?.data?.providerGroup,
    size: 1000,
    page: 0,
  });

  useEffect(() => {
    setAllMedicationName(allDrugs && allDrugs?.data?.content);
  }, [allDrugs]);

  const medicineName = allMedicationName?.map((item: any) => {
    return {
      id: item?.id,
      medicine: item.medicine,
      type: item.type,
    };
  });

  const defaultProps = {
    options: medicineName || [],
    getOptionLabel: (option: any) =>
      option.medicine === "" || null
        ? ""
        : option.medicine + " (" + option.type + ")" || "",
  };

  const addMedication = () => {
    setMedications([
      ...medications,
      {
        drugCatalog: { id: 0, medicine: "", type: "" },
        sig: null,
        quantity: null,
        dosageUnit: null,
        dosageWhen: null,
        dosageTime: null,
        duration: null,
        startDate: null,
        endDate: null,
        note: "",
      },
    ]);
  };

  const updateMedication = (index: any, field: any, value: any) => {
    const newMedications = [...medications];
    newMedications[index] = {
      ...newMedications[index],
      [field]: value,
    };
    setMedications(newMedications);
  };

  const deleteMedication = (index: any) => {
    const newMedications = medications.filter((_: any, i: any) => i !== index);
    setMedications(newMedications);
  };

  return (
    <Box>
      <Dialog open={openDialog} onClose={handleDialog} maxWidth="xl">
        <DialogTitle
          id="scroll-dialog-title"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography sx={formTitle}>{"Medications"}</Typography>
          <Typography
            sx={{ cursor: "pointer" }}
            onClick={() => {
              handleDialog();
              cancelMedication();
            }}
          >
            <Close />
          </Typography>
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            {medications.length === 0 ? (
              <>
                <Grid>
                  <Typography variant="h3">
                    {"No medication present!"}
                  </Typography>
                </Grid>
              </>
            ) : (
              medications.map((medication: any, index: any) => (
                <React.Fragment key={index}>
                  <Grid item xs={12}>
                    <CustomFormLabel label="Medicine Name" isRequired={true} />
                    <Autocomplete
                      {...defaultProps}
                      id={`tags-standard-${index}`}
                      value={medication.drugCatalog}
                      onChange={(_event, newValue) => {
                        updateMedication(index, "drugCatalog", newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          placeholder="Select Or Search Medicine"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} mt={2}>
                    <CustomFormLabel label="Sig" isRequired={false} />
                    <InputBase
                      sx={{
                        borderRadius: "5px",
                        boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                        height: "38px",
                        textAlign: "center",
                        padding: "21px 0px 21px 5px",
                        fontSize: "16px",
                        alignItems: "center",
                      }}
                      fullWidth
                      name={`initialMedicationValues[${index}].sig`}
                      value={medication.sig}
                      onChange={(e) =>
                        updateMedication(index, "sig", e.target.value)
                      }
                      placeholder="Enter Sig"
                      type="text"
                    />
                  </Grid>
                  <Grid xs={12} mt={2}>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <CustomFormLabel
                          label={"Dosage When"}
                          isRequired={false}
                        />
                        <SelectInput
                          placeholder={SELECT_AN_OPTION}
                          isEditForm={medication.dosageWhen}
                          value={medication.dosageWhen}
                          selectedOption={medication.dosageWhen}
                          options={DosageWhenList}
                          name={`initialMedicationValues[${index}].dosageWhen`}
                          onChange={(e: any) =>
                            updateMedication(
                              index,
                              "dosageWhen",
                              e.target.value
                            )
                          }
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <CustomFormLabel
                          label={"Dosage Unit"}
                          isRequired={false}
                        />
                        <SelectInput
                          placeholder={SELECT_AN_OPTION}
                          isEditForm={medication.dosageUnit}
                          value={medication.dosageUnit}
                          selectedOption={medication.dosageUnit}
                          options={DosageUnitList}
                          name={`initialMedicationValues[${index}].dosageUnit`}
                          onChange={(e: any) =>
                            updateMedication(
                              index,
                              "dosageUnit",
                              e.target.value
                            )
                          }
                        />
                      </Grid>

                      <Grid item xs={4}>
                        <CustomFormLabel
                          label={"Dosage Time"}
                          isRequired={false}
                        />
                        <SelectInput
                          placeholder={SELECT_AN_OPTION}
                          isEditForm={medication.dosageTime}
                          value={medication.dosageTime}
                          selectedOption={medication.dosageTime}
                          options={DosageTimeList}
                          name={`initialMedicationValues[${index}].dosageTime`}
                          onChange={(e: any) =>
                            updateMedication(
                              index,
                              "dosageTime",
                              e.target.value
                            )
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid xs={12} mt={2}>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <CustomFormLabel label="Duration" />
                        <InputBase
                          sx={{
                            borderRadius: "5px",
                            boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                            height: "38px",
                            textAlign: "center",
                            padding: "21px 0px 21px 5px",
                            fontSize: "16px",
                            alignItems: "center",
                          }}
                          fullWidth
                          id="document-name-label"
                          name={`initialMedicationValues[${index}].duration`}
                          role="textbox"
                          value={medication.duration}
                          onChange={(e) =>
                            updateMedication(index, "duration", e.target.value)
                          }
                          placeholder="Enter"
                          type="text"
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <CustomFormLabel label="Start Date" isRequired={false} />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <CustomDatePicker
                            height={"41px"}
                            value={dayjs(medication.startDate)}
                            changeDate={(event: any) => {
                              const date = moment(event.$d).format(
                                "yyyy-MM-DD"
                              );
                              updateMedication(index, "startDate", date);
                            }}
                          />
                        </LocalizationProvider>
                      </Grid>
                      <Grid item xs={4}>
                        <CustomFormLabel label="End Date" />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <CustomDatePicker
                            height={"41px"}
                            value={dayjs(medication.endDate)}
                            changeDate={(event: any) => {
                              const date = moment(event.$d).format(
                                "yyyy-MM-DD"
                              );
                              updateMedication(index, "endDate", date);
                            }}
                          />
                        </LocalizationProvider>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} mt={2}>
                    <CustomFormLabel label="Note" />
                    <InputBase
                      fullWidth
                      multiline={true}
                      name={`initialMedicationValues[${index}].note`}
                      value={medication.note}
                      onChange={(e) =>
                        updateMedication(index, "note", e.target.value)
                      }
                      rows="3"
                      placeholder="Type here"
                      classes={{
                        root: classes.providerTextAreaField,
                        input: classes.textFieldInput,
                        focused: classes.textFieldActive,
                        error: classes.inputBoxError,
                      }}
                    />
                  </Grid>

                  <Grid container justifyContent={"end"} py={2}>
                    <Button
                      variant="text"
                      color="error"
                      sx={{ textTransform: "capitalize", gap: "3px" }}
                      onClick={() => deleteMedication(index)}
                    >
                      <DeleteIcon sx={{ fontSize: "30px" }} />
                    </Button>
                  </Grid>
                </React.Fragment>
              ))
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            paddingRight: "20px !important",
            gap: "10px",
            ...formBottom,
          }}
        >
          <ButtonBase
            onClick={() => {
              addMedication();
            }}
            sx={{ ...cancelButtonStylo, display: "flex", gap: "10px" }}
          >
            <AddCircleOutlineIcon />
            {ADD_MEDICATION}
          </ButtonBase>
          <ButtonBase
            onClick={() => {
              formik.submitForm();
            }}
            sx={SaveButtonStylo}
          >
            {SAVE}
          </ButtonBase>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default MedicationsCareForm;
