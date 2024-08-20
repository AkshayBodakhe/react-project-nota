import Calendar from "../../../../../components/common/atom/Calendar";
import AppLayout from "../../../../../components/core/layout/layout";
import { adminConstants } from "../../../../../constants/admin";
import CalendarView from "./CalendarView";
import ProviderSchedulingAppointments from "./appointments";

const { PROVIDER } = adminConstants;

function ProviderScheduling() {

    return (
        <div>
            <ProviderSchedulingAppointments />
        </div>
    );
}

export default AppLayout(ProviderScheduling, { source: PROVIDER });