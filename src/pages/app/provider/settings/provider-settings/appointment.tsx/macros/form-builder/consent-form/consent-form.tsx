import {
  Grid,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { commonWidget } from "../../../../../../../../../styles/common";
import { style } from "../common-widget";

export interface Column {
  id: string;
  label: string | JSX.Element;
  minWidth?: number;
  width?: string;
}

const columns = [
  { id: "title", label: "Title", minWidth: 80 },
  { id: "owner", label: "Owner", minWidth: 80 },
  { id: "mandatory", label: "Mandatory", minWidth: 150 },
  { id: "assignedByDefault", label: "Assigned By Default", minWidth: 150 },
  { id: "action", label: "Action" },
];

const ConsentFormTable = () => {
  const commonStyles = commonWidget();
  const classes = style();
  return (
    <>
      <Grid container pt={1} pb={0}>
        <Grid item mt={1} xs={12}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow className={commonStyles.tableHeadRowContainer}>
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
};

export default ConsentFormTable;
