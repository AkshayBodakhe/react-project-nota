import { Box, Grid, Typography } from "@mui/material";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import {
  useFamilyHistoryControllerServiceGetPatientFamilyHistory,
  useMedicalHistoryControllerServiceViewMedicalHistory,
  usePatientSocialHistoryControllerServiceGetAllPatientSocialHistory,
  usePatientSurgicalHistoryControllerServiceViewSurgicalHistory,
} from "../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { useEffect, useRef, useState } from "react";
import { copiedStyle } from "../clinical-data/clinical-data";
import { toCamelCase } from "../../../../../../components/core/add-edit-staff-user/add-edit-staff-user";
import { PatientSocialHistory } from "../../../../../../sdk/thinkemr-core-0.0.1/requests";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import moment from "moment";
import Loading from "../../../../../../components/common/spinner/loading";

export const parentContainer = {
  border: "1px solid #c5c5c5",
  borderRadius: "5px",
  padding: "10px",
};

export const childContainer = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export const copyIconStyle = { display: "flex", gap: "3px", cursor: "pointer" };

export const addIconStyle = {
  color: "black",
  fontSize: "18px",
  cursor: "pointer",
};

interface historyProps {
  patientUuid: string;
}

function HistoryTab(props: historyProps) {
  const { patientUuid } = props;
  const [pmhData, setPMHData] = useState<any[]>();
  const [pmhCopied, setPmhCopied] = useState(false);
  const [pshCopied, setPshCopied] = useState(false);
  const [pastSurgicalHistory, setPastSurgicalHistory] = useState<any[]>();
  const [fmhData, setFMHData] = useState<any[]>();
  const [fmhCopied, setFmhCopied] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const pshRef = useRef<HTMLDivElement>(null);
  const fhRef = useRef<HTMLDivElement>(null);
  const [socialHistory, setSocialHistory] = useState<any>();
  const [financialStrain, setForFinancialStrain] = useState<any>();
  4;
  const [, setForTobacco] = useState<any>();
  const [expViolence, setForExpViolence] = useState<any>();
  const [titleName, setTitleName] = useState("");
  const [isDescription, setIsDescription] = useState(false);
  const [isFinDesc, setIsFinDesc] = useState(false);
  const [isExpVioDesc, setExpViolence] = useState(false);

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

  const { data } = useMedicalHistoryControllerServiceViewMedicalHistory({
    patientUuid: patientUuid,
    page: 0,
    size: 500,
  });

  const { data: pastSurgical } =
    usePatientSurgicalHistoryControllerServiceViewSurgicalHistory({
      patientUuid: patientUuid,
      page: 0,
      size: 500,
    });

  const { data: FamilyHistoryData } =
    useFamilyHistoryControllerServiceGetPatientFamilyHistory({
      patientUuid: patientUuid,
      page: 0,
      size: 500,
    });

  useEffect(() => {
    if (data?.data) {
      setPMHData(data?.data?.content);
    }
  }, [data]);

  useEffect(() => {
    if (pastSurgical) {
      setPastSurgicalHistory(pastSurgical?.data?.content);
    }
  }, [pastSurgical]);

  useEffect(() => {
    if (FamilyHistoryData) {
      setFMHData(FamilyHistoryData?.data?.content);
    }
  }, [FamilyHistoryData]);

  const {
    data: socialHistoryData,
    isSuccess,
    refetch,
  } = usePatientSocialHistoryControllerServiceGetAllPatientSocialHistory({
    patientUuid: patientUuid,
    socialHistoryType: PatientSocialHistory.socialHistoryType.EDUCATION_LEVEL,
  });

  useEffect(() => {
    if (socialHistoryData) {
      setSocialHistory(socialHistoryData?.data?.content as any);
    }
  }, [patientUuid]);

  const { data: socialHistoryDataForStrain } =
    usePatientSocialHistoryControllerServiceGetAllPatientSocialHistory({
      patientUuid: patientUuid,
      socialHistoryType:
        PatientSocialHistory.socialHistoryType.FINANCIAL_STRAIN,
    });

  useEffect(() => {
    if (socialHistoryDataForStrain) {
      setForFinancialStrain(socialHistoryDataForStrain?.data?.content as any);
    }
  }, [patientUuid]);

  const { data: dataForExpViolence } =
    usePatientSocialHistoryControllerServiceGetAllPatientSocialHistory({
      patientUuid: patientUuid,
      socialHistoryType:
        PatientSocialHistory.socialHistoryType.EXPOSURE_TO_VIOLENCE,
    });

  useEffect(() => {
    if (dataForTobacco) {
      setForTobacco(dataForTobacco?.data?.content as any);
    }
  }, [patientUuid]);

  const { data: dataForTobacco } =
    usePatientSocialHistoryControllerServiceGetAllPatientSocialHistory({
      patientUuid: patientUuid,
      socialHistoryType: PatientSocialHistory.socialHistoryType.TOBACCO_USE,
    });

  useEffect(() => {
    if (dataForExpViolence) {
      setForExpViolence(dataForExpViolence?.data?.content as any);
    }
  }, [patientUuid]);

  const handleClickSCH = () => {
    setIsDescription(true);
  };

  const handleClickFinStrain = () => {
    setIsFinDesc(true);
  };

  const handleClickExpViolence = () => {
    setExpViolence(true);
  };

  const handleBackDescription = () => {
    setIsDescription(false);
    setIsFinDesc(false);
    setExpViolence(false);
  };

  const setSCHName = (titleSch: string) => {
    setTitleName(titleSch);
  };

  return (
    <>
      <Box>
        <Grid sx={parentContainer}>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography sx={{ color: "#2c57b3" }}>
              {"PAST MEDICAL HISTORY"}
            </Typography>
            <Box
              onClick={() => {
                copyToClipBoard(divRef), setPmhCopied((item) => !item);
              }}
              sx={copyIconStyle}
            >
              {!pmhCopied ? (
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
          <Grid ref={divRef}>
            {pmhData && pmhData?.length === 0 && <Loading />}
            {pmhData
              ?.filter((item) => item.name !== "")
              ?.map((item) => {
                return (
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    rowGap={0.5}
                    mt={1.5}
                  >
                    <Grid container gap={1.2} alignItems={"center"}>
                      <Typography variant="h5" sx={{ color: "black" }}>
                        {item?.name}
                      </Typography>
                      <Typography>:</Typography>
                      <Typography variant="h5" sx={{ color: "black" }}>
                        {item?.onsetDate}
                      </Typography>
                    </Grid>
                  </Box>
                );
              })}
          </Grid>
        </Grid>
        <Box py={1} />
        <Grid sx={parentContainer}>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
            mb={1}
          >
            <Typography sx={{ color: "#2c57b3" }}>
              {"PAST SURGICAL HISTORY"}
            </Typography>
            <Box
              onClick={() => {
                copyToClipBoard(pshRef), setPshCopied((item) => !item);
              }}
              sx={copyIconStyle}
            >
              {!pshCopied ? (
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
          <Grid ref={pshRef}>
            {pastSurgicalHistory && pastSurgicalHistory?.length === 0 && (
              <Loading />
            )}
            {pastSurgicalHistory
              ?.filter((item) => item.name !== "")
              ?.map((item) => {
                return (
                  <Box display={"flex"} flexDirection={"column"} rowGap={0.5}>
                    <Grid container gap={1.2} alignItems={"center"}>
                      <Typography variant="h5" sx={{ color: "black" }}>
                        {"Procedure"}
                      </Typography>
                      <Typography>:</Typography>
                      <Typography variant="h5" sx={{ color: "black" }}>
                        {item?.name}
                      </Typography>
                      <Typography>:</Typography>
                      <Typography variant="h5" sx={{ color: "black" }}>
                        {item?.surgeryDate || "-"}
                      </Typography>
                    </Grid>
                  </Box>
                );
              })}
          </Grid>
        </Grid>
        <Box py={1} />
        <Grid sx={parentContainer}>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
            mb={1}
          >
            <Typography sx={{ color: "#2c57b3" }}>
              {"FAMILY HISTORY"}
            </Typography>
            <Box
              onClick={() => {
                copyToClipBoard(fhRef), setFmhCopied((item) => !item);
              }}
              sx={copyIconStyle}
            >
              {!fmhCopied ? (
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
          <Grid ref={fhRef}>
            {fmhData &&
              fmhData.length !== 0 &&
              fmhData
                ?.filter((item) => item.name !== "")
                ?.map((item) => {
                  return (
                    <Box display={"flex"} flexDirection={"column"} rowGap={0.5}>
                      <Grid container gap={1.2} alignItems={"center"}>
                        <Typography variant="h5" sx={{ color: "black" }}>
                          {toCamelCase(item?.relative)}
                        </Typography>
                        <Typography>:</Typography>
                        <Typography variant="h5" sx={{ color: "black" }}>
                          {item?.name}
                        </Typography>
                        <Typography>:</Typography>
                        <Typography variant="h5" sx={{ color: "black" }}>
                          {item?.note}
                        </Typography>
                      </Grid>
                    </Box>
                  );
                })}
          </Grid>
        </Grid>
        <Box py={1} />
        <Grid sx={parentContainer}>
          <Grid pb={1}>
            <Typography sx={{ color: "#2c57b3" }}>
              {"SOCIAL HISTORY"}
            </Typography>
          </Grid>
          <Box display={"flex"} flexDirection={"column"} rowGap={0.5} mt={1.5}>
            <Grid container gap={1.2} alignItems={"center"}>
              <Typography variant="h4" sx={{ color: "black" }}>
                {"Education Level"}
              </Typography>
            </Grid>
            {!isDescription ? (
              <Grid>
                {socialHistory?.map((item: any) => {
                  return (
                    <Box display={"flex"} flexDirection={"column"}>
                      <Typography
                        variant="h5"
                        sx={{ cursor: "pointer", py: "5px" }}
                        onClick={() => {
                          handleClickSCH(), setSCHName(item?.name);
                        }}
                      >
                        {item?.name}
                      </Typography>
                    </Box>
                  );
                })}
              </Grid>
            ) : (
              <Grid>
                {socialHistory?.map((item: any) => {
                  if (item.name === titleName) {
                    return (
                      <Box display={"flex"} gap={1}>
                        <ArrowBackIcon
                          sx={{ cursor: "pointer" }}
                          onClick={handleBackDescription}
                        />
                        <Typography>{item?.description}</Typography>
                      </Box>
                    );
                  }
                })}
              </Grid>
            )}
          </Box>
          <Box display={"flex"} flexDirection={"column"} rowGap={0.5} mt={1.5}>
            <Grid container gap={1.2} alignItems={"center"}>
              <Typography variant="h4" sx={{ color: "black" }}>
                {"Financial Strain"}
              </Typography>
            </Grid>
            {!isFinDesc ? (
              <Grid>
                {financialStrain?.map((item: any) => {
                  return (
                    <Box display={"flex"} flexDirection={"column"}>
                      <Typography
                        variant="h5"
                        sx={{ cursor: "pointer", py: "5px" }}
                        onClick={() => {
                          handleClickFinStrain(), setSCHName(item?.name);
                        }}
                      >
                        {item?.name}
                      </Typography>
                    </Box>
                  );
                })}
              </Grid>
            ) : (
              <Grid>
                {financialStrain?.map((item: any) => {
                  if (item.name === titleName) {
                    return (
                      <Box display={"flex"} gap={1}>
                        <ArrowBackIcon
                          sx={{ cursor: "pointer" }}
                          onClick={handleBackDescription}
                        />
                        <Typography>{item?.description}</Typography>
                      </Box>
                    );
                  }
                })}
              </Grid>
            )}
          </Box>
          <Box display={"flex"} flexDirection={"column"} rowGap={0.5} mt={1.5}>
            <Grid container gap={1.2} alignItems={"center"}>
              <Typography variant="h4" sx={{ color: "black" }}>
                {"Exposure Violence"}
              </Typography>
            </Grid>
            {!isExpVioDesc ? (
              <Grid>
                {expViolence?.map((item: any) => {
                  return (
                    <Box display={"flex"} flexDirection={"column"}>
                      <Typography
                        variant="h5"
                        sx={{ cursor: "pointer", py: "5px" }}
                        onClick={() => {
                          handleClickExpViolence(), setSCHName(item?.name);
                        }}
                      >
                        {item?.name}
                      </Typography>
                    </Box>
                  );
                })}
              </Grid>
            ) : (
              <Grid>
                {expViolence?.map((item: any) => {
                  if (item.name === titleName) {
                    return (
                      <Box display={"flex"} gap={1}>
                        <ArrowBackIcon
                          sx={{ cursor: "pointer" }}
                          onClick={handleBackDescription}
                        />
                        <Typography>{item?.description}</Typography>
                      </Box>
                    );
                  }
                })}
              </Grid>
            )}
          </Box>
        </Grid>
      </Box>
    </>
  );
}

export default HistoryTab;
