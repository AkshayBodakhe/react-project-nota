import React, { useState, useEffect, ComponentType } from "react";
import Navbar from "./navbar/index";
import Sidebar from "./sidebar/index";
import Grid from "@mui/material/Grid";
import { dashboardMainStyle, useStyles } from "./styles";

interface EnhancedComponentProps {}

interface AppLayoutProps {
  source: string;
}

const AppLayout = <T extends EnhancedComponentProps>(
  WrappedComponent: ComponentType<T>,
  { source }: AppLayoutProps
) => {
  const EnhancedComponent: React.FC<T> = (props) => {
    const [auth, setAuth] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
    const [isXSMobile, setIsXSMobile] = useState(window.innerWidth < 500);

    const classes = useStyles();

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 960);
        setIsXSMobile(window.innerWidth < 500);
      };
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return (
      <Grid container spacing={2} sx={{ backgroundColor: 'white' }}>
        <Grid xs={12} item>
          <Navbar
            source={source}
            isXSMobile={isXSMobile}
            isMobile={isMobile}
            setAuth={setAuth}
          />
        </Grid>
        <Grid paddingLeft={1.5}>
          <Sidebar source={source} isMobile={isMobile} auth={auth} />
        </Grid>
        <Grid m={2} width={{
          xs:""
        }} sx={{ ...dashboardMainStyle }} className={classes.dashGrid}>
          <Grid className={classes.componentStyle}>
            <WrappedComponent {...props} />
          </Grid>
        </Grid>
      </Grid>
    );
  };

  return EnhancedComponent;
};

export default AppLayout;
