import React, { useEffect} from 'react'
import './Input.scss'
import { useState } from 'react';
import { validate, isEmpty, validationErrors} from '../../../utils/formValidation';
import { PropsInput } from '../../../types/form';

export function Input(props: PropsInput) {
    let {
        placeholder = 'Ingrese texto',
        cols =  'col-span-12',
        value,
        onChange,
        name,
        rules,
        disabled = false,
        errors
    } = props;
    const [localErrors, setLocalErrors] = useState<Array<string> | string>([])

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        if(onChange){
            onChange(evt)
            if(!isEmpty(rules) && rules !== undefined) {
                handleValidations(evt.target.value, rules);
            }
        }
    }

    const handleValidations = (value: string | number, rules: object) => {
        validate(value, rules)
        const hasErrors = validationErrors()
        if(!isEmpty(hasErrors)) {
            setLocalErrors(hasErrors)
        }else {
            setLocalErrors([])
        }
    }

    useEffect(() => {
        if(errors){
            setLocalErrors(errors)
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
        { Array.isArray(localErrors) && !isEmpty(localErrors) ?
            localErrors.map((error,key) => (
                <div key={key} className="controlInput__text">
                    {error}
                </div>
            )
        ): (
            <div className="controlInput__text">
                {localErrors}
            </div>
           )
        }
    </div>
    )
}
