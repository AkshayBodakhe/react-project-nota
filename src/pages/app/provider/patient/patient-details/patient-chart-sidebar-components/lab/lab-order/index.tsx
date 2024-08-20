import { Grid } from "@mui/material";
import { PatientData } from "../../diagnoses";
import LabOrdersTable from "./lab-orders-table";
import { useEffect, useState } from "react";
import { usePatientLabOrderControllerServiceGetAllLabOrders } from "../../../../../../../../sdk/thinkemr-core-0.0.1/queries";

function LabOrdersTab(props: PatientData) {

    const [pagination, setPagination] = useState({
        page: 0,
        size: 10,
        totalPages: 0,
        totalElements: 0
    })
    const [tableData, setTableData] = useState<any[]>([]);

    const { data, isLoading, refetch } = usePatientLabOrderControllerServiceGetAllLabOrders({
        patientUuid: props.patientData.uuid,
        page: pagination.page,
        size: pagination.size
    });

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
        <>
            <Grid p={2}>
                <LabOrdersTable
                    patientDetails={props.patientData}
                    pagination={pagination}
                    setPagination={setPagination}
                    tableData={tableData}
                    isLoading={isLoading}
                    refetch={refetch}
                />
            </Grid>
        </>
    );
}

export default LabOrdersTab;
