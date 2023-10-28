import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from "@hooks/hooks";
import {setUser, setPermissions, setToken } from '@store/auth/authSlice'

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';



export function Logout() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(setUser(null))
        dispatch(setToken(''))
        dispatch(setPermissions([]))
        navigate('/login')
    }, [])

    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />; // Personaliza el tamaño del loader

    return (
      <div className="h-screen flex items-center justify-center">
        <Spin indicator={antIcon} />
      </div>
    );
}
