import { Box, ButtonBase, Drawer, Typography } from "@mui/material";
import ProviderGroupInfo from "../provider-groups/provider-group-info";
import { ProviderGroupUuidContext } from "../provider-groups/provider-groups-admin";
import React, { useContext, useState } from "react";
import AddEditProviderGroupData from "../../../../provider/settings/account-settings/provider-group/add-edit-provider-group";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { formButtonStyle } from "../../../../../../styles/common";
import { makeStyles } from "@mui/styles";
import { useOutletContext, useParams } from "react-router-dom";
import { checkActiveProviderGroup } from "../../../../../../components/common/helper";
import { getLoggedInUser } from "../../../../../../components/common/enums-and-interfaces/common-functions";

const commonStyles = makeStyles(() => ({
  addButtonTypo: {
    display: "flex",
    paddingRight: "7px",
    opacity: 0.9,
  },
}));

const profileTab = {
  heading: {
    display: "flex",
    justifyContent: "end",
    alignItems: "end",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  table: {
    marginTop: "20px",
  },
  addUserRoleBtnTypo: {
    display: "flex",
    paddingRight: "12px",
    background: "#36588C",
  },
};

function ProviderGroupProfile() {
  const styles = commonStyles();
  const [open, setOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const { id } = useParams();
  const providerGroupUuid =
    useContext(ProviderGroupUuidContext) ||
    (id as string) ||
    getLoggedInUser()?.providerGroup;
  const context = useOutletContext() as any[];
  const providerContextData = context && context[1];
  const isActiveProvider = checkActiveProviderGroup(providerContextData);

  const handleClose = () => {
    setOpen(false);
    setRefetch(true);
  };

  return (
    <React.Fragment key={"profile"}>
      <Box sx={profileTab.heading}>
        <ButtonBase
          sx={{
            ...formButtonStyle.saveButtonStyle,
            width: "auto !important",
            padding: "0px 10px",
            opacity: isActiveProvider ? 0.5 : 1,
          }}
          onClick={() => setOpen(true)}
          disabled={isActiveProvider}
        >
          <span className={styles.addButtonTypo}>
            <ModeEditOutlineOutlinedIcon />
          </span>
          <Typography variant="h5" sx={profileTab.addUserRoleBtnTypo}>
            {"Edit Profile"}
          </Typography>
        </ButtonBase>
      </Box>
      <Box sx={profileTab.table}>
        <ProviderGroupInfo
          providerGroupUuid={providerGroupUuid}
          refetch={refetch}
        />
      </Box>
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <AddEditProviderGroupData
          onCloseDrawer={handleClose}
          title={"Edit Provider Group"}
          providerGroupUuid={providerGroupUuid}
          source={"Edit"}
        />
      </Drawer>
    </React.Fragment>
  );
}

export default ProviderGroupProfile;
