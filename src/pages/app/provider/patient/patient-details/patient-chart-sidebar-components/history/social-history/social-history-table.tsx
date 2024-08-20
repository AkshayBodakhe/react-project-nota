import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/EditOutlined";
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
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { formButtonStyle } from "../../../../../../../../styles/common";
import CustomPagination from "../../../../../../../../components/common/pagination";

export const tableStyle = makeStyles(() => ({
  tableHeader: {
    backgroundColor: "#f3f3f3 !important",
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
    // color: "#00B917 !important",
  },
  inactiveButton: {
    fontSize: "16px",
    fontWeight: "500 !important",
    fontFamily: "Roboto",
    // color: "#FF3939 !important",
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
  confirm: {},
}));

export interface Row {
  [key: string]: string | JSX.Element | number | any;
}

export interface TableProps {
  SocialHistoryFormColumns: any;
  socialHistoryData: any;
  title: string;
  btnTitle: string;
  pagination?: any;
  setPagination?: any;
}

const SocialHitoryTable: React.FC<TableProps> = ({
  SocialHistoryFormColumns,
  socialHistoryData,
  title,
  pagination,
  setPagination,
}) => {
  const classes = tableStyle();
  const [page, setPage] = useState(0);
  const rowsPerPage = 3;
  const handleOpenDeleteDialog = () => {
    // setOpenDeleteDialog(true);
  };

  const ButtonBaseStyle = () => {
    return (
      <>
        <Grid sx={{ display: "flex" }}>
          <ButtonBase
            sx={{
              ...formButtonStyle.mainButtonStyle,
            }}
            // onClick={() => setIsEditModelOpen(true)}
          >
            <EditIcon
              sx={{ fontSize: "17px !important", marginRight: "5px" }}
            />
            <Typography variant="h6">Edit</Typography>
          </ButtonBase>
          <Grid pl={2}>
            <ButtonBase
              sx={{
                ...formButtonStyle.mainButtonStyle,
              }}
              onClick={handleOpenDeleteDialog}
            >
              <DeleteOutlineIcon
                sx={{ fontSize: "17px !important", marginRight: "5px" }}
              />
              <Typography variant="h6">Delete</Typography>
            </ButtonBase>
          </Grid>
        </Grid>
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
              Inactive
            </Typography>
          )}
        </ButtonBase>
      </>
    );
  };

  const displayedRows = socialHistoryData;

  const handleChangePage = (_event: any, newPage: number) => {
    setPage(newPage);
  };

  const openModal = () => {
    // setAddAllergies(true);
  };

  return (
    <div>
      <>
        <Grid container p={2} pb={0}>
          <Grid container xs={12} justifyContent="space-between">
            <Grid item sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="h4"
                sx={{
                  color: "#004186",
                  fontWeight: "bold",
                  fontSize: "16px !important",
                }}
              >
                {title}
              </Typography>
            </Grid>
            {/* <Grid item display="flex" gap="20px;">
              <Grid>
                <ButtonBase
                  sx={{
                    ...formButtonStyle.mainButtonStyle,
                  }}
                  onClick={openModal}
                >
                  <AddIcon />
                  <Typography variant="h4">{btnTitle}</Typography>
                </ButtonBase>
              </Grid>
            </Grid> */}
          </Grid>
          <Grid item mt={1} xs={12} sx={{ marginTop: "20px !important" }}>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {SocialHistoryFormColumns.map((column: any) => (
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
                        {SocialHistoryFormColumns.map((column: any) => {
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
                                sx={
                                  {
                                    // fontWeight: "bold !important",
                                    // color: "#1A1A1ACC",
                                  }
                                }
                              >
                                {/* {column.id === "action" ? ( // <ButtonBaseActiveInactiveStyle status={value} />
                                    <Grid className={classes.confirm}>
                                      <ButtonBase
                                        sx={{
                                          ...formButtonStyle.mainButtonStyle,
                                        }}
                                        onClick={openModal}
                                      >
                                        <CheckIcon sx={{ fontSize: "14px" }} />{" "}
                                        &nbsp;Confirm
                                      </ButtonBase>
                                    </Grid>
                                  ) : (
                                    value
                                  )} */}

                                {column.id === "status" ? (
                                  <ButtonBaseActiveInactiveStyle
                                    status={value}
                                  />
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
        <CustomPagination
          pagination={pagination}
          setPagination={setPagination}
        />
        {/* <Box className={classes.paginationBox} pl={2}>
          <Typography variant="h6" className={classes.paginationTypo}>
            Showing {page * rowsPerPage + 1} to{" "}
            {Math.min((page + 1) * rowsPerPage, socialHistoryData.length)} of{" "}
            {socialHistoryData.length} entries
          </Typography>
          <Pagination
            count={Math.ceil(socialHistoryData.length / rowsPerPage)}
            page={page + 1}
            onChange={(e, newPage) => handleChangePage(e, newPage - 1)}
            className={classes.pagination}
            classes={{ root: classes.root }}
            shape="rounded"
          />
        </Box> */}
      </>
    </div>
  );
};

export default SocialHitoryTable;
