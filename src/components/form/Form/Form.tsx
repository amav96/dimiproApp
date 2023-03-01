import React, { useEffect } from 'react'
import { Input } from '../Input';
import { Select } from '../Select';
import './Form.scss'
import { useState } from 'react';
import { PropsInput, PropsSelect } from '../../../types/Form';

interface Props<K extends string | number , PropsInput> {
  inputs: {
    [key in K]: PropsInput;
  }
}

interface generatedInput extends PropsInput,PropsSelect   {
  key: string,
}

type keyValue<K extends string | number> = {
  [key in K]: string | number | Array<any> | object;
}

export function Form(props: Props<string | number , PropsInput>) {
  const { inputs } = props;

  const [generatedInputs, setGeneratedInputs] = useState<Array<generatedInput>>([])
  const [returnForm, setReturnForm] = useState<any>({})

  useEffect(() => {
    Object.keys(inputs).forEach((k) => {
      const index = generatedInputs.map((m) => m.key).indexOf(k);
      if (index > -1) {
        const updateGeneratedInput = [...generatedInputs];
        updateGeneratedInput[index] = { ...generatedInputs[index], ...inputs[k] };
        setGeneratedInputs(updateGeneratedInput)
        if (inputs[k].value && inputs[k].value !== undefined) {
          setReturnForm((prev: keyValue<string | number>) => ({
            ...prev,
            [k]: inputs[k].value
          }))
        }
      } else {
        setGeneratedInputs((prev) => ([
          ...prev,
          ...[{ ...inputs[k], ...{ key: k } }]
        ]))
        Object.defineProperty(returnForm, k,
          {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {},
          });

          setReturnForm((prev: keyValue<string | number>) => {
            if (inputs[k].hasOwnProperty('value') && inputs[k].value) {
              return {
                ...prev,
                [k]: inputs[k].value
              }
            } else if(inputs[k].hasOwnProperty('value')) {
              return {
                ...prev,
                [k]: ''
              }
            }
          })
      }
    })
  }, [inputs])

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log(evt)
  }

  const handleChangeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setReturnForm((prev: keyValue<string | number>) => ({
      ...prev,
      [name]: value,
    }));
  }

  const onChangeSelect = (value: object , index: number | string, name: string):void => {
    if(typeof value === 'number' || typeof value === 'object'){
      setReturnForm((prev: keyValue<string | number>) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  return (
    <form onSubmit={handleSubmit} className='Form grid grid-cols-12 gap-2'>
      {
        generatedInputs.filter((val) => val.hidden === undefined || val.hidden === false)
        .map((v, index) => {
          if(!v.hasOwnProperty('type') || (v.hasOwnProperty('type') && v.type === 'text')){
            return (
              <Input
              key={index}
              value={returnForm[v.key]}
              name={generatedInputs[index].name}
              placeholder={generatedInputs[index].placeholder}
              onChange={handleChangeInput}
              rules={generatedInputs[index].rules || {}}
              />
            )
          } else if (v.type === 'select'){
            return (
              <Select
              key={index}
              name={generatedInputs[index].name}
              options={generatedInputs[index].options}
              value={returnForm[v.key]}
              onChange={ (value: object | Array<object>, index : string | number) => onChangeSelect(value,index,v.key)}
              multiselect={generatedInputs[index].multiselect}
              />
            )
          }
        })
      }
    </form>
  )
}

