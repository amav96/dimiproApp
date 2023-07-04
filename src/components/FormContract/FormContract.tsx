import { useState, useEffect } from "react";
import { GlobalInputs, Slot } from "../package/Form/Form.type";
import { Form } from "../package/Form/Form";
import { formData } from "./formData";
import { Button } from "../package/Button";
import useDataProvider from "@hooks/useDataProvider";
import { useAppSelector } from "../../../src/hooks";
import { RootState } from "../../../src/store";

export const FormContract = () => {
  const [inputs, setInputs] = useState<Array<GlobalInputs | Slot>>(formData);

  const { getDataProviders } = useDataProvider();

  const packagings = useAppSelector(
    (state: RootState) => state.dataProviders.packagings
  );
  const paymentMethods = useAppSelector(
    (state: RootState) => state.dataProviders.paymentMethods
  );
  const surveyors = useAppSelector(
    (state: RootState) => state.dataProviders.surveyors
  );
  const currencies = useAppSelector(
    (state: RootState) => state.dataProviders.currencies
  );
  const companies = useAppSelector(
    (state: RootState) => state.dataProviders.companies
  );
  const products = useAppSelector(
    (state: RootState) => state.dataProviders.products
  );
  const calibers = useAppSelector(
    (state: RootState) => state.dataProviders.calibers
  );
  const categories = useAppSelector(
    (state: RootState) => state.dataProviders.categories
  );

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

  useEffect(() => {
    const optionsMap: any = {
      packagings,
      paymentMethods,
      surveyors,
      currencies,
      exporters: companies.filter((company: any) => company.exporter === 1),
      importers: companies.filter((company: any) => company.importer === 1),
      products,
      calibers,
      categories,
      brokers: companies.filter((company: any) => company.broker === 1),
    };

    setInputs((prevInputs) =>
      prevInputs.map((input) => ({
        ...input,
        // @ts-ignore
        options: optionsMap[input.key] || input.options,
      }))
    );
    console.log(categories);
    
  }, [packagings, paymentMethods, surveyors, currencies, companies, products, calibers, categories]);

  
  
  return (
    <div>
      <Form inputs={inputs}>
        <span className="text-required">
          <span>*</span> Los campos son obligatorios
        </span>
        <Button type="submit" customClass={"btn-primary"}>
          Crear contrato
        </Button>
      </Form>
    </div>
  );
};
