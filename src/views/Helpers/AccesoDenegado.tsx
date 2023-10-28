import { AWS } from '@utils/AWS'
import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom';

export function AccesoDenegado() {

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Realiza una navegación hacia atrás
  };


  return (
    <div className='container mx-auto flex justify-center content-center items-center h-screen'>
      <div className='container flex flex-col max-w-xs'>
        <div className="my-4">
          <h2 className="text-2xl"> Ups! You cant access this page.</h2>
        </div>
        <div>
          <img src={`${AWS.S3BUCKET}/assets/safe.svg`} />
        </div>
        <div className="my-4 flex flex-row  justify-around">
          <div>
            <Button
            onClick={() => goBack()}
            >
              Back 
            </Button>
          </div>
          <div>
            <Button
            onClick={() => navigate('/login')}
            >
              Log in
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
