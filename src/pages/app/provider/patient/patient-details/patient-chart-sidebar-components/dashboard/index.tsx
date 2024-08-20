import React, { useState } from "react";
import { ButtonBase, Grid, Tab, Tabs, Typography } from "@mui/material";
import EventSucessModal from "../../../../../../../components/common/success-modal";
import { makeStyles } from "@mui/styles";
import { formButtonStyle } from "../../../../../../../styles/common";
import DemographicsTab from "../demographics/demographics-tab";
import AuthorizationTab from "../demographics/authorization-tab";
import PrintIcon from "@mui/icons-material/Print";
import FaceTime from "../demographics/face-time/face-time";
import { isNavalaCare } from "../../../../../../../components/common/helper";
import SharePDF from "../../../../appointment/complete-check-in/dialog/share-pdf";
import PrintPdf from "../print/printPdf";
import useHasPermission from "../../../../../../../components/common/useHasPermission";
import { Permission } from "../../../../../../../components/common/enums-and-interfaces/enums";
import TimeLine from "../demographics/time-line/time-line";
import QuestionnairesTab from "./questionarries";

export const demographicsIndexStyles = makeStyles(() => ({
  buttonGrid: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  editDemographicsButton: {
    height: "40px",
    width: "200px",
    borderRadius: "5px !important",
    backgroundColor: "#CCECFF80 !important",
    border: "2px solid #004186 !important ",
    display: "flex !important",
    justifyContent: "space-evenly !important",
  },
  buttonTypo: {
    color: "#36588C !important",
    fontSize: "16px !important",
  },
  addInsuranceButton: {
    height: "40px",
    width: "170px",
    borderRadius: "5px !important",
    backgroundColor: "#CCECFF80 !important",
    border: "2px solid #004186 !important",
    display: "flex !important",
    justifyContent: "space-evenly !important",
  },
  icon: {
    color: "#004186 !important",
    fontSize: "20px !important",
    opacity: 0.7,
  },
  addAuthorizationButton: {
    height: "40px",
    width: "190px",
    borderRadius: "5px !important",
    backgroundColor: "#CCECFF80 !important",
    border: "2px solid #004186 !important",
    display: "flex !important",
    justifyContent: "space-evenly !important",
  },
  tabSwitchGrid: {
    width: "inherit",
    height: "64vh",
    overflowY: "scroll",
  },
  addButtonTypo: {
    color: "#36588C !important",
    display: "flex",
    paddingRight: "2px",
    opacity: 0.9,
  },
}));

interface ProviderPatientsChartDemographicsProps {
  patientData: any;
  data: any;
  setOpenSideListComponent?: any;
  setTabValue?: any;
}

function PatientDetailDashboard(props: ProviderPatientsChartDemographicsProps) {
  const classes = demographicsIndexStyles();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [openSharePdf, setSharePdf] = useState(false);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleSharePdfView = () => {
    setSharePdf((item) => !item);
  };
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const canViewTimeLine = useHasPermission(Permission.TIMELINES);

  return (
    <Grid sx={{ overflowY: "hidden", maxHeight: "635px" }}>
      <Grid container xs={12}>
        <Grid item xs={10}>
          <Tabs value={value} onChange={handleChange}>
            <Tab
              sx={{
                textTransform: "capitalize",
                fontWeight: "bold !important",
                fontSize: "16px",
              }}
              label="Face Time"
            />
            {canViewTimeLine && (
              <Tab
                sx={{
                  textTransform: "capitalize",
                  fontWeight: "bold !important",
                  fontSize: "16px",
                }}
                label="Timeline"
              />
            )}

            <Tab
              sx={{
                textTransform: "capitalize",
                fontWeight: "bold !important",
                fontSize: "16px",
              }}
              label="Questionnaires"
            />
          </Tabs>
        </Grid>
        <Grid item xs={2} className={classes.buttonGrid} pr={1.5}>
          {value === 0 && (
            <Grid display={"grid"} gridTemplateColumns={"50% 1fr"} mr={5}>
              <ButtonBase
                sx={{
                  px: "20px",
                  py: "8px",
                  mx: "10px",
                  borderRadius: "5px",
                  backgroundColor: "#2c57b3",
                  border: "1px solid #2c57b3",
                }}
                onClick={() => setSharePdf(true)}
              >
                <Typography sx={{ color: "#fff" }}>{"Share"}</Typography>
              </ButtonBase>

              <ButtonBase
                type="submit"
                sx={{
                  ...formButtonStyle.mainButtonStyle,
                  height: "40px !important",
                  width: "140px",
                }}
                onClick={() => setOpen(true)}
              >
                {" "}
                <span className={classes.addButtonTypo}>
                  <PrintIcon />
                </span>
                <Typography variant="h4" className={classes.buttonTypo}>
                  Print Chart
                </Typography>
              </ButtonBase>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid className={classes.tabSwitchGrid}>
        {value === 0 &&
          (!isNavalaCare() ? (
            <FaceTime
              patientData={props.patientData}
              setMenuItem={props.setOpenSideListComponent}
              setTabValue={props.setTabValue}
            />
          ) : (
            <DemographicsTab
              patientData={props.patientData}
              data={props?.data}
            />
          ))}
        {value === 1 && <TimeLine patientData={props.patientData} />}
        {value === 2 && <QuestionnairesTab patientData={props.patientData} />}
        {/* {value === 2 && <AuthorizationTab />} */}
      </Grid>

      {openSuccessModal && (
        <EventSucessModal
          message={successMessage}
          onClose={() => setOpenSuccessModal(false)}
        />
      )}
      <PrintPdf
        open={open}
        onClose={handleCloseDialog}
        uuid={props?.patientData?.uuid}
      />
      {isNavalaCare() ? (
        <SharePDF
          open={openSharePdf}
          onClose={handleSharePdfView}
          message={"Patient Charting"}
          source="CarepatientCharting"
          uuid={props?.patientData?.uuid}
        />
      ) : (
        <SharePDF
          open={openSharePdf}
          onClose={handleSharePdfView}
          message={"Patient Charting"}
          source="GlobalPatientCharting"
          uuid={props?.patientData?.uuid}
        />
      )}
    </Grid>
  );
}

export default PatientDetailDashboard;
