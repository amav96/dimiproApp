import  { useCallback, useEffect, useRef, useState } from 'react'
import { Dialog, Button, ModalForm, TableAlive } from '@package';
import { PropsModalForm, AbmProps } from '@packageTypes'
import './Abm.scss'

export function Abm(props: AbmProps) {
  const {
    table: {
      columns,
      urlIndex,
      urlDelete,
      deleteRequestConfiguration,
      requestConfiguration,
      inputs : filterInputs,
      searchable,
      addItemAfterStore,
      updateItemAfterUpdate,
      deleteItemAfterDelete,
      scopedColumns = {},
      afterDelete,
      modelDelete = 'data',
      updateIcon,
      deleteIcon,
      storeIcon,
      searchIcon,
      headerSticky
    },
    modalForm :{
      urlShow,
      urlUpdate,
      afterStore,
      afterUpdate,
      onCloseModal,
      inputs,
      urlStore,
      modelShow,
      modelStore,
      modelUpdate,
      scopedFields,
      resetAfterClose,
      showRequestConfiguration,
      storeRequestConfiguration,
      updateRequestConfiguration,
      beforeUpdate,
      beforeStore,
      closable,
      title,
      onShow,
    } = {},
    onIsEditMode
  } = props;

  const [localModalForm, setLocalModalForm] = useState<PropsModalForm<string | number>>({
    isEditMode: false,
    visible: false,
    urlShow: urlShow,
    urlUpdate: urlUpdate
  })

  const prevIsEditModeRef = useRef(localModalForm.isEditMode);
  useEffect(() => {
    if (prevIsEditModeRef.current !== localModalForm.isEditMode) {
      prevIsEditModeRef.current = localModalForm.isEditMode;
      if(onIsEditMode){
        onIsEditMode(localModalForm.isEditMode)
      }
    }
  }, [localModalForm.isEditMode])

  const [localItems, setLocalItems] = useState<Array<any>>([])

  const onOpenStore = () => {
    setLocalModalForm((prev) => ({
      ...prev,
      visible: true,
      isEditMode: false
    }))
  }

  const refTableAlive = useRef<HTMLFormElement | null>(null)
  const handleStore = useCallback((data: any) => {
    if(addItemAfterStore){
      if(!data.errors && !data.error){
        const currentItems = refTableAlive?.current?.localItems;
        setLocalItems(() => ([...[data],...currentItems]))
      }
    }
    if(afterStore){
      afterStore(data)
    }

    if(!data.errors && !data.error){
      setLocalModalForm((prev) => ({
        ...prev,
        visible: false,
        isEditMode: false
      }))
    }
  }, [afterStore])

  const onOpenUpdate = (data: any) => {
    setLocalModalForm((prev) => ({
      ...prev,
      visible: true,
      isEditMode: true,
      urlShow: props.modalForm?.urlShow + '/' + data.item.id,
      urlUpdate: props.modalForm?.urlUpdate + '/' + data.item.id
    }))
  }

  const handleUpdate = useCallback((data : any) => {
    if(updateItemAfterUpdate && (data?.id || data?._id)){
      let trackBy = data?.id ? data.id : data?._id ? data._id : null
      if(trackBy){
        const currentItems = refTableAlive?.current?.localItems.map((item : any) => item.id === trackBy ? { ...item,...data } : item);
        setLocalItems(currentItems)
      }
    }
    if(afterUpdate){
      afterUpdate(data)
    }

    setLocalModalForm((prev) => ({
      ...prev,
      visible: false,
      isEditMode: false,
    }))

  }, [afterUpdate])

  const cancelDelete = () => {
    setDeleteData((prev) => ({
      ...prev,
      isOpen: false,
    }))
  }

  const loadingDelete = useRef<boolean>(false);
  const handleDelete = useCallback(async (data: any) => {
      const { item } = data
      if(!loadingDelete.current){
        loadingDelete.current = true

        const url = `${urlDelete}/${item.id}`;

        let params = {
          ...{ method: "DELETE" },
          ...deleteRequestConfiguration
        }

        try {
          const response = await fetch(url, params);
          const result = await response.json();
          loadingDelete.current = false

          const { error, errors } = result
              if(error || errors){
                if(afterDelete){
                  afterDelete({
                    type: 'serverMessage',
                    message: 'An error has occurred with the server',
                    ...data,
                    ...result,
                  })
                }
              }else {

                setDeleteData((prev) => ({
                  ...prev,
                  resource: null,
                  isOpen: false,
                }))

                if(deleteItemAfterDelete){
                  const currentItems = refTableAlive?.current?.localItems.filter((value : any) => value.id !== item.id );
                  setLocalItems(currentItems)
                }

                if(afterDelete){
                  if(typeof result === 'object'){
                    afterDelete(result[modelDelete])
                  } else {
                    afterDelete(result)
                  }
                }

              }


        } catch (error) {
          alert(error)
          loadingDelete.current = false
        }
      }
  }, [afterDelete])

  const [deleteData, setDeleteData] = useState({
    isOpen: false,
    centered: true,
    resource: null,
    text: '¿Estas seguro?',
    confirm : handleDelete,
    cancel: cancelDelete
  })

  const onOpenDelete = (data: any) => {
    setDeleteData((prev) => ({
      ...prev,
      resource: data,
      isOpen: true,
    }))
  }

  const handleOnCloseModal = useCallback(() => {
    setLocalModalForm((prev) => ({
      ...prev,
      visible: false,
      isEditMode: false
    }))

    if(onCloseModal){
      onCloseModal()
    }
  }, [onCloseModal])

  const [internalScopedColumns, setInternalScopedColumns] = useState({
    ...scopedColumns,
    ...(urlUpdate && {
      edit: (item: any) => (
        <Button
        style={{ width: '40px' }}
        type="button"
        backgroundColor='c-bg-button-edit-table'
        textColor='c-text-button-edit-table'
        onClick={() => onOpenUpdate(item)}
        >
          {updateIcon ? <img src={updateIcon} alt="Editar" /> : <span>Editar</span>}
        </Button>
      ),
    }),
    ...(urlDelete && {
      delete: (item: any) => (
        <Button
        style={{width:'40px'}}
        type="button"
        backgroundColor='c-bg-button-delete-table'
        textColor='c-text-button-delete-table'
        onClick={() => onOpenDelete(item)}
        >
          {deleteIcon ? <img
           src={deleteIcon} alt="Eliminar" /> : <span>Eliminar</span>}
        </Button>
      )
    })
  });


  return (
    <div>
      <TableAlive
      ref={refTableAlive}
      items={localItems}
      inputs={filterInputs}
      columns={columns}
      searchIcon={searchIcon}
      scopedColumns={internalScopedColumns}
      urlIndex={urlIndex}
      searchable={searchable}
      requestConfiguration={requestConfiguration}
      header={(
        <div className="c-flex c-justify-end create-btn-container">
          {
            urlStore && (
              <Button
              type={'button'}
              backgroundColor='c-bg-button-store'
              customClass={'c-mb-3 c-w-40 c-flex c-justify-center'}
              onClick={onOpenStore}
              >
                { storeIcon ? (<img src={storeIcon} alt="Delete"/>) : (<span>Create <strong>+</strong></span>)}
              </Button>
            )
          }
        </div>
      )}
      headerSticky={headerSticky}
      />
      {
        <ModalForm
        inputs={inputs}
        urlStore={urlStore}
        urlUpdate={localModalForm.urlUpdate}
        urlShow={localModalForm.urlShow}
        modelShow={modelShow}
        modelStore={modelStore}
        modelUpdate={modelUpdate}
        isEditMode={localModalForm.isEditMode}
        visible={localModalForm.visible}
        scopedFields={scopedFields}
        resetAfterClose={resetAfterClose}
        showRequestConfiguration={showRequestConfiguration}
        storeRequestConfiguration={storeRequestConfiguration}
        updateRequestConfiguration={updateRequestConfiguration}
        onCloseModal={handleOnCloseModal}
        afterUpdate={handleUpdate}
        afterStore={handleStore}
        beforeUpdate={beforeUpdate}
        beforeStore={beforeStore}
        closable={closable}
        title={title}
        onShow={onShow}
        />
      }

      <Dialog
      isOpen={deleteData.isOpen}
      centered={deleteData.centered}
      resource={deleteData.resource}
      text={deleteData.text}
      confirm={deleteData.confirm}
      cancel={deleteData.cancel}
      />
    </div>
  )
}
