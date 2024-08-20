import { Grid, InputBase } from "@mui/material";
import { addDays } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { DateRange } from 'react-date-range';
import { commonWidget } from "../../../../../../styles/common";
import { DisableDate } from "../../../common-files/enums";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import moment from "moment";

type Props = {
    disableDates: DisableDate;
    onClose: (date: any) => any;
    format?: string;
    months?: number;
    inputWidth?: string;
    inputPlaceholder: string;
}

function CustomDateRangePicker(props: Props) {

    const classes = commonWidget();
    const [isHovered, setIsHovered] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const ref = useRef<HTMLInputElement | null>(null);
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 0),
            key: 'selection'
        }
    ]);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const navbarStyles = {
        activePopButtons: {
            fontSize: "14px",
            padding: "6px 15px",
            color: "#36588C",
            fontWeight: "700",
        },
        menuMouseEvents: {
            pointerEvents: "none",
            marginTop: "4px",
        },
        parentGridList: {
            background: "#FFFFFF 0% 0% no-repeat padding-box",
            boxShadow: " 0px 0px 8px #00000029",
            borderRadius: "5px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            pointerEvents: "auto",
            padding: '6px 10px',
            position: "absolute"
        },
        popButtons: {
            fontSize: "14px",
            padding: "4px",
            color: "#1A1A1A99",
            cursor: "pointer",
        },
    };

    const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current?.contains(event.target)) {
            setIsHovered(false);
        }
        // props.onClose(selectedDate);
    };

    const handleDateChange = (item: any) => {
        setState([item.selection]);
        let date: any;
        date = moment(item.selection?.startDate).format(props.format || 'DD/MM/YYYY') + ' - ';
        if (new Date(item.selection.startDate).getDate() != new Date(item.selection.endDate).getDate()) {
            date = date + moment(item.selection.endDate).format(props.format || 'DD/MM/YYYY');
            props.onClose(date);
        }
        setSelectedDate(date);
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };

    }, [])

    return (
        <>
            <Grid ref={ref}>
                <InputBase
                    fullWidth
                    value={selectedDate}
                    startAdornment={<CalendarMonthIcon sx={{ margin: '-2px 5px 0 -10px', cursor: 'pointer' }} />}
                    placeholder={props.inputPlaceholder}
                    classes={{
                        root: classes.providerTextInput,
                        input: classes.textFieldInput,
                        error: classes.inputBoxError,
                    }}
                    onClick={handleMouseEnter}
                    sx={{ width: `${props.inputWidth || '15rem'} !important` }}
                />
                {isHovered &&
                    <Grid sx={navbarStyles.parentGridList}>
                        <DateRange
                            onChange={(item: any) => handleDateChange(item)}
                            moveRangeOnFirstSelection={false}
                            months={props.months || 1}
                            maxDate={props.disableDates === DisableDate.FUTURE ? new Date() : null}
                            minDate={props.disableDates === DisableDate.PAST ? new Date() : null}
                            selectsRange
                            showDateDisplay={false}
                            ranges={state}
                            direction="horizontal"
                            preventSnapRefocus={true}
                            calendarFocus="backwards"
                            showMonthAndYearPickers={false}
                        />
                    </Grid>
                }
            </Grid>
        </>
    )
}

export default CustomDateRangePicker;