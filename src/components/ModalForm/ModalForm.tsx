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
    inputs.forEach(({key}, i) => {
      const index = generatedForm.map((m) => m.key).indexOf(key);
      if (index > -1) {
        setGeneratedForm((prevState) => 
            prevState.map((obj,i) => {
              if(i === index){
                return {...obj, ...inputs[i] }
              }
            return obj
          })
        )
      } else {
        let newInput: generatedInputs  = inputs[i] as generatedInputs;
        setGeneratedForm((prev) => ([
          ...prev,
          ...[{ ...newInput }]
        ]))
      }
    })
  }, [generatedForm])

  return (
    <div>ModalForm</div>
  )
}
