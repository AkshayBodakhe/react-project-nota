// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useEffect, useState } from "react";
// import theme from "../../../theme";

// import {
//   Dialog,
//   DialogContent,
//   DialogActions,
//   Grid,
//   Typography,
//   ButtonBase,
//   InputBase,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import { DropzoneArea } from "material-ui-dropzone";
// import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
// import { makeStyles, styled } from "@mui/styles";
// import CustomFormLabel from "../../common/custom-form-label";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { adminConstants } from "../../../constants/admin";

// const { CHANGE, SUPPORTED_FORMAT } = adminConstants;
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

// export const addLabDetailsStyle = makeStyles(() => ({
//   textheading: {
//     color: "#1A1A1A80 !important",
//     fontWeight: "600 !important",
//     paddingBottom: "10px!important ",
//   },
//   textvalue: {
//     color: "#1A1A1ACC !important",
//     fontWeight: "600 !important",
//   },
//   textFieldFullWidth: {
//     borderRadius: "5px",
//     border: "none",
//     "& fieldset": { border: "none" },
//     boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
//     height: "42px !important",
//     textAlign: "center",
//     padding: "13px 0px 10px 16px",
//     fontSize: "16px",
//   },
//   textFieldInput: {
//     fontStyle: "normal",
//     fontWeight: "bold",
//     fontSize: "14px",
//     lineHeight: "140%",
//     color: "",
//     width: "100%",
//     resize: "vertical",
//     minHeight: "15px",
//     "&::placeholder": {
//       fontSize: "14px",
//       fontWeight: "500 !important",
//     },
//   },
//   textFieldActive: {
//     background: `${theme.palette.primary.light} 0% 0% no-repeat padding-box !important`,
//     boxShadow: `0px 0px 6px ${theme.palette.secondary.main} !important`,
//     border: `1px solid ${theme.palette.primary.main} !important`,
//     borderRadius: "4px !important",
//   },
//   dropZone: {
//     minHeight: "200px !important",
//   },
//   uploadIcon: {
//     fill: "#1A1A1A66",
//   },
//   textUploadZone: {
//     color: "#1A1A1A",
//     fontSize: "12px !important",
//   },
// }));

// export const selectInputStyle = {
//   ".MuiOutlinedInput-notchedOutline": { border: 0 },
//   boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
//   height: "42px !important",
//   width: "100%",
// };
// const abnormalFlagList = [
//   "L- Below Low Normal",
//   "L- Below Low Normal",
//   "HH- Above Upper Panic Limits",
// ];

// interface AddLabResultsDialogProps {
//   open: boolean;
//   onClose: () => void;
//   onEventSuccessModalOpen: () => void;
//   title: string;
//   source: string;
//   data: any;
// }

// export const AddLabResultsDialog: React.FC<AddLabResultsDialogProps> = ({
//   open,
//   onClose,
//   onEventSuccessModalOpen,
//   title,
//   source,
//   data,
// }) => {
//   const classes = addLabDetailsStyle();
//   const [addLabDetails, setAddLabDetails] = useState(data);
//   const ITEM_HEIGHT = 25;
//   const ITEM_PADDING_TOP = 8;
//   const MenuProps = {
//     PaperProps: {
//       style: {
//         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//         width: 50,
//       },
//     },
//   };
//   const handleSelectOption = (e: any) => {
//     const { value, name } = e.target;
//     setAddLabDetails((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };
//   const inputData = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, name } = e.target;
//     setAddLabDetails((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };
//   const handleSaveLabResult = () => {
//     onEventSuccessModalOpen();
//     setAddLabDetails(data);
//   };

//   return (
//     <>
//       <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
//         <DialogContent sx={{ overflowY: "hidden" }}>
//           <Grid container>
//             <Grid item xs={11}>
//               <Typography
//                 variant="h1"
//                 sx={{ color: "#1A1A1A", fontWeight: "bold" }}
//               >
//                 {title}
//               </Typography>
//             </Grid>
//             <Grid
//               item
//               xs={1}
//               sx={{ display: "flex", justifyContent: "flex-end" }}
//             >
//               {" "}
//               <ButtonBase onClick={onClose}>
//                 <CloseOutlinedIcon />
//               </ButtonBase>
//             </Grid>
//           </Grid>
//           <Grid container pt={2}>
//             <Grid container pt={2}>
//               <CustomFormLabel label="Lab Description" source={CHANGE} />
//               <InputBase
//                 fullWidth
//                 value={addLabDetails?.labdescription}
//                 placeholder="Enter Lab Description"
//                 name="labdescription"
//                 sx={{
//                   alignItems: "baseline !important",
//                   paddingLeft: "5px !important",
//                   boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
//                   height: "42px !important",
//                   width: "100% !important",
//                 }}
//                 onChange={(e: any) => inputData(e)}
//               />
//             </Grid>
//             <Grid container pt={2} spacing={2}>
//               <Grid item xs={3}>
//                 {" "}
//                 <CustomFormLabel label="Result Name" />
//                 <InputBase
//                   fullWidth
//                   value={addLabDetails?.resultvalue}
//                   placeholder="Enter Result Value"
//                   name="resultvalue"
//                   sx={{
//                     alignItems: "baseline !important",
//                     paddingLeft: "5px !important",
//                     boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
//                     height: "42px !important",
//                     width: "100% !important",
//                   }}
//                   onChange={(e: any) => inputData(e)}
//                 />
//               </Grid>
//               <Grid item xs={3}>
//                 {" "}
//                 <CustomFormLabel label="Recorded Date" />
//                 <LocalizationProvider dateAdapter={AdapterDayjs}>
//                   <StyledDatePicker
//                     sx={{
//                       "& .MuiInputBase-input": {
//                         padding: "10px !important",
//                       },
//                     }}
//                     // value={addLabDetails?.recordeddate}
//                   />
//                 </LocalizationProvider>
//               </Grid>
//               <Grid item xs={6}>
//                 <CustomFormLabel label="Abnormal Flag" />
//                 <Select
//                   sx={selectInputStyle}
//                   value={addLabDetails?.abnormalflag}
//                   name="abnormalflag"
//                   onChange={(e: any) => handleSelectOption(e)}
//                   renderValue={(selected) => {
//                     if (!selected) {
//                       return (
//                         <span>
//                           <Typography
//                             variant="h5"
//                             sx={{
//                               color: "#1A1A1A80",
//                             }}
//                           >
//                             Select
//                           </Typography>
//                         </span>
//                       );
//                     }
//                     return <Typography variant="h5">{selected}</Typography>;
//                   }}
//                   MenuProps={MenuProps}
//                   displayEmpty
//                 >
//                   {abnormalFlagList.map((data) => {
//                     return (
//                       <MenuItem value={data} sx={{ color: "#1A1A1A7F" }}>
//                         {data}
//                       </MenuItem>
//                     );
//                   })}
//                 </Select>
//               </Grid>
//             </Grid>
//             <Grid container pt={2}>
//               <CustomFormLabel label="Note" />
//               <InputBase
//                 fullWidth
//                 value={addLabDetails?.note}
//                 placeholder="Type Here"
//                 name="note"
//                 sx={{
//                   alignItems: "baseline !important",
//                   paddingLeft: "5px !important",
//                   boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
//                   minHeight: "10vh",
//                   width: "100% !important",
//                 }}
//                 onChange={(e: any) => inputData(e)}
//               />
//             </Grid>
//             <Grid container pt={2}>
//               <DropzoneArea
//                 dropzoneText="Drag & Drop files Or Browse Files"
//                 onChange={(files: any) => console.log("Files:", files)}
//                 classes={{
//                   root: classes.dropZone,
//                   icon: classes.uploadIcon,
//                   text: classes.textUploadZone,
//                 }}
//               />
//             </Grid>

//             <Grid item pt={2}>
//               <Typography
//                 variant="h1"
//                 sx={{ color: "#1A1A1A7F", fontSize: "10px !important" }}
//               >
//                 {SUPPORTED_FORMAT}
//               </Typography>
//             </Grid>
//           </Grid>

//           <DialogActions>
//             <Grid
//               item
//               xs={12}
//               pt={3}
//               sx={{ display: "flex", justifyContent: "flex-end" }}
//             >
//               <ButtonBase
//                 sx={{
//                   background: "#004186",
//                   height: 40,
//                   width: "auto",
//                   padding: "12px",
//                   borderRadius: "5px",
//                 }}
//                 onClick={handleSaveLabResult}
//               >
//                 <Typography
//                   variant="h4"
//                   color="#FFFFFF"
//                   sx={{ fontWeight: "bold" }}
//                 >
//                   Save Lab Result
//                 </Typography>
//               </ButtonBase>
//             </Grid>
//           </DialogActions>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default AddLabResultsDialog;
