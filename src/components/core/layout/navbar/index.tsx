import React from "react";
import { adminConstants } from "../../../../constants/admin";
// import AdminNavbar from "./admin";
import ProviderNavbar from "./provider";
import PatientNavbar from "./patient";
import AdminNavbar from "./admin";

interface NavbarProps {
  source: string;
  isMobile: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  isXSMobile: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  source,
  isMobile,
  setAuth,
  isXSMobile,
}) => {
  const { PROVIDER, ADMIN, PATIENT } = adminConstants;
  return (
    <>
      {source === ADMIN ? (
        <AdminNavbar
          isXSMobile={isXSMobile}
          source={source}
          isMobile={isMobile}
          setAuth={setAuth}
        />
      ) : source === PROVIDER ? (
        <ProviderNavbar
          isXSMobile={isXSMobile}
          source={source}
          isMobile={isMobile}
          setAuth={setAuth}
        />
      ) : source === PATIENT ? (
        <PatientNavbar
          isXSMobile={isXSMobile}
          source={source}
          isMobile={isMobile}
          setAuth={setAuth}
        />
      ) : null}

    </>
  );
};

export default Navbar;
