import React, { useEffect} from 'react'
import './Textarea.scss'
import { useState } from 'react';
import { isEmpty } from "../../../services/utils/Validations";
import { Validator } from '../../../services/utils/Validator';
import { Validations } from '../../../types/Validations';
import { PropsTextArea } from './Textarea.type';
import { removeDuplicates } from '../../../services/utils/Property';

const validate =  new Validator();
export function Textarea(props: PropsTextArea) {
    let {
        placeholder = 'Ingrese texto',
        cols =  'c-col-span-12',
        value,
        onChange,
        name,
        validations,
        disabled = false,
        errors,
        type,
        colsArea
    } = props;
    const [localErrors, setLocalErrors] = useState<Array<string>>([])

    const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
      if(onChange){
          onChange(evt)
          if(validations !== undefined){
              handleValidations(evt.target.value, validations);
          }
      }
    }

    const onBlur = (event : React.ChangeEvent<HTMLTextAreaElement>) => {
      let el = event.target as HTMLTextAreaElement
      if(validations !== undefined){
          handleValidations(el.value, validations)
      }
    }

    const handleValidations = (value: string | number, validations: Validations) => {
        validate.validate(value, validations)
        const hasErrors = validate.getErrors
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
    <div className={`Textarea controlInput ${cols}`}>
        <textarea
        className="Textarea__input"
        placeholder={placeholder}
        autoComplete="off"
        onChange={handleChange}
        onBlur={onBlur}
        value={value}
        name={name}
        disabled={disabled}
        cols={colsArea}
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
