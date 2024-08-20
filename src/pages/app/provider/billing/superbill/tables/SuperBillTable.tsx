import {
    ButtonBase,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from "@mui/material";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import { useEffect, useState } from "react";
import { superBillList } from "../../../../../../mock-data/superbill";
import { commonWidget, getCustomStyle } from "../../../../../../styles/common";
import ReceiptIcon from '@mui/icons-material/Receipt';
import CreateSuperBillPage from "../../../../../../components/common/modal/super-bill-page";
// import { useSelector } from "react-redux";
import { providerConstants } from "../../../../../../constants/provider";

const {
    MODIFY_SUPER_BILL
} = providerConstants;

interface Column {
    id: string;
    label: string;
    minWidth: number | "auto";
    displaySort?: boolean;
}

interface Row {
    billId: string;
    patientId: string;
    patientName: string;
    visitDate: string;
    reason: string;
    provider: string;
    billingStatus: string;
    action: JSX.Element;
    [key: string]: string | JSX.Element;
}


function createData(
    billId: string,
    patientId: string,
    patientName: string,
    visitDate: string,
    reason: string,
    provider: string,
    billingStatus: string,
    action: JSX.Element
): Row {
    return {
        billId,
        patientId,
        patientName,
        visitDate,
        reason,
        provider,
        billingStatus,
        action,
    };
}

const columns: Column[] = [
    { id: "billId", label: "Bill ID", minWidth: 50, displaySort: false },
    { id: "patientId", label: "Patient ID", minWidth: 50, displaySort: false },
    { id: "patientName", label: "Patient Name", minWidth: 120, displaySort: true },
    { id: "visitDate", label: "Visit Date", minWidth: 120, displaySort: true },
    { id: "reason", label: "Reson For App.", minWidth: 140, displaySort: true },
    { id: "provider", label: "Provider", minWidth: 100, displaySort: true },
    { id: "billingStatus", label: "Biling Status", minWidth: 80, displaySort: true },
    { id: "action", label: "Action", minWidth: 50, displaySort: false },
];

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
        padding: "12px!important",
        cursor: "pointer",
    },
};

function SuperBillingTable() {
    // const [open, setOpen] = useState(false);
    // const handleOpen = () => {
    //     setOpen(true);
    // };

    // const handleLocationName = () => {
    //     handleOpen();
    // };

    // const handleClose = () => setOpen(false);

    //   const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const classes = commonWidget();
    const [openModal, setOpenModal] = useState<any>(false);
    // const hideButtons = useSelector((state: any) => state.billingReducer.hide);
    // const [,setHideNavBtn] = useOutletContext<any>();

    const [billList, setBillList] = useState<any>([]);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        console.log(event, newPage);
        // setPage(newPage);
    };

    const handleFormModal = () => {
        // setHideNavBtn(true);
        setOpenModal(true);
    }

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        // setPage(0);
    };

    const handleClose = () => {
        // setHideNavBtn(false);
        setOpenModal(false);
    }

    useEffect(() => {
        const newRows: any = superBillList?.map(
            (bill: any) => {
                return createData(
                    bill?.billId,
                    bill?.patientId,
                    bill?.patientName,
                    bill?.visitDate,
                    bill?.reason,
                    bill?.provider,
                    bill?.billingStatus,
                    <ButtonBase
                        sx={{
                            background: "#DAEAF8",
                            borderRadius: "5px",
                            padding: '5px',
                            height: "30px",
                        }}
                    >
                        <ReceiptIcon sx={{ color: "#36588C", height: "15px" }} />
                        <Typography variant="h6" color="#36588C" textAlign={'center'} fontSize={'14px !important'} onClick={handleFormModal}>
                            Modify Superbill
                        </Typography>
                    </ButtonBase>
                );
            }
        );
        setBillList(newRows);
    }, [superBillList]);

    return (
        <>
            {!openModal && <Paper
                sx={{
                    boxShadow: "none",
                    background: 'white'
                }}
            >
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow className={classes.tableHeadRowContainer}>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={getCustomStyle(column.id, 'patientName') ? 'left' : 'center'}
                                        style={{ width: column.minWidth }}
                                    >
                                        {column.label}{" "}
                                        {column.displaySort && (
                                            <SyncAltIcon sx={sxs.iconArrowWort} />
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody className={classes.tableHeadRowContainer}>
                            {billList?.map((providerGroup: any) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={providerGroup?.id}
                                    >
                                        {columns.map((column) => {
                                            if (column.id === "status" || column.id === "action") {
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        sx={sxs.tableBodycell}
                                                        align={getCustomStyle(column.id, 'patientName') ? 'left' : 'center'}
                                                    >
                                                        {providerGroup[column.id]}
                                                    </TableCell>
                                                );
                                            } else {
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        sx={sxs.tableBodycell}
                                                        align={getCustomStyle(column.id, 'patientName') ? 'left' : 'center'}
                                                        style={{ cursor: "pointer" }} // Add cursor style
                                                    >
                                                        {providerGroup[column.id]}
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

                <TablePagination
                    // className={classes.tablePagination}
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={0}
                    rowsPerPage={rowsPerPage}
                    page={0}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>}
            {openModal && <CreateSuperBillPage action={MODIFY_SUPER_BILL} onClose={handleClose} />}
        </>
    );
}

export default SuperBillingTable;
