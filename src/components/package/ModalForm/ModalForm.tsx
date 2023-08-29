import React, { useEffect, useRef, useState } from 'react'
import { GlobalInputs, PropsModalForm } from '@packageTypes'
import { Form } from '../Form';
import { serializeParams } from '@services/utils/Api';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';


export function ModalForm(props: PropsModalForm<string | number>) {

  const {
    inputs,
    urlStore,
    urlUpdate,
    isEditMode = false,
    urlShow,
    modelStore = 'data',
    modelUpdate = 'data',
    modelDelete = 'data',
    modelShow = 'data',
    visible,
    resetAfterClose,
    showRequestConfiguration,
    storeRequestConfiguration,
    updateRequestConfiguration,
    updateDefaultParams,
    onCloseModal,
    afterUpdate,
    beforeUpdate,
    afterStore,
    beforeStore,
    handleUpdateErrors,
    handleStoreErrors,
    closable,
    title,
    scopedFields,
    onShow
 } = props;


 const [generatedForm, setGeneratedForm] = useState<Array<GlobalInputs>>([])
  useEffect(() => {
     inputs?.forEach(({key}, i) => {
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
         let newInput: GlobalInputs  = inputs[i] as GlobalInputs;
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

  const [loading, setLoading] = useState<boolean>(false)
  const save = async (data : any) => {
    if(!loading && urlStore){
        setLoading(true)
        const { items, isFormValid } = data
        if(beforeStore){
          beforeStore({
            type: 'formInvalid',
            message: 'Must fill the form correctly',
            ...data
          })
        }
        if(isFormValid !== undefined && !isFormValid){
          setLoading(false)
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
              setLoading(false)
              const { error, errors } = result
              if(error || errors){
                if(afterStore){
                  afterStore({
                    type: 'serverMessage',
                    message: 'S1 An error has occurred with the server',
                    ...data,
                    ...result,
                  })
                }
              }else {
               
                if(afterStore){
                  if(typeof result === 'object'){
                    afterStore(result[modelStore])
                  } else {
                    afterStore(result)
                  }
                }
              }
            } catch (error) {
                setLoading(false)
                if(afterStore){
                  afterStore({
                    type: 'serverError',
                    message: 'S2 An error has occurred with the server',
                    ...data
                  })
                }
            }
        }
    }
  }

  const update = async (data : any) => {
    if(!loading && urlUpdate){
        setLoading(true)
        const { items, isFormValid } = data
        if(beforeUpdate){
          beforeUpdate({
            type: 'formInvalid',
            message: 'Must fill the form correctly',
            ...data
          })
        }
        if(isFormValid !== undefined && !isFormValid){
          setLoading(false)
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

              setLoading(false)
              const { error, errors } = result
              if(error || errors){
                if(afterUpdate){
                  afterUpdate({
                    type: 'serverMessage',
                    message: 'U1 An error has occurred with the server',
                    ...data,
                    ...result,
                  })
                }
              }else {
                if(afterUpdate){
                  if(typeof result === 'object'){
                    afterUpdate(result[modelUpdate])
                  } else {
                    afterUpdate(result)
                  }
                }
              }
            } catch (error) {
                setLoading(false)
                if(afterUpdate){
                  afterUpdate({
                    type: 'serverError',
                    message: 'U2 An error has occurred with the server',
                    ...data
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
      let result = await response.json();

      result = result[modelShow]
      if(onShow){
        onShow(result)
      }
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

  return (
    <Modal
    isOpen={internalVisible}
    closable={closable}
    title={title}
    closeModal={hideModal}
    >
      <div className="c-p-4">
        {
        <Form
        inputs={generatedForm}
        onSubmit={handleSubmit}
        scopedFields={scopedFields}
        >
          <Button
          disabled={loading}
          customClass={'c-mt-4 c-mr-4'}
          >
           {loading ? 'Loading...' : 'Send'}
          </Button>
        </Form>
        }
      </div>
    </Modal>
  )
}
