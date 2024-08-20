/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, ThemeProvider, Typography } from "@mui/material";
import React from "react";
import theme from "../../../theme";

import { makeStyles } from "@mui/styles";
import { adminConstants } from "../../../constants/admin";
import { providerLabel, providerValue } from "../../../styles/common";

const providerProfileGridStyles = makeStyles(() => {
  return {
    gridName: {
      // marginBottom: "-10px !important",
      // background: 'red'
      // marginLeft: '10px',
      // fontSize: '30px !important',
      fontWeight: "bold !important",
      whiteSpace: "nowrap",
      letterSpacing: "0.29px",
      fontSize: "20px !important",
      // marginBottom: '15px !important',
    },
    speciality: {
      color: "#36588C !important",
      padding: "8px",
      // display: 'flex !important',
      borderRadius: "20px",
      backgroundColor: "#DAEAF8 !important",
      width: "fit-content",
      gap: "5px",
      // fontWeight: "bold !important",
    },
    showSpeciality: {
      background: "#CCECFF4D",
      borderRadius: "15px",
      opacity: 1,
    },
    specialityName: {
      color: "#1B5984 !important",
      opacity: 1,
      padding: "6px",
      fontSize: "16px !important",
    },
    mainContainer: {
      rowGap: "15px",
    },
    profileLeftGrid: {
      display: "flex",
      justifyContent: "left",
    },
    imageStyle: {
      borderRadius: "70%",
      height: "120px",
      width: '130px'
    },
    providerInformationGrid: {
      rowGap: "20px",
    },
    valueTextStyle: {
      color: "#1A1A1ACC !important",
    },
    gridTitle: {
      color: "#36588C !important",
      fontWeight: "bold !important",
    },
    valueTextStyle2: {
      color: "#3A3A3A99 !important",
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
    multispeciality: {
      background: '#CCECFF4D 0% 0% no-repeat padding-box',
      borderRadius: '14px',
      opacity: 1,
      font: 'normal normal bold 14px/22px Roboto',
      letterSpacing: '0.5px',
      color: '#0097F0',
      padding: '5px 10px'
    }
  };
});

const sxs = {
  providerName: {
    display: "flex !important",
    // alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    gap: "5px",
    // width: '30%'
  },
  specialities: {
    display: "flex",
    gap: "5px",
    flexDirection: "column !important",
    // flexWrap: 'wrap',
    marginBottom: "30px",
  },
};

// interface ProfileInfoProps {
//   label?: string;
//   value?: string;
// }

interface ProfileGridProps {
  profileData?: any;
}
// function ProfileInfo({ label, value }: ProfileInfoProps) {
//   // const { screens } = styleProperties;
//   const classes = providerProfileGridStyles();

//   return (
//     <>
//       <Grid sx={{ display: 'flex' }} xs={12}>
//         <Grid item md={5}>
//           <Typography variant="h5" className={classes.detailsTitle}>
//             {label}
//           </Typography>
//         </Grid>
//         <Grid md={1}>
//           |
//         </Grid>
//         <Grid item md={5}>
//           <Typography variant="h5" className={classes.valueTextStyle}>
//             {value}
//           </Typography>
//         </Grid>
//       </Grid>
//     </>
//   );
// }

function ProfileGrid({ profileData }: ProfileGridProps) {
  const {
    // PROVIDER_TYPE,
    // GENDER,
  } = adminConstants;
  const classes = providerProfileGridStyles();
  //const { screens } = styleProperties;

  const {
    providerType,
    gender,
    npi,
    // federalTaxIdNumber,
    // deanumber,
    phonenumber,
    email,
    providerBio,
    speciality
  } = profileData;

  return (
    <ThemeProvider theme={theme}>
      <Grid container className={classes.mainContainer}>
        <React.Fragment>
          <Grid item xs={12} sm={12} className={classes.profileLeftGrid}>
            <Grid xs={4} sm={12} lg={4}>
              <img
                src={profileData?.avatar}
                alt="Profile"
                className={classes.imageStyle}
              />
            </Grid>

          </Grid>
          <Grid sx={sxs.providerName} sm={12}>
            <Grid mb={2}>
              <Typography className={classes.gridName}>
                {profileData?.name}
              </Typography>
            </Grid>
            {speciality?.length > 1 ? (
              <Typography>
                <span className={classes.multispeciality}>
                  Multispeciality
                </span>
              </Typography>
            ) : (
              <Typography>
                {speciality?.map((speciality: any) => {
                  return (
                    <span className={classes.multispeciality}>
                      {speciality.name}
                    </span>
                  )
                })}
              </Typography>
            )}
            {/* <Grid sx={providerSpeciality.showSpeciality}>
              
              <Typography sx={providerSpeciality.specialityName}>
                  {speciality && speciality?.map((res: any) => {
                    return (<>
                      {res?.name}{" "}
                    </>)
                  })}
                  {!speciality || ('-')}
                </Typography>
            </Grid> */}
          </Grid>
          {/* <Grid item sx={sxs.specialities}>
            {(profileData?.speciality &&
              profileData?.speciality?.map((spec: any) => {
                return (
                  <Typography
                    variant="h5"
                    className={classes.speciality}
                  >{` ${spec.name.charAt(0).toUpperCase()}${spec.name
                    .slice(1)
                    .toLowerCase()}`}</Typography>
                );
              })) ||
              "-"}
          </Grid> */}
          <Grid item xs={12}>
            <Grid container gap={"20px"}>
              <Grid item xs={12} >
                <Grid container>
                  <Grid item xs={5} sx={providerLabel}>Provider Type</Grid>
                  <Grid item xs={7} sx={providerValue}>{providerType}</Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} >
                <Grid container>
                  <Grid item xs={5} sx={providerLabel}>Gender</Grid>
                  <Grid item xs={7} sx={providerValue}>{gender}</Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} >
                <Grid container>
                  <Grid item xs={5} sx={providerLabel}>Contact Number</Grid>
                  <Grid item xs={7} sx={providerValue}>{phonenumber}</Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} >
                <Grid container>
                  <Grid item xs={5} sx={providerLabel}>Email</Grid>
                  <Grid item xs={7} sx={providerValue}>{email}</Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} >
                <Grid container>
                  <Grid item xs={5} sx={providerLabel}>NPI Number</Grid>
                  <Grid item xs={7} sx={providerValue}>{npi}</Grid>
                </Grid>
              </Grid>
              {/* <Grid item xs={12} >
                <Grid container>
                  <Grid item xs={5} sx={providerLabel}>Federal Tax ID Number</Grid>
                  <Grid item xs={7} sx={providerValue}>{federalTaxIdNumber}</Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} >
                <Grid container>
                  <Grid item xs={5} sx={providerLabel}>DEA Number</Grid>
                  <Grid item xs={7} sx={providerValue}>{deanumber}</Grid>
                </Grid>
              </Grid> */}
              <Grid item xs={12} >
                <Grid container>
                  <Grid item xs={5} sx={providerLabel}>Bio</Grid>
                  <Grid item xs={7} sx={providerValue}>{providerBio}</Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* <ProfileInfo label={PROVIDER_TYPE} value={profileData?.providerType} /> */}
          {/* <ProfileInfo label={PHONE_NUMBER} value={profileData?.phonenumber} /> */}
        </React.Fragment>
      </Grid>
    </ThemeProvider>
  );
}

export default ProfileGrid;
