//import React, { useState } from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import RotateLeftRoundedIcon from "@mui/icons-material/RotateLeftRounded";

function CheckInSteps({ currentStep, handleNextStep }: any) {
  const stepData = [
    { label: "Step 1:Check In", color: "#00B917" },
    { label: "Step 2:Intake", color: "#00B917" },
    { label: "Step 3:Exam", color: "#00B917" },
    { label: "Step 4:Sign-off & Checkout", color: "#00B917" },
  ];

  const sxs = {
    stepsContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
  };

  return (
    <Grid sx={sxs.stepsContainer}>
      <Grid sx={{ display: "flex", gap: "1rem" }}>
        {stepData.map((step, index) => (
          <Grid
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "0.3rem",
              width: "14rem",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "0.25rem",
                backgroundColor:
                  currentStep > index
                    ? step.color
                    : currentStep === index
                    ? "#007BFF"
                    : "#CCCCCC",
              }}
            ></Box>
            <Grid sx={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <Box
                sx={{
                  height: "2.2rem",
                  width: "2.2rem",
                  backgroundColor:
                    currentStep > index
                      ? step.color
                      : currentStep === index
                      ? "#007BFF"
                      : null,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50px",
                }}
              >
                {currentStep > index ? (
                  <CheckIcon sx={{ color: "white", fontSize: "2rem" }} />
                ) : currentStep === index ? (
                  <RotateLeftRoundedIcon
                    sx={{ color: "white", fontSize: "2rem" }}
                  />
                ) : (
                  <RadioButtonUncheckedRoundedIcon
                    sx={{ color: "#CCCCCC", fontSize: "2rem" }}
                  />
                )}
              </Box>
              <Typography
                style={{
                  color:
                    currentStep > index
                      ? step.color
                      : currentStep === index
                      ? "#007BFF"
                      : "#CCCCCC",
                  fontWeight: "600",
                }}
                variant="h5"
              >
                {step.label}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Grid sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Button variant="outlined" sx={{ textTransform: "initial" }}>
          Leave
        </Button>
        <Button
          variant="contained"
          onClick={handleNextStep}
          sx={{ textTransform: "initial" }}
        >
          {currentStep === stepData.length - 1 && "Sign"}
          {currentStep === stepData.length - 2 && "Done With Exam"}
          {currentStep === stepData.length - 3 && "Save & Start Exam"}
        </Button>
      </Grid>
    </Grid>
  );
}

export default CheckInSteps;
