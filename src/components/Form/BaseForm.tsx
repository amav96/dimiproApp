import React from 'react'
import { BaseInput } from './BaseInput';
import './BaseForm.scss'

export default function BaseForm() {
  return (
    <form className='baseForm grid grid-cols-12 gap-2'>
      <BaseInput/>
      <BaseInput/>
    </form>
  )
}

