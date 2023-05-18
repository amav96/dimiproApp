import { requestConfiguration } from "../../types/Api";
import { PropsModalForm } from "../ModalForm/ModalForm.type";
import { TableAliveProps } from "../Table/Table.type";

export interface AbmTableAliveProps extends TableAliveProps<string> {
  addItemAfterStore?: boolean,
  updateItemAfterUpdate?: boolean,
  deleteItemAfterDelete?: boolean,
  updateIcon?: string,
  deleteIcon?: string,
  storeIcon?: string,
  urlDelete?: string,
  deleteRequestConfiguration?: requestConfiguration,
  afterDelete?: Function;
}

export type AbmModalFormExternal = Omit<PropsModalForm, 'isEditMode' | 'visible'>;

export interface AbmProps {
  table: AbmTableAliveProps;
  modalForm: AbmModalFormExternal;
}