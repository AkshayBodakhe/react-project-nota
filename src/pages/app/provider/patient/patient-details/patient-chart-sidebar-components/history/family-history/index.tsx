import { useEffect, useState } from "react";
import { PatientData } from "../../diagnoses";
import FamilyHistoryTable from "./family-history-table";
import { useFamilyHistoryControllerServiceGetPatientFamilyHistory } from "../../../../../../../../sdk/thinkemr-core-0.0.1/queries";

function FamilyHistoryIndex(props: PatientData) {

  // const [pagination, setPagination] = useState({
  //   patientUuid: props.patientData.uuid,
  //   page: 0,
  //   size: 10,
  //   sortBy: 'created',
  //   sortDirection: 'desc',
  //   totalPages: 0,
  //   totalElements: 0
  // });
  // const [tableData, setTableData] = useState([]);

  // const { refetch, data, isLoading } = useFamilyHistoryControllerServiceGetPatientFamilyHistory({
  //   patientUuid: pagination.patientUuid,
  //   page: pagination.page,
  //   size: pagination.size,
  //   sortBy: pagination.sortBy,
  //   sortDirection: pagination.sortDirection
  // });

  // useEffect(()=>{
    
  //   if(props.refetchData){
  //     refetch();
  //   }
  // },[props.refetchData]);

  // useEffect(() => {
  //   if (props.data?.data && props.data.data?.content) {
  //     setTableData(props.data.data.content);
  //     setPagination((prev) => ({
  //       ...prev,
  //       totalPages: props.data.data?.totalPages,
  //       totalElements: props.data.data?.totalElements,
  //     }))
  //   }
  // }, [props.data?.data]);

  return (
    <div>
      <FamilyHistoryTable
        isLoading={props.isLoading||false}
        refetch={props?.refetch}
        pagination={props?.pagination}
        setPagination={props?.setPagination}
        tableData={props?.data?.data?.content}
        patientData={props?.patientData}
      />
    </div>
  )
}

export default FamilyHistoryIndex;
