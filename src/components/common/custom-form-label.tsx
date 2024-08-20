//import React from "react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { customFormLabelBox } from "../../styles/common";

interface CustomFormLabelProps {
  label: string;
  isRequired?: boolean;
  source?: string;
  isBold?: boolean;
  boldSize?: string;
}

function CustomFormLabel(props: CustomFormLabelProps) {
  const { label, isBold, boldSize, isRequired, source = "" } = props;

  return (
    <Box sx={{ mb: "5px" }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          ...customFormLabelBox(source),
          fontWeight: !isBold ? "inherit" : boldSize ? boldSize : 600,
        }}
      >
        {label}
        {isRequired && (
          <span style={{ color: "red", marginLeft: "0.2rem" }}>*</span>
        )}
      </Typography>
    </Box>
  );
}

CustomFormLabel.propTypes = {
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  source: PropTypes.string,
};

export default CustomFormLabel;
