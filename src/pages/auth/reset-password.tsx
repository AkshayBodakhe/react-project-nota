/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import AuthLayout from "../../components/core/layout/auth-layout";
import {
  Box,
  Button,
  FormHelperText,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import {
  buttonStyle,
  formGrid,
  iconStyle,
  passwordFieldIcon,
  buttonTextStyle,
  logoStyleAuth,
} from "../../styles/auth-form";
import Label from "../../components/common/label/label";
import { commonWidget } from "../../styles/common";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { adminConstants } from "../../constants/admin";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Logo from "../../components/core/logo";
import {
  useUserControllerServiceResetPassword,
  useUserControllerServiceSetPassword,
} from "../../sdk/thinkemr-core-0.0.1/queries";
import { useDispatch } from "react-redux";
import { alertAction } from "../../store/features/common-actions/snackbar/alertSlice";

function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    UPDATE_PASSWORD,
    CONFIRM_NEW_PASSWORD,
    ENTER_PASSWORD,
    NEW_PASSWORD_REQUIRED,
    PASSWORD_LENGTH,
    CONFIRM_NEW_PASSWORD_REQUIRED,
    PASSWORD_MUST_MATCH,
  } = adminConstants;
  const classes = commonWidget();
  const [errorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email } = useParams();
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);

  const hasResetByOtp = urlSearchParams.has("resetByOtp");
  const [isReset, setIsReset] = useState(false);
  const validationSchema = Yup.object().shape({
    newpassword: Yup.string()
      .required(NEW_PASSWORD_REQUIRED)
      .min(8, PASSWORD_LENGTH),
    confirmpassword: Yup.string()
      .required(CONFIRM_NEW_PASSWORD_REQUIRED)
      .oneOf([Yup.ref("newpassword")], PASSWORD_MUST_MATCH),
  });

  const { mutateAsync } = useUserControllerServiceResetPassword();
  const { mutateAsync: setLink } = useUserControllerServiceSetPassword();

  useEffect(() => {
    if (hasResetByOtp) setIsReset(hasResetByOtp);
  }, [hasResetByOtp]);

  const handleUpdatePassword = (values: any) => {
    const requestBody = {
      email: email || "",
      newPassword: values.newpassword,
    };
    if (isReset) {
      try {
        mutateAsync({ requestBody: requestBody })
          .then((res: any) => {
            dispatch(
              alertAction.setAlert({
                open: true,
                message: res.message,
                severity: "success",
              })
            );
            navigate("/admin/provider-groups");
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
    } else {
      try {
        setLink({ requestBody: requestBody })
          .then((res: any) => {
            dispatch(
              alertAction.setAlert({
                open: true,
                message: res.message,
                severity: "success",
              })
            );
            navigate("/admin/provider-groups");
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
  return (
    <AuthLayout
      authPage={
        <Formik
          initialValues={{ newpassword: "", confirmpassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleUpdatePassword}
        >
          {({ values, errors, setFieldValue, touched, handleBlur }) => (
            <Form>
              <Box sx={logoStyleAuth}>
                <Logo source="preAuthLogo" />
              </Box>
              <Box sx={formGrid}>
                {isReset ? (
                  <Label forgotPwd={true} label="Reset Password" />
                ) : (
                  <Label forgotPwd={true} label="Set Password" />
                )}
                <Box>
                  <InputBase
                    sx={{ display: "flex" }}
                    name="newpassword"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    placeholder={ENTER_PASSWORD}
                    classes={{
                      root: classes.textFieldRoot,
                      input: classes.textFieldInput,
                      focused: classes.textFieldActive,
                      error: classes.inputBoxError,
                    }}
                    error={!!touched.newpassword && !!errors.newpassword}
                    value={values.newpassword}
                    onBlur={handleBlur}
                    onChange={(e) =>
                      setFieldValue("newpassword", e.target.value)
                    }
                    endAdornment={
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={passwordFieldIcon}
                      >
                        {showPassword ? (
                          <Visibility sx={iconStyle} />
                        ) : (
                          <VisibilityOff sx={iconStyle} />
                        )}
                      </IconButton>
                    }
                  />
                </Box>
                {touched.newpassword && errors.newpassword && (
                  <FormHelperText error>{errors.newpassword}</FormHelperText>
                )}
                <Box>
                  <InputBase
                    sx={{ marginTop: "18px", display: "flex" }}
                    name="confirmpassword"
                    type={showConfirmPassword ? "text" : "password"}
                    fullWidth
                    placeholder={CONFIRM_NEW_PASSWORD}
                    classes={{
                      root: classes.textFieldRoot,
                      input: classes.textFieldInput,
                      focused: classes.textFieldActive,
                      error: classes.inputBoxError,
                    }}
                    error={
                      !!touched.confirmpassword && !!errors.confirmpassword
                    }
                    value={values.confirmpassword}
                    onBlur={handleBlur}
                    onChange={(e) =>
                      setFieldValue("confirmpassword", e.target.value)
                    }
                    endAdornment={
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                        sx={passwordFieldIcon}
                      >
                        {showConfirmPassword ? (
                          <Visibility sx={iconStyle} />
                        ) : (
                          <VisibilityOff sx={iconStyle} />
                        )}
                      </IconButton>
                    }
                  />
                </Box>
                {touched.confirmpassword && errors.confirmpassword && (
                  <FormHelperText error>
                    {errors.confirmpassword}
                  </FormHelperText>
                )}
                {errorMessage && (
                  <FormHelperText className={classes.pageError}>
                    {errorMessage}
                  </FormHelperText>
                )}
                <Button
                  variant="contained"
                  fullWidth
                  sx={buttonStyle}
                  type="submit"
                >
                  <Typography sx={buttonTextStyle}>
                    {UPDATE_PASSWORD}
                  </Typography>
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      }
    />
  );
}

export default ResetPasswordPage;
