import {
  Avatar,
  ButtonBase,
  Grid,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Select,
  Switch,
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
import { providerConstants } from "../../../../../constants/provider";
import { commonWidget, formButtonStyle } from "../../../../../styles/common";
import AddIcon from "@mui/icons-material/Add";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import {
  adminTable,
  Row,
} from "../../../../../components/core/layout/table/adminTable";
import { providerPatientPaymentList } from "../../../../../mock-data/providerdetails";
import AddPatientPayment from "./add-patient-payment";
import ApplyPatientPayment from "./apply-patient-payment";
import { Column } from "../../../../../components/common/enums-and-interfaces/interfaces";

export const patientPaymentStyle = makeStyles(() => ({
  addPaymentBtnGrid: {
    display: "flex",
    justifyContent: "end",
  },
  mainGrid: {
    marginTop: "10px",
  },
  addButtonTypo: {
    color: "#ffffff !important",
    display: "flex",
    // paddingLeft: "12px",
    paddingRight: "2px",
    opacity: 0.9,
  },
  addUserRoleBtnTypo: {
    color: "#ffffff",
    display: "flex",
    // paddingRight: "12px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold !important",
    color: "#36588C !important",
  },
  main: {
    // padding: "20px",
  },
  label: {
    color: "#1A1A1A !important",
    marginBottom: "10px !important",
  },
  container: {
    // boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    // borderRadius: "20px",
    // background: "#fff",
    color: "#1A1A1A !important",
    marginTop: "25px",
  },
  selectInputStyle: {
    ".MuiOutlinedInput-notchedOutline": { border: 0 },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    height: "42px !important",
    width: "100%",
    border: "none",
    background: "white",
    "& fieldset": { border: "none" },
  },
  menuItemColorStyle: {
    color: "#1A1A1A7F",
  },
  paperSearch: {
    padding: "4px",
    display: "flex",
    alignItems: "center",
    height: "42px",
    border: "none",
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2) !important",
  },
  inputBase: {
    marginLeft: "2px !important",
    flex: 1,
  },
  iconButton: {
    padding: "10px",
  },
  mainDivGrid: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  divGrid: {
    display: "flex",
    width: "70%",
    flexWrap: "wrap",
  },
  btnDiv: {
    display: "flex",
    justifyContent: "end",
    width: "30%",
    gap: "15px",
    flexWrap: "wrap",
  },
  patientDetails: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-start",
  },
  successStatus: {
    display: "flex",
    // justifyContent: "center",
    color: "white",
    borderRadius: "20px",
    padding: "2px 0px",
  },
  failStatus: {
    display: "flex",
    // justifyContent: "center",
    color: "white",
    borderRadius: "20px",
    padding: "2px 0px",
  },
  tableTitle: {
    color: "#000",
    // background: "#e1e8ed",
    padding: "15px 0px !important",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: "bold",
  },
  tableCell: {
    padding: "5px 5px !important",
  },
  avatarStyle: {
    width: "32px !important",
    height: "32px !important",
  },
  inputBoxActive2: {
    background: "#FFFFFF 0% no-repeat padding-box !important",
    boxShadow: "0px 0px 6px #00418602 !important",
    border: "1px solid #36588C!important",
    borderRadius: "4px !important",
  },
}));

const provider = ["provider1", "Provider2", "Provider3"];
const ServiceType = ["All", "Pending For Claim", "Submitted"];

export const patientPaymentListColumns: Column[] = [
  { id: "id", label: "ID", minWidth: 50 },
  { id: "visitId", label: "Visit ID" },
  { id: "patientName", label: "Patient Name" },
  { id: "paymentId", label: "Payment Id" },
  { id: "paymentMethod", label: "Payment Method" },
  { id: "transactionId", label: "Transaction ID" },
  { id: "transactionDate", label: "Transaction Date" },
  { id: "paidAmount", label: "Paid Amount" },
  { id: "appliedAmount", label: "Applied Amount" },
  { id: "unAppliedAmount", label: "UnApllied Amount" },
  { id: "action", label: "Action" },
];

function createPatientPaymentData(
  id: number,
  visitId: string,
  paymentId: string,
  paymentMethod: string,
  transactionId: string,
  transactionDate: Date,
  paidAmount: string,
  appliedAmount: string,
  unAppliedAmount: string,
  patientImage: JSX.Element | string,
  patientName: string,
  age: string,
  gender: string
): Row {
  return {
    id,
    visitId,
    paymentId,
    paymentMethod,
    transactionId,
    transactionDate,
    paidAmount,
    appliedAmount,
    unAppliedAmount,
    patientImage,
    patientName,
    age,
    gender,
  };
}
const inputProps = {
  style: {
    fontSize: "14px",
  },
};

function PatientPayment() {
  const classes = patientPaymentStyle();
  const customWidget = commonWidget();
  const style = adminTable();
  const { ADD_PAYMENT, SEARCH } = providerConstants;
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [paymentData, setpaymentData] = useState<Row[]>([]);
  const [openPatientPayment, setPatientPayment] = useState(false);
  const [openApplyPatientPayment, setApplyPatientPayment] = useState(false);

  useEffect(() => {
    const newRows = providerPatientPaymentList?.data.map((patientData: any) => {
      return createPatientPaymentData(
        patientData.id,
        patientData.visitId,
        patientData.paymentId,
        patientData.paymentMethod,
        patientData.transactionId,
        patientData.transactionDate,
        patientData.paidAmount,
        patientData.appliedAmount,
        patientData.unAppliedAmount,
        patientData.patientImage,
        patientData.patientName,
        patientData.age,
        patientData.gender
      );
    });
    setpaymentData(newRows);
  }, []);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  };

  const [allBillsData, setAllBillsData] = useState({
    primaryProvider: "",
    primaryLocation: "",
    registrationDate: "",
  });

  const handleSelectOption = (e: any) => {
    const { value, name } = e.target;
    setAllBillsData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const openPatientPaymentModal = () => {
    setPatientPayment(true);
  };

  const handleApplyPayment = () => {
    setApplyPatientPayment(true);
  };

  return (
    <Grid className={classes.mainGrid}>
      <Grid container xs={12}>
        <Grid item xs={3}>
          <Typography className={classes.title} sx={{ fontSize: "20px" }}>
            Patient Payment
          </Typography>
        </Grid>
        <Grid item xs={9} className={classes.addPaymentBtnGrid}>
          <ButtonBase
            sx={formButtonStyle.saveButtonStyle}
            onClick={openPatientPaymentModal}
          >
            <span className={classes.addButtonTypo}>
              <AddIcon />
            </span>
            <Typography className={classes.addUserRoleBtnTypo} variant="h5">
              {ADD_PAYMENT}
            </Typography>
          </ButtonBase>
        </Grid>
      </Grid>
      <Grid className={classes.container}>
        <Grid container xs={12} spacing={1} className={classes.mainDivGrid}>
          <Grid item xs={1.9}>
            {/* <Typography variant="h4" className={classes.label}>
                Search By Patient
              </Typography> */}
            <Paper component="form" className={classes.paperSearch}>
              <InputBase
                className={classes.inputBase}
                placeholder="Search Patient"
              />
              <IconButton
                type="button"
                className={classes.iconButton}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
          <Grid item xs={1.8}>
            {/* <Typography variant="h4" className={classes.label}>
                Registration Date
              </Typography> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Choose Date"
                slotProps={{ textField: { size: "small" } }}
                sx={{
                  background: "white",
                  borderRadius: "3px",
                  height: "42px",
                  width: "100%",
                  "& fieldset": { border: "none" },
                  boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                  "& label": {
                    color: "#1A1A1A80 !important",
                    fontSize: "14px !important",
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={1.8}>
            {/* <Typography variant="h4" className={classes.label}>
                Provider
              </Typography> */}
            <Select
              className={classes.selectInputStyle}
              value={allBillsData.primaryProvider}
              name="primaryProvider"
              onChange={(e: any) => handleSelectOption(e)}
              renderValue={(selected) => {
                if (!selected) {
                  return (
                    <span>
                      <Typography
                        variant="h5"
                        sx={{
                          color: "#1A1A1A80 !important",
                          fontSize: "14px !important",
                        }}
                      >
                        Select Provider
                      </Typography>
                    </span>
                  );
                }
                return <Typography variant="h5">{selected}</Typography>;
              }}
              MenuProps={MenuProps}
              displayEmpty
            >
              {provider.map((data) => {
                return (
                  <MenuItem value={data} className={classes.menuItemColorStyle}>
                    {data}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
          <Grid item xs={1.8}>
            {/* <Typography variant="h4" className={classes.label}>
                Transaction ID
              </Typography> */}
            <Paper component="form" className={classes.paperSearch}>
              <InputBase
                className={classes.inputBase}
                placeholder="Transaction Id"
                inputProps={inputProps}
              />
            </Paper>
          </Grid>
          <Grid item xs={1.9}>
            {/* <Typography variant="h4" className={classes.label}>
               Payment Method
              </Typography> */}
            <Select
              className={classes.selectInputStyle}
              value={allBillsData.primaryProvider}
              name="primaryProvider"
              onChange={(e: any) => handleSelectOption(e)}
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
                        Payment Method
                      </Typography>
                    </span>
                  );
                }
                return <Typography variant="h5">{selected}</Typography>;
              }}
              MenuProps={MenuProps}
              displayEmpty
            >
              {ServiceType.map((data) => {
                return (
                  <MenuItem value={data} className={classes.menuItemColorStyle}>
                    {data}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
          <Grid item xs={1.8}>
            {/* <Typography variant="h4" className={classes.label}>
                Transaction ID
              </Typography> */}
            <Paper component="form" className={classes.paperSearch}>
              <InputBase
                className={classes.inputBase}
                placeholder="Payment Id"
              />
            </Paper>
          </Grid>
          <Grid
            item
            xs={0.8}
            display="flex"
            justifyContent="end"
            alignItems="center"
          >
            <ButtonBase
              sx={{ ...formButtonStyle.saveButtonStyle, height: "100%" }}
            >
              {SEARCH}
            </ButtonBase>
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        <Grid item xs={12}>
          <Paper
            sx={{
              // margin: "10px !important",
              boxShadow: "none",
              overflow: "hidden",
              marginTop: "25px",
              background: "#F5F6F9",
            }}
          >
            <TableContainer
              sx={{
                width: "100%",
              }}
            >
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow className={customWidget.tableHeadRowContainer}>
                    {patientPaymentListColumns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.id === "id" ? "center" : "left"}
                        sx={{ maxWidth: column.minWidth }}
                      >
                        <Typography variant="h5" sx={{ color: "#000000" }}>
                          {column.label}
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody className={customWidget.tableHeadRowContainer}>
                  {paymentData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                        >
                          {patientPaymentListColumns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell
                                key={column.id}
                                className={classes.tableCell}
                                align={column.id === "id" ? "center" : "left"}
                              >
                                {column.id === "status" ? (
                                  <Grid
                                    className={
                                      value
                                        ? style.successStatus
                                        : style.failStatus
                                    }
                                  >
                                    <Typography
                                      variant="h5"
                                      sx={{
                                        justifyContent: "flex-start",
                                      }}
                                    >
                                      <Switch checked={value} color="success" />
                                    </Typography>
                                  </Grid>
                                ) : column.id === "patientName" ? (
                                  <Grid className={classes.patientDetails}>
                                    <Grid className={customWidget.avatarImage}>
                                      <Avatar
                                        className={classes.avatarStyle}
                                        alt={row.patientName}
                                        src={row.patientImage}
                                      />
                                    </Grid>
                                    <Grid
                                      sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "5px",
                                      }}
                                    >
                                      <Grid>
                                        <Typography
                                          variant="h5"
                                          sx={{ color: "#000000" }}
                                        >
                                          {row.patientName}
                                        </Typography>
                                      </Grid>
                                      <Grid
                                        className={classes.patientDetails}
                                        sx={{ gap: "0px" }}
                                      >
                                        <Grid>
                                          <Typography
                                            variant="h5"
                                            sx={{
                                              color: "#000000",
                                              display: "flex",
                                              // gap: "5px",
                                            }}
                                          >
                                            {row.age}
                                          </Typography>
                                        </Grid>
                                        <Grid>
                                          <Typography
                                            variant="h5"
                                            sx={{
                                              color: "#000000",
                                              display: "flex",
                                              // gap: "5px",
                                            }}
                                          >
                                            {"-"}
                                            {row.gender}
                                          </Typography>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                ) : column.id === "action" ? (
                                  <Typography
                                    variant="h5"
                                    sx={{
                                      color: "#000000",
                                      display: "flex",
                                      // gap: "5px",
                                      cursor: "pointer",
                                      "&:hover": { color: "#36588C" },
                                    }}
                                    onClick={handleApplyPayment}
                                  >
                                    {" "}
                                    Apply
                                  </Typography>
                                ) : (
                                  <Typography
                                    variant="h5"
                                    sx={{ color: "#000000" }}
                                  >
                                    {value}
                                  </Typography>
                                )}
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
              sx={{
                marginTop: "-20x !important",
                border: "none !important",
                background: "white",
              }}
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={paymentData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>
      {openPatientPayment && (
        <AddPatientPayment
          source="Add"
          open={openPatientPayment}
          setOpen={setPatientPayment}
        />
      )}
      {openApplyPatientPayment && (
        <ApplyPatientPayment
          source="Add"
          open={openApplyPatientPayment}
          setOpen={setApplyPatientPayment}
        />
      )}
    </Grid>
  );
}
export default PatientPayment;
