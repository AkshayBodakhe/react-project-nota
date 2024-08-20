import { useState } from "react";
import {
    DialogTitle,
    DialogContent,
    Typography,
    DialogActions,
    InputBase,
    Box,
    Select,
    MenuItem,
    Grid,
    FormHelperText,
    ButtonBase,
    InputAdornment,
} from "@mui/material";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import FormLabel from "../label/form-label";
import { makeStyles } from "@mui/styles";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { adminConstants } from "../../../constants/admin";
import { actionBtns, commonWidget, formBottom, formButtonStyle, formTitle } from "../../../styles/common";
import theme from "../../../theme";
import AddIcon from "@mui/icons-material/Add";
import { providerConstants } from "../../../constants/provider";
import SearchIcon from "@mui/icons-material/Search";


const {
    //ADD_NEW_PROVIDER_GROUP,
    //ADD_PROVIDER_LOGO,
    //PROVIDER_GROUP_NAME,
    CONTACT_NUMBER,
    //GROUP_NPI_NUMBER,
    EMAIL_ID,
    //WEBSITE,
    FAX_ID,
    //DESCRIPTION,
    //EDIT_PROVIDER_GROUP,
    //ENTER_PROVIDER_GROUP_NAME,
    ENTER_CONTACT_NUMBER,
    //ENTER_GROUP_NIP_NUMBER,
    ENTER_EMAIL_ID,
    //ENTER_DESCRIPTION,
    // LOCATION_NAME,
    // LOCATION_ID,
    // ADD_NEW_LOCATION_LOGO,
    //ADD_NEW_LOCATION,
    // ENTER_LOCATION_ID,
    // SPECIALITY_TYPE,
    ENTER_FAX_ID,
    ADDRESS_ZIP_CODE,
    ADDRESS_COUNTRY,
    ADDRESS_STATE,
    ADDRESS_CITY,
    ADDRESS_ADDRESS_2,
    ADDRESS_ADDRESS_1,
} = adminConstants;

const {
    PATIENT_NAME,
    PATIENT_ID,
    PATIENT_DOB,
    SEARCH_ICD_CODE
} = providerConstants;

export const commonModalWidget: any = makeStyles(
    () => ({

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
            // alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
        },
        upperBoxContainer: {
            display: "flex",
            flexDirection: "column",
            gap: "22px",
            // borderBottom: "1px solid #4C4C4C4D",
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
            // flexDirection: "column",
            flexWrap: 'wrap',
            gap: "22px",

            "& .Box": {
                flex: '1 !important',
            },

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
            color: "#36588C !important",
            display: "flex",
            // paddingLeft: "12px",
            paddingRight: "12px",
            opacity: 0.7
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
        fontSize: "20px",
        marginBottom: "22px",
        // fontWeight: "700",
        marginRight: "17px",
    },
    addressSelectorStyle: {
        ".MuiOutlinedInput-notchedOutline": { border: 0 },
        boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
        width: "12.773rem !important",
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
    }
};
type Props = {
    buttonTitle: string;
    dialogTitle: string;
};

const SuperBillModal = (props: Props) => {
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState<DialogProps["scroll"]>("paper");
    // const [hoursSelect, setHoursSelect] = useState({
    //     monday: true,
    //     tuesday: true,
    //     wednesday: true,
    //     thursday: true,
    //     friday: true,
    //     saturday: true,
    //     sunday: true,
    // });
    const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // const ITEM_HEIGHT = 48;

    // const ITEM_PADDING_TOP = 8;

    // const MenuProps = {
    //     PaperProps: {
    //         style: {
    //             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    //             width: 250,
    //         },
    //     },
    // };

    const classes = commonWidget();
    const styles = commonModalWidget();

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

    const handleSubmit = () => { };

    return (
        <Formik
            initialValues={{
                email: "",
                patientName: "",
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
            {({ isSubmitting, values, errors, setFieldValue }) => (
                <Form>
                    <ButtonBase
                        onClick={handleClickOpen("paper")}
                        sx={formButtonStyle.mainButtonStyle}
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
                        maxWidth="lg"
                    >
                        <DialogTitle id="scroll-dialog-title" sx={{ background: '#F5F6F9' }}>
                            <Typography sx={formTitle}>{props.dialogTitle}</Typography>
                        </DialogTitle>
                        <DialogContent
                            dividers={scroll === "paper"}
                            sx={sxs.dialogContentStyle}
                        >
                            <Box className={styles.addressFormContainer}>
                                <Box sx={{ display: "flex", alignItems: "baseLine" }}>
                                    <Typography sx={sxs.addressTitle}>
                                        Patient Details
                                    </Typography>
                                </Box>
                                <Box className={styles.dialogTopContainer}>
                                    <Box className={styles.upperBoxContainer}>
                                        <Box className={styles.mainBoxContainer}>
                                            <Box sx={{ flex: 1 }}>
                                                <FormLabel label={PATIENT_ID} isRequired={true} />
                                                <InputBase
                                                    fullWidth
                                                    name="patientId"
                                                    value={values.locationId}
                                                    placeholder="Enter Patient ID"
                                                    onChange={(e) =>
                                                        setFieldValue("patientId", e.target.value)
                                                    }
                                                    classes={{
                                                        root: classes.providerTextInput,
                                                        input: classes.textFieldInput,
                                                        focused: classes.textFieldActive,
                                                        error: classes.inputBoxError,
                                                    }}
                                                />
                                                {errors.locationId && (
                                                    <FormHelperText error>
                                                        {errors.locationId}
                                                    </FormHelperText>
                                                )}
                                            </Box>
                                            <Box sx={{ flex: 1 }}>
                                                <FormLabel label={PATIENT_NAME} isRequired={true} />
                                                <InputBase
                                                    fullWidth
                                                    id="provider-group-name"
                                                    type="text"
                                                    name="patientName"
                                                    placeholder="Enter Patient Name"
                                                    value={values.patientName}
                                                    onChange={(e) =>
                                                        setFieldValue("patientName", e.target.value)
                                                    }
                                                    classes={{
                                                        root: classes.providerTextInput,
                                                        input: classes.textFieldInput,
                                                        focused: classes.textFieldActive,
                                                        error: classes.inputBoxError,
                                                    }}
                                                />
                                                {errors.patientName && (
                                                    <FormHelperText error>
                                                        {errors.patientName}
                                                    </FormHelperText>
                                                )}
                                            </Box>
                                            <Box sx={{ flex: 1 }}>
                                                <FormLabel label={PATIENT_DOB} isRequired={true} />
                                                <InputBase
                                                    placeholder={ENTER_CONTACT_NUMBER}
                                                    name="contactNumber"
                                                    onChange={(e) =>
                                                        setFieldValue("contactNumber", e.target.value)
                                                    }
                                                    value={values.contactNumber}
                                                    fullWidth
                                                    classes={{
                                                        root: classes.providerTextInput,
                                                        input: classes.textFieldInput,
                                                        focused: classes.textFieldActive,
                                                        error: classes.inputBoxError,
                                                    }}
                                                />
                                                {errors.contactNumber && (
                                                    <FormHelperText error>
                                                        {errors.contactNumber}
                                                    </FormHelperText>
                                                )}
                                            </Box>
                                            <Box sx={{ flex: 1 }}>
                                                <FormLabel label={CONTACT_NUMBER} isRequired={true} />
                                                <InputBase
                                                    placeholder={ENTER_CONTACT_NUMBER}
                                                    name="contactNumber"
                                                    onChange={(e) =>
                                                        setFieldValue("contactNumber", e.target.value)
                                                    }
                                                    value={values.contactNumber}
                                                    fullWidth
                                                    classes={{
                                                        root: classes.providerTextInput,
                                                        input: classes.textFieldInput,
                                                        focused: classes.textFieldActive,
                                                        error: classes.inputBoxError,
                                                    }}
                                                />
                                                {errors.contactNumber && (
                                                    <FormHelperText error>
                                                        {errors.contactNumber}
                                                    </FormHelperText>
                                                )}
                                            </Box>
                                            <Box sx={{ flex: 1 }}>
                                                <FormLabel label={EMAIL_ID} isRequired={true} />
                                                <InputBase
                                                    fullWidth
                                                    name="email"
                                                    type="email"
                                                    onChange={(e) =>
                                                        setFieldValue("email", e.target.value)
                                                    }
                                                    value={values.email}
                                                    placeholder={ENTER_EMAIL_ID}
                                                    classes={{
                                                        root: classes.providerTextInput,
                                                        input: classes.textFieldInput,
                                                        focused: classes.textFieldActive,
                                                        error: classes.inputBoxError,
                                                    }}
                                                />
                                                {errors.email && (
                                                    <FormHelperText error>{errors.email}</FormHelperText>
                                                )}
                                            </Box>
                                            <Box sx={{ flex: 1 }}>
                                                <FormLabel label={FAX_ID} />
                                                <InputBase
                                                    fullWidth
                                                    name="faxId"
                                                    onChange={(e) =>
                                                        setFieldValue("faxId", e.target.value)
                                                    }
                                                    value={values.faxId}
                                                    placeholder={ENTER_FAX_ID}
                                                    classes={{
                                                        root: classes.providerTextInput,
                                                        input: classes.textFieldInput,
                                                        focused: classes.textFieldActive,
                                                        error: classes.inputBoxError,
                                                    }}
                                                />
                                            </Box>
                                            <Box sx={{ flex: 1 }}>
                                                <FormLabel label="Information" />
                                                <InputBase
                                                    fullWidth
                                                    value={values.information}
                                                    onChange={(e) =>
                                                        setFieldValue("information", e.target.value)
                                                    }
                                                    name="information"
                                                    placeholder="Enter Information"
                                                    classes={{
                                                        root: classes.providerTextInput,
                                                        input: classes.textFieldInput,
                                                        focused: classes.textFieldActive,
                                                        error: classes.inputBoxError,
                                                    }}
                                                />
                                            </Box>
                                            <Box sx={{ flex: 1 }}>
                                                <FormLabel label="Information" />
                                                <InputBase
                                                    fullWidth
                                                    value={values.information}
                                                    onChange={(e) =>
                                                        setFieldValue("information", e.target.value)
                                                    }
                                                    name="information"
                                                    placeholder="Enter Information"
                                                    classes={{
                                                        root: classes.providerTextInput,
                                                        input: classes.textFieldInput,
                                                        focused: classes.textFieldActive,
                                                        error: classes.inputBoxError,
                                                    }}
                                                />

                                            </Box>
                                            <Box sx={{ flex: 1 }}>
                                                <FormLabel label="Information" />
                                                <InputBase
                                                    fullWidth
                                                    value={values.information}
                                                    onChange={(e) =>
                                                        setFieldValue("information", e.target.value)
                                                    }
                                                    name="information"
                                                    placeholder="Enter Information"
                                                    classes={{
                                                        root: classes.providerTextInput,
                                                        input: classes.textFieldInput,
                                                        focused: classes.textFieldActive,
                                                        error: classes.inputBoxError,
                                                    }}
                                                />
                                            </Box>
                                            <Box sx={{ flex: 1 }}>
                                                <FormLabel label="Information" />
                                                <InputBase
                                                    fullWidth
                                                    value={values.information}
                                                    onChange={(e) =>
                                                        setFieldValue("information", e.target.value)
                                                    }
                                                    name="information"
                                                    placeholder="Enter Information"
                                                    classes={{
                                                        root: classes.providerTextInput,
                                                        input: classes.textFieldInput,
                                                        focused: classes.textFieldActive,
                                                        error: classes.inputBoxError,
                                                    }}
                                                />
                                            </Box>
                                            <Box sx={{ flex: 1 }}>
                                                <FormLabel label="Information" />
                                                <InputBase
                                                    fullWidth
                                                    value={values.information}
                                                    onChange={(e) =>
                                                        setFieldValue("information", e.target.value)
                                                    }
                                                    name="information"
                                                    placeholder="Enter Information"
                                                    classes={{
                                                        root: classes.providerTextInput,
                                                        input: classes.textFieldInput,
                                                        focused: classes.textFieldActive,
                                                        error: classes.inputBoxError,
                                                    }}
                                                />

                                            </Box>
                                            <Box sx={{ flex: 1 }}>
                                                <FormLabel label="Information" />
                                                <InputBase
                                                    fullWidth
                                                    value={values.information}
                                                    onChange={(e) =>
                                                        setFieldValue("information", e.target.value)
                                                    }
                                                    name="information"
                                                    placeholder="Enter Information"
                                                    classes={{
                                                        root: classes.providerTextInput,
                                                        input: classes.textFieldInput,
                                                        focused: classes.textFieldActive,
                                                        error: classes.inputBoxError,
                                                    }}
                                                />
                                            </Box>
                                            <Box sx={{ flex: 1 }}>
                                                <FormLabel label="Information" />
                                                <InputBase
                                                    fullWidth
                                                    value={values.information}
                                                    onChange={(e) =>
                                                        setFieldValue("information", e.target.value)
                                                    }
                                                    name="information"
                                                    placeholder="Enter Information"
                                                    classes={{
                                                        root: classes.providerTextInput,
                                                        input: classes.textFieldInput,
                                                        focused: classes.textFieldActive,
                                                        error: classes.inputBoxError,
                                                    }}
                                                />
                                            </Box>
                                            <Box sx={{ flex: 1 }}>
                                                <FormLabel label="Information" />
                                                <InputBase
                                                    fullWidth
                                                    value={values.information}
                                                    onChange={(e) =>
                                                        setFieldValue("information", e.target.value)
                                                    }
                                                    name="information"
                                                    placeholder="Enter Information"
                                                    classes={{
                                                        root: classes.providerTextInput,
                                                        input: classes.textFieldInput,
                                                        focused: classes.textFieldActive,
                                                        error: classes.inputBoxError,
                                                    }}
                                                />
                                            </Box>
                                            <Box sx={{ flex: 1 }}>
                                                <FormLabel label="Information" />
                                                <InputBase
                                                    fullWidth
                                                    value={values.information}
                                                    onChange={(e) =>
                                                        setFieldValue("information", e.target.value)
                                                    }
                                                    name="information"
                                                    placeholder="Enter Information"
                                                    classes={{
                                                        root: classes.providerTextInput,
                                                        input: classes.textFieldInput,
                                                        focused: classes.textFieldActive,
                                                        error: classes.inputBoxError,
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box className={styles.addressFormContainer}>
                                <Box>
                                    <Box sx={{ display: "flex", alignItems: "baseLine" }}>
                                        <Typography sx={sxs.addressTitle}>
                                            Visit Details
                                        </Typography>
                                    </Box>
                                    <Box className={styles.dialogTopContainer}>
                                        <Box className={styles.upperBoxContainer}>
                                            <Box className={styles.mainBoxContainer}>
                                                <Box sx={{ flex: 1 }}>
                                                    <FormLabel label={PATIENT_ID} isRequired={true} />
                                                    <InputBase
                                                        fullWidth
                                                        name="patientId"
                                                        value={values.locationId}
                                                        placeholder="Enter Patient ID"
                                                        onChange={(e) =>
                                                            setFieldValue("patientId", e.target.value)
                                                        }
                                                        classes={{
                                                            root: classes.providerTextInput,
                                                            input: classes.textFieldInput,
                                                            focused: classes.textFieldActive,
                                                            error: classes.inputBoxError,
                                                        }}
                                                    />
                                                    {errors.locationId && (
                                                        <FormHelperText error>
                                                            {errors.locationId}
                                                        </FormHelperText>
                                                    )}
                                                </Box>
                                                <Box sx={{ flex: 1 }}>
                                                    <FormLabel label={PATIENT_NAME} isRequired={true} />
                                                    <InputBase
                                                        fullWidth
                                                        id="provider-group-name"
                                                        type="text"
                                                        name="patientName"
                                                        placeholder="Enter Patient Name"
                                                        value={values.patientName}
                                                        onChange={(e) =>
                                                            setFieldValue("patientName", e.target.value)
                                                        }
                                                        classes={{
                                                            root: classes.providerTextInput,
                                                            input: classes.textFieldInput,
                                                            focused: classes.textFieldActive,
                                                            error: classes.inputBoxError,
                                                        }}
                                                    />
                                                    {errors.patientName && (
                                                        <FormHelperText error>
                                                            {errors.patientName}
                                                        </FormHelperText>
                                                    )}
                                                </Box>
                                                <Box sx={{ flex: 1 }}>
                                                    <FormLabel label="Information" />
                                                    <InputBase
                                                        fullWidth
                                                        value={values.information}
                                                        onChange={(e) =>
                                                            setFieldValue("information", e.target.value)
                                                        }
                                                        name="information"
                                                        placeholder="Enter Information"
                                                        classes={{
                                                            root: classes.providerTextInput,
                                                            input: classes.textFieldInput,
                                                            focused: classes.textFieldActive,
                                                            error: classes.inputBoxError,
                                                        }}
                                                    />
                                                </Box>
                                                <Box sx={{ flex: 1 }}>
                                                    <FormLabel label="Information" />
                                                    <InputBase
                                                        fullWidth
                                                        value={values.information}
                                                        onChange={(e) =>
                                                            setFieldValue("information", e.target.value)
                                                        }
                                                        name="information"
                                                        placeholder="Enter Information"
                                                        classes={{
                                                            root: classes.providerTextInput,
                                                            input: classes.textFieldInput,
                                                            focused: classes.textFieldActive,
                                                            error: classes.inputBoxError,
                                                        }}
                                                    />
                                                </Box>
                                                <Box sx={{ flex: 1 }}>
                                                    <FormLabel label="Information" />
                                                    <InputBase
                                                        fullWidth
                                                        value={values.information}
                                                        onChange={(e) =>
                                                            setFieldValue("information", e.target.value)
                                                        }
                                                        name="information"
                                                        placeholder="Enter Information"
                                                        classes={{
                                                            root: classes.providerTextInput,
                                                            input: classes.textFieldInput,
                                                            focused: classes.textFieldActive,
                                                            error: classes.inputBoxError,
                                                        }}
                                                    />

                                                </Box>
                                                <Box sx={{ flex: 1 }}>
                                                    <FormLabel label="Information" />
                                                    <InputBase
                                                        fullWidth
                                                        value={values.information}
                                                        onChange={(e) =>
                                                            setFieldValue("information", e.target.value)
                                                        }
                                                        name="information"
                                                        placeholder="Enter Information"
                                                        classes={{
                                                            root: classes.providerTextInput,
                                                            input: classes.textFieldInput,
                                                            focused: classes.textFieldActive,
                                                            error: classes.inputBoxError,
                                                        }}
                                                    />
                                                </Box>
                                                <Box sx={{ display: 'flex', width: '100%', gap: '20px' }}>
                                                    <Box sx={{ flex: 1 }}>
                                                        <FormLabel label="Information" />
                                                        <InputBase
                                                            fullWidth
                                                            value={values.information}
                                                            onChange={(e) =>
                                                                setFieldValue("information", e.target.value)
                                                            }
                                                            name="information"
                                                            placeholder="Enter Information"
                                                            classes={{
                                                                root: classes.addressTextField,
                                                                input: classes.textFieldInput,
                                                                focused: classes.textFieldActive,
                                                                error: classes.inputBoxError,
                                                            }}
                                                        />
                                                    </Box>
                                                    <Box sx={{ flex: 1 }}>
                                                        <FormLabel label="Information" />
                                                        <InputBase
                                                            fullWidth
                                                            value={values.information}
                                                            onChange={(e) =>
                                                                setFieldValue("information", e.target.value)
                                                            }
                                                            name="information"
                                                            placeholder="Enter Information"
                                                            classes={{
                                                                root: classes.addressTextField,
                                                                input: classes.textFieldInput,
                                                                focused: classes.textFieldActive,
                                                                error: classes.inputBoxError,
                                                            }}
                                                        />
                                                    </Box>
                                                </Box>

                                            </Box>
                                        </Box>
                                    </Box>

                                </Box>

                                {/* <Box className={styles.addressContainer}>
                                    <Box className={styles.addressBaseContainer}>
                                        <Box sx={{ flex: 1 }}>
                                            <FormLabel label={ADDRESS_COUNTRY} isRequired={true} />
                                            <Select
                                                fullWidth
                                                displayEmpty
                                                onChange={(e) =>
                                                    setFieldValue("physicalCountry", e.target.value)
                                                }
                                                renderValue={(selected) => {
                                                    if (selected?.length === 0) {
                                                        return (
                                                            <span
                                                                style={{
                                                                    fontSize: "14px",
                                                                    color: "#1A1A1A7F",
                                                                }}
                                                            >
                                                                Country
                                                            </span>
                                                        );
                                                    }
                                                    return selected;
                                                }}
                                                value={values.physicalCountry}
                                                name="physicalCountry"
                                                sx={sxs.addressSelectorStyle}
                                                MenuProps={{
                                                    PaperProps: {
                                                        sx: { maxHeight: 300, maxWidth: "12.773rem" },
                                                    },
                                                }}
                                            >
                                                <MenuItem value={10}>10</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                            {errors.physicalCountry && (
                                                <FormHelperText error>
                                                    {errors.physicalCountry}
                                                </FormHelperText>
                                            )}
                                        </Box>
                                        <Box>
                                            <FormLabel label={ADDRESS_STATE} isRequired={true} />
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
                                                                    color: "#1A1A1A7F",
                                                                }}
                                                            >
                                                                State
                                                            </span>
                                                        );
                                                    }
                                                    return selected;
                                                }}
                                                value={values.physicalstate}
                                                name="physicalstate"
                                                sx={sxs.addressSelectorStyle}
                                                MenuProps={{
                                                    PaperProps: {
                                                        sx: { maxHeight: 300, maxWidth: "12.773rem" },
                                                    },
                                                }}
                                            >
                                                <MenuItem value={10}>10</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                            {errors.physicalstate && (
                                                <FormHelperText error>
                                                    {errors.physicalstate}
                                                </FormHelperText>
                                            )}
                                        </Box>
                                    </Box>
                                    <Box className={styles.addressBaseContainer}>
                                        <Box>
                                            <FormLabel label={ADDRESS_CITY} isRequired={true} />
                                            <InputBase
                                                fullWidth
                                                onChange={(e) =>
                                                    setFieldValue("physicalCity", e.target.value)
                                                }
                                                value={values.physicalCity}
                                                name="physicalCity"
                                                placeholder={ADDRESS_CITY}
                                                classes={{
                                                    root: classes.addressCityTextField,
                                                    input: classes.textFieldInput,
                                                    focused: classes.textFieldActive,
                                                    error: classes.inputBoxError,
                                                }}
                                            />
                                            {errors.physicalCity && (
                                                <FormHelperText error>
                                                    {errors.physicalCity}
                                                </FormHelperText>
                                            )}
                                        </Box>
                                        <Box>
                                            <FormLabel label={ADDRESS_ZIP_CODE} isRequired={true} />
                                            <InputBase
                                                onChange={(e) =>
                                                    setFieldValue("physicalZipCode", e.target.value)
                                                }
                                                fullWidth
                                                value={values.physicalZipCode}
                                                name="physicalZipCode"
                                                placeholder={ADDRESS_ZIP_CODE}
                                                classes={{
                                                    root: classes.addressCityTextField,
                                                    input: classes.textFieldInput,
                                                    focused: classes.textFieldActive,
                                                    error: classes.inputBoxError,
                                                }}
                                            />
                                            {errors.physicalZipCode && (
                                                <FormHelperText error>
                                                    {errors.physicalZipCode}
                                                </FormHelperText>
                                            )}
                                        </Box>
                                    </Box>
                                </Box> */}
                            </Box>
                            <Box className={styles.addressFormContainer}>
                                <Box>
                                    <Box sx={{ display: "flex", flexDirection: 'column', alignItems: "baseLine" }}>
                                        <Typography sx={sxs.addressTitle}>
                                            Diagnosis Code
                                        </Typography>
                                        <Box sx={{ marginRight: "9px" }}>
                                            <InputBase
                                                fullWidth
                                                sx={{ width: '24rem' }}
                                                classes={{
                                                    root: styles.AddressFormLongtInputField2,
                                                    input: styles.inputBoxText2,
                                                    focused: styles.inputBoxActive2,
                                                }}
                                                placeholder={SEARCH_ICD_CODE}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <SearchIcon />
                                                    </InputAdornment>
                                                }
                                            />
                                        </Box>
                                        {/* <Typography sx={{ color: "#1A1A1A80", fontSize: "14px" }}>
                                            Same as Physical Address
                                        </Typography> */}
                                    </Box>
                                    <Box className={styles.addressContainer}>
                                        <Box sx={{ flex: "1" }}>
                                            <FormLabel label={ADDRESS_ADDRESS_1} isRequired={true} />
                                            <InputBase
                                                fullWidth
                                                onChange={(e) =>
                                                    setFieldValue("billingAddress1", e.target.value)
                                                }
                                                value={values.billingAddress1}
                                                name="billingAddress1"
                                                placeholder={ADDRESS_ADDRESS_1}
                                                classes={{
                                                    root: classes.addressTextField,
                                                    input: classes.textFieldInput,
                                                    focused: classes.textFieldActive,
                                                    error: classes.inputBoxError,
                                                }}
                                            />
                                            {errors.billingAddress1 && (
                                                <FormHelperText error>
                                                    {errors.billingAddress1}
                                                </FormHelperText>
                                            )}
                                        </Box>
                                        <Box sx={{ flex: "1" }}>
                                            <FormLabel label={ADDRESS_ADDRESS_2} isRequired={false} />
                                            <InputBase
                                                onChange={(e) =>
                                                    setFieldValue("billingAddress2", e.target.value)
                                                }
                                                fullWidth
                                                value={values.billingAddress2}
                                                name="billingAddress2"
                                                placeholder={ADDRESS_ADDRESS_2}
                                                classes={{
                                                    root: classes.addressTextField,
                                                    input: classes.textFieldInput,
                                                    focused: classes.textFieldActive,
                                                    error: classes.inputBoxError,
                                                }}
                                            />
                                            {errors.billingAddress2 && (
                                                <FormHelperText error>
                                                    {errors.billingAddress2}
                                                </FormHelperText>
                                            )}
                                        </Box>
                                    </Box>
                                </Box>

                                <Box className={styles.addressContainer}>
                                    <Box className={styles.addressBaseContainer}>
                                        <Box sx={{ flex: 1 }}>
                                            <FormLabel label={ADDRESS_COUNTRY} isRequired={true} />
                                            <Select
                                                fullWidth
                                                displayEmpty
                                                onChange={(e) =>
                                                    setFieldValue("billingCountry", e.target.value)
                                                }
                                                renderValue={(selected) => {
                                                    if (selected?.length === 0) {
                                                        return (
                                                            <span
                                                                style={{
                                                                    fontSize: "14px",
                                                                    color: "#1A1A1A7F",
                                                                }}
                                                            >
                                                                Country
                                                            </span>
                                                        );
                                                    }
                                                    return selected;
                                                }}
                                                value={values.billingCountry}
                                                name="billingCountry"
                                                sx={sxs.addressSelectorStyle}
                                                MenuProps={{
                                                    PaperProps: {
                                                        sx: { maxHeight: 300, maxWidth: "12.773rem" },
                                                    },
                                                }}
                                            >
                                                <MenuItem value={10}>10</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                            {errors.billingCountry && (
                                                <FormHelperText error>
                                                    {errors.billingCountry}
                                                </FormHelperText>
                                            )}
                                        </Box>
                                        <Box>
                                            <FormLabel label={ADDRESS_STATE} isRequired={true} />
                                            <Select
                                                fullWidth
                                                onChange={(e) =>
                                                    setFieldValue("billingstate", e.target.value)
                                                }
                                                displayEmpty
                                                renderValue={(selected) => {
                                                    if (selected?.length === 0) {
                                                        return (
                                                            <span
                                                                style={{
                                                                    fontSize: "14px",
                                                                    color: "#1A1A1A7F",
                                                                }}
                                                            >
                                                                State
                                                            </span>
                                                        );
                                                    }
                                                    return selected;
                                                }}
                                                value={values.billingstate}
                                                name="billingstate"
                                                sx={sxs.addressSelectorStyle}
                                                MenuProps={{
                                                    PaperProps: {
                                                        sx: { maxHeight: 300, maxWidth: "12.773rem" },
                                                    },
                                                }}
                                            >
                                                <MenuItem value={10}>10</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                            {errors.billingstate && (
                                                <FormHelperText error>
                                                    {errors.billingstate}
                                                </FormHelperText>
                                            )}
                                        </Box>
                                    </Box>
                                    <Box className={styles.addressBaseContainer}>
                                        <Box>
                                            <FormLabel label={ADDRESS_CITY} isRequired={true} />
                                            <InputBase
                                                fullWidth
                                                onChange={(e) =>
                                                    setFieldValue("billingCity", e.target.value)
                                                }
                                                placeholder="City"
                                                value={values.billingCity}
                                                name="billingCity"
                                                classes={{
                                                    root: classes.addressCityTextField,
                                                    input: classes.textFieldInput,
                                                    focused: classes.textFieldActive,
                                                    error: classes.inputBoxError,
                                                }}
                                            />
                                            {errors.billingCity && (
                                                <FormHelperText error>
                                                    {errors.billingCity}
                                                </FormHelperText>
                                            )}
                                        </Box>
                                        <Box>
                                            <FormLabel label={ADDRESS_ZIP_CODE} isRequired={true} />
                                            <InputBase
                                                fullWidth
                                                onChange={(e) =>
                                                    setFieldValue("billingZipCode", e.target.value)
                                                }
                                                placeholder={ADDRESS_ZIP_CODE}
                                                value={values.billingZipCode}
                                                name="billingZipCode"
                                                classes={{
                                                    root: classes.addressCityTextField,
                                                    input: classes.textFieldInput,
                                                    focused: classes.textFieldActive,
                                                    error: classes.inputBoxError,
                                                }}
                                            />
                                            {errors.billingZipCode && (
                                                <FormHelperText error>
                                                    {errors.billingZipCode}
                                                </FormHelperText>
                                            )}
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>

                            <Box sx={sxs.hoursContainer}>
                                <Typography sx={sxs.hoursTitle}>Working Hours</Typography>
                                {/* <Box sx={sxs.hoursParentContainer}>
                                    <Box>
                                        <Box sx={{ display: "flex", gap: "18rem" }}>
                                            <Box>
                                                <Grid container ml={7}>
                                                    <Grid xs={12} sm={6} pl={3.5}>
                                                        <FormLabel label="Open Time" isRequired={false} />
                                                    </Grid>
                                                    <Grid xs={12} sm={6}>
                                                        <FormLabel label="Close Time" isRequired={false} />
                                                    </Grid>
                                                </Grid>
                                                <Box sx={sxs.hoursGroupContainer}>
                                                    <Box
                                                        sx={{
                                                            ...sxs.dayBoxStyle,
                                                            backgroundColor: hoursSelect.monday
                                                                ? sxs.dayColor.background
                                                                : null,
                                                            color: hoursSelect.monday ? sxs.dayColor.color : null,
                                                        }}
                                                        onClick={() =>
                                                            setHoursSelect((prev) => ({
                                                                ...prev,
                                                                monday: !prev.monday,
                                                            }))
                                                        }
                                                    >
                                                        M
                                                    </Box>

                                                    <Box sx={sxs.textFieldsHoursStyle}>
                                                        <TextField
                                                            fullWidth
                                                            sx={{
                                                                "& .MuiOutlinedInput-input": {
                                                                    padding: "8px 6px",
                                                                    resize: "none",
                                                                },
                                                            }}
                                                            type="time"
                                                            InputProps={{
                                                                classes: {
                                                                    root: classes.hoursInputField,
                                                                    input: classes.hoursInputTextBox,
                                                                    focused: classes.textFieldActive,
                                                                },
                                                            }}
                                                            disabled={!hoursSelect.monday}
                                                        />
                                                        <TextField
                                                            fullWidth
                                                            sx={{
                                                                "& .MuiOutlinedInput-input": {
                                                                    padding: "8px 6px",
                                                                    resize: "none",
                                                                },
                                                            }}
                                                            type="time"
                                                            InputProps={{
                                                                classes: {
                                                                    root: classes.hoursInputField,
                                                                    input: classes.hoursInputTextBox,
                                                                    focused: classes.textFieldActive,
                                                                },
                                                            }}
                                                            disabled={!hoursSelect.monday}
                                                        />
                                                    </Box>
                                                </Box>
                                                <Box sx={sxs.hoursGroupContainer}>
                                                    <Box
                                                        sx={{
                                                            ...sxs.dayBoxStyle,
                                                            backgroundColor: hoursSelect.tuesday
                                                                ? sxs.dayColor.background
                                                                : null,
                                                            color: hoursSelect.tuesday ? sxs.dayColor.color : null,
                                                        }}
                                                        onClick={() =>
                                                            setHoursSelect((prev) => ({
                                                                ...prev,
                                                                tuesday: !prev.tuesday,
                                                            }))
                                                        }
                                                    >
                                                        T
                                                    </Box>

                                                    <Box sx={sxs.textFieldsHoursStyle}>
                                                        <TextField
                                                            fullWidth
                                                            sx={{
                                                                "& .MuiOutlinedInput-input": {
                                                                    padding: "8px 6px",
                                                                    resize: "none",
                                                                },
                                                            }}
                                                            type="time"
                                                            InputProps={{
                                                                classes: {
                                                                    root: classes.hoursInputField,
                                                                    input: classes.hoursInputTextBox,
                                                                    focused: classes.textFieldActive,
                                                                },
                                                            }}
                                                            disabled={!hoursSelect.tuesday}
                                                        />
                                                        <TextField
                                                            fullWidth
                                                            sx={{
                                                                "& .MuiOutlinedInput-input": {
                                                                    padding: "8px 6px",
                                                                    resize: "none",
                                                                },
                                                            }}
                                                            type="time"
                                                            InputProps={{
                                                                classes: {
                                                                    root: classes.hoursInputField,
                                                                    input: classes.hoursInputTextBox,
                                                                    focused: classes.textFieldActive,
                                                                },
                                                            }}
                                                            disabled={!hoursSelect.tuesday}
                                                        />
                                                    </Box>
                                                </Box>

                                                <Box sx={sxs.hoursGroupContainer}>
                                                    <Box
                                                        sx={{
                                                            ...sxs.dayBoxStyle,
                                                            backgroundColor: hoursSelect.wednesday
                                                                ? sxs.dayColor.background
                                                                : null,
                                                            color: hoursSelect.wednesday ? sxs.dayColor.color : null,
                                                        }}
                                                        onClick={() =>
                                                            setHoursSelect((prev) => ({
                                                                ...prev,
                                                                wednesday: !prev.wednesday,
                                                            }))
                                                        }
                                                    >
                                                        W
                                                    </Box>

                                                    <Box sx={sxs.textFieldsHoursStyle}>
                                                        <TextField
                                                            fullWidth
                                                            sx={{
                                                                "& .MuiOutlinedInput-input": {
                                                                    padding: "8px 6px",
                                                                    resize: "none",
                                                                },
                                                            }}
                                                            type="time"
                                                            InputProps={{
                                                                classes: {
                                                                    root: classes.hoursInputField,
                                                                    input: classes.hoursInputTextBox,
                                                                    focused: classes.textFieldActive,
                                                                },
                                                            }}
                                                            disabled={!hoursSelect.wednesday}
                                                        />
                                                        <TextField
                                                            fullWidth
                                                            sx={{
                                                                "& .MuiOutlinedInput-input": {
                                                                    padding: "8px 6px",
                                                                    resize: "none",
                                                                },
                                                            }}
                                                            type="time"
                                                            InputProps={{
                                                                classes: {
                                                                    root: classes.hoursInputField,
                                                                    input: classes.hoursInputTextBox,
                                                                    focused: classes.textFieldActive,
                                                                },
                                                            }}
                                                            disabled={!hoursSelect.wednesday}
                                                        />
                                                    </Box>
                                                </Box>

                                                <Box sx={sxs.hoursGroupContainer}>
                                                    <Box
                                                        sx={{
                                                            ...sxs.dayBoxStyle,
                                                            backgroundColor: hoursSelect.thursday
                                                                ? sxs.dayColor.background
                                                                : null,
                                                            color: hoursSelect.thursday ? sxs.dayColor.color : null,
                                                        }}
                                                        onClick={() =>
                                                            setHoursSelect((prev) => ({
                                                                ...prev,
                                                                thursday: !prev.thursday,
                                                            }))
                                                        }
                                                    >
                                                        T
                                                    </Box>

                                                    <Box sx={sxs.textFieldsHoursStyle}>
                                                        <TextField
                                                            fullWidth
                                                            sx={{
                                                                "& .MuiOutlinedInput-input": {
                                                                    padding: "8px 6px",
                                                                    resize: "none",
                                                                },
                                                            }}
                                                            type="time"
                                                            InputProps={{
                                                                classes: {
                                                                    root: classes.hoursInputField,
                                                                    input: classes.hoursInputTextBox,
                                                                    focused: classes.textFieldActive,
                                                                },
                                                            }}
                                                            disabled={!hoursSelect.thursday}
                                                        />
                                                        <TextField
                                                            fullWidth
                                                            sx={{
                                                                "& .MuiOutlinedInput-input": {
                                                                    padding: "8px 6px",
                                                                    resize: "none",
                                                                },
                                                            }}
                                                            type="time"
                                                            InputProps={{
                                                                classes: {
                                                                    root: classes.hoursInputField,
                                                                    input: classes.hoursInputTextBox,
                                                                    focused: classes.textFieldActive,
                                                                },
                                                            }}
                                                            disabled={!hoursSelect.thursday}
                                                        />
                                                    </Box>
                                                </Box>
                                            </Box>

                                            <Box>
                                                <Grid container ml={7}>
                                                    <Grid xs={12} sm={6} pl={3.5}>
                                                        <FormLabel label="Open Time" isRequired={false} />
                                                    </Grid>
                                                    <Grid xs={12} sm={6}>
                                                        <FormLabel label="Close Time" isRequired={false} />
                                                    </Grid>
                                                </Grid>
                                                <Box sx={sxs.hoursGroupContainer}>
                                                    <Box
                                                        sx={{
                                                            ...sxs.dayBoxStyle,
                                                            backgroundColor: hoursSelect.friday
                                                                ? sxs.dayColor.background
                                                                : null,
                                                            color: hoursSelect.friday ? sxs.dayColor.color : null,
                                                        }}
                                                        onClick={() =>
                                                            setHoursSelect((prev) => ({
                                                                ...prev,
                                                                friday: !prev.friday,
                                                            }))
                                                        }
                                                    >
                                                        F
                                                    </Box>

                                                    <Box sx={sxs.textFieldsHoursStyle}>
                                                        <TextField
                                                            fullWidth
                                                            sx={{
                                                                "& .MuiOutlinedInput-input": {
                                                                    padding: "8px 6px",
                                                                    resize: "none",
                                                                },
                                                            }}
                                                            type="time"
                                                            InputProps={{
                                                                classes: {
                                                                    root: classes.hoursInputField,
                                                                    input: classes.hoursInputTextBox,
                                                                    focused: classes.textFieldActive,
                                                                },
                                                            }}
                                                            disabled={!hoursSelect.friday}
                                                        />
                                                        <TextField
                                                            fullWidth
                                                            sx={{
                                                                "& .MuiOutlinedInput-input": {
                                                                    padding: "8px 6px",
                                                                    resize: "none",
                                                                },
                                                            }}
                                                            type="time"
                                                            InputProps={{
                                                                classes: {
                                                                    root: classes.hoursInputField,
                                                                    input: classes.hoursInputTextBox,
                                                                    focused: classes.textFieldActive,
                                                                },
                                                            }}
                                                            disabled={!hoursSelect.friday}
                                                        />
                                                    </Box>
                                                </Box>

                                                <Box sx={sxs.hoursGroupContainer}>
                                                    <Box
                                                        sx={{
                                                            ...sxs.dayBoxStyle,
                                                            backgroundColor: hoursSelect.saturday
                                                                ? sxs.dayColor.background
                                                                : null,
                                                            color: hoursSelect.saturday ? sxs.dayColor.color : null,
                                                        }}
                                                        onClick={() =>
                                                            setHoursSelect((prev) => ({
                                                                ...prev,
                                                                saturday: !prev.saturday,
                                                            }))
                                                        }
                                                    >
                                                        S
                                                    </Box>

                                                    <Box sx={sxs.textFieldsHoursStyle}>
                                                        <TextField
                                                            fullWidth
                                                            sx={{
                                                                "& .MuiOutlinedInput-input": {
                                                                    padding: "8px 6px",
                                                                    resize: "none",
                                                                },
                                                            }}
                                                            type="time"
                                                            InputProps={{
                                                                classes: {
                                                                    root: classes.hoursInputField,
                                                                    input: classes.hoursInputTextBox,
                                                                    focused: classes.textFieldActive,
                                                                },
                                                            }}
                                                            disabled={!hoursSelect.saturday}
                                                        />
                                                        <TextField
                                                            fullWidth
                                                            sx={{
                                                                "& .MuiOutlinedInput-input": {
                                                                    padding: "8px 6px",
                                                                    resize: "none",
                                                                },
                                                            }}
                                                            type="time"
                                                            InputProps={{
                                                                classes: {
                                                                    root: classes.hoursInputField,
                                                                    input: classes.hoursInputTextBox,
                                                                    focused: classes.textFieldActive,
                                                                },
                                                            }}
                                                            disabled={!hoursSelect.saturday}
                                                        />
                                                    </Box>
                                                </Box>

                                                <Box sx={sxs.hoursGroupContainer}>
                                                    <Box
                                                        sx={{
                                                            ...sxs.dayBoxStyle,
                                                            backgroundColor: hoursSelect.sunday
                                                                ? sxs.dayColor.background
                                                                : null,
                                                            color: hoursSelect.sunday ? sxs.dayColor.color : null,
                                                        }}
                                                        onClick={() =>
                                                            setHoursSelect((prev) => ({
                                                                ...prev,
                                                                sunday: !prev.sunday,
                                                            }))
                                                        }
                                                    >
                                                        S
                                                    </Box>

                                                    <Box sx={sxs.textFieldsHoursStyle}>
                                                        <TextField
                                                            fullWidth
                                                            sx={{
                                                                "& .MuiOutlinedInput-input": {
                                                                    padding: "8px 6px",
                                                                    resize: "none",
                                                                },
                                                            }}
                                                            type="time"
                                                            InputProps={{
                                                                classes: {
                                                                    root: classes.hoursInputField,
                                                                    input: classes.hoursInputTextBox,
                                                                    focused: classes.textFieldActive,
                                                                },
                                                            }}
                                                            disabled={!hoursSelect.sunday}
                                                        />
                                                        <TextField
                                                            fullWidth
                                                            sx={{
                                                                "& .MuiOutlinedInput-input": {
                                                                    padding: "8px 6px",
                                                                    resize: "none",
                                                                },
                                                            }}
                                                            type="time"
                                                            InputProps={{
                                                                classes: {
                                                                    root: classes.hoursInputField,
                                                                    input: classes.hoursInputTextBox,
                                                                    focused: classes.textFieldActive,
                                                                },
                                                            }}
                                                            disabled={!hoursSelect.sunday}
                                                        />
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box> */}
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
    );
};

export default SuperBillModal;
