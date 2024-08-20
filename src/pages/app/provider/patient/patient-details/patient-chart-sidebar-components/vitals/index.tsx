import { ButtonBase, Grid, Typography } from "@mui/material";
import VitalTable from "./vital-table";
import { useEffect, useState } from "react";
import { formButtonStyle } from "../../../../../../../styles/common";
import AddEditVitals from "./add-edit-vitals";
import AddIcon from "@mui/icons-material/Add";
import { PatientData } from "../diagnoses";
import { useVitalControllerServiceGetPatientVitalRecordsByPatientId } from "../../../../../../../sdk/thinkemr-core-0.0.1/queries";

function VitalIndex(props: PatientData) {
  const [openAddVitals, setAddVitals] = useState(false);

  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    totalPages: 0,
    totalElements: 0,
  });
  const [tableData, setTableData] = useState<any[]>([]);

  const { refetch, data, isLoading } =
    useVitalControllerServiceGetPatientVitalRecordsByPatientId({
      page: pagination.page,
      patientUuid: props?.patientData?.uuid,
      size: pagination.size,
    });

  useEffect(() => {
    if (data?.data && data.data.content) {
      setTableData(data.data.content);
      setPagination((prev: any) => ({
        ...prev,
        totalPages: data?.data?.totalPages,
        totalElements: data?.data?.totalElements,
      }));
    }
  }, [data]);

  const openModal = () => {
    setAddVitals(true);
  };

  const handleClose = () => {
    setAddVitals(false);
    refetch();
  };

  return (
    <div>
      <Grid
        container
        pt={1}
        pb={0}
        pr={2}
        pl={2}
        xs={12}
        justifyContent="space-between"
      >
        <Grid item sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h4"
            sx={{
              color: "#004186",
              fontWeight: "bold",
              fontSize: "16px !important",
            }}
          >
            Vitals
          </Typography>
        </Grid>
        <Grid item display="flex" gap="20px;">
            <Grid>
              <ButtonBase
                sx={{
                  ...formButtonStyle.mainButtonStyle,
                }}
                onClick={openModal}
              >
                <AddIcon />
                <Typography variant="h4">Add Vitals</Typography>
              </ButtonBase>
            </Grid>
          </Grid>
      </Grid>
      <VitalTable
        patientDetails={props?.patientData}
        pagination={pagination}
        setPagination={setPagination}
        tableData={tableData}
        isLoading={isLoading}
      />
      {openAddVitals && (
        <AddEditVitals
          patientData={props?.patientData}
          open={openAddVitals}
          onClose={handleClose}
          title="Add Vitals"
          refetch={refetch}
        />
      )}
    </div>
  );
}

export default VitalIndex;
