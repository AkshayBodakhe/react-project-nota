import {
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import FormInput from "../../../../../../components/common/atom/FormInput";
import { formBottom, formButtonStyle } from "../../../../../../styles/common";
import { Formik, useFormik } from "formik";
import { FormInputs } from "../patient-form";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useAppDispatch, useAppSelector } from "../../../../../../store/hooks";
import { alertAction } from "../../../../../../store/features/common-actions/snackbar/alertSlice";
import { addEditAction } from "../../../../../../store/features/common-actions/forms/formSlice";
import {
  useContactDirectoryControllerServiceCreateContactDirectory,
  useDiagnosticCentresControllerServiceAddDiagnosticCenter,
  usePharmacyControllerServiceAddPharmacy,
} from "../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { States } from "../../../../../../components/common/form-enum";
import * as Yup from "yup";
import { ContactDirectory } from "../../../../../../sdk/thinkemr-core-0.0.1/requests";

type ModalProps = {
  title: string;
  onClose: (val: any) => void;
  providerGroupUuid: string | undefined;
};

const css = {
  modalTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
};

const PharmacyModal = (props: ModalProps) => {
  const response: any = useAppSelector(
    (state) => state.commonReducer.addEditReducer
  );

  const { title, onClose } = props;
  const dispatch = useAppDispatch();

  const initialValues = {
    active: true,
    name: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      country: "",
      zipcode: null,
    },
    faxNumber: "",
    contact: "",
    email:""
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required(`Please enter the ${title} name`)
      .matches(/^[a-zA-Z0-9\s]*$/, `Please enter the valid ${title} name`),
    address: Yup.object().shape({
      line1: Yup.string()
        .required("Please enter the address")
        .matches(/^[a-zA-Z0-9\s,/]*$/, "Please enter the valid address"),
      city: Yup.string()
        .required("Please enter the city name")
        .matches(/^[A-Za-z\s]+$/, "Please enter the valid city name"),
      state: Yup.string()
        .required("Please enter the state name")
        .matches(/^[A-Za-z\s]+$/, "Please enter the valid state name"),
      country: Yup.string()
        .required("Please enter the country name")
        .matches(/^[A-Za-z\s]+$/, "Please enter the valid country name"),
      // zipcode: Yup.mixed(),
      // //   .required("Please enter the zip code")
      // //   .matches(/^\d+$/, "Please enter the valid zip code"),
      // // .matches(/^[0-9]+$/, "Zip Code should contain only digits")
      // // .min(5, "Invalid Zip Code")
      // // .max(5, "Invalid Zip Code"),
    }),
    contact: Yup.string()
      .required("Please enter the contact number")
      .matches(/^\d+$/, "Please enter the valid contact number")
      .min(10, "Contact number should be at least 10 digits")
      .max(10, "Contact number should not exceed 10 digits"),
    // faxNumber: Yup.string().required("Please enter the valid fax number"),
    email: Yup.string().required("Please enter the email")      
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter the valid email"
    )
  });

  const { mutateAsync: addLabRadiology } =
    useDiagnosticCentresControllerServiceAddDiagnosticCenter();
  const { mutateAsync: addPharmacy } =
  useContactDirectoryControllerServiceCreateContactDirectory();

  useEffect(() => {
    if (response?.isError)
      dispatch(
        alertAction.setAlert({
          open: true,
          message: response.message,
          severity: "error",
        })
      );
    if (response?.isSuccess) {
      dispatch(
        alertAction.setAlert({
          open: true,
          message: response.message,
          severity: "success",
        })
      );
      handleClose();
    }
  }, [response]);

  const handleSubmit = (values: any) => {    
    if (values.address.zipcode === "") {
      values.address.zipcode = null;
    }
    values.providerGroupUuid = props?.providerGroupUuid;
    
    let contactType;
    switch (title) {
      case "Pharmacy":
        contactType = ContactDirectory.contactType.PHARMACY;
        break;
      case "Lab":
        contactType = ContactDirectory.contactType.LAB;
        break;
      case "Radiology":
        contactType = ContactDirectory.contactType.RADIOLOGY;
        break;
      default:
        break;
    }
    
    values.contactType = contactType;
  
    switch (contactType) {
      case ContactDirectory.contactType.PHARMACY:
        addPharmacy({ requestBody: values }).then((res:any) => {
          dispatch(
            alertAction.setAlert({
              open: true,
              message: res.message,
              severity: "success",
            })
          );
          onClose(title);
        });
        break;
      case ContactDirectory.contactType.LAB:
        addPharmacy({ requestBody: values }).then((res:any) => {
          dispatch(
            alertAction.setAlert({
              open: true,
              message: res.message,
              severity: "success",
            })
          );
          onClose(title);
        });
        break;
      case ContactDirectory.contactType.RADIOLOGY:
        addPharmacy({ requestBody: values }).then((res:any) => {
          dispatch(
            alertAction.setAlert({
              open: true,
              message: res.message,
              severity: "success",
            })
          );
          onClose(title);
        });
        break;
      default:
        break;
    }
  };
  

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const formInput: FormInputs[] = [
    {
      control: "",
      name: "name",
      label: `${title} Name`,
      placeholder: `Enter ${title} Name`,
      isRequired: true,
      xs: 12,
      value: formik.values.name,
      isError: !!(formik.touched.name && formik.errors.name),
      errorMsg: formik.errors.name || "",
    },
    {
      control: "",
      name: "address.line1",
      label: "Address",
      placeholder: "Enter Address",
      isRequired: true,
      xs: 6,
      value: formik.values.address.line1,
      isError: !!(
        formik.touched.address?.line1 && formik.errors.address?.line1
      ),
      errorMsg: formik.errors?.address?.line1 || "",
    },
    {
      control: "",
      name: "address.city",
      label: "City",
      placeholder: "Enter City",
      isRequired: true,
      xs: 6,
      value: formik.values.address.city,
      isError: !!(formik.touched.address?.city && formik.errors.address?.city),
      errorMsg: formik.errors?.address?.city || "",
    },
    {
      control: "",
      name: "address.zipcode",
      label: "Zip Code",
      placeholder: "Enter Zip Code",
      isRequired: false,
      xs: 6,
      value: formik.values.address.zipcode,
      // isError: !!(
      //   formik.touched.address?.zipcode && formik.errors.address?.zipcode
      // ),
      // errorMsg: formik.errors?.address?.zipcode || "",
    },
    {
      control: "",
      name: "address.state",
      label: "State",
      placeholder: "Select State",
      isRequired: true,
      xs: 6,
      value: formik.values.address.state,
      options: States,
      isError: !!(
        formik.touched.address?.state && formik.errors.address?.state
      ),
      errorMsg: formik.errors?.address?.state || "",
    },
    {
      control: "",
      name: "address.country",
      label: "Country",
      placeholder: "Select Country",
      isRequired: true,
      xs: 6,
      value: formik.values.address.country,
      isError: !!(
        formik.touched.address?.country && formik.errors.address?.country
      ),
      errorMsg: formik.errors?.address?.country || "",
    },
    {
      control: "",
      name: "contact",
      label: "Contact Number",
      placeholder: "Enter Contact Number",
      isRequired: true,
      xs: 6,
      value: formik.values.contact,
      isError: !!(formik.touched.contact && formik.errors.contact),
      errorMsg: formik.errors.contact || "",
    },
    {
      control: "",
      name: "faxNumber",
      label: "Fax Number",
      placeholder: "Enter Fax Number",
      isRequired: false,
      xs: 6,
      value: formik.values.faxNumber,
      isError: !!(formik.touched.faxNumber && formik.errors.faxNumber),
      errorMsg: formik.errors.faxNumber || "",
    },
    {
      control: "",
      name: "email",
      label: "Email",
      placeholder: "Enter Email",
      isRequired: true,
      xs: 6,
      value: formik.values.email,
      isError: !!(formik.touched.email && formik.errors.email),
      errorMsg: formik.errors.email || "",
    },
  ];

  const handleClose = () => {
    onClose("");
    dispatch(addEditAction.reset());
  };  
  return (
    <React.Fragment key={"PharmacyModal"}>
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle sx={css.modalTitle}>
          <Typography variant="h2">{`Add ${title}`}</Typography>
          <CloseOutlinedIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
        </DialogTitle>
        <DialogContent>
          <Grid container rowSpacing={2} spacing={2}>
            {formInput.map((input: FormInputs, i: number) => {
              return (
                <Grid item key={i} xs={input.xs}>
                  <FormInput
                    control={input.control}
                    name={input.name}
                    label={input.label}
                    value={input.value}
                    isError={input.isError}
                    error={input.errorMsg}
                    placeholder={input.placeholder}
                    isRequired={input.isRequired}
                    options={input.options}
                    onChange={formik.handleChange}
                  />
                </Grid>
              );
            })}
          </Grid>
        </DialogContent>
        <DialogActions sx={formBottom}>
          <ButtonBase
            type="submit"
            sx={formButtonStyle.saveButtonStyle}
            onClick={formik.submitForm}
          >
            {`Save ${title}`}
          </ButtonBase>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default PharmacyModal;
