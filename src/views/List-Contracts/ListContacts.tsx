import useDataProvider from "@hooks/useDataProvider";
import { Abm, Layout } from "@package";
import { GlobalInputs, Slot } from "@packageTypes";
import baseApiUrl from "@services/BaseApiUrl";
import { authorization } from "@services/utils/Autorizathion";
import { formatDateTime } from "@services/utils/Formatters";
import { Routes } from "@services/utils/Routes";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { formData } from "../../components/FormContract/formData";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../store";
import "./_list-contracts.scss";
import { dataTable } from "./dataTable";

const ListContacts = () => {
  const [formCrud, setFormCrud] =
    useState<Array<GlobalInputs | Slot>>(formData);

  const { getDataProviders } = useDataProvider();
  
  const companies = useAppSelector(
    (state: RootState) => state.dataProviders.companies
  );
  const product = useAppSelector(
    (state: RootState) => state.dataProviders.products
  );

  useEffect(() => {
    getDataProviders([
      "companies",
      "products"
    ]);

    setFormFilter((prevInputs) =>
      prevInputs.map((input) => {
        if (input.key === "exporter") {
          return {
            ...input,
            options: companies.filter((company: any) => company.exporter === 1),
          };
        }
        if (input.key === "product") {
          return {
            ...input,
            options: product,
          };
        }

        return input;
      })
    );
  }, [companies, product]);

  const [formFilter, setFormFilter] = useState<GlobalInputs[]>([
    {
      key: "name",
      placeholder: "Search by name",
      name: "name",
      value: "",
      type: "text",
      cols: "c-col-span-4",
    },
    {
      key: "exporter",
      placeholder: "Search by exporter",
      name: "exporter",
      value: "",
      type: "text",
      cols: "c-col-span-4",
    },
    {
      key: "importer",
      placeholder: "Search by importer",
      name: "importer",
      value: "",
      type: "text",
      cols: "c-col-span-4",
    },
  ]);

  return (
    <div className="list-contracts__container">
      <Layout title="Lista de contratos">
        <Abm
          table={{
            columns: useMemo(() => dataTable, []),
            urlIndex: Routes.CONTRACTS.INDEX,
            requestConfiguration: {
              method: "GET",
              headers: {
                Authorization: authorization(),
              },
            },
            inputs: formFilter,
            searchable: true,
            addItemAfterStore: true,
            updateItemAfterUpdate: true,
            afterDelete: (data: any) => {
              console.log("data after delete", data);
            },
            updateIcon: baseApiUrl + "/icons/editar.svg",
            deleteIcon: baseApiUrl + "/icons/basura.svg",
            headerSticky: true,
          }} 
        />
      </Layout>
    </div>
  );
};

export default ListContacts;
