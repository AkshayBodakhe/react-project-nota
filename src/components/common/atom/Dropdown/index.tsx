import { Box, MenuItem, Select, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Label from "../Label";
import { commonWidget } from "../../../../styles/common";

const styles = makeStyles(() => ({
    selectInputStyle: {
        ".MuiOutlinedInput-notchedOutline": { border: "none" },
        boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
        height: "42px !important",
        width: "100%",
        //border: "1px solid #36588C!important",
        minHeight: '0px !important',
        "& fieldset": { border: "none" },
        // ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":{
        //     minHeight:'0px !important'
        // }
        "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select": {
            minHeight: '0px !important'
        }
    },
    menuItemColorStyle: {
        color: "#1A1A1A7F",
    },
}));

export default function Dropdown({
    hasNone,
    onChange,
    name,
    options,
    value,
    mapName,
    mapLastName,
    placeholder,
    flexDirection,
    label,
    isRequired,
    isError,
    mapBy,
    error
}: any) {
    const classes = styles();
    const commonClasses = commonWidget();
    return (
        <Box flexDirection={flexDirection || 'column'} position="relative">
            <Label label={label} isRequired={isRequired} />
            <Select
                className={classes.selectInputStyle}
                value={value}
                name={name}
                classes={{
                    error: commonClasses.inputBoxError
                }}
                error={!!(isError)}
                size="small"
                onChange={onChange}
                renderValue={(selected: any) => {
                    if (!selected?.[mapBy]) {
                        return (
                            <span>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        color: "#1A1A1A80 !important",
                                    }}
                                >
                                    {placeholder}
                                </Typography>
                            </span>
                        );
                    }
                    return <Typography variant="h5">
                        {(() => {
                            let result = options.find((res: any) => res[mapBy] === selected[mapBy]);
                            if (!result) result = selected;
                            let val = `${result[mapName]} ${mapLastName ? result[mapLastName] : ''}`
                            return val;
                        })()}
                    </Typography>;
                }}
                displayEmpty
            >
                {hasNone && (
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                )}
                {options?.length !== 0 && options?.map((item: any) => {
                    return (
                        <MenuItem value={item} className={classes.menuItemColorStyle}>
                            {item[mapName]} {mapLastName && item[mapLastName]}
                        </MenuItem>
                    );
                })}
            </Select>
            {isError && error && (
                <Typography color="error" sx={{ mt: 1 }} variant="body2">
                    {error}
                </Typography>
            )}
        </Box>
    );
}