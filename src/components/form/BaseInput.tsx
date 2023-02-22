import React from 'react'
import './BaseInput.scss'
import { useState } from 'react';
import { validate, isEmpty, validationErrors} from '../../utils/formValidation';
import { PropsBaseInput } from '../../types/Form';

export function BaseInput(props: PropsBaseInput) {
    let {
        placeholder = 'Ingrese texto',
        cols =  'col-span-12',
        value,
        onChange,
        name,
        rules
    } = props;
    const [errors, setErrors] = useState<Array<string>>([''])

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
            setErrors(hasErrors)
        }else {
            setErrors([])
        }
    }

    return (
    <div className={`baseInput controlInput ${cols}`}>
        <input
        className="baseInput__input"
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        name={name}
        />
        {!isEmpty(errors) && errors.map((error,key) => (
            <div key={key} className="controlInput__text">
                {error}
            </div>
            ))
        }
    </div>
    )
}
