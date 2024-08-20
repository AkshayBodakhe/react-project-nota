/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { ButtonBase, Grid, Tab, Tabs, Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddIcon from "@mui/icons-material/Add";
import AuthorizationTab from "./authorization-tab";
import InsuranceTab from "./insurance/insurance-tab";
import DemographicsTab from "./demographics-tab";
import AddAuthorization from "./authorization-tab/add-authorization-modal";
import EventSucessModal from "../../../../../../../components/common/success-modal";
import AddInsurance from "./insurance/add-insurance";
import EditDemographicsModal from "./demographics-tab/edit-demographics-modal";
import { makeStyles } from "@mui/styles";
import { formButtonStyle } from "../../../../../../../styles/common";

export const demographicsIndexStyles = makeStyles(() => ({
  buttonGrid: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems:"center"
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
    // fontWeight: "bold !important",
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
    fontSize:"20px !important",
    opacity:0.7
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
    // paddingLeft: "12px",
    paddingRight: "2px",
    opacity: 0.9,
  },
}));

interface ProviderPatientsChartDemographicsProps {
  patientData: any;
}
const ProviderPatientsChartDemographics: React.FC<
  ProviderPatientsChartDemographicsProps
> = ({ patientData }) => {
  const [value, setValue] = useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const classes = demographicsIndexStyles();
  const [authorizationModal, setAuthorizationModal] = useState(false);
  const [insuranceModal, setInsuranceModal] = useState(false);
  const [editDemographicsModal, setEditDemographicsModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleOpenEditDemographicsModal = () => {
    setSuccessMessage("Demographics Updated Successfully !");
    setEditDemographicsModal(true);
  };

  const handleOpenAuthorizationModal = () => {
    setSuccessMessage("Authorization Added Successfully !");
    setAuthorizationModal(true);
  };
  const handleOpenInsuranceModal = () => {
    setSuccessMessage("Insurance Added Successfully !");
    setInsuranceModal(true);
  };
  const handleCloseModal = () => {
    setAuthorizationModal(false);
    setInsuranceModal(false);
    setEditDemographicsModal(false);
  };
  const handleEventSuccessModalOpen = () => {
    setOpenSuccessModal(true);
    setAuthorizationModal(false);
    setInsuranceModal(false);
    setEditDemographicsModal(false);
  };

  return (
    <Grid>
      <Grid container xs={12}>
        <Grid item xs={10}>
          <Tabs value={value} onChange={handleChange}>
            <Tab
              sx={{
                textTransform: "capitalize",
                fontWeight: "bold !important",
                fontSize: "16px",
              }}
              label="Demographics"
            />
            <Tab
              sx={{
                textTransform: "capitalize",
                fontWeight: "bold !important",
                fontSize: "16px",
              }}
              label="Insurance"
            />
            <Tab
              sx={{
                textTransform: "capitalize",
                fontWeight: "bold !important",
                fontSize: "16px",
              }}
              label="Authorization"
            />
          </Tabs>
        </Grid>
        <Grid item xs={2} className={classes.buttonGrid} pr={1.5}>
          {value === 0 ? (
             <ButtonBase
             type="submit"
             sx={{...formButtonStyle.mainButtonStyle,height:"40px !important"}}
             onClick={handleOpenEditDemographicsModal}
           >
             {" "}
             <span className={classes.addButtonTypo}>
               <EditOutlinedIcon />
             </span>
             <Typography variant="h4" className={classes.buttonTypo}>Edit Demographics</Typography>
           </ButtonBase>
            
          ) : null}
          {value === 1 ? (
            <ButtonBase
            type="submit"
            sx={{...formButtonStyle.mainButtonStyle,height:"40px !important"}}
              onClick={handleOpenInsuranceModal}
            >
              <span className={classes.addButtonTypo}>
                    <AddIcon />
              </span>
              <Typography variant="h4" className={classes.buttonTypo}>
                Add Insurance
              </Typography>
            </ButtonBase>
          ) : null}
          {value === 2 ? (
            <ButtonBase
            type="submit"
            sx={{...formButtonStyle.mainButtonStyle,height:"40px !important"}}
              onClick={handleOpenAuthorizationModal}
            >
              <span className={classes.addButtonTypo}>
                    <AddIcon />
              </span>
              <Typography variant="h4" className={classes.buttonTypo}>
                Add Authorization
              </Typography>
            </ButtonBase>
          ) : null}
        </Grid>
      </Grid>
      <Grid className={classes.tabSwitchGrid}>
        {value === 0 ? <DemographicsTab patientData={patientData} /> : null}
        {value === 1 ? <InsuranceTab patientData={patientData} /> : null}
        {value === 2 ? <AuthorizationTab /> : null}
      </Grid>
      {editDemographicsModal && (
        <EditDemographicsModal
          open={editDemographicsModal}
          onClose={handleCloseModal}
          onEventSuccessModalOpen={handleEventSuccessModalOpen}
        />
      )}
      {authorizationModal && (
        <AddAuthorization
          open={authorizationModal}
          onClose={handleCloseModal}
          onEventSuccessModalOpen={handleEventSuccessModalOpen}
        />
      )}
      {insuranceModal && (
        <AddInsurance
          open={insuranceModal}
          onClose={handleCloseModal}
          onEventSuccessModalOpen={handleEventSuccessModalOpen}
        />
      )}
      {openSuccessModal && (
        <EventSucessModal
          message={successMessage}
          onClose={() => setOpenSuccessModal(false)}
        />
      )}
    </Grid>
  );
};

export default ProviderPatientsChartDemographics;
