import { PropsButton } from '@packageTypes'
import React from 'react';
import './Button.scss'

export function Button(props: PropsButton) {

  const {
      textColor= 'c-text-button',
      backgroundColor = 'c-bg-button',
      borderColor = 'c-border-rounded-l',
      padding = 'c-p-y-3 c-p-x-4',
      customClass = '',
      type = "submit",
      onClick,
      children,
      disabled,
      style
  } = props;

  const handleClick = () => {
    if(onClick){
      onClick()
    }
  }

  return (
    <button
    style={style}
    onClick={handleClick}
    className={`${backgroundColor} ${borderColor} ${padding} ${customClass} ${textColor}`}
    disabled={disabled}
    type={type} >
        {children && (
          <React.Fragment>
            {children}
          </React.Fragment>
        )}
    </button>
  )
}
