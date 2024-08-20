import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import {
  useAllergyControllerServiceGetPatientAllergies,
  useAppointmentControllerServiceGetPatientAppointment,
  useEncounterControllerServiceGetAllPatientEncounter,
  useFamilyHistoryControllerServiceGetPatientFamilyHistory,
  useMedicalHistoryControllerServiceViewMedicalHistory,
  useMedicationsControllerServiceGetPatientCurrentMedications,
  usePatientSocialHistoryControllerServiceGetAllPatientSocialHistory,
  usePatientSurgicalHistoryControllerServiceViewSurgicalHistory,
  useProblemsControllerServiceGetPatientProblems,
} from "../../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import CircleIcon from "@mui/icons-material/Circle";
import moment from "moment";
import { transformText } from "../../../../../../../../components/common/helper";
import { PatientSocialHistory } from "../../../../../../../../sdk/thinkemr-core-0.0.1/requests";
import { useNavigate } from "react-router-dom";
import useHasPermission from "../../../../../../../../components/common/useHasPermission";
import { Permission } from "../../../../../../../../components/common/enums-and-interfaces/enums";

export const style = makeStyles(() => ({
  divItems: {
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "1px solid #1A1A1A40",
    borderRadius: "5px",
    opacity: 1,
    padding: "10px",
  },
  viewAll: {
    color: "#2C57B3",
    cursor:
      "pointer                                                                ",
  },
  title: {
    fontWeight: "bold !important",
  },
}));

interface faceTimeProps {
  patientData?: any;
  setMenuItem?: any;
  setTabValue?: any;
}

function FaceTime(props: faceTimeProps) {
  const classes = style();
  const [diagnosis, setDiagnosis] = useState<any>([]);
  const [medication, setMedication] = useState<any>([]);
  const [family, setFamily] = useState<any>([]);
  const [medical, setMedical] = useState<any>([]);
  const [surgical, setSurgical] = useState<any>([]);
  const [allergyData, setAllergyData] = useState<any>([]);
  const [upcomingAppointements, setUpcomingAppointements] = useState<any>([]);
  const [allPatientEncounter, setAllPatientEncounter] = useState<any>([]);

  const [socialHistoryEducation, setsocialHistoryEducation] = useState<any>([]);
  const [socialHistoryFinancialStrain, setsocialHistoryFinancialStrain] =
    useState<any>([]);
  const [socialHistoryExposureToViolence, setsocialHistoryExposureToViolence] =
    useState<any>([]);
  const [socialHistoryTobaccoUse, setsocialHistoryTobaccoUse] = useState<any>(
    []
  );
  const [socialHistoryAlcoholUse, setsocialHistoryAlcoholUse] = useState<any>(
    []
  );
  const [socialHistoryPhysicalActivity, setsocialHistoryPhysicalActivity] =
    useState<any>([]);
  const [socialHistoryStress, setsocialHistoryStress] = useState<any>([]);
  const [socialHistorySexualOrientation, setsocialHistorySexualOrientation] =
    useState<any>([]);
  const [socialHistoryNutritionHistory, setsocialHistoryNutritionHistory] =
    useState<any>([]);
  const [socialHistorySocialHistory, setsocialHistorySocialHistory] =
    useState<any>([]);

  const navigate = useNavigate();

  const canViewMedication = useHasPermission(Permission.MEDICATION);
  const canViewHistory = useHasPermission(Permission.HISTORY);
  const canViewAllergy = useHasPermission(Permission.ALLERGY);

  const { data: diagnosisData, isSuccess } =
    useProblemsControllerServiceGetPatientProblems(
      {
        patientUuid: props?.patientData?.uuid,
        page: 0,
        size: 10,
      },
      [],
      {
        enabled: props?.patientData?.uuid ? true : false,
      }
    );

  const { data: medicationData, isSuccess: medicationSucess } =
    useMedicationsControllerServiceGetPatientCurrentMedications(
      {
        patientUuid: props?.patientData?.uuid,
        page: 0,
        size: 10,
        sort: ["desc"],
      },
      [],
      {
        enabled: props?.patientData?.uuid ? true : false,
      }
    );

  const { data: familyData, isSuccess: familySucess } =
    useFamilyHistoryControllerServiceGetPatientFamilyHistory(
      {
        patientUuid: props?.patientData?.uuid,
        page: 0,
        size: 10,
      },
      [],
      {
        enabled: props?.patientData?.uuid ? true : false,
      }
    );

  const { data: medicalHistory, isSuccess: successHistory } =
    useMedicalHistoryControllerServiceViewMedicalHistory(
      {
        patientUuid: props?.patientData?.uuid,
      },
      [],
      {
        enabled: props?.patientData?.uuid ? true : false,
      }
    );

  const { data: surgicalData, isLoading: lodingSurgicalHistory } =
    usePatientSurgicalHistoryControllerServiceViewSurgicalHistory(
      {
        patientUuid: props?.patientData?.uuid,
      },
      [],
      {
        enabled: props?.patientData?.uuid ? true : false,
      }
    );

  const { data: allergy, isSuccess: allerySuccess } =
    useAllergyControllerServiceGetPatientAllergies(
      {
        page: 0,
        patientUuid: props?.patientData?.uuid,
        size: 10,
      },
      [],
      {
        enabled: props?.patientData?.uuid ? true : false,
      }
    );

  const { data: patientAppointmentData, isSuccess: appointmentSuccess } =
    useAppointmentControllerServiceGetPatientAppointment(
      {
        patientId: props?.patientData?.uuid,
        appointmentState: "FUTURE",
        page: 0,
        size: 10,
        sort: ["created,desc"],
      },
      [],
      {
        enabled: props?.patientData?.uuid ? true : false,
      }
    );

  const { data: allPatientEncounterData, isSuccess: allEncounterSuccess } =
    useEncounterControllerServiceGetAllPatientEncounter(
      {
        patientUuid: props?.patientData?.uuid,
        page: 0,
        size: 10,
        sort: ["created,desc"],
      },
      [],
      {
        enabled: props?.patientData?.uuid ? true : false,
      }
    );

  const {
    data: socialHistoryEducationData,
    isSuccess: socialHistoryEducationIsSuccess,
  } = usePatientSocialHistoryControllerServiceGetAllPatientSocialHistory(
    {
      patientUuid: props?.patientData?.uuid,
      socialHistoryType: PatientSocialHistory.socialHistoryType.EDUCATION_LEVEL,
    },
    // [],
    // {
    //   enabled: props?.patientData?.uuid ? true : false,
    // }
  );

  const {
    data: socialHistoryFinancialStrainData,
    isSuccess: socialHistoryFinancialStrainIsSuccess,
  } = usePatientSocialHistoryControllerServiceGetAllPatientSocialHistory(
    {
      patientUuid: props?.patientData?.uuid,
      socialHistoryType:
        PatientSocialHistory.socialHistoryType.FINANCIAL_STRAIN,
    },
    // [],
    // {
    //   enabled: props?.patientData?.uuid ? true : false,
    // }
  );

  const {
    data: socialHistoryExposureToViolenceData,
    isSuccess: socialHistoryExposureToViolenceIsSuccess,
  } = usePatientSocialHistoryControllerServiceGetAllPatientSocialHistory(
    {
      patientUuid: props?.patientData?.uuid,
      socialHistoryType:
        PatientSocialHistory.socialHistoryType.EXPOSURE_TO_VIOLENCE,
    },
    // [],
    // {
    //   enabled: props?.patientData?.uuid ? true : false,
    // }
  );

  const {
    data: socialHistoryTobaccoUseData,
    isSuccess: socialHistoryTobaccoUseIsSuccess,
  } = usePatientSocialHistoryControllerServiceGetAllPatientSocialHistory(
    {
      patientUuid: props?.patientData?.uuid,
      socialHistoryType: PatientSocialHistory.socialHistoryType.TOBACCO_USE,
    },
    // [],
    // {
    //   enabled: props?.patientData?.uuid ? true : false,
    // }
  );

  const {
    data: socialHistoryAlcoholUseData,
    isSuccess: socialHistoryAlcoholUseIsSuccess,
  } = usePatientSocialHistoryControllerServiceGetAllPatientSocialHistory(
    {
      patientUuid: props?.patientData?.uuid,
      socialHistoryType: PatientSocialHistory.socialHistoryType.ALCOHOL_USE,
    },
    // [],
    // {
    //   enabled: props?.patientData?.uuid ? true : false,
    // }
  );

  const {
    data: socialHistoryPhysicalActivityData,
    isSuccess: socialHistoryPhysicalActivityIsSuccess,
  } = usePatientSocialHistoryControllerServiceGetAllPatientSocialHistory(
    {
      patientUuid: props?.patientData?.uuid,
      socialHistoryType:
        PatientSocialHistory.socialHistoryType.PHYSICAL_ACTIVITY,
    },
    // [],
    // {
    //   enabled: props?.patientData?.uuid ? true : false,
    // }
  );

  const {
    data: socialHistoryStressData,
    isSuccess: socialHistoryStressIsSuccess,
  } = usePatientSocialHistoryControllerServiceGetAllPatientSocialHistory(
    {
      patientUuid: props?.patientData?.uuid,
      socialHistoryType: PatientSocialHistory.socialHistoryType.STRESS,
    },
    // [],
    // {
    //   enabled: props?.patientData?.uuid ? true : false,
    // }
  );

  const {
    data: socialHistorySexualOrientationData,
    isSuccess: socialHistorySexualOrientationIsSuccess,
  } = usePatientSocialHistoryControllerServiceGetAllPatientSocialHistory(
    {
      patientUuid: props?.patientData?.uuid,
      socialHistoryType:
        PatientSocialHistory.socialHistoryType.SEXUAL_ORIENTATION,
    },
    // [],
    // {
    //   enabled: props?.patientData?.uuid ? true : false,
    // }
  );

  const {
    data: socialHistoryNutritionHistoryData,
    isSuccess: socialHistoryNutritionHistoryIsSuccess,
  } = usePatientSocialHistoryControllerServiceGetAllPatientSocialHistory(
    {
      patientUuid: props?.patientData?.uuid,
      socialHistoryType:
        PatientSocialHistory.socialHistoryType.NUTRITION_HISTORY,
    },
    // [],
    // {
    //   enabled: props?.patientData?.uuid ? true : false,
    // }
  );

  const {
    data: socialHistorySocialHistoryData,
    isSuccess: socialHistorySocialHistoryIsSuccess,
  } = usePatientSocialHistoryControllerServiceGetAllPatientSocialHistory(
    {
      patientUuid: props?.patientData?.uuid,
      socialHistoryType: PatientSocialHistory.socialHistoryType.SOCIAL_HISTORY,
    },
    // [],
    // {
    //   enabled: props?.patientData?.uuid ? true : false,
    // }
  );

  useEffect(() => {
    if (!!allergy && allerySuccess) {
      setAllergyData(allergy?.data?.content?.slice(0, 2));
    }
  }, [allergy, allerySuccess]);

  useEffect(() => {
    if (!!surgicalData) {
      setSurgical(surgicalData?.data?.content?.slice(0, 2));
    }
  }, [surgicalData]);

  useEffect(() => {
    if (successHistory && !!medicalHistory) {
      setMedical(medicalHistory?.data?.content?.slice(0, 2));
    }
  }, [medicalHistory]);

  useEffect(() => {
    if (familySucess && !!familyData) {
      setFamily(familyData?.data?.content?.slice(0, 2));
    }
  }, [familyData, familySucess]);

  useEffect(() => {
    if (medicationSucess && !!medicationData) {
      setMedication(medicationData?.data?.content?.slice(0, 2));
    }
  }, [medicationSucess, medicationData]);

  useEffect(() => {
    if (isSuccess && !!diagnosisData) {
      setDiagnosis(diagnosisData?.data?.content?.slice(0, 2));
    }
  }, [isSuccess, diagnosisData]);

  useEffect(() => {
    if (appointmentSuccess && !!patientAppointmentData) {
      setUpcomingAppointements(
        patientAppointmentData?.data?.content?.slice(0, 2)
      );
    }
  }, [appointmentSuccess, patientAppointmentData]);

  useEffect(() => {
    if (allEncounterSuccess && !!allPatientEncounterData) {
      setAllPatientEncounter(
        allPatientEncounterData?.data?.content?.slice(0, 2)
      );
    }
  }, [allEncounterSuccess, allPatientEncounterData]);

  useEffect(() => {
    if (socialHistoryEducationIsSuccess && !!socialHistoryEducationData) {
      setsocialHistoryEducation(
        socialHistoryEducationData?.data?.content?.slice(0, 2)
      );
    }
  }, [socialHistoryEducationIsSuccess, socialHistoryEducationData]);

  useEffect(() => {
    if (
      socialHistoryFinancialStrainIsSuccess &&
      !!socialHistoryFinancialStrainData
    ) {
      setsocialHistoryFinancialStrain(
        socialHistoryFinancialStrainData?.data?.content?.slice(0, 2)
      );
    }
  }, [socialHistoryFinancialStrainIsSuccess, socialHistoryFinancialStrainData]);

  useEffect(() => {
    if (
      socialHistoryExposureToViolenceIsSuccess &&
      !!socialHistoryExposureToViolenceData
    ) {
      setsocialHistoryExposureToViolence(
        socialHistoryExposureToViolenceData?.data?.content?.slice(0, 2)
      );
    }
  }, [
    socialHistoryExposureToViolenceIsSuccess,
    socialHistoryExposureToViolenceData,
  ]);

  useEffect(() => {
    if (socialHistoryTobaccoUseIsSuccess && !!socialHistoryTobaccoUseData) {
      setsocialHistoryTobaccoUse(
        socialHistoryTobaccoUseData?.data?.content?.slice(0, 2)
      );
    }
  }, [socialHistoryTobaccoUseIsSuccess, socialHistoryTobaccoUseData]);

  useEffect(() => {
    if (socialHistoryAlcoholUseIsSuccess && !!socialHistoryAlcoholUseData) {
      setsocialHistoryAlcoholUse(
        socialHistoryAlcoholUseData?.data?.content?.slice(0, 2)
      );
    }
  }, [socialHistoryAlcoholUseIsSuccess, socialHistoryAlcoholUseData]);

  useEffect(() => {
    if (
      socialHistoryPhysicalActivityIsSuccess &&
      !!socialHistoryPhysicalActivityData
    ) {
      setsocialHistoryPhysicalActivity(
        socialHistoryPhysicalActivityData?.data?.content?.slice(0, 2)
      );
    }
  }, [
    socialHistoryPhysicalActivityIsSuccess,
    socialHistoryPhysicalActivityData,
  ]);

  useEffect(() => {
    if (socialHistoryStressIsSuccess && !!socialHistoryStressData) {
      setsocialHistoryStress(
        socialHistoryStressData?.data?.content?.slice(0, 2)
      );
    }
  }, [socialHistoryStressIsSuccess, socialHistoryStressData]);

  useEffect(() => {
    if (
      socialHistorySexualOrientationIsSuccess &&
      !!socialHistorySexualOrientationData
    ) {
      setsocialHistorySexualOrientation(
        socialHistorySexualOrientationData?.data?.content?.slice(0, 2)
      );
    }
  }, [
    socialHistorySexualOrientationIsSuccess,
    socialHistorySexualOrientationData,
  ]);

  useEffect(() => {
    if (
      socialHistoryNutritionHistoryIsSuccess &&
      !!socialHistoryNutritionHistoryData
    ) {
      setsocialHistoryNutritionHistory(
        socialHistoryNutritionHistoryData?.data?.content?.slice(0, 2)
      );
    }
  }, [
    socialHistoryNutritionHistoryIsSuccess,
    socialHistoryNutritionHistoryData,
  ]);

  useEffect(() => {
    if (
      socialHistorySocialHistoryIsSuccess &&
      !!socialHistorySocialHistoryData
    ) {
      setsocialHistoryStress(
        socialHistorySocialHistoryData?.data?.content?.slice(0, 2)
      );
    }
  }, [socialHistorySocialHistoryIsSuccess, socialHistorySocialHistoryData]);

  const setViewAll = (item: any) => {
    props.setMenuItem(item);
  };

  return (
    <Grid container mt={1} gap="10px" sx={{ height: "63vh" }}>
      <Grid item xs={3.9} sx={{ height: "63vh", overflowY: "scroll" }}>
        <Grid
          item
          xs={12}
          className={classes.divItems}
          sx={{ height: diagnosis.length === 0 ? "26%" : "auto" }}
        >
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography variant="h5" className={classes.title}>
              DIAGNOSES
            </Typography>
            <Typography
              variant="h5"
              className={classes.viewAll}
              onClick={() => setViewAll("Diagnoses")}
            >
              View All
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {diagnosis.map((data: any) => (
              <Grid item xs={12} key={data.id} mt={1}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }} py={0.5}>
                  <CircleIcon sx={{ fontSize: "8px", color: "#2C57B3" }} />
                  &nbsp;{data?.billingCodes?.code} &nbsp;{" "}
                  {data?.billingCodes?.description} &nbsp;{" "}
                  {/* {data?.billingCodes?.type} */}
                </Typography>
                <Typography variant="h5" pl={1.3} py={0.5}>
                  Onset Date :{" "}
                  {moment(data?.diagnosedDate).format("MM-DD-YYYY")}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
        {canViewMedication && (
          <Grid
            item
            xs={12}
            className={classes.divItems}
            mt={1}
            sx={{
              height: medication.length === 0 ? "26%" : "auto",
              overflowY: "hidden",
            }}
          >
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h5" className={classes.title}>
                MEDICATIONS
              </Typography>
              <Typography
                variant="h5"
                className={classes.viewAll}
                onClick={() => setViewAll("Medications")}
              >
                View All
              </Typography>
            </Grid>
            {medication?.map((data: any) => (
              <Grid item xs={12} key={data.id} mt={1}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }} py={0.5}>
                  <CircleIcon sx={{ fontSize: "8px", color: "#2C57B3" }} />
                  &nbsp;{data?.drugCatalog?.medicine}
                </Typography>
                <Typography variant="h5" pl={1.3} py={0.5}>
                  Start date: {data?.startDate}
                </Typography>
                <Typography variant="h5" pl={1.3} py={0.5}>
                  Type : {data?.drugCatalog?.type}
                </Typography>
              </Grid>
            ))}
          </Grid>
        )}
        {canViewHistory && (
          <Grid
            item
            xs={12}
            className={classes.divItems}
            mt={1}
            sx={{ height: family.length === 0 ? "26%" : "auto" }}
          >
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="h5" className={classes.title}>
                FAMILY HISTORY
              </Typography>
              <Typography
                variant="h5"
                className={classes.viewAll}
                onClick={() => {
                  setViewAll("History");
                  props.setTabValue(2);
                }}
              >
                View All
              </Typography>
            </Grid>
            {family.map((data: any) => (
              <Grid item xs={12} key={data.id} mt={1}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }} py={0.5}>
                  <CircleIcon sx={{ fontSize: "8px", color: "#2C57B3" }} />
                  &nbsp;{data?.name}&nbsp;{"  "}: {data?.relative} {"  "}
                  {data?.died ? ": Deceased" : ""}
                </Typography>
                <Typography variant="h5" pl={1.3} py={0.5}>
                  Onset Age: {data?.onSetAge} years
                </Typography>
              </Grid>
            ))}
          </Grid>
        )}
        {canViewHistory && (
          <Grid
            item
            xs={12}
            className={classes.divItems}
            mt={1}
            sx={{ height: medical.length === 0 ? "26%" : "auto" }}
          >
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="h5" className={classes.title}>
                PAST MEDICAL HISTORY
              </Typography>
              <Typography
                variant="h5"
                className={classes.viewAll}
                onClick={() => {
                  setViewAll("History");
                  props.setTabValue(0);
                }}
              >
                View All
              </Typography>
            </Grid>
            {medical.map((data: any) => (
              <Grid item xs={12} key={data.id} mt={1}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }} py={0.5}>
                  <CircleIcon sx={{ fontSize: "8px", color: "#2C57B3" }} />
                  &nbsp;{data?.name}&nbsp;{"  "}
                </Typography>
                <Typography variant="h5" pl={1.3} py={0.5}>
                  Onset Date: {moment(data?.onsetDate).format("MM-DD-YYYY")}
                </Typography>
              </Grid>
            ))}
          </Grid>
        )}
        {canViewHistory && (
          <Grid
            item
            xs={12}
            className={classes.divItems}
            mt={1}
            sx={{ height: surgical.length === 0 ? "26%" : "auto" }}
          >
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="h5" className={classes.title}>
                PAST SURGICAL HISTORY
              </Typography>
              <Typography
                variant="h5"
                className={classes.viewAll}
                onClick={() => {
                  setViewAll("History");
                  props.setTabValue(1);
                }}
              >
                View All
              </Typography>
            </Grid>
            {surgical.map((data: any) => (
              <Grid item xs={12} key={data.id} mt={1}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }} py={0.5}>
                  <CircleIcon sx={{ fontSize: "8px", color: "#2C57B3" }} />
                  &nbsp;Surgery : {data?.name}&nbsp;{"  "}
                </Typography>
                <Typography variant="h5" pl={1.3} py={0.5}>
                  Surgery Date :{" "}
                  {moment(data?.surgeryDate).format("MM-DD-YYYY")}
                </Typography>
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
      <Grid item xs={3.9} sx={{ height: "63vh", overflowY: "scroll" }}>
        {canViewAllergy && (
          <Grid item xs={12} className={classes.divItems}>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="h5" className={classes.title}>
                ALLERGIES
              </Typography>
              <Typography
                variant="h5"
                className={classes.viewAll}
                onClick={() => setViewAll("Allergies")}
              >
                View All
              </Typography>
            </Grid>
            {allergyData.map((data: any) => (
              <Grid item xs={12} key={data.id} mt={1}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }} py={0.5}>
                  <CircleIcon sx={{ fontSize: "8px", color: "#2C57B3" }} />
                  &nbsp;{data?.allergy}
                  {" : "}&nbsp;{data?.allergyType}&nbsp;{" : "} &nbsp;
                  {data?.severity}
                  {/* &nbsp;{" : "}  */}
                  {/* &nbsp;{data?.onSetDate}&nbsp;{"  "} */}
                </Typography>
                <Typography variant="h5" pl={1.3} py={0.5}>
                  Onset Date:{" "}
                  {data?.onSetDate
                    ? moment(data?.onSetDate).format("MM-DD-YYYY")
                    : ""}
                </Typography>
              </Grid>
            ))}
          </Grid>
        )}
        {canViewHistory && (
          <Grid item xs={12} className={classes.divItems} mt={1}>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="h5" className={classes.title}>
                SOCIAL HISTORY
              </Typography>
              <Typography
                variant="h5"
                className={classes.viewAll}
                onClick={() => {
                  setViewAll("History");
                  props.setTabValue(3);
                }}
              >
                View All
              </Typography>
            </Grid>
            <Grid item xs={12} mt={2}>
              <Grid container alignItems={"center"} gap={"10px"}>
                <Typography variant="h5" sx={{ fontWeight: "bold!important" }}>
                  Education Level
                </Typography>{" "}
              </Grid>
              {socialHistoryEducation.map((data: any) => {
                return (
                  <>
                    <Typography variant="h5" pl={1.3}>
                      <CircleIcon sx={{ fontSize: "8px", color: "#2C57B3" }} />
                      &nbsp;<span style={{ fontWeight: "bold" }}>Name : </span>
                      {data?.name}
                    </Typography>
                    <Typography variant="h5" pl={1.3}>
                      <span style={{ fontWeight: "bold" }}>Description : </span>
                      {data?.description}
                    </Typography>
                  </>
                );
              })}
            </Grid>
            <Grid item xs={12} mt={2}>
              <Grid container alignItems={"center"} gap={"10px"}>
                <Typography variant="h5" sx={{ fontWeight: "bold!important" }}>
                  Financial Strain
                </Typography>{" "}
              </Grid>
            </Grid>

            {socialHistoryFinancialStrain.map((data: any) => {
              return (
                <>
                  <Typography variant="h5" pl={1.3}>
                    <CircleIcon sx={{ fontSize: "8px", color: "#2C57B3" }} />
                    &nbsp;<span style={{ fontWeight: "bold" }}>Name : </span>
                    {data?.name}
                  </Typography>
                  <Typography variant="h5" pl={1.3}>
                    <span style={{ fontWeight: "bold" }}>Description : </span>
                    {data?.description}
                  </Typography>
                </>
              );
            })}
            <Grid item xs={12} mt={2}>
              <Grid container alignItems={"center"} gap={"10px"}>
                <Typography variant="h5" sx={{ fontWeight: "bold!important" }}>
                  Exposure To Violence
                </Typography>{" "}
              </Grid>
              {socialHistoryExposureToViolence.map((data: any) => {
                return (
                  <>
                    <Typography variant="h5" pl={1.3}>
                      <CircleIcon sx={{ fontSize: "8px", color: "#2C57B3" }} />
                      &nbsp;<span style={{ fontWeight: "bold" }}>Name : </span>
                      {data?.name}
                    </Typography>
                    <Typography variant="h5" pl={1.3}>
                      <span style={{ fontWeight: "bold" }}>Description : </span>
                      {data?.description}
                    </Typography>
                  </>
                );
              })}
            </Grid>
            <Grid item xs={12} mt={2}>
              <Grid container alignItems={"center"} gap={"10px"}>
                <Typography variant="h5" sx={{ fontWeight: "bold!important" }}>
                  Tobacco Use
                </Typography>{" "}
              </Grid>
              {socialHistoryTobaccoUse.map((data: any) => {
                return (
                  <>
                    <Typography variant="h5" pl={1.3}>
                      <CircleIcon sx={{ fontSize: "8px", color: "#2C57B3" }} />
                      &nbsp;<span style={{ fontWeight: "bold" }}>Name : </span>
                      {data?.name}
                    </Typography>
                    <Typography variant="h5" pl={1.3}>
                      <span style={{ fontWeight: "bold" }}>Description : </span>
                      {data?.description}
                    </Typography>
                  </>
                );
              })}
            </Grid>
            <Grid item xs={12} mt={2}>
              <Grid container alignItems={"center"} gap={"10px"}>
                <Typography variant="h5" sx={{ fontWeight: "bold!important" }}>
                  Alcohol Use
                </Typography>{" "}
              </Grid>
              {socialHistoryAlcoholUse.map((data: any) => {
                return (
                  <>
                    <Typography variant="h5" pl={1.3}>
                      <CircleIcon sx={{ fontSize: "8px", color: "#2C57B3" }} />
                      &nbsp;<span style={{ fontWeight: "bold" }}>Name : </span>
                      {data?.name}
                    </Typography>
                    <Typography variant="h5" pl={1.3}>
                      <span style={{ fontWeight: "bold" }}>Description : </span>
                      {data?.description}
                    </Typography>
                  </>
                );
              })}{" "}
            </Grid>
            <Grid item xs={12} mt={2}>
              <Grid container alignItems={"center"} gap={"10px"}>
                <Typography variant="h5" sx={{ fontWeight: "bold!important" }}>
                  Physical Activity
                </Typography>{" "}
              </Grid>
              {socialHistoryPhysicalActivity.map((data: any) => {
                return (
                  <>
                    <Typography variant="h5" pl={1.3}>
                      <CircleIcon sx={{ fontSize: "8px", color: "#2C57B3" }} />
                      &nbsp;<span style={{ fontWeight: "bold" }}>Name : </span>
                      {data?.name}
                    </Typography>
                    <Typography variant="h5" pl={1.3}>
                      <span style={{ fontWeight: "bold" }}>Description : </span>
                      {data?.description}
                    </Typography>
                  </>
                );
              })}{" "}
            </Grid>
            <Grid item xs={12} mt={2}>
              <Grid container alignItems={"center"} gap={"10px"}>
                <Typography variant="h5" sx={{ fontWeight: "bold!important" }}>
                  Stress
                </Typography>{" "}
              </Grid>
              {socialHistoryStress.map((data: any) => {
                return (
                  <>
                    <Typography variant="h5" pl={1.3}>
                      <CircleIcon sx={{ fontSize: "8px", color: "#2C57B3" }} />
                      &nbsp;<span style={{ fontWeight: "bold" }}>Name : </span>
                      {data?.name}
                    </Typography>
                    <Typography variant="h5" pl={1.3}>
                      <span style={{ fontWeight: "bold" }}>Description : </span>
                      {data?.description}
                    </Typography>
                  </>
                );
              })}{" "}
            </Grid>
            <Grid item xs={12} mt={2}>
              <Grid container alignItems={"center"} gap={"10px"}>
                <Typography variant="h5" sx={{ fontWeight: "bold!important" }}>
                  Sexual Orientation
                </Typography>{" "}
              </Grid>
              {socialHistorySexualOrientation.map((data: any) => {
                return (
                  <>
                    <Typography variant="h5" pl={1.3}>
                      <CircleIcon sx={{ fontSize: "8px", color: "#2C57B3" }} />
                      &nbsp;<span style={{ fontWeight: "bold" }}>Name : </span>
                      {data?.name}
                    </Typography>
                    <Typography variant="h5" pl={1.3}>
                      <span style={{ fontWeight: "bold" }}>Description : </span>
                      {data?.description}
                    </Typography>
                  </>
                );
              })}{" "}
            </Grid>
            <Grid item xs={12} mt={2}>
              <Grid container alignItems={"center"} gap={"10px"}>
                <Typography variant="h5" sx={{ fontWeight: "bold!important" }}>
                  Nutrition History
                </Typography>{" "}
              </Grid>
              {socialHistoryNutritionHistory.map((data: any) => {
                return (
                  <>
                    <Typography variant="h5" pl={1.3}>
                      <CircleIcon sx={{ fontSize: "8px", color: "#2C57B3" }} />
                      &nbsp;<span style={{ fontWeight: "bold" }}>Name : </span>
                      {data?.name}
                    </Typography>
                    <Typography variant="h5" pl={1.3}>
                      <span style={{ fontWeight: "bold" }}>Description : </span>
                      {data?.description}
                    </Typography>
                  </>
                );
              })}{" "}
            </Grid>
            <Grid item xs={12} mt={2}>
              <Grid container alignItems={"center"} gap={"10px"}>
                <Typography variant="h5" sx={{ fontWeight: "bold!important" }}>
                  Social History (Free text)
                </Typography>{" "}
              </Grid>
              {socialHistorySocialHistory.map((data: any) => {
                return (
                  <>
                    <Typography variant="h5" pl={1.3}>
                      <CircleIcon sx={{ fontSize: "8px", color: "#2C57B3" }} />
                      &nbsp;<span style={{ fontWeight: "bold" }}>Name : </span>
                      {data?.name}
                    </Typography>
                    <Typography variant="h5" pl={1.3}>
                      <span style={{ fontWeight: "bold" }}>Description : </span>
                      {data?.description}
                    </Typography>
                  </>
                );
              })}{" "}
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid item xs={3.9} sx={{ height: "63vh", overflowY: "scroll" }}>
        <Grid item xs={12} className={classes.divItems} height={"270px"}>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography variant="h5" className={classes.title}>
              UPCOMING APPOINTMENTS
            </Typography>
            <Typography
              variant="h5"
              className={classes.viewAll}
              onClick={() => navigate("/provider/appointment/calendar")}
            >
              View All
            </Typography>
          </Grid>
          {upcomingAppointements.map((data: any) => {
            return (
              <Grid item xs={12} mt={1}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "#36588C" }}
                  py={0.5}
                >
                  <CircleIcon sx={{ fontSize: "8px", color: "#2C57B3" }} />
                  &nbsp;
                  {moment(data.appointmentDate).format("dddd, MMMM Do, YYYY")}
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  {moment(data.startTime, "HH:mm").format("h:mmA")} -{" "}
                  {moment(data.endTime, "HH:mm").format("h:mmA")}
                  &nbsp;&nbsp;&nbsp;&nbsp;{data.reasonOfVisit}
                </Typography>
                <Typography variant="h5" pl={1.3} py={0.5}>
                  {transformText(data?.appointmentStatus)} with{" "}
                  {data.providerName}{" "}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
        <Grid item xs={12} className={classes.divItems} mt={1} height={"270px"}>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography variant="h5" className={classes.title}>
              ENCOUNTERS
            </Typography>
            <Typography variant="h5" className={classes.viewAll}>
              {""}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {allPatientEncounter.map((data: any) => {
              return (
                <Grid item xs={12} mt={1}>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", color: "#36588C" }}
                    py={0.5}
                  >
                    <CircleIcon sx={{ fontSize: "8px", color: "#2C57B3" }} />
                    &nbsp;
                    {moment(data.serviceDate).format("dddd, MMMM Do, YYYY")}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {moment(data.startTime, "HH:mm").format("h:mmA")} -{" "}
                    {moment(data.endTime, "HH:mm").format("h:mmA")}
                    &nbsp;&nbsp;&nbsp;&nbsp;{data.reasonOfVisit}
                  </Typography>
                  <Typography variant="h5" pl={1.3} py={0.5}>
                    Visit Type : {transformText(data?.visitType)}
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        {/* <Grid item xs={12} className={classes.divItems} mt={1}>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography variant="h5" className={classes.title}>
              MESSAGES
            </Typography>
            <Typography variant="h5" className={classes.viewAll}>
              View All
            </Typography>
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid> */}
      </Grid>
    </Grid>
  );
}

export default FaceTime;
