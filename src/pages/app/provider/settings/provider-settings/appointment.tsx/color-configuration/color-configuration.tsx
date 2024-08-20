import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  CssBaseline,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { useState } from "react";
import { adminTable } from "../../../../../../../components/core/layout/table/adminTable";
import { patientStyle } from "../../../../patient/style/commonStyle";
import { Column, Row } from "../../../../referral/referral-table";
import EditColorConfiguration from "./edit-color-configuration";

export const colorConfigurationColumns: Column[] = [
  { id: "appointmentName", label: "Appointment Name", minWidth: 100 },
  { id: "colorCode", label: "Color", minWidth: 120 },
  { id: "upadtedDate", label: "Updated Date", minWidth: 120 },
  { id: "updatedBy", label: "Updated By", minWidth: 100 },
  { id: "edit", label: "Edit", minWidth: 100 },
];

function ColorConfiguration() {
  const classes = adminTable();
  const style = patientStyle();
  const [editColor, setEditColor] = useState(false);
  const [colorConfigData] = useState<Row[]>([
    {
      appointmentName: "Confirmed",
      colorCode: "#01C019",
      upadtedDate: "10-07-2022",
      updatedBy: "Robert Hernandez",
    },
  ]);

  return (
    <Grid>
      <CssBaseline />
      <Grid item xs={12} p={1} mt={1}>
        <TableContainer
          sx={{
            width: "100%",
          }}
        >
          <Grid sx={{ maxHeight: "600px !important" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {colorConfigurationColumns.map((column) => (
                    <TableCell
                      key={column.id}
                      sx={{
                        padding: "10px 5px !important",
                        backgroundColor: "#E7E7E7 !important",
                      }}
                      style={{ maxWidth: column.minWidth }}
                      align={column.id === "details" ? "center" : "left"}
                      className={classes.tableHeader}
                    >
                      <Grid container alignItems="center">
                        <Grid item>{column.label}</Grid>
                      </Grid>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody
                sx={{ background: "#fff", maxHeight: "500px !important" }}
              >
                {colorConfigData.map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {colorConfigurationColumns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            className={style.tableCell}
                          >
                            {column.id == "edit" ? (
                              <EditOutlinedIcon sx={{ color: "#1A1A1A80" ,cursor:"pointer"}} onClick={()=>setEditColor(true)}/>
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Grid>
        </TableContainer>
      </Grid>
      {editColor && (
        <EditColorConfiguration
          title="Edit Color Configuration"
          source="Add"
          open={editColor}
          setOpen={setEditColor}
        />
      )}
    </Grid>
  );
}

export default ColorConfiguration;
