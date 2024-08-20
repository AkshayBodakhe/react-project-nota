import { Grid } from "@mui/material";
import CommonTable from "../../../../../components/common/table";
import {
  Column,
  PaginationState,
} from "../../../../../components/common/enums-and-interfaces/interfaces";
import { useEffect, useState } from "react";
import { useCommunicationControllerServiceGetGroupMessage } from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import { useSelector } from "react-redux";
import CustomPagination from "../../../../../components/common/pagination";

const columns: Column[] = [
  {
    id: "groupName",
    label: "Group Name",
    // minWidth: 300,
    displaySort: false,
    align: "left",
  },
  {
    id: "subject",
    label: "Subject",
    // minWidth: 300,
    displaySort: false,
    align: "left",
  },
  {
    id: "sendBy",
    label: "Send By",
    // minWidth: 300,
    displaySort: false,
    align: "left",
  },
  {
    id: "dateTime",
    label: "Date & Time",
    // minWidth: 80,
    displaySort: false,
    align: "left",
  },
];

interface GroupProps {
  isRefetch: any;
  setPaginationData: any;
  pagination: any;
}

function OutgoingMessages(props: GroupProps) {
  const { isRefetch, setPaginationData, pagination } = props;
  const [messages, setMessages] = useState([]);
  const providerDetail = useSelector(
    (state: any) => state.commonReducer?.userDetail?.data
  );
  const providerGroupUuid = providerDetail?.providerGroup;
  const { data, isSuccess, refetch, isLoading } =
    useCommunicationControllerServiceGetGroupMessage({
      providerGroupUuid,
      ...pagination,
    });

  useEffect(() => {
    if (isRefetch) {
      refetch();
    }
  }, [isRefetch]);

  useEffect(() => {
    if (isSuccess && !!data) {
      setMessages(data?.data?.content);
      setPaginationData({
        ...pagination,
        totalPages: data?.data?.totalPages,
        totalElements: data?.data?.totalElements,
      });
    }
  }, [data, isSuccess]);

  return (
    <>
      <Grid item xs={12}>
        <CommonTable
          columns={columns}
          maxHeight="600px"
          options={[]}
          isLoading={isLoading}
          tableData={messages}
        />
      </Grid>
    </>
  );
}

export default OutgoingMessages;
