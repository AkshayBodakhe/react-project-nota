import {
  Box,
  Button,
  FormHelperText,
  Grid,
  InputBase,
  Typography,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Label from "../../components/common/label/label";
import AuthLayout from "../../components/core/layout/auth-layout";
import Logo from "../../components/core/logo";
import { adminConstants } from "../../constants/admin";
import {
  buttonStyle,
  buttonTextStyle,
  formGrid,
  logoStyleAuth,
} from "../../styles/auth-form";
import { commonWidget } from "../../styles/common";
import { useNavigate } from "react-router-dom";
import { sxs } from "./login";
const { FIRST_NAME, SIGN_UP ,LAST_NAME , EMAIL ,PASSWORDFIELD,CONFIRM_NEW_PASSWORD} = adminConstants;

const initialValues = {
  firstName: "",
  lastName: "",
  email:"",
  password:"",
  confirmPassword:""
};

function SignUp() {
    const navigate = useNavigate();

  const classes = commonWidget();
  const validationSchema = Yup.object().shape({});
  const handleSignUp = () => {};
  return (
    <AuthLayout
      authPage={
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSignUp}
        >
          {({ values, errors, setFieldValue, touched, handleBlur }) => (
            <Form>
              <Box sx={logoStyleAuth}>
                <Logo source="preAuthLogo" />
              </Box>
              <Box sx={{...formGrid,maxWidth:500}}>
                <Label forgotPwd={true} label="Sign Up" />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <InputBase
                      sx={{ display: "flex" }}
                      name="firstName"
                      type="text"
                      fullWidth
                      placeholder={FIRST_NAME}
                      classes={{
                        root: classes.textFieldRoot,
                        input: classes.textFieldInput,
                        focused: classes.textFieldActive,
                        error: classes.inputBoxError,
                      }}
                      error={!!touched.firstName && !!errors.firstName}
                      value={values.firstName}
                      onBlur={handleBlur}
                      onChange={(e) =>
                        setFieldValue("firstName", e.target.value)
                      }
                    />
                    {touched.firstName && errors.firstName && (
                      <FormHelperText error>{errors.firstName}</FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <InputBase
                      sx={{ display: "flex" }}
                      name="lastName"
                      type="text"
                      fullWidth
                      placeholder={LAST_NAME}
                      classes={{
                        root: classes.textFieldRoot,
                        input: classes.textFieldInput,
                        focused: classes.textFieldActive,
                        error: classes.inputBoxError,
                      }}
                      error={!!touched.lastName && !!errors.lastName}
                      value={values.lastName}
                      onBlur={handleBlur}
                      onChange={(e) =>
                        setFieldValue("lastName", e.target.value)
                      }
                    />
                    {touched.lastName && errors.lastName && (
                      <FormHelperText error>{errors.lastName}</FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <InputBase
                      sx={{ display: "flex" }}
                      name="email"
                      type="text"
                      fullWidth
                      placeholder={EMAIL}
                      classes={{
                        root: classes.textFieldRoot,
                        input: classes.textFieldInput,
                        focused: classes.textFieldActive,
                        error: classes.inputBoxError,
                      }}
                      error={!!touched.email && !!errors.email}
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={(e) =>
                        setFieldValue("email", e.target.value)
                      }
                    />
                    {touched.email && errors.email && (
                      <FormHelperText error>{errors.email}</FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <InputBase
                      sx={{ display: "flex" }}
                      name="password"
                      type="text"
                      fullWidth
                      placeholder={PASSWORDFIELD}
                      classes={{
                        root: classes.textFieldRoot,
                        input: classes.textFieldInput,
                        focused: classes.textFieldActive,
                        error: classes.inputBoxError,
                      }}
                      error={!!touched.password && !!errors.password}
                      value={values.password}
                      onBlur={handleBlur}
                      onChange={(e) =>
                        setFieldValue("password", e.target.value)
                      }
                    />
                    {touched.password && errors.password && (
                      <FormHelperText error>{errors.password}</FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <InputBase
                      sx={{ display: "flex" }}
                      name="confirmPassword"
                      type="text"
                      fullWidth
                      placeholder={CONFIRM_NEW_PASSWORD}
                      classes={{
                        root: classes.textFieldRoot,
                        input: classes.textFieldInput,
                        focused: classes.textFieldActive,
                        error: classes.inputBoxError,
                      }}
                      error={!!touched.confirmPassword && !!errors.confirmPassword}
                      value={values.confirmPassword}
                      onBlur={handleBlur}
                      onChange={(e) =>
                        setFieldValue("confirmPassword", e.target.value)
                      }
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                      <FormHelperText error>{errors.confirmPassword}</FormHelperText>
                    )}
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  fullWidth
                  sx={buttonStyle}
                  type="submit"
                >
                  <Typography sx={buttonTextStyle}>{SIGN_UP}</Typography>
                </Button>
              </Box>
              <Box sx={sxs.signUpText}>
                Already have an account ? &nbsp;
                <Typography
                  sx={{ fontWeight: 600, cursor: 'pointer' }}
                  component="span"
                  variant="body1"
                  color="primary"
                  onClick={() => navigate("/auth/login")}
                  >
                  Sign In
                </Typography>
              </Box>
            </Form>
          )}
        </Formik>
      }
    />
  );
}

export default SignUp;
