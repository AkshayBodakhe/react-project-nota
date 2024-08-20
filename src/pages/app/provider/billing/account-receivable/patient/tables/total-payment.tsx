import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { commonWidget } from "../../../../../../../styles/common";

const sxs = {
    tableBodycell: {
        fontSize: "0.875rem",
        padding: "12px !important",
    }
};

type Props = {
    columns: any[];
    data: any[];
}

function TotalPaymentRecevable(props: Props) {

    const classes = commonWidget();

    const [tableColumns, setTableColumns] = useState<any[]>([]);
    const [tableData, setTableData] = useState<any[]>([]);

    useEffect(() => {
        setTableColumns(props.columns);
        setTableData(props.data);
    }, [])

    return (
        <>
            <Paper
                sx={{
                    boxShadow: "none",
                    background: "white",
                }}
            >
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow className={classes.tableHeadRowContainer}>
                                {tableColumns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align="center"
                                        style={{ width: column.minWidth }}
                                    >
                                        {column.label}{" "}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData?.map((amount: any) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={amount?.id}
                                    >
                                        {tableColumns.map((column) => {
                                            if (column.id == "Total") {
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        sx={sxs.tableBodycell}
                                                        align="center"
                                                    >
                                                        {column.id}
                                                    </TableCell>
                                                );
                                            } else {
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        sx={sxs.tableBodycell}
                                                        align="center"
                                                    >
                                                        {amount[column.id]}
                                                    </TableCell>
                                                );
                                            }
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

export default TotalPaymentRecevable;
