/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { ButtonBase, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import EditInsurance from "./edit-insurance/edit-insurance-modal";
import EventSucessModal from "../../../../../../../../components/common/success-modal";
import {
  actionBtns,
  formButtonStyle,
} from "../../../../../../../../styles/common";
import AddIcon from "@mui/icons-material/Add";
import { useInsuranceControllerServiceGetPatientInsurance } from "../../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import moment from "moment";
import { Insurance } from "../../../../../../../../sdk/thinkemr-core-0.0.1/requests";
import { formatDate } from "../../../../../../../../components/common/enums-and-interfaces/common-functions";
import Loading from "../../../../../../../../components/common/spinner/loading";

export const insuranceTabStyle = makeStyles(() => ({
  borderbox: {
    border: "1px solid #1A1A1A33",
    borderRadius: "10px",
    padding: "10px",
  },
  headingtypo: {
    color: "#004186 !important",
    fontSize: "16px !important",
    fontWeight: "bold !important",
    paddingBottom: "20px",
  },
  textheading: {
    color: "black !important",
    // fontWeight: "600 !important",
    paddingBottom: "20px !important ",
    fontSize: "14px !important",
  },
  textheadingPreferences: {
    color: "black !important",
    // fontWeight: "600 !important",
    paddingBottom: "40px!important ",
  },
  textvalue: {
    color: "black !important",
    fontWeight: "600 !important",
    fontSize: "14px !important",
  },
  buttonbase: {
    height: "32px ",
    width: "70px",
    borderRadius: "5px !important",
    backgroundColor: "#CCECFF80 !important",
    border: "2px solid #004186 !important",
    display: "flex",
    justifyContent: "space-evenly",
    paddingRight: "5px !important",
  },
  dropZone: {
    minHeight: "150px !important",
    minWidth: "350px !important",
    width: "380px !important",
    height: "200px !important",
    borderRadius: "20px",
    backgroundColor: "#F1F1F1",
    border: "2px solid #1A1A1AB3",
  },
  uploadIcon: {
    fill: "#2879C9",
  },
  textUploadZone: {
    color: "#1A1A1ACC !important",
    fontSize: "18px !important",
    marginTop: "24px",
    marginBottom: "24px",
  },
}));

interface PatientTableRecordsProps {
  patientData: any;
}

const InsuranceTab: React.FC<PatientTableRecordsProps> = ({ patientData }) => {
  const classes = insuranceTabStyle();
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [addInsurance, setAddInsurance] = useState(false);
  const [editPrimaryModal, setEditPrimaryModal] = useState(false);
  const [editSecondaryModal, setEditSecondaryModal] = useState(false);
  const [editTertiaryModal, setEditTertiaryModal] = useState(false);
  const [primaryInsurance, setPrimaryInsurance] = useState<any[]>([]);
  const [secondaryInsurance, setSecondaryInsurance] = useState<any[]>([]);
  const [otherInsurance, setOtherInsurance] = useState<any>([]);

  const [isLoadingFrontPhoto, setIsLoadingFrontPhoto] = useState(true);
  const [isLoadingBackPhoto, setIsLoadingBackPhoto] = useState(true);

  // Function to handle front photo load
  const handleFrontPhotoLoad = () => {
    setIsLoadingFrontPhoto(false);
  };

  // Function to handle back photo load
  const handleBackPhotoLoad = () => {
    setIsLoadingBackPhoto(false);
  };

  const handleOpenEditPrimaryInsuranceModal = () => {
    setSuccessMessage("Primary Insurance Updated Successfully!");
    setEditPrimaryModal(true);
  };

  const handleOpenEditSecondaryInsuranceModal = () => {
    setSuccessMessage("Secondary Insurance Updated Successfully!");
    setEditSecondaryModal(true);
  };

  const handleAddInsurance = () => {
    setSuccessMessage("Insurance Added Successfully!");
    setAddInsurance(true);
  };

  const handleOpenEditTertiaryInsuranceModal = () => {
    setSuccessMessage("Tertiary Insurance Updated Successfully!");
    setEditTertiaryModal((pre) => !pre);
  };
  const handleCloseModal = () => {
    setEditPrimaryModal(false);
    setEditSecondaryModal(false);
    setEditTertiaryModal(false);
    setAddInsurance(false);
  };
  const handleEventSuccessModalOpen = () => {
    setOpenSuccessModal(true);
    setEditPrimaryModal(false);
    setEditSecondaryModal(false);
    setEditTertiaryModal(false);
  };
  const { data, isLoading, isError, error, refetch, isSuccess } =
    useInsuranceControllerServiceGetPatientInsurance({
      patientUuid: patientData?.uuid,
    });

  useEffect(() => {
    const primaryInsurance1 =
      data?.data?.filter(
        (insurance: Insurance) => insurance.insuranceType === "PRIMARY"
      ) || [];

    const secondaryInsurance1 =
      data?.data?.filter(
        (insurance: Insurance) => insurance.insuranceType === "SECONDARY"
      ) || [];
    const otherInsurance1 =
      data?.data?.filter(
        (insurance: Insurance) => insurance.insuranceType === "OTHER"
      ) || [];
    setPrimaryInsurance(primaryInsurance1);
    setSecondaryInsurance(secondaryInsurance1);
    setOtherInsurance(otherInsurance1);
  }, [data, refetch, isSuccess]);

  return (
    <>
      <Grid
        container
        sx={{
          padding: "10px !important",
        }}
      >
        <Grid container xs={12} pb={2} justifyContent="space-between">
          <Grid item>
            <Typography
              variant="h4"
              sx={{
                color: "#004186",
                fontWeight: "bold",
                fontSize: "20px !important",
              }}
            >
              Insurance
            </Typography>
          </Grid>
          <Grid item display="flex" gap="20px;">
            <Grid>
              <ButtonBase
                sx={{
                  ...formButtonStyle.mainButtonStyle,
                }}
                onClick={() => handleAddInsurance()}
              >
                <AddIcon />
                <Typography variant="h4">Add Insurance</Typography>
              </ButtonBase>
            </Grid>
          </Grid>
        </Grid>

        {primaryInsurance.length === 0 ? (
          <Grid>No Insurance Data</Grid>
        ) : (
          <Grid container className={classes.borderbox}>
            <Grid container>
              <Grid item xs={11}>
                <Typography variant="h4" className={classes.headingtypo}>
                  Primary Insurance
                </Typography>
              </Grid>
              <Grid
                item
                xs={1}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <ButtonBase
                  sx={formButtonStyle.mainButtonStyle}
                  onClick={handleOpenEditPrimaryInsuranceModal}
                >
                  <ModeEditOutlineOutlinedIcon sx={{ color: "#004186" }} />
                  &nbsp;&nbsp;
                  <Typography
                    variant="h4"
                    sx={{
                      color: "#004186",
                      // fontWeight: "bold",
                    }}
                  >
                    Edit
                  </Typography>
                </ButtonBase>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={4}>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography className={classes.textheading}>
                      Insurance Name
                    </Typography>
                  </Grid>
                  <Grid xs={1}>:</Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.textvalue}>
                      {primaryInsurance?.[0]?.insurancePayer?.payerName || "-"}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography className={classes.textheading}>
                      Group Name
                    </Typography>
                  </Grid>
                  <Grid xs={1}>:</Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.textvalue}>
                      {primaryInsurance?.[0]?.groupName || "-"}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography className={classes.textheading}>
                      Copay Amount
                    </Typography>
                  </Grid>
                  <Grid xs={1}>:</Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.textvalue}>
                      {primaryInsurance?.[0]?.copay || "-"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography className={classes.textheading}>
                      Member ID
                    </Typography>
                  </Grid>
                  <Grid xs={1}>:</Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.textvalue}>
                      {primaryInsurance?.[0]?.memberId || "-"}
                    </Typography>
                  </Grid>
                </Grid>{" "}
                <Grid container>
                  <Grid item xs={4}>
                    <Typography className={classes.textheading}>
                      Expiry Date
                    </Typography>
                  </Grid>
                  <Grid xs={1}>:</Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.textvalue}>
                      {primaryInsurance?.[0]?.expiryDate
                        ? formatDate(primaryInsurance?.[0]?.expiryDate)
                        : "-"}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography className={classes.textheading}>
                      Payer Contact Number
                    </Typography>
                  </Grid>
                  <Grid xs={1}>:</Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.textvalue}>
                      {primaryInsurance?.[0]?.payerContactNumber || "-"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography className={classes.textheading}>
                      Group ID
                    </Typography>
                  </Grid>
                  <Grid xs={1}>:</Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.textvalue}>
                      {primaryInsurance?.[0]?.groupId || "-"}
                    </Typography>
                  </Grid>
                </Grid>{" "}
                <Grid container>
                  <Grid item xs={4}>
                    <Typography className={classes.textheading}>
                      Plan Name
                    </Typography>
                  </Grid>
                  <Grid xs={1}>:</Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.textvalue}>
                      {primaryInsurance?.[0]?.planName || "-"}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography className={classes.textheading}>
                      Payer Fax Number
                    </Typography>
                  </Grid>
                  <Grid xs={1}>:</Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.textvalue}>
                      {primaryInsurance?.[0]?.payerFaxNumber || "-"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container columnGap={3} mt={2} mb={2}>
              <Grid item>
                {isLoadingFrontPhoto && primaryInsurance?.[0]?.frontPhoto && (
                  <Loading />
                )}
                <img
                  src={primaryInsurance?.[0]?.frontPhoto}
                  alt="Front Photo"
                  style={{
                    width: "700px",
                    height: "auto",
                    maxWidth: "500px",
                    display: isLoadingFrontPhoto ? "none" : "block",
                  }}
                  onLoad={handleFrontPhotoLoad}
                />
              </Grid>
              <Grid item>
                {isLoadingBackPhoto && primaryInsurance?.[0]?.backPhoto && (
                  <Loading />
                )}
                <img
                  src={primaryInsurance?.[0]?.backPhoto}
                  alt="Back Photo"
                  style={{
                    width: "700px",
                    height: "auto",
                    maxWidth: "500px",
                    display: isLoadingBackPhoto ? "none" : "block",
                  }}
                  onLoad={handleBackPhotoLoad}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid container sx={{ paddingTop: "20px" }}>
                <Typography variant="h4" className={classes.headingtypo}>
                  Policy Holder (Sister)
                </Typography>
              </Grid>
              <Grid container>
                <Grid item xs={4}>
                  <Grid container>
                    <Grid item xs={3}>
                      <Typography className={classes.textheading}>
                        Name
                      </Typography>
                    </Grid>
                    <Grid xs={1}>:</Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.textvalue}>
                        {primaryInsurance?.[0]?.insurancePolicyHolder?.firstName
                          ? primaryInsurance?.[0]?.insurancePolicyHolder
                              ?.firstName +
                            " " +
                            primaryInsurance?.[0]?.insurancePolicyHolder
                              ?.lastName
                          : "-"}
                      </Typography>
                    </Grid>
                  </Grid>
                  {/* <Grid container>
                  <Grid item xs={3}>
                    <Typography className={classes.textheading}>SSN</Typography>
                  </Grid>
                  <Grid xs={1}>:</Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.textvalue}>
                      {"-"}
                    </Typography>
                  </Grid>
                </Grid> */}
                  <Grid container>
                    <Grid item xs={3}>
                      <Typography className={classes.textheading}>
                        Address
                      </Typography>
                    </Grid>
                    <Grid xs={1}>:</Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.textvalue}>
                        {primaryInsurance?.[0]?.insurancePolicyHolder?.address
                          ?.line1 || "-"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  {/* <Grid container>
                  <Grid item xs={3}>
                    <Typography className={classes.textheading}>
                      Primary Phone
                    </Typography>
                  </Grid>
                  <Grid xs={1}>:</Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.textvalue}>
                      {"-"}
                    </Typography>
                  </Grid>
                </Grid>{" "} */}
                  <Grid container>
                    <Grid item xs={3}>
                      <Typography className={classes.textheading}>
                        Date of Birth
                      </Typography>
                    </Grid>
                    <Grid xs={1}>:</Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.textvalue}>
                        {primaryInsurance?.[0]?.insurancePolicyHolder?.dob
                          ? moment(
                              primaryInsurance?.[0]?.insurancePolicyHolder?.dob
                            ).format("MMMM D, YYYY")
                          : "-"}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={3}>
                      <Typography className={classes.textheading}>
                        State
                      </Typography>
                    </Grid>
                    <Grid xs={1}>:</Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.textvalue}>
                        {primaryInsurance?.[0]?.insurancePolicyHolder?.address
                          ?.state || "-"}
                      </Typography>
                    </Grid>
                  </Grid>{" "}
                </Grid>
                <Grid item xs={4}>
                  <Grid container>
                    <Grid item xs={3}>
                      <Typography className={classes.textheading}>
                        Gender
                      </Typography>
                    </Grid>
                    <Grid xs={1}>:</Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.textvalue}>
                        {primaryInsurance?.[0]?.insurancePolicyHolder?.gender
                          ? primaryInsurance[0].insurancePolicyHolder.gender
                              .charAt(0)
                              .toUpperCase() +
                            primaryInsurance[0].insurancePolicyHolder.gender
                              .slice(1)
                              .toLowerCase()
                          : "-"}
                      </Typography>
                    </Grid>
                  </Grid>{" "}
                  <Grid container>
                    <Grid item xs={3}>
                      <Typography className={classes.textheading}>
                        Country
                      </Typography>
                    </Grid>
                    <Grid xs={1}>:</Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.textvalue}>
                        {primaryInsurance?.[0]?.insurancePolicyHolder?.address
                          ?.country || "-"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
      {secondaryInsurance.length !== 0 && (
        <Grid
          container
          sx={{
            padding: "10px !important",
          }}
        >
          <Grid container className={classes.borderbox}>
            <Grid container>
              <Grid item xs={10}>
                <Typography variant="h4" className={classes.headingtypo}>
                  Secondary Insurance
                </Typography>
              </Grid>
              <Grid
                item
                xs={2}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Grid container>
                  <Grid item xs={8}>
                    <ButtonBase>
                      <Typography
                        variant="h5"
                        sx={{
                          color: "#004186",
                          fontWeight: "bold",
                        }}
                      >
                        Set As Primary
                      </Typography>
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={2}>
                    <ButtonBase
                      sx={formButtonStyle.mainButtonStyle}
                      onClick={handleOpenEditSecondaryInsuranceModal}
                    >
                      <ModeEditOutlineOutlinedIcon sx={{ color: "#004186" }} />
                      <Typography
                        variant="h4"
                        sx={{
                          color: "#004186",
                          // fontWeight: "bold",
                        }}
                      >
                        Edit
                      </Typography>
                    </ButtonBase>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={4}>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography className={classes.textheading}>
                      Insurance Name
                    </Typography>
                  </Grid>
                  <Grid xs={1}>:</Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.textvalue}>
                      {secondaryInsurance?.[0]?.insurancePayer?.payerName ||
                        "-"}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography className={classes.textheading}>
                      Group Name
                    </Typography>
                  </Grid>
                  <Grid xs={1}>:</Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.textvalue}>
                      {secondaryInsurance?.[0]?.groupName || "-"}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography className={classes.textheading}>
                      Copay Amount
                    </Typography>
                  </Grid>
                  <Grid xs={1}>:</Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.textvalue}>
                      {secondaryInsurance?.[0]?.copay || "-"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography className={classes.textheading}>
                      Member ID
                    </Typography>
                  </Grid>
                  <Grid xs={1}>:</Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.textvalue}>
                      {secondaryInsurance?.[0]?.memberId || "-"}
                    </Typography>
                  </Grid>
                </Grid>{" "}
                <Grid container>
                  <Grid item xs={4}>
                    <Typography className={classes.textheading}>
                      Expiry Date
                    </Typography>
                  </Grid>
                  <Grid xs={1}>:</Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.textvalue}>
                      {secondaryInsurance?.[0]?.expiryDate
                        ? moment(secondaryInsurance?.[0]?.expiryDate).format(
                            "MMMM D, YYYY"
                          )
                        : "-"}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography className={classes.textheading}>
                      Payer Contact Number
                    </Typography>
                  </Grid>
                  <Grid xs={1}>:</Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.textvalue}>
                      {secondaryInsurance?.[0]?.payerContactNumber || "-"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography className={classes.textheading}>
                      Group ID
                    </Typography>
                  </Grid>
                  <Grid xs={1}>:</Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.textvalue}>
                      {secondaryInsurance?.[0]?.groupId || "-"}
                    </Typography>
                  </Grid>
                </Grid>{" "}
                <Grid container>
                  <Grid item xs={4}>
                    <Typography className={classes.textheading}>
                      Plan Name
                    </Typography>
                  </Grid>
                  <Grid xs={1}>:</Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.textvalue}>
                      {secondaryInsurance?.[0]?.planName || "-"}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography className={classes.textheading}>
                      Payer Fax Number
                    </Typography>
                  </Grid>
                  <Grid xs={1}>:</Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.textvalue}>
                      {secondaryInsurance?.[0]?.payerFaxNumber || "-"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container columnGap={3} mt={2} mb={2}>
              <Grid item>
                {isLoadingFrontPhoto && secondaryInsurance?.[0]?.frontPhoto && (
                  <Loading />
                )}
                <img
                  src={secondaryInsurance?.[0]?.frontPhoto}
                  alt="Front Photo"
                  style={{
                    width: "700px",
                    height: "auto",
                    maxWidth: "500px",
                    display: isLoadingFrontPhoto ? "none" : "block",
                  }}
                  onLoad={handleFrontPhotoLoad}
                />
              </Grid>
              <Grid item>
                {isLoadingBackPhoto && secondaryInsurance?.[0]?.backPhoto && (
                  <Loading />
                )}
                <img
                  src={secondaryInsurance?.[0]?.backPhoto}
                  alt="Back Photo"
                  style={{
                    width: "700px",
                    height: "auto",
                    maxWidth: "500px",
                    display: isLoadingBackPhoto ? "none" : "block",
                  }}
                  onLoad={handleBackPhotoLoad}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid container sx={{ paddingTop: "20px" }}>
                <Typography variant="h4" className={classes.headingtypo}>
                  Policy Holder (Sister)
                </Typography>
              </Grid>
              <Grid container>
                <Grid item xs={4}>
                  <Grid container>
                    <Grid item xs={3}>
                      <Typography className={classes.textheading}>
                        Name
                      </Typography>
                    </Grid>
                    <Grid xs={1}>:</Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.textvalue}>
                        {secondaryInsurance?.[0]?.insurancePolicyHolder
                          ?.firstName
                          ? secondaryInsurance?.[0]?.insurancePolicyHolder
                              ?.firstName +
                            " " +
                            secondaryInsurance?.[0]?.insurancePolicyHolder
                              ?.lastName
                          : "-"}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={3}>
                      <Typography className={classes.textheading}>
                        Address
                      </Typography>
                    </Grid>
                    <Grid xs={1}>:</Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.textvalue}>
                        {secondaryInsurance?.[0]?.insurancePolicyHolder?.address
                          ?.line1 || "-"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid container>
                    <Grid item xs={3}>
                      <Typography className={classes.textheading}>
                        Date of Birth
                      </Typography>
                    </Grid>
                    <Grid xs={1}>:</Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.textvalue}>
                        {secondaryInsurance?.[0]?.insurancePolicyHolder?.dob
                          ? moment(
                              secondaryInsurance?.[0]?.insurancePolicyHolder
                                ?.dob
                            ).format("MMMM D, YYYY")
                          : "-"}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={3}>
                      <Typography className={classes.textheading}>
                        State
                      </Typography>
                    </Grid>
                    <Grid xs={1}>:</Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.textvalue}>
                        {secondaryInsurance?.[0]?.insurancePolicyHolder?.address
                          ?.state || "-"}
                      </Typography>
                    </Grid>
                  </Grid>{" "}
                </Grid>
                <Grid item xs={4}>
                  <Grid container>
                    <Grid item xs={3}>
                      <Typography className={classes.textheading}>
                        Gender
                      </Typography>
                    </Grid>
                    <Grid xs={1}>:</Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.textvalue}>
                        {secondaryInsurance?.[0]?.insurancePolicyHolder?.gender
                          ? secondaryInsurance[0].insurancePolicyHolder.gender
                              .charAt(0)
                              .toUpperCase() +
                            secondaryInsurance[0].insurancePolicyHolder.gender
                              .slice(1)
                              .toLowerCase()
                          : "-"}
                      </Typography>
                    </Grid>
                  </Grid>{" "}
                  <Grid container>
                    <Grid item xs={3}>
                      <Typography className={classes.textheading}>
                        Country
                      </Typography>
                    </Grid>
                    <Grid xs={1}>:</Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.textvalue}>
                        {secondaryInsurance?.[0]?.insurancePolicyHolder?.address
                          ?.country || "-"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
      <Grid container sx={{ padding: "10px !important" }}>
        {otherInsurance.length !== 0 && (
          <Grid container className={classes.borderbox}>
            <Grid container>
              <Grid item xs={10}>
                <Typography variant="h4" className={classes.headingtypo}>
                  Tertiary Insurance
                </Typography>
              </Grid>
              <Grid
                item
                xs={2}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Grid container>
                  <Grid item xs={8}>
                    <ButtonBase>
                      <Typography
                        variant="h5"
                        sx={{
                          color: "#004186",
                          fontWeight: "bold",
                        }}
                      >
                        Set As Primary
                      </Typography>
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={2}>
                    <ButtonBase
                      sx={formButtonStyle.mainButtonStyle}
                      onClick={handleOpenEditTertiaryInsuranceModal}
                    >
                      <ModeEditOutlineOutlinedIcon sx={{ color: "#004186" }} />
                      <Typography
                        variant="h4"
                        sx={{
                          color: "#004186",
                          // fontWeight: "bold",
                        }}
                      >
                        Edit
                      </Typography>
                    </ButtonBase>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={4}>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography className={classes.textheading}>
                      Insurance Name
                    </Typography>
                  </Grid>
                  <Grid xs={1}>:</Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.textvalue}>
                      {otherInsurance?.[0]?.insurancePayer?.payerName || "-"}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography className={classes.textheading}>
                      Group Name
                    </Typography>
                  </Grid>
                  <Grid xs={1}>:</Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.textvalue}>
                      {otherInsurance?.[0]?.groupName || "-"}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography className={classes.textheading}>
                      Copay Amount
                    </Typography>
                  </Grid>
                  <Grid xs={1}>:</Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.textvalue}>
                      {otherInsurance?.[0]?.copay || "-"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography className={classes.textheading}>
                      Member ID
                    </Typography>
                  </Grid>
                  <Grid xs={1}>:</Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.textvalue}>
                      {otherInsurance?.[0]?.memberId || "-"}
                    </Typography>
                  </Grid>
                </Grid>{" "}
                <Grid container>
                  <Grid item xs={4}>
                    <Typography className={classes.textheading}>
                      Expiry Date
                    </Typography>
                  </Grid>
                  <Grid xs={1}>:</Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.textvalue}>
                      {otherInsurance?.[0]?.expiryDate
                        ? moment(otherInsurance?.[0]?.expiryDate).format(
                            "MMMM D, YYYY"
                          )
                        : "-"}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography className={classes.textheading}>
                      Payer Contact Number
                    </Typography>
                  </Grid>
                  <Grid xs={1}>:</Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.textvalue}>
                      {otherInsurance?.[0]?.payerContactNumber || "-"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography className={classes.textheading}>
                      Group ID
                    </Typography>
                  </Grid>
                  <Grid xs={1}>:</Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.textvalue}>
                      {otherInsurance?.[0]?.groupId || "-"}
                    </Typography>
                  </Grid>
                </Grid>{" "}
                <Grid container>
                  <Grid item xs={4}>
                    <Typography className={classes.textheading}>
                      Plan Name
                    </Typography>
                  </Grid>
                  <Grid xs={1}>:</Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.textvalue}>
                      {otherInsurance?.[0]?.planName || "-"}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography className={classes.textheading}>
                      Payer Fax Number
                    </Typography>
                  </Grid>
                  <Grid xs={1}>:</Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.textvalue}>
                      {otherInsurance?.[0]?.payerFaxNumber || "-"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container columnGap={3} mt={2} mb={2}>
              <Grid item>
                {isLoadingFrontPhoto && otherInsurance?.[0]?.frontPhoto && (
                  <Loading />
                )}
                <img
                  src={otherInsurance?.[0]?.frontPhoto}
                  alt="Front Photo"
                  style={{
                    width: "700px",
                    height: "auto",
                    maxWidth: "500px",
                    display: isLoadingFrontPhoto ? "none" : "block",
                  }}
                  onLoad={handleFrontPhotoLoad}
                />
              </Grid>
              <Grid item>
                {isLoadingBackPhoto && otherInsurance?.[0]?.backPhoto && (
                  <Loading />
                )}
                <img
                  src={otherInsurance?.[0]?.backPhoto}
                  alt="Back Photo"
                  style={{
                    width: "700px",
                    height: "auto",
                    maxWidth: "500px",
                    display: isLoadingBackPhoto ? "none" : "block",
                  }}
                  onLoad={handleBackPhotoLoad}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid container sx={{ paddingTop: "20px" }}>
                <Typography variant="h4" className={classes.headingtypo}>
                  Policy Holder (Sister)
                </Typography>
              </Grid>
              <Grid container>
                <Grid item xs={4}>
                  <Grid container>
                    <Grid item xs={3}>
                      <Typography className={classes.textheading}>
                        Name
                      </Typography>
                    </Grid>
                    <Grid xs={1}>:</Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.textvalue}>
                        {otherInsurance?.[0]?.insurancePolicyHolder?.firstName
                          ? otherInsurance?.[0]?.insurancePolicyHolder
                              ?.firstName +
                            " " +
                            otherInsurance?.[0]?.insurancePolicyHolder?.lastName
                          : "-"}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={3}>
                      <Typography className={classes.textheading}>
                        Address
                      </Typography>
                    </Grid>
                    <Grid xs={1}>:</Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.textvalue}>
                        {otherInsurance?.[0]?.insurancePolicyHolder?.address
                          ?.line1 || "-"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid container>
                    <Grid item xs={3}>
                      <Typography className={classes.textheading}>
                        Date of Birth
                      </Typography>
                    </Grid>
                    <Grid xs={1}>:</Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.textvalue}>
                        {otherInsurance?.[0]?.insurancePolicyHolder?.dob
                          ? moment(
                              otherInsurance?.[0]?.insurancePolicyHolder?.dob
                            ).format("MMMM D, YYYY")
                          : "-"}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={3}>
                      <Typography className={classes.textheading}>
                        State
                      </Typography>
                    </Grid>
                    <Grid xs={1}>:</Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.textvalue}>
                        {otherInsurance?.[0]?.insurancePolicyHolder?.address
                          ?.state || "-"}
                      </Typography>
                    </Grid>
                  </Grid>{" "}
                </Grid>
                <Grid item xs={4}>
                  <Grid container>
                    <Grid item xs={3}>
                      <Typography className={classes.textheading}>
                        Gender
                      </Typography>
                    </Grid>
                    <Grid xs={1}>:</Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.textvalue}>
                        {otherInsurance?.[0]?.insurancePolicyHolder?.gender
                          ? otherInsurance[0].insurancePolicyHolder.gender
                              .charAt(0)
                              .toUpperCase() +
                            otherInsurance[0].insurancePolicyHolder.gender
                              .slice(1)
                              .toLowerCase()
                          : "-"}
                      </Typography>
                    </Grid>
                  </Grid>{" "}
                  <Grid container>
                    <Grid item xs={3}>
                      <Typography className={classes.textheading}>
                        Country
                      </Typography>
                    </Grid>
                    <Grid xs={1}>:</Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.textvalue}>
                        {otherInsurance?.[0]?.insurancePolicyHolder?.address
                          ?.country || "-"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
        <EditInsurance
          open={addInsurance}
          onClose={handleCloseModal}
          onEventSuccessModalOpen={handleEventSuccessModalOpen}
          title="Add Insurance"
          patientUuid={patientData?.uuid}
          refetch={refetch}
        />
        <EditInsurance
          open={editPrimaryModal}
          onClose={handleCloseModal}
          onEventSuccessModalOpen={handleEventSuccessModalOpen}
          title="Edit Primary Insurance"
          insuranceList={primaryInsurance[0]}
          patientUuid={patientData?.uuid}
          refetch={refetch}
        />
        <EditInsurance
          open={editSecondaryModal}
          onClose={handleCloseModal}
          onEventSuccessModalOpen={handleEventSuccessModalOpen}
          title="Edit Secondary Insurance"
          insuranceList={secondaryInsurance[0]}
          patientUuid={patientData?.uuid}
          refetch={refetch}
        />
        <EditInsurance
          open={editTertiaryModal}
          onClose={handleCloseModal}
          onEventSuccessModalOpen={handleEventSuccessModalOpen}
          title="Edit Tiertiary Insurance"
          insuranceList={otherInsurance[0]}
          patientUuid={patientData?.uuid}
          refetch={refetch}
        />
        {openSuccessModal && (
          <EventSucessModal
            message={successMessage}
            onClose={() => setOpenSuccessModal(false)}
          />
        )}
      </Grid>
    </>
  );
};

export default InsuranceTab;
