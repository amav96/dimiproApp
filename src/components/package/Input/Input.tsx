import React, { useEffect} from 'react'
import './Input.scss'
import { useState } from 'react';
import { isEmpty } from "@services/utils/Validations";
import { Validator } from '@services/utils/Validator';
import { PropsInput, Validations } from '@packageTypes'
import { removeDuplicates } from '@services/utils/Property';
import IconOpenEye from './eye-open.svg'
import IconCloseEye from './eye-close.svg'

const validate =  new Validator();
export function Input(props: PropsInput) {
    let {
        icon,
        placeholder = 'Ingrese texto',
        cols =  'c-col-span-12',
        value,
        onChange,
        name,
        validations,
        disabled = false,
        errors,
        type,
        customClass = ''
    } = props;
    const [localErrors, setLocalErrors] = useState<Array<string>>([])

    const [showPassword, setShowPassword] = useState<Boolean>(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

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
    <div className={`Input controlInput ${cols} ${customClass}`}>
        <div className="container">
            { icon && <img className='input_icon' src={icon} alt="icon" /> }
            <input
                className="Input__input"
                placeholder={placeholder}
                autoComplete="off"
                onChange={handleChange}
                onBlur={onBlur}
                value={value}
                name={name}
                disabled={disabled}
                type={showPassword ? 'text' : type}
        />
        </div>
        {
            type === 'password' && (
                <span className="password-icon" onClick={togglePasswordVisibility}>
                    {
                        showPassword ? <img src={IconCloseEye} alt="Ocultar contraseña" /> : <img src={IconOpenEye} alt="Mostrar contraseña" /> 
                    }
                </span>
            )
        }
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
