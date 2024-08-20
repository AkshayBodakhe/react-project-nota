import { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import { makeStyles } from "@mui/styles";
import theme from "../../../../../theme";

export const mockProviderData = {
  response: {
    data: {
      content: [
        {
          id: 1,
          medicine: "Mucinac 600 Effervescent",
          direction: "Take 1 tablet every 8 hours by oral route",
          sequence: "1-0-1",
          duration: "5 Days /10 Tablet",
        },
        {
          id: 2,
          medicine: "Augmentine 625 Duo Tablet",
          direction: "Take 1 tablet every 8 hours by oral route",
          sequence: "0-1-0",
          duration: "1 Week /21 Tablet",
        },
        {
          id: 3,
          medicine: "Amoxicillin 500mg tablet",
          direction: "Take 1 tablet every 8 hours by oral route",
          sequence: "0-0-1",
          duration: "1 Week /21 Tablet",
        },
      ],
    },
  },
};

interface Column {
  id: string;
  label: string;
  minWidth: number | "auto";
  displaySort: boolean;
}

interface Row {
  medicine: string;
  direction: string;
  sequence: string;
  duration: string;
  [key: string]: string | JSX.Element;
}

const columns: Column[] = [
  {
    id: "medicine",
    label: "Medicine",
    minWidth: 160,
    displaySort: true,
  },
  {
    id: "direction",
    label: "Directions",
    minWidth: 175,
    displaySort: true,
  },
  { id: "sequence", label: "Sequence", minWidth: 100, displaySort: true },
  {
    id: "duration",
    label: "Duration/Order Qty",
    minWidth: 120,
    displaySort: true,
  },
];

const commontableWidget = makeStyles(
  () => ({
    tableHeadRowContainer: {
      backgroundColor: "#4C4C4C1A !important",

      "& th": {
        color: "#1A1A1A",
        backgroundColor: "#4C4C4C1A !important",
        borderBottom: "none",
        fontSize: "14px",
        fontWeight: "500",
        padding: "10px 10px !important",
      },
    },
    tablePagination: {
      marginTop: "-20x !important",
      border: "none !important",
    },
  }),
  { defaultTheme: theme }
);

const sxs = {
  iconArrowWort: {
    marginBottom: "-2px",
    fontSize: "14px",
    transform: "rotate(90deg)",
    color: "#4C4C4CCC",
    cursor: "pointer",
  },
  tableBodycell: {
    color: "#1A1A1A80",
    fontSize: "16px",
    padding: "5px 10px !important",
    cursor: "pointer",
  },
};

function createData(
  medicine: string,
  direction: string,
  sequence: string,
  duration: string
): Row {
  return {
    medicine,
    direction,
    sequence,
    duration,
  };
}

export default function MedicineInfoTable() {
  const classes = commontableWidget();

  const [providerGroupList, setProviderGroupList] = useState([]);

  useEffect(() => {
    const newRows:any = mockProviderData.response.data.content.map(
      (providerGroup: any) => {
        return createData(
          providerGroup.medicine,
          providerGroup.direction,
          providerGroup.sequence,
          providerGroup.duration
        );
      }
    );
    setProviderGroupList(newRows);
  }, [providerGroupList.length]);

  return (
    <>
      <Paper
        sx={{
          boxShadow: "none",
        }}
      >
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow className={classes.tableHeadRowContainer}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}{" "}
                    {column.displaySort && (
                      <SyncAltIcon sx={sxs.iconArrowWort} />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {providerGroupList?.map((providerGroup: any) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={providerGroup?.id}
                  >
                    {columns.map((column) => {
                      return (
                        <TableCell
                          key={column.id}
                          sx={sxs.tableBodycell}
                          align="left"
                          style={{ cursor: "default", borderBottom: "none" }}
                        >
                          {providerGroup[column.id]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}