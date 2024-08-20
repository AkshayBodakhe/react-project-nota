import { Grid, InputBase, MenuItem, Select, Typography } from "@mui/material";
import { DropzoneArea } from "material-ui-dropzone";
import React, { useState } from "react";
import { patientStyle } from "./style/commonStyle";
import { customImageContainer } from "../../../../styles/common";
// export const insuranceStyles = makeStyles(() => ({
//   providerTextAreaField: {
//     borderRadius: "5px",
//     border: "none",
//     "& fieldset": { border: "none" },
//     boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
//     size: "small",
//     textAlign: "center",
//     padding: "10px 0px 10px 10px !important",
//     fontSize: "16px",
//     minHeight: "81px",
//   },
//   inputField: {
//     borderRadius: "5px",
//     border: "none",
//     "& fieldset": { border: "none" },
//     boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
//     height: "42px !important",
//     textAlign: "center",
//     padding: "13px 0px 10px 16px",
//     fontSize: "16px",
//     "@media (max-width: 820px)": {
//       width: "100% !important",
//     },
//     marginTop: "10px",
//   },
//   inputBoxText: {
//     fontFamily: "Roboto",
//     fontStyle: "normal",
//     fontSize: "14px !important",
//     lineHeight: "140%",
//     color: "",
//     width: "100%",
//     resize: "vertical",
//     minHeight: "15px",
//   },
//   inputBoxActive: {
//     background: `#FFFFFF 0% 0% no-repeat padding-box !important`,
//     boxShadow: `0px 0px 6px #0097F002 !important`,
//     border: `1px solid #0097F0 !important`,
//     borderRadius: "4px !important",
//   },
//   selectInputStyle: {
//     ".MuiOutlinedInput-notchedOutline": { border: 0 },
//     boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
//     border: "none",
//     "& fieldset": { border: "none" },
//     height: "42px !important",
//     width: "100%",
//     marginTop: "10px",
//   },
//   menuItemColorStyle: {
//     color: "#1A1A1A7F",
//   },
//   dropZone: {
//     minHeight: "150px !important",
//     minWidth: "350px !important",
//     width: "380px !important",
//     height: "200px !important",
//     borderRadius: "20px",
//     backgroundColor: "#F1F1F1",
//     border: "2px solid #00000029",
//   },
//   uploadIcon: {
//     fill: "#2879C9",
//   },
//   textUploadZone: {
//     color: "#1A1A1ACC !important",
//     fontSize: "18px !important",
//     marginTop: "24px",
//     marginBottom: "24px",
//   },
//   formGridTitle: {
//     color: "#000000",
//     fontWeight: "bold",
//     background: "#DAEAF8 !important",
//     padding: "10px 10px !important",
//   },
//   label: {
//     color: "#1A1A1A !important",
//     // marginBottom: "10px !important",
//   },
//   GridDiv: {
//     display: "flex",
//     width: "100%",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   insuranceGrid: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "16px",
//   },
//   insuranceDropZone: {
//     display: "flex",
//     gap: "30px",
//   },
//   customImageContainer: {
//     "& 	.MuiDropzonePreviewList-root": {
//       position:"absolute",
//       top:"0"
//     },
//     "& .MuiDropzonePreviewList-image": {
//       maxWidth: "500px",
//       height: "38vh",
//     }, "& 	.MuiDropzonePreviewList-imageContainer": {
//       padding: "32px 0px"
//     }, "& 	.MuiTypography-body1": {
//       marginBottom: "10px"
//     }
//   },
// }));

function Insurance() {
  const classes = patientStyle();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 50,
      },
    },
  };
  const insuranceTypeOptions = [
    "Primary Insurance",
    "Secondary Insurance",
    "Other",
  ];
  const insurancePayerOptions = [
    "Primary Insurance",
    "Secondary Insurance",
    "Other",
  ];
  const relationshipWithPolicyHolderOptions = [
    "Spouse",
    "Child",
    "Grandchild",
    "Self",
  ];
  const [insuranceData, setInsuranceData] = useState({
    insuranceType: "",
    insurancePayer: "",
    memberId: "",
    planId: "",
    groupId: "",
    groupName: "",
    copay: "",
    payerContactNumber: "",
    payerFaxNumber: "",
    relationshipWithPolicyHolder: "",
  });
  const inputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInsuranceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSelectOption = (e: any) => {
    const { value, name } = e.target;
    setInsuranceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div>
      <Grid className={classes.formGridTitle} mt={3}>
        <Typography sx={{ fontWeight: "700" }}>Insurance</Typography>
      </Grid>
      <Grid
        container
        sx={{ marginTop: "20px !important" }}
        className={classes.GridDiv}
      >
        <Grid item sx={{ width: "23%" }}>
          <Typography variant="h4" className={classes.label}>
            Insurance Type
          </Typography>
          <Select
            className={classes.selectInputStyle}
            value={insuranceData.insuranceType}
            name="insuranceType"
            onChange={(e: any) => handleSelectOption(e)}
            renderValue={(selected) => {
              if (!selected) {
                return (
                  <span>
                    <Typography
                      variant="h5"
                      sx={{
                        color: "#1A1A1A80 !important",
                      }}
                    >
                      Select Insurance Type
                    </Typography>
                  </span>
                );
              }
              return <Typography variant="h5">{selected}</Typography>;
            }}
            MenuProps={MenuProps}
            displayEmpty
          >
            {insuranceTypeOptions.map((data) => {
              return (
                <MenuItem value={data} className={classes.menuItemColorStyle}>
                  {data}
                </MenuItem>
              );
            })}
          </Select>
        </Grid>
        <Grid item sx={{ width: "23%" }}>
          <Typography variant="h4" className={classes.label}>
            Insurance Payer
          </Typography>

          <Select
            className={classes.selectInputStyle}
            value={insuranceData.insurancePayer}
            name="insurancePayer"
            onChange={(e: any) => handleSelectOption(e)}
            renderValue={(selected) => {
              if (!selected) {
                return (
                  <span>
                    <Typography
                      variant="h5"
                      sx={{
                        color: "#1A1A1A80 !important",
                      }}
                    >
                      Select Payer
                    </Typography>
                  </span>
                );
              }
              return <Typography variant="h5">{selected}</Typography>;
            }}
            MenuProps={MenuProps}
            displayEmpty
          >
            {insurancePayerOptions.map((data) => {
              return (
                <MenuItem value={data} className={classes.menuItemColorStyle}>
                  {data}
                </MenuItem>
              );
            })}
          </Select>
        </Grid>
        <Grid item sx={{ width: "23%" }}>
          <Typography variant="h4" className={classes.label}>
            Member ID
          </Typography>

          <InputBase
            value={insuranceData.memberId}
            fullWidth
            placeholder="Enter Member ID"
            classes={{
              root: classes.inputField,
              input: classes.inputBoxText,
              focused: classes.inputBoxActive,
            }}
            onChange={(e: any) => inputData(e)}
          />
        </Grid>
        <Grid item sx={{ width: "23%" }}>
          <Typography
            variant="h4"
            className={classes.label}
            sx={
              {
                // marginTop: "20px !important",
              }
            }
          >
            Plan ID
          </Typography>

          <InputBase
            value={insuranceData.planId}
            fullWidth
            placeholder="Enter Plan ID"
            classes={{
              root: classes.inputField,
              input: classes.inputBoxText,
              focused: classes.inputBoxActive,
            }}
            onChange={(e: any) => inputData(e)}
          />
        </Grid>
        <Grid item sx={{ marginTop: "20px  !important", width: "23%" }}>
          <Typography
            variant="h4"
            className={classes.label}
            sx={
              {
                // marginTop: "20px !important",
              }
            }
          >
            Group ID
          </Typography>

          <InputBase
            value={insuranceData.groupId}
            fullWidth
            placeholder="Enter Group ID"
            classes={{
              root: classes.inputField,
              input: classes.inputBoxText,
              focused: classes.inputBoxActive,
            }}
            onChange={(e: any) => inputData(e)}
          />
        </Grid>
        <Grid item sx={{ width: "23%" }}>
          <Typography
            variant="h4"
            sx={{
              color: "#1A1A1A !important",
              marginTop: "20px !important",
            }}
          >
            Group Name
          </Typography>

          <InputBase
            value={insuranceData.groupName}
            fullWidth
            placeholder="Enter Group Name"
            classes={{
              root: classes.inputField,
              input: classes.inputBoxText,
              focused: classes.inputBoxActive,
            }}
            onChange={(e: any) => inputData(e)}
          />
        </Grid>
        <Grid item sx={{ marginTop: "20px  !important", width: "23%" }}>
          <Typography variant="h4" className={classes.label}>
            Copay
          </Typography>

          <InputBase
            value={insuranceData.copay}
            fullWidth
            placeholder="$Copay"
            classes={{
              root: classes.inputField,
              input: classes.inputBoxText,
              focused: classes.inputBoxActive,
            }}
            onChange={(e: any) => inputData(e)}
          />
        </Grid>
        <Grid item sx={{ marginTop: "20px  !important", width: "23%" }}>
          <Typography
            variant="h4"
            className={classes.label}
            sx={
              {
                // marginTop: "20px  !important",
              }
            }
          >
            Payer Contact Number
          </Typography>

          <InputBase
            value={insuranceData.payerContactNumber}
            fullWidth
            placeholder="Enter Contact Number"
            classes={{
              root: classes.inputField,
              input: classes.inputBoxText,
              focused: classes.inputBoxActive,
            }}
            onChange={(e: any) => inputData(e)}
          />
        </Grid>
      </Grid>
      <Grid
        container
        sx={{ marginTop: "20px !important", justifyContent: "start" }}
        className={classes.GridDiv}
        columnGap={4}
      >
        <Grid item sx={{ width: "23%" }}>
          <Typography
            variant="h4"
            className={classes.label}
            sx={
              {
                // marginTop: "20px  !important",
              }
            }
          >
            Payer Fax Number
          </Typography>

          <InputBase
            value={insuranceData.payerFaxNumber}
            fullWidth
            placeholder="Enter Fax Number"
            classes={{
              root: classes.inputField,
              input: classes.inputBoxText,
              focused: classes.inputBoxActive,
            }}
            onChange={(e: any) => inputData(e)}
          />
        </Grid>
        <Grid item sx={{ width: "23%" }}>
          <Typography variant="h4" className={classes.label}>
            Relationship With Policy Holder
          </Typography>
          <Select
            className={classes.selectInputStyle}
            value={insuranceData.relationshipWithPolicyHolder}
            name="relationshipWithPolicyHolder"
            onChange={(e: any) => handleSelectOption(e)}
            renderValue={(selected) => {
              if (!selected) {
                return (
                  <span>
                    <Typography
                      variant="h5"
                      sx={{
                        color: "#1A1A1A80  !important",
                      }}
                    >
                      Select
                    </Typography>
                  </span>
                );
              }
              return <Typography variant="h5">{selected}</Typography>;
            }}
            MenuProps={MenuProps}
            displayEmpty
          >
            {relationshipWithPolicyHolderOptions.map((data) => {
              return (
                <MenuItem value={data} className={classes.menuItemColorStyle}>
                  {data}
                </MenuItem>
              );
            })}
          </Select>
        </Grid>
      </Grid>
      <Grid
        container
        className={classes.insuranceGrid}
        sx={{ flexDirection: "column" }}
      >
        <Grid item>
          <Typography
            variant="h4"
            className={classes.label}
            sx={{
              marginTop: "20px  !important",
            }}
          >
            Upload Insurance Card
          </Typography>
        </Grid>
        <Grid className={classes.insuranceDropZone}>
          <Grid item sx={customImageContainer}>
            <DropzoneArea
              maxFileSize={1048576} // 1 MB in bytes
              filesLimit={1}
              acceptedFiles={["image/jpeg", "image/jpg", "image/png"]}
              dropzoneText=" Click here to upload from Front Side Drag & Drop files Or Browse Files"
              onChange={(_files: any) => {}}
              classes={{
                root: classes.dropZone,
                icon: classes.uploadIcon,
                text: classes.textUploadZone,
              }}
            />
          </Grid>
          <Grid item sx={customImageContainer}>
            <DropzoneArea
              maxFileSize={1048576} // 1 MB in bytes
              filesLimit={1}
              acceptedFiles={["image/jpeg", "image/jpg", "image/png"]}
              dropzoneText=" Click here to upload from Back Side Drag & Drop files Or Browse Files"
              classes={{
                root: classes.dropZone,
                icon: classes.uploadIcon,
                text: classes.textUploadZone,
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Insurance;
