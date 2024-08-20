import { TableType } from "../../../common-files/enums";
import ReviewAndPhysicalTables from "./tables/review-physical-table";

function ReviewOfSystemPage(){
    return(
        <>
            <ReviewAndPhysicalTables tableType={TableType.ROS}/>
        </>
    );
}

export default ReviewOfSystemPage;