import {
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
import {
  commonWidget,
  getCustomStyle,
} from "../../../../../../../styles/common";
import { tableStyle } from "../allergies/allergies-list";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Loading from "../../../../../../../components/common/spinner/loading";
import { OrderFormType } from "../enums-interfaces/enums";

const cols: any[] = [
  { id: "id", label: "No", minWidht: 200 },
  { id: "visitDate", label: "Visit Date & Time", minWidht: 200 },
  { id: "provider", label: "Provider", minWidht: 200 },
  { id: "type", label: "Type", minWidht: 200 },
  { id: "reason", label: "Reason", minWidht: 200 },
  { id: "appointmentStatus", label: "Appointment Status", minWidht: 200 },
  { id: "billStatus", label: "Bill Status", minWidht: 200 },
  { id: "action", label: "", minWidht: 100 },
];

type Props = {
  patientData: any;
  tableData: any[];
  pagination: any;
  setPagination: any;
  isLoading: boolean;
  refetch: any;
};

function VisitDetailsTable(props: Props) {
  const classes = tableStyle();
  const commomClasses = commonWidget();
  const [tableData, setTableData] = useState<any[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (props.tableData) {
      const newRows = props.tableData.map((document: any) => {
        return {
          id: document.id,
          visitDate: document.visitDate,
          provider: document.provider,
          type: document.type,
          reason: document.reason,
          appointmentStatus: document.appointmentStatus,
          billStatus: document.billStatus,
        };
      });
      setTableData(newRows);
    }
  }, [props.tableData]);

  const handleChangePage = (_event: any, newPage: number) => {
    props.setPagination((prev: any) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleCloseAction = (_formType: string, _order: any) => {
    // console.log("🚀 ~ file: all-documents-table.tsx:51 ~ handleCloseAction ~ formType:", formType, "order ::", order);
    setAnchorEl(null);
    // setOpenModal({ open: true, formType: formType });
    // setOrder(order);
  };

  const handleChangeRowsPerPage = () => {
    setRowsPerPage(20);
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
    // setOpenModal((prev) => ({...prev , open: true}));
  };

  return (
    <React.Fragment key={"AllDocumentsTable"}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow className={commomClasses.tableHeadRowContainer}>
              {cols.map((column: any) => (
                <TableCell
                  key={column.id}
                  className={classes.tableHeader}
                  align={
                    getCustomStyle(column.id, "visitDate") ? "left" : "center"
                  }
                  style={{
                    padding: "10px",
                    minWidth: column.minWidth,
                  }}
                >
                  <Typography variant="h4" className={classes.tableHeaderText}>
                    {column.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className={commomClasses.tableHeadRowContainer}>
            {tableData &&
              !props.isLoading &&
              tableData.map((row: any, index: any) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {cols.map((column: any) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={
                            getCustomStyle(column.id, "visitDate")
                              ? "left"
                              : "center"
                          }
                          sx={{
                            padding: "8px",
                          }}
                        >
                          <Typography variant="h5">
                            {column.id === "action" ? (
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
                                  <MenuItem
                                    onClick={() =>
                                      handleCloseAction(
                                        OrderFormType.ADD_RESULT,
                                        row
                                      )
                                    }
                                  >
                                    {"View"}
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() =>
                                      handleCloseAction(
                                        OrderFormType.EDIT_ORDER,
                                        row
                                      )
                                    }
                                  >
                                    {"Email"}
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() =>
                                      handleCloseAction(
                                        OrderFormType.PRINT_ORDER,
                                        row
                                      )
                                    }
                                  >
                                    {"Delete"}
                                  </MenuItem>
                                </Menu>
                              </>
                            ) : column.id === "billStatus" ? (
                              <Typography
                                variant="h4"
                                sx={{
                                  color:
                                    value === "Paid"
                                      ? "#00B917 !important"
                                      : value === "Cancel"
                                      ? "#FF3939 !important"
                                      : "#FFAA00 !important",
                                }}
                              >
                                {value}
                              </Typography>
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
        {props.isLoading && <Loading />}
        {props.tableData?.length === 0 && !props.isLoading && (
          <div className={commomClasses.noDataMsg}>No Data Available</div>
        )}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.pagination.totalElements}
        rowsPerPage={rowsPerPage}
        page={props.pagination.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );
}

export default VisitDetailsTable;
