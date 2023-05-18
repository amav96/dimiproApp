import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { PropsDate } from './DatePack.type';
import { isEmpty } from '../../../services/utils/Validations';
import { Validations } from '../../../types/Validations';
import { Validator } from '../../../services/utils/Validator';
import './DatePack.scss'

const validate =  new Validator();
export function DatePack(props: PropsDate) {

  let {
    cols =  'c-col-span-12',
    placeholder = 'Ingrese fecha',
    value,
    onChange,
    validations,
    dateFormat = 'dd/MM/yyyy',
    showTimeSelect = false,
    errors
  } = props;
  const [localErrors, setLocalErrors] = useState<Array<string> | string>([])

  const [valueListened, setValueListened] = useState<boolean>(false);
  const handleChange = (date: Date) => {
    setValueListened(true)
    if(onChange){
        onChange(date)
        if(validations !== undefined){
            handleValidations(date, validations);
        }
    }
  }

  const handleCalendarClose = () => {
    if(!valueListened){
      if(validations !== undefined){
        handleValidations(value, validations);
      }
      setValueListened(false)
    } else {
      setValueListened(false)
    }
  }

  const handleCalendarOpen = () => {

  }

  const handleValidations = (value: Date, validations: Validations) => {
    validate.validate(value, validations)
    const hasErrors = validate.getErrors
    if(!isEmpty(hasErrors)) {
        setLocalErrors(hasErrors)
    }else {
        setLocalErrors([])
    }
  }

  useEffect(() => {
    if(errors){
        let newMessages = [...localErrors,...errors]
        setLocalErrors([...new Set(newMessages)])
    }
  }, [errors])

  return (
    <div className={`DatePack ${cols}`}>
      <DatePicker
        dateFormat={dateFormat}
        placeholderText={placeholder}
        selected={value}
        onChange={handleChange}
        onCalendarClose={handleCalendarClose}
        onCalendarOpen={handleCalendarOpen}
        className='DatePack__input'
        showTimeSelect={showTimeSelect}
      />
      {
        // mostrar errores
        Array.isArray(localErrors) && !isEmpty(localErrors) &&
          localErrors.map((error,key) => (
              <div key={key} className="controlInput__text">
                  {error}
              </div>
              )
          )
      }
    </div>
  )
}
