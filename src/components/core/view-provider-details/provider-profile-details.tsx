/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, ThemeProvider } from "@mui/material";
// import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { adminConstants } from "../../../constants/admin";
import theme from "../../../theme";
import AccountProfileData from "./account-profile-data";
import ProfileGrid from "./profile.grid";
import ProfileInformation from "./provider-profile-information";
import Loading from "../../common/spinner/loading";
// import { backIcon, backToParent, backToText } from "../../../styles/auth-form";
// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export const profileStyles = makeStyles(() => {
  return {
    editGrid: {
      display: "flex",
      justifyContent: "end",
    },
    editButton: {
      border: "1px solid #36588C !important",
      borderRadius: "5px !important",
      width: "7rem",
      height: "32px",
      color: "#36588C !important",
      fontWeight: "bold !important",
    },
    mainDataGrid: {
      marginTop: "20px !important",
      marginLeft: "0px !important",
      columnGap: "10px",
      justifyContent: "space-between",
    },
    gridItemStyle: {
      border: "none",
      "& fieldset": { border: "none" },
      boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.2)",
      borderRadius: "5px",
      padding: "10px 8px",
      background: "white",
    },
    gridItemStyle1: {
      border: "none",
      // marginTop: "15px !important",
      "& fieldset": { border: "none" },
      boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.2)",
      borderRadius: "5px",
      padding: "10px 8px",
      background: "white",
    },
    addButtonTypo: {
      color: "#36588C !important",
      display: "flex",
      paddingLeft: "0.2rem",
      paddingRight: "0.2rem",
    },
    addUserRoleBtnTypo: {
      fontWeight: "700 !important",
      color: "#36588C !important",
      display: "flex",
      paddingRight: "12px",
    },
    icon: {
      fontSize: "20px !important",
    },
  };
});

export const buttonBaseStyle = () => {
  return {
    border: "1px solid #36588C !important",
    borderRadius: "5px !important",
    width: "65px",
    height: "26px",
    background: "#CCECFF80",
  };
};

// const sxs = {
//   heading: {
//     justifyContent: "space-between",
//     marginBottom: "20px",
//     // paddingRight: '10px'
//   },
//   editBtn: {
//     backgroundColor: "#DAEAF8 !important",
//     textTransform: "initial",
//     boxShadow: "none !important",
//     // padding: "6px 16px !important",
//     borderRadius: "8px !important",
//     color: '#36588C'
//   },
// };
interface ViewProviderProps {
  providerDetails: any;
  isLoading?: boolean;
  source?: string;
  providerGroupId?: string;
  providerId?: string;
  apiSource?: string;
}

function ProviderProfile({
  providerDetails,
  isLoading,
}: // source,
//providerGroupId,
//providerId,
// apiSource,
ViewProviderProps) {
  const {
    // EDIT_PROFILE,
    // ADMIN,
    //ADMINEDIT,
    //PROVIDEREDIT,
    // PROVIDER_PROFILE,
    //PROVIDER,
    // USER,
  } = adminConstants;
  const classes = profileStyles();
  // const navigation = useNavigate();
  // const [isAdminEditProviderModalOpen, setIsAdminEditProviderModalOpen] =
  //   useState(false);

  const [profileData, setProfileData] = useState({
    name: "",
    providerType: "",
    avatar: "",
    deanumber: "",
    federalTaxIdNumber: "",
    phonenumber: "",
    providerBio: "",
    npi: "",
    gender: "",
    email: "",
    speciality: [],
  });

  const [profileInformationData, setProfileInformationData] = useState({
    officeFaxNumber: "",
    licenseNumber: "",
    groupNpi: "",
    taxonomyNumber: "",
    licensedStates: [],
    workLocation: "",
    languages: [],
    insuranceVerification: "",
    priorAuthorisations: "",
    countries: [],
    // acceptedInsurances: [],
  });

  const [accountProfileData, setAccountProfileData] = useState({
    // acuteSpeciality: "",
    // hospitalAffilation: "",
    experienceYears: "",
    // acceptNewPatients: "",
    // ageGroupSeen: "",
    // insuranceVerification: "",
    // acceptCashPay: "",
    workExperience: "",
    // referralNumber: "",
  });

  useEffect(() => {
    if (
      !providerDetails?.getProviderProfile &&
      providerDetails?.response === null
    )
      return;
    if (providerDetails) {
      const {
        providerType,
        firstName,
        lastName,
        deanumber,
        contactNumber,
        npi,
        specialities,
        fax,
        licenseNumber,
        groupNpi,
        taxonomyNumber,
        licensedStates,
        workLocations,
        federalTaxIdNumber,
        languages,
        // acceptedInsurances,
        email,
        experienceYears,
        gender,
        avatar,
        insuranceVerification,
        priorAuthorisations,
        countries,
      } = providerDetails;

      const {
        // acuteSpeciality,
        // hospitalAffilation,
        // acceptNewPatients,
        // ageGroupSeen,
        // acceptCashPay,
        // insuranceVerification,
        bio,
        experience,
        // referralNumber,
      } = providerDetails?.providerProfileInfo || {};

      setProfileData({
        speciality: specialities || [],
        providerType: providerType || "-",
        federalTaxIdNumber: federalTaxIdNumber || "-",
        deanumber: deanumber || "-",
        name: firstName + " " + lastName || "-",
        phonenumber: contactNumber || "-",
        npi: npi || "-",
        avatar: avatar || "",
        gender: gender || "-",
        email: email || "-",
        providerBio: bio || "-",
      });
      setProfileInformationData({
        officeFaxNumber: fax || "-",
        licenseNumber: licenseNumber || "-",
        groupNpi: groupNpi || "-",
        taxonomyNumber: taxonomyNumber || "-",
        licensedStates: licensedStates || [],
        workLocation: workLocations || [],
        languages: languages,
        insuranceVerification: insuranceVerification,
        priorAuthorisations: priorAuthorisations,
        countries: countries || [],
        // acceptedInsurances: acceptedInsurances || [],
      });
      setAccountProfileData({
        // acuteSpeciality: acuteSpeciality || "-",
        // hospitalAffilation: hospitalAffilation || "-",
        experienceYears: experienceYears || "-",
        // acceptNewPatients: acceptNewPatients || "-",
        // ageGroupSeen: ageGroupSeen || "-",
        // insuranceVerification: insuranceVerification || "-",
        // acceptCashPay: acceptCashPay || "-",
        workExperience: experience || "-",
        // referralNumber: referralNumber || "-",
      });
    } else {
      //show snackbar
    }
  }, [providerDetails]);

  // const onBackClick = () => {
  //   navigation(-1);
  // };

  // const editProviderDetails = () => {
  //   setIsAdminEditProviderModalOpen(true);
  // };

  return (
    <ThemeProvider theme={theme}>
      {isLoading && <Loading />}
      {!isLoading && (
        <Grid mt={1}>
          <Grid container>
            {/* <Grid container sx={sxs.heading}>
            <Box sx={backToParent}>
              <ArrowBackIosIcon sx={backIcon} />
              <Typography onClick={onBackClick} sx={backToText}>
                Back
              </Typography>
            </Box>
          </Grid> */}

            {/* <Grid item xs={10} sx={{ display: "flex", alignItems: "center" }}>
            {(source === ADMIN || apiSource === USER) && (
              <>
                <Typography variant="h2" sx={{ fontWeight: "bold !important" }}>
                  {PROVIDER_PROFILE}
                </Typography>
              </>
            )}
          </Grid> */}
            {/* <Grid item xs={2} className={classes.editGrid}>
            {source === ADMIN && (
              <Button
                variant="contained"
                sx={{
                  ...formButtonStyle.defaultBtn,
                  '&:hover': { background:"#CCECFF80"},
                }}
                onClick={editProviderDetails}
                type="submit"
                
              >
                <EditOutlinedIcon className={classes.icon} />&nbsp;{EDIT_PROFILE}
              </Button>
            )}
          </Grid> */}
          </Grid>
          <Grid container className={classes.mainDataGrid}>
            <Grid item className={classes.gridItemStyle} lg={3}>
              <ProfileGrid profileData={profileData} />
            </Grid>
            <Grid item container lg={8.9} gap={2}>
              <Grid item lg={12} className={classes.gridItemStyle}>
                <ProfileInformation
                  profileInformationData={profileInformationData}
                />
              </Grid>
              <Grid item lg={12} className={classes.gridItemStyle1}>
                <AccountProfileData accountProfileData={accountProfileData} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </ThemeProvider>
  );
}

export default ProviderProfile;
