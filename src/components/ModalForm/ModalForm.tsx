import React, { useEffect, useState } from 'react'
import './ModalForm.scss'
import { PropsModalForm } from './ModalForm.type'
import { generatedInputs } from '../Form/Form/Form.type';

export function ModalForm(props: PropsModalForm) {

  const {
    inputs,
    urlStore,
    urlUpdate,
    isEditMode,
    urlShow,
    visible,
    resetAfterClose,
    showRequestConfiguration,
    storeRequestConfiguration,
    updateRequestConfiguration,
    updateDefaultParams
 } = props;

 const [generatedForm, setGeneratedForm] = useState<Array<generatedInputs>>([])
  useEffect(() => {
    
  }, [generatedForm])

  return (
    <div>ModalForm</div>
  )
}
