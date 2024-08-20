import AppLayout from "../../../../components/core/layout/layout";
import { adminConstants } from "../../../../constants/admin";
import ReferralPage from "./referral-page";

const { PROVIDER } = adminConstants;

function ReferralIndex() {

    return (
        <div>
          <ReferralPage/>
        </div>
    );
}

export default AppLayout(ReferralIndex, { source: PROVIDER });