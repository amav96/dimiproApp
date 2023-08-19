import { AWS } from '@services/utils/AWS'
import React from 'react'

export function AccesoDenegado() {
  return (
    <div className='c-container'>
      <img src={`${AWS.S3BUCKET}/assets/safe.svg`} />
    </div>
  )
}