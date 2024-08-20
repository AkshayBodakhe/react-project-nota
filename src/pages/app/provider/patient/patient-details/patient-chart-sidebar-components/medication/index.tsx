import { ButtonBase, Grid, Tab, Tabs, Typography } from "@mui/material";
// import MedicationTable from "./medication-table";
import AddIcon from "@mui/icons-material/Add";
import { formButtonStyle } from "../../../../../../../styles/common";
import { useEffect, useState } from "react";
// import { medicationsdata } from "../../../../../../../mock-data/medicationstabledetails";
import AddMedication from "./add-edit-medication";
import { demographicsIndexStyles } from "../demographics";
import MedicationTab from "./active-medication";
import { PatientData } from "../diagnoses";
import { MedicationType } from "../enums-interfaces/enums";

export interface Column {
  id: string;
  label: string | JSX.Element;
  minWidth?: number;
}
export const medicationsFormColumns: Column[] = [
  { id: "medication", label: "Medication", minWidth: 150 },
  { id: "prescriber", label: "Prescriber", minWidth: 100 },
  { id: "dosage", label: "Dosage", minWidth: 200 },
  { id: "route", label: "Route", minWidth: 50 },
  { id: "startdate", label: "Start Date", minWidth: 100 },
  { id: "enddate", label: "End Date", minWidth: 100 },
  { id: "status", label: "Status", minWidth: 100 },
  { id: "action", label: "Action", minWidth: 50 },
];

export interface Row {
  [key: string]: string | JSX.Element | number | any;
}

function MedicationIndex(props: PatientData) {
  const classes = demographicsIndexStyles();
  const [value, setValue] = useState(0);
  const [refetchData, setRefetchData] = useState(false);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleClose = () => {
    setMedications(false);
    setIsEditMedications(false);
  };
  const [openAddMedication, setMedications] = useState(false);
  const [isEditModalOpen, setIsEditMedications] = useState(false);

  const openModal = () => {
    setMedications(true);
  };

  return (
    <Grid p={2}>
      <Grid container xs={12} alignItems={"center"}>
        <Grid item xs={10}>
          <Typography
            variant="h4"
            sx={{
              color: "#004186",
              fontWeight: "bold",
            }}
          >
            Current Medications
          </Typography>
        </Grid>
        <Grid item xs={2} className={classes.buttonGrid}>
          <ButtonBase
            sx={{
              ...formButtonStyle.mainButtonStyle,
              height: "40px !important",
            }}
            onClick={openModal}
          >
            <AddIcon />
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Add Medication
            </Typography>
          </ButtonBase>
        </Grid>
      </Grid>

      <Grid className={classes.tabSwitchGrid}>
        <MedicationTab
          resultType={MedicationType.ACTIVE}
          patientData={props?.patientData}
          refetchData={refetchData}
        />

        <Grid item xs={12}>
          <Typography
            variant="h4"
            sx={{
              color: "#004186",
              fontWeight: "bold",
            }}
          >
            Past Medications
          </Typography>
        </Grid>
        <MedicationTab
          resultType={MedicationType.PAST}
          patientData={props?.patientData}
          // refetchData={refetchData}
        />
      </Grid>
      {openAddMedication && (
        <AddMedication
          patientData={props?.patientData}
          open={openAddMedication}
          onClose={handleClose}
          title="Add Medication"
          setRefetchData={setRefetchData}
        />
      )}

      {isEditModalOpen && (
        <AddMedication
          patientData={props?.patientData}
          open={isEditModalOpen}
          onClose={handleClose}
          title="Edit Medication"
          setRefetchData={setRefetchData}
        />
      )}
      {/* {editDemographicsModal && (
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
      )} */}
    </Grid>
  );
}

export default MedicationIndex;
