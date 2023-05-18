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
    afterUpdate,
    afterStore,
    handleUpdateErrors,
    handleStoreErrors
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

  const handleSubmit = (data: any) => {
    if(!isEditMode) save(data)
    else update(data)
  }

  const loading = useRef<boolean>(false);
  const save = async (data : any) => {
    if(!loading.current){
        loading.current = true
        const { items, isFormValid } = data
        if(isFormValid !== undefined && !isFormValid){
          if(handleStoreErrors){
            handleStoreErrors({
              type: 'formInvalid',
              message: 'Must fill the form correctly',
              ...items,
              ...isFormValid
            })
          }
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
                if(handleStoreErrors){
                  handleStoreErrors({
                    type: 'serverMessage',
                    message: 'An error has occurred with the server',
                    ...items,
                    ...isFormValid,
                    ...{ server : {
                        ...error
                      }
                    }
                  })
                }
              }else {
                if(afterStore){
                  afterStore(result)
                }
              }
            } catch (error) {
                loading.current = false
                if(handleStoreErrors){
                  handleStoreErrors({
                    type: 'serverError',
                    message: 'An error has occurred with the server',
                    ...items,
                    ...isFormValid,
                    ...{ 
                      server : {
                        error
                      }
                    }
                  })
                }
            }
        }
    }
  }

  const update = async (data : any) => {
    if(!loading.current){
        loading.current = true
        const { items, isFormValid } = data
        if(isFormValid !== undefined && !isFormValid){
          if(handleUpdateErrors){
            handleUpdateErrors({
              type: 'formInvalid',
              message: 'Must fill the form correctly',
              ...items,
              ...isFormValid
            })
          }
            // ('Debes llenar el formulario correctamente');
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
                if(handleUpdateErrors){
                  handleUpdateErrors({
                    type: 'serverMessage',
                    message: 'An error has occurred with the server',
                    ...items,
                    ...isFormValid,
                    ...{ server : {
                        ...error
                      }
                    }
                  })
                }
              }else {
                if(afterUpdate){
                  afterUpdate(result)
                }
              }
            } catch (error) {
                loading.current = false
                if(handleUpdateErrors){
                  handleUpdateErrors({
                    type: 'serverError',
                    message: 'An error has occurred with the server',
                    ...items,
                    ...isFormValid,
                    ...{ 
                      server : {
                        error
                      }
                    }
                  })
                }
            }

        }
    }
  }

  const loadingEntity = useRef<boolean>(false)
  const show = async () => {
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
      }
    })
  }

  useEffect(() => {
    isEditMode && show()
  }, [])

  useEffect(() => {
    isEditMode && !loadingEntity.current && show()
  }, [isEditMode])

  useEffect(() => {
    setInternalVisible(visible)
  }, [visible])

  const hideModal = () => {
    resetForm()
    setInternalVisible(false)
    onCloseModal && onCloseModal()
  }

  const resetForm = () => {
    generatedForm.forEach((val, index) => {
      if(val.value !== null && typeof val.value === 'object'){
        if(Array.isArray(val.value)){
          setGeneratedForm((prev) => prev.map((val,i) => i === index ? { ...val, ...{ value: [] }} : val))
        } else {
          setGeneratedForm((prev) => prev.map((val,i) => i === index ? { ...val, ...{ value: {} }} : val))
        }
      } else if (typeof val.value === 'string') {
        setGeneratedForm((prev) => prev.map((val,i) => i === index ? { ...val, ...{ value: '' }} : val))
      } else {
        setGeneratedForm((prev) => prev.map((val,i) => i === index ? { ...val, ...{ value: null }} : val))
      }
    })
  }

  const refModalForm = useRef<HTMLFormElement | null>(null)

  return (
    <Modal
    isOpen={internalVisible}
    closeModal={hideModal}
    >
      <div className="c-p-4">
        {
        <Form
        inputs={generatedForm}
        onSubmit={handleSubmit}
        >
          <Button
          text={'Enviar formulario'}
          customClass={'c-mt-4 c-mr-4'}
          />
        </Form>
        }
      </div>
    </Modal>
  )
}
