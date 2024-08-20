// import { Close } from "@mui/icons-material";
// import {
//   Box,
//   Dialog,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Grid,
//   Typography,
// } from "@mui/material";
// import { makeStyles } from "@mui/styles";
// import React from "react";
// import MedicineInfoTable from "../components/core/layout/individual-patient-details/view-summary/summary-medication-table";
// import TotalFeeTable from "../components/core/layout/individual-patient-details/view-summary/summary-total-fees-table";

// export const infoStyle = makeStyles({
//   bottomLine: {
//     borderBottom: "1px solid #1a1a1a1f",
//     margin: "24px 0",
//   },
//   contentContainer: {
//     display: "flex",
//     justifyContent: "start",
//     gap: "2%",
//     padding: "8px 0",
//   },
//   vitalContainer: {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr 1fr",
//     gap: "5%",
//     marginBottom: "10px",
//   },
//   vitalPair: {
//     display: "flex",
//     justifyContent: "start",
//     gap: "3%",
//   },
//   continerStyle: {
//     display: "flex",
//     gap: "5px",
//     marginBottom: "10px",
//   },
// });

// const styles = {
//   key: {
//     fontWeight: "600",
//     color: "#1A1A1A",
//   },
//   val: {
//     color: "#1A1A1ACC",
//     fontWeight: "600",
//   },
//   commonStyle: {
//     color: "#0097F0",
//     fontWeight: "600",
//     marginBottom: "10px",
//   },
// };

// interface ViewSummaryProps {
//   source?: string;
//   open: boolean;
//   setOpen?: any;
//   scroll?: string;
// }

// export default function ViewAppoinmentSummary(props: ViewSummaryProps) {
//   const { open, setOpen, scroll } = props;
//   const descriptionElementRef = React.useRef<HTMLElement>(null);
//   const classes = infoStyle();

//   React.useEffect(() => {
//     if (open) {
//       const { current: descriptionElement } = descriptionElementRef;
//       if (descriptionElement !== null) {
//         descriptionElement.focus();
//       }
//     }
//   }, [open]);

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         scroll="paper"
//         aria-labelledby="scroll-dialog-title"
//         aria-describedby="scroll-dialog-description"
//         maxWidth="md"
//         fullWidth
//       >
//         <DialogTitle
//           sx={{ display: "flex", justifyContent: "space-between" }}
//           id="scroll-dialog-title"
//         >
//           <Typography variant="h3" sx={{ fontWeight: "600" }}>
//             {"Encounter Information"}
//           </Typography>
//           <div>
//             <Close onClick={handleClose} sx={{ cursor: "pointer" }} />
//           </div>
//         </DialogTitle>
//         <DialogContent dividers={scroll === "paper"}>
//           <DialogContentText
//             id="scroll-dialog-description"
//             ref={descriptionElementRef}
//             tabIndex={-1}
//           >
//             <Grid>
//               <div>
//                 <Typography
//                   variant="h5"
//                   sx={{
//                     color: "#1A1A1A99",
//                     fontWeight: "600",
//                     marginBottom: "7px",
//                   }}
//                 >
//                   Performed By
//                 </Typography>
//                 <Typography
//                   sx={{
//                     color: "#004186",
//                     fontWeight: "600",
//                     marginBottom: "7px",
//                   }}
//                   variant="h4"
//                 >
//                   Dr.Shon Mark
//                 </Typography>
//                 <Typography
//                   sx={{ color: "#004186", marginBottom: "6px" }}
//                   variant="h5"
//                 >
//                   M.B.B.S ,MD,MS
//                 </Typography>
//                 <Typography
//                   variant="h5"
//                   style={{ color: "#1A1A1A", marginBottom: "6px" }}
//                 >
//                   829482736484
//                 </Typography>
//                 <div
//                   style={{ display: "flex", alignItems: "center", gap: "5px" }}
//                 >
//                   <Typography variant="h5" sx={{ color: "#004186" }}>
//                     NPI No -{" "}
//                   </Typography>
//                   <Typography variant="h5" sx={styles.val}>
//                     {" "}
//                     646378292
//                   </Typography>
//                 </div>
//               </div>
//             </Grid>
//             <div className={classes.bottomLine} />
//             <Grid>
//               <Box>
//                 <Typography
//                   variant="h2"
//                   style={{
//                     fontWeight: "600",
//                     color: "#1A1A1A",
//                     marginBottom: "19px",
//                   }}
//                 >
//                   Full Encounter Summary
//                 </Typography>
//               </Box>
//               <Box
//                 sx={{
//                   display: "grid",
//                   gridTemplateColumns: "42% 42%",
//                   gap: "6%",
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "grid",
//                     gridTemplateColumns: "1fr 1fr",
//                     gap: "7%",
//                   }}
//                 >
//                   <Typography variant="h5" sx={styles.key}>
//                     Patient Name
//                   </Typography>
//                   <Typography variant="h5" sx={styles.val}>
//                     Violet Harrington
//                   </Typography>
//                   <Typography variant="h5" sx={styles.key}>
//                     DOB
//                   </Typography>
//                   <Typography variant="h5" sx={styles.val}>
//                     10 June 1960
//                   </Typography>
//                   <Typography variant="h5" sx={styles.key}>
//                     Provider
//                   </Typography>
//                   <Typography variant="h5" sx={styles.val}>
//                     Dr.Shon Mark
//                   </Typography>
//                   <Typography variant="h5" sx={styles.key}>
//                     Insurance
//                   </Typography>
//                   <Typography variant="h5" sx={styles.val}>
//                     Ameritas Life Insurance Company
//                   </Typography>
//                 </div>
//                 <div
//                   style={{
//                     display: "grid",
//                     gridTemplateColumns: "1fr 1fr",
//                     gap: "7%",
//                   }}
//                 >
//                   <Typography variant="h5" sx={styles.key}>
//                     Appointment Date & Time
//                   </Typography>
//                   <Typography variant="h5" sx={styles.val}>
//                     21 MAy 2022
//                   </Typography>
//                   <Typography variant="h5" sx={styles.key}>
//                     Service Department
//                   </Typography>
//                   <Typography variant="h5" sx={styles.val}>
//                     Medical Associates
//                   </Typography>
//                 </div>
//               </Box>
//             </Grid>
//             <div className={classes.bottomLine} />
//             <Grid>
//               <Box
//                 fontStyle={{
//                   display: "flex",
//                   justifyContent: "start",
//                   gap: "20px",
//                 }}
//               >
//                 <Typography
//                   variant="h4"
//                   style={{ color: "#0097F0", fontWeight: "600" }}
//                 >
//                   Chief Complaint
//                 </Typography>
//                 <Typography variant="h5" style={{ fontWeight: "600" }}>
//                   Unspecified essential hypertension
//                 </Typography>
//               </Box>
//             </Grid>
//             <div className={classes.bottomLine} />
//             <Grid>
//               <Box>
//                 <Typography
//                   variant="h4"
//                   style={{ color: "#0097F0", fontWeight: "600" }}
//                 >
//                   Preferred Pharmacy/ Radiology
//                 </Typography>
//               </Box>
//               <Box>
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "start",
//                     gap: "3%",
//                     marginTop: "16px",
//                   }}
//                 >
//                   <Typography variant="h5" sx={styles.key}>
//                     Pharmacy Name
//                   </Typography>
//                   <Typography variant="h5" sx={styles.val}>
//                     Jupiter Pharmacy 1027 Highway 36. Covington, Georgia 300045
//                   </Typography>
//                 </div>
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "start",
//                     gap: "3%",
//                     marginTop: "16px",
//                   }}
//                 >
//                   <Typography variant="h5" sx={styles.key}>
//                     Radiology Name
//                   </Typography>
//                   <Typography variant="h5" sx={styles.val}>
//                     WeTrust Radiologists 1027 Highway 36. Covington, Georgia
//                     300045
//                   </Typography>
//                 </div>
//               </Box>
//             </Grid>
//             <div className={classes.bottomLine} />
//             <Grid>
//               <Box>
//                 <Typography variant="h4" sx={styles.commonStyle}>
//                   Visit Diagnosis ICD & CPT Codes
//                 </Typography>
//               </Box>
//               <Box>
//                 <div
//                   style={{
//                     display: "grid",
//                     gridTemplateColumns: "20% 35% 35%",
//                     gridRowGap: "20px",
//                     gap: "5%",
//                   }}
//                 >
//                   <div style={{ paddingTop: "8px" }}>
//                     <Typography variant="h5" sx={styles.key}>
//                       {" "}
//                       ICD Code
//                     </Typography>
//                   </div>
//                   <div>
//                     <div className={classes.contentContainer}>
//                       <Typography variant="h5" sx={styles.key}>
//                         A01.00
//                       </Typography>
//                       <Typography variant="h5" sx={styles.val}>
//                         Typhoid fever,unspecified
//                       </Typography>
//                     </div>
//                     <div className={classes.contentContainer}>
//                       <Typography variant="h5" sx={styles.key}>
//                         A01.01
//                       </Typography>
//                       <Typography variant="h5" sx={styles.val}>
//                         Typhoid meningitis
//                       </Typography>
//                     </div>
//                   </div>
//                   <div>
//                     <div className={classes.contentContainer}>
//                       <Typography variant="h5" sx={styles.key}>
//                         A01.02
//                       </Typography>
//                       <Typography variant="h5" sx={styles.val}>
//                         Typhoid fever with heart involvment
//                       </Typography>
//                     </div>
//                     <div className={classes.contentContainer}>
//                       <Typography variant="h5" sx={styles.key}>
//                         A01.04
//                       </Typography>
//                       <Typography variant="h5" sx={styles.val}>
//                         Paratyphoid fever, unspecified
//                       </Typography>
//                     </div>
//                   </div>
//                 </div>
//                 <div
//                   style={{
//                     display: "grid",
//                     gridTemplateColumns: "20% 35% 35%",
//                     gridRowGap: "20px",
//                     gap: "5%",
//                     paddingTop: "5px",
//                   }}
//                 >
//                   <div style={{ paddingTop: "8px" }}>
//                     <Typography variant="h5" sx={styles.key}>
//                       {" "}
//                       CPT Code
//                     </Typography>
//                   </div>
//                   <div>
//                     <div className={classes.contentContainer}>
//                       <Typography variant="h5" sx={styles.key}>
//                         96111
//                       </Typography>
//                       <Typography variant="h5" sx={styles.val}>
//                         Developmental Testing, Extended
//                       </Typography>
//                     </div>
//                     <div className={classes.contentContainer}>
//                       <Typography variant="h5" sx={styles.key}>
//                         96125
//                       </Typography>
//                       <Typography variant="h5" sx={styles.val}>
//                         Standardised cognitive performance testing
//                       </Typography>
//                     </div>
//                   </div>
//                   <div>
//                     <div className={classes.contentContainer}>
//                       <Typography variant="h5" sx={styles.key}>
//                         97770
//                       </Typography>
//                       <Typography variant="h5" sx={styles.val}>
//                         Cognitive Rehabilitation
//                       </Typography>
//                     </div>
//                     <div className={classes.contentContainer}>
//                       <Typography variant="h5" sx={styles.key}>
//                         90792
//                       </Typography>
//                       <Typography variant="h5" sx={styles.val}>
//                         Psychiatric Diagnostic Evaluation
//                       </Typography>
//                     </div>
//                   </div>
//                 </div>
//               </Box>
//             </Grid>
//             <div className={classes.bottomLine} />
//             <Grid>
//               <Box>
//                 <Typography variant="h4" sx={styles.commonStyle}>
//                   Vitals
//                 </Typography>
//               </Box>
//               <Box>
//                 <div className={classes.vitalContainer}>
//                   <div className={classes.vitalPair}>
//                     <Typography variant="h5" sx={styles.key}>
//                       Blood Pressure
//                     </Typography>
//                     <Typography variant="h5" sx={styles.val}>
//                       12/80(mmhm)
//                     </Typography>
//                   </div>
//                   <div className={classes.vitalPair}>
//                     <Typography variant="h5" sx={styles.key}>
//                       Rapitory Rate
//                     </Typography>
//                     <Typography variant="h5" sx={styles.val}>
//                       13(bpm)
//                     </Typography>
//                   </div>
//                   <div className={classes.vitalPair}>
//                     <Typography variant="h5" sx={styles.key}>
//                       Body Mass Index
//                     </Typography>
//                     <Typography variant="h5" sx={styles.val}>
//                       171(lbs)
//                     </Typography>
//                   </div>
//                 </div>
//               </Box>
//               <Box>
//                 <div className={classes.vitalContainer}>
//                   <div className={classes.vitalPair}>
//                     <Typography variant="h5" sx={styles.key}>
//                       Temprature
//                     </Typography>
//                     <Typography variant="h5" sx={styles.val}>
//                       96(f)
//                     </Typography>
//                   </div>
//                   <div className={classes.vitalPair}>
//                     <Typography variant="h5" sx={styles.key}>
//                       Weight
//                     </Typography>
//                     <Typography variant="h5" sx={styles.val}>
//                       69(lbs)
//                     </Typography>
//                   </div>
//                   <div className={classes.vitalPair}>
//                     <Typography variant="h5" sx={styles.key}>
//                       Respiration Rate
//                     </Typography>
//                     <Typography variant="h5" sx={styles.val}>
//                       60(rpm)
//                     </Typography>
//                   </div>
//                 </div>
//               </Box>
//             </Grid>
//             <div className={classes.bottomLine} />
//             <Grid>
//               <Box>
//                 <Typography variant="h4" sx={styles.commonStyle}>
//                   Allergies
//                 </Typography>
//               </Box>
//               <Box>
//                 <div className={classes.continerStyle}>
//                   <Typography variant="h5" sx={styles.key}>
//                     Cigarette smoke
//                   </Typography>
//                   <Typography variant="h5" sx={styles.val}>
//                     (high)
//                   </Typography>
//                 </div>
//                 <div className={classes.continerStyle}>
//                   <Typography variant="h5" sx={styles.key}>
//                     Dust
//                   </Typography>
//                   <Typography variant="h5" sx={styles.val}>
//                     (moderate)
//                   </Typography>
//                 </div>
//               </Box>
//             </Grid>
//             <div className={classes.bottomLine} />
//             <Grid>
//               <Box>
//                 <Typography variant="h4" sx={styles.commonStyle}>
//                   Problems
//                 </Typography>
//               </Box>
//               <Box>
//                 <div className={classes.continerStyle}>
//                   <Typography variant="h5" sx={styles.key}>
//                     Tyhoid fever
//                   </Typography>
//                   <Typography variant="h5" sx={styles.val}>
//                     (Onset Date - 04 Oct 2021)
//                   </Typography>
//                 </div>
//                 <div className={classes.continerStyle}>
//                   <Typography variant="h5" sx={styles.key}>
//                     A159 - Respiratory tuberculosis unspecified
//                   </Typography>
//                   <Typography variant="h5" sx={styles.val}>
//                     (Onset Date - 10 Jun 2020)
//                   </Typography>
//                 </div>
//                 <div className={classes.continerStyle}>
//                   <Typography variant="h5" sx={styles.key}>
//                     Bone and joint lesions of yaws
//                   </Typography>
//                   <Typography variant="h5" sx={styles.val}>
//                     (Onset Date - 21 Feb 2019)
//                   </Typography>
//                 </div>
//               </Box>
//             </Grid>
//             <div className={classes.bottomLine} />
//             <Grid>
//               <Box>
//                 <Typography variant="h4" sx={styles.commonStyle}>
//                   History
//                 </Typography>
//               </Box>
//               <Box>
//                 <div className={classes.continerStyle}>
//                   <Typography variant="h5" sx={styles.key}>
//                     Asthma
//                   </Typography>
//                   <Typography variant="h5" sx={styles.val}>
//                     (Relation - Father)
//                   </Typography>
//                 </div>
//                 <div className={classes.continerStyle}>
//                   <Typography variant="h5" sx={styles.key}>
//                     Breathing
//                   </Typography>
//                   <Typography variant="h5" sx={styles.val}>
//                     (Relation - Mother)
//                   </Typography>
//                 </div>
//               </Box>
//             </Grid>
//             <div className={classes.bottomLine} />
//             <Grid>
//               <Box>
//                 <Typography variant="h4" sx={styles.commonStyle}>
//                   Vaccine
//                 </Typography>
//               </Box>
//               <Box>
//                 <div className={classes.continerStyle}>
//                   <Typography variant="h5" sx={styles.key}>
//                     COVID-19,MRNA,LNP-S,PF
//                   </Typography>
//                   <Typography variant="h5" sx={styles.val}>
//                     (Dose Duration - 7 Days)
//                   </Typography>
//                 </div>
//                 <div className={classes.continerStyle}>
//                   <Typography variant="h5" sx={styles.key}>
//                     COVID-19,(SARS-COV-2)
//                   </Typography>
//                   <Typography variant="h5" sx={styles.val}>
//                     (Dose Duration - 10 Days)
//                   </Typography>
//                 </div>
//               </Box>
//             </Grid>
//             <div className={classes.bottomLine} />
//             <Grid>
//               <Box>
//                 <Typography variant="h4" sx={styles.commonStyle}>
//                   Medications
//                 </Typography>
//               </Box>
//               <MedicineInfoTable />
//             </Grid>
//             <div className={classes.bottomLine} />
//             <Grid>
//               <Box>
//                 <Typography variant="h4" sx={styles.commonStyle}>
//                   Total Fees
//                 </Typography>
//               </Box>
//               <TotalFeeTable />
//               <Box>
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "end",
//                     gap: "2%",
//                     margin: "10px  0",
//                   }}
//                 >
//                   <Typography
//                     variant="h4"
//                     style={{
//                       color: "#0097F0",
//                       fontWeight: "600",
//                     }}
//                   >
//                     Total Fees
//                   </Typography>
//                   <Typography sx={styles.val}>$320.00</Typography>
//                 </div>
//               </Box>
//               <Box>
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "end",
//                     gap: "2%",
//                     margin: "10px  0",
//                   }}
//                 >
//                   <Typography
//                     variant="h4"
//                     style={{
//                       color: "#0097F0",
//                       fontWeight: "600",
//                     }}
//                   >
//                     Total Paid
//                   </Typography>
//                   <Typography sx={styles.val}>$100.00</Typography>
//                 </div>
//               </Box>
//             </Grid>
//             <div className={classes.bottomLine} />
//             <Grid>
//               <Box>
//                 <Typography variant="h4" sx={styles.commonStyle}>
//                   Assessment/Plan
//                 </Typography>
//               </Box>
//               <Box>
//                 <div className={classes.continerStyle}>
//                   <Typography variant="h4" sx={styles.key}>
//                     Patient Goal
//                   </Typography>
//                 </div>
//                 <div className={classes.continerStyle}>
//                   <Typography variant="h5" sx={styles.key}>
//                     Lifting objects from a lower level to higher level -
//                   </Typography>
//                   <Typography variant="h5" sx={styles.val}>
//                     Target: Moderate difficulty Able to lift(1 to 5) lbs.
//                   </Typography>
//                 </div>
//               </Box>
//             </Grid>
//             <div className={classes.bottomLine} />
//             <Grid>
//               <Box>
//                 <Typography variant="h4" sx={styles.commonStyle}>
//                   Note
//                 </Typography>
//               </Box>
//               <Box>
//                 <div className={classes.continerStyle}>
//                   <Typography variant="h5" sx={styles.key}>
//                     Patient will return to the office as needed.
//                   </Typography>
//                 </div>
//               </Box>
//             </Grid>
//             <Grid>
//               <Box>
//                 <div style={{ display: "flex", justifyContent: "end" }}>
//                   <Box>
//                     <div style={{ display: "flex", justifyContent: "center" }}>
//                       <Typography
//                         variant="h2"
//                         sx={{ margin: "50px 0 15px 0", fontWeight: 600 }}
//                       >
//                         Signed By On Date
//                       </Typography>
//                     </div>
//                     <Typography variant="h4" sx={{ fontWeight: "600" }}>
//                       Dr.Shon Mark on 2nd june 2022
//                     </Typography>
//                   </Box>
//                 </div>
//               </Box>
//             </Grid>
//           </DialogContentText>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }
