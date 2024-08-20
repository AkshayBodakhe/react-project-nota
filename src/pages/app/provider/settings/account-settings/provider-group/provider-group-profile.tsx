import { Box, Grid, Typography } from "@mui/material";
import {
    providerLabel,
    providerSpeciality,
    providerValue,
} from "../../../../../../styles/common";
// import { makeStyles } from "@mui/styles";

// const providerProfileGridStyles = makeStyles(() => {
//     return {
//         gridName: {
//             // marginBottom: "-10px !important",
//             // background: 'red'
//             // marginLeft: '10px',
//             // fontSize: '30px !important',
//             fontWeight: '700',
//             whiteSpace: 'nowrap'
//             // marginBottom: '15px !important',
//         },
//         speciality: {
//             color: "#36588C !important",
//             padding: "8px",
//             // display: 'flex !important',
//             borderRadius: "20px",
//             backgroundColor: "#DAEAF8 !important",
//             width: "fit-content",
//             gap: '5px'
//             // fontWeight: "bold !important",
//         },
//         mainContainer: {
//             rowGap: "15px",
//         },
//         profileLeftGrid: {
//             display: "flex",
//             justifyContent: "left",
//         },
//         imageStyle: {
//             borderRadius: "60%",
//             height: "110px",
//         },
//         providerInformationGrid: {
//             rowGap: "20px",
//         },
//         valueTextStyle: {
//             color: "#1A1A1ACC !important",
//         },
//         gridTitle: {
//             color: "#36588C !important",
//             fontWeight: "bold !important",
//         },
//         valueTextStyle2: {
//             color: "#3A3A3A99 !important",
//             display: "flex",
//             justifyContent: "center",
//         },
//         detailsTitle: {
//             fontSize: "14px",
//             fontWeight: "600 !important",
//             marginBottom: "1.4rem",
//             // width: "11.375rem",
//             margin: '2% !important'
//         }
//     };
// });

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
    gap: "10px",
  },
  providerKeyTypo: {
    fontSize: "14px",
    // fontWeight: "700",
    marginBottom: "1.4rem",
    width: "12.375rem",
    color: "black",
  },
  detailKey: {
    fontSize: "14px",
    // fontWeight: "700",
    marginBottom: "1.4rem",
    width: "9rem",
    letterSpacing: "0.22px",
    color: "#1A1A1A80 !important",
    opacity: 1,
    fontFamily: "Roboto,sans-serif !important;",
    fontWeight: "600 !important",
  },
  providerKeyTypo2: {
    fontSize: "20px",
    fontWeight: "600",
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
    gap: "20px",
    marginBottom: "1.40rem",
  },
  fontBoldStyle: {
    fontSize: "14px",
    fontWeight: "bold",
  },
  providerValueTypo: {
    letterSpacing: "0.22px",
    color: "#1A1A1ACC",
    opacity: 1,
    fontSize: "14px !important",
    fontWeight: "600 !important",
    fontFamily: "Roboto,sans-serif !important;",
  },
  details: {
    display: "flex",
    width: "20px",
  },
  renderBtns: {
    display: "flex",
    // justifyContent: "space-between",
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2) !important",
    width: "50%",
    border: "none",
  },
  hospitalBox: {
    width: "100%",
    display: "flex",
    // justifyContent:"space-between"
  },
};

function ProviderGroupProfilePage() {
  // const classes = providerProfileGridStyles();

  return (
    <>
      <Box sx={{marginTop:"20px"}}>
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "10px 0",
          }}
        >
          <Typography
                        // variant="h2"
                        sx={{
                            fontWeight: "700",
                            marginTop: "1.5rem",
                            marginBottom: "1rem",
                        }}
                    >
                        Provider Group Details
                    </Typography>
          <Typography
            variant="h2"
            sx={{ fontWeight: "bold !important", marginBottom: "1rem" }}
          >
            Provider Group Details
          </Typography>
        </Box> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "25px",
          }}
        >
          <Box sx={{ display: "flex", gap: "30px" }}>
            <Box
              sx={{
                boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                padding: "20px",
                borderRadius: "10px",
                // alignItems: "center",
                display: "flex",
                flexDirection: "column",
                background: "white",
                width: "50%",
              }}
            >
              <Box
                sx={{ display: "flex", justifyContent: "start", gap: "20px" }}
              >
                <img
                  src="https://foyr.com/learn/wp-content/uploads/2021/08/design-your-dream-home.jpg"
                  style={{
                    height: "7rem",
                    width: "10rem",
                    marginBottom: "30px",
                    // borderRadius: "50%",
                  }}
                />
              </Box>
              <Grid >
                <Typography variant="h2" sx={{ fontSize: "18px !important" }}>
                  Jupitar Hospital
                </Typography>
                <Grid mt={1} mb={1} xs={2.5} sx={providerSpeciality.showSpeciality}>
                  <Typography sx={providerSpeciality.specialityName}>
                    Dermoatology
                  </Typography>
                </Grid>
              </Grid>
              {/* <Grid item sx={{ display: 'flex', gap: '5px', marginBottom: '20px' }} >
                                <Typography
                                    variant="h5"
                                    className={classes.speciality}
                                >
                                    Ophthalmologists
                                </Typography>
                                <Typography
                                    variant="h5"
                                    className={classes.speciality}
                                >
                                    Pathologists
                                </Typography>
                            </Grid> */}
              <Grid container gap={"15px"}>
                <Grid item xs={12} sx={sxs.hospitalBox}>
                  <Grid xs={4}>
                    <Typography sx={providerLabel}>Group NPI Number</Typography>
                  </Grid>
                  <Grid xs={7}>
                    <Typography sx={providerValue}>2365987458</Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={sxs.hospitalBox}>
                  <Grid xs={4}>
                    <Typography sx={providerLabel}>Website</Typography>
                  </Grid>
                  <Grid xs={7}>
                    <Typography sx={providerValue}>
                      www.Jupiterhospital.com
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={sxs.hospitalBox}>
                  <Grid xs={4}>
                    <Typography sx={providerLabel}>Contact Number</Typography>
                  </Grid>
                  <Grid xs={7}>
                    <Typography sx={providerValue}>(569) 822-4144</Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={sxs.hospitalBox}>
                  <Grid xs={4}>
                    <Typography sx={providerLabel}>Email</Typography>
                  </Grid>
                  <Grid xs={7}>
                    <Typography sx={providerValue}>
                      hennawest@gmail.com
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={sxs.hospitalBox}>
                  <Grid xs={4}>
                    <Typography sx={providerLabel}>Physical Address</Typography>
                  </Grid>
                  <Grid xs={7}>
                    <Typography sx={providerValue}>
                      Jupiter Hospital 25 Federal plaza, New York, NY 10278
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
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
              <Grid container>
                <Grid item xs={6}>
                  <Box sx={{ display: "flex" }}>
                    <Typography sx={sxs.providerKeyTypo}>
                      Provider Group Fax Number
                    </Typography>
                    <Box sx={{ display: "flex", gap: "20px" }}>
                      <Typography sx={sxs.providerValueTypo}>
                        Dermatologist
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Typography sx={sxs.providerKeyTypo}>EHR System</Typography>
                    <Box sx={{ display: "flex", gap: "20px" }}>
                      <Typography sx={sxs.providerValueTypo}>NA</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Typography sx={sxs.providerKeyTypo}>
                      Provider Group Description
                    </Typography>
                    <Box sx={{ display: "flex", gap: "20px" }}>
                      <Typography sx={sxs.providerValueTypo}>NA</Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box>
                      <Typography sx={sxs.providerKeyTypo}>
                        Billing Address
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: "20px" }}>
                      <Typography sx={sxs.providerValueTypo}>
                        2678 East 786th Road, OGLESBY, USA California, 61576
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: "flex", flexGrow: 1 }}>
                    <Typography
                      sx={{ ...sxs.detailKey, width: "6rem !important" }}
                    >
                      Office Hours
                    </Typography>
                    <Box sx={{ display: "flex", gap: "20px" }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "15px",
                        }}
                      >
                        <Typography sx={sxs.providerValueTypo}>
                          Monday 10:00 AM - 08:00 AM
                        </Typography>
                        <Typography sx={sxs.providerValueTypo}>
                          Tuesday 10:00 AM - 08:00 AM
                        </Typography>
                        <Typography sx={sxs.providerValueTypo}>
                          Wednesday 10:00 AM - 08:00 AM
                        </Typography>
                        <Typography sx={sxs.providerValueTypo}>
                          Thursday 10:00 AM - 08:00 AM
                        </Typography>
                        <Typography sx={sxs.providerValueTypo}>
                          Friday 10:00 AM - 08:00 AM
                        </Typography>
                        <Typography sx={sxs.providerValueTypo}>
                          Saturday 10:00 AM - 08:00 AM
                        </Typography>
                        <Typography sx={sxs.providerValueTypo}>
                          Saturday 10:00 AM - 08:00 AM
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} mt={3}>
                  <Box sx={{ display: "flex", flexGrow: 1 }}>
                    <Typography
                      sx={{ ...sxs.detailKey, width: "50rem !important" }}
                    >
                      Provider Group Information
                    </Typography>
                    <Box sx={{ display: "flex", gap: "20px" }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          // gap: "10px",
                        }}
                      >
                        <Typography sx={sxs.providerValueTypo}>
                          Jupiter Hospital is a tertiary care multi-specialty
                          hospital located in Pune. The hospital has a team of
                          experienced doctors trained all over the world and has
                          the most advanced medical equipment under its roof.
                          Serene Hospital is a tertiary care multi-specialty
                          hospital located in Pune. The hospital has a team of
                          experienced doctors trained all over the world and has
                          the most advanced medical equipment under its roof.
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              {/* <Box sx={{ display: "flex", flexWrap: 'wrap' }}>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Box sx={{ display: "flex" }}>
                                        <Typography sx={sxs.providerKeyTypo}>
                                            Provider Group Fax Number
                                        </Typography>
                                        <Box sx={{ display: "flex", gap: "20px" }}>
                
                                            <Typography sx={sxs.providerValueTypo}>
                                                Dermatologist
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: "flex" }}>
                                        <Typography sx={sxs.providerKeyTypo}>
                                            EHR System
                                        </Typography>
                                        <Box sx={{ display: "flex", gap: "20px" }}>
                
                                            <Typography sx={sxs.providerValueTypo}>
                                                Dermatologist
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: "flex" }}>
                                        <Typography sx={sxs.providerKeyTypo}>
                                            Provider Group Description
                                        </Typography>
                                        <Box sx={{ display: "flex", gap: "20px" }}>
                
                                            <Typography sx={sxs.providerValueTypo}>
                                                9929292929
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: "flex" }}>
                                        <Typography sx={sxs.providerKeyTypo}>
                                            Billing Address
                                        </Typography>
                                        <Box sx={{ display: "flex", gap: "20px" }}>
                
                                            <Typography sx={sxs.providerValueTypo}>
                                                9929292929
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: "flex" }}>
                                        <Typography sx={sxs.providerKeyTypo}>
                                            Provider Group Information
                                        </Typography>
                                        <Box sx={{ display: "flex", gap: "20px" }}>
                
                                            <Typography sx={sxs.providerValueTypo}>
                                                9929292929
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box>
                                    <Box sx={{ display: "flex", flexGrow: 1 }}>
                                        <Typography sx={sxs.detailKey}>
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
                                                <Typography sx={sxs.providerValueTypo}>
                                                    Monday 10:00 AM - 08:00 AM
                                                </Typography>
                                                <Typography sx={sxs.providerValueTypo}>
                                                    Tuesday 10:00 AM - 08:00 AM
                                                </Typography>
                                                <Typography sx={sxs.providerValueTypo}>
                                                    Wednesday 10:00 AM - 08:00 AM
                                                </Typography>
                                                <Typography sx={sxs.providerValueTypo}>
                                                    Thursday 10:00 AM - 08:00 AM
                                                </Typography>
                                                <Typography sx={sxs.providerValueTypo}>
                                                    Friday 10:00 AM - 08:00 AM
                                                </Typography>
                                                <Typography sx={sxs.providerValueTypo}>
                                                    Saturday 10:00 AM - 08:00 AM
                                                </Typography>
                                                <Typography sx={sxs.providerValueTypo}>
                                                    Saturday 10:00 AM - 08:00 AM
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Box></Box>
                                    </Box>
                                </Box>
                            </Box> */}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ProviderGroupProfilePage;
