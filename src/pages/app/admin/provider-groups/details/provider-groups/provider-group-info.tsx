import { Box, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useProviderGroupControllerServiceGetProviderGroupById } from "../../../../../../sdk/thinkemr-core-0.0.1/queries";
import React, { useEffect, useState } from "react";
import Loading from "../../../../../../components/common/spinner/loading";
import {
  capitalizeFirstLetter,
  convertTo12HourFormat,
  customSortDays,
} from "../../common-files/functions";
import { useParams } from "react-router-dom";
import { getLoggedInUser } from "../../../../../../components/common/enums-and-interfaces/common-functions";

export const proviGroupProfileStyle = makeStyles(() => ({
  multispeciality: {
    background: "#CCECFF4D 0% 0% no-repeat padding-box",
    borderRadius: "14px",
    opacity: 1,
    font: "normal normal bold 14px/22px Roboto",
    letterSpacing: "0.5px",
    color: "#0097F0",
    padding: "5px 10px",
  },
}));

const sxs = {
  personalInfoContainer: {
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
    padding: "20px",
    borderRadius: "10px",
    display: "flex",
    background: "#FFFFFF",
    width: "50%",
    gap: "20px",
  },
  basicInfoContainer: {
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
    padding: "20px",
    borderRadius: "10px",
    width: "100%",
    background: "#FFFFFF",
  },
  flexItem: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
    width: "100%",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  providerKeyTypo: {
    fontSize: "14px",
    fontWeight: "700",
    marginBottom: "1rem",
    width: "9rem",
  },
  locationDetails: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#1A1A1A80",
    marginBottom: "1.4rem",
    letterSpacing: 0.5,
  },
  locationDetailsValue: {
    fontFamily: "normal normal medium 18px/20px Roboto",
    letterSpacing: "0.22px",
    fontWeight: 500,
    color: "black !important",
  },
  providerKeyTypo2: {
    fontSize: "16px",
    fontWeight: "700",
    letterSpacing: "0.22px",
    marginBottom: "1.4rem",
    width: "12.375rem",
    color: "#1B5984",
  },
};

type Props = {
  providerGroupUuid: string;
  hideBasicInfo?: boolean;
  flexDirection?: string;
  refetch?: boolean;
};

function ProviderGroupInfo(props: Props) {
  const classes = proviGroupProfileStyle();
  const [providerGroup, setProviderGroup] = useState<any>({
    active: true,
    archive: false,
    avatar: "",
    subdomain: "",
    email: "",
    name: "",
    npi: "",
    specialities: [],
    workingHours: [],
    phone: "",
    fax: "",
    website: "",
    description: "",
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

  const { data, isError, isLoading, refetch } =
    useProviderGroupControllerServiceGetProviderGroupById({
      uuid: props.providerGroupUuid,
    });
  useEffect(() => {
    if (isError) {
      refetch();
      return;
    }
    if (!isError && data?.data) {
      if (data.data.workingHours)
        data.data.workingHours = sortWorkingHours(data.data.workingHours);
      setProviderGroup((prev: any) => ({ ...prev, ...data?.data }));
    }
  }, [data?.data]);

  useEffect(() => {
    if (props.refetch) refetch();
  }, [props.refetch]);

  function sortWorkingHours(workingHours: any[]) {
    if (!workingHours.length) return [];
    return workingHours.sort((a: any, b: any) =>
      customSortDays(a.dayOfWeek, b.dayOfWeek, false)
    );
  }

  return (
    <React.Fragment key={"provider-group-info"}>
      {isLoading && <Loading />}
      {!isLoading && (
        <Box sx={{ display: "flex", gap: "30px" }}>
          <Box
            sx={{
              ...sxs.personalInfoContainer,
              flexDirection: props.flexDirection || "column",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <img
                src={providerGroup?.avatar}
                style={{
                  height: "7rem",
                  width: "7rem",
                }}
              />
              <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                {providerGroup.name
                  ?.split(" ")
                  .map((res: any) => `${capitalizeFirstLetter(res)} `)}
              </Typography>
              {providerGroup.specialities.length > 1 ? (
                <Typography>
                  <span className={classes.multispeciality}>
                    Multispeciality
                  </span>
                </Typography>
              ) : (
                <Typography>
                  {providerGroup.specialities.map((speciality: any) => {
                    return (
                      <span className={classes.multispeciality}>
                        {speciality.name}
                      </span>
                    );
                  })}
                </Typography>
              )}
            </Box>
            <Box sx={sxs.flexItem}>
              <Grid container>
                <Grid item container>
                  <Grid item xs={4} sx={sxs.locationDetails}>
                    Group NPI Number
                  </Grid>
                  <Grid item xs={8} sx={sxs.locationDetailsValue}>
                    {providerGroup.npi || "-"}
                  </Grid>
                </Grid>
                <Grid item container>
                  <Grid item xs={4} sx={sxs.locationDetails}>
                    Website
                  </Grid>
                  <Grid item xs={8} sx={sxs.locationDetailsValue}>
                    {providerGroup.website || "-"}
                  </Grid>
                </Grid>
                <Grid item container>
                  <Grid item xs={4} sx={sxs.locationDetails}>
                    Contact Number
                  </Grid>
                  <Grid item xs={8} sx={sxs.locationDetailsValue}>
                    {providerGroup.phone || "-"}
                  </Grid>
                </Grid>
                <Grid item container>
                  <Grid item xs={4} sx={sxs.locationDetails}>
                    Email
                  </Grid>
                  <Grid item xs={8} sx={sxs.locationDetailsValue}>
                    {providerGroup.email || "-"}
                  </Grid>
                </Grid>
                <Grid item container>
                  <Grid item xs={4} sx={sxs.locationDetails}>
                    Physical Address
                  </Grid>
                  <Grid item xs={8} sx={sxs.locationDetailsValue}>
                    {providerGroup.physicalAddress.line1 &&
                      `${providerGroup?.physicalAddress.line1}, ${providerGroup?.physicalAddress.line2}, 
                  ${providerGroup?.physicalAddress.city}, ${providerGroup?.physicalAddress.state}, ${providerGroup?.physicalAddress.country}, 
                  ${providerGroup?.physicalAddress.zipcode}`}
                    {!providerGroup.physicalAddress.line1 && "-"}
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
          {!props.hideBasicInfo && (
            <Box sx={sxs.basicInfoContainer}>
              <Typography variant="h3" sx={sxs.providerKeyTypo2}>
                Basic Information
              </Typography>
              <Grid container spacing={5} marginBottom={5}>
                <Grid item container xs={6}>
                  <Grid item xs={5} sx={sxs.locationDetails}>
                    Provider Group Fax Number
                  </Grid>
                  <Grid item xs={7} sx={sxs.locationDetailsValue}>
                    {providerGroup.fax || "-"}
                  </Grid>
                  <Grid item xs={5} sx={sxs.locationDetails}>
                    Billing Address
                  </Grid>
                  <Grid item xs={7} sx={sxs.locationDetailsValue}>
                    {!providerGroup?.billingAddress?.line1 && "-"}
                    {providerGroup?.billingAddress?.line1 &&
                      `${providerGroup?.billingAddress?.line1}, ${providerGroup?.billingAddress?.line2}, 
                  ${providerGroup?.billingAddress?.city}, ${providerGroup?.billingAddress?.state}, ${providerGroup?.billingAddress?.country}, 
                  ${providerGroup?.billingAddress?.zipcode}`}
                  </Grid>
                </Grid>
                <Grid item container xs={6}>
                  <Grid item xs={5} sx={sxs.locationDetails}>
                    Provider Group Office Hours
                  </Grid>
                  <Grid item xs={6} sx={sxs.locationDetailsValue}>
                    {providerGroup.workingHours.length !== 0
                      ? providerGroup.workingHours.map(
                          (res: any, index: number) => {
                            return (
                              <>
                                <Grid
                                  sx={{
                                    margin: index != 0 ? "5px 0" : "",
                                    display: "flex",
                                  }}
                                >
                                  <Grid sx={{ width: "7rem" }}>
                                    {capitalizeFirstLetter(res.dayOfWeek)}
                                  </Grid>
                                  <Grid>
                                    {convertTo12HourFormat(res.openingTime)} -{" "}
                                    {convertTo12HourFormat(res.closingTime)}
                                  </Grid>
                                </Grid>
                              </>
                            );
                          }
                        )
                      : "-"}
                  </Grid>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item container xs={12}>
                  <Grid item xs={2.5} sx={sxs.locationDetails}>
                    Provider Group Description
                  </Grid>
                  <Grid item xs={9.5} sx={sxs.locationDetailsValue}>
                    {providerGroup.description || "-"}
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      )}
    </React.Fragment>
  );
}

export default ProviderGroupInfo;
