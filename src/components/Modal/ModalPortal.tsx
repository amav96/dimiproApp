import React, { useCallback, useEffect, useRef } from 'react'
import { ModalPortalProps } from './Modal.type'

export  function ModalPortal(props: ModalPortalProps) {

    const {
        children,
        size = 'auto-screen',
        closeModal,
        keep
    } = props

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
          window.addEventListener('click', handleClickOutside, true);
      }, [handleClickOutside]);
    
      useEffect(() => {
        if (!keep) {
          instanceClick();
        }
      }, []);
    
      useEffect(() => {
        return () => {
          window.removeEventListener('click', handleClickOutside, true);
        };
      }, []);

    return (
    <div ref={container} className={`modalAppOverlay__container-${size}`}>
        {children}
    </div>
    )
}
