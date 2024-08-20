import React, { useRef } from "react";
import { Box, ButtonBase, Dialog, DialogContent, DialogContentText, DialogProps, DialogTitle, Grid, Typography } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import { useReactToPrint } from "react-to-print";
import { Close } from "@mui/icons-material";
import notaLogo from "../../../../../../../assets/logo/Navala_Logo.svg";
import { commonContainer, key, subTitles, val } from "../../../../../../../styles/common";
import moment from "moment";
import { transformText } from "../../../../../../../components/common/helper";

interface PrintGlobalPatientCharting {
  open: boolean;
  onClose: () => void;
  uuid: string;
  patientData: any;
}

function PrintGlobalPatientCharting(props: PrintGlobalPatientCharting) {
  const { open, onClose, uuid: patientUuid, patientData } = props;

  const [scroll] = React.useState<DialogProps["scroll"]>("paper");
  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });
  return (
    <>
      <style>
        {`@media print {
          .no-print {
            display: none !important;
          }
        }
      `}
      </style>
      <Dialog
        open={open}
        onClose={onClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="lg"
        fullWidth
        ref={printRef}
      >
        <DialogTitle id="scroll-dialog-title">
          <Grid container justifyContent={"space-between"} className="no-print">
            <Typography variant="h3"></Typography>
            <Grid display={"flex"} gap={2}>
              <ButtonBase onClick={handlePrint}>
                <PrintIcon sx={{ color: "#2c57b3" }} />
                <Typography sx={{ color: "#2c57b3", fontSize: "1.2rem" }}>
                  Print
                </Typography>
              </ButtonBase>
              <Close onClick={onClose} sx={{ cursor: "pointer" }} />
            </Grid>
          </Grid>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            item
            xs={12}
          >
            <img src={notaLogo} width={"146px"} height={"60px"}></img>
          </Grid>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              mb: 5,
            }}
            item
            xs={12}
          >
            <Typography fontWeight={"600"}>
              {"Navala Care test Account"}
            </Typography>
            <Typography fontWeight={"600"}>
              {"70 Washington Square South, New York, NY 10012, United States"}
            </Typography>
            <Typography fontWeight={"600"}>
              {"Office Number- 414-690-5082 / Fax Number - 1-408-999 8888"}
            </Typography>
          </Grid>
          <hr />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box>
              <Box>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>{"PATIENT SUMMARY"}</Typography>
                  <Typography sx={{ fontWeight: "900", color: "black", mt: 2 }}>
                    {"PATIENT DETAILS"}
                  </Typography>
                </Grid>
                <Box sx={commonContainer}>
                  <Box display={"grid"} gridTemplateColumns={"40% 5% 43%"}>
                    <Typography sx={key}>{"Registration Date"}</Typography>
                    <Typography sx={key}>{"-"}</Typography>
                    <Typography sx={val}>
                      {moment(patientData?.registrationDate).format(
                        "MM-DD-YYYY"
                      ) || "-"}
                    </Typography>
                  </Box>

                  <Box display={"grid"} gridTemplateColumns={"40% 5% 43%"}>
                    <Typography sx={key}>{"Patient Name"}</Typography>
                    <Typography sx={key}>{"-"}</Typography>
                    <Typography sx={val}>
                      {patientData?.legalFirstName +
                        " " +
                        patientData?.legalLastName || "-"}
                    </Typography>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"40% 5% 50%"}>
                    <Typography sx={key}>{"Gender"}</Typography>
                    <Typography sx={key}>{"-"}</Typography>
                    <Typography sx={val}>
                      {transformText(patientData?.gender) || "-"}
                    </Typography>
                  </Box>

                  <Box display={"grid"} gridTemplateColumns={"40% 5% 43%"}>
                    <Typography sx={key}>{"DOB"}</Typography>
                    <Typography sx={key}>{"-"}</Typography>
                    <Typography sx={val}>
                      {moment(patientData?.birthDate).format("MM-DD-YYYY") ||
                        "-"}
                    </Typography>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"40% 5% 50%"}>
                    <Typography sx={key}>{"Email"}</Typography>
                    <Typography sx={key}>{"-"}</Typography>
                    <Typography sx={val}>
                      {patientData?.email || "-"}
                    </Typography>
                  </Box>

                  <Box display={"grid"} gridTemplateColumns={"40% 5% 50%"}>
                    <Typography sx={key}>{"Contact No."}</Typography>
                    <Typography sx={key}>{"-"}</Typography>
                    <Typography sx={val}>
                      {patientData?.phoneNumber || "-"}
                    </Typography>
                  </Box>

                  <Box display={"grid"} gridTemplateColumns={"40% 5% 50%"}>
                    <Typography sx={key}>{"SSN"}</Typography>
                    <Typography sx={key}>{"-"}</Typography>
                    <Typography sx={val}>{patientData?.ssn || "-"}</Typography>
                  </Box>

                  <Box display={"grid"} gridTemplateColumns={"40% 5% 50%"}>
                    <Typography sx={key}>{"Address"}</Typography>
                    <Typography sx={key}>{"-"}</Typography>
                    <Typography sx={val}>
                      {patientData?.line1 +
                        " " +
                        patientData?.city +
                        " " +
                        patientData?.state +
                        " " +
                        patientData?.country || "-"}
                    </Typography>
                  </Box>

                  <Box display={"grid"} gridTemplateColumns={"40% 5% 50%"}>
                    <Typography sx={key}>{"Primary Provider Name"}</Typography>
                    <Typography sx={key}>{"-"}</Typography>
                    <Typography sx={val}>
                      {patientData?.providerFirstName +
                        " " +
                        patientData?.providerLastName || "-"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              {/* <Box py={1} />
              <Grid>
                <Grid py={1.5}>
                  <Typography sx={subTitles}>{"MEDICATIONS"}</Typography>
                </Grid>
                <Grid sx={commonContainer}>
                  {MediationsDataIsLoading ? (
                    <Loading />
                  ) : MediationsDataIsError ? (
                    <Typography>Error occurred while fetching data</Typography>
                  ) : medicationsData.length === 0 ? (
                    <Typography>No Data Available</Typography>
                  ) : (
                    medicationsData?.map((item) => {
                      return (
                        <Grid>
                          <Box
                            display={"grid"}
                            gridTemplateColumns={"14% 2% 1fr"}
                          >
                            <Typography sx={key}>
                              {"Medication Name"}
                            </Typography>
                            <Typography sx={key}>{"-"}</Typography>
                            <Typography sx={val}>
                              {item?.medication?.name
                                ? item?.medication?.name
                                : "-"}
                            </Typography>
                          </Box>
                          <Box
                            display={"grid"}
                            gridTemplateColumns={"14% 2% 1fr"}
                          >
                            <Typography sx={key}>{"Start Date"}</Typography>
                            <Typography sx={key}>{"-"}</Typography>
                            <Typography sx={val}>
                              {item?.startDate ? item?.startDate : "-"}
                            </Typography>
                          </Box>
                          <Box
                            display={"grid"}
                            gridTemplateColumns={"14% 2% 1fr"}
                          >
                            <Typography sx={key}>{"End Date"}</Typography>
                            <Typography sx={key}>{"-"}</Typography>
                            <Typography sx={val}>
                              {item?.endDate ? item?.endDate : "-"}
                            </Typography>
                          </Box>
                          <Box
                            display={"grid"}
                            gridTemplateColumns={"14% 2% 1fr"}
                          >
                            <Typography sx={key}>{"Dosage Time"}</Typography>
                            <Typography sx={key}>{"-"}</Typography>
                            <Typography sx={val}>
                              {item?.dosageTime
                                ? transformText(item?.dosageTime)
                                : "-"}
                            </Typography>
                          </Box>
                          <Box
                            display={"grid"}
                            gridTemplateColumns={"14% 2% 1fr"}
                          >
                            <Typography sx={key}>{"Dosage Unit"}</Typography>
                            <Typography sx={key}>{"-"}</Typography>
                            <Typography sx={val}>
                              {item?.dosageUnit
                                ? transformText(item?.dosageUnit)
                                : "-"}
                            </Typography>
                          </Box>
                          <Box
                            display={"grid"}
                            gridTemplateColumns={"14% 2% 1fr"}
                          >
                            <Typography sx={key}>{"Dosage When"}</Typography>
                            <Typography sx={key}>{"-"}</Typography>
                            <Typography sx={val}>
                              {item?.dosageWhen
                                ? transformText(item?.dosageWhen)
                                : "-"}
                            </Typography>
                          </Box>
                          <Box
                            display={"grid"}
                            gridTemplateColumns={"14% 2% 1fr"}
                          >
                            <Typography sx={key}>{"Duration"}</Typography>
                            <Typography sx={key}>{"-"}</Typography>
                            <Typography sx={val}>
                              {item?.duration ? item?.duration : "-"}
                            </Typography>
                          </Box>
                          <Box
                            display={"grid"}
                            gridTemplateColumns={"14% 2% 1fr"}
                          >
                            <Typography sx={key}>{"Sig"}</Typography>
                            <Typography sx={key}>{"-"}</Typography>
                            <Typography sx={val}>
                              {item?.sig ? item?.sig : "-"}
                            </Typography>
                          </Box>
                          <Box
                            display={"grid"}
                            gridTemplateColumns={"14% 2% 1fr"}
                          >
                            <Typography sx={key}>{"Note"}</Typography>
                            <Typography sx={key}>{"-"}</Typography>
                            <Typography sx={val}>
                              {item?.note ? item?.note : "-"}
                            </Typography>
                          </Box>
                          <hr />
                        </Grid>
                      );
                    })
                  )}
                </Grid>
              </Grid>
              <Box py={1} />

              <Grid py={1.5}>
                <Typography sx={subTitles}>
                  {"ADHERENCE TO TREATMENT"}
                </Typography>
              </Grid>
              <Grid
                sx={{
                  border: "1px solid #c5c5c5",
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                <Grid>
                  {isLoading ? (
                    <Loading />
                  ) : isError ? (
                    <Typography>Error occurred while fetching data</Typography>
                  ) : adherenceToTreatment.length === 0 ? (
                    <Typography>No Data Available</Typography>
                  ) : (
                    adherenceToTreatment?.map((item: any, index: number) => {
                      return (
                        <Box
                          key={index}
                          display={"flex"}
                          flexDirection={"column"}
                          rowGap={0.5}
                          mt={1.5}
                        >
                          <Grid container gap={1.2} alignItems={"center"}>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {"Title"}
                            </Typography>
                            <Typography>:</Typography>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {item?.name || "-"}
                            </Typography>
                          </Grid>
                          <Grid container gap={1.2} alignItems={"center"}>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {"Note"}
                            </Typography>
                            <Typography>:</Typography>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {item?.description || "-"}
                            </Typography>
                          </Grid>
                        </Box>
                      );
                    })
                  )}
                </Grid>
              </Grid>
              <Box py={1} />
              <Grid py={1.5}>
                <Typography sx={subTitles}>
                  {"STI TESTING AND HISTORY"}
                </Typography>
              </Grid>
              <Grid
                sx={{
                  border: "1px solid #c5c5c5",
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                <Grid>
                  {STITestingAndHistoryIsLoading ? (
                    <Loading />
                  ) : STITestingAndHistoryIsError ? (
                    <Typography>Error occurred while fetching data</Typography>
                  ) : stitestingHistory.length === 0 ? (
                    <Typography>No Data Available</Typography>
                  ) : (
                    stitestingHistory?.map((item: any, index: number) => {
                      return (
                        <Box
                          key={index}
                          display={"flex"}
                          flexDirection={"column"}
                          rowGap={0.5}
                          mt={1.5}
                        >
                          <Grid container gap={1.2} alignItems={"center"}>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {"Title"}
                            </Typography>
                            <Typography>:</Typography>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {item?.name || "-"}
                            </Typography>
                          </Grid>
                          <Grid container gap={1.2} alignItems={"center"}>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {"Note"}
                            </Typography>
                            <Typography>:</Typography>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {item?.description || "-"}
                            </Typography>
                          </Grid>
                        </Box>
                      );
                    })
                  )}
                </Grid>
              </Grid>
              <Box py={1} />

              <Grid py={1.5}>
                <Typography sx={subTitles}>
                  {"SUBSTANCE ABUSE HISTORY"}
                </Typography>
              </Grid>
              <Grid
                sx={{
                  border: "1px solid #c5c5c5",
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                <Grid>
                  {SubstanceAbuseHistoryIsLoading ? (
                    <Loading />
                  ) : SubstanceAbuseHistoryIsError ? (
                    <Typography>Error occurred while fetching data</Typography>
                  ) : substanceAbuseHistory.length === 0 ? (
                    <Typography>No Data Available</Typography>
                  ) : (
                    substanceAbuseHistory?.map((item: any, index: number) => {
                      return (
                        <Box
                          key={index}
                          display={"flex"}
                          flexDirection={"column"}
                          rowGap={0.5}
                          mt={1.5}
                        >
                          <Grid container gap={1.2} alignItems={"center"}>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {"Title"}
                            </Typography>
                            <Typography>:</Typography>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {item?.name || "-"}
                            </Typography>
                          </Grid>
                          <Grid container gap={1.2} alignItems={"center"}>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {"Note"}
                            </Typography>
                            <Typography>:</Typography>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {item?.description || "-"}
                            </Typography>
                          </Grid>
                        </Box>
                      );
                    })
                  )}
                </Grid>
              </Grid>
              <Box py={1} />
              <Grid py={1.5}>
                <Typography sx={subTitles}>
                  {"RISK BEHAVIOR SCREENING"}
                </Typography>
              </Grid>
              <Grid
                sx={{
                  border: "1px solid #c5c5c5",
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                <Grid>
                  {riskBehaviorScreeningIsLoadoing ? (
                    <Loading />
                  ) : riskBehaviorScreeningIsError ? (
                    <Typography>Error occurred while fetching data</Typography>
                  ) : riskBehaviorScreening.length === 0 ? (
                    <Typography>No Data Available</Typography>
                  ) : (
                    riskBehaviorScreening?.map((item: any, index: number) => {
                      return (
                        <Box
                          key={index}
                          display={"flex"}
                          flexDirection={"column"}
                          rowGap={0.5}
                          mt={1.5}
                        >
                          <Grid container gap={1.2} alignItems={"center"}>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {"Title"}
                            </Typography>
                            <Typography>:</Typography>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {item?.name || "-"}
                            </Typography>
                          </Grid>
                          <Grid container gap={1.2} alignItems={"center"}>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {"Note"}
                            </Typography>
                            <Typography>:</Typography>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {item?.description || "-"}
                            </Typography>
                          </Grid>
                        </Box>
                      );
                    })
                  )}
                </Grid>
              </Grid>

              <Box py={1} />
              <Grid py={1.5}>
                <Typography sx={subTitles}>{"HOUSING"}</Typography>
              </Grid>
              <Grid
                sx={{
                  border: "1px solid #c5c5c5",
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                <Grid>
                  {housingIsLoading ? (
                    <Loading />
                  ) : housingIsError ? (
                    <Typography>Error occurred while fetching data</Typography>
                  ) : housing.length === 0 ? (
                    <Typography>No Data Available</Typography>
                  ) : (
                    housing?.map((item: any, index: number) => {
                      return (
                        <Box
                          key={index}
                          display={"flex"}
                          flexDirection={"column"}
                          rowGap={0.5}
                          mt={1.5}
                        >
                          <Grid container gap={1.2} alignItems={"center"}>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {"Title"}
                            </Typography>
                            <Typography>:</Typography>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {item?.name || "-"}
                            </Typography>
                          </Grid>
                          <Grid container gap={1.2} alignItems={"center"}>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {"Note"}
                            </Typography>
                            <Typography>:</Typography>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {item?.description || "-"}
                            </Typography>
                          </Grid>
                        </Box>
                      );
                    })
                  )}
                </Grid>
              </Grid>

              <Box py={1} />
              <Grid py={1.5}>
                <Typography sx={subTitles}>
                  {"EMPLOYMENT SOURCES OF INCOME"}
                </Typography>
              </Grid>
              <Grid
                sx={{
                  border: "1px solid #c5c5c5",
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                <Grid>
                  {sourcesOfIncomeIsLoading ? (
                    <Loading />
                  ) : sourcesOfIncomeIsError ? (
                    <Typography>Error occurred while fetching data</Typography>
                  ) : sourcesOfIncome.length === 0 ? (
                    <Typography>No Data Available</Typography>
                  ) : (
                    sourcesOfIncome?.map((item: any, index: number) => {
                      return (
                        <Box
                          key={index}
                          display={"flex"}
                          flexDirection={"column"}
                          rowGap={0.5}
                          mt={1.5}
                        >
                          <Grid container gap={1.2} alignItems={"center"}>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {"Title"}
                            </Typography>
                            <Typography>:</Typography>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {item?.name || "-"}
                            </Typography>
                          </Grid>
                          <Grid container gap={1.2} alignItems={"center"}>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {"Note"}
                            </Typography>
                            <Typography>:</Typography>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {item?.description || "-"}
                            </Typography>
                          </Grid>
                        </Box>
                      );
                    })
                  )}
                </Grid>
              </Grid>

              <Box py={1} />
              <Grid py={1.5}>
                <Typography sx={subTitles}>{"EMOTIONAL SUPPORT"}</Typography>
              </Grid>
              <Grid
                sx={{
                  border: "1px solid #c5c5c5",
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                <Grid>
                  {emotionalSupportIsLoading ? (
                    <Loading />
                  ) : emotionalSupportIsError ? (
                    <Typography>Error occurred while fetching data</Typography>
                  ) : emotionalSupport.length === 0 ? (
                    <Typography>No Data Available</Typography>
                  ) : (
                    emotionalSupport?.map((item: any, index: number) => {
                      return (
                        <Box
                          key={index}
                          display={"flex"}
                          flexDirection={"column"}
                          rowGap={0.5}
                          mt={1.5}
                        >
                          <Grid container gap={1.2} alignItems={"center"}>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {"Title"}
                            </Typography>
                            <Typography>:</Typography>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {item?.name || "-"}
                            </Typography>
                          </Grid>
                          <Grid container gap={1.2} alignItems={"center"}>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {"Note"}
                            </Typography>
                            <Typography>:</Typography>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {item?.description || "-"}
                            </Typography>
                          </Grid>
                        </Box>
                      );
                    })
                  )}
                </Grid>
              </Grid>

              <Box py={1} />
              <Grid py={1.5}>
                <Typography sx={subTitles}>{"FOOD ASSISTANCE"}</Typography>
              </Grid>
              <Grid
                sx={{
                  border: "1px solid #c5c5c5",
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                <Grid>
                  {foodAssistanceIsLoading ? (
                    <Loading />
                  ) : foodAssistanceIsError ? (
                    <Typography>Error occurred while fetching data</Typography>
                  ) : foodAssistance.length === 0 ? (
                    <Typography>No Data Available</Typography>
                  ) : (
                    foodAssistance?.map((item: any, index: number) => {
                      return (
                        <Box
                          key={index}
                          display={"flex"}
                          flexDirection={"column"}
                          rowGap={0.5}
                          mt={1.5}
                        >
                          <Grid container gap={1.2} alignItems={"center"}>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {"Title"}
                            </Typography>
                            <Typography>:</Typography>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {item?.name || "-"}
                            </Typography>
                          </Grid>
                          <Grid container gap={1.2} alignItems={"center"}>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {"Note"}
                            </Typography>
                            <Typography>:</Typography>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {item?.description || "-"}
                            </Typography>
                          </Grid>
                        </Box>
                      );
                    })
                  )}
                </Grid>
              </Grid>

              <Box py={1} />
              <Grid py={1.5}>
                <Typography sx={subTitles}>{"TRANSPORTATION"}</Typography>
              </Grid>
              <Grid
                sx={{
                  border: "1px solid #c5c5c5",
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                <Grid>
                  {transportationIsLoading ? (
                    <Loading />
                  ) : transportationIsError ? (
                    <Typography>Error occurred while fetching data</Typography>
                  ) : transportation.length === 0 ? (
                    <Typography>No Data Available</Typography>
                  ) : (
                    transportation?.map((item: any, index: number) => {
                      return (
                        <Box
                          key={index}
                          display={"flex"}
                          flexDirection={"column"}
                          rowGap={0.5}
                          mt={1.5}
                        >
                          <Grid container gap={1.2} alignItems={"center"}>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {"Title"}
                            </Typography>
                            <Typography>:</Typography>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {item?.name || "-"}
                            </Typography>
                          </Grid>
                          <Grid container gap={1.2} alignItems={"center"}>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {"Note"}
                            </Typography>
                            <Typography>:</Typography>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {item?.description || "-"}
                            </Typography>
                          </Grid>
                        </Box>
                      );
                    })
                  )}
                </Grid>
              </Grid>

              <Box py={1} />
              <Grid py={1.5}>
                <Typography sx={subTitles}>
                  {"SUPPORT GROUPS FAMILY"}
                </Typography>
              </Grid>
              <Grid
                sx={{
                  border: "1px solid #c5c5c5",
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                <Grid>
                  {supportGroupFamilyIsLoading ? (
                    <Loading />
                  ) : supportGroupFamilyIsError ? (
                    <Typography>Error occurred while fetching data</Typography>
                  ) : supportGroupFamily.length === 0 ? (
                    <Typography>No Data Available</Typography>
                  ) : (
                    supportGroupFamily?.map((item: any, index: number) => {
                      return (
                        <Box
                          key={index}
                          display={"flex"}
                          flexDirection={"column"}
                          rowGap={0.5}
                          mt={1.5}
                        >
                          <Grid container gap={1.2} alignItems={"center"}>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {"Title"}
                            </Typography>
                            <Typography>:</Typography>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {item?.name || "-"}
                            </Typography>
                          </Grid>
                          <Grid container gap={1.2} alignItems={"center"}>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {"Note"}
                            </Typography>
                            <Typography>:</Typography>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {item?.description || "-"}
                            </Typography>
                          </Grid>
                        </Box>
                      );
                    })
                  )}
                </Grid>
              </Grid>

              <Box py={1} />
              <Grid py={1.5}>
                <Typography sx={subTitles}>
                  {"HISTORY OF INCARCERATION"}
                </Typography>
              </Grid>
              <Grid
                sx={{
                  border: "1px solid #c5c5c5",
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                <Grid>
                  {historyOfIncarcerationIsLoading ? (
                    <Loading />
                  ) : historyOfIncarcerationIsError ? (
                    <Typography>Error occurred while fetching data</Typography>
                  ) : historyOfIncarceration.length === 0 ? (
                    <Typography>No Data Available</Typography>
                  ) : (
                    historyOfIncarceration?.map((item: any, index: number) => {
                      return (
                        <Box
                          key={index}
                          display={"flex"}
                          flexDirection={"column"}
                          rowGap={0.5}
                          mt={1.5}
                        >
                          <Grid container gap={1.2} alignItems={"center"}>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {"Title"}
                            </Typography>
                            <Typography>:</Typography>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {item?.name || "-"}
                            </Typography>
                          </Grid>
                          <Grid container gap={1.2} alignItems={"center"}>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {"Note"}
                            </Typography>
                            <Typography>:</Typography>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {item?.description || "-"}
                            </Typography>
                          </Grid>
                        </Box>
                      );
                    })
                  )}
                </Grid>
              </Grid>
              <Box py={1} />

              <Box py={1} />
              <Grid py={1.5}>
                <Typography sx={subTitles}>
                  {"HIV AIDS AND OTHER STDS EDUCATION"}
                </Typography>
              </Grid>
              <Grid
                sx={{
                  border: "1px solid #c5c5c5",
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                <Grid>
                  {hivAidsAndOtherStdEducationIsLoading ? (
                    <Loading />
                  ) : hivAidsAndOtherStdEducationIsError ? (
                    <Typography>Error occurred while fetching data</Typography>
                  ) : hivAidsAndOtherStdEducation.length === 0 ? (
                    <Typography>No Data Available</Typography>
                  ) : (
                    hivAidsAndOtherStdEducation?.map(
                      (item: any, index: number) => {
                        return (
                          <Box
                            key={index}
                            display={"flex"}
                            flexDirection={"column"}
                            rowGap={0.5}
                            mt={1.5}
                          >
                            <Grid container gap={1.2} alignItems={"center"}>
                              <Typography variant="h5" sx={{ color: "black" }}>
                                {"Title"}
                              </Typography>
                              <Typography>:</Typography>
                              <Typography variant="h5" sx={{ color: "black" }}>
                                {item?.name || "-"}
                              </Typography>
                            </Grid>
                            <Grid container gap={1.2} alignItems={"center"}>
                              <Typography variant="h5" sx={{ color: "black" }}>
                                {"Note"}
                              </Typography>
                              <Typography>:</Typography>
                              <Typography variant="h5" sx={{ color: "black" }}>
                                {item?.description || "-"}
                              </Typography>
                            </Grid>
                          </Box>
                        );
                      }
                    )
                  )}
                </Grid>
              </Grid>
              <Box py={1} />
              <Grid py={1.5}>
                <Typography sx={subTitles}>{"FAMILY PLANNING"}</Typography>
              </Grid>

              <Grid
                sx={{
                  border: "1px solid #c5c5c5",
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                <Grid
                  container
                  justifyContent={"space-between"}
                  alignItems={"center"}
                ></Grid>
                <Grid>
                  {familyPlanningIsLoading ? (
                    <Loading />
                  ) : familyPlanningIsError ? (
                    <Typography>Error occurred while fetching data</Typography>
                  ) : familyPlanning.length === 0 ? (
                    <Typography>No Data Available</Typography>
                  ) : (
                    familyPlanning?.map((item: any, index: number) => {
                      return (
                        <Box
                          key={index}
                          display={"flex"}
                          flexDirection={"column"}
                          rowGap={0.5}
                          mt={1.5}
                        >
                          <Grid container gap={1.2} alignItems={"center"}>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {"Title"}
                            </Typography>
                            <Typography>:</Typography>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {item?.name || "-"}
                            </Typography>
                          </Grid>
                          <Grid container gap={1.2} alignItems={"center"}>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {"Note"}
                            </Typography>
                            <Typography>:</Typography>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {item?.description || "-"}
                            </Typography>
                          </Grid>
                        </Box>
                      );
                    })
                  )}
                </Grid>
              </Grid>
              <Box py={1} />
              <Grid py={1.5}>
                <Typography sx={subTitles}>
                  {"REFERRALS FOR SERVICES"}
                </Typography>
              </Grid>
              <Grid
                sx={{
                  border: "1px solid #c5c5c5",
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                <Grid
                  container
                  justifyContent={"space-between"}
                  alignItems={"center"}
                ></Grid>
                <Grid>
                  {referralsForServicesIsLoading ? (
                    <Loading />
                  ) : referralsForServicesIsError ? (
                    <Typography>Error occurred while fetching data</Typography>
                  ) : referralsForServices.length === 0 ? (
                    <Typography>No Data Available</Typography>
                  ) : (
                    referralsForServices?.map((item: any, index: number) => {
                      return (
                        <Box
                          key={index}
                          display={"flex"}
                          flexDirection={"column"}
                          rowGap={0.5}
                          mt={1.5}
                        >
                          <Grid container gap={1.2} alignItems={"center"}>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {"Title"}
                            </Typography>
                            <Typography>:</Typography>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {item?.name || "-"}
                            </Typography>
                          </Grid>
                          <Grid container gap={1.2} alignItems={"center"}>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {"Note"}
                            </Typography>
                            <Typography>:</Typography>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {item?.description || "-"}
                            </Typography>
                          </Grid>
                        </Box>
                      );
                    })
                  )}
                </Grid>
              </Grid>
              <Box py={1} />
              <Grid py={1.5}>
                <Typography sx={subTitles}>{"OTHERS    "}</Typography>
              </Grid>
              <Grid
                sx={{
                  border: "1px solid #c5c5c5",
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                <Grid
                  container
                  justifyContent={"space-between"}
                  alignItems={"center"}
                ></Grid>
                <Grid>
                  {othersIsLoading ? (
                    <Loading />
                  ) : othersIsError ? (
                    <Typography>Error occurred while fetching data</Typography>
                  ) : others.length === 0 ? (
                    <Typography>No Data Available</Typography>
                  ) : (
                    others?.map((item: any, index: number) => {
                      return (
                        <Box
                          key={index}
                          display={"flex"}
                          flexDirection={"column"}
                          rowGap={0.5}
                          mt={1.5}
                        >
                          <Grid container gap={1.2} alignItems={"center"}>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {"Title"}
                            </Typography>
                            <Typography>:</Typography>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {item?.name || "-"}
                            </Typography>
                          </Grid>
                          <Grid container gap={1.2} alignItems={"center"}>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {"Note"}
                            </Typography>
                            <Typography>:</Typography>
                            <Typography variant="h5" sx={{ color: "black" }}>
                              {item?.description || "-"}
                            </Typography>
                          </Grid>
                        </Box>
                      );
                    })
                  )}
                </Grid>
              </Grid> */}
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PrintGlobalPatientCharting;
