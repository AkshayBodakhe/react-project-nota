import { Box, MenuItem, Select, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { commonWidget } from "../../styles/common";
import Label from "./atom/Label";

interface Option {
  key: any;
  value: string;
}
interface CommonSelectDropdownProps {
  placeholder: string;
  value?: any;
  options: Option[];
  selectInputError?: any;
  onChange?: any;
  source?: string;
  isError?: any;
  error?: string;
  formConstants?: any;
  selectedOption?: any;
  isEditForm?: any;
  name?: any;
  label?: string;
  isRequired?: boolean;
  width?: string;
}

const selectInputStyle = {
  addressSelectStyle: {
    ".MuiOutlinedInput-notchedOutline": { border: 0 },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
  },

  selectPlaceHolderStyle: {
    fontSize: "14px !important",
    color: "#1A1A1A7F",
  },
};

function SelectInput({
  placeholder,
  options,
  onChange,
  value,
  //source,
  error,
  formConstants,
  selectedOption,
  isEditForm,
  name,
  isError,
  label,
  width,
  isRequired,
}: CommonSelectDropdownProps) {
  const [optionName, setOptionName] = React.useState("");
  const classes = commonWidget();
  //const classStyle = selectInputCommonWidget();
  const handleSelectChange = (event: any) => {
    const selectedOption = event.target.value;
    const selectedValue =
      options.find((option) => option.key === selectedOption)?.value || "";
    onChange(event);
    setOptionName(selectedValue);
  };
  
  useEffect(() => {
    if (isEditForm) setOptionName(selectedOption);
    if (value) setOptionName(value);
  },[isEditForm,value]);

  return (
    <Box>
      {label && <Label label={label} isRequired={isRequired} />}
      <Select
        fullWidth
        {...formConstants}
        name={name}
        value={optionName}
        displayEmpty
        error={!!isError}
        classes={{
          error: classes.inputBoxError,
        }}
        renderValue={(selected: any) => {
          if (selected.length === 0) {
            return (
              <span style={selectInputStyle.selectPlaceHolderStyle}>
                {placeholder}
              </span>
            );
          }
          return (
            options.find(
              (option) => option.value === selected || option.key === selected
            )?.value || ""
          );
        }}
        size="small"
        onChange={(e) => handleSelectChange(e)}
        sx={{
          ...selectInputStyle.addressSelectStyle,
          width: width,
          "& .MuiSelect-select": {
            fontSize: "14px",
          },
        }}
        // className={`${classStyle.select} ${
        //   selectInputError && classStyle.selectError
        // }`}
      >
        {options?.map((option) => (
          <MenuItem
            key={option?.key}
            value={option?.key}
            sx={selectInputStyle.selectPlaceHolderStyle}
          >
            {option?.value}
          </MenuItem>
        ))}
      </Select>
      {isError && error && (
        <Typography color="error" sx={{ mt: 0.3 }} variant="body2">
          {error}
        </Typography>
      )}
    </Box>
  );
}

export default SelectInput;
