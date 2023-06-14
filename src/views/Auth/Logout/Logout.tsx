import { Loader } from '@package'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from "../../../hooks";
import {setUser, setPermissions, setToken } from '@features/auth/authSlice'

export function Logout() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(setUser(null))
        dispatch(setToken(''))
        dispatch(setPermissions([]))
        navigate('/login')
    }, [])
    

  return (
    <div className="c-flex c-flex-center">
        <Loader/>
    </div>
  )
}
