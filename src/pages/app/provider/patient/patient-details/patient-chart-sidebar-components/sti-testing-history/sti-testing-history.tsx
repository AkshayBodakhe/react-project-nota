import {
  Box,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  InputBase,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  actionBtns,
  commonWidget,
  formButtonStyle,
} from "../../../../../../../styles/common";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import {
  ADD_STI,
  ADD_STI_DIALOG_TITLE,
  ADD_TITLE_BUTTON,
  Column,
  NOTE,
  STI_TESTING_AND_HISTORY,
  TITLE,
  TYPE_HERE_PLACEHOLDER,
  columns,
} from "../adherence-to-treatment/common-const";
import CustomFormLabel from "../../../../../../../components/common/custom-form-label";
import { CarePatientChart } from "../../../../../../../sdk/thinkemr-core-0.0.1/requests";
import {
  useCarePatientChartControllerServiceCreateCarePatientChart,
  useCarePatientChartControllerServiceGetAllCarePatientChart,
} from "../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import Loading from "../../../../../../../components/common/spinner/loading";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PaginationState } from "../../../../../../../components/common/enums-and-interfaces/interfaces";
import CustomPagination from "../../../../../../../components/common/pagination";
import { alertAction } from "../../../../../../../store/features/common-actions/snackbar/alertSlice";
import { useDispatch } from "react-redux";
import moment from "moment";

interface PatientData {
  patientData: any;
}
function STITestingAndHistory(props: PatientData) {
  const classes = commonWidget();
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();

  const [initialValues] = useState({
    uuid: "",
    name: "",
    description: "",
    carePatientChartingType:
      CarePatientChart.carePatientChartingType.STI_TESTING_AND_HISTORY,
    archive: false,
    patientUuid: props.patientData.uuid,
  });
  const [pagination, setPagination] = useState<PaginationState>({
    page: 0,
    size: 10,
    sortBy: "created",
    sortDirection: "desc",
    searchString: "",
    status: true,
    totalPages: 0,
    totalElements: 0,
  });
  const [stitestingHistory, setStitestingHistory] = useState([]);
  const validationSchema = Yup.object().shape({
    // name:Yup.string()
    //   .required('Please enter name'),
    description: Yup.string().required("Please enter the note"),
  });
  const { data, isLoading, isError, refetch } =
    useCarePatientChartControllerServiceGetAllCarePatientChart({
      patientUuid: props.patientData.uuid,
      carePatientChartingType:
        CarePatientChart.carePatientChartingType.STI_TESTING_AND_HISTORY,
      page: pagination.page,
      size: pagination.size,
      sort: ["created,desc"],
    });
  const {
    mutate: createCarePatientChartMutate,
    data: createCarePatientChartData,
    isError: createCarePatientChartError,
    isSuccess,
  } = useCarePatientChartControllerServiceCreateCarePatientChart();

  useEffect(() => {
    if (data?.data) {
      const newRows = data.data.content?.map((data: any) => {
        return {
          id: data.id,
          uuid: data.uuid,
          date: data.date || "-",
          name: data.name || "-",
          description: data.description || "-",
          providerName: data.providerName || "-",
          patientUuid: data.patientUuid,
        };
      });
      setStitestingHistory(newRows);
      setPagination((prev) => ({
        ...prev,
        totalPages: data.data?.totalPages,
        totalElements: data.data?.totalElements,
      }));
    }
  }, [data?.data, openDialog]);

  const resetFormValues = () => {
    formik.resetForm();
  };
  const handleSubmit = async (values: any) => {
    handleDialog();
    try {
      createCarePatientChartMutate({ requestBody: values });
      resetFormValues();
      await refetch();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  useEffect(() => {
    refetch();
  }, [isSuccess, openDialog]);

  useEffect(() => {
    if (isSuccess && createCarePatientChartData) {
      dispatch(
        alertAction.setAlert({
          open: true,
          message: createCarePatientChartData.message as any,
          severity: "success",
        })
      );
    }
  }, [isSuccess, createCarePatientChartData, dispatch, refetch]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const handleDialog = () => {
    setOpenDialog((item) => !item);
  };
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box p={1}>
          <Grid
            py={0.5}
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="h4" fontWeight={"600"}>
              {STI_TESTING_AND_HISTORY}
            </Typography>
            <ButtonBase
              sx={{
                ...formButtonStyle.mainButtonStyle,
                height: "40px !important",
                display: "flex",
                gap: "5px",
              }}
              onClick={handleDialog}
            >
              <AddIcon sx={{ fontSize: "18px" }} />
              <Typography>{ADD_STI}</Typography>
            </ButtonBase>
          </Grid>
          <Grid py={1}>
            <TableContainer
              sx={{
                maxHeight: `${"460px"} !important`,
                overflowY: "auto !important",
              }}
            >
              <Table stickyHeader aria-label="sticky table">
                <TableHead key={"TableHead"}>
                  <TableRow className={classes.tableHeadRowContainer}>
                    {columns.map((col: Column) => {
                      return (
                        <TableCell
                          key={col.id}
                          align={col.align ?? "left"}
                          sx={{ minWidth: col.minWidth }}
                        >
                          {col.displaySort ? (
                            <Typography className="table-head-column">
                              <span>{col.label}</span>
                            </Typography>
                          ) : (
                            <Typography fontWeight={"600"}>
                              {col.label}
                            </Typography>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stitestingHistory &&
                    !isLoading &&
                    stitestingHistory.map((row: any, index: any) => {
                      return (
                        <TableRow
                          key={index}
                          className={classes.tableHeadRowContainer}
                        >
                          <TableCell>
                            {moment(row.date).format("MM-DD-YYYY HH:mm")}
                          </TableCell>
                          <TableCell>{row.providerName}</TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.description}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            {isLoading && <Loading />}
            {stitestingHistory.length === 0 && !isLoading && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  padding: "4% 0",
                }}
              >
                No Data Available
              </div>
            )}
            <CustomPagination
              pagination={pagination}
              setPagination={setPagination}
            />
          </Grid>
        </Box>
        <Box>
          <Dialog
            maxWidth="sm"
            fullWidth={true}
            onClose={handleDialog}
            open={openDialog}
          >
            <DialogTitle>
              <Grid container alignItems={"center"}>
                <Grid
                  item
                  xs={11}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Typography>{ADD_STI_DIALOG_TITLE}</Typography>
                </Grid>

                <Grid
                  item
                  xs={1}
                  sx={{ display: "flex", justifyContent: "end" }}
                >
                  <ButtonBase
                    onClick={() => {
                      resetFormValues();
                      handleDialog();
                    }}
                  >
                    <CloseIcon />
                  </ButtonBase>
                </Grid>
              </Grid>
            </DialogTitle>
            <DialogContent>
              <Grid mx={2} pb={3} pt={1}>
                <Box mb={1.5}>
                  <CustomFormLabel label={TITLE} />
                </Box>
                <InputBase
                  fullWidth
                  placeholder="Enter the Title"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  //error={!!(formik.errors.name && formik.touched.name)}
                  // value={formikData.values.name}
                  // onBlur={formikData.handleBlur}
                  // onChange={formikData.handleChange}
                  // error={!!(formikData.touched.name && formikData.errors.name)}
                  classes={{
                    root: classes.textFieldRoot,
                    input: classes.textFieldInput,
                    focused: classes.textFieldActive,
                    error: classes.inputBoxError,
                  }}
                />
                {/* {formik.touched.name && formik.errors.name && (
                    <FormHelperText error>
                      {formik.errors.name}
                    </FormHelperText>
                )} */}
                {/* {formikData.touched.name && formikData.errors.name && (
                  <FormHelperText error>{formikData.errors.name}</FormHelperText>
                )} */}
              </Grid>
              <Grid mx={2}>
                <Box mb={1.5}>
                  <CustomFormLabel label={NOTE} isRequired={true} />
                </Box>
                <InputBase
                  fullWidth
                  multiline={true}
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={
                    !!(formik.errors.description && formik.touched.description)
                  }
                  // value={formik.values.providerProfileInfo.experience}
                  rows="5"
                  placeholder={TYPE_HERE_PLACEHOLDER}
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
                {formik.touched.description && formik.errors.description && (
                  <FormHelperText error>
                    {formik.errors.description}
                  </FormHelperText>
                )}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Grid sx={actionBtns} p={1}>
                <ButtonBase
                  onClick={() => {
                    resetFormValues();
                    handleDialog();
                  }}
                  sx={formButtonStyle.cancelButtonStyle}
                >
                  Cancel
                </ButtonBase>
                <ButtonBase
                  // onClick={addSpecilityOption}
                  //   onClick={formikData.submitForm}
                  sx={formButtonStyle.saveButtonStyle}
                  onClick={() => {
                    formik.submitForm();
                  }}
                >
                  {ADD_TITLE_BUTTON}
                </ButtonBase>
              </Grid>
            </DialogActions>
          </Dialog>
        </Box>
      </form>
    </>
  );
}

export default STITestingAndHistory;
