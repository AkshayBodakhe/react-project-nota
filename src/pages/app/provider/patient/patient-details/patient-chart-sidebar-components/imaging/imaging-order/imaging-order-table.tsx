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
import { tableStyle } from "../../history/past-medical-history/past-medical-history-table";
import { PatientImageOrderControllerService } from "../../../../../../../../sdk/thinkemr-core-0.0.1/requests";
import { PatientData } from "../../diagnoses";
import Loading from "../../../../../../../../components/common/spinner/loading";
import { commonWidget } from "../../../../../../../../styles/common";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export const imageOrderColumns = [
  { id: "appointment", label: "Appointment", minWidth: 300 },
  { id: "tests", label: "Tests", minWidth: 300 },
  { id: "orderingProvider", label: "Ordering Provider", minWidth: 250 },
  { id: "recordedDate", label: "Recorded Date", minWidth: 200 },
  { id: "status", label: "Status", minWidth: 100 },
  { id: "action", label: "", minWidth: 50 },
];

function ImagingOrderTable(props: PatientData) {
  const classes = tableStyle();
  const commonStyles = commonWidget();
  const [imageOrderList, setImageOrderList] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  useEffect(() => {
    setIsLoading(true);
    getOrderSetList();
  }, [props]);

  const getOrderSetList = async () => {
    const list = await PatientImageOrderControllerService.getAllImageOrders(
      props.patientData.uuid
    );
    if (list) {
      setIsLoading(false);
      const newRows = list?.data?.content?.map((data: any) => {
        return {
          id: data.id,
          uuid: data.uuid,
          appointment: data.collectionDatetime,
          tests: data.instructions,
          orderingProvider: `${data?.orderingProvider?.firstName} ${data?.orderingProvider?.lastName}`,
          recordedDate: data.collectionDatetime,
          status: data.status,
        };
      });
      setImageOrderList(newRows);
    }
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAction = (_formType: string, _order: any) => {
    setAnchorEl(null);
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
                                    <MenuItem>Receive</MenuItem>
                                    <MenuItem>Add Result</MenuItem>
                                    <MenuItem>Edit Order</MenuItem>
                                    <MenuItem>Print Order</MenuItem>
                                    <MenuItem>Fax Order</MenuItem>
                                    <MenuItem>Mark As Completed</MenuItem>
                                    <MenuItem>Delete Order</MenuItem>
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
    </div>
  );
}

export default ImagingOrderTable;
