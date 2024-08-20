import { Box } from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react';
import PatientsWaitingRoom from "./PatientDesktop"

const PatientWaitingRoom = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);
  return (
    <div>
      {<PatientsWaitingRoom />}
    </div>
  );
};

export default PatientWaitingRoom;
