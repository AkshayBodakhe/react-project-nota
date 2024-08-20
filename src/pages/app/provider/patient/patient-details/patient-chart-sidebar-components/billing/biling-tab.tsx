import { useEffect, useState } from "react";
import BillingTable from "./billing-table";
import { usePatientLabOrderControllerServiceGetAllLabOrders } from "../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { PatientBillingType, PatientClaimsAction, PatientEncounterAction, PatientSuperBillAction, ReceiptsAction } from "../enums-interfaces/enums";
import { Grid } from "@mui/material";
import { cols } from "./table-cols";
import Filters from "./filters/filter";



type Props = {
    patientData: any,
    billingType: PatientBillingType
}

function BillingIndexTab(props: Props) {

    const { billingType, patientData } = props;
    const [pagination, setPagination] = useState({
        page: 0,
        size: 10,
        totalPages: 0,
        totalElements: 0
    })
    const [tableData, setTableData] = useState<any[]>([]);
    const [tableColumns, setTableColumns] = useState<any[]>([]);
    const [action, setAction] = useState<any[]>(Object.values(PatientEncounterAction));

    const { data, isLoading, refetch } = usePatientLabOrderControllerServiceGetAllLabOrders({
        patientUuid: patientData.uuid,
        page: pagination.page,
        size: pagination.size
    });

    useEffect(() => {
        setTableColumns(cols(billingType) as [])
        switch (billingType) {
            case PatientBillingType.ENCOUNTERS_FOR_BILLING:
                setAction(Object.values(PatientEncounterAction));
                break;
            case PatientBillingType.SUPER_BILL:
                setAction(Object.values(PatientSuperBillAction))
                break;
            case PatientBillingType.CLAIMS:
                setAction(Object.values(PatientClaimsAction));
                break;
            case PatientBillingType.RECEIPTS:
                setAction(Object.values(ReceiptsAction));
                break;
            default:
                break;
        }
    }, [billingType])

    useEffect(() => {
        if (data?.data) {
            setTableData(data.data.content);
            setPagination((prev: any) => ({
                ...prev,
                totalPages: data.data?.totalPages,
                totalElements: data.data?.totalElements,
            }))
        }
    }, [data?.data])

    return (
        <Grid p={2} key={'BillingTab'}>
            {billingType !== PatientBillingType.ENCOUNTERS_FOR_BILLING && billingType !== PatientBillingType.SUPER_BILL && <Filters />}
            <BillingTable
                patientDetails={props.patientData}
                pagination={pagination}
                setPagination={setPagination}
                tableData={tableData}
                tableColumns={tableColumns}
                isLoading={isLoading}
                refetch={refetch}
                actionOpts={action}
                actionType={billingType}
            />
        </Grid>
    )
}

export default BillingIndexTab;