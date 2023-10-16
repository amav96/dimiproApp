import { useEffect, useState, useMemo, useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../store/store";
import useDataProvider from "@hooks/useDataProvider";
import baseApiUrl from "@services/BaseApiUrl";
import $http from "@services/AxiosInstance";
import { Button } from "../package/Button";
import { Form } from "../package/Form/Form";
import { GlobalInputs, Slot } from "../package/Form/Form.type";
import { formData } from "./formData";

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
  }, [
    packaging,
    paymentMethod,
    surveyor,
    currency,
    companies,
    product,
    calibers,
    category,
  ]);

  const [sendingContract, setSendingContract] = useState<boolean>(false);
  const onSubmit = async (data: any) => {
    const { items } = data;
    try {
      if (sendingContract) return;
      if (data.isFormValid === true) {
        const formData = new FormData();

        for (const key in items) {
          if (key === "documents") {
            items.documents.forEach((file: any, index: number) => {
              if (
                file.image.type.includes("image") ||
                file.image.type === "application/pdf"
              ) {
                formData.append(`documents[${index}]`, file.image);
              }
            });
          } else if (key === "calibers") {
            const calibers = Array.isArray(items.calibers)
              ? items.calibers
              : [items.calibers];
            calibers.forEach((caliber: string, index: number) => {
              formData.append(`calibers[${index}]`, caliber);
            });
          } else if (items[key]) {
            formData.append(key, items[key]);
          }
        }
        setSendingContract(true);
        const response = await $http.post(
          `${baseApiUrl}/api/v1/contracts`,
          formData
        );
        setSendingContract(false);
        console.log(response);
        if (response.status === 201 || response.status === 200) {
          toast.success("Contrato creado correctamente", {
            autoClose: 3000,
            theme: "dark",
          });
          navigate("/list-contracts");
        } else {
          toast.error("An error occurred when creating the contract", {
            autoClose: 3000,
            theme: "dark",
          });
        }
      } else {
        toast.error("An error occurred when creating the contract", {
          autoClose: 3000,
          theme: "dark",
        });
      }
    } catch (error) {
      setSendingContract(false);
      console.log(error);
      toast.error("An error occurred when creating the contract", {
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  return (
    <div>
      <Form inputs={inputs} onSubmit={onSubmit}>
        <span className="text-required">
          <span>*</span> The fields are required.
        </span>
        <Button
          disabled={sendingContract}
          type="submit"
          customClass="btn-primary"
        >
          {sendingContract ? "Sending..." : "Create contract"}
        </Button>
      </Form>
    </div>
  );
};
