import { PropsButton } from '@packageTypes'
import React from 'react';

export function Button(props: PropsButton) {

  const {
      text,
      textColor= 'c-text-black',
      backgroundColor = 'background-white',
      borderColor = 'c-border-black c-border-rounded-l',
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
    className={`${backgroundColor} ${borderColor} ${padding} ${customClass}`}
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
