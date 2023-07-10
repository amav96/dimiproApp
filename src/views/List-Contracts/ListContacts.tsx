import useDataProvider from "@hooks/useDataProvider";
import { Abm, Layout } from "@package";
import { GlobalInputs } from "@packageTypes";
import baseApiUrl from "@services/BaseApiUrl";
import { authorization } from "@services/utils/Autorizathion";
import { Routes } from "@services/utils/Routes";
import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../store";
import "./_list-contracts.scss";
import { dataTable } from "./dataTable";

const ListContacts = () => {
  const { getDataProviders } = useDataProvider();

  const companies = useAppSelector(
    (state: RootState) => state.dataProviders.companies
  );

  useEffect(() => {
    getDataProviders(["companies", "products"]);

    setFormFilter((prevInputs) =>
      prevInputs.map((input) => {
        if (input.key === "exporter") {
          return {
            ...input,
            options: companies.filter((company: any) => company.exporter === 1),
          };
        }
        if (input.key === "importer") {
          return {
            ...input,
            options: companies.filter((company: any) => company.importer === 1),
          };
        }

        return input;
      })
    );
  }, [companies]);

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
