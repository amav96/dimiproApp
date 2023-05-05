import React from 'react'
import './Button.scss'
import { PropsButton } from './Button.type'

export function Button(props: PropsButton) {

    const {
        text,
        textColor= 'text-black',
        backgroundColor = 'background-white',
        borderColor = 'border-black',
        className = 'c-border-rounded-l c-p-y-3 c-p-x-4'
    } = props;
  return (
    <button 
    style={{ width: '100%'}}
    className={`c-${backgroundColor} c-${borderColor} ${className}`}
    type="button" >
        <span className={`c-${textColor}`} >{text}</span>
    </button>
  )
}
