import {
  Box,
  ButtonBase,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import {
  useEncounterControllerServiceGetAllPatientEncounter,
  useEncounterControllerServiceGetEncounterDetails,
} from "../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { useEffect, useState } from "react";
import moment from "moment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Loading from "../../../../../../components/common/spinner/loading";
import {
  commonContainer,
  subTitles,
  val,
} from "../../../../../../styles/common";
import { key } from "../complete-check-in-const";

interface EncounterProps {
  patientUuid: string;
}

function EncounterTab(props: EncounterProps) {
  const { patientUuid } = props;
  const [enableView, setEnableView] = useState(false);

  const [encounterHistoryData, setencounterHistoryData] = useState([]);
  const [encounteruuid, setEncounterUuid] = useState("");
  const [isData, setIsData] = useState(false);

  const { data, isLoading, isError, error } =
    useEncounterControllerServiceGetAllPatientEncounter({
      patientUuid: patientUuid,
      page: 0,
      size: 10,
      sort: ["created,desc"],
    });
  const { data: encounterDetails, isLoading: loadingEncounterDetails } =
    useEncounterControllerServiceGetEncounterDetails(
      {
        uuid: encounteruuid,
      },
      [],
      {
        enabled: isData ? true : false,
      }
    );

  useEffect(() => {
    if (!!data) setencounterHistoryData(data?.data?.content);
  }, [patientUuid, data]);

  // useEffect(() => {
  //   if (!!encounterDetails) console.log("xxx", encounterDetails);
  // }, [encounterDetails, enableView]);

  const handleBack = () => {
    setEnableView((item) => !item);
    setIsData(false);
  };

  const handleOnClickEncouter = (uuid: string) => {
    setIsData(true);
    setEnableView((item) => !item);
    setEncounterUuid(uuid);
  };

  return (
    <>
      <Box>
        <Grid
          container
          justifyContent={"space-between"}
          alignItems={"center"}
          py={1}
        >
          <Grid item>
            {enableView && (
              <ButtonBase onClick={() => handleBack()}>
                <ArrowBackIcon />
              </ButtonBase>
            )}
          </Grid>
          <Select
            id="demo-multiple-name"
            name="rowsPerPage"
            value={["All Encounters"]}
            renderValue={(selected: any) => {
              if (selected.length === 0) {
                return (
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#1A1A1A7F",
                    }}
                  >
                    Select
                  </span>
                );
              }

              return selected.join(", ");
            }}
            sx={{
              height: "40px !important",
              width: "40%",
              margin: "0 10px",
              backgroundColor: "#FFFFFF",
            }}
            onChange={() => {}}
          >
            <MenuItem value={"zero"}>Zero</MenuItem>
          </Select>
        </Grid>
      </Box>
      <Box py={2}>
        {!enableView ? (
          isLoading ? (
            <Loading />
          ) : (
            <>
              {encounterHistoryData.length === 0 ? (
                <Typography
                  variant="h2"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 600,
                  }}
                >
                  No Previous Encounter
                </Typography>
              ) : (
                encounterHistoryData?.filter((item:any)=>item?.status==="SIGNED").map((item: any, index) => {
                  return (
                    <Grid
                      key={index}
                      onClick={() => handleOnClickEncouter(item?.uuid)}
                      sx={{ cursor: "pointer" }}
                    >
                      <Grid
                        container
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Typography sx={{ fontSize: "16px", color: "black" }}>
                          {moment(item?.serviceDate).format(
                            "ddd, MMM DD, YYYY"
                          ) +
                            " " +
                            (item?.chiefComplaint || "")}
                        </Typography>
                        {/* <Box
                          sx={{
                            display: "flex",
                            gap: "3px",
                            cursor: "pointer",
                          }}
                        >
                          <ContentCopyOutlinedIcon sx={{ color: "#2c57b3" }} />
                          <Typography sx={{ color: "#2c57b3" }}>
                            {"Copy"}
                          </Typography>
                        </Box> */}
                      </Grid>
                      <Box
                        display={"flex"}
                        flexDirection={"column"}
                        rowGap={0.5}
                        mt={1.5}
                      >
                        {/* <Grid container gap={1.2} alignItems={"start"}>
                          <Typography variant="h5" sx={{ color: "black" }}>
                            {"Diagnosis"}
                          </Typography>
                          <Typography>:</Typography>
                          <Grid
                            display={"flex"}
                            flexDirection={"column"}
                            rowGap={0.5}
                          >
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {
                                "1 F 33.2 - Major Depressive Disorder, Recurrent episode"
                              }
                            </Typography>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {"2 F 41.1 - Generalized anxiety disorder"}
                            </Typography>
                          </Grid>
                        </Grid> */}
                      </Box>
                      <hr />
                    </Grid>
                  );
                })
              )}
            </>
          )
        ) : loadingEncounterDetails ? (
          <Loading />
        ) : (
          <Grid>
            <Box>
              <Grid sx={commonContainer} my={2}>
                <Typography sx={subTitles}>{"CHIEF COMPLAINT"}</Typography>
                <Typography sx={val}>
                  {encounterDetails?.data?.chiefCompliant || "-"}
                </Typography>
              </Grid>
            </Box>
            <Box>
              <Grid sx={commonContainer} my={2}>
                <Typography sx={subTitles}>{"SUBJECTIVE"}</Typography>
              </Grid>
              <Grid sx={commonContainer} my={2}>
                <Grid>
                  <Typography sx={subTitles}>
                    {"History Of Present Illness (HPI)"}
                  </Typography>
                </Grid>
                <Grid>
                  <Box display={"flex"} gap={2}>
                    <Typography sx={key}>{"Today's visit"}</Typography>
                    <Typography sx={key}>{":"}</Typography>
                    <Typography sx={val}>
                      {encounterDetails?.data?.subjective
                        ?.historyOfPresentIllness?.todayVisit || "-"}
                    </Typography>
                  </Box>
                  <Box display={"flex"} gap={2}>
                    <Typography sx={key}>{"Medical History"}</Typography>
                    <Typography sx={key}>{":"}</Typography>
                    <Typography sx={val}>
                      {encounterDetails?.data?.subjective
                        ?.historyOfPresentIllness?.patientPastMedicalHistory
                        ?.name || "-"}
                    </Typography>
                  </Box>
                  <Box display={"flex"} gap={2}>
                    <Typography sx={key}>{"Surgical History"}</Typography>
                    <Typography sx={key}>{":"}</Typography>
                    <Typography sx={val}>
                      {encounterDetails?.data?.subjective
                        ?.historyOfPresentIllness?.patientPastSurgicalHistory
                        ?.name || "-"}
                    </Typography>
                  </Box>
                  <Box display={"flex"} gap={2}>
                    <Typography sx={key}>
                      {"Hospitalization/ Major Diagnostic Procedure"}
                    </Typography>
                    <Typography sx={key}>{":"}</Typography>
                    <Typography sx={val}>
                      {encounterDetails?.data?.subjective
                        ?.historyOfPresentIllness?.hospitalization || "-"}
                    </Typography>
                  </Box>
                  <Box display={"flex"} gap={2}>
                    <Typography sx={key}>{"Family History"}</Typography>
                    <Typography sx={key}>{":"}</Typography>
                    <Typography sx={val}>
                      {encounterDetails?.data?.subjective
                        ?.historyOfPresentIllness?.patientFamilyHistory?.name ||
                        "-"}
                    </Typography>
                  </Box>
                  <Box display={"flex"} gap={2}>
                    <Typography sx={key}>{"Social History"}</Typography>
                    <Typography sx={key}>{":"}</Typography>
                    <Typography sx={val}>
                      {encounterDetails?.data?.subjective
                        ?.historyOfPresentIllness?.patientSocialHistory?.name ||
                        "-"}
                    </Typography>
                  </Box>
                  <Box display={"flex"} gap={2}>
                    <Typography sx={key}>{"Allergies"}</Typography>
                    <Typography sx={key}>{":"}</Typography>
                    <Typography sx={val}>
                      {encounterDetails?.data?.subjective
                        ?.historyOfPresentIllness?.patientAllergy?.allergy ||
                        "-"}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid sx={commonContainer} my={2}>
                <Typography sx={subTitles}>
                  {"Review Of System (ROS)"}
                </Typography>
                <Grid>
                  <Box display={"grid"} gridTemplateColumns={"20% 1fr"}>
                    <Typography sx={key}>{"GENERAL"}</Typography>
                    <Typography sx={{ pb: 2 }}>
                      {encounterDetails?.data?.subjective?.reviewOfSystem
                        ?.general || "-"}
                    </Typography>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"20% 1fr"}>
                    <Typography sx={key}>{"EYES"}</Typography>
                    <Typography sx={{ pb: 2 }}>
                      {encounterDetails?.data?.subjective?.reviewOfSystem
                        ?.eyes || "-"}
                    </Typography>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"20% 1fr"}>
                    <Typography sx={key}>{"HENT"}</Typography>
                    <Typography sx={{ pb: 2 }}>
                      {encounterDetails?.data?.subjective?.reviewOfSystem
                        ?.hent || "-"}
                    </Typography>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"20% 1fr"}>
                    <Typography sx={key}>{"RESP"}</Typography>
                    <Typography sx={{ pb: 2 }}>
                      {encounterDetails?.data?.subjective?.reviewOfSystem
                        ?.respiratoryTherapy || "-"}
                    </Typography>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"20% 1fr"}>
                    <Typography sx={key}>{"CVS"}</Typography>
                    <Typography sx={{ pb: 2 }}>
                      {encounterDetails?.data?.subjective?.reviewOfSystem
                        ?.chorionicVillusSampling || "-"}
                    </Typography>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"20% 1fr"}>
                    <Typography sx={key}>{"GI"}</Typography>
                    <Typography sx={{ pb: 2 }}>
                      {encounterDetails?.data?.subjective?.reviewOfSystem
                        ?.genitourinary || "-"}
                    </Typography>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"20% 1fr"}>
                    <Typography sx={key}>{"GU"}</Typography>
                    <Typography sx={{ pb: 2 }}>
                      {encounterDetails?.data?.subjective?.reviewOfSystem
                        ?.gastrointestinal || "-"}
                    </Typography>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"20% 1fr"}>
                    <Typography sx={key}>{"MSS"}</Typography>
                    <Typography sx={{ pb: 2 }}>
                      {encounterDetails?.data?.subjective?.reviewOfSystem
                        ?.marshallSmithSyndrome || "-"}
                    </Typography>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"20% 1fr"}>
                    <Typography sx={key}>{"NS"}</Typography>
                    <Typography sx={{ pb: 2 }}>
                      {encounterDetails?.data?.subjective?.reviewOfSystem
                        ?.normalSaline || "-"}
                    </Typography>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"20% 1fr"}>
                    <Typography sx={key}>{"SKIN"}</Typography>
                    <Typography sx={{ pb: 2 }}>
                      {encounterDetails?.data?.subjective?.reviewOfSystem
                        ?.skin || "-"}
                    </Typography>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"20% 1fr"}>
                    <Typography sx={key}>{"DIET"}</Typography>
                    <Typography sx={{ pb: 2 }}>
                      {encounterDetails?.data?.subjective?.reviewOfSystem
                        ?.diet || "-"}
                    </Typography>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"20% 1fr"}>
                    <Typography sx={key}>{"ENDOC"}</Typography>
                    <Typography sx={{ pb: 2 }}>
                      {encounterDetails?.data?.subjective?.reviewOfSystem
                        ?.endocrinology || "-"}
                    </Typography>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"20% 1fr"}>
                    <Typography sx={key}>{"PSYCH"}</Typography>
                    <Typography sx={{ pb: 2 }}>
                      {encounterDetails?.data?.subjective?.reviewOfSystem
                        ?.psychology || "-"}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid sx={commonContainer} my={2}>
                <Typography sx={subTitles}>{"OBJECTIVE"}</Typography>
              </Grid>
              <Grid sx={commonContainer} my={2}>
                <Grid>
                  <Typography sx={subTitles}>{"Vitals"}</Typography>
                </Grid>
                <Grid>
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
                          {/* {formikData?.values?.objective?.patientVitals[0]?.value1 ||
                      "-"} */}
                        </Typography>
                        <Typography sx={val}>{"/"}</Typography>
                        <Typography sx={val}>
                          {/* {formikData?.values?.objective?.patientVitals[0]?.value1 ||
                      "-"} */}
                        </Typography>
                      </Box>
                    </Box>
                    <Box display={"grid"} gridTemplateColumns={"39% 5% 40%"}>
                      <Typography sx={key}>{"Heart Rate"}</Typography>
                      <Typography>{"-"}</Typography>
                      <Typography sx={val}>
                        {/* {formikData?.values?.objective?.patientVitals[2]?.value1 ||
                    "-"} */}
                      </Typography>
                    </Box>
                    <Box display={"grid"} gridTemplateColumns={"39% 5% 40%"}>
                      <Typography sx={key}>{"Oxygen Saturation"}</Typography>
                      <Typography>{"-"}</Typography>
                      <Typography sx={val}>
                        {/* {formikData?.values?.objective?.patientVitals[4]?.value1 ||
                    "-"} */}
                      </Typography>
                    </Box>
                    <Box display={"grid"} gridTemplateColumns={"39% 5% 40%"}>
                      <Typography sx={key}>{"Temperature"}</Typography>
                      <Typography>{"-"}</Typography>
                      <Typography sx={val}>
                        {/* {formikData?.values?.objective?.patientVitals[6]?.value1 ||
                    "-"} */}
                      </Typography>
                    </Box>
                    <Box display={"grid"} gridTemplateColumns={"39% 5% 40%"}>
                      <Typography sx={key}>{"Weight"}</Typography>
                      <Typography>{"-"}</Typography>
                      <Typography sx={val}>
                        {/* {formikData?.values?.objective?.patientVitals[7]?.value1 ||
                    "-"} */}
                      </Typography>
                    </Box>
                    <Box display={"grid"} gridTemplateColumns={"39% 5% 40%"}>
                      <Typography sx={key}>{"Height"}</Typography>
                      <Typography>{"-"}</Typography>
                      <Typography sx={val}>
                        {/* {formikData?.values?.objective?.patientVitals[5]?.value1 ||
                    ""} */}
                      </Typography>
                    </Box>
                    <Box display={"grid"} gridTemplateColumns={"39% 5% 40%"}>
                      <Typography sx={key}>{"BMI"}</Typography>
                      <Typography>{"-"}</Typography>
                      <Typography sx={val}>
                        {/* {formikData?.values?.objective?.patientVitals[1]?.value1 ||
                    ""} */}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid sx={commonContainer} my={2}>
                <Typography sx={subTitles}>{"Physical Examination"}</Typography>
                <Grid>
                  <Box display={"grid"} gridTemplateColumns={"20% 1fr"}>
                    <Typography sx={key}>{"GENERAL"}</Typography>
                    <Typography sx={{ pb: 2 }}>
                      {encounterDetails?.data?.objective?.physicalExam
                        ?.general || "-"}
                    </Typography>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"20% 1fr"}>
                    <Typography sx={key}>{"EYES"}</Typography>
                    <Typography sx={{ pb: 2 }}>
                      {encounterDetails?.data?.objective?.physicalExam?.eyes ||
                        "-"}
                    </Typography>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"20% 1fr"}>
                    <Typography sx={key}>{"HENT"}</Typography>
                    <Typography sx={{ pb: 2 }}>
                      {encounterDetails?.data?.objective?.physicalExam?.hent ||
                        "-"}
                    </Typography>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"20% 1fr"}>
                    <Typography sx={key}>{"RESP"}</Typography>
                    <Typography sx={{ pb: 2 }}>
                      {encounterDetails?.data?.objective?.physicalExam
                        ?.respiratoryTherapy || "-"}
                    </Typography>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"20% 1fr"}>
                    <Typography sx={key}>{"CVS"}</Typography>
                    <Typography sx={{ pb: 2 }}>
                      {encounterDetails?.data?.objective?.physicalExam
                        ?.chorionicVillusSampling || "-"}
                    </Typography>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"20% 1fr"}>
                    <Typography sx={key}>{"ABDOM"}</Typography>
                    <Typography sx={{ pb: 2 }}>
                      {encounterDetails?.data?.objective?.physicalExam?.abdom ||
                        "-"}
                    </Typography>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"20% 1fr"}>
                    <Typography sx={key}>{"GU"}</Typography>
                    <Typography sx={{ pb: 2 }}>
                      {encounterDetails?.data?.objective?.physicalExam
                        ?.genitourinary || "-"}
                    </Typography>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"20% 1fr"}>
                    <Typography sx={key}>{"MSS"}</Typography>
                    <Typography sx={{ pb: 2 }}>
                      {encounterDetails?.data?.objective?.physicalExam
                        ?.marshallSmithSyndrome || "-"}
                    </Typography>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"20% 1fr"}>
                    <Typography sx={key}>{"NS"}</Typography>
                    <Typography sx={{ pb: 2 }}>
                      {encounterDetails?.data?.objective?.physicalExam
                        ?.normalSaline || "-"}
                    </Typography>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"20% 1fr"}>
                    <Typography sx={key}>{"SKIN"}</Typography>
                    <Typography sx={{ pb: 2 }}>
                      {encounterDetails?.data?.objective?.physicalExam?.skin ||
                        "-"}
                    </Typography>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"20% 1fr"}>
                    <Typography sx={key}>{"PSYCH"}</Typography>
                    <Typography sx={{ pb: 2 }}>
                      {encounterDetails?.data?.objective?.physicalExam?.psych ||
                        "-"}
                    </Typography>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"20% 1fr"}>
                    <Typography sx={key}>{"RECTAL"}</Typography>
                    <Typography sx={{ pb: 2 }}>
                      {encounterDetails?.data?.objective?.physicalExam
                        ?.rectal || "-"}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid sx={commonContainer} my={2}>
                <Typography sx={subTitles}>{"ASSESSMENT"}</Typography>
                <Grid>
                  <Box>
                    <Typography sx={key}>
                      {encounterDetails?.data?.assessment?.assessmentNote ||
                        "-"}
                    </Typography>
                  </Box>
                  <Box
                    display={"grid"}
                    gridTemplateColumns={"5% 2% 1fr"}
                    alignItems={"center"}
                  ></Box>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid sx={commonContainer} my={2}>
                <Typography sx={subTitles}>{"ICD 10 Code"}</Typography>

                <Grid>
                  <Box
                    sx={{ display: "grid", gridTemplateColumns: "5% 2% 1fr" }}
                  >
                    {encounterDetails?.data?.assessment?.billingCodes?.map(
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
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid sx={commonContainer} my={2}>
                <Typography sx={subTitles}>{"PLAN"}</Typography>
                <Grid>
                  <Box
                    display={"grid"}
                    gridTemplateColumns={"6% 2% 1fr"}
                    pt={1}
                  >
                    <Typography sx={key}>{"Test"}</Typography>
                    {/* <Typography sx={key}>{"-"}</Typography> */}
                  </Box>
                  <Box display={"flex"} flexDirection={"column"} rowGap={1}>
                    <Typography sx={key}>
                      {encounterDetails?.data?.encounterPlan?.labTest || "-"}
                    </Typography>
                  </Box>
                  {/* <Box
                    display={"grid"}
                    gridTemplateColumns={"8% 2% 1fr"}
                    pt={1}
                  >
                    <Typography sx={subTitle}>{"CPT Code"}</Typography>
                    <Typography sx={subTitle}>{"-"}</Typography>
                    <Box
                      sx={{ display: "grid", gridTemplateColumns: "5% 2% 1fr" }}
                    >
                        {encounterDetails?.data?.encounterPlan?.billingCodes.map((item: any) => {
                            return (
                                <>
                                  <Typography sx={key}>{item?.code}</Typography>
                                  <Typography sx={key}>{"-"}</Typography>
                                  <Typography sx={key}>{item?.description}</Typography>
                                </>
                            )})
                        }
                    </Box>
                  </Box> */}
                  {/* <Box display={"flex"} flexDirection={"column"}>
                      <Box
                        display={"grid"}
                        gridTemplateColumns={"5% 2% 1fr"}
                        alignItems={"center"}
                      >
                              {encounterInfo?.encounterPlan?.billingCodes?.map((item: any) => {
                                      return (
                                          <>
                                            <Typography sx={key}>{item?.code}</Typography>
                                            <Typography>{"-"}</Typography>
                                            <Typography sx={val}>{item?.description}</Typography>
                                          </>
                                      )})
                                } 
                      </Box>
                  </Box> */}
                  <Box
                    display={"grid"}
                    gridTemplateColumns={"8% 2% 1fr"}
                    pt={1}
                  >
                    <Typography sx={key}>{"Imaging"}</Typography>
                    {/* <Typography sx={key}>{"-"}</Typography> */}
                  </Box>
                  <Box display={"flex"} flexDirection={"column"} rowGap={1}>
                    <Typography sx={key}>
                      {encounterDetails?.data?.encounterPlan?.imaging || "-"}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid sx={commonContainer} my={2}>
                <Typography sx={subTitles}>{"CPT Code"}</Typography>
                <Grid>
                  <Box
                    sx={{ display: "grid", gridTemplateColumns: "5% 2% 1fr" }}
                  >
                    {encounterDetails?.data?.encounterPlan?.billingCodes.map(
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
                </Grid>
              </Grid>
            </Box>
            <Box sx={commonContainer} my={2}>
              <Grid py={2}>
                <Typography sx={subTitles} mb={2}>
                  {"FOLLOW UP"}
                </Typography>
                <Box>
                  <Grid pb={1}>
                    <Typography sx={key}>
                      {"Follow Up & Instruction Note"}
                    </Typography>
                  </Grid>
                </Box>
                <Grid>
                  <Box>
                    <Typography sx={val}>
                      {encounterDetails?.data?.encounterPlan?.instructionNote ||
                        "-"}
                    </Typography>
                  </Box>
                </Grid>
                <Box>
                  <Grid py={1.5}>
                    <Typography sx={key}>{"Additional Note"}</Typography>
                  </Grid>
                </Box>
                <Grid>
                  <Box>
                    <Typography sx={val}>
                      {encounterDetails?.data?.encounterPlan?.additionalNote ||
                        "-"}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        )}
      </Box>
    </>
  );
}

export default EncounterTab;
