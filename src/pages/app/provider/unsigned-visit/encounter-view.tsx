import { Close } from "@mui/icons-material";
import {
  Box,
  ButtonBase,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import notaLogo from "../../../../assets/logo/Navala_Logo.svg";
import PrintIcon from "@mui/icons-material/Print";
import { useReactToPrint } from "react-to-print";
import moment from "moment";
import {
  commonContainer,
  containerList,
  key,
  subTitle,
  subTitles,
  val,
} from "../../../../styles/common";
import { useEncounterControllerServiceGetEncounterDetails } from "../../../../sdk/thinkemr-core-0.0.1/queries";
import { toCamelCase } from "../../../../components/core/add-edit-staff-user/add-edit-staff-user";
interface encounterViewProps {
  open: boolean;
  onClose: any;
  appointmentDetails: any;
  formikData?: any;
}

function EncounterView(props: encounterViewProps) {
  const { open, onClose, appointmentDetails, formikData } = props;
  const [scroll] = React.useState<DialogProps["scroll"]>("paper");
  const [encounterInfo, setEncounterInfo] = useState<any>();
  const { data: encounterDetails } =
    useEncounterControllerServiceGetEncounterDetails({
      uuid: appointmentDetails?.encounterUuid,
    });

  useEffect(() => {
    if (encounterDetails) {
      setEncounterInfo(encounterDetails?.data);
    }
  }, [encounterDetails, open]);

  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const bloodPressure = encounterInfo?.objective?.patientVitals.filter(
    (item: any) => item.name === "BLOOD_PRESSURE"
  );
  const heartRate = encounterInfo?.objective?.patientVitals.filter(
    (item: any) => item.name === "HEART_RATE"
  );
  const oxygenSat = encounterInfo?.objective?.patientVitals.filter(
    (item: any) => item.name === "OXYGEN_SATURATION"
  );
  const temperature = encounterInfo?.objective?.patientVitals.filter(
    (item: any) => item.name === "TEMPERATURE"
  );
  const weightVal = encounterInfo?.objective?.patientVitals.filter(
    (item: any) => item.name === "WEIGHT"
  );
  const heightVal = encounterInfo?.objective?.patientVitals.filter(
    (item: any) => item.name === "HEIGHT"
  );
  const calcBmi = encounterInfo?.objective?.patientVitals.filter(
    (item: any) => item.name === "BMI"
  );

  return (
    <>
      <style>
        {`@media print {
            .no-print {
              display: none !important;
            }
          }
        `}
      </style>
      <Dialog
        open={open}
        onClose={onClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="lg"
        fullWidth
        ref={printRef}
      >
        <DialogTitle id="scroll-dialog-title">
          <Grid container justifyContent={"space-between"} className="no-print">
            <Typography variant="h3"></Typography>
            <Grid display={"flex"} gap={2}>
              <ButtonBase onClick={handlePrint}>
                <PrintIcon sx={{ color: "#2c57b3" }} />
                <Typography sx={{ color: "#2c57b3", fontSize: "1.2rem" }}>
                  Print
                </Typography>
              </ButtonBase>
              <Close onClick={onClose} sx={{ cursor: "pointer" }} />
            </Grid>
          </Grid>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            item
            xs={12}
          >
            <img src={notaLogo} width={"146px"} height={"60px"}></img>
          </Grid>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              mb: 5,
            }}
            item
            xs={12}
          >
            <Typography fontWeight={"600"}>
              {"Navala Global Test Account"}
            </Typography>
            <Typography fontWeight={"600"}>
              {"70 Washington Square South, New York, NY 10012, United States"}
            </Typography>
            <Typography fontWeight={"600"}>
              {"Office Number- 414-690-5082 / Fax Number - 1-408-999 8888"}
            </Typography>
          </Grid>
          <hr />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid my={2}>
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>{"ENCOUNTER DETAILS"}</Typography>
                </Grid>
                <Box sx={commonContainer}>
                  <Grid container gap={3}>
                    <Box display={"flex"} gap={1} alignItems={"center"}>
                      <Typography sx={key}>{"Encounter Date"}</Typography>
                      <Typography sx={key}>{"-"}</Typography>
                      <Typography sx={val}>
                        {moment(appointmentDetails?.appointmentDate).format(
                          "MM-DD-YYYY"
                        ) || "-"}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={val}>{} </Typography>
                    </Box>
                  </Grid>
                  <Grid sx={containerList}>
                    <Box display={"grid"} gridTemplateColumns={"40% 5% 43%"}>
                      <Typography sx={key}>{"Patient Name"}</Typography>
                      <Typography sx={key}>{"-"}</Typography>
                      <Typography sx={val}>
                        {appointmentDetails?.patientName || "-"}
                      </Typography>
                    </Box>
                    <Box display={"grid"} gridTemplateColumns={"40% 5% 50%"}>
                      <Typography sx={key}>
                        {"Appointment Date & Time"}
                      </Typography>
                      <Typography sx={key}>{"-"}</Typography>
                      <Typography sx={val}>
                        {appointmentDetails?.appointmentDate === null
                          ? "-"
                          : moment(appointmentDetails?.appointmentDate).format(
                              "MM-DD-YYYY"
                            ) +
                            " " +
                            (appointmentDetails?.startTime === null
                              ? ""
                              : appointmentDetails?.startTime)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid sx={containerList}>
                    <Box display={"grid"} gridTemplateColumns={"40% 5% 43%"}>
                      <Typography sx={key}>{"DOB"}</Typography>
                      <Typography sx={key}>{"-"}</Typography>
                      <Typography sx={val}>
                        {moment(appointmentDetails?.dob).format("MM-DD-YYYY") ||
                          "-"}
                      </Typography>
                    </Box>
                    <Box display={"grid"} gridTemplateColumns={"40% 5% 50%"}>
                      <Typography sx={key}>{"Service Department"}</Typography>
                      <Typography sx={key}>{"-"}</Typography>
                      <Typography sx={val}>
                        {appointmentDetails?.locationName || "-"}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid sx={containerList}>
                    <Box display={"grid"} gridTemplateColumns={"40% 5% 50%"}>
                      <Typography sx={key}>{"Provider Name"}</Typography>
                      <Typography sx={key}>{"-"}</Typography>
                      <Typography sx={val}>
                        {appointmentDetails?.providerName || "-"}
                      </Typography>
                    </Box>

                    <Box display={"grid"} gridTemplateColumns={"40% 5% 50%"}>
                      <Typography sx={key}>{"Insurance Name"}</Typography>
                      <Typography sx={key}>{"-"}</Typography>
                      <Typography sx={val}>{"-"}</Typography>
                    </Box>
                  </Grid>
                </Box>
              </Box>
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>{"CHIEF COMPLAINT"}</Typography>
                </Grid>
                <Grid sx={commonContainer}>
                  <Typography sx={val}>
                    {encounterInfo?.chiefComplaint
                      ? encounterInfo?.chiefComplaint
                      : formikData?.values?.chiefComplaint || "-"}
                  </Typography>
                </Grid>
              </Box>
              {/* <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>{"PROBLEM"}</Typography>
                </Grid>
                <Grid sx={commonContainer}>
                  <Box display={"grid"} gridTemplateColumns={"9% 2% 1fr"}>
                    <Typography sx={key}>{"Depression"}</Typography>
                    <Typography sx={key}>{"-"}</Typography>
                    <Typography sx={val}>{"Onset (21 Jan 2023)"}</Typography>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"9% 2% 1fr"}>
                    <Typography sx={key}>{"Symptoms"}</Typography>
                    <Typography sx={key}>{"-"}</Typography>
                    <Box display={"flex"} flexDirection={"column"} rowGap={1}>
                      <Typography sx={val}>
                        {"A. Persistent sadness or emptiness"}
                      </Typography>
                      <Typography sx={val}>{"A. Loss of interest"}</Typography>
                    </Box>
                  </Box>
                </Grid>
              </Box> */}
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>{"ALLERGIES"}</Typography>
                </Grid>
                <Grid sx={commonContainer}>
                  <Box display={"flex"} gap={1}>
                    <Typography sx={key}>
                      {encounterInfo?.subjective?.historyOfPresentIllness
                        ?.patientAllergy?.allergy || "-"}
                    </Typography>
                    <Typography sx={key}>{":"}</Typography>
                    <Typography sx={key}>
                      {toCamelCase(
                        encounterInfo?.subjective?.historyOfPresentIllness
                          ?.patientAllergy?.reaction
                      ) || "-"}
                    </Typography>
                    <Typography sx={key}>{":"}</Typography>
                    <Typography sx={key}>
                      {toCamelCase(
                        encounterInfo?.subjective?.historyOfPresentIllness
                          ?.patientAllergy?.severity
                      ) || "-"}
                    </Typography>
                  </Box>
                  <Box display={"flex"} gap={1}>
                    <Typography sx={val}>{"Onset Date"}</Typography>
                    <Typography sx={val}>{":"}</Typography>
                    <Typography sx={val}>
                      {encounterInfo?.subjective?.historyOfPresentIllness
                        ?.patientAllergy?.onSetDate || "-"}
                    </Typography>
                  </Box>
                </Grid>
              </Box>
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>{"HISTORY"}</Typography>
                </Grid>
              </Box>
              <Grid sx={commonContainer}>
                <Typography sx={subTitle}>{"Past Medical History"}</Typography>
                <Box display={"grid"} gridTemplateColumns={"10% 2% 1fr"}>
                  <Typography sx={key}>
                    {encounterInfo?.subjective?.historyOfPresentIllness
                      ?.patientPastMedicalHistory?.name || "-"}
                  </Typography>
                  <Typography sx={key}>{"-"}</Typography>
                  <Typography sx={val}>
                    {encounterInfo?.subjective?.historyOfPresentIllness
                      ?.patientPastMedicalHistory?.created || "-"}
                  </Typography>
                </Box>
                <Typography sx={subTitle} pt={1}>
                  {"Past Surgical History"}
                </Typography>
                <Box display={"grid"} gridTemplateColumns={"10% 2% 1fr"}>
                  <Typography sx={key}>
                    {encounterInfo?.subjective?.historyOfPresentIllness
                      ?.patientPastSurgicalHistory?.name || "-"}
                  </Typography>
                  <Typography sx={key}>{"-"}</Typography>
                  <Typography sx={val}>
                    {encounterInfo?.subjective?.historyOfPresentIllness
                      ?.patientPastSurgicalHistory?.surgeryDate || "-"}
                  </Typography>
                </Box>
                <Typography sx={subTitle} pt={1}>
                  {"Family History"}
                </Typography>
                <Box display={"grid"} gridTemplateColumns={"10% 2% 1fr"}>
                  <Typography sx={key}>
                    {encounterInfo?.subjective?.historyOfPresentIllness
                      ?.patientPastSurgicalHistory?.relative || "-"}
                  </Typography>
                  <Typography sx={key}>{"-"}</Typography>
                  <Typography sx={val}>
                    {
                      encounterInfo?.subjective?.historyOfPresentIllness
                        ?.patientPastSurgicalHistory?.name
                    }
                  </Typography>
                </Box>
                {/* <Box display={"grid"} gridTemplateColumns={"21% 2% 1fr"}>
                  <Typography sx={key}>{"Father"}</Typography>
                  <Typography sx={key}>{"-"}</Typography>
                  <Typography sx={val}>{"High Blood Pressure"}</Typography>
                </Box> */}
                <Typography sx={subTitle} pt={1}>
                  {"Social History"}
                </Typography>
                <Box display={"grid"} gridTemplateColumns={"10% 2% 1fr"}>
                  <Typography sx={key}>
                    {encounterInfo?.subjective?.historyOfPresentIllness
                      ?.patientSocialHistory?.name || "-"}
                  </Typography>
                  <Typography sx={key}>{"-"}</Typography>
                  <Typography sx={val}>
                    {encounterInfo?.subjective?.historyOfPresentIllness
                      ?.patientSocialHistory?.description || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"17% 2% 1fr"} pt={1}>
                  <Typography sx={subTitle}>
                    {"Exposure To Violence"}
                  </Typography>
                  <Typography sx={key}>{"-"}</Typography>
                </Box>
                <Box display={"flex"} flexDirection={"column"} rowGap={1}>
                  <Typography sx={val}>
                    {
                      "A. Within the last year,have you been humiliated abused in other ways by your partner or ex-partner?-Yes"
                    }
                  </Typography>
                  <Typography sx={val}>
                    {
                      "A. Within the last year,have you been afraid of your partner or ex-partner?-Yes"
                    }
                  </Typography>
                  <Typography sx={val}>
                    {
                      "A. Within the last year,have you been raped or  forced to have any kind of sexual activity by your partner of ex-partner?-Yes"
                    }
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"16% 2% 1fr"} pt={1}>
                  <Typography sx={subTitle}>{"Social Connection"}</Typography>
                  <Typography sx={key}>{"-"}</Typography>
                </Box>
                <Box display={"flex"} flexDirection={"column"} rowGap={1}>
                  <Typography sx={val}>
                    {
                      "A. Are you now married, widowed, divorced, separated, never married, or loving with a partner ?-Married"
                    }
                  </Typography>
                  <Typography sx={val}>
                    {
                      "A. Within the last year,have you been afraid of your partner or ex-partner?-Yes"
                    }
                  </Typography>
                  <Typography sx={val}>
                    {
                      "A. Within the last year,have you been raped or  forced to have any kind of sexual activity by your partner of ex-partner?-Yes"
                    }
                  </Typography>
                </Box>
                <Typography sx={subTitle}>{"Habits"}</Typography>
                <Box display={"grid"} gridTemplateColumns={"10% 2% 1fr"}>
                  <Typography sx={key}>{"Alcohol Use"}</Typography>
                  <Typography sx={key}>{"-"}</Typography>
                </Box>
                <Box display={"flex"} flexDirection={"column"} rowGap={1}>
                  <Typography sx={val}>
                    {
                      "A. How often do you have a drink containing alcohol?-Monthly or Less"
                    }
                  </Typography>
                  <Typography sx={val}>
                    {
                      "B. How may standard drinks containing alcohol do you have on typical day?-1 or 2"
                    }
                  </Typography>
                  <Typography sx={val}>
                    {
                      "C. How often do you have 6 or more drinks on 1 occasion?-Monday"
                    }
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"8% 2% 1fr"}>
                  <Typography sx={key}>{"Smoking "}</Typography>
                  <Typography sx={key}>{"-"}</Typography>
                  <Typography sx={val}>{"Current some day smoker"}</Typography>
                </Box>
                <Typography sx={subTitle}>{"Medications"}</Typography>
                <Box display={"grid"} gridTemplateColumns={"15% 2% 1fr"}>
                  {encounterInfo?.encounterPlan?.patientMedications?.map(
                    (item: any) => {
                      return (
                        <>
                          <Typography sx={key}>
                            {item?.drugCatalog?.medicine || "-"}
                          </Typography>
                          <Typography sx={key}>{"-"}</Typography>
                          <Typography sx={val}>
                            {item?.startDate
                              ? moment(item?.startDate).format("MM-DD-YYYY")
                              : "-"}
                          </Typography>
                        </>
                      );
                    }
                  )}
                </Box>
              </Grid>
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>{"REVIEW OF SYSTEM"}</Typography>
                </Grid>
              </Box>
              <Grid sx={commonContainer}>
                {/* <Box display={"grid"} gridTemplateColumns={"13% 2% 1fr"}>
                  <Typography sx={key}>{"Functional Status"}</Typography>
                  <Typography sx={key}>{"-"}</Typography>
                  <Typography sx={val}>
                    {"Activities of Daily Living(ADLs) : Breathing : Yes"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"13% 2% 1fr"}>
                  <Typography sx={key}>{"Congitive Status"}</Typography>
                  <Typography sx={key}>{"-"}</Typography>
                  <Typography sx={val}>
                    {"Mini-Mental State Examination(MMSE)"}
                  </Typography>
                </Box> */}
                <Box display={"grid"} gridTemplateColumns={"7% 1fr"}>
                  <Typography sx={key}>{"GENERAL"}</Typography>
                  <Typography sx={val}>
                    {encounterInfo?.subjective?.reviewOfSystem?.general || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"7% 1fr"}>
                  <Typography sx={key}>{"EYES"}</Typography>
                  <Typography sx={val}>
                    {encounterInfo?.subjective?.reviewOfSystem?.eyes || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"7% 1fr"}>
                  <Typography sx={key}>{"HENT"}</Typography>
                  <Typography sx={val}>
                    {encounterInfo?.subjective?.reviewOfSystem?.hent || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"7% 1fr"}>
                  <Typography sx={key}>{"RESP"}</Typography>
                  <Typography sx={val}>
                    {encounterInfo?.subjective?.reviewOfSystem
                      ?.respiratoryTherapy || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"7% 1fr"}>
                  <Typography sx={key}>{"CVS"}</Typography>
                  <Typography sx={val}>
                    {encounterInfo?.subjective?.reviewOfSystem
                      ?.chorionicVillusSampling || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"7% 1fr"}>
                  <Typography sx={key}>{"GI"}</Typography>
                  <Typography sx={val}>
                    {encounterInfo?.subjective?.reviewOfSystem
                      ?.gastrointestinal || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"7% 1fr"}>
                  <Typography sx={key}>{"GU"}</Typography>
                  <Typography sx={val}>
                    {encounterInfo?.subjective?.reviewOfSystem?.genitourinary ||
                      "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"7% 1fr"}>
                  <Typography sx={key}>{"MSS"}</Typography>
                  <Typography sx={val}>
                    {encounterInfo?.subjective?.reviewOfSystem
                      ?.marshallSmithSyndrome || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"7% 1fr"}>
                  <Typography sx={key}>{"NS"}</Typography>
                  <Typography sx={val}>
                    {encounterInfo?.subjective?.reviewOfSystem?.normalSaline ||
                      "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"7% 1fr"}>
                  <Typography sx={key}>{"SKIN"}</Typography>
                  <Typography sx={val}>
                    {encounterInfo?.subjective?.reviewOfSystem?.skin || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"7% 1fr"}>
                  <Typography sx={key}>{"DIET"}</Typography>
                  <Typography sx={val}>
                    {encounterInfo?.subjective?.reviewOfSystem?.diet || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"7% 1fr"}>
                  <Typography sx={key}>{"ENDOC"}</Typography>
                  <Typography sx={val}>
                    {encounterInfo?.subjective?.reviewOfSystem?.endocrinology ||
                      "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"7% 1fr"}>
                  <Typography sx={key}>{"BREAST"}</Typography>
                  <Typography sx={val}>
                    {encounterInfo?.subjective?.reviewOfSystem?.breast || "-"}
                  </Typography>
                </Box>
              </Grid>
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>{"VITALS"}</Typography>
                </Grid>
              </Box>
              <Grid sx={commonContainer}>
                <Box
                  display={"grid"}
                  gridTemplateColumns={"32% 32% 32%"}
                  gap={1}
                >
                  <Box display={"grid"} gridTemplateColumns={"39% 5% 40%"}>
                    <Typography sx={key}>{"Blood Pressure"}</Typography>
                    <Typography>{"-"}</Typography>
                    <Typography sx={val}>
                      {bloodPressure &&
                        bloodPressure[0]?.value1 +
                          "/" +
                          bloodPressure[0]?.value2}
                    </Typography>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"39% 5% 40%"}>
                    <Typography sx={key}>{"Heart Rate"}</Typography>
                    <Typography>{"-"}</Typography>
                    <Typography sx={val}>
                      {heartRate && heartRate[0]?.value1}
                    </Typography>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"39% 5% 40%"}>
                    <Typography sx={key}>{"Oxygen Saturation"}</Typography>
                    <Typography>{"-"}</Typography>
                    <Typography sx={val}>
                      {oxygenSat && oxygenSat[0]?.value1}
                    </Typography>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"39% 5% 40%"}>
                    <Typography sx={key}>{"Temperature"}</Typography>
                    <Typography>{"-"}</Typography>
                    <Typography sx={val}>
                      {temperature && temperature[0]?.value1}
                    </Typography>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"39% 5% 40%"}>
                    <Typography sx={key}>{"Weight"}</Typography>
                    <Typography>{"-"}</Typography>
                    <Typography sx={val}>
                      {weightVal && weightVal[0]?.value1}
                    </Typography>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"39% 5% 40%"}>
                    <Typography sx={key}>{"Height"}</Typography>
                    <Typography>{"-"}</Typography>
                    <Typography sx={val}>
                      {heightVal &&
                        heightVal[0]?.value1 + " " + heightVal[0]?.unit}
                    </Typography>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"39% 5% 40%"}>
                    <Typography sx={key}>{"BMI"}</Typography>
                    <Typography>{"-"}</Typography>
                    <Typography sx={val}>
                      {calcBmi && calcBmi[0]?.value1}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>
                    {"PHYSICAL EXAMINATION"}
                  </Typography>
                </Grid>
              </Box>
              <Grid sx={commonContainer}>
                <Box display={"grid"} gridTemplateColumns={"10% 1fr"}>
                  <Typography sx={key}>{"GENERAL"}</Typography>
                  <Typography sx={val}>
                    {encounterInfo?.objective?.physicalExam?.general || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"10% 1fr"}>
                  <Typography sx={key}>{"EYES"}</Typography>
                  <Typography sx={val}>
                    {encounterInfo?.objective?.physicalExam?.eyes}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"10% 1fr"}>
                  <Typography sx={key}>{"HENT"}</Typography>
                  <Typography sx={val}>
                    {encounterInfo?.objective?.physicalExam?.hent}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"10% 1fr"}>
                  <Typography sx={key}>{"RESP"}</Typography>
                  <Typography sx={val}>
                    {encounterInfo?.objective?.physicalExam?.respiratoryTherapy}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"10% 1fr"}>
                  <Typography sx={key}>{"CVS"}</Typography>
                  <Typography sx={val}>
                    {encounterInfo?.objective?.physicalExam
                      ?.chorionicVillusSampling || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"10% 1fr"}>
                  <Typography sx={key}>{"ABDOM"}</Typography>
                  <Typography sx={val}>
                    {encounterInfo?.objective?.physicalExam?.abdom || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"10% 1fr"}>
                  <Typography sx={key}>{"GU"}</Typography>
                  <Typography sx={val}>
                    {encounterInfo?.objective?.physicalExam?.genitourinary ||
                      "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"10% 1fr"}>
                  <Typography sx={key}>{"MSS"}</Typography>
                  <Typography sx={val}>
                    {encounterInfo?.objective?.physicalExam
                      ?.marshallSmithSyndrome || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"10% 1fr"}>
                  <Typography sx={key}>{"NS"}</Typography>
                  <Typography sx={val}>
                    {encounterInfo?.objective?.physicalExam?.normalSaline ||
                      "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"10% 1fr"}>
                  <Typography sx={key}>{"SKIN"}</Typography>
                  <Typography sx={val}>
                    {encounterInfo?.objective?.physicalExam?.skin || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"10% 1fr"}>
                  <Typography sx={key}>{"PSYCH"}</Typography>
                  <Typography sx={val}>
                    {encounterInfo?.objective?.physicalExam?.psych || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"10% 1fr"}>
                  <Typography sx={key}>{"RECTAL"}</Typography>
                  <Typography sx={val}>
                    {encounterInfo?.objective?.physicalExam?.rectal || "-"}
                  </Typography>
                </Box>
              </Grid>
              {/* <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>
                    {"PSYCHOLOGICAL STATUS"}
                  </Typography>
                </Grid>
              </Box>
              <Grid sx={commonContainer}>
                <Box display={"grid"} gridTemplateColumns={"8% 2% 1fr"} pt={1}>
                  <Typography sx={key}>{"Anxiety"}</Typography>
                  <Typography sx={key}>{"-"}</Typography>
                </Box>
                <Box display={"flex"} flexDirection={"column"}>
                  <Typography sx={val}>
                    {
                      "A. Feeling nervous, anxious or on edge in last 2 weeks? - Several Days"
                    }
                  </Typography>
                  <Typography sx={val}>
                    {
                      "B. Over the past weeks have you not been able to stop control worrying? - More than half the days"
                    }
                  </Typography>
                </Box>
              </Grid> */}
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>{"ASSESSMENT"}</Typography>
                </Grid>
              </Box>
              <Grid sx={commonContainer}>
                <Box>
                  <Typography sx={key}>
                    {encounterInfo?.assessment?.assessmentNote || "-"}
                  </Typography>
                </Box>
                <Box
                  display={"grid"}
                  gridTemplateColumns={"5% 2% 1fr"}
                  alignItems={"center"}
                >
                  {encounterInfo?.assessment?.billingCodes?.map((item: any) => {
                    return (
                      <>
                        <Typography sx={key}>{item?.code}</Typography>
                        <Typography>{"-"}</Typography>
                        <Typography sx={val}>{item?.description}</Typography>
                      </>
                    );
                  })}
                </Box>
              </Grid>
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>{"PLAN"}</Typography>
                </Grid>
              </Box>

              <Grid sx={commonContainer}>
                <Box display={"grid"} gridTemplateColumns={"6% 2% 1fr"} pt={1}>
                  <Typography sx={subTitle}>{"Test"}</Typography>
                  <Typography sx={key}>{"-"}</Typography>
                  <Typography sx={key}>
                    {encounterInfo?.encounterPlan?.labTest || "-"}
                  </Typography>
                </Box>
                {/* <Box display={"flex"} flexDirection={"column"} rowGap={1}>
                  
                </Box> */}
                <Box display={"grid"} gridTemplateColumns={"8% 2% 1fr"} pt={1}>
                  <Typography sx={subTitle}>{"CPT Code"}</Typography>
                  <Typography sx={key}>{"-"}</Typography>
                </Box>
                <Box display={"flex"} flexDirection={"column"}>
                  <Box
                    display={"grid"}
                    gridTemplateColumns={"5% 2% 1fr"}
                    alignItems={"center"}
                  >
                    {encounterInfo?.encounterPlan?.billingCodes?.map(
                      (item: any) => {
                        return (
                          <>
                            <Typography sx={key}>{item?.code}</Typography>
                            <Typography>{"-"}</Typography>
                            <Typography sx={val}>
                              {item?.description}
                            </Typography>
                          </>
                        );
                      }
                    )}
                  </Box>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"8% 2% 1fr"} pt={1}>
                  <Typography sx={subTitle}>{"Imaging"}</Typography>
                  <Typography sx={key}>{"-"}</Typography>
                  <Typography sx={key}>
                    {encounterInfo?.encounterPlan?.imaging || "-"}
                  </Typography>
                </Box>
                {/* <Box display={"flex"} flexDirection={"column"} rowGap={1}>
                  
                </Box> */}
              </Grid>
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>{"FOLLOW UP"}</Typography>
                </Grid>
              </Box>
              <Grid sx={commonContainer}>
                <Box
                //display={"grid"}
                //gridTemplateColumns={"12% 2% 1fr"}
                //alignItems={"start"}
                >
                  {/* <Typography sx={key}>{"Follow-Up Note"}</Typography>
                  <Typography>{"-"}</Typography> */}
                  <Typography sx={val}>
                    {encounterInfo?.encounterPlan?.additionalNote || "-"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default EncounterView;
