import AppLayout from "../../../../../components/core/layout/layout";
import { adminConstants } from "../../../../../constants/admin";
import ProviderAppointmentsTasks from "./tasks";

const { PROVIDER } = adminConstants;

function ProviderTasks() {

    return (
        <div>
            <ProviderAppointmentsTasks />
        </div>
    );
}

export default AppLayout(ProviderTasks, { source: PROVIDER });