import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Box,
  Button,
  FormHelperText,
  InputBase,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Label from "../../components/common/label/label";
import AuthLayout from "../../components/core/layout/auth-layout";
import Logo from "../../components/core/logo";
import { adminConstants } from "../../constants/admin";
import { useUserControllerServiceSendEmailForForgotPassword1 } from "../../sdk/thinkemr-core-0.0.1/queries";
import {
  backIcon,
  backToText,
  backtologinStyle,
  buttonStyle,
  buttonTextStyle,
  formGrid,
  logoStyleAuth,
  textFieldGrid,
} from "../../styles/auth-form";
import { commonWidget } from "../../styles/common";
import { useEffect, useState } from "react";
// import { setAlert } from "../../redux/actions/snackbar/alert.action";
import { useDispatch } from "react-redux";
import { alertAction } from "../../store/features/common-actions/snackbar/alertSlice";

interface value {
  email: string;
}

interface payload {
  email: string;
  subdomain?:  string ;
};


function ForgotPasswordPage() {
  const classes = commonWidget();
  const {
    EMAIL,
    FORGOT_PASSWORD,
    BACK_TO_SIGNIN,
    EMAIL_REQUIRED,
    INVALID_EMAIL,
    SEND_OTP
  } = adminConstants;
  // const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email,setEmail] = useState("");

  const navigateToLogin = () => {
    navigate("/auth/login");
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email(INVALID_EMAIL).required(EMAIL_REQUIRED),
  });

  const { mutateAsync , isSuccess} =
    useUserControllerServiceSendEmailForForgotPassword1();

  useEffect(()=>{
    if(isSuccess){
      navigate(`/auth/enter-otp/${email}`);
    }
  },[isSuccess]);

  const handleSendVerification = (values: value) => {
    const requestBody: payload = {
      email: values.email,
      // subdomain: '',
    };
    setEmail(values.email);
    try {
      mutateAsync({ requestBody: requestBody }).then((res: any) => {
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
    } catch (error:any) {
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
        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSendVerification}
        >
          {({ values, errors, setFieldValue ,touched ,handleBlur}) => (
            <Form>
              <Box sx={logoStyleAuth}>
                <Logo source="preAuthLogo" />
              </Box>
              <Box sx={formGrid}>
                <Label forgotPwd={true} label={FORGOT_PASSWORD} />
                <Box sx={textFieldGrid}>
                  <InputBase
                    fullWidth
                    name="email"
                    placeholder={EMAIL}
                    classes={{
                      root: classes.textFieldRoot,
                      input: classes.textFieldInput,
                      focused: classes.textFieldActive,
                      error: classes.inputBoxError,
                    }}
                    error={
                      !!touched.email && !!errors.email
                    }
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={(e) => setFieldValue("email", e.target.value)}
                  />
                </Box>
                {touched.email && errors.email && (
                  <FormHelperText error>{errors.email}</FormHelperText>
                )}
                {/* {errorMessage && (
                  <FormHelperText className={classes.pageError}>
                    {errorMessage}
                  </FormHelperText>
                )} */}
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    ...buttonStyle,
                    marginTop:"20px !important",
                    "&:hover": { backgroundColor: "#1B5984" },
                  }}
                  type="submit"
                >
                  <Typography sx={buttonTextStyle}>
                    {SEND_OTP}
                  </Typography>
                </Button>
                <Box sx={backtologinStyle}>
                  <ArrowBackIosIcon sx={backIcon} />
                  <Typography onClick={navigateToLogin} sx={backToText}>
                    {BACK_TO_SIGNIN}
                  </Typography>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      }
    />
  );
}

export default ForgotPasswordPage;
