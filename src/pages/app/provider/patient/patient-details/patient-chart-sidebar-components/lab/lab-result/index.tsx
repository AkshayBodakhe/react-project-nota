import { useEffect, useState } from "react";
import { PatientData } from "../../diagnoses";
import { usePatientLabResultsControllerServiceGetPatientsLabResults } from "../../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import LabResultsTable from "./lab-results-table";
import { Grid } from "@mui/material";

function LabResultTab(props: PatientData) {

    const [tableData, setTableData] = useState<any[]>([]);
    const [pagination, setPagination] = useState({
        patientUuid: props.patientData?.uuid || '',
        page: 0,
        size: 10,
        totalPages: 0,
        totalElements: 0
    });

    const { data, isLoading, refetch, isError } = usePatientLabResultsControllerServiceGetPatientsLabResults({
        patientUuid: pagination.patientUuid,
        page: pagination.page,
        size: pagination.size
    })

    useEffect(() => {
        if (isError) refetch();
        if (data?.data && data.data?.content) {
            setTableData(data.data.content);
            setPagination((prev) => ({
                ...prev,
                totalPages: data.data?.totalPages,
                totalElements: data.data?.totalElements
            }))
            setTableData(data.data?.content);
        }
    }, [data?.data, isLoading])

    return (
        <Grid p={2}>
            <LabResultsTable
                isLoading={isLoading}
                pagination={pagination}
                refetch={refetch}
                setPagination={setPagination}
                tableData={tableData}
                patientData={props.patientData}
                key={''}
            />
        </Grid>
    )
}

export default LabResultTab;