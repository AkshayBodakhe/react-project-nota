import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";
import { commonWidget } from "../../../../../styles/common";
import { style } from "../master-table";
import Loading from "../../../../../components/common/spinner/loading";

type Props = {
    columns: any[];
    rows: any[];
    isLoading: boolean;
}

export default function ProviderDataTable(props: Props) {

    const { columns, rows, isLoading } = props;
    const classes = style();
    const commonStyles = commonWidget();

    return (
        <React.Fragment key={'ProviderDataTable'}>
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
                            <TableBody className={commonStyles.tableHeadRowContainer}>
                                {rows && !isLoading && rows?.map((row: any, index: any) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={index}
                                            sx={{ "&:nth-child(2)": { background: "#EAF4FF80" } }}
                                        >
                                            {columns.map((column: any) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        sx={{
                                                            padding: "8px",
                                                            color: "#1A1A1ACC !important",
                                                        }}
                                                    >
                                                        <Typography variant="h5">
                                                            {value || "-"}
                                                        </Typography>
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                        {isLoading && <Loading />}
                        {rows?.length === 0 && !isLoading ? (
                            <div className={commonStyles.noDataMsg}>No Data Available</div>
                        ) : null}
                    </TableContainer>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}