import AppLayout from "../../../../components/core/layout/layout";
import { adminConstants } from "../../../../constants/admin";
const { ADMIN } = adminConstants;
function EditAdminProfile() {
  return <div>This is EditAdminProfile Page.</div>;
}

export default AppLayout(EditAdminProfile, {
  source: ADMIN,
});
