import React, { useEffect } from 'react'
import { ContractSave } from '../components/ContractSave'
import { Layout } from '@package'
import useDataProvider from "@hooks/useDataProvider";
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

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

  return (
    <Layout title='Add Contract'>
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
    </Layout>
  )
}
