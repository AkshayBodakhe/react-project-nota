import {
  Box,
  InputBase,
  Paper,
  Table,
  TableBody,
  InputAdornment,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import {
  commonWidget,
  getCustomStyle,
} from "../../../../../../../styles/common";
import theme from "../../../../../../../theme";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { accountsReveivable } from "../../../../../../../mock-data/accounts-receivable";
import TotalPaymentRecevable from "./total-payment";
import { useNavigate } from "react-router-dom";
import { AccountsType } from "../../../../common-files/enums";
import { Types } from "../../../../common-files/interfaces";

const commontableWidget = makeStyles(
  () => ({
    tableHeadRowContainer: {
      // backgroundColor: "#4C4C4C1A !important",

      "& th": {
        // color: "#1A1A1A",
        backgroundColor: "#DAEAF8 !important",
        borderBottom: "none",
        fontSize: "14px",
        fontWeight: "500",
        padding: "10px 10px !important",
      },
    },
    searchBoxWidth: {
      width: "24rem",
      background: "white",
      "@media (max-width: 820px)": {
        width: "100% !important",
      },
      "@media (max-width: 768px)": {
        width: "100% !important",
      },
    },
    AddressFormLongtInputField2: {
      borderRadius: "5px",
      border: "none",
      "& fieldset": { border: "none" },
      boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
      height: "38px",
      textAlign: "center",
      padding: "13px 0px 10px 16px",
      fontSize: "16px",
      alignItems: "center",
      "& input::placeholder": {
        alignItems: "center",
        fontSize: "12.5px",
      },
      "@media (max-width: 820px)": {
        width: "100%",
      },
      "@media (max-width: 768px)": {
        width: "100%",
      },
    },
    inputBoxText2: {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontSize: "14px !important",
      lineHeight: "140%",
      color: "",
      width: "100%",
      resize: "vertical",
      minHeight: "15px",
    },
    inputBoxActive2: {
      background: "#FFFFFF 0% no-repeat padding-box !important",
      boxShadow: "0px 0px 6px #00418602 !important",
      border: "1px solid #36588C!important",
      borderRadius: "4px !important",
    },
  }),
  { defaultTheme: theme }
);

interface Column {
  id: string;
  label: string;
  minWidth: number | "auto";
  displaySort?: boolean;
}

const patientCols: Column[] = [
  { id: "patientId", label: "Patient ID", minWidth: 50, displaySort: false },
  {
    id: "patientName",
    label: "Patient Name",
    minWidth: 120,
    displaySort: true,
  },
  { id: "30days", label: "0-30 Days", minWidth: 120, displaySort: true },
  { id: "60days", label: "31-60 Days", minWidth: 140, displaySort: true },
  { id: "90days", label: "61-90 Days", minWidth: 100, displaySort: true },
  { id: "120days", label: "91-120 Days", minWidth: 80, displaySort: true },
  { id: "plusdays", label: "120+ Days", minWidth: 50, displaySort: false },
  { id: "total", label: "Total", minWidth: 50, displaySort: false },
];

const insuranceCols: Column[] = [
  { id: "payerId", label: "Payer ID", minWidth: 50, displaySort: false },
  { id: "payerName", label: "Payer Name", minWidth: 120, displaySort: true },
  { id: "30days", label: "0-30 Days", minWidth: 120, displaySort: true },
  { id: "60days", label: "31-60 Days", minWidth: 140, displaySort: true },
  { id: "90days", label: "61-90 Days", minWidth: 100, displaySort: true },
  { id: "120days", label: "91-120 Days", minWidth: 80, displaySort: true },
  { id: "plusdays", label: "120+ Days", minWidth: 50, displaySort: false },
  { id: "total", label: "Total", minWidth: 50, displaySort: false },
];

const sxs = {
  iconArrowWort: {
    marginBottom: "-2px",
    fontSize: "14px",
    transform: "rotate(90deg)",
    color: "#4C4C4CCC",
    cursor: "pointer",
  },
  tableBodycell: {
    fontSize: "0.875rem",
    padding: "12px!important",
    cursor: "pointer",
  },
};

const cols: any[] = [
  { id: "Total", label: "", minWidth: 120, displaySort: true },
  { id: "30days", label: "0-30 Days", minWidth: 120, displaySort: true },
  { id: "60days", label: "31-60 Days", minWidth: 120, displaySort: true },
  { id: "90days", label: "61-90 Days", minWidth: 120, displaySort: true },
  { id: "120days", label: "91-120 Days", minWidth: 120, displaySort: true },
  { id: "plusdays", label: "120+ Days", minWidth: 120, displaySort: false },
  { id: "totalAmt", label: "Total", minWidth: 120, displaySort: false },
];

const data: any[] = [
  {
    "30days": "$ 152",
    "60days": "$ 50",
    "90days": "$ 56",
    "120days": "$ 250",
    plusdays: "$ 562",
    totalAmt: "$15620",
  },
];

function AccountsTable(props: Types) {
  const classes = commontableWidget();
  const customWidget = commonWidget();
  const navigate = useNavigate();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableCols, setTableCols] = useState<Column[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);

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

  useEffect(() => {
    switch (props.type) {
      case AccountsType.Patient:
        setTableCols(patientCols);
        setTableData(accountsReveivable(AccountsType.Patient));
        break;
      case AccountsType.Insurance:
        setTableCols(insuranceCols);
        setTableData(accountsReveivable(AccountsType.Insurance));
        break;
      default:
        break;
    }
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <InputBase
            fullWidth
            sx={{ width: "20rem" }}
            classes={{
              root: classes.AddressFormLongtInputField2,
              input: classes.inputBoxText2,
              focused: classes.inputBoxActive2,
            }}
            placeholder={
              props.type === AccountsType.Patient
                ? "Search by Patient Name, ID"
                : "Search by Payer Name, ID"
            }
            endAdornment={
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </Box>
        <TotalPaymentRecevable columns={cols} data={data} />
        <Paper
          sx={{
            boxShadow: "none",
            background: "white",
          }}
        >
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow className={customWidget.tableHeadRowContainer}>
                  {tableCols.map((column) => (
                    <TableCell
                      key={column.id}
                      align={
                        getCustomStyle(
                          column.id,
                          props.type == AccountsType.Patient
                            ? "patientName"
                            : "payerName"
                        )
                          ? "left"
                          : "center"
                      }
                      style={{ width: column.minWidth }}
                    >
                      {column.label}{" "}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody className={customWidget.tableHeadRowContainer}>
                {tableData?.map((account: any) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={account?.id}
                    >
                      {tableCols.map((column) => {
                        return (
                          <TableCell
                            key={column.id}
                            sx={sxs.tableBodycell}
                            align={
                              getCustomStyle(
                                column.id,
                                props.type == AccountsType.Patient
                                  ? "patientName"
                                  : "payerName"
                              )
                                ? "left"
                                : "center"
                            }
                            onClick={() => {
                              navigate("listing", {
                                state: {
                                  col: account,
                                  type: props.type,
                                },
                              });
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            {account[column.id]}
                          </TableCell>
                        );
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
      </Box>
    </>
  );
}

export default AccountsTable;
