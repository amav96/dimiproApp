import { AWS } from '@services/utils/AWS'
import React from 'react'

export function AccesoDenegado() {
  return (
    <div className='container mx-auto flex justify-center content-center items-center h-screen'>
      <div className='container flex flex-col max-w-xs'>
        <div className="my-4">
          <h2 className="text-2xl"> Ups! You cant access this page.</h2>
        </div>
        <div>
          <img src={`${AWS.S3BUCKET}/assets/safe.svg`} />
        </div>
      </div>
    </div>
  )
}