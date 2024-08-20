/* eslint-disable @typescript-eslint/no-explicit-any */
import CloseIcon from "@mui/icons-material/Close";
import {
  ButtonBase,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DropzoneArea } from "material-ui-dropzone";
import * as React from "react";
import { useEffect } from "react";
import { adminConstants } from "../../../../../constants/admin";
import {
  useMigrationControllerServiceUploadFile,
  useProviderGroupControllerServiceGetAllProviderGroups
} from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import { customImageContainer } from "../../../../../styles/common";
export const uploadStyle = makeStyles(() => ({
  customImageContainer: {
    position: "relative",
    "& 	.MuiDropzonePreviewList-root": {
      display: "flex",
      justifyContent: "center",
    },
    "& .MuiDropzonePreviewList-image": {},
    "& 	.MuiDropzonePreviewList-imageContainer": {
      padding: "32px 0px",
    },
    "& 	.MuiTypography-body1": {
      marginBottom: "10px",
    },
  },
  dropZone: {
    minHeight: "150px !important",
  },
  uploadIcon: {
    fill: "#1A1A1A66",
  },
  textUploadZone: {
    color: "#1A1A1A",
    fontSize: "12px !important",
  },
  uploadHeader: {
    display: "flex !important",
    justifyContent: "center !important",
    width: "90%",
  },
  closeButton: {
    display: "flex",
    justifyContent: "flex-end",
    width: "10%",
    cursor:"pointer"
  },
  gridStyle: {
    marginTop: "15px !important",
  },
  typographyBold: {
    marginBottom: "5px !important",
  },
  gridItemMargin: {
    marginTop: "5px !important",
    marginBottom: "10px !important",
  },
  dropDownControl: {
    margin: 0,
    width: "-webkit-fill-available",
  },
  dropSelect: {
    fontSize: "14px !important",
    // color: "#1A1A1A80 !important",
    margin: "5px 0px !important",
    height: "30px !important",
  },
  dropSelect2: {
    fontSize: "14px !important",
    color: "#1A1A1A80 !important",
    margin: "5px 0px !important",
    height: "20px !important",
  },
  menuItem: {
    fontSize: "14px !important",
  },
}));
export const uploadButton = {
  fontFamily: "Roboto, sans-serif !important",
  backgroundColor: "#36588C",
  height: "42px",
  fontSize: "14px",
  color: "#ffffff",
  borderRadius: "4px",
  marginTop: "15px",
  width: "-webkit-fill-available",
  // "&:hover": {
  //   fill: "#36588C",
  //   cursor: "pointer",
  // },
};
export const modalSubTitle = {
  fontWeight: "bold !important",
};
type UploadComponentProps = {
  onClose: () => void;
  category: any;
};

function UploadComponent({ onClose, category }: UploadComponentProps) {
  const { UPLOAD, PROIVDER_GROUP_NAME, SUPPORTED_FORMAT } = adminConstants;
  const uploadClasses = uploadStyle();
  const [providerGroupName, setProviderGroupName] = React.useState("");
  const [providerGroupNames, setProviderGroupNames] = React.useState([]);
  const { data, isSuccess } =
    useProviderGroupControllerServiceGetAllProviderGroups({});

  const {
    mutateAsync,
    data: successData,
    isSuccess: uploadDocument,
  } = useMigrationControllerServiceUploadFile();

  useEffect(() => {
    if (isSuccess && !!data) {
      setProviderGroupNames(data?.data?.content);
    }
  }, [isSuccess]);

  const handleProviderGroupName = (event: SelectChangeEvent) => {
    setProviderGroupName(event.target.value);
  };

  const upload = () => {
    mutateAsync(requestBody);
    onClose();
  };

  useEffect(() => {
    if (uploadDocument && !!successData) {
      onClose();
    
    }
  }, [uploadDocument]);

  let requestBody: {
    category: any;
    title: any;
    formData: { file: Blob } | { file: File };
    providerGroupUuid: string | '';
  };
  const UploadFile = (file: File) => {
    requestBody = {
      category: category,
      title: category,
      formData: {
        file: file,
      },
      providerGroupUuid: providerGroupName,
    };
  };
  return (
    <>
      <Grid container>
        <Grid item className={uploadClasses.uploadHeader}>
          <Typography variant="h2" className={uploadClasses.typographyBold}>
            {UPLOAD}
          </Typography>
        </Grid>
        <Grid item className={uploadClasses.closeButton}>
          <CloseIcon onClick={onClose} />
        </Grid>

        <Grid item lg={12} xs={12} className={uploadClasses.gridStyle}>
          <Typography variant="h5" sx={modalSubTitle}>
            {PROIVDER_GROUP_NAME}
          </Typography>
        </Grid>

        <Grid item xs={12} className={uploadClasses.gridItemMargin}>
          <FormControl className={uploadClasses.dropDownControl}>
            <Select
              value={providerGroupName}
              onChange={handleProviderGroupName}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              className={uploadClasses.dropSelect}
              MenuProps={{
                PaperProps: {
                  style: { maxHeight: 200, overflowY: "auto" },
                },
              }}
            >
              {providerGroupNames.map((providerGroup: any) => (
                <MenuItem key={providerGroup.uuid} value={providerGroup.uuid}>
                  {providerGroup.groupName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sx={customImageContainer}>
          <DropzoneArea
            dropzoneText="Drag & Drop files Or Browse Files"
            showFileNames
            // showAlerts={false}
            maxFileSize={1048576} // 1 MB in bytes
            filesLimit={1}
            acceptedFiles={[".csv", "text/csv"]}
            onChange={(files: any) => UploadFile(files)}
            classes={{
              root: uploadClasses.dropZone,
              icon: uploadClasses.uploadIcon,
              text: uploadClasses.textUploadZone,
            }}
          />
        </Grid>
        <Grid item>
          <Typography
            variant="h1"
            sx={{ color: "#1A1A1A7F", mt: 1, fontSize: "10px !important" }}
          >
            {SUPPORTED_FORMAT}
          </Typography>
        </Grid>
        <Grid item xs={12} className={uploadClasses.gridItemMargin}>
          <ButtonBase sx={uploadButton} onClick={upload}>
            <Typography sx={{ color: "#FFFFFF" }}>Upload</Typography>
          </ButtonBase>
        </Grid>
      </Grid>
    </>
  );
}

export default UploadComponent;
