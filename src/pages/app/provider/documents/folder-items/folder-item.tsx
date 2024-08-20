import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import {
  Box,
  ButtonBase,
  Dialog,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  InputBase,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { DropzoneArea } from "material-ui-dropzone";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Label from "../../../../../components/common/atom/Label";
import Loading from "../../../../../components/common/spinner/loading";
import AppLayout from "../../../../../components/core/layout/layout";
import {
  useDocumentControllerServiceDeleteDocument,
  useDocumentControllerServiceGetDocument,
} from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import providerGroupService from "../../../../../service/provider-group--service";
import { alertAction } from "../../../../../store/features/common-actions/snackbar/alertSlice";
import {
  ADD,
  ADD_ATTACHMENT,
  EDIT,
  OKAY,
  PROVIDER,
  TITLE,
  UPLOADED_SUCCESSFULLY,
  UPLOAD_FILE,
} from "../documents-constant/documents-common-const";
import {
  arrowBack,
  attachmentStyle,
  fileStyle,
  inputBase,
  inputStyle,
  uploadButtonStyle,
} from "../documents-widget/documents-common-widget";
import { DeleteDialog } from "../../../../../components/core/delete-dialog";

export const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is a required field!"),
  patientId: Yup.string(),
  documentFolder: Yup.string(),
  documentType: Yup.string(),
  requestBody: Yup.object({
    file: Yup.mixed().required("Document is required!"),
  }),
});

interface folderProps {
  folderId?: string;
  patientData?: any;
  folderName?: string;
}

export const getFileType = (file: any) => {
  // console.log("file", file.requestBody.file.type);

  if (file.requestBody.file.type === "image/jpeg") {
    return "JPEG_IMAGE";
  } else if (file.requestBody.file.type === "text/csv") {
    return "CSV";
  } else if (file.requestBody.file.type === "image/png") {
    return "PNG_IMAGE";
  } else if (file.requestBody.file.type === "image/svg+xml") {
    return "SVG_IMAGE";
  } else if (file.requestBody.file.type === "application/pdf") {
    return "PDF";
  } else if (file.requestBody.file.type === "application/docx") {
    return "MS_WORD";
  } else if (file.requestBody.file.type === "audio/mpeg") {
    return "MPEG_AUDIO";
  } else if (file.requestBody.file.type === "application/zip") {
    return "X_COMPRESSED";
  } else if (file.requestBody.file.type === "application/x-gzip-compressed") {
    return "X_GZIP";
  } else if (file.requestBody.file.type === "image/webp") {
    return "WEBP_IMAGE";
  } else if (file.requestBody.file.type === "text/plain") {
    return "PLAIN";
  } else {
    return "OTHER";
  }
};

function FolderItems(props: folderProps) {
  const { folderId, patientData, folderName } = props;
  const Navigate = useNavigate();
  const classes = inputBase();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [source, setSource] = useState("");
  const handleBack = () => {
    // Navigate(-1);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };
  const handleAddFile = () => {
    setOpenDialog((prev) => !prev);
    setSource(ADD);
  };
  const [documentsPayload, setDocumentsPayload] = useState<any[]>();
  const dispatch = useDispatch();

  const userDetails = useSelector(
    (state: any) => state.commonReducer.userDetail
  );
  const location = useLocation();
  // const folderId = location.state.folderId;
  const providerGroupUuid = (userDetails?.data?.providerGroup as string) || "";
  // const patientData = location.state.patientData;

  const [itemKey, setItemKey] = useState();
  const [itemUuid, setItemUuid] = useState();

  const initialVal = {
    title: "",
    patientId: "",
    documentFolder: "",
    documentType: "",
    requestBody: {
      file: {} as Blob,
    },
  };

  const { data, refetch, isLoading } = useDocumentControllerServiceGetDocument({
    patientId: patientData.uuid,
    documentFolder: folderId as any,
  });

  useEffect(() => {
    if (data) {
      const documents = (data.data as any).content;
      setDocumentsPayload(documents);
    }
  }, [data, isLoading]);

  const handleSubmit = (values: any) => {
    // if (!fileDetails) return;

    const docType = getFileType(values);
    const formData = new FormData();
    formData.append("file", values.requestBody.file);
    formData.append("patientId", patientData?.uuid);
    formData.append("documentFolder", folderId as any);
    formData.append("title", values.title);
    formData.append("documentType", docType);
    // formData.append("documentType", values.requestBody.file.documentType);
    try {
      providerGroupService.uploadDocument(formData);
      setSource(EDIT);
      refetch();
      formik.resetForm();
    } catch (_error) {
      dispatch(
        alertAction.setAlert({
          open: true,
          message: "Something went to wrong",
          severity: "error",
        })
      );
      setSource(EDIT);
    }
  };

  const formik = useFormik({
    initialValues: initialVal,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const {
    isSuccess,
    isError,
    mutateAsync: deleteDocument,
  } = useDocumentControllerServiceDeleteDocument(itemUuid);

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        alertAction.setAlert({
          open: true,
          message: "File deleted successfully",
          severity: "success",
        })
      );
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      dispatch(
        alertAction.setAlert({
          open: true,
          message: "Something went wrong!",
          severity: "error",
        })
      );
    }
  }, [isError]);

  const handleDownload = (item: any) => {
    window.open(item, "_blank");
    handleClose();
  };

  const handleDelete = async () => {
    if (itemUuid) {
      await deleteDocument({ uuid: itemUuid as unknown as string });
      handleClose();
      refetch();
    }
    handleCloseDeleteDialog();
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box>
        <Grid py={3} px={2}>
          <Typography variant="h3" fontWeight={"500"}>
            {folderName}
          </Typography>
        </Grid>
        <Grid container width={"100%"} gap={4} bgcolor={"white"} p={2}>
          {/* <Box>
          <ArrowBackIcon onClick={handleBack} sx={arrowBack} />
        </Box> */}
          <Box
            width={"140px"}
            height={"120px"}
            onClick={handleAddFile}
            sx={attachmentStyle}
          >
            <Grid container justifyContent={"center"} mt={1}>
              <AttachFileIcon sx={{ fontSize: "60px", color: "#737373" }} />
            </Grid>
            <Grid container justifyContent={"center"} mt={1}>
              <Typography>{ADD_ATTACHMENT}</Typography>
            </Grid>
          </Box>
          <Box display={"flex"} gap={3}>
            {documentsPayload?.map((item: any) => {
              // return <Box>{getFileType(item.key)}</Box>;
              return (
                // <Box onClick={() => handleDownload(item.key)}>
                <Box
                  onClick={(event: any) => {
                    handleClick(event),
                      setItemKey(item.key),
                      setItemUuid(item.uuid);
                  }}
                >
                  <InsertDriveFileOutlinedIcon sx={fileStyle} />
                  <Grid container justifyContent={"center"}>
                    <Typography fontSize={"15px"} fontWeight={"600"}>
                      {item.title}
                    </Typography>
                  </Grid>
                </Box>
              );
            })}
          </Box>
          {isLoading && <Loading />}
        </Grid>
        <Grid>
          <Dialog
            open={openDialog}
            onClose={handleAddFile}
            scroll={"paper"}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            maxWidth="xs"
            fullWidth
          >
            {source === ADD && (
              <DialogTitle id="scroll-dialog-title">
                <Grid container justifyContent={"space-between"}>
                  <Typography fontSize={"20px"} fontWeight={"500"}>
                    {UPLOAD_FILE}
                  </Typography>
                  <CloseIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      handleAddFile(), formik.resetForm();
                    }}
                  />
                </Grid>
              </DialogTitle>
            )}
            {source === ADD && (
              <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                  <Grid>
                    <Label label={TITLE} isRequired={true} />
                    <InputBase
                      fullWidth
                      className="popper-area"
                      placeholder="Enter title"
                      name="title"
                      value={formik.values.title}
                      sx={inputStyle}
                      onBlur={formik.handleBlur}
                      error={!!(formik.errors.title && formik.touched.title)}
                      // onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      //   setInputValue(e)
                      // }
                      onChange={formik.handleChange}
                    />
                    {formik.errors.title && formik.touched.title && (
                      <FormHelperText error>
                        {formik.errors.title}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid container justifyContent={"center"} my={3}>
                    <DropzoneArea
                      filesLimit={1}
                      showPreviewsInDropzone={true}
                      // onChange={(files: File[]) => {
                      //   if (files.length > 0) {
                      //     setFileDetails(files[0]);
                      //   }
                      // }}
                      showFileNames
                      onChange={(files) =>
                        formik.setFieldValue("requestBody.file", files[0])
                      }
                      dropzoneText="Click here to upload from Back Side Drag & Drop files Or Browse Files"
                      classes={{
                        root: classes.dropZone,
                        icon: classes.uploadIcon,
                        text: classes.textUploadZone,
                      }}
                    />
                    {formik.errors.requestBody &&
                      formik.touched.requestBody && (
                        <FormHelperText error>
                          {formik.errors.requestBody?.file as any}
                        </FormHelperText>
                      )}
                  </Grid>
                  <Grid mt={2}>
                    <ButtonBase
                      // onClick={handleSubmit}
                      // fullWidth
                      type="submit"
                      sx={uploadButtonStyle}
                    >
                      <Typography color={"#fff"}>{UPLOAD_FILE}</Typography>
                    </ButtonBase>
                  </Grid>
                </DialogContent>
              </form>
            )}
            {source === EDIT && (
              <DialogContent>
                <Grid sx={{ px: 6, py: 6 }} container justifyContent={"center"}>
                  <Typography fontSize={"20px"} fontWeight={"600"}>
                    {UPLOADED_SUCCESSFULLY}
                  </Typography>
                </Grid>
                <Grid mt={2}>
                  <ButtonBase
                    sx={uploadButtonStyle}
                    onClick={() => {
                      setOpenDialog((prev) => !prev);
                      refetch();
                    }}
                  >
                    <Typography color={"#fff"}>{OKAY}</Typography>
                  </ButtonBase>
                </Grid>
              </DialogContent>
            )}
          </Dialog>
        </Grid>
        <Grid>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => handleDownload(itemKey || "")}>
              Download
            </MenuItem>

            <MenuItem onClick={() => handleOpenDeleteDialog()}>Delete</MenuItem>
          </Menu>
        </Grid>
      </Box>
      <DeleteDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onEventSuccessModalOpen={handleDelete}
        title={"Delete Document"}
        message={"this document"}
      />
    </>
  );
}
export default FolderItems;
