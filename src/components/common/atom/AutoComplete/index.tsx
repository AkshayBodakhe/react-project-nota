import { Autocomplete, Box, InputAdornment, TextField } from '@mui/material';
//import { styled } from '@mui/styles';
import Label from '../Label';

export default function UseAutocomplete({
    data,
    label,
    //labelStyle,
    flexDirection,
    fullWidth,
    //keyEvents,
    //borderRadius,
    name,
    onChange,
    //inputValue,
    //onSelect,
    placeholder,
    //clearOnBlur,
    value,
    // error,
    isRequired,
    mapBy,
    lastName,
    InputIcon,
    //filterOptions,
    //getSelected,
    // autoSelect,
    //loading,
    //noOptionsText,
    //loadingText,
    //backgroundColor,
    //disabled
    height
}: any) {

    const defaultProps = {
        options: data,
        getOptionLabel: (option: any) => `${mapBy ? option[mapBy] : ''} ${lastName ? option[lastName] : ''}`,
    };

    const handleChange = (_e: any, newValue: any) => {
        const obj = {
            target: {
                name: name,
                value: newValue
            }
        }
        onChange(obj);
    }

    return (
        <Box flexDirection={flexDirection || 'column'} width={fullWidth ? '100%' : 'unset'} position="relative">
            <Label label={label} isRequired={isRequired} />
            <Autocomplete
                id="tags-standard"
                {...defaultProps}
                options={data}
                value={value || null}
                // getOptionLabel={(option: string) => option || ''}
                //disableCloseOnSelect
                onChange={handleChange}
                sx={{
                    borderRadius: "5px",
                    background: "#ffffff",
                    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                    ".MuiOutlinedInput-root": {
                        display: 'flex',
                        alignContent: 'center',
                        height: height ? height : "35px",
                        fontFamily: 'Roboto, sans-serif',
                        border: 'none !important',
                        fontSize:"14px"
                    },
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                        border: 'none !important'
                    },
                    "& .css-i4bv87-MuiSvgIcon-root": {
                        display: InputIcon ? 'none !important' : ''
                    },
                    "& .css-ptiqhd-MuiSvgIcon-root": {
                        width: InputIcon ? '3rem !important' : 'auto !important'
                    }
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder={placeholder}
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position='start'>
                                    {/* <Checkbox checked={selected} /> */}
                                    {InputIcon && InputIcon}
                                </InputAdornment>
                            )
                        }}
                    />
                )}
            />
        </Box>
    );
}
