import { Box, Grid, Typography } from "@mui/material";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import lungs from "../../../../../../assets/icon/lungs.png";
import heartIcon from "../../../../../../assets/icon/heart-rate.png";
import bodyMassIndex from "../../../../../../assets/icon/body-mass-index.png";
import {
  useAllergyControllerServiceGetPatientAllergies,
  useMedicationsControllerServiceGetPatientMedications,
  useProblemsControllerServiceGetPatientProblems,
  useVaccineControllerServiceGetPatientVaccineDetails,
  useVitalControllerServiceGetPatientVitalRecordsByPatientId,
} from "../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { useEffect, useRef, useState } from "react";
import { toCamelCase } from "../../../../../../components/core/add-edit-staff-user/add-edit-staff-user";
import { PatientAllergy } from "../../../../../../sdk/thinkemr-core-0.0.1/requests";
import moment from "moment";

export const vitalsStyle = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
  cursor: "pointer",
};

export const copiedStyle = {
  display: "flex",
  background: "#e1effb",
  borderRadius: "10px",
  padding: "0px 5px",
};

interface ClinicalProps {
  setCountAllergy?: any;
  patientUuid: string;
}

function ClinicalData(props: ClinicalProps) {
  const { setCountAllergy, patientUuid } = props;
  const [allergiesData, setAllergiesData] = useState<PatientAllergy[]>();
  const [diagnosisData, setDiagnosisData] = useState<any[]>();
  const [medicationsData, setMedcationsData] = useState<any[]>();
  const [patientVaccineData, setPatientVaccineData] = useState<any[]>();
  const [vitals, setVitalData] = useState<any[]>([]);
  const [dataCopied, setAllergiesCopied] = useState(false);
  const [diagnosisCopied, setDiagnosisCopied] = useState(false);
  const [medicationsCopied, setMedicationsCopied] = useState(false);
  const [vaccineCopied, setVaccineCopied] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const diagnosisRef = useRef<HTMLDivElement>(null);
  const medRef = useRef<HTMLDivElement>(null);
  const vaccineRef = useRef<HTMLDivElement>(null);

  const l1 = vitals?.map((item: any) => item);
  const l2 = l1[0]?.details?.map((item: any) => item);

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
    size: 10,
    patientUuid: patientUuid,
    totalPages: 0,
    totalElements: 0,
  });

  const { data, isLoading, refetch } =
    useAllergyControllerServiceGetPatientAllergies({
      page: pagination.page,
      patientUuid: pagination.patientUuid,
      size: pagination.size,
    });

  const {
    refetch: refetchDiagnose,
    data: isDiagnoseData,
    isLoading: diagnoseIsLoading,
  } = useProblemsControllerServiceGetPatientProblems({
    patientUuid: pagination.patientUuid,
    page: pagination.page,
    size: pagination.size,
  });

  const { data: isMediationsData } =
    useMedicationsControllerServiceGetPatientMedications({
      patientUuid: patientUuid,
      pageable: {
        page: 0,
        size: 10,
      },
    });

  const { data: patientVaccine } =
    useVaccineControllerServiceGetPatientVaccineDetails({
      page: pagination.page,
      size: pagination.size,
      uuid: patientUuid,
    });

  const { data: vitalData } =
    useVitalControllerServiceGetPatientVitalRecordsByPatientId({
      patientUuid: patientUuid,
      page: 0,
      size: 500,
    });

  useEffect(() => {
    if (data?.data) {
      setAllergiesData(data?.data?.content);
      setCountAllergy(data?.data?.content?.length);
    }
  }, [data]);

  useEffect(() => {
    if (isDiagnoseData?.data) {
      setDiagnosisData(isDiagnoseData?.data?.content);
    }
  }, [isDiagnoseData]);

  useEffect(() => {
    if (isMediationsData?.data) {
      setMedcationsData(isMediationsData?.data?.currentPatientMedicationList);
    }
  }, [isMediationsData]);

  useEffect(() => {
    if (patientVaccine?.data) {
      setPatientVaccineData(patientVaccine?.data?.content);
    }
  }, [patientVaccine]);

  useEffect(() => {
    if (vitalData) {
      setVitalData(vitalData?.data?.content);
    }
  }, [vitalData]);

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
            <Typography sx={{ color: "#2c57b3" }}>{"ALLERGIES"}</Typography>
            <Box
              onClick={() => {
                copyToClipBoard(divRef), setAllergiesCopied((item) => !item);
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
          <Grid ref={divRef}>
            {allergiesData?.map((item: any) => {
              return (
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  rowGap={0.5}
                  mt={1.5}
                >
                  {item.allergy !== null && (
                    <Grid container gap={1.2} alignItems={"center"}>
                      <Typography variant="h5" sx={{ color: "black" }}>
                        {item?.allergy || "-"}
                      </Typography>
                      <Typography>:</Typography>
                      <Typography variant="h5" sx={{ color: "black" }}>
                        {toCamelCase(item?.allergyType) || "-"}
                      </Typography>
                      <Typography>:</Typography>
                      <Typography variant="h5" sx={{ color: "black" }}>
                        {toCamelCase(item?.reaction) || "-"}
                      </Typography>
                      <Typography>:</Typography>
                      <Typography variant="h5" sx={{ color: "black" }}>
                        {toCamelCase(item?.severity) || "-"}
                      </Typography>
                    </Grid>
                  )}
                  {item?.onSetDate !== null && (
                    <Grid container gap={1.2} alignItems={"center"}>
                      <Typography variant="h5" sx={{ color: "#7b7b7b" }}>
                        {"Onset Date"}
                      </Typography>
                      <Typography>:</Typography>
                      <Typography variant="h5" sx={{ color: "#7b7b7b" }}>
                        {item?.onSetDate || "-"}
                      </Typography>
                    </Grid>
                  )}
                </Box>
              );
            })}
            {allergiesData?.length === 0 && (
              <Box>
                <Typography>{"No allergy present"}</Typography>
              </Box>
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
            <Typography sx={{ color: "#2c57b3" }}>{"DIAGNOSIS"}</Typography>
            <Box
              onClick={() => {
                copyToClipBoard(diagnosisRef),
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
          <Grid ref={diagnosisRef}>
            {diagnosisData?.map((item) => {
              return (
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  rowGap={0.5}
                  mt={1.5}
                >
                  <Grid container gap={1.2} alignItems={"center"}>
                    <Typography variant="h5" sx={{ color: "black" }}>
                      {item?.billingCodes?.description || "-"}
                    </Typography>
                    <Typography
                      noWrap
                      title={item?.note}
                      variant="h5"
                      sx={{ color: "black" }}
                    >
                      {item?.note || "-"}
                    </Typography>
                    <Typography variant="h5" sx={{ color: "#7b7b7b" }}>
                      {item?.type || "-"}
                    </Typography>
                  </Grid>
                  <Grid container gap={1.2} alignItems={"center"}>
                    <Typography variant="h5" sx={{ color: "#7b7b7b" }}>
                      {"Onset Date"}
                    </Typography>
                    <Typography>:</Typography>
                    <Typography variant="h5" sx={{ color: "#7b7b7b" }}>
                      {item?.diagnosedDate
                        ? moment(item?.diagnosedDate).format("MM-DD-YYYY")
                        : "-"}
                    </Typography>
                  </Grid>
                </Box>
              );
            })}
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
            {medicationsData?.map((item) => {
              return (
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  rowGap={0.5}
                  mt={1.5}
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
                      {item?.startDate
                        ? moment(item?.startDate).format("MM-DD-YYYY")
                        : "-"}
                    </Typography>
                  </Grid>
                </Box>
              );
            })}
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
          <Grid container justifyContent={"start"} alignItems={"center"}>
            <Typography sx={{ color: "#2c57b3" }}>{"VITALS"}</Typography>
          </Grid>
          <Box sx={vitalsStyle} my={1}>
            <WaterDropOutlinedIcon sx={{ color: "#2c57b3" }} />
            <Typography variant="h5">
              {l2 && toCamelCase(l2[1]?.vitalName)}
            </Typography>
            <Typography variant="h5">{"-"}</Typography>
            <Typography variant="h5">
              {l2 && l2[1]?.vitalValue1 + " (mmhg)"}
            </Typography>
          </Box>
          <Box sx={vitalsStyle} my={1} ml={0.3}>
            <img
              src={lungs}
              style={{
                height: "20px",
                width: "20px",
              }}
            />
            <Typography variant="h5">
              {l2 && toCamelCase(l2[0]?.vitalName)}
            </Typography>
            <Typography variant="h5">{"-"}</Typography>
            <Typography variant="h5">
              {l2 && l2[0].vitalValue1 + "(bpm)"}
            </Typography>
          </Box>
          <Box sx={vitalsStyle} my={1} ml={0.3}>
            <img
              src={heartIcon}
              style={{
                height: "20px",
                width: "20px",
              }}
            />
            <Typography variant="h5">
              {l2 && toCamelCase(l2[4]?.vitalName)}
            </Typography>
            <Typography variant="h5">{"-"}</Typography>
            <Typography variant="h5">
              {l2 && l2[4]?.vitalValue1 + " (bpm)"}
            </Typography>
          </Box>
          <Box sx={vitalsStyle} ml={0.3} my={1}>
            <img
              src={bodyMassIndex}
              style={{
                height: "20px",
                width: "20px",
              }}
            />
            <Typography variant="h5">{l2 && l2[7]?.vitalName}</Typography>
            <Typography variant="h5">{"-"}</Typography>
            <Typography variant="h5">
              {l2 && l2[7]?.vitalValue1 + " (%)"}
            </Typography>
          </Box>
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
            <Typography sx={{ color: "#2c57b3" }}>{"VACCINES"}</Typography>
            <Box
              onClick={() => {
                copyToClipBoard(vaccineRef), setVaccineCopied((item) => !item);
              }}
              sx={{ display: "flex", gap: "3px", cursor: "pointer" }}
            >
              {!vaccineCopied ? (
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
          <Grid ref={vaccineRef}>
            {patientVaccineData?.map((item) => {
              return (
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  rowGap={0.5}
                  mt={1.5}
                >
                  <Grid container gap={1.2} alignItems={"center"}>
                    <Typography variant="h5" sx={{ color: "black" }}>
                      {item?.vaccine?.name || "-"}
                    </Typography>
                  </Grid>
                  <Grid container gap={1.2} alignItems={"center"}>
                    <Typography variant="h5" sx={{ color: "#7b7b7b" }}>
                      {"Start Date"}
                    </Typography>
                    <Typography>:</Typography>
                    <Typography variant="h5" sx={{ color: "#7b7b7b" }}>
                      {item?.administerDate
                        ? moment(item?.administerDate).format("MM-DD-YYYY")
                        : "-"}
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

export default ClinicalData;
