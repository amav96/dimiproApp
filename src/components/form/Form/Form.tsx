import React, { ReactElement, ReactPortal, useEffect } from 'react'
import { Input } from '../Input';
import { Select } from '../Select';
import { Switch } from '../Switch/Switch';
import './Form.scss'
import { useState } from 'react';
import { PropsInput, PropsSelect, PropsSwitch } from '../../../types/form';

interface generatedInput extends PropsInput, PropsSelect, PropsSwitch  {
  key: string,
}

type generatedInputWithoutKey = Omit<generatedInput,'key'>

interface Props<K extends string | number > {
  inputs: {
    [key in K]: generatedInputWithoutKey;
  },
  // [key in K]?: JSX.Element | JSX.Element[];
}


type ReactText = string | number;
type ReactChild = ReactElement | ReactText;

interface ReactNodeArray extends Array<ReactNode> {}
type ReactFragment = {} | ReactNodeArray;
type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;


type testHTML<K extends string> = {
  [key in K]: ReactNode;
  // [key in K]?: JSX.Element | JSX.Element[];
}

type keyValue<K extends string | number> = {
  [key in K]: string | number | Array<any> | object;
}

export function Form(props: Props<string | number> | testHTML<string>) {
  const { inputs} = props;
  const [generatedInputs, setGeneratedInputs] = useState<Array<generatedInput>>([])
  const [returnForm, setReturnForm] = useState<any>({})

  useEffect(() => {
    if(inputs && typeof inputs === 'object'){
      Object.keys(inputs).forEach((k) => {
        const index = generatedInputs.map((m) => m.key).indexOf(k);
        if (index > -1) {
          const updateGeneratedInput = [...generatedInputs];
          let converInputs: generatedInput  = inputs[k as keyof object];
          updateGeneratedInput[index] = { ...generatedInputs[index], ...converInputs as object };
          setGeneratedInputs(updateGeneratedInput)
          if (converInputs.value && converInputs.value !== undefined) {
            setReturnForm((prev: keyValue<string | number>) => ({
              ...prev,
              [k]: converInputs.value
            }))
          }
        
        } else {
          let converInputsInObject: generatedInput  = inputs[k as keyof object];
          setGeneratedInputs((prev) => ([
            ...prev,
            ...[{ ...converInputsInObject, ...{ key: k } }]
          ]))
          Object.defineProperty(returnForm, k,
            {
              enumerable: true,
              configurable: true,
              writable: true,
              value: {},
            });
            
            setReturnForm((prev: keyValue<string | number>) => {
              if (converInputsInObject.hasOwnProperty('value') && converInputsInObject.value) {
                return {
                  ...prev,
                  [k]: converInputsInObject.value
                }
              } else if(converInputsInObject.hasOwnProperty('value')) {
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

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log(evt)
  }

  const handleChangeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name: key , value } = evt.target;
    setReturnForm((prev: keyValue<string | number>) => ({
      ...prev,
      [key]: value,
    }));
  }

  const onChangeSelect = (value: object , index: number | string, key: string):void => {
    if(typeof value === 'number' || typeof value === 'object'){
      setReturnForm((prev: keyValue<string | number>) => ({
        ...prev,
        [key]: value,
      }));
    }
  }

  const handleChangeSwitch = (value: object | number | boolean , key: string) :void => {
    if(typeof value === 'number' || typeof value === 'object' || typeof value === 'boolean'){
      setReturnForm((prev: keyValue<string | number>) => ({
        ...prev,
        [key]: value,
      }));
    }
  }

  return (
    <form onSubmit={handleSubmit} className='Form grid grid-cols-12 gap-2'>
      {
        generatedInputs.filter((val) => val.hidden === undefined || val.hidden === false)
        .map((v, index) => {
          if(v.slot){
            return(
              <div 
              key={index}
              className={`${v.class ? v.class : ''}`}
              >
                {props[v.key as keyof object]}
              </div>
            )
          }else {
            if(!v.hasOwnProperty('type') || (v.hasOwnProperty('type') && v.type === 'text')){
              return (
                <Input
                key={index}
                value={returnForm[v.key]}
                name={generatedInputs[index].name}
                placeholder={generatedInputs[index].placeholder}
                onChange={handleChangeInput}
                rules={generatedInputs[index].rules || {}}
                cols={generatedInputs[index].cols}
                />
              )
            } else if (v.type === 'select'){
              return (
                <Select
                key={index}
                placeholder={generatedInputs[index].placeholder}
                name={generatedInputs[index].name}
                options={generatedInputs[index].options}
                value={returnForm[v.key]}
                onChange={ (value: object | Array<object>, index : string | number) => onChangeSelect(value,index,v.key)}
                multiselect={generatedInputs[index].multiselect}
                cols={generatedInputs[index].cols}
                />
              )
            } else if (v.type === 'check' || v.type === 'switch'){
              return(
                <Switch
                key={index}
                name={generatedInputs[index].name}
                label={generatedInputs[index].label}
                option={generatedInputs[index].option}
                value={returnForm[v.key]}
                onChange={ (value: object | Array<object>) => handleChangeSwitch(value, v.key)}
                cols={generatedInputs[index].cols}
                />
              )
            }
          }
        })
      }
    </form>
  )
}

