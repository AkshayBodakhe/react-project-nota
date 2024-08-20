import { Grid, Typography } from "@mui/material";
import hospitalBuilding from "../../../../../../assets/other/hospitalBuilding.jpeg";
import { style } from "./provider-profile";
import { useProviderGroupControllerServiceGetProviderGroupById1 } from "../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { getLoggedInUser } from "../../../../../../components/common/enums-and-interfaces/common-functions";
import { useEffect, useState } from "react";
import { toCamelCase } from "../../../../../../components/core/add-edit-staff-user/add-edit-staff-user";

function GroupInfoForLocationAndDepartment() {
  const [providerData, setProviderData] = useState<any>("");

  const { data, isSuccess } =
    useProviderGroupControllerServiceGetProviderGroupById1({
      uuid: getLoggedInUser().providerGroup,
    });
  const getProfileDetails = async (data: any) => {
    await setProviderData(data?.data);
  };
  useEffect(() => {
    if (isSuccess && !!data) {
      getProfileDetails(data);
    }
  }, [data]);

  // useEffect(() => {
  //   if (refetchData) refetch();
  // }, [refetchData]);

  const getAddress = (Address: any) => {
    return (
      <Typography variant="h5" className={classes.value}>
        {" "}
        {Address?.line1 +
          " " +
          Address?.line2 +
          " " +
          Address?.city +
          " " +
          Address?.state +
          " " +
          Address?.country +
          " " +
          Address?.zipcode}
      </Typography>
    );
  };

  const getAllSpeciality = (specialities: any) => {
    const specData = specialities?.map((item: any) => item.name);
    return specData;
  };

  const classes = style();
  return (
    <>
      <Grid item xs={12} md={6} className={classes.speciality}>
        <Grid container spacing={4} flexWrap={"wrap"}>
          <Grid item md={3} xs={12}>
            <Grid container spacing={1.5}>
              <Grid item xs={12}>
                <img src={hospitalBuilding} className={classes.imgStyle}></img>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h4"
                  sx={{
                    color: "#1A1A1A",
                    fontWeight: 600,
                    width: "150px",
                    cursor: "pointer",
                  }}
                  noWrap
                  title={providerData?.name}
                >
                  {toCamelCase(providerData?.name)}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="h5"
                  className={classes.multispeciality}
                  sx={{ color: "#1B5984" }}
                >
                  {providerData?.specialities?.length > 1
                    ? "Multispeciality"
                    : getAllSpeciality(providerData?.specialities)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={9} xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography variant="h5" className={classes.key}>
                      Group NPI Number
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h5" className={classes.value}>
                      {providerData?.npi}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography variant="h5" className={classes.key}>
                      Website
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h5" className={classes.value}>
                      {providerData?.website}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography variant="h5" className={classes.key}>
                      Contact Number
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h5" className={classes.value}>
                      {providerData?.phone}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography variant="h5" className={classes.key}>
                      Email
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h5" className={classes.value}>
                      {providerData?.email}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography variant="h5" className={classes.key}>
                      Physical Address
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    {/* <Typography variant="h5" className={classes.value}> */}
                    {getAddress(providerData?.physicalAddress)}
                    {/* </Typography> */}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default GroupInfoForLocationAndDepartment;
