import {
  Box,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  actionBtns,
  commonWidget,
  formButtonStyle,
} from "../../../../../../../../../styles/common";
import { style, tableUseStyles } from "../common-widget";
import { useCustomFormControllerServiceGetAllCustomForms } from "../../../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Loading from "../../../../../../../../../components/common/spinner/loading";
import Loader from "../../../../../../../../../components/common/spinner/loader";
import CustomPagination from "../../../../../../../../../components/common/pagination";
import { PaginationState } from "../../../../../../../../../components/common/enums-and-interfaces/interfaces";
import customFormDialog from "./duplicate-form-dialog";
import CustomFormDialog from "./duplicate-form-dialog";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import { Form } from "react-formio";
import CustomForm from "./CustomForm";
import moment from "moment";

export interface Column {
  id: string;
  label: string | JSX.Element;
  minWidth?: number;
  width?: string;
}

const columns = [
  { id: "title", label: "Title", minWidth: 80 },
  { id: "speciality", label: "Specialities", minWidth: 150 },
  { id: "created", label: "Created By", minWidth: 150 },
  { id: "modified", label: "Updated Date", minWidth: 150 },
  { id: "action", label: "Action", minWidth: 150 },
];

interface intakeTableProps {
  callFromDialog: any;
}

const IntakeFormTable = (props: intakeTableProps) => {
  const { callFromDialog } = props;
  const [customSelection, setCustomSelection] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const commonStyles = commonWidget();
  const classes = tableUseStyles();
  const userDetails = useSelector(
    (state: any) => state.commonReducer.userDetail
  );
  const [intakeTabData, setIntakeTabData] = useState<any[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [rowForDuplicate, setRowForDuplicate] = useState<any>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openPreview, setOpenPreview] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>();
  const [previewJson, setPreviewJson] = useState<any>();
  const [pagination, setPagination] = useState<PaginationState>({
    page: 0,
    size: 10,
    searchString: "",
    sortBy: "created",
    sortDirection: "desc",
    status: true,
    totalPages: 0,
    totalElements: 0,
  });
  const open = Boolean(anchorEl);
  const { data: intakeFormData, refetch: RefetchInkateApi } =
    useCustomFormControllerServiceGetAllCustomForms({
      type: "INTAKE_FORM",
      providerGroupUuid: userDetails?.data?.providerGroup,
      ...pagination,
    });

  useEffect(() => {
    setCustomSelection((item) => !item);
  }, [callFromDialog]);

  useEffect(() => {
    if (userDetails?.data?.providerGroup) {
      setIntakeTabData(intakeFormData && intakeFormData?.data?.content);
      setPagination({
        ...pagination,
        totalElements: intakeFormData?.data?.totalElements,
        totalPages: intakeFormData?.data?.totalPages,
      });
      setIsLoading((item) => !item);
    }
  }, [intakeFormData, pagination.page, pagination.size, customSelection]);

  const handleClick = (event: any, index: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
  };

  const CallingIntakeForm = () => {
    RefetchInkateApi();
  };

  useEffect(() => {
    CallingIntakeForm();
  }, [!callFromDialog]);

  const handleDuplicateClick = () => {
    setSelectedRow(intakeTabData?.[selectedIndex])
    setOpenDialog((item) => !item);
    setAnchorEl(null);
  };

  const handleClickPreview = () => {
    setSelectedRow(intakeTabData?.[selectedIndex]);
    setOpenPreview((item) => !item);
    setAnchorEl(null)
  };

  useEffect(() => {
    if (selectedRow) {
      const convertedString = JSON.stringify(selectedRow?.content);
      const convertedJson = JSON.parse(convertedString);
      const createForm = {
        display: "form",
        components: convertedJson?.components,
      };
      setPreviewJson(createForm);
    }
  }, [selectedRow]);

  const callingBack = () => {
    setCustomSelection((item) => !item);
    RefetchInkateApi();
  };

  return (
    <>
      <Grid container pt={1} pb={0}>
        <Grid item mt={1} xs={12}>
          {!customSelection && (
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow className={commonStyles.tableHeadRowContainer}>
                    {columns.map((column: any) => (
                      <TableCell
                        key={column.id}
                        // className={classes.tableHeader}
                        className={classes.tableHeaderCell}
                        style={{
                          padding: "10px",
                          minWidth: column.minWidth,
                        }}
                        align={column.id === "action" ? "center" : "left"}
                      >
                        <Typography
                          variant="h5"
                          // className={classes.tableHeaderText}
                          className={classes.TabelheadingTypo}
                        >
                          {column.label}
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {intakeTabData?.map((row: any, index) => {
                    return (
                      <TableRow
                        key={index}
                        className={classes.tableBodyRow}
                        hover
                      >
                        {columns?.map((column) => (
                          <TableCell
                            key={column.id}
                            className={classes.tableRowCell}
                          >
                            {column.id === "title" ? (
                              <Box>
                                <Typography
                                  variant="h5"
                                  sx={{ color: "#000000" }}
                                >
                                  {row["title"]}
                                </Typography>
                              </Box>
                            ) : column.id === "speciality" ? (
                              <Box>
                                <Typography
                                  variant="h5"
                                  sx={{ color: "#000000" }}
                                >
                                  {row["speciality"].name}
                                </Typography>
                              </Box>
                            ) : column.id === "created" ? (
                              <Box>
                                <Typography
                                  variant="h5"
                                  sx={{ color: "#000000" }}
                                >
                                  {row["created"]}
                                </Typography>
                              </Box>
                            ) : column.id === "modified" ? (
                              <Box>
                                <Typography
                                  variant="h5"
                                  sx={{ color: "#000000" }}
                                >
                                  {moment(row["modified"]).format("MM-DD-YYYY")}
                                </Typography>
                              </Box>
                            ) : column.id === "action" ? (
                              <Grid container
                              justifyContent={"center"}>
                                <MoreVertIcon
                                  sx={{ cursor: "pointer", width: "6vw" }}
                                  onClick={(e) => {
                                    handleClick(e, index);
                                  }}
                                />
                                <Menu
                                  id="basic-menu"
                                  anchorEl={anchorEl}
                                  open={open}
                                  onClose={() => setAnchorEl(null)}
                                  MenuListProps={{
                                    "aria-labelledby": "basic-button",
                                  }}
                                  sx={{
                                    "& .css-3dzjca-MuiPaper-root-MuiPopover-paper-MuiMenu-paper":
                                      {
                                        boxShadow:
                                          "0px 1px 3px 0px rgba(0,0,0,0.1)",
                                      },
                                  }}
                                >
                                  <MenuItem
                                    onClick={handleClickPreview}
                                  >
                                    Preview
                                  </MenuItem>
                                  <MenuItem onClick={handleDuplicateClick}>
                                    Duplicate
                                  </MenuItem>
                                </Menu>
                              </Grid>
                            ) : (
                              ""
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              {!intakeTabData && <Loading />}
              {intakeTabData?.length === 0 && (
                <Grid
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "10px",
                  }}
                >
                  <Typography variant="h5">No Data Found</Typography>
                </Grid>
              )}
            </TableContainer>
          )}
          {customSelection && <CustomForm callingBack={callingBack} />}
          {!customSelection && (
            <CustomPagination
              pagination={pagination}
              setPagination={setPagination}
            />
          )}
        </Grid>
      </Grid>
      <Grid>
        <CustomFormDialog
          open={openDialog}
          handleClose={handleDuplicateClick}
          dialogTitle="Make a Copy"
          rowData={selectedRow}
          calledIntakeTable={CallingIntakeForm}
        />
      </Grid>
      <Grid>
        <Dialog
          open={openPreview}
          onClose={() => setOpenPreview(false)}
          scroll="paper"
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          maxWidth="md"
          fullWidth
        >
          <DialogTitle
            sx={{ display: "flex", justifyContent: "space-between" }}
            id="scroll-dialog-title"
          >
            <Typography variant="h3">{selectedRow?.title}</Typography>
            <div>
              <CloseIcon
                onClick={() => setOpenPreview(false)}
                sx={{ cursor: "pointer" }}
              />
            </div>
          </DialogTitle>
          <DialogContent>
            <Form form={previewJson} />
          </DialogContent>
          <DialogActions sx={actionBtns}>
            <ButtonBase
              onClick={() => setOpenPreview(false)}
              sx={{ ...formButtonStyle.saveButtonStyle, cursor: "pointer" }}
            >
              <Typography color={"#fff"}>{"Close"}</Typography>
            </ButtonBase>
          </DialogActions>
        </Dialog>
      </Grid>
    </>
  );
};

export default IntakeFormTable;
