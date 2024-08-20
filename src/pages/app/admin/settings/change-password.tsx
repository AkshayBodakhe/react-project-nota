import { Visibility, VisibilityOff } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  ButtonBase,
  DialogProps,
  Fade,
  FormHelperText,
  Grid,
  IconButton,
  InputBase,
  Modal,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import changePassGif from "../../../../../src/assets/other/pass.gif";
import CustomFormLabel from "../../../../components/common/custom-form-label";
import { adminConstants } from "../../../../constants/admin";
// import { setAlert } from "../../../../redux/actions/snackbar/alert.action";
import { useUserControllerServiceChangePassword } from "../../../../sdk/thinkemr-core-0.0.1/queries";
import { ClearSessionStorage } from "../../../auth/removeSessionStorage";
import { alertAction } from "../../../../store/features/common-actions/snackbar/alertSlice";
const { PASSWORDFIELD, TYPE_TEXT } = adminConstants;

export const loginStyle = makeStyles(() => ({
  changeModalStyle: {
    width: "500px",
    height: "auto",
    maxWidth: "500px",
    minWidth: "auto",
    background: "#FFFFFF",
    boxShadow: "0px 0px 16px #00000029",
    borderRadius: "6px",
    opacity: 1,
    outline: "none",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "100vh",
    overflowY: "auto",
    overflowX: "hidden",
    WebkitTransform: "translate(-50%, -50%)",
    WebkitTransition: "opacity 0.3s",
    padding: "15px",
  },
  subModalStyle: {
    padding: "20px 20px 20px 20px",
  },

  close: {
    position: "absolute",
    right: "28px",
    cursor: "pointer",
  },
  gridBody: {
    fontFamily: "ROBOTO !important",
    fontSize: "21px !important",
    marginTop: "40px !important",
    fontWeight: "bold !important",
  },
  label: {
    marginTop: "20px",
    fontWeight: "bold",
  },
  gif: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
  },
  changePassInputBase: {
    borderRadius: "5px",
    border: "none",
    "& fieldset": { border: "none" },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    height: "42px !important",
    textAlign: "center",
    padding: "13px 0px 10px 16px",
    fontSize: "16px",
    width: "100% !important",
    "@media (max-width: 820px)": {
      width: "100% !important",
    },
  },
  inputBoxText: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontSize: "14px !important",
    lineHeight: "140%",
    color: "",
    width: "100%",
    resize: "vertical",
    minHeight: "15px",
  },
  inputBoxActive: {
    background: "#FFFFFF 0% 0% no-repeat padding-box !important",
    boxShadow: "0px 0px 6px #00418602 !important",
    border: "1px solid #36588C !important",
    borderRadius: "4px !important",
  },
  inputBoxError: {
    background: "#FFFFFF 0% 0% no-repeat padding-box !important",
    boxShadow: "0px 0px 6px #ef53502 !important",
    border: "1px solid #ef5350 !important",
    borderRadius: "4px !important",
  },
  passModalTitle: {
    textAlign: "center",
    // fontSize: "18px !important",
    color: "##1A1A1A !important",
    fontWeight: "bold !important",
  },
  titleBackground: {
    // background: '#F5F6F9',
    padding: "20px 20px",
  },
  passlabel: {
    fontWeight: "bold !important",
    fontSize: "14px !important",
    color: "#F8F8F8 !important",
  },
  passwordFieldIcon: {
    position: "absolute",
    top: "50%",
    right: 25,
    transform: "translateY(-50%)",
    padding: 0,
    color: "#1A1A1A7F",
    "&:hover": {
      backgroundColor: "transparent",
      color: "#36588C",
    },
  },
  passbutton: {
    width: "100% !important",
    marginTop: "1rem !important",
    background: "#36588C !important",
    height: "auto !important",
    paddingTop: "10px !important",
    paddingBottom: "10px !important",
    borderRadius: "5px !important",
  },
  eyeIconStyle: {
    marginBottom: "-8px",
    fontSize: "21px",
  },
}));
const buttonStyle = {
  buttonContainer: {
    display: "flex",
    gap: "20px",
    justifyContent: "flex-end",
    // background: '#F5F6F9',
    padding: "0px 20px 20px 20px",
  },
  cancelButtonStyle: {
    width: "9.625rem",
    //fontWeight: "bold",
    color: "#36588C",
    borderColor: "#36588C",
    //height: "42px",
    fontSize: "14px",
    textTransform: "initial",
  },
  saveButtonStyle: {
    // width: "9.625rem",
    backgroundColor: "#36588C",
    //height: "42px",
    fontSize: "14px",
    textTransform: "initial",
    fontWeight: "bold !important",
    "&:hover": {
      backgroundColor: "#36588C !important",
    },
  },
};
interface ChangePasswordProps {
  source?: string;
  open?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  scroll?: DialogProps["scroll"];
  openChangePasswordModal: boolean;
  setChangePasswordModal?: any;
}

interface payload {
  oldPassword: string;
  newPassword: string;
}

const ChangePasswordModal: React.FC<ChangePasswordProps> = ({
  setOpen,
  openChangePasswordModal,
}) => {
  const classes = loginStyle();
  const {
    CURRENT_PASSWORD,
    NEW_PASSWORD,
    CONFIRM_NEW_PASSWORD,
    UPDATE_PASSWORD,
    CHANGED_PASSWORD,
    CHANGE,
  } = adminConstants;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutateAsync, isSuccess } = useUserControllerServiceChangePassword();

  const handleClose = () => {
    setOpen(false);
  };
  const [showPassword, setShowPassword] = useState({
    showPassword1: false,
    showPassword2: false,
  });

  const validationSchema = Yup.object({
    currentpassword: Yup.string().required("Please enter the current password"),
    newPassword: Yup.string()
      .notOneOf([Yup.ref("currentpassword")],"New password should not be the same as the old password")
      .required("Please enter the new password")
      .min(8, "Password must be at least 8 characters long"),
    confirmNewPassword: Yup.string()
      .oneOf(
        [Yup.ref("newPassword")],
        "New Password and Confirm Password must same"
      )
      .required("Please enter the confirm password"),
  });

  useEffect(() => {
    if (isSuccess) {
      handleClose();
      ClearSessionStorage();
      navigate("/auth/login");
    }
  }, [isSuccess]);

  const handleChangePasswordRedirect = async (values: any) => {
    const requestBody: payload = {
      oldPassword: values.currentpassword,
      newPassword: values.newPassword,
    };
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
        })
        .catch((err) => {
          dispatch(
            alertAction.setAlert({
              open: true,
              message: err.body.message,
              severity: "error",
            })
          );
        });
    } catch (error: any) {
      dispatch(
        alertAction.setAlert({ open: true, message: error, severity: "error" })
      );
    }
  };

  return (
    <Formik
      initialValues={{
        currentpassword: "",
        newPassword: "",
        confirmNewPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleChangePasswordRedirect}
    >
      {({ values, errors, setFieldValue, submitForm, handleBlur, touched }) => (
        <Form autoComplete="off">
          <Modal open={openChangePasswordModal} closeAfterTransition>
            <Fade in={openChangePasswordModal}>
              <Grid
                classes={{
                  root: classes.changeModalStyle,
                }}
              >
                <Grid className={classes.titleBackground}>
                  <Grid container alignItems={"center"}>
                    <Grid
                      item
                      xs={11}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <Typography
                        variant="h3"
                        className={classes.passModalTitle}
                      >
                        {CHANGED_PASSWORD}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={1}
                      sx={{ display: "flex", justifyContent: "end" }}
                    >
                      <ButtonBase onClick={handleClose}>
                        <CloseIcon />
                      </ButtonBase>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid className={classes.subModalStyle}>
                  <Grid container className={classes.gif}>
                    <img
                      src={changePassGif}
                      alt="pass GIF"
                      height="200px"
                      width="200px"
                    />
                  </Grid>
                  <Grid className={classes.gridBody}>
                    <CustomFormLabel
                      label={`${CURRENT_PASSWORD}`}
                      source={CHANGE}
                      isRequired={true}
                    />
                    <InputBase
                      name="currentpassword"
                      type="currentpassword"
                      fullWidth
                      autoComplete="off"
                      classes={{
                        root: classes.changePassInputBase,
                        input: classes.inputBoxText,
                        focused: classes.inputBoxActive,
                        error: classes.inputBoxError,
                      }}
                      onBlur={handleBlur}
                      value={values.currentpassword}
                      onChange={(e) =>
                        setFieldValue("currentpassword", e.target.value)
                      }
                      error={
                        !!touched.currentpassword && !!errors.currentpassword
                      }
                    />
                    {touched.currentpassword && errors.currentpassword && (
                      <FormHelperText error>
                        {errors.currentpassword}
                      </FormHelperText>
                    )}
                    <Box className={classes.label}>
                      <CustomFormLabel
                        label={`${NEW_PASSWORD}`}
                        source={CHANGE}
                        isRequired={true}
                      />
                    </Box>

                    <InputBase
                      name="newpassword"
                      fullWidth
                      autoComplete={"false"}
                      type={
                        showPassword.showPassword1 ? TYPE_TEXT : PASSWORDFIELD
                      }
                      classes={{
                        root: classes.changePassInputBase,
                        input: classes.inputBoxText,
                        focused: classes.inputBoxActive,
                        error: classes.inputBoxError,
                      }}
                      value={values.newPassword}
                      onBlur={handleBlur}
                      onChange={(e) =>
                        setFieldValue("newPassword", e.target.value)
                      }
                      error={!!touched.newPassword && !!errors.newPassword}
                      endAdornment={
                        <IconButton
                          onClick={() =>
                            setShowPassword((prev) => ({
                              ...prev,
                              showPassword1: !showPassword.showPassword1,
                            }))
                          }
                          edge="end"
                          className={classes.passwordFieldIcon}
                        >
                          {showPassword.showPassword1 ? (
                            <Visibility className={classes.eyeIconStyle} />
                          ) : (
                            <VisibilityOff className={classes.eyeIconStyle} />
                          )}
                        </IconButton>
                      }
                    />
                    {touched.newPassword && errors.newPassword && (
                      <FormHelperText error>
                        {errors.newPassword}
                      </FormHelperText>
                    )}

                    <Box className={classes.label}>
                      <CustomFormLabel
                        label={`${CONFIRM_NEW_PASSWORD}`}
                        source={CHANGE}
                        isRequired={true}
                      />
                    </Box>

                    <InputBase
                      name="confirmNewPassword"
                      fullWidth
                      type={
                        showPassword.showPassword2 ? TYPE_TEXT : PASSWORDFIELD
                      }
                      classes={{
                        root: classes.changePassInputBase,
                        input: classes.inputBoxText,
                        focused: classes.inputBoxActive,
                        error: classes.inputBoxError,
                      }}
                      value={values.confirmNewPassword}
                      onBlur={handleBlur}
                      onChange={(e) =>
                        setFieldValue("confirmNewPassword", e.target.value)
                      }
                      error={
                        !!touched.confirmNewPassword &&
                        !!errors.confirmNewPassword
                      }
                      endAdornment={
                        <IconButton
                          onClick={() =>
                            setShowPassword((prev) => ({
                              ...prev,
                              showPassword2: !showPassword.showPassword2,
                            }))
                          }
                          edge="end"
                          className={classes.passwordFieldIcon}
                        >
                          {showPassword.showPassword2 ? (
                            <Visibility className={classes.eyeIconStyle} />
                          ) : (
                            <VisibilityOff className={classes.eyeIconStyle} />
                          )}
                        </IconButton>
                      }
                    />
                    {touched.confirmNewPassword && errors.confirmNewPassword && (
                        <FormHelperText error>
                          {errors.confirmNewPassword}
                        </FormHelperText>
                      )}
                  </Grid>{" "}
                  <Box sx={{ mt: "8px" }}>
                    {/* {errorMessage && (
                      <FormHelperText sx={{ fontSize: "15px" }} error>
                        {errorMessage}
                      </FormHelperText>
                    )} */}
                  </Box>
                </Grid>
                <Grid sx={buttonStyle.buttonContainer} xs={12}>
                  {/* <Button
                    variant="outlined"
                    onClick={handleClose}
                    sx={buttonStyle.cancelButtonStyle}
                  >
                    Cancel
                  </Button> */}
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ ...buttonStyle.saveButtonStyle, width: "100%" }}
                    onClick={submitForm}
                  >
                    {UPDATE_PASSWORD}
                  </Button>
                </Grid>
              </Grid>
            </Fade>
          </Modal>
        </Form>
      )}
    </Formik>
  );
};
export default ChangePasswordModal;
