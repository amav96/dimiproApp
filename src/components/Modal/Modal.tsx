import React, { useCallback, useEffect, useRef } from 'react';
import './Modal.scss';
import { PropModal } from './Modal.type';
import { ModalPortal } from './ModalPortal';

export function Modal(props: PropModal) {
  const {
    size = 'auto-screen',
    isOpen,
    style,
    children,
    overlay = 'gray-light',
    closeModal,
    keep = false,
  } = props;

  return  isOpen &&(
    <div className={`c-bg-${overlay} modalAppOverlay`} style={style}>
      { 
        <ModalPortal
        closeModal={closeModal}
        >
        {children}
        </ModalPortal>
      }
    </div>
  );
}