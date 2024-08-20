// import { Select, MenuItem, InputBase } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CustomFormInput from "./CustomFormInput";
import {
    Box, Button, Grid, Typography,
    // FormHelperText,
} from "@mui/material";
// import FormLabel from "../label/form-label";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { adminConstants } from "../../../constants/admin";
// import { commonWidget } from "../../../styles/common";
import theme from "../../../theme";
import { providerConstants } from "../../../constants/provider";
import AddCodesTable from "./AddCodesTables";
import React, { useState } from "react";
// import Insurance from "../../../pages/app/provider/patient/insurance";
import { formButtonStyle } from "../../../styles/common";
import AddPayment from "./payment/add-payment-modal";
import EventSucessModal from "../success-modal";
// import Privacy from "../../../pages/app/provider/patient/privacy";

export const patientListStyle = makeStyles(() => ({
    formTitle: {
        fontWeight: "bold",
        padding: "10px 0px !important",
    },
    main: {
        margin: "20px",
    },
    formGridTitle: {
        color: "#000000",
        fontWeight: "bold",
        background: "#DAEAF8 !important",
        padding: "10px 10px !important",
    },
    label: {
        color: "#1A1A1A !important",
        marginBottom: "10px !important",
    },
    selectInputStyle: {
        ".MuiOutlinedInput-notchedOutline": { border: 0 },
        boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
        height: "42px !important",
        width: "100%",
        border: "none",
        "& fieldset": { border: "none" },
    },
    menuItemColorStyle: {
        color: "#1A1A1A7F",
    },
    btnTextDropList: {
        textAlign: "left",
        position: "absolute",
        left: 12,
        fontSize: "14px !important",
        fontStyle: "normal !important",
        fontFamily: "Roboto !important",
        fontWeight: "400 !important",
        lineHeight: "140%",
        color: "rgba(33, 37, 41, 0.65)",
    },

    inputField: {
        borderRadius: "5px",
        border: "none",
        "& fieldset": { border: "none" },
        boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
        height: "42px !important",
        textAlign: "center",
        padding: "13px 0px 10px 16px",
        fontSize: "16px",
        "@media (max-width: 820px)": {
            width: "100% !important",
        },
        marginTop: "10px",
    },
    inputBoxText: {
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontSize: "14px !important",
        lineHeight: "140%",
        color: "",
        width: "100%",
        resize: "vertical",
        minHeight: "15px",
    },
    inputBoxActive: {
        background: `#FFFFFF 0% 0% no-repeat padding-box !important`,
        boxShadow: `0px 0px 6px #0097F002 !important`,
        border: `1px solid #0097F0 !important`,
        borderRadius: "4px !important",
    },

}));

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
            // boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.3)",
            borderRadius: "5px",
            width: "100%",
            marginTop: "19px",
            marginBottom: "19px",
            background: 'white'
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
        fontSize: "17px",
        // marginBottom: "22px",
        // fontWeight: "700",
        margin: "15px 0",
        // color: '#000000',
        padding: '8px !important',
        background: '#DAEAF8 !important',
        // fontWeight: 'bold'
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
    },
    header: {
        marginRight: '10px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    headerTitle: {
        width: '100%',
        fontSize: '20px',
    },
    backBtn: {
        cursor: 'pointer'
    },
    details: {
        margin: '0px 10px 10px 10px',
        color: 'black',
        width: '12rem',
    },
    providerKeyTypo: {
        // fontSize: "14px",
        // fontWeight: "700",
        marginBottom: "1rem",
        width: "9rem",
        color: 'black'
    },
    title: {
        // fontSize: "14px",
        // fontWeight: "700",
        marginBottom: "1rem",
        width: "16rem",
        color: 'black'
    },
    keyValyeFlex: {
        display: "flex",
        gap: "20px",
        marginBottom: "0.5rem",
        marginLeft: '10px'
    },
    fontBoldStyle: {
        // fontSize: "14px",
        // fontWeight: "bold",
    },
    providerValueTypo: {
        // fontSize: "14px",
        color: "black",
    },
};


const {
    //ADD_NEW_PROVIDER_GROUP,
    //ADD_PROVIDER_LOGO,
    //PROVIDER_GROUP_NAME,
    CONTACT_NUMBER,
    //GROUP_NPI_NUMBER,
    EMAIL_ID,
    //WEBSITE,
    // FAX_ID,
    //DESCRIPTION,
    //EDIT_PROVIDER_GROUP,
    //ENTER_PROVIDER_GROUP_NAME,
    // ENTER_CONTACT_NUMBER,
    //ENTER_GROUP_NIP_NUMBER,
    // ENTER_EMAIL_ID,
    //ENTER_DESCRIPTION,
    // LOCATION_NAME,
    // LOCATION_ID,
    // ADD_NEW_LOCATION_LOGO,
    //ADD_NEW_LOCATION,
    // ENTER_LOCATION_ID,
    // SPECIALITY_TYPE,
    // ENTER_FAX_ID,
    // ADDRESS_ZIP_CODE,
    // ADDRESS_COUNTRY,
    // ADDRESS_STATE,
    // ADDRESS_CITY,
    // ADDRESS_ADDRESS_2,
    // ADDRESS_ADDRESS_1,
} = adminConstants;

const {
    // PATIENT_NAME,
    PATIENT_ID,
    // PATIENT_DOB,
    // SEARCH_ICD_CODE,
    VISIT_DATE,
    VISIT_TIME,
    VISIT_TYPE,
    SERVICE_LOCATION,
    SERVICE_STATE,
    PLACE_OF_SERVICE,
    CHIEF_COMPLAINT,
    FIRST_NAME,
    LAST_NAME,
    NPI_NUMBER,
    PROCEDURE_CODE,
    DIAGNOSIS_CODE,
    VISIT_DETAILS,
    PATIENT_DETAILS,
    PROVIDER_DETAILS,
    HCPCS_CODE,
    TOTAL_CHARGES,
    COPAY,
    COINSURANCE,
    PAYMENT,
    // CONTACT_NUMBER,
    // EMAIL_ID,
    STREET,
    CITY,
    STATE_PROVINCE_AREA,
    ZIP_CODE,
    REFERRING_PROVIDER_NAME,
    REFERRING_PROVIDER_NPI_NUMBER,
    CREATE_SUPER_BILL,
    MODIFY_SUPER_BILL
} = providerConstants;

const visitDetails = [
    {
        id: '1',
        name: 'visitDate',
        value: '',
        label: `${VISIT_DATE}`,
        isRequired: false,
        error: '',
        flex: 1,
        placeholder: `Choose ${VISIT_DATE}`
    },
    {
        id: '',
        name: 'visitTime',
        value: '',
        label: `${VISIT_TIME}`,
        isRequired: false,
        error: '',
        flex: 1,
        placeholder: `Select ${VISIT_TIME}`

    },
    {
        id: '',
        name: 'visitType',
        value: '',
        label: `${VISIT_TYPE}`,
        isRequired: false,
        error: '',
        flex: 1,
        placeholder: `Select ${VISIT_TYPE}`

    },
    {
        id: '',
        name: 'serviceLocation',
        value: '',
        label: `${SERVICE_LOCATION}`,
        isRequired: false,
        error: '',
        flex: 1,
        placeholder: `Select ${SERVICE_LOCATION}`

    },
    {
        id: '',
        name: 'placeOfService',
        value: '',
        label: `${PLACE_OF_SERVICE}`,
        isRequired: false,
        error: '',
        flex: 1,
        placeholder: `Select ${PLACE_OF_SERVICE}`

    },
    {
        id: '',
        name: 'serviceState',
        value: '',
        label: `${SERVICE_STATE}`,
        isRequired: false,
        error: '',
        placeholder: `Select ${SERVICE_STATE}`

    },
    {
        id: '',
        name: 'chiefComplaint',
        value: '',
        label: `${CHIEF_COMPLAINT}`,
        isRequired: false,
        error: '',
        placeholder: `Enter ${CHIEF_COMPLAINT}`
    },
];

const providerDetails = [
    {
        id: '1',
        name: 'visitDate',
        value: '',
        label: `${FIRST_NAME}`,
        isRequired: false,
        error: '',
        flex: 1,
        placeholder: `Enter ${FIRST_NAME}`

    },
    {
        id: '',
        name: 'visitTime',
        value: '',
        label: `${LAST_NAME}`,
        isRequired: false,
        error: '',
        flex: 1,
        placeholder: `Enter ${LAST_NAME}`

    },
    {
        id: '',
        name: 'visitType',
        value: '',
        label: `${NPI_NUMBER}`,
        isRequired: false,
        error: '',
        flex: 1,
        placeholder: `Enter ${NPI_NUMBER}`

    },
    {
        id: '',
        name: 'serviceLocation',
        value: '',
        label: `${CONTACT_NUMBER}`,
        isRequired: false,
        error: '',
        flex: 1,
        placeholder: `Enter ${CONTACT_NUMBER}`

    },
    {
        id: '',
        name: 'placeOfService',
        value: '',
        label: `${EMAIL_ID}`,
        isRequired: false,
        error: '',
        flex: 1,
        placeholder: `Enter ${EMAIL_ID}`

    },
    {
        id: '',
        name: 'serviceState',
        value: '',
        label: `${STREET}`,
        isRequired: false,
        error: '',
        flex: 1,
        placeholder: `Enter ${STREET}`

    },
    {
        id: '',
        name: 'chiefComplaint',
        value: '',
        label: `${CITY}`,
        isRequired: false,
        error: '',
        flex: 1,
        placeholder: `Search & Select ${CITY}`

    },
    {
        id: '',
        name: 'chiefComplaint',
        value: '',
        label: `${STATE_PROVINCE_AREA}`,
        isRequired: false,
        error: '',
        flex: 1,
        placeholder: `Search & Select State`

    },
    {
        id: '',
        name: 'chiefComplaint',
        value: '',
        label: `${ZIP_CODE}`,
        isRequired: false,
        error: '',
        flex: 1,
        placeholder: `Enter ${ZIP_CODE}`

    },
    {
        id: '',
        name: 'chiefComplaint',
        value: '',
        label: `${REFERRING_PROVIDER_NAME}`,
        isRequired: false,
        error: '',
        flex: 1,
        placeholder: `Enter Provider`

    },
    {
        id: '',
        name: 'chiefComplaint',
        value: '',
        label: `${REFERRING_PROVIDER_NPI_NUMBER}`,
        isRequired: false,
        error: '',
        flex: 1,
        placeholder: `Enter ${NPI_NUMBER}`

    },
]

const patientDetails = [
    {
        id: '',
        name: 'chiefComplaint',
        value: '',
        label: `${PATIENT_ID}`,
        isRequired: false,
        error: '',
        flex: 1,
        placeholder: `Enter ${PATIENT_ID}`

    },
    {
        id: '',
        name: 'chiefComplaint',
        value: '',
        label: `${FIRST_NAME}`,
        isRequired: false,
        error: '',
        flex: 1,
        placeholder: `${FIRST_NAME}`

    },
    {
        id: '',
        name: 'chiefComplaint',
        value: '',
        label: `${LAST_NAME}`,
        isRequired: false,
        error: '',
        flex: 1,
        placeholder: `${LAST_NAME}`

    },
    {
        id: '',
        name: 'chiefComplaint',
        value: '',
        label: `${EMAIL_ID}`,
        isRequired: false,
        error: '',
        flex: 1,
        placeholder: `${EMAIL_ID}`

    },
    {
        id: '',
        name: 'chiefComplaint',
        value: '',
        label: `${CONTACT_NUMBER}`,
        isRequired: false,
        error: '',
        flex: 1,
        placeholder: `${CONTACT_NUMBER}`

    },
]

const diagnosisColumns: any[] = [
    { id: "srno", label: "Sr.no", minWidth: 120, displaySort: true },
    { id: "code", label: "ICD Code", minWidth: 400, displaySort: true },
    { id: "modifier", label: "Modifier", minWidth: 170, displaySort: true },
    { id: "diagnosisPointer", label: "Diagnosis Pointer", minWidth: 160, displaySort: true },
    { id: "quantity", label: "Quantity", minWidth: 160, displaySort: true },
    { id: "charges", label: "Charges", minWidth: 160, displaySort: true },
    { id: "discount", label: "Dis (-$)", minWidth: 150, displaySort: true },
    { id: "tax", label: "Tax ($)", minWidth: 150, displaySort: true },
    { id: "net", label: "Net ($)", minWidth: 150, displaySort: false },
    { id: "action", label: "Action", minWidth: 150, displaySort: false }
];

const procedureColumns: any[] = [
    { id: "srno", label: "Sr.no", minWidth: 120, displaySort: true },
    { id: "code", label: "CPT Code", minWidth: 400, displaySort: true },
    { id: "modifier", label: "Modifier", minWidth: 170, displaySort: true },
    { id: "diagnosisPointer", label: "Diagnosis Pointer", minWidth: 160, displaySort: true },
    { id: "quantity", label: "Quantity", minWidth: 160, displaySort: true },
    { id: "charges", label: "Charges", minWidth: 160, displaySort: true },
    { id: "discount", label: "Dis (-$)", minWidth: 150, displaySort: true },
    { id: "tax", label: "Tax ($)", minWidth: 150, displaySort: true },
    { id: "net", label: "Net ($)", minWidth: 150, displaySort: false },
    { id: "action", label: "Action", minWidth: 150, displaySort: false }
];

const hcpscCode: any[] = [
    { id: "srno", label: "Sr.no", minWidth: 120, displaySort: true },
    { id: "code", label: "HCPCS Code", minWidth: 400, displaySort: true },
    { id: "modifier", label: "Modifier", minWidth: 170, displaySort: true },
    { id: "diagnosisPointer", label: "Diagnosis Pointer", minWidth: 160, displaySort: true },
    { id: "quantity", label: "Quantity", minWidth: 160, displaySort: true },
    { id: "charges", label: "Charges", minWidth: 160, displaySort: true },
    { id: "discount", label: "Dis (-$)", minWidth: 150, displaySort: true },
    { id: "tax", label: "Tax ($)", minWidth: 150, displaySort: true },
    { id: "net", label: "Net ($)", minWidth: 150, displaySort: false },
    { id: "action", label: "Action", minWidth: 150, displaySort: false }
];

const totalCharges: any[] = [
    { id: "srno", label: "Sr.no", minWidth: 120, displaySort: true },
    { id: "code", label: "Charge Type", minWidth: 400, displaySort: true },
    { id: "modifier", label: "Line Item", minWidth: 220, displaySort: true },
    { id: "diagnosisPointer", label: "Charges ($)", minWidth: 220, displaySort: true },
    { id: "quantity", label: "Quantity", minWidth: 210, displaySort: true },
    { id: "discount", label: "Dis (-$)", minWidth: 200, displaySort: true },
    { id: "tax", label: "Tax ($)", minWidth: 200, displaySort: true },
    { id: "net", label: "Net ($)", minWidth: 200, displaySort: false },
];

const coPayCoInsurance: any[] = [
    { id: "srno", label: "Subtotal ($)", minWidth: 120, displaySort: true },
    { id: "code", label: "Adv.Paid ($)", minWidth: 350, displaySort: true },
    { id: "modifier", label: "Insurance amount to be submit ($)", minWidth: 350, displaySort: true },
    { id: "diagnosisPointer", label: "CP-Pay ($)", minWidth: 250, displaySort: true },
    { id: "quantity", label: "Total ($)", minWidth: 250, displaySort: true },
    { id: "discount", label: "Prev. Balance ($)", minWidth: 250, displaySort: true },
    { id: "tax", label: "Total Balance ($)", minWidth: 200, displaySort: true },
];

const diagnosisData: any[] = [
    { srno: '1', code: '757473', modifier: '9876', diagnosisPointer: '4544', quantity: '7654', charges: '345', discount: '43', tax: '23', net: '2' },
    { srno: '2', code: '938793', modifier: '7654', diagnosisPointer: '7456', quantity: '6545', charges: '653', discount: '65', tax: '53', net: '3' },
    { srno: '3', code: '527984', modifier: '4684', diagnosisPointer: '3476', quantity: '8653', charges: '876', discount: '23', tax: '65', net: '5' }
]

const procedureData: any[] = [
    { srno: '1', code: '757473', modifier: '9876', diagnosisPointer: '4544', quantity: '7654', charges: '345', discount: '43', tax: '23', net: '2' },
    { srno: '2', code: '938793', modifier: '7654', diagnosisPointer: '7456', quantity: '6545', charges: '653', discount: '65', tax: '53', net: '3' },
    { srno: '3', code: '527984', modifier: '4684', diagnosisPointer: '3476', quantity: '8653', charges: '876', discount: '23', tax: '65', net: '5' }
]

type Props = {
    action: string;
    onClose: () => void;
}

function CreateSuperBillPage(props: Props) {

    const [openPaymentModal, setOpen] = useState(false);
    const [openSuccessModal, setopenSuccessModal] = useState(false);
    // const [scroll, setScroll] = useState<DialogProps["scroll"]>("paper");
    // const [hoursSelect, setHoursSelect] = useState({
    //     monday: true,
    //     tuesday: true,
    //     wednesday: true,
    //     thursday: true,
    //     friday: true,
    //     saturday: true,
    //     sunday: true,
    // });
    // const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
    //     setOpen(true);
    //     setScroll(scrollType);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };



    // const classes = commonWidget();
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

    const handleClose = () => {
        setOpen(false)
    }

    const handleCloseSucessModal = () => {
        setopenSuccessModal(true)
    }

    return (
        <>
            <Formik
                initialValues={{}}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                {() => (
                    <Form>
                        <Box className={styles.addressFormContainer}>
                            <Box sx={sxs.header}>
                                <Box sx={sxs.headerTitle}>
                                    {(() => {
                                        switch (props.action) {
                                            case CREATE_SUPER_BILL:
                                                return (<>{CREATE_SUPER_BILL}</>)
                                            case MODIFY_SUPER_BILL:
                                                return (<>{MODIFY_SUPER_BILL}</>)
                                            default:
                                                return;
                                        }
                                    })()}
                                </Box>
                                <Box sx={sxs.backBtn} onClick={props.onClose}>Back</Box>
                            </Box>
                            {props.action == CREATE_SUPER_BILL && <>
                                <Box>
                                    <Box sx={sxs.addressTitle}>
                                        {VISIT_DETAILS}
                                    </Box>
                                    <Grid container spacing={3}>
                                        {visitDetails.map(input => {
                                            return (
                                                <CustomFormInput id={input.id} name={input.name} label={input.label} value={input.value} error={input.error}
                                                    isRequired={input.isRequired} flex={input.flex || 0} placeholder={input.placeholder}
                                                />
                                            );
                                        })}
                                    </Grid>
                                </Box>
                                <Box>
                                    <Box sx={sxs.addressTitle}>
                                        {PROVIDER_DETAILS}
                                    </Box>
                                    <Grid container spacing={3}>
                                        {providerDetails.map(input => {
                                            return (
                                                <CustomFormInput id={input.id} name={input.name} label={input.label} value={input.value} error={input.error}
                                                    isRequired={input.isRequired} flex={input.flex || 0} placeholder={input.placeholder}
                                                />
                                            );
                                        })}
                                    </Grid>
                                </Box>
                                <Box>
                                    <Box sx={sxs.addressTitle}>
                                        {PATIENT_DETAILS}
                                    </Box>
                                    <Grid container spacing={3}>

                                        {patientDetails.map(input => {
                                            return (
                                                <CustomFormInput id={input.id} name={input.name} label={input.label} value={input.value} error={input.error}
                                                    isRequired={input.isRequired} flex={input.flex || 0} placeholder={input.placeholder}
                                                />
                                            );
                                        })}
                                    </Grid>
                                </Box>
                            </>}
                            {props.action == MODIFY_SUPER_BILL && <>
                                <Box display={'flex'} gap={3}>
                                    <Box flex={1}>
                                        <Box sx={sxs.addressTitle}>
                                            {VISIT_DETAILS}
                                        </Box>
                                        <Grid container xs={12}>
                                            <Grid item xs={6}>
                                                <Box sx={sxs.keyValyeFlex}>
                                                    <Typography sx={sxs.providerKeyTypo}>
                                                        Visit Date
                                                    </Typography>
                                                    <Typography sx={sxs.fontBoldStyle}>:</Typography>
                                                    <Typography sx={sxs.providerValueTypo}>
                                                        12 Oct 2022
                                                    </Typography>
                                                </Box>
                                                <Box sx={sxs.keyValyeFlex}>
                                                    <Typography sx={sxs.providerKeyTypo}>
                                                        Visit Type
                                                    </Typography>
                                                    <Typography sx={sxs.fontBoldStyle}>:</Typography>
                                                    <Typography sx={sxs.providerValueTypo}>
                                                        In-Person
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={6} >
                                                <Box sx={sxs.keyValyeFlex}>
                                                    <Typography sx={sxs.providerKeyTypo}>
                                                        Visit Time
                                                    </Typography>
                                                    <Typography sx={sxs.fontBoldStyle}>:</Typography>
                                                    <Typography sx={sxs.providerValueTypo}>
                                                        11:00 AM To 12:00 PM
                                                    </Typography>
                                                </Box>
                                                <Box sx={sxs.keyValyeFlex}>
                                                    <Typography sx={sxs.providerKeyTypo}>
                                                        Service Location
                                                    </Typography>
                                                    <Typography sx={sxs.fontBoldStyle}>:</Typography>
                                                    <Typography sx={sxs.providerValueTypo}>
                                                        Location
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Box sx={sxs.keyValyeFlex}>
                                                    <Typography sx={sxs.providerKeyTypo}>
                                                        Place of Service
                                                    </Typography>
                                                    <Typography sx={sxs.fontBoldStyle}>:</Typography>
                                                    <Typography sx={sxs.providerValueTypo}>
                                                        11 -Office
                                                    </Typography>
                                                </Box>
                                                <Box sx={sxs.keyValyeFlex}>
                                                    <Typography sx={sxs.providerKeyTypo}>
                                                        Chief Complaint
                                                    </Typography>
                                                    <Typography sx={sxs.fontBoldStyle}>:</Typography>
                                                    <Typography sx={sxs.providerValueTypo}>
                                                        Headaches And Sickness
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Box sx={sxs.keyValyeFlex}>
                                                    <Typography sx={sxs.providerKeyTypo}>
                                                        Service State
                                                    </Typography>
                                                    <Typography sx={sxs.fontBoldStyle}>:</Typography>
                                                    <Typography sx={sxs.providerValueTypo}>
                                                        New York
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box flex={1}>
                                        <Box sx={sxs.addressTitle} flex={1}>
                                            {PATIENT_DETAILS}
                                        </Box>
                                        <Grid container xs={12}>
                                            <Grid item xs={6}>
                                                <Box sx={sxs.keyValyeFlex}>
                                                    <Typography sx={sxs.providerKeyTypo}>
                                                        First Name
                                                    </Typography>
                                                    <Typography sx={sxs.fontBoldStyle}>:</Typography>
                                                    <Typography sx={sxs.providerValueTypo}>
                                                        Heena
                                                    </Typography>
                                                </Box>
                                                <Box sx={sxs.keyValyeFlex}>
                                                    <Typography sx={sxs.providerKeyTypo}>
                                                        DOB
                                                    </Typography>
                                                    <Typography sx={sxs.fontBoldStyle}>:</Typography>
                                                    <Typography sx={sxs.providerValueTypo}>
                                                        21 Oct 2000
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={6} >
                                                <Box sx={sxs.keyValyeFlex}>
                                                    <Typography sx={sxs.providerKeyTypo}>
                                                        Last Name
                                                    </Typography>
                                                    <Typography sx={sxs.fontBoldStyle}>:</Typography>
                                                    <Typography sx={sxs.providerValueTypo}>
                                                        West
                                                    </Typography>
                                                </Box>
                                                <Box sx={sxs.keyValyeFlex}>
                                                    <Typography sx={sxs.providerKeyTypo}>
                                                        Contact Number
                                                    </Typography>
                                                    <Typography sx={sxs.fontBoldStyle}>:</Typography>
                                                    <Typography sx={sxs.providerValueTypo}>
                                                        (342) 2345-3938
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Box sx={sxs.keyValyeFlex}>
                                                    <Typography sx={sxs.providerKeyTypo}>
                                                        Address
                                                    </Typography>
                                                    <Typography sx={sxs.fontBoldStyle}>:</Typography>
                                                    <Typography sx={sxs.providerValueTypo}>
                                                        919 St, Fairbanks, Alaska 99726
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                                <Box>
                                    <Box sx={sxs.addressTitle}>
                                        {PROVIDER_DETAILS}
                                    </Box>
                                    <Grid container xs={12}>
                                        <Grid item xs={3}>
                                            <Box sx={sxs.keyValyeFlex}>
                                                <Typography sx={sxs.providerKeyTypo}>
                                                    First Name
                                                </Typography>
                                                <Typography sx={sxs.fontBoldStyle}>:</Typography>
                                                <Typography sx={sxs.providerValueTypo}>
                                                    Corina
                                                </Typography>
                                            </Box>
                                            <Box sx={sxs.keyValyeFlex}>
                                                <Typography sx={sxs.providerKeyTypo}>
                                                    Email Id
                                                </Typography>
                                                <Typography sx={sxs.fontBoldStyle}>:</Typography>
                                                <Typography sx={sxs.providerValueTypo}>
                                                    corina@gmial.com
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={3} >
                                            <Box sx={sxs.keyValyeFlex}>
                                                <Typography sx={sxs.providerKeyTypo}>
                                                    Last Name
                                                </Typography>
                                                <Typography sx={sxs.fontBoldStyle}>:</Typography>
                                                <Typography sx={sxs.providerValueTypo}>
                                                    Geller
                                                </Typography>
                                            </Box>
                                            <Box sx={sxs.keyValyeFlex}>
                                                <Typography sx={{...sxs.providerKeyTypo, width: '12rem'}}>
                                                    Referring Provider Name
                                                </Typography>
                                                <Typography sx={sxs.fontBoldStyle}>:</Typography>
                                                <Typography sx={sxs.providerValueTypo}>
                                                    Thurman Crespo
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Box sx={sxs.keyValyeFlex}>
                                                <Typography sx={sxs.providerKeyTypo}>
                                                    NPI Number
                                                </Typography>
                                                <Typography sx={sxs.fontBoldStyle}>:</Typography>
                                                <Typography sx={sxs.providerValueTypo}>
                                                    3926594652
                                                </Typography>
                                            </Box>
                                            <Box sx={sxs.keyValyeFlex}>
                                                <Typography sx={{...sxs.providerKeyTypo, width: '16rem'}}>
                                                    Referring Provider NPI Number
                                                </Typography>
                                                <Typography sx={sxs.fontBoldStyle}>:</Typography>
                                                <Typography sx={{ ...sxs.providerValueTypo }}>
                                                    676543247
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Box sx={sxs.keyValyeFlex}>
                                                <Typography sx={sxs.providerKeyTypo}>
                                                    Contact Number
                                                </Typography>
                                                <Typography sx={sxs.fontBoldStyle}>:</Typography>
                                                <Typography sx={sxs.providerValueTypo}>
                                                    (342) 2345-3938
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Box sx={sxs.keyValyeFlex}>
                                                <Typography sx={sxs.providerKeyTypo}>
                                                    Address
                                                </Typography>
                                                <Typography sx={sxs.fontBoldStyle}>:</Typography>
                                                <Typography sx={sxs.providerValueTypo}>
                                                    Stimple Ct, Fairbanks, Alaska 9775
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </>}
                            <Box>
                                <Box sx={sxs.addressTitle}>
                                    {DIAGNOSIS_CODE}
                                </Box>
                                <Box className={styles.dialogTopContainer}>
                                    <Box className={styles.upperBoxContainer}>
                                        <Box className={styles.mainBoxContainer}>
                                            <AddCodesTable columns={diagnosisColumns} data={diagnosisData} showAddButton={true} searchPlaceHolder="Search ICD Code" />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box>
                                <Box sx={sxs.addressTitle}>
                                    {PROCEDURE_CODE}
                                </Box>
                                <Box className={styles.dialogTopContainer}>
                                    <Box className={styles.upperBoxContainer}>
                                        <Box className={styles.mainBoxContainer}>
                                            <AddCodesTable columns={procedureColumns} data={procedureData} showAddButton={true} searchPlaceHolder="Search CPT Code" />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box>
                                <Box sx={sxs.addressTitle}>
                                    {HCPCS_CODE}
                                </Box>
                                <Box className={styles.dialogTopContainer}>
                                    <Box className={styles.upperBoxContainer}>
                                        <Box className={styles.mainBoxContainer}>
                                            <AddCodesTable columns={hcpscCode} showAddButton={true} searchPlaceHolder="Search HCPCS Code" />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box>
                                <Box sx={sxs.addressTitle}>
                                    {TOTAL_CHARGES}
                                </Box>
                                <Box className={styles.dialogTopContainer}>
                                    <Box className={styles.upperBoxContainer}>
                                        <Box className={styles.mainBoxContainer}>
                                            <AddCodesTable columns={totalCharges} showAddButton={false} />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box>
                                <Box sx={sxs.addressTitle}>
                                    {COPAY}, {COINSURANCE}
                                </Box>
                                <Box className={styles.dialogTopContainer}>
                                    <Box className={styles.upperBoxContainer}>
                                        <Box className={styles.mainBoxContainer}>
                                            <AddCodesTable columns={coPayCoInsurance} showAddButton={false} />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box>
                                <Box sx={sxs.addressTitle}>
                                    {PAYMENT}
                                </Box>
                                <Box className={styles.dialogTopContainer}>
                                    <Box className={styles.upperBoxContainer}>
                                        <Box className={styles.mainBoxContainer}>
                                            <Button sx={{ ...formButtonStyle.mainButtonStyle, background: '#36598C', color: 'white', "&:hover": { background: '#36588C' } }} onClick={() => setOpen(true)}>
                                                Add Payment
                                            </Button>
                                            <AddPayment open={openPaymentModal} onClose={handleClose}></AddPayment>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'end', }}>
                                <Button sx={{ ...formButtonStyle.mainButtonStyle, background: '#36598C', color: 'white', "&:hover": { background: '#36588C' } }} onClick={handleCloseSucessModal}>
                                    Save Bill
                                </Button>
                            </Box>
                        </Box>
                    </Form>
                )}
            </Formik>
            {openSuccessModal && (
                <EventSucessModal
                    onClose={handleCloseSucessModal}
                    message="Supper Bill Successfully Created"
                />
            )}
        </>
    );
}

export default React.memo(CreateSuperBillPage);