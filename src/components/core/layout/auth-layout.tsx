import React from "react";
import { Grid } from "@mui/material";
import Carousel from "../../common/carousel";
import Logo from "../../../components/core/logo";
import { logoStyleAuth } from "../../../styles/auth-form";

export const leftGrid = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "22px",
  background: "#FFFFFF",
  height: "100%",
};

export const formStyle = {
  height: "100%",
  display: "flex",
  alignItems: "center"
};

export const logoGrid = {
  display:"flex",
  minWidth: "500px",
  maxWidth: "600px",
  justifyContent: "initial"
};

type AuthLayoutProps = {
  authPage: React.ReactNode;
};

const AuthLayout = (props: AuthLayoutProps) => {
  const { authPage } = props;
  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid sx={logoStyleAuth}>
        <Logo source="preAuthLogo" />
      </Grid>
      <Grid item xs={12} md={7} sx={[leftGrid]}>
        <Grid sx={formStyle}>
          {authPage}
        </Grid>
      </Grid>
      <Carousel />
    </Grid>
  );
};

export default AuthLayout;
