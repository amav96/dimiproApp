import { CompanyList } from '../components/CompanyList';
import React from 'react'
import { useTheme } from '@hooks/useTheme';
import { Layout } from 'antd';

export function Companies() {
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
      <CompanyList/>
    </Content>
  )
}
