import { Box } from "@mui/material";
import { adminConstants } from "../../../constants/admin";
import AppLayout from "../layout/layout";
import { makeStyles } from "@mui/styles";
import CheckInSteps from "./check-in-steps";
import IntakeExam from "./intake-exam";
import { useState } from "react";
import SignCheck from "./sign-check";
export const intakeFormStyle = makeStyles(() => ({
  intakeFormGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 6fr",
    gap: "20px",
    padding: "10px",
  },
  intakeFormSubGrid: {
    border: "1px solid #00000029",
    borderRadius: "5px",
    padding: "10px",
    boxShadow: "0px 0px 8px #00000029",
    marginBottom: "15px",
  },
  
}));

const { PROVIDER } = adminConstants;
function AppoinmentCheckInIndexPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const classes = intakeFormStyle();

  return (
    <>
      <Box className={classes.intakeFormGrid}>
        <Box>
          <Box className={classes.intakeFormSubGrid}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim,
            debitis? Repudiandae perspiciatis rerum doloremque dolore
            voluptatibus nostrum consequatur error, exercitationem ipsa unde
            iure, inventore illo, eaque facere cupiditate quod laborum.
          </Box>
          <Box className={classes.intakeFormSubGrid}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim,
            debitis? Repudiandae perspiciatis rerum doloremque dolore
            voluptatibus nostrum consequatur error, exercitationem ipsa unde
            iure, inventore illo, eaque facere cupiditate quod laborum.
          </Box>
          <Box className={classes.intakeFormSubGrid}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim,
            debitis? Repudiandae perspiciatis rerum doloremque dolore
            voluptatibus nostrum consequatur error, exercitationem ipsa unde
            iure, inventore illo, eaque facere cupiditate quod laborum.
          </Box>
        </Box>
        <Box>
          <Box className={classes.intakeFormSubGrid}>
              <CheckInSteps
                currentStep={currentStep}
                handleNextStep={handleNextStep}
              />
          </Box>
          <Box className={classes.intakeFormSubGrid}>
            
            {currentStep == 3 && <SignCheck />}
            {currentStep == 1 && <IntakeExam />}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default AppLayout(AppoinmentCheckInIndexPage, {
  source: PROVIDER,
});
