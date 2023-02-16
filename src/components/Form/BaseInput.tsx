import React from 'react'
import './BaseInput.scss'
import { useState } from 'react';

interface Props {
    placeholder?: string,
    cols?: string,
}

export function BaseInput(props: Props) {
    const {
        placeholder = 'Ingrese texto',
        cols =  'col-span-12'
    } = props;

    const [inputValue, setInputValue] = useState<string|number>('')

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(evt.target.value)
    }

    return (
    <div className={`baseInput ${cols}`}>
        <input
        className="baseInput__input"
        placeholder={placeholder}
        onChange={handleChange}
        value={inputValue}
        />
    </div>
    )
}
