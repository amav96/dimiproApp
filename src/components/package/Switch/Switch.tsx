import React, { useEffect, useRef} from 'react'
import './Switch.scss'
import { useState } from 'react';
import { isEmpty } from '@services/utils/Validations';
import { PropsSwitch } from '@packageTypes'

export function Switch(props: PropsSwitch) {
  const {
    option,
    cols =  'c-col-span-12',
    label = '',
    trackBy = 'id',
    onChange,
    value = {},
    defaultValue
  } = props;

  const [switched, setSwitched] = useState<boolean>(false);
  // manually es para saber si lo seteo manualmente o desde afuera del componente
  const manually = useRef(false);

  const onSwitch = ():void => {
    manually.current = true
    setSwitched((prev) => !prev)
  }

  const handleSwitch = ():void => {
    if(switched){
      let processOption = props.option ? option : true;
      if(manually.current && onChange){
        manually.current = false
        onChange(processOption)
      }
    } else if(manually.current && onChange) {
      manually.current = false
      if(!props.option){
        onChange(false)
      }else{
        if(typeof option === 'number'){
          onChange(0)
        }
        else if(typeof option === 'string'){
          onChange()
        } else if(typeof option === 'object'){
          onChange({})
        } else if(typeof option === 'object' && Array.isArray(option)){
          onChange([])
        }
      }
    }
  }

  useEffect(() => {
    handleSwitch()
  }, [switched])

  const handleValue = () => {
    // manejar cuando sea bolean por defecto o false
    if(!isEmpty(value) && typeof value === 'object'){
      if(!isEmpty(option) && typeof option === 'object'){
        if(
        Object.prototype.hasOwnProperty.call(option, trackBy) &&
        Object.prototype.hasOwnProperty.call(value, trackBy)
        ){
          if(option[trackBy as keyof object]  === value[trackBy as keyof object]){
            if(!switched){
              setSwitched((prev) => !prev)
            }
          }
        }
      }
    } else if(typeof value === 'boolean'){
      setSwitched(value)
    } else if(typeof value === 'number'){
        if(!manually.current){
          if(value !== 0){
            setSwitched(true)
          }else {
            setSwitched(false)
          }
        }
    }
  }

  useEffect(() => {
    if(value !== undefined){
      handleValue()
    }
  }, [value])

  useEffect(() => {
    if((value === null || value === undefined || value === '') && value !== defaultValue){
      if(onChange){
        onChange(defaultValue)
      }
    }
  }, [])

  const active = () : boolean => {
    if(switched){
      return true
    } else {
      return false
    }
  }


  return (
    <div className={`${cols}`}>
      <div className="c-flex c-flex-row c-items-center">
        <div
        onClick={onSwitch}
        className={
          `switch__${active()  ? 'active': 'inactive'
          }`}>
          <div className={
            `switch-pointer__${active()  ? 'active': 'inactive'}`
            }> </div>
          </div>
          <div className="c-ml-2">
              {label}
          </div>
      </div>
    </div>
  )
}