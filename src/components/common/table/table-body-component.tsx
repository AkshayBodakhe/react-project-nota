import { commonWidget } from "../../../styles/common";
import { Box, TableBody, TableCell, TableRow } from "@mui/material";
import { Column } from "../enums-and-interfaces/interfaces";
import Action from "./action";
import Status from "./status";
import { formatDate } from "../enums-and-interfaces/common-functions";

const sxs = {
  iconArrowWort: {
    marginBottom: "-2px",
    // marginTop: '6px',
    fontSize: "14px",
    transform: "rotate(90deg)",
    color: "#4C4C4CCC",
    cursor: "pointer",
    // marginLeft: '2px',
  },
  tableBodycell: {
    // color: "#1A1A1A80",
    fontSize: "0.875rem",
    fontWeight: "600",
    padding: "5px 10px !important",
    color: "#1A1A1ACC !important",
  },
};

type Props = {
  tableData: any[];
  columns: Column[];
  handleStatusChange: any;
  handleActionClick: Function | undefined;
  navigateToChildren?: any;
  isAdmin?: boolean;
  options?: string[];
  isLoading: boolean;
};

const TableBodyComponent = (props: Props) => {
  const {
    tableData,
    columns,
    handleStatusChange,
    handleActionClick,
    navigateToChildren,
    isAdmin,
    options,
    isLoading,
  } = props;

  const classes = commonWidget();

  return (
    <TableBody
      key={"TableBody"}
      className={
        isAdmin
          ? classes.tableHeadRowContainer
          : classes.providerTableHeadRowContainer
      }
    >
      {!isLoading &&
        tableData?.length !== 0 &&
        tableData.map((data: any, i: number) => {
          return (
            <TableRow
              hover
              role="checkbox"
              tabIndex={-1}
              sx={{ background: i % 2 === 0 ? "" : "#EAF4FF80" }}
              key={data?.id}
            >
              {columns.map((col: Column, j: number) => {
                return (
                  <TableCell key={j} align={col.align} sx={sxs.tableBodycell}>
                    {(() => {
                      // Render the table row based on render method
                      if (col.render) {
                        return col.render(col, data, { columnName: col.id });
                      }
                      switch (col.id) {
                        case "action":
                          return (
                            <Action
                              key={j}
                              type={data[col.id]}
                              editData={data}
                              isDisabled={!data.active}
                              handleActionClick={handleActionClick}
                              options={options}
                            />
                          );
                        case "status":
                          return (
                            <Status
                              key={j}
                              editData={data}
                              type={data[col.id]}
                              status={data.active}
                              handleStatusChange={handleStatusChange}
                            />
                          );
                        case "name":
                          return (
                            <Box
                              sx={{ cursor: "pointer", color: "#0097F0" }}
                              onClick={() => navigateToChildren(data)}
                            >
                              {data[col.id]}
                            </Box>
                          );
                        case "address":
                          return (
                            <Box>
                              {`${data?.address?.line1}, ${data?.address?.line2}, ${data?.address?.city}, ${data?.address?.state}, ${data?.address?.country}`}
                            </Box>
                          );
                        case "assignTo":
                          return <Box>{data?.assignTo?.name}</Box>;
                        case "patientName":
                          return <Box>{data?.patientName?.name}</Box>;
                        case "patientCount":
                          return <Box>{data?.patientCount}</Box>;
                        case "dateTime":
                          return <Box>{formatDate(data[col.id])}</Box>;
                        default:
                          return <>{data[col.id] || "-"}</>;
                      }
                    })()}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
    </TableBody>
  );
};

export default TableBodyComponent;
