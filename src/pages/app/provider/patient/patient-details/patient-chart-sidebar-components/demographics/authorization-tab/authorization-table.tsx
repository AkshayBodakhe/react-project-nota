/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import {
  Box,
  ButtonBase,
  Grid,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
export const tableStyle = makeStyles(() => ({
  tableHeader: {
    backgroundColor: "#DAEAF8 !important",
  },
  tableHeaderText: {
    fontWeight: "400  !important",
    // color: "#1A1A1A99",
    fontSize:"16px !important"
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
    fontWeight: "600 !important",
    fontFamily: "Roboto",
    color: "#00B917 !important",
  },
  inactiveButton: {
    fontSize: "16px",
    fontWeight: "600 !important",
    fontFamily: "Roboto",
    color: "#FF3939 !important",
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

interface AuthorizationTableProps {
  title: string;
  authorizationData: any;
  authorizationFormColumns: any;
}

const AuthorizationTable: React.FC<AuthorizationTableProps> = ({
  title,
  authorizationData,
  authorizationFormColumns,
}) => {
  const classes = tableStyle();

  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const rowsPerPage = 3;
  const displayedRows = authorizationData.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  const handleChangePage = (_event: any, newPage: number) => {
    setPage(newPage);
  };

  // const handleOpenModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

  const ButtonBaseStyle = () => {
    return (
      <>
        <ButtonBase className={classes.editButton}>
          <EditIcon />
          <Typography sx={{ color: "#0097F0 !important" }}>Edit</Typography>
        </ButtonBase>
        <ButtonBase className={classes.deleteButton}>
          <DeleteOutlineIcon />
          <Typography sx={{ color: "#FF3939 !important" }}>Delete</Typography>
        </ButtonBase>
      </>
    );
  };

  const ButtonBaseActiveInactiveStyle = (status: any) => {
    return (
      <>
        <ButtonBase>
          {status.status ? (
            <Typography variant="h5" className={classes.activeButton}>
              Active
            </Typography>
          ) : (
            <Typography variant="h5" className={classes.inactiveButton}>
              Expired
            </Typography>
          )}
        </ButtonBase>
      </>
    );
  };
  return (
    <>
      <Grid container p={2} pb={0}>
        <Grid container xs={12}>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              sx={{
                color: "#004186",
                fontWeight: "bold",
                fontSize:"16px !important",
              }}
            >
              {title}
            </Typography>
          </Grid>
        </Grid>
        <Grid item mt={1} xs={12} sx={{ marginTop: "20px" }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {authorizationFormColumns.map((column: any) => (
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
                      {authorizationFormColumns.map((column: any) => {
                        const value = row[column.id];

                        return (
                          <TableCell
                            key={column.id}
                            sx={{
                              padding: "8px",
                              backgroundColor:
                                index % 2 === 1 ? "#EAF4FF80" : "",
                            }}
                          >
                            <Typography
                              variant="h5"
                              sx={{
                                // fontWeight: "bold !important",
                                // color: "#1A1A1ACC",
                              }}
                            >
                              {column.id === "status" ? (
                                <ButtonBaseActiveInactiveStyle status={value} />
                              ) : column.id === "action" ? (
                                <ButtonBaseStyle />
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
          {Math.min((page + 1) * rowsPerPage, authorizationData.length)} of{" "}
          {authorizationData.length} entries
        </Typography>
        <Pagination
          count={Math.ceil(authorizationData.length / rowsPerPage)}
          page={page + 1}
          onChange={(e, newPage) => handleChangePage(e, newPage - 1)}
          className={classes.pagination}
          classes={{ root: classes.root }}
          shape="rounded"
        />
      </Box>
    </>
  );
};

export default AuthorizationTable;
