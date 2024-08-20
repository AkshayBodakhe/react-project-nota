import AddIcon from "@mui/icons-material/Add";
import { ButtonBase, Grid, Tab, Tabs, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as React from "react";
import { formButtonStyle } from "../../../../../../../styles/common";
import FamilyHistoryIndex from "./family-history";
import PastMedicalHistoryIndex from "./past-medical-history";
import AddEditPastMedicalHistory from "./past-medical-history/add-edit-past-medical-history";
import PastSurgicalHistoryIndex from "./past-surgical-history";
import AddEditSurgicalHistoryTable from "./past-surgical-history/add-edit-surgical-history";
// import SocialHistoryIndex from "./social-history";
import AddEditFamilyHistory from "./family-history/add-edit-family-history";
import { PatientData } from "../diagnoses";
import {
  useFamilyHistoryControllerServiceGetPatientFamilyHistory,
  useMedicalHistoryControllerServiceViewMedicalHistory,
  usePatientSurgicalHistoryControllerServiceViewSurgicalHistory,
} from "../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import NewSocialHistory from "./social-history/new-social-history";

export const historyIndexStyles = makeStyles(() => ({
  addButtonTypo: {
    color: "#36588C !important",
    display: "flex",
    paddingRight: "2px",
  },
  buttonTypo: {
    color: "#36588C !important",
    // fontWeight: "bold !important",
    fontSize: "16px !important",
  },
  tabSwitchGrid: {
    width: "inherit",
    height: "64vh",
    overflowY: "scroll",
  },
}));

function HistoryIndex(props: PatientData) {
  const [value, setValue] = React.useState(props.tabValue);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [openAddPastMedicalHistory, setAddPastMedicalResult] =
    React.useState(false);
  const [openAddPastSurgicalHistory, setAddPastSurgicalResult] =
    React.useState(false);
  const [openFamilyHistory, setAddFamilyHistory] = React.useState(false);
  const [refetchData, setRefetchData] = React.useState(false);

  const handleClose = () => {
    setAddPastMedicalResult(false);
    setAddPastSurgicalResult(false);
    setAddFamilyHistory(false);
  };

  const handleOpenEditPastMedicalHistoryModal = () => {
    setAddPastMedicalResult(true);
  };

  const handleOpenPastSurgicalModal = () => {
    setAddPastSurgicalResult(true);
  };
  const OpenFamilyHistoryForm = () => {
    setAddFamilyHistory(true);
  };

  const classes = historyIndexStyles();

  const [pagination, setPagination] = React.useState({
    patientUuid: props?.patientData?.uuid,
    page: 0,
    size: 10,
    sortBy: "created",
    sortDirection: "desc",
    totalPages: 0,
    totalElements: 0,
  });

  const [medicalHistoryPagination, setMedicalHistoryPagination] =
    React.useState({
      patientUuid: props?.patientData?.uuid,
      page: 0,
      size: 10,
      sortBy: "created",
      sortDirection: "desc",
      totalPages: 0,
      totalElements: 0,
    });

  const [surgicalHistoryPagination, setSurgicalHistoryPagination] =
    React.useState({
      page: 0,
      size: 10,
      totalPages: 0,
      totalElements: 0,
    });

  const { refetch, data, isLoading } =
    useFamilyHistoryControllerServiceGetPatientFamilyHistory({
      patientUuid: props?.patientData?.uuid,
      page: pagination.page,
      size: pagination.size,
      sortBy: pagination.sortBy,
      sortDirection: pagination.sortDirection,
    });

  React.useEffect(() => {
    if (data?.data && data?.data?.content) {
      setPagination((prev) => ({
        ...prev,
        totalPages: data.data?.totalPages,
        totalElements: data.data?.totalElements,
      }));
    }
  }, [data?.data]);

  const {
    refetch: refetchMedicalHistory,
    data: medicalHistory,
    isLoading: loadMedicalHistory,
  } = useMedicalHistoryControllerServiceViewMedicalHistory({
    ...medicalHistoryPagination,
    patientUuid: props?.patientData?.uuid,
  });

  React.useEffect(() => {
    if (medicalHistory?.data && medicalHistory.data?.content) {
      setMedicalHistoryPagination((prev) => ({
        ...prev,
        totalPages: medicalHistory.data?.totalPages || 0,
        totalElements: medicalHistory.data?.totalElements || 0,
      }));
    }
  }, [medicalHistory?.data]);

  const {
    refetch: refetchSurgicalHistory,
    data: surgicalData,
    isLoading: lodingSurgicalHistory,
  } = usePatientSurgicalHistoryControllerServiceViewSurgicalHistory({
    ...surgicalHistoryPagination,
    patientUuid: props?.patientData?.uuid,
  });

  React.useEffect(() => {
    if (surgicalData?.data && surgicalData.data?.content) {
      setSurgicalHistoryPagination((prev) => ({
        ...prev,
        totalPages: surgicalData.data?.totalPages || 0,
        totalElements: surgicalData.data?.totalElements || 0,
      }));
    }
  }, [surgicalData?.data]);

  const availableTabs = [
    {
      label: "Past Medical History",
      component: (
        <PastMedicalHistoryIndex
          patientData={props?.patientData}
          refetch={refetchMedicalHistory}
          data={medicalHistory}
          isLoading={loadMedicalHistory}
          pagination={medicalHistoryPagination}
          setPagination={setMedicalHistoryPagination}
        />
      ),
    },
    {
      label: "Past Surgical History",
      component: (
        <PastSurgicalHistoryIndex
          patientData={props?.patientData}
          refetch={refetchSurgicalHistory}
          data={surgicalData}
          isLoading={lodingSurgicalHistory}
          pagination={surgicalHistoryPagination}
          setPagination={setSurgicalHistoryPagination}
        />
      ),
    },
    {
      label: "Family History",
      component: (
        <FamilyHistoryIndex
          refetch={refetch}
          patientData={props?.patientData}
          data={data}
          isLoading={isLoading}
          pagination={pagination}
          setPagination={setPagination}
        />
      ),
    },
    {
      label: "Social History",
      component: <NewSocialHistory patientData={props?.patientData} />,
    },
  ];

  return (
    <>
      <Grid container>
        <Grid item xs={10}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {availableTabs.map((tab: any, index) => (
              <Tab
                key={index}
                sx={{
                  textTransform: "capitalize",
                  fontWeight: "bold !important",
                  fontSize: "16px",
                }}
                label={tab.label}
              />
            ))}
          </Tabs>
        </Grid>
        <Grid
          item
          xs={2}
          justifyContent="end"
          alignItems="center"
          display="flex"
          pr={2}
        >
          {availableTabs[value]?.label === "Past Medical History" && (
            <ButtonBase
              type="submit"
              sx={{
                ...formButtonStyle.mainButtonStyle,
                height: "40px !important",
                width: "auto !important",
                padding: "0px 10px !important",
              }}
              onClick={handleOpenEditPastMedicalHistoryModal}
            >
              {" "}
              <span className={classes.addButtonTypo}>
                <AddIcon />
              </span>
              <Typography variant="h4" className={classes.buttonTypo}>
                Add PMH
              </Typography>
            </ButtonBase>
          )}
          {availableTabs[value]?.label === "Past Surgical History" && (
            <ButtonBase
              type="submit"
              sx={{
                ...formButtonStyle.mainButtonStyle,
                height: "40px !important",
                width: "auto !important",
                padding: "0px 10px !important",
              }}
              onClick={handleOpenPastSurgicalModal}
            >
              <span className={classes.addButtonTypo}>
                <AddIcon />
              </span>
              <Typography variant="h4" className={classes.buttonTypo}>
                Add PSH
              </Typography>
            </ButtonBase>
          )}
          {availableTabs[value]?.label === "Family History" && (
            <ButtonBase
              type="submit"
              sx={{
                ...formButtonStyle.mainButtonStyle,
                height: "40px !important",
                width: "auto !important",
                padding: "0px 10px !important",
              }}
              onClick={OpenFamilyHistoryForm}
            >
              <span className={classes.addButtonTypo}>
                <AddIcon />
              </span>
              <Typography variant="h4" className={classes.buttonTypo}>
                Add Family History
              </Typography>
            </ButtonBase>
          )}
        </Grid>
      </Grid>
      <Grid className={classes.tabSwitchGrid}>
        {availableTabs[value]?.component}
      </Grid>
      {openAddPastMedicalHistory && (
        <AddEditPastMedicalHistory
          patientDetails={props?.patientData}
          open={openAddPastMedicalHistory}
          onClose={handleClose}
          title="Add Past Medical History"
          setRefetchData={refetchMedicalHistory}
        />
      )}
      {openAddPastSurgicalHistory && (
        <AddEditSurgicalHistoryTable
          patientDetails={props?.patientData}
          open={openAddPastSurgicalHistory}
          onClose={handleClose}
          title="Add Past Surgical History"
          setRefetchData={refetchSurgicalHistory}
        />
      )}
      {openFamilyHistory && (
        <AddEditFamilyHistory
          patientData={props?.patientData}
          open={openFamilyHistory}
          onClose={handleClose}
          title="Add Family History"
          setRefetchData={refetch}
        />
      )}
    </>
  );
}

export default HistoryIndex;
