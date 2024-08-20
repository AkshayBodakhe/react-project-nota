import AppLayout from "../../../../../components/core/layout/layout";
import { adminConstants } from "../../../../../constants/admin";
import ProviderAvailabilityPage from "./availability";

const { PROVIDER } = adminConstants;

function ProviderAvailability() {

    return (
        <div>
            <ProviderAvailabilityPage />
        </div>
    );
}

export default AppLayout(ProviderAvailability, { source: PROVIDER });