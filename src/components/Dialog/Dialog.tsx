import React, { useEffect, useState } from 'react'
import { DialogProp } from './Dialog.type'
import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';

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
            <div className="flex flex-col p-4">
              <div className="mb-6">
                { text }
              </div>
              <div className="flex flex-row justify-end">
                <Button
                textColor={'c-text-white'}
                backgroundColor={'c-bg-green'}
                text={textConfirm}
                onClick={handleConfirm}
                />
                <Button
                textColor={'c-text-white'}
                backgroundColor={'c-bg-red'}
                customClass="mx-2"
                text={textCancel}
                onClick={hideModal}
                />
              </div>
            </div>
          </Modal>
        }
    </div>
  )
}
