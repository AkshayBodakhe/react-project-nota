import CloseIcon from "@mui/icons-material/Close";
import {
  ButtonBase,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  InputBase,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import {
  useDiagnosticCentresControllerServiceAddDiagnosticCenter,
  usePharmacyControllerServiceAddPharmacy,
} from "../../../../sdk/thinkemr-core-0.0.1/queries";
import { DiagnosticCentre } from "../../../../sdk/thinkemr-core-0.0.1/requests";
import { formButtonStyle } from "../../../../styles/common";
import { style } from "../referral/style/common-style";
import { patientStyle } from "./style/commonStyle";
import { useSelector } from "react-redux";
interface Props {
  title: string;
  onClose: () => void;
  open: boolean;
  storePharmacy: any;
  storeLab: any;
  storeRadiology: any;
}

function AddPreferences(props: Props) {
  const { onClose, open, title, storePharmacy, storeLab, storeRadiology } =
    props;
  const classes = patientStyle();
  const commonStyle = style();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 50,
      },
    },
  };
  const providerDetail = useSelector(
    (state: any) => state.commonReducer?.userDetail?.data
  );
  const providerGroupUuid = providerDetail?.providerGroup;
  const [preferenceInformationData, setPreferenceInformationData] = useState({
    name: "",
    addressLine: "",
    city: "",
    zipcode: "",
    state: "",
    country: "",
    faxNumber: "",
    contactNumber: "",
  });

  const inputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setPreferenceInformationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectOption = (e: any) => {
    const { value, name } = e.target;
    setPreferenceInformationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const close = () => {
    onClose();
  };

  const {
    mutateAsync: AddPharmacy,
    data: addPharmacyData,
    isSuccess: addPharmacySuccess,
  } = usePharmacyControllerServiceAddPharmacy();
  const { mutateAsync, data, isSuccess } =
    useDiagnosticCentresControllerServiceAddDiagnosticCenter();

  useEffect(() => {
    if (addPharmacySuccess && !!addPharmacyData)
      storePharmacy(addPharmacyData?.code);
  }, [addPharmacySuccess]);

  useEffect(() => {
    if (isSuccess && !!data) {
      if (title === "Add New Labs") {
        storeLab(data?.code == "CREATED");
      } else if (title === "Add New Radiology") {
        storeRadiology(data?.code == "CREATED");
      }
      close();
    }
  }, [isSuccess]);

  const handleFormSubmit = (values: any) => {
    if (title === "Add New Pharmacy") {
      const PreferredBody = {
        name: values.name,
        contactNumber: values.contactNumber,
        faxNumber: values.faxNumber,
        address: {
          line1: values.addressLine,
          city: values.city,
          state: values.state,
          country: values.country,
          zipcode: values.zipcode,
        },
        providerGroupUuid,
      };
      AddPharmacy({ requestBody: PreferredBody });
      close();
    } else if (title === "Add New Labs") {
      const labPayload = {
        type: DiagnosticCentre.type.LAB,
        name: values.name,
        contactNumber: values.contactNumber,
        faxNumber: values.faxNumber,
        address: {
          line1: values.addressLine,
          city: values.city,
          state: values.state,
          country: values.country,
          zipcode: values.zipcode,
        },
        providerGroupUuid,
      };
      mutateAsync({ requestBody: labPayload });
    } else if (title === "Add New Radiology") {
      const labPayload = {
        type: DiagnosticCentre.type.RADIOLOGY,
        name: values.name,
        contactNumber: values.contactNumber,
        faxNumber: values.faxNumber,
        address: {
          line1: values.addressLine,
          city: values.city,
          state: values.state,
          country: values.country,
          zipcode: values.zipcode,
        },
        providerGroupUuid,
      };
      mutateAsync({ requestBody: labPayload });
    }
  };

  const countryOptions = ["Africa", "Asia", "India"];
  const stateOptions = ["Maharashtra", "Gujarat"];

  return (
    <div>
      <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
        <DialogTitle>
          <Grid className={commonStyle.dialogTitle}>
            <Grid>
              <Typography variant="h4" style={{ fontWeight: "bold" }}>
                {title}
              </Typography>
            </Grid>
            <Grid style={{ cursor: "pointer" }}>
              <CloseIcon onClick={close} />
            </Grid>
          </Grid>
        </DialogTitle>
        <Formik
          initialValues={preferenceInformationData}
          // validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={handleFormSubmit}
        >
          {({
            handleSubmit,
            values,
            // touched,
            // errors,
            // isSubmitting,
            // isValid,
            // setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <DialogContent>
                <DialogContentText
                  id="scroll-dialog-description"
                  // ref={descriptionElementRef}
                  tabIndex={-1}
                >
                  <Grid
                    container
                    spacing={2}
                    sx={{ justifyContent: "space-between" }}
                    className={classes.GridDiv}
                  >
                    <Grid item xs={12}>
                      <Typography
                        className={classes.label}
                        variant="h4"
                        sx={
                          {
                            //   marginTop: "20px !important",
                          }
                        }
                      >
                        {title == "Add New Pharmacy"
                          ? "Pharmacy Name"
                          : title == "Add New Labs"
                          ? "Lab Name"
                          : "Radiology Name"}
                      </Typography>

                      <InputBase
                        value={values.name}
                        name="name"
                        fullWidth
                        placeholder="Enter Address"
                        classes={{
                          root: classes.inputField,
                          input: classes.inputBoxText,
                          focused: classes.inputBoxActive,
                        }}
                        onChange={(e: any) => inputData(e)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        className={classes.label}
                        variant="h4"
                        sx={
                          {
                            //   marginTop: "20px !important",
                          }
                        }
                      >
                        Address
                      </Typography>

                      <InputBase
                        value={values.addressLine}
                        name="addressLine"
                        fullWidth
                        placeholder="Enter Address"
                        classes={{
                          root: classes.inputField,
                          input: classes.inputBoxText,
                          focused: classes.inputBoxActive,
                        }}
                        onChange={(e: any) => inputData(e)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="h4"
                        className={classes.label}
                        sx={
                          {
                            //   marginTop: "20px !important",
                          }
                        }
                      >
                        City
                      </Typography>

                      <InputBase
                        value={values.city}
                        name="city"
                        fullWidth
                        placeholder="Enter City"
                        classes={{
                          root: classes.inputField,
                          input: classes.inputBoxText,
                          focused: classes.inputBoxActive,
                        }}
                        onChange={(e: any) => inputData(e)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="h4"
                        className={classes.label}
                        sx={
                          {
                            //   marginTop: "20px !important",
                          }
                        }
                      >
                        Zipcode
                      </Typography>

                      <InputBase
                        value={values.zipcode}
                        name="zipcode"
                        fullWidth
                        placeholder="Enter Zipcode"
                        classes={{
                          root: classes.inputField,
                          input: classes.inputBoxText,
                          focused: classes.inputBoxActive,
                        }}
                        onChange={(e: any) => inputData(e)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="h4"
                        className={classes.label}
                        sx={
                          {
                            // marginTop: "20px !important",
                          }
                        }
                      >
                        State
                      </Typography>
                      <Select
                        className={classes.selectInputStyle}
                        value={values.state}
                        name="state"
                        onChange={(e: any) => handleSelectOption(e)}
                        renderValue={(selected) => {
                          if (!selected) {
                            return (
                              <span>
                                <Typography
                                  variant="h5"
                                  sx={{
                                    color: "#1A1A1A80 !important",
                                  }}
                                >
                                  Select State
                                </Typography>
                              </span>
                            );
                          }
                          return (
                            <Typography variant="h5">{selected}</Typography>
                          );
                        }}
                        MenuProps={MenuProps}
                        displayEmpty
                      >
                        {stateOptions?.map((data) => {
                          return (
                            <MenuItem
                              key={data}
                              value={data}
                              className={classes.menuItemColorStyle}
                            >
                              {data}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="h4"
                        className={classes.label}
                        sx={
                          {
                            // marginTop: "20px !important",
                          }
                        }
                      >
                        Country
                      </Typography>
                      <Select
                        className={classes.selectInputStyle}
                        value={values.country}
                        name="country"
                        onChange={(e: any) => handleSelectOption(e)}
                        renderValue={(selected) => {
                          if (!selected) {
                            return (
                              <span>
                                <Typography
                                  variant="h5"
                                  sx={{
                                    color: "#1A1A1A80 !important",
                                  }}
                                >
                                  Select Country
                                </Typography>
                              </span>
                            );
                          }
                          return (
                            <Typography variant="h5">{selected}</Typography>
                          );
                        }}
                        MenuProps={MenuProps}
                        displayEmpty
                      >
                        {countryOptions?.map((data) => {
                          return (
                            <MenuItem
                              key={data}
                              value={data}
                              className={classes.menuItemColorStyle}
                            >
                              {data}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h4" className={classes.label}>
                        Contact Number
                      </Typography>

                      <InputBase
                        value={values.contactNumber}
                        name="contactNumber"
                        fullWidth
                        placeholder="Enter Contact Number"
                        classes={{
                          root: classes.inputField,
                          input: classes.inputBoxText,
                          focused: classes.inputBoxActive,
                        }}
                        onChange={(e: any) => inputData(e)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="h4"
                        className={classes.label}
                        sx={
                          {
                            //   marginTop: "20px !important",
                          }
                        }
                      >
                        Fax Number
                      </Typography>
                      <InputBase
                        value={values.faxNumber}
                        name="faxNumber"
                        fullWidth
                        placeholder="Enter Fax Number"
                        classes={{
                          root: classes.inputField,
                          input: classes.inputBoxText,
                          focused: classes.inputBoxActive,
                        }}
                        onChange={(e: any) => inputData(e)}
                      />
                    </Grid>
                  </Grid>
                </DialogContentText>
                <Grid className={commonStyle.footer}>
                  <Grid className={commonStyle.footerBtn}>
                    <ButtonBase
                      sx={formButtonStyle.saveButtonStyle}
                      type="submit"
                    >
                      {title == "Add New Pharmacy"
                        ? "Save Pharmacy"
                        : title == "Add New Labs"
                        ? "Save Lab"
                        : " Save Radiology"}
                    </ButtonBase>
                  </Grid>
                </Grid>
              </DialogContent>
            </form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}

export default AddPreferences;
