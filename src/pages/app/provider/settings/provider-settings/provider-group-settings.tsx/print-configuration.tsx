import { Button, Grid, Radio, Typography } from "@mui/material";
import React from "react";
import {
  deletePrintConfiguration,
  editPrintConfiguration,
} from "../../../../../../styles/common";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import logo from "../../../../../../assets/icon/patient.png";

function PrintConfiguration() {
  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h4" sx={{ color: "#1A1A1A99" }}>
          This is the list of document headers you can select from when printing
          from ThinkEMR
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          border: "1px solid #1A1A1A40",
          borderRadius: "5px",
          opacity: 1,
        }}
        mt={2}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              background: "#1A1A1A0D",
              borderRadius: "5px",
              opacity: 1,
              padding: "10px",
            }}
          >
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Grid item>
                <Typography variant="h5" sx={{ color: "#1B5984" }}>
                  ThinkEMR Pratice Header
                </Typography>
              </Grid>
              <Grid item sx={{ display: "flex", gap: "10px" }}>
                <Button sx={editPrintConfiguration}>
                  <EditOutlinedIcon
                    sx={{ color: "#0097F0", fontSize: "16px" }}
                  />
                  &nbsp;
                  <Typography
                    variant="h5"
                    sx={{
                      textTransform: "capitalize",
                      fontWeight: 600,
                      color: "#0097F0",
                    }}
                  >
                    Edit
                  </Typography>
                </Button>
                <Button sx={deletePrintConfiguration}>
                  <DeleteOutlinedIcon
                    sx={{ color: "#FF3939", fontSize: "16px" }}
                  />
                  &nbsp;
                  <Typography
                    variant="h5"
                    sx={{
                      textTransform: "capitalize",
                      fontWeight: 600,
                      color: "#FF3939",
                    }}
                  >
                    Delete
                  </Typography>
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }} mt={1}>
              <Radio
                checked={selectedValue === "a"}
                onChange={handleChange}
                value="a"
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
               
                    style={{ padding: "0px" }}
              />
              &nbsp;&nbsp;
              <Typography variant="h5" sx={{ color: "#1A1A1A99" }}>
                Set This As My Default Header
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={4} p={2}>
            <Grid item xs={12}>
              <img src={logo} style={{height:"50px",width:"50px"}}></img>
            </Grid>
            <Grid item xs={12} mt={1}>
              <Typography variant="h5">
                Think EMR Test Account 70 Washington Square South, New York, NY
                10012, United States Office Number- 414-690-5082 / Fax Number -
                1-408-999 8888
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PrintConfiguration;
