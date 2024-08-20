import React, { useEffect, useState } from 'react'
import {
    TableCell,
    TableRow,
  } from "@mui/material";
import { commonWidget } from '../../../../../../../styles/common';
import { useCarePatientChartControllerServiceGetAllCarePatientChart } from '../../../../../../../sdk/thinkemr-core-0.0.1/queries';
import { capitalizeInitial } from '../../../../../../../components/common/enums-and-interfaces/common-functions';

interface PatientData{
    patientData:any;
}
  
function EmotionalSupport(props:PatientData){
    const classes = commonWidget();
    const [emotionalSupport,setEmotionalSupport]=useState([]);
    const [page, setPage] = useState(0);
    const [pagination, setPagination] = useState({
        page: 0,
        size: 10,
        patientUuid: props.patientData.uuid,
        totalPages: 0,
        totalElements: 0,
    });
    const rowsPerPage = 10;

    const {
        data,
        isLoading,
        isError,
    } = useCarePatientChartControllerServiceGetAllCarePatientChart({
        patientUuid: pagination.patientUuid,
        carePatientChartingType: 'SOCIAL_AND_ENVIRONMENTAL_SUPPORT',
        socialAndEnvironmentalSupportType:'EMOTIONAL_SUPPORT',
        page: pagination.page,
        size: pagination.size, 
        sort: [],
    });

    useEffect(() => {
        if (data?.data) {
        const newRows = data.data.content?.map((data: any) => {
            return {
            id: data.id,
            uuid: data.uuid,
            name:capitalizeInitial(data.name) || "-",
            description:data.description || "-",
            patientUuid:data.patientUuid,
            };
        });
        setEmotionalSupport(newRows);
        setPagination((prev) => ({
            ...prev,
            totalPages: data.data?.totalPages,
            totalElements: data.data?.totalElements,
        }));
        }
    }, [data?.data]);

        const displayedRows = emotionalSupport.slice(
        page * rowsPerPage,
        (page + 1) * rowsPerPage
    );

  return (
    (displayedRows.length === 0 && !isLoading) ? 
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "150%",
                padding: "4% 0",
            }}
        >
            No Data Available
        </div>:
        displayedRows.map((row: any, index: any) => {
            return (
                <TableRow key={index} className={classes.tableHeadRowContainer}>
                  <TableCell width={"50%"}>{row.name}</TableCell>
                  <TableCell width={"50%"}>{row.description}</TableCell>
                </TableRow>
            );
        })   
    )
}

export default EmotionalSupport


