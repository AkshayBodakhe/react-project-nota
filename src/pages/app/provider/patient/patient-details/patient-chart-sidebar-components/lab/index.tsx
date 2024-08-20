// import LabResultTable from "./lab-list";

import { ButtonBase, Grid, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { demographicsIndexStyles } from "../demographics";
import AddIcon from "@mui/icons-material/Add";
import { formButtonStyle } from "../../../../../../../styles/common";
import LabOrdersTab from "./lab-order";
import { PatientData } from "../diagnoses";
import LabResultTab from "./lab-result";
import { LabType } from "../enums-interfaces/enums";
import AddEditLabResults from "./lab-order/forms/add-edit-lab-order";
import AddEditLabResult from "./lab-result/add-edit-lab-result";


function LabIndex(props: PatientData) {

  const [value, setValue] = useState(0);
  const classes = demographicsIndexStyles();
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState<LabType>(LabType.LAB_ORDER);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => { }, []);

  const handleOpenModal = (modalType: LabType) => {
    setModalType(modalType);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

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
              label="Lab Orders"
            />
            <Tab
              sx={{
                textTransform: "capitalize",
                fontWeight: "bold !important",
                fontSize: "16px",
              }}
              label="Lab Results"
            />
          </Tabs>
        </Grid>
        <Grid item xs={2} className={classes.buttonGrid} pr={1.5}>
          {value === 0 && (
            <ButtonBase
              type="submit"
              sx={{ ...formButtonStyle.mainButtonStyle, height: "40px !important" }}
              onClick={() => handleOpenModal(LabType.LAB_ORDER)}
            >
              <span className={classes.addButtonTypo}>
                <AddIcon />
              </span>
              <Typography variant="h4" className={classes.buttonTypo}>Add Lab Order</Typography>
            </ButtonBase>

          )}
          {value === 1 && (
            <ButtonBase
              type="submit"
              sx={{ ...formButtonStyle.mainButtonStyle, height: "40px !important" }}
              onClick={() => handleOpenModal(LabType.LAB_RESULT)}
            >
              <span className={classes.addButtonTypo}>
                <AddIcon />
              </span>
              <Typography variant="h4" className={classes.buttonTypo}>
                Add Lab Result
              </Typography>
            </ButtonBase>
          )}
        </Grid>
      </Grid>
      <Grid className={classes.tabSwitchGrid}>
        {value === 0 && <LabOrdersTab patientData={props.patientData} />}
        {value === 1 && <LabResultTab patientData={props.patientData} />}
      </Grid>
      {open && (() => {
        switch (modalType) {
          case LabType.LAB_ORDER:
            return (<>
              <AddEditLabResults
                patientData={props.patientData}
                open={open}
                onClose={handleClose}
                title="Lab Requisition Form"
              />
            </>)
          case LabType.LAB_RESULT:
            return (<>
              <AddEditLabResult
                open={open}
                onClose={handleClose}
                patientData={props.patientData}
                title={'Add Lab Result'}
              />
            </>)
          default:
            break;
        }
      })()}
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
  )
}

export default LabIndex;
