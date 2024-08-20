import { Box, ButtonBase, DialogActions, DialogContent, DialogTitle, Grid, InputBase, MenuItem, Select, TextField, Typography } from "@mui/material";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@mui/styles";
import theme from "../../../../../../theme";
import { useState } from "react";
import { actionBtns, commonWidget, formBottom, formButtonStyle, formTitle } from "../../../../../../styles/common";
import AddIcon from "@mui/icons-material/Add";
import FormLabel from "../../../../../../components/common/label/form-label";



type Props = {
    buttonTitle: string;
    dialogTitle: string;
};

export const commonModalWidget: any = makeStyles(
    () => ({
        modalButton: {
            width: "15.625rem",
            backgroundColor: "#0097F0",
            height: "42px",
            textTransform: "initial",
            fontSize: "14px",
            fontWeight: "500",
        },
        modalTitle: {
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "600",
        },
        dialogContentContainer: {
            "&::-webkit-scrollbar": {
                width: "0.4em",
                background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
                background: "transparent",
            },
            height: "auto",
            borderTop: "none",
        },
        dialogTopContainer: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
        },
        upperBoxContainer: {
            display: "flex",
            gap: "30px",
            borderBottom: "1px solid #4C4C4C4D",
            paddingBottom: "20px",
            "@media (max-width: 820px)": {
                width: "100%",
            },
            "@media (max-width: 768px)": {
                width: "100%",
            },
        },

        mainBoxContainer: {
            display: "flex",
            flexDirection: "column",
            gap: "22px",
            "@media (max-width: 820px)": {
                width: "100%",
            },
        },

        inputBoxContainer: {
            display: "flex",
            gap: "20.5px",
            "@media (max-width: 820px)": {
                display: "inline-block",
                width: "100%",
            },
        },

        addButtonTypo: {
            color: "#ffffff !important",
            display: "flex",
            // paddingLeft: "12px",
            paddingRight: "2px",
            opacity: 0.9
        },

        modalSelectStyle: {
            borderRadius: "5px",
            border: "none",
            "& fieldset": { border: "none" },
            boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
            height: "42px !important",
            textAlign: "center",
            padding: "13px 0px 10px 16px",
            fontSize: "16px",
            width: "20.773rem !important",
            "@media (max-width: 820px)": {
                width: "100% !important",
            },
        },
        addressFormContainer: {
            paddingTop: "15px",
            paddingLeft: "20.5px",
            paddingBottom: "23px",
            paddingRight: "19px",
            border: "1px solid #FFFFFF",
            boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.3)",
            borderRadius: "5px",
            width: "100%",
            marginTop: "19px",
            marginBottom: "19px",
        },
        addressTitle: {
            fontSize: "16px",
            marginBottom: "22px",
            // fontWeight: "700",
            marginRight: "17px",
        },
        addressContainer: {
            display: "flex",
            gap: "20.5px",
            marginBottom: "22px",

            "@media (max-width: 820px)": {
                display: "block",
            },
        },
        addressBaseContainer: {
            display: "flex",
            alignItems: "center",
            gap: "20.5px",

            "@media (max-width: 820px)": {
                display: "block",
            },
        },
        addressCheckBoxStyle: {
            width: 20,
            padding: 0,
            color: "#70707066",
            "&.Mui-checked": {
                color: "#0097F0",
            },
        },
    }),
    { defaultTheme: theme }
);

const sxs = {
    titleStyle: {
        textAlign: "center",
        // fontSize: "20px",
        color: 'black',
        // fontWeight: "600",
        fontFamily: 'Roboto,sans-serif'
    },
    dialogContentStyle: {
        "&::-webkit-scrollbar": {
            width: "0.4em",
            background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
            background: "transparent",
        },
        height: "auto",
        borderTop: "none",
    },
    specialitySelectStyle: {
        ".MuiOutlinedInput-notchedOutline": {
            border: "none",
        },
        boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
        border: "none ",
        height: "42px !important",

        width: "21.0rem",
        maxWidth: "24.375rem",
        padding: "13px 0px 10px 0px",
    },
    addressTitle: {
        fontSize: "16px",
        marginBottom: "22px",
        // fontWeight: "700",
        marginRight: "17px",
    },
    addressSelectorStyle: {
        ".MuiOutlinedInput-notchedOutline": { border: 0 },
        boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
        // width: "12.773rem !important",
        height: "42px !important",
    },
    hoursContainer: {
        paddingTop: "15px",
        paddingLeft: "20.5px",
        paddingBottom: "23px",
        paddingRight: "19px",
        border: "1px solid #FFFFFF",
        boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.3)",
        borderRadius: "5px",
        width: "100%",
    },
    hoursTitle: {
        fontSize: "16px",
        marginBottom: "22px",
        // fontWeight: "700",
    },
    hoursParentContainer: {
        display: "flex",

        "@media (max-width: 820px)": {
            gap: "1.5rem",
        },
    },
    hoursGroupContainer: {
        display: "flex",
        gap: "34px",
        alignItems: "center",
        marginBottom: "25px",

        "@media (max-width: 820px)": {
            gap: "20px",
        },
    },
    dayBoxStyle: {
        fontSize: "28px",
        fontFamily: "Roboto",
        height: "42px",
        width: "42px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "2px solid #1A1A1A33 ",
        // fontWeight: "bold",
        borderRadius: "10px",
        cursor: "pointer",
    },
    textFieldsHoursStyle: {
        display: "flex",
        gap: "16px",
        alignItems: "center",
        justifyContent: "center",

        "@media (max-width: 768px)": {
            gap: "7px",
        },
    },
    dayColor: {
        background: '#DAEAF8',
        color: 'black'
    },
    commmonStyles: {
        width: '16.773rem !important',
        textAlign: 'start'
    }
};

function FeeScheduleForm(props: Props) {

    const classes = commonWidget();
    const styles = commonModalWidget();

    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState<DialogProps["scroll"]>("paper");

    const handleSubmit = () => {

    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid E-mail").required("Email Required"),
        locationName: Yup.string().required("Location Name Required"),
        locationId: Yup.string().required("Location Id Required"),
        SpecialityType: Yup.array().required("SpecialityType Required"),
        contactNumber: Yup.string().required("contactNumber Required"),
        physicalAddress1: Yup.string().required("physicalAddress1 Required"),
        physicalAddress2: Yup.string().required("physicalAddress2 Required"),
        physicalCity: Yup.string().required("physicalCity Required"),
        physicalstate: Yup.string().required("physicalstate Required"),
        physicalCountry: Yup.string().required("physicalCountry Required"),
        physicalZipCode: Yup.string().required("physicalZipCode Required"),
        billingAddress1: Yup.string().required("billingAddress1 Required"),
        billingAddress2: Yup.string().required("billingAddress2 Required"),
        billingCity: Yup.string().required("billingCity Required"),
        billingstate: Yup.string().required("billingstate Required"),
        billingCountry: Yup.string().required("billingCountry Required"),
        billingZipCode: Yup.string().required("billingZipCode Required"),
    });


    return (
        <>
            <Formik
                initialValues={{
                    email: "",
                    locationName: "",
                    locationId: "",
                    SpecialityType: [],
                    contactNumber: "",
                    faxId: "",
                    information: "",
                    physicalAddress1: "",
                    physicalAddress2: "",
                    physicalCity: "",
                    physicalstate: "",
                    physicalCountry: "",
                    physicalZipCode: "",

                    billingAddress1: "",
                    billingAddress2: "",
                    billingCity: "",
                    billingstate: "",
                    billingCountry: "",
                    billingZipCode: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                {({ isSubmitting, values, setFieldValue }) => (
                    <Form>
                        <ButtonBase
                            onClick={handleClickOpen("paper")}
                            sx={formButtonStyle.saveButtonStyle}
                        >
                            <span className={styles.addButtonTypo}>
                                <AddIcon />
                            </span>
                            {props.buttonTitle}
                        </ButtonBase>

                        <Dialog
                            open={open}
                            onClose={handleClose}
                            scroll={scroll}
                            aria-labelledby="scroll-dialog-title"
                            aria-describedby="scroll-dialog-description"
                            maxWidth="md"
                        >
                            <DialogTitle id="scroll-dialog-title" sx={{ background: '#F5F6F9' }}>
                                <Typography sx={formTitle}>{props.dialogTitle}</Typography>
                            </DialogTitle>
                            <DialogContent
                                dividers={scroll === "paper"}
                                sx={sxs.dialogContentStyle}
                            >
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
                                    <Grid container xs={12} spacing={3}>
                                        <Grid item xs={4}>
                                            <FormLabel label="Select Provider" />
                                            <Select
                                                fullWidth
                                                displayEmpty
                                                onChange={(e) =>
                                                    setFieldValue("physicalstate", e.target.value)
                                                }
                                                renderValue={(selected) => {
                                                    if (selected?.length === 0) {
                                                        return (
                                                            <span
                                                                style={{
                                                                    fontSize: "14px",
                                                                    color: "#1A1A1A7F"
                                                                }}
                                                            >
                                                                Select Provider
                                                            </span>
                                                        );
                                                    }
                                                    return selected;
                                                }}
                                                value={values.physicalstate}
                                                name="physicalstate"
                                                sx={sxs.commmonStyles}
                                                // sx={sxs.addressSelectorStyle}
                                                classes={{
                                                    root: classes.providerTextInput,
                                                    // input: classes.textFieldInput,
                                                    // focused: classes.textFieldActive,
                                                    error: classes.inputBoxError,
                                                }}
                                                MenuProps={{
                                                    PaperProps: {
                                                        sx: { maxHeight: 300, maxWidth: "12.773rem" },
                                                    },
                                                }}
                                            >
                                                <MenuItem value={10}>Dr Joseph P</MenuItem>
                                                <MenuItem value={20}>Dr Maria Jeh</MenuItem>
                                                <MenuItem value={30}>Dr Oro Dev</MenuItem>
                                            </Select>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <FormLabel label="Code Type" />
                                            <Select
                                                fullWidth
                                                displayEmpty
                                                onChange={(e) =>
                                                    setFieldValue("physicalstate", e.target.value)
                                                }
                                                renderValue={(selected) => {
                                                    if (selected?.length === 0) {
                                                        return (
                                                            <span
                                                                style={{
                                                                    fontSize: "14px",
                                                                    color: "#1A1A1A7F"
                                                                }}
                                                            >
                                                                Select Code Type
                                                            </span>
                                                        );
                                                    }
                                                    return selected;
                                                }}
                                                value={values.physicalstate}
                                                name="physicalstate"
                                                sx={sxs.commmonStyles}
                                                // sx={sxs.addressSelectorStyle}
                                                classes={{
                                                    root: classes.providerTextInput,
                                                    // input: classes.textFieldInput,
                                                    // focused: classes.textFieldActive,
                                                    error: classes.inputBoxError,
                                                }}
                                                MenuProps={{
                                                    PaperProps: {
                                                        sx: { maxHeight: 300, maxWidth: "12.773rem" },
                                                    },
                                                }}
                                            >
                                                <MenuItem value={10}>CPT</MenuItem>
                                                <MenuItem value={20}>HCPCS</MenuItem>
                                            </Select>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <FormLabel label="Procedure Code" />
                                            <Select
                                                fullWidth
                                                displayEmpty
                                                onChange={(e) =>
                                                    setFieldValue("physicalstate", e.target.value)
                                                }
                                                renderValue={(selected) => {
                                                    if (selected?.length === 0) {
                                                        return (
                                                            <span
                                                                style={{
                                                                    fontSize: "14px",
                                                                    color: "#1A1A1A7F"
                                                                }}
                                                            >
                                                                Select Procedure Code
                                                            </span>
                                                        );
                                                    }
                                                    return selected;
                                                }}
                                                value={values.physicalstate}
                                                name="physicalstate"
                                                sx={sxs.commmonStyles}
                                                // sx={sxs.addressSelectorStyle}
                                                classes={{
                                                    root: classes.providerTextInput,
                                                    // input: classes.textFieldInput,
                                                    // focused: classes.textFieldActive,
                                                    error: classes.inputBoxError,
                                                }}
                                                MenuProps={{
                                                    PaperProps: {
                                                        sx: { maxHeight: 300, maxWidth: "12.773rem" },
                                                    },
                                                }}
                                            >
                                                <MenuItem value={10}>76534</MenuItem>
                                                <MenuItem value={20}>23498</MenuItem>
                                                <MenuItem value={30}>65424</MenuItem>
                                            </Select>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <FormLabel label="Modifier" />
                                            <InputBase
                                                fullWidth
                                                name="email"
                                                type="email"
                                                onChange={(e) =>
                                                    setFieldValue("email", e.target.value)
                                                }
                                                value={values.email}
                                                placeholder={'Enter Modifier'}
                                                classes={{
                                                    root: classes.providerTextInput,
                                                    input: classes.textFieldInput,
                                                    focused: classes.textFieldActive,
                                                    error: classes.inputBoxError,
                                                }}
                                                sx={sxs.commmonStyles}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <FormLabel label="NDC Code" />
                                            <InputBase
                                                fullWidth
                                                name="email"
                                                type="email"
                                                onChange={(e) =>
                                                    setFieldValue("email", e.target.value)
                                                }
                                                value={values.email}
                                                placeholder={'Enter NDC Code'}
                                                classes={{
                                                    root: classes.providerTextInput,
                                                    input: classes.textFieldInput,
                                                    focused: classes.textFieldActive,
                                                    error: classes.inputBoxError,
                                                }}
                                                sx={sxs.commmonStyles}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <FormLabel label="Amount" />
                                            <InputBase
                                                fullWidth
                                                name="email"
                                                type="email"
                                                onChange={(e) =>
                                                    setFieldValue("email", e.target.value)
                                                }
                                                value={values.email}
                                                placeholder={'Enter Amount'}
                                                classes={{
                                                    root: classes.providerTextInput,
                                                    input: classes.textFieldInput,
                                                    focused: classes.textFieldActive,
                                                    error: classes.inputBoxError,
                                                }}
                                                sx={sxs.commmonStyles}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <FormLabel label="NDC Quantity" />
                                            <InputBase
                                                fullWidth
                                                name="email"
                                                type="email"
                                                onChange={(e) =>
                                                    setFieldValue("email", e.target.value)
                                                }
                                                value={values.email}
                                                placeholder={'Enter NDC Quantity'}
                                                classes={{
                                                    root: classes.providerTextInput,
                                                    input: classes.textFieldInput,
                                                    focused: classes.textFieldActive,
                                                    error: classes.inputBoxError,
                                                }}
                                                sx={sxs.commmonStyles}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <FormLabel label="Procedure Code" />
                                            <Select
                                                fullWidth
                                                displayEmpty
                                                onChange={(e) =>
                                                    setFieldValue("physicalstate", e.target.value)
                                                }
                                                renderValue={(selected) => {
                                                    if (selected?.length === 0) {
                                                        return (
                                                            <span
                                                                style={{
                                                                    fontSize: "14px",
                                                                    color: "#1A1A1A7F"
                                                                }}
                                                            >
                                                                Select Procedure Code
                                                            </span>
                                                        );
                                                    }
                                                    return selected;
                                                }}
                                                value={values.physicalstate}
                                                name="physicalstate"
                                                sx={sxs.commmonStyles}
                                                // sx={sxs.addressSelectorStyle}
                                                classes={{
                                                    root: classes.providerTextInput,
                                                    // input: classes.textFieldInput,
                                                    // focused: classes.textFieldActive,
                                                    error: classes.inputBoxError,
                                                }}
                                                MenuProps={{
                                                    PaperProps: {
                                                        sx: { maxHeight: 300, maxWidth: "12.773rem" },
                                                    },
                                                }}
                                            >
                                                <MenuItem value={10}>76534</MenuItem>
                                                <MenuItem value={20}>23498</MenuItem>
                                                <MenuItem value={30}>65424</MenuItem>
                                            </Select>
                                        </Grid>
                                    </Grid>
                                    <Grid container xs={12} spacing={3}>
                                        <Grid item xs={12}>
                                            <FormLabel label="Description" />
                                            <TextField
                                                classes={{
                                                    root: classes.providerTextInput,
                                                }}
                                                sx={{ width: '99% !important', height: '150px !important' }}
                                            >

                                            </TextField>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </DialogContent>
                            <DialogActions sx={formBottom}>
                                <Grid sx={actionBtns}>
                                    <ButtonBase
                                        onClick={handleClose}
                                        sx={formButtonStyle.cancelButtonStyle}
                                    >
                                        Cancel
                                    </ButtonBase>
                                    <ButtonBase
                                        type="submit"
                                        sx={formButtonStyle.saveButtonStyle}
                                        disabled={isSubmitting}
                                    >
                                        Save
                                    </ButtonBase>
                                </Grid>
                            </DialogActions>
                        </Dialog>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default FeeScheduleForm;