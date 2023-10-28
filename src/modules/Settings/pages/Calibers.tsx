
import { CaliberList } from '../components/CaliberList';
import React from 'react'
import { useTheme } from '@hooks/useTheme';
import { Layout } from 'antd';

export function Calibers() {

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
      <CaliberList/>
     </Content>
  )
}
