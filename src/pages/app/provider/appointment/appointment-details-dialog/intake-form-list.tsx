import { Close } from "@mui/icons-material";
import {
  Box,
  ButtonBase,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { tableUseStyles } from "../calendar/appointmentWithLocations";
import { Column } from "../../../../../components/common/enums-and-interfaces/interfaces";
import { useIntakeFormControllerServiceGetAllAppointmentIntakeForms } from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import { useEffect, useState } from "react";
import { statusColStyle } from "../../unsigned-visit/unsigned-visit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import ViewIntakeForm from "./view-Intake-form";

export const tabColumns: Column[] = [
  { id: "formName", label: "Form Name" },
  { id: "sendBy", label: "Send By" },
  { id: "sendOn", label: "Send On" },
  { id: "submittedOn", label: "Submitted On" },
  { id: "action", label: "Action" },
];

interface formListProps {
  open: boolean;
  onClose: any;
  apptInfo?: any;
}

const IntakeFormList = (props: formListProps) => {
  const { open, onClose, apptInfo } = props;
  const classes = tableUseStyles();
  const [formList, setFormList] = useState<any>();
  const [openForm, setOpenForm] = useState(false);
  const [rowData, setRowData] = useState<any>();

  const { data: formData } =
    useIntakeFormControllerServiceGetAllAppointmentIntakeForms({
      appointmentUuid: apptInfo?.appointmentUuid,
    });

  useEffect(() => {
    setFormList(formData && formData?.data?.content);
  }, [formData]);

  const handleOpenView = () => {
    setOpenForm((item) => !item);
  };

  const tableCol = tabColumns?.filter((item) =>
    apptInfo?.presentType === "VIRTUAL" ? item.id !== "action" : item
  );

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle
          id="scroll-dialog-title"
          sx={{
            background: "#F5F6F9",
            marginBottom: "15px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h3">{"Intake Form"}</Typography>
          <Close sx={{ cursor: "pointer" }} onClick={onClose} />
        </DialogTitle>
        <DialogContent>
          <Grid>
            <TableContainer
              component={Paper}
              className={classes.tableContainer}
              sx={{ maxHeight: "700px" }}
            >
              <TableHead>
                <TableRow className={classes.headingBackground}>
                  {tableCol.map((column) => (
                    <TableCell
                      key={column.id}
                      className={classes.tableHeaderCell}
                      sx={{ width: "250px" }}
                      // classes={{ root: classes.tableHeadCellRoot }}
                    >
                      <Typography
                        variant="h5"
                        className={classes.TabelheadingTypo}
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        {column.label}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {formList?.map((row: any, index: any) => {
                  return (
                    <TableRow
                      key={index}
                      className={classes.tableBodyRow}
                      hover
                    >
                      {tableCol?.map((column) => (
                        <TableCell
                          key={column.id}
                          className={classes.tableRowCell}
                          //classes={{ root: classes.tableHeadCellRoot }}
                        >
                          {column.id === "action" ? (
                            <Box
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <Grid
                                onClick={() => {
                                  handleOpenView(), onClose(), setRowData(row);
                                }}
                                sx={{ ...statusColStyle, width: "fit-content" }}
                              >
                                <RemoveRedEyeOutlinedIcon
                                  style={{ fontSize: "17px", color: "#2c57b3" }}
                                />
                                <Typography
                                  sx={{
                                    color: "#2c57b3",
                                    textDecorationColor: "#000000",
                                    cursor: "pointer",
                                  }}
                                >
                                  {"View"}
                                </Typography>
                              </Grid>
                            </Box>
                          ) : (
                            <Box>
                              <Typography
                                variant="h5"
                                noWrap={true}
                                className={classes.subAppoinmentInfo}
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                {row[column.id]}
                              </Typography>
                            </Box>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              </TableBody>
              {formList && formList.length === 0 && (
                <Grid container justifyContent={"center"} py={1}>
                  <Typography variant="h5">{"No records available"}</Typography>
                </Grid>
              )}
            </TableContainer>
          </Grid>
        </DialogContent>
      </Dialog>
      <Grid>
        <ViewIntakeForm
          open={openForm}
          onClose={handleOpenView}
          rowData={rowData}
        />
      </Grid>
    </>
  );
};

export default IntakeFormList;
