import { Drawer, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddEditProviderGroupData from "../../../../pages/app/provider/settings/account-settings/provider-group/add-edit-provider-group";
import { useProviderGroupControllerServiceUpdateStatus } from "../../../../sdk/thinkemr-core-0.0.1/queries";
import { alertAction } from "../../../../store/features/common-actions/snackbar/alertSlice";
import { useAppDispatch } from "../../../../store/hooks";
import { ActionType, Permission, StatusType } from "../../../common/enums-and-interfaces/enums";
import { Column, ErrorResponseEntity, PaginationState } from "../../../common/enums-and-interfaces/interfaces";
import CommonTable from "../../../common/table";
import { PORTAL } from "../../../../constants/provider";

const columns: Column[] = [
  { id: "id", label: "Group ID", minWidth: 30, displaySort: false, align: 'left' },
  { id: "name", label: "Provider Group Name", minWidth: 80, displaySort: false, align: 'left' },
  { id: "isMultiSpeciality", label: "Speciality", minWidth: 80, displaySort: false, align: 'left' },
  { id: "phone", label: "Contact", minWidth: 100, displaySort: false, align: 'left' },
  { id: "address", label: "Address", minWidth: 100, displaySort: false, align: 'left' },
  { id: "state", label: "State", minWidth: 80, displaySort: false, align: 'left' },
  { id: "providerCount", label: "Provider Count", minWidth: 100, displaySort: false, align: 'center' },
  { id: "patientCount", label: "Patient Count", minWidth: 100, displaySort: false, align: 'center' },
  { id: "portal", label: "Portal", minWidth: 100, displaySort: false, align: 'left' },
  { id: "status", label: "Status", minWidth: 50, displaySort: false, align: 'center'},
  { id: "action", label: "Action", minWidth: 50, displaySort: false, align: 'center'},
];

type Props = {
  data: any;
  pagination: PaginationState;
  setPagination: any;
  refetchData: any;
  isLoading: boolean
}

export default function ProviderGroupTable(props: Props) {

  const navigation = useNavigate();
  const [open, setOpen] = useState(false);
  const [providerGroupUuid, setProviderGroupUuid] = useState<string>('');
  const [providerGroupList, setProviderGroupList] = useState<any[]>([]);
  const dispatch = useAppDispatch();

  const { mutateAsync, isError, error } = useProviderGroupControllerServiceUpdateStatus();

  useEffect(() => {
    if ((error as ErrorResponseEntity)?.body.message) {
      dispatch(alertAction.setAlert({ open: true, message: (error as ErrorResponseEntity)?.body.message, severity: 'error' }))
    }
  }, [isError])

  useEffect(() => {
    if (props.data) {
      const newRows: any = props.data.content?.map(
        (providerGroup: any) => {
          return {
            id: providerGroup.id,
            uuid: providerGroup.uuid,
            active: providerGroup.active,
            name: providerGroup.name,
            schema: providerGroup.schema,
            specialities: providerGroup.specialities.map((state: any, index: number) => `${state.name}${index === providerGroup.specialities?.length - 1 ? '' : ', '}`),
            isMultiSpeciality: providerGroup.specialities?.length > 1 ? 'Multi-Speciality' : providerGroup.specialities[0]?.name,
            phone: providerGroup.phone,
            website: providerGroup.website,
            providerCount: providerGroup.providerCount,
            patientCount: providerGroup.patientCount,
            address: providerGroup.physicalAddress,
            state: providerGroup.physicalAddress.state.charAt(0).toUpperCase() + providerGroup.physicalAddress.state.slice(1).toLowerCase(),
            status: StatusType.TOGGLE_BTN,
            action: ActionType.ACTION_WITH_EDIT_BTN,
            portal: providerGroup.portalName === PORTAL.NAVALACARE ? 'Navala Care' : providerGroup.portalName === PORTAL.PROVIDER ? 'Navala Global' : '-'
          }
        }
      );
      setProviderGroupList(newRows);
    }
  }, [props.data, props.pagination]);

  const handleClose = () => {
    setOpen(false);
    props.refetchData();
  }

  const handleStatusChange = (providerGroup: any, event: any) => {
    setProviderGroupList((prev: any) => {
      return prev.map((res: any) => {
        if (res.uuid === providerGroup.uuid) {
          return {
            ...res,
            active: event.target.checked
          }
        }
        return res;
      })
    });

    try {
      mutateAsync({ status: event.target.checked, uuid: providerGroup.uuid }).then((res: any) => {
        dispatch(alertAction.setAlert({ open: true, message: res.message, severity: 'success' }));
      })
    } catch (error) { }
  };

  const navigateToChildren = (providerGroup: any) => {
    navigation(`${providerGroup.uuid}/profile`, {
      state: {
        providerGroupUuid: providerGroup.uuid,
        providerGroupName: providerGroup.name
      },
    });
  }

  const handleEditGroup = (providerGroupId: string) => {
    setOpen(true);
    setProviderGroupUuid(providerGroupId);
  }

  return (
    <React.Fragment>
      <Paper elevation={0}>
        <CommonTable
          maxHeight='670px'
          isAdmin={true}
          columns={columns}
          tableData={providerGroupList}
          handleActionClick={(providerGroup: any) => handleEditGroup(providerGroup.uuid)}
          handleStatusChange={(data: any, event: any) => handleStatusChange(data, event)}
          navigateToChildren={(providerGrp: any) => navigateToChildren(providerGrp)}
          isLoading={props.isLoading}
        />
      </Paper>
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <AddEditProviderGroupData
          onCloseDrawer={handleClose}
          title={"Edit Provider Group"}
          providerGroupUuid={providerGroupUuid}
          source={'Edit'}
        />
      </Drawer>
    </React.Fragment>
  );
}