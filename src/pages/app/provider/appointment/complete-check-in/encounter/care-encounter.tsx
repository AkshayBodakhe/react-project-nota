import {
  Box,
  ButtonBase,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import {
  useEncounterCarePortalControllerServiceGetEncounterDetails1,
  useEncounterControllerServiceGetAllPatientEncounter,
} from "../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { useEffect, useState } from "react";
import moment from "moment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Loading from "../../../../../../components/common/spinner/loading";
import { transformText } from "../../../../../../components/common/helper";
import { CarePatientChart } from "../../../../../../sdk/thinkemr-core-0.0.1/requests";
import {
  commonContainer,
  subTitles,
  val,
} from "../../../../../../styles/common";
import { key } from "../complete-check-in-const";

interface EncounterProps {
  patientUuid: string;
}
interface Item {
  name: string;
  description: string;
}

function CareEncounterTab(props: EncounterProps) {
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
    useEncounterCarePortalControllerServiceGetEncounterDetails1(
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
  //   if (!!encounterDetails) console.log("xxx", encounterDetails?.data);
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
  const encounterDetailsData = patchData(encounterDetails);

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
                encounterHistoryData.filter((item:any)=>item?.status==="SIGNED").map((item: any, index) => {
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
              <Grid py={1.5}>
                <Typography sx={subTitles}>{"MEDICATIONS"}</Typography>
              </Grid>
              <Grid sx={commonContainer}>
                <Box display={"grid"} gridTemplateColumns={"35% 1fr"}>
                  <Typography sx={key}>{"Medication Name :"}</Typography>
                  {/* <Typography sx={key}>{"-"}</Typography> */}
                  <Typography sx={val}>
                    {encounterDetails?.data?.patientMedicationList?.[0]
                      ?.medication?.name || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"35% 1fr"}>
                  <Typography sx={key}>{"Start Date :"}</Typography>
                  {/* <Typography sx={key}>{"-"}</Typography> */}
                  <Typography sx={val}>
                    {encounterDetails?.data?.patientMedicationList?.[0]
                      ?.startDate || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"35% 1fr"}>
                  <Typography sx={key}>{"End Date :"}</Typography>
                  {/* <Typography sx={key}>{"-"}</Typography> */}
                  <Typography sx={val}>
                    {encounterDetails?.data?.patientMedicationList?.[0]
                      ?.endDate || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"35% 1fr"}>
                  <Typography sx={key}>{"Dosage Time :"}</Typography>
                  {/* <Typography sx={key}>{"-"}</Typography> */}
                  <Typography sx={val}>
                    {transformText(
                      encounterDetails?.data?.patientMedicationList?.[0]
                        ?.dosageTime
                    ) || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"35% 1fr"}>
                  <Typography sx={key}>{"Dosage Unit :"}</Typography>
                  {/* <Typography sx={key}>{"-"}</Typography> */}
                  <Typography sx={val}>
                    {transformText(
                      encounterDetails?.data?.patientMedicationList?.[0]
                        ?.dosageUnit
                    ) || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"35% 1fr"}>
                  <Typography sx={key}>{"Dosage When :"}</Typography>
                  {/* <Typography sx={key}>{"-"}</Typography> */}
                  <Typography sx={val}>
                    {transformText(
                      encounterDetails?.data?.patientMedicationList?.[0]
                        ?.dosageWhen
                    ) || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"35% 1fr"}>
                  <Typography sx={key}>{"Duration :"}</Typography>
                  {/* <Typography sx={key}>{"-"}</Typography> */}
                  <Typography sx={val}>
                    {encounterDetails?.data?.patientMedicationList?.[0]
                      ?.duration || "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"35% 1fr"}>
                  <Typography sx={key}>{"Sig :"}</Typography>
                  {/* <Typography sx={key}>{"-"}</Typography> */}
                  <Typography sx={val}>
                    {encounterDetails?.data?.patientMedicationList?.[0]?.sig ||
                      "-"}
                  </Typography>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"35% 1fr"}>
                  <Typography sx={key}>{"Note :"}</Typography>
                  {/* <Typography sx={key}>{"-"}</Typography> */}
                  <Typography sx={val}>
                    {encounterDetails?.data?.patientMedicationList?.[0]?.note ||
                      "-"}
                  </Typography>
                </Box>
              </Grid>
            </Box>
            <Grid>
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>
                    {"ADHERENCE TO TREATMENT"}
                  </Typography>
                </Grid>
              </Box>
              <Grid sx={commonContainer}>
                <Box display={"flex"}>
                  <Typography sx={key}>{"Description :"}</Typography>
                  {/* <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography> */}
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {encounterDetailsData?.adherence?.description || "-"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Grid>
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>
                    {"STI TESTING AND HISTORY"}
                  </Typography>
                </Grid>
              </Box>
              <Grid sx={commonContainer}>
                <Box display={"flex"}>
                  <Typography sx={key}>{"Description :"}</Typography>
                  <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {encounterDetailsData?.stiTesting?.description || "-"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Grid>
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>
                    {"SUBSTANCE ABUSE HISTORY"}
                  </Typography>
                </Grid>
              </Box>
              <Grid sx={commonContainer}>
                <Box display={"flex"}>
                  <Typography sx={key}>{"Description :"}</Typography>
                  <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {encounterDetailsData?.substance?.description || "-"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Grid>
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>
                    {"RISK BEHAVIOR SCREENING"}
                  </Typography>
                </Grid>
              </Box>
              <Grid sx={commonContainer}>
                <Box display={"flex"}>
                  <Typography sx={key}>{"Description :"}</Typography>
                  <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {encounterDetailsData?.riskBehaviorScreening?.description ||
                      "-"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Grid>
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>{"HOUSING"}</Typography>
                </Grid>
              </Box>
              <Grid sx={commonContainer}>
                <Box display={"flex"}>
                  <Typography sx={key}>{"Description :"}</Typography>
                  <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {encounterDetailsData?.housing?.description || "-"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Grid>
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>
                    {"EMPLOYMENT SOURCES OF INCOME"}
                  </Typography>
                </Grid>
              </Box>
              <Grid sx={commonContainer}>
                <Box display={"flex"}>
                  <Typography sx={key}>{"Description :"}</Typography>
                  <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {encounterDetailsData?.employmentSourceOfIncome
                      ?.description || "-"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Grid>
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>{"EMOTIONAL SUPPORT"}</Typography>
                </Grid>
              </Box>
              <Grid sx={commonContainer}>
                <Box display={"flex"}>
                  <Typography sx={key}>{"Description :"}</Typography>
                  <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {encounterDetailsData?.emotionalSupport?.description || "-"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Grid>
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>{"FOOD ASSISTANCE"}</Typography>
                </Grid>
              </Box>
              <Grid sx={commonContainer}>
                <Box display={"flex"}>
                  <Typography sx={key}>{"Description :"}</Typography>
                  <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {encounterDetailsData?.foodAssistance?.description || "-"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Grid>
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>{"TRANSPORTATION"}</Typography>
                </Grid>
              </Box>
              <Grid sx={commonContainer}>
                <Box display={"flex"}>
                  <Typography sx={key}>{"Description :"}</Typography>
                  <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {encounterDetailsData?.transportation?.description || "-"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Grid>
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>
                    {"SUPPORT GROUPS FAMILY"}
                  </Typography>
                </Grid>
              </Box>
              <Grid sx={commonContainer}>
                <Box display={"flex"}>
                  <Typography sx={key}>{"Description :"}</Typography>
                  <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {encounterDetailsData?.supportGroupsFamily?.description ||
                      "-"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Grid>
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>
                    {"HISTORY OF INCARCERATION"}
                  </Typography>
                </Grid>
              </Box>
              <Grid sx={commonContainer}>
                <Box display={"flex"}>
                  <Typography sx={key}>{"Description :"}</Typography>
                  <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {encounterDetailsData?.historyOfIncarceration
                      ?.description || "-"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Grid>
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>
                    {"HIV AIDS AND OTHER STDS EDUCATION"}
                  </Typography>
                </Grid>
              </Box>
              <Grid sx={commonContainer}>
                <Box display={"flex"}>
                  <Typography sx={key}>{"Description :"}</Typography>
                  <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {encounterDetailsData?.hivAidsAndOtherStdsEducation
                      ?.description || "-"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Grid>
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>{"FAMILY PLANNING"}</Typography>
                </Grid>
              </Box>
              <Grid sx={commonContainer}>
                <Box display={"flex"}>
                  <Typography sx={key}>{"Description :"}</Typography>
                  <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {encounterDetailsData?.familyPlannig?.description || "-"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Grid>
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>
                    {"REFERRALS FOR SERVICES"}
                  </Typography>
                </Grid>
              </Box>
              <Grid sx={commonContainer}>
                <Box display={"flex"}>
                  <Typography sx={key}>{"Description :"}</Typography>
                  <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {encounterDetailsData?.referralsForService?.description ||
                      "-"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Grid>
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>{"OTHERS"}</Typography>
                </Grid>
              </Box>
              <Grid sx={commonContainer}>
                <Box display={"flex"}>
                  <Typography sx={key}>{"Description :"}</Typography>
                  <Typography sx={{ ...key, pl: "12px" }}>{"-"}</Typography>
                  <Typography sx={{ ...val, pl: "12px" }}>
                    {encounterDetailsData?.others?.description || "-"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
}

export default CareEncounterTab;
