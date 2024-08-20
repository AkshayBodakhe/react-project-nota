/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, Typography, ThemeProvider } from "@mui/material";
import React from "react";
// import { AgeGroupSeen, YearOfexperiance, Option } from "../../common/form-enum";
import { adminConstants } from "../../../constants/admin";
import { makeStyles } from "@mui/styles";
import theme from "../../../theme";
import { providerLabel, providerValue } from "../../../styles/common";

const providerProfileGridStyles = makeStyles(() => {
  return {
    gridName: {
      marginBottom: "-10px !important",
    },
    speciality: {
      color: "#0097F0 !important",
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
      rowGap: "20px",
    },
    fieldTextStyle: {
      color: "#1A1A1A80 !important",
    },
    valueTextStyle: {
      color: "black !important",
    },
    gridTitle: {
      color: "#1B5984 !important",
      fontWeight: "bold !important",
      opacity: 1,
      fontSize: "16px !important",
    },
    valueTextStyle2: {
      // color: '#3A3A3A99 !important',
      color: "black",
      display: "flex",
      justifyContent: "center",
    },
    detailsTitle: {
      fontSize: "14px",
      fontWeight: "600 !important",
      marginBottom: "1.4rem",
      // width: "11.375rem",
      margin: "2% !important",
    },
  };
});

// const { screens } = styleProperties;
const {
  BASIC_ACCOUNT_DATA,
  YEAR_OF_EXPERIENCE,
  // SUB_SPECIALTIES,
  // HOSPITIAL_AFFAIR,
  // ACCEPT_NEW_PATIENTS,
  // AGE_GROUP_SEEN,
  // ACCEPT_CASH_PAY,
  // PROVIDER_EMPLOYEMNT,
  // GROUP_NPI_NUMBER,
  // YES,
  // NO,
  WORK_EXPERIENCE,
} = adminConstants;

interface AccountProfileProps {
  label: string;
  value: string;
}
interface AccountProfileDataProps {
  accountProfileData: any;
}
function AccountProfileRow({ label, value }: AccountProfileProps) {
  return (
    <>
      <Grid item xs={4} sm={4}>
        <Typography sx={providerLabel}>{label}</Typography>
      </Grid>
      <Grid item xs={8} sm={8}>
        <Typography sx={providerValue}>{value}</Typography>
      </Grid>
    </>
  );
}

function AccountProfileData({ accountProfileData }: AccountProfileDataProps) {
  const classes = providerProfileGridStyles();
  // const workExperaince = [
  //   {
  //     value: "General Practitioner I Kaiser Permanente - San Jose, CA",
  //     info: "(07/2018- Current)",
  //   },
  //   {
  //     value: "General Practitioner I Kaiser Permanente - San Jose, CA",
  //     info: "(07/2018- Current)",
  //   },
  //   {
  //     value: "General Practitioner I Kaiser Permanente - San Jose, CA",
  //     info: "(07/2018- Current)",
  //   },
  // ];
  // function getSelectedValue(
  //   options: Option[],
  //   keyToMatch: string,
  //   defaultValue: string = ""
  // ): string {
  //   const selectedOption = options.find((option) => option.key === keyToMatch);
  //   return selectedOption ? selectedOption.value : defaultValue;
  // }

  return (
    <ThemeProvider theme={theme}>
      <Grid container className={classes.providerInformationGrid}>
        <React.Fragment>
          <Grid container gap={"15px"}>
            <Grid item xs={12}>
              <Typography variant="h3" className={classes.gridTitle}>
                {BASIC_ACCOUNT_DATA}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={4} sm={5} lg={5}>
                  <Grid container rowGap={4}>
                    {[
                      // {
                      //   label: SUB_SPECIALTIES,
                      //   value: accountProfileData?.subSpeciality || '-',
                      // },
                      // {
                      //   label: HOSPITIAL_AFFAIR,
                      //   value: accountProfileData?.hospitalAffilation,
                      // },
                      {
                        label: YEAR_OF_EXPERIENCE,
                        value: (accountProfileData?.experienceYears || '-').replaceAll('_',' ') || accountProfileData?.experienceYears 
                      },
                      // {
                      //   label: ACCEPT_NEW_PATIENTS,
                      //   value: accountProfileData?.acceptNewPatients ? YES : NO,
                      // },
                      {
                        label: WORK_EXPERIENCE,
                        value: accountProfileData?.workExperience
                        // value: accountProfileData?.workExperience?.map((res: any, index: any) => (
                        //   <Typography sx={{ ...providerValue, marginBottom: "5px" }} key={index}>
                        //     {`${index + 1}. ${res.name}`}
                        //   </Typography>
                        // )),
                      },
                    ].map(({ label, value }) => (
                      <AccountProfileRow
                        key={label}
                        label={label}
                        value={value}
                      />
                    ))}
                  </Grid>
                </Grid>
                {/* <Grid item xs={8} lg={7} sm={7}>
                  <Grid container xs={12} gap={"20px"}>
                    {[
                      {
                        label: AGE_GROUP_SEEN,
                        value: accountProfileData?.ageGroupSeen
                      },
                      {
                        label: ACCEPT_CASH_PAY,
                        value: accountProfileData?.acceptCashPay ? YES : NO,
                      },
                      {
                        label: PROVIDER_EMPLOYEMNT,
                        value: accountProfileData?.referralNumber,
                      },
                      {
                        label: GROUP_NPI_NUMBER,
                        value: accountProfileData?.groupNpi,
                      },
                    ].map(({ label, value }) => (
                      <React.Fragment key={label}>
                        <Grid item xs={3}>
                          <Typography sx={providerLabel}>{label}</Typography>
                        </Grid>
                        <Grid item xs={7}>
                          <Typography sx={providerValue}>{value}</Typography>
                        </Grid>
                      </React.Fragment>
                    ))}
                  </Grid>
                </Grid> */}
              </Grid>
            </Grid>
            {/* <Grid item xs={12}>
              <Grid container>
                <Grid item xs={3}>
                  <Typography sx={providerLabel}>Work Experiance</Typography>
                </Grid>
                <Grid item xs={6}>
                  {workExperaince?.map((location, index) => (
                    <Typography sx={{...providerValue,marginBottom:"5px"}}  key={index}>
                      {`${index + 1}. ${location.value}`}
                    </Typography>
                  ))}
                </Grid>
                <Grid item xs={3}>
                {workExperaince?.map((location, index) => (
                    <Typography sx={{...providerValue,marginBottom:"5px"}} key={index}>
                      {`${index + 1}. ${location.info}`}
                    </Typography>
                  ))}
                </Grid>
              </Grid>
            </Grid> */}
          </Grid>
        </React.Fragment>
      </Grid>
    </ThemeProvider>
  );
}

export default AccountProfileData;
