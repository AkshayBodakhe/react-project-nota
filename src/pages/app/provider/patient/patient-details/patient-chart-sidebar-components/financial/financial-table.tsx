import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { commonWidget, getCustomStyle } from "../../../../../../../styles/common";
import { tableStyle } from "../allergies/allergies-list";
import Loading from "../../../../../../../components/common/spinner/loading";

const cols: any[] = [
    { id: 'balance', label: 'Balance', minWidth: 100 },
    { id: 'total', label: 'Total', minWidth: 100 },
    { id: 'unpaidCredit', label: 'Unpaid Credit', minWidth: 100 },
    { id: 'unbilled', label: 'Unbilled', minWidth: 100 },
    { id: 'current', label: 'Current', minWidth: 100 },
    { id: '30Days', label: '> 30 Days', minWidth: 100 },
    { id: '60Days', label: '> 60 Days', minWidth: 100 },
    { id: '90Days', label: '> 90 Days', minWidth: 100 },
    { id: '120Days', label: '> 120 Days', minWidth: 100 }
]

type Props = {
    patientData: any;
    tableData: any[];
    pagination: any;
    setPagination: any;
    isLoading: boolean;
    refetch: any;
}

function FinancialTable(props: Props) {

    const classes = tableStyle();
    const commomClasses = commonWidget();
    const [tableData, setTableData] = useState<any[]>([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        if (props.tableData) {
            const newRows = props.tableData.map((bill: any) => {
                return {
                    balance: bill.balance,
                    total: bill.total,
                    unpaidCredit: bill.unpaidCredit,
                    unbilled: bill.unbilled,
                    current: bill.current,
                    '30Days': '',
                    '60Days': '',
                    '90Days': '',
                    '120Days': ''
                }
            })
            setTableData(newRows);
        }
    }, [props.tableData])

    const handleChangeRowsPerPage = () => {
        setRowsPerPage(20);
    }

    const handleChangePage = (_event: any, newPage: number) => {
        props.setPagination((prev: any) => ({
            ...prev,
            page: newPage
        }));
    };

    return (
        <React.Fragment key={'FinancialTable'}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow className={commomClasses.tableHeadRowContainer}>
                            {cols.map((column: any) => (
                                <TableCell
                                    key={column.id}
                                    className={classes.tableHeader}
                                    align={getCustomStyle(column.id, 'balance') ? 'left' : 'center'}
                                    style={{
                                        padding: "10px",
                                        minWidth: column.minWidth,
                                    }}
                                >
                                    <Typography
                                        variant="h4"
                                        className={classes.tableHeaderText}
                                    >
                                        {column.label}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody className={commomClasses.tableHeadRowContainer}>
                        {tableData && !props.isLoading && tableData.map((row: any, index: any) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                    {cols.map((column: any) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell
                                                key={column.id}
                                                align={getCustomStyle(column.id, 'balance') ? 'left' : 'center'}
                                                sx={{
                                                    padding: "8px",
                                                }}
                                            >
                                                <Typography variant="h5">
                                                    {column.id === 'balance' ? (
                                                        <Typography
                                                            variant="h4"
                                                        >
                                                            {value}
                                                        </Typography>
                                                    ) : (
                                                        value || '-'
                                                    )}
                                                </Typography>
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                {props.isLoading && <Loading />}
                {props.tableData?.length === 0 && !props.isLoading && (
                    <div className={commomClasses.noDataMsg}>No Data Available</div>
                )}
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={props.pagination.totalElements}
                rowsPerPage={rowsPerPage}
                page={props.pagination.page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </React.Fragment>
    )
}

export default FinancialTable;