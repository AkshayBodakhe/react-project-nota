import { Autocomplete, Box, Checkbox, InputAdornment, TextField } from '@mui/material';
import React from 'react'
// import { commonWidget } from '../../../../styles/common';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Label from '../Label';

const MultiSelectWithCheckBox = ({
    value,
    onChange,
    options,
    height,
    InputIcon,
    placeholder,
    flexDirection,
    fullWidth,
    label,
    isRequired,
    mapBy,
    name
}: any) => {    
    // const classes = commonWidget();

    const handleChange = (_event: any, newVal: any) => {
        const obj = {
            target: {
                name: name,
                value: newVal
            }
        }
        onChange(obj);
    }

    return (
        <React.Fragment key={'MultiSelectWithCheckBox'}>
            <Box flexDirection={flexDirection || 'column'} width={fullWidth ? '100%' : 'unset'} position="relative">
                <Label label={label} isRequired={isRequired} />
                <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    value={value}
                    defaultValue={value}
                    options={options}
                    // freeSolo
                    // filterSelectedOptions={true}
                    inputValue={(value?.map((res:any) => res.name).toString())}
                    disableCloseOnSelect={true}
                    // renderTags={(value: any[], getTagProps: any) => {
                    //     console.log("value ::", value);
                    //     return <>
                    //         {value.map((obj: any, index: number) =>
                    //             (<div key={index} {...getTagProps({ index })}>
                    //                 {obj.name}
                    //             </div>)
                    //         )}
                    //     </>

                    // }}
                    getOptionLabel={(option: any) => option[mapBy]}
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
                    renderOption={(props, option: any, { selected }) => (
                        <li {...props}>
                            <Checkbox
                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                // style={{ marginRight: 8 }}
                                checked={selected}
                            />
                            {option[mapBy]}
                        </li>
                    )}
                    onChange={(e, newVal) => handleChange(e, newVal)}
                    renderInput={(params) => {
                        return <TextField
                            {...params}
                            placeholder={placeholder}
                            InputProps={{
                                ...params.InputProps,
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        {InputIcon && InputIcon}
                                    </InputAdornment>
                                )
                            }}
                        />
                    }}
                />
            </Box>
        </React.Fragment>
    )
}

export default MultiSelectWithCheckBox;
