import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import theme from "../../../../theme";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import reports from "../../../../mock-data/reports.json";
import { getCustomStyle } from "../../../../styles/common";

interface Column {
    id: string;
    label: string;
    minWidth: number | "auto";
    displaySort?: boolean;
}

function createData(
    reportId: string,
    dateAndtime: string,
    patientName: string,
    status: string
): any {
    return {
        reportId,
        dateAndtime,
        patientName,
        status,
    };
}

const columns: Column[] = [
    { id: "reportId", label: "Sr.no", minWidth: 70, displaySort: true },
    { id: "dateAndtime", label: "Date & Time", minWidth: 100, displaySort: true },
    { id: "patientName", label: "Patient Name", minWidth: 100, displaySort: true },
    { id: "status", label: "Status", minWidth: 100, displaySort: true },
];

const commontableWidget = makeStyles(
    () => ({
        tableHeadRowContainer: {
            // backgroundColor: "#4C4C4C1A !important",

            "& th": {
                // color: "#1A1A1A",
                backgroundColor: "#DAEAF8 !important",
                borderBottom: "none",
                fontSize: "14px",
                fontWeight: "500",
                padding: "10px 10px !important",
            },

            "& td": {
                padding: "12px 12px !important",
            }
        }
    }),
    { defaultTheme: theme }
);

function ReportsTable() {
    const classes = commontableWidget();
    const [report, setReports] = useState<any>();

    useEffect(() => {
        const newRows: any = reports.data.content.map(
            (providerGroupLocationItem: any) => {
                return createData(
                    providerGroupLocationItem.reportId,
                    providerGroupLocationItem.dateAndtime,
                    providerGroupLocationItem.patientName,
                    providerGroupLocationItem.status
                );
            }
        );
        setReports(newRows);
    }, [reports]);

    return (
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
                                    align={getCustomStyle(column.id, 'dateAndtime') ? 'left' : 'center'}
                                >
                                    {column.label}{" "}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody className={classes.tableHeadRowContainer}>
                        {report && report.map((report: any) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={report?.id}>
                                    {columns.map((column) => {
                                        return (
                                            <TableCell
                                                key={column.id}
                                                // sx={sxs.tableBodycell}
                                                align={getCustomStyle(column.id, 'dateAndtime') ? 'left' : 'center'}
                                            >
                                                {report[column.id]}
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
    );
}

export { ReportsTable };
