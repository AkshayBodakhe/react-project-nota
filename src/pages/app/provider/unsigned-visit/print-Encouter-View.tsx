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
import { useEncounterControllerServiceGetEncounterDetails } from "../../../../sdk/thinkemr-core-0.0.1/queries";
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
import { transformText } from "../../../../components/common/helper";
interface PrintEncounterViewProps {
  open: boolean;
  onClose: any;
  appointmentDetails: any;
  formikData?: any;
  medications?: any;
}

function PrintEncounterView(props: PrintEncounterViewProps) {
  const { open, onClose, appointmentDetails, formikData, medications } = props;
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

              {formikData?.values?.subjective?.historyOfPresentIllness
                ?.patientAllergy?.allergy && (
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
                          formikData?.values?.subjective
                            ?.historyOfPresentIllness?.patientAllergy
                            ?.allergyType
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
                        {transformText(
                          formikData?.values?.subjective
                            ?.historyOfPresentIllness?.patientAllergy?.reaction
                        ) || "-"}
                      </Typography>
                    </Box>
                    <Box display={"flex"} gap={2}>
                      <Typography sx={key}>{"Severity"}</Typography>
                      <Typography sx={key}>{":"}</Typography>
                      <Typography sx={val}>
                        {transformText(
                          formikData?.values?.subjective
                            ?.historyOfPresentIllness?.patientAllergy?.severity
                        ) || "-"}
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
              )}

              <Box>
                <Grid py={1.5}>
                  <Typography variant="h3">
                    {"Review Of System (ROS)"}
                  </Typography>
                </Grid>
              </Box>
              <Grid sx={commonContainer}>
                <Box display={"grid"} gridTemplateColumns={"12% 1fr"}>
                  <Typography sx={key}>{"GENERAL"}</Typography>
                  <Typography sx={val}>
                    {formikData?.values?.subjective?.reviewOfSystem?.general ||
                      "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"12% 1fr"}>
                  <Typography sx={key}>{"EYES"}</Typography>
                  <Typography sx={val}>
                    {formikData?.values?.subjective?.reviewOfSystem?.eyes ||
                      "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"12% 1fr"}>
                  <Typography sx={key}>{"HENT"}</Typography>
                  <Typography sx={val}>
                    {formikData?.values?.subjective?.reviewOfSystem?.hent ||
                      "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"12% 1fr"}>
                  <Typography sx={key}>{"RESP"}</Typography>
                  <Typography sx={val}>
                    {formikData?.values?.subjective?.reviewOfSystem
                      ?.respiratoryTherapy || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"12% 1fr"}>
                  <Typography sx={key}>{"CVS"}</Typography>
                  <Typography sx={val}>
                    {formikData?.values?.subjective?.reviewOfSystem
                      ?.chorionicVillusSampling || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"12% 1fr"}>
                  <Typography sx={key}>{"GI"}</Typography>
                  <Typography sx={val}>
                    {formikData?.values?.subjective?.reviewOfSystem
                      ?.genitourinary || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"12% 1fr"}>
                  <Typography sx={key}>{"GU"}</Typography>
                  <Typography sx={val}>
                    {formikData?.values?.subjective?.reviewOfSystem
                      ?.gastrointestinal || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"12% 1fr"}>
                  <Typography sx={key}>{"MSS"}</Typography>
                  <Typography sx={val}>
                    {formikData?.values?.subjective?.reviewOfSystem
                      ?.marshallSmithSyndrome || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"12% 1fr"}>
                  <Typography sx={key}>{"NS"}</Typography>
                  <Typography sx={val}>
                    {formikData?.values?.subjective?.reviewOfSystem
                      ?.normalSaline || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"12% 1fr"}>
                  <Typography sx={key}>{"SKIN"}</Typography>
                  <Typography sx={val}>
                    {formikData?.values?.subjective?.reviewOfSystem?.skin ||
                      "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"12% 1fr"}>
                  <Typography sx={key}>{"DIET"}</Typography>
                  <Typography sx={val}>
                    {formikData?.values?.subjective?.reviewOfSystem?.diet ||
                      "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"12% 1fr"}>
                  <Typography sx={key}>{"ENDOC"}</Typography>
                  <Typography sx={val}>
                    {formikData?.values?.subjective?.reviewOfSystem
                      ?.endocrinology || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"12% 1fr"}>
                  <Typography sx={key}>{"PSYCH"}</Typography>
                  <Typography sx={val}>
                    {formikData?.values?.subjective?.reviewOfSystem
                      ?.psychology || "-"}
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
                <Box
                  display={"grid"}
                  gridTemplateColumns={"32% 32% 32%"}
                  gap={1}
                >
                  <Box
                    display={"grid"}
                    gridTemplateColumns={"39% 5% 1fr"}
                    alignItems={"center"}
                  >
                    <Typography sx={key}>{"Blood Pressure"}</Typography>
                    <Typography>{"-"}</Typography>
                    <Box display={"flex"} gap={"5px"}>
                      <Typography sx={val}>
                        {formikData?.values?.objective?.patientVitals[0]
                          ?.value1 || "-"}
                      </Typography>
                      <Typography sx={val}>{"/"}</Typography>
                      <Typography sx={val}>
                        {formikData?.values?.objective?.patientVitals[0]
                          ?.value1 || "-"}
                      </Typography>
                    </Box>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"39% 5% 40%"}>
                    <Typography sx={key}>{"Heart Rate"}</Typography>
                    <Typography>{"-"}</Typography>
                    <Typography sx={val}>
                      {formikData?.values?.objective?.patientVitals[2]
                        ?.value1 || "-"}
                    </Typography>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"39% 5% 40%"}>
                    <Typography sx={key}>{"Oxygen Saturation"}</Typography>
                    <Typography>{"-"}</Typography>
                    <Typography sx={val}>
                      {formikData?.values?.objective?.patientVitals[4]
                        ?.value1 || "-"}
                    </Typography>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"39% 5% 40%"}>
                    <Typography sx={key}>{"Temperature"}</Typography>
                    <Typography>{"-"}</Typography>
                    <Typography sx={val}>
                      {formikData?.values?.objective?.patientVitals[6]
                        ?.value1 || "-"}
                    </Typography>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"39% 5% 40%"}>
                    <Typography sx={key}>{"Weight"}</Typography>
                    <Typography>{"-"}</Typography>
                    <Typography sx={val}>
                      {formikData?.values?.objective?.patientVitals[7]
                        ?.value1 || "-"}
                    </Typography>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"39% 5% 40%"}>
                    <Typography sx={key}>{"Height"}</Typography>
                    <Typography>{"-"}</Typography>
                    <Typography sx={val}>
                      {formikData?.values?.objective?.patientVitals[5]
                        ?.value1 || ""}
                    </Typography>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"39% 5% 40%"}>
                    <Typography sx={key}>{"BMI"}</Typography>
                    <Typography>{"-"}</Typography>
                    <Typography sx={val}>
                      {formikData?.values?.objective?.patientVitals[1]
                        ?.value1 || ""}
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
                <Box display={"grid"} gridTemplateColumns={"12% 1fr"}>
                  <Typography sx={key}>{"GENERAL"}</Typography>
                  <Typography sx={val}>
                    {formikData?.values?.objective?.physicalExam?.general ||
                      "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"12% 1fr"}>
                  <Typography sx={key}>{"EYES"}</Typography>
                  <Typography sx={val}>
                    {formikData?.values?.objective?.physicalExam?.eyes || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"12% 1fr"}>
                  <Typography sx={key}>{"HENT"}</Typography>
                  <Typography sx={val}>
                    {formikData?.values?.objective?.physicalExam?.hent || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"12% 1fr"}>
                  <Typography sx={key}>{"RESP"}</Typography>
                  <Typography sx={val}>
                    {formikData?.values?.objective?.physicalExam
                      ?.respiratoryTherapy || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"12% 1fr"}>
                  <Typography sx={key}>{"CVS"}</Typography>
                  <Typography sx={val}>
                    {formikData?.values?.objective?.physicalExam
                      ?.chorionicVillusSampling || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"12% 1fr"}>
                  <Typography sx={key}>{"ABDOM"}</Typography>
                  <Typography sx={val}>
                    {formikData?.values?.objective?.physicalExam?.abdom || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"12% 1fr"}>
                  <Typography sx={key}>{"GU"}</Typography>
                  <Typography sx={val}>
                    {formikData?.values?.objective?.physicalExam
                      ?.genitourinary || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"12% 1fr"}>
                  <Typography sx={key}>{"MSS"}</Typography>
                  <Typography sx={val}>
                    {formikData?.values?.objective?.physicalExam
                      ?.marshallSmithSyndrome || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"12% 1fr"}>
                  <Typography sx={key}>{"NS"}</Typography>
                  <Typography sx={val}>
                    {formikData?.values?.objective?.physicalExam
                      ?.normalSaline || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"12% 1fr"}>
                  <Typography sx={key}>{"SKIN"}</Typography>
                  <Typography sx={val}>
                    {formikData?.values?.objective?.physicalExam?.skin || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"12% 1fr"}>
                  <Typography sx={key}>{"PSYCH"}</Typography>
                  <Typography sx={val}>
                    {formikData?.values?.objective?.physicalExam?.psych || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"12% 1fr"}>
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
                  <Typography sx={key}>
                    {formikData?.values?.encounterPlan?.labTest || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"9% 4% 1fr"} pt={1}>
                  <Typography sx={subTitle}>{"CPT Code"}</Typography>
                  <Typography sx={subTitle}>{"-"}</Typography>
                  <Box
                    sx={{ display: "grid", gridTemplateColumns: "5% 2% 1fr" }}
                  >
                    {formikData?.values?.encounterPlan?.billingCodes.map(
                      (item: any) => {
                        return (
                          <>
                            <Typography sx={key}>{item?.code}</Typography>
                            <Typography sx={key}>{"-"}</Typography>
                            <Typography sx={key}>
                              {item?.description}
                            </Typography>
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
                <Box display={"grid"} gridTemplateColumns={"12% 4% 1fr"} pt={1}>
                  <Typography sx={subTitle}>{"Imaging"}</Typography>
                  <Typography sx={key}>{"-"}</Typography>
                  <Typography sx={key}>
                    {formikData?.values?.encounterPlan?.imaging || "-"}
                  </Typography>
                </Box>
              </Grid>

              <Box>
                {medications &&
                  medications.length !== 0 &&
                  medications[0]?.drugCatalog?.medicine !== "" && (
                    <Grid py={1.5}>
                      <Typography sx={subTitles}>{"MEDICATIONS"}</Typography>
                    </Grid>
                  )}
                {medications &&
                  medications[0]?.drugCatalog?.medicine !== "" &&
                  medications.map((medicine: any) => (
                    <Grid sx={{ ...commonContainer, my: 2 }}>
                      <Box display={"grid"} gridTemplateColumns={"13% 2% 1fr"}>
                        <Typography sx={key}>{"Medication Name"}</Typography>
                        <Typography sx={key}>{"-"}</Typography>
                        <Typography sx={val}>
                          {medicine?.drugCatalog?.medicine || "-"}
                        </Typography>
                      </Box>
                      <Box display={"grid"} gridTemplateColumns={"13% 2% 1fr"}>
                        <Typography sx={key}>{"Start Date"}</Typography>
                        <Typography sx={key}>{"-"}</Typography>
                        <Typography sx={val}>
                          {medicine?.startDate ? medicine?.startDate : "-"}
                        </Typography>
                      </Box>
                      <Box display={"grid"} gridTemplateColumns={"13% 2% 1fr"}>
                        <Typography sx={key}>{"End Date"}</Typography>
                        <Typography sx={key}>{"-"}</Typography>
                        <Typography sx={val}>
                          {medicine?.endDate ? medicine?.endDate : "-"}
                        </Typography>
                      </Box>
                      <Box display={"grid"} gridTemplateColumns={"13% 2% 1fr"}>
                        <Typography sx={key}>{"Dosage Time"}</Typography>
                        <Typography sx={key}>{"-"}</Typography>
                        <Typography sx={val}>
                          {transformText(medicine?.dosageTime) || "-"}
                        </Typography>
                      </Box>
                      <Box display={"grid"} gridTemplateColumns={"13% 2% 1fr"}>
                        <Typography sx={key}>{"Dosage Unit"}</Typography>
                        <Typography sx={key}>{"-"}</Typography>
                        <Typography sx={val}>
                          {transformText(medicine?.dosageUnit) || "-"}
                        </Typography>
                      </Box>
                      <Box display={"grid"} gridTemplateColumns={"13% 2% 1fr"}>
                        <Typography sx={key}>{"Dosage When"}</Typography>
                        <Typography sx={key}>{"-"}</Typography>
                        <Typography sx={val}>
                          {transformText(medicine?.dosageWhen) || "-"}
                        </Typography>
                      </Box>
                      <Box display={"grid"} gridTemplateColumns={"13% 2% 1fr"}>
                        <Typography sx={key}>{"Duration"}</Typography>
                        <Typography sx={key}>{"-"}</Typography>
                        <Typography sx={val}>
                          {medicine?.duration || "-"}
                        </Typography>
                      </Box>
                      <Box display={"grid"} gridTemplateColumns={"13% 2% 1fr"}>
                        <Typography sx={key}>{"Sig"}</Typography>
                        <Typography sx={key}>{"-"}</Typography>
                        <Typography sx={val}>{medicine?.sig || "-"}</Typography>
                      </Box>
                      <Box display={"grid"} gridTemplateColumns={"13% 2% 1fr"}>
                        <Typography sx={key}>{"Note"}</Typography>
                        <Typography sx={key}>{"-"}</Typography>
                        <Typography sx={val}>
                          {medicine?.note || "-"}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
              </Box>
              <Box>
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
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PrintEncounterView;
