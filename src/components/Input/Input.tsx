import React, { useEffect} from 'react'
import './Input.scss'
import { useState } from 'react';
import { isEmpty } from "../../services/utils/Validations";
import { Validator } from '../../services/utils/Validator';
import { Validations } from '../../types/Validations';
import { PropsInput } from '../../types'
import { removeDuplicates } from '../../services/utils/Property';

const validate =  new Validator();
export function Input(props: PropsInput) {
    let {
        placeholder = 'Ingrese texto',
        cols =  'c-col-span-12',
        value,
        onChange,
        name,
        validations,
        disabled = false,
        errors,
        type
    } = props;
    const [localErrors, setLocalErrors] = useState<Array<string>>([])

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
      if(onChange){
          onChange(evt)
          if(validations !== undefined){
            handleValidations(evt.target.value, validations);
          }
      }
    }

    const onBlur = (event : React.ChangeEvent<HTMLInputElement>) => {
      let el = event.target as HTMLInputElement
      if(validations !== undefined){
          handleValidations(el.value, validations)
      }
    }

    const handleValidations = (value: string | number, validations: Validations) => {
        validate.validate(value, validations)
        const hasErrors = validate.getErrors()
        if(!isEmpty(hasErrors)) {
            setLocalErrors(hasErrors)
        }else {
            setLocalErrors([])
        }
    }

    useEffect(() => {
        const handleErrors = async () => {
            if(errors){
                let newMessages = await removeDuplicates(errors)
                setLocalErrors(newMessages)
            }
        }
        handleErrors()
    }, [errors])

    return (
    <div className={`Input controlInput ${cols}`}>
        <input
        className="Input__input"
        placeholder={placeholder}
        autoComplete="off"
        onChange={handleChange}
        onBlur={onBlur}
        value={value}
        name={name}
        disabled={disabled}
        type={type}
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
