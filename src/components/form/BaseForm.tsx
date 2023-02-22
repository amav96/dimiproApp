import React, { useEffect } from 'react'
import { BaseInput } from './BaseInput';
import './BaseForm.scss'
import { useState } from 'react';
import { PropsBaseInput } from '../../types/Form';

interface Props<K extends string | number , PropsBaseInput> {
  inputs: {
    [key in K]: PropsBaseInput;
  }
}

interface generatedInput extends PropsBaseInput{
  key: string,
}

export default function BaseForm(props: Props<string | number , PropsBaseInput>) {
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
          setReturnForm((prev:any) => ({
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
  
          setReturnForm((prev: any) => {
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
  
  return (
    <form className='baseForm grid grid-cols-12 gap-2'>
      {
        generatedInputs.filter((val) => val.hidden === undefined || val.hidden === false)
        .map((value, index) => {
          if(!value.hasOwnProperty('type') || (value.hasOwnProperty('type') && value.type === 'text')){
            return (
              <BaseInput
              key={index}
              value={generatedInputs[index].value}
              name={generatedInputs[index].name}
              placeholder={generatedInputs[index].placeholder}
              onChange={()=> console.log('test')}
              />
            )
          }
        })
      }
    </form>
  )
}

