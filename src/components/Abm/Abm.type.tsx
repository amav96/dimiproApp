import { PropsModalForm } from "../ModalForm/ModalForm.type";
import { TableAliveProps } from "../Table/Table.type";

export interface AbmModalFormProps extends PropsModalForm {
    afterDelete?: Function;
  }
  
  export type AbmModalFormExternal = Omit<AbmModalFormProps, 'isEditMode' | 'visible'>;
  
  export interface AbmProps {
    table: TableAliveProps<string>;
    modalForm: AbmModalFormExternal;
  }