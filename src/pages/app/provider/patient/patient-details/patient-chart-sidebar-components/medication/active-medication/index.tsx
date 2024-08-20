import { useEffect, useState } from "react";
import { PatientData } from "../../diagnoses";
import MedicationTable from "./table/medication-table";
import {
  useMedicationsControllerServiceGetPatientCurrentMedications,
  useMedicationsControllerServiceGetPatientMedications,
  useMedicationsControllerServiceGetPatientPastMedications,
} from "../../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { MedicationType } from "../../enums-interfaces/enums";
import { Grid } from "@mui/material";
import moment from "moment";

const activeCols: any[] = [
  { id: "id", label: "ID", minWidth: 50, displaySort: false },
  { id: "name", label: "Medicines", minWidth: 80, displaySort: false },
  { id: "sig", label: "Sig", minWidth: 80, displaySort: false },
  { id: "startDate", label: "StartDate", minWidth: 50, displaySort: false },
  { id: "duration", label: "Duration", minWidth: 50, displaySort: false },
  { id: "note", label: "Note", minWidth: 50, displaySort: false },
  { id: "endDate", label: "Est.End Date", minWidth: 50, displaySort: false },
  // { id: "date", label: "Date", minWidth: 100, displaySort: false },
  // { id: "dispensings", label: "Dispensings", minWidth: 80, displaySort: false },
  // { id: "status", label: "Status", minWidth: 140, displaySort: false },
  { id: "action", label: "Action", minWidth: 50, displaySort: false },
];

const pastCols: any[] = [
  { id: "id", label: "ID", minWidth: 50, displaySort: false },
  { id: "name", label: "Medicines", minWidth: 80, displaySort: false },
  { id: "direction", label: "Direction", minWidth: 50, displaySort: false },
  {
    id: "compDate",
    label: "Completed Date",
    minWidth: 100,
    displaySort: false,
  },
  { id: "duration", label: "Duration", minWidth: 50, displaySort: false },
  { id: "note", label: "Note", minWidth: 50, displaySort: false },
  // { id: "lastFilldate", label: "Last Fill date", minWidth: 80, displaySort: false },
  { id: "pastAction", label: "Action", minWidth: 50, displaySort: false },
];

const pendingCols: any[] = [
  { id: "id", label: "ID", minWidth: 50, displaySort: false },
  { id: "name", label: "Medicines", minWidth: 80, displaySort: false },
  { id: "dispense", label: "Dispense", minWidth: 50, displaySort: false },
  { id: "date", label: "Date", minWidth: 100, displaySort: false },
  { id: "refills", label: "Refills", minWidth: 80, displaySort: false },
  { id: "prescriber", label: "Prescriber", minWidth: 80, displaySort: false },
  { id: "pharmacy", label: "Pharmacy", minWidth: 80, displaySort: false },
  { id: "action", label: "Action", minWidth: 50, displaySort: false },
];

function MedicationTab(props: PatientData) {
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    sort: ["desc"],
    totalPages: 0,
    totalElements: 0,
  });
  const [pastPagination, setPastPagination] = useState({
    page: 0,
    size: 10,
    sort: ["desc"],
    totalPages: 0,
    totalElements: 0,
  });
  const [tableData, setTableData] = useState<any[]>([]);
  const [pastTableData, setPastTableData] = useState<any[]>([]);
  const [tableCols] = useState<any[]>(getCols());
  const { refetch, data, isLoading } =
    useMedicationsControllerServiceGetPatientCurrentMedications({
      patientUuid: props?.patientData?.uuid,
      ...pagination,
    });
  const { refetch: pastRefetch, data: PastData } =
    useMedicationsControllerServiceGetPatientPastMedications({
      patientUuid: props?.patientData?.uuid,
      ...pastPagination,
    });
  // function getResult() {
  //     switch (props.resultType) {
  //         case MedicationType.ACTIVE:

  //             break;
  //         case MedicationType.PAST:
  //             return useMedicationsControllerServiceGetPatientPastMedication({ patientUuid: props.patientData.uuid });
  //         case MedicationType.PENDING:
  //             return useMedicationsControllerServiceGetPatientPastMedication({ patientUuid: props.patientData.uuid });
  //         default:
  //             return { data: [], isLoading: false };
  //     }
  // }

  function getCols(): any[] {
    switch (props.resultType) {
      case MedicationType.ACTIVE:
        return activeCols;
      case MedicationType.PAST:
        return pastCols;
      case MedicationType.PENDING:
        return pendingCols;
      default:
        return [];
    }
  }

  useEffect(() => {
    if (props.refetchData) {
      refetch();
      pastRefetch();
    }
  }, [props.refetchData]);

  useEffect(() => {
    if (data?.data) {
      switch (props.resultType) {
        case MedicationType.ACTIVE:
          const activeRows = data?.data.content?.map((res: any) => {
            return {
              id: res.id,
              uuid: res.uuid,
              active: res.active,
              name: res.drugCatalog?.medicine,
              drugCatalog: res.drugCatalog,
              dosageTime: res.dosageTime,
              dosageUnit: res.dosageUnit,
              dosageWhen: res.dosageWhen,
              startDate: res.startDate,
              endDate: res.endDate,
              sig: res.sig,
              duration: res.duration,
              quantity: res.quantity,
              prescribedById: res.prescribedById,
              medication: res.drugCatalog,
              patient: res.patient,
              note: res.note,
            };
          });
          setTableData(activeRows);
          setPagination((prev: any) => ({
            ...prev,
            totalPages: data?.data?.totalPages,
            totalElements: data?.data?.totalElements,
          }));
          break;
        case MedicationType.PAST:
          const pastRows = PastData?.data?.content?.map((res: any) => {
            return {
              id: res.id,
              uuid: res.uuid,
              active: res.active,
              name: res.drugCatalog?.medicine,
              drugCatalog: res.drugCatalog,
              dosageTime: res.dosageTime,
              dosageUnit: res.dosageUnit,
              dosageWhen: res.dosageWhen,
              startDate: res.startDate,
              endDate: res.endDate,
              sig: res.sig,
              quantity: res.quantity,
              prescribedById: res.prescribedById,
              medication: res.drugCatalog,
              patient: res.patient,
              type: res.type,
              duration: res.duration,
              note: res.note,
              compDate: moment(res.endDate).format("MM-DD-YYYY"),
              direction: res.sig,
            };
          });
          setPastPagination((prev: any) => ({
            ...prev,
            totalPages: PastData?.data?.totalPages,
            totalElements: PastData?.data?.totalElements,
          }));
          console.log("pastRows", pastRows);
          setPastTableData(pastRows);
          break;
        case MedicationType.PENDING:
          break;
        default:
          break;
      }
    }
  }, [data?.data, PastData]);

  return (
    <Grid pt={2}>
      {props.resultType == MedicationType.ACTIVE ? (
        <MedicationTable
          patientData={props?.patientData}
          tableData={tableData}
          columns={tableCols}
          refetch={refetch}
          isLoading={isLoading || false}
          pagination={pagination}
          setPagination={setPagination}
        />
      ) : (
        <MedicationTable
          patientData={props?.patientData}
          tableData={pastTableData}
          columns={tableCols}
          refetch={refetch}
          isLoading={isLoading || false}
          pagination={pastPagination}
          setPagination={setPastPagination}
        />
      )}
    </Grid>
  );
}

export default MedicationTab;
