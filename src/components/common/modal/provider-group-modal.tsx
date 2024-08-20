import { useState } from "react";
import {
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  InputBase,
  Box,
  OutlinedInput,
  // Button,
  Select,
  MenuItem,
  Checkbox,
  Grid,
  TextField,
  FormHelperText,
  ButtonBase,
} from "@mui/material";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import FormLabel from "../label/form-label";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import ImageSelector from "../image-upload";
import { Formik, Form } from "formik";
// import * as Yup from "yup";
import { adminConstants } from "../../../constants/admin";
import {
  actionBtns,
  commonWidget,
  formBottom,
  formButtonStyle,
} from "../../../styles/common";
// import { Close } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";

import theme from "../../../theme";
import { useProviderGroupControllerServiceCreateProviderGroup } from "../../../sdk/thinkemr-core-0.0.1/queries";
// import { PracticeHour } from "../../../sdk/thinkemr-core-0.0.1/requests";
// import { ProviderGroup } from "../../../sdk/thinkemr-core-0.0.1/requests";
export const commonModalWidget: any = makeStyles(
  () => ({
    modalButton: {
      width: "15.625rem",
      backgroundColor: "#0097F0",
      height: "42px",
      textTransform: "initial",
      fontSize: "14px",
      fontWeight: "500",
    },
    modalTitle: {
      textAlign: "center",
      fontSize: "20px",
      fontWeight: "600",
    },
    dialogContentContainer: {
      "&::-webkit-scrollbar": {
        width: "0.4em",
        background: "transparent",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "transparent",
      },
      height: "auto",
      borderTop: "none",
    },
    dialogTopContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
    upperBoxContainer: {
      display: "flex",
      gap: "30px",
      borderBottom: "1px solid #4C4C4C4D",
      paddingBottom: "20px",
      "@media (max-width: 820px)": {
        width: "100%",
      },
      "@media (max-width: 768px)": {
        width: "100%",
      },
    },

    mainBoxContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "22px",
      "@media (max-width: 820px)": {
        width: "100%",
      },
    },

    inputBoxContainer: {
      display: "flex",
      gap: "20.5px",
      "@media (max-width: 820px)": {
        display: "inline-block",
        width: "100%",
      },
    },

    addButtonTypo: {
      color: "#ffffff !important",
      display: "flex",
      paddingRight: "2px",
      opacity: 0.9,
    },

    addUserRoleBtnTypo: {
      color: "#36588C !important",
      fontWeight: "bold !important",
      display: "flex",
      paddingRight: "12px",
      background: "#36588C",
    },

    modalSelectStyle: {
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
    addressFormContainer: {
      padding: "15px 19px 23px 20.5px",
      border: "1px solid #FFFFFF",
      boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.3)",
      borderRadius: "5px",
      width: "100%",
      marginTop: "19px",
      marginBottom: "19px",
    },
    addressTitle: {
      fontSize: "16px",
      marginBottom: "22px",
      // fontWeight: "700",
      marginRight: "17px",
    },
    addressContainer: {
      display: "flex",
      gap: "20.5px",
      marginBottom: "22px",

      "@media (max-width: 820px)": {
        display: "block",
      },
    },
    addressBaseContainer: {
      display: "flex",
      alignItems: "center",
      gap: "20.5px",

      "@media (max-width: 820px)": {
        display: "block",
      },
    },
    addressCheckBoxStyle: {
      width: 20,
      padding: 0,
      color: "#70707066",
      "&.Mui-checked": {
        color: "#0097F0",
      },
    },
  }),
  { defaultTheme: theme }
);
type Props = {
  btnTitle: string;
  modalTitle: string;
  source?: string;
};

const sxs = {
  mainButtonStyle: {
    backgroundColor: "#DAEAF8",
    textTransform: "initial",
    fontSize: "14px",
    // fontWeight: "bold",
    color: "#36588C",
    boxShadow: "none !important",
    padding: "6px 16px !important",
    borderRadius: "4px",
  },
  addButtonIcon: {
    color: "#36588C !important",
    display: "flex",
    paddingRight: "12px",
    opacity: 0.7,
  },
  titleStyle: {
    textAlign: "center",
    // fontSize: "20px",
    color: "black",
    // fontWeight: "200",
    fontFamily: "Roboto,sans-serif",
  },
  dialogContentStyle: {
    "&::-webkit-scrollbar": {
      width: "0.4em",
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "transparent",
    },
    height: "auto",
    borderTop: "none",
  },
  specialitySelectStyle: {
    ".MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    border: "none ",
    height: "42px !important",

    width: "21.0rem",
    maxWidth: "24.375rem",
    padding: "13px 0px 10px 0px",
  },
  addressTitle: {
    fontSize: "16px",
    marginBottom: "22px",
    // fontWeight: "700",
    marginRight: "17px",
  },
  addressSelectorStyle: {
    ".MuiOutlinedInput-notchedOutline": { border: 0 },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    width: "12.773rem !important",
    height: "42px !important",
  },
  hoursContainer: {
    paddingTop: "15px",
    paddingLeft: "20.5px",
    paddingBottom: "23px",
    paddingRight: "19px",
    border: "1px solid #FFFFFF",
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.3)",
    borderRadius: "5px",
    width: "100%",
  },
  hoursTitle: {
    fontSize: "16px",
    marginBottom: "22px",
    // fontWeight: "700",
  },
  hoursParentContainer: {
    display: "flex",

    "@media (max-width: 820px)": {
      gap: "1.5rem",
    },
  },
  hoursGroupContainer: {
    display: "flex",
    gap: "34px",
    alignItems: "center",
    marginBottom: "25px",

    "@media (max-width: 820px)": {
      gap: "20px",
    },
  },
  dayBoxStyle: {
    fontSize: "28px",
    fontFamily: "Roboto",
    height: "42px",
    width: "42px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid #1A1A1A33 ",
    // fontWeight: "bold",
    borderRadius: "10px",
    cursor: "pointer",
  },
  textFieldsHoursStyle: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
    justifyContent: "center",

    "@media (max-width: 768px)": {
      gap: "7px",
    },
  },
  cancelButtonStyle: {
    fontFamily: "Roboto, sans-serif !important",
    width: "9.625rem",
    color: "#36588C",
    borderColor: "#36588C",
    height: "42px",
    fontSize: "14px",
    border: "1px solid #36588C",
  },
  saveButtonStyle: {
    fontFamily: "Roboto, sans-serif !important",
    width: "9.625rem",
    backgroundColor: "#36588C",
    height: "42px",
    fontSize: "14px",
    color: "#ffffff",
  },

  providerSaveButton: {
    textTransform: "initial",
    backgroundColor: "#36588C !important",
  },

  dayColor: {
    background: "#DAEAF8",
    color: "black",
  },
};

// const buttonBaseStyle = () => {
//   return {
//     border: "1px solid #36588C !important",
//     borderRadius: "5px !important",
//     width: "140px",
//     height: "40px",
//     background: "#CCECFF80",
//     color: "#36588C !important",
//   };
// };

const {
  //ADD_NEW_PROVIDER_GROUP,
  ADD_PROVIDER_LOGO,
  PROVIDER_GROUP_NAME,
  CONTACT_NUMBER,
  SPECIALITY_TYPE,
  GROUP_NPI_NUMBER,
  EMAIL_ID,
  WEBSITE,
  FAX_ID,
  DESCRIPTION,
  //EDIT_PROVIDER_GROUP,
  ENTER_PROVIDER_GROUP_NAME,
  ENTER_CONTACT_NUMBER,
  ENTER_GROUP_NIP_NUMBER,
  ENTER_EMAIL_ID,
  ENTER_DESCRIPTION,
  ENTER_FAX_ID,
  ADDRESS_ADDRESS_1,
  // ADDRESS_ADDRESS_2,
  ADDRESS_CITY,
  ADDRESS_COUNTRY,
  ADDRESS_STATE,
  ADDRESS_ZIP_CODE,
  BILLING_ADDRESS,
  SAME_AS_PHYSICAL_ADDRESS,
  PROVIDER,
} = adminConstants;

const ProiderGroupModal = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState<DialogProps["scroll"]>("paper");
  const [hoursSelect, setHoursSelect] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: true,
  });

  const [practiceHours, setPracticeHours] = useState([
    {
      id: "",
      dayOfWeek: "Monday",
      openingTime: "",
      closingTime: "",
    },
    {
      id: "",
      dayOfWeek: "Tuesday",
      openingTime: "",
      closingTime: "",
    },
    {
      id: "",
      dayOfWeek: "Wednesday",
      openingTime: "",
      closingTime: "",
    },
    {
      id: "",
      dayOfWeek: "Thursday",
      openingTime: "",
      closingTime: "",
    },
    {
      id: "",
      dayOfWeek: "Friday",
      openingTime: "",
      closingTime: "",
    },
    {
      id: "",
      dayOfWeek: "Saturday",
      openingTime: "",
      closingTime: "",
    },
    {
      id: "",
      dayOfWeek: "Sunday",
      openingTime: "",
      closingTime: "",
    },
  ]);

  function handleTimeChange(dayOfWeek: string, value: any, name: string) {
    setPracticeHours((prevPracticeHours) =>
      prevPracticeHours.map((practiceHour) => {
        if (practiceHour.dayOfWeek === dayOfWeek) {
          return {
            ...practiceHour,
            [name]: value,
          };
        }
        return practiceHour;
      })
    );
  }

  const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ITEM_HEIGHT = 48;

  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const classes = commonWidget();
  const styles = commonModalWidget();

  // const validationSchema = Yup.object().shape({
  //   email: Yup.string().email("Invalid E-mail").required("Email Required"),
  //   groupName: Yup.string().required("Provider Group Name Required"),
  //   npi: Yup.string().required("Group NPI Number Required"),
  //   website: Yup.string().required("website Required"),
  //   specialities: Yup.array().required("specialities Required"),
  //   workingHours: Yup.array().required(""),
  //   phone: Yup.string().required("phone Required"),
  //   physicalAddress: Yup.string().required("physicalAddress Required"),
  //   physicalCity: Yup.string().required("physicalCity Required"),
  //   physicalstate: Yup.string().required("physicalstate Required"),
  //   physicalCountry: Yup.string().required("physicalCountry Required"),
  //   physicalZipCode: Yup.string().required("physicalZipCode Required"),
  //   billingAddress: Yup.string().required("billingAddress Required"),
  //   billingCity: Yup.string().required("billingCity Required"),
  //   billingstate: Yup.string().required("billingstate Required"),
  //   billingCountry: Yup.string().required("billingCountry Required"),
  //   billingZipCode: Yup.string().required("billingZipCode Required")
  // });

  // const handleSubmit = (val:any) => {
  //   console.log("Form -------------------->",val);

  // };
  const { mutateAsync } =
    useProviderGroupControllerServiceCreateProviderGroup();

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    values.workingHours = practiceHours;
    try {
      mutateAsync({ requestBody: values }).then((_res) => {});
    } catch (_error) {}

    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        active: true,
        archive: false,
        email: "",
        groupName: "",
        npi: "",
        specialities: [],
        workingHours: [],
        phone: "",
        fax: "",
        website: "",
        description: "",
        physicalAddress: "",
        physicalAddress2: "",
        physicalCity: "",
        physicalstate: "",
        physicalCountry: "",
        physicalZipCode: "",

        billingAddress: "",
        billingAddress2: "",
        billingCity: "",
        billingstate: "",
        billingCountry: "",
        billingZipCode: "",
      }}
      onSubmit={handleSubmit}
      // validationSchema={validationSchema}
    >
      {({ isSubmitting, values, errors, setFieldValue, submitForm }) => (
        <Form>
          {props.source === PROVIDER ? (
            <ButtonBase
              sx={{
                ...formButtonStyle.saveButtonStyle,
                width: "auto !important",
                padding: "0px 10px",
              }}
              onClick={handleClickOpen("paper")}
            >
              <span className={styles.addButtonTypo}>
                <ModeEditOutlineOutlinedIcon />
              </span>
              <Typography variant="h5" className={styles.addUserRoleBtnTypo}>
                {props.btnTitle}
              </Typography>
            </ButtonBase>
          ) : (
            <ButtonBase
              //variant="contained"
              onClick={handleClickOpen("paper")}
              sx={{
                ...formButtonStyle.saveButtonStyle,
                width: "auto !important",
                padding: "0px 10px",
              }}
            >
              <span className={styles.addButtonTypo}>
                <AddIcon />
              </span>
              {props.btnTitle}
            </ButtonBase>
          )}

          <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            maxWidth="lg"
          >
            <DialogTitle
              id="scroll-dialog-title"
              sx={{ background: "#F5F6F9" }}
            >
              <Typography sx={sxs.titleStyle}>
                {props.modalTitle}
                {/* <Close
                  sx={{
                    position: "absolute",
                    right: "28px",
                    cursor: "pointer",
                  }}
                  onClick={handleClose}
                /> */}
              </Typography>
            </DialogTitle>
            <DialogContent
              dividers={scroll === "paper"}
              sx={sxs.dialogContentStyle}
            >
              <Box sx={styles.dialogTopContainer}>
                {/* top modal container */}
                <Box className={styles.upperBoxContainer}>
                  <Box>
                    <FormLabel label={ADD_PROVIDER_LOGO} isRequired={false} />
                    <ImageSelector />
                  </Box>

                  <Box className={styles.mainBoxContainer}>
                    <Box>
                      <FormLabel
                        label={PROVIDER_GROUP_NAME}
                        isRequired={true}
                      />
                      <InputBase
                        fullWidth
                        onChange={(e) =>
                          setFieldValue("groupName", e.target.value)
                        }
                        id="provider-group-name"
                        placeholder={ENTER_PROVIDER_GROUP_NAME}
                        value={values.groupName}
                        name="groupName"
                        classes={{
                          root: classes.textFieldFullWidth,
                          input: classes.textFieldInput,
                          focused: classes.textFieldActive,
                          error: classes.inputBoxError,
                        }}
                      />
                      {errors.groupName && (
                        <FormHelperText error>
                          {errors.groupName}
                        </FormHelperText>
                      )}
                    </Box>

                    <Box className={styles.inputBoxContainer}>
                      <Box>
                        <FormLabel label={CONTACT_NUMBER} isRequired={true} />
                        <InputBase
                          fullWidth
                          name="phone"
                          onChange={(e) =>
                            setFieldValue("phone", e.target.value)
                          }
                          value={values.phone}
                          placeholder={ENTER_CONTACT_NUMBER}
                          classes={{
                            root: classes.providerTextInput,
                            input: classes.textFieldInput,
                            focused: classes.textFieldActive,
                            error: classes.inputBoxError,
                          }}
                        />
                        {errors.phone && (
                          <FormHelperText error>{errors.phone}</FormHelperText>
                        )}
                      </Box>
                      <Box>
                        <FormLabel label={SPECIALITY_TYPE} isRequired={true} />
                        <Select
                          multiple
                          displayEmpty
                          onChange={(e) =>
                            setFieldValue("specialities", e.target.value)
                          }
                          name="specialities"
                          value={values.specialities}
                          input={<OutlinedInput />}
                          renderValue={(selected: any) => {
                            if (selected.length === 0) {
                              return (
                                <span
                                  style={{
                                    fontSize: "14px",
                                    color: "#1A1A1A7F",
                                  }}
                                >
                                  Select
                                </span>
                              );
                            }

                            return selected.join(", ");
                          }}
                          MenuProps={MenuProps}
                          inputProps={{ "aria-label": "Without label" }}
                          fullWidth
                          sx={sxs.specialitySelectStyle}
                        >
                          <MenuItem value={"ten"}>Ten</MenuItem>
                          <MenuItem value={"twenty"}>Twenty</MenuItem>
                          <MenuItem value={"thirty"}>Thirty</MenuItem>
                        </Select>
                        {errors.specialities && (
                          <FormHelperText error>
                            {errors.specialities}
                          </FormHelperText>
                        )}
                      </Box>
                    </Box>
                    <Box className={styles.inputBoxContainer}>
                      <Box>
                        <FormLabel label={GROUP_NPI_NUMBER} isRequired={true} />
                        <InputBase
                          fullWidth
                          value={values.npi}
                          name="npi"
                          onChange={(e) => setFieldValue("npi", e.target.value)}
                          placeholder={ENTER_GROUP_NIP_NUMBER}
                          classes={{
                            root: classes.providerTextInput,
                            input: classes.textFieldInput,
                            focused: classes.textFieldActive,
                            error: classes.inputBoxError,
                          }}
                        />
                        {errors.npi && (
                          <FormHelperText error>{errors.npi}</FormHelperText>
                        )}
                      </Box>
                      <Box>
                        <FormLabel label={EMAIL_ID} isRequired={true} />
                        <InputBase
                          fullWidth
                          name="email"
                          onChange={(e) =>
                            setFieldValue("email", e.target.value)
                          }
                          placeholder={ENTER_EMAIL_ID}
                          classes={{
                            root: classes.providerTextInput,
                            input: classes.textFieldInput,
                            focused: classes.textFieldActive,
                            error: classes.inputBoxError,
                          }}
                        />
                        {errors.email && (
                          <FormHelperText error>{errors.email}</FormHelperText>
                        )}
                      </Box>
                    </Box>

                    {/* ????????????????????????????????? */}
                    <Box className={styles.inputBoxContainer}>
                      <Box>
                        <FormLabel label={WEBSITE} />
                        <InputBase
                          fullWidth
                          onChange={(e) =>
                            setFieldValue("website", e.target.value)
                          }
                          name="website"
                          value={values.website}
                          placeholder="Enter Website"
                          classes={{
                            root: classes.providerTextInput,
                            input: classes.textFieldInput,
                            focused: classes.textFieldActive,
                            error: classes.inputBoxError,
                          }}
                        />
                      </Box>
                      <Box>
                        <FormLabel label={FAX_ID} />

                        <InputBase
                          fullWidth
                          name="fax"
                          value={values.fax}
                          onChange={(e) => setFieldValue("fax", e.target.value)}
                          placeholder={ENTER_FAX_ID}
                          classes={{
                            root: classes.providerTextInput,
                            input: classes.textFieldInput,
                            focused: classes.textFieldActive,
                            error: classes.inputBoxError,
                          }}
                        />
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        "@media (max-width: 820px)": {
                          display: "inline-block",
                          width: "100%",
                        },
                      }}
                    >
                      <Box>
                        <FormLabel label={DESCRIPTION} />
                        <InputBase
                          fullWidth
                          multiline={true}
                          placeholder={ENTER_DESCRIPTION}
                          name="description"
                          value={values.description}
                          onChange={(e) =>
                            setFieldValue("description", e.target.value)
                          }
                          rows="3"
                          classes={{
                            root: classes.providerGroupDescriptionTextInput,
                            input: classes.textFieldInput,
                            focused: classes.textFieldActive,
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
              {/* //addressFormContainer */}
              <Box className={styles.addressFormContainer}>
                <Box>
                  <Box sx={{ display: "flex", alignItems: "baseLine" }}>
                    <Typography sx={sxs.addressTitle}>
                      Physical Address
                    </Typography>
                  </Box>
                  <Box className={styles.addressContainer}>
                    <Box sx={{ flex: "1" }}>
                      <FormLabel label={ADDRESS_ADDRESS_1} isRequired={true} />
                      <InputBase
                        fullWidth
                        placeholder={ADDRESS_ADDRESS_1}
                        onChange={(e) =>
                          setFieldValue("physicalAddress", e.target.value)
                        }
                        value={values.physicalAddress}
                        name="physicalAddress"
                        classes={{
                          root: classes.addressTextField,
                          input: classes.textFieldInput,
                          focused: classes.textFieldActive,
                          error: classes.inputBoxError,
                        }}
                      />
                      {errors.physicalAddress && (
                        <FormHelperText error>
                          {errors.physicalAddress}
                        </FormHelperText>
                      )}
                    </Box>
                    {/* <Box sx={{ flex: "1" }}>
                      <FormLabel label={ADDRESS_ADDRESS_2} isRequired={false} />
                      <InputBase
                        fullWidth
                        placeholder={ADDRESS_ADDRESS_2}
                        onChange={(e) =>
                          setFieldValue("physicalAddress2", e.target.value)
                        }
                        value={values.physicalAddress2}
                        name="physicalAddress2"
                        classes={{
                          root: classes.addressTextField,
                          input: classes.textFieldInput,
                          focused: classes.textFieldActive,
                          error: classes.inputBoxError,
                        }}
                      />
                      {errors.physicalAddress2 && (
                        <FormHelperText error>
                          {errors.physicalAddress2}
                        </FormHelperText>
                      )}
                    </Box> */}
                  </Box>
                </Box>

                <Box className={styles.addressContainer}>
                  <Box className={styles.addressBaseContainer}>
                    <Box sx={{ flex: 1 }}>
                      <FormLabel label={ADDRESS_COUNTRY} isRequired={true} />
                      <Select
                        fullWidth
                        displayEmpty
                        renderValue={(selected) => {
                          if (selected?.length === 0) {
                            return (
                              <span
                                style={{
                                  fontSize: "14px",
                                  color: "#1A1A1A7F",
                                }}
                              >
                                Country
                              </span>
                            );
                          }
                          return selected;
                        }}
                        onChange={(e) =>
                          setFieldValue("physicalCountry", e.target.value)
                        }
                        value={values.physicalCountry}
                        name="physicalCountry"
                        sx={sxs.addressSelectorStyle}
                        MenuProps={{
                          PaperProps: {
                            sx: { maxHeight: 300, maxWidth: "12.773rem" },
                          },
                        }}
                      >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                      {errors.physicalCountry && (
                        <FormHelperText error>
                          {errors.physicalCountry}
                        </FormHelperText>
                      )}
                    </Box>
                    <Box>
                      <FormLabel label={ADDRESS_STATE} isRequired={true} />
                      <Select
                        fullWidth
                        displayEmpty
                        onChange={(e) =>
                          setFieldValue("physicalstate", e.target.value)
                        }
                        value={values.physicalstate}
                        name="physicalstate"
                        renderValue={(selected) => {
                          if (selected?.length === 0) {
                            return (
                              <span
                                style={{
                                  fontSize: "14px",
                                  color: "#1A1A1A7F",
                                }}
                              >
                                State
                              </span>
                            );
                          }
                          return selected;
                        }}
                        sx={sxs.addressSelectorStyle}
                        MenuProps={{
                          PaperProps: {
                            sx: { maxHeight: 300, maxWidth: "12.773rem" },
                          },
                        }}
                      >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                      {errors.physicalstate && (
                        <FormHelperText error>
                          {errors.physicalstate}
                        </FormHelperText>
                      )}
                    </Box>
                  </Box>
                  <Box className={styles.addressBaseContainer}>
                    <Box>
                      <FormLabel label={ADDRESS_CITY} isRequired={true} />
                      <InputBase
                        fullWidth
                        value={values.physicalCity}
                        name="physicalCity"
                        onChange={(e) =>
                          setFieldValue("physicalCity", e.target.value)
                        }
                        placeholder={ADDRESS_CITY}
                        classes={{
                          root: classes.addressCityTextField,
                          input: classes.textFieldInput,
                          focused: classes.textFieldActive,
                          error: classes.inputBoxError,
                        }}
                      />
                      {errors.physicalCity && (
                        <FormHelperText error>
                          {errors.physicalCity}
                        </FormHelperText>
                      )}
                    </Box>
                    <Box>
                      <FormLabel label={ADDRESS_ZIP_CODE} isRequired={true} />
                      <InputBase
                        fullWidth
                        value={values.physicalZipCode}
                        name="physicalZipCode"
                        onChange={(e) =>
                          setFieldValue("physicalZipCode", e.target.value)
                        }
                        placeholder={ADDRESS_ZIP_CODE}
                        classes={{
                          root: classes.addressCityTextField,
                          input: classes.textFieldInput,
                          focused: classes.textFieldActive,
                          error: classes.inputBoxError,
                        }}
                      />
                      {errors.physicalZipCode && (
                        <FormHelperText error>
                          {errors.physicalZipCode}
                        </FormHelperText>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box className={styles.addressFormContainer}>
                <Box>
                  <Box sx={{ display: "flex", alignItems: "baseLine" }}>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        marginBottom: "22px",
                        // fontWeight: "700",
                        marginRight: "17px",
                      }}
                    >
                      {BILLING_ADDRESS}
                    </Typography>
                    <Box sx={{ marginRight: "9px" }}>
                      <Checkbox className={styles.addressCheckBoxStyle} />
                    </Box>
                    <Typography sx={{ color: "#1A1A1A80", fontSize: "14px" }}>
                      {SAME_AS_PHYSICAL_ADDRESS}
                    </Typography>
                  </Box>
                  <Box className={styles.addressContainer}>
                    <Box sx={{ flex: "1" }}>
                      <FormLabel label={ADDRESS_ADDRESS_1} isRequired={true} />
                      <InputBase
                        fullWidth
                        value={values.billingAddress}
                        name="billingAddress"
                        onChange={(e) =>
                          setFieldValue("billingAddress", e.target.value)
                        }
                        placeholder={ADDRESS_ADDRESS_1}
                        classes={{
                          root: classes.addressTextField,
                          input: classes.textFieldInput,
                          focused: classes.textFieldActive,
                          error: classes.inputBoxError,
                        }}
                      />
                      {errors.billingAddress && (
                        <FormHelperText error>
                          {errors.billingAddress}
                        </FormHelperText>
                      )}
                    </Box>
                    {/* <Box sx={{ flex: "1" }}>
                      <FormLabel label={ADDRESS_ADDRESS_2} isRequired={false} />
                      <InputBase
                        fullWidth
                        value={values.billingAddress2}
                        name="billingAddress2"
                        onChange={(e) =>
                          setFieldValue("billingAddress2", e.target.value)
                        }
                        placeholder={ADDRESS_ADDRESS_2}
                        classes={{
                          root: classes.addressTextField,
                          input: classes.textFieldInput,
                          focused: classes.textFieldActive,
                          error: classes.inputBoxError,
                        }}
                      />
                      {errors.billingAddress2 && (
                        <FormHelperText error>
                          {errors.billingAddress2}
                        </FormHelperText>
                      )}
                    </Box> */}
                  </Box>
                </Box>

                <Box className={styles.addressContainer}>
                  <Box className={styles.addressBaseContainer}>
                    <Box sx={{ flex: 1 }}>
                      <FormLabel label={ADDRESS_COUNTRY} isRequired={true} />
                      <Select
                        fullWidth
                        displayEmpty
                        renderValue={(selected) => {
                          if (selected?.length === 0) {
                            return (
                              <span
                                style={{
                                  fontSize: "14px",
                                  color: "#1A1A1A7F",
                                }}
                              >
                                Country
                              </span>
                            );
                          }
                          return selected;
                        }}
                        value={values.billingCountry}
                        name="billingCountry"
                        onChange={(e) =>
                          setFieldValue("billingCountry", e.target.value)
                        }
                        sx={sxs.addressSelectorStyle}
                        MenuProps={{
                          PaperProps: {
                            sx: { maxHeight: 300, maxWidth: "12.773rem" },
                          },
                        }}
                      >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                      {errors.billingCountry && (
                        <FormHelperText error>
                          {errors.billingCountry}
                        </FormHelperText>
                      )}
                    </Box>
                    <Box>
                      <FormLabel label={ADDRESS_STATE} isRequired={true} />
                      <Select
                        fullWidth
                        displayEmpty
                        value={values.billingstate}
                        name="billingstate"
                        onChange={(e) =>
                          setFieldValue("billingstate", e.target.value)
                        }
                        renderValue={(selected) => {
                          if (selected?.length === 0) {
                            return (
                              <span
                                style={{
                                  fontSize: "14px",
                                  color: "#1A1A1A7F",
                                }}
                              >
                                State
                              </span>
                            );
                          }
                          return selected;
                        }}
                        sx={sxs.addressSelectorStyle}
                        MenuProps={{
                          PaperProps: {
                            sx: { maxHeight: 300, maxWidth: "12.773rem" },
                          },
                        }}
                      >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                      {errors.billingstate && (
                        <FormHelperText error>
                          {errors.billingstate}
                        </FormHelperText>
                      )}
                    </Box>
                  </Box>
                  <Box className={styles.addressBaseContainer}>
                    <Box>
                      <FormLabel label={ADDRESS_CITY} isRequired={true} />
                      <InputBase
                        value={values.billingCity}
                        name="billingCity"
                        onChange={(e) =>
                          setFieldValue("billingCity", e.target.value)
                        }
                        fullWidth
                        placeholder={ADDRESS_CITY}
                        classes={{
                          root: classes.addressCityTextField,
                          input: classes.textFieldInput,
                          focused: classes.textFieldActive,
                          error: classes.inputBoxError,
                        }}
                      />
                      {errors.billingCity && (
                        <FormHelperText error>
                          {errors.billingCity}
                        </FormHelperText>
                      )}
                    </Box>
                    <Box>
                      <FormLabel label={ADDRESS_ZIP_CODE} isRequired={true} />
                      <InputBase
                        fullWidth
                        placeholder={ADDRESS_ZIP_CODE}
                        value={values.billingZipCode}
                        name="billingZipCode"
                        onChange={(e) =>
                          setFieldValue("billingZipCode", e.target.value)
                        }
                        classes={{
                          root: classes.addressCityTextField,
                          input: classes.textFieldInput,
                          focused: classes.textFieldActive,
                          error: classes.inputBoxError,
                        }}
                      />
                      {errors.billingZipCode && (
                        <FormHelperText error>
                          {errors.billingZipCode}
                        </FormHelperText>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box sx={sxs.hoursContainer}>
                <Typography sx={sxs.hoursTitle}>
                  Practice Office Hours
                </Typography>
                <Box sx={sxs.hoursParentContainer}>
                  <Box>
                    <Box sx={{ display: "flex", gap: "18rem" }}>
                      <Box>
                        <Grid container ml={7}>
                          <Grid xs={12} sm={6} pl={3.5}>
                            <FormLabel label="Open Time" isRequired={false} />
                          </Grid>
                          <Grid xs={12} sm={6}>
                            <FormLabel label="Close Time" isRequired={false} />
                          </Grid>
                        </Grid>
                        <Box sx={sxs.hoursGroupContainer}>
                          <Box
                            sx={{
                              ...sxs.dayBoxStyle,
                              backgroundColor: hoursSelect.monday
                                ? sxs.dayColor.background
                                : null,
                              color: hoursSelect.monday
                                ? sxs.dayColor.color
                                : null,
                            }}
                            onClick={() =>
                              setHoursSelect((prev) => ({
                                ...prev,
                                monday: !prev.monday,
                              }))
                            }
                          >
                            M
                          </Box>

                          <Box sx={sxs.textFieldsHoursStyle}>
                            <TextField
                              fullWidth
                              name="monday"
                              sx={{
                                "& .MuiOutlinedInput-input": {
                                  padding: "8px 6px",
                                  resize: "none",
                                },
                              }}
                              type="time"
                              InputProps={{
                                classes: {
                                  root: classes.hoursInputField,
                                  input: classes.hoursInputTextBox,
                                  focused: classes.textFieldActive,
                                },
                              }}
                              onChange={(e) => {
                                handleTimeChange(
                                  "Monday",
                                  e.target.value,
                                  "openingTime"
                                );
                              }}
                              disabled={!hoursSelect.monday}
                            />
                            <TextField
                              fullWidth
                              sx={{
                                "& .MuiOutlinedInput-input": {
                                  padding: "8px 6px",
                                  resize: "none",
                                },
                              }}
                              type="time"
                              InputProps={{
                                classes: {
                                  root: classes.hoursInputField,
                                  input: classes.hoursInputTextBox,
                                  focused: classes.textFieldActive,
                                },
                              }}
                              onChange={(e) => {
                                handleTimeChange(
                                  "Monday",
                                  e.target.value,
                                  "closingTime"
                                );
                              }}
                              disabled={!hoursSelect.monday}
                            />
                          </Box>
                        </Box>
                        <Box sx={sxs.hoursGroupContainer}>
                          <Box
                            sx={{
                              ...sxs.dayBoxStyle,
                              backgroundColor: hoursSelect.tuesday
                                ? sxs.dayColor.background
                                : null,
                              color: hoursSelect.tuesday
                                ? sxs.dayColor.color
                                : null,
                            }}
                            onClick={() =>
                              setHoursSelect((prev) => ({
                                ...prev,
                                tuesday: !prev.tuesday,
                              }))
                            }
                          >
                            T
                          </Box>

                          <Box sx={sxs.textFieldsHoursStyle}>
                            <TextField
                              fullWidth
                              sx={{
                                "& .MuiOutlinedInput-input": {
                                  padding: "8px 6px",
                                  resize: "none",
                                },
                              }}
                              type="time"
                              InputProps={{
                                classes: {
                                  root: classes.hoursInputField,
                                  input: classes.hoursInputTextBox,
                                  focused: classes.textFieldActive,
                                },
                              }}
                              onChange={(e) => {
                                handleTimeChange(
                                  "Tuesday",
                                  e.target.value,
                                  "openingTime"
                                );
                              }}
                              disabled={!hoursSelect.tuesday}
                            />
                            <TextField
                              fullWidth
                              sx={{
                                "& .MuiOutlinedInput-input": {
                                  padding: "8px 6px",
                                  resize: "none",
                                },
                              }}
                              type="time"
                              InputProps={{
                                classes: {
                                  root: classes.hoursInputField,
                                  input: classes.hoursInputTextBox,
                                  focused: classes.textFieldActive,
                                },
                              }}
                              onChange={(e) => {
                                handleTimeChange(
                                  "Tuesday",
                                  e.target.value,
                                  "closingTime"
                                );
                              }}
                              disabled={!hoursSelect.tuesday}
                            />
                          </Box>
                        </Box>

                        <Box sx={sxs.hoursGroupContainer}>
                          <Box
                            sx={{
                              ...sxs.dayBoxStyle,
                              backgroundColor: hoursSelect.wednesday
                                ? sxs.dayColor.background
                                : null,
                              color: hoursSelect.wednesday
                                ? sxs.dayColor.color
                                : null,
                            }}
                            onClick={() =>
                              setHoursSelect((prev) => ({
                                ...prev,
                                wednesday: !prev.wednesday,
                              }))
                            }
                          >
                            W
                          </Box>

                          <Box sx={sxs.textFieldsHoursStyle}>
                            <TextField
                              fullWidth
                              sx={{
                                "& .MuiOutlinedInput-input": {
                                  padding: "8px 6px",
                                  resize: "none",
                                },
                              }}
                              type="time"
                              InputProps={{
                                classes: {
                                  root: classes.hoursInputField,
                                  input: classes.hoursInputTextBox,
                                  focused: classes.textFieldActive,
                                },
                              }}
                              onChange={(e) => {
                                handleTimeChange(
                                  "Wednesday",
                                  e.target.value,
                                  "openingTime"
                                );
                              }}
                              disabled={!hoursSelect.wednesday}
                            />
                            <TextField
                              fullWidth
                              sx={{
                                "& .MuiOutlinedInput-input": {
                                  padding: "8px 6px",
                                  resize: "none",
                                },
                              }}
                              type="time"
                              InputProps={{
                                classes: {
                                  root: classes.hoursInputField,
                                  input: classes.hoursInputTextBox,
                                  focused: classes.textFieldActive,
                                },
                              }}
                              onChange={(e) => {
                                handleTimeChange(
                                  "Wednesday",
                                  e.target.value,
                                  "closingTime"
                                );
                              }}
                              disabled={!hoursSelect.wednesday}
                            />
                          </Box>
                        </Box>

                        <Box sx={sxs.hoursGroupContainer}>
                          <Box
                            sx={{
                              ...sxs.dayBoxStyle,
                              backgroundColor: hoursSelect.thursday
                                ? sxs.dayColor.background
                                : null,
                              color: hoursSelect.thursday
                                ? sxs.dayColor.color
                                : null,
                            }}
                            onClick={() =>
                              setHoursSelect((prev) => ({
                                ...prev,
                                thursday: !prev.thursday,
                              }))
                            }
                          >
                            T
                          </Box>

                          <Box sx={sxs.textFieldsHoursStyle}>
                            <TextField
                              fullWidth
                              sx={{
                                "& .MuiOutlinedInput-input": {
                                  padding: "8px 6px",
                                  resize: "none",
                                },
                              }}
                              type="time"
                              InputProps={{
                                classes: {
                                  root: classes.hoursInputField,
                                  input: classes.hoursInputTextBox,
                                  focused: classes.textFieldActive,
                                },
                              }}
                              onChange={(e) => {
                                handleTimeChange(
                                  "Thursday",
                                  e.target.value,
                                  "openingTime"
                                );
                              }}
                              disabled={!hoursSelect.thursday}
                            />
                            <TextField
                              fullWidth
                              sx={{
                                "& .MuiOutlinedInput-input": {
                                  padding: "8px 6px",
                                  resize: "none",
                                },
                              }}
                              type="time"
                              InputProps={{
                                classes: {
                                  root: classes.hoursInputField,
                                  input: classes.hoursInputTextBox,
                                  focused: classes.textFieldActive,
                                },
                              }}
                              onChange={(e) => {
                                handleTimeChange(
                                  "Thursday",
                                  e.target.value,
                                  "closingTime"
                                );
                              }}
                              disabled={!hoursSelect.thursday}
                            />
                          </Box>
                        </Box>
                      </Box>

                      {/* ???????????????? */}
                      <Box>
                        <Grid container ml={7}>
                          <Grid xs={12} sm={6} pl={3.5}>
                            <FormLabel label="Open Time" isRequired={false} />
                          </Grid>
                          <Grid xs={12} sm={6}>
                            <FormLabel label="Close Time" isRequired={false} />
                          </Grid>
                        </Grid>
                        <Box sx={sxs.hoursGroupContainer}>
                          <Box
                            sx={{
                              ...sxs.dayBoxStyle,
                              backgroundColor: hoursSelect.friday
                                ? sxs.dayColor.background
                                : null,
                              color: hoursSelect.friday
                                ? sxs.dayColor.color
                                : null,
                            }}
                            onClick={() =>
                              setHoursSelect((prev) => ({
                                ...prev,
                                friday: !prev.friday,
                              }))
                            }
                          >
                            F
                          </Box>

                          <Box sx={sxs.textFieldsHoursStyle}>
                            <TextField
                              fullWidth
                              sx={{
                                "& .MuiOutlinedInput-input": {
                                  padding: "8px 6px",
                                  resize: "none",
                                },
                              }}
                              type="time"
                              InputProps={{
                                classes: {
                                  root: classes.hoursInputField,
                                  input: classes.hoursInputTextBox,
                                  focused: classes.textFieldActive,
                                },
                              }}
                              onChange={(e) => {
                                handleTimeChange(
                                  "Friday",
                                  e.target.value,
                                  "openingTime"
                                );
                              }}
                              disabled={!hoursSelect.friday}
                            />
                            <TextField
                              fullWidth
                              sx={{
                                "& .MuiOutlinedInput-input": {
                                  padding: "8px 6px",
                                  resize: "none",
                                },
                              }}
                              type="time"
                              InputProps={{
                                classes: {
                                  root: classes.hoursInputField,
                                  input: classes.hoursInputTextBox,
                                  focused: classes.textFieldActive,
                                },
                              }}
                              onChange={(e) => {
                                handleTimeChange(
                                  "Friday",
                                  e.target.value,
                                  "closingTime"
                                );
                              }}
                              disabled={!hoursSelect.friday}
                            />
                          </Box>
                        </Box>

                        <Box sx={sxs.hoursGroupContainer}>
                          <Box
                            sx={{
                              ...sxs.dayBoxStyle,
                              backgroundColor: hoursSelect.saturday
                                ? sxs.dayColor.background
                                : null,
                              color: hoursSelect.saturday
                                ? sxs.dayColor.color
                                : null,
                            }}
                            onClick={() =>
                              setHoursSelect((prev) => ({
                                ...prev,
                                saturday: !prev.saturday,
                              }))
                            }
                          >
                            S
                          </Box>

                          <Box sx={sxs.textFieldsHoursStyle}>
                            <TextField
                              fullWidth
                              sx={{
                                "& .MuiOutlinedInput-input": {
                                  padding: "8px 6px",
                                  resize: "none",
                                },
                              }}
                              type="time"
                              InputProps={{
                                classes: {
                                  root: classes.hoursInputField,
                                  input: classes.hoursInputTextBox,
                                  focused: classes.textFieldActive,
                                },
                              }}
                              onChange={(e) => {
                                handleTimeChange(
                                  "Saturday",
                                  e.target.value,
                                  "openingTime"
                                );
                              }}
                              disabled={!hoursSelect.saturday}
                            />
                            <TextField
                              fullWidth
                              sx={{
                                "& .MuiOutlinedInput-input": {
                                  padding: "8px 6px",
                                  resize: "none",
                                },
                              }}
                              type="time"
                              InputProps={{
                                classes: {
                                  root: classes.hoursInputField,
                                  input: classes.hoursInputTextBox,
                                  focused: classes.textFieldActive,
                                },
                              }}
                              onChange={(e) => {
                                handleTimeChange(
                                  "Saturday",
                                  e.target.value,
                                  "closingTime"
                                );
                              }}
                              disabled={!hoursSelect.saturday}
                            />
                          </Box>
                        </Box>

                        <Box sx={sxs.hoursGroupContainer}>
                          <Box
                            sx={{
                              ...sxs.dayBoxStyle,
                              backgroundColor: hoursSelect.sunday
                                ? sxs.dayColor.background
                                : null,
                              color: hoursSelect.sunday
                                ? sxs.dayColor.color
                                : null,
                            }}
                            onClick={() =>
                              setHoursSelect((prev) => ({
                                ...prev,
                                sunday: !prev.sunday,
                              }))
                            }
                          >
                            S
                          </Box>

                          <Box sx={sxs.textFieldsHoursStyle}>
                            <TextField
                              fullWidth
                              sx={{
                                "& .MuiOutlinedInput-input": {
                                  padding: "8px 6px",
                                  resize: "none",
                                },
                              }}
                              type="time"
                              InputProps={{
                                classes: {
                                  root: classes.hoursInputField,
                                  input: classes.hoursInputTextBox,
                                  focused: classes.textFieldActive,
                                },
                              }}
                              onChange={(e) => {
                                handleTimeChange(
                                  "Sunday",
                                  e.target.value,
                                  "openingTime"
                                );
                              }}
                              disabled={!hoursSelect.sunday}
                            />
                            <TextField
                              fullWidth
                              sx={{
                                "& .MuiOutlinedInput-input": {
                                  padding: "8px 6px",
                                  resize: "none",
                                },
                              }}
                              type="time"
                              InputProps={{
                                classes: {
                                  root: classes.hoursInputField,
                                  input: classes.hoursInputTextBox,
                                  focused: classes.textFieldActive,
                                },
                              }}
                              onChange={(e) => {
                                handleTimeChange(
                                  "Sunday",
                                  e.target.value,
                                  "closingTime"
                                );
                              }}
                              disabled={!hoursSelect.sunday}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions sx={formBottom}>
              <Grid sx={actionBtns}>
                <ButtonBase
                  //variant="outlined"
                  onClick={handleClose}
                  sx={formButtonStyle.cancelButtonStyle}
                >
                  Cancel
                </ButtonBase>
                <ButtonBase
                  //variant="contained"
                  type="submit"
                  sx={formButtonStyle.saveButtonStyle}
                  disabled={isSubmitting}
                  onClick={() => {
                    submitForm();
                  }}
                >
                  Save
                </ButtonBase>
              </Grid>
            </DialogActions>
          </Dialog>
        </Form>
      )}
    </Formik>
  );
};

export default ProiderGroupModal;
