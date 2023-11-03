import { PaymentMethodList } from '../components/PaymentMethodList';
import React from 'react'
import { useTheme } from '@hooks/useTheme';
import { Layout } from 'antd';

export function PaymentMethods() {

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
    <PaymentMethodList/>
    </Content>
  )
}
