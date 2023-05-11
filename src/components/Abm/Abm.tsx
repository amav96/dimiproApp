import React, { useState } from 'react'
import { AbmModalFormProps, AbmProps } from './Abm.type'
import { TableAlive } from '../TableAlive/TableAlive'
import { ModalForm } from '../ModalForm/ModalForm';

export function Abm(props: AbmProps) {
  const {
      table: {
        columns,
        urlIndex,
        requestConfiguration,
        inputs : filterInputs,
        searchable
      },
      modalForm: {
        inputs,
        urlStore,
        urlUpdate,
        urlShow,
        resetAfterClose,
        showRequestConfiguration,
        storeRequestConfiguration,
        updateRequestConfiguration,
        onCloseModal,
        afterUpdate,
        afterStore,
      }
  } = props;

  const [modalFormData, setModalFormData] = useState<AbmModalFormProps>({
    inputs,
    urlStore,
    urlUpdate,
    urlShow,
    isEditMode: false,
    visible: false,
    resetAfterClose,
    showRequestConfiguration,
    storeRequestConfiguration,
    updateRequestConfiguration,
    onCloseModal,
    afterUpdate,
    afterStore,
  })

  return (
    <div>
      <TableAlive
      inputs={filterInputs}
      columns={columns}
      urlIndex={urlIndex}
      searchable={searchable}
      requestConfiguration={requestConfiguration}
      />

      <ModalForm
      inputs={inputs}
      urlStore={modalFormData.urlStore}
      urlUpdate={modalFormData.urlUpdate}
      urlShow={modalFormData.urlShow}
      isEditMode={modalFormData.isEditMode}
      visible={modalFormData.visible}
      resetAfterClose={true}
      showRequestConfiguration={modalFormData.showRequestConfiguration}
      storeRequestConfiguration={modalFormData.storeRequestConfiguration}
      updateRequestConfiguration={modalFormData.updateRequestConfiguration}
      onCloseModal={modalFormData.onCloseModal}
      afterUpdate={modalFormData.afterUpdate}
      afterStore={modalFormData.afterStore}
      />
    </div>
  )
}
