// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import {
//   Modal,
//   Button,
//   Typography,
//   Grid,
//   InputBase,
//   ButtonBase,
// } from "@mui/material";
// import { DropzoneArea } from "material-ui-dropzone";
// import { makeStyles, styled } from "@mui/styles";
// import CustomFormLabel from "../../common/custom-form-label";
// import React, { useState } from "react";
// import { adminConstants } from "../../../constants/admin";
// import CloseIcon from "@mui/icons-material/Close";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// export const uploadButton = {
//   backgroundColor: "#004186",
//   marginTop: "15px",
//   width: "-webkit-fill-available",
//   "&:hover": {
//     fill: "#004186",
//     cursor: "pointer",
//   },
// };
// export const inputBase = makeStyles(() => ({
//   providerFormShortInputField: {
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
//   },
//   inputBoxText2: {
//     fontFamily: "Roboto",
//     fontStyle: "normal",
//     fontSize: "14px !important",
//     lineHeight: "140%",
//     color: "",
//     width: "100%",
//     resize: "vertical",
//     minHeight: "15px",
//   },
//   inputBoxActive2: {
//     background: `#FFFFFF 0% 0% no-repeat padding-box !important`,
//     border: `1px solid #004186 !important`,
//     borderRadius: "4px !important",
//   },
//   dropZone: {
//     minHeight: "150px !important",
//   },
//   uploadIcon: {
//     fill: "#1A1A1A66",
//   },
//   textUploadZone: {
//     color: "#1A1A1A",
//     fontSize: "12px !important",
//   },
//   gridItemMargin: {
//     marginTop: "5px !important",
//     marginBottom: "10px !important",
//   },
// }));

// const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
//   "& .MuiInputBase-root": {
//     borderRadius: "5px",
//     border: "none",
//     "& fieldset": { border: "none" },
//     boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
//     textAlign: "center",
//   },
//   "& .MuiInputBase-input": {
//     padding: "10px !important",
//   },
//   "& .Mui-focused": {
//     background: `#FFFFFF 0% 0% no-repeat padding-box !important`,
//     border: `1px solid #004186 !important`,
//     borderRadius: "4px !important",
//   },
// }));

// interface UploadDocumentProps {
//   open: boolean;
//   onClose: () => void;
// }
// export const UploadDocumentForm: React.FC<UploadDocumentProps> = ({
//   open,
//   onClose,
// }) => {
//   const classes = inputBase();
//   const { CHANGE, SUPPORTED_FORMAT } = adminConstants;

//   const [uploadFrom, setUploadFrom] = useState({
//     documenttype: "",
//     date: "",
//     documentdescription: "",
//   });
//   const inputData = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, name } = e.target;
//     setUploadFrom((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };
//   return (
//     <Modal open={open} onClose={onClose}>
//       <div
//         style={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: 500,
//           backgroundColor: "#fff",
//           paddingLeft: 20,
//           paddingRight: 20,
//           paddingTop: 8,
//           borderRadius: 5,
//         }}
//       >
//         <Grid container mt={1} rowGap={2}>
//           <Grid item xs={11}>
//             <Typography variant="h1" sx={{ color: "", fontWeight: "bold" }}>
//               Upload
//             </Typography>
//           </Grid>
//           <Grid item xs={1} sx={{ display: "flex", justifyContent: "center" }}>
//             <ButtonBase>
//               <CloseIcon onClick={onClose} />
//             </ButtonBase>
//           </Grid>
//           <Grid container sx={{ display: "flex" }} spacing={2}>
//             <Grid item xs={6}>
//               <CustomFormLabel label="Document Type" source={CHANGE} />
//               <InputBase
//                 value={uploadFrom.documenttype}
//                 fullWidth
//                 placeholder="Enter Document Type"
//                 classes={{
//                   root: classes.providerFormShortInputField,
//                   input: classes.inputBoxText2,
//                   focused: classes.inputBoxActive2,
//                 }}
//                 onChange={(e: any) => inputData(e)}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <CustomFormLabel label="Date" source={CHANGE} />
//               <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <StyledDatePicker
//                   sx={{
//                     "& .MuiInputBase-input": {
//                       padding: "10px !important",
//                     },
//                   }}
//                 />
//               </LocalizationProvider>
//             </Grid>
//           </Grid>
//           <Grid item xs={12}>
//             <CustomFormLabel label="Document Description" source={CHANGE} />
//             <InputBase
//               value={uploadFrom.documentdescription}
//               fullWidth
//               placeholder="Enter Document Description"
//               classes={{
//                 root: classes.providerFormShortInputField,
//                 input: classes.inputBoxText2,
//                 focused: classes.inputBoxActive2,
//               }}
//               onChange={(e: any) => inputData(e)}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <DropzoneArea
//               dropzoneText="Drag & Drop files Or Browse Files"
//               onChange={(files: any) => console.log("Files:", files)}
//               classes={{
//                 root: classes.dropZone,
//                 icon: classes.uploadIcon,
//                 text: classes.textUploadZone,
//               }}
//             />
//           </Grid>
//           <Grid item>
//             <Typography
//               variant="h1"
//               sx={{ color: "#1A1A1A7F", fontSize: "10px !important" }}
//             >
//               {SUPPORTED_FORMAT}
//             </Typography>
//           </Grid>
//           <Grid item xs={12} className={classes.gridItemMargin}>
//             <Button variant="contained" sx={uploadButton} onClick={onClose}>
//               <Typography sx={{ color: "#FFFFFF" }}>Upload</Typography>
//             </Button>
//           </Grid>
//         </Grid>
//       </div>
//     </Modal>
//   );
// };
