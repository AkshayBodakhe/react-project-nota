import CloseIcon from "@mui/icons-material/Close";
import {
  ButtonBase,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormHelperText,
  Grid,
  InputBase,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import {
  usePatientControllerServiceGetPatients,
  useProviderControllerServiceGetAllProviders,
  useTasksControllerServiceCreateTask,
  useTasksControllerServiceUpdateTask,
} from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import { OpenTask } from "../../../../../sdk/thinkemr-core-0.0.1/requests";
import { commonWidget, formButtonStyle } from "../../../../../styles/common";
import { style } from "../../referral/style/common-style";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { alertAction } from "../../../../../store/features/common-actions/snackbar/alertSlice";
import { handleKeyPress } from "../../../../../components/common/enums-and-interfaces/common-functions";
import CustomFormLabel from "../../../../../components/common/custom-form-label";

interface Props {
  title: string;
  onClose: () => void;
  open: boolean;
  refetch: () => {};
  editTaskData?: any;
  providerGroupUuid: string;
}

function AddEditTask(props: Props) {
  const { onClose, open, title, refetch, editTaskData, providerGroupUuid } = props;
  const classes = commonWidget();
  const commonStyle = style();
  const dispatch = useDispatch();
  const [taskType, setTaskType] = useState<any>(null);
  const [statusList, setStatusList] = useState<any>(null);
  const [priorityList, setpriorityList] = useState<any>(null);
  const [patientList, setPatientList] = useState<any>(null);
  const [providerList, setProviderList] = useState<any>(null);

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

  const validationSchema = yup.object().shape({
    task: yup.mixed(),
    taskTitle: yup.string().required("Please enter the title"),
    patientName: yup.object().shape({
      name: yup.mixed(),
    }),
    assignTo: yup.object().shape({
      name: yup.string().required("Please select the assignee"),
    }),
    dueDate: yup
      .date()
      .required("Please enter the due date")
      .nullable()
      .test(
        "notPastDate",
        "Please enter the valid due date",
        function (value: any) {
          if (value.toDateString() === new Date().toDateString()) return true;
          return Date.parse(value) >= Date.now();
        }
      ),
    status: yup.string().required("Please select the status"),
    priority: yup.string().required("Please select the priority"),
    note: yup.mixed(),
  });

  const initialVal = {
    task: "",
    taskTitle: "",
    patientName: {
      id: "",
      name: "",
    },
    assignTo: {
      id: "",
      name: "",
    },
    dueDate: "",
    status: title == "Add Task" ? "OPEN" : "",
    priority: "",
    note: "",
  };

  const [initialValues, setInitailValues] = useState({ ...initialVal });
  const { mutateAsync, isSuccess } = useTasksControllerServiceCreateTask();
  const { mutateAsync: editTask, isSuccess: edit } = useTasksControllerServiceUpdateTask();

  const { data, isSuccess: getPatient } =
    usePatientControllerServiceGetPatients({
      page: 0,
      size: 20,
      sortBy: "",
      sortDirection: "",
      searchString: "",
      providerGroupUuid,
    });

  const { data: providerData, isSuccess: getProvider } =
    useProviderControllerServiceGetAllProviders({
      providerGroupUuid,
      page: 0,
      size: 100,
      searchBy: "",
      sourceId: undefined,
    });

  useEffect(() => {
    if (getProvider && !!providerData) {
      setProviderList(providerData?.data?.content);
    }
  }, [getProvider]);

  useEffect(() => {
    // const taskType = Object.values(OpenTask.) as string[];
    // setTaskType(taskType);
    const status = Object.values(OpenTask.status) as string[];
    setStatusList(status);
    const priority = Object.values(OpenTask.priority) as string[];
    setpriorityList(priority);
  }, []);

  useEffect(() => {
    if (isSuccess || edit) {
      refetch();
      onClose();
    }
  }, [isSuccess, edit]);

  useEffect(() => {
    if (getPatient && !!data) {
      setPatientList(data?.data?.content);
    }
  }, [getPatient]);

  useEffect(() => {
    if (editTaskData) {
      setInitailValues((prevValues) => ({
        ...prevValues,
        task: editTaskData.type,
        taskTitle: editTaskData.title,
        patientName: {
          id: editTaskData?.patientName?.id,
          name: editTaskData?.patientName?.name,
        },
        assignTo: {
          id: editTaskData.assignTo?.id,
          name: editTaskData.assignTo?.name,
        },
        dueDate: formattedDate(editTaskData.due),
        status: editTaskData.status,
        priority: editTaskData.priority,
        note: editTaskData.note,
      }));
    }
  }, [editTaskData]);

  const handleSelectOption = (e: any, name: string) => {
    let obj = e.target.value;
    if (name == "patientName") {
      setInitailValues((prevValues) => ({
        ...prevValues,
        patientName: {
          id: obj.uuid,
          name: `${obj?.legalFirstName} ${obj?.legalLastName}`,
        },
      }));
    } else {
      setInitailValues((prevValues) => ({
        ...prevValues,
        assignTo: {
          id: obj.uuid,
          name: `${obj?.firstName} ${obj?.lastName}`,
        },
      }));
    }
  };

  const changeDate = (date: any) => {
    let date1 = new Date(date);
    setInitailValues((prevValues) => ({
      ...prevValues,
      dueDate: formattedDate(date1),
    }));
  };

  const close = () => {
    onClose();
  };

  const formattedDate = (inputDateString: any) => {
    const inputDate = new Date(inputDateString);

    const formattedDate = `${inputDate.getFullYear()}-${(
      inputDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${inputDate.getDate().toString().padStart(2, "0")}`;

    return formattedDate;
  };

  const handleFormSubmit = (values: any) => {
    let payload: any = {
      uuid: editTaskData?.uuid || "",
      taskType: values.task,
      taskTitle: values.taskTitle,
      patient: {
        uuid: values?.patientName?.id,
      },
      assignedTO: {
        uuid: values?.assignTo?.id,
      },
      dueDate: values.dueDate,
      status: values.status,
      priority: values.priority,
      note: values?.note,
      providerGroupUuid,
    };
    if (title == "Add Task") {
      try {
        mutateAsync({ requestBody: payload })
          .then((res: any) => {
            dispatch(
              alertAction.setAlert({
                open: true,
                message: res.message,
                severity: "success",
              })
            );
          })
          .catch((error) => {
            dispatch(
              alertAction.setAlert({
                open: true,
                message: error.body.message,
                severity: "error",
              })
            );
          });
      } catch (error: any) {
        dispatch(
          alertAction.setAlert({
            open: true,
            message: error.body.message,
            severity: "error",
          })
        );
      }
    } else {
      try {
        editTask({ requestBody: payload })
          .then((res: any) => {
            dispatch(
              alertAction.setAlert({
                open: true,
                message: res.message,
                severity: "success",
              })
            );
          })
          .catch((error) => {
            dispatch(
              alertAction.setAlert({
                open: true,
                message: error.body.message,
                severity: "error",
              })
            );
          });
      } catch (error: any) {
        dispatch(
          alertAction.setAlert({
            open: true,
            message: error.body.message,
            severity: "error",
          })
        );
      }
    }
  };

  return (
    <Formik
      onSubmit={(values) => {
        handleFormSubmit(values);
      }}
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize={true}
    >
      {({ values, errors, touched, submitForm, handleBlur }) => {
        return (
          <Form>
            <Dialog onClose={onClose} open={open} fullWidth maxWidth="md">
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
              <DialogContent>
                <DialogContentText
                  id="scroll-dialog-description"
                  // ref={descriptionElementRef}
                  tabIndex={-1}
                >
                  <Grid container spacing={2}>
                    {/* <Grid item xs={6}>
                      <CustomFormLabel label="Task Type" isRequired={true} />
                      <Select
                        className={[
                          commonStyle.selectInputStyle,
                          errors.task ? classes.inputBoxError : "",
                        ].join(" ")}
                        value={values.task}
                        name="task"
                        onChange={(e: any) =>
                          setInitailValues((prevValues) => ({
                            ...prevValues,
                            task: e.target.value,
                          }))
                        }
                        readOnly={
                          title === "Review Task" || title === "Edit Task"
                        }
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
                                  Select Type
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
                        {taskType?.map((data: any) => {
                          return (
                            <MenuItem
                              value={data}
                              className={commonStyle.menuItemColorStyle}
                            >
                              {data}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {!!touched.task && !!errors.task && (
                        <FormHelperText error>{errors?.task}</FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={6}></Grid> */}
                    <Grid item xs={12}>
                      <CustomFormLabel
                        label="Task Type / Task Title"
                        isRequired={true}
                      />
                      <InputBase
                        type="text"
                        placeholder="Enter Task Title"
                        name="taskTitle"
                        onChange={(e) =>
                          setInitailValues((prevValues) => ({
                            ...prevValues,
                            taskTitle: e.target.value,
                          }))
                        }
                        onKeyPress={(e: any) => {
                          handleKeyPress(e);
                        }}
                        readOnly={
                          title === "Review Task" || title === "Edit Task"
                        }
                        error={!!touched.taskTitle && !!errors.taskTitle}
                        value={values.taskTitle}
                        onBlur={handleBlur}
                        style={{ width: "100%" }}
                        classes={{
                          root: classes.textFieldFullWidth,
                          input: classes.textFieldInput,
                          focused: classes.textFieldActive,
                          error: classes.inputBoxError,
                        }}
                      />
                      {!!touched.taskTitle && !!errors.taskTitle && (
                        <FormHelperText error>
                          {errors?.taskTitle}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      <CustomFormLabel label="Patient Name" />
                      <Select
                        className={[
                          commonStyle.selectInputStyle,
                          errors.patientName?.name ? classes.inputBoxError : "",
                        ].join(" ")}
                        value={values.patientName.name}
                        name="patientName"
                        onChange={(e: any) =>
                          handleSelectOption(e, "patientName")
                        }
                        readOnly={
                          title === "Review Task" 
                        }
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
                                  Select Type
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
                        {patientList?.map((data: any) => {
                          return (
                            <MenuItem
                              value={data}
                              className={commonStyle.menuItemColorStyle}
                            >
                              {data.legalFirstName} {data.legalLastName}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {touched.patientName && errors.patientName && (
                        <FormHelperText error>
                          {errors.patientName.name}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      <CustomFormLabel label="Assign To" isRequired={true} />
                      <Select
                        className={[
                          commonStyle.selectInputStyle,
                          errors.assignTo?.name ? classes.inputBoxError : "",
                        ].join(" ")}
                        value={values.assignTo.name}
                        name="assignTo"
                        readOnly={
                          title === "Review Task" || title === "Edit Task"
                        }
                        onChange={(e: any) => handleSelectOption(e, "assignTo")}
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
                                  Select Type
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
                        {providerList &&
                          providerList
                            .filter((item: any) => item?.active)
                            ?.map((data: any) => {
                              return (
                                <MenuItem
                                  key={data.uuid}
                                  value={data}
                                  className={commonStyle.menuItemColorStyle}
                                >
                                  {data.firstName} {data.lastName}
                                </MenuItem>
                              );
                            })}
                      </Select>
                      {touched.assignTo && errors.assignTo && (
                        <FormHelperText error>
                          {errors.assignTo.name}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      <CustomFormLabel label="Due Date" isRequired={true} />
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          onChange={(date) => changeDate(date)}
                          value={values.dueDate ? dayjs(values.dueDate) : null}
                          disablePast
                          slotProps={{
                            textField: { size: "small" },
                          }}
                          readOnly={
                            title === "Review Task" || title === "Edit Task"
                          }
                          sx={{
                            width: "100%",
                            "& fieldset": { border: "none" },
                            boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                            "& label": {
                              color: "#1A1A1A80 !important",
                              fontSize: "14px !important",
                            },
                            "& .MuiInputBase-root": {
                              height: "42px",
                              fontSize: "14px",
                              // color: "#1A1A1A7F !important",
                              border: errors.dueDate ? "0px solid red" : "",
                              borderRadius: "5px",
                            },
                          }}
                        />
                      </LocalizationProvider>
                      {touched.dueDate && errors.dueDate && (
                        <FormHelperText error>{errors.dueDate}</FormHelperText>
                      )}
                    </Grid>
                    {title !== "Add Task" && (
                      <Grid item xs={6}>
                        <CustomFormLabel label="Status" isRequired={true} />
                        <Select
                          className={[
                            commonStyle.selectInputStyle,
                            errors.status ? classes.inputBoxError : "",
                          ].join(" ")}
                          value={values.status}
                          name="status"
                          disabled={title == "Add Task" ? true : false}
                          onChange={(e: any) =>
                            setInitailValues((prevValues) => ({
                              ...prevValues,
                              status: e.target.value,
                            }))
                          }
                          readOnly={title === "Review Task"}
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
                                    Select Status
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
                          {statusList?.map((data: any) => {
                            return (
                              <MenuItem
                                value={data}
                                className={commonStyle.menuItemColorStyle}
                              >
                                {data}
                              </MenuItem>
                            );
                          })}
                        </Select>
                        {touched.status && errors.status && (
                          <FormHelperText error>{errors.status}</FormHelperText>
                        )}
                      </Grid>
                    )}
                    <Grid item xs={6}>
                      <CustomFormLabel label="Priority" isRequired={true} />
                      <Select
                        className={[
                          commonStyle.selectInputStyle,
                          errors.priority ? classes.inputBoxError : "",
                        ].join(" ")}
                        value={values.priority}
                        name="priority"
                        readOnly={
                          title === "Review Task" || title === "Edit Task"
                        }
                        onChange={(e: any) =>
                          setInitailValues((prevValues) => ({
                            ...prevValues,
                            priority: e.target.value,
                          }))
                        }
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
                                  Select Priority
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
                        {priorityList?.map((data: any) => {
                          return (
                            <MenuItem
                              value={data}
                              className={commonStyle.menuItemColorStyle}
                            >
                              {data}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {touched.priority && errors.priority && (
                        <FormHelperText error>{errors.priority}</FormHelperText>
                      )}
                    </Grid>
                    <Grid xs={12} ml={2} mt={2}>
                      <CustomFormLabel label={"Note"} />
                      {/* <InputBase
                        name={"note"}
                        value={values?.note}
                        onBlur={handleBlur}
                        rows="5"
                        fullWidth
                        placeholder="Note"
                        classes={{
                          root: classes.inputField,
                          input: classes.inputBoxText,
                          focused: classes.inputBoxActive,
                        }}
                      /> */}
                      <InputBase
                        fullWidth
                        multiline={true}
                        name="note"
                        //name="providerProfileInfo.experience"
                        // value={formik.values.providerProfileInfo.experience}
                        readOnly={title === "Review Task"}
                        value={values.note}
                        rows="5"
                        placeholder={"Notes"}
                        onBlur={handleBlur}
                        onChange={(e) =>
                          setInitailValues((prevValues) => ({
                            ...prevValues,
                            note: e.target.value,
                          }))
                        }
                        // value={values?.note}
                        // error={
                        //   !!(
                        //     formik.errors.description &&
                        //     formik.touched.description
                        //   )
                        // }
                        classes={{
                          root: classes.providerTextAreaField,
                          input: classes.textFieldInput,
                          focused: classes.textFieldActive,
                          error: classes.inputBoxError,
                        }}
                        // onBlur={formik.handleBlur}
                        // onChange={formik.handleChange}
                        // error={
                        //   !!(
                        //     formik.touched.providerProfileInfo?.experience &&
                        //     formik.errors.providerProfileInfo?.experience
                        //   )
                        // }
                        // onChange={(e) => formik.setFieldValue("providerProfileInfo.experience", e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </DialogContentText>
                <Grid className={commonStyle.footer}>
                  <Grid className={commonStyle.footerBtn}>
                    <ButtonBase
                      onClick={close}
                      sx={formButtonStyle.cancelButtonStyle}
                    >
                      Cancel
                    </ButtonBase>
                    {title != "Review Task" && (
                      <ButtonBase
                        sx={formButtonStyle.saveButtonStyle}
                        // type="submit"
                        onClick={submitForm}
                      >
                        {title == "Add Task" ? "Add" : "Save"}
                      </ButtonBase>
                    )}
                  </Grid>
                </Grid>
              </DialogContent>
            </Dialog>
          </Form>
        );
      }}
    </Formik>
  );
}

export default AddEditTask;
