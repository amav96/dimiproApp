import { TableAliveProps, PropsModalForm, requestConfiguration } from '@packageTypes'

export interface AbmTableAliveProps extends TableAliveProps<string> {
  addItemAfterStore?: boolean,
  updateItemAfterUpdate?: boolean,
  deleteItemAfterDelete?: boolean,
  updateIcon?: string,
  deleteIcon?: string,
  storeIcon?: string,
  urlDelete?: string,
  modelDelete?: string
  deleteRequestConfiguration?: requestConfiguration,
  afterDelete?: Function;
}

export type AbmModalFormExternal = Omit<PropsModalForm, 'isEditMode' | 'visible'>;

export interface AbmProps {
  table: AbmTableAliveProps;
  modalForm: AbmModalFormExternal;
}