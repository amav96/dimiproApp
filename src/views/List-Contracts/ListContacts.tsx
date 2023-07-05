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
          modalForm={{
            inputs: formCrud,
            urlStore: Routes.CONTRACTS.STORE,
            urlUpdate: Routes.CONTRACTS.UPDATE,
            urlShow: Routes.CONTRACTS.SHOW,
            closable: true,
            title: "Guardar usuario",
            afterUpdate: (data: any) => {
              if (data.errors || data.error) {
                toast.error(`${JSON.stringify(data.errors ?? data.error)}`, {
                  autoClose: 5000,
                  theme: "colored",
                });
              } else {
                toast(`Guardado correctamente`, {
                  autoClose: 2000,
                  theme: "dark",
                });
              }
            },
            afterStore: (data: any) => {
              console.log(data);
              if (data.errors || data.error) {
                toast.error(`${JSON.stringify(data.errors ?? data.error)}`, {
                  autoClose: 5000,
                  theme: "colored",
                });
              } else {
                toast(`Guardado correctamente`, {
                  autoClose: 2000,
                  theme: "dark",
                });
              }
            },
            showRequestConfiguration: {
              method: "GET",
              headers: {
                Authorization: authorization(),
                "Content-Type": "application/json",
              },
            },
            updateRequestConfiguration: {
              method: "PATCH",
              headers: {
                Authorization: authorization(),
                "Content-Type": "application/json",
              },
            },
            storeRequestConfiguration: {
              method: "POST",
              headers: {
                Authorization: authorization(),
                "Content-Type": "application/json",
              },
            },
          }}
        />
      </Layout>
    </div>
  );
};

export default ListContacts;
