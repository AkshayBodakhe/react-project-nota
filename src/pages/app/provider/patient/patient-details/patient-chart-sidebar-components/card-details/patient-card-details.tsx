import {
  Button,
  ButtonBase,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  InputBase,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import theme from "../../../../../../../theme";
import {
  commonWidget,
  formButtonStyle,
  formTitle,
} from "../../../../../../../styles/common";
import { usePatientControllerServiceAddCard } from "../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import CloseIcon from "@mui/icons-material/Close";
import { alertAction } from "../../../../../../../store/features/common-actions/snackbar/alertSlice";
import { useDispatch } from "react-redux";
import { ErrorResponseEntity } from "../../../../../../../components/common/enums-and-interfaces/interfaces";
import providerGroupService from "../../../../../../../service/provider-group--service";

interface CardDetailProps {
  patientData?: any;
  open: boolean;
  handleClose?: any;
  patientUuid?: any;
  token?: any;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cardHolderName: string;
}

const PatientCardDetails = (props: CardDetailProps) => {
  // const staxJs = (window as any).staxJs;
  const [staxJs, setStaxJs] = useState((window as any).staxJs);

  const classes = commonWidget();
  const [, setSuccess] = useState(false);
  const { patientData, open, handleClose, patientUuid, token } = props;
  const dispatch = useDispatch();
  const [cardResult, setCardResult] = useState<any>();
  const { mutateAsync, isPending, isSuccess, isError, error } =
    usePatientControllerServiceAddCard();
  const [modifiedToken, setModifiedToken] = useState<any>();

  useEffect(() => {
    const checkStaxJs = () => {
      if ((staxJs && (window as any).staxJs) || staxJs === undefined) {
        setStaxJs((window as any).staxJs);
      }
    };

    checkStaxJs();
    const intervalId = setInterval(checkStaxJs, 3000);

    return () => clearInterval(intervalId);
  }, [staxJs]);

  // console.log(
  //   "modified========>",
  //   patientUuid + "-------------------",
  //   modifiedToken
  // );

  useEffect(() => {
    let modifyToken = token?.replace(/\*/g, ".");
    setModifiedToken(modifyToken);
  }, [token]);

  useEffect(() => {
    if (isError) {
      dispatch(
        alertAction.setAlert({
          open: true,
          message: (error as ErrorResponseEntity).body.message,
          severity: "error",
        })
      );
    }
  }, [isError]);

  // const isStaxRef = useRef<boolean>(false);

  // useEffect(() => {
  //   if (!isStaxRef.current) {
  //     saveTokenizedCard();
  //     isStaxRef.current = true;
  //   }
  // }, [cardResult]);

  useEffect(() => {
    saveTokenizedCard();
  }, [cardResult]);

  const saveTokenizedCard = async () => {
    if (cardResult?.id && cardResult?.customer?.id) {
      const cardExpFormatted = `${cardResult.card_exp.slice(
        0,
        2
      )}/${cardResult.card_exp.slice(2)}`;
      // await mutateAsync({
      //   requestBody: {
      //     cardId: cardResult.id,
      //     customerId: cardResult.customer.id,
      //     vendor: "STAX",
      //     cardType: cardResult.card_type,
      //     cardExp: cardExpFormatted,
      //     lastFour: cardResult.card_last_four,
      //     cardMode: cardResult.bin_type,
      //     cardHolderFirstName: formData.firstName,
      //     cardHolderLastName: formData.lastName,
      //   },

      //   patientUuid: patientData?.uuid || patientUuid,
      // }).then((res: any) => {
      //   if (res) {
      //     dispatch(
      //       alertAction.setAlert({
      //         open: true,
      //         message: res.message as any,
      //         severity: "success",
      //       })
      //     );
      //   }
      //   handleClose();
      // });

      const requestBody = {
        cardId: cardResult.id,
        customerId: cardResult.customer.id,
        vendor: "STAX",
        cardType: cardResult.card_type,
        cardExp: cardExpFormatted,
        lastFour: cardResult.card_last_four,
        cardMode: cardResult.bin_type,
        cardHolderFirstName: formData.firstName,
        cardHolderLastName: formData.lastName,
      };

      try {
        // patientUuid ? sessionStorage.setItem("accessToken", modifiedToken) : "";
        providerGroupService
          .makePayment(
            requestBody,
            patientUuid ? patientUuid : patientData?.uuid
          )
          .then((res: any) => {
            // patientUuid ? sessionStorage.removeItem("accessToken") : "";
            if (res) {
              dispatch(
                alertAction.setAlert({
                  open: true,
                  message: res.data?.message as any,
                  severity: "success",
                })
              );
            }
            setFormData({
              firstName: "",
              lastName: "",
              email: patientData?.email || "",
              phone: patientData?.phoneNumber || "",
              cardNumber: "",
              expiryMonth: "",
              expiryYear: "",
              cardHolderName: "",
            });
            handleClose("calledSuccess");
          })
          .catch((_err: any) => {});
      } catch (_error) {}
    }
  };

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: patientData?.email || "",
    phone: patientData?.phoneNumber || "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cardHolderName: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const successElement = document.querySelector(".success") as HTMLElement;
    const errorElement = document.querySelector(".error") as HTMLElement;
    // const loaderElement = document.querySelector(".loader") as HTMLElement;
    successElement.classList.remove("visible");
    errorElement.classList.remove("visible");
    // loaderElement.classList.add("visible");
    const extraDetails = {
      first_name: formData?.firstName,
      last_name: formData?.lastName,
      company: "",
      email: patientData?.email || "",
      month: formData.expiryMonth || "0",
      year: formData.expiryYear || "0",
      phone: patientData?.phoneNumber || "-",
      address_1: patientData?.address?.line1 || "00 S Orange Ave",
      address_2: patientData?.address?.line2 || "-",
      address_city: "Orlando" || "",
      address_state: patientData?.address?.state || "FL",
      address_zip: patientData?.address?.zipcode || "32811",
      address_country: patientData?.address?.country || "USA",
      url: "https://app.staxpayments.com/#/bill/",
      method: "card",
      validate: false,
      // total: "1",
      cardNumber: "",
    };

    staxJs
      ?.tokenize(extraDetails)
      .then((result: any) => {
        setCardResult(result);
        if (result.id) {
          (successElement.querySelector(".token") as HTMLElement).textContent =
            result.payment_method_id;
          successElement.classList.add("visible");
          // loaderElement.classList.remove("visible");
          setSuccess(true);
        }

        staxJs
          .showCardForm()
          .then((handler: any) => {
            handler.setTestPan("");
            handler.setTestCvv("");
          })
          .catch((error: any) => {
            console.error("error init form err " + error);
          })
          .finally((isSetup.current = true));
      })
      .catch((err: any) => {
        // setCalledApi(false);
        // if (err.payment_attempt_message) {
        //   const errorMessage = err.payment_attempt_message;
        // dispatch(
        //   setSnackbarOn({
        //     severity: AlertSeverity.ERROR,
        //     message: errorMessage || "Error occurred!"
        //   })
        // );
        if (err) {
          dispatch(
            alertAction.setAlert({
              open: true,
              message: err.message,
              severity: "error",
            })
          );
        }
        // } else {
        //   const errorMessage2 =
        //     typeof err === "object"
        //       ? err.message ||
        //         Object.keys(err)
        //           .map((k) => err[k].join(" "))
        //           .join(" ")
        //       : JSON.stringify(err);
        //   dispatch(
        // setSnackbarOn({
        //   severity: AlertSeverity.ERROR,/\./g
        //   message: errorMessage2 || "Error occurred!"
        // })
        //   );
        // }

        errorElement.classList.add("visible");
        // loaderElement.classList.remove("visible");
      });
  };

  const isSetup = useRef(false);

  useEffect(() => {
    const staxJs = (window as any).staxJs;
    if (!staxJs) {
      return;
    }
    if (!isSetup.current) {
      staxJs
        .showCardForm()
        .then((handler: any) => {
          handler.setTestPan("");
          handler.setTestCvv("");
        })
        .catch((error: any) => {
          console.error("error init form err " + error);
        })
        .finally((isSetup.current = true));
    }
  }, [staxJs]);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="lg"
      >
        <DialogTitle id="scroll-dialog-title" sx={formTitle}>
          <Grid container alignItems={"center"}>
            <Grid
              item
              xs={11}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {"Add New Card Details"}
            </Grid>
            <Grid
              item
              xs={1}
              sx={{
                display: "flex",
                justifyContent: "end",
                "@media (min-width: 300px) and (max-width: 900px)": {
                  display: "none",
                },
              }}
            >
              <ButtonBase onClick={handleClose}>
                <CloseIcon />
              </ButtonBase>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <form>
            <Grid container justifyContent={"center"} textAlign={"center"}>
              <Grid xs={12}>
                {/* <Typography fontSize={"180%"} fontWeight={500} pb={3}>
              {"Add your preferred payment method."}
            </Typography> */}
              </Grid>
              <Grid p={3}>
                {/* {Row 1 } */}
                <Grid
                  container
                  flexDirection={"row"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  pt={"10px"}
                >
                  <Grid xs={12} sm={4}>
                    <Typography textAlign={"start"} variant="body1">
                      {"Card Number"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Grid container id="card-element" className="field">
                      <Grid
                        item
                        xs={12}
                        id="card-number"
                        style={{
                          height: "40px",
                          border: `1px solid ${theme.palette.grey[400]}`,
                          display: "inline-block",
                          margin: "5px",
                        }}
                      ></Grid>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Row 2 */}

                <Grid
                  container
                  flexDirection={"row"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  pt={"10px"}
                >
                  <Grid xs={12} sm={4}>
                    <Typography textAlign={"start"} variant="body1">
                      {"CVV"}
                    </Typography>
                  </Grid>
                  <Grid xs={12} sm={6}>
                    <Grid container id="card-element" className="field">
                      <Grid
                        xs={12}
                        id="card-cvv"
                        style={{
                          height: "40px",
                          display: "inline-block",
                          margin: "5px",
                        }}
                      ></Grid>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Row 3 */}
                <Grid
                  container
                  flexDirection={"row"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  pt={"10px"}
                >
                  <Grid
                    xs={12}
                    sm={4}
                    sx={{
                      "@media (min-width: 300px) and (max-width: 600px)": {
                        marginBottom: "8px",
                      },
                    }}
                  >
                    <Typography textAlign={"start"} variant="body1">
                      {"Month Year"}
                    </Typography>
                  </Grid>
                  <Grid xs={12} sm={6}>
                    <Grid container columnGap={2}>
                      <Grid xs={5.5}>
                        <InputBase
                          name={"expiryMonth"}
                          fullWidth
                          placeholder={"MM"}
                          value={formData.expiryMonth}
                          onChange={handleInputChange}
                          classes={{
                            root: classes.providerTextInput,
                            input: classes.textFieldInput,
                            error: classes.inputBoxError,
                          }}
                          sx={{ width: "100% !important" }}
                        />
                      </Grid>
                      <Grid xs={5.5}>
                        <InputBase
                          fullWidth
                          name="expiryYear"
                          placeholder={"YYYY"}
                          value={formData.expiryYear}
                          onChange={handleInputChange}
                          classes={{
                            root: classes.providerTextInput,
                            input: classes.textFieldInput,
                            error: classes.inputBoxError,
                          }}
                          sx={{ width: "100% !important" }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <div className="outcome">
                    <div className="error"></div>
                    <div className="success">
                      <span className="token"></span>
                    </div>
                    {/* <div className="loader" style={{ margin: "auto" }}></div> */}
                  </div>
                  {/* <div className="loader" style={{ margin: "auto" }}></div> */}
                </Grid>
                {/* Row 4 */}
                <Grid
                  container
                  flexDirection={"row"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  pt={"22px"}
                >
                  <Grid
                    xs={12}
                    sm={4}
                    sx={{
                      "@media (min-width: 300px) and (max-width: 600px)": {
                        marginBottom: "8px",
                      },
                    }}
                  >
                    <Typography textAlign={"start"} variant="body1">
                      {"Card Holder Name"}
                    </Typography>
                  </Grid>
                  <Grid xs={12} sm={6}>
                    <Grid container columnGap={2}>
                      <Grid xs={5.5}>
                        <InputBase
                          name={"firstName"}
                          fullWidth
                          placeholder={"First Name"}
                          value={formData.firstName}
                          onChange={handleInputChange}
                          classes={{
                            root: classes.providerTextInput,
                            input: classes.textFieldInput,
                            error: classes.inputBoxError,
                          }}
                          sx={{ width: "100% !important" }}
                        />
                      </Grid>
                      <Grid xs={5.5}>
                        <InputBase
                          fullWidth
                          name="lastName"
                          placeholder={"Last Name"}
                          value={formData.lastName}
                          onChange={handleInputChange}
                          classes={{
                            root: classes.providerTextInput,
                            input: classes.textFieldInput,
                            error: classes.inputBoxError,
                          }}
                          sx={{ width: "100% !important" }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* <div className="outcome">
                <div className="error"></div>
                <div className="success">
                  <span className="token"></span>
                </div>
                <div className="loader" style={{ margin: "auto" }}></div>
              </div>
              <div className="loader" style={{ margin: "auto" }}></div> */}
                </Grid>
              </Grid>
            </Grid>
            <Grid
              p={"1rem 0rem  0.5rem 0rem"}
              container
              justifyContent={"end"}
              columnGap={2}
              // xs={12}
              sx={{
                "@media (min-width:300px) and (max-width: 600px)": {
                  display: "flex",
                  justifyContent: "center",
                  // gap: "10px",
                },
              }}
            >
              <ButtonBase
                sx={{
                  ...formButtonStyle.cancelButtonStyle,
                  "@media (min-width: 300px) and (max-width: 900px)": {
                    display: "none",
                  },
                }}
                onClick={handleClose}
              >
                <Typography variant="h6">{"Cancel"}</Typography>
              </ButtonBase>
              <ButtonBase
                sx={{
                  ...formButtonStyle.saveButtonStyle,
                  "@media (min-width: 300px) and (max-width: 600px)": {
                    // marginRight: "15px",
                    width: "90%",
                  },
                }}
                id="tokenizebutton"
                onClick={(e: any) => handleSubmit(e)}
              >
                <Typography variant="h6">{"Add"}</Typography>
              </ButtonBase>
            </Grid>
            {/* </Grid> */}
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PatientCardDetails;
