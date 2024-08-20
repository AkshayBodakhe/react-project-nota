/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import AuthLayout from "../../components/core/layout/auth-layout";

import { Box, Button, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import OTPInput from "react-otp-input";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../../components/core/logo";
import { adminConstants } from "../../constants/admin";
import {
  buttonStyle,
  buttonTextStyle,
  formGrid,
  logoStyleAuth,
} from "../../styles/auth-form";
import {
  useUserControllerServiceSendEmailForForgotPassword1,
  useUserControllerServiceVerifyOtpForForgotPassword,
} from "../../sdk/thinkemr-core-0.0.1/queries";
// import { setAlert } from "../../redux/actions/snackbar/alert.action";
import { useDispatch } from "react-redux";
import { alertAction } from "../../store/features/common-actions/snackbar/alertSlice";

export const style = makeStyles(() => ({
  title: {
    color: "#1B5984",
    fontWeight: "bold !important",
  },
  subTittle: {
    color: "#4C4C4C",
    padding: "20px 0px !important",
    fontWeight: "bold !important",
  },
  resendOTP: {
    background: "#FFFFFF 0% 0% no-repeat padding-box !important",
    boxShadow: "0px 0px 8px #00000029 !important",
    borderRadius: "5px !important",
    opacity: 1,
    color: "#4C4C4C !important",
    marginTop: "30px !important",
    height: "40px !important",
  },
  resetResendBtn: {
    backgroundColor: "#1B5984 !important",
    fontWeight: "bold",
    fontSize: "15px",
    color: "white !important",
    height: "40px !important",
    marginTop: "30px !important",
  },
}));
interface payload {
  email: string;
  subdomain?: string;
}

function EnterOTP() {
  //   const [showPassword, setShowPassword] = useState(false);
  const { NEXT, RESEND_OTP } = adminConstants;
  const UIStyle = style();
  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(60);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email } = useParams();

  const { mutateAsync, isSuccess } =
    useUserControllerServiceVerifyOtpForForgotPassword();

  const { mutateAsync: getOTP } =
    useUserControllerServiceSendEmailForForgotPassword1();

  useEffect(() => {}, [isSuccess]);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else {
        clearInterval(countdownInterval);
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [seconds]);

  const formatTime = (timeInSeconds: any) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const remainingSeconds = timeInSeconds % 60;
    return `${minutes}:${
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
    }`;
  };

  const resendOTP = async (e: any) => {
    e.preventDefault();
    setSeconds(60);
    if (seconds == 0) {
      const requestBody: payload = {
        email: email || "",
        // subdomain: '',
      };
      try {
        getOTP({ requestBody: requestBody })
          .then((res: any) => {
            dispatch(
              alertAction.setAlert({
                open: true,
                message: res.message,
                severity: "success",
              })
            );
          })
          .catch((error) => {
            dispatch(
              alertAction.setAlert({
                open: true,
                message: error.body.message,
                severity: "error",
              })
            );
          });
      } catch (error: any) {
        dispatch(
          alertAction.setAlert({
            open: true,
            message: error.body.message,
            severity: "error",
          })
        );
      }
    }
  };

  const next = async (e: any) => {
    e.preventDefault();
    let requestBody = {
      email: email || "",
      otp: otp,
    };
    try {
      await mutateAsync(requestBody)
        .then((res: any) => {          
          dispatch(
            alertAction.setAlert({
              open: true,
              message: !res.data ? "Incorrect OTP" : "OTP Matched",
              severity: !res.data ? "error" : "success",
            })
          );
          if (res.data) navigate(`/auth/reset-password/${email}?resetByOtp`);
        })
        .catch((error) => {
          dispatch(
            alertAction.setAlert({
              open: true,
              message: error.body.message,
              severity: "error",
            })
          );
        });
    } catch (error: any) {
      dispatch(
        alertAction.setAlert({
          open: true,
          message: error.body.message,
          severity: "error",
        })
      );
    }
  };

  return (
    <AuthLayout
      authPage={
        <form>
          <Box sx={logoStyleAuth}>
            <Logo source="preAuthLogo" />
          </Box>
          <Box sx={formGrid}>
            <Typography variant="h4" className={UIStyle.title}>
              Enter OTP
            </Typography>
            <Typography variant="h5" className={UIStyle.subTittle}>
              We have send OTP to your email id
            </Typography>
            <Grid item xs={12}>
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={
                  <span
                    style={{
                      fontSize: "7px",
                      marginLeft: "25px",
                      marginRight: "25px",
                    }}
                  >
                    {" "}
                  </span>
                }
                renderInput={(props: any) => <input {...props} />}
                inputStyle={{
                  width: "40px",
                  marginBottom: "10px",
                  height: "40px",
                  display: "flex",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0px 0px 8px #00000029",
                  borderRadius: "5px",
                  border: "none",
                  // outline: "none",
                }}
              />
            </Grid>
            <Button
              variant="contained"
              fullWidth
              sx={{ ...buttonStyle, padding: "0px !important", height: "40px" }}
              type="submit"
              onClick={next}
            >
              <Typography sx={buttonTextStyle}>{NEXT}</Typography>
            </Button>
            <Grid item>
              <Button
                variant="contained"
                fullWidth
                className={
                  seconds == 0 ? UIStyle.resetResendBtn : UIStyle.resendOTP
                }
                type="submit"
                onClick={resendOTP}
              >
                <Typography
                  sx={
                    seconds === 0
                      ? { ...buttonTextStyle, textTransform: "none !important" }
                      : { color: "#4C4C4C",fontWeight:"bold", textTransform: "none !important" }
                  }
                >
                  {RESEND_OTP}
                </Typography>
              </Button>
            </Grid>
            {seconds != 0 && (
              <Grid
                item
                sx={{ display: "flex", justifyContent: "center" }}
                mt={2}
              >
                <Typography
                  variant="h5"
                  sx={{ color: "#4C4C4C !important", fontWeight: "bold" }}
                >
                  Resend OTP in{" "}
                  <span style={{ color: "#1B5984" }}>
                    {formatTime(seconds)}
                  </span>
                </Typography>
              </Grid>
            )}
            {/* {seconds == 0 && <Grid
              item
              sx={{ display: "flex", justifyContent: "center" }}
              mt={2}
            >
              <Typography
                variant="h5"
                sx={{ color: "#1B5984 !important", fontWeight: "bold" ,textDecoration:"underline"}}
              >
                Resend OTP
              </Typography>
            </Grid>} */}
          </Box>
        </form>
      }
    />
  );
}

export default EnterOTP;
