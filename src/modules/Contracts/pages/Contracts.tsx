import React from 'react'
import { ContractList } from '../components/ContractList';
import { Layout } from 'antd';
import { useTheme } from '@hooks/useTheme';

export function Contracts() {

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
        <ContractList/>
    </Content>
  )
}
