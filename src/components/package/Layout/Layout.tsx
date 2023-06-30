import React from 'react'

interface LayoutProps {
    title?: string,
    textColor?: string,
    customClass?: string,
    children?: JSX.Element | JSX.Element[],
}

export function Layout(props: LayoutProps) {

    const { 
        title = 'Dashboard',
        textColor = 'c-text-black',
        customClass = '',
        children
     } = props

  return (
    <div className={`c-m-4 ${customClass}`}>
      <div className="c-my-2">
        <h2 className={`c-text-xl ${textColor}`}>{title}</h2>
      </div>
      {
        children
      }
    </div>
  )
}
