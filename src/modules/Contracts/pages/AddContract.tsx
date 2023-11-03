import React, { useEffect } from 'react'
import { ContractSave } from '../components/ContractSave'
import useDataProvider from "@hooks/useDataProvider";
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Layout, theme } from 'antd';

export  function AddContract() {

  const navigate = useNavigate()

  const { getDataProviders } = useDataProvider();

  useEffect(() => {
      getDataProviders([
        "packagings",
        "paymentMethods",
        "surveyors",
        "currencies",
        "companies",
        "products",
        "calibers",
        "categories",
      ]);
    }, []);


const {  Content } = Layout;

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 280,
          background: colorBgContainer,
        }}
        >
        <h1 className={`text-2xl`}>Add Contract</h1>
        <div className="flex flex-row-reverse">
          <div className="">
              <Button
              size="large"
              block
              onClick={() => navigate('/list-contracts')}
              >
              Contracts
            </Button>
          </div>
        </div>
        <ContractSave/>
      
    </Content>
  )

}
