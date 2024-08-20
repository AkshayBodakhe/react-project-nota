import { ButtonBase, Grid, Tab, Tabs, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import ImagingOrderTable from "./imaging-order/imaging-order-table";
import ImagingOrderResultTable from "./imaging-results/imaging-results-table";
import { formButtonStyle } from "../../../../../../../styles/common";
import AddIcon from "@mui/icons-material/Add";
import AddEditOrder from "./imaging-order/add-edit-image-order";
import AddEditResult from "./imaging-results/add-edit-result";
import { PatientData } from "../diagnoses";

export const imagingStyle = makeStyles(() => ({
  tab: {
    fontWeight: "bold !important",
    fontSize: "16px !important",
  },
  tabSwitchGrid: {
    width: "inherit",
    height: "64vh",
    overflowY: "scroll",
  },
  addButtonTypo: {
    color: "#36588C !important",
    display: "flex",
    paddingRight: "2px",
  },
  buttonTypo: {
    color: "#36588C !important",
    // fontWeight: "bold !important",
    fontSize: "16px !important",
  },
}));
function ImagingIndex(props: PatientData) {
  const classes = imagingStyle();
  const [value, setValue] = React.useState(0);
  const [openOrder, setOpenOrder] = useState(false);
  const [openResult, setOpenresult] = useState(false);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleOpenEditOrder = () => {
    setOpenOrder(true);
  };

  const handleOpenResult = () => {
    setOpenresult(true);
  };
  return (
    <div>
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <Grid item xs={10}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              className={classes.tab}
              sx={{ textTransform: "capitalize" }}
              label="Imaging Order"
            />
            <Tab
              className={classes.tab}
              sx={{ textTransform: "capitalize" }}
              label="Imaging Results"
            />
          </Tabs>
        </Grid>
        <Grid item>
          {value === 0 ? (
            <ButtonBase
              type="submit"
              sx={{
                ...formButtonStyle.mainButtonStyle,
                height: "40px !important",
                width: "auto !important",
                padding: "0px 10px !important",
              }}
              onClick={handleOpenEditOrder}
            >
              {" "}
              <span className={classes.addButtonTypo}>
                <AddIcon sx={{ color: "#1B5984", fontSize: "18px" }} />
              </span>
              <Typography variant="h5" className={classes.buttonTypo}>
                Add Image Order
              </Typography>
            </ButtonBase>
          ) : null}
          {value === 1 ? (
            <ButtonBase
              type="submit"
              sx={{
                ...formButtonStyle.mainButtonStyle,
                height: "40px !important",
                width: "auto !important",
                padding: "0px 10px !important",
              }}
              onClick={handleOpenResult}
            >
              <span className={classes.addButtonTypo}>
                <AddIcon sx={{ color: "#1B5984", fontSize: "18px" }} />
              </span>
              <Typography variant="h5" className={classes.buttonTypo}>
                Add New Image Result
              </Typography>
            </ButtonBase>
          ) : null}
        </Grid>
      </Grid>
      <Grid className={classes.tabSwitchGrid}>
        {value === 0 ? <ImagingOrderTable patientData={props.patientData}/> : null}
        {value === 1 ? <ImagingOrderResultTable patientData={props.patientData}/> : null}
      </Grid>
      {openOrder && (
        <AddEditOrder
          open={openOrder}
          onClose={() => setOpenOrder(false)}
          title="Imaging Requisition Form"
          patientData={props.patientData}
        />
      )}
      {openResult && (
        <AddEditResult
          open={openResult}
          onClose={() => setOpenresult(false)}
          title="Add Image Order"
          patientData={props.patientData}
        />
      )}
    </div>
  );
}

export default ImagingIndex;
