import  { useRef, useState } from 'react'
import { Dialog, Button, ModalForm, TableAlive } from '@package';
import { PropsModalForm, AbmProps } from '@packageTypes'

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
      afterDelete,
      updateIcon,
      deleteIcon,
      storeIcon,
      searchIcon,
      headerSticky
    },
    modalForm: {
      inputs,
      urlStore,
      urlUpdate,
      urlShow,
      resetAfterClose,
      showRequestConfiguration,
      storeRequestConfiguration,
      updateRequestConfiguration,
      onCloseModal,
      afterUpdate,
      afterStore,
    }
  } = props;

  const [modalFormData, setModalFormData] = useState<PropsModalForm>({
    inputs,
    urlStore,
    urlUpdate,
    urlShow,
    isEditMode: false,
    visible: false,
    resetAfterClose,
    showRequestConfiguration,
    storeRequestConfiguration,
    updateRequestConfiguration,
    onCloseModal,
    afterUpdate,
    afterStore,
  })

  const [localItems, setLocalItems] = useState<Array<any>>([])

  const onOpenStore = () => {
    setModalFormData((prev) => ({
      ...prev,
      visible: true,
      isEditMode: false
    }))
  }

  const refTableAlive = useRef<HTMLFormElement | null>(null)
  const handleStore = (data: any) => {
    if(addItemAfterStore){
      const currentItems = refTableAlive?.current?.localItems;
      setLocalItems((prev) => ([...[data],...prev,...currentItems]))
    }
    if(modalFormData.afterStore){
      modalFormData.afterStore(data)
    }

    setModalFormData((prev) => ({
      ...prev,
      visible: false,
      isEditMode: false
    }))
  }

  const onOpenUpdate = (data: any) => {
    setModalFormData((prev) => ({
      ...prev,
      visible: true,
      isEditMode: true,
      urlShow: props.modalForm.urlShow + '/' + data.item.id,
      urlUpdate: props.modalForm.urlUpdate + '/' + data.item.id
    }))
  }

  const handleUpdate = (data : any) => {
    if(updateItemAfterUpdate){
      const currentItems = refTableAlive?.current?.localItems.map((item : any) => item.id === data.id ? { ...item,...data } : item);
      setLocalItems(currentItems)
    }
    if(modalFormData.afterUpdate){
      modalFormData.afterUpdate(data)
    }

    setModalFormData((prev) => ({
      ...prev,
      visible: false,
      isEditMode: false,
    }))
  }

  const cancelDelete = () => {
    setDeleteData((prev) => ({
      ...prev,
      isOpen: false,
    }))
  }

  const loadingDelete = useRef<boolean>(false);
  const handleDelete = async (data: any) => {
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
          if(!result){
            alert(result)
          } else {
            if(deleteItemAfterDelete){
              const currentItems = refTableAlive?.current?.localItems.filter((value : any) => value.id !== item.id );
              setLocalItems(currentItems)
            }
            if(afterDelete){
              afterDelete(deleteData.resource)
            }
            setDeleteData((prev) => ({
              ...prev,
              resource: null,
              isOpen: false,
            }))
          }
        } catch (error) {
          alert(error)
          loadingDelete.current = false
        }
      }
  }

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

  const handleOnCloseModal = () => {
    setModalFormData((prev) => ({
      ...prev,
      visible: false,
      isEditMode: false
    }))

    if(onCloseModal){
      onCloseModal()
    }
  }

  return (
    <div>
      <TableAlive
      ref={refTableAlive}
      items={localItems}
      inputs={filterInputs}
      columns={columns}
      searchIcon={searchIcon}
      scopedColumns={{
        edit : (item: any) => (
            <Button type={'button'}
            onClick={() => onOpenUpdate(item)}
             >
            { updateIcon ? (<img src={updateIcon} alt="Editar"/>) : (<span>Editar</span>)}
            </Button>
        ),
        delete : (item: any) => (
            <Button type={'button'}
            onClick={() => onOpenDelete(item)}
             >
            { deleteIcon ? (<img src={deleteIcon} alt="Eliminar"/>) : (<span>Eliminar</span>)}
            </Button>
        )
      }}
      urlIndex={urlIndex}
      searchable={searchable}
      requestConfiguration={requestConfiguration}
      header={(
        <div className="c-flex c-justify-end">
          <Button
          type={'button'}
          customClass={'c-mb-3 c-w-40 c-flex c-justify-center btn-primary'}
          onClick={onOpenStore}
          >
            { storeIcon ? (<img src={storeIcon} alt="Eliminar"/>) : (<span>Crear <strong>+</strong></span>)}
          </Button>
        </div>
      )}
      headerSticky={headerSticky}
      />

      <ModalForm
      inputs={inputs}
      urlStore={modalFormData.urlStore}
      urlUpdate={modalFormData.urlUpdate}
      urlShow={modalFormData.urlShow}
      isEditMode={modalFormData.isEditMode}
      visible={modalFormData.visible}
      resetAfterClose={modalFormData.resetAfterClose}
      showRequestConfiguration={modalFormData.showRequestConfiguration}
      storeRequestConfiguration={modalFormData.storeRequestConfiguration}
      updateRequestConfiguration={modalFormData.updateRequestConfiguration}
      onCloseModal={handleOnCloseModal}
      afterUpdate={handleUpdate}
      afterStore={handleStore}
      />

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
