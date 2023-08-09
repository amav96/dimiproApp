import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from 'react'
import { Input, Textarea, Select, Switch, File } from '@package';
import './Form.scss'
import { useState } from 'react';
import { PropsSelectKey, onChangeSelect,PropsDateKey,PropsFileKey,PropsSwitchKey,PropsTextAreaKey,PropsInputKey, Slot, GlobalInputs } from '@packageTypes'
import { DatePack } from '../DatePack/DatePack';
import { Validator } from '@services/utils/Validator';
import { isEmpty } from '@services/utils/Validations';
import { field } from './Form.type';


interface Props<K extends string | number > {
  inputs: Array<GlobalInputs | Slot>,
  onSubmit?: Function,
  scopedFields?: field<K>,
  children?: JSX.Element | JSX.Element[],
}

type keyValue<K extends string | number> = {
  [key in K]: string | number | Array<any> | object;
}
export const Form = forwardRef(function Form(props: Props<string | number>, ref: React.Ref<HTMLFormElement>) {
  const {
    inputs,
    scopedFields,
    children,
    onSubmit
  } = props;
  const [generatedInputs, setGeneratedInputs] = useState<Array<GlobalInputs>>([])
  const [formValues, setFormValues] = useState<any>({})
  const memoizedFormValues = useMemo(() => formValues, [formValues]);
  const memoizedGeneratedInputs = useMemo(() => generatedInputs, [generatedInputs]);

  useEffect(() => {
    inputs.forEach(({key}, i) => {
      const index = generatedInputs.map((m) => m.key).indexOf(key);
      if (index > -1) {
        let updateInput : GlobalInputs = inputs[i] as GlobalInputs
        setGeneratedInputs((prevState) =>
            prevState.map((obj,i) => {
              if(i === index){
                return {...obj, ...inputs[i] }
              }
            return obj
          })
        )

        if ((updateInput.value && updateInput.value !== undefined && !Array.isArray(updateInput.value)) || 
          (updateInput.value && Array.isArray(updateInput.value) && updateInput.value.length > 0)) {
          setFormValues((prev: keyValue<string | number>) => ({
            ...prev,
            [key]: updateInput.value
          }))
        }
      } else {
        let newInput: GlobalInputs  = inputs[i] as GlobalInputs;
        setGeneratedInputs((prev) => ([
          ...prev,
          ...[{ ...newInput}]
        ]))
        Object.defineProperty(formValues, key,
          {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {},
          });
          setFormValues((prev: keyValue<string | number>) => {
            if (newInput.hasOwnProperty('value') && newInput.value) {
              return {
                ...prev,
                [key]: newInput.value
              }
            } else {
              return {
                ...prev,
                [key]: ''
              }
            }
          })
      }
    })
  }, [inputs])

  const hasValidations = useRef<boolean>(false)
  const hasFormatValue = useRef<boolean>(true)
  useEffect(() => {
    hasValidations.current = generatedInputs.some((val) => val.hasOwnProperty('validations')  && val.validations)
    hasFormatValue.current = generatedInputs.some((val) => val.hasOwnProperty('formatValue')  && val.formatValue && typeof val.formatValue === 'function')
  }, [generatedInputs])

  const handleSubmit = useCallback( async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if(onSubmit){
      onSubmit(await getValues())
    }
  }, [onSubmit, formValues]);


  const getValues = () =>  {
    return new Promise( async (resolve) => {
      if(hasValidations.current){
        resolve({ items: await processFormValues(formValues), isFormValid: isValid()})
      } else {
        resolve({ items: await processFormValues(formValues)})
      }
    });
  }

  const resetValues = () :Promise<object> =>  {
    return new Promise( async (resolve) => {

      const keys = Object.keys(formValues);
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        const value = formValues[key];
        if (Array.isArray(value)) {
          setFormValues((prev: any) => ({
            ...prev,
            [key]: []
          }));
        } else if (typeof value === 'object' && value !== null) {
          setFormValues((prev: any) => ({
            ...prev,
            [key]: {}
          }));
        } else if (typeof value === 'string') {
          setFormValues((prev: any) => ({
            ...prev,
            [key]: ''
          }));
        } else {
          setFormValues((prev: any) => ({
            ...prev,
            [key]: null
          }));
        }
      }

      generatedInputs.forEach((val, index) => {
        if(val.value !== null && typeof val.value === 'object'){
          if(Array.isArray(val.value)){
            setGeneratedInputs((prev) => prev.map((val,i) => i === index ? { ...val, ...{ value: [] }} : val))
          } else {
            setGeneratedInputs((prev) => prev.map((val,i) => i === index ? { ...val, ...{ value: {} }} : val))
          }
        } else if (typeof val.value === 'string') {
          setGeneratedInputs((prev) => prev.map((val,i) => i === index ? { ...val, ...{ value: '' }} : val))
        } else {
          setGeneratedInputs((prev) => prev.map((val,i) => i === index ? { ...val, ...{ value: null }} : val))
        }
      })
      resolve(formValues);
    });
  }

  const processFormValues = (formValues: any) : Promise<object> => {
    return new Promise( async (resolve) => {
      if(hasFormatValue.current){
        let buildObject: any = {}
        generatedInputs.forEach((value) => {
          buildObject[value.key] = value.formatValue ? value.formatValue(formValues[value.key]) : formValues[value.key]
        })
        resolve(buildObject)
      } else {
        resolve(formValues)
      }
    })
  }

    // Validator
  const validator = new Validator();
  const isValid = () : boolean => {

    // Este metodo se puede usar desde el componente padre para saber
    // si el formulario es valido y recolectar los mensajes de error
    let result = true

    generatedInputs.forEach((_,index) => {
      let currentInput = generatedInputs[index]
      if(currentInput.validations){
        validator.validate(formValues[currentInput.key], currentInput.validations);
        if(!isEmpty(validator.getErrors())){
          setGeneratedInputs((prevState) =>
              prevState.map((obj,i) => {
                if(i === index){
                  return {...obj, ...{errors : validator.getErrors()} }
                }
              return obj
            })
          )
          generatedInputs[index].errors = (validator.getErrors());
          result = false;
        }
      }
    })
    return result
  }

  const handleChangeInput = useCallback((evt: React.ChangeEvent<HTMLInputElement>, input: PropsInputKey) => {
    const { name: key , value } = evt.target;
    setFormValues((prev: keyValue<string | number>) => ({
      ...prev,
      [key]: value,
    }));
    if(input.onInput){
      input.onInput({value, input})
    }
  },[])

  const handleChangeTextarea = useCallback((evt: React.ChangeEvent<HTMLInputElement>, input: PropsTextAreaKey) => {
    const { name: key , value } = evt.target;
    setFormValues((prev: keyValue<string | number>) => ({
      ...prev,
      [key]: value,
    }));
    if(input.onTextarea){
      input.onTextarea({value, input})
    }
  },[])

  const handleChangeDate = useCallback((date : Date, input: PropsDateKey):void => {
    setFormValues((prev: keyValue<string | number>) => ({
      ...prev,
      [input.key]: date,
    }));
    if(input.onDate){
      input.onDate({value: date, input})
    }
  },[])

  const onChangeSelect = useCallback((data: onChangeSelect, input: PropsSelectKey):void => {
    setFormValues((prev: keyValue<string | number>) => ({
      ...prev,
      [input.key]: data.value,
    }));
    if(input.onSelect){
      input.onSelect({...data, ...{input: input}})
    }
  },[])

  const onRemoveSelect = useCallback((data: onChangeSelect, input: PropsSelectKey):void => {
    if(input.onRemove){
      input.onRemove({ ...data, ...{input: input}})
    }
  },[])

  const handleChangeSwitch = useCallback((value: object | number | boolean , input: PropsSwitchKey) :void => {
    if(typeof value === 'number' || typeof value === 'object' || typeof value === 'boolean'){
      setFormValues((prev: keyValue<string | number>) => ({
        ...prev,
        [input.key]: value,
      }));
      if(input.onSwitch){
        input.onSwitch({value, input})
      }
    }
  },[])

  const handleChangeFile = useCallback((value: Array<any>, input : PropsFileKey) => {
    setFormValues((prev: keyValue<string | number>) => {
        return ({
          ...prev,
          [input.key]:  value,
        })
    });
  },[])

  //@ts-ignore
  useImperativeHandle(ref, () => ({
    resetValues: resetValues,
  }));

  return (
    <form onSubmit={handleSubmit} ref={ref}>
      <div className='Form c-grid c-grid-cols-12 c-gap-2'>
      {
        memoizedGeneratedInputs.filter((val) => val.hidden === undefined || val.hidden === false)
        .map((input, index) => {
          if(input.slot && scopedFields?.[input.key]){
            return(
              <div
                key={`slot-${index}`}
                className={`${input.className ? input.className : ''}`}
              >
                 {typeof scopedFields[input.key] === 'function' && scopedFields?.[input.key]?.({input , formValues})}
              </div>
            )
          }else {
            if(!input.hasOwnProperty('type') || (input.hasOwnProperty('type') && (input.type === 'text' || input.type === 'color' || input.type === 'email' || input.type === 'password' || input.type === 'number'))){
              return (
                <Input
                icon={memoizedGeneratedInputs[index].icon}
                key={index}
                type={memoizedGeneratedInputs[index].type}
                value={memoizedFormValues[input.key]}
                name={memoizedGeneratedInputs[index].name}
                placeholder={memoizedGeneratedInputs[index].placeholder}
                onChange={(e : React.ChangeEvent<HTMLInputElement>) => handleChangeInput(e,input)}
                validations={memoizedGeneratedInputs[index].validations}
                cols={memoizedGeneratedInputs[index].cols}
                errors={memoizedGeneratedInputs[index].errors}
                customClass={memoizedGeneratedInputs[index].customClass}
                title={memoizedGeneratedInputs[index].title}
                />
              )
            } else if (input.type === 'textarea'){
              return (
                <Textarea
                icon={memoizedGeneratedInputs[index].icon}
                key={index}
                type={memoizedGeneratedInputs[index].type}
                value={memoizedFormValues[input.key]}
                name={memoizedGeneratedInputs[index].name}
                placeholder={memoizedGeneratedInputs[index].placeholder}
                onChange={(e : React.ChangeEvent<HTMLInputElement>) => handleChangeTextarea(e,input)}
                validations={memoizedGeneratedInputs[index].validations}
                cols={memoizedGeneratedInputs[index].cols}
                errors={memoizedGeneratedInputs[index].errors}
                customClass={memoizedGeneratedInputs[index].customClass}
                title={memoizedGeneratedInputs[index].title}
                />
              )
            } else if (input.type === 'datetime'){
              return (
                <DatePack
                key={index}
                type={memoizedGeneratedInputs[index].type}
                value={memoizedFormValues[input.key]}
                name={memoizedGeneratedInputs[index].name}
                placeholder={memoizedGeneratedInputs[index].placeholder}
                onChange={(e : any) => handleChangeDate(e,input)}
                dateFormat={memoizedGeneratedInputs[index].dateFormat}
                showTimeSelect={memoizedGeneratedInputs[index].showTimeSelect}
                validations={memoizedGeneratedInputs[index].validations}
                cols={memoizedGeneratedInputs[index].cols}
                errors={memoizedGeneratedInputs[index].errors}
                customClass={memoizedGeneratedInputs[index].customClass}
                title={memoizedGeneratedInputs[index].title}
                icon={memoizedGeneratedInputs[index].icon}
                />
              )
            } else if (input.type === 'select'){
              return (
                <Select
                icon={memoizedGeneratedInputs[index].icon}
                key={index}
                type={memoizedGeneratedInputs[index].type}
                placeholder={memoizedGeneratedInputs[index].placeholder}
                name={memoizedGeneratedInputs[index].name}
                label={memoizedGeneratedInputs[index].label}
                trackBy={memoizedGeneratedInputs[index].trackBy}
                options={memoizedGeneratedInputs[index].options}
                value={memoizedFormValues[input.key]}
                onChange={(e : onChangeSelect) => onChangeSelect(e,input)}
                onRemove={(e : onChangeSelect) => onRemoveSelect(e,input)}
                multiple={memoizedGeneratedInputs[index].multiple}
                clearable={memoizedGeneratedInputs[index].clearable}
                validations={memoizedGeneratedInputs[index].validations}
                cols={memoizedGeneratedInputs[index].cols}
                errors={memoizedGeneratedInputs[index].errors}
                customClass={memoizedGeneratedInputs[index].customClass}
                title={memoizedGeneratedInputs[index].title}
                />
              )
            } else if (input.type === 'check' || input.type === 'switch'){
              return(
                <Switch
                key={index}
                type={memoizedGeneratedInputs[index].type}
                name={memoizedGeneratedInputs[index].name}
                label={memoizedGeneratedInputs[index].label}
                option={memoizedGeneratedInputs[index].option}
                value={memoizedFormValues[input.key]}
                defaultValue={memoizedGeneratedInputs[index].defaultValue}
                onChange={ (value: object | Array<object>) => handleChangeSwitch(value, input)}
                cols={memoizedGeneratedInputs[index].cols}
                customClass={memoizedGeneratedInputs[index].customClass}
                title={memoizedGeneratedInputs[index].title}
                />
              )
            } else if (input.type === 'file' ){
              return(
                <File
                icon={memoizedGeneratedInputs[index].icon}
                key={`file-${index}`}
                type={memoizedGeneratedInputs[index].type}
                name={memoizedGeneratedInputs[index].name}
                value={memoizedFormValues[input.key]}
                onChange={ (value: Array<any> | Array<object>) => handleChangeFile(value, input)}
                validations={memoizedGeneratedInputs[index].validations}
                cols={memoizedGeneratedInputs[index].cols}
                customClass={memoizedGeneratedInputs[index].customClass}
                title={memoizedGeneratedInputs[index].title}
                onRemove={memoizedGeneratedInputs[index].onRemove}
                displayImages={memoizedGeneratedInputs[index].displayImages}
                resetOnOpen={memoizedGeneratedInputs[index].resetOnOpen}
              />
              )
            }
          }
        })
      }
      </div>
      {children}
    </form>

  )
})

