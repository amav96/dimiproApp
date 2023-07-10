import { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../src/hooks";
import { RootState } from "../../../src/store";
import useDataProvider from "@hooks/useDataProvider";
import baseApiUrl from "@services/BaseApiUrl";
import $http from "@services/AxiosInstance";
import { Button } from "../package/Button";
import { Form } from "../package/Form/Form";
import { GlobalInputs, Slot } from "../package/Form/Form.type";
import { formData } from "./formData";

interface FormContractProps {}

export const FormContract = () => {
  const [inputs, setInputs] = useState<Array<GlobalInputs | Slot>>(formData);

  const navigate = useNavigate();
  const { getDataProviders } = useDataProvider();

  const packaging = useAppSelector(
    (state: RootState) => state.dataProviders.packagings
  );
  const paymentMethod = useAppSelector(
    (state: RootState) => state.dataProviders.paymentMethods
  );
  const surveyor = useAppSelector(
    (state: RootState) => state.dataProviders.surveyors
  );
  const currency = useAppSelector(
    (state: RootState) => state.dataProviders.currencies
  );
  const companies = useAppSelector(
    (state: RootState) => state.dataProviders.companies
  );
  const product = useAppSelector(
    (state: RootState) => state.dataProviders.products
  );
  const calibers = useAppSelector(
    (state: RootState) => state.dataProviders.calibers
  );
  const category = useAppSelector(
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

  const optionsMap = useMemo(
    () => ({
      packaging,
      paymentMethod,
      surveyor,
      currency,
      exporter: companies.filter((company: any) => company.exporter === 1),
      importer: companies.filter((company: any) => company.importer === 1),
      product,
      calibers,
      category,
      broker: companies.filter((company: any) => company.broker === 1),
    }),
    [
      packaging,
      paymentMethod,
      surveyor,
      currency,
      companies,
      product,
      calibers,
      category,
    ]
  );

  useEffect(() => {
    setInputs((prevInputs) =>
      prevInputs.map((input) => ({
        ...input,
        // @ts-ignore
        options: optionsMap[input.key] || input.options,
      }))
    );
  }, [optionsMap]);

  const onSubmit = async (data: any) => {
    try {
      if (data.isFormValid === true) {
        const response = await $http.post(
          `${baseApiUrl}/api/v1/contracts`,
          data.items
        );

        if (response.status === 201 || response.status === 200) {
          toast.success("Contrato creado correctamente");
          navigate("/list-contracts");
        } else {
          toast.error("Error al crear contrato");
        }
      } else {
        toast.error("Error al crear contrato");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud POST:", error);
      toast.error("Error al crear contrato");
    }
  };

  return (
    <div>
      <Form inputs={inputs} onSubmit={onSubmit}>
        <span className="text-required">
          <span>*</span> Los campos son obligatorios
        </span>
        <Button type="submit" customClass="btn-primary">
          Crear contrato
        </Button>
      </Form>
    </div>
  );
};
