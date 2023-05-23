import { requestConfiguration } from '../../types'
import { PropsModalForm } from '../../types'
import { TableAliveProps } from '../../types'

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