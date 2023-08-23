import useDataProvider from "@hooks/useDataProvider";
import { Abm, Button, Layout } from "@package";
import { GlobalInputs } from "@packageTypes";
import baseApiUrl from "@services/BaseApiUrl";
import { authorization } from "@services/utils/Autorizathion";
import { Routes } from "@services/utils/Routes";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Company } from "src/types/company.type";
import ModalDocs from "../../../components/Modals/ModalDocs";
import { useAppSelector } from "../../../hooks";
import { RootState } from "../../../store";
import "./_listContracts.scss";
import { dataTable } from "./dataTable";
import { inputsEdit } from "./inputsModalForm";

const ListContracts = () => {
  const [IsOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [inputsModalForm, setInputsModalForm] =
    useState<Array<GlobalInputs | any>>(inputsEdit);
  const [dataDocuments, setDataDocuments] = useState<any>([]);
  const { getDataProviders } = useDataProvider();

  const companies = useAppSelector(
    (state: RootState) => state.dataProviders.companies
  );

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
    setInputsModalForm((prevInputs) =>
      prevInputs.map((input) => ({
        ...input,
        // @ts-ignore
        options: optionsMap[input.key] || input.options,
      }))
    );
  }, [optionsMap]);

  useEffect(() => {
    getDataProviders(["companies"]);

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
      trackBy: "_id",
      value: [],
      type: "select",
      multiple: true,
      cols: "c-col-span-4",
      formatValue: (value: Company[]) => {
        if (value) {
          return value.map((v) => v._id).toString();
        }

        return [];
      },
    },
    {
      key: "importer",
      placeholder: "Search by importer",
      name: "importer",
      trackBy: "_id",
      value: [],
      type: "select",
      multiple: true,
      cols: "c-col-span-4",
      formatValue: (value: Company[]) => {
        if (value) {
          return value.map((v) => v._id).toString();
        }
        return [];
      },
    },
  ]);

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const onOpenPdf = (data: any) => {
    window.open(`/pdf/${data.item._id}`);
  };

  const onOpenDocument = (data: any) => {
    setDataDocuments(data.item);
    setIsOpenModal(true);
  };

  const onShow = (data: any) => {
    
  }

  return (
    <div className="list-contracts__container">
      <Layout title="Contracts list">
        <Abm
          table={{
            columns: dataTable,
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
            urlDelete: Routes.CONTRACTS.DELETE,
            deleteItemAfterDelete: true,
            deleteRequestConfiguration: {
              method: "DELETE",
              headers: {
                Authorization: authorization(),
                "Content-Type": "application/json",
              },
            },
            afterDelete: (data: any) => {
              if (!data || data.errors || data.error) {
                toast.error(`${JSON.stringify(data.errors ?? data.error)}`, {
                  autoClose: 5000,
                  theme: "colored",
                });
              } else {
                toast(`Eliminado correctamente correctamente`, {
                  autoClose: 2000,
                  theme: "dark",
                });
              }
            },
            scopedColumns: {
              pdf: (item: any) => (
                <Button
                  style={{ width: "40px" }}
                  type="button"
                  onClick={() => onOpenPdf(item)}
                >
                  <img src={baseApiUrl + "/icons/pdf.svg"} alt="Editar" />
                </Button>
              ),
              documents: (item: any) => (
                <Button
                  style={{ width: "40px" }}
                  type="button"
                  onClick={() => onOpenDocument(item)}
                >
                  Ver doc
                </Button>
              ),
            },
            updateIcon: baseApiUrl + "/icons/editar.svg",
            deleteIcon: baseApiUrl + "/icons/basura.svg",
            headerSticky: true,
          }}
          modalForm={{
            inputs: inputsModalForm,
            urlUpdate: Routes.CONTRACTS.UPDATE,
            urlShow: Routes.CONTRACTS.SHOW,
            closable: true,
            title: "Editar contrato",
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
              ;
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
            onShow: onShow
          }}
        />
      </Layout>
      <ModalDocs open={IsOpenModal} onClose={closeModal} data={dataDocuments} />
    </div>
  );
};

export default ListContracts;
