import { ButtonBase, Grid, MenuItem, Select, Typography } from "@mui/material";
import { formButtonStyle } from "../../../../../../../styles/common";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import DiagnosesTable from "./table/diagnoses-table";
import { useProblemsControllerServiceGetPatientProblems } from "../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import AddEditDiagnosesModal from "./add-edit-diagnoses-modal";
import { style } from "../../../../referral/style/common-style";
export interface PatientData {
  patientData: any;
  resultType?: string;
  refetchData?: any;
  data?: any;
  isLoading?: boolean;
  pagination?: any;
  setPagination?: any;
  refetch?: any;
  tabValue?: any;
}

function DiagnosesTab(props: PatientData) {
  const UIClass = style();
  const [open, setOpenModal] = useState(false);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    sortBy: "created",
    sortDirection: "desc",
    patientUuid: props?.patientData?.uuid,
    totalPages: 0,
    totalElements: 0,
  });

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 50,
      },
    },
  };

  const [tableData, setTableData] = useState<any[]>([]);
  const [filter, setFilter] = useState("All");
  const statusList = ["All", "Active", "Historical"];

  const { refetch, data, isLoading } =
    useProblemsControllerServiceGetPatientProblems({
      patientUuid: props?.patientData?.uuid,
      page: pagination.page,
      size: pagination.size,
      status: filter == "All" ? undefined : filter == "Active" ? true : false,
    });

  useEffect(() => {
    if (props.refetchData) {
      refetch();
    }
  }, [props.refetchData]);

  useEffect(() => {
    if (data?.data && data.data.content) {
      setTableData(data.data.content);
      setPagination((prev) => ({
        ...prev,
        totalPages: data.data?.totalPages,
        totalElements: data.data?.totalElements,
      }));
    }
  }, [data?.data]);

  const openModal = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    refetch();
  };

  return (
    <>
      <Grid container p={2} pb={0}>
        <Grid container xs={12} pb={2} justifyContent="space-between">
          <Grid item>
            <Typography
              variant="h4"
              sx={{
                color: "#004186",
                fontWeight: "bold",
              }}
            >
              Diagnoses
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Grid item xs={4}>
              <Select
                className={UIClass.selectInputStyle}
                value={filter}
                name="status"
                onChange={(e: any) => setFilter(e.target.value)}
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <span>
                        <Typography
                          variant="h5"
                          sx={{
                            color: "#1A1A1A80 !important",
                          }}
                        >
                          Select Status
                        </Typography>
                      </span>
                    );
                  }
                  return <Typography variant="h5">{selected}</Typography>;
                }}
                MenuProps={MenuProps}
                displayEmpty
              >
                {statusList.map((data: any) => {
                  return (
                    <MenuItem
                      key={data}
                      value={data}
                      className={UIClass.menuItemColorStyle}
                    >
                      {data}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
            <Grid item>
              <ButtonBase
                sx={{
                  ...formButtonStyle.mainButtonStyle,
                  height: "42px",
                }}
                onClick={openModal}
              >
                <AddIcon sx={{ fontSize: "20px" }} />
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Add Diagnoses
                </Typography>
              </ButtonBase>
            </Grid>
          </Grid>
        </Grid>
        <Grid sx={{ width: "100%" }}>
          <DiagnosesTable
            pagination={pagination}
            patientDetails={props?.patientData}
            refetch={refetch}
            setPagination={setPagination}
            tableData={tableData}
            isLoading={isLoading}
          ></DiagnosesTable>
        </Grid>
      </Grid>
      <AddEditDiagnosesModal
        open={open}
        patientDetails={props?.patientData}
        title="Add Diagnoses"
        onClose={handleClose}
      ></AddEditDiagnosesModal>
    </>
  );
}
export default DiagnosesTab;
