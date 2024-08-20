import { useEffect, useState } from "react";
import { PatientData } from "../diagnoses";
import VisitDetailsTable from "./visit-details-table";
import { usePatientDocumentControllerServiceGetAllDocumentsOfPatient } from "../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { Grid, Typography } from "@mui/material";

const response = {
    data: {
        data: {
            content: [
                {
                    id: 1,
                    visitDate: '15-01-2023, 11:00 AM',
                    provider: 'Theodore Payne',
                    type: 'New Appointment',
                    reason: 'Headaches',
                    appointmentStatus: 'Completed',
                    billStatus: 'Paid'
                },
                {
                    id: 2,
                    visitDate: '15-01-2023, 11:00 AM',
                    provider: 'Benjamin Hanson',
                    type: 'Follow Up Appointment',
                    reason: 'Colds and Flu',
                    appointmentStatus: 'No Show',
                    billStatus: 'Cancel'
                },
                {
                    id: 3,
                    visitDate: '20-01-2023, 02:45 PM',
                    provider: 'Nelson Hansen',
                    type: 'New Appointment',
                    reason: 'Chickenpox',
                    appointmentStatus: 'Pending',
                    billStatus: 'Pending'
                }
            ]
        }
    }
}

function VisitDetailsTab(props: PatientData) {

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


            <Grid container p={2} pb={0}>
                <Grid container xs={12} pb={2} justifyContent="space-between">
                    <Grid item>
                        <Typography
                            variant="h4"
                            sx={{
                                color: "#004186",
                                fontWeight: "bold",
                                fontSize: "16px !important",
                            }}
                        >
                            Visit Information
                        </Typography>
                    </Grid>
                    {/* <Grid item display="flex" gap="20px;">
                        <Grid>
                            <ButtonBase
                                sx={{
                                    ...formButtonStyle.mainButtonStyle,
                                }}
                                onClick={openModal}
                            >
                                <AddIcon />
                                <Typography variant="h4">Add Diagnoses</Typography>
                            </ButtonBase>
                        </Grid>
                    </Grid> */}
                </Grid>
                <Grid sx={{ width: '100%' }}>
                    <VisitDetailsTable
                        isLoading={isLoading}
                        pagination={pagination}
                        patientData={props.patientData}
                        refetch={refetch}
                        setPagination={setPagination}
                        tableData={tableData}
                    />
                </Grid>
            </Grid>



        </>
    )
}

export default VisitDetailsTab;