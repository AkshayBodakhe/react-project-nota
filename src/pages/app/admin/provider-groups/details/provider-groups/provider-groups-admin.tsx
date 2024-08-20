import AppLayout from "../../../../../../components/core/layout/layout";
import { adminConstants } from "../../../../../../constants/admin";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import ProviderGroupNavButtons from "../provider-group-nav-buttons/provider-group-nav-buttons";
import { createContext, useEffect, useState } from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useProviderGroupControllerServiceGetProviderGroupById } from "../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { Enums } from "../../common-files/enums";
import ProviderGroupInfo from "./provider-group-info";

const { ADMIN } = adminConstants;

const sxs = {
  heading: {
    display: "flex",
    alignItems: "center",
    color: "#004186",
  },
  backgroundStyle: {
    padding: "10px",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: "0px 0px 8px #00000029",
    borderRadius: "5px",
    opacity: 1,
    height: "100%",
  },
};

export const ProviderGroupUuidContext = createContext("");

function AdminProviderGroup() {
  const navigate = useNavigate();
  const location = useLocation();
  const [providerGroupUuid, setProviderGroupUuid] = useState<string>("");
  const { id } = useParams();

  const navigateToLogin = () => {
    navigate("/admin/provider-groups");
  };

  const { data, isSuccess } =
    useProviderGroupControllerServiceGetProviderGroupById({
      uuid: providerGroupUuid,
    });

  useEffect(() => {
    if (id) {
      setProviderGroupUuid(id);
    }
    if (data?.data && isSuccess) {
      localStorage.setItem(Enums.PROVIDER_GROUP_KEY, data.data.schema);
    }
  }, [id, data?.data]);

  return (
    <Grid key={"ProviderGroupProfile"} sx={sxs.backgroundStyle}>
      <Grid sx={sxs.heading}>
        <ArrowBackOutlinedIcon
          sx={{ marginRight: "10px", cursor: "pointer" }}
          onClick={navigateToLogin}
        />
        <Typography variant="h2" sx={{ mt: 1, mb: 1 }}>
          {"Provider Group"}
        </Typography>
      </Grid>
      <ProviderGroupNavButtons providerGroupUuid={providerGroupUuid} />
      {!location.pathname.endsWith("profile") && (
        <ProviderGroupInfo
          providerGroupUuid={providerGroupUuid}
          flexDirection="row"
          hideBasicInfo={true}
        />
      )}
      <ProviderGroupUuidContext.Provider value={providerGroupUuid}>
        <div>
          <Outlet context={[providerGroupUuid, data?.data || {}]} />
        </div>
      </ProviderGroupUuidContext.Provider>
    </Grid>
  );
}

export default AppLayout(AdminProviderGroup, { source: ADMIN });
