import { Box } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import ProviderDesktop from "./ProviderDesktop";
import ProviderMobileWaitingRoom from "./ProviderMobile";

const ProviderWaitRoom = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);
  return (
    <div>
      {isMobile ? <ProviderMobileWaitingRoom /> : <ProviderDesktop />}
      {/* <ProviderDesktop /> */}
    </div>
  );
};

export default ProviderWaitRoom;
