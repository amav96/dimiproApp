import { PropModal } from '../../types'
import { ModalPortal } from './ModalPortal';
import './Modal.scss';

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