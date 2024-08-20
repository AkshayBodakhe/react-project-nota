import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import AppLayout from "../layout/layout";
import ProviderProfile from "./provider-profile-details";
import { adminConstants } from "../../../constants/admin";
import getProviderUserDetails from "../../../mock-data/getProviderUserDetails.json";
import { useEffect, useState } from "react";
import providerGroupService from "../../../service/provider-group--service";
import { Enums } from "../../../pages/app/admin/provider-groups/common-files/enums";

const { ADMIN } = adminConstants;

function ViewAdminProviderGroupProviderDetails() {
  const location = useLocation();
  const uuid = location && location.state && location.state.providerGroupUuid;
  const providerId = location && location.state && location.state.providerId;

  const [tenantId] = useState(
    localStorage.getItem(Enums.PROVIDER_GROUP_KEY) || ""
  );

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = () => {
    try {
      providerGroupService
        .getUserById(tenantId, uuid)
        .then((_provider: any) => {});
    } catch (error) {}
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <ProviderProfile
        providerDetails={getProviderUserDetails}
        source={ADMIN}
        providerGroupId={uuid}
        providerId={providerId}
      />
    </Box>
  );
}

export default AppLayout(ViewAdminProviderGroupProviderDetails, {
  source: ADMIN,
});
