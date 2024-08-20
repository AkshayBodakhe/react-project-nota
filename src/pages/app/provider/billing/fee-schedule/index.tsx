import { Box, Grid, MenuItem, Select } from "@mui/material";
import AppLayout from "../../../../../components/core/layout/layout";
import { adminConstants } from "../../../../../constants/admin";
import FeeScheduleTable from "./tables/fee-schedule-table";
import { useState } from "react";
import FeeScheduleForm from "./forms/fee-schedule-form";

const {
    PROVIDER
} = adminConstants;

const sxs = {
    addressSelectorStyle: {
        ".MuiOutlinedInput-notchedOutline": { border: 0 },
        boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
        width: "12.773rem !important",
        height: "42px !important",
    },
    providerStatus: {
        ".MuiOutlinedInput-notchedOutline": { border: 0 },
        boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
        width: "12rem",
        background: 'white',
        height: "38px",
        "@media (max-width: 820px)": {
            width: "100% !important",
        },
        "@media (max-width: 768px)": {
            width: "100% !important",
        },
    },
    providerStateFilter: {
        display: "flex",
        alignItems: "center",
        gap: "15px",

        justifyContent: "space-between",
        "@media (max-width: 820px)": {
            marginTop: "15px",
            display: "block",
        },
        "@media (max-width: 768px)": {
            marginTop: "15px",
            display: "block",
        },
    }
}

function FeeSchedulePage() {

    const [status, setStatus] = useState('');

    const handleStatus = (status: any) => {
        setStatus(status)
    }

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingTop: '2%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: '20px' }}>
                        <Grid sx={sxs.providerStateFilter}>
                            <Grid>
                                <Select
                                    fullWidth
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    displayEmpty
                                    sx={sxs.providerStatus}
                                    renderValue={() => {
                                        return (
                                            <span
                                                style={{
                                                    fontSize: "14px",
                                                    color: "#1A1A1A7F",
                                                }}
                                            >
                                                Status
                                            </span>
                                        );
                                    }}
                                    size="small"
                                    onChange={(e) => handleStatus(e.target.value)}
                                    value={status}
                                >
                                    <MenuItem value="all" >All</MenuItem>
                                    <MenuItem value="active" >Active</MenuItem>
                                    <MenuItem value="inactive" >Inactive</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid sx={sxs.providerStateFilter}>
                            <Grid>
                                <Select
                                    fullWidth
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    displayEmpty
                                    sx={{ ...sxs.providerStatus, width: '20rem' }}
                                    renderValue={() => {
                                        return (
                                            <span
                                                style={{
                                                    fontSize: "14px",
                                                    color: "#1A1A1A7F",
                                                }}
                                            >
                                                Select CPT / HCPCS Procedure Code
                                            </span>
                                        );
                                    }}
                                    size="small"
                                    onChange={(e) => handleStatus(e.target.value)}
                                    value={status}
                                >
                                    <MenuItem value="all" >96105 - Assessment of Aphasia</MenuItem>
                                    <MenuItem value="active" >97770 - Cognitive Rehabilitation</MenuItem>
                                    <MenuItem value="inactive" >90832 - Psychotherapy, 30 min</MenuItem>
                                    <MenuItem value="inactive" >97110 - Therapeutic exercises</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid sx={sxs.providerStateFilter}>
                            <FeeScheduleForm buttonTitle="Add Fee Schedule" dialogTitle="Add Fee Schedule" />
                        </Grid>
                    </Box>
                </Box>
                <FeeScheduleTable />
            </Box>
        </>
    );
}

export default AppLayout(FeeSchedulePage, { source: PROVIDER });