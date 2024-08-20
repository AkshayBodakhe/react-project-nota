import { Box, Button, InputAdornment, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { formButtonStyle, getCustomStyle } from "../../../styles/common";
import SearchIcon from "@mui/icons-material/Search";
import { makeStyles } from "@mui/styles";
// import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const commonPorviderGroupWidget = makeStyles(() => ({
    searchBoxWidth: {
        width: "24rem",
        background: "white",
        "@media (max-width: 820px)": {
            width: "100% !important",
        },
        "@media (max-width: 768px)": {
            width: "100% !important",
        },
    },
    AddressFormLongtInputField2: {
        borderRadius: "5px",
        border: "none",
        "& fieldset": { border: "none" },
        boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
        height: "38px",
        textAlign: "center",
        padding: "13px 0px 10px 16px",
        fontSize: "16px",
        alignItems: "center",
        "& input::placeholder": {
            alignItems: "center",
            fontSize: "12.5px",
        },
        "@media (max-width: 820px)": {
            width: "100%",
        },
        "@media (max-width: 768px)": {
            width: "100%",
        },
    },
    inputBoxText2: {
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontSize: "14px !important",
        lineHeight: "140%",
        color: "",
        width: "100%",
        resize: "vertical",
        minHeight: "15px",
    },
    inputBoxActive2: {
        background: "#FFFFFF 0% no-repeat padding-box !important",
        boxShadow: "0px 0px 6px #00418602 !important",
        border: "1px solid #36588C!important",
        borderRadius: "4px !important",
    },
    addButtonTypo: {
        color: "#36588C !important",
        display: "flex",
        // paddingLeft: "12px",
        paddingRight: "12px",
        opacity: 0.7,
    },
    tableHeadRowContainer: {
        // backgroundColor: "#4C4C4C1A !important",

        "& th": {
            // color: "#1A1A1A",
            //   backgroundColor: "#DAEAF8 !important",
            //   borderBottom: "none",
            fontSize: "14px",
            fontWeight: "500",
            padding: "10px 10px !important",
        },

        "& td": {
            padding: "8px 8px !important",
        }
    }
}));

// interface Row {
//     srno: string;
//     code: string;
//     modifier: string;
//     diagnosisPointer: string;
//     quantity: string;
//     charges: string;
//     discount: string;
//     tax: string;
//     net: string;
//     // action: JSX.Element;
// }

// function createData(
//     srno: string,
//     code: string,
//     modifier: string,
//     diagnosisPointer: string,
//     quantity: string,
//     charges: string,
//     discount: string,
//     tax: string,
//     net: string,
//     // action: JSX.Element
// ): Row {
//     return {
//         srno,
//         code,
//         modifier,
//         diagnosisPointer,
//         quantity,
//         charges,
//         discount,
//         tax,
//         net,
//         // action,
//     };
// }

type props = {
    columns: any[];
    showAddButton: boolean;
    searchPlaceHolder?: string;
    data?: any[]
}

function AddCodesTable({ columns, showAddButton, searchPlaceHolder, data }: props) {

    const classes = commonPorviderGroupWidget();
    const [tableData, setTableData] = useState<any[]>([]);

    const addNewRow = () => {
        const newRow = {
            srno: tableData.length + 1,
            code: tableData.length + 1 * 164 * 69
        };
        setTableData(prevState => [...prevState, newRow]);
    }

    const handleDeleteRow = (indexToRemove: any) => {
        tableData.splice(indexToRemove, 1);
        const newData = tableData.filter((data, index) => {
            if (index >= indexToRemove) {
                data.srno--;
                return data;
            }
            return data;
        });
        setTableData(newData);
    }

    useEffect(() => {
        if (data) {
            setTableData(data);
        }
    }, [])

    return (
        <>
            {showAddButton && <Box sx={{ width: '30rem', display: 'flex', justifyContent: 'space-between' }}>
                <InputBase
                    fullWidth
                    sx={{ width: '20rem' }}
                    classes={{
                        root: classes.AddressFormLongtInputField2,
                        input: classes.inputBoxText2,
                        focused: classes.inputBoxActive2,
                    }}
                    placeholder={searchPlaceHolder}
                    endAdornment={
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    }
                />
                <Button sx={{ ...formButtonStyle.mainButtonStyle, background: '#36598C', color: 'white', "&:hover": { background: '#36588C' } }} onClick={addNewRow} >Add</Button>
            </Box>}
            <Paper sx={{ boxShadow: "none", maxHeight: '220px', overflowY: 'scroll', width: '100%' }}
            >
                <TableContainer
                    sx={{
                        width: "100% !important",
                        maxHeight: 700,
                    }}
                >
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow className={classes.tableHeadRowContainer}>
                                {columns.map((column: any) => (
                                    <TableCell
                                        key={column.id}
                                        // className={classes.tableHeader}
                                        style={{
                                            // minWidth: column.minWidth,
                                            maxWidth: "100%"
                                        }}
                                        align={getCustomStyle(column.id, 'code') ? 'left' : 'center'}
                                    >
                                        <Typography variant="h5" sx={{ color: "#000000" }}>
                                            {column.label}
                                        </Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody className={classes.tableHeadRowContainer}>
                            {tableData && tableData.map((row, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            if (column.id == 'srno' || column.id == 'code') {
                                                return (
                                                    <TableCell align={getCustomStyle(column.id, 'code') ? 'left' : 'center'}>
                                                        {value}
                                                    </TableCell>
                                                );
                                            } else if (column.id == 'action') {
                                                return (
                                                    <TableCell align='center'>
                                                        <DeleteOutlineIcon onClick={() => handleDeleteRow(index)} />
                                                    </TableCell>
                                                );
                                            } else {
                                                return (
                                                    <TableCell align='center'>
                                                        {<input type="text" name={column.id} value={value} style={{ width: '4rem' }} />}
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

export default AddCodesTable;