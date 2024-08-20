import { Box, InputBase, Typography } from "@mui/material";
import { commonWidget } from "../../../../styles/common";
import Label from "../Label";

const Textfield = ({
  backgroundColor,
  border,
  borderColor,
  height,
  icon: Icon,
  helperText,
  label,
  name,
  isError,
  fullWidth,
  onChange,
  placeholder,
  keyEvents,
  flexDirection,
  boxShadow,
  value,
  labelStyle,
  type,
  readOnly,
  alignItems,
  inputProps,
  isUnique,
  isRequired,
  handleBlur,
  error,
  isDisabled,
  ...rest
}: any) => {
  const inputPropsVal = {
    ...(type === "date" && { max: "3000-12-12" }),
    ...inputProps,
  };

  const classes = commonWidget();
  return (
    <Box
      flexDirection={flexDirection || "row"}
      width={fullWidth ? "100%" : "unset"}
    >
      <Label label={label} isRequired={isRequired} />
      <InputBase
        id={name}
        fullWidth
        name={name}
        //   startAdornment={
        //     Icon && (
        //       <InputAdornment position="start">
        //         <Icon color="primary" />
        //       </InputAdornment>
        //     )
        //   }
        disabled={isDisabled}
        error={isError}
        {...rest}
        classes={{
          root: classes.textFieldRoot,
          input: classes.textFieldInput,
          error: classes.inputBoxError,
          focused: classes.textFieldActive,
        }}
        type={type}
        autoComplete="off"
        inputProps={{
          ...inputPropsVal,
          "aria-label": "naked",
          readOnly: readOnly,
          autoComplete: "off",
        }}
        onChange={onChange && onChange}
        onBlur={handleBlur && handleBlur}
        placeholder={placeholder && placeholder}
        value={value}
      />
      {isError && error && (
        <Typography color="error" sx={{ mt: 0.3 }} variant="body2">
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default Textfield;
