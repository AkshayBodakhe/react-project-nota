// import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  // ButtonBase,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
// import { formButtonStyle } from "../../../../../../../styles/common";
import AddEditVitals from "./add-edit-vitals";
import { PatientData } from "../diagnoses";
import {
  commonWidget,
  getCustomStyle,
} from "../../../../../../../styles/common";
import Loading from "../../../../../../../components/common/spinner/loading";
import { columns } from "../adherence-to-treatment/common-const";
import CustomPagination from "../../../../../../../components/common/pagination";

export const tableStyle = makeStyles(() => ({
  tableHeader: {
    backgroundColor: "#DAEAF8 !important",
  },
  tableHeaderText: {
    // fontWeight: "600  !important",
    // color: "#1A1A1A99",
  },
  tableRow: {
    color: "#1A1A1A99 !important",
  },
  editButton: {
    backgroundColor: "#CCECFF !important",
    color: "#0097F0 !important",
    height: "30px !important",
    padding: "8px !important",
    borderRadius: "5px !important",
    border: " 1px solid #0097F0 !important",
  },
  deleteButton: {
    backgroundColor: "#FF39390D !important",
    color: "#FF3939 !important",
    height: "30px !important",
    padding: "8px !important",
    borderRadius: "5px !important",
    border: " 1px solid #FF3939 !important",
    marginLeft: "10px !important",
    "@media  (min-width: 1366px) and (min-height: 678px)": {
      marginLeft: "0 !important",
    },
  },
  paginationBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paginationTypo: {
    color: "#1A1A1A !important",
    fontSize: "12px !important",
    fontWeight: "600 !important",
  },
  pagination: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 16,
  },
  root: {
    "& .MuiPaginationItem-root": {
      color: "#000",
      "&:hover": {
        backgroundColor: "#ccc",
      },

      "&.Mui-selected": {
        backgroundColor: "#004186 !important",
        color: "#fff",
      },
    },

    "& .MuiPaginationItem-icon": {
      color: "#004186 !important",
    },
  },
}));

const headOfTable = [
  { id: "recordedDate", label: "Dates", minWidth: 100 },
  { id: "TEMPERATURE", label: "Temperature (°f)", minWidth: 100 },
  { id: "BLOOD_PRESSURE", label: "Blood Pressure (mmHg)", minWidth: 100 },
  { id: "HEART_RATE", label: "Heart Rate (bpm)", minWidth: 100 },
  { id: "RESPIRATION_RATE", label: "Respiration Rate (bpm)", minWidth: 100 },
  { id: "OXYGEN_SATURATION", label: "Oxygen Saturation (%)", minWidth: 100 },
  { id: "HEIGHT", label: "Height (ft/in)", minWidth: 100 },
  { id: "WEIGHT", label: "Weight (kg)", minWidth: 100 },
  { id: "BMI", label: "BMI", minWidth: 100 },
  { id: "vitalNote", label: "Note", minWidth: 100 },
];

interface ArrayType {
  recordedDate: string;
  details: [
    {
      vitalName: string;
      vitalValue: any;
    }
  ];
}

type Props = {
  patientDetails: PatientData;
  tableData: any[];
  pagination: any;
  setPagination: any;
  isLoading: boolean;
};

function VitalTable(props: Props) {
  // const classes = tableStyle();
  const commomClasses = commonWidget();
  const [openAddVitals, setAddVitals] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dates, setDates] = useState<ArrayType[]>([]);
  const handleClose = () => {
    setAddVitals(false);
  };

  useEffect(() => {
    const tempArr: ArrayType[] = [];
    props.tableData?.forEach((vital: any) => {
      let testVar = vital.vitalName;
      vital.details.map((date: any) => {
        let obj: any = {
          recordedDate: date.recordedDate,
          details: [{ vitalName: testVar, vitalValue: date.vitalValue }],
        };
        if (
          !tempArr.length ||
          !tempArr.find((res) => res.recordedDate === obj.recordedDate)
        ) {
          tempArr.push(obj);
        } else {
          tempArr.forEach((date: ArrayType) => {
            if (date.recordedDate === obj.recordedDate) {
              date.details.push({
                vitalName: obj.details[0].vitalName,
                vitalValue: obj.details[0].vitalValue,
              });
            }
          });
        }
      });
    });

    setDates(tempArr);
  }, [props.tableData]);

  const handleChangePage = (_event: any, newPage: number) => {
    props.setPagination((prev: any) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleChangeRowsPerPage = () => {
    setRowsPerPage(20);
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);

    // Format date
    const optionsDate: any = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    const formattedDate = date
      .toLocaleDateString("en-US", optionsDate)
      .replace(",", " -")
      .replace(/(\d+)[-\/](\d+)[-\/](\d+)/, "$2-$1-$3");

    // Format time
    const optionsTime: any = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const formattedTime = date.toLocaleTimeString("en-US", optionsTime);

    return `${formattedDate}  ${formattedTime}`;
  };

  return (
    <Grid sx={{ padding: "16px !important" }}>
      <Paper
        sx={{
          boxShadow: "none",
          overflow: "hidden",
          // background: "rgb(245, 246, 249)",
        }}
      >
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow className={commomClasses.tableHeadRowContainer}>
                {headOfTable.map((item) => (
                  <TableCell
                    align={
                      getCustomStyle(item.id, "recordedDate")
                        ? "left"
                        : "center"
                    }
                    key={item.id}
                    style={{
                      // padding: "40px",
                      minWidth: item.minWidth,
                    }}
                  >
                    <Typography variant="h4">{item.label}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className={commomClasses.tableHeadRowContainer}>
              {!props.isLoading &&
                props.tableData &&
                props.tableData.map((item, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell align={"left"}>
                      <Typography variant="h5">
                        {formatDate(item.recordedDate)}
                      </Typography>
                    </TableCell>
                    {headOfTable.slice(1).map((column, columnIndex) => {
                      const vitalData = item.details.find(
                        (data: any) => data.vitalName === column.id
                      );
                      return (
                        <TableCell
                          key={columnIndex}
                          align={
                            getCustomStyle(item.recordedDate, "recordedDate")
                              ? "left"
                              : "center"
                          }
                        >
                          {vitalData ? (
                            <Typography variant="h5">
                              {vitalData.vitalName === "BLOOD_PRESSURE"
                                ? `${vitalData.vitalValue1 || "-"} / ${
                                    vitalData.vitalValue2 || "-"
                                  }`
                                : vitalData.vitalValue1 || "-"}
                            </Typography>
                          ) : column.id === "vitalNote" ? (
                            <Box width={"50px"} sx={{ cursor: "pointer" }}>
                              <Typography noWrap title={item?.vitalNote}>
                                {item?.vitalNote}
                              </Typography>
                            </Box>
                          ) : (
                            <Typography variant="h5">-</Typography>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {props.isLoading && <Loading />}
          {props.tableData?.length === 0 && !props.isLoading && (
            <div className={commomClasses.noDataMsg}>No Data Available</div>
          )}
        </TableContainer>
        <CustomPagination
          pagination={props.pagination}
          setPagination={props.setPagination}
        />
      </Paper>
      {openAddVitals && (
        <AddEditVitals
          patientData={props?.patientDetails?.patientData}
          open={openAddVitals}
          onClose={handleClose}
          title="Add Vitals"
        />
      )}
    </Grid>
  );
}

export default VitalTable;
