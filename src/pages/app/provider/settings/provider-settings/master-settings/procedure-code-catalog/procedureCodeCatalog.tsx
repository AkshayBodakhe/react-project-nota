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
import { commonWidget } from "../../../../../../../styles/common";
import { dataImportTab } from "../common-wdget/common-wdget";

export const columns = [
  { id: "cptCode", label: "CPT Code", minWidth: 150 },
  { id: "codeType", label: "Code Type", minWidth: 150 },
  { id: "description", label: "Description", minWidth: 150 },
  { id: "status", label: "Status", minWidth: 150 },
];

function ProcedureCodeCatalogTable() {
  const classes = dataImportTab();
  const commonStyles = commonWidget();

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

export default ProcedureCodeCatalogTable;
