import React, { useEffect, useState } from 'react'
import { DialogProp } from '@packageTypes'
import { Modal, Button } from '@package';

export function Dialog(props: DialogProp) {

    const { 
        isOpen, 
        resource, 
        textConfirm = 'Confirmar', 
        textCancel = 'Cancelar', 
        centered, 
        text = '¿Estas seguro?', 
        cancel, 
        confirm 
    } = props;

    const [internalIsOpen, setInternalIsOpen] = useState<boolean>(false)

    useEffect(() => {
        setInternalIsOpen(isOpen)
    },[isOpen])

    const hideModal = () => {
      if(cancel) cancel(resource)
    }
    const handleConfirm = () => {
      if(confirm) confirm(resource)
    }

  return (
    <div>
        { internalIsOpen && 
          <Modal
          isOpen={internalIsOpen}
          closeModal={hideModal}
          >
            <div className="c-flex c-flex-col c-p-4">
              <div className="c-mb-6">
                { text }
              </div>
              <div className="c-flex c-flex-row c-justify-end">
                <Button
                textColor={'c-text-white'}
                backgroundColor={'c-bg-green'}
                onClick={handleConfirm}
                >
                  {textConfirm}
                </Button>
                <Button
                textColor={'c-text-white'}
                backgroundColor={'c-bg-red'}
                customClass="c-mx-2"
                onClick={hideModal}
                >
                  {textCancel}
                </Button>
              </div>
            </div>
          </Modal>
        }
    </div>
  )
}
