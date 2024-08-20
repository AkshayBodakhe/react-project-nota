import { Box, Typography } from "@mui/material";

type labelProps = {
  label: string;
  sublabel?: boolean;
  forgotPwd?:boolean;
};

const Label = (props: labelProps) => {
  const { label, sublabel , forgotPwd } = props;
  return (
    <Box sx={forgotPwd ? {mb:2} : sublabel ? { mb: 4 } : { mb: 4 }}>
      <Typography  color='primary' variant={forgotPwd ? 'h4' : sublabel ? 'h4' : 'h1'} sx={{fontWeight:600}}>{label}</Typography>
    </Box>
  );
};

export default Label;
