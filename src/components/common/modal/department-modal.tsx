import {
  Dialog,
  DialogContent,
  Typography,
  Grid,
  InputBase,
  Select,
  MenuItem,
  DialogActions,
  FormHelperText,
  DialogTitle,
  ButtonBase,
} from "@mui/material";
import FormLabel from "../label/form-label";
import { adminConstants } from "../../../constants/admin";
import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import theme from "../../../theme";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  actionBtns,
  formBottom,
  formButtonStyle,
  formTitle,
} from "../../../styles/common";
import providerGroupService from "../../../service/provider-group--service";
import { Enums } from "../../../pages/app/admin/provider-groups/common-files/enums";
import { useDispatch } from "react-redux";
import { alertAction } from "../../../store/features/common-actions/snackbar/alertSlice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// import { setAlert } from "../../../redux/actions/snackbar/alert.action";

const {
  DEPARTMENT_ID,
  DEPARTMENT_NAME,
  DEPARTMENT_ADMIN,
  CONTACT_NUMBER,
  CANCEL,
  SAVE,
  ADD,
} = adminConstants;

export const commonDepartmentWidget = makeStyles(
  () => ({
    providerFormShortInputField: {
      borderRadius: "5px",
      border: "none",
      "& fieldset": { border: "none" },
      boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
      height: "42px !important",
      textAlign: "center",
      padding: "13px 0px 10px 16px",
      fontSize: "16px",
      width: "20.773rem !important",
      "@media (max-width: 820px)": {
        width: "100% !important",
      },
    },
    inputBoxText2: {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontSize: "14px !important",

      lineHeight: "140%",
      color: "",
      width: "100%",
      resize: "vertical",
      minHeight: "15px",
    },
    inputBoxActive2: {
      background: "#FFFFFF 0% no-repeat padding-box !important",
      boxShadow: "0px 0px 6px #00418602 !important",
      border: "1px solid #36588C!important",
      borderRadius: "4px !important",
    },
    addButtonTypo: {
      color: "#ffffff !important",
      display: "flex",
      // paddingLeft: "12px",
      paddingRight: "2px",
      opacity: 0.9,
    },
    inputBoxError: {
      background: `${theme.palette.primary.light} 0% 0% no-repeat padding-box !important`,
      boxShadow: "0px 0px 6px #ef53502 !important",
      border: `1px solid ${theme.palette.error.main} !important`,
      borderRadius: "4px !important",
    },
  }),
  { defaultTheme: theme }
);

const sxs = {
  departmentTitle: {
    // width: "10.625rem",
    backgroundColor: "#DAEAF8",
    // height: "42px",
    textTransform: "initial",
    fontSize: "14px",
    // fontWeight: "700",
    color: "#36588C",
    boxShadow: "none!important",

    "&:hover": {
      background: "#DAEAF8 !important",
    },
    // padding: '6px 16px !important'
  },
  dialogContainer: {
    borderBottom: "none",
    padding: "20px !important",
    "&::-webkit-scrollbar": {
      width: "0.4em",
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "transparent",
    },
    height: "auto",
  },
  dialogAlphaContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  dialogTitle: {
    textAlign: "center",
    // fontSize: "20px",
    color: "black",
    // fontWeight: "600",
    fontFamily: "Roboto,sans-serif",
  },
  gridContainer: {
    display: "flex",
    gap: "20px",
  },
  adminSelectStyle: {
    ".MuiOutlinedInput-notchedOutline": { border: 0 },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    height: "42px",
    maxHeight: "42px",
    width: "20.773rem !important",
    "@media (max-width: 820px)": {
      width: "100% !important",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "20px",
    },
  },
  title: {
    color: "#1A1A1A !important",
    fontWeight: "bold !important",
  },
};

type Props = {
  open: [boolean, any];
  editDepartment?: any;
  onClose: () => void;
  providerGroupUuid: string;
};

function DepartmentModal(props: Props) {
  const classes = commonDepartmentWidget();
  let { id } = useParams();

  if (!id) {
    const providerInfo = useSelector(
      (state: any) => state.commonReducer.userDetail?.data
    );
    id = providerInfo?.providerGroup || "";
  }

  const [open, setOpen] = props.open;
  const [departmentAdmins, setDepartmentAdmins] = useState<any[]>([]);
  const dispatch = useDispatch();
  const [initialValues] = useState({
    active: true,
    archive: false,
    id: "",
    uuid: "",
    deptId: "",
    name: "",
    adminId: {
      id: "",
      uuid: "",
    },
    contact: "",
    providerGroupUuid: props.providerGroupUuid,
  });
  const [providerGroupSchema] = useState<any>(
    localStorage.getItem(Enums.PROVIDER_GROUP_KEY) || ""
  );

  const getDepartmentAdmins = () => {
    try {
      providerGroupService
        .getAllDepartmentAdmins(providerGroupSchema, 0, 50, id)
        .then((admins) => {
          if (admins?.data?.data && admins.data?.data?.content) {
            const activeAdmins = admins.data.data.content;
            setDepartmentAdmins(activeAdmins);
          }
        });
    } catch (_error) {}
  };

  useEffect(() => {
    if (open) getDepartmentAdmins();
    if (props.editDepartment) handleSetValues();
  }, [props.open]);

  const handleSubmit = (values: any) => {
    try {
      values = {
        ...values,
        providerGroupUuid: id,
      };
      providerGroupService
        .addEditDepartment(
          providerGroupSchema,
          values,
          props.editDepartment ? "UPDATE" : "ADD"
        )
        .then((res) => {
          if (res?.status >= 200 && res.status <= 299) {
            setOpen(false);
            handleClose();
            dispatch(
              alertAction.setAlert({
                open: true,
                message: res.data.message,
                severity: "success",
              })
            );
          } else
            dispatch(
              alertAction.setAlert({
                open: true,
                message: res.data?.message || "",
                severity: "error",
              })
            );
        });
    } catch (_error) {}
  };

  const validationSchema = Yup.object().shape({
    deptId: Yup.string()
      .matches(/^[0-9]+$/, "Please enter the valid department ID")
      .required("Please enter the department ID "),
    contact: Yup.string()
      .optional()
      .matches(/^\d+$/, "Contact number should contain only digits")
      .min(10, "Contact number should be at least 10 digits")
      .max(10, "Contact number should not exceed 10 digits"),
    name: Yup.string()
      .trim()
      .min(2, "Department Name must be at least 2 characters long")
      .required("Please enter the department name")
      .matches(/^[A-Za-z ]+$/, "Please enter the valid department  name"),
    adminId: Yup.object().shape({
      id: Yup.string().notRequired(),
      uuid: Yup.string().required("Please select the department admin"),
    }),
  });

  const handleSetValues = () => {
    Object.keys(props.editDepartment).map((key) => {
      Formik.setFieldValue(key, props.editDepartment[key]);
    });
  };

  function handleClose() {
    setOpen(false);
    Formik.resetForm();
    props.onClose();
  }

  const Formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form>
      <Dialog
        onClose={handleClose}
        open={open}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="lg"
      >
        <DialogTitle id="scroll-dialog-title" sx={formTitle}>
          <Typography variant="h3" sx={sxs.title}>
            {props.editDepartment ? "Edit Department" : "Add New Department"}
          </Typography>
        </DialogTitle>
        <DialogContent sx={sxs.dialogContainer}>
          <Grid sx={sxs.gridContainer}>
            <Grid>
              <FormLabel label={DEPARTMENT_ID} isRequired={true} />
              <InputBase
                fullWidth
                placeholder="Enter Department ID"
                value={Formik.values.deptId}
                name="deptId"
                // onChange={(e) =>
                //   Formik.setFieldValue("deptId", e.target.value)
                // }
                onBlur={Formik.handleBlur}
                onChange={Formik.handleChange}
                error={!!(Formik.errors.deptId && Formik.touched.deptId)}
                classes={{
                  root: classes.providerFormShortInputField,
                  input: classes.inputBoxText2,
                  focused: classes.inputBoxActive2,
                  error: classes.inputBoxError,
                }}
              />
              {Formik.touched.deptId && Formik.errors.deptId && (
                <FormHelperText error>{Formik.errors.deptId}</FormHelperText>
              )}
            </Grid>
            <Grid>
              <FormLabel label={DEPARTMENT_NAME} isRequired={true} />
              <InputBase
                fullWidth
                value={Formik.values.name}
                name="name"
                // onChange={(e) =>
                //   Formik.setFieldValue("name", e.target.value)
                // }
                onBlur={Formik.handleBlur}
                onChange={Formik.handleChange}
                error={!!(Formik.touched.name && Formik.errors.name)}
                placeholder="Enter Department Name"
                classes={{
                  root: classes.providerFormShortInputField,
                  input: classes.inputBoxText2,
                  focused: classes.inputBoxActive2,
                  error: classes.inputBoxError,
                }}
              />
              {Formik.touched.name && Formik.errors.name && (
                <FormHelperText error>{Formik.errors.name}</FormHelperText>
              )}
            </Grid>
          </Grid>
          <Grid sx={{ display: "flex", gap: "20px", marginTop: "20px" }}>
            <Grid>
              <FormLabel label={DEPARTMENT_ADMIN} isRequired={true} />
              <Select
                fullWidth
                displayEmpty
                value={Formik.values.adminId}
                name="adminId"
                size="small"
                error={!!(Formik.touched.adminId && Formik.errors.adminId)}
                onBlur={Formik.handleBlur}
                classes={{
                  error: classes.inputBoxError,
                }}
                onChange={Formik.handleChange}
                // onChange={(e) =>
                //   Formik.setFieldValue("adminId", e.target.value)
                // }
                renderValue={(selected: any) => {
                  if (selected.id === "") {
                    return (
                      <span
                        style={{
                          fontSize: "14px",
                        }}
                      >
                        Select Department Admin
                      </span>
                    );
                  } else {
                    return `${selected.firstName + " " + selected.lastName}`;
                  }
                }}
                sx={{
                  ...sxs.adminSelectStyle,
                  ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
                    {
                      padding: "8px 14px",
                    },
                }}
                MenuProps={{
                  PaperProps: { sx: { maxHeight: 300 } },
                }}
              >
                {departmentAdmins
                  .filter((admin: any) => admin.active === true)
                  .map((data: any) => {
                    return (
                      <MenuItem value={data}>
                        {data.firstName + " " + data.lastName}
                      </MenuItem>
                    );
                  })}
              </Select>
              {Formik.touched.adminId && Formik.errors.adminId?.uuid && (
                <FormHelperText error>
                  {Formik.errors.adminId?.uuid}
                </FormHelperText>
              )}
            </Grid>
            <Grid>
              <FormLabel label={CONTACT_NUMBER} />
              <InputBase
                fullWidth
                placeholder="Enter Contact Number"
                value={Formik.values.contact}
                name="contact"
                // onChange={(e) =>
                //   Formik.setFieldValue("contact", e.target.value)
                // }
                onBlur={Formik.handleBlur}
                onChange={Formik.handleChange}
                error={!!(Formik.errors.contact && Formik.touched.contact)}
                classes={{
                  root: classes.providerFormShortInputField,
                  input: classes.inputBoxText2,
                  focused: classes.inputBoxActive2,
                  error: classes.inputBoxError,
                }}
              />
              {Formik.touched.contact && Formik.errors.contact && (
                <FormHelperText error>{Formik.errors.contact}</FormHelperText>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={formBottom}>
          <Grid sx={actionBtns}>
            <ButtonBase
              onClick={handleClose}
              sx={formButtonStyle.cancelButtonStyle}
            >
              {CANCEL}
            </ButtonBase>
            <ButtonBase
              type="submit"
              sx={formButtonStyle.saveButtonStyle}
              onClick={Formik.submitForm}
            >
              {props.editDepartment ? SAVE : ADD}
            </ButtonBase>
          </Grid>
        </DialogActions>
      </Dialog>
    </form>
  );
}

export default DepartmentModal;
