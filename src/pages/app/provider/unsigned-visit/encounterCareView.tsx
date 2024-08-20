import React, { useEffect, useRef, useState } from "react";
import { useEncounterCarePortalControllerServiceGetEncounterDetails1 } from "../../../../sdk/thinkemr-core-0.0.1/queries";
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
import { Close } from "@mui/icons-material";
import { transformText } from "../../../../components/common/helper";
import moment from "moment";
import notaLogo from "../../../../assets/logo/Navala_Logo.svg";
import { CarePatientChart } from "../../../../sdk/thinkemr-core-0.0.1/requests";
import PrintIcon from "@mui/icons-material/Print";
import { useReactToPrint } from "react-to-print";
import {
  commonContainer,
  containerList,
  key,
  subTitles,
  val,
  subTitle,
} from "../../../../styles/common";

interface encounterViewProps {
  open: boolean;
  onClose: any;
  appointmentDetails: any;
  formikData?: any;
  formik?: any;
  medications?: any;
}
interface Item {
  name: string;
  description: string;
}

function EncounterCareView(props: encounterViewProps) {
  const { open, onClose, appointmentDetails, formikData, formik, medications } =
    props;

  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const [scroll] = React.useState<DialogProps["scroll"]>("paper");
  const [encounterInfo, setEncounterInfo] = useState<any>();
  const { data: encounterDetails } =
    useEncounterCarePortalControllerServiceGetEncounterDetails1({
      uuid: appointmentDetails?.encounterUuid,
    });

  useEffect(() => {
    if (encounterDetails) {
      setEncounterInfo(encounterDetails?.data);
    }
  }, [encounterDetails, open]);

  const MedicationList = medications
    ? medications
    : encounterDetails?.data?.patientMedicationList;

  const patchData = (encounterDetails: any): Record<string, Item> => {
    const newData: Record<string, Item> = {};

    encounterDetails?.data?.carePatientChartList?.forEach((data: any) => {
      switch (data.carePatientChartingType) {
        case CarePatientChart.carePatientChartingType.ADHERENCE_TO_TREATMENT:
          newData.adherence = {
            name: data.name,
            description: data.description,
          };
          break;

        case CarePatientChart.carePatientChartingType.STI_TESTING_AND_HISTORY:
          newData.stiTesting = {
            name: data.name,
            description: data.description,
          };
          break;

        case CarePatientChart.carePatientChartingType.SUBSTANCE_ABUSE_HISTORY:
          newData.substance = {
            name: data.name,
            description: data.description,
          };
          break;

        case CarePatientChart.carePatientChartingType.RISK_BEHAVIOR_SCREENING:
          newData.riskBehaviorScreening = {
            name: data.name,
            description: data.description,
          };
          break;

        case CarePatientChart.carePatientChartingType.FAMILY_PLANNING:
          newData.familyPlannig = {
            name: data.name,
            description: data.description,
          };
          break;

        case CarePatientChart.carePatientChartingType.REFERRALS_FOR_SERVICES:
          newData.referralsForService = {
            name: data.name,
            description: data.description,
          };
          break;
        case CarePatientChart.carePatientChartingType
          .HIV_AIDS_AND_OTHER_STDS_EDUCATION:
          newData.hivAidsAndOtherStdsEducation = {
            name: data.name,
            description: data.description,
          };
          break;
        case CarePatientChart.carePatientChartingType.OTHERS:
          newData.others = {
            name: data.name,
            description: data.description,
          };
          break;
        case CarePatientChart.carePatientChartingType
          .SOCIAL_AND_ENVIRONMENTAL_SUPPORT:
          switch (data.socialAndEnvironmentalSupportType) {
            case CarePatientChart.socialAndEnvironmentalSupportType.HOUSING:
              newData.housing = {
                name: data.name,
                description: data.description,
              };
              break;
            case CarePatientChart.socialAndEnvironmentalSupportType
              .EMPLOYMENT_SOURCES_OF_INCOME:
              newData.employmentSourceOfIncome = {
                name: data.name,
                description: data.description,
              };
              break;
            case CarePatientChart.socialAndEnvironmentalSupportType
              .EMOTIONAL_SUPPORT:
              newData.emotionalSupport = {
                name: data.name,
                description: data.description,
              };
              break;
            case CarePatientChart.socialAndEnvironmentalSupportType
              .FOOD_ASSISTANCE:
              newData.foodAssistance = {
                name: data.name,
                description: data.description,
              };
              break;
            case CarePatientChart.socialAndEnvironmentalSupportType
              .TRANSPORTATION:
              newData.transportation = {
                name: data.name,
                description: data.description,
              };
              break;
            case CarePatientChart.socialAndEnvironmentalSupportType
              .SUPPORT_GROUPS_FAMILY:
              newData.supportGroupsFamily = {
                name: data.name,
                description: data.description,
              };
              break;
            case CarePatientChart.socialAndEnvironmentalSupportType
              .HISTORY_OF_INCARCERATION:
              newData.historyOfIncarceration = {
                name: data.name,
                description: data.description,
              };
              break;
          }
          break;
        default:
          break;
      }
    });

    return newData;
  };
  const data = patchData(encounterDetails);

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
              {"Navala Care Test Account"}
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
                      <Typography sx={val}></Typography>
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
              <Box>
                {MedicationList &&
                  MedicationList?.length !== 0 &&
                  MedicationList?.[0]?.drugCatalog?.medicine !== "" && (
                    <Grid py={1.5}>
                      <Typography sx={subTitles}>{"MEDICATIONS"}</Typography>
                    </Grid>
                  )}
                {MedicationList &&
                  MedicationList?.length !== 0 &&
                  MedicationList.map(
                    (medicine: any, index: any) =>
                      medicine?.drugCatalog?.medicine !== "" && (
                        <Grid
                          key={index}
                          sx={{ ...commonContainer, marginBottom: 2 }}
                        >
                          <Box
                            display={"grid"}
                            gridTemplateColumns={"14% 2% 1fr"}
                          >
                            <Typography sx={key}>
                              {"Medication Name"}
                            </Typography>
                            <Typography sx={key}>{"-"}</Typography>
                            <Typography sx={val}>
                              {medicine?.drugCatalog?.medicine || "-"}
                            </Typography>
                          </Box>
                          <Box
                            display={"grid"}
                            gridTemplateColumns={"14% 2% 1fr"}
                          >
                            <Typography sx={key}>{"Start Date"}</Typography>
                            <Typography sx={key}>{"-"}</Typography>
                            <Typography sx={val}>
                              {medicine?.startDate ? medicine?.startDate : "-"}
                            </Typography>
                          </Box>
                          <Box
                            display={"grid"}
                            gridTemplateColumns={"14% 2% 1fr"}
                          >
                            <Typography sx={key}>{"End Date"}</Typography>
                            <Typography sx={key}>{"-"}</Typography>
                            <Typography sx={val}>
                              {medicine?.endDate ? medicine?.endDate : "-"}
                            </Typography>
                          </Box>
                          <Box
                            display={"grid"}
                            gridTemplateColumns={"14% 2% 1fr"}
                          >
                            <Typography sx={key}>{"Dosage Time"}</Typography>
                            <Typography sx={key}>{"-"}</Typography>
                            <Typography sx={val}>
                              {medicine?.dosageTime
                                ? transformText(medicine?.dosageTime)
                                : "-"}
                            </Typography>
                          </Box>
                          <Box
                            display={"grid"}
                            gridTemplateColumns={"14% 2% 1fr"}
                          >
                            <Typography sx={key}>{"Dosage Unit"}</Typography>
                            <Typography sx={key}>{"-"}</Typography>
                            <Typography sx={val}>
                              {medicine?.dosageUnit
                                ? transformText(medicine?.dosageUnit)
                                : "-"}
                            </Typography>
                          </Box>
                          <Box
                            display={"grid"}
                            gridTemplateColumns={"14% 2% 1fr"}
                          >
                            <Typography sx={key}>{"Dosage When"}</Typography>
                            <Typography sx={key}>{"-"}</Typography>
                            <Typography sx={val}>
                              {medicine?.dosageWhen
                                ? transformText(medicine?.dosageWhen)
                                : "-"}
                            </Typography>
                          </Box>
                          <Box
                            display={"grid"}
                            gridTemplateColumns={"14% 2% 1fr"}
                          >
                            <Typography sx={key}>{"Duration"}</Typography>
                            <Typography sx={key}>{"-"}</Typography>
                            <Typography sx={val}>
                              {medicine?.duration ? medicine?.duration : "-"}
                            </Typography>
                          </Box>
                          <Box
                            display={"grid"}
                            gridTemplateColumns={"14% 2% 1fr"}
                          >
                            <Typography sx={key}>{"Sig"}</Typography>
                            <Typography sx={key}>{"-"}</Typography>
                            <Typography sx={val}>
                              {medicine?.sig ? medicine?.sig : "-"}
                            </Typography>
                          </Box>
                          <Box
                            display={"grid"}
                            gridTemplateColumns={"14% 2% 1fr"}
                          >
                            <Typography sx={key}>{"Note"}</Typography>
                            <Typography sx={key}>{"-"}</Typography>
                            <Typography sx={val}>
                              {medicine?.note ? medicine?.note : "-"}
                            </Typography>
                          </Box>
                        </Grid>
                      )
                  )}
              </Box>
              {(data?.adherence?.description ||
                formikData?.values?.carePatientChartList?.[0]?.description) && (
                <Box>
                  <Grid py={1.5}>
                    <Typography sx={subTitles}>
                      {"ADHERENCE TO TREATMENT"}
                    </Typography>
                  </Grid>
                </Box>
              )}
              {(data?.adherence?.description ||
                formikData?.values?.carePatientChartList?.[0]?.description) && (
                <Grid sx={commonContainer}>
                  {/* <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Name"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "60px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {data?.adherence?.name || "-"}
                  </Typography>
                </Box> */}
                  <Box display={"flex"}>
                    <Typography sx={{ ...subTitle, pl: "12px" }}>
                      {"Description"}
                    </Typography>
                    <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                    <Typography sx={{ ...val, pl: "12px" }}>
                      {data?.adherence?.description
                        ? data?.adherence?.description
                        : formikData?.values?.carePatientChartList?.[0]
                            ?.description || "-"}
                    </Typography>
                  </Box>
                </Grid>
              )}

              {(data?.stiTesting?.description ||
                formikData?.values?.carePatientChartList?.[1]?.description) && (
                <Box>
                  <Grid py={1.5}>
                    <Typography sx={subTitles}>
                      {"STI TESTING AND HISTORY"}
                    </Typography>
                  </Grid>
                </Box>
              )}
              {(data?.stiTesting?.description ||
                formikData?.values?.carePatientChartList?.[1]?.description) && (
                <Grid sx={commonContainer}>
                  {/* <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Name"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "60px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                      {data?.stiTesting?.name || "-"}
                  </Typography>
                </Box> */}
                  <Box display={"flex"}>
                    <Typography sx={{ ...subTitle, pl: "12px" }}>
                      {"Description"}
                    </Typography>
                    <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                    <Typography sx={{ ...val, pl: "12px" }}>
                      {data?.stiTesting?.description
                        ? data?.stiTesting?.description
                        : formikData?.values?.carePatientChartList?.[1]
                            ?.description || "-"}
                    </Typography>
                  </Box>
                </Grid>
              )}

              {(data?.substance?.description ||
                formikData?.values?.carePatientChartList?.[2]?.description) && (
                <Box>
                  <Grid py={1.5}>
                    <Typography sx={subTitles}>
                      {"SUBSTANCE ABUSE HISTORY"}
                    </Typography>
                  </Grid>
                </Box>
              )}
              {(data?.substance?.description ||
                formikData?.values?.carePatientChartList?.[2]?.description) && (
                <Grid sx={commonContainer}>
                  {/* <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Name"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "60px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                      {data?.substance?.name || "-"}
                  </Typography>
                </Box> */}
                  <Box display={"flex"}>
                    <Typography sx={{ ...subTitle, pl: "12px" }}>
                      {"Description"}
                    </Typography>
                    <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                    <Typography sx={{ ...val, pl: "12px" }}>
                      {data?.substance?.description
                        ? data?.substance?.description
                        : formikData?.values?.carePatientChartList?.[2]
                            ?.description || "-"}
                    </Typography>
                  </Box>
                </Grid>
              )}

              {(data?.riskBehaviorScreening?.description ||
                formikData?.values?.carePatientChartList?.[3]?.description) && (
                <Box>
                  <Grid py={1.5}>
                    <Typography sx={subTitles}>
                      {"RISK BEHAVIOR SCREENING"}
                    </Typography>
                  </Grid>
                </Box>
              )}
              {(data?.riskBehaviorScreening?.description ||
                formikData?.values?.carePatientChartList?.[3]?.description) && (
                <Grid sx={commonContainer}>
                  {/* <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Name"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "60px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {data?.riskBehaviorScreening?.name || "-"}
                  </Typography>
                </Box> */}
                  <Box display={"flex"}>
                    <Typography sx={{ ...subTitle, pl: "12px" }}>
                      {"Description"}
                    </Typography>
                    <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                    <Typography sx={{ ...val, pl: "12px" }}>
                      {data?.riskBehaviorScreening?.description
                        ? data?.riskBehaviorScreening?.description
                        : formikData?.values?.carePatientChartList?.[3]
                            ?.description || "-"}
                    </Typography>
                  </Box>
                </Grid>
              )}

              {(data?.housing?.description ||
                formikData?.values?.carePatientChartList?.[4]?.description) && (
                <Box>
                  <Grid py={1.5}>
                    <Typography sx={subTitles}>{"HOUSING"}</Typography>
                  </Grid>
                </Box>
              )}
              {(data?.housing?.description ||
                formikData?.values?.carePatientChartList?.[4]?.description) && (
                <Grid sx={commonContainer}>
                  {/* <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Name"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "60px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                      {data?.housing?.name || "-"}
                  </Typography>
                </Box> */}
                  <Box display={"flex"}>
                    <Typography sx={{ ...subTitle, pl: "12px" }}>
                      {"Description"}
                    </Typography>
                    <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                    <Typography sx={{ ...val, pl: "12px" }}>
                      {data?.housing?.description
                        ? data?.housing?.description
                        : formikData?.values?.carePatientChartList?.[4]
                            ?.description || "-"}
                    </Typography>
                  </Box>
                </Grid>
              )}

              {(data?.employmentSourceOfIncome?.description ||
                formikData?.values?.carePatientChartList?.[5]?.description) && (
                <Box>
                  <Grid py={1.5}>
                    <Typography sx={subTitles}>
                      {"EMPLOYMENT SOURCES OF INCOME"}
                    </Typography>
                  </Grid>
                </Box>
              )}
              {(data?.employmentSourceOfIncome?.description ||
                formikData?.values?.carePatientChartList?.[5]?.description) && (
                <Grid sx={commonContainer}>
                  {/* <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Name"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "60px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {data?.employmentSourceOfIncome?.name || "-"}
                  </Typography>
                </Box> */}
                  <Box display={"flex"}>
                    <Typography sx={{ ...subTitle, pl: "12px" }}>
                      {"Description"}
                    </Typography>
                    <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                    <Typography sx={{ ...val, pl: "12px" }}>
                      {data?.employmentSourceOfIncome?.description
                        ? data?.employmentSourceOfIncome?.description
                        : formikData?.values?.carePatientChartList?.[5]
                            ?.description || "-"}
                    </Typography>
                  </Box>
                </Grid>
              )}

              {(data?.emotionalSupport?.description ||
                formikData?.values?.carePatientChartList?.[6]?.description) && (
                <Box>
                  <Grid py={1.5}>
                    <Typography sx={subTitles}>
                      {"EMOTIONAL SUPPORT"}
                    </Typography>
                  </Grid>
                </Box>
              )}
              {(data?.emotionalSupport?.description ||
                formikData?.values?.carePatientChartList?.[6]?.description) && (
                <Grid sx={commonContainer}>
                  {/* <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Name"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "60px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {data?.emotionalSupport?.name || "-"}
                  </Typography>
                </Box> */}
                  <Box display={"flex"}>
                    <Typography sx={{ ...subTitle, pl: "12px" }}>
                      {"Description"}
                    </Typography>
                    <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                    <Typography sx={{ ...val, pl: "12px" }}>
                      {data?.emotionalSupport?.description
                        ? data?.emotionalSupport?.description
                        : formikData?.values?.carePatientChartList?.[6]
                            ?.description || "-"}
                    </Typography>
                  </Box>
                </Grid>
              )}

              {(data?.foodAssistance?.description ||
                formikData?.values?.carePatientChartList?.[7]?.description) && (
                <Box>
                  <Grid py={1.5}>
                    <Typography sx={subTitles}>{"FOOD ASSISTANCE"}</Typography>
                  </Grid>
                </Box>
              )}
              {(data?.foodAssistance?.description ||
                formikData?.values?.carePatientChartList?.[7]?.description) && (
                <Grid sx={commonContainer}>
                  {/* <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Name"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "60px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {data?.foodAssistance?.name || "-"}
                  </Typography>
                </Box> */}
                  <Box display={"flex"}>
                    <Typography sx={{ ...subTitle, pl: "12px" }}>
                      {"Description"}
                    </Typography>
                    <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                    <Typography sx={{ ...val, pl: "12px" }}>
                      {data?.foodAssistance?.description
                        ? data?.foodAssistance?.description
                        : formikData?.values?.carePatientChartList?.[7]
                            ?.description || "-"}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {(data?.transportation?.description ||
                formikData?.values?.carePatientChartList?.[8]?.description) && (
                <Box>
                  <Grid py={1.5}>
                    <Typography sx={subTitles}>{"TRANSPORTATION"}</Typography>
                  </Grid>
                </Box>
              )}
              {(data?.transportation?.description ||
                formikData?.values?.carePatientChartList?.[8]?.description) && (
                <Grid sx={commonContainer}>
                  {/* <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Name"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "60px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {data?.transportation?.name || "-"}
                  </Typography>
                </Box> */}
                  <Box display={"flex"}>
                    <Typography sx={{ ...subTitle, pl: "12px" }}>
                      {"Description"}
                    </Typography>
                    <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                    <Typography sx={{ ...val, pl: "12px" }}>
                      {data?.transportation?.description
                        ? data?.transportation?.description
                        : formikData?.values?.carePatientChartList?.[8]
                            ?.description || "-"}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {(data?.supportGroupsFamily?.description ||
                formikData?.values?.carePatientChartList?.[9]?.description) && (
                <Box>
                  <Grid py={1.5}>
                    <Typography sx={subTitles}>
                      {"SUPPORT GROUPS FAMILY"}
                    </Typography>
                  </Grid>
                </Box>
              )}
              {(data?.supportGroupsFamily?.description ||
                formikData?.values?.carePatientChartList?.[9]?.description) && (
                <Grid sx={commonContainer}>
                  {/* <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Name"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "60px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {data?.supportGroupsFamily?.name || "-"}
                  </Typography>
                </Box> */}
                  <Box display={"flex"}>
                    <Typography sx={{ ...subTitle, pl: "12px" }}>
                      {"Description"}
                    </Typography>
                    <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                    <Typography sx={{ ...val, pl: "12px" }}>
                      {data?.supportGroupsFamily?.description
                        ? data?.supportGroupsFamily?.description
                        : formikData?.values?.carePatientChartList?.[9]
                            ?.description || "-"}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {(data?.historyOfIncarceration?.description ||
                formikData?.values?.carePatientChartList?.[10]
                  ?.description) && (
                <Box>
                  <Grid py={1.5}>
                    <Typography sx={subTitles}>
                      {"HISTORY OF INCARCERATION"}
                    </Typography>
                  </Grid>
                </Box>
              )}
              {(data?.historyOfIncarceration?.description ||
                formikData?.values?.carePatientChartList?.[10]
                  ?.description) && (
                <Grid sx={commonContainer}>
                  {/* <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Name"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "60px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {data?.historyOfIncarceration?.name || "-"}
                  </Typography>
                </Box> */}
                  <Box display={"flex"}>
                    <Typography sx={{ ...subTitle, pl: "12px" }}>
                      {"Description"}
                    </Typography>
                    <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                    <Typography sx={{ ...val, pl: "12px" }}>
                      {data?.historyOfIncarceration?.description
                        ? data?.historyOfIncarceration?.description
                        : formikData?.values?.carePatientChartList?.[10]
                            ?.description || "-"}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {(data?.hivAidsAndOtherStdsEducation?.description ||
                formikData?.values?.carePatientChartList?.[11]
                  ?.description) && (
                <Box>
                  <Grid py={1.5}>
                    <Typography sx={subTitles}>
                      {"HIV AIDS AND OTHER STDS EDUCATION"}
                    </Typography>
                  </Grid>
                </Box>
              )}
              {(data?.hivAidsAndOtherStdsEducation?.description ||
                formikData?.values?.carePatientChartList?.[11]
                  ?.description) && (
                <Grid sx={commonContainer}>
                  {/* <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Name"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "60px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {data?.hivAidsAndOtherStdsEducation?.name || "-"}
                  </Typography>
                </Box> */}
                  <Box display={"flex"}>
                    <Typography sx={{ ...subTitle, pl: "12px" }}>
                      {"Description"}
                    </Typography>
                    <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                    <Typography sx={{ ...val, pl: "12px" }}>
                      {data?.hivAidsAndOtherStdsEducation?.description
                        ? data?.hivAidsAndOtherStdsEducation?.description
                        : formikData?.values?.carePatientChartList?.[11]
                            ?.description || "-"}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {(data?.familyPlannig?.description ||
                formikData?.values?.carePatientChartList?.[12]
                  ?.description) && (
                <Box>
                  <Grid py={1.5}>
                    <Typography sx={subTitles}>{"FAMILY PLANNING"}</Typography>
                  </Grid>
                </Box>
              )}
              {(data?.familyPlannig?.description ||
                formikData?.values?.carePatientChartList?.[12]
                  ?.description) && (
                <Grid sx={commonContainer}>
                  {/* <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Name"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "60px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {data?.familyPlannig?.name || "-"}
                  </Typography>
                </Box> */}
                  <Box display={"flex"}>
                    <Typography sx={{ ...subTitle, pl: "12px" }}>
                      {"Description"}
                    </Typography>
                    <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                    <Typography sx={{ ...val, pl: "12px" }}>
                      {data?.familyPlannig?.description
                        ? data?.familyPlannig?.description
                        : formikData?.values?.carePatientChartList?.[12]
                            ?.description || "-"}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {(data?.referralsForService?.description ||
                formikData?.values?.carePatientChartList?.[13]
                  ?.description) && (
                <Box>
                  <Grid py={1.5}>
                    <Typography sx={subTitles}>
                      {"REFERRALS FOR SERVICES"}
                    </Typography>
                  </Grid>
                </Box>
              )}
              {(data?.referralsForService?.description ||
                formikData?.values?.carePatientChartList?.[13]
                  ?.description) && (
                <Grid sx={commonContainer}>
                  {/* <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Name"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "60px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {data?.referralsForService?.name || "-"}
                  </Typography>
                </Box> */}
                  <Box display={"flex"}>
                    <Typography sx={{ ...subTitle, pl: "12px" }}>
                      {"Description"}
                    </Typography>
                    <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                    <Typography sx={{ ...val, pl: "12px" }}>
                      {data?.referralsForService?.description
                        ? data?.referralsForService?.description
                        : formikData?.values?.carePatientChartList?.[13]
                            ?.description || "-"}
                    </Typography>
                  </Box>
                </Grid>
              )}

              {(data?.others?.description ||
                formikData?.values?.carePatientChartList?.[14]
                  ?.description) && (
                <Box>
                  <Grid py={1.5}>
                    <Typography sx={subTitles}>{"OTHERS"}</Typography>
                  </Grid>
                </Box>
              )}
              {(data?.others?.description ||
                formikData?.values?.carePatientChartList?.[14]
                  ?.description) && (
                <Grid sx={commonContainer}>
                  {/* <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Name"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "60px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {data?.referralsForService?.name || "-"}
                  </Typography>
                </Box> */}
                  <Box display={"flex"}>
                    <Typography sx={{ ...subTitle, pl: "12px" }}>
                      {"Description"}
                    </Typography>
                    <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                    <Typography sx={{ ...val, pl: "12px" }}>
                      {data?.others?.description
                        ? data?.others?.description
                        : formikData?.values?.carePatientChartList?.[14]
                            ?.description || "-"}
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default EncounterCareView;
