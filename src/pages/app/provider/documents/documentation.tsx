import FolderIcon from "@mui/icons-material/Folder";
import { Box, Grid, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../../../components/core/layout/layout";
import {
  DOCUMENTATIONS,
  PROVIDER,
  folderList,
} from "./documents-constant/documents-common-const";
import {
  head1,
  parentContainer,
} from "./documents-widget/documents-common-widget";

interface docProps {
  patientData?: any;
}

function Documentation(props: docProps) {
  const { patientData } = props;
  const navigate = useNavigate();
  const handleOpenFolder = (folderId: string, folderName: string) => {
    navigate("/provider/documents/folder-item", {
      state: { folderId, folderName, patientData },
    });
  };

  return (
    <>
      <Grid sx={parentContainer}>
        <Box display={"flex"} gap={1}>
          <Typography variant="h3" sx={head1}>
            {DOCUMENTATIONS}
          </Typography>
        </Box>
      </Grid>
      <Grid container gap={5} bgcolor={"white"} p={2}>
        {folderList.map((item) => {
          return (
            <Box
              width={"150px"}
              sx={{ cursor: "pointer" }}
              onClick={() => handleOpenFolder(item.id, item.name)}
            >
              <Grid container justifyContent={"center"} alignItems={"center"}>
                <FolderIcon sx={{ fontSize: "100px", color: "#4e4646" }} />
              </Grid>
              <Grid container justifyContent={"center"} alignItems={"center"}>
                <Tooltip title={item.name} arrow placement="bottom">
                  <Typography fontSize={"15px"} noWrap>
                    {item.name}
                  </Typography>
                </Tooltip>
              </Grid>
            </Box>
          );
        })}
      </Grid>
    </>
  );
}

export default Documentation;
