import {
  Box,
  ButtonBase,
  FormHelperText,
  Grid,
  InputBase,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { formButtonStyle } from "../../../../../../../../../styles/common";
import providerGroupService from "../../../../../../../../../service/provider-group--service";
import { Enums } from "../../../../../../../admin/provider-groups/common-files/enums";
import { commonDepartmentWidget } from "../../../../../../../../../components/common/modal/department-modal";
import { FormBuilder, Formio } from "react-formio";
import { useCustomFormControllerServiceCreateCustomForm } from "../../../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { CustomFormRequest } from "../../../../../../../../../sdk/thinkemr-core-0.0.1/requests/models/CustomFormRequest";
import { useDispatch, useSelector } from "react-redux";
import { ErrorResponseEntity } from "../../../../../../../../../components/common/enums-and-interfaces/interfaces";
import { alertAction } from "../../../../../../../../../store/features/common-actions/snackbar/alertSlice";
import "./form-cutom.css";

interface FormValues {
  title: string;
  speciality: {
    id: number;
    name: string;
  };
}

interface customFormProps {
  handleClose?: any;
  setCustomSelection?: any;
  callingBack?: any;
}

const customBuilderOptions = {
  builder: {
    basic: {
      title: "Basic Components",
      default: true,
      components: {
        textfield: {
          title: "Text Field",
          key: "textfield",
          icon: "fa fa-font",
          schema: {
            label: "Text Field",
            type: "textfield",
            key: "textfield",
            input: true,
          },
        },
        radio: {
          title: "Radio",
          key: "radio",
          icon: "fa fa-dot-circle-o",
          schema: {
            label: "Radio",
            type: "radio",
            key: "radio",
            input: true,
            values: [
              { label: "Option 1", value: "option1" },
              { label: "Option 2", value: "option2" },
            ],
          },
        },
        select: {
          title: "Select",
          key: "select",
          icon: "fa fa-caret-square-o-down",
          schema: {
            label: "Select",
            type: "select",
            key: "select",
            input: true,
            data: {
              values: [
                { label: "Option 1", value: "option1" },
                { label: "Option 2", value: "option2" },
              ],
            },
          },
        },
        selectBoxes2: {
          title: "Select Boxes 2",
          key: "selectBoxes2",
          icon: "fa fa-check-square",
          schema: {
            label: "Select Boxes 2",
            type: "selectboxes",
            key: "selectBoxes2",
            input: true,
            values: [
              { label: "Option A", value: "OptionA" },
              { label: "Option B", value: "OptionB" },
              { label: "Option C", value: "OptionC" },
            ],
          },
        },
        checkbox: {
          title: "Checkbox",
          key: "checkbox",
          icon: "fa fa-check-square",
          schema: {
            label: "Checkbox",
            type: "checkbox",
            key: "checkbox",
            input: true,
            defaultValue: false,
          },
        },
      },
    },
    advanced: false,
    data: false,
    premium: false,
    layout: false,
  },
};

function CustomForm(props: customFormProps) {
  const { handleClose, setCustomSelection, callingBack } = props;
  const [initialValues] = useState<FormValues>({
    title: "",
    speciality: {
      id: 0,
      name: "",
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<Record<string, string | number>>({});
  const userDetails = useSelector(
    (state: any) => state.commonReducer.userDetail
  );
  const [providerGroupSpecialities, setProviderGroupSpecialities] = useState<
    any[]
  >([]);
  const [tenantId] = useState<any>(
    localStorage.getItem(Enums.PROVIDER_GROUP_KEY) || ""
  );
  const selectRef = useRef(null);
  const [specialitiesPagination, setSpecialitiesPagination] = useState({
    page: 0,
    size: 10,
  });
  const getAllSpecialities = async () => {
    await providerGroupService
      .getAllSpecialities(
        tenantId,
        specialitiesPagination.page,
        specialitiesPagination.size
      )
      .then((specialities: any) => {
        if (specialities?.data && specialities.data?.data) {
          setProviderGroupSpecialities(specialities.data.data.content);
        }
      });
  };
  const handleOnchangeForm = (e: Record<string, string | number>) => {
    setFormData(e);
  };

  useEffect(() =>
    // import "./form-cutom.css";
    {
      getAllSpecialities();
    }, [tenantId, specialitiesPagination.page, specialitiesPagination.size]);

  const classes = commonDepartmentWidget();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is a required field"),
    speciality: Yup.object().shape({
      name: Yup.string().required("Speciality is a required field"),
    }),
  });

  // console.log("formJson", formJson);
  const { mutateAsync, error, isError } =
    useCustomFormControllerServiceCreateCustomForm();

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    setSubmitting(true);
    // const formJson = JSON.stringify(formData);
    const requestBody = {
      title: values.title,
      speciality: values.speciality,
      content: formData,
      type: CustomFormRequest.type.INTAKE_FORM,
      providerGroupUuid: userDetails?.data?.providerGroup,
    };
    await mutateAsync({
      requestBody: requestBody as unknown as CustomFormRequest,
    }).then((res) => {
      setIsSubmitting(false);
      dispatch(
        alertAction.setAlert({
          open: true,
          message: res.message as any,
          severity: "success",
        })
      );
      callingBack();
      formik.resetForm();
      setFormData({});
      // setCustomSelection((item: any) => !item);
    });
    setSubmitting(false);
  };

  useEffect(() => {
    if ((error as ErrorResponseEntity)?.body.message)
      dispatch(
        alertAction.setAlert({
          open: true,
          message: (error as ErrorResponseEntity).body.message,
          severity: "error",
        })
      );
  }, [isError]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  async function handleMenuScroll(event: any) {
    const selectMenu: any = selectRef.current;
    const isNearBottom =
      event.target.scrollTop + event.target.clientHeight >=
      event.target.scrollHeight - 1;
    if (selectMenu && isNearBottom) {
      setSpecialitiesPagination((prev) => ({
        ...prev,
        size: specialitiesPagination.size + 100,
      }));
    }
  }

  const handleBack = () => {
    callingBack();
    setFormData({});
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: "flex", gap: "20px", padding: "20px 20px" }}>
          <Grid>
            <InputBase
              fullWidth
              placeholder="Enter name"
              value={formik.values.title}
              name="title"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={!!(formik.touched.title && formik.errors.title)}
              classes={{
                root: classes.providerFormShortInputField,
                input: classes.inputBoxText2,
                focused: classes.inputBoxActive2,
                error: classes.inputBoxError,
              }}
            />
            {formik.touched.title && formik.errors.title && (
              <FormHelperText error>{formik.errors.title}</FormHelperText>
            )}
          </Grid>
          <Grid width={"40%"}>
            <Select
              fullWidth
              displayEmpty
              value={formik.values.speciality}
              name="speciality"
              ref={selectRef}
              onScrollCapture={handleMenuScroll}
              size="small"
              error={!!(formik.touched.speciality && formik.errors.speciality)}
              onBlur={formik.handleBlur}
              // classes={{
              //   error: classes.inputBoxError,
              // }}
              onChange={formik.handleChange}
              // onChange={(e) =>
              //   Formik.setFieldValue("adminId", e.target.value)
              // }
              renderValue={(selected: any) => {
                if (selected.id === 0) {
                  return (
                    <span
                      style={{
                        fontSize: "14px",
                      }}
                    >
                      Select Specialities
                    </span>
                  );
                } else {
                  return `${selected.name}`;
                }
              }}
              sx={{
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
                ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
                  {
                    padding: "8px 14px",
                  },
              }}
              MenuProps={{
                PaperProps: { sx: { maxHeight: 300 } },
              }}
            >
              {providerGroupSpecialities &&
                providerGroupSpecialities?.map((data: any) => {
                  return (
                    <MenuItem key={data} value={data}>
                      {data.name}
                    </MenuItem>
                  );
                })}
            </Select>
            {formik.touched.speciality && formik.errors.speciality && (
              <FormHelperText error>
                {formik.errors.speciality.name}
              </FormHelperText>
            )}
          </Grid>
          <Grid container gap={1} justifyContent={"end"}>
            <ButtonBase
              onClick={handleBack}
              sx={formButtonStyle.saveButtonStyle}
            >
              {"Cancel"}
            </ButtonBase>
            <ButtonBase type="submit" sx={formButtonStyle.saveButtonStyle}>
              {"Add"}
            </ButtonBase>
          </Grid>
        </Box>
      </form>
      <Grid sx={{ padding: "20px 20px" }}>
        <FormBuilder
          form={formData}
          options={customBuilderOptions}
          onChange={handleOnchangeForm}
        />
        <Grid style={{ display: "none" }}>
          <Grid id="formformDataio-result" />
        </Grid>
      </Grid>
    </>
  );
}

export default CustomForm;
