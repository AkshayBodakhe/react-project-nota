/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, ThemeProvider, Typography } from "@mui/material";
import React from "react";
import theme from "../../../theme";
import { makeStyles } from "@mui/styles";
import { adminConstants } from "../../../constants/admin";
import { providerLabel, providerValue } from "../../../styles/common";
import { capitalizeFirstLetter } from "../../../pages/app/admin/provider-groups/common-files/functions";

export const providerProfileGridStyles = makeStyles(() => {
  return {
    gridName: {
      // marginBottom: "-10px !important",
    },
    speciality: {
      // color: "#0097F0 !important",
      padding: "10px",
      borderRadius: "20px",
      backgroundColor: "#CCECFF80 !important",
      width: "fit-content",
      fontWeight: "bold !important",
    },
    mainContainer: {
      rowGap: "15px",
    },
    profileLeftGrid: {
      display: "flex",
      justifyContent: "left",
    },
    imageStyle: {
      borderRadius: "60%",
      height: "110px",
    },
    providerInformationGrid: {
      rowGap: "15px",
    },
    fieldTextStyle: {
      // color: "#1A1A1A80 !important",
    },
    valueTextStyle: {
      // color: "#1A1A1ACC !important",
    },
    gridTitle: {
      color: "#1B5984 !important",
      fontWeight: "bold !important",
      opacity: 1,
      fontSize: "16px !important",
    },
    valueTextStyle2: {
      // color: "#3A3A3A99 !important",
      // display: "flex",
      // justifyContent: "center",
      fontSize: "14px",
      color: "black",
    },
    detailsTitle: {
      fontSize: "14px",
      fontWeight: "600 !important",
      marginBottom: "1.4rem",
      // width: "9.375rem",
      margin: "2% !important",
    },
  };
});

const {
  BASIC_INFORMATION,
  OFFICE_FAX_NUMBER,
  LICENESE_NUMBER,
  TAXONOMY_NUMBER,
  LICENSED_STATE,
  COUNTY,
  WORK_LOCATION,
  GROUP_NPI_NUMBER,
  LANGAGE_SPOKEN,
  INSURANCE_VERIFICATION,
  PRIOR_AUTORIZATION,
} = adminConstants;

interface ProfileInfoRow {
  label: string;
  value: string;
}

interface ProfileInformationProps {
  profileInformationData?: any;
}

function ProfileInfoRow({ label, value }: ProfileInfoRow) {
  // const classes = providerProfileGridStyles();

  return (
    <>
      <Grid item xs={4} sm={4}>
        <Typography sx={providerLabel}>{label}</Typography>
      </Grid>
      <Grid item xs={8} sm={8}>
        <Typography sx={providerValue}>
          {value.length > 1 ? value + ", " : value}
        </Typography>
      </Grid>
    </>
  );
}

const getAllCountries = (countries: any) => {
  const country = countries?.map((item: any) => {
    return item?.country;
  });
  return country;
};

function ProfileInformation({
  profileInformationData,
}: ProfileInformationProps) {
  const classes = providerProfileGridStyles();

  const getAllLangs = (languages: any) => {
    return (
      <Grid container>
        {languages &&
          languages?.map((item: any) => (
            <Typography noWrap px={0.5}>
              {item.name}
            </Typography>
          ))}
      </Grid>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container className={classes.providerInformationGrid}>
        <React.Fragment>
          <Grid container gap={"15px"}>
            <Grid item xs={12}>
              <Typography variant="h3" className={classes.gridTitle}>
                {BASIC_INFORMATION}
              </Typography>
            </Grid>
            <Grid item container xs={12}>
              {/* <Grid > */}
              <Grid item xs={5} sm={6} md={5.5} lg={5}>
                <Grid container rowGap={4}>
                  <ProfileInfoRow
                    label={OFFICE_FAX_NUMBER}
                    value={profileInformationData?.officeFaxNumber}
                  />
                  <ProfileInfoRow
                    label={LICENESE_NUMBER}
                    value={profileInformationData?.licenseNumber}
                  />
                  <ProfileInfoRow
                    label={GROUP_NPI_NUMBER}
                    value={profileInformationData?.groupNpi}
                  />
                  <ProfileInfoRow
                    label={TAXONOMY_NUMBER}
                    value={profileInformationData?.taxonomyNumber}
                  />
                  <ProfileInfoRow
                    label={COUNTY}
                    value={getAllCountries(profileInformationData?.countries)}
                    // value={profileInformationData?.licensedStates?.map((res: any) => {
                    //   return (<> {res.state} </>)
                    // })}
                  />
                </Grid>
              </Grid>
              <Grid item container xs={7} sm={6} md={6.5} lg={7} rowGap={2}>
                {/* <Grid  > */}
                <Grid item container>
                  <Grid item xs={4} lg={4}>
                    <Typography sx={providerLabel}>{WORK_LOCATION}</Typography>
                  </Grid>
                  <Grid item xs={8} sm={8} lg={8}>
                    <Typography sx={providerValue}>
                      {profileInformationData?.workLocation &&
                        profileInformationData?.workLocation?.map(
                          (location: any, index: number) => {
                            return (
                              <Typography
                                sx={{ ...providerValue, marginBottom: "8px" }}
                                key={location.id}
                              >
                                {`${index + 1}. ${location.name}`}
                                <br></br>
                              </Typography>
                            );
                          }
                        )}
                    </Typography>
                  </Grid>
                </Grid>
                {/* <Grid item xs={4} lg={4}>
                      <Typography sx={providerLabel}>{EMAILID}</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography sx={providerValue}>
                        {profileInformationData?.email}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} lg={4}>
                      <Typography sx={providerLabel}>{PHONE_NUMBER}</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography sx={providerValue}>
                        {profileInformationData?.phonenumber}
                      </Typography>
                    </Grid> */}
                <Grid item container>
                  <Grid item xs={4} lg={4}>
                    <Typography sx={providerLabel}>{LANGAGE_SPOKEN}</Typography>
                  </Grid>
                  <Grid item xs={8} sx={providerValue}>
                    {getAllLangs(profileInformationData?.languages) || "-"}
                  </Grid>
                </Grid>
                <Grid item container>
                  <Grid item xs={4} lg={4} sx={providerValue}>
                    <Typography sx={providerLabel}>
                      {INSURANCE_VERIFICATION}
                    </Typography>
                  </Grid>
                  <Grid item xs={8} sx={providerValue}>
                    {capitalizeFirstLetter(
                      (
                        profileInformationData?.insuranceVerification || ""
                      )?.replaceAll("_", " ")
                    ) || "-"}
                  </Grid>
                </Grid>
                <Grid item container>
                  <Grid item xs={4} lg={4}>
                    <Typography sx={providerLabel}>
                      {PRIOR_AUTORIZATION}
                    </Typography>
                  </Grid>
                  <Grid item xs={8} sx={providerValue}>
                    {capitalizeFirstLetter(
                      (
                        profileInformationData?.priorAuthorisations || ""
                      )?.replaceAll("_", " ")
                    ) || "-"}
                  </Grid>
                </Grid>
                {/* </Grid> */}
              </Grid>
              {/* </Grid> */}
            </Grid>
          </Grid>
        </React.Fragment>
      </Grid>
    </ThemeProvider>
  );
}

export default ProfileInformation;
