import { Box, Button, MenuItem, OutlinedInput, Pagination, PaginationItem, Select, Typography } from "@mui/material";
import { tableStyle } from "../../pages/app/provider/referral/referral-table";
import { useState } from "react";
import { PaginationState } from "./enums-and-interfaces/interfaces";

type Props = {
    pagination: PaginationState;
    setPagination: any;
}

const sxs = {
    paginationAction: {
        background: '#FFFFFF 0% 0% no-repeat padding-box',
        boxShadow: '0px 0px 6px #00000029',
        borderRadius: '6px',
        margin: '0 10px !important',
        backgroundColor: 'white !important'
    }
}

function CustomPagination(props: Props) {

    const commonClasses = tableStyle();
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const paginationFilter: any[] = [10, 15, 20, 25, 30];
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 3.5 + ITEM_PADDING_TOP,
                width: 50,
            },
        },
    };

    const handleChangePage = (
        newPage: number
    ) => {
        props.setPagination({
            ...props.pagination,
            page: newPage,
            // size: 10,
        });
    };

    const handleRowSizeChange = (e: number) => {
        props.setPagination({
            ...props.pagination,
            size: e
        })
        setRowsPerPage(e);
    }

    return (
        <Box className={commonClasses.paginationBox} pt={2} pb={2}>
            <Typography sx={{ width: '20rem' }} className={commonClasses.paginationTypo}>
                Items per page
                <Select
                    id="demo-multiple-name"
                    name="rowsPerPage"
                    value={rowsPerPage}
                    sx={{
                        // ...selectInputStyle,
                        height: "40px !important",
                        width: '25%',
                        margin: '0 10px',
                        backgroundColor: '#FFFFFF'
                    }}
                    placeholder="Select Speciality"
                    onChange={(e: any) => handleRowSizeChange(e.target.value)}
                    input={<OutlinedInput />}
                    MenuProps={MenuProps}
                    displayEmpty
                >
                    {paginationFilter.map((item: any) => (
                        <MenuItem key={item} value={item} >
                            {item}
                        </MenuItem>
                    ))}
                </Select>
                {`${props.pagination?.page * rowsPerPage + 1} -
                ${Math.min((props.pagination?.page + 1) * rowsPerPage, props.pagination?.totalElements)} of 
                ${props.pagination?.totalElements} item${props.pagination?.totalElements > 1 ? 's' : ''} `}
            </Typography>

            <Pagination
                count={Math.ceil(props.pagination?.totalElements / rowsPerPage)}
                page={props.pagination?.page + 1}
                onChange={() => handleChangePage(props.pagination?.page)}
                className={commonClasses.pagination}
                classes={{ root: commonClasses.root }}
                renderItem={(item: any) => (
                    <PaginationItem
                        component={(props: any) => {
                            return (
                                <Button {...props} sx={sxs.paginationAction}>
                                    {item.type === 'previous' ? 'Previous' : item.type === 'page' ? item.page : 'Next'}
                                </Button>
                            )
                        }}
                        {...item}
                        onClick={item.type === 'previous' ? () => handleChangePage(props.pagination?.page - 1) :
                            item.type === 'page' ? () => handleChangePage(item.page - 1) : () => handleChangePage(props.pagination?.page + 1)}
                        disabled={item.disabled}
                    />
                )}
                shape="rounded"
            />
        </Box>
    )
}

export default CustomPagination;