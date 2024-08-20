import {
  Box,
  ButtonBase,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { CUSTOM_INTAKE_PLAN, PREVIEW, dragNDropList } from "../common-fb-const";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { useNavigate } from "react-router-dom";
// import "./form-cutom.css";
import { FormBuilder, Formio } from "react-formio";
import { useState } from "react";
import CustomForm from "./CustomForm";
import { PROVIDER } from "../../../../../../documents/documents-constant/documents-common-const";
import AppLayout from "../../../../../../../../../components/core/layout/layout";
import CloseIcon from "@mui/icons-material/Close";

interface intakeFormProps {
  handleClose?: any;
}

const IntakeFormWindow = (props: intakeFormProps) => {
  const { handleClose } = props;
  const [formData, setFormData] = useState<Record<string, string | number>>({});
  const Navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const handleBack = () => {
    const intakeTab = "IntakeTable";
    Navigate("provider/settings", {});
  };

  const handleOnchangeForm = (e: Record<string, string | number>) => {
    setFormData(e);
  };

  const handlePreviewForm = () => {
    setOpenDialog((item) => !item);
  };

  return (
    <>
      <Box sx={{ background: "white" }}>
        <Grid
          display={"grid"}
          gridTemplateColumns={"250px 1fr"}
          px={2}
          py={2}
          alignItems={"center"}
        >
          {/* <Grid
            container
            gap={1}
            width={"fit-content"}
            alignItems={"center"}
            onClick={handlePreviewForm}
          >
            <RemoveRedEyeOutlinedIcon color={"primary"} />
            <Typography
              sx={{ cursor: "pointer" }}
              fontSize={"14px"}
              fontWeight={"bold"}
              color={"primary"}
            >
              {PREVIEW}
            </Typography>
          </Grid> */}
        </Grid>
        {/* <Grid>
          {dragNDropList.map((item) => {
            return <Typography>{item.label}</Typography>;
          })}
        </Grid> */}
        {/* <Grid>
          <FormBuilder form={formData} onChange={handleOnchangeForm} />
          <Grid style={{ display: "none" }}>
            <Grid id="formformDataio-result" />
          </Grid>
        </Grid> */}
        <Grid onClick={handleBack}>
          <Box px={3} sx={{ display: "flex", gap: "7px", cursor: "pointer" }}>
            <ArrowBackIcon />
            <Typography variant="h3">{"Back"}</Typography>
          </Box>
          <CustomForm />
        </Grid>
      </Box>
      {/* <Box>
        <Dialog open={openDialog}>
          <DialogTitle id="scroll-dialog-title" sx={{ marginBottom: "15px" }}>
            <Grid container alignItems={"center"}>
              <Grid item xs={11}>
                <Typography>{"Preview"}</Typography>
              </Grid>
              <Grid item xs={1} sx={{ display: "flex", justifyContent: "end" }}>
                <ButtonBase onClick={handlePreviewForm}>
                  <CloseIcon />
                </ButtonBase>
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent>
            <Grid>
              <Typography>{"Preview Content"}</Typography>
            </Grid>
          </DialogContent>
        </Dialog>
      </Box> */}
    </>
  );
};

export default AppLayout(IntakeFormWindow, { source: PROVIDER });
