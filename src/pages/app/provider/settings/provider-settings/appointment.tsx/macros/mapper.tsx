import { ActionType } from "../../../../../../../components/common/enums-and-interfaces/enums";

export const mapCreateMacroData = (data: any): any => {
  return {
    templateName: data.templateName,
    description: data.description,
    id: data.id,
    uuid: data.uuid,
    providerGroupUuid: data.providerGroupUuid,
  };
};

export const macrosListMapper = (data: any) => {
  return {
    templateName: data?.templateName,
    created: data?.created,
    uuid: data?.uuid,
    id: data?.id,
    action: ActionType.ACTION_WITH_MOREVERTICON,
    active: true,
    description: data?.description,
  };
};
