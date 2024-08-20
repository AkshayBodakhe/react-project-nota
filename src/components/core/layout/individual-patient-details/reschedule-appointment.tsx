/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import theme from "../../../../theme";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import {
    Dialog,
    DialogContent,
    DialogActions,
    Grid,
    Typography,
    ButtonBase,
    MenuItem,
    Select,
    InputBase,
    InputAdornment,
    IconButton,
    Box,
    DialogTitle,
} from "@mui/material";
// import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { makeStyles } from "@mui/styles";
import CustomFormLabel from "../../../common/custom-form-label";
import dayjs from "dayjs";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { actionBtns, formBottom, formButtonStyle, formTitle } from "../../../../styles/common";
dayjs.locale("en");

export const rescheduleStyle = makeStyles(() => ({
    textheading: {
        color: "#1A1A1A80 !important",
        fontWeight: "600 !important",
        paddingBottom: "10px!important ",
    },
    textvalue: {
        color: "#1A1A1ACC !important",
        fontWeight: "600 !important",
    },
    textFieldFullWidth: {
        borderRadius: "5px",
        border: "none",
        "& fieldset": { border: "none" },
        boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
        height: "42px !important",
        textAlign: "center",
        padding: "13px 0px 10px 16px",
        fontSize: "16px",
    },
    textFieldInput: {
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "14px",
        lineHeight: "140%",
        color: "",
        width: "100%",
        resize: "vertical",
        minHeight: "15px",
        "&::placeholder": {
            fontSize: "14px",
            fontWeight: "500 !important",
        },
    },
    textFieldActive: {
        background: `${theme.palette.primary.light} 0% 0% no-repeat padding-box !important`,
        boxShadow: `0px 0px 6px ${theme.palette.secondary.main} !important`,
        border: `1px solid ${theme.palette.primary.main} !important`,
        borderRadius: "4px !important",
    },
    timeSlot: {
        display: "flex",
        justifyContent: "space-between",
        cursor: "pointer",
    },
}));
export const sxs = {
    timeStyle: {
        margin: "4px 10px 2px 0px",
        boxShadow: "0px 5px 8px #00000029",
        padding: "13px 20px",
        borderRadius: "5px",
        background: "#FFFFFF",
        color: " #00000057",
        fontWeight: "600",
        opacity: " 1",
    },
    slotStyle: {
        margin: "8px 0 0 0px",
        fontWeight: "600",
    },
    inputSelection: {
        height: "50px",
        boxSizing: "border-box",
        marginTop: "0px",
        padding: "0px",
    },
    calendarIcon: {
        marginRight: "0px",
    },
};
export const selectInputStyle = {
    ".MuiOutlinedInput-notchedOutline": { border: 0 },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    height: "42px !important",
    width: "100%",
};
const locationList = [
    "Calle Longitudinal Sur 0 - Km. 255,Hospital,Chile",
    "Calle Placilla 0184,Hospital,Chile",
    "Avenida Príncipe De Gales 8871,Hospital,Chile",
    "Calle Longitudinal Sur 0 - Km. 255,Hospital,Chile",
    "Calle Longitudinal Sur 0 - Km. 255,Hospital,Chile",
    "Calle Placilla 0184,Hospital,Chile",
    "Avenida Príncipe De Gales 8871,Hospital,Chile",
    "Calle Longitudinal Sur 0 - Km. 255,Hospital,Chile",
];

// const intakeFormList = [
//     "Medical Brief Intake Form",
//     "InTake form 1",
//     "Intake form 2",
// ];
interface RescheduleAppointmentDialogProps {
    open: boolean;
    onClose: () => void;
    onEventSuccessModalOpen: () => void;
}

export const RescheduleAppointment: React.FC<
    RescheduleAppointmentDialogProps
> = ({ open, 
        onClose,
        // onEventSuccessModalOpen 
    }) => {
    const classes = rescheduleStyle();
    const [rescheduleAppointment, setRescheduleAppointment] = useState({
        location: "",
        datetime: "",
        reasonforappointment: "",
        patientappointmentnote: "",
        intakeplan: "",
    });

    const ITEM_HEIGHT = 25;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 50,
            },
        },
    };
    const handleSelectOption = (e: any) => {
        const { value, name } = e.target;
        setRescheduleAppointment((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const inputData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setRescheduleAppointment((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    // const handleSaveandClose = () => {
    //     onEventSuccessModalOpen();
    // };
    //dateandtime
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState();
    const handleDatePickerOpen = () => {
        setIsDatePickerOpen((prev) => !prev);
    };
    const handleTimeSlotSelect = (time: any) => {
        setSelectedTime(time);
        setIsDatePickerOpen((prev) => !prev);
    };
    const formattedDate = selectedDate
        ? dayjs(selectedDate).format("DD MMM YYYY")
        : "";

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
                <DialogTitle id="scroll-dialog-title" sx={{ background: '#F5F6F9' }}>
                    <Typography sx={formTitle}>Reschedule Appointment</Typography>
                </DialogTitle>
                <DialogContent sx={{ overflowY: "hidden" }}>
                    {/* <Grid container>
                        <Grid item xs={11}>
                            <Typography
                                variant="h1"
                                sx={{ color: "#1A1A1A", fontWeight: "bold" }}
                            >
                                Reschedule Appointment
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={1}
                            sx={{ display: "flex", justifyContent: "flex-end" }}
                        >
                            {" "}
                            <ButtonBase onClick={onClose}>
                                <CloseOutlinedIcon />
                            </ButtonBase>
                        </Grid>
                    </Grid> */}

                    <Grid container pt={2}>
                        <Grid container>
                            <Grid item xs={6}>
                                <Grid container>
                                    <Grid item xs={5}>
                                        <Typography className={classes.textheading}>
                                            Patient Name
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className={classes.textvalue}>
                                            Heena West
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={5}>
                                        <Typography className={classes.textheading}>
                                            Speciality
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className={classes.textvalue}>
                                            Dermatology
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={5}>
                                        <Typography className={classes.textheading}>
                                            Appointment Type
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className={classes.textvalue}>
                                            New Patient
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={5}>
                                        <Typography className={classes.textheading}>
                                            Visit Type
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className={classes.textvalue}>
                                            In-Patient
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container>
                                    <Grid item xs={5}>
                                        <Typography className={classes.textheading}>
                                            Provider Name
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className={classes.textvalue}>
                                            Henna West
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={5}>
                                        <Typography className={classes.textheading}>
                                            Appointment Status
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className={classes.textvalue}>
                                            Waiting Room
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={5}>
                                        <Typography className={classes.textheading}>
                                            Patient Pay Type
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className={classes.textvalue}>
                                            Insurance
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={5}>
                                        <Typography className={classes.textheading}>
                                            Authorization
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className={classes.textvalue}>
                                            Religare(NCB5564367446)
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid container pt={2}>
                                <CustomFormLabel label="Location" />
                                <Select
                                    sx={selectInputStyle}
                                    value={rescheduleAppointment.location}
                                    name="location"
                                    onChange={(e: any) => handleSelectOption(e)}
                                    renderValue={(selected) => {
                                        if (!selected) {
                                            return (
                                                <span>
                                                    <Typography
                                                        variant="h5"
                                                        sx={{
                                                            color: "#1A1A1A80",
                                                        }}
                                                    >
                                                        Select Type
                                                    </Typography>
                                                </span>
                                            );
                                        }
                                        return <Typography variant="h5">{selected}</Typography>;
                                    }}
                                    MenuProps={MenuProps}
                                    displayEmpty
                                >
                                    {locationList.map((data) => {
                                        return (
                                            <MenuItem value={data} sx={{ color: "#1A1A1A7F" }}>
                                                {data}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </Grid>{" "}
                            <Grid container pt={2}>
                                <CustomFormLabel label="Date & Time" isRequired={true} />
                                <InputBase
                                    sx={sxs.inputSelection}
                                    fullWidth
                                    id="document-name-label"
                                    name="name"
                                    placeholder="Choose"
                                    role="textbox"
                                    value={
                                        selectedTime && formattedDate
                                            ? `${formattedDate} ${selectedTime}`
                                            : ""
                                    }
                                    type="text"
                                    classes={{
                                        root: classes.textFieldFullWidth,
                                        input: classes.textFieldInput,
                                        focused: classes.textFieldActive,
                                    }}
                                    startAdornment={
                                        <InputAdornment position="start" sx={sxs.calendarIcon}>
                                            <IconButton onClick={handleDatePickerOpen}>
                                                <EventAvailableIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                {isDatePickerOpen && (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "start",
                                        }}
                                    >
                                        <Box sx={{ marginTop: "20px", marginRight: "95px" }}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DateCalendar
                                                    sx={{
                                                        margin: "0px",
                                                        width: "420px",
                                                        boxShadow: "0px 0px 8px #00000029",
                                                    }}
                                                    onChange={(newDate: any) => setSelectedDate(newDate)}
                                                />
                                            </LocalizationProvider>
                                        </Box>
                                        <Box sx={{ marginTop: "8px" }}>
                                            <div>
                                                {
                                                    <div>
                                                        <Typography sx={sxs.slotStyle}>
                                                            Morning Slot
                                                        </Typography>
                                                        <div className={classes.timeSlot}>
                                                            <div
                                                                onClick={() => handleTimeSlotSelect("10:00 AM")}
                                                            >
                                                                <Typography sx={sxs.timeStyle}>
                                                                    10:00 AM
                                                                </Typography>
                                                            </div>
                                                            <div
                                                                onClick={() => handleTimeSlotSelect("11:00 AM")}
                                                            >
                                                                <Typography sx={sxs.timeStyle}>
                                                                    11.00 AM
                                                                </Typography>
                                                            </div>
                                                            <div
                                                                onClick={() => handleTimeSlotSelect("11:30 AM")}
                                                            >
                                                                <Typography sx={sxs.timeStyle}>
                                                                    11.30 AM
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                        <Typography sx={sxs.slotStyle}>
                                                            Afternoon Slot
                                                        </Typography>
                                                        <div className={classes.timeSlot}>
                                                            <div
                                                                onClick={() => handleTimeSlotSelect("12:00 AM")}
                                                            >
                                                                <Typography sx={sxs.timeStyle}>
                                                                    12:00 AM
                                                                </Typography>
                                                            </div>
                                                            <div
                                                                onClick={() => handleTimeSlotSelect("12:10 AM")}
                                                            >
                                                                <Typography sx={sxs.timeStyle}>
                                                                    12.10 AM
                                                                </Typography>
                                                            </div>
                                                            <div
                                                                onClick={() => handleTimeSlotSelect("12:20 AM")}
                                                            >
                                                                <Typography sx={sxs.timeStyle}>
                                                                    12.20 PM
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                        <div style={{ padding: "7px" }}></div>
                                                        <div className={classes.timeSlot}>
                                                            <div
                                                                onClick={() => handleTimeSlotSelect("12:00 AM")}
                                                            >
                                                                <Typography sx={sxs.timeStyle}>
                                                                    12:00 PM
                                                                </Typography>
                                                            </div>
                                                            <div
                                                                onClick={() => handleTimeSlotSelect("12:10 AM")}
                                                            >
                                                                <Typography sx={sxs.timeStyle}>
                                                                    12.10 PM
                                                                </Typography>
                                                            </div>
                                                            <div
                                                                onClick={() => handleTimeSlotSelect("12:20 AM")}
                                                            >
                                                                <Typography sx={sxs.timeStyle}>
                                                                    12.20 PM
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                        <Typography sx={sxs.slotStyle}>
                                                            Evening Slot
                                                        </Typography>
                                                        <div className={classes.timeSlot}>
                                                            <div
                                                                onClick={() => handleTimeSlotSelect("05:00 AM")}
                                                            >
                                                                <Typography sx={sxs.timeStyle}>
                                                                    05:00 PM
                                                                </Typography>
                                                            </div>
                                                            <div
                                                                onClick={() => handleTimeSlotSelect("06:00 AM")}
                                                            >
                                                                <Typography sx={sxs.timeStyle}>
                                                                    06.00 PM
                                                                </Typography>
                                                            </div>
                                                            <div
                                                                onClick={() => handleTimeSlotSelect("07:30 AM")}
                                                            >
                                                                <Typography sx={sxs.timeStyle}>
                                                                    07.30 PM
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </Box>
                                    </Box>
                                )}
                            </Grid>
                            <Grid container pt={2}>
                                <CustomFormLabel label="Reason for Appointment" />
                                <InputBase
                                    fullWidth
                                    value={rescheduleAppointment.reasonforappointment}
                                    placeholder="Reason"
                                    name="reasonforappointment"
                                    sx={{
                                        alignItems: "baseline !important",
                                        paddingLeft: "5px !important",
                                        boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                                        height: "42px !important",
                                        width: "100% !important",
                                    }}
                                    onChange={(e: any) => inputData(e)}
                                />
                            </Grid>
                            {/* <Grid container pt={2}>
                                <CustomFormLabel label="Patient Appointment Note" />
                                <InputBase
                                    fullWidth
                                    value={rescheduleAppointment.patientappointmentnote}
                                    placeholder="Appointment Note"
                                    name="patientappointmentnote"
                                    sx={{
                                        alignItems: "baseline !important",
                                        paddingLeft: "5px !important",
                                        boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                                        minHeight: "10vh",
                                        width: "100% !important",
                                    }}
                                    onChange={(e: any) => inputData(e)}
                                />
                            </Grid> */}
                            {/* <Grid container pt={2}>
                                <Grid item xs={6}>
                                    <CustomFormLabel label="Intake Plan" />
                                    <Select
                                        sx={selectInputStyle}
                                        value={rescheduleAppointment.intakeplan}
                                        name="intakeplan"
                                        onChange={(e: any) => handleSelectOption(e)}
                                        renderValue={(selected) => {
                                            if (!selected) {
                                                return (
                                                    <span>
                                                        <Typography
                                                            variant="h5"
                                                            sx={{
                                                                color: "#1A1A1A80",
                                                            }}
                                                        >
                                                            Select InTake Plan
                                                        </Typography>
                                                    </span>
                                                );
                                            }
                                            return <Typography variant="h5">{selected}</Typography>;
                                        }}
                                        MenuProps={MenuProps}
                                        displayEmpty
                                    >
                                        {intakeFormList.map((data) => {
                                            return (
                                                <MenuItem value={data} sx={{ color: "#1A1A1A7F" }}>
                                                    {data}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </Grid>
                            </Grid> */}
                        </Grid>
                    </Grid>
                    {/* <DialogActions>
                        <Grid
                            item
                            xs={12}
                            pt={3}
                            sx={{ display: "flex", justifyContent: "flex-end" }}
                        >
                            <ButtonBase
                                sx={{
                                    background: "#004186",
                                    height: 40,
                                    width: "auto",
                                    padding: "12px",
                                    borderRadius: "5px",
                                }}
                                onClick={handleSaveandClose}
                            >
                                <Typography
                                    variant="h4"
                                    sx={{ color: "#FFFFFF", fontWeight: "bold" }}
                                >
                                    Save and Close
                                </Typography>
                            </ButtonBase>
                        </Grid>
                    </DialogActions> */}
                </DialogContent>
                    <DialogActions sx={formBottom}>
                        <Grid sx={actionBtns}>
                            <ButtonBase
                                onClick={onClose}
                                sx={formButtonStyle.cancelButtonStyle}
                            >
                                Cancel
                            </ButtonBase>
                            <ButtonBase
                                type="submit"
                                sx={formButtonStyle.saveButtonStyle}
                                // disabled={isSubmitting}
                            >
                                Save
                            </ButtonBase>
                        </Grid>
                    </DialogActions>
            </Dialog>
        </>
    );
};

export default RescheduleAppointment;
