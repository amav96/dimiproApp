import React, { ReactElement, ReactPortal, useEffect } from 'react'
import { Input } from '../Input';
import { Textarea } from '../Textarea';
import { Select } from '../Select';
import { Switch } from '../Switch/Switch';
import './Form.scss'
import { useState } from 'react';
import { generatedInputs } from './Form.type';
import { PropsSelectKey, onChangeSelect } from '../Select/Select.type';
import { DatePack } from '../DatePack/DatePack';
import { File } from '../File/File';
import { PropsDateKey } from '../DatePack/DatePack.type';
import { PropsFileKey } from '../File/File.type';
import { PropsSwitchKey } from '../Switch/Switch.type';


type generatedInputWithoutKey = Omit<generatedInputs,'key'>

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
}

type keyValue<K extends string | number> = {
  [key in K]: string | number | Array<any> | object;
}

export function Form(props: Props<string | number> | testHTML<string>) {
  const { inputs} = props;
  const [generatedInputs, setGeneratedInputs] = useState<Array<generatedInputs>>([])
  const [returnForm, setReturnForm] = useState<any>({})

  useEffect(() => {
    if(inputs && typeof inputs === 'object'){
      Object.keys(inputs).forEach((k) => {
        const index = generatedInputs.map((m) => m.key).indexOf(k);
        if (index > -1) {
          const updateGeneratedInput = [...generatedInputs];
          let updateInput: generatedInputs  = inputs[k as keyof object];
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
          let newInput: generatedInputs  = inputs[k as keyof object];
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
          if(input.slot){
            return(
              <div
                key={`slot-${index}`}
                className={`${input.className ? input.className : ''}`}
              >
                {props[input.key as keyof object]}
              </div>
            )
          }else {
              return (
                <React.Fragment key={`input-${index}`}>
                  { !input.type && input?.title &&
                    <label
                      key={`label-${index}`}
                      className="my-1 d-flex label-global"
                    >
                      { input.title }
                    </label>
                  }
                  {
                    input.type === 'datetime' ? 
                    <DatePack
                    key={`datetime-${index}`}
                    value={returnForm[input.key]}
                    name={generatedInputs[index].name}
                    placeholder={generatedInputs[index].placeholder}
                    onChange={(e : any) => handleChangeDate(e,input)}
                    dateFormat={generatedInputs[index].dateFormat ?? 'dd/MM/yyyy hh:mm'}
                    validations={generatedInputs[index].validations}
                    cols={generatedInputs[index].cols}
                    errors={generatedInputs[index].errors}
                    />
                    : input.type === 'select' ? 
                    <Select
                    key={`select-${index}`}
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
                    : input.type === 'switch' ?
                    <Switch
                      key={`switch-${index}`}
                      name={generatedInputs[index].name}
                      label={generatedInputs[index].label}
                      option={generatedInputs[index].option}
                      value={returnForm[input.key]}
                      onChange={ (value: object | Array<object>) => handleChangeSwitch(value, input)}
                      cols={generatedInputs[index].cols}
                    />
                    : input.type === 'file' ?
                    <File
                      key={`file-${index}`}
                      name={generatedInputs[index].name}
                      value={returnForm[input.key]}
                      onChange={ (value: Array<any> | Array<object>) => handleChangeFile(value, input)}
                      validations={generatedInputs[index].validations}
                      cols={generatedInputs[index].cols}
                    />
                    : input.type === 'textarea' ?
                    <Textarea
                      key={`file-${index}`}
                      placeholder={generatedInputs[index].placeholder}
                      name={generatedInputs[index].name}
                      value={returnForm[input.key]}
                      onChange={ (value: Array<any> | Array<object>) => handleChangeFile(value, input)}
                      validations={generatedInputs[index].validations}
                      cols={generatedInputs[index].cols}
                      colsArea={generatedInputs[index].colsArea}
                      
                    />
                    : <Input
                    key={`input-${index}`}
                    type={generatedInputs[index].type}
                    value={returnForm[input.key]}
                    name={generatedInputs[index].name}
                    placeholder={generatedInputs[index].placeholder}
                    onChange={handleChangeInput}
                    validations={generatedInputs[index].validations}
                    cols={generatedInputs[index].cols}
                    errors={generatedInputs[index].errors}
                   />
                  }

                </React.Fragment>
              )
          }
        })
      }
    </form>
  )
}

