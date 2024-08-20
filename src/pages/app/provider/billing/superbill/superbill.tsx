import {
    Box,
    ButtonBase,
    // ButtonBase,
    InputAdornment,
    InputBase,
    Paper,
    // Typography,
} from "@mui/material";
import SuperBillingTable from "./tables/SuperBillTable";
import { makeStyles } from "@mui/styles";
import { adminConstants } from "../../../../../constants/admin";
import SearchIcon from "@mui/icons-material/Search";
// import { formButtonStyle } from "../../../../../styles/common";
// import AddIcon from "@mui/icons-material/Add";
import { providerConstants } from "../../../../../constants/provider";
import { formButtonStyle } from "../../../../../styles/common";
import AddIcon from "@mui/icons-material/Add";
// import CreateSuperBillPage from "../../../../../components/common/modal/super-bill-page";
// import { useState } from "react";
import CreateSuperBillPage from "../../../../../components/common/modal/super-bill-page";
import { useState } from "react";
// import { useOutletContext } from "react-router-dom";

const { SEARCH_HERE } = adminConstants;
const {
    // SUPER_BILL
    CREATE_SUPER_BILL
} = providerConstants;

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
        color: "#ffffff !important",
        display: "flex",
        // paddingLeft: "12px",
        paddingRight: "2px",
        opacity: 0.9,
    },
}));

const profileTab = {
    heading: {
        margin: "10px 0",
        display: "flex",
        justifyContent: "end",
        gap: "5%",
    },
    title: {
        fontSize: "18px",
        fontWeight: "bold",
    },
    table: {
        marginTop: "20px",
    },
    paperSearch: {
        padding: "4px",
        display: "flex",
        alignItems: "center",
        width: 300,
        height: 38,
        border: "none",
        boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2) !important",
    },
    inputBase: {
        marginLeft: "2px !important",
        flex: 1,
    },
    iconButton: {
        padding: "10px",
    },
};

function SuperBillPage() {
    const classes = commonPorviderGroupWidget();
    const [openModal, setOpenModal] = useState<any>(false);

    const handleCreateForm = () => {
        setOpenModal(true);
    }

    const handleClose = () => {
        setOpenModal(false);
    }

    return (
        <>
            <Box sx={profileTab.heading}>
                <Paper component="form" className={classes.searchBoxWidth}>
                    <InputBase
                        fullWidth
                        sx={{ width: '24rem' }}
                        classes={{
                            root: classes.AddressFormLongtInputField2,
                            input: classes.inputBoxText2,
                            focused: classes.inputBoxActive2,
                        }}
                        placeholder={SEARCH_HERE}
                        endAdornment={
                            <InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>
                        }
                    />
                </Paper>
                <ButtonBase
                    onClick={handleCreateForm}
                    sx={formButtonStyle.saveButtonStyle}
                >
                    <span className={classes.addButtonTypo}>
                        <AddIcon />
                    </span>
                    {CREATE_SUPER_BILL}
                </ButtonBase>
            </Box>
            <Box sx={profileTab.table}>
                {openModal && <CreateSuperBillPage action={CREATE_SUPER_BILL} onClose={handleClose} />}
                {!openModal && <SuperBillingTable />}
            </Box>
        </>
    );
}

export default SuperBillPage;
