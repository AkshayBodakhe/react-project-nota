import React, { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import placeBlack from "../../../../../assets/icon/place_black_24dp (2).svg";
import callBlack from "../../../../../assets/icon/call_black_24dp (1).svg";
import faxBlack from "../../../../../assets/icon/fax_black_24dp.svg";
import FormInput from "../../../../../components/common/atom/FormInput";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import PharmacyModal from "./preferences-form";
import { FormInputs } from "./patient-form";
import { Props } from "./privacy";
import {
  useContactDirectoryControllerServiceGetAllContactDirectory,
  useDiagnosticCentresControllerServiceListDiagnosticCenter,
  usePharmacyControllerServiceGetPharmacyForProviderGroup,
} from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import { useSelector } from "react-redux";
import { ContactDirectory } from "../../../../../sdk/thinkemr-core-0.0.1/requests";

// interface CustomPreferencesProp {
//     address?: React.ReactNode;
//     phone?: React.ReactNode;
//     fax?: React.ReactNode;
// }

const sxs = {
  addBtn: {
    padding: 0,
    fontSize: "13px",
    textTransform: "none",
  },
};

const Preferences = (props: Props) => {
  const {
    formik: { values, setFieldValue, setFieldTouched, errors, touched },
    setIsValid,
    isSubmitting,
  } = props;

  const { preferredPharmacy, preferredLab, preferredRadiology } = values;

  const [pharmacyList, setPharmacyList] = useState<any[]>([]);
  const [radiologyList, setRadiologyList] = useState<any[]>([]);
  const [labList, setLabList] = useState<any[]>([]);
  const [preferencesData, setPreferencesData] = useState<any[]>([]);
  const [modal, setModal] = useState({
    open: false,
    formType: "",
  });
  const providerDetail = useSelector(
    (state: any) => state.commonReducer?.userDetail?.data
  );
  const providerGroupUuid = providerDetail?.providerGroup || "";
  const {
    data: pharmacyData,
    isLoading: isPharmacyLoading,
    isError: isPharmacyError,
    refetch: refetchPharmacyData,
  } = useContactDirectoryControllerServiceGetAllContactDirectory({
    providerGroupUuid,
    contactType:ContactDirectory.contactType.PHARMACY
  });

  const {
    data: radiologyData,
    isLoading: isRadiologyLoading,
    isError: isRadiologyError,
    refetch: refetchRadiologyData,
  } = useContactDirectoryControllerServiceGetAllContactDirectory({
    providerGroupUuid,
    contactType:ContactDirectory.contactType.RADIOLOGY
  });

  const {
    data: labData,
    isLoading: isLabLoading,
    isError: isLabError,
    refetch: refetchLabData,
  } = useContactDirectoryControllerServiceGetAllContactDirectory({
    providerGroupUuid,
    contactType:ContactDirectory.contactType.LAB
  });

  useEffect(() => {
    if (!isPharmacyError && pharmacyData?.data) {
      setPharmacyList(pharmacyData.data.content);
    }
  }, [isPharmacyLoading, pharmacyData?.data]);

  useEffect(() => {
    if (!isRadiologyError && radiologyData?.data) {
      setRadiologyList(radiologyData.data.content);
    }
  }, [isRadiologyLoading, radiologyData?.data]);

  useEffect(() => {
    if (!isLabError && labData?.data) {
      setLabList(labData.data.content);
    }
  }, [isLabLoading, labData?.data]);

  useEffect(() => {
    setPreferencesData([...radiologyList, ...pharmacyList, ...labList]);
  }, [radiologyList?.length, pharmacyList?.length, labList?.length]);

  useEffect(() => {
    if (isSubmitting) {
      setFieldTouched("");
      setIsValid(true);
    }
  }, [isSubmitting]);

  const formInput: FormInputs[] = [
    {
      control: "autocomplete",
      name: "preferredPharmacy",
      label: "Pharmacy",
      placeholder: "Search & Select Pharmacy",
      isRequired: true,
      xs: 12,
      mapBy: "name",
      value: preferredPharmacy,
      data: pharmacyList,
    },
    {
      control: "autocomplete",
      name: "preferredLab",
      label: "Lab",
      placeholder: "Search & Select Lab",
      isRequired: true,
      xs: 6,
      mapBy: "name",
      value: preferredLab,
      data: labList,
    },
    {
      control: "autocomplete",
      name: "preferredRadiology",
      label: "Radiology",
      placeholder: "Search & Select Radiology",
      isRequired: true,
      xs: 6,
      mapBy: "name",
      value: preferredRadiology,
      data: radiologyList,
    },
  ];

  const handleAdd = (formType: string) => {
    setModal(() => ({ open: true, formType: formType }));
  };

  const handleModalClose = (val: string) => {
    setModal({ open: false, formType: "" });
    switch (val) {
      case "Pharmacy":
        refetchPharmacyData();
        break;
      case "Lab":
        refetchLabData();
        break;
      case "Radiology":
        refetchRadiologyData();
        break;
      default:
        break;
    }
  };

  const handleChange = (event: any) => {
    setFieldValue(`${event.target.name}`, event.target?.value || "");
  };

  return (
    <React.Fragment key={"Preferences"}>
      <Grid container rowSpacing={2}>
        <Grid item container spacing={2}>
          {formInput.map((input: FormInputs, index: number) => {
            return (
              <Grid item key={index} xs={4}>
                <Grid container>
                  <Grid item xs={9}>
                    {input.label}
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      sx={sxs.addBtn}
                      onClick={() => handleAdd(input.label)}
                      startIcon={<AddOutlinedIcon />}
                    >
                      Add New
                    </Button>
                  </Grid>
                </Grid>
                <FormInput
                  control={input.control}
                  name={input.name}
                  value={input.value || ""}
                  mapBy={input.mapBy}
                  height="40px"
                  placeholder={input.placeholder}
                  options={input.options}
                  data={input.data}
                  onChange={handleChange}
                />
              </Grid>
            );
          })}
        </Grid>
        <Grid item xs={12} sx={{display:"flex"}}>
          <Grid item xs={4}>
            {pharmacyList.length !== 0 &&
              pharmacyList.map((res, i) => {
                return (
                  <Grid item key={i} container spacing={2} xs={12} mt={1}>
                    <Grid item>
                      <Typography variant="h4" sx={{ fontWeight: 600 }}>
                        {res.name}
                      </Typography>
                    </Grid>
                    <Grid item container>
                      <Grid item sx={{ mr: 1 }}>
                        <img src={placeBlack} alt="Icon" />
                      </Grid>
                      <Grid item>
                        <Typography>
                          {`
                                        ${res.address.line1}, 
                                        ${res.address.line2} 
                                        ${res.address.city}
                                        ${res.address.state},
                                        ${res.address.country}
                                    `}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item container>
                      <Grid item sx={{ mr: 1 }}>
                        <img src={callBlack} alt="Icon" />
                      </Grid>
                      <Grid item>
                        <Typography>{res.contactNumber}</Typography>
                      </Grid>
                    </Grid>
                    <Grid item container>
                      <Grid item sx={{ mr: 1 }}>
                        <img src={faxBlack} alt="Icon" />
                      </Grid>
                      <Grid item>
                        <Typography>Fax - {res.faxNumber}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
          </Grid>
          <Grid item xs={4}>
            {labList.length !== 0 &&
              labList.map((res, i) => {
                return (
                  <Grid item key={i} container spacing={2} xs={12} mt={1}>
                    <Grid item>
                      <Typography variant="h4" sx={{ fontWeight: 600 }}>
                        {res.name}
                      </Typography>
                    </Grid>
                    <Grid item container>
                      <Grid item sx={{ mr: 1 }}>
                        <img src={placeBlack} alt="Icon" />
                      </Grid>
                      <Grid item>
                        <Typography>
                          {`
                                        ${res.address.line1}, 
                                        ${res.address.line2} 
                                        ${res.address.city}
                                        ${res.address.state},
                                        ${res.address.country}
                                    `}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item container>
                      <Grid item sx={{ mr: 1 }}>
                        <img src={callBlack} alt="Icon" />
                      </Grid>
                      <Grid item>
                        <Typography>{res.contactNumber}</Typography>
                      </Grid>
                    </Grid>
                    <Grid item container>
                      <Grid item sx={{ mr: 1 }}>
                        <img src={faxBlack} alt="Icon" />
                      </Grid>
                      <Grid item>
                        <Typography>Fax - {res.faxNumber}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
          </Grid>
          <Grid item xs={4}>
            {radiologyList.length !== 0 &&
              radiologyList.map((res, i) => {
                return (
                  <Grid item key={i} container spacing={2} xs={12} mt={1}>
                    <Grid item>
                      <Typography variant="h4" sx={{ fontWeight: 600 }}>
                        {res.name}
                      </Typography>
                    </Grid>
                    <Grid item container>
                      <Grid item sx={{ mr: 1 }}>
                        <img src={placeBlack} alt="Icon" />
                      </Grid>
                      <Grid item>
                        <Typography>
                          {`
                                        ${res.address.line1}, 
                                        ${res.address.line2} 
                                        ${res.address.city}
                                        ${res.address.state},
                                        ${res.address.country}
                                    `}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item container>
                      <Grid item sx={{ mr: 1 }}>
                        <img src={callBlack} alt="Icon" />
                      </Grid>
                      <Grid item>
                        <Typography>{res.contactNumber || res.contact}</Typography>
                      </Grid>
                    </Grid>
                    <Grid item container>
                      <Grid item sx={{ mr: 1 }}>
                        <img src={faxBlack} alt="Icon" />
                      </Grid>
                      <Grid item>
                        <Typography>Fax - {res.faxNumber}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      </Grid>
      {modal.open && (
        <PharmacyModal
          title={modal.formType}
          onClose={handleModalClose}
          providerGroupUuid={providerGroupUuid}
          // formik={formik}
        />
      )}
    </React.Fragment>
  );
};

export default Preferences;
