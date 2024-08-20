import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const commonWidget = makeStyles(
    () => ({
        tableHeadRowContainer: {
            "& th": {
                backgroundColor: "#1A1A1A1A !important",
                // borderBottom: "none",
                fontSize: "16px",
                fontWeight: "500",
                padding: "10px 10px !important",
            },

            "& td": {
                padding: "10px !important",
                fontSize: "0.875rem",
            },
        },
    }))

const columns: any[] = [
    { id: 'a', label: 'A', minWidth: 20 },
    { id: 'b', label: 'B', minWidth: 20 },
    { id: 'c', label: 'C', minWidth: 20 },
    { id: 'd', label: 'D', minWidth: 20 },
    { id: 'e', label: 'E', minWidth: 20 }
]

const tableRows: any[] = [
    ['First Name', 'Last Name', 'Gender', 'Date Of Birth', 'Age'],
    ['Henna', 'West', 'Female', '14-07-1965', '65']
]

export default function TemplateTable() {

    const commonStyles = commonWidget();

    return (
        <TableContainer>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow className={commonStyles.tableHeadRowContainer}>
                        {columns.map((column: any) => (
                            <TableCell
                                key={column.id}
                                align="center"
                                style={{
                                    padding: "10px",
                                    minWidth: column.minWidth,
                                }}
                            >
                                <Typography
                                    variant="h5"
                                >
                                    {column.label}
                                </Typography>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody className={commonStyles.tableHeadRowContainer}>
                    {tableRows.map((row: any[], index: any) => {
                        return (
                            <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={index}
                            >
                                {row.map((column: any) => {
                                    return (
                                        <TableCell
                                            key={column}
                                            align="center"
                                            sx={{
                                                padding: "8px",
                                                color: "#1A1A1ACC !important"
                                            }}
                                        >
                                            <Typography variant="h5">
                                                {column || "-"}
                                            </Typography>
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}