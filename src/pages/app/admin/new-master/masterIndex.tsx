import AppLayout from "../../../../components/core/layout/layout";
import { adminConstants } from "../../../../constants/admin";
import SubMenu from "./sub-menu-master";
const { ADMIN } = adminConstants;

function MasterIndex() {
  return (
    <div>
      <SubMenu />
    </div>
  );
}

export default AppLayout(MasterIndex, { source: ADMIN });
