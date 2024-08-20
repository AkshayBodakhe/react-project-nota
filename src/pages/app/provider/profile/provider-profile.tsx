import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { Box, Button, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import emptyImage from "../../../../assets/other/profile.jpg";
import AddEditProviderUser from "../../../../components/core/add-edit-provider-user/add-edit-provider-user";
import { toCamelCase } from "../../../../components/core/add-edit-staff-user/add-edit-staff-user";
import AppLayout from "../../../../components/core/layout/layout";
import {
  useProviderControllerServiceGetProviderByUserId,
  useProviderGroupControllerServiceGetProviderGroupById,
} from "../../../../sdk/thinkemr-core-0.0.1/queries";
import providerGroupService from "../../../../service/provider-group--service";
import { formButtonStyle } from "../../../../styles/common";
import { Enums } from "../../admin/provider-groups/common-files/enums";
import { ProviderGroupUuidContext } from "../../admin/provider-groups/details/provider-groups/provider-groups-admin";
import { PROVIDER } from "../documents/documents-constant/documents-common-const";
import Loading from "../../../../components/common/spinner/loading";

export const style = makeStyles(() => ({
  speciality: {
    background: "#FFFFFF 0% 0% no-repeat padding-box",
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

const ProviderProfileDetails = () => {
  const classes = style();
  const Navigate = useNavigate();
  const handleBack = () => {
    Navigate(-1);
  };
  const [open, setOpen] = useState(false);
  const handleOpenDialog = () => {
    setOpen((item) => !item);
  };
  let { id } = useParams();
  let providerGroupUuid = id as string;
  const providerGrpUuid = useContext(ProviderGroupUuidContext);
  const [userRoles, setUserRoles] = useState<any[]>([]);
  const location = useLocation();
  const providerProfileUuid = location.state.uuid;
  const providerData = useSelector(
    (state: any) => state.commonReducer.userDetail?.data
  );

  const [providersDetails, setProvidersDetails] = useState<any>();
  const { data: providersData, isPending } =
    useProviderControllerServiceGetProviderByUserId({
      uuid: providerProfileUuid,
    });

  const getProvidersById = (providersData: any) => {
    setProvidersDetails(providersData.data);
  };

  useEffect(() => {
    if (providersData) {
      getProvidersById(providersData);
    }
  }, [providersData, providerProfileUuid]);

  if (!providerGroupUuid) {
    const providerInfo = useSelector(
      (state: any) => state.commonReducer.userDetail?.data
    );
    providerGroupUuid = providerInfo?.providerGroup || "";
  }

  const provider = useSelector(
    (state: any) => state.commonReducer.userDetail?.data
  );

  const providerDetails = {
    uuid: provider.userUuid,
  };

  const [tenantId] = useState<any>(
    localStorage.getItem(Enums.PROVIDER_GROUP_KEY) || ""
  );
  const [providerGroupSpecialities, setProviderGroupSpecialities] = useState<
    any[]
  >([]);
  const [providerLicensedStateList, setProviderLicensedStateList] = useState<
    any[]
  >([]);
  const [providerWorkLocationList, setProviderWorkLocationList] = useState<
    any[]
  >([]);

  const providerGroup = useProviderGroupControllerServiceGetProviderGroupById({
    uuid: providerGrpUuid || "",
  })?.data?.data;

  const getWorkLocations = async () => {
    await providerGroupService
      .getAllLocations(
        tenantId,
        0,
        10,
        "created",
        "desc",
        "",
        providerGroupUuid
      )
      .then((res: any) => {
        if (res?.data?.data && res.data.data.content) {
          setProviderWorkLocationList(res.data.data.content);
        }
      });
  };

  const getAllRolesWithDefault = () => {
    try {
      providerGroupService
        .getAllRolesWithDefault("", 0, 50, providerGroupUuid)
        .then((roles: any) => {
          if (roles?.data && roles.data?.data) {
            setUserRoles(roles.data.data.content);
          }
        });
    } catch (error) {}
  };

  const getAllSpecialities = async () => {
    await providerGroupService
      .getAllSpecialities(tenantId, 0, 10)
      .then((specialities: any) => {
        if (specialities?.data && specialities.data?.data) {
          setProviderGroupSpecialities(specialities.data.data.content);
        }
      });
  };

  const getAllLicensedStates = async () => {
    try {
      await providerGroupService
        .getAllLicensedStates(tenantId)
        .then((states: any) => {
          if (states?.data && states.data?.data) {
            setProviderLicensedStateList(states.data.data.content);
          }
        });
    } catch (_error) {}
  };

  const licensedStates = (licensedState: any[]) => {
    const licState = licensedState?.map((item) => {
      return (
        <Box display={"flex"} gap={1}>
          <Typography className={classes.value}>{item?.state + ","}</Typography>
        </Box>
      );
    });
    return licState;
  };

  useEffect(() => {
    getWorkLocations();
    getAllLicensedStates();
    getAllSpecialities();
    getAllRolesWithDefault();
    // getAllInsuranceAccepted();
  }, []);

  return (
    <>
      {providerProfileUuid && isPending && <Loading />}
      <Grid bgcolor={"#FFF"} p={3} mx={2} my={1} borderRadius={"5px"}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Grid container gap={2} sx={{ color: "#004186" }}>
            <ArrowBackIcon onClick={handleBack} sx={{ cursor: "pointer" }} />
            <Typography variant="h3">{"Provider Profile"}</Typography>
          </Grid>
          <Grid container justifyContent={"end"}>
            {!providerProfileUuid && (
              <Button
                sx={formButtonStyle.editProfileBtn}
                onClick={() => handleOpenDialog()}
              >
                <ModeEditOutlineOutlinedIcon sx={{ fontSize: "18px" }} />
                &nbsp;
                <Typography
                  variant="h5"
                  sx={{ textTransform: "capitalize", fontWeight: 600 }}
                >
                  Edit Profile
                </Typography>
              </Button>
            )}
          </Grid>
        </Box>
        <Grid mt={2} height={"78vh"} borderRadius={"10px"}>
          <Box display={"grid"} gridTemplateColumns={"30% 1fr"} gap={3}>
            <Grid
              border={"1px solid #1A1A1A33"}
              borderRadius={"10px"}
              height={"66.5vh"}
            >
              <Grid item p={2}>
                <img
                  className={classes.imgStyle}
                  src={
                    // providerProfileUuid
                    //   ? providersDetails?.avatar || emptyImage
                    //   :
                    providerProfileUuid
                      ? providersDetails?.avatar || emptyImage
                      : providerData?.avatar || emptyImage
                  }
                ></img>
                <Box>
                  <Grid>
                    {/* <Typography>
                      {providerProfileUuid
                        ? providersDetails?.firstName +
                            " " +
                            providersDetails?.lastName || "-"
                        : providerData?.firstName +
                            " " +
                            providerData?.lastName || "-"}
                    </Typography> */}
                  </Grid>
                </Box>
                <Box mt={2}>
                  <Grid item xs={12}>
                    <Typography variant="h3" className={classes.value}>
                      {/* {providerData?.providerType} */}
                      {providerProfileUuid
                        ? providersDetails?.firstName +
                            " " +
                            providersDetails?.lastName || "-"
                        : providerData.firstName +
                            " " +
                            providerData.lastName || "-"}
                    </Typography>
                  </Grid>
                </Box>
                <Box mt={2}>
                  <Grid>
                    {providerProfileUuid ? (
                      providersDetails?.specialities?.length > 1 ? (
                        <Typography>
                          <span className={classes.multispeciality}>
                            Multispeciality
                          </span>
                        </Typography>
                      ) : (
                        <Typography>
                          {providersDetails?.specialities?.map(
                            (speciality: any) => {
                              return (
                                <span className={classes.multispeciality}>
                                  {speciality.name}
                                </span>
                              );
                            }
                          )}
                        </Typography>
                      )
                    ) : providerData?.specialities?.length > 1 ? (
                      <Typography>
                        <span className={classes.multispeciality}>
                          Multispeciality
                        </span>
                      </Typography>
                    ) : (
                      <Typography>
                        {providerData?.specialities?.map((speciality: any) => {
                          return (
                            <span className={classes.multispeciality}>
                              {speciality.name}
                            </span>
                          );
                        })}
                      </Typography>
                    )}
                  </Grid>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"1fr 1fr"} mt={2}>
                  <Grid>
                    <Typography variant="h5" className={classes.key}>
                      Provider Types
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="h5" className={classes.value}>
                      {/* {providerData?.providerType} */}
                      {providerProfileUuid
                        ? providersDetails?.providerType
                        : providerData.providerType}
                    </Typography>
                  </Grid>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"1fr 1fr"} mt={2}>
                  <Grid>
                    <Typography variant="h5" className={classes.key}>
                      Gender
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="h5" className={classes.value}>
                      {providerProfileUuid
                        ? toCamelCase(providersDetails?.gender)
                        : toCamelCase(providerData?.gender)}
                    </Typography>
                  </Grid>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"1fr 1fr"} mt={2}>
                  <Grid>
                    <Typography variant="h5" className={classes.key}>
                      Contact Number
                    </Typography>
                  </Grid>
                  <Grid>
                    <Typography variant="h5" className={classes.value}>
                      {providerProfileUuid
                        ? providersDetails?.contactNumber
                        : providerData?.contactNumber}
                    </Typography>
                  </Grid>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"1fr 1fr"} mt={2}>
                  <Grid>
                    <Typography variant="h5" className={classes.key}>
                      Email
                    </Typography>
                  </Grid>
                  <Grid>
                    <Typography variant="h5" className={classes.value}>
                      {providerProfileUuid
                        ? providersDetails?.email
                        : providerData?.email}
                    </Typography>
                  </Grid>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"1fr 1fr"} mt={2}>
                  <Grid>
                    <Typography variant="h5" className={classes.key}>
                      NPI Number
                    </Typography>
                  </Grid>
                  <Grid>
                    <Typography variant="h5" className={classes.value}>
                      {providerProfileUuid
                        ? providersDetails?.npi
                        : providerData?.npi}
                    </Typography>
                  </Grid>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"1fr 1fr"} mt={2}>
                  <Grid>
                    <Typography variant="h5" className={classes.key}>
                      Bio
                    </Typography>
                  </Grid>
                  <Grid>
                    <Typography variant="h5" className={classes.value}>
                      {providerData?.providerProfileInfo?.bio || "-"}
                    </Typography>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            <Grid>
              <Box
                border={"1px solid #1A1A1A33"}
                height={"fit-content"}
                p={2}
                borderRadius={"10px"}
              >
                <Grid item xs={12}>
                  <Typography
                    variant="h4"
                    sx={{ color: "#1B5984", fontWeight: 600 }}
                  >
                    Basic Information
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Box display={"grid"} gridTemplateColumns={"1fr 1fr"} mt={2}>
                    <Grid item display={"grid"} gridTemplateColumns={"50% 50%"}>
                      <Typography variant="h5" className={classes.key}>
                        Office Fax Number
                      </Typography>
                      <Typography variant="h5" className={classes.value}>
                        {providerProfileUuid
                          ? providersDetails?.fax
                          : providerData?.fax}
                      </Typography>
                    </Grid>
                    <Grid item display={"grid"} gridTemplateColumns={"50% 50%"}>
                      <Typography variant="h5" className={classes.key}>
                        Work Location
                      </Typography>
                      <Box>
                        {/* <Typography variant="h5" border={1}> */}
                        {providerProfileUuid ? (
                          <Typography variant="h5" className={classes.value}>
                            {providersDetails?.workLocations
                              ?.map((item: any) => item.name)
                              .join(", ")}
                          </Typography>
                        ) : (
                          <Typography variant="h5" className={classes.value}>
                            {providerData?.workLocations
                              ?.map((item: any) => item.name)
                              .join(", ")}
                          </Typography>
                        )}
                        {/* </Typography> */}
                      </Box>
                    </Grid>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"1fr 1fr"} mt={2}>
                    <Grid item display={"grid"} gridTemplateColumns={"50% 50%"}>
                      <Typography variant="h5" className={classes.key}>
                        License Number
                      </Typography>
                      <Typography variant="h5" className={classes.value}>
                        {providerProfileUuid
                          ? providersDetails?.licenseNumber || "-"
                          : providerData?.licenseNumber || "-"}
                      </Typography>
                    </Grid>
                  </Box>
                  <Box
                    display={"grid"}
                    gridTemplateColumns={"1fr 1fr"}
                    mt={2.5}
                  >
                    <Grid item display={"grid"} gridTemplateColumns={"50% 50%"}>
                      <Typography variant="h5" className={classes.key}>
                        Group NPI Number
                      </Typography>
                      <Typography variant="h5" className={classes.value}>
                        {providerProfileUuid
                          ? providersDetails?.groupNpi || "-"
                          : providerData?.groupNpi || "-"}
                      </Typography>
                    </Grid>
                  </Box>
                  <Box
                    display={"grid"}
                    gridTemplateColumns={"1fr 1fr"}
                    mt={2.5}
                  >
                    <Grid item display={"grid"} gridTemplateColumns={"50% 50%"}>
                      <Typography variant="h5" className={classes.key}>
                        Taxonomy Number
                      </Typography>
                      <Typography variant="h5" className={classes.value}>
                        {providerProfileUuid
                          ? providersDetails?.taxonomyNumber
                          : providerData?.taxonomyNumber}
                      </Typography>
                    </Grid>
                    <Grid item display={"grid"} gridTemplateColumns={"50% 50%"}>
                      <Typography variant="h5" className={classes.key}>
                        Languages Spoken
                      </Typography>
                      <Typography variant="h5" className={classes.value}>
                        {providerProfileUuid ? (
                          <Typography variant="h5" className={classes.value}>
                            {providersDetails?.languages
                              ?.map((item: any) => item.name)
                              .join(", ")}
                          </Typography>
                        ) : (
                          <Typography variant="h5" className={classes.value}>
                            {providerData?.languages
                              ?.map((item: any) => item.name)
                              .join(", ")}
                          </Typography>
                        )}
                        {/* {providerProfileUuid
                          ? providersDetails?.languagesSpoken?.map(
                              (item: any) => {
                                return (
                                  <Box display={"flex"} gap={0.8}>
                                    <Typography>{item.name}</Typography>
                                  </Box>
                                );
                              }
                            ) || "-"
                          : toCamelCase(providerData?.languagesSpoken) || "-"} */}
                      </Typography>
                    </Grid>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"1fr 1fr"} mt={2}>
                    <Grid item display={"grid"} gridTemplateColumns={"50% 50%"}>
                      <Typography variant="h5" className={classes.key}>
                        Countries
                      </Typography>

                      {providerProfileUuid ? (
                        <Typography variant="h5" className={classes.value}>
                          {providersDetails?.countries
                            ?.map((item: any) => item.country)
                            .join(", ")}
                        </Typography>
                      ) : (
                        <Typography variant="h5" className={classes.value}>
                          {providerData?.countries
                            ?.map((item: any) => item.country)
                            .join(", ")}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item display={"grid"} gridTemplateColumns={"50% 50%"}>
                      <Typography variant="h5" className={classes.key}>
                        Insurance Verification
                      </Typography>
                      <Typography variant="h5" className={classes.value}>
                        {providerProfileUuid
                          ? toCamelCase(providersDetails?.insuranceVerification)
                          : toCamelCase(providerData?.insuranceVerification)}
                      </Typography>
                    </Grid>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"1fr 1fr"} mt={2}>
                    <Grid item display={"grid"} gridTemplateColumns={"50% 50%"}>
                      <Typography variant="h5" className={classes.key}>
                        Year Of Experience
                      </Typography>
                      <Typography variant="h5" className={classes.value}>
                        {providerProfileUuid
                          ? toCamelCase(providersDetails?.experienceYears) ||
                            "-"
                          : toCamelCase(providerData?.experienceYears) || "-"}
                      </Typography>
                    </Grid>
                    <Grid item display={"grid"} gridTemplateColumns={"50% 50%"}>
                      <Typography variant="h5" className={classes.key}>
                        Prior Authorization
                      </Typography>
                      <Typography variant="h5" className={classes.value}>
                        {providerProfileUuid
                          ? toCamelCase(
                              providersDetails?.priorAuthorisations
                            ) || "-"
                          : toCamelCase(providerData?.priorAuthorisations)}
                      </Typography>
                    </Grid>
                  </Box>
                </Grid>
              </Box>
              <Box
                border={"1px solid #1A1A1A33"}
                height={"32vh"}
                p={2}
                mt={3}
                borderRadius={"10px"}
              >
                <Grid item xs={12}>
                  <Typography
                    variant="h4"
                    sx={{ color: "#1B5984", fontWeight: 600 }}
                  >
                    Basic Account Profile Data
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Box display={"grid"} gridTemplateColumns={"1fr 1fr"} mt={2}>
                    <Grid item display={"grid"} gridTemplateColumns={"50% 50%"}>
                      <Typography variant="h5" className={classes.key}>
                        Year Of Experience
                      </Typography>
                      <Typography variant="h5" className={classes.value}>
                        {providerProfileUuid
                          ? toCamelCase(providersDetails?.experienceYears) ||
                            "-"
                          : toCamelCase(providerData.experienceYears) || "-"}
                      </Typography>
                    </Grid>
                  </Box>
                  <Box mt={2}>
                    <Grid item display={"grid"} gridTemplateColumns={"25% 1fr"}>
                      <Typography variant="h5" className={classes.key}>
                        Work Experience
                      </Typography>
                      <Typography variant="h5" className={classes.value}>
                        {providerProfileUuid
                          ? providersDetails?.providerProfileInfo?.experience
                          : providerData?.providerProfileInfo?.experience}
                      </Typography>
                      {/* <Typography variant="h5" className={classes.value}>
                        {"-"}
                      </Typography> */}
                    </Grid>
                  </Box>
                </Grid>
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Grid>
        <AddEditProviderUser
          providerGrpNpi={providerGroup?.npi || ""}
          userRolesList={userRoles}
          providerGroupSpecialities={providerGroupSpecialities}
          providerLicensedStateList={providerLicensedStateList}
          providerWorkLocationList={providerWorkLocationList}
          title={"Edit Profile"}
          providerUuid={providerDetails}
          source={"Provider"}
          open={open}
          setOpen={setOpen}
          scroll="auto"
        />
      </Grid>
    </>
  );
};

export default AppLayout(ProviderProfileDetails, { source: PROVIDER });
