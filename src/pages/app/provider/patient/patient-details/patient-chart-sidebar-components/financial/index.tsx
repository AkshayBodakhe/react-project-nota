import { useEffect, useState } from "react";
import { PatientData } from "../diagnoses";
import FinancialTable from "./financial-table";
import { usePatientDocumentControllerServiceGetAllDocumentsOfPatient } from "../../../../../../../sdk/thinkemr-core-0.0.1/queries";

const response = {
    data: {
        data: {
            content: [
                {
                    balance: 'Account',
                    total: '',
                    unpaid: '',
                    unbilled: '',
                    current: '',
                    '30Days': '',
                    '60Days': '',
                    '90Days': '',
                    '120Days': ''
                },
                {
                    balance: 'Patient',
                    total: '',
                    unpaid: '',
                    unbilled: '',
                    current: '',
                    '30Days': '',
                    '60Days': '',
                    '90Days': '',
                    '120Days': ''
                },
                {
                    balance: 'Insurance',
                    total: '',
                    unpaid: '',
                    unbilled: '',
                    current: '',
                    '30Days': '',
                    '60Days': '',
                    '90Days': '',
                    '120Days': ''
                },
            ]
        }
    }
}

function FinancialTab(props: PatientData) {

    const [pagination, setPagination] = useState({
        patientUuid: props.patientData?.uuid || '',
        page: 0,
        size: 10,
        sortBy: 'created',
        sortDirection: 'desc',
        totalPages: 0,
        totalElements: 0
    });

    const [tableData, setTableData] = useState<any[]>([]);

    const { data, isLoading, refetch } = usePatientDocumentControllerServiceGetAllDocumentsOfPatient({
        patientUuid: pagination.patientUuid,
        page: pagination.page,
        size: pagination.size,
    });

    useEffect(() => {
        setTableData(response.data.data.content);
        // if (data?.data && data.data?.content) {
        //     setTableData(data.data.content);
        // }
    }, [data?.data])

    return (
        <>
            <FinancialTable
                isLoading={isLoading}
                pagination={pagination}
                patientData={props.patientData}
                refetch={refetch}
                setPagination={setPagination}
                tableData={tableData}
            />
        </>
    )
}

export default FinancialTab;