import { Box, Typography } from "@mui/material";

import PropTypes from "prop-types";

interface CustomFormLabelProps {
  label: string;
  isRequired?: boolean;
}

function Label(props: CustomFormLabelProps) {
  const { label, isRequired } = props;

  return (
    <Box sx={{ mb: 1 }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          font: "Roboto, sans-serif !important",
          fontSize: "14px !important",
          // fontWeight: "700",
          color: "#1A1A1A",
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

Label.propTypes = {
  label: PropTypes.string,
  isRequired: PropTypes.bool,
};

export default Label;
