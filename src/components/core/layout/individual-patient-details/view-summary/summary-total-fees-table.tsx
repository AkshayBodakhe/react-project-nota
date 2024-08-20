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
          date: "13-06-2022",
          pos: "-",
          service: "70950",
          dx: "2",
          description: "Psychotherapy,45 min",
          units: "1",
          fee: "$100",
          paid: "$100",
        },
        {
          id: 2,
          date: "13-06-2022",
          pos: "-",
          service: "70950",
          dx: "2",
          description: "Psychotherapy,45 min",
          units: "1",
          fee: "$100",
          paid: "$0",
        },
        {
          id: 3,
          date: "13-06-2022",
          pos: "02",
          service: "56862",
          dx: "1",
          description: "Psychotherapy,45 min",
          units: "1",
          fee: "$100",
          paid: "$0",
        },
        {
          id: 4,
          date: "13-06-2022",
          pos: "02",
          service: "47952",
          dx: "1",
          description: "Psychotherapy,45 min",
          units: "1",
          fee: "$20",
          paid: "$0",
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
  date: string;
  pos: string;
  service: string;
  dx: string;
  description: string;
  units: string;
  fee: string;
  paid: string;
  [key: string]: string | JSX.Element;
}

const columns: Column[] = [
  {
    id: "date",
    label: "Date",
    minWidth: 100,
    displaySort: true,
  },
  {
    id: "pos",
    label: "POS",
    minWidth: 100,
    displaySort: true,
  },
  { id: "service", label: "service", minWidth: 100, displaySort: true },
  {
    id: "dx",
    label: "DX",
    minWidth: 100,
    displaySort: true,
  },
  {
    id: "description",
    label: "Description",
    minWidth: 100,
    displaySort: true,
  },
  {
    id: "units",
    label: "Units",
    minWidth: 100,
    displaySort: true,
  },
  {
    id: "fee",
    label: "Fee",
    minWidth: 100,
    displaySort: true,
  },
  {
    id: "paid",
    label: "Paid",
    minWidth: 100,
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
  date: string,
  pos: string,
  service: string,
  dx: string,
  description: string,
  units: string,
  fee: string,
  paid: string
): Row {
  return {
    date,
    pos,
    service,
    dx,
    description,
    units,
    fee,
    paid,
  };
}

export default function TotalFeeTable() {
  const classes = commontableWidget();
  const [providerGroupList, setProviderGroupList] = useState([]);

  useEffect(() => {
    const newRows:any = mockProviderData.response.data.content.map(
      (providerGroup: any) => {
        return createData(
          providerGroup.date,
          providerGroup.pos,
          providerGroup.service,
          providerGroup.dx,
          providerGroup.description,
          providerGroup.units,
          providerGroup.fee,
          providerGroup.paid
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
