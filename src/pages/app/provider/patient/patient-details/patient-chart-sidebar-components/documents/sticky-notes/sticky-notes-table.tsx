import {
  Grid,
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
} from "../../../../../../../../styles/common";
import { tableStyle } from "../../allergies/allergies-list";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Loading from "../../../../../../../../components/common/spinner/loading";
import { OrderFormType } from "../../enums-interfaces/enums";
import { formatDate } from "../../../../../../../../components/common/enums-and-interfaces/common-functions";
import { DeleteDialog } from "../../../../../../../../components/core/delete-dialog";
import EventSucessModal from "../../../../../../../../components/common/success-modal";
import ViewHistory from "./view-history";
import { StickynotesControllerService } from "../../../../../../../../sdk/thinkemr-core-0.0.1/requests";
import CustomPagination from "../../../../../../../../components/common/pagination";

const cols: any[] = [
  { id: "noteName", label: "Note Name", minWidht: 600 },
  { id: "action", label: "Action", minWidht: 20 },
];

type Props = {
  patientData: any;
  tableData: any[];
  pagination: any;
  setPagination: any;
  isLoading: boolean;
  refetch: any;
};

export const formatTimestamp = (timestamp: any) => {
  const date = new Date(timestamp);
  const formattedDate = `${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date
    .getDate()
    .toString()
    .padStart(2, "0")}-${date.getFullYear()}`;
  const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const amOrPm = date.getHours() >= 12 ? "PM" : "AM";
  const formattedTime = `${hours}:${minutes} ${amOrPm}`;

  // Combine date and time with '|' separator
  return `${formattedDate} | ${formattedTime}`;
};

function StickyNotesTable(props: Props) {
  const classes = tableStyle();
  const commomClasses = commonWidget();
  const [tableData, setTableData] = useState<any[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openViewHistory, setOpenViewHistory] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [stickyData, setStickyData] = useState(null);

  useEffect(() => {
    if (props.tableData) {
      const newRows = props.tableData.map((note: any) => {
        return {
          noteName: note.createdInfo,
          description: note.description,
          createdDate: note.createdDate,
          uuid: note.uuid,
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

  const handleChangeRowsPerPage = () => {
    setRowsPerPage(20);
  };

  const handleCloseAction = (_formType: string, _order: any) => {
    setAnchorEl(null);
    // setOpenModal({ open: true, formType: formType });
    // setOrder(order);
  };

  const handleClick = (event: any, index: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
  };

  const deleteNotes = async (id: any) => {
    await StickynotesControllerService.deleteByUuid(id).then(() => {
      props.refetch();
    });
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleEventSuccessModalOpen = () => {
    let uuid = tableData[selectedIndex]?.uuid;
    deleteNotes(uuid);
    setOpenSuccessModal(true);
    setOpenDeleteDialog(false);
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const getHistory = (row: any) => {
    setStickyData(row);
    setOpenViewHistory(true);
  };

  return (
    <>
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
                      getCustomStyle(column.id, "noteName") ? "left" : "center"
                    }
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
                              getCustomStyle(column.id, "noteName")
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
                                    onClick={(e) => handleClick(e, index)}
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
                                    <MenuItem onClick={() => getHistory(row)}>
                                      {"View"}
                                    </MenuItem>
                                    <MenuItem onClick={handleOpenDeleteDialog}>
                                      {"Delete"}
                                    </MenuItem>
                                  </Menu>
                                </>
                              ) : (
                                <Grid item xs={12}>
                                  <Typography
                                    variant="h5"
                                    sx={{ fontWeight: "bold" }}
                                  >
                                    {`${value} | ${formatTimestamp(
                                      row.createdDate
                                    )} ` || "-"}
                                  </Typography>
                                  <Typography variant="h5">
                                    {row.description || "-"}
                                  </Typography>
                                </Grid>
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
        <CustomPagination
          pagination={props.pagination}
          setPagination={props.setPagination}
        />
        <DeleteDialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          onEventSuccessModalOpen={handleEventSuccessModalOpen}
          title={"Delete Notes"}
          message={"allergy"}
        />

        {openSuccessModal && (
          <EventSucessModal
            message="Notes deleted successfully"
            onClose={() => setOpenSuccessModal(false)}
          />
        )}
        {openViewHistory && (
          <ViewHistory
            source="View"
            open={open}
            setOpen={setOpenViewHistory}
            stickyData={stickyData}
          />
        )}
      </React.Fragment>
    </>
  );
}

export default StickyNotesTable;
