import { TableType } from "../../../common-files/enums";
import ReviewAndPhysicalTables from "../review-of-system/tables/review-physical-table";

function PhysicalExamPage(){
    return(
        <>
            <ReviewAndPhysicalTables tableType={TableType.PE} />
        </>
    );
}

export default PhysicalExamPage;