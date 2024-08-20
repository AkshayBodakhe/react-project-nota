import AppLayout from "../../../../components/core/layout/layout";
import { adminConstants } from "../../../../constants/admin";
import UserSettings from "./user-settings";
const { ADMIN } = adminConstants;

function UserSettingsMainComponent() {
  return (
    <>
      <UserSettings />
      {/* <Outlet /> */}
    </>
  );
}

export default AppLayout(UserSettingsMainComponent, {
  source: ADMIN,
});
