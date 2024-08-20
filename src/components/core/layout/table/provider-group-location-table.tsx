import React, { useEffect, useState } from "react";
import { Paper, Drawer, Grid } from "@mui/material";
import LocationDrawer from "../../../common/modal/location-drawer";
import LocationModal from "../../../common/modal/location-modal";
import providerGroupService from "../../../../service/provider-group--service";
import { Enums } from "../../../../pages/app/admin/provider-groups/common-files/enums";
import { useDispatch } from "react-redux";
import { Column } from "../../../common/enums-and-interfaces/interfaces";
import { alertAction } from "../../../../store/features/common-actions/snackbar/alertSlice";
import CommonTable from "../../../common/table";
import {
  ActionType,
  StatusType,
} from "../../../common/enums-and-interfaces/enums";
import CustomPagination from "../../../common/pagination";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const columns: Column[] = [
  {
    id: "locationId",
    label: "Location ID",
    minWidth: 60,
    displaySort: false,
    align: "left",
  },
  {
    id: "name",
    label: "Location Name",
    minWidth: 160,
    displaySort: false,
    align: "left",
  },
  {
    id: "isMultiSpeciality",
    label: "Specialities",
    minWidth: 160,
    displaySort: false,
    align: "left",
  },
  {
    id: "Address",
    label: "Address",
    minWidth: 140,
    displaySort: false,
    align: "left",
  },
  {
    id: "city",
    label: "City",
    minWidth: 100,
    displaySort: false,
    align: "left",
  },
  {
    id: "state",
    label: "State",
    minWidth: 100,
    displaySort: false,
    align: "left",
  },
  {
    id: "zipcode",
    label: "Zip Code",
    minWidth: 100,
    displaySort: false,
    align: "left",
  },
  {
    id: "contact",
    label: "Contact Number",
    minWidth: 100,
    displaySort: false,
    align: "center",
  },
  {
    id: "status",
    label: "Status",
    minWidth: 50,
    displaySort: false,
    align: "center",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 50,
    displaySort: false,
    align: "center",
  },
];

type Prop = {
  locationList: any[];
  pagination: any;
  setPagination: any;
  refetchData: any;
  isLoading: boolean;
};

export default function ProviderGroupLocationTable(props: Prop) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openDrawer, setOpendrawer] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [locationId, setLocationId] = React.useState<string>("");
  const [locationList, setLocationList] = useState<any>([]);
  const [providerGroupSchema] = useState<any>(
    localStorage.getItem(Enums.PROVIDER_GROUP_KEY) || ""
  );
  const { id } = useParams();

  let providerGroupUuid = id as string;

  if (!providerGroupUuid) {
    const providerInfo = useSelector(
      (state: any) => state.commonReducer.userDetail?.data
    );
    providerGroupUuid = providerInfo?.providerGroup || "";
  }

  useEffect(() => {
    const newRows: any = props.locationList?.map((location: any) => {
      return {
        locationId: location.locationId,
        uuid: location.uuid,
        name: location.name,
        specialities: location.specialities?.map(
          (state: any, index: number) =>
            `${state.name}${
              index === location?.specialities?.length - 1 ? "" : ", "
            } `
        ),
        isMultiSpeciality:
          location.specialities?.length > 1
            ? "Multi-Speciality"
            : location?.specialities[0]?.name,
        Address: location.physicalAddress.line1,
        city: location.physicalAddress.city,
        state: location.physicalAddress.state,
        zipcode: location.physicalAddress.zipcode,
        active: location.active,
        contact: location.contact,
        status: StatusType.TOGGLE_BTN,
        action: ActionType.ACTION_WITH_EDIT_BTN,
      };
    });
    setLocationList(newRows);
  }, [props]);

  const handleStatusChange = (location: any, event: any) => {
    setLocationList((prev: any) => {
      return prev.map((res: any) => {
        if (res.uuid === location.uuid) {
          return {
            ...res,
            active: event.target.checked,
          };
        }
        return res;
      });
    });

    providerGroupService
      .updateLocationStatus(
        providerGroupSchema,
        location.uuid,
        event.target.checked
      )
      .then((res: any) => {
        if (res?.status >= 200 && res.status <= 299) {
          dispatch(
            alertAction.setAlert({
              open: true,
              message: res.data.message,
              severity: "success",
            })
          );
        } else
          dispatch(
            alertAction.setAlert({
              open: true,
              message: res.data?.message || "",
              severity: "error",
            })
          );
      });
  };

  const handleOpen = () => {
    setOpendrawer(true);
    setOpenModal(false);
  };

  const handleLocationId = (location: any) => {
    setLocationId(location?.uuid);
    handleOpen();
  };
  const handleClose = () => {
    setOpenModal(false);
    setOpendrawer(false);
    props.refetchData();
  };

  const handleOpenModal = (locationId: string) => {
    setOpenModal(true);
    setOpendrawer(false);
    setLocationId(locationId);
  };

  return (
    <React.Fragment key={"locations"}>
      <Paper elevation={0}>
        <CommonTable
          isAdmin={true}
          columns={columns}
          tableData={locationList}
          isLoading={props.isLoading}
          handleStatusChange={(data: any, event: any) =>
            handleStatusChange(data, event)
          }
          handleActionClick={(locationId: any) =>
            handleOpenModal(locationId?.uuid)
          }
          navigateToChildren={(location: any) => handleLocationId(location)}
        />
      </Paper>
      <CustomPagination
        pagination={props.pagination}
        setPagination={props.setPagination}
      />
      <Drawer anchor="right" open={openModal} onClose={handleClose}>
        <Grid
          style={{
            width: "65vw",
            overflowX: "hidden",
            height: "100vh",
            backgroundColor: "#F5F6F9",
          }}
        >
          <LocationModal
            onCloseDrawer={handleClose}
            dialogTitle={"Edit Location"}
            buttonTitle={"Save"}
            locationId={locationId}
            providerGroupUuid={providerGroupUuid as string}
          />
        </Grid>
      </Drawer>
      <LocationDrawer
        locationUuid={locationId}
        open={openDrawer}
        setOpen={setOpendrawer}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
    </React.Fragment>
  );
}
