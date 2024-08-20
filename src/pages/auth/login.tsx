/* eslint-disable @typescript-eslint/no-explicit-any */
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormHelperText,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Label from "../../components/common/label/label";
import AuthLayout from "../../components/core/layout/auth-layout";
import { adminConstants } from "../../constants/admin";
import { useUserControllerServiceGetAccessToken } from "../../sdk/thinkemr-core-0.0.1/queries";
import {
  AuthRequest,
  UserControllerService,
} from "../../sdk/thinkemr-core-0.0.1/requests";
import {
  buttonStyle,
  buttonTextStyle,
  clickableText,
  formGrid,
  iconStyle,
  // logoStyleAuth,
  passwordFieldIcon,
  textFieldGrid,
} from "../../styles/auth-form";
import { commonWidget, flexEnd } from "../../styles/common";
import {
  Permission,
  Roles,
} from "../../components/common/enums-and-interfaces/enums";
import { ErrorResponseEntity } from "../../components/common/enums-and-interfaces/interfaces";
import { alertAction } from "../../store/features/common-actions/snackbar/alertSlice";
import { useAppDispatch } from "../../store/hooks";
import { setTokenData } from "../../store/features/common-actions/login/tokenSlice";
import { setDetailData } from "../../store/features/common-actions/user-detail/userDetailSlice";
const { portalName } = AuthRequest;
interface payload {
  username: string;
  password: string;
  portalName: any;
}

interface value {
  email: string;
  password: string;
}

export const sxs = {
  signUpText: {
    display: "flex",
    justifyContent: "center",
    mt: 2,
    fontWeight: 600,
    color: "#4C4C4C",
    fontSize: "16px",
  },
};

const LoginPage = () => {
  const navigate = useNavigate();
  const classes = commonWidget();
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const {
    LOGIN_TITLE,
    SIGN_IN,
    SIGN_IN_YOU,
    EMAIL,
    PASSWORD,
    FORGOT_PASSWORD,
    EMAIL_REQUIRED,
    PASSWORD_REQUIRED,
    // ENTER_VALID_CREDS,
  } = adminConstants;
  // const [errorMessage, setErrorMessage] = useState("");
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid E-mail").required(EMAIL_REQUIRED),
    password: Yup.string().required(PASSWORD_REQUIRED),
  });

  const { mutateAsync, isSuccess, data, error, isError } =
    useUserControllerServiceGetAccessToken();

  const getLoginnedUserDetails = async () => {
    try {
      const data = await UserControllerService.getUsersProfileDetails();
      dispatch(setDetailData(data?.data));
      sessionStorage.setItem("loginUser", JSON.stringify(data?.data));

      const permissions = data?.data?.permissions || [];
      const roleType = data?.data?.roleType;

      const permissionsDict = new Set(permissions.map((p: any) => p.permissionKey));

      const roleNavigationHandlers: Record<string, () => void> = {
        [Roles.SUPER_ADMIN]: () => {
          if (permissionsDict.has(Permission.DASHBOARD)) {
            navigate(`/admin/dashboard`);
          } else if (permissionsDict.has(Permission.PROVIDER_GROUP)) {
            navigate(`/admin/provider-groups`);
          } else if (permissionsDict.has(Permission.MASTERS)) {
            navigate(`/admin/master`);
          } else {
            navigate(`/admin/settings/profile`);
          }
        },
        [Roles.ADMIN]: () => {
          if (permissionsDict.has(Permission.DASHBOARD)) {
            navigate(`/admin/dashboard`);
          } else if (permissionsDict.has(Permission.PROVIDER_GROUP)) {
            navigate(`/admin/provider-groups`);
          } else if (permissionsDict.has(Permission.MASTERS)) {
            navigate(`/admin/master`);
          } else {
            navigate(`/admin/settings/profile`);
          }
        },
        [Roles.PROVIDER]: () => {
          if (permissionsDict.has(Permission.DASHBOARD)) {
            navigate(`/provider/home`);
          } else if (permissionsDict.has(Permission.APPOINTMENT)) {
            navigate(`/provider/appointment/calendar`);
          } else if (permissionsDict.has(Permission.PATIENT)) {
            navigate(`/provider/patients`);
          } else if (permissionsDict.has(Permission.TASK)) {
            navigate(`/provider/communications/tasks`);
          } else if (permissionsDict.has(Permission.UNSIGNED_VISIT)) {
            navigate(`/provider/unsigned-visit`);
          } else if (permissionsDict.has(Permission.CLINICAL_REPORT)) {
            navigate(`/provider/reports`);
          } else {
            navigate(`/provider/settings`);
          }
        },
        Default: () => {
          if (permissionsDict.has(Permission.DASHBOARD)) {
            navigate(`/provider/home`);
          } else if (permissionsDict.has(Permission.APPOINTMENT)) {
            navigate(`/provider/appointment/calendar`);
          } else if (permissionsDict.has(Permission.PATIENT)) {
            navigate(`/provider/patients`);
          } else if (permissionsDict.has(Permission.TASK)) {
            navigate(`/provider/communications/tasks`);
          } else if (permissionsDict.has(Permission.UNSIGNED_VISIT)) {
            navigate(`/provider/unsigned-visit`);
          } else if (permissionsDict.has(Permission.CLINICAL_REPORT)) {
            navigate(`/provider/reports`);
          } else {
            navigate(`/provider/settings`);
          }
        },
      };
      const navigateHandler =roleNavigationHandlers[roleType] || roleNavigationHandlers["Default"] || (() => navigate(`/provider/settings`));
      navigateHandler();
    } catch (error) {
      console.error("Failed to get user details", error);
      dispatch(
        alertAction.setAlert({
          open: true,
          message: "Failed to retrieve user details.",
          severity: "error",
        })
      );
    }
  };

  useEffect(() => {
    if (isSuccess && !!data) {
      const token = data?.data?.accessToken;
      const [, payload] = token.split(".");
      const decodedPayload = JSON.parse(atob(payload));
      dispatch(setTokenData(decodedPayload));
      sessionStorage.setItem("accessToken", data?.data?.accessToken);
      sessionStorage.setItem("refreshToken", data?.data?.refreshToken);
      getLoginnedUserDetails();
      const userRoles: any[] = decodedPayload?.realm_access?.roles || [];
      const roles: any[] = Object.values(Roles).filter(
        (role) =>
          userRoles.includes(role) || role === decodedPayload.category || ""
      );
      const role: Roles = roles[0];
      switch (role) {
        case Roles.ADMIN:
        case Roles.SUPER_ADMIN:
          // navigate(`/admin/dashboard`);
          break;
        // case Roles.PROVIDER || Roles.STAFF:
        //   navigate(`/${role.toLowerCase()}/home`);
        //   break;
        default:
          // navigate(`/provider/home`);
          break;
      }
      sessionStorage.setItem("role", role);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if ((error as ErrorResponseEntity)?.body?.message)
      dispatch(
        alertAction.setAlert({
          open: true,
          message: (error as ErrorResponseEntity).body.message,
          severity: "error",
        })
      );
  }, [isError]);

  const handleLogin = async (values: value) => {
    const hostName = location.host?.includes("navalacare");
    let requestBody: payload = {
      username: values.email,
      password: values.password,
      portalName: hostName ? portalName.NAVALACARE : portalName.NAVALAGLOBAL,
    };

    try {
      await mutateAsync({ requestBody: requestBody });
    } catch (error) {
      // setErrorMessage(error)
    }
  };

  return (
    <AuthLayout
      authPage={
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ values, errors, setFieldValue, touched, handleBlur }) => (
            <Form>
              {/* <Box sx={logoStyleAuth}>
                <Logo source="preAuthLogo" />
              </Box> */}
              <Box sx={formGrid}>
                <Label label={SIGN_IN_YOU} />
                <Label sublabel={true} label={LOGIN_TITLE} />
                <Box sx={textFieldGrid}>
                  <InputBase
                    name="email"
                    type="email"
                    fullWidth
                    placeholder={EMAIL}
                    classes={{
                      root: classes.textFieldRoot,
                      input: classes.textFieldInput,
                      focused: classes.textFieldActive,
                      error: classes.inputBoxError,
                    }}
                    onBlur={handleBlur}
                    value={values.email}
                    error={!!(touched.email && errors.email)}
                    onChange={(e) => setFieldValue("email", e.target.value)}
                  />
                </Box>
                {touched.email && errors.email && (
                  <FormHelperText error>{errors.email}</FormHelperText>
                )}
                <Box sx={{ position: "relative" }}>
                  <InputBase
                    sx={{ marginTop: "18px", display: "flex" }}
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    placeholder={PASSWORD}
                    classes={{
                      root: classes.textFieldRoot,
                      input: classes.textFieldInput,
                      focused: classes.textFieldActive,
                      error: classes.inputBoxError,
                    }}
                    name="password"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={(e) => setFieldValue("password", e.target.value)}
                    error={!!(touched.password && errors.password)}
                  />
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
                </Box>
                {touched.password && errors.password && (
                  <FormHelperText error>{errors.password}</FormHelperText>
                )}
                <Box sx={{ mt: "8px" }}>
                  {/* {errorMessage && (
                    <FormHelperText sx={{ fontSize: "15px" }} error>
                      {errorMessage}
                    </FormHelperText>
                  )} */}
                </Box>
                <Box sx={flexEnd}>
                  <Box onChange={() => setRememberMe(!rememberMe)}>
                    <Checkbox
                      checked={rememberMe}
                      sx={{
                        ...clickableText,
                        padding: 0,
                        color: "#1A1A1A33",
                        marginRight: "5px",
                      }}
                    />
                    <Typography
                      component="span"
                      variant="body1"
                      color="primary"
                      onClick={() => setRememberMe(!rememberMe)}
                      sx={{ ...clickableText }}
                    >
                      {"Remember me"}
                    </Typography>
                  </Box>
                  <Box onClick={() => navigate("/auth/forgot-password")}>
                    <Typography
                      component="span"
                      variant="body1"
                      color="primary"
                      sx={{ ...clickableText }}
                    >
                      {FORGOT_PASSWORD}
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  sx={buttonStyle}
                  type="submit"
                  // disabled={isSubmitting}
                >
                  <Typography sx={buttonTextStyle}>{SIGN_IN}</Typography>
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      }
    />
  );
};

export default LoginPage;
