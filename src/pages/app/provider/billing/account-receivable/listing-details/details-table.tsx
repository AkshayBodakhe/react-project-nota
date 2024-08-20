import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import theme from "../../../../../../theme";
import { getCustomStyle } from "../../../../../../styles/common";
import { listing } from "../../../../../../mock-data/listing-data";
import { Types } from "../../../common-files/interfaces";
import { AccountsType } from "../../../common-files/enums";

interface Column {
  id: string;
  label: string;
  minWidth: number | "auto";
  displaySort?: boolean;
}

const patientCols: any[] = [
  {
    id: "superBillId",
    label: "Superbill ID",
    minWidth: 120,
    displaySort: false,
  },
  {
    id: "dateOfService",
    label: "Date of Service",
    minWidth: 120,
    displaySort: true,
  },
  {
    id: "dateOfBilling",
    label: "Date of Billing",
    minWidth: 120,
    displaySort: true,
  },
  { id: "billAmount", label: "Bill Amount", minWidth: 120, displaySort: true },
  {
    id: "claimAmount",
    label: "Claim Amount",
    minWidth: 120,
    displaySort: true,
  },
  { id: "claimPaid", label: "Claim Paid", minWidth: 120, displaySort: true },
  { id: "coPay", label: "Co-Pay", minWidth: 100, displaySort: false },
  { id: "coPayPaid", label: "Co-Pay Paid", minWidth: 100, displaySort: false },
  {
    id: "balanceAmount",
    label: "Balance Amount",
    minWidth: 100,
    displaySort: false,
  },
];

const insuranceCols: any[] = [
  {
    id: "claimNumber",
    label: "Claim Number",
    minWidth: 50,
    displaySort: false,
  },
  {
    id: "patientName",
    label: "Patient Name",
    minWidth: 120,
    displaySort: true,
  },
  {
    id: "dateOfService",
    label: "Date of Service",
    minWidth: 120,
    displaySort: true,
  },
  {
    id: "dateOfBilling",
    label: "Date of Billing",
    minWidth: 140,
    displaySort: true,
  },
  {
    id: "submissionDate",
    label: "Date of Claim Submission",
    minWidth: 100,
    displaySort: true,
  },
  { id: "billAmount", label: "Bill Amount", minWidth: 80, displaySort: true },
  {
    id: "claimAmount",
    label: "Claim Amount",
    minWidth: 50,
    displaySort: false,
  },
  { id: "paidAmount", label: "Paid Amount", minWidth: 50, displaySort: false },
  {
    id: "balanceAmount",
    label: "Balance Amount",
    minWidth: 50,
    displaySort: false,
  },
];

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
  }),
  { defaultTheme: theme }
);

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
    // cursor: "pointer",
  },
};

function DetailsTable(props: Types) {
  const classes = commontableWidget();
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
        setTableData(listing(AccountsType.Patient));
        break;
      case AccountsType.Insurance:
        setTableCols(insuranceCols);
        setTableData(listing(AccountsType.Insurance));
        break;
      default:
        break;
    }
  }, []);

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
            <TableBody>
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
                          // style={{ cursor: "pointer" }}
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

export default DetailsTable;
