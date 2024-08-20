import { Box, ButtonBase, Grid, Typography } from "@mui/material";
import { formButtonStyle } from "../../../../../../../styles/common";
import { makeStyles } from "@mui/styles";
import { usePatientControllerServiceGetPatient } from "../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { transformText } from "../../../../../../../components/common/helper";
interface profileProps {
  patientData?: any;
}

export const style = makeStyles(() => ({
  label: {
    color: "#1A1A1A !important",
    fontWeight: "600",
  },
  info: {
    color: "#3A3A3A99",
  },
  container: {
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "1px solid #1A1A1A40",
    borderRadius: "10px",
    opacity: 1,
    padding: "10px 20px",
  },
}));

function PatientProfile(props: profileProps) {
  const { patientData } = props;
  const Navigate = useNavigate();
  const classes = style();
  const [patientDetails, setPatientDetails] = useState<any>(null);
  const { data, isSuccess } = usePatientControllerServiceGetPatient({
    patientUuid: patientData?.uuid,
  });

  useEffect(() => {
    if (isSuccess && !!data) {
      setPatientDetails(data?.data);
    }
  }, [isSuccess, patientData]);

  const handleToggleAddModal = () => {
    const titleData = "Edit Patient";
    const editProfile = "Patient Profile";
    Navigate("/provider/add-patient", {
      state: { titleData, patientDetails, editProfile, patientData },
    });
  };

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Profile
        </Typography>
        <ButtonBase
          type="submit"
          sx={{
            ...formButtonStyle.mainButtonStyle,
            height: "40px !important",
            width: "auto !important",
            padding: "0px 10px !important",
          }}
          onClick={handleToggleAddModal}
        >
          <Typography variant="h4">Edit Profile</Typography>
        </ButtonBase>
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", gap: "10px" }} mt={1}>
        <Grid item xs={4} className={classes.container}>
          <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
            <Grid item xs={6} className={classes.label}>
              Name
            </Grid>
            <Typography className={classes.info}>
              {`${patientDetails?.legalFirstName}  ${patientDetails?.legalLastName}` ||
                "-"}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}
          >
            <Grid item xs={6} className={classes.label}>
              Status
            </Grid>
            <Typography className={classes.info}>
              {patientDetails?.active ? "Active" : "Inactive"}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}
          >
            <Grid item xs={6} className={classes.label}>
              Patient ID
            </Grid>
            <Typography className={classes.info}>
              {patientDetails?.id || "-"}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}
          >
            <Grid item xs={6} className={classes.label}>
              DOB
            </Grid>
            <Typography className={classes.info}>
              {moment(patientDetails?.birthDate).format("MM-DD-YYYY") || "-"}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}
          >
            <Grid item xs={6} className={classes.label}>
              SSN
            </Grid>
            <Typography className={classes.info}>
              {patientDetails?.ssn || "-"}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}
          >
            <Grid item xs={6} className={classes.label}>
              Email ID
            </Grid>
            <Grid item xs={6} className={classes.info}>
              <Typography noWrap title={patientDetails?.email}>
                {patientDetails?.email || "-"}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}
          >
            <Grid item xs={5} className={classes.label}>
              Patient registered provider group location
            </Grid>
            <Grid item xs={6} sx={{pl:4}}className={classes.info}>
            <Typography  title={patientDetails?.location?.name}>
              {patientDetails?.location?.name || "-"}
            </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}
          >
            <Grid item xs={6} className={classes.label}>
              Contact Number
            </Grid>
            <Typography className={classes.info}>
              {patientDetails?.contactNumber || "-"}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid item xs={12} className={classes.container}>
            <Grid item xs={12}>
              <Typography variant="h4" sx={{ color: "#2C57B3" }}>
                Demographics
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}
            >
              <Grid item xs={6} className={classes.label}>
                languages:
              </Grid>
              <Grid item xs={6} sx={{ display: "flex" }}>
                {patientDetails?.languages?.map((data: any, index: number) => (
                  <Typography
                    key={index}
                    sx={{ color: "#3A3A3A99 !important" }}
                  >
                    {data?.name}
                    {index !== patientDetails?.languages.length - 1 ? ", " : ""}
                  </Typography>
                ))}
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}
            >
              <Grid item xs={6} className={classes.label}>
                Race:
              </Grid>
              <Typography className={classes.info}>
                {patientDetails?.race || "-"}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}
            >
              <Grid item xs={6} className={classes.label}>
                Marital Status:
              </Grid>
              <Typography className={classes.info}>
                {patientDetails?.maritalStatus || "-"}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}
            >
              <Grid item xs={6} className={classes.label}>
                Ethnicity:
              </Grid>
              <Typography className={classes.info}>
                {patientDetails?.ethnicity || "-"}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}
            >
              <Grid item xs={6} className={classes.label}>
                Gender:
              </Grid>
              <Typography className={classes.info}>
                {patientDetails?.gender
                  ? transformText(patientDetails?.gender)
                  : "-"}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.container} mt={1}>
            <Grid item xs={12}>
              <Typography variant="h4" sx={{ color: "#2C57B3" }}>
                Address
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}
            >
              <Grid item xs={6} className={classes.label}>
                Address Line 1
              </Grid>
              <Typography className={classes.info}>
                {patientDetails?.address?.line1 || "-"}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}
            >
              <Grid item xs={6} className={classes.label}>
                Address Line 2
              </Grid>
              <Typography className={classes.info}>
                {patientDetails?.address?.line2 || "-"}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}
            >
              <Grid item xs={6} className={classes.label}>
                State
              </Grid>
              <Typography className={classes.info}>
                {patientDetails?.address?.state || "-"}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}
            >
              <Grid item xs={6} className={classes.label}>
                City
              </Grid>
              <Typography className={classes.info}>
                {patientDetails?.address?.city || "-"}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}
            >
              <Grid item xs={6} className={classes.label}>
                Country
              </Grid>
              <Typography className={classes.info}>
                {patientDetails?.address?.country || "-"}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}
            >
              <Grid item xs={6} className={classes.label}>
                Zip Code
              </Grid>
              <Typography className={classes.info}>
                {patientDetails?.address?.zipcode || "-"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid item xs={12} className={classes.container}>
            <Grid item xs={12}>
              <Typography variant="h4" sx={{ color: "#2C57B3" }}>
                Privacy
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}
            >
              <Grid item xs={6} className={classes.label}>
                Consent Form:
              </Grid>
              <Typography className={classes.info}>
                {patientDetails?.formConsent ? "True" : "False" || "-"}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}
            >
              <Grid item xs={6} className={classes.label}>
                Consent To Voice Call:
              </Grid>
              <Typography className={classes.info}>
                {patientDetails?.callConsent ? "True" : "False" || "-"}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}
            >
              <Grid item xs={6} className={classes.label}>
                Consent To Video Call
              </Grid>
              <Typography className={classes.info}>-</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}
            >
              <Grid item xs={6} className={classes.label}>
                Consent To Text
              </Grid>
              <Typography className={classes.info}>
                {patientDetails?.messageConsent ? "True" : "False" || "-"}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}
            >
              <Grid item xs={6} className={classes.label}>
                Note
              </Grid>
              <Typography className={classes.info}>
                {patientDetails?.note || "-"}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.container} mt={1}>
            <Grid item xs={12}>
              <Typography variant="h4" sx={{ color: "#2C57B3" }}>
                Emergency Contact
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}
            >
              <Grid item xs={6} className={classes.label}>
                Relationship With Patient:
              </Grid>
              <Typography className={classes.info}>
                {patientDetails?.emergContactRelation || "-"}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}
            >
              <Grid item xs={6} className={classes.label}>
                Last Name
              </Grid>
              <Typography className={classes.info}>
                {patientDetails?.emergContactLastName || "-"}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}
            >
              <Grid item xs={6} className={classes.label}>
                First Name
              </Grid>
              <Typography className={classes.info}>
                {patientDetails?.emergContactFirstName || "-"}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}
            >
              <Grid item xs={6} className={classes.label}>
                Mobile Number
              </Grid>
              <Typography className={classes.info}>
                {patientDetails?.emergContactNumber || "-"}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}
            >
              <Grid item xs={6} className={classes.label}>
                Email
              </Grid>
              <Grid item xs={6} className={classes.info}>
                <Typography noWrap title={patientDetails?.emergContactEmail}>
                  {patientDetails?.emergContactEmail || "-"}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}
            >
              <Grid item xs={6} className={classes.label}>
                Zip Code
              </Grid>
              <Typography className={classes.info}>-</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} mt={1} className={classes.container}>
        <Grid item xs={12}>
          <Typography variant="h4" sx={{ color: "#2C57B3" }}>
            Preferences
          </Typography>
        </Grid>
        <Box display={"grid"} gridTemplateColumns={"15% 5% 25% 1fr"} pt={1}>
          <Typography sx={{ fontWeight: 600 }} className={classes.label}>
            {"Primary Care Provider"}
          </Typography>
          <Typography>{":"}</Typography>
          <Typography className={classes.info}>
            {patientDetails?.provider?.firstName}{" "}
            {patientDetails?.provider?.lastName}
          </Typography>
          <Typography></Typography>
        </Box>

        <Box display={"grid"} gridTemplateColumns={"15% 5% 25% 1fr"} pt={1}>
          <Typography sx={{ fontWeight: 600 }} className={classes.label}>
            {"Default Pharmacy"}
          </Typography>
          <Typography>{":"}</Typography>
          <Typography>
            {patientDetails?.preferredPharmacy?.name || "-"}
          </Typography>
          <Typography>
            {patientDetails?.preferredPharmacy?.address?.line1 || ""}{" "}
            {patientDetails?.preferredPharmacy?.address?.line2 || ""}{" "}
            {patientDetails?.preferredPharmacy?.address?.city || ""}{" "}
            {patientDetails?.preferredPharmacy?.address?.country || ""}{" "}
            {patientDetails?.preferredPharmacy?.address?.zipcode || ""}{" "}
          </Typography>
        </Box>

        <Box display={"grid"} gridTemplateColumns={"15% 5% 25% 1fr"} pt={1}>
          <Typography sx={{ fontWeight: 600 }} className={classes.label}>
            {"Preferred Lab"}
          </Typography>
          <Typography>{":"}</Typography>
          <Typography>{patientDetails?.preferredLab?.name || "-"}</Typography>
          <Typography>
            {patientDetails?.preferredLab?.address?.line1 || ""}{" "}
            {patientDetails?.preferredLab?.address?.line2 || ""}{" "}
            {patientDetails?.preferredLab?.address?.city || ""}{" "}
            {patientDetails?.preferredLab?.address?.country || ""}{" "}
            {patientDetails?.preferredLab?.address?.zipcode || ""}{" "}
          </Typography>
        </Box>

        <Box display={"grid"} gridTemplateColumns={"15% 5% 25% 1fr"} pt={1}>
          <Typography sx={{ fontWeight: 600 }} className={classes.label}>
            {"Preferred Radiology"}
          </Typography>
          <Typography>{":"}</Typography>
          <Typography>
            {patientDetails?.preferredRadiology?.name || "-"}
          </Typography>
          <Typography>
            {patientDetails?.preferredRadiology?.address?.line1 || ""}{" "}
            {patientDetails?.preferredRadiology?.address?.line2 || ""}{" "}
            {patientDetails?.preferredRadiology?.address?.city || ""}{" "}
            {patientDetails?.preferredRadiology?.address?.country || ""}{" "}
            {patientDetails?.preferredRadiology?.address?.zipcode || ""}{" "}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
export default PatientProfile;
