import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


export  function Home() {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(!user){
            console.log(user)
            navigate('/login')
        }
      }, []);

  return (
    <div>Home</div>
  )
}
