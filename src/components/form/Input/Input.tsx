import React, { useEffect} from 'react'
import './Input.scss'
import { useState } from 'react';
import { isEmpty } from "../../../services/utils/Validations";
import { Validator } from '../../../services/utils/Validator';
import { PropsInput } from '../../../types/Form';
import { IValidations } from '../../../types/Validations';

const validate =  new Validator();
export function Input(props: PropsInput) {
    let {
        placeholder = 'Ingrese texto',
        cols =  'col-span-12',
        value,
        onChange,
        name,
        validations,
        disabled = false,
        errors
    } = props;
    const [localErrors, setLocalErrors] = useState<Array<string> | string>([])

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        if(onChange){
            onChange(evt)
            if(validations !== undefined){
                handleValidations(evt.target.value, validations);
            }
        }
    }

    const handleValidations = (value: string | number, validations: IValidations) => {
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
            console.log(newMessages);
            setLocalErrors([...new Set(newMessages)])
        }
    }, [errors])

    return (
    <div className={`Input controlInput ${cols}`}>
        <input
        className="Input__input"
        placeholder={placeholder}
        autoComplete="off"
        onChange={handleChange}
        value={value}
        name={name}
        disabled={disabled}
        />
        { Array.isArray(localErrors) && !isEmpty(localErrors) &&
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
