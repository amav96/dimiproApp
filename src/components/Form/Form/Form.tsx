import React, { ReactElement, ReactPortal, useEffect, useRef } from 'react'
import { Input } from '../Input';
import { Textarea } from '../Textarea';
import { Select } from '../Select';
import { Switch } from '../Switch/Switch';
import './Form.scss'
import { useState } from 'react';
import { Slot, generatedInputWithoutKey, generatedInputs } from './Form.type';
import { PropsSelectKey, onChangeSelect } from '../Select/Select.type';
import { DatePack } from '../DatePack/DatePack';
import { File } from '../File/File';
import { PropsDateKey } from '../DatePack/DatePack.type';
import { PropsFileKey } from '../File/File.type';
import { PropsSwitchKey } from '../Switch/Switch.type';
import { Validator } from '../../../services/utils/Validator';
import { isEmpty } from '../../../services/utils/Validations';

type field<K extends string | number> = {
  [key in K]: ((data : { input: generatedInputs, returnForm: any} ) => React.ReactNode) | undefined;
}

interface Props<K extends string | number > {
  inputs: {
    [key in K]: generatedInputWithoutKey | Slot;
  },
  onSubmit?: Function,
  scopedFields?: field<K>,
  children?: JSX.Element | JSX.Element[],
}

type keyValue<K extends string | number> = {
  [key in K]: string | number | Array<any> | object;
}

export function Form(props: Props<string | number>) {
  const { 
    inputs,
    scopedFields,
    children,
    onSubmit
  } = props;
  const [generatedInputs, setGeneratedInputs] = useState<Array<generatedInputs>>([])
  const [returnForm, setReturnForm] = useState<any>({})
  const hasValidations = useRef<boolean>(false)

  useEffect(() => {
    if(inputs && typeof inputs === 'object'){
      Object.keys(inputs).forEach((k) => {
        const index = generatedInputs.map((m) => m.key).indexOf(k);
        if (index > -1) {
          const updateGeneratedInput = [...generatedInputs];
          let updateInput: generatedInputWithoutKey  = inputs[k as keyof object] as generatedInputWithoutKey;
          setGeneratedInputs((prevState) => 
              prevState.map((obj,i) => {
                if(i === index){
                  return {...obj, ...updateInput }
                }
              return obj
            })
          )
          if (updateInput.value && updateInput.value !== undefined) {
            setReturnForm((prev: keyValue<string | number>) => ({
              ...prev,
              [k]: updateInput.value
            }))
          }
          if(k === 'firstName'){
            console.log(updateGeneratedInput);
          }
        } else {
          let newInput: generatedInputWithoutKey  = inputs[k as keyof object] as generatedInputWithoutKey;
          setGeneratedInputs((prev) => ([
            ...prev,
            ...[{ ...newInput, ...{ key: k } }]
          ]))
          Object.defineProperty(returnForm, k,
            {
              enumerable: true,
              configurable: true,
              writable: true,
              value: {},
            });
            setReturnForm((prev: keyValue<string | number>) => {
              if (newInput.hasOwnProperty('value') && newInput.value) {
                return {
                  ...prev,
                  [k]: newInput.value
                }
              } else {
                return {
                  ...prev,
                  [k]: ''
                }
              }
            })
        }
      })
    }
  }, [inputs])

  useEffect(() => {
    hasValidations.current = generatedInputs.some((val) => val.hasOwnProperty('validations')  && val.validations)
  }, [generatedInputs])
  

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if(onSubmit){
      onSubmit(await getValues())
    }
  }

  const getValues = () =>  {
    return new Promise( async (resolve) => {
      if(hasValidations.current){
        resolve({ items: returnForm, isFormValid: isValid()})
      } else {
        resolve({ items: returnForm})
      }
    });
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
        validator.validate(returnForm[currentInput.key], currentInput.validations);
        if(!isEmpty(validator.getErrors)){
          generatedInputs[index].errors = validator.getErrors;
          result = false;
        }
      }
    })
    return result
  }

  const handleChangeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name: key , value } = evt.target;
    setReturnForm((prev: keyValue<string | number>) => ({
      ...prev,
      [key]: value,
    }));
  }

  const handleChangeDate = (date : Date, input: PropsDateKey):void => {
    setReturnForm((prev: keyValue<string | number>) => ({
      ...prev,
      [input.key]: date,
    }));
  }

  const onChangeSelect = (data: onChangeSelect, input: PropsSelectKey):void => {
    setReturnForm((prev: keyValue<string | number>) => ({
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
      setReturnForm((prev: keyValue<string | number>) => ({
        ...prev,
        [input.key]: value,
      }));
      if(input.listenChange){
        input.listenChange({value, input})
      }
    }
  }

  const handleChangeFile = (value: Array<any>, input : PropsFileKey) => {
    setReturnForm((prev: keyValue<string | number>) => {
        return ({
          ...prev,
          [input.key]:  value,
        })
    });
  }

  return (
    <form onSubmit={handleSubmit} className='Form grid grid-cols-12 gap-2'>
      {
        generatedInputs.filter((val) => val.hidden === undefined || val.hidden === false)
        .map((input, index) => {
          if(input.slot && scopedFields?.[input.key]){
            return(
              <div
                key={`slot-${index}`}
                className={`${input.className ? input.className : ''}`}
              >
                 {typeof scopedFields[input.key] === 'function' && scopedFields?.[input.key]?.({input , returnForm})}
              </div>
            )
          }else {
            if(!input.hasOwnProperty('type') || (input.hasOwnProperty('type') && (input.type === 'text'))){
              return (
                <Input
                key={index}
                type={generatedInputs[index].type}
                value={returnForm[input.key]}
                name={generatedInputs[index].name}
                placeholder={generatedInputs[index].placeholder}
                onChange={handleChangeInput}
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
                value={returnForm[input.key]}
                name={generatedInputs[index].name}
                placeholder={generatedInputs[index].placeholder}
                onChange={(e : any) => handleChangeDate(e,input)}
                dateFormat={generatedInputs[index].dateFormat ?? 'dd/MM/yyyy hh:mm'}
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
                value={returnForm[input.key]}
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
                value={returnForm[input.key]}
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
                value={returnForm[input.key]}
                onChange={ (value: Array<any> | Array<object>) => handleChangeFile(value, input)}
                validations={generatedInputs[index].validations}
                cols={generatedInputs[index].cols}
              />
              )
            }
          }
        })
      }
      {children}
    </form>
  )
}

