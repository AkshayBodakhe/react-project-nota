import React from "react";
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
import { transformText } from "../../../../components/common/helper";
import moment from "moment";
import {
  commonContainer,
  containerList,
  key,
  subTitles,
  val,
  subTitle,
} from "../../../../styles/common";
import { blueButtonStyle } from "../appointment/complete-check-in/complete-check-in-const";
import { Column } from "../../../../components/common/enums-and-interfaces/interfaces";
import { tableUseStyles } from "../appointment/calendar/appointmentWithLocations";

const tabColumns: Column[] = [
  { id: "medicationName", label: "Medication Name", width: "135px" },
  { id: "startDate", label: "Start Date", width: "130px" },
  { id: "endDate", label: "End Date", width: "130px" },
  { id: "dosageTime", label: "Dosage Time", width: "110px" },
  { id: "dosageUnit", label: "Dosage Unit", width: "140" },
  { id: "dosageWhen", label: "Dosage When", width: "130px" },
  { id: "duration", label: "Duration", width: "110px" },
  { id: "sig", label: "Sig", width: "110px" },
  { id: "note", label: "Note", width: "fit-content" },
];

interface viewUnsignedProps {
  formik?: any;
  formikData?: any;
  medications?: any;
  handleCheckInAfterPreview?: any;
  setEnablePreview: any;
  isSignedView?: boolean;
  appInfo?: any;
  unsignedEncounter?: any;
  handleCancelEncounter?: any;
  handleViewEncounterDetails?: any;
  setSharePdf?: any;
}
const ViewCareUnsignedVisite = (props: viewUnsignedProps) => {
  const {
    formik,
    formikData,
    medications,
    handleCheckInAfterPreview,
    setEnablePreview,
    isSignedView,
    appInfo,
    unsignedEncounter,
    handleCancelEncounter,
    handleViewEncounterDetails,
    setSharePdf,
  } = props;
  const navigate = useNavigate();

  const handleBackToEncounter = () => {
    setEnablePreview(false);
  };

  const tableClasses = tableUseStyles();

  return (
    <>
      <Grid>
        <Box>
          <Grid py={1.5}>
            <Typography sx={subTitles}>{"ENCOUNTER SUMMARY"}</Typography>
            <Typography sx={{ fontWeight: "900" }}>
              {"APPOINTMENT DETAILS"}
            </Typography>
          </Grid>
          <Box>
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
                <Typography sx={val}>{"Blue Shield Association"}</Typography>
              </Box>
            </Grid>
          </Box>
        </Box>
        <Grid sx={{ overflowY: "scroll", maxHeight: "50vh", mt: "10px" }}>
          <Box>
            <Grid py={1.5}>
              <Typography sx={subTitles}>{"CHIEF COMPLAINT"}</Typography>
            </Grid>
            <Grid sx={commonContainer}>
              <Typography sx={val}>
                {formikData.values.chiefComplaint || "-"}
              </Typography>
            </Grid>
          </Box>
          <Box>
            {medications && medications[0]?.drugCatalog?.medicine !== "" && (
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
                        {tabColumns.map((column) => (
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
                              <TableCell>{medicine?.duration || "-"}</TableCell>
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
          {formikData?.values?.carePatientChartList?.[0]?.description && (
            <Grid>
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>
                    {"ADHERENCE TO TREATMENT"}
                  </Typography>
                </Grid>
              </Box>
              <Grid sx={commonContainer}>
                {/* <Box display={"flex"}>
                    <Typography sx={{ ...subTitle, pl: "12px" }}>
                      {"Name"}
                    </Typography>
                    <Typography sx={{ ...key, pl: "60px" }}>{"-"}</Typography>
                    <Typography sx={{ ...val, pl: "12px" }}>
                      {formikData?.values?.carePatientChartList?.[0]?.name || "-"}
                    </Typography>
                  </Box> */}
                <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Description"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {formikData?.values?.carePatientChartList?.[0]
                      ?.description || "-"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          )}

          {formikData?.values?.carePatientChartList?.[1]?.description && (
            <Grid>
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>
                    {"STI TESTING AND HISTORY"}
                  </Typography>
                </Grid>
              </Box>
              <Grid sx={commonContainer}>
                {/* <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Name"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "60px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                      {formikData?.values?.carePatientChartList?.[1]?.name || "-"}
                  </Typography>
                </Box> */}
                <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Description"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {formikData?.values?.carePatientChartList?.[1]
                      ?.description || "-"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          )}

          {formikData?.values?.carePatientChartList?.[2]?.description && (
            <Grid>
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>
                    {"SUBSTANCE ABUSE HISTORY"}
                  </Typography>
                </Grid>
              </Box>
              <Grid sx={commonContainer}>
                {/* <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Name"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "60px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                      {formikData?.values?.carePatientChartList?.[2]?.name|| "-"}
                  </Typography>
                </Box> */}
                <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Description"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {formikData?.values?.carePatientChartList?.[2]
                      ?.description || "-"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          )}

          {formikData?.values?.carePatientChartList?.[3]?.description && (
            <Grid>
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>
                    {"RISK BEHAVIOR SCREENING"}
                  </Typography>
                </Grid>
              </Box>
              <Grid sx={commonContainer}>
                {/* <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Name"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "60px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {formikData?.values?.carePatientChartList?.[3]?.name || "-"}
                  </Typography>
                </Box> */}
                <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Description"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {formikData?.values?.carePatientChartList?.[3]
                      ?.description || "-"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          )}

          {formikData?.values?.carePatientChartList?.[4]?.description && (
            <Grid>
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>{"HOUSING"}</Typography>
                </Grid>
              </Box>
              <Grid sx={commonContainer}>
                {/* <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Name"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "60px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                      {formikData?.values?.carePatientChartList?.[4]?.name || "-"}
                  </Typography>
                </Box> */}
                <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Description"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {formikData?.values?.carePatientChartList?.[4]
                      ?.description || "-"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          )}

          {formikData?.values?.carePatientChartList?.[5]?.description && (
            <Grid>
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>
                    {"EMPLOYMENT SOURCES OF INCOME"}
                  </Typography>
                </Grid>
              </Box>
              <Grid sx={commonContainer}>
                {/* <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Name"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "60px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {formikData?.values?.carePatientChartList?.[5]?.name || "-"}
                  </Typography>
                </Box> */}
                <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Description"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {formikData?.values?.carePatientChartList?.[5]
                      ?.description || "-"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          )}

          {formikData?.values?.carePatientChartList?.[6]?.description && (
            <Grid>
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>{"EMOTIONAL SUPPORT"}</Typography>
                </Grid>
              </Box>
              <Grid sx={commonContainer}>
                {/* <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Name"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "60px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {formikData?.values?.carePatientChartList?.[6]?.name || "-"}
                  </Typography>
                </Box> */}
                <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Description"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {formikData?.values?.carePatientChartList?.[6]
                      ?.description || "-"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          )}

          {formikData?.values?.carePatientChartList?.[7]?.description && (
            <Grid>
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>{"FOOD ASSISTANCE"}</Typography>
                </Grid>
              </Box>
              <Grid sx={commonContainer}>
                {/* <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Name"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "60px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {formikData?.values?.carePatientChartList?.[7]?.name || "-"}
                  </Typography>
                </Box> */}
                <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Description"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {formikData?.values?.carePatientChartList?.[7]
                      ?.description || "-"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          )}

          {formikData?.values?.carePatientChartList?.[8]?.description && (
            <Grid>
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>{"TRANSPORTATION"}</Typography>
                </Grid>
              </Box>
              <Grid sx={commonContainer}>
                {/* <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Name"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "60px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {formikData?.values?.carePatientChartList?.[8]?.name || "-"}
                  </Typography>
                </Box> */}
                <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Description"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {formikData?.values?.carePatientChartList?.[8]
                      ?.description || "-"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          )}

          {formikData?.values?.carePatientChartList?.[9]?.description && (
            <Grid>
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>
                    {"SUPPORT GROUPS FAMILY"}
                  </Typography>
                </Grid>
              </Box>
              <Grid sx={commonContainer}>
                {/* <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Name"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "60px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {formikData?.values?.carePatientChartList?.[9]?.name || "-"}
                  </Typography>
                </Box> */}
                <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Description"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {formikData?.values?.carePatientChartList?.[9]
                      ?.description || "-"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          )}
          {formikData?.values?.carePatientChartList?.[10]?.description && (
            <Grid>
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>
                    {"HISTORY OF INCARCERATION"}
                  </Typography>
                </Grid>
              </Box>
              <Grid sx={commonContainer}>
                {/* <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Name"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "60px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {formikData?.values?.carePatientChartList?.[10]?.name || "-"}
                  </Typography>
                </Box> */}
                <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Description"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {formikData?.values?.carePatientChartList?.[10]
                      ?.description || "-"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          )}

          {formikData?.values?.carePatientChartList?.[11]?.description && (
            <Grid>
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>
                    {"HIV AIDS AND OTHER STDS EDUCATION"}
                  </Typography>
                </Grid>
              </Box>
              <Grid sx={commonContainer}>
                {/* <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Name"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "60px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {formikData?.values?.carePatientChartList?.[11]?.name || "-"}
                  </Typography>
                </Box> */}
                <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Description"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {formikData?.values?.carePatientChartList?.[11]
                      ?.description || "-"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          )}

          {formikData?.values?.carePatientChartList?.[12]?.description && (
            <Grid>
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>{"FAMILY PLANNING"}</Typography>
                </Grid>
              </Box>
              <Grid sx={commonContainer}>
                {/* <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Name"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "60px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {formikData?.values?.carePatientChartList?.[12]?.name || "-"}
                  </Typography>
                </Box> */}
                <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Description"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {formikData?.values?.carePatientChartList?.[12]
                      ?.description || "-"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          )}

          {formikData?.values?.carePatientChartList?.[13]?.description && (
            <Grid>
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>
                    {"REFERRALS FOR SERVICES"}
                  </Typography>
                </Grid>
              </Box>
              <Grid sx={commonContainer}>
                {/* <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Name"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "60px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {formikData?.values?.carePatientChartList?.[13]?.name || "-"}
                  </Typography>
                </Box> */}
                <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Description"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {formikData?.values?.carePatientChartList?.[13]
                      ?.description || "-"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          )}
          {formikData?.values?.carePatientChartList?.[14]?.description && (
            <Grid>
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>{"OTHERS"}</Typography>
                </Grid>
              </Box>
              <Grid sx={commonContainer}>
                {/* <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Name"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "60px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {formikData?.values?.carePatientChartList?.[13]?.name || "-"}
                  </Typography>
                </Box> */}
                <Box display={"flex"}>
                  <Typography sx={{ ...subTitle, pl: "12px" }}>
                    {"Description"}
                  </Typography>
                  <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {formikData?.values?.carePatientChartList?.[14]
                      ?.description || "-"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          )}
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

            {/* {isSignedView &&(
                  <ButtonBase sx={blueButtonStyle} onClick={()=>{}}>
                    <Typography
                      sx={{ color: "#2c57b3" }}
                    >
                      {"Download"}
                    </Typography>
                  </ButtonBase>
                )} */}
            <ButtonBase
              sx={blueButtonStyle}
              onClick={handleViewEncounterDetails}
            >
              <Typography sx={{ color: "#2c57b3" }}>
                {isSignedView ? "Download" : "Print"}
              </Typography>
            </ButtonBase>

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
};

export default ViewCareUnsignedVisite;
