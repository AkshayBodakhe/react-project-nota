import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { ButtonBase, Dialog, DialogActions, DialogContent, DialogTitle, Grid, InputBase, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { adminConstants } from "../../../../../../../../../constants/admin";
import { useDocumentTypeControllerServiceAddDocumentType, useDocumentTypeControllerServiceGetAllDocumentType, useDocumentTypeControllerServiceUpdateDocumentType } from "../../../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { DocumentTypeControllerService } from "../../../../../../../../../sdk/thinkemr-core-0.0.1/requests";
import { alertAction } from "../../../../../../../../../store/features/common-actions/snackbar/alertSlice";
import { commonWidget, formButtonStyle, formTitle, getCustomStyle } from "../../../../../../../../../styles/common";
import { tableStyle } from "../../../allergies/allergies-list";
import { DialogFormProps } from "../../../enums-interfaces/interfaces";

const DialogWidth = {
    ".css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
        maxWidth: "700px !important",
    },
};

const cols = [
    { id: 'type', label: 'Type', minWidth: 400 },
    { id: 'action', label: '', minWidth: 100 }
]

const { ADD, CANCEL, EDIT } = adminConstants;

function ManageDocumentTypeForm(props: DialogFormProps) {
    const dispatch = useDispatch();
    const classes = tableStyle();
    const commonStyle = commonWidget();
    const { open, onClose, patientData, title, editData } = props;
    const [documentName, setDocumentName] = useState<string>('');
    const [tableData, setTableData] = useState<any[]>([]);
    const [initialValues ,setInitailValues] = useState({
        uuid:"",
        type:""
    });

    const { isSuccess, data, refetch} = useDocumentTypeControllerServiceGetAllDocumentType({});
    const { mutateAsync } = initialValues.uuid != '' ? useDocumentTypeControllerServiceUpdateDocumentType() : useDocumentTypeControllerServiceAddDocumentType();

    useEffect(()=>{
        if(isSuccess && !!data){
            setTableData(data?.data?.content)
        }
    },[isSuccess,data]);

    useEffect(() => {
        // setTableData([]);
    }, [patientData])

    const deleteType = async (document:any) =>{
      const data =  await DocumentTypeControllerService.deleteDocumentType(document?.uuid).then(() => {
        refetch();
      });
    }

    const handleSubmit = (values: any) => {
        try {
            mutateAsync({ requestBody: values })
              .then((res: any) => {
                refetch();
                formik.resetForm();
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

    const handleAddType = () => {
        if (documentName && !tableData.some((res) => res.value == documentName)) {
            const newType = { key: tableData.length + 1, value: documentName };
            setTableData((prev) => ([...prev, newType]))
        }
        setDocumentName('');
    }

    const handleDeletType = (index: any) => {
        const newArray = [...tableData];
        newArray.splice(index, 1);
        setTableData(newArray);
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: handleSubmit
    });

    const handleEditGroup = (document:any) => {
        setInitailValues(prevValues => ({
            ...prevValues,
            uuid: document.uuid,
            type: document.type
        }));
        formik.setFieldValue('type', document.type);
        formik.setFieldValue('uuid', document.uuid);
    }

    return (
        <>
            <Dialog open={open} onClose={onClose} sx={DialogWidth}>
                <DialogTitle
                    id="scroll-dialog-title"
                    sx={{ marginBottom: "15px", }}
                >
                   <Grid container alignItems={"center"}>
                  <Grid item xs={11}>
                    <Typography sx={formTitle}>{title}</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={1}
                    sx={{ display: "flex", justifyContent: "end" }}
                  >
                    <ButtonBase onClick={onClose}>
                      <CloseIcon />
                    </ButtonBase>
                  </Grid>
                </Grid>
                </DialogTitle>
                <DialogContent>
                    <form action="">
                        <Grid container spacing={2}>
                            <Grid item lg={12}>
                                <TableContainer>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow className={commonStyle.tableHeadRowContainer}>
                                                {cols.map((column: any) => (
                                                    <TableCell
                                                        key={column.id}
                                                        className={classes.tableHeader}
                                                        align={getCustomStyle(column.id, 'type') ? 'left' : 'center'}
                                                        style={{
                                                            padding: "10px",
                                                            minWidth: column.minWidth,
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="h4"
                                                            className={classes.tableHeaderText}
                                                        >
                                                            {column.label}
                                                        </Typography>
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {tableData && tableData.map((document: any) => {
                                                return (
                                                    <TableRow
                                                        hover
                                                        role="checkbox"
                                                        tabIndex={-1}
                                                        key={document?.id}
                                                    >
                                                        {cols.map((col: any) => {
                                                            if (col.id === 'action') {
                                                                return (
                                                                    <TableCell
                                                                        key={col.id}
                                                                        sx={{ display: 'flex', justifyContent: 'space-around',cursor:"pointer" }}
                                                                        align={getCustomStyle(col.id, 'type') ? 'left' : 'center'}
                                                                    >
                                                                        <ModeEditOutlineOutlinedIcon
                                                                        onClick={() => handleEditGroup(document)} 
                                                                        />
                                                                        <DeleteOutlineOutlinedIcon sx={{color:"red"}}
                                                                            onClick={() => deleteType(document)}
                                                                        />
                                                                    </TableCell>
                                                                )
                                                            } else {
                                                                return (
                                                                    <TableCell
                                                                        key={col.id}
                                                                        align={getCustomStyle(col.id, 'type') ? 'left' : 'center'}
                                                                    >
                                                                        {document.type}
                                                                    </TableCell>
                                                                )
                                                            }
                                                        })}
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                    {tableData?.length === 0 && (
                                        <div className={commonStyle.noDataMsg}>No Data Available</div>
                                    )}
                                </TableContainer>
                            </Grid>
                            {/* <Grid item lg={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <ButtonBase
                                    onClick={handleAddType}
                                    sx={{ display: 'flex', color: '#1B5984', fontWeight: '700 !important', cursor: 'pointer' }}
                                >
                                    <span>
                                        <AddIcon />
                                    </span>
                                    <Typography variant="h4" >Add Type</Typography>
                                </ButtonBase>
                            </Grid> */}
                            <Grid item lg={12} mt={2}>
                                <Typography variant="h5" className={classes.label}>
                                    Type Name
                                </Typography>
                                <InputBase
                                    fullWidth
                                    name="type"
                                    placeholder="Enter Name"
                                    value={formik.values.type}
                                    classes={{
                                        root: commonStyle.textFieldFullWidth,
                                        input: commonStyle.textFieldInput,
                                        focused: commonStyle.textFieldActive,
                                    }}
                                    onChange={(e) => formik.setFieldValue('type',e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    {/* <ButtonBase onClick={onClose} sx={formButtonStyle.cancelButtonStyle}>
                        {CANCEL}
                    </ButtonBase> */}
                    <ButtonBase sx={formButtonStyle.saveButtonStyle} onClick={formik.submitForm} >{editData ? EDIT : ADD}</ButtonBase>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ManageDocumentTypeForm;