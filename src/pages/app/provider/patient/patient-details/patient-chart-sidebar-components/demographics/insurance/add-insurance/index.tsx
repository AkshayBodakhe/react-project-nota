import React, { useState } from "react";
import { Modal, Grid, Typography, ButtonBase } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AddInsuranceContent from "../add-insurance/add-insurance-modal";

interface AddInsuranceProps {
  open: boolean;
  onClose: () => void;
  onEventSuccessModalOpen: () => void;
}

const AddInsurance: React.FC<AddInsuranceProps> = ({
  open,
  onClose,
  onEventSuccessModalOpen,
}) => {
  const [openSecondaryInsurance, setOpenSecondaryInsurance] = useState(false);
  const [openTertiaryInsurance, setOpenTertiaryInsurance] = useState(false);
  const [value, setValue] = useState(0);

  const handleOpenInsurance = () => {
    if (value === 0) {
      setOpenSecondaryInsurance(true);
      setValue(1);
      return;
    }

    if (value === 1) {
      setOpenTertiaryInsurance(true);
      return;
    }
  };

  const handleSubmit = () => {
    onEventSuccessModalOpen();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Grid
        container
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "55%",
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 5,
          height: "80%",
          overflowY: "hidden",
        }}
      >
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={11}>
              <Typography variant="h1" sx={{ fontWeight: "bold" }}>
                Add Insurance Details
              </Typography>
            </Grid>
            <Grid
              item
              xs={1}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <ButtonBase onClick={onClose}>
                <CloseOutlinedIcon />
              </ButtonBase>
            </Grid>
          </Grid>
        </Grid>

        <Grid container sx={{ overflowY: "scroll", height: "600px" }}>
          <AddInsuranceContent />
          {openSecondaryInsurance && (
            <>
              <Grid item xs={12} mt={3}>
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                  Add Secondary Insurance Details
                </Typography>
              </Grid>
              <AddInsuranceContent />
            </>
          )}
          {openTertiaryInsurance && (
            <>
              <Grid item xs={12} mt={3}>
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                  Add Tertiary Insurance Details
                </Typography>
              </Grid>
              <AddInsuranceContent />
            </>
          )}
          {!openTertiaryInsurance && (
            <Grid item xs={12} sx={{ marginTop: "20px !important" }}>
              <ButtonBase onClick={handleOpenInsurance}>
                <AddIcon sx={{ color: "#004186 !important" }} />
                <Typography
                  sx={{
                    color: "#004186 !important",
                    fontWeight: "bold !important",
                  }}
                >
                  {!openSecondaryInsurance
                    ? "Add Secondary Insurance"
                    : "Add Tertiary Insurance"}
                </Typography>
              </ButtonBase>
            </Grid>
          )}
        </Grid>
        <Grid container columnGap={3} mr={4}>
          <Grid
            item
            xs={12}
            pt={3}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <ButtonBase
              sx={{
                background: "#004186",
                height: 40,
                width: "auto",
                padding: "12px",
                borderRadius: "5px",
              }}
              onClick={handleSubmit}
            >
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", color: "#FFFFFF" }}
              >
                Save Insurance
              </Typography>
            </ButtonBase>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default AddInsurance;
