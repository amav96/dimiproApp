import React, { useEffect, useRef, useState } from 'react'
import './ModalForm.scss'
import { PropsModalForm } from './ModalForm.type'
import { generatedInputs } from '../Form/Form/Form.type';
import { Form } from '../Form';
import { serializeParams } from '../../services/utils/Api';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';

export function ModalForm(props: PropsModalForm) {

  const {
    inputs,
    urlStore,
    urlUpdate,
    isEditMode = false,
    urlShow,
    visible,
    resetAfterClose,
    showRequestConfiguration,
    storeRequestConfiguration,
    updateRequestConfiguration,
    updateDefaultParams,
    onCloseModal,
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
  }, [inputs])

  const [internalVisible, setInternalVisible] = useState<boolean>(false)

  const refModalForm = useRef<HTMLFormElement | null>(null)

  const handleSubmit = (data: any) => {
    console.log(data)
    if(!isEditMode) save(data)
    else update(data)
  }

  const loading = useRef<boolean>(false);
  const save = async (data : any) => {
    if(!loading.current){
        loading.current = true
        const { items, isFormValid } = data
        if(isFormValid !== undefined && !isFormValid){
            // $toast.info('Debes llenar el formulario correctamente');
        } else {
            try {
              const formParams = await serializeParams({...items})
              let params = {
                  ...{
                      method: "POST", 
                      body: formParams instanceof FormData ? formParams : JSON.stringify(formParams)
                  },
                  ...storeRequestConfiguration,
              }

              const response = await fetch(urlStore, params);
              const result = await response.json();

              loading.current = false
              const { data, error } = result
              if(error){
                  // $toast.error('Ha ocurrido un error con el servidor');
              }else {
                  // $toast.success('Guardado correctamente');
                  // emit('afterStore', data)
                  hideModal()
              }
            } catch (error) {
                loading.current = false
                // $toast.error('Ha ocurrido un error con el servidor b2');
            }
        }
    }
  }

  const update = async (data : any) => {
    if(!loading.current){
        loading.current = true
        const { items, isFormValid } = data
        if(isFormValid !== undefined && !isFormValid){
            // $toast.info('Debes llenar el formulario correctamente');
        } else {
            try {
              const formParams = await serializeParams({...items})
              let params = {
                  ...{
                      method: "PATCH", 
                      body: formParams instanceof FormData ? formParams : JSON.stringify(formParams)
                  },
                  ...updateRequestConfiguration,
              }

              const response = await fetch(urlUpdate, params);
              const result = await response.json();

              loading.current = false
              const { data, error } = result
              if(error){
                  // $toast.error('Ha ocurrido un error con el servidor');
              }else {
                  // $toast.success('Guardado correctamente');
                  // emit('afterUpdate', data)
                  hideModal()
              }
            } catch (error) {
                loading.current = false
                // $toast.error('Ha ocurrido un error con el servidor b2');
            }

        }
    }
  }

  const loadingEntity = useRef<boolean>(false)
  const getEntity = async () => {
    if(urlShow){
      loadingEntity.current = true
      let params = {
          ...{ method: "GET" },
          ...showRequestConfiguration
      }
      const response = await fetch(urlShow, params);
      const result = await response.json();
      loadingEntity.current = false
      if(result) completeEntity(result)
    }
  }

  const completeEntity = (data : object) => {
    generatedForm.forEach((val, index) => {
        if(data.hasOwnProperty(val.key)){
            let property = data[val.key as keyof object];
            setGeneratedForm((prevState) => 
                prevState.map((obj,i) => {
                if(i === index){
                  return {...obj, ...{ value: property} }
                }
                return obj
              })
            )
            // generatedForm[index].value = property
        }
    })
  }

  const resetForm = () => {
      generatedForm.forEach((val, index) => {
          if(val.value !== null && typeof val.value === 'object'){
              if(Array.isArray(val.value)){
                  generatedForm[index].value = []
              } else {
                  generatedForm[index].value = {}
              }
          } else if (typeof val.value === 'string') {
              generatedForm[index].value = ''
          } else {
              generatedForm[index].value = null
          }
      })
  }

  useEffect(() => {
    isEditMode && getEntity()
  }, [])

  useEffect(() => {
    // return () => {
     console.log(isEditMode)
      isEditMode && !loadingEntity.current && getEntity()
    // }
  }, [isEditMode])

  useEffect(() => {
    setInternalVisible(visible)
  }, [visible])

  const hideModal = () => {
    setInternalVisible(false)
    onCloseModal && onCloseModal()
    // internalVisible.current = false
  }

  return (
    <Modal
    isOpen={internalVisible}
    closeModal={hideModal}
    >
      <div className="p-4">
        {
        <Form
        inputs={generatedForm}
        onSubmit={handleSubmit}
        >
          <Button
          text={'Enviar formulario'}
          customClass={'mt-4 mr-4'}
          />
        </Form>
        }
      </div>
    </Modal>
  )
}
