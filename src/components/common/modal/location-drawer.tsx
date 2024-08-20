import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
// import Button from "@mui/material/Button";
import {
  Grid,
  ButtonBase,
  Typography,
  // InputBase,
  // InputAdornment,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
// import ProviderGroupDepartmentTable from "../../core/layout/table/provider-group-department-table";
// import ProviderGroupPatients from "../../../pages/app/admin/provider-groups/details/provider-group-patients/provider-group-patients";
// import SearchIcon from "@mui/icons-material/Search";
// import { backIcon, backToParent, backToText } from "../../../../../../styles/auth-form";
// import LocationModal from "./location-modal";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import { backIcon, backToParent, backToText } from "../../../../../thinkemr-portal/src/styles/auth-form";
// import ProviderGroupUsersPage from "../../../pages/app/admin/provider-groups/details/provider-group-users";
import ProviderGroupPatientPage, {
  Patients,
} from "../../../pages/app/admin/provider-groups/details/provider-group-patients";
import ProviderGroupDepartment, {
  Departments,
} from "../../../pages/app/admin/provider-groups/details/provider-group-department/provider-group-department";
// import { useLocationControllerServiceGetLocationByLocationId } from "../../../sdk/thinkemr-core-0.0.1/queries";
// import { PracticeHour } from "../../../sdk/thinkemr-core-0.0.1/requests";
import ProviderGroupUsers, {
  USERS,
} from "../../../pages/app/admin/provider-groups/details/provider-group-users/provider-group-users";
import providerGroupService from "../../../service/provider-group--service";
import { Enums } from "../../../pages/app/admin/provider-groups/common-files/enums";
import {
  convertTo12HourFormat,
  customSortDays,
} from "../../../pages/app/admin/provider-groups/common-files/functions";
import { capitalizeFirstLetter } from "../enums-and-interfaces/common-functions";
import { useSelector } from "react-redux";
import { Permission } from "../enums-and-interfaces/enums";
import ProviderGroupLocationDepartment from "../../../pages/app/admin/provider-groups/details/provider-group-department/provider-group-location-department";
// import { formButtonStyle } from "../../../../src/styles/common";
// import LocationModal from "./location-modal";
// import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

const drawerStyle = makeStyles(() => ({
  heading: {
    justifyContent: "space-between",
    // padding: "12px",
    width: "100%",
    // background: "#F5F6F9 0% 0% no-repeat padding-box !important",
    padding: "0 1%",
  },
  buttonActive: {
    boxSizing: "border-box",
    fontSize: "18px !important",
    // background: "#36588C 0% 0% no-repeat padding-box !important",
    borderBottom: "3px solid #004186 !important",
    // borderRadius: "5px !important",
    width: "120px",
    height: "32px",
    // margin: "5px 3px !important",
  },
  buttonTypoActive: {
    fontSize: "16px !important",
    color: "#004186 !important",
    fontWeight: "bold !important",
  },
  buttonTypoDeactive: {
    color: "#1A1A1A80 !important",
    fontWeight: "bold !important",
  },
  buttonGrid1: {
    borderRadius: "5px",
    border: "none",
    width: "100%",
  },
  addButtonTypo: {
    // color: "#ffffff !important",
    display: "flex",
    paddingRight: "7px",
    opacity: 0.9,
  },

  buttonDeactive: {
    boxSizing: "border-box",
    fontSize: "14px !important",
    // borderRadius: "5px !important",
    // background: "#1A1A1A1A 0% 0% no-repeat padding-box !important",
    width: "120px",
    height: "32px",
  },
}));

// const commonPorviderGroupWidget = makeStyles(() => ({
//   providerGroupHeaderLayout: {
//     display: "flex",
//     padding: "15px",
//     justifyContent: "space-between",
//     marginBottom: "20px",
//     "@media (max-width: 820px)": {
//       gap: "1rem",
//       display: "block",
//     },
//     "@media (max-width: 768px)": {
//       gap: "1rem",
//       display: "block",
//     },
//   },
//   providerGroupSearch: {
//     display: "flex",
//     gap: "27px",
//     "@media (max-width: 820px)": {
//       display: "block",
//       width: "100%",
//       gap: "1rem",
//     },
//     "@media (max-width: 768px)": {
//       display: "block",
//       gap: "1rem",
//       width: "100%",
//     },
//   },

//   AddressFormLongtInputField2: {
//     borderRadius: "5px",
//     border: "none",
//     "& fieldset": { border: "none" },
//     boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
//     height: "38px",
//     textAlign: "center",
//     padding: "13px 0px 10px 16px",
//     fontSize: "16px",
//     alignItems: "center",
//     "& input::placeholder": {
//       alignItems: "center",
//       fontSize: "12.5px",
//     },
//     "@media (max-width: 820px)": {
//       width: "100%",
//     },
//     "@media (max-width: 768px)": {
//       width: "100%",
//     },
//   },
//   inputBoxText2: {
//     fontFamily: "Roboto",
//     fontStyle: "normal",
//     fontSize: "14px !important",
//     lineHeight: "140%",
//     color: "",
//     width: "100%",
//     resize: "vertical",
//     minHeight: "15px",
//   },
//   inputBoxActive2: {
//     background: "#FFFFFF 0% no-repeat padding-box !important",
//     boxShadow: "0px 0px 6px #00418602 !important",
//     border: "1px solid #36588C!important",
//     borderRadius: "4px !important",
//   },
// }));

const sxs = {
  searchBoxWidth: {
    width: "24rem",
    "@media (max-width: 820px)": {
      width: "100% !important",
    },
    "@media (max-width: 768px)": {
      width: "100% !important",
    },
  },
  searchIcon: {
    position: "relative",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  parentContainerFlex: {
    display: "flex",
    alignItems: "end",
    gap: "30px",
    margin: "0px 10px",
  },
  imageBox: {
    "@media (min-width: 810px) and (max-width: 820px)": {
      paddingBottom: "29px",
    },
    "@media (min-width: 750px) and (max-width: 768px)": {
      paddingBottom: "29px",
    },
  },
  imageSize: {
    width: "22.438rem",
    height: "19.938rem",
    borderRadius: "15px",
  },
  flexItem: {
    display: "flex",
    alignItems: "center",
    gap: "40px",
  },
  providerKeyTypo: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#1A1A1A80",
    marginBottom: "1.2rem",
    width: "8.375rem",
  },
  locationDetails: {
    fontSize: "14px",
    fontWeight: "700",
    marginBottom: "1.4rem",
    width: "6.375rem",
  },
  providerKeyTypo2: {
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "1.4rem",
    width: "12.375rem",
    color: "#36588C",
  },
  boxRight: {
    "@media (min-width: 810px) and (max-width: 820px)": {
      paddingTop: "36px",
    },
  },
  keyValyeFlex: {
    display: "flex",
    gap: "50px",
    marginBottom: "1.40rem",
  },
  fontBoldStyle: {
    fontSize: "14px",
    fontWeight: "bold",
  },
  providerValueTypo: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1A1A1ACC",
    wordWrap: "break-word",
    // color: "black",
  },
  details: {
    display: "flex",
    width: "20px",
  },
  renderBtns: {
    display: "flex",
    // justifyContent: "space-between",
    // boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2) !important",
    // width: '50%',
    margin: "10px 0",
    border: "none",
  },
  heading: {
    // margin: "10px",
    display: "flex",
    justifyContent: "end",
    alignItems: "end",
    color: "#004186",
  },

  title: {
    fontSize: "18px",
    fontWeight: "bold",
  },

  table: {
    marginTop: "20px",
    // maxHeight: '42vh',
    // overflow: 'scroll'
  },

  addUserRoleBtnTypo: {
    // color: "#36588C !important",
    // fontWeight: "bold !important",
    display: "flex",
    paddingRight: "12px",
    background: "#36588C",
  },
};

export default function LocationDrawer({
  open,
  //setOpen,
  handleClose,
  //handleOpen,
  locationUuid,
}: any) {
  const [activeTab, setActiveTab] = React.useState("details");
  const handleUserSetting = (label: string) => {
    setActiveTab(label);
  };

  // const [openLocationModal, setOpenLocationModal] = React.useState(false);
  const [profileData, setProfileData] = React.useState({
    active: true,
    archive: false,
    avatar: "",
    email: "",
    name: "",
    specialities: [],
    locationHours: [
      {
        id: "",
        dayOfWeek: "",
        openingTime: "",
        closingTime: "",
      },
    ],
    locationId: "",
    contact: "",
    fax: "",
    note: "",
    groupNpi: "",
    physicalAddress: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
    },
    billingAddress: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
    },
  });
  const [providerGroupSchema] = React.useState<any>(
    localStorage.getItem(Enums.PROVIDER_GROUP_KEY) || ""
  );

  const classes = drawerStyle();

  const renderTabsData = [
    {
      name: "Details",
      lable: "details",
    },
    {
      name: "Departments",
      lable: "department",
    },
    // {
    //   name: "Patients",
    //   lable: "patients",
    // },
    {
      name: "Users",
      lable: "Users",
    },
  ];

  const userDetails = useSelector(
    (state: any) => state.commonReducer.userDetail
  );

  const getLocationById = (locationId: string) => {
    try {
      providerGroupService
        .getLocationByUuid(providerGroupSchema, locationId)
        .then((res) => {
          if (res?.data?.data?.locationHours)
            res.data.data.locationHours = sortLocationHours(
              res.data.data.locationHours
            );
          setProfileData((prev) => ({ ...prev, ...res?.data?.data }));
        });
    } catch (error) {}
  };
  // const { data } = useLocationControllerServiceGetLocationByLocationId({ uuid: locationUuid || '' });
  // console.log("🚀 ~ file: location-drawer.tsx:284 ~ data:", data);

  React.useEffect(() => {
    if (locationUuid) {
      getLocationById(locationUuid);
    }
  }, [open]);

  // function convertTo12HourFormat(time: any) {
  //   const [hours, minutes] = time?.split(':');
  //   const date = new Date(0, 0, 0, hours, minutes);
  //   return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  // }

  function sortLocationHours(locationHours: any[]) {
    if (!locationHours.length) return [];
    return locationHours.sort((a: any, b: any) =>
      customSortDays(a.dayOfWeek, b.dayOfWeek, false)
    );
  }

  const closeDrawer = () => {
    handleClose(false);
  };
  interface RenderButtonProps {
    name: string;
    label: string;
    btnActive?: boolean;
  }
  const RenderButton: React.FC<RenderButtonProps> = ({
    label,
    name,
    //btnActive,
  }) => {
    return (
      <ButtonBase
        className={
          activeTab === label ? classes.buttonActive : classes.buttonDeactive
        }
        onClick={() => handleUserSetting(label)}
        focusRipple
      >
        <Typography
          className={
            activeTab === label
              ? classes.buttonTypoActive
              : classes.buttonTypoDeactive
          }
        >
          {name}
        </Typography>
      </ButtonBase>
    );
  };

  // const classDepartment = commonPorviderGroupWidget();

  return (
    <div>
      <React.Fragment>
        <Drawer
          anchor="right"
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              width: "70%",
              borderTopLeftRadius: "5px",
              borderBottomLeftRadius: "5px",
            },
          }}
        >
          <Grid container className={classes.heading}>
            <Grid className={classes.buttonGrid1} item>
              <Grid
                xs={12}
                sx={{
                  display: "flex",
                  margin: "10px 0",
                  gap: "15px",
                }}
              >
                {/* <ArrowBackIcon onClick={handleClose}></ArrowBackIcon> */}
                {/* <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Grid item>
                    <Typography variant="h2" sx={{ fontWeight: "bold", mt: 1.5, mb: 1.5 }}>
                      {capitalizeFirstLetter(profileData.name) || '-'}
                    </Typography>
                  </Grid>
                  <Box sx={backToParent}>
                    <ArrowBackIosIcon sx={backIcon} />
                    <Typography onClick={closeDrawer} sx={backToText}>
                      Back
                    </Typography>
                  </Box>
                </Grid> */}
                <Grid sx={{ ...sxs.heading, mt: 1, mb: 1 }}>
                  <ArrowBackOutlinedIcon
                    sx={{ marginRight: "10px", cursor: "pointer" }}
                    onClick={closeDrawer}
                  />
                  <Typography variant="h2">
                    {"Location"}
                    {/* {capitalizeFirstLetter(profileData.name) || '-'} */}
                  </Typography>
                </Grid>
              </Grid>
              <Box sx={sxs.renderBtns}>
                {renderTabsData.map((data: any) => {
                  return <RenderButton label={data.lable} name={data.name} />;
                })}
              </Box>
              {/* <Box >
              <Box sx={sxs.renderBtns}>
                {renderTabsData.map((data) => {
                  return <RenderButton label={data.lable} name={data.name} />;
                })}
              </Box>
              {/* </Box> */}

              {activeTab == "details" ? (
                <Box>
                  {/* <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: '0' }}>
                    <Typography
                      // variant="h2"
                      sx={{
                        fontWeight: "700",
                        marginTop: "1.5rem",
                        marginBottom: "1rem",
                      }}
                    >
                      Location Details
                    </Typography>
                    {activeTab == "details" ? (
                      <>
                        <ButtonBase sx={{ ...formButtonStyle.saveButtonStyle, width: "auto !important", padding: "0px 10px" }} onClick={() => setOpenLocationModal(true)}>
                          <span className={classes.addButtonTypo}>
                            <ModeEditOutlineOutlinedIcon />
                          </span>
                          <Typography variant="h5" sx={sxs.addUserRoleBtnTypo}>
                            {'Edit Profile'}
                          </Typography>
                        </ButtonBase>
                        <LocationModal
                          locationId={locationUuid}
                          onCloseDrawer={handleClose}
                          buttonTitle="Edit Location"
                          dialogTitle="Edit Location"
                        />
                      </>
                    ) : null}
                  </Box> */}

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "25px",
                      mt: 1,
                    }}
                  >
                    <Box sx={{ display: "flex", gap: "25px" }}>
                      <Box
                        sx={{
                          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                          padding: "20px",
                          borderRadius: "10px",
                          // alignItems: "center",
                          display: "flex",
                          flexDirection: "column",
                          background: "white",
                          width: "50%",
                        }}
                      >
                        <Box>
                          <img
                            src={profileData.avatar}
                            style={{
                              height: "7rem",
                              width: "10rem",
                              marginBottom: "30px",
                              // borderRadius: "50%",
                            }}
                          />
                        </Box>
                        <Box sx={sxs.flexItem}>
                          <Grid container xs={12}>
                            <Grid item container>
                              <Grid item xs={5} sx={sxs.providerKeyTypo}>
                                Location Id
                              </Grid>
                              <Grid item xs={6} sx={sxs.providerValueTypo}>
                                {profileData.locationId || "-"}
                              </Grid>
                            </Grid>
                            <Grid item container>
                              <Grid item xs={5} sx={sxs.providerKeyTypo}>
                                Location Name
                              </Grid>
                              <Grid item xs={6} sx={sxs.providerValueTypo}>
                                {profileData.name || "-"}
                              </Grid>
                            </Grid>
                            <Grid item container>
                              <Grid item xs={5} sx={sxs.providerKeyTypo}>
                                Contact Number
                              </Grid>
                              <Grid item xs={6} sx={sxs.providerValueTypo}>
                                {profileData.contact || "-"}
                              </Grid>
                            </Grid>
                            <Grid item container>
                              <Grid item xs={5} sx={sxs.providerKeyTypo}>
                                Email
                              </Grid>
                              <Grid item xs={6} sx={sxs.providerValueTypo}>
                                {profileData.email || "-"}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                          padding: "20px",
                          borderRadius: "10px",
                          width: "100%",
                          background: "white",
                        }}
                      >
                        <Box>
                          <Typography sx={sxs.providerKeyTypo2}>
                            Basic Information
                          </Typography>
                        </Box>
                        {/* <Box sx={sxs.flexItem}> */}
                        <Grid container spacing={2}>
                          <Grid item container xs={6}>
                            <Grid item container>
                              <Grid item xs={6} sx={sxs.providerKeyTypo}>
                                Speciality
                              </Grid>
                              <Grid item xs={6} sx={sxs.providerValueTypo}>
                                {profileData.specialities.length === 1 ? (
                                  profileData.specialities.map(
                                    (res: any, index: number) =>
                                      `${res.name}${
                                        index ===
                                        profileData.specialities.length - 1
                                          ? ""
                                          : ", "
                                      } `
                                  )
                                ) : (
                                  <Typography>{"Multispeciality"}</Typography>
                                )}
                              </Grid>
                            </Grid>
                            <Grid item container>
                              <Grid item xs={6} sx={sxs.providerKeyTypo}>
                                Provider Group Fax Number
                              </Grid>
                              <Grid item xs={6} sx={sxs.providerValueTypo}>
                                {profileData.fax || "-"}
                              </Grid>
                            </Grid>
                            <Grid item container>
                              <Grid item xs={6} sx={sxs.providerKeyTypo}>
                                Group NPI Number
                              </Grid>
                              <Grid item xs={6} sx={sxs.providerValueTypo}>
                                {(profileData?.groupNpi as string) || "-"}
                              </Grid>
                            </Grid>
                            {/* <Grid item container>
                              <Grid item xs={4} sx={sxs.providerKeyTypo}>
                                Description
                              </Grid>
                              <Grid item xs={12} sx={sxs.providerValueTypo}>
                                {(profileData?.note as string) || "-"}
                              </Grid>
                            </Grid> */}
                          </Grid>
                          <Grid item container xs={6}>
                            <Grid item xs={3} sx={sxs.providerKeyTypo}>
                              Office Hours
                            </Grid>
                            <Grid item xs={9} sx={sxs.providerValueTypo}>
                              {profileData.locationHours.map(
                                (res: any, index: number) => {
                                  return (
                                    <>
                                      <Grid
                                        container
                                        sx={{
                                          margin: index != 0 ? "5px 0" : "",
                                        }}
                                      >
                                        <Grid item xs={4}>
                                          {capitalizeFirstLetter(res.dayOfWeek)}
                                        </Grid>
                                        <Grid item xs={8}>
                                          {convertTo12HourFormat(
                                            res.openingTime
                                          )}{" "}
                                          -{" "}
                                          {convertTo12HourFormat(
                                            res.closingTime
                                          )}
                                        </Grid>
                                      </Grid>
                                    </>
                                  );
                                }
                              )}
                            </Grid>
                          </Grid>
                          <Grid item container>
                            <Grid item xs={3} sx={sxs.providerKeyTypo}>
                              Description
                            </Grid>
                            <Grid item xs={7} sx={sxs.providerValueTypo}>
                              {(profileData?.note as string) || "-"}
                            </Grid>
                          </Grid>
                        </Grid>
                        {/* </Box> */}
                        {/* <Box sx={{ display: "flex", flexWrap: 'wrap' }}> */}
                        {/* <Grid container>
                            <Grid item container xs={6}>
                              <Grid item container xs={12}>
                                <Grid item xs={4}>
                                  <Typography sx={sxs.providerKeyTypo}>
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <Typography sx={sxs.providerValueTypo}>
                                    {profileData.specialities.map((res: any) => `${res.name}, `)}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid item container xs={12}>
                                <Grid item xs={4}>
                                  <Typography sx={sxs.providerKeyTypo}>
                                    
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <Typography sx={sxs.providerValueTypo}>
                                    {profileData.fax || '-'}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid item container xs={12}>
                                <Grid item xs={4}>
                                  <Typography sx={sxs.providerKeyTypo}>
                                    
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <Typography sx={sxs.providerValueTypo}>
                                    {profileData.npi || '-'}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item container xs={6}>
                              <Grid item>
                                <Box>
                                  <Box sx={{ display: "flex", flexGrow: 1 }}>
                                    <Typography sx={sxs.providerKeyTypo}>
                                      Office Hours
                                    </Typography>
                                    <Box sx={{ display: "flex", gap: "20px" }}>
                                      <Box
                                        sx={{
                                          display: "flex",
                                          flexDirection: "column",
                                          gap: "10px",
                                        }}
                                      >
                                        {profileData.locationHours.map((res: any) => {
                                          return (<>
                                            <div>{capitalizeFirstLetter(res.dayOfWeek)} {convertTo12HourFormat(res.openingTime)} - {convertTo12HourFormat(res.closingTime)} </div>
                                          </>)
                                        })}
                                      </Box>
                                    </Box>
                                  </Box>
                                </Box>
                              </Grid>
                            </Grid>
                          </Grid> */}
                        {/* <Box sx={{ flexGrow: 1 }}>
                            <Box sx={{ display: "flex" }}>
                              <Typography sx={sxs.providerKeyTypo}>
                                Speciality
                              </Typography>
                              <Box sx={{ display: "flex", gap: "20px" }}>
                                <Typography>:</Typography>
                                <Typography sx={sxs.providerValueTypo}>
                                  {profileData.specialities.map((res: any) => `${res.name}, `)}
                                </Typography>
                              </Box>
                            </Box>

                            <Box sx={{ display: "flex" }}>
                              <Typography sx={sxs.providerKeyTypo}>
                                Fax No
                              </Typography>
                              <Box sx={{ display: "flex", gap: "20px" }}>
                                <Typography>:</Typography>
                                <Typography sx={sxs.providerValueTypo}>
                                  {profileData.fax || '-'}
                                </Typography>
                              </Box>
                            </Box>

                            <Box sx={{ display: "flex" }}>
                              <Typography sx={sxs.providerKeyTypo}>
                                Group NPI Number
                              </Typography>
                              <Box sx={{ display: "flex", gap: "20px" }}>
                                <Typography>:</Typography>
                                <Typography sx={sxs.providerValueTypo}>
                                  {profileData.npi || '-'}
                                </Typography>
                              </Box>
                            </Box>
                          </Box> */}

                        {/* <Box>
                            <Box sx={{ display: "flex", flexGrow: 1 }}>
                              <Typography sx={sxs.locationDetails}>
                                Office Hours
                              </Typography>
                              <Box sx={{ display: "flex", gap: "20px" }}>
                                <Typography>:</Typography>
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "10px",
                                  }}
                                >
                                  <Typography sx={sxs.providerValueTypo}>
                                    Monday {convertTo12HourFormat(profileData.locationHours.find(day => day.dayOfWeek === PracticeHour.dayOfWeek.MONDAY)?.openingTime || '-') || '-'} -
                                    {convertTo12HourFormat(profileData.locationHours.find(day => day.dayOfWeek === PracticeHour.dayOfWeek.MONDAY)?.closingTime || '-') || '-'}
                                  </Typography>
                                  <Typography sx={sxs.providerValueTypo}>
                                    Tuesday {convertTo12HourFormat(profileData.locationHours.find(day => day.dayOfWeek === PracticeHour.dayOfWeek.TUESDAY)?.openingTime || '-') || '-'} -
                                    {convertTo12HourFormat(profileData.locationHours.find(day => day.dayOfWeek === PracticeHour.dayOfWeek.TUESDAY)?.closingTime || '-') || '-'}
                                  </Typography>
                                  <Typography sx={sxs.providerValueTypo}>
                                    Wednesday {convertTo12HourFormat(profileData.locationHours.find(day => day.dayOfWeek === PracticeHour.dayOfWeek.WEDNESDAY)?.openingTime || '-') || '-'} -
                                    {convertTo12HourFormat(profileData.locationHours.find(day => day.dayOfWeek === PracticeHour.dayOfWeek.WEDNESDAY)?.closingTime || '-') || '-'}
                                  </Typography>
                                  <Typography sx={sxs.providerValueTypo}>
                                    Thursday {convertTo12HourFormat(profileData.locationHours.find(day => day.dayOfWeek === PracticeHour.dayOfWeek.THURSDAY)?.openingTime || '-') || '-'} -
                                    {convertTo12HourFormat(profileData.locationHours.find(day => day.dayOfWeek === PracticeHour.dayOfWeek.THURSDAY)?.closingTime || '-') || '-'}
                                  </Typography>
                                  <Typography sx={sxs.providerValueTypo}>
                                    Friday {convertTo12HourFormat(profileData.locationHours.find(day => day.dayOfWeek === PracticeHour.dayOfWeek.FRIDAY)?.openingTime || '-') || '-'} -
                                    {convertTo12HourFormat(profileData.locationHours.find(day => day.dayOfWeek === PracticeHour.dayOfWeek.FRIDAY)?.closingTime || '-') || '-'}
                                  </Typography>
                                  <Typography sx={sxs.providerValueTypo}>
                                    Saturday {convertTo12HourFormat(profileData.locationHours.find(day => day.dayOfWeek === PracticeHour.dayOfWeek.SATURDAY)?.openingTime || '-') || '-'} -
                                    {convertTo12HourFormat(profileData.locationHours.find(day => day.dayOfWeek === PracticeHour.dayOfWeek.SATURDAY)?.closingTime || '-') || '-'}
                                  </Typography>
                                  <Typography sx={sxs.providerValueTypo}>
                                    Saturday {convertTo12HourFormat(profileData.locationHours.find(day => day.dayOfWeek === PracticeHour.dayOfWeek.SUNDAY)?.openingTime || '-') || '-'} -
                                    {convertTo12HourFormat(profileData.locationHours.find(day => day.dayOfWeek === PracticeHour.dayOfWeek.SUNDAY)?.closingTime || '-') || '-'}
                                  </Typography>
                                </Box>
                              </Box>

                              <Box></Box>
                            </Box>
                          </Box> */}
                        {/* </Box> */}
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        gap: "25px",
                      }}
                    >
                      <Box
                        sx={{
                          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                          padding: "15px",
                          borderRadius: "10px",
                          width: "100%",
                          background: "white",
                          // paddingLeft: "5rem",
                        }}
                      >
                        <Box>
                          <Typography sx={sxs.providerKeyTypo2}>
                            Practice Address
                          </Typography>
                        </Box>
                        <Box sx={sxs.flexItem}>
                          <Grid container spacing={2}>
                            <Grid item container xs={6}>
                              <Grid item xs={4} sx={sxs.providerKeyTypo}>
                                Address Line 1
                              </Grid>
                              <Grid item xs={8}>
                                <Typography sx={sxs.providerValueTypo}>
                                  {profileData.physicalAddress.line1 || "-"}
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid item container xs={6}>
                              <Grid item xs={4} sx={sxs.providerKeyTypo}>
                                State
                              </Grid>
                              <Grid item xs={8}>
                                <Typography sx={sxs.providerValueTypo}>
                                  {profileData.physicalAddress.state || "-"}
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid item container xs={6}>
                              <Grid item xs={4} sx={sxs.providerKeyTypo}>
                                Address Line 2
                              </Grid>
                              <Grid item xs={8}>
                                <Typography sx={sxs.providerValueTypo}>
                                  {profileData.physicalAddress.line2 || "-"}
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid item container xs={6}>
                              <Grid item xs={4} sx={sxs.providerKeyTypo}>
                                City
                              </Grid>
                              <Grid item xs={8}>
                                <Typography sx={sxs.providerValueTypo}>
                                  {profileData.physicalAddress.city || "-"}
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid item container xs={6}>
                              <Grid item xs={4} sx={sxs.providerKeyTypo}>
                                Country
                              </Grid>
                              <Grid item xs={8}>
                                <Typography sx={sxs.providerValueTypo}>
                                  {profileData.physicalAddress.country || "-"}
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid item container xs={6}>
                              <Grid item xs={4} sx={sxs.providerKeyTypo}>
                                Zip Code
                              </Grid>
                              <Grid item xs={8}>
                                <Typography sx={sxs.providerValueTypo}>
                                  {profileData.physicalAddress.zipcode || "-"}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Box>
                        {/* <Box sx={{ display: "flex", justifyContent: 'space-between' }}>
                          <Box>
                            <Box sx={{ display: "flex" }}>
                              <Typography sx={sxs.providerKeyTypo}>
                                Address Line 1
                              </Typography>
                              <Box sx={{ display: "flex", gap: "20px" }}>
                                <Typography>:</Typography>
                                <Typography sx={sxs.providerValueTypo}>
                                  {profileData.physicalAddress.line1 || '-'}
                                </Typography>
                              </Box>
                            </Box>

                            <Box sx={{ display: "flex" }}>
                              <Typography sx={sxs.providerKeyTypo}>
                                Address Line 2
                              </Typography>
                              <Box sx={{ display: "flex", gap: "20px" }}>
                                <Typography>:</Typography>
                                <Typography sx={sxs.providerValueTypo}>
                                  {profileData.physicalAddress.line2 || '-'}
                                </Typography>
                              </Box>
                            </Box>

                            <Box sx={{ display: "flex" }}>
                              <Typography sx={sxs.providerKeyTypo}>
                                City
                              </Typography>
                              <Box sx={{ display: "flex", gap: "20px" }}>
                                <Typography>:</Typography>
                                <Typography sx={sxs.providerValueTypo}>
                                  {profileData.physicalAddress.city || '-'}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                          <Box>
                            <Box sx={{ display: "flex" }}>
                              <Typography sx={sxs.providerKeyTypo}>
                                State
                              </Typography>
                              <Box sx={{ display: "flex", gap: "20px" }}>
                                <Typography>:</Typography>
                                <Typography sx={sxs.providerValueTypo}>
                                  {profileData.physicalAddress.state || '-'}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: "flex" }}>
                              <Typography sx={sxs.providerKeyTypo}>
                                Country
                              </Typography>
                              <Box sx={{ display: "flex", gap: "20px" }}>
                                <Typography>:</Typography>
                                <Typography sx={sxs.providerValueTypo}>
                                  {profileData.physicalAddress.country || '-'}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: "flex" }}>
                              <Typography sx={sxs.providerKeyTypo}>
                                Zip Code
                              </Typography>
                              <Box sx={{ display: "flex", gap: "20px" }}>
                                <Typography>:</Typography>
                                <Typography sx={sxs.providerValueTypo}>
                                  {profileData.physicalAddress.zipcode || '-'}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </Box> */}
                      </Box>
                      {/* <Box> */}
                      <Box
                        sx={{
                          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                          padding: "15px",
                          borderRadius: "10px",
                          width: "100%",
                          background: "white",
                          marginBottom: "30px",
                          // paddingLeft: "5rem",
                        }}
                      >
                        <Box>
                          <Typography sx={sxs.providerKeyTypo2}>
                            Pay to (Billing) Address
                          </Typography>
                        </Box>
                        <Box sx={sxs.flexItem}>
                          <Grid container spacing={2}>
                            <Grid item container xs={6}>
                              <Grid item xs={4} sx={sxs.providerKeyTypo}>
                                Address Line 1
                              </Grid>
                              <Grid item xs={8}>
                                <Typography sx={sxs.providerValueTypo}>
                                  {profileData?.billingAddress?.line1 || "-"}
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid item container xs={6}>
                              <Grid item xs={4} sx={sxs.providerKeyTypo}>
                                State
                              </Grid>
                              <Grid item xs={8}>
                                <Typography sx={sxs.providerValueTypo}>
                                  {profileData?.billingAddress?.state || "-"}
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid item container xs={6}>
                              <Grid item xs={4} sx={sxs.providerKeyTypo}>
                                Address Line 2
                              </Grid>
                              <Grid item xs={8}>
                                <Typography sx={sxs.providerValueTypo}>
                                  {profileData?.billingAddress?.line2 || "-"}
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid item container xs={6}>
                              <Grid item xs={4} sx={sxs.providerKeyTypo}>
                                City
                              </Grid>
                              <Grid item xs={8}>
                                <Typography sx={sxs.providerValueTypo}>
                                  {profileData?.billingAddress?.city || "-"}
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid item container xs={6}>
                              <Grid item xs={4} sx={sxs.providerKeyTypo}>
                                Country
                              </Grid>
                              <Grid item xs={8}>
                                <Typography sx={sxs.providerValueTypo}>
                                  {profileData?.billingAddress?.country || "-"}
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid item container xs={6}>
                              <Grid item xs={4} sx={sxs.providerKeyTypo}>
                                Zip Code
                              </Grid>
                              <Grid item xs={8}>
                                <Typography sx={sxs.providerValueTypo}>
                                  {profileData?.billingAddress?.zipcode || "-"}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                      {/* </Box> */}
                    </Box>
                  </Box>
                </Box>
              ) : null}

              {activeTab == "department" ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  {/* <Box
                    sx={{
                      display: "flex",
                      gap: "20px",
                      marginTop: "2rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <Grid sx={sxs.searchBoxWidth}>
                      <InputBase
                        fullWidth
                        id="document-name-label"
                        name="name"
                        role="textbox"
                        placeholder="Search Here"
                        type="text"
                        classes={{
                          root: classDepartment.AddressFormLongtInputField2,
                          input: classDepartment.inputBoxText2,
                          focused: classDepartment.inputBoxActive2,
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <SearchIcon sx={sxs.searchIcon} />
                          </InputAdornment>
                        }
                      />
                    </Grid>
                    <Button
                      variant="outlined"
                      sx={{
                        width: "6.625rem",
                        fontWeight: "bold",
                        color: "#0097F0",
                        borderColor: "#0097F0",
                        height: "42px",
                        textTransform: "initial",
                      }}
                    >
                      Add
                    </Button>
                  </Box> */}
                  <Box sx={{ width: "100%" }}>
                    {/* <Typography
                      variant="h2"
                      sx={{
                        fontWeight: "bold",
                        marginTop: "20x",
                        marginBottom: "20px",
                      }}
                    >
                      Departments
                    </Typography> */}
                    {/* <ProviderGroupDepartment
                      type={Departments.LOCATION_DEPARTMENT}
                      locationId={locationUuid}
                    /> */}
                    <ProviderGroupLocationDepartment
                      locationId={locationUuid}
                    />
                  </Box>
                </Box>
              ) : null}

              {activeTab == "patients" ? (
                <Box sx={{ width: "100%" }}>
                  {/* <Typography
                    variant="h2"
                    sx={{
                      fontWeight: "bold",
                      marginTop: "1.5rem",
                      marginBottom: "1rem",
                    }}
                  >
                    Patients
                  </Typography> */}
                  <ProviderGroupPatientPage
                    type={Patients.LOCATION_PATIENTS}
                    locationUuid={locationUuid}
                  />
                </Box>
              ) : null}
              {activeTab == "Users" ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  {/* <Box
                    sx={{
                      display: "flex",
                      gap: "20px",
                      marginTop: "2rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <Grid sx={sxs.searchBoxWidth}>
                      <InputBase
                        fullWidth
                        id="document-name-label"
                        name="name"
                        role="textbox"
                        placeholder="Search Here"
                        type="text"
                        classes={{
                          root: classDepartment.AddressFormLongtInputField2,
                          input: classDepartment.inputBoxText2,
                          focused: classDepartment.inputBoxActive2,
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <SearchIcon sx={sxs.searchIcon} />
                          </InputAdornment>
                        }
                      />
                    </Grid>
                    <Button
                      variant="outlined"
                      sx={{
                        width: "6.625rem",
                        fontWeight: "bold",
                        color: "#0097F0",
                        borderColor: "#0097F0",
                        height: "42px",
                        textTransform: "initial",
                      }}
                    >
                      Add
                    </Button>
                  </Box> */}
                  <Box sx={{ width: "100%" }}>
                    {/* <Typography
                      variant="h2"
                      sx={{
                        fontWeight: "bold",
                        marginTop: "20x",
                        marginBottom: "20px",
                      }}
                    >
                      Users
                    </Typography> */}
                    <ProviderGroupUsers
                      type={USERS.LOCATION_USERS}
                      locationUuid={locationUuid}
                      hideAction={true}
                    />
                    {/* <ProviderGroupUsersPage /> */}
                  </Box>
                </Box>
              ) : null}
            </Grid>
          </Grid>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
