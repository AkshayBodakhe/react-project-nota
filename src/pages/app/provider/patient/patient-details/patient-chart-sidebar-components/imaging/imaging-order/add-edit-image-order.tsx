import {
  Autocomplete,
  Box,
  ButtonBase,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  InputBase,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { style } from "../../../../../referral/style/common-style";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import { patientStyle } from "../../../../style/commonStyle";
import { styleUI } from "../../../../../appointment/availability/edit-availability";
import { multiSelectDropDown } from "../../problems/add-edit-problem";
import { formButtonStyle } from "../../../../../../../../styles/common";
import { PatientImageOrder } from "../../../../../../../../sdk/thinkemr-core-0.0.1/requests";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import {
  useMedicalCodeControllerServiceGetAllMedicalCodes,
  useProviderControllerServiceGetAllProviders,
  useUserControllerServiceGetUsers,
} from "../../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";

export interface DialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
  patientData: any;
}
function AddEditOrder(props: DialogProps) {
  const { onClose, open, title } = props;
  const commonStyle = style();
  const classes = patientStyle();
  const UIStyle = styleUI();
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
  const [initialValues, setInitialValues] = useState<any>({
    imagingCenterForOrders: "",
    Instructions: "",
    billingType: "",
    orderDiagnosis: "",
    orderStudies: "",
    selectPrimaryProvider: "",
    selectOrdinaryProvider: "",
    chartNote: "",
    showCalender: null,
    checkOptions: [] as string[],
  });
  const [imageCenter] = useState<any>(null);
  const [orderDiagnosis, setOrderDiagnosis] = useState<any>(null);
  const checkOption = [
    "Routine Channels",
    "Fax Prelim To Office",
    "Patient Is Pregnant",
    "Pt Back w/Film",
    "Pt Home If Negative",
  ];
  const [primaryprovider, setPrimaryProvider] = useState<any>(null);
  const [, setPrimaryProviderObject] = useState<any>(null);
  const [ordinaryProvider, setOrdinaryProvider] = useState<any>(null);
  const [, setOrderingroviderObject] = useState<any>(null);
  const [orderStudies] = useState<any>(null);
  const [chartNote, setChartNote] = useState<any>(null);
  const [selectedBillingType, setSelectedBillingType] = useState("PATIENT");
  const [billingType, setBillingType] = useState<any>(null);
  const [, setTime] = useState<any>(null);

  const providerDetail = useSelector(
    (state: any) => state.commonReducer?.userDetail?.data
  );
  const providerGroupUuid = providerDetail?.providerGroup;
  // const [date] = useState<any>(null);

  const { data, isSuccess: getICD } =
    useMedicalCodeControllerServiceGetAllMedicalCodes({ codeType: "ICD" });

  const Pageable = {
    page: 0,
    size: 100,
  };

  const { data: ProviderData, isSuccess: getProviderData } =
    useProviderControllerServiceGetAllProviders({
      providerGroupUuid,
      searchBy: "",
      sourceId: undefined,
      ...Pageable,
    });

  // const {mutateAsync , isSuccess } = usePatientImageOrderControllerServiceAddImageOrderSet();
  // const {mutateAsync : addOrder , isSuccess : orderSuccess} = usePatientImageOrderControllerServiceAddPatientImageOrder();

  const pageable = {
    page: 0,
    size: 100,
  };

  const { data: userList, isSuccess: getUserList } =
    useUserControllerServiceGetUsers({
      ...pageable,
    });

  useEffect(() => {
    if (getUserList && !!userList) {
      setOrdinaryProvider(userList?.data?.content);
    }
  }, [getUserList]);

  useEffect(() => {
    if (getProviderData && !!ProviderData) {
      setPrimaryProvider(ProviderData?.data?.content);
    }
  }, [getProviderData]);

  useEffect(() => {
    if (getICD && !!data) {
      setOrderDiagnosis(data?.data?.content);
    }
  }, [getICD]);

  useEffect(() => {
    const billingValues = Object.values(
      PatientImageOrder.billTypes
    ) as string[];
    setBillingType(billingValues);
    const chartValues = Object.values(PatientImageOrder.chartNote) as string[];
    setChartNote(chartValues);
  }, []);

  const handleSelectOption = (e: any) => {
    const { name, value } = e.target;
    setInitialValues((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFormSubmit = () => {
    // const requestBody = {
    //   patient: {
    //     uuid: patientData.uuid,
    //   },
    //   imageCentres: {
    //     name: "maging Centres - 1234",
    //   },
    //   orderDiagnosesIcdCode: "test icd",
    //   routineChannels: getPrivacyValues("Routine Channels"),
    //   faxPrelimToOffice: getPrivacyValues("Fax Prelim To Office"),
    //   patientIsPregnant: getPrivacyValues("Patient Is Pregnant"),
    //   ptBackWFilm: getPrivacyValues("Pt Back w/Film"),
    //   ptHomeNegative: getPrivacyValues("Pt Home If Negative"),
    //   instructions: values.Instructions,
    //   billTypes: selectedBillingType,
    //   primaryProvider: primaryProviderObject,
    //   orderingProvider: orderingProviderObject,
    //   chartNote: values.chartNote,
    //   status: PatientImageOrder.status.DRAFT,
    // };
  };
  const handleSelect = (_value: any, _name: any) => {};

  const selectOption = (data: string) => {
    setSelectedBillingType(data);
  };

  const inputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInitialValues((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const sxs = {
    activeSwitch: {
      border: "1px solid #36588C",
      borderRadius: "20px",
      padding: "5px 10px",
      color: "#36588C",
    },
    inActiveSwitch: { padding: "5px 10px" },
  };

  const handleCheckboxChange = (itemId: string) => {
    setInitialValues((prevValues: any) => {
      const newCheckboxes: string[] = [...prevValues.checkOptions];
      if (newCheckboxes.includes(itemId)) {
        const index = newCheckboxes.indexOf(itemId);
        newCheckboxes.splice(index, 1);
      } else {
        newCheckboxes.push(itemId);
      }
      return {
        ...prevValues,
        checkOptions: newCheckboxes,
      };
    });
  };

  // const getPrivacyValues = (item: string) => {
  //   return initialValues.checkOptions.some((element: any) => element === item);
  // };

  const handleChangeprovider = (event: any) => {
    const { name } = event.target;
    if (name == "selectOrdinaryProvider") {
      if (Array.isArray(ordinaryProvider)) {
        ordinaryProvider.forEach((element: any) => {
          if (element.id == event.target.value) {
            // setProviderUUID(element.uuid);
            const providerName = `${element.firstName || ""} ${
              element.lastName || ""
            }`;
            setOrderingroviderObject({
              id: element.id,
              uuid: element.uuid,
            });
            setInitialValues((prevData: any) => ({
              ...prevData,
              [name]: providerName,
            }));
          }
        });
      }
    } else {
      if (Array.isArray(primaryprovider)) {
        primaryprovider.forEach((element: any) => {
          if (element.id == event.target.value) {
            // setProviderUUID(element.uuid);
            const providerName = `${element.firstName || ""} ${
              element.lastName || ""
            }`;
            setPrimaryProviderObject({
              id: element.id,
              uuid: element.uuid,
            });
            setInitialValues((prevData: any) => ({
              ...prevData,
              [name]: providerName,
            }));
          }
        });
      }
    }
  };

  const handleTimeChange = (time: any) => {
    setTime(time);
  };

  const handleDateChange = (_date: any) => {};

  return (
    <div>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ padding: "15px 15px 1px " }}>
          <Grid className={commonStyle.dialogTitle}>
            <Grid>
              <Typography
                variant="h4"
                style={{ fontWeight: "bold", color: "#1A1A1A" }}
              >
                {title}
              </Typography>
            </Grid>
            <Grid style={{ cursor: "pointer" }}>
              <CloseIcon onClick={() => onClose()} />
            </Grid>
          </Grid>
        </DialogTitle>
        <Formik
          initialValues={initialValues}
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
                <Grid container spacing={2} alignItems={"center"}>
                  <Grid item xs={6}>
                    <Typography variant="h4" className={classes.label}>
                      Imaging Center For Order
                    </Typography>
                    <Select
                      className={classes.selectInputStyle}
                      value={values.imagingCenterForOrders}
                      name="imagingCenterForOrders"
                      onChange={(e: any) => handleSelectOption(e)}
                      renderValue={(selected) => {
                        if (!selected) {
                          return (
                            <span>
                              <Typography
                                variant="h5"
                                sx={{ color: "#1A1A1A7F !important" }}
                              >
                                Search Imaging Center For Order
                              </Typography>
                            </span>
                          );
                        }
                        return <Typography variant="h5">{selected}</Typography>;
                      }}
                      MenuProps={MenuProps}
                      displayEmpty
                    >
                      {imageCenter?.map((data: any) => {
                        return (
                          <MenuItem
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
                    <Grid item xs={12}>
                      <Typography variant="h4" className={classes.label}>
                        Bill Type
                      </Typography>
                    </Grid>
                    <Grid
                      xs={12}
                      className={UIStyle.switchContainer}
                      sx={{
                        marginTop: "10px",
                        alignItems: "center !important",
                      }}
                    >
                      {billingType?.map((data: any) => (
                        <ButtonBase
                          key={data}
                          onClick={() => selectOption(data)}
                          sx={
                            selectedBillingType === data
                              ? sxs.activeSwitch
                              : sxs.inActiveSwitch
                          }
                        >
                          <Typography variant="h4">
                            {" "}
                            {data.charAt(0).toUpperCase() +
                              data.slice(1).toLowerCase()}
                          </Typography>
                        </ButtonBase>
                      ))}
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      container
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Typography variant="h4" className={classes.label}>
                        Order Studies
                      </Typography>
                    </Grid>

                    <Autocomplete
                      sx={multiSelectDropDown}
                      multiple={false}
                      id="tags-standard"
                      options={orderStudies || []}
                      getOptionLabel={(option: any) => option.name}
                      onChange={(value) => handleSelect(value, "Order Studies")}
                      disableCloseOnSelect
                      renderOption={(props, option) => (
                        <MenuItem
                          key={option.id}
                          value={option}
                          sx={{ justifyContent: "space-between" }}
                          {...props}
                        >
                          {option.name}
                        </MenuItem>
                      )}
                      renderInput={(params) => (
                        <TextField
                          classes={{ root: classes.customTextField }}
                          {...params}
                          variant="outlined"
                          placeholder="Search and Select Order Study"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      container
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Typography variant="h4" className={classes.label}>
                        Order Diagnoses
                      </Typography>
                    </Grid>

                    <Autocomplete
                      sx={multiSelectDropDown}
                      multiple={false}
                      id="tags-standard"
                      options={orderDiagnosis || []}
                      getOptionLabel={(option: any) => option.name}
                      onChange={(value) =>
                        handleSelect(value, "Order Diagnoses")
                      }
                      disableCloseOnSelect
                      renderOption={(props, option) => (
                        <MenuItem
                          key={option.id}
                          value={option}
                          sx={{ justifyContent: "space-between" }}
                          {...props}
                        >
                          {option.name}
                        </MenuItem>
                      )}
                      renderInput={(params) => (
                        <TextField
                          classes={{ root: classes.customTextField }}
                          {...params}
                          variant="outlined"
                          placeholder="Search and Select Order Diagnoses"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {" "}
                    <Typography variant="h4" className={classes.label}>
                      Instructions
                    </Typography>
                    <InputBase
                      value={values.Instructions}
                      name="Instructions"
                      fullWidth
                      placeholder="Imaging instructions to test center"
                      classes={{
                        root: classes.inputField,
                        input: classes.inputBoxText,
                        focused: classes.inputBoxActive,
                      }}
                      onChange={(e: any) => inputData(e)}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ display: "flex", flexWrap: "wrap" }}>
                    {checkOption.map((item) => {
                      return (
                        <Grid item key={item} className={classes.checkBoxItem}>
                          <Checkbox
                            //   classes={{
                            //     checked: classes.checkBoxColor,
                            //     root: classes.checkBoxColor,
                            //   }}
                            checked={values.checkOptions.includes(item)}
                            onChange={() => handleCheckboxChange(item)}
                          />
                          <Typography
                            variant="h4"
                            className={classes.checkBoxText}
                          >
                            {item}
                          </Typography>
                        </Grid>
                      );
                    })}
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h4" className={classes.label}>
                      Collection Date & Time
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ paddingTop: "0px !important" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          position: "relative",
                          marginTop: "10px !important",
                          // boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                        }}
                      >
                        <DatePicker
                          onChange={(date) => handleDateChange(date)}
                          value={values.showCalender}
                          slotProps={{
                            textField: { size: "small" },
                          }}
                        />
                      </Box>
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={6} sx={{ paddingTop: "0px !important" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer
                        components={["TimePicker", "TimePicker"]}
                        sx={{ paddingTop: "10px !important" }}
                      >
                        <TimePicker
                          ampm={false}
                          minutesStep={5}
                          slotProps={{
                            textField: { size: "small" },
                          }}
                          onChange={handleTimeChange}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="h4" className={classes.label}>
                      Primary Provider
                    </Typography>
                    <Select
                      className={classes.selectInputStyle}
                      sx={{
                        height: "37px !important",
                        width: "250px !important",
                      }}
                      value={values.selectPrimaryProvider}
                      name="selectPrimaryProvider"
                      onChange={(e: any) => handleChangeprovider(e)}
                      renderValue={(selected) => {
                        if (!selected || selected.length === 0) {
                          return (
                            <span>
                              <Typography
                                variant="h5"
                                sx={{
                                  color: "#1A1A1A80 !important",
                                }}
                              >
                                Select Provider
                              </Typography>
                            </span>
                          );
                        }
                        return <Typography variant="h5">{selected}</Typography>;
                      }}
                      MenuProps={MenuProps}
                      displayEmpty
                    >
                      {primaryprovider?.map((data: any) => {
                        return (
                          <MenuItem
                            key={data.id}
                            value={data.id}
                            className={classes.menuItemColorStyle}
                          >
                            {data.firstName} {data.lastName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h4" className={classes.label}>
                      Ordering Provider
                    </Typography>
                    <Select
                      className={classes.selectInputStyle}
                      sx={{
                        height: "37px !important",
                        width: "250px !important",
                      }}
                      value={values.selectOrdinaryProvider}
                      name="selectOrdinaryProvider"
                      onChange={(e: any) => handleChangeprovider(e)}
                      renderValue={(selected) => {
                        if (!selected || selected.length === 0) {
                          return (
                            <span>
                              <Typography
                                variant="h5"
                                sx={{
                                  color: "#1A1A1A80 !important",
                                }}
                              >
                                Select Provider
                              </Typography>
                            </span>
                          );
                        }
                        return <Typography variant="h5">{selected}</Typography>;
                      }}
                      MenuProps={MenuProps}
                      displayEmpty
                    >
                      {ordinaryProvider?.map((data: any) => {
                        return (
                          <MenuItem
                            key={data.id}
                            value={data.id}
                            className={classes.menuItemColorStyle}
                          >
                            {data.firstName} {data.lastName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h4" className={classes.label}>
                      Chart Note
                    </Typography>
                    <Select
                      className={classes.selectInputStyle}
                      value={values.chartNote}
                      name="chartNote"
                      onChange={(e: any) => handleSelectOption(e)}
                      renderValue={(selected) => {
                        if (!selected) {
                          return (
                            <span>
                              <Typography
                                variant="h5"
                                sx={{ color: "#1A1A1A7F !important" }}
                              >
                                Select a Chart Note
                              </Typography>
                            </span>
                          );
                        }
                        return <Typography variant="h5">{selected}</Typography>;
                      }}
                      MenuProps={MenuProps}
                      displayEmpty
                    >
                      {chartNote?.map((data: any) => {
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
                  <Grid item xs={12} className={classes.buttonContainer} mt={2}>
                    <ButtonBase
                      sx={{
                        border: "2px solid #1A1A1A26",
                        borderRadius: "5px",
                        opacity: 1,
                        width: "26%",
                        background: "#1A1A1A0D",
                      }}
                    >
                      Save as Order Set
                    </ButtonBase>
                    <ButtonBase sx={formButtonStyle.cancelButtonStyle}>
                      print & Close
                    </ButtonBase>
                    <ButtonBase
                      sx={formButtonStyle.saveButtonStyle}
                      type="submit"
                    >
                      Order
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

export default AddEditOrder;
