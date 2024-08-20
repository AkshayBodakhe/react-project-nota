import { TableCell, TableHead, TableRow, Typography } from "@mui/material";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import { Column } from "../enums-and-interfaces/interfaces";
import { commonWidget } from "../../../styles/common";

type Props = {
  columns: Column[];
  isAdmin?: boolean;
};

const TableHeadComponent = (props: Props) => {
  const { columns, isAdmin } = props;
  const classes = commonWidget();

  return (
    <TableHead key={"TableHead"}>
      <TableRow
        className={
          isAdmin ? classes.tableHeadRow : classes.providerTableHeadRowContainer
        }
      >
        {columns.map((col: Column) => {
          return (
            <TableCell key={col.id} align={col.align ?? "left"}>
              {col.displaySort ? (
                <Typography className="table-head-column">
                  <span>{col.label}</span>
                  <SyncAltIcon className="sorting-arrow-icon" />
                </Typography>
              ) : (
                col.label
              )}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default TableHeadComponent;
