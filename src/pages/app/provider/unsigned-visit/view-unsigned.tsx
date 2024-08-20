import {
  Box,
  ButtonBase,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useRef } from "react";
import {
  commonContainer,
  containerList,
  key,
  subTitle,
  subTitles,
  val,
} from "../../../../styles/common";
import { blueButtonStyle } from "../appointment/complete-check-in/complete-check-in-const";
import { transformText } from "../../../../components/common/helper";
interface viewUnsignedProps {
  setEnablePreview: any;
  formikData?: any;
  handleCheckInAfterPreview?: any;
  isSignedView?: boolean;
  appInfo?: any;
  unsignedEncounter?: any;
  handleCancelEncounter?: any;
  handleViewEncounterDetails?: any;
  openPrintEncounterView?: any;
  handlePrintViewEncounterDetails?: any;
  setSharePdf?: any;
  medications?: any;
  tableClasses?: any;
  tabColumns?: any;
}

function ViewUnsignedVisite(props: viewUnsignedProps) {
  const {
    setEnablePreview,
    formikData,
    handleCheckInAfterPreview,
    isSignedView,
    appInfo,
    unsignedEncounter,
    handleCancelEncounter,
    handleViewEncounterDetails,
    openPrintEncounterView,
    handlePrintViewEncounterDetails,
    setSharePdf,
    medications,
    tableClasses,
    tabColumns,
  } = props;
  const navigate = useNavigate();

  const boxRef = useRef<HTMLDivElement>(null);

  const bloodPressure =
    formikData &&
    formikData.values.objective?.patientVitals?.filter(
      (item: any) => item.name === "BLOOD_PRESSURE"
    );

  const heartRate =
    formikData &&
    formikData.values.objective?.patientVitals?.filter(
      (item: any) => item.name === "HEART_RATE"
    );

  const oxygenSat =
    formikData &&
    formikData.values.objective?.patientVitals?.filter(
      (item: any) => item.name === "OXYGEN_SATURATION"
    );

  const temperature =
    formikData &&
    formikData.values.objective?.patientVitals?.filter(
      (item: any) => item.name === "TEMPERATURE"
    );

  const weightVal =
    formikData &&
    formikData.values.objective?.patientVitals?.filter(
      (item: any) => item.name === "WEIGHT"
    );

  const heightVal =
    formikData &&
    formikData.values.objective?.patientVitals?.filter(
      (item: any) => item.name === "HEIGHT"
    );

  const bmiVal =
    formikData &&
    formikData.values.objective?.patientVitals?.filter(
      (item: any) => item.name === "BMI"
    );

  const handleBackToEncounter = () => {
    setEnablePreview(false);
  };
  return (
    <>
      <Grid>
        <Box ref={boxRef}>
          <Grid py={1.5}>
            <Typography sx={subTitles}>{"ENCOUNTER SUMMARY"}</Typography>
            <Typography sx={{ fontWeight: "900" }}>
              {"APPOINTMENT DETAILS"}
            </Typography>{" "}
          </Grid>
          <Box sx={commonContainer}>
            <Grid container gap={3}>
              <Box display={"flex"} gap={1} alignItems={"center"}>
                <Typography sx={key}>{"Encounter Date"}</Typography>
                <Typography sx={key}>{"-"}</Typography>
                <Typography sx={val}>
                  {appInfo
                    ? moment(appInfo?.appointmentDate).format("MM-DD-YYYY")
                    : moment(unsignedEncounter?.updatedDate).format(
                        "MM-DD-YYYY"
                      ) || "-"}
                </Typography>
              </Box>
              <Box>
                <Typography sx={val}></Typography>
              </Box>
            </Grid>
            <Grid sx={containerList}>
              <Box display={"grid"} gridTemplateColumns={"40% 5% 43%"}>
                <Typography sx={key}>{"Patient Name"}</Typography>
                <Typography sx={key}>{"-"}</Typography>
                <Typography sx={val}>
                  {appInfo
                    ? appInfo?.patientName
                    : unsignedEncounter?.patientName || "-"}
                </Typography>
              </Box>
              <Box display={"grid"} gridTemplateColumns={"40% 5% 50%"}>
                <Typography sx={key}>{"Appointment Date & Time"}</Typography>
                <Typography sx={key}>{"-"}</Typography>
                <Typography sx={val}>
                  {appInfo
                    ? moment(appInfo?.appointmentDate).format("MM-DD-YYYY") +
                      " " +
                      (appInfo?.startTime === null ? "" : appInfo?.startTime)
                    : moment(unsignedEncounter?.updatedDate).format(
                        "MM-DD-YYYY"
                      ) +
                        " " +
                        (unsignedEncounter?.startTime === null
                          ? ""
                          : unsignedEncounter?.startTime) || "-"}
                </Typography>
              </Box>
            </Grid>
            <Grid sx={containerList}>
              <Box display={"grid"} gridTemplateColumns={"40% 5% 43%"}>
                <Typography sx={key}>{"DOB"}</Typography>
                <Typography sx={key}>{"-"}</Typography>
                <Typography sx={val}>
                  {appInfo
                    ? moment(appInfo?.dob).format("MM-DD-YYYY")
                    : moment(unsignedEncounter?.dob).format("MM-DD-YYYY") ||
                      "-"}
                </Typography>
              </Box>
              <Box display={"grid"} gridTemplateColumns={"40% 5% 50%"}>
                <Typography sx={key}>{"Service Department"}</Typography>
                <Typography sx={key}>{"-"}</Typography>
                <Typography sx={val}>
                  {appInfo
                    ? appInfo?.locationName
                    : unsignedEncounter?.location || "-"}
                </Typography>
              </Box>
            </Grid>

            <Grid sx={containerList}>
              <Box display={"grid"} gridTemplateColumns={"40% 5% 50%"}>
                <Typography sx={key}>{"Provider Name"}</Typography>
                <Typography sx={key}>{"-"}</Typography>
                <Typography sx={val}>
                  {appInfo
                    ? appInfo?.providerName
                    : unsignedEncounter?.providerName || "-"}
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
        <Grid sx={{ overflowY: "scroll", maxHeight: "50vh", mt: "10px" }}>
          <Box>
            <Grid py={1.5}>
              <Typography sx={subTitles}>{"CHIEF COMPLAINT (CC)"}</Typography>
            </Grid>
            <Grid sx={commonContainer}>
              <Typography sx={val}>
                {formikData.values.chiefComplaint || "-"}
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
            <Grid py={2}>
              <Typography sx={subTitles}>{"SUBJECTIVE"}</Typography>
            </Grid>
            <Grid pb={1}>
              <Typography variant="h3">
                {"History Of Present Illness (HPI)"}
              </Typography>
            </Grid>
            <Grid sx={commonContainer}>
              <Box display={"flex"} gap={2}>
                <Typography sx={key}>{"Today's visit"}</Typography>
                <Typography sx={key}>{":"}</Typography>
                <Typography sx={val}>
                  {formikData?.values?.subjective?.historyOfPresentIllness
                    ?.todayVisit || "-"}
                </Typography>
              </Box>
              <Box display={"flex"} gap={2}>
                <Typography sx={key}>{"Medical History"}</Typography>
                <Typography sx={key}>{":"}</Typography>
                <Typography sx={val}>
                  {formikData?.values?.subjective?.historyOfPresentIllness
                    ?.patientPastMedicalHistory?.name || "-"}
                </Typography>
              </Box>
              <Box display={"flex"} gap={2}>
                <Typography sx={key}>{"Surgical History"}</Typography>
                <Typography sx={key}>{":"}</Typography>
                <Typography sx={val}>
                  {formikData?.values?.subjective?.historyOfPresentIllness
                    ?.patientPastSurgicalHistory?.name || "-"}
                </Typography>
              </Box>
              <Box display={"flex"} gap={2}>
                <Typography sx={key}>
                  {"Hospitalization/ Major Diagnostic Procedure"}
                </Typography>
                <Typography sx={key}>{":"}</Typography>
                <Typography sx={val}>
                  {formikData?.values?.subjective?.historyOfPresentIllness
                    ?.hospitalization || "-"}
                </Typography>
              </Box>
              <Box display={"flex"} gap={2}>
                <Typography sx={key}>{"Family History"}</Typography>
                <Typography sx={key}>{":"}</Typography>
                <Typography sx={val}>
                  {formikData?.values?.subjective?.historyOfPresentIllness
                    ?.patientFamilyHistory?.name || "-"}
                </Typography>
              </Box>
              <Box display={"flex"} gap={2}>
                <Typography sx={key}>{"Social History"}</Typography>
                <Typography sx={key}>{":"}</Typography>
                <Typography sx={val}>
                  {formikData?.values?.subjective?.historyOfPresentIllness
                    ?.patientSocialHistory?.name || "-"}
                </Typography>
              </Box>
            </Grid>
          </Box>

          <Grid>
            {" "}
            <Grid py={2}>
              <Typography variant="h3">{"Allergy"}</Typography>
            </Grid>
            <Box sx={commonContainer}>
              <Box display={"flex"} gap={2}>
                <Typography sx={key}>{"Allergy Type"}</Typography>
                <Typography sx={key}>{":"}</Typography>
                <Typography sx={val}>
                  {transformText(
                    formikData?.values?.subjective?.historyOfPresentIllness
                      ?.patientAllergy?.allergyType
                  ) || "-"}
                </Typography>
              </Box>
              <Box display={"flex"} gap={2}>
                <Typography sx={key}>{"Allergy"}</Typography>
                <Typography sx={key}>{":"}</Typography>
                <Typography sx={val}>
                  {formikData?.values?.subjective?.historyOfPresentIllness
                    ?.patientAllergy?.allergy || "-"}
                </Typography>
              </Box>
              <Box display={"flex"} gap={2}>
                <Typography sx={key}>{"Reaction"}</Typography>
                <Typography sx={key}>{":"}</Typography>
                <Typography sx={val}>
                  {formikData?.values?.subjective?.historyOfPresentIllness
                    ?.patientAllergy?.reaction || "-"}
                </Typography>
              </Box>
              <Box display={"flex"} gap={2}>
                <Typography sx={key}>{"Severity"}</Typography>
                <Typography sx={key}>{":"}</Typography>
                <Typography sx={val}>
                  {formikData?.values?.subjective?.historyOfPresentIllness
                    ?.patientAllergy?.severity || "-"}
                </Typography>
              </Box>
              <Box display={"flex"} gap={2}>
                <Typography sx={key}>{"Note"}</Typography>
                <Typography sx={key}>{":"}</Typography>
                <Typography sx={val}>
                  {formikData?.values?.subjective?.historyOfPresentIllness
                    ?.patientAllergy?.note || "-"}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Box>
            <Grid py={1.5}>
              <Typography variant="h3">{"Review Of System (ROS)"}</Typography>
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
                {formikData?.values?.subjective?.reviewOfSystem?.general || "-"}
              </Typography>
            </Box>
            <Box display={"grid"} gridTemplateColumns={"7% 1fr"}>
              <Typography sx={key}>{"EYES"}</Typography>
              <Typography sx={val}>
                {formikData?.values?.subjective?.reviewOfSystem?.eyes || "-"}
              </Typography>
            </Box>
            <Box display={"grid"} gridTemplateColumns={"7% 1fr"}>
              <Typography sx={key}>{"HENT"}</Typography>
              <Typography sx={val}>
                {formikData?.values?.subjective?.reviewOfSystem?.hent || "-"}
              </Typography>
            </Box>
            <Box display={"grid"} gridTemplateColumns={"7% 1fr"}>
              <Typography sx={key}>{"RESP"}</Typography>
              <Typography sx={val}>
                {formikData?.values?.subjective?.reviewOfSystem
                  ?.respiratoryTherapy || "-"}
              </Typography>
            </Box>
            <Box display={"grid"} gridTemplateColumns={"7% 1fr"}>
              <Typography sx={key}>{"CVS"}</Typography>
              <Typography sx={val}>
                {formikData?.values?.subjective?.reviewOfSystem
                  ?.chorionicVillusSampling || "-"}
              </Typography>
            </Box>
            <Box display={"grid"} gridTemplateColumns={"7% 1fr"}>
              <Typography sx={key}>{"GI"}</Typography>
              <Typography sx={val}>
                {formikData?.values?.subjective?.reviewOfSystem
                  ?.genitourinary || "-"}
              </Typography>
            </Box>
            <Box display={"grid"} gridTemplateColumns={"7% 1fr"}>
              <Typography sx={key}>{"GU"}</Typography>
              <Typography sx={val}>
                {formikData?.values?.subjective?.reviewOfSystem
                  ?.gastrointestinal || "-"}
              </Typography>
            </Box>
            <Box display={"grid"} gridTemplateColumns={"7% 1fr"}>
              <Typography sx={key}>{"MSS"}</Typography>
              <Typography sx={val}>
                {formikData?.values?.subjective?.reviewOfSystem
                  ?.marshallSmithSyndrome || "-"}
              </Typography>
            </Box>
            <Box display={"grid"} gridTemplateColumns={"7% 1fr"}>
              <Typography sx={key}>{"NS"}</Typography>
              <Typography sx={val}>
                {formikData?.values?.subjective?.reviewOfSystem?.normalSaline ||
                  "-"}
              </Typography>
            </Box>
            <Box display={"grid"} gridTemplateColumns={"7% 1fr"}>
              <Typography sx={key}>{"SKIN"}</Typography>
              <Typography sx={val}>
                {formikData?.values?.subjective?.reviewOfSystem?.skin || "-"}
              </Typography>
            </Box>
            <Box display={"grid"} gridTemplateColumns={"7% 1fr"}>
              <Typography sx={key}>{"DIET"}</Typography>
              <Typography sx={val}>
                {formikData?.values?.subjective?.reviewOfSystem?.diet || "-"}
              </Typography>
            </Box>
            <Box display={"grid"} gridTemplateColumns={"7% 1fr"}>
              <Typography sx={key}>{"ENDOC"}</Typography>
              <Typography sx={val}>
                {formikData?.values?.subjective?.reviewOfSystem
                  ?.endocrinology || "-"}
              </Typography>
            </Box>
            <Box display={"grid"} gridTemplateColumns={"7% 1fr"}>
              <Typography sx={key}>{"PSYCH"}</Typography>
              <Typography sx={val}>
                {formikData?.values?.subjective?.reviewOfSystem?.psychology ||
                  "-"}
              </Typography>
            </Box>
          </Grid>
          <Box>
            <Grid py={2}>
              <Typography sx={subTitles}>{"OBJECTIVE"}</Typography>
            </Grid>
            <Grid py={1}>
              <Typography variant="h3">{"Vitals"}</Typography>
            </Grid>
          </Box>
          <Grid sx={commonContainer}>
            <Box display={"grid"} gridTemplateColumns={"32% 32% 32%"} gap={1}>
              <Box
                display={"grid"}
                gridTemplateColumns={"39% 5% 1fr"}
                alignItems={"center"}
              >
                <Typography sx={key}>{"Blood Pressure"}</Typography>
                <Typography>{"-"}</Typography>
                <Box display={"flex"} gap={"5px"}>
                  <Typography sx={val}>
                    {(bloodPressure && bloodPressure[0]?.value1) || "-"}
                  </Typography>
                  <Typography sx={val}>{"/"}</Typography>
                  <Typography sx={val}>
                    {(bloodPressure && bloodPressure[0]?.value1) || "-"}
                  </Typography>
                </Box>
              </Box>
              <Box display={"grid"} gridTemplateColumns={"39% 5% 40%"}>
                <Typography sx={key}>{"Heart Rate"}</Typography>
                <Typography>{"-"}</Typography>
                <Typography sx={val}>
                  {(heartRate && heartRate[0]?.value1) || "-"}
                </Typography>
              </Box>
              <Box display={"grid"} gridTemplateColumns={"39% 5% 40%"}>
                <Typography sx={key}>{"Oxygen Saturation"}</Typography>
                <Typography>{"-"}</Typography>
                <Typography sx={val}>
                  {(oxygenSat && oxygenSat[0]?.value1) || "-"}
                </Typography>
              </Box>
              <Box display={"grid"} gridTemplateColumns={"39% 5% 40%"}>
                <Typography sx={key}>{"Temperature"}</Typography>
                <Typography>{"-"}</Typography>
                <Typography sx={val}>
                  {(temperature && temperature[0]?.value1) || "-"}
                </Typography>
              </Box>
              <Box display={"grid"} gridTemplateColumns={"39% 5% 40%"}>
                <Typography sx={key}>{"Weight"}</Typography>
                <Typography>{"-"}</Typography>
                <Typography sx={val}>
                  {(weightVal && weightVal[0]?.value1) || "-"}
                </Typography>
              </Box>
              <Box display={"grid"} gridTemplateColumns={"39% 5% 40%"}>
                <Typography sx={key}>{"Height"}</Typography>
                <Typography>{"-"}</Typography>
                <Typography sx={val}>
                  {(heightVal &&
                    heightVal[0]?.value1 + " " + heightVal[0]?.unit) ||
                    ""}
                </Typography>
              </Box>
              <Box display={"grid"} gridTemplateColumns={"39% 5% 40%"}>
                <Typography sx={key}>{"BMI"}</Typography>
                <Typography>{"-"}</Typography>
                <Typography sx={val}>
                  {(bmiVal && bmiVal[0]?.value1) || ""}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Box>
            <Grid py={1.5}>
              <Typography variant="h3">{"Physical Examination"}</Typography>
            </Grid>
          </Box>
          <Grid sx={commonContainer}>
            <Box display={"grid"} gridTemplateColumns={"8% 1fr"}>
              <Typography sx={key}>{"GENERAL"}</Typography>
              <Typography sx={val}>
                {formikData?.values?.objective?.physicalExam?.general || "-"}
              </Typography>
            </Box>
            <Box display={"grid"} gridTemplateColumns={"8% 1fr"}>
              <Typography sx={key}>{"EYES"}</Typography>
              <Typography sx={val}>
                {formikData?.values?.objective?.physicalExam?.eyes || "-"}
              </Typography>
            </Box>
            <Box display={"grid"} gridTemplateColumns={"8% 1fr"}>
              <Typography sx={key}>{"HENT"}</Typography>
              <Typography sx={val}>
                {formikData?.values?.objective?.physicalExam?.hent || "-"}
              </Typography>
            </Box>
            <Box display={"grid"} gridTemplateColumns={"8% 1fr"}>
              <Typography sx={key}>{"RESP"}</Typography>
              <Typography sx={val}>
                {formikData?.values?.objective?.physicalExam
                  ?.respiratoryTherapy || "-"}
              </Typography>
            </Box>
            <Box display={"grid"} gridTemplateColumns={"8% 1fr"}>
              <Typography sx={key}>{"CVS"}</Typography>
              <Typography sx={val}>
                {formikData?.values?.objective?.physicalExam
                  ?.chorionicVillusSampling || "-"}
              </Typography>
            </Box>
            <Box display={"grid"} gridTemplateColumns={"8% 1fr"}>
              <Typography sx={key}>{"ABDOM"}</Typography>
              <Typography sx={val}>
                {formikData?.values?.objective?.physicalExam?.abdom || "-"}
              </Typography>
            </Box>
            <Box display={"grid"} gridTemplateColumns={"8% 1fr"}>
              <Typography sx={key}>{"GU"}</Typography>
              <Typography sx={val}>
                {formikData?.values?.objective?.physicalExam?.genitourinary ||
                  "-"}
              </Typography>
            </Box>
            <Box display={"grid"} gridTemplateColumns={"8% 1fr"}>
              <Typography sx={key}>{"MSS"}</Typography>
              <Typography sx={val}>
                {formikData?.values?.objective?.physicalExam
                  ?.marshallSmithSyndrome || "-"}
              </Typography>
            </Box>
            <Box display={"grid"} gridTemplateColumns={"8% 1fr"}>
              <Typography sx={key}>{"NS"}</Typography>
              <Typography sx={val}>
                {formikData?.values?.objective?.physicalExam?.normalSaline ||
                  "-"}
              </Typography>
            </Box>
            <Box display={"grid"} gridTemplateColumns={"8% 1fr"}>
              <Typography sx={key}>{"SKIN"}</Typography>
              <Typography sx={val}>
                {formikData?.values?.objective?.physicalExam?.skin || "-"}
              </Typography>
            </Box>
            <Box display={"grid"} gridTemplateColumns={"8% 1fr"}>
              <Typography sx={key}>{"PSYCH"}</Typography>
              <Typography sx={val}>
                {formikData?.values?.objective?.physicalExam?.psych || "-"}
              </Typography>
            </Box>
            <Box display={"grid"} gridTemplateColumns={"8% 1fr"}>
              <Typography sx={key}>{"RECTAL"}</Typography>
              <Typography sx={val}>
                {formikData?.values?.objective?.physicalExam?.rectal || "-"}
              </Typography>
            </Box>
          </Grid>
          <Box>
            <Grid py={1.5}>
              <Typography sx={subTitles}>{"ASSESSMENT"}</Typography>
            </Grid>
          </Box>
          <Grid sx={commonContainer}>
            <Box>
              <Typography sx={key}>
                {formikData?.values?.assessment?.assessmentNote || "-"}
              </Typography>
            </Box>
            <Box
              display={"grid"}
              gridTemplateColumns={"5% 2% 1fr"}
              alignItems={"center"}
            ></Box>
          </Grid>
          <Box>
            <Grid py={1.5}>
              <Typography variant="h3">{"ICD 10 Code"}</Typography>
            </Grid>
          </Box>
          <Grid sx={commonContainer}>
            <Box sx={{ display: "grid", gridTemplateColumns: "5% 2% 1fr" }}>
              {formikData?.values?.assessment?.billingCodes?.map(
                (item: any) => {
                  return (
                    <>
                      <Typography sx={key}>{item?.code}</Typography>
                      <Typography sx={key}>{"-"}</Typography>
                      <Typography sx={key}>{item?.description}</Typography>
                    </>
                  );
                }
              )}
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
            </Box>
            <Box display={"flex"} flexDirection={"column"} rowGap={1}>
              <Typography sx={key}>
                {formikData?.values?.encounterPlan?.labTest || "-"}
              </Typography>
            </Box>
            <Box display={"grid"} gridTemplateColumns={"8% 2% 1fr"} pt={1}>
              <Typography sx={subTitle}>{"CPT Code"}</Typography>
              <Typography sx={subTitle}>{"-"}</Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: "5% 2% 1fr" }}>
                {formikData?.values?.encounterPlan?.billingCodes.map(
                  (item: any) => {
                    return (
                      <>
                        <Typography sx={key}>{item?.code}</Typography>
                        <Typography sx={key}>{"-"}</Typography>
                        <Typography sx={key}>{item?.description}</Typography>
                      </>
                    );
                  }
                )}
              </Box>
            </Box>
            <Box display={"flex"} flexDirection={"column"}>
              <Box
                display={"grid"}
                gridTemplateColumns={"5% 2% 1fr"}
                alignItems={"center"}
              >
                {/* {encounterInfo?.encounterPlan?.billingCodes?.map((item: any) => {
                return (
                  <>
                    <Typography sx={key}>{item?.code}</Typography>
                    <Typography>{"-"}</Typography>
                    <Typography sx={val}>{item?.description}</Typography>
                  </>
                );
              })} */}
              </Box>
            </Box>
            <Box display={"grid"} gridTemplateColumns={"8% 2% 1fr"} pt={1}>
              <Typography sx={subTitle}>{"Imaging"}</Typography>
              <Typography sx={key}>{"-"}</Typography>
            </Box>
            <Box display={"flex"} flexDirection={"column"} rowGap={1}>
              <Typography sx={key}>
                {formikData?.values?.encounterPlan?.imaging || "-"}
              </Typography>
            </Box>
          </Grid>

          <Box>
            <Box>
              {medications &&
                medications.length !== 0 &&
                medications?.[0]?.drugCatalog?.medicine && (
                  <Grid py={1.5}>
                    <Typography sx={subTitles}>{"MEDICATIONS"}</Typography>
                  </Grid>
                )}

              {medications &&
                medications.length !== 0 &&
                medications?.[0]?.drugCatalog?.medicine && (
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow className={tableClasses.headingBackground}>
                          {tabColumns.map((column: any) => (
                            <TableCell
                              key={column.id}
                              className={tableClasses.tableHeaderCell}
                              sx={{ minWidth: column.width }}
                            >
                              <Typography
                                variant="h5"
                                className={tableClasses.TabelheadingTypo}
                              >
                                {column.label}
                              </Typography>
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {medications.map(
                          (medicine: any, index: any) =>
                            medicine?.drugCatalog?.medicine && (
                              <TableRow key={index}>
                                <TableCell>
                                  {medicine?.drugCatalog?.medicine || "-"}
                                </TableCell>
                                <TableCell>
                                  {medicine?.startDate
                                    ? moment(medicine?.startDate).format(
                                        "MM-DD-YYYY"
                                      )
                                    : "-"}
                                </TableCell>
                                <TableCell>
                                  {medicine?.endDate
                                    ? moment(medicine?.endDate).format(
                                        "MM-DD-YYYY"
                                      )
                                    : "-"}
                                </TableCell>
                                <TableCell>
                                  {medicine?.dosageTime
                                    ? transformText(medicine?.dosageTime)
                                    : "-"}
                                </TableCell>
                                <TableCell>
                                  {medicine?.dosageUnit
                                    ? transformText(medicine?.dosageUnit)
                                    : "-"}
                                </TableCell>
                                <TableCell>
                                  {medicine?.dosageWhen
                                    ? transformText(medicine?.dosageWhen)
                                    : "-"}
                                </TableCell>
                                <TableCell>
                                  {medicine?.duration || "-"}
                                </TableCell>
                                <TableCell>{medicine?.sig || "-"}</TableCell>
                                <TableCell>
                                  <Typography
                                    noWrap={true}
                                    title={medicine?.note}
                                    sx={{
                                      width: "60px",
                                      cursor: "pointer",
                                    }}
                                  >
                                    {medicine?.note || "-"}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            )
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
            </Box>
            <Grid py={2}>
              <Typography sx={subTitles}>{"FOLLOW UP"}</Typography>
            </Grid>
          </Box>
          <Box>
            <Grid pb={1}>
              <Typography variant="h3">
                {"Follow Up & Instruction Note"}
              </Typography>
            </Grid>
          </Box>
          <Grid sx={commonContainer}>
            <Box>
              <Typography sx={val}>
                {formikData?.values?.encounterPlan?.instructionNote || "-"}
              </Typography>
            </Box>
          </Grid>
          <Box>
            <Grid py={1.5}>
              <Typography variant="h3">{"Additional Note"}</Typography>
            </Grid>
          </Box>
          <Grid sx={commonContainer}>
            <Box>
              <Typography sx={val}>
                {formikData?.values?.encounterPlan?.additionalNote || "-"}
              </Typography>
            </Box>
          </Grid>
          <Box
            py={3}
            sx={{
              display: "flex",
              gap: "10px",
              justifyContent: "end",
              alignItems: "center",
              pr: "10px",
            }}
          >
            {!isSignedView && (
              <ButtonBase sx={blueButtonStyle} onClick={handleCancelEncounter}>
                <Typography sx={{ color: "#2c57b3" }}>{"Cancel"}</Typography>
              </ButtonBase>
            )}

            {isSignedView && (
              <ButtonBase sx={blueButtonStyle} onClick={() => navigate(-1)}>
                <Typography sx={{ color: "#2c57b3" }}>{"Cancel"}</Typography>
              </ButtonBase>
            )}

            <ButtonBase
              sx={blueButtonStyle}
              onClick={handlePrintViewEncounterDetails}
            >
              <Typography sx={{ color: "#2c57b3" }}>
                {isSignedView ? "Download" : "Print"}
              </Typography>
            </ButtonBase>
            {/* {isSignedView &&(
                <ButtonBase sx={blueButtonStyle} onClick={handleDownload}>
                  <Typography
                    sx={{ color: "#2c57b3" }}
                  >
                    {"Download"}
                  </Typography>
                </ButtonBase>
            )} */}
            {isSignedView && (
              <ButtonBase
                sx={{
                  px: "20px",
                  py: "8px",
                  borderRadius: "5px",
                  backgroundColor: "#2c57b3",
                  border: "1px solid #2c57b3",
                }}
                onClick={() => setSharePdf(true)}
              >
                <Typography sx={{ color: "#fff" }}>{"Share"}</Typography>
              </ButtonBase>
            )}

            {!isSignedView && (
              <ButtonBase sx={blueButtonStyle} onClick={handleBackToEncounter}>
                <Typography sx={{ color: "#2c57b3" }}>
                  {"Edit Encounter"}
                </Typography>
              </ButtonBase>
            )}
            {!isSignedView && (
              <ButtonBase
                sx={{
                  px: "20px",
                  py: "8px",
                  borderRadius: "5px",
                  backgroundColor: "#2c57b3",
                  border: "1px solid #2c57b3",
                }}
                onClick={handleCheckInAfterPreview}
              >
                <Typography sx={{ color: "#fff" }}>{"Sign & Save"}</Typography>
              </ButtonBase>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default ViewUnsignedVisite;
