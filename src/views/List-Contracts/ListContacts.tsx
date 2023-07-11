import useDataProvider from "@hooks/useDataProvider";
import { Abm, Button, Layout } from "@package";
import { GlobalInputs } from "@packageTypes";
import baseApiUrl from "@services/BaseApiUrl";
import { authorization } from "@services/utils/Autorizathion";
import { Routes } from "@services/utils/Routes";
import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../store";
import "./_list-contracts.scss";
import { dataTable } from "./dataTable";
import { Company } from "src/types/company.type";

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
      cols: "c-col-span-2",
    },
    {
      key: 'exporter',
      placeholder: 'Search by exporter',
      name: 'exporter',
      trackBy: '_id',
      value: [],
      type: 'select',
      multiple: true,
      cols: 'c-col-span-2',
      formatValue : (value: Company[]) => {
        if(value){
          return value.map((v) => v._id).toString()
        }
        
        return []
      },
    },
    {
      key: 'importer',
      placeholder: 'Search by importer',
      name: 'importer',
      trackBy: '_id',
      value: [],
      type: 'select',
      multiple: true,
      cols: 'c-col-span-2',
      formatValue : (value: Company[]) => {
        if(value){
          return value.map((v) => v._id).toString()
        }
          return []
      },
    },
  ]);

  const onOpenPdf = (data: any) => {
    window.open(`/pdf/${data.item._id}`)
  }

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
            scopedColumns: {
              pdf: (item: any) => (
                <Button style={{width:'40px'}} type="button" onClick={() => onOpenPdf(item)}>
                  <img  src={baseApiUrl + '/icons/pdf.svg'} alt="Editar" />
                </Button>
              ),
            },
            updateIcon: baseApiUrl + '/icons/editar.svg',
            deleteIcon: baseApiUrl + "/icons/basura.svg",
            headerSticky: true,
          }}
        />
      </Layout>
    </div>
  );
};

export default ListContacts;
