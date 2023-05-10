import React, { useCallback, useEffect, useRef } from 'react';
import './Modal.scss';
import { PropModal } from './Modal.type';

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

  let container: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent): void => {
      if (
        (event.target instanceof HTMLElement || event.target instanceof SVGElement) &&
        !container.current?.contains(event.target)
      ) {
        if (closeModal) {
          closeModal();
        }
      }
    },
    [closeModal]
  );

  const instanceClick = useCallback((): void => {
    if (isOpen) {
      window.addEventListener('click', handleClickOutside, true);
    } else {
      window.removeEventListener('click', handleClickOutside, true);
    }
  }, [isOpen, handleClickOutside]);

  useEffect(() => {
    if (!keep) {
      instanceClick();
    }
  }, [instanceClick]);

  useEffect(() => {
    return () => {
      window.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return isOpen && (
    <div className={`c-bg-${overlay} modalAppOverlay`} style={style}>
      <div ref={container} className={`modalAppOverlay__container-${size}`}>
        {children}
      </div>
    </div>
  );
}