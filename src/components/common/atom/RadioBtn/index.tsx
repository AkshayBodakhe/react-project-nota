import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React from "react";
import Label from "../Label";

const sxs = {
  label: {
    color: "#1A1A1ACC !important",
    fontSize: "14px !important",
  },
};

const RadioBtn = ({
  label,
  name,
  onChange,
  value,
  key,
  isRequired,
  options,
  isError,
  error,
}: any) => {
  return (
    <React.Fragment key={"RadioBtn"}>
      <FormControl>
        <Label label={label} isRequired={isRequired} />
        <RadioGroup
          row
          key={key}
          name={name}
          value={value}
          onChange={(e: any) => {
            let obj = {
              target: {
                name: name,
                value: e.target.value,
              },
            };
            onChange(obj);
          }}
        >
          {options?.lenght !== 0 &&
            options?.map((opt: any) => {
              return (
                <FormControlLabel
                  value={opt.value}
                  control={<Radio />}
                  label={<Typography sx={sxs.label}>{opt.key}</Typography>}
                />
              );
            })}
        </RadioGroup>
        {isError && error && <FormHelperText error>{error}</FormHelperText>}
      </FormControl>
    </React.Fragment>
  );
};

export default RadioBtn;
