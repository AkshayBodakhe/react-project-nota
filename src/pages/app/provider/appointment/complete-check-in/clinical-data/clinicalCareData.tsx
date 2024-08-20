import { Box, Grid, Typography } from "@mui/material";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

import {
  useCarePatientChartControllerServiceGetAllCarePatientChart,
  useMedicationsControllerServiceGetPatientCurrentMedications,
} from "../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { useEffect, useRef, useState } from "react";
import { CarePatientChart } from "../../../../../../sdk/thinkemr-core-0.0.1/requests";
import {
  ADHERENCE_TITLE,
  FAMILY_PLANNING,
  HIV_AID_TITLE,
  OTHER,
  REFERRALS_FOR_SERVICES,
  RISK_SCREENING_TITLE,
  SOCIAL_ND_EVN_TITLE,
  STI_TESTING_AND_HISTORY,
  SUBSTANCE_PAGE_TITLE,
} from "../../../patient/patient-details/patient-chart-sidebar-components/adherence-to-treatment/common-const";
import { copiedStyle } from "./clinical-data";
import Loading from "../../../../../../components/common/spinner/loading";

interface ClinicalProps {
  patientUuid: string;
}

interface Item {
  name: string;
  description: string;
}

function ClinicalCareData(props: ClinicalProps) {
  const { patientUuid } = props;
  const [adherenceToTreatment, setAdherenceToTreatment] = useState<Item[]>([]);
  const [dataCopied, setAdherenceCopied] = useState(false);
  const adherenceRef = useRef<HTMLDivElement>(null);

  const [stitestingHistory, setStitestingHistory] = useState<Item[]>([]);
  const [diagnosisCopied, setDiagnosisCopied] = useState(false);
  const stitestingHistoryRef = useRef<HTMLDivElement>(null);

  const [substanceAbuseHistory, setSubstanceAbuseHistory] = useState<Item[]>(
    []
  );
  const [substanceCopied, setSubstanceCopied] = useState(false);
  const SubstanceRef = useRef<HTMLDivElement>(null);

  const [medicationsData, setMedcationsData] = useState<any[]>([]);
  const [medicationsCopied, setMedicationsCopied] = useState(false);
  const medRef = useRef<HTMLDivElement>(null);

  const [riskBehaviorScreening, setRiskBehaviorScreening] = useState<Item[]>(
    []
  );
  const [riskBehaviorScreeningCopied, setRiskBehaviorScreeningCopied] =
    useState(false);
  const riskBehaviorScreeningRef = useRef<HTMLDivElement>(null);

  const [housing, setHousing] = useState<Item[]>([]);
  const [housingCopied, setHousingCopied] = useState(false);
  const housingRef = useRef<HTMLDivElement>(null);

  const [sourcesOfIncome, setSourcesOfIncome] = useState<Item[]>([]);
  const [SourcesOfIncomeCopied, setSourcesOfIncomeCopied] = useState(false);
  const sourcesOfIncomeRef = useRef<HTMLDivElement>(null);

  const [emotionalSupport, setEmotionalSupport] = useState<Item[]>([]);
  const [emotionalSupportCopied, setEmotionalSupportCopied] = useState(false);
  const emotionalSupportRef = useRef<HTMLDivElement>(null);

  const [foodAssistance, setFoodAssistance] = useState<Item[]>([]);
  const [foodAssistanceCopied, setFoodAssistanceCopied] = useState(false);
  const foodAssistanceRef = useRef<HTMLDivElement>(null);

  const [transportation, setTransportation] = useState<Item[]>([]);
  const [transportationCopied, setTransportationCopied] = useState(false);
  const transportationRef = useRef<HTMLDivElement>(null);

  const [supportGroupFamily, setSupportGroupFamily] = useState<Item[]>([]);
  const [supportGroupFamilyCopied, setSupportGroupFamilyCopied] =
    useState(false);
  const supportGroupFamilyRef = useRef<HTMLDivElement>(null);

  const [historyOfIncarceration, setHistoryOfIncarceration] = useState<Item[]>(
    []
  );
  const [historyOfIncarcerationCopied, setHistoryOfIncarcerationCopied] =
    useState(false);
  const historyOfIncarcerationRef = useRef<HTMLDivElement>(null);

  const [hivAidsAndOtherStdEducation, setHivAidsAndOtherStdEducation] =
    useState<Item[]>([]);
  const [
    hivAidsAndOtherStdEducationCopied,
    setHivAidsAndOtherStdEducationCopied,
  ] = useState(false);
  const hivAidsAndOtherStdEducationRef = useRef<HTMLDivElement>(null);

  const [familyPlanning, setFamilyPlanning] = useState<Item[]>([]);
  const [familyPlanningCopied, setfamilyPlanningCopied] = useState(false);
  const familyPlanningRef = useRef<HTMLDivElement>(null);

  const [referralsForServices, setReferralsForServices] = useState<Item[]>([]);
  const [referralsForServicesCopied, setReferralsForServicesCopied] =
    useState(false);
  const referralsForServicesRef = useRef<HTMLDivElement>(null);

  const [others, setOthers] = useState<Item[]>([]);
  const [othersCopied, setOthersCopied] = useState(false);
  const othersRef = useRef<HTMLDivElement>(null);

  const copyToClipBoard = (div: any) => {
    if (div.current) {
      const range = document.createRange();
      range.selectNode(div.current);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      document.execCommand("copy");
      window.getSelection()?.removeAllRanges();
    }
  };

  const [pagination, setPagination] = useState({
    page: 0,
    size: 10000000,
    patientUuid: patientUuid,
    totalPages: 0,
    totalElements: 0,
  });

  const { data, isLoading, isError, refetch } =
    useCarePatientChartControllerServiceGetAllCarePatientChart({
      patientUuid: patientUuid,
      carePatientChartingType:
        CarePatientChart.carePatientChartingType.ADHERENCE_TO_TREATMENT,
      page: pagination.page,
      size: pagination.size,
      sort: ["created,desc"],
    });
  const {
    data: SubstanceAbuseHistoryData,
    isLoading: SubstanceAbuseHistoryIsLoading,
    isError: SubstanceAbuseHistoryIsError,
    refetch: refetchSubstanceAbuseHistory,
  } = useCarePatientChartControllerServiceGetAllCarePatientChart({
    patientUuid: patientUuid,
    carePatientChartingType:
      CarePatientChart.carePatientChartingType.SUBSTANCE_ABUSE_HISTORY,
    page: pagination.page,
    size: pagination.size,
    sort: ["created,desc"],
  });

  const {
    data: isSTITestingAndHistoryData,
    isLoading: STITestingAndHistoryIsLoading,
    isError: STITestingAndHistoryIsError,
    refetch: refetchSTITestingAndHistory,
  } = useCarePatientChartControllerServiceGetAllCarePatientChart({
    patientUuid: patientUuid,
    carePatientChartingType:
      CarePatientChart.carePatientChartingType.STI_TESTING_AND_HISTORY,
    page: pagination.page,
    size: pagination.size,
    sort: ["created,desc"],
  });

  const {
    data: isMediationsData,
    isLoading: MediationsDataIsLoading,
    isError: MediationsDataIsError,
    refetch: MediationsDataRefetch,
  } = useMedicationsControllerServiceGetPatientCurrentMedications({
    patientUuid: patientUuid,
    page: pagination.page,
    size: pagination.size,
    sort: ["created,desc"],
  });

  const {
    data: riskBehaviorScreeningData,
    isLoading: riskBehaviorScreeningIsLoadoing,
    isError: riskBehaviorScreeningIsError,
    refetch: refetchRiskBehaviorScreening,
  } = useCarePatientChartControllerServiceGetAllCarePatientChart({
    patientUuid: patientUuid,
    carePatientChartingType:
      CarePatientChart.carePatientChartingType.RISK_BEHAVIOR_SCREENING,
    page: pagination.page,
    size: pagination.size,
    sort: ["created,desc"],
  });

  const {
    data: hivAidsAndOtherStdEducationData,
    isLoading: hivAidsAndOtherStdEducationIsLoading,
    isError: hivAidsAndOtherStdEducationIsError,
    refetch: refetchHivAidsAndOtherStdEducation,
  } = useCarePatientChartControllerServiceGetAllCarePatientChart({
    patientUuid: patientUuid,
    carePatientChartingType:
      CarePatientChart.carePatientChartingType
        .HIV_AIDS_AND_OTHER_STDS_EDUCATION,
    page: pagination.page,
    size: pagination.size,
    sort: ["created,desc"],
  });

  const {
    data: familyPlanningData,
    isLoading: familyPlanningIsLoading,
    isError: familyPlanningIsError,
    refetch: refetchFamilyPlanning,
  } = useCarePatientChartControllerServiceGetAllCarePatientChart({
    patientUuid: patientUuid,
    carePatientChartingType:
      CarePatientChart.carePatientChartingType.FAMILY_PLANNING,
    page: pagination.page,
    size: pagination.size,
    sort: ["created,desc"],
  });

  const {
    data: referralsForServicesData,
    isLoading: referralsForServicesIsLoading,
    isError: referralsForServicesIsError,
    refetch: refetchReferralsForServices,
  } = useCarePatientChartControllerServiceGetAllCarePatientChart({
    patientUuid: patientUuid,
    carePatientChartingType:
      CarePatientChart.carePatientChartingType.REFERRALS_FOR_SERVICES,
    page: pagination.page,
    size: pagination.size,
    sort: ["created,desc"],
  });

  const {
    data: housingData,
    isLoading: housingIsLoading,
    isError: housingIsError,
  } = useCarePatientChartControllerServiceGetAllCarePatientChart({
    patientUuid: patientUuid,
    carePatientChartingType:
      CarePatientChart.carePatientChartingType.SOCIAL_AND_ENVIRONMENTAL_SUPPORT,
    socialAndEnvironmentalSupportType:
      CarePatientChart.socialAndEnvironmentalSupportType.HOUSING,
    page: pagination.page,
    size: pagination.size,
    sort: ["created,desc"],
  });
  const {
    data: sourcesOfIncomeData,
    isLoading: sourcesOfIncomeIsLoading,
    isError: sourcesOfIncomeIsError,
  } = useCarePatientChartControllerServiceGetAllCarePatientChart({
    patientUuid: patientUuid,
    carePatientChartingType:
      CarePatientChart.carePatientChartingType.SOCIAL_AND_ENVIRONMENTAL_SUPPORT,
    socialAndEnvironmentalSupportType:
      CarePatientChart.socialAndEnvironmentalSupportType
        .EMPLOYMENT_SOURCES_OF_INCOME,
    page: pagination.page,
    size: pagination.size,
    sort: ["created,desc"],
  });

  const {
    data: foodAssistanceData,
    isLoading: foodAssistanceIsLoading,
    isError: foodAssistanceIsError,
  } = useCarePatientChartControllerServiceGetAllCarePatientChart({
    patientUuid: patientUuid,
    carePatientChartingType:
      CarePatientChart.carePatientChartingType.SOCIAL_AND_ENVIRONMENTAL_SUPPORT,
    socialAndEnvironmentalSupportType:
      CarePatientChart.socialAndEnvironmentalSupportType.FOOD_ASSISTANCE,
    page: pagination.page,
    size: pagination.size,
    sort: ["created,desc"],
  });

  const {
    data: transportationData,
    isLoading: transportationIsLoading,
    isError: transportationIsError,
  } = useCarePatientChartControllerServiceGetAllCarePatientChart({
    patientUuid: patientUuid,
    carePatientChartingType:
      CarePatientChart.carePatientChartingType.SOCIAL_AND_ENVIRONMENTAL_SUPPORT,
    socialAndEnvironmentalSupportType:
      CarePatientChart.socialAndEnvironmentalSupportType.TRANSPORTATION,
    page: pagination.page,
    size: pagination.size,
    sort: ["created,desc"],
  });

  const {
    data: supportGroupFamilyData,
    isLoading: supportGroupFamilyIsLoading,
    isError: supportGroupFamilyIsError,
  } = useCarePatientChartControllerServiceGetAllCarePatientChart({
    patientUuid: patientUuid,
    carePatientChartingType:
      CarePatientChart.carePatientChartingType.SOCIAL_AND_ENVIRONMENTAL_SUPPORT,
    socialAndEnvironmentalSupportType:
      CarePatientChart.socialAndEnvironmentalSupportType.SUPPORT_GROUPS_FAMILY,
    page: pagination.page,
    size: pagination.size,
    sort: ["created,desc"],
  });

  const {
    data: historyOfIncarcerationData,
    isLoading: historyOfIncarcerationIsLoading,
    isError: historyOfIncarcerationIsError,
  } = useCarePatientChartControllerServiceGetAllCarePatientChart({
    patientUuid: patientUuid,
    carePatientChartingType:
      CarePatientChart.carePatientChartingType.SOCIAL_AND_ENVIRONMENTAL_SUPPORT,
    socialAndEnvironmentalSupportType:
      CarePatientChart.socialAndEnvironmentalSupportType
        .HISTORY_OF_INCARCERATION,
    page: pagination.page,
    size: pagination.size,
    sort: ["created,desc"],
  });

  const {
    data: emotionalSupportData,
    isLoading: emotionalSupportIsLoading,
    isError: emotionalSupportIsError,
  } = useCarePatientChartControllerServiceGetAllCarePatientChart({
    patientUuid: patientUuid,
    carePatientChartingType:
      CarePatientChart.carePatientChartingType.SOCIAL_AND_ENVIRONMENTAL_SUPPORT,
    socialAndEnvironmentalSupportType:
      CarePatientChart.socialAndEnvironmentalSupportType.EMOTIONAL_SUPPORT,
    page: pagination.page,
    size: pagination.size,
    sort: ["created,desc"],
  });

  const {
    data: othersData,
    isLoading: othersIsLoading,
    isError: othersIsError,
  } = useCarePatientChartControllerServiceGetAllCarePatientChart({
    patientUuid: patientUuid,
    carePatientChartingType: CarePatientChart.carePatientChartingType.OTHERS,
    page: pagination.page,
    size: pagination.size,
    sort: ["created,desc"],
  });

  useEffect(() => {
    if (data?.data) setAdherenceToTreatment(data?.data?.content || []);
  }, [data]);

  useEffect(() => {
    if (isSTITestingAndHistoryData?.data)
      setStitestingHistory(isSTITestingAndHistoryData?.data?.content);
  }, [isSTITestingAndHistoryData]);

  useEffect(() => {
    if (SubstanceAbuseHistoryData?.data)
      setSubstanceAbuseHistory(SubstanceAbuseHistoryData?.data?.content);
  }, [SubstanceAbuseHistoryData]);

  useEffect(() => {
    if (isMediationsData?.data)
      setMedcationsData(isMediationsData?.data?.content);
  }, [isMediationsData]);  

  useEffect(() => {
    if (riskBehaviorScreeningData?.data)
      setRiskBehaviorScreening(riskBehaviorScreeningData?.data?.content);
  }, [riskBehaviorScreeningData]);

  useEffect(() => {
    if (hivAidsAndOtherStdEducationData?.data)
      setHivAidsAndOtherStdEducation(
        hivAidsAndOtherStdEducationData?.data?.content
      );
  }, [hivAidsAndOtherStdEducationData]);

  useEffect(() => {
    if (familyPlanningData?.data)
      setFamilyPlanning(familyPlanningData?.data?.content);
  }, [familyPlanningData]);

  useEffect(() => {
    if (referralsForServicesData?.data)
      setReferralsForServices(referralsForServicesData?.data?.content);
  }, [referralsForServicesData]);

  useEffect(() => {
    if (housingData?.data) setHousing(housingData?.data?.content);
  }, [housingData]);

  useEffect(() => {
    if (sourcesOfIncomeData?.data)
      setSourcesOfIncome(sourcesOfIncomeData?.data?.content);
  }, [sourcesOfIncomeData]);

  useEffect(() => {
    if (emotionalSupportData?.data)
      setEmotionalSupport(emotionalSupportData?.data?.content);
  }, [emotionalSupportData]);

  useEffect(() => {
    if (foodAssistanceData?.data)
      setFoodAssistance(foodAssistanceData?.data?.content);
  }, [foodAssistanceData]);

  useEffect(() => {
    if (transportationData?.data)
      setTransportation(transportationData?.data?.content);
  }, [transportationData]);

  useEffect(() => {
    if (supportGroupFamilyData?.data)
      setSupportGroupFamily(supportGroupFamilyData?.data?.content);
  }, [supportGroupFamilyData]);

  useEffect(() => {
    if (historyOfIncarcerationData?.data)
      setHistoryOfIncarceration(historyOfIncarcerationData?.data?.content);
  }, [historyOfIncarcerationData]);

  useEffect(() => {
    if (othersData?.data) setOthers(othersData?.data?.content);
  }, [othersData]);
  return (
    <>
      <Box>
        <Grid
          sx={{
            border: "1px solid #c5c5c5",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography sx={{ color: "#2c57b3" }}>{ADHERENCE_TITLE}</Typography>
            <Box
              onClick={() => {
                copyToClipBoard(adherenceRef),
                  setAdherenceCopied((item) => !item);
              }}
              sx={{ display: "flex", gap: "3px", cursor: "pointer" }}
            >
              {!dataCopied ? (
                <>
                  <ContentCopyOutlinedIcon sx={{ color: "#2c57b3" }} />
                  <Typography sx={{ color: "#2c57b3" }}>Copy</Typography>
                </>
              ) : (
                <Box sx={copiedStyle}>
                  <ContentCopyOutlinedIcon sx={{ color: "#2c57b3" }} />
                  <Typography sx={{ color: "#2c57b3" }}>{"Copied"}</Typography>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid ref={adherenceRef}>
            {isLoading ? (
              <Loading />
            ) : isError ? (
              <Typography>Error occurred while fetching data</Typography>
            ) : adherenceToTreatment.length === 0 ? (
              <Typography>No Data Available</Typography>
            ) : (
              adherenceToTreatment?.map((item: any, index: number) => {
                return (
                  <Box
                    key={index}
                    display={"flex"}
                    flexDirection={"column"}
                    rowGap={0.5}
                    mt={1.5}
                  >
                    <Grid container gap={1.2} alignItems={"center"}>
                      <Typography variant="h5" sx={{ color: "black" }}>
                        {"Title"}
                      </Typography>
                      <Typography>:</Typography>
                      <Typography variant="h5" sx={{ color: "black" }}>
                        {item?.name || "-"}
                      </Typography>
                    </Grid>
                    <Grid container gap={1.2} alignItems={"center"}>
                      <Typography variant="h5" sx={{ color: "black" }}>
                        {"Note"}
                      </Typography>
                      <Typography>:</Typography>
                      <Typography variant="h5" sx={{ color: "black" }}>
                        {item?.description || "-"}
                      </Typography>
                    </Grid>
                  </Box>
                );
              })
            )}
          </Grid>
        </Grid>
        <Box py={1} />
        <Grid
          sx={{
            border: "1px solid #c5c5c5",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography sx={{ color: "#2c57b3" }}>
              {STI_TESTING_AND_HISTORY}
            </Typography>
            <Box
              onClick={() => {
                copyToClipBoard(stitestingHistoryRef),
                  setDiagnosisCopied((item) => !item);
              }}
              sx={{ display: "flex", gap: "3px", cursor: "pointer" }}
            >
              {!diagnosisCopied ? (
                <>
                  <ContentCopyOutlinedIcon sx={{ color: "#2c57b3" }} />
                  <Typography sx={{ color: "#2c57b3" }}>{"Copy"}</Typography>
                </>
              ) : (
                <Box sx={copiedStyle}>
                  <ContentCopyOutlinedIcon sx={{ color: "#2c57b3" }} />
                  <Typography sx={{ color: "#2c57b3" }}>{"Copied"}</Typography>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid ref={stitestingHistoryRef}>
            {STITestingAndHistoryIsLoading ? (
              <Loading />
            ) : STITestingAndHistoryIsError ? (
              <Typography>Error occurred while fetching data</Typography>
            ) : stitestingHistory.length === 0 ? (
              <Typography>No Data Available</Typography>
            ) : (
              stitestingHistory?.map((item: any, index: number) => {
                return (
                  <Box
                    key={index}
                    display={"flex"}
                    flexDirection={"column"}
                    rowGap={0.5}
                    mt={1.5}
                  >
                    <Grid container gap={1.2} alignItems={"center"}>
                      <Typography variant="h5" sx={{ color: "black" }}>
                        {"Title"}
                      </Typography>
                      <Typography>:</Typography>
                      <Typography variant="h5" sx={{ color: "black" }}>
                        {item?.name || "-"}
                      </Typography>
                    </Grid>
                    <Grid container gap={1.2} alignItems={"center"}>
                      <Typography variant="h5" sx={{ color: "black" }}>
                        {"Note"}
                      </Typography>
                      <Typography>:</Typography>
                      <Typography variant="h5" sx={{ color: "black" }}>
                        {item?.description || "-"}
                      </Typography>
                    </Grid>
                  </Box>
                );
              })
            )}
          </Grid>
        </Grid>
        <Box py={1} />
        <Grid
          sx={{
            border: "1px solid #c5c5c5",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography sx={{ color: "#2c57b3" }}>{"MEDICATIONS"}</Typography>
            <Box
              onClick={() => {
                copyToClipBoard(medRef), setMedicationsCopied((item) => !item);
              }}
              sx={{ display: "flex", gap: "3px", cursor: "pointer" }}
            >
              {!medicationsCopied ? (
                <>
                  <ContentCopyOutlinedIcon sx={{ color: "#2c57b3" }} />
                  <Typography sx={{ color: "#2c57b3" }}>Copy</Typography>
                </>
              ) : (
                <Box sx={copiedStyle}>
                  <ContentCopyOutlinedIcon sx={{ color: "#2c57b3" }} />
                  <Typography sx={{ color: "#2c57b3" }}>{"Copied"}</Typography>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid ref={medRef}>
            {MediationsDataIsLoading ? (
              <Loading />
            ) : MediationsDataIsError ? (
              <Typography>Error occurred while fetching data</Typography>
            ) : medicationsData.length === 0 ? (
              <Typography>No Data Available</Typography>
            ) : (
              medicationsData?.map((item:any,index:any) => {
                return (
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    rowGap={0.5}
                    mt={1.5}
                    key={index}
                  >
                    <Grid container gap={1.2} alignItems={"center"}>
                      <Typography variant="h5" sx={{ color: "black" }}>
                        {item?.drugCatalog?.medicine}
                      </Typography>
                    </Grid>
                    <Grid container gap={1.2} alignItems={"center"}>
                      <Typography variant="h5" sx={{ color: "#7b7b7b" }}>
                        {"Start Date"}
                      </Typography>
                      <Typography>:</Typography>
                      <Typography variant="h5" sx={{ color: "#7b7b7b" }}>
                        {item?.startDate}
                      </Typography>
                    </Grid>
                  </Box>
                );
              })
            )}
          </Grid>
        </Grid>
        <Box py={1} />
        <Grid
          sx={{
            border: "1px solid #c5c5c5",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography sx={{ color: "#2c57b3" }}>
              {SUBSTANCE_PAGE_TITLE}
            </Typography>
            <Box
              onClick={() => {
                copyToClipBoard(SubstanceRef),
                  setSubstanceCopied((item) => !item);
              }}
              sx={{ display: "flex", gap: "3px", cursor: "pointer" }}
            >
              {!substanceCopied ? (
                <>
                  <ContentCopyOutlinedIcon sx={{ color: "#2c57b3" }} />
                  <Typography sx={{ color: "#2c57b3" }}>Copy</Typography>
                </>
              ) : (
                <Box sx={copiedStyle}>
                  <ContentCopyOutlinedIcon sx={{ color: "#2c57b3" }} />
                  <Typography sx={{ color: "#2c57b3" }}>{"Copied"}</Typography>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid ref={SubstanceRef}>
            {SubstanceAbuseHistoryIsLoading ? (
              <Loading />
            ) : SubstanceAbuseHistoryIsError ? (
              <Typography>Error occurred while fetching data</Typography>
            ) : substanceAbuseHistory.length === 0 ? (
              <Typography>No Data Available</Typography>
            ) : (
              substanceAbuseHistory?.map((item: any, index: number) => {
                return (
                  <Box
                    key={index}
                    display={"flex"}
                    flexDirection={"column"}
                    rowGap={0.5}
                    mt={1.5}
                  >
                    <Grid container gap={1.2} alignItems={"center"}>
                      <Typography variant="h5" sx={{ color: "black" }}>
                        {"Title"}
                      </Typography>
                      <Typography>:</Typography>
                      <Typography variant="h5" sx={{ color: "black" }}>
                        {item?.name || "-"}
                      </Typography>
                    </Grid>
                    <Grid container gap={1.2} alignItems={"center"}>
                      <Typography variant="h5" sx={{ color: "black" }}>
                        {"Note"}
                      </Typography>
                      <Typography>:</Typography>
                      <Typography variant="h5" sx={{ color: "black" }}>
                        {item?.description || "-"}
                      </Typography>
                    </Grid>
                  </Box>
                );
              })
            )}
          </Grid>
        </Grid>
        <Box py={1} />
        <Grid
          sx={{
            border: "1px solid #c5c5c5",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography sx={{ color: "#2c57b3" }}>
              {RISK_SCREENING_TITLE}
            </Typography>
            <Box
              onClick={() => {
                copyToClipBoard(riskBehaviorScreeningRef),
                  setRiskBehaviorScreeningCopied((item) => !item);
              }}
              sx={{ display: "flex", gap: "3px", cursor: "pointer" }}
            >
              {!riskBehaviorScreeningCopied ? (
                <>
                  <ContentCopyOutlinedIcon sx={{ color: "#2c57b3" }} />
                  <Typography sx={{ color: "#2c57b3" }}>Copy</Typography>
                </>
              ) : (
                <Box sx={copiedStyle}>
                  <ContentCopyOutlinedIcon sx={{ color: "#2c57b3" }} />
                  <Typography sx={{ color: "#2c57b3" }}>{"Copied"}</Typography>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid ref={riskBehaviorScreeningRef}>
            {riskBehaviorScreeningIsLoadoing ? (
              <Loading />
            ) : riskBehaviorScreeningIsError ? (
              <Typography>Error occurred while fetching data</Typography>
            ) : riskBehaviorScreening.length === 0 ? (
              <Typography>No Data Available</Typography>
            ) : (
              riskBehaviorScreening?.map((item: any, index: number) => {
                return (
                  <Box
                    key={index}
                    display={"flex"}
                    flexDirection={"column"}
                    rowGap={0.5}
                    mt={1.5}
                  >
                    <Grid container gap={1.2} alignItems={"center"}>
                      <Typography variant="h5" sx={{ color: "black" }}>
                        {"Title"}
                      </Typography>
                      <Typography>:</Typography>
                      <Typography variant="h5" sx={{ color: "black" }}>
                        {item?.name || "-"}
                      </Typography>
                    </Grid>
                    <Grid container gap={1.2} alignItems={"center"}>
                      <Typography variant="h5" sx={{ color: "black" }}>
                        {"Note"}
                      </Typography>
                      <Typography>:</Typography>
                      <Typography variant="h5" sx={{ color: "black" }}>
                        {item?.description || "-"}
                      </Typography>
                    </Grid>
                  </Box>
                );
              })
            )}
          </Grid>
        </Grid>
        <Box py={1} />
        <Grid
          sx={{
            border: "1px solid #c5c5c5",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          <Typography sx={{ color: "#2c57b3" }}>
            {SOCIAL_ND_EVN_TITLE}
          </Typography>
          <hr />
          <Grid>
            <Grid
              container
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography sx={{ color: "#2c57b3" }}>{"Housing"}</Typography>
              <Box
                onClick={() => {
                  copyToClipBoard(housingRef),
                    setHousingCopied((item) => !item);
                }}
                sx={{ display: "flex", gap: "3px", cursor: "pointer" }}
              >
                {!housingCopied ? (
                  <>
                    <ContentCopyOutlinedIcon sx={{ color: "#2c57b3" }} />
                    <Typography sx={{ color: "#2c57b3" }}>Copy</Typography>
                  </>
                ) : (
                  <Box sx={copiedStyle}>
                    <ContentCopyOutlinedIcon sx={{ color: "#2c57b3" }} />
                    <Typography sx={{ color: "#2c57b3" }}>
                      {"Copied"}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid ref={housingRef}>
              {housingIsLoading ? (
                <Loading />
              ) : housingIsError ? (
                <Typography>Error occurred while fetching data</Typography>
              ) : housing.length === 0 ? (
                <Typography>No Data Available</Typography>
              ) : (
                housing?.map((item: any, index: number) => {
                  return (
                    <Box
                      key={index}
                      display={"flex"}
                      flexDirection={"column"}
                      rowGap={0.5}
                      mt={1.5}
                    >
                      <Grid container gap={1.2} alignItems={"center"}>
                        <Typography variant="h5" sx={{ color: "black" }}>
                          {"Title"}
                        </Typography>
                        <Typography>:</Typography>
                        <Typography variant="h5" sx={{ color: "black" }}>
                          {item?.name || "-"}
                        </Typography>
                      </Grid>
                      <Grid container gap={1.2} alignItems={"center"}>
                        <Typography variant="h5" sx={{ color: "black" }}>
                          {"Note"}
                        </Typography>
                        <Typography>:</Typography>
                        <Typography variant="h5" sx={{ color: "black" }}>
                          {item?.description || "-"}
                        </Typography>
                      </Grid>
                    </Box>
                  );
                })
              )}
            </Grid>
            <hr />
            <Grid
              container
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography sx={{ color: "#2c57b3" }}>
                {"Employment/Sources Of Income"}
              </Typography>
              <Box
                onClick={() => {
                  copyToClipBoard(sourcesOfIncomeRef),
                    setSourcesOfIncomeCopied((item) => !item);
                }}
                sx={{ display: "flex", gap: "3px", cursor: "pointer" }}
              >
                {!SourcesOfIncomeCopied ? (
                  <>
                    <ContentCopyOutlinedIcon sx={{ color: "#2c57b3" }} />
                    <Typography sx={{ color: "#2c57b3" }}>Copy</Typography>
                  </>
                ) : (
                  <Box sx={copiedStyle}>
                    <ContentCopyOutlinedIcon sx={{ color: "#2c57b3" }} />
                    <Typography sx={{ color: "#2c57b3" }}>
                      {"Copied"}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid ref={sourcesOfIncomeRef}>
              {sourcesOfIncomeIsLoading ? (
                <Loading />
              ) : sourcesOfIncomeIsError ? (
                <Typography>Error occurred while fetching data</Typography>
              ) : sourcesOfIncome.length === 0 ? (
                <Typography>No Data Available</Typography>
              ) : (
                sourcesOfIncome?.map((item: any, index: number) => {
                  return (
                    <Box
                      key={index}
                      display={"flex"}
                      flexDirection={"column"}
                      rowGap={0.5}
                      mt={1.5}
                    >
                      <Grid container gap={1.2} alignItems={"center"}>
                        <Typography variant="h5" sx={{ color: "black" }}>
                          {"Title"}
                        </Typography>
                        <Typography>:</Typography>
                        <Typography variant="h5" sx={{ color: "black" }}>
                          {item?.name || "-"}
                        </Typography>
                      </Grid>
                      <Grid container gap={1.2} alignItems={"center"}>
                        <Typography variant="h5" sx={{ color: "black" }}>
                          {"Note"}
                        </Typography>
                        <Typography>:</Typography>
                        <Typography variant="h5" sx={{ color: "black" }}>
                          {item?.description || "-"}
                        </Typography>
                      </Grid>
                    </Box>
                  );
                })
              )}
            </Grid>
            <hr />
            <Grid
              container
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography sx={{ color: "#2c57b3" }}>
                {"Emotional Support"}
              </Typography>
              <Box
                onClick={() => {
                  copyToClipBoard(emotionalSupportRef),
                    setEmotionalSupportCopied((item) => !item);
                }}
                sx={{ display: "flex", gap: "3px", cursor: "pointer" }}
              >
                {!emotionalSupportCopied ? (
                  <>
                    <ContentCopyOutlinedIcon sx={{ color: "#2c57b3" }} />
                    <Typography sx={{ color: "#2c57b3" }}>Copy</Typography>
                  </>
                ) : (
                  <Box sx={copiedStyle}>
                    <ContentCopyOutlinedIcon sx={{ color: "#2c57b3" }} />
                    <Typography sx={{ color: "#2c57b3" }}>
                      {"Copied"}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid ref={emotionalSupportRef}>
              {emotionalSupportIsLoading ? (
                <Loading />
              ) : emotionalSupportIsError ? (
                <Typography>Error occurred while fetching data</Typography>
              ) : emotionalSupport.length === 0 ? (
                <Typography>No Data Available</Typography>
              ) : (
                emotionalSupport?.map((item: any, index: number) => {
                  return (
                    <Box
                      key={index}
                      display={"flex"}
                      flexDirection={"column"}
                      rowGap={0.5}
                      mt={1.5}
                    >
                      <Grid container gap={1.2} alignItems={"center"}>
                        <Typography variant="h5" sx={{ color: "black" }}>
                          {"Title"}
                        </Typography>
                        <Typography>:</Typography>
                        <Typography variant="h5" sx={{ color: "black" }}>
                          {item?.name || "-"}
                        </Typography>
                      </Grid>
                      <Grid container gap={1.2} alignItems={"center"}>
                        <Typography variant="h5" sx={{ color: "black" }}>
                          {"Note"}
                        </Typography>
                        <Typography>:</Typography>
                        <Typography variant="h5" sx={{ color: "black" }}>
                          {item?.description || "-"}
                        </Typography>
                      </Grid>
                    </Box>
                  );
                })
              )}
            </Grid>
            <hr />
            <Grid
              container
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography sx={{ color: "#2c57b3" }}>
                {"Food Assistance"}
              </Typography>
              <Box
                onClick={() => {
                  copyToClipBoard(foodAssistanceRef),
                    setFoodAssistanceCopied((item) => !item);
                }}
                sx={{ display: "flex", gap: "3px", cursor: "pointer" }}
              >
                {!foodAssistanceCopied ? (
                  <>
                    <ContentCopyOutlinedIcon sx={{ color: "#2c57b3" }} />
                    <Typography sx={{ color: "#2c57b3" }}>Copy</Typography>
                  </>
                ) : (
                  <Box sx={copiedStyle}>
                    <ContentCopyOutlinedIcon sx={{ color: "#2c57b3" }} />
                    <Typography sx={{ color: "#2c57b3" }}>
                      {"Copied"}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid ref={foodAssistanceRef}>
              {foodAssistanceIsLoading ? (
                <Loading />
              ) : foodAssistanceIsError ? (
                <Typography>Error occurred while fetching data</Typography>
              ) : foodAssistance.length === 0 ? (
                <Typography>No Data Available</Typography>
              ) : (
                foodAssistance?.map((item: any, index: number) => {
                  return (
                    <Box
                      key={index}
                      display={"flex"}
                      flexDirection={"column"}
                      rowGap={0.5}
                      mt={1.5}
                    >
                      <Grid container gap={1.2} alignItems={"center"}>
                        <Typography variant="h5" sx={{ color: "black" }}>
                          {"Title"}
                        </Typography>
                        <Typography>:</Typography>
                        <Typography variant="h5" sx={{ color: "black" }}>
                          {item?.name || "-"}
                        </Typography>
                      </Grid>
                      <Grid container gap={1.2} alignItems={"center"}>
                        <Typography variant="h5" sx={{ color: "black" }}>
                          {"Note"}
                        </Typography>
                        <Typography>:</Typography>
                        <Typography variant="h5" sx={{ color: "black" }}>
                          {item?.description || "-"}
                        </Typography>
                      </Grid>
                    </Box>
                  );
                })
              )}
            </Grid>
            <hr />
            <Grid
              container
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography sx={{ color: "#2c57b3" }}>
                {"Transportation"}
              </Typography>
              <Box
                onClick={() => {
                  copyToClipBoard(transportationRef),
                    setTransportationCopied((item) => !item);
                }}
                sx={{ display: "flex", gap: "3px", cursor: "pointer" }}
              >
                {!transportationCopied ? (
                  <>
                    <ContentCopyOutlinedIcon sx={{ color: "#2c57b3" }} />
                    <Typography sx={{ color: "#2c57b3" }}>Copy</Typography>
                  </>
                ) : (
                  <Box sx={copiedStyle}>
                    <ContentCopyOutlinedIcon sx={{ color: "#2c57b3" }} />
                    <Typography sx={{ color: "#2c57b3" }}>
                      {"Copied"}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid ref={transportationRef}>
              {transportationIsLoading ? (
                <Loading />
              ) : transportationIsError ? (
                <Typography>Error occurred while fetching data</Typography>
              ) : transportation.length === 0 ? (
                <Typography>No Data Available</Typography>
              ) : (
                transportation?.map((item: any, index: number) => {
                  return (
                    <Box
                      key={index}
                      display={"flex"}
                      flexDirection={"column"}
                      rowGap={0.5}
                      mt={1.5}
                    >
                      <Grid container gap={1.2} alignItems={"center"}>
                        <Typography variant="h5" sx={{ color: "black" }}>
                          {"Title"}
                        </Typography>
                        <Typography>:</Typography>
                        <Typography variant="h5" sx={{ color: "black" }}>
                          {item?.name || "-"}
                        </Typography>
                      </Grid>
                      <Grid container gap={1.2} alignItems={"center"}>
                        <Typography variant="h5" sx={{ color: "black" }}>
                          {"Note"}
                        </Typography>
                        <Typography>:</Typography>
                        <Typography variant="h5" sx={{ color: "black" }}>
                          {item?.description || "-"}
                        </Typography>
                      </Grid>
                    </Box>
                  );
                })
              )}
            </Grid>
            <hr />
            <Grid
              container
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography sx={{ color: "#2c57b3" }}>
                {"Support Group/Family"}
              </Typography>
              <Box
                onClick={() => {
                  copyToClipBoard(supportGroupFamilyRef),
                    setSupportGroupFamilyCopied((item) => !item);
                }}
                sx={{ display: "flex", gap: "3px", cursor: "pointer" }}
              >
                {!supportGroupFamilyCopied ? (
                  <>
                    <ContentCopyOutlinedIcon sx={{ color: "#2c57b3" }} />
                    <Typography sx={{ color: "#2c57b3" }}>Copy</Typography>
                  </>
                ) : (
                  <Box sx={copiedStyle}>
                    <ContentCopyOutlinedIcon sx={{ color: "#2c57b3" }} />
                    <Typography sx={{ color: "#2c57b3" }}>
                      {"Copied"}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid ref={supportGroupFamilyRef}>
              {supportGroupFamilyIsLoading ? (
                <Loading />
              ) : supportGroupFamilyIsError ? (
                <Typography>Error occurred while fetching data</Typography>
              ) : supportGroupFamily.length === 0 ? (
                <Typography>No Data Available</Typography>
              ) : (
                supportGroupFamily?.map((item: any, index: number) => {
                  return (
                    <Box
                      key={index}
                      display={"flex"}
                      flexDirection={"column"}
                      rowGap={0.5}
                      mt={1.5}
                    >
                      <Grid container gap={1.2} alignItems={"center"}>
                        <Typography variant="h5" sx={{ color: "black" }}>
                          {"Title"}
                        </Typography>
                        <Typography>:</Typography>
                        <Typography variant="h5" sx={{ color: "black" }}>
                          {item?.name || "-"}
                        </Typography>
                      </Grid>
                      <Grid container gap={1.2} alignItems={"center"}>
                        <Typography variant="h5" sx={{ color: "black" }}>
                          {"Note"}
                        </Typography>
                        <Typography>:</Typography>
                        <Typography variant="h5" sx={{ color: "black" }}>
                          {item?.description || "-"}
                        </Typography>
                      </Grid>
                    </Box>
                  );
                })
              )}
            </Grid>
            <hr />
            <Grid
              container
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography sx={{ color: "#2c57b3" }}>
                {"History of Incarceration"}
              </Typography>
              <Box
                onClick={() => {
                  copyToClipBoard(historyOfIncarcerationRef),
                    setHistoryOfIncarcerationCopied((item) => !item);
                }}
                sx={{ display: "flex", gap: "3px", cursor: "pointer" }}
              >
                {!historyOfIncarcerationCopied ? (
                  <>
                    <ContentCopyOutlinedIcon sx={{ color: "#2c57b3" }} />
                    <Typography sx={{ color: "#2c57b3" }}>Copy</Typography>
                  </>
                ) : (
                  <Box sx={copiedStyle}>
                    <ContentCopyOutlinedIcon sx={{ color: "#2c57b3" }} />
                    <Typography sx={{ color: "#2c57b3" }}>
                      {"Copied"}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid ref={historyOfIncarcerationRef}>
              {historyOfIncarcerationIsLoading ? (
                <Loading />
              ) : historyOfIncarcerationIsError ? (
                <Typography>Error occurred while fetching data</Typography>
              ) : historyOfIncarceration.length === 0 ? (
                <Typography>No Data Available</Typography>
              ) : (
                historyOfIncarceration?.map((item: any, index: number) => {
                  return (
                    <Box
                      key={index}
                      display={"flex"}
                      flexDirection={"column"}
                      rowGap={0.5}
                      mt={1.5}
                    >
                      <Grid container gap={1.2} alignItems={"center"}>
                        <Typography variant="h5" sx={{ color: "black" }}>
                          {"Title"}
                        </Typography>
                        <Typography>:</Typography>
                        <Typography variant="h5" sx={{ color: "black" }}>
                          {item?.name || "-"}
                        </Typography>
                      </Grid>
                      <Grid container gap={1.2} alignItems={"center"}>
                        <Typography variant="h5" sx={{ color: "black" }}>
                          {"Note"}
                        </Typography>
                        <Typography>:</Typography>
                        <Typography variant="h5" sx={{ color: "black" }}>
                          {item?.description || "-"}
                        </Typography>
                      </Grid>
                    </Box>
                  );
                })
              )}
            </Grid>
          </Grid>
        </Grid>
        <Box py={1} />
        <Grid
          sx={{
            border: "1px solid #c5c5c5",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography sx={{ color: "#2c57b3" }}>{HIV_AID_TITLE}</Typography>
            <Box
              onClick={() => {
                copyToClipBoard(hivAidsAndOtherStdEducationRef),
                  setHivAidsAndOtherStdEducationCopied((item) => !item);
              }}
              sx={{ display: "flex", gap: "3px", cursor: "pointer" }}
            >
              {!hivAidsAndOtherStdEducationCopied ? (
                <>
                  <ContentCopyOutlinedIcon sx={{ color: "#2c57b3" }} />
                  <Typography sx={{ color: "#2c57b3" }}>Copy</Typography>
                </>
              ) : (
                <Box sx={copiedStyle}>
                  <ContentCopyOutlinedIcon sx={{ color: "#2c57b3" }} />
                  <Typography sx={{ color: "#2c57b3" }}>{"Copied"}</Typography>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid ref={hivAidsAndOtherStdEducationRef}>
            {hivAidsAndOtherStdEducationIsLoading ? (
              <Loading />
            ) : hivAidsAndOtherStdEducationIsError ? (
              <Typography>Error occurred while fetching data</Typography>
            ) : hivAidsAndOtherStdEducation.length === 0 ? (
              <Typography>No Data Available</Typography>
            ) : (
              hivAidsAndOtherStdEducation?.map((item: any, index: number) => {
                return (
                  <Box
                    key={index}
                    display={"flex"}
                    flexDirection={"column"}
                    rowGap={0.5}
                    mt={1.5}
                  >
                    <Grid container gap={1.2} alignItems={"center"}>
                      <Typography variant="h5" sx={{ color: "black" }}>
                        {"Title"}
                      </Typography>
                      <Typography>:</Typography>
                      <Typography variant="h5" sx={{ color: "black" }}>
                        {item?.name || "-"}
                      </Typography>
                    </Grid>
                    <Grid container gap={1.2} alignItems={"center"}>
                      <Typography variant="h5" sx={{ color: "black" }}>
                        {"Note"}
                      </Typography>
                      <Typography>:</Typography>
                      <Typography variant="h5" sx={{ color: "black" }}>
                        {item?.description || "-"}
                      </Typography>
                    </Grid>
                  </Box>
                );
              })
            )}
          </Grid>
        </Grid>
        <Box py={1} />
        <Grid
          sx={{
            border: "1px solid #c5c5c5",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography sx={{ color: "#2c57b3" }}>{FAMILY_PLANNING}</Typography>
            <Box
              onClick={() => {
                copyToClipBoard(familyPlanningRef),
                  setfamilyPlanningCopied((item) => !item);
              }}
              sx={{ display: "flex", gap: "3px", cursor: "pointer" }}
            >
              {!familyPlanningCopied ? (
                <>
                  <ContentCopyOutlinedIcon sx={{ color: "#2c57b3" }} />
                  <Typography sx={{ color: "#2c57b3" }}>Copy</Typography>
                </>
              ) : (
                <Box sx={copiedStyle}>
                  <ContentCopyOutlinedIcon sx={{ color: "#2c57b3" }} />
                  <Typography sx={{ color: "#2c57b3" }}>{"Copied"}</Typography>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid ref={familyPlanningRef}>
            {familyPlanningIsLoading ? (
              <Loading />
            ) : familyPlanningIsError ? (
              <Typography>Error occurred while fetching data</Typography>
            ) : familyPlanning.length === 0 ? (
              <Typography>No Data Available</Typography>
            ) : (
              familyPlanning?.map((item: any, index: number) => {
                return (
                  <Box
                    key={index}
                    display={"flex"}
                    flexDirection={"column"}
                    rowGap={0.5}
                    mt={1.5}
                  >
                    <Grid container gap={1.2} alignItems={"center"}>
                      <Typography variant="h5" sx={{ color: "black" }}>
                        {"Title"}
                      </Typography>
                      <Typography>:</Typography>
                      <Typography variant="h5" sx={{ color: "black" }}>
                        {item?.name || "-"}
                      </Typography>
                    </Grid>
                    <Grid container gap={1.2} alignItems={"center"}>
                      <Typography variant="h5" sx={{ color: "black" }}>
                        {"Note"}
                      </Typography>
                      <Typography>:</Typography>
                      <Typography variant="h5" sx={{ color: "black" }}>
                        {item?.description || "-"}
                      </Typography>
                    </Grid>
                  </Box>
                );
              })
            )}
          </Grid>
        </Grid>
        <Box py={1} />
        <Grid
          sx={{
            border: "1px solid #c5c5c5",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography sx={{ color: "#2c57b3" }}>
              {REFERRALS_FOR_SERVICES}
            </Typography>
            <Box
              onClick={() => {
                copyToClipBoard(referralsForServicesRef),
                  setReferralsForServicesCopied((item) => !item);
              }}
              sx={{ display: "flex", gap: "3px", cursor: "pointer" }}
            >
              {!referralsForServicesCopied ? (
                <>
                  <ContentCopyOutlinedIcon sx={{ color: "#2c57b3" }} />
                  <Typography sx={{ color: "#2c57b3" }}>Copy</Typography>
                </>
              ) : (
                <Box sx={copiedStyle}>
                  <ContentCopyOutlinedIcon sx={{ color: "#2c57b3" }} />
                  <Typography sx={{ color: "#2c57b3" }}>{"Copied"}</Typography>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid ref={referralsForServicesRef}>
            {referralsForServicesIsLoading ? (
              <Loading />
            ) : referralsForServicesIsError ? (
              <Typography>Error occurred while fetching data</Typography>
            ) : referralsForServices.length === 0 ? (
              <Typography>No Data Available</Typography>
            ) : (
              referralsForServices?.map((item: any, index: number) => {
                return (
                  <Box
                    key={index}
                    display={"flex"}
                    flexDirection={"column"}
                    rowGap={0.5}
                    mt={1.5}
                  >
                    <Grid container gap={1.2} alignItems={"center"}>
                      <Typography variant="h5" sx={{ color: "black" }}>
                        {"Title"}
                      </Typography>
                      <Typography>:</Typography>
                      <Typography variant="h5" sx={{ color: "black" }}>
                        {item?.name || "-"}
                      </Typography>
                    </Grid>
                    <Grid container gap={1.2} alignItems={"center"}>
                      <Typography variant="h5" sx={{ color: "black" }}>
                        {"Note"}
                      </Typography>
                      <Typography>:</Typography>
                      <Typography variant="h5" sx={{ color: "black" }}>
                        {item?.description || "-"}
                      </Typography>
                    </Grid>
                  </Box>
                );
              })
            )}
          </Grid>
        </Grid>
        <Box py={1} />
        <Grid
          sx={{
            border: "1px solid #c5c5c5",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography sx={{ color: "#2c57b3" }}>{OTHER}</Typography>
            <Box
              onClick={() => {
                copyToClipBoard(othersRef), setOthersCopied((item) => !item);
              }}
              sx={{ display: "flex", gap: "3px", cursor: "pointer" }}
            >
              {!othersCopied ? (
                <>
                  <ContentCopyOutlinedIcon sx={{ color: "#2c57b3" }} />
                  <Typography sx={{ color: "#2c57b3" }}>Copy</Typography>
                </>
              ) : (
                <Box sx={copiedStyle}>
                  <ContentCopyOutlinedIcon sx={{ color: "#2c57b3" }} />
                  <Typography sx={{ color: "#2c57b3" }}>{"Copied"}</Typography>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid ref={othersRef}>
            {others?.map((item: any, index: number) => {
              return (
                <Box
                  key={index}
                  display={"flex"}
                  flexDirection={"column"}
                  rowGap={0.5}
                  mt={1.5}
                >
                  <Grid container gap={1.2} alignItems={"center"}>
                    <Typography variant="h5" sx={{ color: "black" }}>
                      {"Title"}
                    </Typography>
                    <Typography>:</Typography>
                    <Typography variant="h5" sx={{ color: "black" }}>
                      {item?.name || "-"}
                    </Typography>
                  </Grid>
                  <Grid container gap={1.2} alignItems={"center"}>
                    <Typography variant="h5" sx={{ color: "black" }}>
                      {"Note"}
                    </Typography>
                    <Typography>:</Typography>
                    <Typography variant="h5" sx={{ color: "black" }}>
                      {item?.description || "-"}
                    </Typography>
                  </Grid>
                </Box>
              );
            })}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default ClinicalCareData;
