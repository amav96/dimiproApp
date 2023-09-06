import React, { useEffect, useMemo, useState } from "react";
import { Abm, Layout } from "@package";
import { Routes } from "@services/utils/Routes";
import { authorization } from "@services/utils/Autorizathion";
import { GlobalInputs } from "@packageTypes";
import baseApiUrl from "@services/BaseApiUrl";
import { Role } from "../../types/role.type";
import { formatDateTime } from "@services/utils/Formatters";
import useDataProvider from "@hooks/useDataProvider";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../store";
import { Company } from "../../types/company.type";
import { toast } from "react-toastify";

export function Users() {
  const { getDataProviders } = useDataProvider();
  const roles = useAppSelector((state: RootState) => state.dataProviders.roles);
  const companies = useAppSelector(
    (state: RootState) => state.dataProviders.companies
  );
  const prefixs = useAppSelector(
    (state: RootState) => state.dataProviders.prefixs
  );
  useEffect(() => {
    getDataProviders(["roles", "companies", "prefixs"]);
  }, []);

  useEffect(() => {
    // Actualizar formCrud cuando cambie roles
    setFormCrud((prevInputs) =>
      prevInputs.map((input) => {
        if (input.key === "roles") {
          return {
            ...input,
            options: roles,
          };
        }
        if (input.key === "company") {
          return {
            ...input,
            options: companies,
          };
        }
        if (input.key === "prefix") {
          return {
            ...input,
            options: prefixs,
          };
        }
        return input;
      })
    );

    setFormFilter((prevInputs) =>
      prevInputs.map((input) => {
        if (input.key === "roles") {
          return {
            ...input,
            options: roles,
          };
        }
        if (input.key === "company") {
          return {
            ...input,
            options: companies,
          };
        }
        if (input.key === "prefix") {
          return {
            ...input,
            options: prefixs,
          };
        }
        return input;
      })
    );
  }, [roles, companies, prefixs]);

  const [formCrud, setFormCrud] = useState<GlobalInputs[]>([
    {
      key: "firstName",
      placeholder: "Name",
      name: "firstName",
      value: "",
      type: "text",
      cols: "c-col-span-4",
      title: "Name:",
      validations: {
        rules: {
          required: true,
        },
      },
    },
    {
      key: "lastName",
      placeholder: "Last Name",
      name: "lastName",
      value: "",
      type: "text",
      cols: "c-col-span-4",
      title: "Last Name:",
      validations: {
        rules: {
          required: true,
        },
      },
    },
    {
      key: "email",
      placeholder: "E-mail",
      name: "email",
      value: "",
      type: "text",
      cols: "c-col-span-4",
      title: "E-mail:",
      validations: {
        rules: {
          required: true,
        },
      },
    },
    {
      key: "company",
      placeholder: "Company",
      title: "Company:",
      name: "company",
      trackBy: "_id",
      value: [],
      type: "select",
      cols: "c-col-span-4",
      options: companies,
      formatValue: (value: Company) => value._id?.toString(),
      validations: {
        rules: {
          required: true,
        },
      },
    },
    {
      key: "roles",
      placeholder: "Roles",
      title: "Roles:",
      name: "roles",
      trackBy: "_id",
      value: [],
      type: "select",
      multiple: false,
      cols: "c-col-span-4",
      options: roles,
      formatValue: (value: any) => value.id,
      validations: {
        rules: {
          required: true,
        },
      },
    },
    {
      key: "prefix",
      placeholder: "Prefix|Code",
      name: "prefix",
      label: "fullName",
      title: "Prefix|Code:",
      value: [],
      options: prefixs,
      type: "select",
      cols: "c-col-span-4",
    },
    {
      key: "phoneNumber",
      placeholder: "Phone Number",
      title: "Phone Number:",
      name: "phoneNumber",
      value: "",
      type: "text",
      cols: "c-col-span-4",
      formatValue: (value: string) => Number(value),
    },
  ],);

  useEffect(() => {
    if(!formCrud.some((form) => form.key === 'password')){
      setFormCrud((prev) => [
        ...prev,
        ...passwordInputs
      ])
    }
  },[])

  const passwordInputs : GlobalInputs[] = [{
    key: "password",
    placeholder: "Password",
    title: "Password:",
    name: "password",
    value: "",
    type: "password",
    cols: "c-col-span-4",
    validations: {
      rules: {
        required: true,
      },
    },
  },
  {
    key: "confirmPassword",
    placeholder: "Confirm Password",
    title: "Confirm Password:",
    name: "confirmPassword",
    value: "",
    type: "password",
    cols: "c-col-span-4",
    validations: {
      rules: {
        required: true,
      },
    },
  }]

  const [formFilter, setFormFilter] = useState<GlobalInputs[]>([
    {
      key: "firstName",
      placeholder: "Name",
      name: "firstName",
      value: "",
      type: "text",
      cols: "c-col-span-4",
    },
    {
      key: "lastName",
      placeholder: "Last Name",
      name: "lastName",
      value: "",
      type: "text",
      cols: "c-col-span-4",
    },
    {
      key: "email",
      placeholder: "Email",
      name: "email",
      value: "",
      type: "text",
      cols: "c-col-span-4",
    },
    {
      key: "company",
      placeholder: "Company",
      name: "company",
      trackBy: "_id",
      value: [],
      type: "select",
      multiple: false,
      cols: "c-col-span-4",
      options: companies,
      formatValue: (value: Company) => {
        if (value) {
          return value._id?.toString();
        }
       
      },
    },
    {
      key: "roles",
      placeholder: "Roles",
      name: "roles",
      trackBy: "_id",
      value: [],
      type: "select",
      multiple: true,
      cols: "c-col-span-4",
      options: roles,
      formatValue: (value: Role[]) => {
        if (value) {
          return value.map((v) => v._id).toString();
        }
        return [];
      },
    },
  ]);

  const onIsEditMode = (data:any) => {
    if(!data && !formCrud.some((form) => form.key === 'password')){
      const rebuildForm: GlobalInputs[]  = [...formCrud, ...passwordInputs]
      setFormCrud(rebuildForm)
    } else {
      let newForm = [...formCrud].filter((form) => form.key !== 'password' && form.key !== 'confirmPassword');
      setFormCrud(newForm)
    }
  }

  return (
    <Layout title={"Users"}>
      <Abm
        table={{
          columns: useMemo(
            () => [
              { key: "firstName", title: "Name" },
              { key: "lastName", title: "Last Name" },
              { key: "email", title: "Email" },
              {
                key: "roles",
                title: "Roles",
                format: (value: any) => {
                  if (value) {
                    return value.name;
                  } else {
                    return "";
                  }
                },
              },
              {
                key: "company",
                title: "Company",
                format: (value: Company) => {
                  if (value) {
                    return value.name;
                  } else {
                    return "None";
                  }
                },
              },
              {
                key: "createdAt",
                title: "Created",
                format: (value: string) => formatDateTime(value) || "",
              },
              { key: "edit", title: "Edit" },
              { key: "delete", title: "Delete"}
            ],
            []
          ),
          urlIndex: Routes.USERS.INDEX,
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
          urlDelete: Routes.USERS.DELETE,
          deleteItemAfterDelete: true,
          deleteRequestConfiguration: {
            method: "DELETE",
            headers: {
              Authorization: authorization(),
              "Content-Type": "application/json",
            },
          },
          deleteIcon: baseApiUrl + "/icons/basura.svg",
          updateIcon: baseApiUrl + "/icons/editar.svg",
          headerSticky: true,
          afterDelete: (data: any) => {
            if (data.errors || data.error) {
              toast.error(`${JSON.stringify(data.errors ?? data.error)}`, {
                autoClose: 5000,
                theme: "colored",
              });
            } else {
              toast(`Successfully deleted`, {
                autoClose: 2000,
                theme: "dark",
              });
            }
          },
        }}
        modalForm={{
          inputs: formCrud,
          urlStore: Routes.USERS.STORE,
          urlUpdate: Routes.USERS.UPDATE,
          urlShow: Routes.USERS.SHOW,
          closable: true,
          title: "Save User",
          afterUpdate: (data: any) => {
            if (data.errors || data.error) {
              toast.error(`${JSON.stringify(data.errors ?? data.error)}`, {
                autoClose: 5000,
                theme: "colored",
              });
            } else {
              toast(`Successfully saved`, {
                autoClose: 2000,
                theme: "dark",
              });
            }
          },
          afterStore: (data: any) => {
            if (data.errors || data.error) {
              toast.error(`${JSON.stringify(data.errors ?? data.error)}`, {
                autoClose: 5000,
                theme: "colored",
              });
            } else {
              toast(`Successfully saved`, {
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
        onIsEditMode={onIsEditMode}
      />
    </Layout>
  );
}
