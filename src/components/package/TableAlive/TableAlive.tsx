import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { TableAliveProps } from "@packageTypes";
import { Table, Form, Button } from "@package";
import "./_table_alive.scss";
import { Loader } from "@package";
import Pagination from "../../../components/pagination/Pagination";

export const TableAlive = forwardRef(function TableAlive(
  props: TableAliveProps<string>,
  ref: React.Ref<HTMLFormElement>
) {
  const {
    inputs,
    columns,
    scopedColumns,
    items,
    onChangePage,
    urlIndex,
    page,
    limit,
    keyPage = "page",
    keyLimit = "limit",
    requestConfiguration,
    searchIcon,
    searchable,
    modelKey = "items",
    header,
    headerSticky,
  } = props;

  const [localItems, setLocalItems] = useState<Array<any>>([]);

  useEffect(() => {
    if (items) {
      setLocalItems(items);
    }
  }, [items]);

  const pagination = useRef<{
    page: number;
    limit: number;
    count: 0;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    totalPages?: number;
    nextPage?: number;
    prevPage?: number;
    data?: any;
  }>({
    page: 1,
    limit: 10,
    count: 0,
    hasNextPage: false,
    hasPrevPage: false,
    totalPages: 1,
    nextPage: 1,
    prevPage: 1,
    data: [],
  });
  const loading = useRef<boolean>(false);
  const changePage = async (increment: number = 1) => {
    if (
      !loading.current &&
      ((increment > 0 && pagination.current.hasNextPage) ||
        (increment < 0 && pagination.current.page > 1))
    ) {
      pagination.current.page += increment;
      await applyLookFor(currentFilters.current);
    }
  };

  const currentFilters = useRef<object>({});

  const applyLookFor = async (
    params: any = null,
    firstLook: boolean = false
  ): Promise<void> => {
    if (urlIndex && !loading.current) {
      loading.current = true;
      let queryParams: object = {};
      if (searchable && params) {
        queryParams = { ...queryParams, ...params };
        currentFilters.current = params; 
      }

      queryParams = {
        ...queryParams,
        ...{
          [keyPage]: pagination.current.page,
          [keyLimit]: pagination.current.limit,
        },
      };
      try {
        let params = {
          ...{ method: "GET" },
          ...requestConfiguration,
        };

        Object.keys(queryParams).forEach((k) => {
          let param = queryParams[k as keyof object] as any;
          if (
            param === null ||
            param === "" ||
            param === undefined ||
            (Array.isArray(param) && param.length === 0)
          ) {
            delete queryParams[k as keyof object];
          }
        });
        currentFilters.current = queryParams;
        let urlParams: any =
          urlIndex +
          "?" +
          new URLSearchParams(currentFilters.current as URLSearchParams);

        const response = await fetch(urlParams, params);
        const result = await response.json();
        loading.current = false;
        if (result.error) {
          alert(result.error);
        } else {
          let data =
            result && Array.isArray(result)
              ? result
              : result &&
                result[modelKey as keyof object] &&
                Array.isArray(result[modelKey as keyof object])
              ? result[modelKey as keyof object]
              : result;
          if (firstLook) {
            setLocalItems(data.docs);
          } else {
            // lo hace asi, para mantener los registros anteriores mientras estoy escroleando, y mergeo todo
            setLocalItems(data.docs);
          }
          if (result) {
            pagination.current.page = result.page;
            pagination.current.limit = result.limit;
            pagination.current.count = result.count;
            pagination.current.hasNextPage = result.hasNextPage;
            pagination.current.hasPrevPage = result.hasPrevPage;
            pagination.current.totalPages = result.totalPages;
            pagination.current.nextPage = result.nextPage;
            pagination.current.prevPage = result.prevPage;
            pagination.current.data = result.data;
          }
        }
      } catch (error) {
        loading.current = false;
      }
    } else if (!urlIndex) {
      console.error("Url undefined");
    }
  };

  const onSubmit = (data: any) => {
    pagination.current.page = 1;
    applyLookFor(data.items, true);
  };

  const [reseting, setReseting] = useState<boolean>(false);
  const resetLookFor = async () => {
    setReseting(true);
    setLocalItems([]);
    await refForm?.current?.resetValues();
    pagination.current.page = 1;
    currentFilters.current = {};
    currentFilters.current = { [keyPage]: 1 };
    
    await applyLookFor();
    setReseting(false);
  };

  const refForm = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (urlIndex) {
      applyLookFor({ [keyPage]: 1 });
    }
  }, []);

  //@ts-ignore
  useImperativeHandle(ref, () => ({
    localItems: localItems,
  }));

  return (
    <div>
      {inputs && (
        <div className="c-flex c-flex-col edit-form">
          <Form inputs={inputs} onSubmit={onSubmit} ref={refForm}>
            <div className="c-flex c-my-4">
              <Button
                backgroundColor={"c-bg-btn-filter"}
                textColor={"c-text-btn-filter"}
              >
                {searchIcon ? (
                  <img src={searchIcon} alt="Search" />
                ) : (
                  <span>Search</span>
                )}
              </Button>
              <Button
                type={"button"}
                onClick={resetLookFor}
                customClass={"c-mx-2"}
                backgroundColor={"c-bg-btn-filter-remove"}
                textColor={"c-text-btn-filter-remove"}
              >
                Clean filters
              </Button>
            </div>
          </Form>
        </div>
      )}
      {header && header}
      <Table
        items={localItems}
        headerSticky={headerSticky}
        columns={columns}
        scopedColumns={scopedColumns}
        onChangePage={() => changePage()}
        loading={loading.current}
      />
       <Pagination
        pagination={pagination}
        applyLookFor={applyLookFor}
        changePage={changePage}
        currentFilters={currentFilters.current}
    />
    </div>
  );
});
