import React, { ReactElement, ReactPortal, forwardRef, useCallback, useEffect, useRef } from 'react'
import { Input } from '../Input';
import { Textarea } from '../Textarea';
import { Select } from '../Select';
import { Switch } from '../Switch/Switch';
import './Form.scss'
import { useState } from 'react';
import { Slot, generatedInputs } from './Form.type';
import { PropsSelectKey, onChangeSelect } from '../Select/Select.type';
import { DatePack } from '../DatePack/DatePack';
import { File } from '../File/File';
import { PropsDateKey } from '../DatePack/DatePack.type';
import { PropsFileKey } from '../File/File.type';
import { PropsSwitchKey } from '../Switch/Switch.type';
import { Validator } from '../../../services/utils/Validator';
import { isEmpty } from '../../../services/utils/Validations';
import { PropsTextAreaKey } from '../Textarea/Textarea.type';
import { PropsInputKey } from '../Input/Input.type';

type field<K extends string | number> = {
  [key in K]: ((data : { input: generatedInputs, formValues: any} ) => React.ReactNode) | undefined;
}

interface Props<K extends string | number > {
  inputs: Array<generatedInputs | Slot>,
  onSubmit?: Function,
  scopedFields?: field<K>,
  children?: JSX.Element | JSX.Element[],
}

type keyValue<K extends string | number> = {
  [key in K]: string | number | Array<any> | object;
}
export const Form = forwardRef(function Form(props: Props<string | number>, ref) {
  const { 
    inputs,
    scopedFields,
    children,
    onSubmit
  } = props;
  const [generatedInputs, setGeneratedInputs] = useState<Array<generatedInputs>>([])
  const [formValues, setFormValues] = useState<any>({})


  useEffect(() => {
    inputs.forEach(({key}, i) => {
      const index = generatedInputs.map((m) => m.key).indexOf(key);
      if (index > -1) {
        let updateInput : generatedInputs = inputs[i] as generatedInputs
        setGeneratedInputs((prevState) => 
            prevState.map((obj,i) => {
              if(i === index){
                return {...obj, ...inputs[i] }
              }
            return obj
          })
        )
        
        if (updateInput.value && updateInput.value !== undefined) {
          setFormValues((prev: keyValue<string | number>) => ({
            ...prev,
            [key]: updateInput.value
          }))
        }
      } else {
        let newInput: generatedInputs  = inputs[i] as generatedInputs;
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
        if(!isEmpty(validator.getErrors)){
          setGeneratedInputs((prevState) => 
              prevState.map((obj,i) => {
                if(i === index){
                  return {...obj, ...{errors : validator.getErrors} }
                }
              return obj
            })
          )
          generatedInputs[index].errors = validator.getErrors;
          result = false;
        }
      }
    })
    return result
  }

  const handleChangeInput = (evt: React.ChangeEvent<HTMLInputElement>, input: PropsInputKey) => {
    const { name: key , value } = evt.target;
    setFormValues((prev: keyValue<string | number>) => ({
      ...prev,
      [key]: value,
    }));
    if(input.onInput){
      input.onInput({value, input})
    }
  }

  const handleChangeTextarea = (evt: React.ChangeEvent<HTMLInputElement>, input: PropsTextAreaKey) => {
    const { name: key , value } = evt.target;
    setFormValues((prev: keyValue<string | number>) => ({
      ...prev,
      [key]: value,
    }));
    if(input.onTextarea){
      input.onTextarea({value, input})
    }
  }

  const handleChangeDate = (date : Date, input: PropsDateKey):void => {
    setFormValues((prev: keyValue<string | number>) => ({
      ...prev,
      [input.key]: date,
    }));
    if(input.onDate){
      input.onDate({value: date, input})
    }
  }

  const onChangeSelect = (data: onChangeSelect, input: PropsSelectKey):void => {
    setFormValues((prev: keyValue<string | number>) => ({
      ...prev,
      [input.key]: data.value,
    }));
    if(input.onSelect){
      input.onSelect({...data, ...{input: input}})
    }
  }

  const onRemoveSelect = (data: onChangeSelect, input: PropsSelectKey):void => {
    if(input.onRemove){
      input.onRemove({ ...data, ...{input: input}})
    }
  }

  const handleChangeSwitch = (value: object | number | boolean , input: PropsSwitchKey) :void => {
    if(typeof value === 'number' || typeof value === 'object' || typeof value === 'boolean'){
      setFormValues((prev: keyValue<string | number>) => ({
        ...prev,
        [input.key]: value,
      }));
      if(input.onSwitch){
        input.onSwitch({value, input})
      }
    }
  }

  const handleChangeFile = (value: Array<any>, input : PropsFileKey) => {
    setFormValues((prev: keyValue<string | number>) => {
        return ({
          ...prev,
          [input.key]:  value,
        })
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='Form grid grid-cols-12 gap-2'>
      {
        generatedInputs.filter((val) => val.hidden === undefined || val.hidden === false)
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
            if(!input.hasOwnProperty('type') || (input.hasOwnProperty('type') && (input.type === 'text'))){
              return (
                <Input
                key={index}
                type={generatedInputs[index].type}
                value={formValues[input.key]}
                name={generatedInputs[index].name}
                placeholder={generatedInputs[index].placeholder}
                onChange={(e : React.ChangeEvent<HTMLInputElement>) => handleChangeInput(e,input)}
                validations={generatedInputs[index].validations}
                cols={generatedInputs[index].cols}
                errors={generatedInputs[index].errors}
                />
              )
            } else if (input.type === 'textarea'){
              return (
                <Textarea
                key={index}
                type={generatedInputs[index].type}
                value={formValues[input.key]}
                name={generatedInputs[index].name}
                placeholder={generatedInputs[index].placeholder}
                onChange={(e : React.ChangeEvent<HTMLInputElement>) => handleChangeTextarea(e,input)}
                validations={generatedInputs[index].validations}
                cols={generatedInputs[index].cols}
                errors={generatedInputs[index].errors}
                />
              )
            } else if (input.type === 'datetime'){
              return (
                <DatePack
                key={index}
                type={generatedInputs[index].type}
                value={formValues[input.key]}
                name={generatedInputs[index].name}
                placeholder={generatedInputs[index].placeholder}
                onChange={(e : any) => handleChangeDate(e,input)}
                dateFormat={generatedInputs[index].dateFormat}
                showTimeSelect={generatedInputs[index].showTimeSelect}
                validations={generatedInputs[index].validations}
                cols={generatedInputs[index].cols}
                errors={generatedInputs[index].errors}
                />
              )
            } else if (input.type === 'select'){
              return (
                <Select
                key={index}
                type={generatedInputs[index].type}
                placeholder={generatedInputs[index].placeholder}
                name={generatedInputs[index].name}
                options={generatedInputs[index].options}
                value={formValues[input.key]}
                onChange={(e : onChangeSelect) => onChangeSelect(e,input)}
                onRemove={(e : onChangeSelect) => onRemoveSelect(e,input)}
                multiple={generatedInputs[index].multiple}
                clearable={generatedInputs[index].clearable}
                validations={generatedInputs[index].validations}
                cols={generatedInputs[index].cols}
                errors={generatedInputs[index].errors}
                />
              )
            } else if (input.type === 'check' || input.type === 'switch'){
              return(
                <Switch
                key={index}
                type={generatedInputs[index].type}
                name={generatedInputs[index].name}
                label={generatedInputs[index].label}
                option={generatedInputs[index].option}
                value={formValues[input.key]}
                onChange={ (value: object | Array<object>) => handleChangeSwitch(value, input)}
                cols={generatedInputs[index].cols}
                />
              )
            } else if (input.type === 'file' ){
              return(
                <File
                key={`file-${index}`}
                type={generatedInputs[index].type}
                name={generatedInputs[index].name}
                value={formValues[input.key]}
                onChange={ (value: Array<any> | Array<object>) => handleChangeFile(value, input)}
                validations={generatedInputs[index].validations}
                cols={generatedInputs[index].cols}
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

