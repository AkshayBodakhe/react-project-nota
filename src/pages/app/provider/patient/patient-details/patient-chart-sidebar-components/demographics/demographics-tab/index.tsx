/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { usePatientControllerServiceGetPatient } from "../../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { transformText } from "../../../../../../../../components/common/helper";

export const demographicsTabStyle = makeStyles(() => ({
  borderbox: {
    border: "1px solid #1A1A1A33",
    borderRadius: "10px",
    padding: "10px",
    height: "auto !important",
  },
  headingtypo: {
    color: "#004186 !important",
    fontSize: "14px !important",
    fontWeight: "bold !important",
    paddingBottom: "20px",
  },
  textheading: {
    color: "black !important",
    // fontWeight: "600 !important",
    paddingBottom: "20px!important ",
    fontSize: "14px !important",
  },
  textheadingPreferences: {
    color: "black !important",
    // fontWeight: "600 !important",
    paddingBottom: "40px!important ",
  },
  textvalue: {
    color: "#000000 !important",
    fontWeight: "600 !important",
    fontSize: "14px !important",
  },
}));

interface PatientTableRecordsProps {
  patientData: any;
  data?: any;
}

const DemographicsTab: React.FC<PatientTableRecordsProps> = ({
  patientData,
  // data,
}) => {
  // console.log("demographics Tab ",patientData?.phoneNumber)
  // console.log("demographics Data ",data)
  // console.log("XXXXXXXXXXX",responseData?.data?.data?.formConsent)
  // console.log("patientData uuid",patientData?.uuid)
  const [patientInfo, setPatientData] = useState<any>();

  const responseData = usePatientControllerServiceGetPatient({
    patientUuid: patientData?.uuid,
  });

  //console.log("responseData",responseData?.data)

  useEffect(() => {
    const patientDemo = responseData && (responseData?.data?.data as any);
    setPatientData(patientDemo);
  }, [patientData?.uuid, responseData]);
  // console.log("patientInfo",patientInfo)

  //  const {maritalStatus,race,birthDate,registrationDate,
  //   emergContactFirstName,emergContactLastName,emergContactRelation,emergContactNumber,emergContactEmail,formConsent,
  // callConsent,messageConsent,emailConsent}=responseData?.data?.data;
  //   console.log(maritalStatus)
  //   console.log(race)
  //   console.log(birthDate)
  //   console.log(preferredLab)
  //   console.log(preferredPharmacy)
  //   console.log(preferredRadiology)
  //   console.log(registrationDate)
  //   console.log(emergContactFirstName)
  //   console.log(emergContactLastName)
  //   console.log(emergContactRelation)
  //   console.log(emergContactNumber)
  //   console.log(emergContactEmail)
  //   console.log(formConsent)
  //   console.log(callConsent)
  //   console.log(messageConsent)
  //   console.log(emailConsent)

  const classes = demographicsTabStyle();
  return (
    <>
      <Grid key={"sid"} container sx={{ padding: "10px" }}>
        <Grid container columnGap={1}>
          <Grid item xs={5.9} sx={{ display: "flex", flexDirection: "column" }}>
            <Grid container className={classes.borderbox}>
              <Grid item xs={12}>
                <Typography variant="h4" className={classes.headingtypo}>
                  Basic Information
                </Typography>
              </Grid>
              <Grid container>
                <Grid item xs={6}>
                  <Grid container>
                    <Grid item xs={4}>
                      <Typography className={classes.textheading}>
                        Contact Number
                      </Typography>
                    </Grid>
                    <Grid xs={1}>:</Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.textvalue}>
                        {patientData?.phoneNumber
                          ? patientData?.phoneNumber
                          : patientData?.contactNumber || "-"}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={4}>
                      <Typography className={classes.textheading}>
                        Email
                      </Typography>
                    </Grid>
                    <Grid xs={1}>:</Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.textvalue}>
                        {patientData?.email || "-"}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={4}>
                      <Typography className={classes.textheading}>
                        SSN
                      </Typography>
                    </Grid>
                    <Grid xs={1}>:</Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.textvalue}>
                        {patientInfo?.ssn || "-"}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={4}>
                      <Typography className={classes.textheading}>
                        Marital Status
                      </Typography>
                    </Grid>
                    <Grid xs={1}>:</Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.textvalue}>
                        {transformText(patientInfo?.maritalStatus) || "-"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid container>
                    <Grid item xs={4}>
                      <Typography className={classes.textheading}>
                        Languages
                      </Typography>
                    </Grid>
                    <Grid xs={1}>:</Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.textvalue}>
                        {patientInfo?.languages &&
                        patientInfo?.languages.length > 0
                          ? patientInfo?.languages.map(
                              (
                                language: { id: number; name: string },
                                index: number
                              ) => (
                                <span key={index}>
                                  {index > 0 && ", "}
                                  {language.name}
                                </span>
                              )
                            )
                          : "-"}
                      </Typography>
                    </Grid>
                  </Grid>{" "}
                  <Grid container>
                    <Grid item xs={4}>
                      <Typography className={classes.textheading}>
                        Race
                      </Typography>
                    </Grid>
                    <Grid xs={1}>:</Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.textvalue}>
                        {transformText(patientInfo?.race) || "-"}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={4}>
                      <Typography className={classes.textheading}>
                        Ethnicity
                      </Typography>
                    </Grid>
                    <Grid xs={1}>:</Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.textvalue}>
                        {transformText(patientInfo?.ethnicity) || "-"}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={4}>
                      <Typography className={classes.textheading}>
                        Date of Birth
                      </Typography>
                    </Grid>
                    <Grid xs={1}>:</Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.textvalue}>
                        {moment(patientInfo?.birthDate).format(
                          "MMMM D, YYYY"
                        ) || "-"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container xs={12}>
                <Grid item xs={2}>
                  <Typography className={classes.textheading}>
                    Address
                  </Typography>
                </Grid>
                <Grid item xs={0.5}>
                  :
                </Grid>
                <Grid item xs={8}>
                  <Typography className={classes.textvalue}>
                    {patientInfo?.address
                      ? patientInfo?.address?.line1 +
                        " " +
                        patientInfo?.address?.line2 +
                        " " +
                        patientInfo?.address?.city +
                        ", " +
                        patientInfo?.address?.state +
                        ", " +
                        patientInfo?.address?.country
                      : "-"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              columnGap={1}
              className={classes.borderbox}
              sx={{ marginTop: "10px" }}
            >
              {/* <Grid item >
                <Grid container> */}
              <Grid item xs={12}>
                <Typography variant="h4" className={classes.headingtypo}>
                  Preferences
                </Typography>
              </Grid>

              <Grid container>
                <Grid item xs={2.5}>
                  <Typography className={classes.textheadingPreferences}>
                    Default Pharmacy
                  </Typography>
                </Grid>
                <Grid xs={0.5}>:</Grid>
                <Grid item xs={9}>
                  <Grid container>
                    <Typography className={classes.textvalue}>
                      {patientInfo?.preferredPharmacy?.name || "-"}
                    </Typography>
                  </Grid>{" "}
                  <Grid container>
                    <Typography className={classes.textvalue}> </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={2.5}>
                  <Typography className={classes.textheadingPreferences}>
                    Preferred Lab
                  </Typography>
                </Grid>
                <Grid xs={0.5}>:</Grid>
                <Grid item xs={9}>
                  <Grid container>
                    <Typography className={classes.textvalue}>
                      {patientInfo?.preferredLab?.name || "-"}
                    </Typography>
                  </Grid>{" "}
                  <Grid container>
                    <Typography className={classes.textvalue}> </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={2.5}>
                  <Typography className={classes.textheadingPreferences}>
                    Preferred Radiology
                  </Typography>
                </Grid>
                <Grid xs={0.5}>:</Grid>
                <Grid item xs={9}>
                  <Grid container>
                    <Typography className={classes.textvalue}>
                      {patientInfo?.preferredRadiology?.name || "-"}
                    </Typography>
                  </Grid>{" "}
                  <Grid container>
                    <Typography className={classes.textvalue}> </Typography>
                  </Grid>
                </Grid>
              </Grid>
              {/* </Grid>
              </Grid> */}
            </Grid>
          </Grid>
          <Grid
            item
            xs={6}
            rowGap={1}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Grid container className={classes.borderbox}>
              <Grid item xs={12}>
                <Typography variant="h4" className={classes.headingtypo}>
                  Registering Information
                </Typography>
              </Grid>
              <Grid container>
                <Grid item xs={6}>
                  <Grid container>
                    <Grid item xs={4}>
                      <Typography className={classes.textheading}>
                        Primary Provider
                      </Typography>
                    </Grid>
                    <Grid xs={1}>:</Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.textvalue}>
                        {patientInfo?.provider?.firstName
                          ? patientInfo?.provider?.firstName +
                            " " +
                            patientInfo?.provider?.lastName
                          : "-"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid container>
                    <Grid item xs={4}>
                      <Typography className={classes.textheading}>
                        Registered Date
                      </Typography>
                    </Grid>
                    <Grid xs={1}>:</Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.textvalue}>
                        {moment(patientInfo?.registrationDate).format(
                          "MMMM D, YYYY"
                        ) !== null
                          ? moment(patientInfo?.registrationDate).format(
                              "MMMM D, YYYY"
                            )
                          : "-"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                {/* <Grid container>
                  <Grid item xs={2}>
                    <Typography className={classes.textheading}>
                      Patient Registered
                    </Typography>
                  </Grid>
                  <Grid xs={0.5}>:</Grid>
                  <Grid item xs={9}>
                    <Typography className={classes.textvalue}>{"-"}</Typography>
                  </Grid>
                </Grid> */}
              </Grid>
            </Grid>
            <Grid container className={classes.borderbox}>
              <Grid item xs={12}>
                <Typography variant="h4" className={classes.headingtypo}>
                  Emergency Contact
                </Typography>
              </Grid>
              <Grid container>
                <Grid item xs={6}>
                  <Grid container>
                    <Grid item xs={4}>
                      <Typography className={classes.textheading}>
                        Contact Name
                      </Typography>
                    </Grid>
                    <Grid xs={1}>:</Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.textvalue}>
                        {patientInfo?.emergContactFirstName
                          ? patientInfo?.emergContactFirstName +
                            " " +
                            patientInfo?.emergContactLastName
                          : "-"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid container>
                    <Grid item xs={4}>
                      <Typography className={classes.textheading}>
                        Contact Number
                      </Typography>
                    </Grid>
                    <Grid xs={1}>:</Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.textvalue}>
                        {patientInfo?.emergContactNumber || "-"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}>
                  <Grid container>
                    <Grid item xs={4}>
                      <Typography className={classes.textheading}>
                        Relationship
                      </Typography>
                    </Grid>
                    <Grid xs={1}>:</Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.textvalue}>
                        {patientInfo?.emergContactRelation || "-"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid container>
                    <Grid item xs={4}>
                      <Typography className={classes.textheading}>
                        Email
                      </Typography>
                    </Grid>
                    <Grid xs={1}>:</Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.textvalue}>
                        {patientInfo?.emergContactEmail || "-"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              rowGap={1}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Grid container className={classes.borderbox}>
                <Grid item xs={12}>
                  <Typography variant="h4" className={classes.headingtypo}>
                    Privacy
                  </Typography>
                </Grid>
                <Grid container>
                  <Grid item xs={6}>
                    <Grid container>
                      <Grid item xs={4}>
                        <Typography className={classes.textheading}>
                          Consent Form
                        </Typography>
                      </Grid>
                      <Grid xs={1}>:</Grid>
                      <Grid item xs={5}>
                        <Typography className={classes.textvalue}>
                          {patientInfo?.formConsent === null
                            ? "-"
                            : patientInfo?.formConsent
                            ? "Yes"
                            : "No"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container>
                      <Grid item xs={5}>
                        <Typography className={classes.textheading}>
                          Consent To Voice Call
                        </Typography>
                      </Grid>
                      <Grid xs={1}>:</Grid>
                      <Grid item xs={5}>
                        <Typography className={classes.textvalue}>
                          {patientInfo?.callConsent === null
                            ? "-"
                            : patientInfo?.callConsent
                            ? "Yes"
                            : "No"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6}>
                    <Grid container>
                      <Grid item xs={4}>
                        <Typography className={classes.textheading}>
                          Consent To Text
                        </Typography>
                      </Grid>
                      <Grid xs={1}>:</Grid>
                      <Grid item xs={5}>
                        <Typography className={classes.textvalue}>
                          {patientInfo?.messageConsent === null
                            ? "-"
                            : patientInfo?.messageConsent
                            ? "Yes"
                            : "No"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container>
                      <Grid item xs={5}>
                        <Typography className={classes.textheading}>
                          Consent To Email
                        </Typography>
                      </Grid>
                      <Grid xs={1}>:</Grid>
                      <Grid item xs={5}>
                        <Typography className={classes.textvalue}>
                          {patientInfo?.mailConsent === null
                            ? "-"
                            : patientInfo?.emailConsent
                            ? "Yes"
                            : "No"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default DemographicsTab;
