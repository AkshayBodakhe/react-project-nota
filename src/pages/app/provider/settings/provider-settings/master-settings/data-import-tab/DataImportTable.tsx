import SearchIcon from "@mui/icons-material/Search";
import {
  Grid,
  IconButton,
  InputBase,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { MigrationControllerService } from "../../../../../../../sdk/thinkemr-core-0.0.1/requests/services/MigrationControllerService";
import { commonWidget } from "../../../../../../../styles/common";
import { dataImportTab } from "../common-wdget/common-wdget";
import { setIsLoading } from "../constants/common-const";

export const columns = [
  { id: "entity", label: "Entity", minWidth: 150 },
  { id: "lastUpdatedDate", label: "Last Updated Date", minWidth: 150 },
  { id: "totalRecords", label: "Total Records", minWidth: 150 },
  { id: "action", label: "Action", minWidth: 80 },
];

function DataImportTable() {
  const classes = dataImportTab();
  const commonStyles = commonWidget();
  const [pendingData, setPendingData] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    callDataImport();
  }, []);

  const callDataImport = () => {
    setPendingData(true);
    let impData: any = [];
    try {
      const res = MigrationControllerService.getDataImportRecords(
        0,
        10,
        "created",
        "desc",
        ""
      );
    } catch {
    } finally {
      setPendingData(false);
    }
  };

  useEffect(() => {
    dispatch(setIsLoading(pendingData));
  }, [pendingData]);

  return (
    <>
      <Grid item xs={4} mt={2}>
        <Paper component="form" className={classes.paperSearch}>
          <InputBase
            style={{ fontSize: "14px" }}
            className={classes.inputBase}
            placeholder="Search here"
            // onChange={(e) => setSearchRecord(e.target.value)}
          />
          <IconButton
            type="button"
            className={classes.iconButton}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Grid>
      <Grid container pt={1} pb={0}>
        <Grid item mt={1} xs={12}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow className={commonStyles.tableHeadRowContainer}>
                  <TableCell
                    className={classes.tableHeader}
                    style={{
                      padding: "10px",
                      minWidth: "150px",
                    }}
                  >
                    <Typography
                      variant="h5"
                      className={classes.tableHeaderText}
                    >
                      {"No"}
                    </Typography>
                  </TableCell>
                  {columns.map((column: any) => (
                    <TableCell
                      key={column.id}
                      className={classes.tableHeader}
                      style={{
                        padding: "10px",
                        minWidth: column.minWidth,
                      }}
                      align={
                        column.id === "status" || column.id === "edit"
                          ? "center"
                          : "left"
                      }
                    >
                      <Typography
                        variant="h5"
                        className={classes.tableHeaderText}
                      >
                        {column.label}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}

export default DataImportTable;
