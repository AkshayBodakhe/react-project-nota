import {
  ButtonBase,
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
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import { useEffect, useState } from "react";
import { superBillList } from "../../../../../../mock-data/superbill";
import { commonWidget, getCustomStyle } from "../../../../../../styles/common";
import { readyForBillingList } from "../../../../../../mock-data/ready-for-billing-list";
// import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import ReceiptIcon from "@mui/icons-material/Receipt";
// import { useSelector } from "react-redux";

interface Column {
  id: string;
  label: string;
  minWidth: number | "auto";
  displaySort?: boolean;
}

interface Row {
  patientId: string;
  visitId: string;
  dateofservice: string;
  patientName: string;
  appointmentType: string;
  providerName: string;
  reason: string;
  serviceLocation: string;
  action: JSX.Element;
  [key: string]: string | JSX.Element;
}

function createData(
  patientId: string,
  visitId: string,
  dateofservice: string,
  patientName: string,
  providerName: string,
  appointmentType: string,
  reason: string,
  serviceLocation: string,
  action: JSX.Element
): Row {
  return {
    patientId,
    visitId,
    dateofservice,
    patientName,
    providerName,
    appointmentType,
    reason,
    serviceLocation,
    action,
  };
}

const columns: Column[] = [
  { id: "patientId", label: "Patient ID", minWidth: 50, displaySort: false },
  { id: "visitId", label: "Visit ID", minWidth: 50, displaySort: false },
  {
    id: "dateofservice",
    label: "Date of Service",
    minWidth: 120,
    displaySort: true,
  },
  {
    id: "patientName",
    label: "Patient Name",
    minWidth: 100,
    displaySort: true,
  },
  {
    id: "providerName",
    label: "Provider Name.",
    minWidth: 140,
    displaySort: true,
  },
  {
    id: "appointmentType",
    label: "Appointment Type",
    minWidth: 100,
    displaySort: true,
  },
  { id: "reason", label: "Reason for Visit", minWidth: 80, displaySort: true },
  {
    id: "serviceLocation",
    label: "Service Location",
    minWidth: 50,
    displaySort: false,
  },
  { id: "action", label: "Action", minWidth: 50, displaySort: false },
];

const sxs = {
  iconArrowWort: {
    marginBottom: "-2px",
    // marginTop: '6px',
    fontSize: "14px",
    transform: "rotate(90deg)",
    color: "#4C4C4CCC",
    cursor: "pointer",
    // marginLeft: '2px',
  },
  tableBodycell: {
    // color: "#1A1A1A80",
    fontSize: "0.875rem",
    padding: "12px!important",
    cursor: "pointer",
  },
};

function ReadyForBillingTable() {
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => {
  //     setOpen(true);
  // };

  // const handleLocationName = () => {
  //     handleOpen();
  // };

  // const handleClose = () => setOpen(false);

  //   const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const classes = commonWidget();

  const [billList, setBillList] = useState<any>([]);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    _newPage: number
  ) => {
    // setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    // setPage(0);
  };

  const handleFormModal = () => {};

  useEffect(() => {
    const newRows: any = readyForBillingList?.map((bill: any) => {
      return createData(
        bill?.patientId,
        bill?.visitId,
        bill?.dateofservice,
        bill?.patientName,
        bill?.providerName,
        bill?.appointmentType,
        bill?.reason,
        bill?.serviceLocation,
        <ButtonBase
          sx={{
            background: "#DAEAF8",
            borderRadius: "5px",
            padding: "5px",
            height: "30px",
          }}
        >
          <ReceiptIcon sx={{ color: "#36588C", height: "15px" }} />
          <Typography
            variant="h6"
            color="#36588C"
            textAlign={"center"}
            fontSize={"14px !important"}
            onClick={handleFormModal}
          >
            Create Superbill
          </Typography>
        </ButtonBase>
      );
    });
    setBillList(newRows);
  }, [superBillList]);

  return (
    <>
      <Paper
        sx={{
          boxShadow: "none",
          background: "white",
        }}
      >
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow className={classes.tableHeadRowContainer}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={
                      getCustomStyle(column.id, "patientName")
                        ? "left"
                        : "center"
                    }
                    style={{ width: column.minWidth }}
                  >
                    {column.label}{" "}
                    {column.displaySort && (
                      <SyncAltIcon sx={sxs.iconArrowWort} />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className={classes.tableHeadRowContainer}>
              {billList?.map((providerGroup: any) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={providerGroup?.id}
                  >
                    {columns.map((column) => {
                      if (column.id === "status" || column.id === "action") {
                        return (
                          <TableCell
                            key={column.id}
                            sx={sxs.tableBodycell}
                            align={
                              getCustomStyle(column.id, "patientName")
                                ? "left"
                                : "center"
                            }
                          >
                            {providerGroup[column.id]}
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell
                            key={column.id}
                            sx={sxs.tableBodycell}
                            align={
                              getCustomStyle(column.id, "patientName")
                                ? "left"
                                : "center"
                            }
                            style={{ cursor: "pointer" }} // Add cursor style
                          >
                            {providerGroup[column.id]}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          // className={classes.tablePagination}
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={0}
          rowsPerPage={rowsPerPage}
          page={0}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

export default ReadyForBillingTable;
