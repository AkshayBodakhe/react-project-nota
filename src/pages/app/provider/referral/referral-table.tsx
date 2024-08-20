import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Avatar,
  Box,
  ButtonBase,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import EventSucessModal from "../../../../components/common/success-modal";
import { DeleteDialog } from "../../../../components/core/delete-dialog";
import { referralOut } from "../../../../mock-data/referral";
import AddReferral from "./add-refarral";
import PendingResponseModel from "./pending-response-modal";
import { commonWidget } from "../../../../styles/common";

export const tableStyle = makeStyles(() => ({
  avatarStyle: {
    width: "32px !important",
    height: "32px !important",
  },
  tableHeader: {
    backgroundColor: "#1A1A1A0D !important",
    opacity: 1,
  },
  tableHeaderText: {
    fontWeight: "400  !important",
    // color: "#1A1A1A99",
    fontSize: "16px !important",
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
  activeButton: {
    fontSize: "16px",
    fontWeight: "500 !important",
    fontFamily: "Roboto",
    color: "#FFAA00 !important",
    textAlign: "center",
    textDecoration: "underline",
    lineHeight: "40px",
    paddingBottom: "10px",
  },
  inactiveButton: {
    fontSize: "16px",
    fontWeight: "500 !important",
    fontFamily: "Roboto",
    color: "#1A1A1ACC !important",
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
    // marginTop: 16,
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
  confirm: {},
}));

export interface Row {
  [key: string]: string | JSX.Element | number | any;
}

export interface Column {
  id: string;
  label: string | JSX.Element;
  minWidth?: number;
}

export const labResultsFormColumns: Column[] = [
  { id: "patientName", label: "Patient Name", minWidth: 250 },
  { id: "contact", label: "Contact", minWidth: 250 },
  { id: "referralFrom", label: "Referral From", minWidth: 250 },
  { id: "referralTo", label: "Referral To", minWidth: 250 },
  { id: "date", label: "Date", minWidth: 200 },
  { id: "status", label: "Response Status", minWidth: 130 },
  { id: "action", label: "Action", minWidth: 50 },
];

function ReferralTable() {
  const classes = tableStyle();
  const commonStyle = commonWidget();
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [labData, setLabData] = useState<Row[]>([]);
  const [isEditModalOpen, setIsEditModelOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  //   const [successMessage, setSuccessMessage] = useState("");
  const [openPendingResponse, setPendingResponse] = useState(false);

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleEventSuccessModalOpen = () => {
    setOpenSuccessModal(true);
    setOpenDeleteDialog(false);
    // setSuccessMessage("Allergy Deleted Successfully");
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const options = ["Edit", "Delete"];
  const ITEM_HEIGHT = 48;

  const ButtonBaseActiveInactiveStyle = (status: any) => {
    return (
      <>
        <ButtonBase>
          {status.status ? (
            <Typography
              variant="h5"
              className={classes.activeButton}
              onClick={openModal}
            >
              Pending
            </Typography>
          ) : (
            <Typography variant="h5" className={classes.inactiveButton}>
              To Be Reviewed
            </Typography>
          )}
        </ButtonBase>
      </>
    );
  };
  const handleClose = () => {
    setPendingResponse(false);
    setIsEditModelOpen(false);
  };

  const handleMenu: (option: string) => void = (option: string) => {
    if (option === "Edit") {
      setIsEditModelOpen(true);
    }else if(option === "Delete"){
      setOpenDeleteDialog(true);
    }
  };

  const displayedRows = labData.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  function createReferralObject(
    patientName: string,
    contact: string,
    referralFrom: string,
    referralTo: string,
    date: string,
    status: string,
    action: boolean,
    avtar: JSX.Element | string,
    email: string,
    referralFromType: string,
    referralToType: string
  ): Row {
    return {
      patientName,
      contact,
      referralFrom,
      referralTo,
      date,
      status,
      action,
      avtar,
      email,
      referralFromType,
      referralToType,
    };
  }

  useEffect(() => {
    const newRows = referralOut?.content.map((data: any) => {
      return createReferralObject(
        data.patientName,
        data.contact,
        data.referralFrom,
        data.referralTo,
        data.date,
        data.status,
        data.action,
        data.avatar,
        data.email,
        data.referralFromType,
        data.referralToType
      );
    });
    setLabData(newRows);
  }, []);

  const handleChangePage = (_event: any, newPage: number) => {
    setPage(newPage);
  };

  const openModal = () => {
    setPendingResponse(true);
  };

  return (
    <div>
      <>
        <Grid container>
          <Grid item mt={1} xs={12} sx={{ marginTop: "20px !important" }}>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {labResultsFormColumns.map((column: any) => (
                      <TableCell
                        key={column.id}
                        className={classes.tableHeader}
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
                <TableBody>
                  {displayedRows.map((row: any, index: any) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {labResultsFormColumns.map((column: any) => {
                          const value = row[column.id];

                          return (
                            <TableCell
                              key={column.id}
                              sx={{
                                padding: "8px",
                              }}
                            >
                              <Typography variant="h5">
                                {column.id === "status" ? (
                                  <>
                                    <Grid sx={{textAlign:"center"}}>
                                      <ButtonBaseActiveInactiveStyle
                                        status={value}
                                      />
                                    </Grid>
                                  </>
                                ) : column.id === "action" ? (
                                  <>
                                    <IconButton
                                      aria-label="more"
                                      id="long-button"
                                      aria-controls={
                                        open ? "long-menu" : undefined
                                      }
                                      aria-expanded={open ? "true" : undefined}
                                      aria-haspopup="true"
                                      onClick={handleClick}
                                    >
                                      <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                      id="long-menu"
                                      MenuListProps={{
                                        "aria-labelledby": "long-button",
                                      }}
                                      anchorEl={anchorEl}
                                      open={open}
                                      onClose={handleCloseMenu}
                                      PaperProps={{
                                        style: {
                                          maxHeight: ITEM_HEIGHT * 4.5,
                                          width: "10ch",
                                          boxShadow: "none",
                                          border: "1px solid #e8e8e8",
                                          color:"#1A1A1A99"
                                        },
                                      }}
                                    >
                                      {options.map((option) => (
                                        <MenuItem
                                          key={option}
                                          selected={option === "Pyxis"}
                                          onClick={() => handleMenu(option)}
                                        >
                                          {option}
                                        </MenuItem>
                                      ))}
                                    </Menu>
                                  </>
                                ) : column.id === "patientName" ? (
                                  <Grid className={commonStyle.avatarImage}>
                                    <Avatar
                                      className={classes.avatarStyle}
                                      alt={row.patientName}
                                      src={row.avtar}
                                    />
                                    &nbsp;&nbsp;&nbsp;
                                    {value}
                                  </Grid>
                                ) : column.id === "contact" ? (
                                  <>
                                    <Grid>{row.contact}</Grid>
                                    <Grid>{row.email}</Grid>
                                  </>
                                ) : column.id === "referralFrom" ? (
                                  <>
                                    <Grid>{row.referralFrom}</Grid>
                                    <Grid>{row.referralFromType}</Grid>
                                  </>
                                ) : column.id === "referralTo" ? (
                                  <>
                                    <Grid>{row.referralTo}</Grid>
                                    <Grid>{row.referralToType}</Grid>
                                  </>
                                ) : (
                                  value
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
            </TableContainer>
          </Grid>
        </Grid>
        <Box className={classes.paginationBox} pl={2}>
          <Typography variant="h6" className={classes.paginationTypo}>
            Showing {page * rowsPerPage + 1} to{" "}
            {Math.min((page + 1) * rowsPerPage, labData.length)} of{" "}
            {labData.length} entries
          </Typography>
          <Pagination
            count={Math.ceil(labData.length / rowsPerPage)}
            page={page + 1}
            onChange={(e, newPage) => handleChangePage(e, newPage - 1)}
            className={classes.pagination}
            classes={{ root: classes.root }}
            shape="rounded"
          />
        </Box>
        {openPendingResponse && (
          <PendingResponseModel
            open={openPendingResponse}
            onClose={handleClose}
            title=""
          />
        )}
        {isEditModalOpen && (
          <AddReferral
            open={isEditModalOpen}
            onClose={handleClose}
            title="Edit Referral"
          />
        )}

        <DeleteDialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          onEventSuccessModalOpen={handleEventSuccessModalOpen}
          title={"Delete Referral"}
          message={"referral"}
        />

        {openSuccessModal && (
          <EventSucessModal
            message="Referral Added Successfully"
            onClose={() => setOpenSuccessModal(false)}
          />
        )}
      </>
    </div>
  );
}

export default ReferralTable;
