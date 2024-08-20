import {
  ButtonBase,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { commonWidget } from "../../../../../../../styles/common";
import { tableStyle } from "../allergies/allergies-list";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Loading from "../../../../../../../components/common/spinner/loading";
import { PatientBillingType } from "../enums-interfaces/enums";

const sxs = {
  applyBtn: {
    background: "#CCECFF 0% 0% no-repeat padding-box",
    border: "1px solid #1B5984",
    borderRadius: "3px",
    opacity: 1,
    padding: "5%",
  },
};

type Props = {
  patientDetails: any;
  tableData: any[];
  tableColumns: any[];
  pagination: any;
  setPagination: any;
  isLoading: boolean;
  refetch: any;
  actionType: PatientBillingType;
  actionOpts: string[];
};

function BillingTable(props: Props) {
  const {
    isLoading,
    pagination,
    // patientDetails,
    // refetch,
    setPagination,
    tableColumns,
    tableData,
    actionOpts,
    actionType,
  } = props;

  const classes = tableStyle();
  const commomClasses = commonWidget();
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {}, []);

  const handleChangeRowsPerPage = () => {
    setRowsPerPage(20);
  };

  const handleChangePage = (_event: any, newPage: number) => {
    setPagination((prev: any) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleCloseAction = (_formType: string, _order: any) => {
    setAnchorEl(null);
    // setOpenModal({ open: true, formType: formType });
    // setOrder(order);
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
    // setOpenModal((prev) => ({...prev , open: true}));
  };

  return (
    <React.Fragment key={"BillingTable"}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow className={commomClasses.tableHeadRowContainer}>
              {tableColumns &&
                tableColumns.map((column: any, colIndex: number) => (
                  <TableCell
                    key={column.id}
                    className={classes.tableHeader}
                    align={colIndex == 1 ? "left" : "center"}
                    style={{
                      padding: "10px",
                      minWidth: column.minWidth,
                    }}
                  >
                    <Typography
                      variant="h4"
                      className={classes.tableHeaderText}
                    >
                      {column.label}
                    </Typography>
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody className={commomClasses.tableHeadRowContainer}>
            {tableData &&
              !isLoading &&
              tableData.map((row: any, index: any) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {tableColumns &&
                      tableColumns.map((column: any, colIndex: number) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={colIndex == 1 ? "left" : "center"}
                            sx={{ padding: "8px" }}
                          >
                            <Typography variant="h5">
                              {column.id === "action" ? (
                                <>
                                  {actionType ===
                                    PatientBillingType.PATIENT_PAYMENT ||
                                  actionType ===
                                    PatientBillingType.INSURANCE_PAYMENT ? (
                                    <>
                                      <ButtonBase sx={sxs.applyBtn}>
                                        Apply Payment
                                      </ButtonBase>
                                    </>
                                  ) : (
                                    <>
                                      <MoreVertIcon
                                        sx={{ cursor: "pointer", width: "6vw" }}
                                        onClick={handleClick}
                                      />
                                      <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleCloseAction}
                                        MenuListProps={{
                                          "aria-labelledby": "basic-button",
                                        }}
                                      >
                                        {actionOpts &&
                                          actionOpts.map((action: any) => {
                                            return (
                                              <MenuItem
                                                onClick={() =>
                                                  handleCloseAction(action, row)
                                                }
                                              >
                                                {action}
                                              </MenuItem>
                                            );
                                          })}
                                      </Menu>
                                    </>
                                  )}
                                </>
                              ) : (
                                value || "-"
                              )}
                            </Typography>
                          </TableCell>
                        );
                      })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        {isLoading && <Loading />}
        {tableData?.length === 0 && !isLoading && (
          <div className={commomClasses.noDataMsg}>No Data Available</div>
        )}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={pagination.totalElements}
        rowsPerPage={rowsPerPage}
        page={pagination.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );
}

export default BillingTable;
