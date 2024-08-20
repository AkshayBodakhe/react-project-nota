import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Column } from "../medication";
import { tableStyle } from "../allergies/allergies-list";
import { usePaymentControllerServiceGetPaymentHistory } from "../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { useEffect, useState } from "react";
import Loading from "../../../../../../../components/common/spinner/loading";
import CustomPagination from "../../../../../../../components/common/pagination";
import { PaginationState } from "../../../../../../../components/common/enums-and-interfaces/interfaces";
import moment from "moment";
import { formatDate } from "../../../../../../../components/common/enums-and-interfaces/common-functions";

interface cardHistoryProps {
  patientData?: any;
}

export const columns: Column[] = [
  { id: "appointmentDate", label: "Appointment Date" },
  { id: "transactionDate", label: "Transaction Date" },
  { id: "txId", label: "Transaction ID" },
  { id: "provider", label: "Provider Name" },
  { id: "txAmount", label: "Transaction Amount" },
  { id: "paymentMode", label: "Payment Mode" },
  { id: "status", label: "Transaction Status" },
];

const CardHistoryList = (props: cardHistoryProps) => {
  const { patientData } = props;
  const classes = tableStyle();
  const [cardHistory, setCardHistory] = useState<any>();
  const [pagination, setPagination] = useState<PaginationState>({
    page: 0,
    size: 10,
    searchString: "",
    sortBy: "created",
    sortDirection: "desc",
    status: true,
    totalPages: 0,
    totalElements: 0,
  });
  const { data: cardHistoryData } =
    usePaymentControllerServiceGetPaymentHistory({
      patientUuid: patientData?.uuid,
      // ...pagination,
      // startDate:"",
      // endDate: "",
      page: pagination.page,
      size: pagination.size,
      sort: ["created,desc"],
    });

  useEffect(() => {
    setCardHistory(cardHistoryData && cardHistoryData?.data?.content);
    setPagination({
      ...pagination,
      totalElements: cardHistoryData?.data?.totalElements,
      totalPages: cardHistoryData?.data?.totalPages,
    });
  }, [cardHistoryData]);

  return (
    <>
      <Grid container justifyContent={"center"} mt={3}>
        <TableContainer
          component={Paper}
          // className={classes.tableContainer}
          sx={{ maxHeight: "500px" }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow
              // className={classes.headingBackground}
              >
                {columns.map((column) => (
                  <TableCell
                    align={"center"}
                    key={column.id}
                    className={classes.tableHeader}
                    style={{
                      padding: "10px",
                      minWidth: column.minWidth,
                    }}
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
            <TableBody>
              {cardHistory &&
                cardHistory.map((row: any, index: any) => {
                  return (
                    <TableRow key={index} hover>
                      {columns.map((column) => (
                        <TableCell key={column.id} align={"center"}>
                          {column.id === "appointmentDate" ? (
                            <Box>
                              <Typography
                                variant="h5"
                                sx={{ color: "#000000" }}
                              >
                                {formatDate(
                                  row["appointmentId"].appointmentDate
                                )}
                              </Typography>
                            </Box>
                          ) : column.id === "transactionDate" ? (
                            <Box>
                              <Typography
                                variant="h5"
                                sx={{ color: "#000000" }}
                              >
                                {moment(row["transactionDate"]).format(
                                  "YYYY-MM-DD"
                                )}
                              </Typography>
                            </Box>
                          ) : column.id === "provider" ? (
                            <Box>
                              <Typography
                                variant="h5"
                                sx={{ color: "#000000" }}
                              >
                                {row["appointmentId"].provider}
                              </Typography>
                            </Box>
                          ) : (
                            <Box>
                              <Typography
                                variant="h5"
                                sx={{ color: "#000000" }}
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
          </Table>
        </TableContainer>
        {cardHistory && cardHistory.length === 0 && (
          <Typography p={1}>{"No data available!"}</Typography>
        )}
        {!cardHistory && (
          <Grid container justifyContent={"center"}>
            <Loading />
          </Grid>
        )}
        <Grid xs={12} mt={1}>
          <CustomPagination
            pagination={pagination}
            setPagination={setPagination}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CardHistoryList;
