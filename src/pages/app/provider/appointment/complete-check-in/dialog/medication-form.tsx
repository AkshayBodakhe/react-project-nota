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
  FormHelperText,
  Grid,
  InputBase,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Close } from "@mui/icons-material";
import { boolean } from "yup";
import CustomFormLabel from "../../../../../../components/common/custom-form-label";
import {
  commonWidget,
  formButtonStyle,
  formTitle,
} from "../../../../../../styles/common";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import {
  useDrugCatalogControllerServiceGetAllDrugs,
  useMedicalCodeControllerServiceGetAllMedicalCodes,
} from "../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { BillingCodes } from "../../../../../../sdk/thinkemr-core-0.0.1/requests";
import { getLoggedInUser } from "../../../../../../components/common/enums-and-interfaces/common-functions";
import { multiSelectDropDown } from "../../calendar/appointments";
import SelectInput from "../../../../../../components/common/select-input";
import { adminConstants } from "../../../../../../constants/admin";
import {
  DosageTimeList,
  DosageUnitList,
  DosageWhenList,
} from "../../../../../../components/common/form-enum";
import CustomDatePicker from "../../../../../../components/common/custom-date-picker";
import { formBottom } from "../../../../../../styles/common";
import { useSelector } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
interface planProps {
  open: boolean;
  onClose: any;
  formikData: any;
  medications?: any;
  setMedications?: any;
}

export const SaveButtonStylo = {
  fontFamily: "Roboto, sans-serif !important",
  // width: "9.625rem",
  padding: "5px 25px",
  backgroundColor: "#2C57B3",
  height: "35px",
  fontSize: "14px",
  color: "#ffffff",
  borderRadius: "4px",
  "&:hover": {
    backgroundColor: "#2C57B3",
  },
};

export const cancelButtonStylo = {
  fontFamily: "Roboto, sans-serif !important",
  // width: "9.625rem",
  padding: "5px 10px",
  color: "#36588C",
  borderColor: "#36588C",
  height: "35px",
  fontSize: "14px",
  border: "1px solid #36588C",
  borderRadius: "4px",
};

function MedicationsForm(props: planProps) {
  const { open, onClose, setMedications, medications } = props;
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
      <Dialog open={open} onClose={onClose} maxWidth={"xl"}>
        <DialogTitle
          id="scroll-dialog-title"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography sx={formTitle}>{"Medications"}</Typography>
          <Typography
            sx={{ cursor: "pointer" }}
            onClick={() => {
              onClose();
            }}
          >
            <Close />
          </Typography>
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            {medications && medications.length === 0 ? (
              <>
                <Grid>
                  <Typography variant="h3">
                    {"No medication present!"}
                  </Typography>
                </Grid>
              </>
            ) : (
              medications &&
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
                      name={`encounterPlan.patientMedications[${index}].sig`}
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
                          name={`encounterPlan.patientMedications[${index}].dosageWhen`}
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
                          name={`encounterPlan.patientMedications[${index}].dosageUnit`}
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
                          name={`encounterPlan.patientMedications[${index}].dosageTime`}
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
                          name={`encounterPlan.patientMedications[${index}].duration`}
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
                      name={`encounterPlan.patientMedications[${index}].note`}
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
                    {medications.length > 1 && (
                      <Button
                        variant="text"
                        color="error"
                        sx={{ textTransform: "capitalize", gap: "3px" }}
                        onClick={() => deleteMedication(index)}
                      >
                        <DeleteIcon sx={{ fontSize: "30px" }} />
                      </Button>
                    )}
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
              onClose();
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

export default MedicationsForm;
