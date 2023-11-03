import React from 'react'
import { UserList } from '../components/UserList';
import { useTheme } from '@hooks/useTheme';
import { Layout } from 'antd';

export function Users() {

  const {  Content } = Layout;
  const { colorBgContainer }= useTheme()

  return (
    <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 280,
          background: colorBgContainer,
        }}
      >
      <UserList/>
    </Content>
  )
}
