import { Box, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import hospitalBuilding from "../../../../../../assets/other/hospitalBuilding.jpeg";
import { useProviderGroupControllerServiceGetProviderGroupById1 } from "../../../../../../sdk/thinkemr-core-0.0.1/queries";
import React, { useEffect, useState } from "react";
import { getLoggedInUser } from "../../../../../../components/common/enums-and-interfaces/common-functions";
import { NoBackpackSharp } from "@mui/icons-material";
import { toCamelCase } from "../../../../../../components/core/add-edit-staff-user/add-edit-staff-user";

export const style = makeStyles(() => ({
  speciality: {
    ackground: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "1px solid #1A1A1A33",
    borderRadius: "10px",
    opacity: 1,
    padding: "10px",
  },
  imgStyle: {
    width: "146px !important",
    height: "130px !important",
  },
  multispeciality: {
    background: "#CCECFF4D 0% 0% no-repeat padding-box",
    borderRadius: "15px",
    opacity: 1,
    padding: "0px 10px !important",
  },
  key: {
    color: "#1A1A1A80",
    fontSize: "16px !important",
  },
  value: {
    color: "#1A1A1ACC",
    fontWeight: "bold !important",
  },
}));

interface providerProfile {
  refetchData?: any;
  callApi?: boolean;
}

interface DaysMap {
  [key: string]: number;
}
function ProviderProfile(props: providerProfile) {
  const { refetchData, callApi } = props;
  const [providerData, setProviderData] = useState<any>("");

  const dayOfWeekToNumber = (dayOfWeek: string) => {
    const daysMap: DaysMap = {
      MONDAY: 0,
      TUESDAY: 1,
      WEDNESDAY: 2,
      THURSDAY: 3,
      FRIDAY: 4,
      SATURDAY: 5,
      SUNDAY: 6,
    };
    return daysMap[dayOfWeek];
  };

  const getSortedDays = (workingDays: any[]) => {
    // const capitalize = workingDays?.map((item) => {
    //   return {
    //     id: item?.id,
    //     dayOfWeek: item?.dayOfWeek,
    //     openingTime: item?.openingTime,
    //     closingTime: item?.closingTime,
    //   };
    // });
    const sortDays = workingDays?.sort((a: any, b: any) => {
      const dayA = dayOfWeekToNumber(a.dayOfWeek);
      const dayB = dayOfWeekToNumber(b.dayOfWeek);
      return dayA - dayB;
    });

    const sequenceDays = sortDays?.map((data) => {
      return (
        <React.Fragment key={data.id}>
          <Grid item xs={2}>
            <Typography variant="h5" className={classes.value}>
              {toCamelCase(data?.dayOfWeek)}
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="h5" className={classes.key}>
              {formattedTime(data?.openingTime)} -{" "}
              {formattedTime(data?.closingTime)}
            </Typography>
          </Grid>
        </React.Fragment>
      );
    });
    return sequenceDays;
  };

  const { data, isSuccess, refetch } =
    useProviderGroupControllerServiceGetProviderGroupById1({
      uuid: getLoggedInUser().providerGroup,
    });
  useEffect(() => {
    if (isSuccess && !!data) {
      setProviderData(data?.data);
    }
  }, [isSuccess, data, callApi]);

  useEffect(() => {
    if (refetchData) refetch();
  }, [refetchData]);

  const formattedTime = (timeString: any) => {
    const [hours, minutes] = timeString.split(":").map(Number);

    const date = new Date(0, 0, 0, hours, minutes);

    const formattedTime = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return formattedTime;
  };

  const classes = style();
  return (
    <Grid container sx={{ height: "77vh" }} justifyContent={"space-between"}>
      <Grid item xs={3.9} className={classes.speciality}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <img
              src={providerData?.avatar || hospitalBuilding}
              className={classes.imgStyle}
            ></img>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ color: "#1A1A1A", fontWeight: 600 }}>
              {providerData?.name || "-"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {providerData?.specialities?.length > 1 ? (
              <Typography
                variant="h5"
                className={classes.multispeciality}
                sx={{ color: "#1B5984", width: "fit-content" }}
              >
                {"Multispeciality"}
              </Typography>
            ) : (
              providerData?.specialities?.map((data: any) => {
                return (
                  <Typography
                    variant="h5"
                    className={classes.multispeciality}
                    sx={{ color: "#1B5984", width: "fit-content" }}
                  >
                    {data?.name || "-"}
                  </Typography>
                );
              })
            )}
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={5}>
                <Typography variant="h5" className={classes.key}>
                  Group NPI Number
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography variant="h5" className={classes.value}>
                  {providerData?.npi}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={5}>
                <Typography variant="h5" className={classes.key}>
                  Website
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography variant="h5" className={classes.value}>
                  {providerData?.website || "-"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={5}>
                <Typography variant="h5" className={classes.key}>
                  Contact Number
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography variant="h5" className={classes.value}>
                  {providerData?.phone}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={5}>
                <Typography variant="h5" className={classes.key}>
                  Email
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography variant="h5" className={classes.value}>
                  {providerData?.email}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={5}>
                <Typography variant="h5" className={classes.key}>
                  Physical Address
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography variant="h5" className={classes.value}>
                  {`${providerData?.physicalAddress?.line1} ${providerData?.physicalAddress?.line2} ${providerData?.physicalAddress?.city} ${providerData?.physicalAddress?.state} ${providerData?.physicalAddress?.country},${providerData?.physicalAddress?.zipcode} `}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={8} className={classes.speciality}>
        <Grid container spacing={3}>
          <Grid item xs={12} mt={1.5}>
            <Typography variant="h4" sx={{ color: "#1B5984", fontWeight: 600 }}>
              {" "}
              Basic Information
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={3}>
                <Typography variant="h5" className={classes.key}>
                  Provider Group Fax Number
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h5" className={classes.value}>
                  {providerData?.fax || "-"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={3}>
                <Typography variant="h5" className={classes.key}>
                  Billing Address
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h5" className={classes.value}>
                  {providerData?.billingAddress
                    ? `${providerData?.billingAddress?.line1} ${providerData?.billingAddress?.line2} ${providerData?.billingAddress?.city} ${providerData?.billingAddress?.state} ${providerData?.billingAddress?.country},${providerData?.billingAddress?.zipcode}`
                    : "-"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={3}>
                <Typography variant="h5" className={classes.key}>
                  Provider Group Office Hours
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Box>
                  <Grid container spacing={2}>
                    {
                      getSortedDays(providerData?.workingHours)
                      // providerData?.workingHours &&
                      //   providerData?.workingHours.map((data: any) => (
                      //     <React.Fragment key={data.id}>
                      //       <Grid item xs={2}>
                      //         <Typography variant="h5" className={classes.value}>
                      //           {data?.dayOfWeek}
                      //         </Typography>
                      //       </Grid>
                      //       <Grid item xs={10}>
                      //         <Typography variant="h5" className={classes.key}>
                      //           {formattedTime(data?.openingTime)} -{" "}
                      //           {formattedTime(data?.closingTime)}
                      //         </Typography>
                      //       </Grid>
                      //     </React.Fragment>
                      //   ))
                    }
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={3}>
                <Typography variant="h5" className={classes.key}>
                  Description
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h5" className={classes.value}>
                  {providerData?.description || "-"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProviderProfile;
