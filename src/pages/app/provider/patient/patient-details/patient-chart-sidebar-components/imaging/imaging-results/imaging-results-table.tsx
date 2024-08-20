import {
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
import { useEffect, useState } from "react";
import Loading from "../../../../../../../../components/common/spinner/loading";
import { PatientImageResultControllerService } from "../../../../../../../../sdk/thinkemr-core-0.0.1/requests";
import { commonWidget } from "../../../../../../../../styles/common";
import { PatientData } from "../../diagnoses";
import { tableStyle } from "../../history/past-medical-history/past-medical-history-table";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddEditResult from "./add-edit-result";

export const imageOrderColumns = [
  { id: "test", label: "Test", minWidth: 200 },
  { id: "lab", label: "Lab", minWidth: 200 },
  { id: "reviewer", label: "Reviwer", minWidth: 250 },
  { id: "results", label: "Results", minWidth: 200 },
  { id: "date", label: "Received Date", minWidth: 100 },
  { id: "interpretation", label: "Interpretation", minWidth: 50 },
  { id: "action", label: "", minWidth: 50 },
];

function ImagingOrderResultTable(props: PatientData) {
  const classes = tableStyle();
  const commonStyles = commonWidget();
  const [imageOrderList, setImageOrderList] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openEditResult, setOpenEditResult] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  useEffect(() => {
    setIsLoading(true);
    getOrderSetList();
  }, [props]);

  const getOrderSetList = async () => {
    const list =
      await PatientImageResultControllerService.getPatientsImageResults(
        props.patientData.uuid
      );
    if (list) {
      setIsLoading(false);
      const newRows = list?.data?.content?.map((data: any) => {
        return {
          id: data.id,
          uuid: data.uuid,
          test: data.testName,
          lab: data.instructions,
          reviewer: `${data?.reviewer?.firstName} ${data?.reviewer?.lastName}`,
          date: data.recordedDate,
          interpretation: data.interpretation,
          uploadOption: data.uploadOption,
          recordedTime: data.recordedTime,
          imageType: data.imageType,
          note: data.note,
          recordedDate: data.recordedDate,
        };
      });
      setImageOrderList(newRows);
    }
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAction = () => {
    setAnchorEl(null);
  };

  const EditImageResult = (e: any) => {
    setOpenEditResult(true);
    setEditData(imageOrderList[e.target.value]);
  };

  return (
    <div>
      <Grid container p={2} pb={0}>
        <Grid item mt={1} xs={12}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {imageOrderColumns.map((column: any) => (
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
                {imageOrderList?.map((row: any, index: any) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {imageOrderColumns.map((column: any) => {
                        const value = row[column.id];

                        return (
                          <TableCell
                            key={column.id}
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
                                    <MenuItem>Review</MenuItem>
                                    <MenuItem
                                      onClick={(index) =>
                                        EditImageResult(index)
                                      }
                                    >
                                      Edit Image Result
                                    </MenuItem>
                                    <MenuItem>Export as PDF</MenuItem>
                                    <MenuItem>Fax</MenuItem>
                                    <MenuItem>Delete</MenuItem>
                                  </Menu>
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
            {imageOrderList?.length == 0 ? (
              <div className={commonStyles.noDataMsg}>No Data Available</div>
            ) : null}
          </TableContainer>
        </Grid>
      </Grid>
      {openEditResult && (
        <AddEditResult
          open={openEditResult}
          onClose={() => setOpenEditResult(false)}
          title="Edit Image Order"
          patientData={props.patientData}
          editData={editData}
        />
      )}
    </div>
  );
}

export default ImagingOrderResultTable;
